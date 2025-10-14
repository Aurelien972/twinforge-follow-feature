import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  mode: "training" | "nutrition" | "fasting" | "general" | "body-scan";
  contextData?: any;
  stream?: boolean;
}

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const { messages, mode, contextData, stream = false }: ChatRequest = await req.json();

    if (!messages || messages.length === 0) {
      throw new Error("Messages array is required");
    }

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        messages: messages,
        max_completion_tokens: 800,
        stream: stream,
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text();
      console.error("OpenAI API Error:", error);
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    if (stream) {
      return new Response(openAIResponse.body, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    const data = await openAIResponse.json();

    return new Response(
      JSON.stringify({
        message: data.choices[0].message,
        usage: data.usage,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Chat AI Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred processing your request",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
