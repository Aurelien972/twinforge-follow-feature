/**
 * Voice Coach Realtime API - WebRTC Interface
 *
 * Endpoints:
 * - POST /session : Crée une session WebRTC avec OpenAI Realtime API
 * - GET /health : Health check et diagnostics
 *
 * Architecture:
 * - Le client envoie son SDP offer via POST /session
 * - Le serveur fait un POST vers OpenAI /v1/realtime avec le SDP brut
 * - OpenAI retourne un SDP answer
 * - Le serveur retourne ce SDP au client
 * - WebRTC peer-to-peer connection automatique entre client et OpenAI
 *
 * Format de requête vers OpenAI:
 * - Endpoint: https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17
 * - Method: POST
 * - Content-Type: application/sdp
 * - Body: SDP offer brut (pas de JSON, pas de FormData)
 * - Header: Authorization: Bearer <OPENAI_API_KEY>
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
 * - La clé API doit avoir accès à l'API Realtime d'OpenAI
 * - Utilise /v1/realtime (pas /v1/realtime/calls) pour éviter les erreurs 400
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_REALTIME_API = 'https://api.openai.com/v1/realtime';

// Updated model - using cost-efficient gpt-realtime-mini
const DEFAULT_MODEL = 'gpt-realtime-mini';
const FALLBACK_MODEL = 'gpt-realtime-mini-2025-10-06';

// Structured logging helper with enhanced context
function log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    service: 'voice-coach-realtime',
    environment: 'production',
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

// Validation helper for API key
function validateApiKey(apiKey: string | undefined): { valid: boolean; error?: string } {
  if (!apiKey) {
    return { valid: false, error: 'OPENAI_API_KEY is not set in environment' };
  }

  if (!apiKey.startsWith('sk-')) {
    return { valid: false, error: 'OPENAI_API_KEY format is invalid (should start with sk-)' };
  }

  if (apiKey.length < 20) {
    return { valid: false, error: 'OPENAI_API_KEY appears to be too short' };
  }

  return { valid: true };
}

/**
 * Crée une session Realtime via l'interface unifiée d'OpenAI
 * Le client envoie son SDP offer, on retourne le SDP answer d'OpenAI
 */
async function createRealtimeSession(
  sdpOffer: string,
  openaiApiKey: string,
  model: string = DEFAULT_MODEL,
  voice: string = 'alloy',
  instructions?: string,
  retryCount: number = 0
): Promise<string> {
  const maxRetries = 2;

  log('info', 'Creating Realtime session via WebRTC endpoint', {
    model,
    voice,
    hasInstructions: !!instructions,
    sdpLength: sdpOffer.length,
    retryCount,
    maxRetries
  });

  // Build URL with query parameters for model
  // Using /v1/realtime instead of /v1/realtime/calls as per OpenAI community feedback
  const url = new URL(`${OPENAI_REALTIME_API}?model=${encodeURIComponent(model)}`);

  log('info', 'Sending SDP request to OpenAI', {
    url: url.toString(),
    model,
    voice,
    apiKeyPrefix: `${openaiApiKey.substring(0, 7)}...`,
    apiKeyLength: openaiApiKey.length,
    contentType: 'application/sdp'
  });

  try {
    // OpenAI Realtime API expects raw SDP in body with application/sdp Content-Type
    // NOT FormData or JSON - this is the key fix for the 400 error
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/sdp',
      },
      body: sdpOffer,
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    log('info', 'Received response from OpenAI', {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type')
    });

    if (!response.ok) {
      const errorText = await response.text();

      log('error', 'OpenAI API returned error response', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText,
        errorBodyLength: errorText.length,
        retryCount,
        willRetry: retryCount < maxRetries && response.status >= 500
      });

      // Retry logic for server errors (5xx)
      if (response.status >= 500 && retryCount < maxRetries) {
        const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        log('warn', `Retrying after ${backoffDelay}ms due to server error`, {
          status: response.status,
          retryCount: retryCount + 1,
          maxRetries
        });

        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        return createRealtimeSession(sdpOffer, openaiApiKey, model, voice, instructions, retryCount + 1);
      }

      // Parse error details if JSON
      let errorDetails = errorText;
      let errorJson: any = null;
      try {
        errorJson = JSON.parse(errorText);
        errorDetails = errorJson.error?.message || JSON.stringify(errorJson);
      } catch {
        // Not JSON, use as is
      }

      // Enhanced error logging for 400 errors with empty response
      if (response.status === 400 && (!errorDetails || errorDetails.trim().length === 0 ||
          (errorJson && (!errorJson.error?.message || errorJson.error.message === '')))) {
        log('error', 'Received 400 Bad Request with empty error details', {
          possibleCauses: [
            'Invalid SDP format',
            'Model not available for your API key',
            'Missing required parameters',
            'Endpoint incompatibility (/v1/realtime vs /v1/realtime/calls)',
            'API key lacks Realtime API access'
          ],
          recommendations: [
            'Verify OpenAI API key has Realtime API access enabled',
            'Check if model is available in your organization',
            'Ensure SDP offer is valid WebRTC format',
            'Try using /v1/realtime endpoint instead of /v1/realtime/calls'
          ],
          debugInfo: {
            url: url.toString(),
            model,
            voice,
            sdpLength: sdpOffer.length,
            sdpStart: sdpOffer.substring(0, 100)
          }
        });

        throw new Error(`OpenAI API error 400: Empty error response. This usually indicates an issue with the request format or API access. Check logs for detailed diagnostics.`);
      }

      throw new Error(`OpenAI API error ${response.status}: ${errorDetails}`);
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

      // Vérifier la clé OpenAI avec validation améliorée
      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
      const keyValidation = validateApiKey(openaiApiKey);

      if (!keyValidation.valid) {
        log('error', 'OPENAI_API_KEY validation failed', {
          requestId,
          error: keyValidation.error,
          hasKey: !!openaiApiKey,
          keyLength: openaiApiKey?.length || 0
        });
        return new Response(
          JSON.stringify({
            error: 'OpenAI API key not configured correctly',
            details: keyValidation.error,
            troubleshooting: {
              step1: 'Verify OPENAI_API_KEY is set in Supabase Dashboard > Edge Functions > Secrets',
              step2: 'Ensure the key starts with "sk-" and is a valid OpenAI API key',
              step3: 'Check that the key has access to the Realtime API in your OpenAI account',
              step4: 'Verify your OpenAI account has sufficient credits and is not rate-limited'
            }
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      log('info', 'OPENAI_API_KEY validation passed', {
        requestId,
        keyPrefix: `${openaiApiKey!.substring(0, 7)}...`,
        keyLength: openaiApiKey!.length
      });

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

        // Utiliser les valeurs par défaut avec le nouveau modèle
        const model = url.searchParams.get('model') || DEFAULT_MODEL;
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
