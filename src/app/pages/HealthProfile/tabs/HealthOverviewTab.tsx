/**
 * HealthOverviewTab Component
 * Dashboard view with health score, risks, and quick actions
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { HealthScoreWidget } from '../components/HealthScoreWidget';
import { HealthRiskBadges } from '../components/HealthRiskBadges';
import { BMIMetricsCard } from '../components/BMIMetricsCard';
import { useUserStore } from '../../../../system/store/userStore';
import { calculateHealthScore } from '../utils/healthScoreCalculations';
import { useHealthProfileNavigation } from '../hooks/useHealthProfileNavigation';
import type { HealthProfileV2 } from '../../../../domain/health';

export const HealthOverviewTab: React.FC = () => {
  const { profile } = useUserStore();
  const { navigateToTab, nextIncompleteTab, aiReadiness } = useHealthProfileNavigation();

  const health = (profile as any)?.health as HealthProfileV2 | undefined;
  const score = calculateHealthScore(health);

  return (
    <div className="space-y-6">
      {/* Health Score Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <HealthScoreWidget health={health} />
      </motion.div>

      {/* BMI and Body Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <BMIMetricsCard />
      </motion.div>

      {/* Geographic & Country Health CTA */}
      {profile?.country && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard
            className="p-6 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => navigateToTab('geographic')}
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
                var(--glass-opacity)
              `,
              borderColor: 'rgba(59, 130, 246, 0.4)',
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.2))
                  `,
                  border: '2px solid rgba(59, 130, 246, 0.5)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.MapPin} size={24} style={{ color: '#3B82F6' }} variant="pure" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">Environnement & Géographie</h3>
                <p className="text-white/70 text-sm mb-2">
                  Consultez la météo, la qualité de l'air et le contexte sanitaire local pour {profile.country}
                </p>
                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                  <span>Accéder à l'onglet Géo</span>
                  <SpatialIcon Icon={ICONS.ArrowRight} size={14} />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Next Action Recommendation */}
        {nextIncompleteTab && (
          <GlassCard
            className="p-6 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => navigateToTab(nextIncompleteTab.id)}
            style={{
              background: `
                radial-gradient(circle at 30% 20%, ${nextIncompleteTab.color}15 0%, transparent 60%),
                var(--glass-opacity)
              `,
              borderColor: `${nextIncompleteTab.color}40`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, ${nextIncompleteTab.color}66, ${nextIncompleteTab.color}33)
                  `,
                  border: `2px solid ${nextIncompleteTab.color}80`,
                  boxShadow: `0 0 30px ${nextIncompleteTab.color}66`,
                }}
              >
                <SpatialIcon Icon={ICONS.Target} size={20} style={{ color: nextIncompleteTab.color }} variant="pure" />
              </div>
              <h3 className="text-white font-semibold text-lg">Action Recommandée</h3>
            </div>
            <p className="text-white/80 mb-4">
              Complétez la section <strong>{nextIncompleteTab.label}</strong> pour améliorer votre score de santé.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: nextIncompleteTab.color }}>
              <span className="font-medium">Continuer</span>
              <SpatialIcon Icon={ICONS.ArrowRight} size={14} />
            </div>
          </GlassCard>
        )}

        {/* AI Readiness Status */}
        <GlassCard
          className="p-6"
          style={{
            background: aiReadiness
              ? `radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 60%), var(--glass-opacity)`
              : `radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 60%), var(--glass-opacity)`,
            borderColor: aiReadiness ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: aiReadiness
                  ? `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.2))
                  `
                  : `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.2))
                  `,
                border: aiReadiness ? '2px solid rgba(16, 185, 129, 0.5)' : '2px solid rgba(245, 158, 11, 0.5)',
                boxShadow: aiReadiness ? '0 0 30px rgba(16, 185, 129, 0.4)' : '0 0 30px rgba(245, 158, 11, 0.4)',
              }}
            >
              <SpatialIcon
                Icon={ICONS.Sparkles}
                size={20}
                style={{ color: aiReadiness ? '#10B981' : '#F59E0B' }}
                variant="pure"
              />
            </div>
            <h3 className="text-white font-semibold text-lg">
              {aiReadiness ? 'Analyse IA Disponible' : 'Analyse IA Limitée'}
            </h3>
          </div>
          <p className="text-white/80 mb-4">
            {aiReadiness
              ? 'Votre profil est suffisamment complet pour bénéficier d\'analyses préventives complètes par IA.'
              : 'Complétez les sections essentielles pour débloquer toutes les analyses IA préventives.'}
          </p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${aiReadiness ? 'bg-green-400' : 'bg-orange-400'}`} />
            <span className={`text-sm font-medium ${aiReadiness ? 'text-green-400' : 'text-orange-400'}`}>
              Score IA: {score.aiReadiness}%
            </span>
          </div>
        </GlassCard>

        {/* Recent Updates */}
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.2)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                `,
                border: '2px solid rgba(239, 68, 68, 0.5)',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              }}
            >
              <SpatialIcon Icon={ICONS.Clock} size={20} style={{ color: '#EF4444' }} variant="pure" />
            </div>
            <h3 className="text-white font-semibold text-lg">Dernières Mises à Jour</h3>
          </div>
          <div className="space-y-3">
            <UpdateItem
              icon="Check"
              text="Profil santé créé"
              date={new Date().toLocaleDateString('fr-FR')}
              color="#10B981"
            />
            {profile?.country && (
              <UpdateItem
                icon="MapPin"
                text={`Contexte sanitaire: ${profile.country}`}
                date={new Date().toLocaleDateString('fr-FR')}
                color="#3B82F6"
              />
            )}
          </div>
        </GlassCard>

        {/* Quick Links */}
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.2)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                `,
                border: '2px solid rgba(239, 68, 68, 0.5)',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              }}
            >
              <SpatialIcon Icon={ICONS.Zap} size={20} style={{ color: '#EF4444' }} variant="pure" />
            </div>
            <h3 className="text-white font-semibold text-lg">Actions Rapides</h3>
          </div>
          <div className="space-y-2">
            <QuickLinkButton
              icon="Activity"
              label="Constantes Vitales"
              onClick={() => navigateToTab('vital-signs')}
            />
            <QuickLinkButton
              icon="Shield"
              label="Vaccinations"
              onClick={() => navigateToTab('vaccinations')}
            />
            <QuickLinkButton
              icon="FileText"
              label="Historique Médical"
              onClick={() => navigateToTab('medical-history')}
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Welcome Banner - Moved to bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.3)',
        }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-2xl mb-2">
                Bienvenue dans votre Profil de Santé
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                Complétez votre profil médical pour bénéficier d'analyses préventives personnalisées par intelligence artificielle.
                Toutes vos données sont sécurisées et confidentielles.
              </p>
              <div className="flex items-center gap-2 text-red-300 text-sm">
                <SpatialIcon Icon={ICONS.Lock} size={14} />
                <span>Conforme RGPD • Données chiffrées • 100% confidentiel</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                  `,
                  border: '2px solid rgba(239, 68, 68, 0.5)',
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Sparkles} size={28} style={{ color: '#EF4444' }} variant="pure" />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Legal Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <GlassCard className="p-4" style={{
          background: 'rgba(255, 152, 0, 0.05)',
          borderColor: 'rgba(255, 152, 0, 0.2)',
        }}>
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-orange-300">Avertissement médical:</strong> Cet outil est destiné à des fins informatives et de suivi personnel uniquement.
              Il ne remplace pas un avis médical professionnel. En cas de préoccupation médicale, consultez toujours un professionnel de santé qualifié.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

const UpdateItem: React.FC<{ icon: keyof typeof ICONS; text: string; date: string; color: string }> = ({
  icon,
  text,
  date,
  color,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <SpatialIcon Icon={ICONS[icon]} size={14} style={{ color }} />
      <span className="text-white/80 text-sm">{text}</span>
    </div>
    <span className="text-white/50 text-xs">{date}</span>
  </div>
);

const QuickLinkButton: React.FC<{ icon: keyof typeof ICONS; label: string; onClick: () => void }> = ({
  icon,
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
  >
    <div className="flex items-center gap-3">
      <SpatialIcon Icon={ICONS[icon]} size={16} className="text-white/70" />
      <span className="text-white/90 text-sm">{label}</span>
    </div>
    <SpatialIcon Icon={ICONS.ChevronRight} size={14} className="text-white/50" />
  </button>
);
