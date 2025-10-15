/**
 * SleepCard Component
 * Card for tracking sleep patterns and quality
 */

import React from 'react';
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { RatingSlider } from '../../../../../ui/components/RatingSlider';

interface SleepCardProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
}

export const SleepCard: React.FC<SleepCardProps> = ({ register, control, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(147, 51, 234, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(147, 51, 234, 0.2))
            `,
            border: '2px solid rgba(147, 51, 234, 0.5)',
            boxShadow: '0 0 30px rgba(147, 51, 234, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Moon} size={24} style={{ color: '#9333EA' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Sommeil</h3>
          <p className="text-white/70 text-sm">Durée et qualité de votre sommeil</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sleep_hours_avg" className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Moon} size={14} />
            Heures de sommeil moyennes par nuit
          </label>
          <input
            {...register('sleep_hours_avg', { valueAsNumber: true })}
            type="number"
            id="sleep_hours_avg"
            min="0"
            max="24"
            step="0.5"
            className="glass-input"
            placeholder="7.5"
          />
          {errors.sleep_hours_avg && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.sleep_hours_avg.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="sleep_quality"
            control={control}
            render={({ field }) => (
              <RatingSlider
                value={field.value}
                onChange={field.onChange}
                label="Qualité du sommeil"
                helperText="1 = Très mauvais, 10 = Excellent"
                lowLabel="Mauvais"
                highLabel="Excellent"
                color="#9333EA"
              />
            )}
          />
          {errors.sleep_quality && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.sleep_quality.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
