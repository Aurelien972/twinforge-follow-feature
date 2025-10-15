/**
 * HealthProfilePage Component
 * Main health profile page with tab navigation
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useHealthProfileNavigation } from './hooks/useHealthProfileNavigation';
import { useHealthDataMigration } from './hooks/useHealthDataMigration';
import { useHealthCompletion } from './hooks/useHealthCompletion';
import { useUserStore } from '../../../system/store/userStore';
import { useTabsKeyboard } from '../../../ui/tabs/useTabsKeyboard';
import { useScrollMemory } from '../../../hooks/scroll/useScrollMemory';
import type { HealthProfileV2 } from '../../../domain/health';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import PageHeader from '../../../ui/page/PageHeader';
import Tabs from '../../../ui/tabs/TabsComponent';
import { HealthOverviewTab } from './tabs/HealthOverviewTab';
import { BasicHealthTabEnhancedV2 } from './tabs/BasicHealthTabEnhancedV2';
import { VitalSignsTab } from './tabs/VitalSignsTab';
import { LifestyleTab } from './tabs/LifestyleTab';
import { FamilyHistoryTab } from './tabs/FamilyHistoryTab';
import logger from '../../../lib/utils/logger';

const HealthProfilePage: React.FC = () => {
  const { activeTab, globalCompletion, updateTabCompletion, allTabs } = useHealthProfileNavigation();
  const { migrating, migrationComplete, migrationError, retryMigration, skipMigration, forceSkip, canSkip, attemptsRemaining } = useHealthDataMigration();
  const { profile } = useUserStore();

  // Get health data and calculate completions
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const completion = useHealthCompletion(healthV2);

  // Mode dégradé : Permettre l'accès même si la migration n'est pas terminée après 10 secondes
  const [degradedMode, setDegradedMode] = React.useState(false);

  // Enable keyboard navigation for tabs
  useTabsKeyboard();

  // Mémoriser la position de scroll pour chaque onglet
  useScrollMemory(`health-profile:${activeTab}`);

  // Update tab completion percentages when data changes
  React.useEffect(() => {
    if (completion) {
      updateTabCompletion('basic-info', completion.basicInfo || 0);
      updateTabCompletion('lifestyle', completion.lifestyle);
      updateTabCompletion('intimacy', completion.intimacy || 0);
      updateTabCompletion('family-history', completion.familyHistory);
      updateTabCompletion('vital-signs', completion.vitalSigns);
    }
  }, [completion, updateTabCompletion]);

  React.useEffect(() => {
    if (!migrationComplete && !migrating && !migrationError) {
      const timer = setTimeout(() => {
        logger.warn('HEALTH_PROFILE', 'Entering degraded mode after timeout');
        setDegradedMode(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [migrationComplete, migrating, migrationError]);

  if (migrating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard className="p-8 max-w-md">
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2))
                  `,
                  border: '2px solid rgba(6, 182, 212, 0.5)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Loader2} size={32} className="text-cyan-400 animate-spin" />
              </div>
              <div className="text-center">
                <h2 className="text-white font-semibold text-xl mb-2">Migration des données</h2>
                <p className="text-white/70 text-sm">
                  Mise à jour de votre profil santé vers la nouvelle version enrichie...
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  if (migrationError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard className="p-8 max-w-md" style={{
            background: canSkip ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderColor: canSkip ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)',
          }}>
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: canSkip
                    ? `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.2))
                    `
                    : `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                    `,
                  border: canSkip ? '2px solid rgba(245, 158, 11, 0.5)' : '2px solid rgba(239, 68, 68, 0.5)',
                  boxShadow: canSkip ? '0 0 30px rgba(245, 158, 11, 0.4)' : '0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >
                <SpatialIcon
                  Icon={canSkip ? ICONS.AlertTriangle : ICONS.AlertCircle}
                  size={32}
                  className={canSkip ? 'text-amber-400' : 'text-red-400'}
                />
              </div>
              <div className="text-center">
                <h2 className="text-white font-semibold text-xl mb-2">
                  {canSkip ? 'Migration optionnelle' : 'Erreur de migration'}
                </h2>
                <p className="text-white/70 text-sm mb-2">
                  {canSkip
                    ? 'La migration automatique a échoué après plusieurs tentatives.'
                    : 'Une erreur est survenue lors de la mise à jour de votre profil santé.'}
                </p>
                {attemptsRemaining > 0 && (
                  <p className="text-white/50 text-xs mb-3">
                    Tentatives restantes: {attemptsRemaining}
                  </p>
                )}
                <p className={`text-xs mb-4 ${canSkip ? 'text-amber-300' : 'text-red-300'}`}>
                  {migrationError.message}
                </p>
                <div className="flex flex-col gap-2">
                  {!canSkip && attemptsRemaining > 0 && (
                    <button
                      onClick={retryMigration}
                      className="btn-glass px-6 py-2 w-full"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <SpatialIcon Icon={ICONS.RefreshCw} size={16} />
                        <span>Réessayer ({attemptsRemaining} restantes)</span>
                      </div>
                    </button>
                  )}
                  {canSkip && (
                    <>
                      <button
                        onClick={skipMigration}
                        className="btn-glass px-6 py-2 w-full"
                        style={{
                          background: 'rgba(6, 182, 212, 0.2)',
                          borderColor: 'rgba(6, 182, 212, 0.4)',
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <SpatialIcon Icon={ICONS.ArrowRight} size={16} />
                          <span>Continuer sans migrer</span>
                        </div>
                      </button>
                      {attemptsRemaining > 0 && (
                        <button
                          onClick={retryMigration}
                          className="btn-glass px-6 py-2 w-full"
                          style={{
                            background: 'rgba(100, 116, 139, 0.1)',
                            borderColor: 'rgba(100, 116, 139, 0.3)',
                          }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <SpatialIcon Icon={ICONS.RefreshCw} size={16} />
                            <span>Réessayer quand même</span>
                          </div>
                        </button>
                      )}
                      {attemptsRemaining === 0 && (
                        <button
                          onClick={forceSkip}
                          className="btn-glass px-6 py-2 w-full"
                          style={{
                            background: 'rgba(71, 85, 105, 0.1)',
                            borderColor: 'rgba(71, 85, 105, 0.3)',
                          }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <SpatialIcon Icon={ICONS.XCircle} size={16} />
                            <span>Ignorer définitivement</span>
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>
                {canSkip && (
                  <p className="text-white/40 text-xs mt-3">
                    Vous pourrez toujours migrer plus tard depuis les paramètres.
                  </p>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  if (!migrationComplete && !degradedMode) {
    return null;
  }

  return (
    <div className="space-y-6 w-full overflow-visible">
      <PageHeader
        icon="Heart"
        title="Mon Profil de Santé"
        subtitle="Médecine préventive par intelligence artificielle"
        circuit="health"
        iconColor="#EF4444"
      />

      {/* Bandeau d'avertissement si mode dégradé ou erreur */}
      {(degradedMode || (migrationError && !canSkip)) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <GlassCard className="p-4" style={{
            background: 'rgba(245, 158, 11, 0.1)',
            borderColor: 'rgba(245, 158, 11, 0.3)',
          }}>
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.AlertTriangle} size={20} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-orange-300 font-semibold mb-1">Mode Dégradé</h3>
                <p className="text-white/70 text-sm">
                  {degradedMode
                    ? "La migration automatique n'a pas pu se terminer. Vous pouvez utiliser le profil santé, mais certaines fonctionnalités avancées peuvent être limitées."
                    : "Une erreur temporaire empêche la migration automatique. Vous pouvez continuer à utiliser le système normalement."}
                </p>
              </div>
              {migrationError && canSkip && (
                <button
                  onClick={skipMigration}
                  className="btn-glass px-4 py-2 text-sm flex-shrink-0"
                  style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    borderColor: 'rgba(245, 158, 11, 0.4)',
                  }}
                >
                  Ignorer
                </button>
              )}
            </div>
          </GlassCard>
        </motion.div>
      )}

      <Tabs
        defaultValue="overview"
        className="w-full min-w-0 health-profile-tabs"
        forgeContext="health"
      >
        <Tabs.List role="tablist" aria-label="Sections du profil de santé" className="mb-6 w-full">
          {allTabs.map((tab) => (
            <Tabs.Trigger key={tab.id} value={tab.id} icon={tab.icon as any}>
              <span className="tab-text">{tab.label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Panel value="overview">
          <HealthOverviewTab />
        </Tabs.Panel>

        <Tabs.Panel value="basic-info">
          <BasicHealthTabEnhancedV2 />
        </Tabs.Panel>

        <Tabs.Panel value="lifestyle">
          <LifestyleTab />
        </Tabs.Panel>

        <Tabs.Panel value="intimacy">
          <PlaceholderTab title="Intimité" icon="Heart" />
        </Tabs.Panel>

        <Tabs.Panel value="family-history">
          <FamilyHistoryTab />
        </Tabs.Panel>

        <Tabs.Panel value="vital-signs">
          <VitalSignsTab />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const PlaceholderTab: React.FC<{ title: string; icon: string }> = ({ title, icon }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <GlassCard className="p-8 max-w-md text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgba(100, 116, 139, 0.4), rgba(100, 116, 139, 0.2))
            `,
            border: '2px solid rgba(100, 116, 139, 0.5)',
          }}
        >
          <SpatialIcon Icon={ICONS[icon as keyof typeof ICONS]} size={32} className="text-slate-400" />
        </div>
        <h2 className="text-white font-semibold text-xl mb-2">{title}</h2>
        <p className="text-white/60 text-sm">
          Cet onglet sera disponible dans une prochaine version.
        </p>
      </GlassCard>
    </div>
  );
};

export default HealthProfilePage;
