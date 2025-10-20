/**
 * Theme Toggle Component
 * Allows users to switch between light, dark, and auto themes
 */

import React from 'react';
import { Sun, Moon, MonitorSmartphone } from 'lucide-react';
import { useThemeStore, type ThemeMode } from '../../../system/store/themeStore';
import { ConditionalMotion } from '../../../lib/motion';

interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: React.ElementType;
  description: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'Clair',
    icon: Sun,
    description: 'Interface lumineuse',
  },
  {
    value: 'dark',
    label: 'Sombre',
    icon: Moon,
    description: 'Interface sombre',
  },
  {
    value: 'auto',
    label: 'Automatique',
    icon: MonitorSmartphone,
    description: 'Selon l\'heure du jour',
  },
];

export const ThemeToggle: React.FC = () => {
  const { mode, setMode } = useThemeStore();

  return (
    <div className="theme-toggle-container">
      <div className="theme-toggle-options">
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = mode === option.value;

          return (
            <button
              key={option.value}
              onClick={() => setMode(option.value)}
              className={`theme-toggle-option ${isActive ? 'active' : ''}`}
              aria-pressed={isActive}
            >
              <ConditionalMotion
                className="theme-toggle-option-content"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <div className="theme-toggle-option-icon">
                  <Icon size={20} />
                </div>
                <div className="theme-toggle-option-text">
                  <span className="theme-toggle-option-label">{option.label}</span>
                  <span className="theme-toggle-option-description">{option.description}</span>
                </div>
                {isActive && (
                  <ConditionalMotion
                    className="theme-toggle-option-indicator"
                    layoutId="theme-active-indicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </ConditionalMotion>
            </button>
          );
        })}
      </div>
    </div>
  );
};
