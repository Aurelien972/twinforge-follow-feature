/**
 * Face Scan Progress Header - Forge Faciale
 * Premium GlassCard-based progress indicator with dynamic titles and responsive design
 * Optimized for vertical layout with Face Forge theme colors and icons
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import type { ProgressStep } from '../../../system/store/progressStore';

interface FaceScanProgressHeaderProps {
  steps: ProgressStep[];
  currentStepId: string;
  progress: number;
  message: string;
  subMessage: string;
  className?: string;
}

// Forge Faciale color palette - using a distinct color from body
const FORGE_FACE_COLOR = '#EC4899'; // Pink for face forge

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
    <div className={`face-scan-progress-header ${className}`}>
      <GlassCard
        className="p-4 md:p-5"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, ${FORGE_FACE_COLOR} 28%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, color-mix(in srgb, ${FORGE_FACE_COLOR} 20%, transparent) 0%, transparent 50%),
            color-mix(in srgb, ${FORGE_FACE_COLOR} 12%, transparent)
          `,
          border: `2px solid color-mix(in srgb, ${FORGE_FACE_COLOR} 40%, transparent)`,
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 50px color-mix(in srgb, ${FORGE_FACE_COLOR} 35%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)'
        }}
      >
        {/* Header Row: Icon, Title/Subtitle, Step Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1">
            {/* Decorative Forge Icon with Pulse Animation */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative flex-shrink-0"
            >
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent) 0%, transparent 70%),
                    radial-gradient(circle at 70% 70%, color-mix(in srgb, ${FORGE_FACE_COLOR} 35%, transparent) 0%, transparent 60%),
                    rgba(255, 255, 255, 0.15)
                  `,
                  border: `3px solid color-mix(in srgb, ${FORGE_FACE_COLOR} 60%, transparent)`,
                  boxShadow: `
                    0 12px 48px color-mix(in srgb, ${FORGE_FACE_COLOR} 55%, transparent),
                    0 0 90px color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent),
                    0 0 130px color-mix(in srgb, ${FORGE_FACE_COLOR} 35%, transparent),
                    inset 0 2px 0 rgba(255, 255, 255, 0.3)
                  `,
                  backdropFilter: 'blur(16px) saturate(170%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(170%)'
                }}
              >
                <SpatialIcon
                  Icon={ICONS.User}
                  size={68}
                  variant="pure"
                  style={{
                    color: FORGE_FACE_COLOR,
                    filter: `drop-shadow(0 0 28px color-mix(in srgb, ${FORGE_FACE_COLOR} 90%, transparent))`
                  }}
                />
              </div>
            </motion.div>

            {/* Dynamic Title and Subtitle */}
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-w-0"
            >
              <h2
                className="text-xl md:text-2xl font-bold text-white mb-1"
                style={{
                  textShadow: `0 0 30px color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent)`
                }}
              >
                {currentStepData.title}
              </h2>
              <p
                className="text-sm md:text-base text-white/70"
                style={{
                  color: `color-mix(in srgb, #E5E7EB 85%, ${FORGE_FACE_COLOR} 15%)`
                }}
              >
                {currentStepData.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Dynamic Step Badge */}
          <motion.div
            key={currentStepId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <div
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm md:text-base font-semibold text-white whitespace-nowrap"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, color-mix(in srgb, ${FORGE_FACE_COLOR} 45%, transparent) 0%, transparent 70%),
                  rgba(255, 255, 255, 0.12)
                `,
                border: `1.5px solid color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent)`,
                boxShadow: `
                  0 4px 16px color-mix(in srgb, ${FORGE_FACE_COLOR} 30%, transparent),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                textShadow: `0 0 16px color-mix(in srgb, ${FORGE_FACE_COLOR} 60%, transparent)`,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              Étape {currentStepIndex + 1}/{steps.length}
            </div>
          </motion.div>
        </div>

        {/* Global Progress Bar with Percentage Display */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm font-medium text-white/70">Progression globale</span>
            <motion.span
              key={progress}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-sm md:text-base font-bold"
              style={{
                color: FORGE_FACE_COLOR,
                textShadow: `0 0 16px color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent)`
              }}
            >
              {Math.round(safeProgress)}%
            </motion.span>
          </div>
          <div className="relative w-full h-3 rounded-full overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              animate={{ width: `${safeProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                background: `linear-gradient(90deg, ${FORGE_FACE_COLOR}, color-mix(in srgb, ${FORGE_FACE_COLOR} 80%, white))`,
                boxShadow: `0 0 20px color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent)`
              }}
            />
          </div>
        </div>

        {/* Step Indicators Grid - Responsive */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full mb-5">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const Icon = ICONS[step.icon as keyof typeof ICONS];

            return (
              <motion.div
                key={step.id}
                className="flex flex-col items-center"
                whileHover={isActive ? { scale: 1.05 } : undefined}
                transition={{ duration: 0.2 }}
              >
                {/* Micro GlassCard for Icon */}
                <div
                  className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300"
                  style={{
                    background: isCompleted
                      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))'
                      : isActive
                      ? `
                        radial-gradient(circle at 30% 30%, color-mix(in srgb, ${FORGE_FACE_COLOR} 35%, transparent) 0%, transparent 60%),
                        radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--brand-primary) 25%, transparent) 0%, transparent 50%),
                        rgba(255, 255, 255, 0.12)
                      `
                      : 'rgba(255, 255, 255, 0.06)',
                    border: isCompleted
                      ? '2px solid rgba(34, 197, 94, 0.6)'
                      : isActive
                      ? `2px solid color-mix(in srgb, ${FORGE_FACE_COLOR} 60%, transparent)`
                      : '2px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isCompleted
                      ? '0 4px 16px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      : isActive
                      ? `
                        0 8px 24px color-mix(in srgb, ${FORGE_FACE_COLOR} 35%, transparent),
                        0 0 40px color-mix(in srgb, ${FORGE_FACE_COLOR} 25%, transparent),
                        inset 0 2px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                      `
                      : '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(150%)'
                  }}
                >
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
                      className={isActive ? 'text-white' : 'text-white/50'}
                      style={isActive ? {
                        color: FORGE_FACE_COLOR,
                        filter: `drop-shadow(0 0 12px color-mix(in srgb, ${FORGE_FACE_COLOR} 70%, transparent))`
                      } : undefined}
                    />
                  )}

                  {/* Pulsing Ring for Active Step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      style={{
                        border: `2px solid ${FORGE_FACE_COLOR}`,
                        boxShadow: `0 0 20px color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent)`
                      }}
                    />
                  )}
                </div>

                {/* Step Label */}
                <span
                  className="text-xs md:text-sm font-medium text-center leading-tight transition-all duration-300"
                  style={
                    isActive
                      ? {
                          color: FORGE_FACE_COLOR,
                          textShadow: `0 0 12px color-mix(in srgb, ${FORGE_FACE_COLOR} 50%, transparent)`
                        }
                      : isCompleted
                      ? { color: '#22C55E' }
                      : { color: 'rgba(255, 255, 255, 0.5)' }
                  }
                >
                  {step.title}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Processing Message */}
        {message && (
          <motion.div
            key={`${message}-${subMessage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 rounded-2xl"
            style={{
              background: `
                radial-gradient(circle at 50% 20%, color-mix(in srgb, ${FORGE_FACE_COLOR} 18%, transparent) 0%, transparent 65%),
                rgba(255, 255, 255, 0.08)
              `,
              border: `2px solid color-mix(in srgb, ${FORGE_FACE_COLOR} 30%, rgba(255, 255, 255, 0.15))`,
              backdropFilter: 'blur(16px) saturate(150%)',
              WebkitBackdropFilter: 'blur(16px) saturate(150%)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.25),
                0 0 40px color-mix(in srgb, ${FORGE_FACE_COLOR} 18%, transparent),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)
              `,
            }}
          >
            <div className="text-center">
              <div
                className="text-base md:text-lg font-bold mb-1"
                style={{
                  color: FORGE_FACE_COLOR,
                  textShadow: `0 0 20px color-mix(in srgb, ${FORGE_FACE_COLOR} 40%, transparent)`
                }}
              >
                {message}
              </div>
              {subMessage && (
                <div
                  className="text-sm text-white/70"
                  style={{
                    color: `color-mix(in srgb, #E5E7EB 80%, ${FORGE_FACE_COLOR} 20%)`
                  }}
                >
                  {subMessage}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </GlassCard>
    </div>
  );
};

export default FaceScanProgressHeader;
