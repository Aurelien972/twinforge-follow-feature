import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import WearableStatusCard from './components/WearableStatusCard';

const ProfileTrainingTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '2px solid rgba(6, 182, 212, 0.5)'
            }}
          >
            <SpatialIcon Icon={ICONS.Dumbbell} size={24} style={{ color: '#06B6D4' }} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-xl">Profil Sportif</h3>
            <p className="text-white/60 text-sm mt-1">
              Configuration de vos préférences d'entraînement
            </p>
          </div>
        </div>

        <div className="text-center py-12">
          <div className="text-white/40 mb-4">
            <SpatialIcon Icon={ICONS.Settings} size={48} className="mx-auto mb-4" />
          </div>
          <h4 className="text-white/70 text-lg font-medium mb-2">
            Section en construction
          </h4>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Les préférences d'entraînement seront bientôt disponibles.
          </p>
        </div>
      </GlassCard>

      <WearableStatusCard />
    </motion.div>
  );
};

export default ProfileTrainingTab;
