/**
 * ContraceptionCard Component
 * Card for tracking contraception information
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface ContraceptionCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const ContraceptionCard: React.FC<ContraceptionCardProps> = ({ register, errors }) => {
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
          <SpatialIcon Icon={ICONS.Shield} size={24} style={{ color: '#EC4899' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Contraception</h3>
          <p className="text-white/70 text-sm">Méthode actuelle et effets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contraception_type" className="block text-white/90 text-sm font-medium mb-2">
            Type de contraception
          </label>
          <select
            {...register('contraception_type')}
            id="contraception_type"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="none">Aucune</option>
            <option value="pill">Pilule</option>
            <option value="iud">DIU (stérilet)</option>
            <option value="implant">Implant</option>
            <option value="injection">Injection</option>
            <option value="patch">Patch</option>
            <option value="ring">Anneau vaginal</option>
            <option value="condom">Préservatif</option>
            <option value="natural">Méthodes naturelles</option>
            <option value="other">Autre</option>
          </select>
          {errors.contraception_type && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.contraception_type.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contraception_start_date" className="block text-white/90 text-sm font-medium mb-2">
            Date de début
          </label>
          <input
            {...register('contraception_start_date')}
            type="date"
            id="contraception_start_date"
            className="glass-input"
          />
          {errors.contraception_start_date && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.contraception_start_date.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="contraception_side_effects" className="block text-white/90 text-sm font-medium mb-2">
            Effets secondaires (optionnel)
          </label>
          <textarea
            {...register('contraception_side_effects')}
            id="contraception_side_effects"
            className="glass-input"
            rows={3}
            placeholder="Décrivez les effets secondaires ressentis..."
          />
          {errors.contraception_side_effects && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.contraception_side_effects.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
