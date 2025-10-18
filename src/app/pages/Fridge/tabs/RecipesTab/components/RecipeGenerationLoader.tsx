import React from 'react';
import { motion } from 'framer-motion';
import { usePerformanceMode } from '../../../../../../system/context/PerformanceModeContext';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';

/**
 * Recipe Generation Loader - Animated loader for recipe generation
 * Displays during recipe generation process with spinning animation
 */
const RecipeGenerationLoader: React.FC = () => {
  const { isPerformanceMode } = usePerformanceMode();
  const MotionDiv = isPerformanceMode ? 'div' : motion.div;

  return (
    <MotionDiv
      {...(!isPerformanceMode && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5 }
      })}
      className="mb-6"
    >
      <GlassCard className="fridge-glass-recipes p-8 text-center">
        <div className="space-y-6">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className={`fridge-icon-recipes ${isPerformanceMode ? '' : 'fridge-ai-focus'} w-20 h-20`}>
              <SpatialIcon
                Icon={ICONS.Sparkles}
                size={40}
                color="rgba(255, 255, 255, 0.95)"
                variant="pure"
                {...(!isPerformanceMode && {
                  motionAnimate: { rotate: 360 },
                  motionTransition: { repeat: Infinity, duration: 2, ease: "linear" }
                })}
              />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white fridge-text-glow-recipes">
              Création de recettes en cours...
            </h3>
            <p className="text-white/80 text-lg">
              La Forge Spatiale travaille...
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((index) => (
              <MotionDiv
                key={index}
                className={`w-3 h-3 bg-white/80 rounded-full ${isPerformanceMode ? 'animate-pulse' : ''}`}
                {...(!isPerformanceMode && {
                  animate: {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  },
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }
                })}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-white/70">
              <SpatialIcon
                Icon={ICONS.Clock}
                size={16}
                color="var(--fridge-recipes-primary)"
                variant="pure"
              />
              <span>Analyse des ingrédients et création des recettes...</span>
            </div>
            
            {/* Animated Progress Bar */}
            <div className="fridge-progress-bar w-full max-w-xs mx-auto">
              <MotionDiv
                className={`fridge-progress-bar-fill ${isPerformanceMode ? 'animate-pulse' : ''}`}
                {...(!isPerformanceMode && {
                  animate: { x: ['-100%', '100%'] },
                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                })}
                style={{ width: '50%' }}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </MotionDiv>
  );
};

export default RecipeGenerationLoader;