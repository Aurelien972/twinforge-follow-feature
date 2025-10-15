/**
 * IntimacyTab Component
 * Displays intimacy and reproductive health information with gender-specific components
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useIntimacyFormTab } from '../hooks/useIntimacyFormTab';
import {
  MaleReproductiveHealthCard,
  MenstrualCycleCard,
  PregnancyMenopauseCard,
  ContraceptionCard,
  SexualActivityCard,
  STIScreeningCard,
} from '../components/intimacy';

export const IntimacyTab: React.FC = () => {
  const { form, state } = useIntimacyFormTab();
  const userGender = state.userGender;

  // If no gender is set, show a message to complete profile
  if (!userGender) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 max-w-md text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(236, 72, 153, 0.4), rgba(236, 72, 153, 0.2))
                `,
                border: '2px solid rgba(236, 72, 153, 0.5)',
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
              }}
            >
              <SpatialIcon Icon={ICONS.Heart} size={32} className="text-pink-400" />
            </div>
            <h2 className="text-white font-semibold text-xl mb-2">Genre non défini</h2>
            <p className="text-white/60 text-sm mb-4">
              Veuillez compléter votre profil (onglet Identité) pour accéder aux informations de santé sexuelle et reproductive adaptées.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  const isMale = userGender === 'male';
  const isFemale = userGender === 'female';

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
            radial-gradient(circle at 30% 20%, rgba(236, 72, 153, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(236, 72, 153, 0.3)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(236, 72, 153, 0.4), rgba(236, 72, 153, 0.2))
                  `,
                  border: '2px solid rgba(236, 72, 153, 0.5)',
                  boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Heart} size={24} style={{ color: '#EC4899' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Intimité</h2>
                <p className="text-white/70 text-sm">Santé sexuelle et reproductive</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{
                background: 'rgba(236, 72, 153, 0.15)',
                border: '1px solid rgba(236, 72, 153, 0.3)',
              }}>
                <div className="w-2 h-2 rounded-full bg-pink-400" />
                <span className="text-pink-300 text-sm font-medium">Confidentiel</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: '#EC4899',
                      boxShadow: '0 0 8px rgba(236, 72, 153, 0.6)',
                    }}
                  />
                  <span className="text-white font-bold text-lg">{state.completion}%</span>
                </div>
                <span className="text-white/60 text-xs">Complété</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-3 rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #EC4899, rgba(236, 72, 153, 0.8))',
                  boxShadow: '0 0 12px rgba(236, 72, 153, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${state.completion}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-400/20">
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.Lock} size={18} className="text-pink-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-pink-200 text-sm leading-relaxed">
                  Toutes les informations de cette section sont strictement confidentielles et protégées.
                  Elles permettent de personnaliser les recommandations médicales préventives.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <form onSubmit={form.handleSubmit}>
        <div className="space-y-6">
          {/* Male-specific components */}
          {isMale && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MaleReproductiveHealthCard
                register={form.register}
                control={form.control}
                errors={form.errors}
              />
            </motion.div>
          )}

          {/* Female-specific components */}
          {isFemale && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <MenstrualCycleCard
                  register={form.register}
                  errors={form.errors}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <PregnancyMenopauseCard
                  register={form.register}
                  errors={form.errors}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ContraceptionCard
                  register={form.register}
                  errors={form.errors}
                />
              </motion.div>
            </>
          )}

          {/* Common components (for all genders) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isFemale ? 0.4 : 0.2 }}
          >
            <SexualActivityCard
              register={form.register}
              control={form.control}
              errors={form.errors}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isFemale ? 0.5 : 0.3 }}
          >
            <STIScreeningCard
              register={form.register}
              errors={form.errors}
            />
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
