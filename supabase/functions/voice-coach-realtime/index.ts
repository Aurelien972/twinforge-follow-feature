/**
 * Voice Coach Realtime API - WebRTC Interface Unifiée
 *
 * Endpoints:
 * - POST /session : Crée une session WebRTC (interface unifiée OpenAI)
 * - GET /health : Health check et diagnostics
 *
 * Architecture:
 * - Le client envoie son SDP offer via POST /session
 * - Le serveur fait un POST vers OpenAI /v1/realtime/calls avec le SDP + config
 * - OpenAI retourne un SDP answer
 * - Le serveur retourne ce SDP au client
 * - WebRTC peer-to-peer connection automatique entre client et OpenAI
 *
 * Avantages:
 * - Pas de proxy, connexion directe client <-> OpenAI
 * - Audio géré automatiquement par WebRTC
 * - Meilleure latence
 * - Plus simple à maintenir
 * - Recommandé par OpenAI pour les navigateurs web
 *
 * IMPORTANT:
 * - Cette fonction nécessite OPENAI_API_KEY dans les secrets Supabase
 * - WebRTC ne fonctionne PAS dans StackBlitz/WebContainer (production uniquement)
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from '../_shared/cors.ts';

const OPENAI_REALTIME_API = 'https://api.openai.com/v1/realtime';

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

/**
 * Crée une session Realtime via l'interface unifiée d'OpenAI
 * Le client envoie son SDP offer, on retourne le SDP answer d'OpenAI
 */
