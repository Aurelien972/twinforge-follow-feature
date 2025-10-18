import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ConditionalMotion } from '../../../lib/motion/ConditionalMotion';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { usePerformanceMode } from '../../../system/context/PerformanceModeContext';
import logger from '../../../lib/utils/logger';

export interface ProjectionParams {
  activityLevel: number;
  nutritionQuality: number;
  caloricBalance: number;
  timePeriodMonths: number;
}

interface ProjectionControlPanelProps {
  onParamsChange: (params: ProjectionParams) => void;
  initialParams?: Partial<ProjectionParams>;
  isCalculating?: boolean;
}

const TIME_PERIODS = [
  { value: 1, label: '1 mois' },
  { value: 3, label: '3 mois' },
  { value: 6, label: '6 mois' },
  { value: 12, label: '1 an' }
];

export const ProjectionControlPanel: React.FC<ProjectionControlPanelProps> = ({
  onParamsChange,
  initialParams = {},
  isCalculating = false
}) => {
  const [activityLevel, setActivityLevel] = useState(initialParams.activityLevel ?? 50);
  const [nutritionQuality, setNutritionQuality] = useState(initialParams.nutritionQuality ?? 50);
  const [caloricBalance, setCaloricBalance] = useState(initialParams.caloricBalance ?? 0);
  const [timePeriodMonths, setTimePeriodMonths] = useState(initialParams.timePeriodMonths ?? 3);

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdatingRef = useRef(false);
  const { mode } = usePerformanceMode();

  // Performance-aware styles
  const cardStyles = useMemo(() => {
    const isHighPerf = mode === 'high-performance';
    const isBalanced = mode === 'balanced';

    return {
      background: isHighPerf
        ? 'var(--glass-opacity-base)'
        : isBalanced
        ? `
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
            var(--glass-opacity-base)
          `
        : `
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
            var(--glass-opacity-base)
          `,
      borderColor: isHighPerf ? 'rgba(255, 255, 255, 0.15)' : 'rgba(16, 185, 129, 0.3)',
      boxShadow: isHighPerf
        ? 'var(--glass-shadow-sm)'
        : `var(--glass-shadow-sm), 0 0 16px rgba(16, 185, 129, 0.15)`
    };
  }, [mode]);

  const iconStyles = useMemo(() => {
    return {
      background: mode === 'high-performance'
        ? 'rgba(16, 185, 129, 0.25)'
        : `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
            linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(16, 185, 129, 0.25))
          `,
      border: '2px solid rgba(16, 185, 129, 0.5)',
      boxShadow: mode === 'quality' ? '0 0 20px rgba(16, 185, 129, 0.3)' : '0 0 12px rgba(16, 185, 129, 0.25)'
    };
  }, [mode]);

  // Notify parent of parameter changes with optimized debouncing
  const notifyParent = useCallback(() => {
    if (isUpdatingRef.current) return;

    const params: ProjectionParams = {
      activityLevel,
      nutritionQuality,
      caloricBalance,
      timePeriodMonths
    };
    onParamsChange(params);
  }, [activityLevel, nutritionQuality, caloricBalance, timePeriodMonths, onParamsChange]);

  // Debounced update for smooth transitions
  useEffect(() => {
    // Clear previous timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Debounce de 300ms pour éviter trop de calculs
    updateTimeoutRef.current = setTimeout(() => {
      notifyParent();
    }, 300);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [notifyParent]);

  const getActivityLabel = (value: number): string => {
    if (value <= 20) return 'Sédentaire';
    if (value <= 40) return 'Légèrement actif';
    if (value <= 60) return 'Modérément actif';
    if (value <= 80) return 'Très actif';
    return 'Extrêmement actif';
  };

  const getNutritionLabel = (value: number): string => {
    if (value <= 20) return 'Très pauvre';
    if (value <= 40) return 'Insuffisante';
    if (value <= 60) return 'Correcte';
    if (value <= 80) return 'Bonne';
    return 'Optimale';
  };

  const getCaloricLabel = (value: number): string => {
    if (value <= -60) return 'Déficit important';
    if (value <= -20) return 'Déficit modéré';
    if (value < 20) return 'Maintenance';
    if (value < 60) return 'Surplus modéré';
    return 'Surplus important';
  };

  return (
    <ConditionalMotion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 space-y-6 rounded-2xl"
      style={cardStyles}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={iconStyles}
        >
          <SpatialIcon Icon={ICONS.Sliders} size={20} style={{ color: '#10B981' }} variant="pure" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">Paramètres de Projection</h3>
          <p className="text-sm text-white/70">
            Ajustez vos habitudes de vie pour visualiser leur impact sur votre corps
          </p>
        </div>
      </div>

      {/* Activity Level Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Activity} size={16} className="text-green-400" />
            <label className="text-sm font-medium text-white">
              Niveau d'Activité Physique
            </label>
          </div>
          <span className="text-xs text-white/60 font-medium">
            {getActivityLabel(activityLevel)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivityLevel(Math.max(0, activityLevel - 5))}
            disabled={activityLevel === 0 || isCalculating}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10
                       hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all active:scale-95 border border-white/10"
          >
            <SpatialIcon Icon={ICONS.Minus} size={20} className="text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-green-400">{activityLevel}%</div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                style={{ width: `${activityLevel}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setActivityLevel(Math.min(100, activityLevel + 5))}
            disabled={activityLevel === 100 || isCalculating}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10
                       hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all active:scale-95 border border-white/10"
          >
            <SpatialIcon Icon={ICONS.Plus} size={20} className="text-white" />
          </button>
        </div>
        <div className="flex justify-between text-xs text-white/40 px-1">
          <span>Sédentaire</span>
          <span>Très actif</span>
        </div>
      </div>

      {/* Nutrition Quality Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Apple} size={16} className="text-blue-400" />
            <label className="text-sm font-medium text-white">
              Qualité Nutritionnelle
            </label>
          </div>
          <span className="text-xs text-white/60 font-medium">
            {getNutritionLabel(nutritionQuality)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNutritionQuality(Math.max(0, nutritionQuality - 5))}
            disabled={nutritionQuality === 0 || isCalculating}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10
                       hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all active:scale-95 border border-white/10"
          >
            <SpatialIcon Icon={ICONS.Minus} size={20} className="text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-blue-400">{nutritionQuality}%</div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                style={{ width: `${nutritionQuality}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setNutritionQuality(Math.min(100, nutritionQuality + 5))}
            disabled={nutritionQuality === 100 || isCalculating}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10
                       hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all active:scale-95 border border-white/10"
          >
            <SpatialIcon Icon={ICONS.Plus} size={20} className="text-white" />
          </button>
        </div>
        <div className="flex justify-between text-xs text-white/40 px-1">
          <span>Pauvre</span>
          <span>Optimale</span>
        </div>
      </div>

      {/* Caloric Balance Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Flame} size={16} className="text-orange-400" />
            <label className="text-sm font-medium text-white">
              Balance Calorique
            </label>
          </div>
          <span className="text-xs text-white/60 font-medium">
            {getCaloricLabel(caloricBalance)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCaloricBalance(Math.max(-100, caloricBalance - 5))}
            disabled={caloricBalance === -100 || isCalculating}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10
                       hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all active:scale-95 border border-white/10"
          >
            <SpatialIcon Icon={ICONS.Minus} size={20} className="text-white" />
          </button>
          <div className="flex-1 text-center">
            <div className={`text-2xl font-bold ${
              caloricBalance < -20 ? 'text-red-400' :
              caloricBalance > 20 ? 'text-green-400' :
              'text-orange-400'
            }`}>
              {caloricBalance > 0 ? '+' : ''}{caloricBalance}
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="relative w-full h-full">
                {/* Center line at 0 */}
                <div className="absolute left-1/2 top-0 w-px h-full bg-white/30" />
                {/* Progress bar */}
                <div
                  className={`absolute h-full transition-all duration-300 ${
                    caloricBalance < 0
                      ? 'bg-gradient-to-r from-red-500 to-red-400 right-1/2'
                      : 'bg-gradient-to-r from-green-500 to-green-400 left-1/2'
                  }`}
                  style={{ width: `${Math.abs(caloricBalance) / 2}%` }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setCaloricBalance(Math.min(100, caloricBalance + 5))}
            disabled={caloricBalance === 100 || isCalculating}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10
                       hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all active:scale-95 border border-white/10"
          >
            <SpatialIcon Icon={ICONS.Plus} size={20} className="text-white" />
          </button>
        </div>
        <div className="flex justify-between text-xs text-white/40 px-1">
          <span>Déficit</span>
          <span>Maintenance</span>
          <span>Surplus</span>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <SpatialIcon Icon={ICONS.Clock} size={16} className="text-purple-400" />
          <label className="text-sm font-medium text-white block">
            Période de Projection
          </label>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {TIME_PERIODS.map((period) => (
            <button
              key={period.value}
              onClick={() => {
                setTimePeriodMonths(period.value);
                // Immediate update for discrete values (no debounce)
                if (updateTimeoutRef.current) {
                  clearTimeout(updateTimeoutRef.current);
                  updateTimeoutRef.current = null;
                }
                const params: ProjectionParams = {
                  activityLevel,
                  nutritionQuality,
                  caloricBalance,
                  timePeriodMonths: period.value
                };
                onParamsChange(params);
              }}
              disabled={isCalculating}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                ${timePeriodMonths === period.value
                  ? 'bg-purple-500 text-white shadow-lg scale-105 border-2 border-purple-400'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                }
              `}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculating Indicator */}
      {isCalculating && (
        <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 rounded-xl border border-purple-400/30">
          <SpatialIcon Icon={ICONS.Loader2} size={16} className="text-purple-400 animate-spin" />
          <span className="text-xs text-purple-300 font-medium">Calcul en cours...</span>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-start gap-2">
          <SpatialIcon Icon={ICONS.Lightbulb} size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/60 leading-relaxed">
            <strong className="text-white/80">Astuce:</strong> Ces paramètres simulent l'impact
            de vos habitudes de vie sur votre morphologie. Les calculs sont basés sur des formules
            scientifiques validées (équation de Mifflin-St Jeor, métabolisme de base, etc.).
          </p>
        </div>
      </div>
    </ConditionalMotion>
  );
};
