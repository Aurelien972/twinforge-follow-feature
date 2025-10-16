/**
 * Face Scan Review with Progress Header
 * Wrapper component that displays the progress header during 3D viewer review
 */

import React from 'react';
import { useProgressStore } from '../../../system/store/progressStore';
import FaceScanProgressHeader from './FaceScanProgressHeader';
import FaceScanReviewPage from './FaceScanReviewPage';

const FaceScanReviewWithHeader: React.FC = () => {
  const { isActive, steps, currentStep, progress, message, subMessage } = useProgressStore();

  return (
    <div className="max-w-7xl mx-auto mt-4 space-y-6">
      {/* Progress Header - Always visible, at 100% */}
      {isActive && steps.length > 0 && (
        <FaceScanProgressHeader
          steps={steps}
          currentStepId="avatar"
          progress={100}
          message="Avatar Facial 3D Prêt"
          subMessage="Visualisez votre visage numérique"
        />
      )}

      {/* 3D Viewer Review Content */}
      <FaceScanReviewPage />
    </div>
  );
};

export default FaceScanReviewWithHeader;
