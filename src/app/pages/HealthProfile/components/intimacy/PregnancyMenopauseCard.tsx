/**
 * PregnancyMenopauseCard Component
 * Card for tracking pregnancy history and menopause status
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface PregnancyMenopauseCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const PregnancyMenopauseCard: React.FC<PregnancyMenopauseCardProps> = ({ register, errors }) => {
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
          <SpatialIcon Icon={ICONS.Baby} size={24} style={{ color: '#EC4899' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Grossesse & Ménopause</h3>
          <p className="text-white/70 text-sm">Historique de grossesse et statut ménopause</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pregnancy_count" className="block text-white/90 text-sm font-medium mb-2">
            Nombre de grossesses
          </label>
          <input
            {...register('pregnancy_count', { valueAsNumber: true })}
            type="number"
            id="pregnancy_count"
            min="0"
            max="20"
            step="1"
            className="glass-input"
            placeholder="0"
          />
          {errors.pregnancy_count && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.pregnancy_count.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="menopause_status" className="block text-white/90 text-sm font-medium mb-2">
            Statut ménopause
          </label>
          <select
            {...register('menopause_status')}
            id="menopause_status"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="pre">Pré-ménopause</option>
            <option value="peri">Péri-ménopause</option>
            <option value="post">Post-ménopause</option>
            <option value="not_applicable">Non applicable</option>
          </select>
          {errors.menopause_status && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.menopause_status.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="menopause_age" className="block text-white/90 text-sm font-medium mb-2">
            Âge de début ménopause
          </label>
          <input
            {...register('menopause_age', { valueAsNumber: true })}
            type="number"
            id="menopause_age"
            min="35"
            max="65"
            step="1"
            className="glass-input"
            placeholder="50"
          />
          <p className="text-white/50 text-xs mt-1">
            Si applicable
          </p>
          {errors.menopause_age && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.menopause_age.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="menopause_symptoms" className="block text-white/90 text-sm font-medium mb-2">
            Symptômes ménopause
          </label>
          <input
            {...register('menopause_symptoms')}
            type="text"
            id="menopause_symptoms"
            className="glass-input"
            placeholder="Bouffées de chaleur, troubles sommeil..."
          />
          <p className="text-white/50 text-xs mt-1">
            Séparez par des virgules si plusieurs
          </p>
          {errors.menopause_symptoms && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.menopause_symptoms.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
