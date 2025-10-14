import { motion } from 'framer-motion';
import React from 'react';

interface AnalysisProgressProps {
  progress: number;
  reduceMotion: boolean;
}

/**
 * Analysis Progress - Barre de progression énergétique
 * Barre de progression avec effet shimmer et pourcentages
 */
const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress, reduceMotion }) => {
  const forgeColors = {
    primary: '#3B82F6',
    secondary: '#06B6D4',
  };

  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="max-w-md mx-auto mt-6">
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-2 rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, 
              ${forgeColors.primary} 0%, 
              ${forgeColors.secondary} 50%, 
              ${forgeColors.primary} 100%
            )`,
            boxShadow: `
              0 0 12px color-mix(in srgb, ${forgeColors.primary} 60%, transparent),
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
            width: `${safeProgress}%`,
            transition: 'width 0.8s ease-out'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shimmer Effect */}
          {!reduceMotion && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.4) 50%, 
                  transparent 100%
                )`,
                animation: 'energyShimmer 2s ease-in-out infinite'
              }}
            />
          )}
        </motion.div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-white/50">
        <span>Initialisation</span>
        <span className="font-bold text-white" style={{ color: forgeColors.primary }}>
          {Math.round(safeProgress)}%
        </span>
        <span>Complété</span>
      </div>
    </div>
  );
};

export default AnalysisProgress;