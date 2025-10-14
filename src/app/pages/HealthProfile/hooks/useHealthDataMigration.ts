/**
 * useHealthDataMigration Hook
 * Handles automatic migration from V1 health data to V2 enriched structure
 */

import { useEffect, useState, useCallback } from 'react';
import { useUserStore } from '../../../../system/store/userStore';
import { supabase } from '../../../../system/supabase/client';
import type { HealthProfileV1, HealthProfileV2 } from '../../../../domain/health';
import { migrateHealthV1ToV2, isHealthV2 } from '../../../../domain/health';
import logger from '../../../../lib/utils/logger';

export function useHealthDataMigration() {
  const { profile, refreshProfile } = useUserStore();
  const [migrating, setMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationError, setMigrationError] = useState<Error | null>(null);

  const checkAndMigrate = useCallback(async () => {
    if (!profile?.userId) {
      logger.warn('HEALTH_MIGRATION', 'No user ID available');
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

    try {
      setMigrating(true);
      setMigrationError(null);

      logger.info('HEALTH_MIGRATION', 'Starting V1 to V2 migration', { userId: profile.userId });

      const migratedHealth: HealthProfileV2 = migrateHealthV1ToV2(currentHealth as HealthProfileV1);

      const { error: updateError } = await supabase
        .from('user_profile')
        .update({
          health: migratedHealth,
          health_schema_version: '2.0',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', profile.userId);

      if (updateError) {
        throw new Error(`Migration update failed: ${updateError.message}`);
      }

      const { error: snapshotError } = await supabase.rpc('create_health_snapshot', {
        p_user_id: profile.userId,
        p_source: 'migration_v1_to_v2',
      });

      if (snapshotError) {
        logger.warn('HEALTH_MIGRATION', 'Snapshot creation failed', { error: snapshotError.message });
      }

      await refreshProfile();

      setMigrationComplete(true);

      logger.info('HEALTH_MIGRATION', 'Migration completed successfully', { userId: profile.userId });
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown migration error');
      setMigrationError(err);
      logger.error('HEALTH_MIGRATION', 'Migration failed', {
        error: err.message,
        userId: profile.userId,
      });
    } finally {
      setMigrating(false);
    }
  }, [profile, refreshProfile]);

  useEffect(() => {
    if (!migrationComplete && !migrating && !migrationError) {
      checkAndMigrate();
    }
  }, [checkAndMigrate, migrationComplete, migrating, migrationError]);

  const retryMigration = useCallback(() => {
    setMigrationError(null);
    setMigrationComplete(false);
    checkAndMigrate();
  }, [checkAndMigrate]);

  return {
    migrating,
    migrationComplete,
    migrationError,
    retryMigration,
  };
}
