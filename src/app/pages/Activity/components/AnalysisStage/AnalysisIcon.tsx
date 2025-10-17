import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import React from 'react';
import { ICONS } from '../../../../../ui/icons/registry';

interface AnalysisIconProps {
  reduceMotion: boolean;
  progress: number;
}

/**
 * Analysis Icon - Icône centrale de la Forge Énergétique
 * Icône principale avec effets de glow et anneaux pulsants
 */
const AnalysisIcon: React.FC<AnalysisIconProps> = ({ reduceMotion, progress }) => {
  const forgeColors = {
    primary: '#3B82F6',
    secondary: '#06B6D4',
  };

  return (
    <div className="relative">
      <div
        className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center relative ${
          !reduceMotion ? 'breathing-icon' : ''
        }`}
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, color-mix(in srgb, ${forgeColors.primary} 25%, transparent) 0%, transparent 50%),
            linear-gradient(135deg, color-mix(in srgb, ${forgeColors.primary} 50%, transparent), color-mix(in srgb, ${forgeColors.secondary} 40%, transparent))
          `,
          border: `4px solid color-mix(in srgb, ${forgeColors.primary} 70%, transparent)`,
          boxShadow: `
            0 0 40px color-mix(in srgb, ${forgeColors.primary} 70%, transparent),
            0 0 80px color-mix(in srgb, ${forgeColors.primary} 50%, transparent),
            0 0 120px color-mix(in srgb, ${forgeColors.secondary} 40%, transparent),
            inset 0 4px 0 rgba(255,255,255,0.5),
            inset 0 -2px 0 rgba(0,0,0,0.2)
          `,
          backdropFilter: 'blur(20px) saturate(170%)',
          WebkitBackdropFilter: 'blur(20px) saturate(170%)'
        }}
      >
        <SpatialIcon
          Icon={ICONS.Zap}
          size={48}
          style={{
            color: forgeColors.primary,
            filter: `
              drop-shadow(0 0 12px color-mix(in srgb, ${forgeColors.primary} 90%, transparent))
              drop-shadow(0 0 24px color-mix(in srgb, ${forgeColors.primary} 70%, transparent))
              drop-shadow(0 0 36px color-mix(in srgb, ${forgeColors.secondary} 50%, transparent))
            `
          }}
          variant="pure"
        />
      </div>

      {/* Anneaux d'Énergie Pulsants */}
      {!reduceMotion && (
        <>
          <div
            className="absolute inset-0 rounded-full border-2 animate-ping"
            style={{
              borderColor: `color-mix(in srgb, ${forgeColors.primary} 50%, transparent)`,
              animationDuration: '2s'
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 animate-ping"
            style={{
              borderColor: `color-mix(in srgb, ${forgeColors.secondary} 40%, transparent)`,
              animationDuration: '2.5s',
              animationDelay: '0.5s'
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 animate-ping"
            style={{
              borderColor: `color-mix(in srgb, ${forgeColors.primary} 30%, transparent)`,
              animationDuration: '3s',
              animationDelay: '1s'
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnalysisIcon;