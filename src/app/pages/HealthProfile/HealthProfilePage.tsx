/**
 * HealthProfilePage Component
 * Main health profile page with tab navigation
 */

import React from 'react';
import { HealthProfileLayout } from './HealthProfileLayout';
import { HealthOverviewTab } from './tabs/HealthOverviewTab';
import { BasicHealthTab } from './tabs/BasicHealthTab';
import { useHealthProfileNavigation } from './hooks/useHealthProfileNavigation';
import { useHealthDataMigration } from './hooks/useHealthDataMigration';
import { useHealthCompletion } from './hooks/useHealthCompletion';
import { useUserStore } from '../../../system/store/userStore';
import type { HealthProfileV2 } from '../../../domain/health';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { motion } from 'framer-motion';

const HealthProfilePage: React.FC = () => {
  const { activeTab, globalCompletion, updateTabCompletion } = useHealthProfileNavigation();
  const { migrating, migrationComplete, migrationError, retryMigration } = useHealthDataMigration();
  const { profile } = useUserStore();

  // Get health data and calculate completions
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const completion = useHealthCompletion(healthV2);

  // Update tab completion percentages when data changes
  React.useEffect(() => {
    if (completion) {
      updateTabCompletion('basic', completion.basic);
      updateTabCompletion('medical-history', completion.medicalHistory);
      updateTabCompletion('family-history', completion.familyHistory);
      updateTabCompletion('vital-signs', completion.vitalSigns);
      updateTabCompletion('lifestyle', completion.lifestyle);
      updateTabCompletion('vaccinations', completion.vaccinations);
      updateTabCompletion('mental-health', completion.mentalHealth);
      updateTabCompletion('reproductive-health', completion.reproductiveHealth);
      updateTabCompletion('emergency-contacts', completion.emergencyContacts);
    }
  }, [completion, updateTabCompletion]);

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
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
          }}>
            <div className="flex flex-col items-center gap-4">
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
                <SpatialIcon Icon={ICONS.AlertCircle} size={32} className="text-red-400" />
              </div>
              <div className="text-center">
                <h2 className="text-white font-semibold text-xl mb-2">Erreur de migration</h2>
                <p className="text-white/70 text-sm mb-4">
                  Une erreur est survenue lors de la mise à jour de votre profil santé.
                </p>
                <p className="text-red-300 text-xs mb-4">
                  {migrationError.message}
                </p>
                <button
                  onClick={retryMigration}
                  className="btn-glass px-6 py-2"
                >
                  <div className="flex items-center gap-2">
                    <SpatialIcon Icon={ICONS.RefreshCw} size={16} />
                    <span>Réessayer</span>
                  </div>
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  if (!migrationComplete) {
    return null;
  }

  return (
    <HealthProfileLayout globalCompletion={globalCompletion}>
      {activeTab === 'overview' && <HealthOverviewTab />}
      {activeTab === 'basic' && <BasicHealthTab />}
      {activeTab === 'medical-history' && <PlaceholderTab title="Historique Médical" icon="FileText" />}
      {activeTab === 'family-history' && <PlaceholderTab title="Antécédents Familiaux" icon="Users" />}
      {activeTab === 'vital-signs' && <PlaceholderTab title="Constantes Vitales" icon="Activity" />}
      {activeTab === 'lifestyle' && <PlaceholderTab title="Style de Vie" icon="Coffee" />}
      {activeTab === 'vaccinations' && <PlaceholderTab title="Vaccinations" icon="Shield" />}
      {activeTab === 'mental-health' && <PlaceholderTab title="Santé Mentale" icon="Brain" />}
      {activeTab === 'reproductive-health' && <PlaceholderTab title="Santé Reproductive" icon="Heart" />}
      {activeTab === 'emergency-contacts' && <PlaceholderTab title="Contacts d'Urgence" icon="Phone" />}
      {activeTab === 'history' && <PlaceholderTab title="Historique" icon="Clock" />}
      {activeTab === 'insights' && <PlaceholderTab title="Analyses IA" icon="Sparkles" />}
      {activeTab === 'import-export' && <PlaceholderTab title="Import/Export" icon="Download" />}
    </HealthProfileLayout>
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
