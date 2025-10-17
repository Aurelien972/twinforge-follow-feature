/**
 * Voice Coach Realtime Proxy
 * Proxifie les connexions WebSocket vers l'API Realtime d'OpenAI
 * Garde la clé API côté serveur pour plus de sécurité
 */

import { corsHeaders } from '../_shared/cors.ts';

const OPENAI_REALTIME_URL = 'wss://api.openai.com/v1/realtime';

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Récupérer la clé API OpenAI depuis les secrets Supabase
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY not configured in Supabase secrets');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Vérifier si c'est une requête WebSocket
    const upgrade = req.headers.get('upgrade') || '';
    if (upgrade.toLowerCase() !== 'websocket') {
      return new Response(
        JSON.stringify({ error: 'Expected WebSocket upgrade' }),
        {
          status: 426,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Récupérer les paramètres du modèle depuis les query params
    const url = new URL(req.url);
    const model = url.searchParams.get('model') || 'gpt-4o-realtime-preview-2024-10-01';

    console.log('Opening WebSocket connection to OpenAI Realtime API', { model });

    // Créer la connexion WebSocket vers OpenAI
    const openaiWsUrl = `${OPENAI_REALTIME_URL}?model=${model}`;

    // Établir la connexion avec OpenAI
    const openaiSocket = new WebSocket(openaiWsUrl, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'OpenAI-Beta': 'realtime=v1',
      },
    });

    // Créer le WebSocket côté client
    const { socket: clientSocket, response } = Deno.upgradeWebSocket(req);

    // Proxy des messages du client vers OpenAI
    clientSocket.onmessage = (event) => {
      try {
        if (openaiSocket.readyState === WebSocket.OPEN) {
          openaiSocket.send(event.data);
          console.log('Forwarded message from client to OpenAI');
        } else {
          console.warn('OpenAI socket not ready, state:', openaiSocket.readyState);
        }
      } catch (error) {
        console.error('Error forwarding to OpenAI:', error);
      }
    };

    // Proxy des messages d'OpenAI vers le client
    openaiSocket.onmessage = (event) => {
      try {
        if (clientSocket.readyState === WebSocket.OPEN) {
          clientSocket.send(event.data);
          console.log('Forwarded message from OpenAI to client');
        }
      } catch (error) {
        console.error('Error forwarding to client:', error);
      }
    };

    // Gestion des erreurs OpenAI
    openaiSocket.onerror = (error) => {
      console.error('OpenAI WebSocket error:', error);
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.send(
          JSON.stringify({
            type: 'error',
            error: { message: 'OpenAI connection error' },
          })
        );
      }
    };

    // Gestion de la fermeture OpenAI
    openaiSocket.onclose = (event) => {
      console.log('OpenAI WebSocket closed', {
        code: event.code,
        reason: event.reason,
      });
      if (clientSocket.readyState === WebSocket.OPEN) {
        clientSocket.close(event.code, event.reason);
      }
    };

    // Gestion de la fermeture client
    clientSocket.onclose = (event) => {
      console.log('Client WebSocket closed', {
        code: event.code,
        reason: event.reason,
      });
      if (openaiSocket.readyState === WebSocket.OPEN) {
        openaiSocket.close(event.code, event.reason);
      }
    };

    // Gestion des erreurs client
    clientSocket.onerror = (error) => {
      console.error('Client WebSocket error:', error);
      if (openaiSocket.readyState === WebSocket.OPEN) {
        openaiSocket.close();
      }
    };

    // Gestion de l'ouverture de la connexion OpenAI
    openaiSocket.onopen = () => {
      console.log('OpenAI WebSocket connection established');
    };

    return response;
  } catch (error) {
    console.error('Error in voice-coach-realtime:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
