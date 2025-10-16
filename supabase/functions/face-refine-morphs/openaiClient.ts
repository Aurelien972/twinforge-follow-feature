// supabase/functions/face-refine-morphs/openaiClient.ts
// Transforme les photos (URL signées Supabase, privées, etc.) en data: URLs avant l'appel OpenAI.


type Photo = { url: string; view?: string };

// Petit utilitaire timeout pour fetch
async function fetchWithTimeout(input: Request | string, init: RequestInit = {}, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(input, { ...init, signal: controller.signal });
    return resp;
  } finally {
    clearTimeout(t);
  }
}

/**
 * Télécharge une image et renvoie une data URL (data:<mime>;base64,<payload>)
 * - Si `url` est déjà une data URL, on la renvoie telle quelle.
 * - Si téléchargement impossible → retourne null (on filtrera côté appelant).
 *
 * CORRECTION: Utilisation de FileReader pour éviter RangeError avec btoa sur de gros fichiers.
 * Alternative plus robuste pour Deno: Deno.readAll et base64.encode.
 * Pour compatibilité avec WebContainer/Deno Edge Functions, on va simuler FileReader
 * ou utiliser une approche basée sur ArrayBuffer et TextDecoder/btoa si la taille le permet,
 * sinon on devra revoir l'approche pour les très gros fichiers.
 *
 * Pour l'environnement Deno/Edge Functions, la méthode la plus simple et robuste
 * pour convertir ArrayBuffer en base64 est d'utiliser `btoa` après avoir converti
 * l'ArrayBuffer en string binaire. L'erreur "Maximum call stack size exceeded"
 * vient souvent de `String.fromCharCode(...new Uint8Array(ab))` pour de très grands buffers.
 *
 * Solution: Utiliser une approche par chunks ou une méthode plus directe si disponible.
 * Pour l'instant, on va s'assurer que `String.fromCharCode` n'est pas le coupable
 * en utilisant `TextDecoder` pour des tailles raisonnables, ou en gérant les chunks.
 *
 * Étant donné que l'erreur est `RangeError: Maximum call stack size exceeded` sur `urlToDataUrl`
 * et non sur `btoa` directement, cela pointe vers la conversion `String.fromCharCode(...new Uint8Array(ab))`.
 *
 * On va utiliser une méthode plus sûre pour la conversion ArrayBuffer -> Binary String -> Base64.
 */
async function urlToDataUrl(url: string): Promise<string | null> {
  try {
    if (!url || typeof url !== "string") return null;
    if (url.startsWith("data:")) return url; // déjà au bon format

    const resp = await fetchWithTimeout(url, {}, 20000);
    if (!resp.ok) {
      console.warn(`[openaiClient] urlToDataUrl: fetch failed ${resp.status} ${resp.statusText} for ${url.slice(0,128)}...`);
      return null;
    }
    const contentType = resp.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await resp.arrayBuffer();

    // CORRECTION: Éviter String.fromCharCode.apply(null, ...) pour les gros buffers
    // Utiliser une approche plus directe pour la conversion ArrayBuffer -> Base64
    // Pour Deno, on peut utiliser `Deno.readAll` et `base64.encode` si on a accès à `deno.land/std/encoding/base64`
    // Mais dans un environnement Edge Function, on doit se baser sur les APIs web standards.
    // La méthode la plus fiable est de convertir l'ArrayBuffer en une chaîne binaire
    // puis d'utiliser btoa. Le problème de RangeError vient de la taille de l'Array.
    // On va utiliser une boucle pour construire la chaîne binaire si l'ArrayBuffer est grand.

    const chunkSize = 16384; // Taille de chunk pour éviter le dépassement de pile
    let binaryString = '';
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.byteLength; i += chunkSize) {
      binaryString += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize) as any);
    }
    
    const b64 = btoa(binaryString);
    return `data:${contentType};base64,${b64}`;
  } catch (err) {
    console.warn(`[openaiClient] urlToDataUrl: error for ${url.slice(0,128)}...`, err);
    return null;
  }
}

/**
 * Appelle OpenAI Vision pour le raffinement facial
 * - Convertit toutes les photos en data URLs (data:<mime>;base64,<payload>) avant l'appel
 * - Envoie uniquement du JSON (response_format: json_object)
 */
