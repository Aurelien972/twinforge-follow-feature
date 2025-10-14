import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface ProgressDisplayProps {
  currentProgress: number;
  currentMessage: string;
  currentSubMessage: string;
  currentPhase: 'detection' | 'analysis' | 'calculation';
  analysisColor: string;
}

/**
 * Progress Display Component
 * Affichage de la progression de l'analyse
 */
const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  currentProgress,
  currentMessage,
  currentSubMessage,
  currentPhase,
  analysisColor,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <GlassCard 
      className="p-6 text-center glass-card--progress"
      style={{
        background: `
          radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
          var(--glass-opacity)
        `,
        borderColor: 'rgba(16, 185, 129, 0.2)',
        backdropFilter: 'blur(16px) saturate(140%)',
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.div
            className="relative"
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <SpatialIcon 
              Icon={ICONS.Loader2} 
              size={24} 
              className="loader-essential"
              style={{ 
                color: analysisColor,
                filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.8))'
              }} 
            />
            {/* Halo rotatif */}
            {!reduceMotion && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, 
                    transparent 0%, 
                    ${analysisColor}40 25%, 
                    transparent 50%, 
                    ${analysisColor}60 75%, 
                    transparent 100%
                  )`,
                  animation: 'spinHalo 3s linear infinite reverse'
                }}
              />
            )}
          </motion.div>
          <h3 className="text-xl font-bold text-white">{currentMessage}</h3>
        </div>
        
        <p className="text-green-100 text-sm mb-4 leading-relaxed max-w-sm mx-auto">
          {currentSubMessage}
        </p>
        
        <motion.div 
          className="text-sm font-medium"
          style={{ color: analysisColor }}
          key={currentPhase}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Phase: {currentPhase === 'detection' ? 'Détection des aliments' :
                 currentPhase === 'analysis' ? 'Analyse nutritionnelle' : 'Calcul des macros'}
        </motion.div>
        
        {/* Indicateur de progression visuel */}
        <div className="flex items-center justify-center gap-1 mt-3">
          {['detection', 'analysis', 'calculation'].map((phase, index) => (
            <motion.div
              key={phase}
              className="w-2 h-2 rounded-full"
              style={{
                background: phase === currentPhase ? analysisColor : 'rgba(255, 255, 255, 0.3)',
                boxShadow: phase === currentPhase ? `0 0 8px ${analysisColor}60` : 'none'
              }}
              animate={phase === currentPhase ? {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: phase === currentPhase ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Barre de progression */}
        <div className="w-full bg-white/20 rounded-full h-2 mt-4 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              background: `
                linear-gradient(90deg, 
                  ${analysisColor}, 
                  rgba(34, 197, 94, 0.9),
                  rgba(52, 211, 153, 0.8)
                )
              `,
              boxShadow: `
                0 0 16px ${analysisColor}80,
                inset 0 1px 0 rgba(255,255,255,0.3)
              `
            }}
            initial={{ width: 0 }}
            animate={{ width: `${currentProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            {!reduceMotion && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    rgba(255,255,255,0.4) 50%, 
                    transparent 100%
                  )`,
                  animation: 'progressShimmer 2s ease-in-out infinite'
                }}
              />
            )}
          </motion.div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-300 font-medium">
            {Math.round(currentProgress)}% terminé
          </span>
          <span className="text-white/60">
            Phase: {currentPhase === 'detection' ? 'Détection' :
                   currentPhase === 'analysis' ? 'Analyse' : 'Calcul'}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProgressDisplay;