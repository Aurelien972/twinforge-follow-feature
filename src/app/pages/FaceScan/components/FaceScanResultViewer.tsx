// src/app/pages/FaceScan/components/FaceScanResultViewer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import FaceViewer3D from '../../../../components/3d/FaceViewer3D';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import logger from '../../../../lib/utils/logger';

interface FaceScanResultViewerProps {
  faceMorphData: Record<string, number>;
  faceSkinTone?: any;
  userGender: 'male' | 'female';
  matchResults?: {
    topArchetype?: string;
    topScore?: number;
    archetypesCount?: number;
  };
  className?: string;
}

/**
 * FaceScanResultViewer - Affiche le résultat du scan facial avec le viewer 3D de la tête
 * Utilisé dans la page de célébration après un scan facial réussi
 */
const FaceScanResultViewer: React.FC<FaceScanResultViewerProps> = ({
  faceMorphData,
  faceSkinTone,
  userGender,
  matchResults,
  className = '',
}) => {
  logger.info('FACE_SCAN_RESULT_VIEWER', 'Rendering face scan result viewer', {
    faceMorphDataCount: Object.keys(faceMorphData || {}).length,
    hasSkinTone: !!faceSkinTone,
    userGender,
    hasMatchResults: !!matchResults,
    philosophy: 'result_viewer_render'
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 3D Face Viewer Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(236, 72, 153, 0.35), rgba(236, 72, 153, 0.25))
                  `,
                  border: '2px solid rgba(236, 72, 153, 0.5)',
                  boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
                }}
              >
                <SpatialIcon Icon={ICONS.ScanFace} size={16} style={{ color: '#EC4899' }} />
              </div>
              <span style={{ color: '#EC4899' }}>Votre Nouveau Visage 3D</span>
            </h3>
          </div>

          {/* 3D Viewer Container */}
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-400/20 relative overflow-hidden">
            <FaceViewer3D
              faceMorphData={faceMorphData}
              faceSkinTone={faceSkinTone}
              resolvedGender={userGender}
              className="w-full h-full"
              autoRotate={true}
              showControls={true}
            />
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mt-4 p-3 rounded-xl"
            style={{
              background: 'rgba(236, 72, 153, 0.08)',
              border: '1px solid rgba(236, 72, 153, 0.2)'
            }}
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <SpatialIcon Icon={ICONS.Info} size={14} style={{ color: '#EC4899' }} />
              <span>Utilisez votre souris ou vos doigts pour faire pivoter et zoomer sur votre visage</span>
            </div>
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Match Statistics Card (if available) */}
      {matchResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard
            className="p-6"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(236, 72, 153, 0.06) 0%, transparent 60%),
                var(--glass-opacity-base)
              `,
              borderColor: 'rgba(236, 72, 153, 0.2)'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(236, 72, 153, 0.35), rgba(236, 72, 153, 0.25))
                  `,
                  border: '2px solid rgba(236, 72, 153, 0.5)',
                  boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
                }}
              >
                <SpatialIcon Icon={ICONS.Zap} size={20} style={{ color: '#EC4899' }} variant="pure" />
              </div>
              <div>
                <div className="font-semibold text-white">Analyse IA Faciale</div>
                <div className="text-white/60 text-xs font-normal mt-0.5">Résultats du matching d'archétypes</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {matchResults.topArchetype && (
                <motion.div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(236, 72, 153, 0.05)',
                    border: '1px solid rgba(236, 72, 153, 0.15)'
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <SpatialIcon Icon={ICONS.Star} size={18} style={{ color: '#EC4899' }} variant="pure" />
                    <span className="text-white font-medium text-sm">Meilleur Match</span>
                  </div>
                  <p className="text-white/90 text-lg font-bold">{matchResults.topArchetype}</p>
                </motion.div>
              )}

              {matchResults.topScore !== undefined && (
                <motion.div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(236, 72, 153, 0.05)',
                    border: '1px solid rgba(236, 72, 153, 0.15)'
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <SpatialIcon Icon={ICONS.TrendingUp} size={18} style={{ color: '#EC4899' }} variant="pure" />
                    <span className="text-white font-medium text-sm">Score de Confiance</span>
                  </div>
                  <p className="text-white/90 text-lg font-bold">{Math.round(matchResults.topScore * 100)}%</p>
                </motion.div>
              )}

              {matchResults.archetypesCount !== undefined && (
                <motion.div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(236, 72, 153, 0.05)',
                    border: '1px solid rgba(236, 72, 153, 0.15)'
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <SpatialIcon Icon={ICONS.Users} size={18} style={{ color: '#EC4899' }} variant="pure" />
                    <span className="text-white font-medium text-sm">Archétypes Analysés</span>
                  </div>
                  <p className="text-white/90 text-lg font-bold">{matchResults.archetypesCount}</p>
                </motion.div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default FaceScanResultViewer;
