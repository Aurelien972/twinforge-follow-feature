/**
 * LifestyleTab Component
 * Displays and manages lifestyle information (smoking, alcohol, sleep, stress, activity)
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { LifestyleSection } from '../../Profile/components/health/LifestyleSection';
import { useLifestyleFormTab } from '../hooks/useLifestyleFormTab';

export const LifestyleTab: React.FC = () => {
  const { form, state } = useLifestyleFormTab();

  const getRiskColor = () => {
    if (state.lifestyleRisk.category === 'optimal') return { color: '#10B981', label: 'Optimal', icon: ICONS.CheckCircle };
    if (state.lifestyleRisk.category === 'good') return { color: '#06B6D4', label: 'Bon', icon: ICONS.ThumbsUp };
    if (state.lifestyleRisk.category === 'moderate') return { color: '#F59E0B', label: 'Modéré', icon: ICONS.AlertCircle };
    return { color: '#EF4444', label: 'Élevé', icon: ICONS.AlertTriangle };
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
            radial-gradient(circle at 30% 20%, rgba(255, 152, 0, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(255, 152, 0, 0.3)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(255, 152, 0, 0.4), rgba(255, 152, 0, 0.2))
                  `,
                  border: '2px solid rgba(255, 152, 0, 0.5)',
                  boxShadow: '0 0 30px rgba(255, 152, 0, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Coffee} size={24} style={{ color: '#FF9800' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Style de Vie</h2>
                <p className="text-white/70 text-sm">Habitudes quotidiennes et facteurs de santé</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: '#FF9800',
                    boxShadow: '0 0 8px rgba(255, 152, 0, 0.6)',
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
                  background: 'linear-gradient(90deg, #FF9800, rgba(255, 152, 0, 0.8))',
                  boxShadow: '0 0 12px rgba(255, 152, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${state.completion}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Risk Assessment Card */}
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
                  <h3 className="text-white font-semibold">Niveau de Risque: {riskColor.label}</h3>
                  <p className="text-white/60 text-sm">
                    Score: {state.lifestyleRisk.score.toFixed(1)}/10
                  </p>
                </div>
              </div>
            </div>

            {state.lifestyleRisk.hasRisks && (
              <div>
                <h4 className="text-white/80 text-sm font-medium mb-2">Facteurs identifiés:</h4>
                <div className="space-y-2">
                  {state.lifestyleRisk.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm" style={{ color: riskColor.color }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: riskColor.color }} />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!state.lifestyleRisk.hasRisks && (
              <p className="text-white/70 text-sm">
                Félicitations! Votre mode de vie est optimal pour votre santé. Continuez ainsi!
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
              radial-gradient(circle at 30% 20%, rgba(255, 152, 0, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(255, 152, 0, 0.2)',
          }}>
            <LifestyleSection
              register={form.register}
              errors={form.errors}
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

      {/* Recommendations */}
      {state.lifestyleRisk.hasRisks && (
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
              <SpatialIcon Icon={ICONS.Lightbulb} size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-300 text-sm font-medium mb-2">Recommandations préventives:</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Considérez consulter un professionnel de santé pour discuter de ces facteurs et établir un plan
                  d'amélioration personnalisé.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};
