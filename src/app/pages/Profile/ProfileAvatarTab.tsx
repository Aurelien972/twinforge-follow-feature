/**
 * ProfileAvatarTab Component
 * Displays real avatar data from body scans with redirections
 * Focused on body avatar morphology and 3D visualization
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useAvatarData } from './hooks/useAvatarData';
import { AvatarStatusCard, LastScanCard, QuickActionsCard } from './components/AvatarInfoComponents';
import { uniformStaggerContainerVariants, uniformStaggerItemVariants } from '../../../ui/tabs/tabsConfig';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';

const ProfileAvatarTab: React.FC = () => {
  const { data, loading, error } = useAvatarData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <GlassCard className="p-8 text-center">
          <SpatialIcon Icon={ICONS.Loader2} size={32} className="animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-white/70">Chargement des données avatar...</p>
        </GlassCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <GlassCard
          className="p-6"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
          }}
        >
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.AlertCircle} size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-300 font-semibold mb-1">Erreur de chargement</h3>
              <p className="text-red-200 text-sm">{error.message}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={uniformStaggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Avatar Status Card */}
      <motion.div variants={uniformStaggerItemVariants}>
        <AvatarStatusCard data={data} />
      </motion.div>

      {/* Last Scan Card */}
      <motion.div variants={uniformStaggerItemVariants}>
        <LastScanCard data={data} />
      </motion.div>

      {/* Quick Actions Card */}
      <motion.div variants={uniformStaggerItemVariants}>
        <QuickActionsCard data={data} />
      </motion.div>
    </motion.div>
  );
};

export default ProfileAvatarTab;
