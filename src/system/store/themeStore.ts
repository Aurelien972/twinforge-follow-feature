import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  isTransitioning: boolean;
  setMode: (mode: ThemeMode) => void;
  setResolvedTheme: (theme: ResolvedTheme) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'auto',
      resolvedTheme: 'dark',
      isTransitioning: false,

      setMode: (mode: ThemeMode) => {
        set({ mode });

        if (mode === 'light') {
          get().setResolvedTheme('light');
        } else if (mode === 'dark') {
          get().setResolvedTheme('dark');
        }
      },

      setResolvedTheme: (theme: ResolvedTheme) => {
        set({ isTransitioning: true, resolvedTheme: theme });

        const root = document.documentElement;
        root.setAttribute('data-theme', theme);

        setTimeout(() => {
          set({ isTransitioning: false });
        }, 300);
      },

      setTransitioning: (isTransitioning: boolean) => {
        set({ isTransitioning });
      },

      initializeTheme: () => {
        const { mode, resolvedTheme } = get();
        const root = document.documentElement;
        root.setAttribute('data-theme', resolvedTheme);

        if (mode === 'auto') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          set({ resolvedTheme: prefersDark ? 'dark' : 'light' });
          root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        mode: state.mode,
        resolvedTheme: state.resolvedTheme,
      }),
    }
  )
);
