import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../ui/icons/registry';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { FRIDGE_SCAN_STEPS, type FridgeScanStepData } from '../../../../system/store/fridgeScan';

interface FridgeScanProgressHeaderProps {
  currentStep: FridgeScanStepData;
  overallProgress: number;
  stepProgress?: number;
  loadingMessage?: string;
}

const FridgeScanProgressHeader: React.FC<FridgeScanProgressHeaderProps> = ({
  currentStep,
  overallProgress,
  stepProgress,
  loadingMessage
}) => {
  const IconComponent = ICONS[currentStep.icon];

  // Use the overallProgress prop directly
  const displayOverallProgress = overallProgress;

  // Calculate current step index for workshop display
  const currentStepIndex = FRIDGE_SCAN_STEPS.findIndex(step => step.id === currentStep.id);
  const totalSteps = 4;

  return (
    <div className="glass-fridge-progress-header mb-6 mt-6">
      <div className="fridge-progress-header-content">
        <div className="fridge-progress-header-left">
          <div className="fridge-progress-header-icon">
            <SpatialIcon
              Icon={ICONS[currentStep.icon]}
              size={24}
              glowColor="var(--color-fridge-primary)"
              variant="pure"
              style={{
                color: 'var(--color-fridge-primary)',
                filter: `drop-shadow(0 0 12px var(--color-fridge-primary))`
              }}
            />
          </div>
          <div>
            <h2 className="fridge-progress-header-title">
              {currentStep.title}
            </h2>
            <p className="fridge-progress-header-subtitle">
              {currentStep.subtitle}
            </p>
          </div>
        </div>

        {/* CRITICAL: Use overallProgress prop directly for percentage display */}
        <div className="fridge-progress-percentage">
          <div className="fridge-progress-percentage-value">
            {Math.round(displayOverallProgress)}%
          </div>
          <div className="fridge-progress-percentage-label">
            Progression globale
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="fridge-progress-bar-main">
        <motion.div
          className="fridge-progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${displayOverallProgress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step progress indicators */}
      <div className="fridge-progress-dots">
        <div className="fridge-progress-dots-left">
          {FRIDGE_SCAN_STEPS.slice(0, 4).map((step, index) => (
            <div
              key={step.id}
              className={`fridge-progress-dot ${
                displayOverallProgress >= step.startProgress ? 'active' : ''
              }`}
            />
          ))}
        </div>

        <div className="fridge-progress-dots-label">
          Atelier {currentStepIndex + 1} / {totalSteps}
        </div>
      </div>

      {/* Loading message */}
      {loadingMessage && (
        <div className="mt-3 text-sm text-gray-300 animate-pulse">
          {loadingMessage}
        </div>
      )}
    </div>
  );
};

export default FridgeScanProgressHeader;