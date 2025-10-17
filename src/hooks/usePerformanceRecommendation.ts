import { useState, useEffect } from 'react';
import { deviceCapabilityManager } from '../lib/device/deviceCapabilityManager';
import { usePreferencesStore } from '../system/store/preferencesStore';
import logger from '../lib/utils/logger';

export interface PerformanceRecommendation {
  shouldRecommend: boolean;
  recommendedMode: 'ultra' | 'optimized';
  reason: string;
  severity: 'high' | 'medium' | 'low';
}

export function usePerformanceRecommendation() {
  const [recommendation, setRecommendation] = useState<PerformanceRecommendation | null>(null);
  const { preferences, hasShownPerformanceNotification, dismissPerformanceNotification } = usePreferencesStore();

  useEffect(() => {
    if (hasShownPerformanceNotification) {
      return;
    }

    if (preferences.performanceMode !== 'auto') {
      return;
    }

    const capabilities = deviceCapabilityManager.getCapabilities();
    const config = deviceCapabilityManager.getConfig();

    logger.info('[PERFORMANCE_RECOMMENDATION] Evaluating device', {
      performanceLevel: capabilities.performanceLevel,
      ram: capabilities.ram,
      cores: capabilities.cores,
      gpuAvailable: capabilities.gpuAvailable,
      isMobile: capabilities.isMobile,
    });

    let shouldRecommend = false;
    let recommendedMode: 'ultra' | 'optimized' = 'optimized';
    let reason = '';
    let severity: 'high' | 'medium' | 'low' = 'low';

    if (capabilities.performanceLevel === 'low') {
      shouldRecommend = true;
      recommendedMode = 'ultra';
      reason = 'Votre appareil a été détecté comme peu performant. Le mode Ultra-Performance garantira une expérience fluide à 60fps.';
      severity = 'high';

      logger.warn('[PERFORMANCE_RECOMMENDATION] Low performance device detected', {
        recommendedMode: 'ultra',
        reason,
      });
    } else if (capabilities.performanceLevel === 'medium' && capabilities.isMobile) {
      shouldRecommend = true;
      recommendedMode = 'optimized';
      reason = 'Votre appareil mobile peut bénéficier du mode Optimisé pour une meilleure autonomie et fluidité.';
      severity = 'medium';

      logger.info('[PERFORMANCE_RECOMMENDATION] Medium performance mobile detected', {
        recommendedMode: 'optimized',
        reason,
      });
    } else if (capabilities.ram < 4 || capabilities.cores < 4) {
      shouldRecommend = true;
      recommendedMode = 'optimized';
      reason = `Votre appareil (${capabilities.ram}GB RAM, ${capabilities.cores} cœurs) pourrait avoir de meilleures performances avec le mode Optimisé.`;
      severity = 'medium';

      logger.info('[PERFORMANCE_RECOMMENDATION] Low specs detected', {
        ram: capabilities.ram,
        cores: capabilities.cores,
        recommendedMode: 'optimized',
      });
    } else if (!capabilities.gpuAvailable && capabilities.isMobile) {
      shouldRecommend = true;
      recommendedMode = 'ultra';
      reason = 'Votre appareil ne dispose pas d\'accélération GPU. Le mode Ultra-Performance évitera les ralentissements.';
      severity = 'high';

      logger.warn('[PERFORMANCE_RECOMMENDATION] No GPU available on mobile', {
        recommendedMode: 'ultra',
      });
    } else if (capabilities.prefersReducedMotion) {
      shouldRecommend = true;
      recommendedMode = 'optimized';
      reason = 'Vos préférences système indiquent une réduction du mouvement. Le mode Optimisé respectera ce choix.';
      severity = 'low';

      logger.info('[PERFORMANCE_RECOMMENDATION] Reduced motion preferred', {
        recommendedMode: 'optimized',
      });
    }

    if (shouldRecommend) {
      setRecommendation({
        shouldRecommend,
        recommendedMode,
        reason,
        severity,
      });
    }
  }, [preferences.performanceMode, hasShownPerformanceNotification]);

  const dismissRecommendation = () => {
    dismissPerformanceNotification();
    setRecommendation(null);
    logger.info('[PERFORMANCE_RECOMMENDATION] Recommendation dismissed');
  };

  return {
    recommendation,
    dismissRecommendation,
  };
}
