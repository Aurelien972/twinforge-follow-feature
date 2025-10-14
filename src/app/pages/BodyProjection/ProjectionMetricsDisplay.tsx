import React from 'react';
import { motion } from 'framer-motion';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import type { ProjectionOutputs } from '../../../lib/projection/morphologicalProjectionEngine';

interface ProjectionMetricsDisplayProps {
  currentWeight: number;
  currentBMI: number;
  projection: ProjectionOutputs | null;
  isLoading?: boolean;
}

export const ProjectionMetricsDisplay: React.FC<ProjectionMetricsDisplayProps> = ({
  currentWeight,
  currentBMI,
  projection,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
          <div className="h-8 bg-white/10 rounded"></div>
          <div className="h-8 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!projection) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-white/60">Ajustez les paramètres pour voir les projections</p>
      </div>
    );
  }

  const weightChange = projection.projectedWeight - currentWeight;
  const bmiChange = projection.projectedBMI - currentBMI;

  const getTrendIcon = (change: number) => {
    if (change > 0.1) return <SpatialIcon Icon={ICONS.TrendingUp} size={16} className="text-green-400" />;
    if (change < -0.1) return <SpatialIcon Icon={ICONS.TrendingDown} size={16} className="text-red-400" />;
    return <SpatialIcon Icon={ICONS.Minus} size={16} className="text-white/40" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0.1) return 'text-green-400';
    if (change < -0.1) return 'text-red-400';
    return 'text-white/40';
  };

  const formatChange = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4 w-full"
    >
      {/* Main Metrics */}
      <div className="glass-card p-6 rounded-2xl"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
            var(--glass-opacity-base)
          `,
          borderColor: 'rgba(16, 185, 129, 0.3)',
          boxShadow: `
            var(--glass-shadow-sm),
            0 0 16px rgba(16, 185, 129, 0.15)
          `
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(16, 185, 129, 0.25))
              `,
              border: '2px solid rgba(16, 185, 129, 0.5)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}
          >
            <SpatialIcon Icon={ICONS.BarChart3} size={20} style={{ color: '#10B981' }} variant="pure" />
          </div>
          <h3 className="text-lg font-semibold text-white">Métriques Projetées</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weight */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Scale} size={16} className="text-purple-400" />
              <span className="text-sm text-white/60 font-medium">Poids</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {projection.projectedWeight} kg
              </span>
              <div className="flex items-center gap-1">
                {getTrendIcon(weightChange)}
                <span className={`text-sm font-medium ${getChangeColor(weightChange)}`}>
                  {formatChange(weightChange)} kg
                </span>
              </div>
            </div>
          </div>

          {/* BMI */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Activity} size={16} className="text-blue-400" />
              <span className="text-sm text-white/60 font-medium">IMC</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {projection.projectedBMI}
              </span>
              <div className="flex items-center gap-1">
                {getTrendIcon(bmiChange)}
                <span className={`text-sm font-medium ${getChangeColor(bmiChange)}`}>
                  {formatChange(bmiChange)}
                </span>
              </div>
            </div>
          </div>

          {/* Waist */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Ruler} size={16} className="text-green-400" />
              <span className="text-sm text-white/60 font-medium">Tour de taille</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {projection.projectedWaistCircumference} cm
              </span>
            </div>
          </div>

          {/* Muscle Mass */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Flame} size={16} className="text-orange-400" />
              <span className="text-sm text-white/60 font-medium">Masse musculaire</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {projection.projectedMuscleMassPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Composition */}
      <div className="glass-card p-6 rounded-2xl"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
            var(--glass-opacity-base)
          `,
          borderColor: 'rgba(16, 185, 129, 0.3)',
          boxShadow: `
            var(--glass-shadow-sm),
            0 0 16px rgba(16, 185, 129, 0.15)
          `
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(16, 185, 129, 0.25))
              `,
              border: '2px solid rgba(16, 185, 129, 0.5)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}
          >
            <SpatialIcon Icon={ICONS.Activity2} size={20} style={{ color: '#10B981' }} variant="pure" />
          </div>
          <h4 className="text-md font-semibold text-white">Composition Corporelle</h4>
        </div>

        <div className="space-y-4">
          {/* Muscle Mass Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/70">Masse musculaire</span>
              <span className="text-white font-medium">
                {projection.projectedMuscleMassPercentage}%
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${projection.projectedMuscleMassPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
              />
            </div>
          </div>

          {/* Body Fat Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/70">Masse grasse</span>
              <span className="text-white font-medium">
                {projection.projectedBodyFatPercentage}%
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${projection.projectedBodyFatPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calculations Detail (Collapsible) */}
      <details className="glass-card p-6 cursor-pointer rounded-xl"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.12) 0%, transparent 60%),
            var(--glass-opacity-base)
          `,
          borderColor: 'rgba(245, 158, 11, 0.3)',
          boxShadow: `
            var(--glass-shadow-sm),
            0 0 16px rgba(245, 158, 11, 0.15)
          `
        }}
      >
        <summary className="text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-2">
          <SpatialIcon Icon={ICONS.Calculator} size={16} className="text-orange-400" />
          Détails des Calculs
        </summary>
        <div className="mt-4 space-y-2 text-sm text-white/60">
          <div className="flex justify-between">
            <span>Métabolisme de base (BMR)</span>
            <span className="text-white/80 font-medium">
              {projection.calculations.basalMetabolicRate} kcal/jour
            </span>
          </div>
          <div className="flex justify-between">
            <span>Dépense énergétique totale (TDEE)</span>
            <span className="text-white/80 font-medium">
              {projection.calculations.totalDailyEnergyExpenditure} kcal/jour
            </span>
          </div>
          <div className="flex justify-between">
            <span>Ajustement calorique quotidien</span>
            <span className="text-white/80 font-medium">
              {projection.calculations.dailyCaloricAdjustment > 0 ? '+' : ''}
              {projection.calculations.dailyCaloricAdjustment} kcal/jour
            </span>
          </div>
          <div className="flex justify-between">
            <span>Différence calorique totale</span>
            <span className="text-white/80 font-medium">
              {projection.calculations.totalCaloricDifference > 0 ? '+' : ''}
              {projection.calculations.totalCaloricDifference} kcal
            </span>
          </div>
          <div className="h-px bg-white/10 my-2"></div>
          <div className="flex justify-between">
            <span>Changement de poids estimé</span>
            <span className="text-white/80 font-medium">
              {formatChange(projection.calculations.estimatedWeightChange)} kg
            </span>
          </div>
          <div className="flex justify-between">
            <span>Gain musculaire estimé</span>
            <span className="text-green-400 font-medium">
              {formatChange(projection.calculations.estimatedMuscleChange)} kg
            </span>
          </div>
          <div className="flex justify-between">
            <span>Perte de graisse estimée</span>
            <span className="text-orange-400 font-medium">
              {formatChange(projection.calculations.estimatedFatChange)} kg
            </span>
          </div>
        </div>
      </details>
    </motion.div>
  );
};
