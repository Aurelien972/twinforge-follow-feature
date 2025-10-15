/**
 * BloodTypeSection Component
 * Visual display and selection for blood type with compatibility info
 */

import React from 'react';
import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import type { HealthFormV2 } from '../../Profile/validation/profileHealthValidationV2';

interface BloodTypeSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  currentBloodType?: string;
}

const BLOOD_TYPE_INFO: Record<string, { canReceiveFrom: string[]; canDonateTo: string[]; frequency: string }> = {
  'O-': { canReceiveFrom: ['O-'], canDonateTo: ['All'], frequency: '7%' },
  'O+': { canReceiveFrom: ['O-', 'O+'], canDonateTo: ['O+', 'A+', 'B+', 'AB+'], frequency: '37%' },
  'A-': { canReceiveFrom: ['O-', 'A-'], canDonateTo: ['A-', 'A+', 'AB-', 'AB+'], frequency: '6%' },
  'A+': { canReceiveFrom: ['O-', 'O+', 'A-', 'A+'], canDonateTo: ['A+', 'AB+'], frequency: '36%' },
  'B-': { canReceiveFrom: ['O-', 'B-'], canDonateTo: ['B-', 'B+', 'AB-', 'AB+'], frequency: '2%' },
  'B+': { canReceiveFrom: ['O-', 'O+', 'B-', 'B+'], canDonateTo: ['B+', 'AB+'], frequency: '8%' },
  'AB-': { canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'], canDonateTo: ['AB-', 'AB+'], frequency: '1%' },
  'AB+': { canReceiveFrom: ['All'], canDonateTo: ['AB+'], frequency: '3%' },
};

export const BloodTypeSection: React.FC<BloodTypeSectionProps> = ({
  register,
  errors,
  currentBloodType,
}) => {
  const bloodTypeData = currentBloodType ? BLOOD_TYPE_INFO[currentBloodType] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard
        className="p-6"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.2)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
              `,
              border: '2px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
            }}
          >
            <SpatialIcon Icon={ICONS.Droplet} size={24} style={{ color: '#EF4444' }} variant="pure" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-xl">Groupe Sanguin</h3>
            <p className="text-white/60 text-sm mt-1">Information essentielle en cas d'urgence médicale</p>
          </div>
        </div>

        {/* Blood Type Selection */}
        <div className="mb-6">
          <label htmlFor="bloodType" className="block text-white/90 text-sm font-medium mb-3">
            Sélectionnez votre groupe sanguin
          </label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {Object.keys(BLOOD_TYPE_INFO).map((type) => (
              <label
                key={type}
                className="relative cursor-pointer group"
              >
                <input
                  {...register('bloodType')}
                  type="radio"
                  value={type}
                  className="peer sr-only"
                />
                <div
                  className="
                    flex items-center justify-center
                    h-16 rounded-xl
                    bg-white/5 border-2 border-white/10
                    transition-all duration-300
                    peer-checked:bg-red-500/20
                    peer-checked:border-red-400/50
                    peer-checked:shadow-[0_0_20px_rgba(239,68,68,0.3)]
                    hover:bg-white/10 hover:border-white/20
                    group-hover:scale-105
                  "
                >
                  <span className="text-white font-bold text-lg">{type}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.bloodType && (
            <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
              <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
              {errors.bloodType.message}
            </p>
          )}
        </div>

        {/* Blood Type Info Card - Show when selected */}
        {currentBloodType && bloodTypeData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-xl bg-red-500/10 border border-red-400/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20">
                <SpatialIcon Icon={ICONS.Droplet} size={16} className="text-red-400" />
                <span className="text-red-300 font-bold text-lg">{currentBloodType}</span>
              </div>
              <div className="text-white/60 text-sm">
                Fréquence: <span className="text-white font-medium">{bloodTypeData.frequency}</span> de la population
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Can Receive From */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <SpatialIcon Icon={ICONS.ArrowDown} size={14} className="text-green-400" />
                  <span className="text-white/80 text-sm font-medium">Peut recevoir de:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bloodTypeData.canReceiveFrom[0] === 'All' ? (
                    <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300 border border-green-400/20">
                      Tous les groupes
                    </span>
                  ) : (
                    bloodTypeData.canReceiveFrom.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300 border border-green-400/20"
                      >
                        {type}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Can Donate To */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <SpatialIcon Icon={ICONS.ArrowUp} size={14} className="text-blue-400" />
                  <span className="text-white/80 text-sm font-medium">Peut donner à:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bloodTypeData.canDonateTo[0] === 'All' ? (
                    <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-400/20">
                      Tous les groupes (Donneur universel)
                    </span>
                  ) : (
                    bloodTypeData.canDonateTo.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-400/20"
                      >
                        {type}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Special Status */}
            {currentBloodType === 'O-' && (
              <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                <div className="flex items-start gap-2">
                  <SpatialIcon Icon={ICONS.Star} size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className="text-cyan-300 font-medium text-sm">Donneur Universel</p>
                    <p className="text-white/60 text-xs mt-1">
                      Votre sang peut être donné à toute personne en cas d'urgence
                    </p>
                  </div>
                </div>
              </div>
            )}
            {currentBloodType === 'AB+' && (
              <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                <div className="flex items-start gap-2">
                  <SpatialIcon Icon={ICONS.Star} size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <p className="text-cyan-300 font-medium text-sm">Receveur Universel</p>
                    <p className="text-white/60 text-xs mt-1">
                      Vous pouvez recevoir du sang de tous les groupes sanguins
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Info Banner */}
        <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-400/20">
          <div className="flex items-start gap-2">
            <SpatialIcon Icon={ICONS.Info} size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-xs leading-relaxed">
              Cette information est cruciale pour les services médicaux d'urgence. Assurez-vous de la vérifier avec un professionnel de santé.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
