import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import s from './ActivityProgressHeader.module.css';

export interface ActivityProgressStep {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof ICONS;
  color: string;
}

interface ActivityPipelineProgressHeaderProps {
  steps: ActivityProgressStep[];
  currentStepId: string;
  progress: number;
  message: string;
  subMessage: string;
  className?: string;
}

const STEP_ICONS: Record<string, keyof typeof ICONS> = {
  capture: 'Camera',
  analysis: 'Scan',
  review: 'Eye',
  complete: 'Check',
};

const ActivityPipelineProgressHeader: React.FC<ActivityPipelineProgressHeaderProps> = ({
  steps,
  currentStepId,
  progress,
  message,
  subMessage,
  className = '',
}) => {
  const safeProgress = Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0;

  const stepSize = 100 / steps.length;
  const currentStepIndex = Math.max(0, steps.findIndex(s => s.id === currentStepId));
  const stepStart = currentStepIndex * stepSize;
  const pctInStep = Math.max(0, Math.min(1, (safeProgress - stepStart) / stepSize));

  const currentIcon = STEP_ICONS[currentStepId] || 'Activity';

  const gridStyle = {
    gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
  };

  return (
    <div className={`${s.wrap} ${className}`}>
      <GlassCard className={s.card}>
        <div className={s.grid} data-energy-forge>
          {/* Col 1 — Icône (centrée verticalement) */}
          <div className={s.icon}>
            <div className={s.iconHalo} />
            <SpatialIcon
              Icon={ICONS[currentIcon]}
              size={26}
              className={s.iconGlyph}
            />
          </div>

          {/* Col 2 — Titre / Barre / Étape */}
          <div className={s.center}>
            <h2 className={s.title}>{message || 'Forge Énergétique'}</h2>
            {subMessage && (
              <p className={s.subtitle}>{subMessage}</p>
            )}

            <div
              className={s.rail}
              style={gridStyle}
              role="progressbar"
              aria-valuenow={Math.round(safeProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {steps.map((step, i) => {
                const completed = i < currentStepIndex;
                const current = i === currentStepIndex;
                const width = completed ? '100%' : current ? `${pctInStep * 100}%` : '0%';

                const themeClass = i % 2 === 0 ? s.segBlue : s.segCyan;
                const fillTheme = i % 2 === 0 ? s.fillBlue : s.fillCyan;

                return (
                  <div
                    key={step.id}
                    className={`${s.seg} ${themeClass} ${completed ? s.isComplete : ''} ${current ? s.isCurrent : ''}`}
                  >
                    {(completed || current) && (
                      <motion.span
                        className={`${s.fill} ${fillTheme}`}
                        initial={{ width: 0 }}
                        animate={{ width }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className={s.step}>Forge {currentStepIndex + 1} / {steps.length}</div>
          </div>

          {/* Col 3 — % aligné sur la barre */}
          <div className={s.percent} aria-hidden="true">
            {Math.round(safeProgress)}%
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ActivityPipelineProgressHeader;
