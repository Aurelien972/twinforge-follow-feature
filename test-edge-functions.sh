#!/bin/bash

# Test Edge Functions - Training AI System
# Run this script to test if Edge Functions are deployed and working

echo "🧪 Testing Edge Functions..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get project URL and anon key from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo -e "${RED}❌ .env file not found${NC}"
  exit 1
fi

if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
  echo -e "${RED}❌ VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set in .env${NC}"
  exit 1
fi

SUPABASE_URL=$VITE_SUPABASE_URL
ANON_KEY=$VITE_SUPABASE_ANON_KEY

echo -e "${YELLOW}📍 Using Supabase URL: $SUPABASE_URL${NC}"
echo ""

# Test 1: Context Collector
echo "1️⃣  Testing training-context-collector..."
CONTEXT_RESPONSE=$(curl -s -X POST "$SUPABASE_URL/functions/v1/training-context-collector" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userId": "00000000-0000-0000-0000-000000000000"}')

if echo "$CONTEXT_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Context Collector is working${NC}"
  echo "   Response: $(echo $CONTEXT_RESPONSE | jq -r '.metadata.latencyMs')ms latency"
elif echo "$CONTEXT_RESPONSE" | grep -q "Function not found"; then
  echo -e "${RED}❌ Context Collector NOT DEPLOYED${NC}"
  echo "   Run: supabase functions deploy training-context-collector"
elif echo "$CONTEXT_RESPONSE" | grep -q "OPENAI_API_KEY"; then
  echo -e "${RED}❌ OPENAI_API_KEY not configured${NC}"
  echo "   Run: supabase secrets set OPENAI_API_KEY=sk-proj-..."
else
  echo -e "${RED}❌ Context Collector error${NC}"
  echo "   Response: $CONTEXT_RESPONSE"
fi
echo ""

# Test 2: Coach Force
echo "2️⃣  Testing training-coach-force..."
COACH_RESPONSE=$(curl -s -X POST "$SUPABASE_URL/functions/v1/training-coach-force" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "00000000-0000-0000-0000-000000000000",
    "userContext": {
      "userId": "00000000-0000-0000-0000-000000000000",
      "identity": {},
      "training": {},
      "history": {"sessions": [], "totalSessions": 0, "avgRpe": 7}
    },
    "preparerContext": {
      "availableTime": 60,
      "wantsShortVersion": false,
      "locationId": "test",
      "locationName": "Home Gym",
      "locationMode": "manual",
      "availableEquipment": ["Barbell", "Dumbbells"],
      "energyLevel": 8,
      "hasFatigue": false,
      "hasPain": false
    }
  }')

if echo "$COACH_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Coach Force is working${NC}"
  echo "   Response: $(echo $COACH_RESPONSE | jq -r '.metadata.latencyMs')ms latency"
elif echo "$COACH_RESPONSE" | grep -q "Function not found"; then
  echo -e "${RED}❌ Coach Force NOT DEPLOYED${NC}"
  echo "   Run: supabase functions deploy training-coach-force"
elif echo "$COACH_RESPONSE" | grep -q "OPENAI_API_KEY"; then
  echo -e "${RED}❌ OPENAI_API_KEY not configured${NC}"
  echo "   Run: supabase secrets set OPENAI_API_KEY=sk-proj-..."
else
  echo -e "${RED}❌ Coach Force error${NC}"
  echo "   Response: $COACH_RESPONSE"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Next Steps:"
echo ""
echo "If functions are NOT DEPLOYED:"
echo "  1. supabase login"
echo "  2. supabase link --project-ref YOUR_PROJECT_REF"
echo "  3. supabase functions deploy"
echo ""
echo "If OPENAI_API_KEY is missing:"
echo "  1. supabase secrets set OPENAI_API_KEY=sk-proj-..."
echo ""
echo "To see logs:"
echo "  supabase functions logs training-context-collector --follow"
echo "  supabase functions logs training-coach-force --follow"
echo ""
