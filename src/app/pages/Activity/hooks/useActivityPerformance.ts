/**
 * useActivityPerformance Hook
 * Activity-specific performance adaptations for the Energy Forge
 * Extends useLegacyPerformanceMode with Activity module specific parameters
 */

import { useLegacyPerformanceMode } from '../../../../hooks/useLegacyPerformanceMode';

export interface ActivityPerformanceSettings {
  mode: 'high' | 'medium' | 'low';
  enableAnimations: boolean;
  enableComplexEffects: boolean;
  enableRings: boolean;
  enableParticles: boolean;
  enableGlows: boolean;
  enableShimmers: boolean;
  enablePulseEffects: boolean;
  enableRotations: boolean;
  maxActivitiesDisplayed: number;
  chartPointsLimit: number;
  animationDelay: number;
  staggerDelay: number;
  transitionDuration: number;
  calendarDays: number;
}

export const useActivityPerformance = (): ActivityPerformanceSettings => {
  const baseMetrics = useLegacyPerformanceMode();

  const activitySettings: ActivityPerformanceSettings = {
    mode: baseMetrics.mode,
    enableAnimations: baseMetrics.enableAnimations,
    enableComplexEffects: baseMetrics.enableComplexEffects,
    animationDelay: baseMetrics.animationDelay,
    calendarDays: baseMetrics.calendarDays,

    enableRings: baseMetrics.mode === 'high',
    enableParticles: baseMetrics.mode === 'high',
    enableGlows: baseMetrics.mode !== 'low',
    enableShimmers: baseMetrics.mode !== 'low',
    enablePulseEffects: baseMetrics.mode !== 'low',
    enableRotations: baseMetrics.mode === 'high',

    maxActivitiesDisplayed:
      baseMetrics.mode === 'high' ? 30 :
      baseMetrics.mode === 'medium' ? 20 : 10,

    chartPointsLimit: baseMetrics.maxDataPoints,

    staggerDelay:
      baseMetrics.mode === 'high' ? 0.15 :
      baseMetrics.mode === 'medium' ? 0.08 : 0,

    transitionDuration:
      baseMetrics.mode === 'high' ? 0.5 :
      baseMetrics.mode === 'medium' ? 0.3 : 0.15,
  };

  return activitySettings;
};
