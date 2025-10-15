/**
 * SexualActivityCard Component
 * Card for tracking sexual activity and satisfaction (common to all genders)
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface SexualActivityCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const SexualActivityCard: React.FC<SexualActivityCardProps> = ({ register, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(249, 115, 22, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(249, 115, 22, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(249, 115, 22, 0.4), rgba(249, 115, 22, 0.2))
            `,
            border: '2px solid rgba(249, 115, 22, 0.5)',
            boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Heart} size={24} style={{ color: '#F97316' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Activité Sexuelle</h3>
          <p className="text-white/70 text-sm">Fréquence, satisfaction et préoccupations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sexual_activity_frequency" className="block text-white/90 text-sm font-medium mb-2">
            Fréquence d'activité sexuelle
          </label>
          <select
            {...register('sexual_activity_frequency')}
            id="sexual_activity_frequency"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="never">Jamais</option>
            <option value="rarely">Rarement (moins d'1 fois/mois)</option>
            <option value="monthly">Mensuelle</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="daily">Quotidienne</option>
          </select>
          {errors.sexual_activity_frequency && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.sexual_activity_frequency.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="sexual_satisfaction" className="block text-white/90 text-sm font-medium mb-2">
            Niveau de satisfaction (1-10)
          </label>
          <input
            {...register('sexual_satisfaction', { valueAsNumber: true })}
            type="number"
            id="sexual_satisfaction"
            min="1"
            max="10"
            step="1"
            className="glass-input"
            placeholder="7"
          />
          <p className="text-white/50 text-xs mt-1">
            1 = Très insatisfait, 10 = Très satisfait
          </p>
          {errors.sexual_satisfaction && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.sexual_satisfaction.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="sexual_concerns" className="block text-white/90 text-sm font-medium mb-2">
            Préoccupations ou questions (optionnel)
          </label>
          <textarea
            {...register('sexual_concerns')}
            id="sexual_concerns"
            className="glass-input"
            rows={3}
            placeholder="Décrivez toute préoccupation concernant votre santé sexuelle..."
          />
          <p className="text-white/50 text-xs mt-1">
            Ces informations sont confidentielles et aideront à personnaliser les recommandations médicales
          </p>
          {errors.sexual_concerns && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.sexual_concerns.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
