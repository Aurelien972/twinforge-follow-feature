import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import React, { useEffect, useRef } from 'react';
import { ICONS } from '../../../../../ui/icons/registry';
import { useActivityPerformance } from '../../hooks/useActivityPerformance';

interface AnalysisIconProps {
  progress: number;
}

/**
 * Analysis Icon - Icône centrale de la Forge Énergétique
 * Icône principale avec effets de glow et anneaux pulsants
 * Optimized with performance mode integration
 */
const AnalysisIcon: React.FC<AnalysisIconProps> = ({ progress }) => {
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

  const forgeColors = {
    primary: '#3B82F6',
    secondary: '#06B6D4',
  };

  return (
    <div className="analysis-icon-container" ref={containerRef}>
      <div className={`analysis-icon-ring ${perf.enablePulseEffects ? 'analysis-icon-pulse' : ''}`} />
      <div
        className="analysis-icon-inner"
      >
        <SpatialIcon
          Icon={ICONS.Zap}
          size={48}
          style={{
            color: forgeColors.primary,
            filter: perf.enableGlows ? `
              drop-shadow(0 0 12px color-mix(in srgb, ${forgeColors.primary} 90%, transparent))
              drop-shadow(0 0 24px color-mix(in srgb, ${forgeColors.primary} 70%, transparent))
              drop-shadow(0 0 36px color-mix(in srgb, ${forgeColors.secondary} 50%, transparent))
            ` : 'none'
          }}
          variant="pure"
        />
      </div>
    </div>
  );
};

export default AnalysisIcon;
