import { useActivityPerformance } from '../../hooks/useActivityPerformance';
import { ConditionalMotionActivity } from '../shared/ConditionalMotionActivity';
import React, { useEffect, useRef } from 'react';

interface AnalysisProgressProps {
  progress: number;
}

/**
 * Analysis Progress - Barre de progression énergétique
 * Barre de progression avec effet shimmer et pourcentages
 * Optimized with performance mode integration
 */
const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress }) => {
  const perf = useActivityPerformance();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const perfClass = `activity-perf-${perf.mode}`;
      containerRef.current.classList.add(perfClass);
      return () => {
        containerRef.current?.classList.remove(perfClass);
      };
    }
  }, [perf.mode]);

  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="analysis-progress-container" ref={containerRef}>
      <div className="analysis-progress-bar">
        <ConditionalMotionActivity
          className="analysis-progress-fill"
          style={{ width: `${safeProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{
            duration: perf.transitionDuration * 1.5,
            ease: "easeOut"
          }}
          fallback={
            <div
              className="analysis-progress-fill"
              style={{
                width: `${safeProgress}%`,
                transition: `width ${perf.transitionDuration * 1.5}s ease-out`
              }}
            >
              {perf.enableShimmers && <div className="analysis-progress-shimmer" />}
            </div>
          }
        >
          {perf.enableShimmers && <div className="analysis-progress-shimmer" />}
        </ConditionalMotionActivity>
      </div>
      <span className="analysis-progress-percentage">
        {Math.round(safeProgress)}%
      </span>
    </div>
  );
};

export default AnalysisProgress;
