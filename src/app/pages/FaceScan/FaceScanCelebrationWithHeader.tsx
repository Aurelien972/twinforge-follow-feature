/**
 * Face Scan Celebration with Progress Header
 * Wrapper component that displays the progress header during celebration
 */

import React from 'react';
import { useProgressStore } from '../../../system/store/progressStore';
import FaceScanProgressHeader from './FaceScanProgressHeader';
import FaceScanCelebrationStep from './FaceScanCelebrationStep';

const FaceScanCelebrationWithHeader: React.FC = () => {
  const { isActive, steps, currentStep, progress, message, subMessage } = useProgressStore();

  return (
    <div className="max-w-4xl mx-auto mt-4 space-y-6">
      {/* Progress Header - Always visible, non-animated at 100% */}
      {isActive && steps.length > 0 && (
        <FaceScanProgressHeader
          steps={steps}
          currentStepId={currentStep}
          progress={100}
          message="Scan Facial Terminé"
          subMessage="Votre avatar facial 3D est prêt"
        />
      )}

      {/* Celebration Content */}
      <FaceScanCelebrationStep />
    </div>
  );
};

export default FaceScanCelebrationWithHeader;
