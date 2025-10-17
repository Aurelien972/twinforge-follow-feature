/**
 * Voice Coach Realtime Proxy
 * Proxifie les connexions WebSocket vers l'API Realtime d'OpenAI
 * Garde la clé API côté serveur pour plus de sécurité
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from '../_shared/cors.ts';

const OPENAI_REALTIME_URL = 'wss://api.openai.com/v1/realtime';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY not configured in Supabase secrets');
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
      console.error('Not a WebSocket upgrade request');
      return new Response(
        JSON.stringify({ error: 'Expected WebSocket upgrade' }),
        {
          status: 426,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const url = new URL(req.url);
    const model = url.searchParams.get('model') || 'gpt-4o-realtime-preview-2024-10-01';

    console.log('[VOICE-PROXY] Initiating connection', { model, timestamp: new Date().toISOString() });

    const openaiWsUrl = `${OPENAI_REALTIME_URL}?model=${encodeURIComponent(model)}`;

    console.log('[VOICE-PROXY] Connecting to OpenAI', { url: openaiWsUrl });

    const openaiSocket = new WebSocket(openaiWsUrl, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'OpenAI-Beta': 'realtime=v1',
      },
    });

    const { socket: clientSocket, response } = Deno.upgradeWebSocket(req);

    let openaiConnected = false;
    let clientConnected = false;

    openaiSocket.onopen = () => {
      console.log('[VOICE-PROXY] OpenAI connection established');
      openaiConnected = true;

      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(JSON.stringify({
          type: 'proxy.connected',
          timestamp: new Date().toISOString()
        }));
      }
    };

    openaiSocket.onerror = (error) => {
      console.error('[VOICE-PROXY] OpenAI WebSocket error', error);

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
      console.log('[VOICE-PROXY] OpenAI connection closed', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean
      });
      openaiConnected = false;

      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.close(event.code, event.reason || 'OpenAI disconnected');
      }
    };

    openaiSocket.onmessage = (event) => {
      try {
        if (clientSocket.readyState === WebSocket.OPEN) {
          clientSocket.send(event.data);
        } else {
          console.warn('[VOICE-PROXY] Client socket not ready, dropping message');
        }
      } catch (error) {
        console.error('[VOICE-PROXY] Error forwarding to client', error);
      }
    };

    clientSocket.onopen = () => {
      console.log('[VOICE-PROXY] Client connection established');
      clientConnected = true;
    };

    clientSocket.onmessage = (event) => {
      try {
        if (openaiSocket.readyState === WebSocket.OPEN) {
          openaiSocket.send(event.data);
        } else {
          console.warn('[VOICE-PROXY] OpenAI socket not ready', {
            state: openaiSocket.readyState,
            connected: openaiConnected
          });

          if (clientSocket.readyState === WebSocket.OPEN) {
            clientSocket.send(JSON.stringify({
              type: 'error',
              error: { message: 'OpenAI connection not ready' }
            }));
          }
        }
      } catch (error) {
        console.error('[VOICE-PROXY] Error forwarding to OpenAI', error);
      }
    };

    clientSocket.onclose = (event) => {
      console.log('[VOICE-PROXY] Client connection closed', {
        code: event.code,
        reason: event.reason
      });
      clientConnected = false;

      if (openaiSocket.readyState === WebSocket.OPEN) {
        openaiSocket.close(1000, 'Client disconnected');
      }
    };

    clientSocket.onerror = (error) => {
      console.error('[VOICE-PROXY] Client WebSocket error', error);

      if (openaiSocket.readyState === WebSocket.OPEN) {
        openaiSocket.close(1011, 'Client error');
      }
    };

    return response;
  } catch (error) {
    console.error('[VOICE-PROXY] Fatal error', error);
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
