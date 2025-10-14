-- Cleanup Broken Illustration Queue Items
-- Run this after deploying the fix to remove items with invalid generation_params

-- 1. First, inspect broken items
SELECT
  id,
  type,
  discipline,
  exercise_name,
  generation_params->>'type' as params_type,
  generation_params,
  status,
  attempts,
  created_at
FROM illustration_generation_queue
WHERE generation_params->>'type' IS NULL
  AND status IN ('pending', 'processing', 'failed')
ORDER BY created_at DESC;

-- 2. Delete broken items (missing 'type' in generation_params)
DELETE FROM illustration_generation_queue
WHERE generation_params->>'type' IS NULL
  AND status IN ('pending', 'processing', 'failed');

-- 3. Verify remaining items are valid
SELECT
  id,
  type,
  discipline,
  exercise_name,
  generation_params->>'type' as params_type,
  generation_params->>'exerciseName' as params_exercise_name,
  generation_params->>'discipline' as params_discipline,
  jsonb_object_keys(generation_params) as all_keys,
  status,
  attempts,
  priority
FROM illustration_generation_queue
WHERE status = 'pending'
ORDER BY priority DESC, created_at ASC
LIMIT 20;

-- 4. Check queue health stats
SELECT
  status,
  COUNT(*) as count,
  AVG(attempts) as avg_attempts,
  MAX(attempts) as max_attempts,
  COUNT(CASE WHEN generation_params->>'type' IS NULL THEN 1 END) as broken_items,
  COUNT(CASE WHEN generation_params->>'type' IS NOT NULL THEN 1 END) as valid_items
FROM illustration_generation_queue
GROUP BY status
ORDER BY status;

-- 5. Sample of valid pending items (should all have 'type')
SELECT
  id,
  type,
  generation_params->>'type' as params_type,
  generation_params->>'exerciseName' as exercise,
  discipline,
  priority,
  attempts,
  created_at
FROM illustration_generation_queue
WHERE status = 'pending'
  AND generation_params->>'type' IS NOT NULL
ORDER BY priority DESC, created_at ASC
LIMIT 10;
