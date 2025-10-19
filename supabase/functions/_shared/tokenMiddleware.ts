import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

export interface TokenConsumptionRequest {
  userId: string;
  edgeFunctionName: string;
  operationType: string;
  openaiModel?: string;
  openaiInputTokens?: number;
  openaiOutputTokens?: number;
  openaiCostUsd?: number;
  metadata?: Record<string, any>;
}

export interface TokenConsumptionResult {
  success: boolean;
  remainingBalance: number;
  consumed: number;
  error?: string;
  needsUpgrade?: boolean;
}

export interface TokenCheckResult {
  hasEnoughTokens: boolean;
  currentBalance: number;
  requiredTokens: number;
  isSubscribed: boolean;
  subscriptionStatus?: string;
  error?: string;
}

const OPENAI_PRICING = {
  "gpt-4o": {
    inputCostPer1M: 2.50,
    outputCostPer1M: 10.00,
  },
  "gpt-5-mini": {
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
  },
  "gpt-4o-mini": {
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
  },
  "dall-e-3": {
    standard: 0.040,
    hd: 0.080,
  },
  "whisper-1": {
    perMinute: 0.006,
  },
  "gpt-4o-realtime-preview": {
    inputCostPer1M: 5.00,
    outputCostPer1M: 20.00,
    audioCostPer1M: 100.00,
  },
};

function calculateOpenAICost(
  model: string,
  inputTokens?: number,
  outputTokens?: number,
  audioTokens?: number
): number {
  const pricing = OPENAI_PRICING[model as keyof typeof OPENAI_PRICING];
  if (!pricing) {
    return 0;
  }

  let totalCost = 0;

  if ("inputCostPer1M" in pricing && inputTokens) {
    totalCost += (inputTokens / 1_000_000) * pricing.inputCostPer1M;
  }

  if ("outputCostPer1M" in pricing && outputTokens) {
    totalCost += (outputTokens / 1_000_000) * pricing.outputCostPer1M;
  }

  if ("audioCostPer1M" in pricing && audioTokens) {
    totalCost += (audioTokens / 1_000_000) * pricing.audioCostPer1M;
  }

  return totalCost;
}

function convertUsdToTokens(usdAmount: number): number {
  const TOKEN_USD_RATE = 0.001;
  return Math.ceil(usdAmount / TOKEN_USD_RATE);
}

