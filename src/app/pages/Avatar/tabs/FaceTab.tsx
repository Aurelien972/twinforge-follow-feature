// src/app/pages/Avatar/tabs/FaceTab.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useUserStore } from '../../../../system/store/userStore';
import { useFeedback } from '../../../../hooks/useFeedback';
import FaceViewer3D from '../../../../components/3d/FaceViewer3D';
import FaceViewer3DSkeleton from '../../../../ui/components/skeletons/FaceViewer3DSkeleton';
import FaceShapeControls from '../../../../ui/components/face/FaceShapeControls';
import { useGlobalFaceParams } from '../../../../hooks/useGlobalFaceParams';
import logger from '../../../../lib/utils/logger';
import { useLatestBodyScanMorphs } from '../../../../hooks/useLatestBodyScanMorphs';
import { mergeFaceAndBodyMorphs, shouldMergeBodyMorphs } from '../../../../lib/morph/mergeFaceAndBodyMorphs';

/**
 * Face Tab - Onglet dédié au scan et à la visualisation du visage 3D
 * Affiche le viewer 3D de la tête uniquement avec option de scanner/rescanner
 */
const FaceTab: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const { click, success } = useFeedback();
  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [showControls, setShowControls] = React.useState(false);

  // Hook pour gérer les paramètres faciaux globalement
  const {
    currentFaceParams,
    updateFaceParams,
    saveFaceParams,
    isSaving,
    error: saveError
  } = useGlobalFaceParams();

  // Récupérer les données du scan facial depuis le profil (memoized to prevent recalculations)
  const hasFaceScan = React.useMemo(() => !!profile?.preferences?.face?.final_face_params, [profile?.preferences?.face?.final_face_params]);
  const faceMorphData = React.useMemo(() => profile?.preferences?.face?.final_face_params || {}, [profile?.preferences?.face?.final_face_params]);
  const faceSkinTone = React.useMemo(() => profile?.preferences?.face?.skin_tone || null, [profile?.preferences?.face?.skin_tone]);
  const lastFaceScanDate = React.useMemo(() => profile?.preferences?.face?.updated_at, [profile?.preferences?.face?.updated_at]);
  const lastFaceScanId = React.useMemo(() => profile?.preferences?.face?.last_face_scan_id, [profile?.preferences?.face?.last_face_scan_id]);

  // Récupérer les données du dernier body scan pour intégrer les clés corporelles
  const { bodyScanMorphData, isLoading: isLoadingBodyScan } = useLatestBodyScanMorphs();

  // Utiliser les paramètres faciaux actuels (incluant les ajustements en temps réel)
  // Memoized to prevent unnecessary recalculations
  // TOUJOURS utiliser currentFaceParams pour les ajustements en temps réel
  const activeFaceMorphData = React.useMemo(
    () => currentFaceParams,
    [currentFaceParams]
  );

  // Fusionner les données faciales avec les clés corporelles pertinentes
  const mergedFaceMorphData = React.useMemo(() => {
    if (!hasFaceScan || !bodyScanMorphData?.morph_values) {
      logger.info('FACE_TAB', 'Using face morphs only (no body scan or face scan)', {
        hasFaceScan,
        hasBodyScan: !!bodyScanMorphData,
        faceMorphKeysCount: Object.keys(activeFaceMorphData).length,
        philosophy: 'face_only_mode'
      });
      return activeFaceMorphData;
    }

    // Check if merging would add useful data
    if (!shouldMergeBodyMorphs(activeFaceMorphData, bodyScanMorphData.morph_values)) {
      logger.info('FACE_TAB', 'No useful body morphs to merge', {
        faceMorphKeysCount: Object.keys(activeFaceMorphData).length,
        bodyMorphKeysCount: Object.keys(bodyScanMorphData.morph_values).length,
        philosophy: 'merge_not_needed'
      });
      return activeFaceMorphData;
    }

    // Merge face and body morphs
    const { mergedMorphs, stats } = mergeFaceAndBodyMorphs(
      activeFaceMorphData,
      bodyScanMorphData.morph_values
    );

    logger.info('FACE_TAB', 'Face and body morphs merged successfully', {
      ...stats,
      bodyScanId: bodyScanMorphData.scan_id,
      bodyScanDate: bodyScanMorphData.created_at,
      philosophy: 'face_body_merge_complete'
    });

    return mergedMorphs;
  }, [activeFaceMorphData, bodyScanMorphData, hasFaceScan]);

  // Simulate initial loading for face data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingData(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Log du chargement des données faciales et corporelles (only on mount and when critical data changes)
  React.useEffect(() => {
    logger.info('FACE_TAB', 'Face tab mounted, loading face data from profile', {
      hasFaceScan,
      faceMorphDataKeys: Object.keys(faceMorphData).length,
      mergedMorphDataKeys: Object.keys(mergedFaceMorphData).length,
      hasBodyScan: !!bodyScanMorphData,
      bodyMorphKeysCount: bodyScanMorphData?.morph_values ? Object.keys(bodyScanMorphData.morph_values).length : 0,
      isLoadingBodyScan,
      hasFaceSkinTone: !!faceSkinTone,
      lastFaceScanDate,
      lastFaceScanId,
      bodyScanId: bodyScanMorphData?.scan_id,
      bodyScanDate: bodyScanMorphData?.created_at,
      userId: profile?.userId,
      timestamp: new Date().toISOString(),
      philosophy: 'face_tab_data_loading_with_body_integration'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFaceScan, lastFaceScanId, bodyScanMorphData?.scan_id]); // Only log when critical IDs change

  const handleStartFaceScan = () => {
    click();
    success();

    logger.info('FACE_TAB', 'User initiated face scan from Face tab', {
      userId: profile?.userId,
      hasPreviousScan: hasFaceScan,
      from: 'face_tab',
      to: '/face-scan',
      timestamp: new Date().toISOString()
    });

    navigate('/face-scan');
  };

  const handleGoToAvatarTab = () => {
    click();
    logger.info('FACE_TAB', 'User navigating to avatar tab from face tab', {
      from: 'face_tab',
      to: '/avatar#avatar',
      timestamp: new Date().toISOString()
    });
    navigate('/avatar#avatar');
  };

  // Loading state with skeleton
  if (isLoadingData && hasFaceScan) {
    return <FaceViewer3DSkeleton />;
  }

  // État initial: Aucun scan facial
  if (!hasFaceScan) {
    return (
      <div className="space-y-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard
            className="p-8 text-center"
            interactive
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(236, 72, 153, 0.12) 0%, transparent 60%),
                radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
                var(--glass-opacity-base)
              `,
              borderColor: 'rgba(236, 72, 153, 0.3)',
              boxShadow: `
                0 12px 40px rgba(0, 0, 0, 0.25),
                0 0 30px rgba(236, 72, 153, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.15)
              `
            }}
          >
            {/* Icon principal */}
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(236, 72, 153, 0.35), rgba(236, 72, 153, 0.25))
                `,
                border: '2px solid rgba(236, 72, 153, 0.5)',
                boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
            >
              <SpatialIcon
                Icon={ICONS.ScanFace}
                size={48}
                style={{ color: '#EC4899' }}
                variant="pure"
              />

              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: 'rgba(236, 72, 153, 0.4)' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-3xl font-bold mb-3" style={{ color: '#EC4899' }}>
                Créez votre visage 3D
              </h3>
              <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto">
                Scannez votre visage pour créer un avatar facial ultra-réaliste en haute définition
              </p>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8 p-4 rounded-xl"
              style={{
                background: 'rgba(236, 72, 153, 0.08)',
                border: '1px solid rgba(236, 72, 153, 0.2)',
                backdropFilter: 'blur(12px) saturate(130%)'
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.Info} size={16} style={{ color: '#EC4899' }} />
                <span className="text-white font-medium text-sm">Comment ça marche?</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Prenez 2 photos simples (face et profil) et notre IA créera un visage 3D
                personnalisé qui sera automatiquement appliqué à votre avatar corporel.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={handleStartFaceScan}
              className="px-8 py-4 rounded-full font-bold text-lg text-white relative overflow-hidden min-h-[64px]"
              style={{
                background: `
                  linear-gradient(135deg,
                    rgba(236, 72, 153, 0.85),
                    rgba(236, 72, 153, 0.70)
                  )
                `,
                border: '2px solid #EC4899',
                boxShadow: `
                  0 12px 40px rgba(236, 72, 153, 0.4),
                  0 0 60px rgba(236, 72, 153, 0.3),
                  inset 0 3px 0 rgba(255, 255, 255, 0.4)
                `,
                backdropFilter: 'blur(20px) saturate(160%)'
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: `
                  0 16px 50px rgba(236, 72, 153, 0.5),
                  0 0 80px rgba(236, 72, 153, 0.4),
                  inset 0 3px 0 rgba(255, 255, 255, 0.5)
                `
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Shimmer Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'celebration-cta-shimmer-movement 2s ease-in-out infinite',
                  borderRadius: 'inherit'
                }}
              />

              <div className="relative z-10 flex items-center justify-center gap-3">
                <SpatialIcon
                  Icon={ICONS.ScanFace}
                  size={24}
                  style={{
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                  }}
                  variant="pure"
                />
                <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  Scanner mon visage
                </span>
              </div>
            </motion.button>
          </GlassCard>
        </motion.div>

        {/* Benefits Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard
            className="p-6"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(236, 72, 153, 0.06) 0%, transparent 60%),
                var(--glass-opacity-base)
              `,
              borderColor: 'rgba(236, 72, 153, 0.2)',
              boxShadow: `
                var(--glass-shadow-sm),
                0 0 12px rgba(236, 72, 153, 0.08)
              `
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
                <div className="font-semibold text-white">Avantages du scan facial</div>
                <div className="text-white/60 text-xs font-normal mt-0.5">Technologies de pointe pour un rendu ultra-réaliste</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(236, 72, 153, 0.05)',
                  border: '1px solid rgba(236, 72, 153, 0.15)'
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SpatialIcon Icon={ICONS.Eye} size={18} style={{ color: '#EC4899' }} variant="pure" />
                  <span className="text-white font-medium text-sm">Haute Précision</span>
                </div>
                <p className="text-white/70 text-xs">
                  IA avancée pour une reconstruction faciale fidèle à la réalité
                </p>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(236, 72, 153, 0.05)',
                  border: '1px solid rgba(236, 72, 153, 0.15)'
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SpatialIcon Icon={ICONS.Zap} size={18} style={{ color: '#EC4899' }} variant="pure" />
                  <span className="text-white font-medium text-sm">Rapide</span>
                </div>
                <p className="text-white/70 text-xs">
                  Seulement 2 photos et quelques secondes de traitement
                </p>
              </motion.div>

              <motion.div
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(236, 72, 153, 0.05)',
                  border: '1px solid rgba(236, 72, 153, 0.15)'
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SpatialIcon Icon={ICONS.Heart} size={18} style={{ color: '#EC4899' }} variant="pure" />
                  <span className="text-white font-medium text-sm">Personnalisé</span>
                </div>
                <p className="text-white/70 text-xs">
                  Votre visage unique appliqué à votre avatar corporel
                </p>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  // État avec scan facial existant
  return (
    <div className="space-y-6 w-full">
      {/* 3D Face Viewer */}
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
            <span style={{ color: '#EC4899' }}>Votre Visage 3D</span>
          </h3>

          {lastFaceScanDate && (
            <div className="text-right">
              <div className="text-white/40 text-xs">
                Dernière mise à jour: {new Date(lastFaceScanDate).toLocaleDateString('fr-FR')}
              </div>
            </div>
          )}
        </div>

        <div className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-400/20 relative overflow-hidden">
          <FaceViewer3D
            faceMorphData={mergedFaceMorphData}
            faceSkinTone={faceSkinTone}
            userProfile={profile}
            resolvedGender={profile?.sex || 'male'}
            className="w-full h-full"
            autoRotate={false}
            showControls={true}
          />
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setShowControls(!showControls)}
          className="px-6 py-4 rounded-full font-bold text-lg text-white relative overflow-hidden"
          style={{
            background: showControls
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.85), rgba(236, 72, 153, 0.70))'
              : 'rgba(236, 72, 153, 0.15)',
            border: '2px solid ' + (showControls ? '#EC4899' : 'rgba(236, 72, 153, 0.6)'),
            boxShadow: showControls
              ? '0 12px 40px rgba(236, 72, 153, 0.4), 0 0 60px rgba(236, 72, 153, 0.3)'
              : 'none',
            backdropFilter: 'blur(20px) saturate(160%)'
          }}
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            <SpatialIcon
              Icon={ICONS.Sliders}
              size={20}
              style={{
                color: showControls ? 'white' : '#EC4899',
                filter: showControls ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
              }}
              variant="pure"
            />
            <span style={{ textShadow: showControls ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>
              {showControls ? 'Masquer' : 'Ajuster'} le visage
            </span>
          </div>
        </button>

        <button
          className="px-6 py-4 rounded-full font-bold text-lg relative overflow-hidden"
          style={{
            background: 'rgba(236, 72, 153, 0.15)',
            border: '2px solid rgba(236, 72, 153, 0.6)',
            color: 'white',
            backdropFilter: 'blur(20px) saturate(130%)'
          }}
          onClick={handleGoToAvatarTab}
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            <SpatialIcon
              Icon={ICONS.Eye}
              size={20}
              style={{ color: '#EC4899' }}
              variant="pure"
            />
            <span>Avatar Complet</span>
          </div>
        </button>

        <button
          className="px-6 py-4 rounded-full font-bold text-lg relative overflow-hidden"
          style={{
            background: 'rgba(236, 72, 153, 0.15)',
            border: '2px solid rgba(236, 72, 153, 0.6)',
            color: 'white',
            backdropFilter: 'blur(20px) saturate(130%)'
          }}
          onClick={handleStartFaceScan}
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            <SpatialIcon
              Icon={ICONS.RotateCcw}
              size={20}
              style={{ color: '#EC4899' }}
              variant="pure"
            />
            <span>Rescanner</span>
          </div>
        </button>
      </div>

      {/* Contrôles d'ajustement du visage */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <FaceShapeControls
            currentValues={currentFaceParams}
            onValuesChange={updateFaceParams}
            onSave={async () => {
              const result = await saveFaceParams();
              if (result.success) {
                success();
                setShowControls(false); // Close controls on successful save
              }
            }}
            isSaving={isSaving}
            saveError={saveError}
          />
        </motion.div>
      )}
    </div>
  );
};

export default FaceTab;
