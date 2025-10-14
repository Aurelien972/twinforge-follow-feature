-- ================================================================
-- Monitoring Script for Illustration Generation Queue
-- Usage: Run these queries in Supabase SQL Editor to monitor the system
-- ================================================================

-- 1. Queue Status Overview
-- Shows how many items are in each status
SELECT
  status,
  COUNT(*) as count,
  MIN(created_at) as oldest_item,
  MAX(created_at) as newest_item
FROM illustration_generation_queue
GROUP BY status
ORDER BY
  CASE status
    WHEN 'processing' THEN 1
    WHEN 'pending' THEN 2
    WHEN 'completed' THEN 3
    WHEN 'failed' THEN 4
  END;

-- 2. Recent Queue Items (Last 20)
-- Shows the most recent items added to the queue
SELECT
  id,
  exercise_name,
  discipline,
  status,
  priority,
  attempts,
  created_at,
  updated_at,
  completed_at,
  error_message
FROM illustration_generation_queue
ORDER BY created_at DESC
LIMIT 20;

-- 3. Pending Items Waiting for Processing
-- Items that will be processed by the next cron job run
SELECT
  id,
  exercise_name,
  discipline,
  priority,
  attempts,
  max_attempts,
  created_at,
  EXTRACT(EPOCH FROM (NOW() - created_at)) / 60 as wait_time_minutes
FROM illustration_generation_queue
WHERE status = 'pending'
ORDER BY priority DESC, created_at ASC
LIMIT 10;

-- 4. Failed Items (Need Investigation)
-- Items that failed after max attempts
SELECT
  id,
  exercise_name,
  discipline,
  attempts,
  error_message,
  created_at,
  completed_at
FROM illustration_generation_queue
WHERE status = 'failed'
ORDER BY completed_at DESC
LIMIT 10;

-- 5. Processing Duration Statistics
-- Average time to generate illustrations
SELECT
  discipline,
  COUNT(*) as completed_count,
  ROUND(AVG(processing_duration_ms) / 1000, 2) as avg_seconds,
  ROUND(MIN(processing_duration_ms) / 1000, 2) as min_seconds,
  ROUND(MAX(processing_duration_ms) / 1000, 2) as max_seconds
FROM illustration_generation_queue
WHERE status = 'completed'
  AND processing_duration_ms IS NOT NULL
GROUP BY discipline
ORDER BY completed_count DESC;

-- 6. Illustration Library Statistics
-- Shows how many illustrations exist per discipline
SELECT
  discipline,
  COUNT(*) as total_illustrations,
  COUNT(CASE WHEN type = 'exercise' THEN 1 END) as exercise_count,
  COUNT(CASE WHEN type = 'session' THEN 1 END) as session_count,
  SUM(usage_count) as total_usage,
  ROUND(SUM(generation_cost_usd), 2) as total_cost_usd
FROM illustration_library
GROUP BY discipline
ORDER BY total_illustrations DESC;

-- 7. Most Used Illustrations (Top 20)
-- Popular illustrations that are frequently reused
SELECT
  id,
  exercise_name,
  discipline,
  usage_count,
  generation_source,
  quality_score,
  created_at
FROM illustration_library
WHERE type = 'exercise'
ORDER BY usage_count DESC
LIMIT 20;

-- 8. Recent Generations (Last 24 hours)
-- Illustrations generated in the last day
SELECT
  exercise_name,
  discipline,
  generation_source,
  generation_cost_usd,
  created_at
FROM illustration_library
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- 9. Cost Analysis (Last 7 days)
-- Total cost of generations in the past week
SELECT
  DATE(created_at) as date,
  COUNT(*) as generations,
  ROUND(SUM(generation_cost_usd), 2) as daily_cost_usd
FROM illustration_library
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- 10. Queue Health Check
-- Quick diagnostic to see if the system is working
SELECT
  CASE
    WHEN pending_count = 0 THEN '✅ No items waiting'
    WHEN pending_count > 0 AND pending_count < 10 THEN '⚠️ ' || pending_count || ' items waiting (normal)'
    WHEN pending_count >= 10 THEN '🔴 ' || pending_count || ' items waiting (check cron job)'
  END as queue_status,
  pending_count,
  processing_count,
  failed_count,
  completed_today
FROM (
  SELECT
    COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
    COUNT(*) FILTER (WHERE status = 'processing') as processing_count,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_count,
    COUNT(*) FILTER (WHERE status = 'completed' AND completed_at > NOW() - INTERVAL '1 day') as completed_today
  FROM illustration_generation_queue
) stats;

-- 11. Duplicate Detection
-- Find if there are duplicate exercises in the queue or library
SELECT
  exercise_name,
  discipline,
  COUNT(*) as duplicate_count
FROM illustration_library
WHERE exercise_name IS NOT NULL
GROUP BY exercise_name, discipline
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 12. Clean Up Old Completed Items (Optional - Run Manually)
-- Delete completed/failed items older than 7 days
-- UNCOMMENT TO RUN:
-- DELETE FROM illustration_generation_queue
-- WHERE status IN ('completed', 'failed')
--   AND completed_at < NOW() - INTERVAL '7 days';
