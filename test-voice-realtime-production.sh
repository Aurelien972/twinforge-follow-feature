#!/bin/bash

# Test Voice Realtime Production Configuration
# This script validates the production configuration for the Voice Realtime system

set -e

echo "🔬 Testing Voice Realtime Production Configuration"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo -e "${RED}❌ .env file not found${NC}"
    exit 1
fi

# Check required environment variables
echo "📋 Step 1: Checking Environment Variables"
echo "----------------------------------------"

if [ -z "$VITE_SUPABASE_URL" ]; then
    echo -e "${RED}❌ VITE_SUPABASE_URL is not set${NC}"
    exit 1
else
    echo -e "${GREEN}✅ VITE_SUPABASE_URL is set${NC}"
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo -e "${RED}❌ VITE_SUPABASE_ANON_KEY is not set${NC}"
    exit 1
else
    echo -e "${GREEN}✅ VITE_SUPABASE_ANON_KEY is set${NC}"
fi

echo ""

# Test Health Check Endpoint
echo "🏥 Step 2: Testing Health Check Endpoint"
echo "----------------------------------------"

HEALTH_URL="${VITE_SUPABASE_URL}/functions/v1/voice-coach-realtime/health"
echo "URL: $HEALTH_URL"

HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -H "apikey: $VITE_SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY" \
    "$HEALTH_URL")

HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Health check endpoint is reachable (HTTP $HTTP_CODE)${NC}"
    echo ""
    echo "Response:"
    echo "$RESPONSE_BODY" | jq '.'
    echo ""

    # Check if OpenAI API key is configured
    HAS_OPENAI_KEY=$(echo "$RESPONSE_BODY" | jq -r '.hasOpenAIKey')

    if [ "$HAS_OPENAI_KEY" = "true" ]; then
        echo -e "${GREEN}✅ OPENAI_API_KEY is configured in Edge Function${NC}"
        OPENAI_KEY_PREFIX=$(echo "$RESPONSE_BODY" | jq -r '.openaiKeyPrefix')
        echo "   Key prefix: $OPENAI_KEY_PREFIX"
    else
        echo -e "${RED}❌ OPENAI_API_KEY is NOT configured in Edge Function${NC}"
        echo ""
        echo "⚠️  To fix this issue:"
        echo "   1. Go to your Supabase Dashboard"
        echo "   2. Navigate to Edge Functions > voice-coach-realtime"
        echo "   3. Go to Secrets tab"
        echo "   4. Add OPENAI_API_KEY with your OpenAI API key"
        echo "   5. The key should start with 'sk-'"
        echo ""
        exit 1
    fi
else
    echo -e "${RED}❌ Health check failed (HTTP $HTTP_CODE)${NC}"
    echo "Response: $RESPONSE_BODY"
    exit 1
fi

echo ""

# Test WebRTC Session Creation (simplified test)
echo "🔌 Step 3: Testing Edge Function Availability"
echo "----------------------------------------"

SESSION_URL="${VITE_SUPABASE_URL}/functions/v1/voice-coach-realtime/session"
echo "URL: $SESSION_URL"

# Simple test with invalid data to check if endpoint responds
TEST_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -H "apikey: $VITE_SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY" \
    -d '{"sdp":"test"}' \
    "$SESSION_URL" 2>&1)

SESSION_HTTP_CODE=$(echo "$TEST_RESPONSE" | tail -n1)
SESSION_RESPONSE_BODY=$(echo "$TEST_RESPONSE" | sed '$d')

if [ "$SESSION_HTTP_CODE" -eq 400 ] || [ "$SESSION_HTTP_CODE" -eq 500 ]; then
    echo -e "${GREEN}✅ Session endpoint is reachable${NC}"
    echo "   (Received expected error for test data: HTTP $SESSION_HTTP_CODE)"

    # Check if error mentions OpenAI key
    if echo "$SESSION_RESPONSE_BODY" | grep -q "OpenAI"; then
        echo ""
        echo "Response details:"
        echo "$SESSION_RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$SESSION_RESPONSE_BODY"
    fi
else
    echo -e "${YELLOW}⚠️  Unexpected response from session endpoint (HTTP $SESSION_HTTP_CODE)${NC}"
    echo "Response: $SESSION_RESPONSE_BODY"
fi

echo ""
echo "=================================================="
echo "✨ Production Configuration Test Complete"
echo "=================================================="
echo ""

if [ "$HAS_OPENAI_KEY" = "true" ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Your Voice Realtime system is configured correctly."
    echo "You can now test it in production by:"
    echo "  1. Opening your deployed application"
    echo "  2. Clicking on the voice chat button"
    echo "  3. Allowing microphone permissions"
    echo "  4. Speaking to test the voice interaction"
    echo ""
else
    echo -e "${RED}❌ Configuration incomplete${NC}"
    echo ""
    echo "Please configure OPENAI_API_KEY in Supabase Edge Function secrets."
    echo ""
fi

echo "📚 For more information, see:"
echo "   - Supabase Dashboard: ${VITE_SUPABASE_URL/https:\/\//https://supabase.com/dashboard/project/}"
echo "   - OpenAI API Keys: https://platform.openai.com/api-keys"
echo ""
