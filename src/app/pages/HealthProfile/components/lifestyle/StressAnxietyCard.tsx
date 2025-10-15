/**
 * StressAnxietyCard Component
 * Card for tracking stress, anxiety, and mental well-being
 */

import React from 'react';
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { RatingSlider } from '../../../../../ui/components/RatingSlider';

interface StressAnxietyCardProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
}

export const StressAnxietyCard: React.FC<StressAnxietyCardProps> = ({ register, control, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(245, 158, 11, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.2))
            `,
            border: '2px solid rgba(245, 158, 11, 0.5)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Brain} size={24} style={{ color: '#F59E0B' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Stress & Bien-être Mental</h3>
          <p className="text-white/70 text-sm">Niveau de stress, anxiété et humeur générale</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Controller
            name="stress_level"
            control={control}
            render={({ field }) => (
              <RatingSlider
                value={field.value}
                onChange={field.onChange}
                label="Niveau de stress quotidien"
                helperText="1 = Très faible, 10 = Très élevé"
                lowLabel="Faible"
                highLabel="Élevé"
                color="#F59E0B"
              />
            )}
          />
          {errors.stress_level && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.stress_level.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="anxiety_level"
            control={control}
            render={({ field }) => (
              <RatingSlider
                value={field.value}
                onChange={field.onChange}
                label="Niveau d'anxiété"
                helperText="1 = Très faible, 10 = Très élevé"
                lowLabel="Faible"
                highLabel="Élevé"
                color="#F59E0B"
              />
            )}
          />
          {errors.anxiety_level && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.anxiety_level.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="mood_rating"
            control={control}
            render={({ field }) => (
              <RatingSlider
                value={field.value}
                onChange={field.onChange}
                label="Humeur générale"
                helperText="1 = Très mauvaise, 10 = Excellente"
                lowLabel="Mauvaise"
                highLabel="Excellente"
                color="#F59E0B"
              />
            )}
          />
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
