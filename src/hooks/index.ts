/**
 * Hooks Barrel Export - Enhanced with UX Optimizations
 * Centralized export for essential hooks
 */

export * from './useFeedback';
export * from './useFieldValidation';
export * from './useProfileTabExitGuard';
export * from './useUnsavedChangesWarning';

/**
 * @deprecated Legacy performance mode hook - only for backward compatibility during migration
 * Use `usePerformanceMode` from `@/system/context/PerformanceModeContext` instead
 */
export { useLegacyPerformanceMode as usePerformanceMode } from './useLegacyPerformanceMode';

/**
 * Export the legacy hook under its new name for explicit usage during migration
 */
export { useLegacyPerformanceMode } from './useLegacyPerformanceMode';

export { useLazyLoad } from './useLazyLoad';
export * from './useAnalysisProgress';
export * from './useBackgroundAnalysis';
export * from './useGenerationProgress';
export * from './useHasConnectedWearable';
export * from './useWearableTracking';
export * from './useWearableSync';
export {
  useUnifiedActivityStats,
  useTodayUnifiedActivityStats,
  useWeekUnifiedActivityStats,
  useMonthUnifiedActivityStats,
} from './useUnifiedActivityStats';
export { useChartDimensions } from './useChartDimensions';
export { useLatestBodyScanMorphs } from './useLatestBodyScanMorphs';
export { useFastingTimer, formatTimeHMS, formatTimeHM } from './useFastingTimer';
