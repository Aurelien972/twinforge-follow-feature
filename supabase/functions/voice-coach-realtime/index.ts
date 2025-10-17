/**
 * Voice Coach Realtime Proxy
 * Proxifie les connexions WebSocket vers l'API Realtime d'OpenAI
 * Garde la clé API côté serveur pour plus de sécurité
 *
 * IMPORTANT:
 * - Cette fonction nécessite OPENAI_API_KEY dans les secrets Supabase
 * - Les WebSockets ne fonctionnent PAS dans StackBlitz/WebContainer
 * - En production uniquement
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from '../_shared/cors.ts';

const OPENAI_REALTIME_URL = 'wss://api.openai.com/v1/realtime';

// Structured logging helper
function log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    service: 'voice-coach-realtime',
    message,
    ...data
  };

  if (level === 'error') {
    console.error(JSON.stringify(logEntry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(logEntry));
  } else {
    console.log(JSON.stringify(logEntry));
  }
}

function setupOpenAIHandlers(openaiSocket: WebSocket, clientSocket: WebSocket) {
  let openaiConnected = false;

  openaiSocket.onopen = () => {
    log('info', 'OpenAI connection established');
    openaiConnected = true;

    if (clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(JSON.stringify({
        type: 'proxy.connected',
        timestamp: new Date().toISOString()
      }));
    }
  };

  openaiSocket.onerror = (error) => {
    log('error', 'OpenAI WebSocket error', { error: String(error) });

    if (clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(JSON.stringify({
        type: 'error',
        error: {
          message: 'Failed to connect to OpenAI Realtime API',
          details: 'Check server logs for more information'
        },
      }));
      clientSocket.close(1011, 'OpenAI connection failed');
    }
  };

  openaiSocket.onclose = (event) => {
    log('info', 'OpenAI connection closed', {
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean
    });
    openaiConnected = false;

    if (clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.close(event.code, event.reason || 'OpenAI disconnected');
    }
  };

  let messageToClientCount = 0;
  let messageToOpenAICount = 0;

  openaiSocket.onmessage = (event) => {
    try {
      messageToClientCount++;

      if (messageToClientCount <= 5) {
        try {
          const parsed = JSON.parse(event.data);
          log('info', 'OpenAI message received', {
            messageNumber: messageToClientCount,
            messageType: parsed.type,
            hasContent: !!parsed.delta?.audio || !!parsed.delta?.transcript,
            dataPreview: event.data.substring(0, 200)
          });
        } catch {
          log('info', 'OpenAI message received (non-JSON)', {
            messageNumber: messageToClientCount,
            dataLength: event.data.length,
            dataPreview: event.data.substring(0, 100)
          });
        }
      }

      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(event.data);
      } else {
        log('warn', 'Client socket not ready, dropping message', {
          messageNumber: messageToClientCount,
          clientState: clientSocket.readyState
        });
      }
    } catch (error) {
      log('error', 'Error forwarding to client', {
        error: String(error),
        messageNumber: messageToClientCount
      });
    }
  };

  clientSocket.onmessage = (event) => {
    try {
      messageToOpenAICount++;

      if (messageToOpenAICount <= 5) {
        try {
          const parsed = JSON.parse(event.data);
          log('info', 'Client message received', {
            messageNumber: messageToOpenAICount,
            messageType: parsed.type,
            hasAudio: !!parsed.audio,
            dataPreview: event.data.substring(0, 200)
          });
        } catch {
          log('info', 'Client message received (non-JSON)', {
            messageNumber: messageToOpenAICount,
            dataLength: event.data.length
          });
        }
      }

      if (openaiSocket.readyState === WebSocket.OPEN) {
        openaiSocket.send(event.data);
      } else {
        log('warn', 'OpenAI socket not ready', {
          state: openaiSocket.readyState,
          connected: openaiConnected,
          messageNumber: messageToOpenAICount
        });

        if (clientSocket.readyState === WebSocket.OPEN) {
          clientSocket.send(JSON.stringify({
            type: 'error',
            error: { message: 'OpenAI connection not ready' }
          }));
        }
      }
    } catch (error) {
      log('error', 'Error forwarding to OpenAI', {
        error: String(error),
        messageNumber: messageToOpenAICount
      });
    }
  };

  clientSocket.onclose = (event) => {
    log('info', 'Client connection closed', {
      code: event.code,
      reason: event.reason
    });

    if (openaiSocket.readyState === WebSocket.OPEN) {
      openaiSocket.close(1000, 'Client disconnected');
    }
  };

  clientSocket.onerror = (error) => {
    log('error', 'Client WebSocket error', { error: String(error) });

    if (openaiSocket.readyState === WebSocket.OPEN) {
      openaiSocket.close(1011, 'Client error');
    }
  };
}

Deno.serve(async (req: Request) => {
  // Generate request ID for tracing
  const requestId = crypto.randomUUID();

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);

    log('info', 'Incoming WebSocket request', {
      requestId,
      method: req.method,
      url: url.pathname
    });

    // Vérifier l'authentification
    // Pour les WebSockets, le token peut être dans l'URL (apikey query param)
    const apikeyFromUrl = url.searchParams.get('apikey');
    const authHeader = req.headers.get('Authorization') ||
                       req.headers.get('authorization');

    log('info', 'Request authentication check', {
      requestId,
      hasApikeyInUrl: !!apikeyFromUrl,
      hasAuthHeader: !!authHeader,
      upgrade: req.headers.get('upgrade'),
      connection: req.headers.get('connection')
    });

    // Vérifier qu'on a au moins un moyen d'authentification
    if (!apikeyFromUrl && !authHeader) {
      log('error', 'Missing authentication', { requestId });
      return new Response(
        JSON.stringify({ error: 'Missing authentication (apikey or Authorization header)' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      log('error', 'OPENAI_API_KEY not configured', {
        requestId,
        message: 'Please configure OPENAI_API_KEY in Supabase Edge Function secrets'
      });
      return new Response(
        JSON.stringify({
          error: 'OpenAI API key not configured on server',
          details: 'Please configure OPENAI_API_KEY in Supabase Edge Function secrets'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const upgrade = req.headers.get('upgrade') || '';
    if (upgrade.toLowerCase() !== 'websocket') {
      log('error', 'Not a WebSocket upgrade request', {
        requestId,
        upgrade,
        method: req.method
      });
      return new Response(
        JSON.stringify({ error: 'Expected WebSocket upgrade' }),
        {
          status: 426,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const model = url.searchParams.get('model') || 'gpt-4o-realtime-preview-2024-10-01';

    log('info', 'Initiating WebSocket connection', {
      requestId,
      model,
      timestamp: new Date().toISOString()
    });

    const openaiWsUrl = `${OPENAI_REALTIME_URL}?model=${encodeURIComponent(model)}`;

    log('info', 'Connecting to OpenAI', {
      requestId,
      url: openaiWsUrl.replace(model, '[MODEL]')
    });

    // Upgrade the request to WebSocket
    const { socket: clientSocket, response } = Deno.upgradeWebSocket(req);

    log('info', 'WebSocket upgrade successful', { requestId });

    // Attendre que le client soit connecté avant de créer la connexion OpenAI
    clientSocket.onopen = () => {
      log('info', 'Client connection established', { requestId });

      // Maintenant créer la connexion OpenAI
      try {
        log('info', 'Creating OpenAI WebSocket connection', { requestId });

        const openaiSocket = new WebSocket(openaiWsUrl, {
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'OpenAI-Beta': 'realtime=v1',
          },
        });

        log('info', 'OpenAI WebSocket instance created', { requestId });
        setupOpenAIHandlers(openaiSocket, clientSocket);
      } catch (error) {
        log('error', 'Failed to create OpenAI WebSocket', {
          requestId,
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        if (clientSocket.readyState === WebSocket.OPEN) {
          clientSocket.send(JSON.stringify({
            type: 'error',
            error: { message: 'Failed to connect to OpenAI' }
          }));
          clientSocket.close(1011, 'OpenAI connection failed');
        }
      }
    };

    return response;
  } catch (error) {
    log('error', 'Fatal error in proxy', {
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
