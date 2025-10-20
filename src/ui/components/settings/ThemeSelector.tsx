import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';
import { useThemeStore, type ThemeMode } from '../../../system/store/themeStore';
import GlassCard from '../../cards/GlassCard';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';

export const ThemeSelector: React.FC = () => {
  const { mode, setMode } = useThemeStore();

  const themes: Array<{
    value: ThemeMode;
    label: string;
    description: string;
    icon: typeof Sun;
  }> = [
    {
      value: 'light',
      label: 'Clair',
      description: 'Thème clair en permanence',
      icon: Sun,
    },
    {
      value: 'dark',
      label: 'Sombre',
      description: 'Thème sombre en permanence',
      icon: Moon,
    },
    {
      value: 'auto',
      label: 'Automatique',
      description: 'Adapté selon l\'heure de votre pays',
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-3">
      {themes.map((theme) => {
        const isSelected = mode === theme.value;
        const Icon = theme.icon;

        return (
          <button
            key={theme.value}
            onClick={() => setMode(theme.value)}
            className="w-full"
          >
            <GlassCard
              className={`p-4 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'ring-2 ring-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                      : 'bg-white/5'
                  }`}
                >
                  <Icon
                    size={24}
                    className={isSelected ? 'text-cyan-400' : 'text-slate-400'}
                  />
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-base font-semibold text-white">
                      {theme.label}
                    </h4>
                    {isSelected && (
                      <SpatialIcon
                        Icon={ICONS.Check}
                        size={16}
                        color="#18E3FF"
                        variant="pure"
                      />
                    )}
                  </div>
                  <p className="text-sm text-slate-400">
                    {theme.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          </button>
        );
      })}
    </div>
  );
};
