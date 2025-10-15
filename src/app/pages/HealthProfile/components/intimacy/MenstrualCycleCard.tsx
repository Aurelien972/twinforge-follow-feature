/**
 * MenstrualCycleCard Component
 * Card for tracking menstrual cycle information
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface MenstrualCycleCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const MenstrualCycleCard: React.FC<MenstrualCycleCardProps> = ({ register, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(236, 72, 153, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(236, 72, 153, 0.4), rgba(236, 72, 153, 0.2))
            `,
            border: '2px solid rgba(236, 72, 153, 0.5)',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Calendar} size={24} style={{ color: '#EC4899' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Cycle Menstruel</h3>
          <p className="text-white/70 text-sm">Régularité, durée et symptômes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="menstrual_cycle_regular" className="block text-white/90 text-sm font-medium mb-2">
            Cycle régulier
          </label>
          <select
            {...register('menstrual_cycle_regular')}
            id="menstrual_cycle_regular"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="true">Oui, régulier</option>
            <option value="false">Non, irrégulier</option>
          </select>
          {errors.menstrual_cycle_regular && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.menstrual_cycle_regular.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cycle_length_days" className="block text-white/90 text-sm font-medium mb-2">
            Durée moyenne du cycle (jours)
          </label>
          <input
            {...register('cycle_length_days', { valueAsNumber: true })}
            type="number"
            id="cycle_length_days"
            min="20"
            max="45"
            step="1"
            className="glass-input"
            placeholder="28"
          />
          <p className="text-white/50 text-xs mt-1">
            Généralement entre 21 et 35 jours
          </p>
          {errors.cycle_length_days && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.cycle_length_days.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="last_period_date" className="block text-white/90 text-sm font-medium mb-2">
            Date des dernières règles
          </label>
          <input
            {...register('last_period_date')}
            type="date"
            id="last_period_date"
            className="glass-input"
          />
          {errors.last_period_date && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.last_period_date.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="menstrual_symptoms" className="block text-white/90 text-sm font-medium mb-2">
            Symptômes principaux
          </label>
          <input
            {...register('menstrual_symptoms')}
            type="text"
            id="menstrual_symptoms"
            className="glass-input"
            placeholder="Douleurs, flux abondant, SPM..."
          />
          <p className="text-white/50 text-xs mt-1">
            Séparez par des virgules si plusieurs
          </p>
          {errors.menstrual_symptoms && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.menstrual_symptoms.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
