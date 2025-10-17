import { create } from 'zustand';
import { supabase } from '../supabase/client';
import logger from '../../lib/utils/logger';

interface PerformanceModeState {
  isPerformanceMode: boolean;
  isLoading: boolean;
  setPerformanceMode: (enabled: boolean, userId?: string) => Promise<void>;
  loadPerformanceMode: (userId?: string) => Promise<void>;
}

const STORAGE_KEY = 'twinforge-performance-mode';

export const usePerformanceModeStore = create<PerformanceModeState>((set, get) => ({
  isPerformanceMode: false,
  isLoading: true,

  loadPerformanceMode: async (userId?: string) => {
    try {
      set({ isLoading: true });

      // Try localStorage first for immediate feedback
      const localValue = localStorage.getItem(STORAGE_KEY);
      if (localValue !== null) {
        const isEnabled = localValue === 'true';
        set({ isPerformanceMode: isEnabled, isLoading: false });

        // Apply performance mode class immediately
        if (isEnabled) {
          document.documentElement.classList.add('performance-mode');
        } else {
          document.documentElement.classList.remove('performance-mode');
        }
      }

      // If user is logged in, sync with Supabase
      if (userId) {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('performance_mode_enabled')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          logger.error('PERFORMANCE_MODE', 'Failed to load from Supabase', { error });
        } else if (data) {
          const isEnabled = data.performance_mode_enabled ?? false;
          set({ isPerformanceMode: isEnabled, isLoading: false });

          // Update localStorage to match Supabase
          localStorage.setItem(STORAGE_KEY, String(isEnabled));

          // Apply performance mode class
          if (isEnabled) {
            document.documentElement.classList.add('performance-mode');
          } else {
            document.documentElement.classList.remove('performance-mode');
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
      set({ isPerformanceMode: enabled });

      // Update localStorage immediately
      localStorage.setItem(STORAGE_KEY, String(enabled));

      // Apply or remove performance mode class
      if (enabled) {
        document.documentElement.classList.add('performance-mode');
      } else {
        document.documentElement.classList.remove('performance-mode');
      }

      logger.info('PERFORMANCE_MODE', 'Mode changed', { enabled });

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
