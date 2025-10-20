import { useThemeStore } from '../store/themeStore';

interface TimeBasedThemeConfig {
  timezone: string;
  lightModeStartHour: number;
  darkModeStartHour: number;
}

const DEFAULT_CONFIG: TimeBasedThemeConfig = {
  timezone: 'Europe/Paris',
  lightModeStartHour: 7,
  darkModeStartHour: 20,
};

export class ThemeAutoSwitchService {
  private intervalId: number | null = null;
  private config: TimeBasedThemeConfig = DEFAULT_CONFIG;

  start(timezone?: string) {
    this.stop();

    if (timezone) {
      this.config.timezone = timezone;
    }

    this.checkAndUpdateTheme();

    this.intervalId = window.setInterval(() => {
      this.checkAndUpdateTheme();
    }, 60000);
  }

  stop() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private checkAndUpdateTheme() {
    const { mode, setResolvedTheme } = useThemeStore.getState();

    if (mode !== 'auto') {
      return;
    }

    const currentHour = this.getCurrentHourInTimezone();
    const shouldBeDark = this.shouldUseDarkMode(currentHour);
    const newTheme = shouldBeDark ? 'dark' : 'light';

    setResolvedTheme(newTheme);
  }

  private getCurrentHourInTimezone(): number {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: this.config.timezone,
        hour: 'numeric',
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      const hourPart = parts.find((part) => part.type === 'hour');
      return hourPart ? parseInt(hourPart.value, 10) : new Date().getHours();
    } catch (error) {
      console.error('Error getting timezone hour:', error);
      return new Date().getHours();
    }
  }

  private shouldUseDarkMode(currentHour: number): boolean {
    const { lightModeStartHour, darkModeStartHour } = this.config;

    if (darkModeStartHour > lightModeStartHour) {
      return currentHour >= darkModeStartHour || currentHour < lightModeStartHour;
    } else {
      return currentHour >= darkModeStartHour && currentHour < lightModeStartHour;
    }
  }

  updateTimezone(timezone: string) {
    this.config.timezone = timezone;
    this.checkAndUpdateTheme();
  }

  updateSchedule(lightStart: number, darkStart: number) {
    this.config.lightModeStartHour = lightStart;
    this.config.darkModeStartHour = darkStart;
    this.checkAndUpdateTheme();
  }
}

export const themeAutoSwitchService = new ThemeAutoSwitchService();
