/**
 * TobaccoAlcoholCard Component
 * Card for tracking tobacco and alcohol consumption
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface TobaccoAlcoholCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const TobaccoAlcoholCard: React.FC<TobaccoAlcoholCardProps> = ({ register, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(251, 146, 60, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(251, 146, 60, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(251, 146, 60, 0.4), rgba(251, 146, 60, 0.2))
            `,
            border: '2px solid rgba(251, 146, 60, 0.5)',
            boxShadow: '0 0 30px rgba(251, 146, 60, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Cigarette} size={24} style={{ color: '#FB923C' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Tabac & Alcool</h3>
          <p className="text-white/70 text-sm">Consommation de tabac et d'alcool</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-white/90 font-medium text-sm flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Cigarette} size={16} />
            Tabagisme
          </h4>

          <div>
            <label htmlFor="smoking_status" className="block text-white/90 text-sm font-medium mb-2">
              Statut fumeur
            </label>
            <select
              {...register('smoking_status')}
              id="smoking_status"
              className="glass-input"
            >
              <option value="">Sélectionnez</option>
              <option value="never">Jamais fumé</option>
              <option value="former">Ancien fumeur</option>
              <option value="current">Fumeur actuel</option>
            </select>
            {errors.smoking_status && (
              <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
                <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                {errors.smoking_status.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="smoking_years" className="block text-white/90 text-sm font-medium mb-2">
              Années de tabagisme
            </label>
            <input
              {...register('smoking_years', { valueAsNumber: true })}
              type="number"
              id="smoking_years"
              min="0"
              max="100"
              step="1"
              className="glass-input"
              placeholder="0"
            />
            {errors.smoking_years && (
              <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
                <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                {errors.smoking_years.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white/90 font-medium text-sm flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Wine} size={16} />
            Consommation d'alcool
          </h4>

          <div>
            <label htmlFor="alcohol_frequency" className="block text-white/90 text-sm font-medium mb-2">
              Fréquence de consommation
            </label>
            <select
              {...register('alcohol_frequency')}
              id="alcohol_frequency"
              className="glass-input"
            >
              <option value="">Sélectionnez</option>
              <option value="never">Jamais</option>
              <option value="occasional">Occasionnel (moins d'1 fois/semaine)</option>
              <option value="moderate">Modéré (1-3 fois/semaine)</option>
              <option value="frequent">Fréquent (4+ fois/semaine)</option>
            </select>
            {errors.alcohol_frequency && (
              <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
                <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                {errors.alcohol_frequency.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="alcohol_units_per_week" className="block text-white/90 text-sm font-medium mb-2">
              Unités par semaine
            </label>
            <input
              {...register('alcohol_units_per_week', { valueAsNumber: true })}
              type="number"
              id="alcohol_units_per_week"
              min="0"
              max="200"
              step="1"
              className="glass-input"
              placeholder="0"
            />
            <p className="text-white/50 text-xs mt-1">
              1 unité = 1 verre standard (10g d'alcool pur)
            </p>
            {errors.alcohol_units_per_week && (
              <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
                <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                {errors.alcohol_units_per_week.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
