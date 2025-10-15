/**
 * Basic Health Section Component
 * Blood type and basic measurements
 * Optimized version with simplified labels and enhanced blood type display
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
    <div className="space-y-6">
      {/* Blood Type Section - Optimized Display */}
      <div>
        <h4 className="text-white/80 text-sm font-medium mb-3 flex items-center gap-2">
          <SpatialIcon Icon={ICONS.Droplet} size={16} className="text-red-400" />
          Groupe sanguin
        </h4>
        <select
          {...register('basic.bloodType')}
          id="basic.bloodType"
          className="glass-input w-full md:w-48"
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

      {/* Measurements Section - Simplified Labels */}
      <div>
        <h4 className="text-white/80 text-sm font-medium mb-3 flex items-center gap-2">
          <SpatialIcon Icon={ICONS.Ruler} size={16} className="text-cyan-400" />
          Mensurations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register('basic.height_cm', { valueAsNumber: true })}
              type="number"
              id="basic.height_cm"
              min="120"
              max="230"
              step="1"
              className="glass-input"
              placeholder="Taille en cm (ex: 175)"
            />
            {errors.basic?.height_cm && (
              <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                {errors.basic.height_cm.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('basic.weight_kg', { valueAsNumber: true })}
              type="number"
              id="basic.weight_kg"
              min="30"
              max="300"
              step="0.1"
              className="glass-input"
              placeholder="Poids en kg (ex: 70)"
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

      {/* Vaccinations Section */}
      <div>
        <h4 className="text-white/80 text-sm font-medium mb-3 flex items-center gap-2">
          <SpatialIcon Icon={ICONS.Shield} size={16} className="text-green-400" />
          Vaccinations
        </h4>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register('vaccinations.up_to_date')}
              type="checkbox"
              className="glass-checkbox"
            />
            <span className="text-white/70 text-sm">Vaccins à jour</span>
          </label>
        </div>
        {errors.vaccinations?.up_to_date && (
          <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
            <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
            {errors.vaccinations.up_to_date.message}
          </p>
        )}
      </div>
    </div>
  );
};
