/**
 * ScreenTimeCard Component
 * Card for tracking daily screen time and break habits
 */

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface ScreenTimeCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const ScreenTimeCard: React.FC<ScreenTimeCardProps> = ({ register, errors }) => {
  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'rgba(168, 85, 247, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0.2))
            `,
            border: '2px solid rgba(168, 85, 247, 0.5)',
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
          }}
        >
          <SpatialIcon Icon={ICONS.Monitor} size={24} style={{ color: '#A855F7' }} variant="pure" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Temps d'Écran</h3>
          <p className="text-white/70 text-sm">Exposition quotidienne aux écrans</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="screen_time_hours_per_day" className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Monitor} size={14} />
            Heures d'écran par jour
          </label>
          <input
            {...register('screen_time_hours_per_day', { valueAsNumber: true })}
            type="number"
            id="screen_time_hours_per_day"
            min="0"
            max="24"
            step="0.5"
            className="glass-input"
            placeholder="8.0"
          />
          <p className="text-white/50 text-xs mt-1">
            Inclut ordinateur, téléphone, télévision
          </p>
          {errors.screen_time_hours_per_day && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.screen_time_hours_per_day.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="takes_screen_breaks" className="block text-white/90 text-sm font-medium mb-2 flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Timer} size={14} />
            Pauses régulières
          </label>
          <select
            {...register('takes_screen_breaks')}
            id="takes_screen_breaks"
            className="glass-input"
          >
            <option value="">Sélectionnez</option>
            <option value="true">Oui, je prends des pauses</option>
            <option value="false">Non, peu de pauses</option>
          </select>
          <p className="text-white/50 text-xs mt-1">
            Règle 20-20-20: toutes les 20 min, 20 sec de pause, 20 pieds de distance
          </p>
          {errors.takes_screen_breaks && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.takes_screen_breaks.message}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
