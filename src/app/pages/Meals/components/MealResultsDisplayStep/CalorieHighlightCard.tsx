import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface CalorieHighlightCardProps {
  mealName: string;
  totalCalories: number;
  confidence: number;
  analysisModel: string;
  celebrationActive: boolean;
  analysisMetadata?: {
    processing_time_ms: number;
    analysis_model_used: string;
    tokens_used?: any;
    fallback_used?: boolean;
  };
}

/**
 * Calorie Highlight Card - Mise en Valeur des Calories TwinForge
 * Composant premium pour afficher les calories avec design VisionOS 26
 */
const CalorieHighlightCard: React.FC<CalorieHighlightCardProps> = ({
  mealName,
  totalCalories,
  confidence,
  analysisModel,
  celebrationActive,
  analysisMetadata,
}) => {
  const reduceMotion = useReducedMotion();
  const [displayCalories, setDisplayCalories] = useState(0);

  // Count-up animation pour les calories
  useEffect(() => {
    if (totalCalories === 0) return;
    
    const duration = 800; // Animation CSS plus rapide
    const steps = 30;
    const increment = totalCalories / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(totalCalories, Math.round(increment * currentStep));
      setDisplayCalories(newValue);
      
      if (currentStep >= steps || newValue >= totalCalories) {
        setDisplayCalories(totalCalories);
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [totalCalories]);

  return (
    <div className="meal-results-enter">
      <GlassCard 
        className="p-6 md:p-8 text-center relative w-full perf-critical"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, color-mix(in srgb, #FF4500 4%, transparent) 0%, transparent 70%),
            var(--glass-opacity)
          `,
          borderColor: 'color-mix(in srgb, #FF4500 30%, transparent)',
          boxShadow: `
            0 12px 40px rgba(0, 0, 0, 0.25),
            0 0 30px color-mix(in srgb, #FF4500 15%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.15)
          `,
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '24px',
          border: '2px solid color-mix(in srgb, #FF4500 40%, transparent)'
        }}
      >
        {/* Halo de Forge Énergétique - Réduit */}
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, color-mix(in srgb, #FF4500 2%, transparent) 0%, transparent 70%)`,
            filter: 'blur(16px)',
            transform: 'scale(1.1)',
            zIndex: -1,
            animation: celebrationActive && !reduceMotion ? 'calorie-forge-glow 3s ease-in-out infinite' : 
                      !reduceMotion ? 'calorie-forge-glow-idle 4s ease-in-out infinite' : 'none'
          }}
        />

        <div className="relative z-10 space-y-6">
          {/* Icône de Flamme Énergétique */}
          <div className="flex justify-center mb-4">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center relative"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #FF4500 40%, transparent), color-mix(in srgb, #FF8C00 30%, transparent))
                `,
                border: `2px solid color-mix(in srgb, #FF4500 60%, transparent)`,
                boxShadow: `
                  0 0 40px color-mix(in srgb, #FF4500 50%, transparent),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3)
                `
              }}
              animate={celebrationActive ? {
                scale: [1, 1.08, 1],
                boxShadow: [
                  `0 0 40px color-mix(in srgb, #FF4500 50%, transparent), inset 0 2px 0 rgba(255, 255, 255, 0.3)`,
                  `0 0 60px color-mix(in srgb, #FF4500 70%, transparent), inset 0 3px 0 rgba(255, 255, 255, 0.4)`,
                  `0 0 40px color-mix(in srgb, #FF4500 50%, transparent), inset 0 2px 0 rgba(255, 255, 255, 0.3)`
                ]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: celebrationActive ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <SpatialIcon 
                Icon={ICONS.Flame} 
                size={32} 
                className="text-white"
                variant="pure"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* Affichage des Calories */}
          <div className="text-center space-y-5">
            {/* Nom du Repas Généré par l'IA */}
            <div className="space-y-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-normal">
                {mealName}
              </h2>
              <p className="text-white/70 text-base">
                Repas analysé par TwinForge
              </p>
            </div>
            
            <div 
              className="text-5xl md:text-6xl font-black leading-none"
              style={{
                background: `
                  linear-gradient(135deg, 
                    #FF4500, 
                    #FF8C00,
                    #FFD700
                  )
                `,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: celebrationActive ? 
                  '0 0 40px color-mix(in srgb, #FF4500 60%, transparent)' :
                  '0 0 20px color-mix(in srgb, #FF4500 40%, transparent)',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
              }}
            >
              {displayCalories}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Énergie Totale
              </h3>
              <p className="text-white/80 text-base md:text-lg">
                Kilocalories analysées
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CalorieHighlightCard;