import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../../../system/store/userStore';
import ProfileCompletenessAlert from '../../../../ui/components/profile/ProfileCompletenessAlert';
import FridgeScanMainCTA from '../components/FridgeScanMainCTA';
import RecentScansCard from '../components/RecentScansCard';
import ScannerStatsCard from '../components/ScannerStatsCard';
import { useFridgeScanPipeline } from '../../../../system/store/fridgeScan';

/**
 * ScannerTab - Premier onglet de la Forge Culinaire
 * Affiche le CTA principal pour scanner un frigo et les composants illustratifs
 */
const ScannerTab: React.FC = () => {
  const { profile } = useUserStore();
  const { loadRecentSessions } = useFridgeScanPipeline();

  // Charger les sessions récentes au montage du composant
  useEffect(() => {
    loadRecentSessions();
  }, [loadRecentSessions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Alerte de profil incomplet pour les recommandations culinaires */}
      <ProfileCompletenessAlert
        profile={profile}
        forgeContext="culinary"
      />

      {/* CTA Principal de Scanner */}
      <FridgeScanMainCTA />

      {/* Grille de composants illustratifs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historique récent des scans */}
        <RecentScansCard />

        {/* Statistiques et insights */}
        <ScannerStatsCard />
      </div>
    </motion.div>
  );
};

export default ScannerTab;
