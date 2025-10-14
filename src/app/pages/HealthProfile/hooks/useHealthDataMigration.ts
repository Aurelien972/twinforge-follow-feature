/**
 * useHealthDataMigration Hook
 * Handles automatic migration from V1 health data to V2 enriched structure
 * with retry limit and degraded mode support
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useUserStore } from '../../../../system/store/userStore';
import { supabase } from '../../../../system/supabase/client';
import type { HealthProfileV1, HealthProfileV2 } from '../../../../domain/health';
import { migrateHealthV1ToV2, isHealthV2 } from '../../../../domain/health';
import logger from '../../../../lib/utils/logger';

const MAX_MIGRATION_ATTEMPTS = 3;
const MIGRATION_SKIPPED_KEY = 'health_migration_skipped';

export function useHealthDataMigration() {
  const { profile, setProfile } = useUserStore();
  const [migrating, setMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationError, setMigrationError] = useState<Error | null>(null);
  const [canSkip, setCanSkip] = useState(false);
  const attemptCountRef = useRef(0);
  const migrationAttemptedRef = useRef(false);

  const checkAndMigrate = useCallback(async () => {
    if (!profile?.userId) {
      logger.warn('HEALTH_MIGRATION', 'No user ID available');
      return;
    }

    // Check if migration was previously skipped
    const migrationSkipped = localStorage.getItem(MIGRATION_SKIPPED_KEY);
    if (migrationSkipped === profile.userId) {
      logger.info('HEALTH_MIGRATION', 'Migration previously skipped by user');
      setMigrationComplete(true);
      return;
    }

    // Prevent multiple simultaneous migration attempts
    if (migrationAttemptedRef.current) {
      logger.warn('HEALTH_MIGRATION', 'Migration already in progress');
      return;
    }

    const currentHealth = (profile as any).health;

    if (!currentHealth) {
      logger.info('HEALTH_MIGRATION', 'No existing health data, starting with V2');
      setMigrationComplete(true);
      return;
    }

    if (isHealthV2(currentHealth)) {
      logger.info('HEALTH_MIGRATION', 'Already V2, no migration needed');
      setMigrationComplete(true);
      return;
    }

    // Check retry limit
    if (attemptCountRef.current >= MAX_MIGRATION_ATTEMPTS) {
      logger.warn('HEALTH_MIGRATION', 'Max migration attempts reached, enabling skip option');
      setCanSkip(true);
      setMigrationError(new Error('La migration a échoué après plusieurs tentatives. Vous pouvez continuer sans migrer.'));
      return;
    }

    try {
      migrationAttemptedRef.current = true;
      attemptCountRef.current += 1;
      setMigrating(true);
      setMigrationError(null);

      logger.info('HEALTH_MIGRATION', 'Starting V1 to V2 migration', {
        userId: profile.userId,
        attempt: attemptCountRef.current,
        maxAttempts: MAX_MIGRATION_ATTEMPTS
      });

      const migratedHealth: HealthProfileV2 = migrateHealthV1ToV2(currentHealth as HealthProfileV1);

      const { data: updateData, error: updateError } = await supabase
        .from('user_profile')
        .update({
          health: migratedHealth,
          health_schema_version: '2.0',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', profile.userId)
        .select();

      if (updateError) {
        logger.error('HEALTH_MIGRATION', 'Database update failed with detailed error', {
          errorMessage: updateError.message,
          errorCode: updateError.code,
          errorDetails: updateError.details,
          errorHint: updateError.hint,
          userId: profile.userId,
          attempt: attemptCountRef.current,
        });
        throw new Error(`Migration update failed: ${updateError.message} (Code: ${updateError.code})`);
      }

      logger.info('HEALTH_MIGRATION', 'Database update successful', {
        userId: profile.userId,
        hasUpdateData: !!updateData,
      });

      // Try to create snapshot, but don't fail migration if it doesn't work
      try {
        const { error: snapshotError } = await supabase.rpc('create_health_snapshot', {
          p_user_id: profile.userId,
          p_source: 'migration_v1_to_v2',
        });

        if (snapshotError) {
          logger.warn('HEALTH_MIGRATION', 'Snapshot creation failed (non-critical)', {
            error: snapshotError.message,
            code: snapshotError.code,
          });
        } else {
          logger.info('HEALTH_MIGRATION', 'Health snapshot created successfully');
        }
      } catch (snapshotError) {
        logger.warn('HEALTH_MIGRATION', 'Snapshot creation exception (non-critical)', {
          error: snapshotError instanceof Error ? snapshotError.message : 'Unknown error',
        });
      }

      // Update local profile state directly instead of refreshing to avoid race conditions
      setProfile({
        health: migratedHealth,
        health_schema_version: '2.0',
      });

      setMigrationComplete(true);
      attemptCountRef.current = 0; // Reset on success

      logger.info('HEALTH_MIGRATION', 'Migration completed successfully', { userId: profile.userId });
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown migration error');
      setMigrationError(err);
      logger.error('HEALTH_MIGRATION', 'Migration failed', {
        error: err.message,
        stack: err.stack,
        userId: profile.userId,
        attempt: attemptCountRef.current,
        maxAttempts: MAX_MIGRATION_ATTEMPTS,
        willRetry: attemptCountRef.current < MAX_MIGRATION_ATTEMPTS,
      });

      // Enable skip option if max attempts reached
      if (attemptCountRef.current >= MAX_MIGRATION_ATTEMPTS) {
        setCanSkip(true);
      }
    } finally {
      setMigrating(false);
      migrationAttemptedRef.current = false;
    }
  }, [profile, setProfile]);

  useEffect(() => {
    // Only attempt migration once automatically
    if (!migrationComplete && !migrating && !migrationError && attemptCountRef.current === 0) {
      checkAndMigrate();
    }
  }, [checkAndMigrate, migrationComplete, migrating, migrationError]);

  const retryMigration = useCallback(() => {
    if (attemptCountRef.current < MAX_MIGRATION_ATTEMPTS) {
      setMigrationError(null);
      setMigrationComplete(false);
      migrationAttemptedRef.current = false;
      checkAndMigrate();
    }
  }, [checkAndMigrate]);

  const skipMigration = useCallback(() => {
    if (!profile?.userId) return;

    logger.info('HEALTH_MIGRATION', 'User chose to skip migration', { userId: profile.userId });
    localStorage.setItem(MIGRATION_SKIPPED_KEY, profile.userId);
    setMigrationComplete(true);
    setMigrationError(null);
    setCanSkip(false);
  }, [profile?.userId]);

  return {
    migrating,
    migrationComplete,
    migrationError,
    retryMigration,
    skipMigration,
    canSkip,
    attemptsRemaining: Math.max(0, MAX_MIGRATION_ATTEMPTS - attemptCountRef.current),
  };
}
