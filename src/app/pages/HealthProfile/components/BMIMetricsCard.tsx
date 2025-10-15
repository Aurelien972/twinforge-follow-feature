/**
 * BMIMetricsCard Component
 * Displays BMI and body metrics from user identity profile
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useUserStore } from '../../../../system/store/userStore';
import { calculateBMI, calculateBMIValue, getBMICategory } from '../../../pages/Profile/utils/profileCalculations';

export const BMIMetricsCard: React.FC = () => {
  const { profile } = useUserStore();

  const height = profile?.height_cm;
  const weight = profile?.weight_kg;
  const targetWeight = profile?.target_weight_kg;

  if (!height || !weight) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(245, 158, 11, 0.3)',
        }}>
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.Info} size={18} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-2">Métriques Corporelles Non Disponibles</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Complétez votre taille et poids dans l'onglet <strong>Identité</strong> de votre profil
                pour calculer automatiquement votre IMC et suivre vos métriques corporelles.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    );
  }

  const bmiValue = calculateBMIValue(weight, height);
  const bmiDisplay = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmiValue);

  const getBMIColor = (value: number): string => {
    if (value < 18.5) return '#F59E0B';
    if (value < 25) return '#10B981';
    if (value < 30) return '#F59E0B';
    return '#EF4444';
  };

  const bmiColor = getBMIColor(bmiValue);

  const weightDifference = targetWeight ? (targetWeight - weight).toFixed(1) : null;
  const weightStatus = weightDifference
    ? parseFloat(weightDifference) > 0
      ? 'à gagner'
      : 'à perdre'
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-6" style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
          var(--glass-opacity)
        `,
        borderColor: 'rgba(16, 185, 129, 0.3)',
      }}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.2))
              `,
              border: '2px solid rgba(16, 185, 129, 0.5)',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
            }}
          >
            <SpatialIcon Icon={ICONS.Scale} size={24} style={{ color: '#10B981' }} variant="pure" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Métriques Corporelles</h3>
            <p className="text-white/60 text-sm">Calculées depuis votre profil</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BMI Card */}
          <div
            className="p-4 rounded-xl text-center"
            style={{
              background: `${bmiColor}10`,
              border: `1px solid ${bmiColor}30`,
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Activity} size={16} style={{ color: bmiColor }} />
              <span className="text-white/90 text-xs font-medium">IMC</span>
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: bmiColor }}>
              {bmiDisplay}
            </div>
            <div className="text-xs" style={{ color: bmiColor }}>
              {bmiCategory}
            </div>
          </div>

          {/* Current Weight */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-400/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Weight} size={16} className="text-blue-400" />
              <span className="text-white/90 text-xs font-medium">Poids Actuel</span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {weight.toFixed(1)}
            </div>
            <div className="text-blue-300 text-xs">kg</div>
          </div>

          {/* Target Weight or Height */}
          {targetWeight ? (
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-400/20 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.Target} size={16} className="text-purple-400" />
                <span className="text-white/90 text-xs font-medium">Objectif</span>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {Math.abs(parseFloat(weightDifference!))} kg
              </div>
              <div className="text-purple-300 text-xs">{weightStatus}</div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.Ruler} size={16} className="text-cyan-400" />
                <span className="text-white/90 text-xs font-medium">Taille</span>
              </div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                {height}
              </div>
              <div className="text-cyan-300 text-xs">cm</div>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-400/10">
          <div className="flex items-start gap-2">
            <SpatialIcon Icon={ICONS.Info} size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/60 text-xs leading-relaxed">
              Ces métriques sont synchronisées avec votre onglet Identité. Modifiez-les depuis votre profil principal.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
