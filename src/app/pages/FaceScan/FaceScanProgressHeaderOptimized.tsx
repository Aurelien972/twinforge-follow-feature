/**
 * Face Scan Progress Header - Forge Faciale (GPU-Optimized)
 * Version harmonisée avec le tracker d'activité
 * Palette émeraude/turquoise pour distinction visuelle
 * 100% CSS GPU-accelerated, performances optimales sur mobile
 */

import React from 'react';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import type { ProgressStep } from '../../../system/store/progressStore';
import '../../../styles/pipeline/forge-pipeline-gpu-optimized.css';
import '../../../styles/pipeline/forge-pipeline-steps-grid.css';

interface FaceScanProgressHeaderProps {
  steps: ProgressStep[];
  currentStepId: string;
  progress: number;
  message: string;
  subMessage: string;
  className?: string;
}

const FaceScanProgressHeader: React.FC<FaceScanProgressHeaderProps> = ({
  steps,
  currentStepId,
  progress,
  message,
  subMessage,
  className = '',
}) => {
  const currentStepIndex = steps.findIndex(s => s.id === currentStepId);
  const currentStepData = steps[currentStepIndex] || steps[0];

  // Ensure progress is a valid number (0-100)
  const safeProgress = typeof progress === 'number' && !isNaN(progress) ? progress : 0;

  return (
    <div className={`forge-pipeline-header ${className}`}>
      <div className="forge-pipeline-card forge-pipeline-card--face">
        {/* Header Row: Icon, Title/Subtitle, Step Badge */}
        <div className="forge-header-row">
          <div className="forge-header-content">
            {/* Decorative Forge Icon with CSS-only Pulse Animation */}
            <div className="forge-icon-container forge-icon-container--face">
              <SpatialIcon
                Icon={ICONS.User}
                size={68}
                variant="pure"
              />
            </div>

            {/* Dynamic Title and Subtitle */}
            <div className="forge-title-container">
              <h2 className="forge-title forge-title--face">
                {currentStepData.title}
              </h2>
              <p className="forge-subtitle forge-subtitle--face">
                {currentStepData.subtitle}
              </p>
            </div>
          </div>

          {/* Dynamic Step Badge */}
          <div className="forge-step-badge forge-step-badge--face">
            Étape {currentStepIndex + 1}/{steps.length}
          </div>
        </div>

        {/* Global Progress Bar with Percentage Display */}
        <div className="forge-progress-section">
          <div className="forge-progress-label-row">
            <span className="forge-progress-label">Progression globale</span>
            <span className="forge-progress-percentage forge-progress-percentage--face">
              {Math.round(safeProgress)}%
            </span>
          </div>
          <div className="forge-progress-track">
            <div
              className="forge-progress-fill forge-progress-fill--face"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators Grid - Responsive */}
        <div className="forge-steps-grid">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const Icon = ICONS[step.icon as keyof typeof ICONS];

            const itemClass = `forge-step-item ${isActive ? 'forge-step-item--active' : ''}`;

            let iconBoxClass = 'forge-step-icon-box';
            if (isCompleted) {
              iconBoxClass += ' forge-step-icon-box--completed';
            } else if (isActive) {
              iconBoxClass += ' forge-step-icon-box--active forge-step-icon-box--face';
            } else {
              iconBoxClass += ' forge-step-icon-box--pending';
            }

            let labelClass = 'forge-step-label';
            if (isCompleted) {
              labelClass += ' forge-step-label--completed';
            } else if (isActive) {
              labelClass += ' forge-step-label--active forge-step-label--face';
            } else {
              labelClass += ' forge-step-label--pending';
            }

            return (
              <div key={step.id} className={itemClass}>
                {/* Micro GlassCard for Icon */}
                <div className={iconBoxClass}>
                  {/* Icon or Check */}
                  {isCompleted ? (
                    <SpatialIcon
                      Icon={ICONS.CheckCircle}
                      size={20}
                      style={{
                        color: '#22C55E',
                        filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.7))'
                      }}
                    />
                  ) : (
                    <SpatialIcon
                      Icon={Icon}
                      size={20}
                      shape="square"
                    />
                  )}

                  {/* Pulsing Ring for Active Step - Pure CSS */}
                  {isActive && (
                    <div className="forge-step-pulse-ring forge-step-pulse-ring--face" />
                  )}
                </div>

                {/* Step Label */}
                <span className={labelClass}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Processing Message */}
        {message && (
          <div className="forge-message-section forge-message-section--face">
            <div className="forge-message-content">
              <div className="forge-message-title forge-message-title--face">
                {message}
              </div>
              {subMessage && (
                <div className="forge-message-subtitle forge-message-subtitle--face">
                  {subMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceScanProgressHeader;
