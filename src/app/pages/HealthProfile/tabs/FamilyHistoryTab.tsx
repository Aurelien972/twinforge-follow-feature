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

export const FamilyHistoryTab: React.FC = () => {
  const { form, state } = useFamilyHistoryFormTab();

  const getRiskColor = () => {
    if (state.geneticRisk.category === 'low') return { color: '#10B981', label: 'Faible', icon: ICONS.Shield };
    if (state.geneticRisk.category === 'moderate') return { color: '#06B6D4', label: 'Modéré', icon: ICONS.Info };
    if (state.geneticRisk.category === 'elevated') return { color: '#F59E0B', label: 'Élevé', icon: ICONS.AlertCircle };
    return { color: '#EF4444', label: 'Très élevé', icon: ICONS.AlertTriangle };
  };

  const riskColor = getRiskColor();

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
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(168, 85, 247, 0.3)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0.2))
                  `,
                  border: '2px solid rgba(168, 85, 247, 0.5)',
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Users} size={24} style={{ color: '#A855F7' }} variant="pure" />
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
                    background: '#A855F7',
                    boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
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
                  background: 'linear-gradient(90deg, #A855F7, rgba(168, 85, 247, 0.8))',
                  boxShadow: '0 0 12px rgba(168, 85, 247, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${state.completion}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Genetic Risk Assessment Card */}
      {state.completion > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="p-6" style={{
            background: `
              radial-gradient(circle at 30% 20%, ${riskColor.color}15 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: `${riskColor.color}40`,
          }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, ${riskColor.color}66, ${riskColor.color}33)
                    `,
                    border: `2px solid ${riskColor.color}80`,
                    boxShadow: `0 0 20px ${riskColor.color}66`,
                  }}
                >
                  <SpatialIcon
                    Icon={riskColor.icon}
                    size={20}
                    style={{ color: riskColor.color }}
                    variant="pure"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Risque Génétique: {riskColor.label}</h3>
                  <p className="text-white/60 text-sm">
                    Score: {state.geneticRisk.score.toFixed(1)}/10
                  </p>
                </div>
              </div>
            </div>

            {state.geneticRisk.hasRisks ? (
              <div>
                <h4 className="text-white/80 text-sm font-medium mb-2">Facteurs héréditaires identifiés:</h4>
                <div className="space-y-2">
                  {state.geneticRisk.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm" style={{ color: riskColor.color }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: riskColor.color }} />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
                {state.geneticRisk.category === 'elevated' || state.geneticRisk.category === 'high' ? (
                  <div className="mt-4 p-3 rounded-lg bg-white/5">
                    <p className="text-white/70 text-sm leading-relaxed">
                      Ces antécédents familiaux nécessitent une attention particulière. Un dépistage préventif régulier
                      et un suivi médical adapté sont recommandés.
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-white/70 text-sm">
                Aucun antécédent familial significatif identifié. Continuez à surveiller votre santé avec des bilans réguliers.
              </p>
            )}
          </GlassCard>
        </motion.div>
      )}

      {/* Main Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={form.handleSubmit}>
          <GlassCard className="p-6" style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(168, 85, 247, 0.2)',
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