async function createRealtimeSession(
  sdpOffer: string,
  openaiApiKey: string,
  model: string = 'gpt-4o-realtime-preview-2024-10-01',
  voice: string = 'alloy',
  instructions?: string
): Promise<string> {
  log('info', 'Creating Realtime session via unified interface', {
    model,
    voice,
    hasInstructions: !!instructions,
    sdpLength: sdpOffer.length
  });

  // Configuration de la session
  const sessionConfig = {
    type: 'realtime',
    model,
    voice,
    modalities: ['text', 'audio'],
    instructions: instructions || 'You are a helpful fitness coach assistant.',
    input_audio_format: 'pcm16',
    output_audio_format: 'pcm16',
    input_audio_transcription: {
      model: 'whisper-1'
    },
    turn_detection: {
      type: 'server_vad',
      threshold: 0.5,
      prefix_padding_ms: 300,
      silence_duration_ms: 500
    },
    temperature: 0.8,
    max_response_output_tokens: 4096
  };

  // Créer le FormData avec SDP + session config
  const formData = new FormData();
  formData.append('sdp', sdpOffer);
  formData.append('session', JSON.stringify(sessionConfig));

  log('info', 'Sending request to OpenAI', {
    url: `${OPENAI_REALTIME_API}/calls`,
    sessionConfig: {
      model,
      voice,
      modalities: sessionConfig.modalities
    }
  });

  try {
    const response = await fetch(`${OPENAI_REALTIME_API}/calls`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      log('error', 'OpenAI API error', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    // La réponse est le SDP answer en text/plain
    const sdpAnswer = await response.text();

    log('info', 'Received SDP answer from OpenAI', {
      sdpAnswerLength: sdpAnswer.length,
      sdpPreview: sdpAnswer.substring(0, 100)
    });

    return sdpAnswer;
  } catch (error) {
    log('error', 'Failed to create Realtime session', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  const requestId = crypto.randomUUID();
  const url = new URL(req.url);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // ==========================================
    // GET /health - Health check endpoint
    // ==========================================
    if (req.method === 'GET' && url.pathname.includes('/health')) {
      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

      log('info', 'Health check requested', { requestId });

      return new Response(
        JSON.stringify({
          status: 'ok',
          mode: 'webrtc-unified',
          timestamp: new Date().toISOString(),
          hasOpenAIKey: !!openaiApiKey,
          openaiKeyLength: openaiApiKey?.length || 0,
          openaiKeyPrefix: openaiApiKey ? `${openaiApiKey.substring(0, 7)}...` : 'NOT_SET',
          message: openaiApiKey
            ? 'Edge function is configured and ready for WebRTC'
            : 'OPENAI_API_KEY is not configured'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ==========================================
    // POST /session - Create WebRTC session
    // ==========================================
    if (req.method === 'POST' && url.pathname.includes('/session')) {
      log('info', 'WebRTC session creation requested', { requestId });

      // Vérifier l'authentification Supabase
      const authHeader = req.headers.get('Authorization');
      const apikeyHeader = req.headers.get('apikey');

      if (!authHeader && !apikeyHeader) {
        log('error', 'Missing authentication', { requestId });
        return new Response(
          JSON.stringify({
            error: 'Missing authentication',
            details: 'Authorization header or apikey required'
          }),
          {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Vérifier la clé OpenAI
      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openaiApiKey) {
        log('error', 'OPENAI_API_KEY not configured', { requestId });
        return new Response(
          JSON.stringify({
            error: 'OpenAI API key not configured',
            details: 'Please configure OPENAI_API_KEY in Supabase Edge Function secrets'
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Récupérer le SDP offer du client
      const contentType = req.headers.get('content-type') || '';
      let sdpOffer: string;

      if (contentType.includes('application/json')) {
        const body = await req.json();
        sdpOffer = body.sdp;

        if (!sdpOffer) {
          log('error', 'Missing SDP in JSON body', { requestId });
          return new Response(
            JSON.stringify({
              error: 'Missing SDP',
              details: 'Expected { "sdp": "...", ... } in request body'
            }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        log('info', 'Received SDP offer (JSON)', {
          requestId,
          sdpLength: sdpOffer.length,
          model: body.model,
          voice: body.voice
        });

        // Créer la session avec les paramètres optionnels
        const sdpAnswer = await createRealtimeSession(
          sdpOffer,
          openaiApiKey,
          body.model,
          body.voice,
          body.instructions
        );

        log('info', 'Returning SDP answer to client', {
          requestId,
          sdpAnswerLength: sdpAnswer.length
        });

        // Retourner le SDP answer
        return new Response(sdpAnswer, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/sdp',
          },
        });
      } else if (contentType.includes('application/sdp') || contentType.includes('text/plain')) {
        // Format simple: juste le SDP en text/plain
        sdpOffer = await req.text();

        if (!sdpOffer || sdpOffer.trim().length === 0) {
          log('error', 'Empty SDP offer', { requestId });
          return new Response(
            JSON.stringify({ error: 'Empty SDP offer' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        log('info', 'Received SDP offer (plain text)', {
          requestId,
          sdpLength: sdpOffer.length
        });

        // Utiliser les valeurs par défaut
        const model = url.searchParams.get('model') || 'gpt-4o-realtime-preview-2024-10-01';
        const voice = url.searchParams.get('voice') || 'alloy';

        const sdpAnswer = await createRealtimeSession(
          sdpOffer,
          openaiApiKey,
          model,
          voice
        );

        log('info', 'Returning SDP answer to client', {
          requestId,
          sdpAnswerLength: sdpAnswer.length
        });

        return new Response(sdpAnswer, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/sdp',
          },
        });
      } else {
        log('error', 'Unsupported content type', { requestId, contentType });
        return new Response(
          JSON.stringify({
            error: 'Unsupported content type',
            details: 'Expected application/json, application/sdp, or text/plain'
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // ==========================================
    // Route non reconnue
    // ==========================================
    log('warn', 'Unknown endpoint', {
      requestId,
      method: req.method,
      path: url.pathname
    });

    return new Response(
      JSON.stringify({
        error: 'Not Found',
        details: 'Available endpoints: GET /health, POST /session',
        mode: 'webrtc-unified'
      }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    log('error', 'Fatal error', {
      requestId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
