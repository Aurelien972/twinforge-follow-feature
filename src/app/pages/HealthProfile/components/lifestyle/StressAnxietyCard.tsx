/**
 * StressAnxietyCard Component
 * Card for tracking stress, anxiety, and mental well-being
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface StressAnxietyCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const StressAnxietyCard: React.FC<StressAnxietyCardProps> = ({ register, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(59, 130, 246, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.2))
            `,
            border: '2px solid rgba(59, 130, 246, 0.5)',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Brain} size={24} style={{ color: '#3B82F6' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Stress & Bien-être Mental</h3>
          <p className="text-white/70 text-sm">Niveau de stress, anxiété et humeur générale</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="stress_level" className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Activity} size={14} />
            Niveau de stress quotidien (1-10)
          </label>
          <input
            {...register('stress_level', { valueAsNumber: true })}
            type="number"
            id="stress_level"
            min="1"
            max="10"
            step="1"
            className="glass-input"
            placeholder="5"
          />
          <p className="text-white/50 text-xs mt-1">
            1 = Très faible, 10 = Très élevé
          </p>
          {errors.stress_level && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.stress_level.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="anxiety_level" className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
            <SpatialIcon Icon={ICONS.AlertCircle} size={14} />
            Niveau d'anxiété (1-10)
          </label>
          <input
            {...register('anxiety_level', { valueAsNumber: true })}
            type="number"
            id="anxiety_level"
            min="1"
            max="10"
            step="1"
            className="glass-input"
            placeholder="5"
          />
          <p className="text-white/50 text-xs mt-1">
            1 = Très faible, 10 = Très élevé
          </p>
          {errors.anxiety_level && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.anxiety_level.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="mood_rating" className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Smile} size={14} />
            Humeur générale (1-10)
          </label>
          <input
            {...register('mood_rating', { valueAsNumber: true })}
            type="number"
            id="mood_rating"
            min="1"
            max="10"
            step="1"
            className="glass-input"
            placeholder="7"
          />
          <p className="text-white/50 text-xs mt-1">
            1 = Très mauvaise, 10 = Excellente
          </p>
          {errors.mood_rating && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.mood_rating.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
