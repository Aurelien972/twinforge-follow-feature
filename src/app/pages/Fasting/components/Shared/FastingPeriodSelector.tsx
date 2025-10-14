import React from 'react';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import { useFeedback } from '@/hooks/useFeedback';

interface FastingPeriodSelectorProps {
  selectedPeriod: number;
  onPeriodChange: (period: number) => void;
  availableSessionsCount?: number;
  getMinSessionsForPeriod?: (period: number) => number;
  className?: string;
  accentColor?: string;
}

interface PeriodOption {
  value: number;
  label: string;
}

const PERIOD_OPTIONS: PeriodOption[] = [
  {
    value: 7,
    label: '7 jours',
  },
  {
    value: 30,
    label: '30 jours',
  },
  {
    value: 90,
    label: '90 jours',
  }
];

/**
 * Default minimum sessions function (used by Insights tab)
 */
const defaultGetMinSessions = (period: number): number => {
  switch (period) {
    case 7: return 3;
    case 30: return 8;
    case 90: return 20;
    default: return 3;
  }
};

/**
 * Fasting Period Selector - Sélecteur de Période d'Analyse
 * Design compact horizontal harmonisé avec la Forge Énergétique
 */
const FastingPeriodSelector: React.FC<FastingPeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  availableSessionsCount = 0,
  getMinSessionsForPeriod = defaultGetMinSessions,
  className = '',
  accentColor = '#10B981'
}) => {
  const { click } = useFeedback();
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="inline-flex gap-2 p-1 rounded-lg" style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {PERIOD_OPTIONS.map((option) => {
          const isSelected = selectedPeriod === option.value;
          const minSessions = getMinSessionsForPeriod(option.value);
          const hasEnoughData = availableSessionsCount >= minSessions;
          const isDisabled = !hasEnoughData;

          return (
            <button
              key={option.value}
              onClick={() => {
                if (!isDisabled) {
                  click();
                  onPeriodChange(option.value);
                }
              }}
              disabled={isDisabled}
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center gap-0.5"
              style={{
                background: isSelected ? `${accentColor}33` : 'transparent',
                color: isSelected ? accentColor : hasEnoughData ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)',
                border: isSelected ? `1px solid ${accentColor}66` : '1px solid transparent',
                boxShadow: isSelected ? `0 0 20px ${accentColor}4D` : 'none',
                opacity: hasEnoughData ? 1 : 0.5,
                cursor: hasEnoughData ? 'pointer' : 'not-allowed'
              }}
            >
              <span>{option.label}</span>
              <span className="text-xs" style={{
                color: hasEnoughData ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)'
              }}>
                {availableSessionsCount}/{minSessions} sessions
              </span>
            </button>
          );
        })}
      </div>

      {/* Info-bulle compacte */}
      <div className="relative">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center gap-1.5 text-xs transition-colors duration-200"
          style={{
            color: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <SpatialIcon Icon={ICONS.Info} size={12} />
          <span>Sessions requises pour l'analyse</span>
        </button>

        {showTooltip && (
          <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg whitespace-nowrap text-xs z-50"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="text-white/90">
              <div>7 jours: 3 sessions minimum</div>
              <div>30 jours: 8 sessions minimum</div>
              <div>90 jours: 20 sessions minimum</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FastingPeriodSelector;