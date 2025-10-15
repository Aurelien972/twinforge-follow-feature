/**
 * STIScreeningCard Component
 * Card for tracking STI screening history (common to all genders)
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface STIScreeningCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const STIScreeningCard: React.FC<STIScreeningCardProps> = ({ register, errors }) => {
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
          <SpatialIcon Icon={ICONS.TestTube} size={24} style={{ color: '#EC4899' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Dépistage IST</h3>
          <p className="text-white/70 text-sm">Derniers dépistages et résultats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="last_sti_screening_date" className="block text-white/90 text-sm font-medium mb-2">
            Date du dernier dépistage
          </label>
          <input
            {...register('last_sti_screening_date')}
            type="date"
            id="last_sti_screening_date"
            className="glass-input"
          />
          <p className="text-white/50 text-xs mt-1">
            Recommandé annuellement si sexuellement actif
          </p>
          {errors.last_sti_screening_date && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.last_sti_screening_date.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="sti_screening_results" className="block text-white/90 text-sm font-medium mb-2">
            Résultats
          </label>
          <select
            {...register('sti_screening_results')}
            id="sti_screening_results"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="negative">Négatif (aucune IST détectée)</option>
            <option value="positive">Positif (IST détectée)</option>
            <option value="pending">En attente des résultats</option>
            <option value="not_tested">Jamais dépisté</option>
          </select>
          {errors.sti_screening_results && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.sti_screening_results.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-400/20">
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.Info} size={18} className="text-pink-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-pink-200 text-sm leading-relaxed">
                  Le dépistage régulier des IST est essentiel pour la santé sexuelle, même en l'absence de symptômes.
                  Ces informations sont strictement confidentielles et protégées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
