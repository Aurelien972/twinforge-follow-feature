/**
 * useUnifiedActivityStats Hook
 * Hook React Query pour récupérer les statistiques unifiées
 * (sessions de training + activités manuelles)
 */

import { useQuery } from '@tanstack/react-query';
import { startOfDay, endOfDay } from 'date-fns';
import { trainingActivitySyncService } from '../system/services/trainingActivitySyncService';
import type { UnifiedActivityStats } from '../system/services/trainingActivitySyncService';
import { useUserStore } from '../system/store/userStore';

export interface UseUnifiedActivityStatsOptions {
  startDate?: Date;
  endDate?: Date;
  includeTraining?: boolean;
  includeManual?: boolean;
  enabled?: boolean;
}

export interface UseUnifiedActivityStatsResult {
  data: UnifiedActivityStats | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook pour récupérer les statistiques d'activité unifiées
 */
export function useUnifiedActivityStats(
  options: UseUnifiedActivityStatsOptions = {}
): UseUnifiedActivityStatsResult {
  const { session } = useUserStore();

  const {
    startDate = startOfDay(new Date()),
    endDate = endOfDay(new Date()),
    includeTraining = true,
    includeManual = true,
    enabled = true,
  } = options;

  const query = useQuery({
    queryKey: [
      'unified-activity-stats',
      session?.user?.id,
      startDate.toISOString(),
      endDate.toISOString(),
      includeTraining,
      includeManual,
    ],
    queryFn: async () => {
      return await trainingActivitySyncService.getUnifiedActivityStats(
        startDate,
        endDate,
        includeTraining,
        includeManual
      );
    },
    enabled: enabled && !!session?.user?.id,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook pour récupérer les statistiques d'aujourd'hui uniquement
 */
export function useTodayUnifiedActivityStats(
  includeTraining: boolean = true,
  includeManual: boolean = true
): UseUnifiedActivityStatsResult {
  const today = new Date();

  return useUnifiedActivityStats({
    startDate: startOfDay(today),
    endDate: endOfDay(today),
    includeTraining,
    includeManual,
  });
}

/**
 * Hook pour récupérer les statistiques de la semaine
 */
export function useWeekUnifiedActivityStats(
  includeTraining: boolean = true,
  includeManual: boolean = true
): UseUnifiedActivityStatsResult {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - 7);

  return useUnifiedActivityStats({
    startDate: startOfDay(startOfWeek),
    endDate: endOfDay(today),
    includeTraining,
    includeManual,
  });
}

/**
 * Hook pour récupérer les statistiques du mois
 */
export function useMonthUnifiedActivityStats(
  includeTraining: boolean = true,
  includeManual: boolean = true
): UseUnifiedActivityStatsResult {
  const today = new Date();
  const startOfMonth = new Date(today);
  startOfMonth.setDate(today.getDate() - 30);

  return useUnifiedActivityStats({
    startDate: startOfDay(startOfMonth),
    endDate: endOfDay(today),
    includeTraining,
    includeManual,
  });
}
