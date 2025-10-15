/**
 * LifestyleTab Component
 * Displays and manages lifestyle information with specialized cards
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { TobaccoAlcoholCard, SleepCard, StressAnxietyCard, HydrationCard, ScreenTimeCard } from '../components/lifestyle';
import { useLifestyleFormTab } from '../hooks/useLifestyleFormTab';

export const LifestyleTab: React.FC = () => {
  const { form, state } = useLifestyleFormTab();

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
                <h2 className="text-white font-bold text-xl">Vie</h2>
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

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard className="p-4" style={{
          background: 'rgba(59, 130, 246, 0.05)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
        }}>
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Ces informations permettent de créer un profil complet de votre mode de vie.
                Les données seront analysées par l'IA pour vous fournir des recommandations préventives personnalisées.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Main Form */}
      <form onSubmit={form.handleSubmit}>
        <div className="space-y-6">
          {/* Tobacco & Alcohol Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TobaccoAlcoholCard register={form.register} errors={form.errors} />
          </motion.div>

          {/* Sleep Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SleepCard register={form.register} errors={form.errors} />
          </motion.div>

          {/* Stress & Anxiety Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StressAnxietyCard register={form.register} errors={form.errors} />
          </motion.div>

          {/* Hydration Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <HydrationCard register={form.register} errors={form.errors} />
          </motion.div>

          {/* Screen Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ScreenTimeCard register={form.register} errors={form.errors} />
          </motion.div>

          {/* Save Button */}
          {form.isDirty && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center pt-4"
            >
              <button
                type="submit"
                disabled={state.saving || !form.isValid}
                className="btn-glass--primary px-8 py-4 text-lg font-semibold"
              >
                <div className="flex items-center gap-3">
                  {state.saving ? (
                    <SpatialIcon Icon={ICONS.Loader2} size={20} className="animate-spin" />
                  ) : (
                    <SpatialIcon Icon={ICONS.Save} size={20} />
                  )}
                  <span>{state.saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
                </div>
              </button>
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
};
