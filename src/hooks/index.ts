/**
 * Hooks Barrel Export - Enhanced with UX Optimizations
 * Centralized export for essential hooks
 */

export * from './useFeedback';
export * from './useSmartAutoSave';
export * from './useProfileAutoSave';
export * from './useFieldValidation';
export * from './useProfileTabExitGuard';
export * from './useTrainingGoals';
export * from './useCoachMessageHandlers';
export * from './useExerciseScroll';
export { usePerformanceMode } from './usePerformanceMode';
export { useLazyLoad } from './useLazyLoad';
export * from './useAnalysisProgress';
export * from './useBackgroundAnalysis';
export * from './useGenerationProgress';
export * from './useDisciplineSelector';
export * from './useHasConnectedWearable';
export * from './useWearableTracking';
export * from './useWearableSync';
export {
  useUnifiedActivityStats,
  useTodayUnifiedActivityStats,
  useWeekUnifiedActivityStats,
  useMonthUnifiedActivityStats,
} from './useUnifiedActivityStats';
export { useTodayTrainingContext } from './useTodayTrainingContext';
export { useTodayTrainingStats } from './useTodayTrainingStats';
export { useDisciplineAdaptiveContent, getDisciplineConfig, DISCIPLINE_CONFIGS } from './useDisciplineAdaptiveContent';
export { useAdviceAdaptiveContent } from './useAdviceAdaptiveContent';
export { useDominantDiscipline } from './useDominantDiscipline';
export {
  useTrainingAdvice,
  usePriorityRecommendations,
  useRecommendationsByCategory,
  useCriticalImbalances,
  useMarkRecommendationHelpful,
  useRefreshAdvice
} from './useTrainingAdvice';
export {
  useProgressionInsights,
  useRefreshProgressionInsights
} from './useProgressionInsights';
export { useExerciseIllustrations } from './useExerciseIllustrations';
export { useChartDimensions } from './useChartDimensions';
export { useLatestBodyScanMorphs } from './useLatestBodyScanMorphs';
