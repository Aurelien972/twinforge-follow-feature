/**
 * Audio Transcribe Edge Function
 * Transcrit l'audio en texte en utilisant OpenAI Whisper API
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface WhisperResponse {
  text: string;
  language?: string;
  duration?: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log("🎤 Audio Transcribe: Starting transcription request");

    // Vérifier la clé API OpenAI
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      console.error("❌ OpenAI API key not configured");
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parser le FormData
    const formData = await req.formData();
    const audioFile = formData.get("audio");

    if (!audioFile || !(audioFile instanceof File)) {
      console.error("❌ No audio file provided");
      return new Response(
        JSON.stringify({ error: "No audio file provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("📁 Audio file received:", {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size,
    });

    // Vérifier la taille du fichier (max 25MB pour Whisper)
    if (audioFile.size > 25 * 1024 * 1024) {
      console.error("❌ Audio file too large:", audioFile.size);
      return new Response(
        JSON.stringify({ error: "Audio file too large (max 25MB)" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Vérifier la taille minimale (1KB)
    if (audioFile.size < 1024) {
      console.error("❌ Audio file too small:", audioFile.size);
      return new Response(
        JSON.stringify({ error: "Audio file too small" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Préparer le FormData pour Whisper
    const whisperFormData = new FormData();
    whisperFormData.append("file", audioFile);
    whisperFormData.append("model", "whisper-1");
    whisperFormData.append("language", "fr"); // Français par défaut
    whisperFormData.append("response_format", "json");

    console.log("🚀 Sending to OpenAI Whisper API");

    // Appeler l'API Whisper
    const whisperResponse = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: whisperFormData,
      }
    );

    if (!whisperResponse.ok) {
      const errorText = await whisperResponse.text();
      console.error("❌ Whisper API error:", {
        status: whisperResponse.status,
        error: errorText,
      });
      return new Response(
        JSON.stringify({
          error: "Transcription failed",
          details: errorText,
        }),
        {
          status: whisperResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const whisperResult: WhisperResponse = await whisperResponse.json();

    console.log("✅ Transcription successful:", {
      textLength: whisperResult.text.length,
      language: whisperResult.language,
    });

    return new Response(JSON.stringify(whisperResult), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Audio Transcribe error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
