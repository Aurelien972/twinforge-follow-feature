/**
 * MaleReproductiveHealthCard Component
 * Card for tracking male reproductive health
 */

import React from 'react';
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { RatingSlider } from '../../../../../ui/components/RatingSlider';

interface MaleReproductiveHealthCardProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
}

export const MaleReproductiveHealthCard: React.FC<MaleReproductiveHealthCardProps> = ({ register, control, errors }) => {
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
          <SpatialIcon Icon={ICONS.Activity} size={24} style={{ color: '#3B82F6' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Santé Reproductive Masculine</h3>
          <p className="text-white/70 text-sm">Fertilité, fonction érectile et libido</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="male_fertility_concerns" className="block text-white/90 text-sm font-medium mb-2">
            Préoccupations de fertilité
          </label>
          <select
            {...register('male_fertility_concerns')}
            id="male_fertility_concerns"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="false">Aucune préoccupation</option>
            <option value="true">Oui, j'ai des préoccupations</option>
          </select>
          {errors.male_fertility_concerns && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.male_fertility_concerns.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="male_fertility_details" className="block text-white/90 text-sm font-medium mb-2">
            Détails (optionnel)
          </label>
          <input
            {...register('male_fertility_details')}
            type="text"
            id="male_fertility_details"
            className="glass-input"
            placeholder="Décrivez brièvement..."
          />
          {errors.male_fertility_details && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.male_fertility_details.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="erectile_function"
            control={control}
            render={({ field }) => (
              <RatingSlider
                value={field.value}
                onChange={field.onChange}
                label="Fonction érectile"
                helperText="1 = Très faible, 10 = Excellente"
                lowLabel="Faible"
                highLabel="Excellente"
                color="#3B82F6"
              />
            )}
          />
          {errors.erectile_function && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.erectile_function.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="libido_level"
            control={control}
            render={({ field }) => (
              <RatingSlider
                value={field.value}
                onChange={field.onChange}
                label="Niveau de libido"
                helperText="1 = Très faible, 10 = Très élevée"
                lowLabel="Faible"
                highLabel="Élevée"
                color="#3B82F6"
              />
            )}
          />
          {errors.libido_level && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.libido_level.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="testosterone_concerns" className="block text-white/90 text-sm font-medium mb-2">
            Préoccupations hormonales (testostérone)
          </label>
          <select
            {...register('testosterone_concerns')}
            id="testosterone_concerns"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="false">Aucune préoccupation</option>
            <option value="true">Oui, j'ai des préoccupations</option>
          </select>
          {errors.testosterone_concerns && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.testosterone_concerns.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="prostate_checkup_date" className="block text-white/90 text-sm font-medium mb-2">
            Date dernier examen prostate
          </label>
          <input
            {...register('prostate_checkup_date')}
            type="date"
            id="prostate_checkup_date"
            className="glass-input"
          />
          {errors.prostate_checkup_date && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.prostate_checkup_date.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
