import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar3DViewer from '../../../components/3d/Avatar3DViewer';
import { useUserStore } from '../../../system/store/userStore';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useFeedback } from '../../../hooks/useFeedback';
import { useToast } from '../../../ui/components/ToastProvider';
import { useMorphologyMapping } from '../../../hooks/useMorphologyMapping';
import { prepareMorphologicalPayload } from '../../../lib/morph/preparePayload';
import { buildMorphPolicy } from '../../../lib/morph/constraints';
import { normalizeLimbMasses } from '../../../lib/scan/normalizeLimbMasses';
import { resolveSkinTone } from '../../../lib/scan/normalizeSkinTone';
import logger from '../../../lib/utils/logger';
import { saveCurrentAvatar } from '../../pages/BodyScan/BodyScanReview/utils/avatarActions'; // Réutilisation de la logique de sauvegarde

/**
 * Face Scan Review Page - Affiche le résultat du scan facial en 3D
 */
const FaceScanReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserStore();
  const { success } = useFeedback();
  const { showToast } = useToast();
  
  const location = useLocation();
  const scanResults = location.state?.scanResults;

  const [currentFaceMorphData, setCurrentFaceMorphData] = useState<Record<string, number>>({});
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [criticalError, setCriticalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: morphologyMapping } = useMorphologyMapping();
  const avatar3DRef = useRef<any>(null);
  const initialFaceMorphDataRef = useRef<Record<string, number> | null>(null);

  // Extraire les données spécifiques au visage du scanResults ou du profile
  const faceScanData = useMemo(() => {
    // Priorité 1: scanResults depuis la navigation
    if (scanResults?.refine?.final_face_params) {
      return {
        final_face_params: scanResults.refine.final_face_params,
        skin_tone: scanResults.semantic?.face_skin_tone || scanResults.photos?.[0]?.report?.skin_tone || {},
        resolved_gender: scanResults.resolvedGender || profile?.sex || 'male',
        clientScanId: scanResults.clientScanId,
        serverScanId: scanResults.scan_id,
      };
    }
    // Priorité 2: Profile preferences.face
    if (profile?.preferences?.face?.final_face_params) {
      return {
        final_face_params: profile.preferences.face.final_face_params,
        skin_tone: profile.preferences.face.skin_tone || {},
        resolved_gender: profile.preferences.face.resolved_gender || profile.sex || 'male',
        clientScanId: null,
        serverScanId: profile.preferences.face.last_face_scan_id,
      };
    }
    return null;
  }, [scanResults, profile]);

  // Déterminer le genre résolu pour le modèle 3D
  const resolvedGender = useMemo(() => {
    return faceScanData?.resolved_gender || profile?.sex || 'male';
  }, [faceScanData?.resolved_gender, profile?.sex]);

  // Préparer les données morphologiques faciales pour le viewer
  const completeFaceMorphData = useMemo(() => {
    if (!faceScanData?.final_face_params || Object.keys(faceScanData.final_face_params).length === 0) {
      return {};
    }
    return faceScanData.final_face_params;
  }, [faceScanData?.final_face_params]);

  // Initialiser currentFaceMorphData et initialFaceMorphDataRef
  useEffect(() => {
    if (completeFaceMorphData && Object.keys(completeFaceMorphData).length > 0 && !initialFaceMorphDataRef.current) {
      setCurrentFaceMorphData(completeFaceMorphData);
      initialFaceMorphDataRef.current = { ...completeFaceMorphData };
      setIsLoading(false);
      logger.info('FACE_REVIEW', 'Initial face morph data set for review', {
        morphKeys: Object.keys(completeFaceMorphData).length,
      });
    } else if (!faceScanData) {
      setCriticalError('Aucune donnée de scan facial trouvée. Veuillez refaire un scan.');
      setIsLoading(false);
    }
  }, [completeFaceMorphData, faceScanData]);

  // Gestionnaire de la sauvegarde de l'avatar facial
  const handleSaveFaceAvatar = useCallback(async () => {
    if (!profile?.userId || !faceScanData) {
      showToast({ type: 'error', title: 'Erreur', message: 'Utilisateur non identifié ou données manquantes.' });
      return;
    }

    try {
      await updateProfile({
        preferences: {
          ...profile.preferences,
          face: {
            final_face_params: currentFaceMorphData,
            skin_tone: faceScanData.skin_tone,
            resolved_gender: resolvedGender,
            last_face_scan_id: faceScanData.serverScanId,
            updated_at: new Date().toISOString(),
          },
        },
      });

      success();
      showToast({ type: 'success', title: 'Visage sauvegardé', message: 'Votre avatar facial a été mis à jour.' });
      navigate('/avatar#avatar');

    } catch (error) {
      logger.error('FACE_REVIEW', 'Failed to save face avatar', { error });
      showToast({ type: 'error', title: 'Erreur de sauvegarde', message: 'Impossible de sauvegarder votre avatar facial.' });
    }
  }, [profile, faceScanData, currentFaceMorphData, resolvedGender, updateProfile, success, showToast, navigate]);

  // Gestionnaire de la réinitialisation des morphs faciaux
  const resetFaceMorphsToInitial = useCallback(() => {
    if (initialFaceMorphDataRef.current) {
      setCurrentFaceMorphData(initialFaceMorphDataRef.current);
      if (avatar3DRef.current?.forceMorphsUpdate) {
        avatar3DRef.current.forceMorphsUpdate(initialFaceMorphDataRef.current);
      }
      showToast({ type: 'info', title: 'Réinitialisé', message: 'Les ajustements du visage ont été annulés.' });
    }
  }, [showToast]);

  // Handle loading state
  if (isLoading) {
    return (
      <GlassCard className="text-center p-8">
        <SpatialIcon Icon={ICONS.Loader2} size={48} className="text-purple-400 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-3">Chargement des données faciales...</h3>
        <p className="text-white/70 text-sm">Veuillez patienter.</p>
      </GlassCard>
    );
  }

  if (criticalError) {
    return (
      <GlassCard className="text-center p-8">
        <SpatialIcon Icon={ICONS.AlertCircle} size={48} className="text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-3">Erreur critique</h3>
        <p className="text-red-300 text-sm mb-6">{criticalError}</p>
        <button onClick={() => navigate('/face-scan')} className="btn-glass--primary">
          Refaire un scan facial
        </button>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8 visionos-grid">
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Eye} size={16} className="text-cyan-400" />
            Votre Visage 3D
          </h3>
          {!isViewerReady && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-medium">Préparation...</span>
            </div>
          )}
        </div>
        
        <div className="h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/20 relative overflow-hidden">
          <Avatar3DViewer
            ref={avatar3DRef}
            userProfile={profile} // Passer le profil utilisateur complet
            faceMorphData={currentFaceMorphData} // Passer les morphs faciaux
            faceSkinTone={faceScanData?.skin_tone} // Passer le skin tone facial
            resolvedGender={resolvedGender}
            className="w-full h-full"
            autoRotate={true}
            onViewerReady={() => setIsViewerReady(true)}
            showControls={true}
            faceOnly={true} // Indiquer que c'est un viewer facial
          />
        </div>
      </GlassCard>

      {/* Boutons d'action */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <button
          onClick={handleSaveFaceAvatar}
          disabled={!isViewerReady}
          className={`px-6 py-4 text-lg font-semibold ${
            isViewerReady ? 'btn-glass--primary' : 'btn-glass opacity-50 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <SpatialIcon Icon={ICONS.Save} size={20} />
            <span>Sauvegarder le visage</span>
          </div>
        </button>

        <button
          onClick={() => navigate('/face-scan')}
          className="btn-glass px-6 py-4 text-lg font-semibold"
        >
          <div className="flex items-center justify-center gap-2">
            <SpatialIcon Icon={ICONS.Scan} size={20} />
            <span>Refaire un scan facial</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FaceScanReviewPage;