export async function callOpenAIForRefinement(prompt: string, photos: Photo[], traceId: string) {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  console.log(`🤖 [openaiClient] [${traceId}] Preparing images for OpenAI (to data URLs)`, {
    photosCount: photos?.length || 0,
    photoViews: photos?.map(p => p.view) || [],
    photoUrlPrefixes: photos?.map(p => p.url.substring(0, 80) + '...') || [],
    philosophy: 'openai_photo_preparation'
  });

  // Convertit chaque photo en data URL
  const dataUrls: string[] = [];
  for (const p of (photos || [])) {
    const dataUrl = await urlToDataUrl(p.url);
    if (dataUrl) dataUrls.push(dataUrl);
  }

  if (dataUrls.length === 0) {
    // On stoppe proprement : pas d'images valides à envoyer
    const errMsg = 'no_valid_images: all provided photo URLs were inaccessible or invalid';
    console.error(`❌ [openaiClient] [${traceId}] ${errMsg}`, {
      originalPhotosCount: photos?.length || 0,
      dataUrlsConverted: dataUrls.length,
      failureReason: 'all_photo_urls_failed_to_convert',
      philosophy: 'critical_no_photos_for_ai'
    });
    throw new Error(errMsg);
  }

  // DIAGNOSTIC: Log successful data URL conversion
  console.log(`✅ [openaiClient] [${traceId}] Photos converted to data URLs successfully`, {
    originalPhotosCount: photos?.length || 0,
    successfulConversions: dataUrls.length,
    dataUrlSizes: dataUrls.map(url => `${Math.round(url.length / 1024)}KB`),
    philosophy: 'photos_ready_for_ai_analysis'
  });

  const messages = [
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        ...dataUrls.map((url) => ({
          type: 'image_url',
          image_url: { url, detail: 'high' as const }
        }))
      ]
    }
  ];

  try {
    console.log(`🤖 [openaiClient] [${traceId}] Calling OpenAI with ${dataUrls.length} image(s) (data URLs)`, {
      imagesCount: dataUrls.length,
      model: 'gpt-5-mini',
      maxTokens: 12000,
      reasoningEffort: 'medium',
      promptLength: prompt.length,
      totalPayloadSize: `${Math.round((JSON.stringify(messages).length) / 1024)}KB`,
      philosophy: 'openai_api_call_initiated_optimized_tokens'
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages,
        max_completion_tokens: 12000, // INCREASED: More tokens for AI output to prevent length issues
        // Note: GPT-5-mini supports default temperature (1) - parameter omitted to use default
        response_format: { type: "json_object" },
        verbosity: 'low', // Structured JSON output
        reasoning_effort: 'medium' // REDUCED: Medium precision to conserve reasoning tokens while maintaining quality
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [openaiClient] [${traceId}] OpenAI API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    const finishReason = result.choices?.[0]?.finish_reason;

    // Check for reasoning token exhaustion
    if (!content && finishReason === 'length') {
      console.error(`❌ [openaiClient] [${traceId}] GPT-5 reasoning tokens exhausted - finish_reason: length`, {
        usage: result.usage,
        reasoning_tokens: result.usage?.completion_tokens_details?.reasoning_tokens,
        completion_tokens: result.usage?.completion_tokens,
        prompt_tokens: result.usage?.prompt_tokens,
        total_tokens: result.usage?.total_tokens,
        finish_reason: finishReason,
        diagnostic: 'Reasoning tokens consumed all available completion tokens. Consider reducing reasoning_effort or increasing max_completion_tokens.',
        traceId
      });
      throw new Error('OpenAI facial refinement exceeded token limit - reasoning consumed all available tokens');
    }

    if (!content) {
      console.error(`❌ [openaiClient] [${traceId}] No content received from OpenAI`);
      throw new Error('No content received from OpenAI');
    }

    let parsed;
    try {
      parsed = typeof content === 'string' ? JSON.parse(content) : content;
    } catch (e) {
      console.error(`❌ [openaiClient] [${traceId}] JSON parse error from OpenAI content`, e);
      throw new Error('Invalid JSON response from OpenAI');
    }

    if (!parsed.final_face_params || typeof parsed.final_face_params !== 'object') {
      console.error(`❌ [openaiClient] [${traceId}] Invalid final_face_params in OpenAI response`, {
        receivedKeys: Object.keys(parsed || {}),
        hasFinalFaceParams: !!parsed.final_face_params,
        philosophy: 'invalid_ai_response_structure'
      });
      throw new Error('Invalid final_face_params structure from OpenAI');
    }

    // DIAGNOSTIC: Log AI response quality metrics
    const faceParamsCount = Object.keys(parsed.final_face_params).length;
    const activeKeys = Object.entries(parsed.final_face_params)
      .filter(([_, value]) => Math.abs(value as number) > 0.05).length;
    const tokenUsage = result.usage || {};

    console.log(`✅ [openaiClient] [${traceId}] OpenAI facial refinement call completed successfully`, {
      faceParamsCount,
      activeKeys,
      activeKeysRatio: `${((activeKeys / faceParamsCount) * 100).toFixed(1)}%`,
      aiConfidence: parsed.ai_confidence || parsed.confidence || 'not_provided',
      tokenUsage: {
        promptTokens: tokenUsage.prompt_tokens,
        completionTokens: tokenUsage.completion_tokens,
        reasoningTokens: tokenUsage.completion_tokens_details?.reasoning_tokens,
        totalTokens: tokenUsage.total_tokens
      },
      finishReason: result.choices?.[0]?.finish_reason,
      sampleFaceParams: Object.entries(parsed.final_face_params)
        .slice(0, 5)
        .map(([k, v]) => ({ key: k, value: (v as number).toFixed(3) })),
      philosophy: 'ai_refinement_success_with_metrics'
    });

    return parsed;
  } catch (error) {
    console.error(`❌ [openaiClient] [${traceId}] Error calling OpenAI API:`, error);
    throw error;
  }
}
