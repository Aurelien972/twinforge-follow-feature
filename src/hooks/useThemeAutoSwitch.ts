import { useEffect } from 'react';
import { useThemeStore } from '../system/store/themeStore';
import { themeAutoSwitchService } from '../system/services/themeAutoSwitchService';
import { useUserStore } from '../system/store/userStore';

export const useThemeAutoSwitch = () => {
  const { mode } = useThemeStore();
  const { profile } = useUserStore();

  useEffect(() => {
    const timezone = profile?.country_timezone || 'Europe/Paris';

    if (mode === 'auto') {
      themeAutoSwitchService.start(timezone);
    } else {
      themeAutoSwitchService.stop();
    }

    return () => {
      themeAutoSwitchService.stop();
    };
  }, [mode, profile?.country_timezone]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const { mode, setResolvedTheme } = useThemeStore.getState();

      if (mode === 'auto') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
};
