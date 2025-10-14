/**
 * Basic Health Section Component
 * Blood type and basic measurements
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import type { HealthFormV2 } from '../../validation/profileHealthValidationV2';

interface BasicHealthSectionProps {
  register: UseFormRegister<HealthFormV2>;
  errors: FieldErrors<HealthFormV2>;
}

export const BasicHealthSection: React.FC<BasicHealthSectionProps> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="basic.bloodType" className="block text-white/90 text-sm font-medium mb-2">
            Groupe sanguin
          </label>
          <select
            {...register('basic.bloodType')}
            id="basic.bloodType"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.basic?.bloodType && (
            <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.basic.bloodType.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="basic.height_cm" className="block text-white/90 text-sm font-medium mb-2">
            Taille (cm)
          </label>
          <input
            {...register('basic.height_cm', { valueAsNumber: true })}
            type="number"
            id="basic.height_cm"
            min="120"
            max="230"
            step="1"
            className="glass-input"
            placeholder="175"
          />
          {errors.basic?.height_cm && (
            <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.basic.height_cm.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="basic.weight_kg" className="block text-white/90 text-sm font-medium mb-2">
            Poids (kg)
          </label>
          <input
            {...register('basic.weight_kg', { valueAsNumber: true })}
            type="number"
            id="basic.weight_kg"
            min="30"
            max="300"
            step="0.1"
            className="glass-input"
            placeholder="70"
          />
          {errors.basic?.weight_kg && (
            <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.basic.weight_kg.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
