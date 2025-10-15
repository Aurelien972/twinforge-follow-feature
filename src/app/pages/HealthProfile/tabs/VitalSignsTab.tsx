/**
 * VitalSignsTab Component
 * Displays and manages vital signs measurements
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { VitalSignsSection } from '../../Profile/components/health/VitalSignsSection';
import { useVitalSignsFormTab } from '../hooks/useVitalSignsFormTab';

export const VitalSignsTab: React.FC = () => {
  const { form, state } = useVitalSignsFormTab();

  const getStatusColor = () => {
    if (state.vitalStatus.status === 'normal') return { color: '#10B981', label: 'Normal' };
    if (state.vitalStatus.status === 'attention') return { color: '#F59E0B', label: 'Attention' };
    return { color: '#EF4444', label: 'À surveiller' };
  };

  const statusColor = getStatusColor();

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
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.3)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                  `,
                  border: '2px solid rgba(239, 68, 68, 0.5)',
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Activity} size={24} style={{ color: '#EF4444' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Vitales</h2>
                <p className="text-white/70 text-sm">Tension, rythme cardiaque, glycémie</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: '#EF4444',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
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
                  background: 'linear-gradient(90deg, #EF4444, rgba(239, 68, 68, 0.8))',
                  boxShadow: '0 0 12px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${state.completion}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Status Card */}
      {state.completion > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard className="p-6" style={{
            background: `
              radial-gradient(circle at 30% 20%, ${statusColor.color}15 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: `${statusColor.color}40`,
          }}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, ${statusColor.color}66, ${statusColor.color}33)
                  `,
                  border: `2px solid ${statusColor.color}80`,
                  boxShadow: `0 0 20px ${statusColor.color}66`,
                }}
              >
                <SpatialIcon
                  Icon={state.vitalStatus.hasWarnings ? ICONS.AlertCircle : ICONS.CheckCircle}
                  size={20}
                  style={{ color: statusColor.color }}
                  variant="pure"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">État de santé: {statusColor.label}</h3>
                <p className="text-white/60 text-sm">
                  {state.vitalStatus.hasWarnings
                    ? `${state.vitalStatus.warnings.length} point(s) nécessitant attention`
                    : 'Toutes vos constantes sont dans les normes'}
                </p>
              </div>
            </div>
            {state.vitalStatus.hasWarnings && (
              <div className="space-y-2">
                {state.vitalStatus.warnings.map((warning, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm" style={{ color: statusColor.color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor.color }} />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
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
              radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(239, 68, 68, 0.2)',
          }}>
            <VitalSignsSection
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

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlassCard className="p-4" style={{
          background: 'rgba(255, 152, 0, 0.05)',
          borderColor: 'rgba(255, 152, 0, 0.2)',
        }}>
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-orange-300">Important:</strong> Ces indicateurs ne remplacent pas un avis médical.
              Si vous constatez des valeurs anormales, consultez un professionnel de santé.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
