/**
 * Immersive Face Analysis - Optimized Face Forge Edition
 * GPU-accelerated Stage 2 analysis with unified CSS system
 * Replaces Framer Motion with pure CSS for superior performance
 * Uses emerald/turquoise color palette for Face Forge
 */

import React, { useEffect, useState, useMemo } from 'react';
import { usePreferredMotion } from '../../../../system/device/DeviceProvider';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import type { CapturedPhotoEnhanced } from '../../../../domain/types';
import logger from '../../../../lib/utils/logger';

interface ImmersiveFaceAnalysisProps {
  capturedPhotos: CapturedPhotoEnhanced[];
  currentProgress: number;
  currentMessage: string;
  currentSubMessage: string;
}

/**
 * Immersive Face Analysis - Face Forge
 * Uses forge-immersive-analysis.css for all animations
 * GPU-optimized with Face Forge emerald/turquoise theme
 */
const ImmersiveFaceAnalysis: React.FC<ImmersiveFaceAnalysisProps> = ({
  capturedPhotos,
  currentProgress,
  currentMessage,
  currentSubMessage,
}) => {
  const preferredMotion = usePreferredMotion();
  const shouldAnimate = preferredMotion === 'full';

  // Photos
  const frontPhoto = useMemo(
    () => capturedPhotos.find((p) => p.type === 'front'),
    [capturedPhotos]
  );
  const profilePhoto = useMemo(
    () => capturedPhotos.find((p) => p.type === 'profile'),
    [capturedPhotos]
  );

  if (!frontPhoto || !profilePhoto) {
    logger.warn('FACE_SCAN_IMMERSIVE_ANALYSIS', 'Photos manquantes pour l\'analyse immersive', {
      hasFrontPhoto: !!frontPhoto,
      hasProfilePhoto: !!profilePhoto,
      totalPhotos: capturedPhotos.length
    });
    return null;
  }

  // Key points for face analysis
  const frontKeypoints = useMemo(
    () => [
      { x: 50, y: 20, label: 'Front' },
      { x: 35, y: 35, label: 'Œil G' },
      { x: 65, y: 35, label: 'Œil D' },
      { x: 50, y: 50, label: 'Nez' },
      { x: 40, y: 65, label: 'Bouche G' },
      { x: 60, y: 65, label: 'Bouche D' },
      { x: 50, y: 80, label: 'Menton' },
    ],
    []
  );

  const profileKeypoints = useMemo(
    () => [
      { x: 50, y: 15, label: 'Front' },
      { x: 50, y: 35, label: 'Œil' },
      { x: 55, y: 48, label: 'Nez' },
      { x: 48, y: 65, label: 'Bouche' },
      { x: 45, y: 80, label: 'Menton' },
    ],
    []
  );

  return (
    <div className="forge-analysis-container">
      {/* Photo Grid - Uses CSS animations */}
      <div className="forge-photo-grid">
        {/* Front Photo Card */}
        <div className="forge-photo-card">
          <img
            src={frontPhoto.url}
            alt="Photo de face en cours d'analyse"
            loading="eager"
            decoding="async"
          />
          <div className="forge-photo-overlay">
            <span className="forge-photo-label">Photo de Face</span>
          </div>
        </div>

        {/* Profile Photo Card */}
        <div className="forge-photo-card">
          <img
            src={profilePhoto.url}
            alt="Photo de profil en cours d'analyse"
            loading="eager"
            decoding="async"
          />
          <div className="forge-photo-overlay">
            <span className="forge-photo-label">Photo de Profil</span>
          </div>
        </div>
      </div>

      {/* Analysis Modules Grid - Inspired by Activity Tracker */}
      <div className="forge-analysis-modules">
        {/* Module 1: Structure Faciale */}
        <div className="forge-analysis-module forge-analysis-module--face forge-analysis-module--processing">
          <div className="forge-module-header">
            <div className="forge-module-icon forge-module-icon--face">
              <SpatialIcon Icon={ICONS.User} size={20} />
            </div>
            <h4 className="forge-module-title">Structure Faciale</h4>
          </div>
          <div className="forge-module-content">
            <div className="forge-module-label">Points clés identifiés</div>
            <div className="forge-module-value forge-module-value--face">
              {frontKeypoints.length + profileKeypoints.length}
            </div>
            <div className="forge-module-progress">
              <div
                className="forge-module-progress-fill forge-module-progress-fill--face"
                style={{ width: `${Math.min(currentProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Module 2: Traits Morphologiques */}
        <div className="forge-analysis-module forge-analysis-module--face forge-analysis-module--processing">
          <div className="forge-module-header">
            <div className="forge-module-icon forge-module-icon--face">
              <SpatialIcon Icon={ICONS.Scan} size={20} />
            </div>
            <h4 className="forge-module-title">Traits Morphologiques</h4>
          </div>
          <div className="forge-module-content">
            <div className="forge-module-label">Zones analysées</div>
            <div className="forge-module-value forge-module-value--face">14/16</div>
            <div className="forge-module-progress">
              <div
                className="forge-module-progress-fill forge-module-progress-fill--face"
                style={{ width: '87%' }}
              />
            </div>
          </div>
        </div>

        {/* Module 3: Symétrie Faciale */}
        <div className="forge-analysis-module forge-analysis-module--face forge-analysis-module--processing">
          <div className="forge-module-header">
            <div className="forge-module-icon forge-module-icon--face">
              <SpatialIcon Icon={ICONS.Target} size={20} />
            </div>
            <h4 className="forge-module-title">Symétrie Faciale</h4>
          </div>
          <div className="forge-module-content">
            <div className="forge-module-label">Précision</div>
            <div className="forge-module-value forge-module-value--face">96%</div>
            <div className="forge-module-progress">
              <div
                className="forge-module-progress-fill forge-module-progress-fill--face"
                style={{ width: '96%' }}
              />
            </div>
          </div>
        </div>

        {/* Module 4: Tons de Peau */}
        <div className="forge-analysis-module forge-analysis-module--face forge-analysis-module--processing">
          <div className="forge-module-header">
            <div className="forge-module-icon forge-module-icon--face">
              <SpatialIcon Icon={ICONS.Palette} size={20} />
            </div>
            <h4 className="forge-module-title">Tons de Peau</h4>
          </div>
          <div className="forge-module-content">
            <div className="forge-module-label">Zones extraites</div>
            <div className="forge-module-value forge-module-value--face">6/6</div>
            <div className="forge-module-progress">
              <div
                className="forge-module-progress-fill forge-module-progress-fill--face"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Central Analysis Loader - Only shown during initial processing */}
      {currentProgress < 30 && (
        <div className="forge-analysis-loader">
          <div className="forge-analysis-spinner forge-analysis-spinner--face" />
          <div className="forge-analysis-text">
            <h3 className="forge-analysis-title">{currentMessage}</h3>
            <p className="forge-analysis-subtitle">{currentSubMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImmersiveFaceAnalysis;
