/**
 * Body Scan Celebration with Progress Header
 * Wrapper component that displays the progress header during celebration
 */

import React from 'react';
import { useProgressStore } from '../../../system/store/progressStore';
import BodyScanProgressHeader from './BodyScanProgressHeader';
import BodyScanCelebrationStep from './BodyScanCelebrationStep';

const BodyScanCelebrationWithHeader: React.FC = () => {
  const { isActive, steps, currentStep, progress, message, subMessage } = useProgressStore();

  return (
    <div className="max-w-4xl mx-auto mt-4 space-y-6 pb-4">
      {/* Progress Header - Always visible, non-animated at 100% */}
      {isActive && steps.length > 0 && (
        <BodyScanProgressHeader
          steps={steps}
          currentStepId={currentStep}
          progress={100}
          message="Scan Corporel Terminé"
          subMessage="Votre avatar 3D est prêt"
        />
      )}

      {/* Celebration Content */}
      <BodyScanCelebrationStep />
    </div>
  );
};

export default BodyScanCelebrationWithHeader;
