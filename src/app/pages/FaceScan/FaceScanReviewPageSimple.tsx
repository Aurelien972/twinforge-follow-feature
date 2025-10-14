// src/app/pages/FaceScan/FaceScanReviewPageSimple.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import logger from '../../../lib/utils/logger';
import FaceScanResultViewer from './components/FaceScanResultViewer';
import { motion } from 'framer-motion';

/**
 * FaceScanReviewPageSimple - Page dédiée pour visualiser le résultat 3D du scan facial
 * Cette page affiche uniquement le viewer 3D avec les contrôles
 */
const FaceScanReviewPageSimple: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get scan results from navigation state
  const scanResults = location.state?.scanResults;

  // Redirect if no scan results
  useEffect(() => {
    if (!scanResults) {
      logger.warn('FACE_REVIEW_SIMPLE', 'No scan results found, redirecting to face scan', {
        philosophy: 'missing_scan_results_redirect'
      });
      navigate('/face-scan', { replace: true });
      return;
    }

    logger.info('FACE_REVIEW_SIMPLE', 'Face scan review page mounted with results', {
      hasResults: !!scanResults,
      hasFaceParams: !!scanResults?.refine?.final_face_params,
      faceParamsCount: Object.keys(scanResults?.refine?.final_face_params || {}).length,
      philosophy: 'face_review_page_mounted'
    });
  }, [scanResults, navigate]);

  if (!scanResults) {
    return null;
  }

  // Vérifier que les données essentielles sont présentes
  if (!scanResults?.refine?.final_face_params || Object.keys(scanResults.refine.final_face_params).length === 0) {
    return (
      <GlassCard className="text-center p-8">
        <SpatialIcon Icon={ICONS.AlertCircle} size={48} className="text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-3">Données faciales manquantes</h3>
        <p className="text-red-300 text-sm mb-6">
          Les paramètres de morphologie faciale sont introuvables. Veuillez refaire un scan.
        </p>
        <button
          onClick={() => navigate('/face-scan')}
          className="btn-glass--primary px-6 py-3"
        >
          <div className="flex items-center justify-center gap-2">
            <SpatialIcon Icon={ICONS.ScanFace} size={16} />
            <span>Refaire un scan facial</span>
          </div>
        </button>
      </GlassCard>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(236, 72, 153, 0.35), rgba(236, 72, 153, 0.25))
                  `,
                  border: '2px solid rgba(236, 72, 153, 0.5)',
                  boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
                }}
              >
                <SpatialIcon Icon={ICONS.ScanFace} size={24} style={{ color: '#EC4899' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Résultat du Scan Facial</h1>
                <p className="text-white/60 text-sm mt-1">Visualisez votre avatar 3D facial en détail</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/avatar#avatar')}
              className="btn-glass px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <SpatialIcon Icon={ICONS.ArrowLeft} size={16} />
                <span>Retour à l'avatar</span>
              </div>
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* 3D Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FaceScanResultViewer
          faceMorphData={scanResults.refine.final_face_params}
          faceSkinTone={scanResults.photos?.[0]?.report?.skin_tone}
          userGender={scanResults.resolvedGender || 'male'}
          matchResults={{
            topArchetype: scanResults.match?.selected_archetypes?.[0]?.name,
            topScore: scanResults.match?.selected_archetypes?.[0]?.score,
            archetypesCount: scanResults.match?.selected_archetypes?.length
          }}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          onClick={() => navigate('/avatar#avatar')}
          className="btn-glass--primary px-6 py-4 text-lg font-semibold"
        >
          <div className="flex items-center justify-center gap-2">
            <SpatialIcon Icon={ICONS.Eye} size={20} />
            <span>Voir l'avatar complet</span>
          </div>
        </button>

        <button
          onClick={() => navigate('/face-scan')}
          className="btn-glass px-6 py-4 text-lg font-semibold"
        >
          <div className="flex items-center justify-center gap-2">
            <SpatialIcon Icon={ICONS.ScanFace} size={20} />
            <span>Refaire un scan</span>
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export default FaceScanReviewPageSimple;
