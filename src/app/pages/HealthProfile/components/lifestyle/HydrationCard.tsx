/**
 * HydrationCard Component
 * Card for tracking daily water intake
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface HydrationCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const HydrationCard: React.FC<HydrationCardProps> = ({ register, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(245, 158, 11, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.2))
            `,
            border: '2px solid rgba(245, 158, 11, 0.5)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Droplet} size={24} style={{ color: '#F59E0B' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Hydratation</h3>
          <p className="text-white/70 text-sm">Consommation d'eau quotidienne</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="hydration_liters_per_day" className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Droplet} size={14} />
            Litres d'eau par jour
          </label>
          <input
            {...register('hydration_liters_per_day', { valueAsNumber: true })}
            type="number"
            id="hydration_liters_per_day"
            min="0"
            max="10"
            step="0.1"
            className="glass-input"
            placeholder="2.0"
          />
          <p className="text-white/50 text-xs mt-1">
            Recommandé: 1.5-2.5 litres par jour
          </p>
          {errors.hydration_liters_per_day && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.hydration_liters_per_day.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20 w-full">
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.Info} size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-cyan-200 text-sm leading-relaxed">
                  Une bonne hydratation est essentielle pour le fonctionnement optimal de votre organisme,
                  la régulation de la température corporelle et l'élimination des toxines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
