import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  mode: ThemeMode;
  actualTheme: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  applyTheme: () => void;
  initializeTheme: (userCountry?: string) => void;
}

/**
 * Get sunrise and sunset times based on country
 * Simplified version - uses approximate times for common latitudes
 */
function getSunTimes(country?: string): { sunrise: number; sunset: number } {
  // Default times (temperate zone)
  let sunrise = 7; // 7 AM
  let sunset = 19; // 7 PM

  if (country) {
    const upperCountry = country.toUpperCase();

    // Nordic countries (later sunrise, earlier sunset in winter)
    if (['SE', 'NO', 'FI', 'DK', 'IS'].includes(upperCountry)) {
      sunrise = 8;
      sunset = 17;
    }
    // Southern hemisphere (opposite seasons)
    else if (['AU', 'NZ', 'ZA', 'AR', 'CL', 'BR'].includes(upperCountry)) {
      sunrise = 6;
      sunset = 18;
    }
    // Equatorial countries (consistent year-round)
    else if (['SG', 'MY', 'ID', 'KE', 'UG', 'CO', 'EC'].includes(upperCountry)) {
      sunrise = 6;
      sunset = 18;
    }
    // Middle East and North Africa
    else if (['AE', 'SA', 'EG', 'MA', 'TN'].includes(upperCountry)) {
      sunrise = 6;
      sunset = 19;
    }
  }

  return { sunrise, sunset };
}

/**
 * Determine if it's daytime based on user's country
 */
function isDaytime(userCountry?: string): boolean {
  const now = new Date();
  const hour = now.getHours();
  const { sunrise, sunset } = getSunTimes(userCountry);

  return hour >= sunrise && hour < sunset;
}

/**
 * Get system theme preference
 */
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'auto',
      actualTheme: 'dark',

      setMode: (mode: ThemeMode) => {
        set({ mode });
        get().applyTheme();
      },

      applyTheme: () => {
        const { mode } = get();
        let theme: 'light' | 'dark';

        if (mode === 'auto') {
          // Get user's country from profile if available
          const userCountry = localStorage.getItem('fastlift:user:country');

          // Determine theme based on time of day and country
          theme = isDaytime(userCountry || undefined) ? 'light' : 'dark';
        } else {
          theme = mode;
        }

        set({ actualTheme: theme });

        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
          document.documentElement.classList.remove('light-theme', 'dark-theme');
          document.documentElement.classList.add(`${theme}-theme`);
        }
      },

      initializeTheme: (userCountry?: string) => {
        // Store country for auto mode
        if (userCountry) {
          localStorage.setItem('fastlift:user:country', userCountry);
        }

        get().applyTheme();

        // Listen for system theme changes
        if (typeof window !== 'undefined') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handler = () => {
            if (get().mode === 'auto') {
              get().applyTheme();
            }
          };
          mediaQuery.addEventListener('change', handler);
        }
      },
    }),
    {
      name: 'fastlift:theme',
      onRehydrateStorage: () => (state) => {
        // Apply theme immediately after rehydration
        if (state) {
          state.applyTheme();
        }
      },
    }
  )
);
