# Token Middleware Integration Guide

This guide explains how to integrate token consumption into Edge Functions.

## Overview

The token middleware provides:
- Pre-execution token balance checking
- Post-execution token consumption with accurate OpenAI costs
- Automatic error handling for insufficient tokens
- Transaction logging for all token operations

## Step-by-Step Integration

### 1. Import Required Modules

Add these imports at the top of your Edge Function:

```typescript
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  checkTokenBalance,
  consumeTokens,
  createInsufficientTokensResponse
} from "../_shared/tokenMiddleware.ts";
```

### 2. Add Environment Variables

```typescript
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
```

### 3. Authenticate User

Before processing the request:

```typescript
const authHeader = req.headers.get("Authorization");
if (!authHeader) {
  return new Response(JSON.stringify({ error: "Missing authorization header" }), {
    status: 401,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const { data: { user }, error: authError } = await supabase.auth.getUser(
  authHeader.replace("Bearer ", "")
);

if (authError || !user) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
```

### 4. Check Token Balance (Pre-execution)

Before calling OpenAI or performing expensive operations:

```typescript
// Estimate required tokens (20-200 depending on operation)
const estimatedTokens = 50; // Adjust based on operation type

const tokenCheck = await checkTokenBalance(supabase, user.id, estimatedTokens);
if (!tokenCheck.hasEnoughTokens) {
  return createInsufficientTokensResponse(
    tokenCheck.currentBalance,
    estimatedTokens,
    !tokenCheck.isSubscribed,
    corsHeaders
  );
}
```

### 5. Consume Tokens (Post-execution)

After receiving the OpenAI response:

```typescript
const consumptionResult = await consumeTokens(supabase, {
  userId: user.id,
  edgeFunctionName: 'your-function-name', // e.g., 'meal-analyzer'
  operationType: 'operation-type', // e.g., 'meal-analysis'
  openaiModel: 'gpt-5-mini', // or 'gpt-4o', 'dall-e-3', etc.
  openaiInputTokens: response.usage?.prompt_tokens,
  openaiOutputTokens: response.usage?.completion_tokens,
  metadata: {
    // Any relevant context
    requestId,
    imageCount: 3,
    // etc.
  }
});
```

### 6. Include Token Balance in Response

```typescript
return new Response(
  JSON.stringify({
    // ... your existing response data
    tokenBalance: consumptionResult.remainingBalance
  }),
  {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  }
);
```

## Operation Types and Estimated Costs

Use these operation types and estimated token costs:

| Operation Type | Estimated Tokens | Edge Function Examples |
|----------------|------------------|------------------------|
| `chat-completion` | 20 | chat-ai |
| `image-generation` | 80 | image-generator, generate-training-illustration |
| `audio-transcription` | 10 | audio-transcribe, activity-transcriber |
| `voice-realtime` | 100 | voice-coach-realtime |
| `body-scan-analysis` | 150 | scan-estimate, scan-semantic, scan-refine-morphs |
| `meal-analysis` | 100 | meal-analyzer, fridge-scan-vision |
| `training-analysis` | 120 | activity-analyzer |
| `recipe-generation` | 80 | recipe-generator, meal-plan-generator |
| `insight-generation` | 60 | generate-morph-insights, nutrition-trend-analysis |

## Complete Example

See `/supabase/functions/chat-ai/index.ts` for a complete working example with:
- Authentication
- Token checking
- OpenAI API call
- Token consumption
- Error handling
- Response with token balance

## Functions to Integrate

Apply this pattern to these Edge Functions:

### High Priority (Direct OpenAI Calls)
- [ ] activity-analyzer
- [ ] activity-progress-generator
- [ ] activity-transcriber
- [ ] audio-transcribe
- [ ] chat-ai ✅ (completed)
- [ ] daily-nutrition-summary
- [ ] detect-equipment
- [ ] fasting-insights-generator
- [ ] fasting-progression-analyzer
- [ ] fridge-scan-vision
- [ ] generate-morph-insights
- [ ] generate-training-illustration
- [ ] generate-voice-preview
- [ ] image-generator
- [ ] inventory-complementer
- [ ] inventory-processor
- [ ] meal-analyzer
- [ ] meal-plan-generator
- [ ] nutrition-trend-analysis
- [ ] recipe-detail-generator
- [ ] recipe-generator
- [ ] scan-commit (uses multiple AI calls)
- [ ] scan-estimate
- [ ] scan-match
- [ ] scan-refine-morphs
- [ ] scan-semantic
- [ ] shopping-list-generator
- [ ] voice-coach-realtime

### Medium Priority (Indirect or Batch Operations)
- [ ] process-detection-jobs
- [ ] scan-latest
- [ ] sync-wearable-goals
- [ ] wearable-sync

### Low Priority (Non-AI Functions)
- [ ] morphology-mapping (fallback only, may not need tokens)
- [ ] wearable-oauth-callback (no AI)

## Notes

1. **Streaming Responses**: For streaming OpenAI responses, consume tokens after the stream completes
2. **Batch Operations**: For functions that make multiple AI calls, accumulate total tokens and consume once at the end
3. **Error Handling**: Always wrap token consumption in try-catch to prevent failures from blocking the main operation
4. **Free Tier Limit**: Users without subscriptions get $0.10 worth of tokens (100 tokens) for trial
5. **Subscription Status**: Token balance is checked, and response includes whether user needs to upgrade

## Testing

After integration, test:
1. ✅ Function works normally with sufficient tokens
2. ✅ Returns 402 error when insufficient tokens
3. ✅ Correctly logs token consumption to `token_transactions` table
4. ✅ Updates `user_token_balance` correctly
5. ✅ Returns current balance in response