export async function checkTokenBalance(
  supabase: SupabaseClient,
  userId: string,
  requiredTokens: number
): Promise<TokenCheckResult> {
  try {
    const { data: balance, error: balanceError } = await supabase
      .from("user_token_balance")
      .select("balance, user_id")
      .eq("user_id", userId)
      .single();

    if (balanceError) {
      if (balanceError.code === "PGRST116") {
        const { error: insertError } = await supabase
          .from("user_token_balance")
          .insert({
            user_id: userId,
            balance: 0,
            last_reset_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error("Failed to create token balance:", insertError);
          return {
            hasEnoughTokens: false,
            currentBalance: 0,
            requiredTokens,
            isSubscribed: false,
            error: "Failed to initialize token balance",
          };
        }

        return {
          hasEnoughTokens: false,
          currentBalance: 0,
          requiredTokens,
          isSubscribed: false,
        };
      }

      console.error("Error fetching token balance:", balanceError);
      return {
        hasEnoughTokens: false,
        currentBalance: 0,
        requiredTokens,
        isSubscribed: false,
        error: balanceError.message,
      };
    }

    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("status, stripe_subscription_id")
      .eq("user_id", userId)
      .single();

    const isSubscribed = subscription?.status === "active";
    const hasEnoughTokens = balance.balance >= requiredTokens;

    return {
      hasEnoughTokens,
      currentBalance: balance.balance,
      requiredTokens,
      isSubscribed,
      subscriptionStatus: subscription?.status,
    };
  } catch (error) {
    console.error("Unexpected error in checkTokenBalance:", error);
    return {
      hasEnoughTokens: false,
      currentBalance: 0,
      requiredTokens,
      isSubscribed: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function consumeTokens(
  supabase: SupabaseClient,
  request: TokenConsumptionRequest
): Promise<TokenConsumptionResult> {
  try {
    let tokensToConsume = 0;
    let actualCostUsd = request.openaiCostUsd || 0;

    if (request.openaiModel && (request.openaiInputTokens || request.openaiOutputTokens)) {
      actualCostUsd = calculateOpenAICost(
        request.openaiModel,
        request.openaiInputTokens,
        request.openaiOutputTokens
      );
      tokensToConsume = convertUsdToTokens(actualCostUsd);
    } else if (request.openaiCostUsd) {
      tokensToConsume = convertUsdToTokens(request.openaiCostUsd);
    } else {
      const estimatedCosts: Record<string, number> = {
        "image-generation": 80,
        "audio-transcription": 10,
        "voice-realtime": 100,
        "chat-completion": 20,
        "body-scan-analysis": 150,
        "meal-analysis": 100,
        "training-analysis": 120,
      };

      tokensToConsume = estimatedCosts[request.operationType] || 50;
    }

    const checkResult = await checkTokenBalance(supabase, request.userId, tokensToConsume);

    if (!checkResult.hasEnoughTokens) {
      return {
        success: false,
        remainingBalance: checkResult.currentBalance,
        consumed: 0,
        error: "Insufficient tokens",
        needsUpgrade: !checkResult.isSubscribed,
      };
    }

    const { data, error } = await supabase.rpc("consume_tokens", {
      p_user_id: request.userId,
      p_token_amount: tokensToConsume,
      p_edge_function_name: request.edgeFunctionName,
      p_operation_type: request.operationType,
      p_openai_model: request.openaiModel || null,
      p_openai_input_tokens: request.openaiInputTokens || null,
      p_openai_output_tokens: request.openaiOutputTokens || null,
      p_openai_cost_usd: actualCostUsd || null,
      p_metadata: request.metadata || {},
    });

    if (error) {
      console.error("Error consuming tokens:", error);
      return {
        success: false,
        remainingBalance: checkResult.currentBalance,
        consumed: 0,
        error: error.message,
      };
    }

    return {
      success: data.success,
      remainingBalance: data.new_balance,
      consumed: tokensToConsume,
    };
  } catch (error) {
    console.error("Unexpected error in consumeTokens:", error);
    return {
      success: false,
      remainingBalance: 0,
      consumed: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function addTokens(
  supabase: SupabaseClient,
  userId: string,
  amount: number,
  source: string,
  metadata: Record<string, any> = {}
): Promise<TokenConsumptionResult> {
  try {
    const { data, error } = await supabase.rpc("add_tokens", {
      p_user_id: userId,
      p_token_amount: amount,
      p_source: source,
      p_metadata: metadata,
    });

    if (error) {
      console.error("Error adding tokens:", error);
      return {
        success: false,
        remainingBalance: 0,
        consumed: 0,
        error: error.message,
      };
    }

    return {
      success: data.success,
      remainingBalance: data.new_balance,
      consumed: 0,
    };
  } catch (error) {
    console.error("Unexpected error in addTokens:", error);
    return {
      success: false,
      remainingBalance: 0,
      consumed: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export function createInsufficientTokensResponse(
  balance: number,
  required: number,
  needsUpgrade: boolean,
  corsHeaders: Record<string, string>
): Response {
  return new Response(
    JSON.stringify({
      error: "Insufficient tokens",
      code: "INSUFFICIENT_TOKENS",
      details: {
        currentBalance: balance,
        requiredTokens: required,
        needsUpgrade,
        message: needsUpgrade
          ? "You need a subscription to continue using AI features."
          : "You have run out of tokens. Please purchase more tokens or upgrade your subscription.",
      },
    }),
    {
      status: 402,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

export async function withTokenConsumption<T>(
  supabase: SupabaseClient,
  userId: string,
  edgeFunctionName: string,
  operationType: string,
  corsHeaders: Record<string, string>,
  operation: () => Promise<T>,
  options?: {
    openaiModel?: string;
    openaiInputTokens?: number;
    openaiOutputTokens?: number;
    metadata?: Record<string, any>;
  }
): Promise<Response | T> {
  const estimatedTokens = options?.openaiInputTokens && options?.openaiOutputTokens
    ? convertUsdToTokens(
        calculateOpenAICost(
          options.openaiModel || "gpt-5-mini",
          options.openaiInputTokens,
          options.openaiOutputTokens
        )
      )
    : 50;

  const checkResult = await checkTokenBalance(supabase, userId, estimatedTokens);

  if (!checkResult.hasEnoughTokens) {
    return createInsufficientTokensResponse(
      checkResult.currentBalance,
      estimatedTokens,
      !checkResult.isSubscribed,
      corsHeaders
    );
  }

  const result = await operation();

  await consumeTokens(supabase, {
    userId,
    edgeFunctionName,
    operationType,
    openaiModel: options?.openaiModel,
    openaiInputTokens: options?.openaiInputTokens,
    openaiOutputTokens: options?.openaiOutputTokens,
    metadata: options?.metadata,
  });

  return result;
}
