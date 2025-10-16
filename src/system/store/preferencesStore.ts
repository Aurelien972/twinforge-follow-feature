import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabase/client';
import logger from '../../lib/utils/logger';

export type PerformanceMode = 'auto' | 'optimized' | 'ultra';
export type ThemeMode = 'auto' | 'light' | 'dark';

export interface UserPreferences {
  id?: string;
  userId?: string;
  performanceMode: PerformanceMode;
  themeMode: ThemeMode;
  enableAnimations: boolean;
  enableGlassmorphism: boolean;
  enable3DEffects: boolean;
  showPerformanceNotifications: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PreferencesState {
  preferences: UserPreferences;
  isLoading: boolean;
  isSyncing: boolean;
  lastSyncError: string | null;
  hasShownPerformanceNotification: boolean;

  setPerformanceMode: (mode: PerformanceMode) => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setEnableAnimations: (enabled: boolean) => Promise<void>;
  setEnableGlassmorphism: (enabled: boolean) => Promise<void>;
  setEnable3DEffects: (enabled: boolean) => Promise<void>;
  setShowPerformanceNotifications: (show: boolean) => Promise<void>;

  loadPreferences: (userId: string) => Promise<void>;
  syncToDatabase: () => Promise<void>;
  applyPreferencesToDOM: () => void;

  resetToDefaults: () => Promise<void>;
  dismissPerformanceNotification: () => void;
}

const defaultPreferences: UserPreferences = {
  performanceMode: 'auto',
  themeMode: 'auto',
  enableAnimations: true,
  enableGlassmorphism: true,
  enable3DEffects: true,
  showPerformanceNotifications: true,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,
      isLoading: false,
      isSyncing: false,
      lastSyncError: null,
      hasShownPerformanceNotification: false,

      setPerformanceMode: async (mode: PerformanceMode) => {
        logger.info('[PREFERENCES] Setting performance mode', { mode });

        set((state) => ({
          preferences: { ...state.preferences, performanceMode: mode },
        }));

        get().applyPreferencesToDOM();
        await get().syncToDatabase();
      },

      setThemeMode: async (mode: ThemeMode) => {
        logger.info('[PREFERENCES] Setting theme mode', { mode });

        set((state) => ({
          preferences: { ...state.preferences, themeMode: mode },
        }));

        get().applyPreferencesToDOM();
        await get().syncToDatabase();
      },

      setEnableAnimations: async (enabled: boolean) => {
        logger.info('[PREFERENCES] Setting enable animations', { enabled });

        set((state) => ({
          preferences: { ...state.preferences, enableAnimations: enabled },
        }));

        get().applyPreferencesToDOM();
        await get().syncToDatabase();
      },

      setEnableGlassmorphism: async (enabled: boolean) => {
        logger.info('[PREFERENCES] Setting enable glassmorphism', { enabled });

        set((state) => ({
          preferences: { ...state.preferences, enableGlassmorphism: enabled },
        }));

        get().applyPreferencesToDOM();
        await get().syncToDatabase();
      },

      setEnable3DEffects: async (enabled: boolean) => {
        logger.info('[PREFERENCES] Setting enable 3D effects', { enabled });

        set((state) => ({
          preferences: { ...state.preferences, enable3DEffects: enabled },
        }));

        get().applyPreferencesToDOM();
        await get().syncToDatabase();
      },

      setShowPerformanceNotifications: async (show: boolean) => {
        logger.info('[PREFERENCES] Setting show performance notifications', { show });

        set((state) => ({
          preferences: { ...state.preferences, showPerformanceNotifications: show },
        }));

        await get().syncToDatabase();
      },

      loadPreferences: async (userId: string) => {
        if (!userId) {
          logger.warn('[PREFERENCES] No user ID provided for loading preferences');
          return;
        }

        set({ isLoading: true, lastSyncError: null });

        try {
          logger.info('[PREFERENCES] Loading preferences from database', { userId });

          const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

          if (error) {
            throw error;
          }

          if (data) {
            const loadedPreferences: UserPreferences = {
              id: data.id,
              userId: data.user_id,
              performanceMode: data.performance_mode as PerformanceMode,
              themeMode: data.theme_mode as ThemeMode,
              enableAnimations: data.enable_animations,
              enableGlassmorphism: data.enable_glassmorphism,
              enable3DEffects: data.enable_3d_effects,
              showPerformanceNotifications: data.show_performance_notifications,
              createdAt: data.created_at,
              updatedAt: data.updated_at,
            };

            logger.info('[PREFERENCES] Preferences loaded successfully', loadedPreferences);

            set({
              preferences: loadedPreferences,
              isLoading: false,
            });

            get().applyPreferencesToDOM();
          } else {
            logger.info('[PREFERENCES] No preferences found, creating defaults', { userId });

            const { data: newData, error: insertError } = await supabase
              .from('user_preferences')
              .insert({
                user_id: userId,
                performance_mode: defaultPreferences.performanceMode,
                theme_mode: defaultPreferences.themeMode,
                enable_animations: defaultPreferences.enableAnimations,
                enable_glassmorphism: defaultPreferences.enableGlassmorphism,
                enable_3d_effects: defaultPreferences.enable3DEffects,
                show_performance_notifications: defaultPreferences.showPerformanceNotifications,
              })
              .select()
              .single();

            if (insertError) {
              throw insertError;
            }

            const createdPreferences: UserPreferences = {
              id: newData.id,
              userId: newData.user_id,
              performanceMode: newData.performance_mode as PerformanceMode,
              themeMode: newData.theme_mode as ThemeMode,
              enableAnimations: newData.enable_animations,
              enableGlassmorphism: newData.enable_glassmorphism,
              enable3DEffects: newData.enable_3d_effects,
              showPerformanceNotifications: newData.show_performance_notifications,
              createdAt: newData.created_at,
              updatedAt: newData.updated_at,
            };

            set({
              preferences: createdPreferences,
              isLoading: false,
            });

            get().applyPreferencesToDOM();
          }
        } catch (error) {
          logger.error('[PREFERENCES] Failed to load preferences', {
            error: error instanceof Error ? error.message : 'Unknown error',
            userId,
          });

          set({
            isLoading: false,
            lastSyncError: error instanceof Error ? error.message : 'Failed to load preferences',
          });
        }
      },

      syncToDatabase: async () => {
        const { preferences } = get();

        if (!preferences.userId) {
          logger.warn('[PREFERENCES] No user ID, skipping database sync');
          return;
        }

        set({ isSyncing: true, lastSyncError: null });

        try {
          logger.info('[PREFERENCES] Syncing preferences to database', {
            userId: preferences.userId,
            performanceMode: preferences.performanceMode,
            themeMode: preferences.themeMode,
          });

          const { error } = await supabase
            .from('user_preferences')
            .upsert({
              user_id: preferences.userId,
              performance_mode: preferences.performanceMode,
              theme_mode: preferences.themeMode,
              enable_animations: preferences.enableAnimations,
              enable_glassmorphism: preferences.enableGlassmorphism,
              enable_3d_effects: preferences.enable3DEffects,
              show_performance_notifications: preferences.showPerformanceNotifications,
            }, {
              onConflict: 'user_id'
            });

          if (error) {
            throw error;
          }

          logger.info('[PREFERENCES] Preferences synced successfully');

          set({ isSyncing: false });
        } catch (error) {
          logger.error('[PREFERENCES] Failed to sync preferences', {
            error: error instanceof Error ? error.message : 'Unknown error',
          });

          set({
            isSyncing: false,
            lastSyncError: error instanceof Error ? error.message : 'Failed to sync preferences',
          });
        }
      },

      applyPreferencesToDOM: () => {
        const { preferences } = get();
        const root = document.documentElement;

        logger.info('[PREFERENCES] Applying preferences to DOM', preferences);

        // Apply performance mode classes
        root.classList.remove('perf-auto', 'perf-optimized', 'perf-ultra');
        root.classList.add(`perf-${preferences.performanceMode}`);

        // Apply theme mode classes
        root.classList.remove('theme-auto', 'theme-light', 'theme-dark');
        root.classList.add(`theme-${preferences.themeMode}`);

        if (preferences.themeMode === 'auto') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          root.classList.toggle('theme-dark-active', prefersDark);
          root.classList.toggle('theme-light-active', !prefersDark);
        } else {
          root.classList.toggle('theme-dark-active', preferences.themeMode === 'dark');
          root.classList.toggle('theme-light-active', preferences.themeMode === 'light');
        }

        // Apply effect toggles - only for decorative effects
        root.classList.toggle('disable-animations', !preferences.enableAnimations);
        root.classList.toggle('disable-glassmorphism', !preferences.enableGlassmorphism);
        root.classList.toggle('disable-3d-effects', !preferences.enable3DEffects);

        // Apply performance-specific settings
        if (preferences.performanceMode === 'ultra') {
          root.classList.add('ultra-performance-mode');
          // Ultra mode: no blur, minimal animations
          root.style.setProperty('--glass-blur-adaptive', '0px');
          root.style.setProperty('--animation-duration-adaptive', '80ms');

          // Ensure structural components remain visible
          logger.info('[PREFERENCES] Ultra mode applied - structural components preserved');
        } else if (preferences.performanceMode === 'optimized') {
          root.classList.remove('ultra-performance-mode');
          // Optimized mode: light blur, fast animations
          root.style.setProperty('--glass-blur-adaptive', '8px');
          root.style.setProperty('--animation-duration-adaptive', '150ms');

          logger.info('[PREFERENCES] Optimized mode applied');
        } else {
          // Auto mode: full effects
          root.classList.remove('ultra-performance-mode');
          root.style.setProperty('--glass-blur-adaptive', '16px');
          root.style.setProperty('--animation-duration-adaptive', '250ms');

          logger.info('[PREFERENCES] Auto mode applied - all effects enabled');
        }

        // Force a reflow to ensure styles are applied
        void root.offsetHeight;
      },

      resetToDefaults: async () => {
        logger.info('[PREFERENCES] Resetting to defaults');

        set((state) => ({
          preferences: { ...defaultPreferences, userId: state.preferences.userId },
        }));

        get().applyPreferencesToDOM();
        await get().syncToDatabase();
      },

      dismissPerformanceNotification: () => {
        set({ hasShownPerformanceNotification: true });
      },
    }),
    {
      name: 'twinforge-preferences',
      partialize: (state) => ({
        preferences: state.preferences,
        hasShownPerformanceNotification: state.hasShownPerformanceNotification,
      }),
    }
  )
);

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    const store = usePreferencesStore.getState();
    if (store.preferences.themeMode === 'auto') {
      store.applyPreferencesToDOM();
    }
  });
}
