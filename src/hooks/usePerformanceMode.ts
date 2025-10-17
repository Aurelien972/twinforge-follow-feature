/**
 * usePerformanceMode Hook
 * Detects device performance and adapts UI accordingly
 * Enhanced with iPhone 8+ detection and auto-suggestion
 */

import { useState, useEffect } from 'react';
import { useGlassmorphismPreference } from './useGlassmorphismPreference';
import logger from '../lib/utils/logger';

interface PerformanceMetrics {
  mode: 'high' | 'medium' | 'low';
  enableAnimations: boolean;
  enableComplexEffects: boolean;
  maxDataPoints: number;
  animationDelay: number;
  calendarDays: number;
  isLowEndDevice: boolean;
  deviceInfo: string;
  estimatedFPS: number;
  shouldSuggestPerformanceMode: boolean;
}

export const usePerformanceMode = (): PerformanceMetrics & {
  enablePerformanceMode: () => Promise<void>;
  dismissSuggestion: () => void;
  showSuggestion: boolean;
} => {
  const { glassEffectsEnabled, setGlassEffects } = useGlassmorphismPreference();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    mode: 'high',
    enableAnimations: true,
    enableComplexEffects: true,
    maxDataPoints: 90,
    animationDelay: 0.01,
    calendarDays: 180,
    isLowEndDevice: false,
    deviceInfo: 'Unknown',
    estimatedFPS: 60,
    shouldSuggestPerformanceMode: false,
  });
  const [suggestionDismissed, setSuggestionDismissed] = useState(false);

  useEffect(() => {
    const detectPerformance = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad|tablet/.test(userAgent);
      const isLowEndMobile = /android [4-6]|iphone [5-8]/.test(userAgent);

      let deviceInfo = 'Unknown device';
      let isLowEndDevice = false;

      // Détection spécifique iPhone 8 et anciens
      const iosMatch = userAgent.match(/iphone os (\d+)_/);
      if (iosMatch) {
        const iosVersion = parseInt(iosMatch[1], 10);
        deviceInfo = `iPhone iOS ${iosVersion}`;
        if (iosVersion <= 13) {
          isLowEndDevice = true;
          logger.info('PERFORMANCE_DETECTION', 'Old iPhone detected (iPhone 8 or older)', {
            iosVersion,
            deviceInfo,
          });
        }
      }

      // Détection Android ancien
      const androidMatch = userAgent.match(/android (\d+)/);
      if (androidMatch) {
        const androidVersion = parseInt(androidMatch[1], 10);
        deviceInfo = `Android ${androidVersion}`;
        if (androidVersion <= 8) {
          isLowEndDevice = true;
          logger.info('PERFORMANCE_DETECTION', 'Old Android detected', {
            androidVersion,
            deviceInfo,
          });
        }
      }

      const memory = (navigator as any).deviceMemory;
      const cores = navigator.hardwareConcurrency || 2;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let mode: 'high' | 'medium' | 'low' = 'high';
      let enableAnimations = true;
      let enableComplexEffects = true;
      let maxDataPoints = 90;
      let animationDelay = 0.01;
      let calendarDays = 180;

      if (prefersReducedMotion) {
        mode = 'low';
        enableAnimations = false;
        enableComplexEffects = false;
        maxDataPoints = 30;
        animationDelay = 0;
        calendarDays = 30;
      } else if (isLowEndMobile || (memory && memory < 4) || cores < 4) {
        mode = 'low';
        enableAnimations = false;
        enableComplexEffects = false;
        maxDataPoints = 30;
        animationDelay = 0;
        calendarDays = 60;
      } else if (isMobile || (memory && memory < 8) || cores < 6) {
        mode = 'medium';
        enableAnimations = true;
        enableComplexEffects = false;
        maxDataPoints = 60;
        animationDelay = 0.02;
        calendarDays = 90;
      }

      const fps = measureFPS();
      fps.then((measuredFps) => {
        if (measuredFps < 30) {
          mode = 'low';
          enableAnimations = false;
          enableComplexEffects = false;
          maxDataPoints = 30;
          calendarDays = 60;
          isLowEndDevice = true;
        } else if (measuredFps < 50) {
          mode = 'medium';
          enableComplexEffects = false;
          maxDataPoints = 60;
          calendarDays = 90;
        }

        setMetrics({
          mode,
          enableAnimations,
          enableComplexEffects,
          maxDataPoints,
          animationDelay,
          calendarDays,
          isLowEndDevice: isLowEndDevice || isLowEndMobile,
          deviceInfo,
          estimatedFPS: measuredFps,
          shouldSuggestPerformanceMode: isLowEndDevice || isLowEndMobile || measuredFps < 30,
        });
      });

      setMetrics({
        mode,
        enableAnimations,
        enableComplexEffects,
        maxDataPoints,
        animationDelay,
        calendarDays,
        isLowEndDevice: isLowEndDevice || isLowEndMobile,
        deviceInfo,
        estimatedFPS: 60,
        shouldSuggestPerformanceMode: isLowEndDevice || isLowEndMobile,
      });
    };

    detectPerformance();

    // Vérifier si l'utilisateur a déjà été invité
    const hasBeenAsked = localStorage.getItem('performance-mode-asked');
    if (hasBeenAsked) {
      setSuggestionDismissed(true);
    }
  }, []);

  const enablePerformanceMode = async () => {
    try {
      await setGlassEffects(false);
      localStorage.setItem('performance-mode-asked', 'true');
      setSuggestionDismissed(true);

      logger.info('PERFORMANCE_MODE', 'Performance mode enabled by user', {
        deviceInfo: metrics.deviceInfo,
      });
    } catch (error) {
      logger.error('PERFORMANCE_MODE', 'Failed to enable performance mode', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const dismissSuggestion = () => {
    localStorage.setItem('performance-mode-asked', 'true');
    setSuggestionDismissed(true);

    logger.info('PERFORMANCE_MODE', 'Performance mode suggestion dismissed', {
      deviceInfo: metrics.deviceInfo,
    });
  };

  const showSuggestion =
    metrics.shouldSuggestPerformanceMode &&
    glassEffectsEnabled &&
    !suggestionDismissed;

  return {
    ...metrics,
    enablePerformanceMode,
    dismissSuggestion,
    showSuggestion,
  };
};

const measureFPS = (): Promise<number> => {
  return new Promise((resolve) => {
    let frameCount = 0;
    const startTime = performance.now();
    const duration = 1000;

    const countFrame = () => {
      frameCount++;
      const elapsed = performance.now() - startTime;

      if (elapsed < duration) {
        requestAnimationFrame(countFrame);
      } else {
        const fps = Math.round((frameCount / elapsed) * 1000);
        resolve(fps);
      }
    };

    requestAnimationFrame(countFrame);
  });
};
