/*
  Cleanup Script for Illustration System Duplicates

  IMPORTANT: Run this script after deploying the deduplication fixes

  This script:
  1. Removes duplicate pending/processing items from the queue
  2. Marks items as completed if their illustration already exists
  3. Reports statistics on cleaned data

  BACKUP FIRST:
  pg_dump your_database > backup_before_cleanup.sql
*/

-- ============================================================================
-- PART 1: Report current state
-- ============================================================================

DO $$
DECLARE
  total_queue_items integer;
  pending_items integer;
  processing_items integer;
  total_illustrations integer;
  duplicate_queue_count integer;
BEGIN
  -- Count queue items
  SELECT COUNT(*) INTO total_queue_items FROM illustration_generation_queue;
  SELECT COUNT(*) INTO pending_items FROM illustration_generation_queue WHERE status = 'pending';
  SELECT COUNT(*) INTO processing_items FROM illustration_generation_queue WHERE status = 'processing';

  -- Count illustrations
  SELECT COUNT(*) INTO total_illustrations FROM illustration_library;

  -- Count potential duplicates (same exercise_name + discipline + type + status)
  SELECT COUNT(*) INTO duplicate_queue_count FROM (
    SELECT exercise_name, discipline, type, status, COUNT(*) as cnt
    FROM illustration_generation_queue
    WHERE status IN ('pending', 'processing')
      AND exercise_name IS NOT NULL
    GROUP BY exercise_name, discipline, type, status
    HAVING COUNT(*) > 1
  ) duplicates;

  RAISE NOTICE '=== CURRENT STATE ===';
  RAISE NOTICE 'Total queue items: %', total_queue_items;
  RAISE NOTICE 'Pending items: %', pending_items;
  RAISE NOTICE 'Processing items: %', processing_items;
  RAISE NOTICE 'Total illustrations: %', total_illustrations;
  RAISE NOTICE 'Duplicate groups found: %', duplicate_queue_count;
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- PART 2: Remove duplicate pending/processing items
-- Keep the oldest item, delete the rest
-- ============================================================================

DO $$
DECLARE
  deleted_count integer;
BEGIN
  RAISE NOTICE '=== REMOVING DUPLICATES ===';

  -- Delete duplicate queue items (keep oldest)
  WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY exercise_name, discipline, type, status
             ORDER BY created_at ASC
           ) as rn
    FROM illustration_generation_queue
    WHERE status IN ('pending', 'processing')
      AND exercise_name IS NOT NULL
  )
  DELETE FROM illustration_generation_queue
  WHERE id IN (
    SELECT id FROM duplicates WHERE rn > 1
  );

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % duplicate queue items', deleted_count;
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- PART 3: Mark items as completed if illustration already exists
-- ============================================================================

DO $$
DECLARE
  updated_count integer;
BEGIN
  RAISE NOTICE '=== MARKING EXISTING ILLUSTRATIONS AS COMPLETED ===';

  -- Update queue items where illustration exists
  UPDATE illustration_generation_queue q
  SET
    status = 'completed',
    result_illustration_id = l.id,
    completed_at = NOW(),
    updated_at = NOW(),
    processing_duration_ms = 0
  FROM illustration_library l
  WHERE q.status IN ('pending', 'processing')
    AND q.exercise_name IS NOT NULL
    AND l.exercise_name_normalized = normalize_exercise_name(q.exercise_name)
    AND l.discipline = q.discipline
    AND l.type = q.type;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Marked % queue items as completed (illustration exists)', updated_count;
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- PART 4: Remove duplicate illustrations from library
-- Keep the one with highest usage_count or most recent
-- ============================================================================

DO $$
DECLARE
  deleted_count integer;
BEGIN
  RAISE NOTICE '=== REMOVING DUPLICATE ILLUSTRATIONS ===';

  -- Delete duplicate illustrations (keep most used or newest)
  WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY exercise_name_normalized, discipline, type
             ORDER BY usage_count DESC, created_at DESC
           ) as rn
    FROM illustration_library
    WHERE exercise_name_normalized IS NOT NULL
  )
  DELETE FROM illustration_library
  WHERE id IN (
    SELECT id FROM duplicates WHERE rn > 1
  );

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Deleted % duplicate illustrations', deleted_count;
  RAISE NOTICE '';
END $$;

-- ============================================================================
-- PART 5: Report final state
-- ============================================================================

DO $$
DECLARE
  total_queue_items integer;
  pending_items integer;
  processing_items integer;
  total_illustrations integer;
  remaining_duplicates integer;
BEGIN
  -- Count queue items
  SELECT COUNT(*) INTO total_queue_items FROM illustration_generation_queue;
  SELECT COUNT(*) INTO pending_items FROM illustration_generation_queue WHERE status = 'pending';
  SELECT COUNT(*) INTO processing_items FROM illustration_generation_queue WHERE status = 'processing';

  -- Count illustrations
  SELECT COUNT(*) INTO total_illustrations FROM illustration_library;

  -- Count remaining duplicates
  SELECT COUNT(*) INTO remaining_duplicates FROM (
    SELECT exercise_name, discipline, type, status, COUNT(*) as cnt
    FROM illustration_generation_queue
    WHERE status IN ('pending', 'processing')
      AND exercise_name IS NOT NULL
    GROUP BY exercise_name, discipline, type, status
    HAVING COUNT(*) > 1
  ) duplicates;

  RAISE NOTICE '=== FINAL STATE ===';
  RAISE NOTICE 'Total queue items: %', total_queue_items;
  RAISE NOTICE 'Pending items: %', pending_items;
  RAISE NOTICE 'Processing items: %', processing_items;
  RAISE NOTICE 'Total illustrations: %', total_illustrations;
  RAISE NOTICE 'Remaining duplicate groups: % (should be 0)', remaining_duplicates;
  RAISE NOTICE '';
  RAISE NOTICE 'Cleanup complete!';
END $$;

-- ============================================================================
-- PART 6: Verification queries
-- Run these manually to verify cleanup
-- ============================================================================

-- Check for remaining duplicates in queue
-- SELECT exercise_name, discipline, type, status, COUNT(*) as count
-- FROM illustration_generation_queue
-- WHERE status IN ('pending', 'processing')
--   AND exercise_name IS NOT NULL
-- GROUP BY exercise_name, discipline, type, status
-- HAVING COUNT(*) > 1;

-- Check for remaining duplicates in library
-- SELECT exercise_name_normalized, discipline, type, COUNT(*) as count
-- FROM illustration_library
-- WHERE exercise_name_normalized IS NOT NULL
-- GROUP BY exercise_name_normalized, discipline, type
-- HAVING COUNT(*) > 1;

-- View recent queue items
-- SELECT id, exercise_name, discipline, type, status, created_at
-- FROM illustration_generation_queue
-- ORDER BY created_at DESC
-- LIMIT 20;
