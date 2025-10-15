/**
 * FamilyHistoryTab Component
 * Displays and manages family medical history
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { FamilyHistorySection } from '../../Profile/components/health/FamilyHistorySection';
import { useFamilyHistoryFormTab } from '../hooks/useFamilyHistoryFormTab';
import UnsavedChangesIndicator from '../../../../ui/components/UnsavedChangesIndicator';
import { useUnsavedChangesWarning } from '../../../../hooks/useUnsavedChangesWarning';

export const FamilyHistoryTab: React.FC = () => {
  const { form, state } = useFamilyHistoryFormTab();

  // Warn user about unsaved changes
  useUnsavedChangesWarning({ isDirty: form.isDirty });

  return (
    <div className="space-y-6">
      {/* Unsaved Changes Indicator */}
      <UnsavedChangesIndicator
        isDirty={form.isDirty}
        onSave={form.handleSubmit}
        isSaving={state.saving}
        isValid={form.isValid}
      />

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
                <SpatialIcon Icon={ICONS.Users} size={24} style={{ color: '#06B6D4' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Famille</h2>
                <p className="text-white/70 text-sm">Antécédents familiaux et prédispositions génétiques</p>
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
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>


      {/* Main Form */}
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
            <FamilyHistorySection
              register={form.register}
              errors={form.errors}
              watch={form.watch}
              setValue={form.setValue}
            />

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

      {/* Educational Info */}
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
            <div>
              <p className="text-blue-300 text-sm font-medium mb-2">Pourquoi ces informations sont importantes:</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Connaître vos antécédents familiaux permet d'identifier les prédispositions génétiques et d'établir
                un plan de prévention personnalisé. Ces informations guident les recommandations de dépistage et de
                surveillance médicale.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
