import { create } from 'zustand';
import { supabase } from '../supabase/client';
import logger from '../../lib/utils/logger';

interface PerformanceModeState {
  isPerformanceMode: boolean;
  isLoading: boolean;
  isForcedByMobile: boolean;
  setPerformanceMode: (enabled: boolean, userId?: string) => Promise<void>;
  loadPerformanceMode: (userId?: string) => Promise<void>;
}

const STORAGE_KEY = 'twinforge-performance-mode';

/**
 * CRITICAL: Detect if device is mobile
 * Mobile devices MUST have performance mode enabled
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const isSmallScreen = window.innerWidth <= 768;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const userAgent = navigator.userAgent || '';
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  return isSmallScreen || hasTouch || isMobileUA || isCoarsePointer;
}

export const usePerformanceModeStore = create<PerformanceModeState>((set, get) => ({
  isPerformanceMode: false,
  isLoading: true,
  isForcedByMobile: false,

  loadPerformanceMode: async (userId?: string) => {
    try {
      set({ isLoading: true });

      // CRITICAL: Check if mobile device
      const isMobile = isMobileDevice();

      // FORCE performance mode on mobile devices
      if (isMobile) {
        set({
          isPerformanceMode: true,
          isForcedByMobile: true,
          isLoading: false
        });
        document.documentElement.classList.add('performance-mode');
        document.body.classList.add('performance-mode');
        localStorage.setItem(STORAGE_KEY, 'true');

        logger.info('PERFORMANCE_MODE', 'FORCED ON for mobile device');
        return;
      }

      // For desktop: Try localStorage first for immediate feedback
      const localValue = localStorage.getItem(STORAGE_KEY);
      if (localValue !== null) {
        const isEnabled = localValue === 'true';
        set({ isPerformanceMode: isEnabled, isForcedByMobile: false, isLoading: false });

        // Apply performance mode class immediately
        if (isEnabled) {
          document.documentElement.classList.add('performance-mode');
          document.body.classList.add('performance-mode');
        } else {
          document.documentElement.classList.remove('performance-mode');
          document.body.classList.remove('performance-mode');
        }
      }

      // For desktop: If user is logged in, sync with Supabase
      if (userId && !isMobile) {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('performance_mode_enabled')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          logger.error('PERFORMANCE_MODE', 'Failed to load from Supabase', { error });
        } else if (data) {
          const isEnabled = data.performance_mode_enabled ?? false;
          set({ isPerformanceMode: isEnabled, isForcedByMobile: false, isLoading: false });

          // Update localStorage to match Supabase
          localStorage.setItem(STORAGE_KEY, String(isEnabled));

          // Apply performance mode class
          if (isEnabled) {
            document.documentElement.classList.add('performance-mode');
            document.body.classList.add('performance-mode');
          } else {
            document.documentElement.classList.remove('performance-mode');
            document.body.classList.remove('performance-mode');
          }

          logger.info('PERFORMANCE_MODE', 'Loaded from Supabase', { isEnabled });
        }
      }

      set({ isLoading: false });
    } catch (error) {
      logger.error('PERFORMANCE_MODE', 'Error loading performance mode', { error });
      set({ isLoading: false });
    }
  },

  setPerformanceMode: async (enabled: boolean, userId?: string) => {
    try {
      // CRITICAL: Prevent disabling performance mode on mobile
      const isMobile = isMobileDevice();
      if (isMobile && !enabled) {
        logger.warn('PERFORMANCE_MODE', 'Cannot disable on mobile device');
        return;
      }

      set({ isPerformanceMode: enabled, isForcedByMobile: isMobile });

      // Update localStorage immediately
      localStorage.setItem(STORAGE_KEY, String(enabled));

      // Apply or remove performance mode class
      if (enabled) {
        document.documentElement.classList.add('performance-mode');
        document.body.classList.add('performance-mode');
      } else {
        document.documentElement.classList.remove('performance-mode');
        document.body.classList.remove('performance-mode');
      }

      logger.info('PERFORMANCE_MODE', 'Mode changed', { enabled, isMobile });

      // If user is logged in, persist to Supabase
      if (userId) {
        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            user_id: userId,
            performance_mode_enabled: enabled,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id'
          });

        if (error) {
          logger.error('PERFORMANCE_MODE', 'Failed to save to Supabase', { error });
        } else {
          logger.info('PERFORMANCE_MODE', 'Saved to Supabase', { enabled });
        }
      }
    } catch (error) {
      logger.error('PERFORMANCE_MODE', 'Error setting performance mode', { error });
    }
  },
}));
