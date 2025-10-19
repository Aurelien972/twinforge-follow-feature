import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { checkTokenBalance, consumeTokens, createInsufficientTokensResponse } from "../_shared/tokenMiddleware.ts";

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
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function log(level: 'info' | 'warn' | 'error', message: string, requestId: string, data?: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'chat-ai',
    requestId,
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

Deno.serve(async (req: Request) => {
  const requestId = crypto.randomUUID();

  console.log('🚀 EDGE FUNCTION INVOKED - chat-ai', {
    requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });

  if (req.method === "OPTIONS") {
    console.log('✅ OPTIONS request handled', { requestId });
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    log('info', '📥 Chat request received', requestId, { method: req.method });

    if (!OPENAI_API_KEY) {
      log('error', '❌ OPENAI_API_KEY not configured', requestId);
      console.error('CRITICAL: OPENAI_API_KEY is missing!');
      throw new Error("OPENAI_API_KEY is not configured");
    }

    console.log('✅ OPENAI_API_KEY is configured', { requestId });

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, mode, contextData, stream = false }: ChatRequest = await req.json();

    log('info', '✅ Request parsed successfully', requestId, {
      mode,
      messageCount: messages.length,
      stream,
      lastMessageRole: messages[messages.length - 1]?.role
    });

    if (!messages || messages.length === 0) {
      log('error', 'Empty messages array', requestId);
      throw new Error("Messages array is required");
    }

    const estimatedInputTokens = messages.reduce((sum, msg) => sum + Math.ceil(msg.content.length / 4), 0);
    const estimatedOutputTokens = 200;

    const tokenCheck = await checkTokenBalance(supabase, user.id, 20);
    if (!tokenCheck.hasEnoughTokens) {
      log('warn', 'Insufficient tokens', requestId, {
        balance: tokenCheck.currentBalance,
        required: 20,
        isSubscribed: tokenCheck.isSubscribed
      });
      return createInsufficientTokensResponse(
        tokenCheck.currentBalance,
        20,
        !tokenCheck.isSubscribed,
        corsHeaders
      );
    }

    log('info', 'Calling OpenAI API', requestId, {
      model: 'gpt-5-mini',
      messageCount: messages.length,
      stream
    });

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

    log('info', 'OpenAI response received', requestId, {
      status: openAIResponse.status,
      ok: openAIResponse.ok,
      stream
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text();
      log('error', 'OpenAI API error', requestId, {
        status: openAIResponse.status,
        error
      });
      throw new Error(`OpenAI API error: ${openAIResponse.status} - ${error}`);
    }

    if (stream) {
      log('info', 'Starting SSE stream', requestId);

      let chunkCount = 0;
      const reader = openAIResponse.body?.getReader();
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      if (!reader) {
        log('error', 'No response body reader', requestId);
        throw new Error('No response body available');
      }

      const stream = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                log('info', 'Stream completed', requestId, { chunkCount });
                controller.close();
                break;
              }

              chunkCount++;
              const chunk = decoder.decode(value, { stream: true });

              if (chunkCount <= 3) {
                log('info', 'Stream chunk received', requestId, {
                  chunkNumber: chunkCount,
                  chunkLength: chunk.length,
                  preview: chunk.substring(0, 100)
                });
              }

              controller.enqueue(encoder.encode(chunk));
            }
          } catch (error) {
            log('error', 'Stream error', requestId, {
              error: error instanceof Error ? error.message : String(error),
              chunkCount
            });
            controller.error(error);
          }
        }
      });

      return new Response(stream, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "X-Request-Id": requestId,
        },
      });
    }

    const data = await openAIResponse.json();

    log('info', 'Non-stream response parsed', requestId, {
      hasMessage: !!data.choices[0]?.message,
      tokensUsed: data.usage?.total_tokens
    });

    const consumptionResult = await consumeTokens(supabase, {
      userId: user.id,
      edgeFunctionName: 'chat-ai',
      operationType: 'chat-completion',
      openaiModel: 'gpt-5-mini',
      openaiInputTokens: data.usage?.prompt_tokens || estimatedInputTokens,
      openaiOutputTokens: data.usage?.completion_tokens || estimatedOutputTokens,
      metadata: { mode, requestId }
    });

    log('info', 'Tokens consumed', requestId, {
      consumed: consumptionResult.consumed,
      remaining: consumptionResult.remainingBalance
    });

    return new Response(
      JSON.stringify({
        message: data.choices[0].message,
        usage: data.usage,
        requestId,
        tokenBalance: consumptionResult.remainingBalance
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
        },
      }
    );
  } catch (error) {
    log('error', 'Fatal error', requestId, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred processing your request",
        requestId
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
        },
      }
    );
  }
});
