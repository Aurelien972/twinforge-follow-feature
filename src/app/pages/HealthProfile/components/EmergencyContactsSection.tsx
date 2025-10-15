/**
 * EmergencyContactsSection Component
 * Manages emergency contact and primary care physician information
 */

import React from 'react';
import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

interface EmergencyContactsSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const EmergencyContactsSection: React.FC<EmergencyContactsSectionProps> = ({
  register,
  errors,
}) => {
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
            <SpatialIcon Icon={ICONS.Shield} size={24} style={{ color: '#EF4444' }} variant="pure" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-xl">Contacts d'Urgence</h3>
            <p className="text-white/60 text-sm mt-1">Informations essentielles en cas d'urgence médicale</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20">
            <SpatialIcon Icon={ICONS.AlertCircle} size={14} className="text-red-400" />
            <span className="text-red-300 text-xs font-medium">Critique</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Emergency Contact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <SpatialIcon Icon={ICONS.Phone} size={16} className="text-red-400" />
              <h4 className="text-white/90 font-medium">Contact d'Urgence</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="emergency_contact.name" className="block text-white/80 text-sm mb-2">
                  Nom complet *
                </label>
                <input
                  {...register('emergency_contact.name')}
                  type="text"
                  id="emergency_contact.name"
                  className="glass-input"
                  placeholder="Jean Dupont"
                />
                {errors.emergency_contact?.name && (
                  <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                    <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                    {errors.emergency_contact.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emergency_contact.phone" className="block text-white/80 text-sm mb-2">
                    Téléphone *
                  </label>
                  <input
                    {...register('emergency_contact.phone')}
                    type="tel"
                    id="emergency_contact.phone"
                    className="glass-input"
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.emergency_contact?.phone && (
                    <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                      <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                      {errors.emergency_contact.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="emergency_contact.relationship" className="block text-white/80 text-sm mb-2">
                    Relation *
                  </label>
                  <select
                    {...register('emergency_contact.relationship')}
                    id="emergency_contact.relationship"
                    className="glass-input"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="conjoint">Conjoint(e)</option>
                    <option value="parent">Parent</option>
                    <option value="enfant">Enfant</option>
                    <option value="frere_soeur">Frère/Sœur</option>
                    <option value="ami">Ami(e)</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.emergency_contact?.relationship && (
                    <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                      <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                      {errors.emergency_contact.relationship.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Primary Care Physician */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <SpatialIcon Icon={ICONS.Stethoscope} size={16} className="text-cyan-400" />
              <h4 className="text-white/90 font-medium">Médecin Traitant</h4>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primary_care_physician.name" className="block text-white/80 text-sm mb-2">
                    Nom du médecin *
                  </label>
                  <input
                    {...register('primary_care_physician.name')}
                    type="text"
                    id="primary_care_physician.name"
                    className="glass-input"
                    placeholder="Dr. Marie Martin"
                  />
                  {errors.primary_care_physician?.name && (
                    <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                      <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                      {errors.primary_care_physician.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="primary_care_physician.phone" className="block text-white/80 text-sm mb-2">
                    Téléphone *
                  </label>
                  <input
                    {...register('primary_care_physician.phone')}
                    type="tel"
                    id="primary_care_physician.phone"
                    className="glass-input"
                    placeholder="+33 1 23 45 67 89"
                  />
                  {errors.primary_care_physician?.phone && (
                    <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                      <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                      {errors.primary_care_physician.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="primary_care_physician.email" className="block text-white/80 text-sm mb-2">
                  Email (optionnel)
                </label>
                <input
                  {...register('primary_care_physician.email')}
                  type="email"
                  id="primary_care_physician.email"
                  className="glass-input"
                  placeholder="dr.martin@example.com"
                />
                {errors.primary_care_physician?.email && (
                  <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                    <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                    {errors.primary_care_physician.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="primary_care_physician.address" className="block text-white/80 text-sm mb-2">
                  Adresse du cabinet (optionnel)
                </label>
                <textarea
                  {...register('primary_care_physician.address')}
                  id="primary_care_physician.address"
                  rows={2}
                  className="glass-input resize-none"
                  placeholder="123 Rue de la Santé, 75001 Paris"
                />
                {errors.primary_care_physician?.address && (
                  <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                    <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                    {errors.primary_care_physician.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Important Info Banner */}
        <div className="mt-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30">
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.AlertTriangle} size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 font-medium text-sm mb-2">Information Critique</p>
              <p className="text-white/70 text-xs leading-relaxed">
                Ces informations peuvent être vitales en cas d'urgence médicale. Assurez-vous qu'elles sont toujours à jour et exactes.
                Les services d'urgence peuvent y accéder rapidement pour vous contacter ou contacter votre médecin.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Info */}
        <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-400/20">
          <div className="flex items-start gap-2">
            <SpatialIcon Icon={ICONS.Lock} size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-xs leading-relaxed">
              Ces données sont sécurisées et ne seront utilisées qu'en cas d'urgence médicale ou pour votre suivi de santé.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
