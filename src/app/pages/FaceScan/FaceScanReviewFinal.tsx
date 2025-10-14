// src/app/pages/FaceScan/FaceScanReviewFinal.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import FaceViewer3D from '../../../components/3d/FaceViewer3D';
import { useUserStore } from '../../../system/store/userStore';
import { useFeedback } from '../../../hooks/useFeedback';
import logger from '../../../lib/utils/logger';

/**
 * Face Scan Review Final - Page dédiée à la visualisation du visage scanné
 * Affiche le FaceViewer3D en grand avec les résumés de l'analyse IA
 * Point d'entrée principal après la célébration du scan facial
 */
const FaceScanReviewFinal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const { click } = useFeedback();

  const [isViewerReady, setIsViewerReady] = useState(false);

  // Récupérer les résultats du scan depuis la navigation state
  const scanResults = location.state?.scanResults;

  // Extraction des données faciales
  const faceMorphData = profile?.preferences?.face?.final_face_params || {};
  const faceSkinTone = profile?.preferences?.face?.skin_tone || null;
  const resolvedGender = scanResults?.resolvedGender || profile?.sex || 'male';

  // Log du montage de la page
  useEffect(() => {
    logger.info('FACE_REVIEW_FINAL', 'Face review final page mounted', {
      hasScanResults: !!scanResults,
      hasFaceMorphData: !!faceMorphData && Object.keys(faceMorphData).length > 0,
      faceMorphDataKeys: Object.keys(faceMorphData).length,
      hasFaceSkinTone: !!faceSkinTone,
      resolvedGender,
      timestamp: new Date().toISOString(),
      philosophy: 'face_review_final_page_init'
    });

    // Rediriger si pas de données faciales
    if (!faceMorphData || Object.keys(faceMorphData).length === 0) {
      logger.warn('FACE_REVIEW_FINAL', 'No face morph data found, redirecting to face scan', {
        timestamp: new Date().toISOString()
      });
      navigate('/face-scan', { replace: true });
    }
  }, [scanResults, faceMorphData, faceSkinTone, resolvedGender, navigate]);

  // Gestionnaire du viewer prêt
  const handleViewerReady = () => {
    setIsViewerReady(true);
    logger.info('FACE_REVIEW_FINAL', 'Face viewer is ready', {
      timestamp: new Date().toISOString(),
      philosophy: 'face_viewer_ready'
    });
  };

  // Gestionnaire de navigation vers l'onglet Avatar
  const handleGoToAvatarTab = () => {
    click();
    logger.info('FACE_REVIEW_FINAL', 'User navigating to avatar tab', {
      from: 'face_review_final',
      to: '/avatar#avatar',
      timestamp: new Date().toISOString()
    });
    navigate('/avatar#avatar');
  };

  // Gestionnaire de navigation vers l'onglet Visage
  const handleGoToFaceTab = () => {
    click();
    logger.info('FACE_REVIEW_FINAL', 'User navigating to face tab', {
      from: 'face_review_final',
      to: '/avatar#visage',
      timestamp: new Date().toISOString()
    });
    navigate('/avatar#visage');
  };

  // Calcul de la couleur de célébration basée sur le score
  const confidence = scanResults?.match?.selected_archetypes?.[0]?.score || 0;
  const celebrationColor = confidence >= 0.9 ? '#18E3FF' : confidence >= 0.7 ? '#06B6D4' : '#10B981';

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Title */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ color: celebrationColor }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Votre Visage 3D
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Découvrez votre avatar facial en haute définition
          </motion.p>
        </div>

        {/* Face Viewer 3D */}
        <GlassCard className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, ${celebrationColor}35, ${celebrationColor}25)
                  `,
                  border: `2px solid ${celebrationColor}`,
                  boxShadow: `0 0 20px ${celebrationColor}40`
                }}
              >
                <SpatialIcon Icon={ICONS.ScanFace} size={16} style={{ color: celebrationColor }} />
              </div>
              <span style={{ color: celebrationColor }}>Scan Facial Réussi</span>
            </h3>

            {!isViewerReady && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-xs font-medium">Chargement du visage...</span>
              </div>
            )}
          </div>

          <div className="h-[500px] md:h-[600px] rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-400/20 relative overflow-hidden">
            {(!faceMorphData || Object.keys(faceMorphData).length === 0) ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <SpatialIcon Icon={ICONS.AlertCircle} size={48} className="text-red-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">Données faciales manquantes</h3>
                  <p className="text-white/60 text-sm">Impossible de charger le visage 3D.</p>
                </div>
              </div>
            ) : (
              <FaceViewer3D
                faceMorphData={faceMorphData}
                faceSkinTone={faceSkinTone}
                userProfile={profile}
                resolvedGender={resolvedGender}
                className="w-full h-full"
                autoRotate={true}
                showControls={true}
              />
            )}
          </div>
        </GlassCard>

        {/* Facial Analysis Summary */}
        {scanResults?.match && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard
              className="p-6"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, ${celebrationColor}10 0%, transparent 60%),
                  var(--glass-opacity-base)
                `,
                borderColor: `${celebrationColor}40`
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, ${celebrationColor}35, ${celebrationColor}25)
                    `,
                    border: `2px solid ${celebrationColor}`,
                    boxShadow: `0 0 20px ${celebrationColor}40`
                  }}
                >
                  <SpatialIcon Icon={ICONS.Zap} size={24} style={{ color: celebrationColor }} />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">Analyse IA Faciale</div>
                  <div className="text-white/60 text-sm font-normal mt-0.5">Résultats du matching d'archétypes</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scanResults.match.selected_archetypes?.[0]?.name && (
                  <motion.div
                    className="p-5 rounded-xl"
                    style={{
                      background: `${celebrationColor}08`,
                      border: `1px solid ${celebrationColor}25`
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <SpatialIcon Icon={ICONS.Star} size={20} style={{ color: celebrationColor }} />
                      <span className="text-white font-medium text-sm">Meilleur Match</span>
                    </div>
                    <p className="text-white/90 text-base font-semibold leading-snug">
                      {scanResults.match.selected_archetypes[0].name}
                    </p>
                  </motion.div>
                )}

                {scanResults.match.selected_archetypes?.[0]?.score !== undefined && (
                  <motion.div
                    className="p-5 rounded-xl"
                    style={{
                      background: `${celebrationColor}08`,
                      border: `1px solid ${celebrationColor}25`
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <SpatialIcon Icon={ICONS.TrendingUp} size={20} style={{ color: celebrationColor }} />
                      <span className="text-white font-medium text-sm">Score de Confiance</span>
                    </div>
                    <p className="text-white/90 text-2xl font-bold">
                      {Math.round(scanResults.match.selected_archetypes[0].score * 100)}%
                    </p>
                  </motion.div>
                )}

                {scanResults.match.selected_archetypes?.length && (
                  <motion.div
                    className="p-5 rounded-xl"
                    style={{
                      background: `${celebrationColor}08`,
                      border: `1px solid ${celebrationColor}25`
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <SpatialIcon Icon={ICONS.Users} size={20} style={{ color: celebrationColor }} />
                      <span className="text-white font-medium text-sm">Archétypes Analysés</span>
                    </div>
                    <p className="text-white/90 text-2xl font-bold">
                      {scanResults.match.selected_archetypes.length}
                    </p>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleGoToAvatarTab}
            className="px-8 py-5 rounded-xl font-bold text-lg text-white relative overflow-hidden"
            style={{
              background: `
                linear-gradient(135deg,
                  ${celebrationColor}85,
                  ${celebrationColor}70
                )
              `,
              border: `2px solid ${celebrationColor}`,
              boxShadow: `
                0 12px 40px ${celebrationColor}40,
                0 0 60px ${celebrationColor}30,
                inset 0 3px 0 rgba(255, 255, 255, 0.4)
              `,
              backdropFilter: 'blur(20px) saturate(160%)'
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <SpatialIcon
                Icon={ICONS.Eye}
                size={24}
                style={{
                  color: 'white',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
              <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Voir mon Avatar Complet
              </span>
            </div>
          </button>

          <button
            onClick={handleGoToFaceTab}
            className="px-8 py-5 rounded-xl font-bold text-lg relative overflow-hidden"
            style={{
              background: `${celebrationColor}15`,
              border: `2px solid ${celebrationColor}60`,
              color: 'white',
              backdropFilter: 'blur(20px) saturate(130%)'
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <SpatialIcon
                Icon={ICONS.ScanFace}
                size={24}
                style={{ color: celebrationColor }}
              />
              <span>Aller à l'onglet Visage</span>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FaceScanReviewFinal;
