/**
 * Hook pour gérer Apple Health dans l'interface
 */

import { useState, useEffect, useCallback } from 'react';
import { appleHealthService } from '../system/services/appleHealthService';
import { useUserStore } from '../system/store/userStore';
import logger from '../lib/utils/logger';

export interface UseAppleHealthReturn {
  isAvailable: boolean;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  requestPermissions: () => Promise<boolean>;
  syncData: (days?: number) => Promise<{ success: boolean; recordsStored: number }>;
  checkConnection: () => Promise<void>;
}

export function useAppleHealth(): UseAppleHealthReturn {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    checkAvailability();
  }, []);

  useEffect(() => {
    if (user) {
      checkConnection();
    }
  }, [user]);

  const checkAvailability = async () => {
    try {
      const available = await appleHealthService.isAvailable();
      setIsAvailable(available);
      logger.info('APPLE_HEALTH_HOOK', 'Availability checked', { available });
    } catch (err) {
      logger.error('APPLE_HEALTH_HOOK', 'Error checking availability', { error: err });
      setError('Impossible de vérifier la disponibilité d\'Apple Health');
    } finally {
      setIsLoading(false);
    }
  };

  const checkConnection = useCallback(async () => {
    if (!user) {
      setIsConnected(false);
      return;
    }

    try {
      const { supabase } = await import('../system/supabase/client');

      const { data, error: fetchError } = await supabase
        .from('connected_devices')
        .select('status')
        .eq('user_id', user.id)
        .eq('provider', 'apple_health')
        .maybeSingle();

      if (fetchError) {
        logger.error('APPLE_HEALTH_HOOK', 'Error checking connection', {
          error: fetchError,
        });
        setIsConnected(false);
        return;
      }

      setIsConnected(data?.status === 'connected');
      logger.info('APPLE_HEALTH_HOOK', 'Connection checked', {
        connected: data?.status === 'connected',
      });
    } catch (err) {
      logger.error('APPLE_HEALTH_HOOK', 'Error checking connection', { error: err });
      setIsConnected(false);
    }
  }, [user]);

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      logger.info('APPLE_HEALTH_HOOK', 'Requesting permissions');
      const granted = await appleHealthService.requestPermissions();

      if (granted) {
        setIsConnected(true);
        logger.info('APPLE_HEALTH_HOOK', 'Permissions granted');
      } else {
        setError('Permissions refusées. Activez l\'accès dans Réglages > Santé.');
        logger.warn('APPLE_HEALTH_HOOK', 'Permissions denied');
      }

      return granted;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors de la demande de permissions';
      setError(errorMessage);
      logger.error('APPLE_HEALTH_HOOK', 'Error requesting permissions', { error: err });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const syncData = useCallback(
    async (days: number = 7): Promise<{ success: boolean; recordsStored: number }> => {
      setIsLoading(true);
      setError(null);

      try {
        logger.info('APPLE_HEALTH_HOOK', 'Starting sync', { days });

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const result = await appleHealthService.syncAllData({
          startDate,
        });

        if (result.success) {
          logger.info('APPLE_HEALTH_HOOK', 'Sync completed', {
            recordsStored: result.recordsStored,
          });
        } else {
          setError('Erreur lors de la synchronisation des données');
          logger.error('APPLE_HEALTH_HOOK', 'Sync failed');
        }

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erreur lors de la synchronisation';
        setError(errorMessage);
        logger.error('APPLE_HEALTH_HOOK', 'Error syncing data', { error: err });
        return { success: false, recordsStored: 0 };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isAvailable,
    isConnected,
    isLoading,
    error,
    requestPermissions,
    syncData,
    checkConnection,
  };
}
