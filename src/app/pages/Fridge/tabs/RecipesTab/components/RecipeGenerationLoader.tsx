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
      <GlassCard
        className="p-8 text-center"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, #F97316 12%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, color-mix(in srgb, #FB923C 8%, transparent) 0%, transparent 50%),
            rgba(255, 255, 255, 0.05)
          `,
          borderColor: 'color-mix(in srgb, #F97316 25%, transparent)',
          boxShadow: `
            0 12px 40px rgba(0, 0, 0, 0.25),
            0 0 30px color-mix(in srgb, #F97316 15%, transparent),
            0 0 60px color-mix(in srgb, #FB923C 10%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.15)
          `
        }}
      >
        <div className="space-y-6">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #F97316 35%, transparent), color-mix(in srgb, #F97316 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #F97316 50%, transparent)',
                boxShadow: '0 0 30px color-mix(in srgb, #F97316 40%, transparent)'
              }}
            >
              <SpatialIcon 
                Icon={ICONS.Sparkles} 
                size={40} 
                className="text-white"
                motionAnimate={{ rotate: 360 }}
                motionTransition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "linear" 
                }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h3
              className="text-2xl font-bold text-white"
              style={{
                textShadow: '0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.3)'
              }}
            >
              Création de recettes en cours...
            </h3>
            <p
              className="text-white/80 text-lg"
              style={{
                textShadow: '0 0 10px rgba(251, 146, 60, 0.3)'
              }}
            >
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
                className="text-orange-400"
              />
              <span>Analyse des ingrédients et création des recettes...</span>
            </div>
            
            {/* Animated Progress Bar */}
            <div className="w-full max-w-xs mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
              <MotionDiv
                className={`h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full ${isPerformanceMode ? 'animate-pulse' : ''}`}
                {...(!isPerformanceMode && {
                  animate: {
                    x: ['-100%', '100%']
                  },
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
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