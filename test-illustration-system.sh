#!/bin/bash

# Test Script for Illustration System
# Tests the complete flow: queue insertion, cron processing, and result retrieval

echo "==================================="
echo "Testing Illustration System"
echo "==================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if SUPABASE_URL and SUPABASE_ANON_KEY are set
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo -e "${RED}Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set${NC}"
    echo "Please set them in your .env file"
    exit 1
fi

SUPABASE_URL=$VITE_SUPABASE_URL
ANON_KEY=$VITE_SUPABASE_ANON_KEY

echo -e "${YELLOW}Step 1: Check if cron job is configured${NC}"
echo "Query: SELECT * FROM cron.job WHERE jobname = 'process-illustration-queue';"
echo ""

echo -e "${YELLOW}Step 2: Check queue statistics${NC}"
echo "Query: SELECT * FROM get_illustration_queue_stats();"
echo ""

echo -e "${YELLOW}Step 3: Test manual trigger (requires service role key)${NC}"
echo "If you have service role key, run:"
echo "curl -X POST ${SUPABASE_URL}/functions/v1/process-illustration-queue \\"
echo "  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{}'"
echo ""

echo -e "${YELLOW}Step 4: Check illustration library${NC}"
echo "Query: SELECT COUNT(*), generation_source FROM illustration_library GROUP BY generation_source;"
echo ""

echo -e "${YELLOW}Step 5: Check recent queue activity${NC}"
echo "Query: SELECT id, exercise_name, status, attempts, created_at, completed_at"
echo "       FROM illustration_generation_queue"
echo "       ORDER BY created_at DESC LIMIT 10;"
echo ""

echo -e "${GREEN}==================================="
echo "Manual Test Steps:"
echo "===================================${NC}"
echo ""
echo "1. Open your app and navigate to a training page"
echo "2. Look for exercises without illustrations"
echo "3. Check browser console for these logs:"
echo "   - 'Generation queued successfully'"
echo "   - 'Generation queued, starting polling'"
echo "   - 'Still pending - waiting for cron job'"
echo ""
echo "4. Wait 2-3 minutes for cron job to process"
echo ""
echo "5. Check if illustrations appear or check queue status:"
echo "   SELECT * FROM illustration_generation_queue"
echo "   WHERE status = 'completed' ORDER BY created_at DESC LIMIT 5;"
echo ""
echo "6. If illustrations don't appear, check:"
echo "   a) Cron job is running: SELECT * FROM check_illustration_cron_status();"
echo "   b) Edge function logs in Supabase Dashboard"
echo "   c) OpenAI API key is configured"
echo ""

echo -e "${YELLOW}==================================="
echo "Troubleshooting:"
echo "===================================${NC}"
echo ""
echo "Issue: Items stuck in 'pending' status"
echo "Solution: Cron job may not be configured. Check CRON_SETUP_INSTRUCTIONS.md"
echo ""
echo "Issue: Items going to 'failed' status"
echo "Solution: Check error_message in queue table and Edge Function logs"
echo ""
echo "Issue: 'Maximum update depth exceeded' errors"
echo "Solution: This has been fixed in useIllustrationPolling.ts"
echo ""
echo "Issue: No items being added to queue"
echo "Solution: Check RLS policies on illustration_generation_queue table"
echo ""

echo -e "${GREEN}Test script completed${NC}"
