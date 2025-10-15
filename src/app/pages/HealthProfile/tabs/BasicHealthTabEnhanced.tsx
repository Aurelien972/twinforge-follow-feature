/**
 * BasicHealthTabEnhanced Component
 * Displays and manages basic health information (blood type, height, weight, BMI)
 * Enhanced version with medical conditions and medications
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { BasicHealthSection } from '../../Profile/components/health/BasicHealthSection';
import { MedicalConditionsSection } from '../components/MedicalConditionsSection';
import { useBasicHealthForm } from '../hooks/useBasicHealthForm';
import { useMedicalConditionsForm } from '../hooks/useMedicalConditionsForm';

export const BasicHealthTabEnhanced: React.FC = () => {
  const { form, state } = useBasicHealthForm();
  const medicalConditions = useMedicalConditionsForm();

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(6, 182, 212, 0.3)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2))
                  `,
                  border: '2px solid rgba(6, 182, 212, 0.5)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Scale} size={24} style={{ color: '#06B6D4' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Informations de Base</h2>
                <p className="text-white/70 text-sm">Groupe sanguin, taille, poids, IMC et conditions médicales</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: '#06B6D4',
                    boxShadow: '0 0 8px rgba(6, 182, 212, 0.6)',
                  }}
                />
                <span className="text-white font-bold text-lg">{state.completion}%</span>
              </div>
              <span className="text-white/60 text-xs">Complété</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-3 rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #06B6D4, rgba(6, 182, 212, 0.8))',
                  boxShadow: '0 0 12px rgba(6, 182, 212, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${state.completion}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg,
                      transparent 0%,
                      rgba(255,255,255,0.4) 50%,
                      transparent 100%
                    )`,
                    animation: 'progressShimmer 2s ease-in-out infinite',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* BMI Display Card */}
      {state.calculatedBMI && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="p-6" style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(16, 185, 129, 0.3)',
          }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.2))
                    `,
                    border: '2px solid rgba(16, 185, 129, 0.5)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <SpatialIcon Icon={ICONS.Activity} size={20} style={{ color: '#10B981' }} variant="pure" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Indice de Masse Corporelle (IMC)</h3>
                  <p className="text-white/60 text-sm">Calculé automatiquement</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">{state.calculatedBMI}</div>
                <div className="text-xs text-white/60">
                  {state.calculatedBMI < 18.5 && 'Insuffisance pondérale'}
                  {state.calculatedBMI >= 18.5 && state.calculatedBMI < 25 && 'Poids normal'}
                  {state.calculatedBMI >= 25 && state.calculatedBMI < 30 && 'Surpoids'}
                  {state.calculatedBMI >= 30 && 'Obésité'}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Main Form - Basic Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={form.handleSubmit}>
          <GlassCard className="p-6" style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(6, 182, 212, 0.2)',
          }}>
            <div className="mb-6">
              <h3 className="text-white font-semibold text-lg mb-2">Vos Mesures</h3>
              <p className="text-white/60 text-sm">
                Ces informations de base permettent de calculer votre IMC et d'adapter les recommandations de santé.
              </p>
            </div>

            <BasicHealthSection
              register={form.register}
              errors={form.errors}
            />

            {/* Save Button */}
            {form.isDirty && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-end"
              >
                <button
                  type="submit"
                  disabled={state.saving || !form.isValid}
                  className="btn-glass--primary px-6 py-3"
                >
                  <div className="flex items-center gap-2">
                    {state.saving ? (
                      <SpatialIcon Icon={ICONS.Loader2} size={18} className="animate-spin" />
                    ) : (
                      <SpatialIcon Icon={ICONS.Save} size={18} />
                    )}
                    <span>{state.saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
                  </div>
                </button>
              </motion.div>
            )}
          </GlassCard>
        </form>
      </motion.div>

      {/* Medical Conditions Section */}
      <MedicalConditionsSection
        conditions={medicalConditions.conditions}
        medications={medicalConditions.medications}
        newCondition={medicalConditions.newCondition}
        newMedication={medicalConditions.newMedication}
        setNewCondition={medicalConditions.setNewCondition}
        setNewMedication={medicalConditions.setNewMedication}
        onAddCondition={medicalConditions.addCondition}
        onAddMedication={medicalConditions.addMedication}
        onRemoveCondition={medicalConditions.removeCondition}
        onRemoveMedication={medicalConditions.removeMedication}
        onDeclareNoIssues={medicalConditions.declareNoIssues}
        hasDeclaredNoIssues={medicalConditions.hasDeclaredNoIssues}
        onSave={medicalConditions.saveChanges}
        isSaving={medicalConditions.saving}
        isDirty={medicalConditions.isDirty}
      />

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlassCard className="p-4" style={{
          background: 'rgba(59, 130, 246, 0.05)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
        }}>
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-blue-300">Note:</strong> L'IMC est un indicateur général. Pour une évaluation
              complète de votre santé, consultez votre médecin et complétez les autres sections de votre profil.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
