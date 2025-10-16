import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';

interface FastingPeriodSelectorProps {
  selectedPeriod: number;
  onPeriodChange: (period: number) => void;
  availableSessionsCount?: number;
  getMinSessionsForPeriod?: (period: number) => number;
  className?: string;
}

interface PeriodOption {
  value: number;
  label: string;
  description: string;
}

const PERIOD_OPTIONS: PeriodOption[] = [
  {
    value: 7,
    label: '7 derniers jours',
    description: 'Analyse hebdomadaire',
  },
  {
    value: 30,
    label: '30 derniers jours',
    description: 'Tendances mensuelles',
  },
  {
    value: 90,
    label: '90 derniers jours',
    description: 'Analyse trimestrielle',
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
 * Permet de choisir la période d'analyse pour les insights de jeûne
 */
const FastingPeriodSelector: React.FC<FastingPeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  availableSessionsCount = 0,
  getMinSessionsForPeriod = defaultGetMinSessions,
  className = ''
}) => {
  return (
    <div className={`fasting-period-selector ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {PERIOD_OPTIONS.map((option) => {
          const isSelected = selectedPeriod === option.value;
          const minSessions = getMinSessionsForPeriod(option.value);
          const hasEnoughData = availableSessionsCount >= minSessions;
          const isDisabled = !hasEnoughData;
          
          return (
            <motion.button
              key={option.value}
              onClick={() => !isDisabled && onPeriodChange(option.value)}
              disabled={isDisabled}
              className={`
                flex-1 p-4 rounded-xl transition-all duration-200 relative overflow-hidden
                ${isSelected ? 'ring-2' : ''}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{
                background: isSelected 
                  ? `
                    radial-gradient(circle at 30% 20%, color-mix(in srgb, #8B5CF6 15%, transparent) 0%, transparent 60%),
                    color-mix(in srgb, #8B5CF6 8%, transparent)
                  `
                  : 'rgba(255, 255, 255, 0.05)',
                border: isSelected 
                  ? '2px solid color-mix(in srgb, #8B5CF6 40%, transparent)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                ringColor: isSelected ? '#8B5CF6' : 'transparent',
                backdropFilter: 'blur(12px) saturate(130%)'
              }}
              whileHover={!isDisabled ? { 
                scale: 1.02,
                backgroundColor: isSelected 
                  ? 'color-mix(in srgb, #8B5CF6 12%, transparent)'
                  : 'rgba(255, 255, 255, 0.08)'
              } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
              <div className="text-left">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-semibold ${
                    isSelected ? 'text-purple-300' : 'text-white/90'
                  }`}>
                    {option.label}
                  </h4>
                  {isSelected && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: 'color-mix(in srgb, #8B5CF6 20%, transparent)',
                        border: '1px solid color-mix(in srgb, #8B5CF6 30%, transparent)'
                      }}
                    >
                      <SpatialIcon Icon={ICONS.Check} size={12} style={{ color: '#8B5CF6' }} />
                    </div>
                  )}
                </div>
                
                <p className={`text-sm mb-3 ${
                  isSelected ? 'text-purple-200' : 'text-white/70'
                }`}>
                  {option.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SpatialIcon 
                      Icon={hasEnoughData ? ICONS.Check : ICONS.AlertCircle} 
                      size={12} 
                      className={hasEnoughData ? 'text-green-400' : 'text-orange-400'} 
                    />
                    <span className={`text-xs ${
                      hasEnoughData ? 'text-green-300' : 'text-orange-300'
                    }`}>
                      {availableSessionsCount}/{minSessions} sessions
                    </span>
                  </div>
                  
                  {!hasEnoughData && (
                    <span className="text-xs text-orange-300">
                      {minSessions - availableSessionsCount} manquantes
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {/* Information sur les données requises */}
      <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-400/20">
        <div className="flex items-start gap-2">
          <SpatialIcon Icon={ICONS.Info} size={14} className="text-purple-400 mt-0.5" />
          <div>
            <p className="text-purple-200 text-sm leading-relaxed">
              Plus vous avez de sessions de jeûne, plus les insights de la Forge sont précis et personnalisés.
            </p>
            <div className="text-purple-300 text-xs mt-2">
              <strong>Recommandé :</strong> Au moins 3 sessions pour 7 jours, 8 pour 30 jours, 20 pour 90 jours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastingPeriodSelector;