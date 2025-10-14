import React from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import { useFeedback } from '@/hooks/useFeedback';
import { analyzeNutritionalContext } from './contextAnalysis';
import { generateDynamicMessage, generateContextualMetrics } from './messageGenerator';
import { 
  calculateUrgencyConfig, 
  generateUrgencyStyles, 
  generateIconStyles, 
  generateButtonStyles,
  shouldShowParticles,
  getParticleCount
} from './urgencyCalculator';

interface DynamicScanCTAProps {
  todayStats: {
    totalCalories: number;
    mealsCount: number;
    lastMealTime: Date | null;
    macros: { proteins: number; carbs: number; fats: number; fiber: number };
  };
  profile: any;
  calorieStatus: {
    status: string;
    message: string;
    color: string;
    priority: 'low' | 'medium' | 'high';
    recommendation: string;
  };
  calorieTargetAnalysis: {
    target: number;
    bmr: number;
    tdee: number;
    adjustedForObjective: number;
    objectiveType: 'maintenance' | 'deficit' | 'surplus';
  };
}

/**
 * Dynamic Scan CTA - CTA Intelligent et Contextuel
 * Composant dynamique qui s'adapte au contexte nutritionnel de l'utilisateur
 */
const DynamicScanCTA: React.FC<DynamicScanCTAProps> = ({
  todayStats,
  profile,
  calorieStatus,
  calorieTargetAnalysis,
}) => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { click, success, successMajor } = useFeedback();

  // Analyser le contexte nutritionnel
  const context = React.useMemo(() => {
    return analyzeNutritionalContext(todayStats, profile, calorieStatus, calorieTargetAnalysis);
  }, [todayStats, profile, calorieStatus, calorieTargetAnalysis]);

  // Générer le message dynamique
  const message = React.useMemo(() => {
    return generateDynamicMessage(context);
  }, [context]);

  // Calculer la configuration d'urgence
  const urgencyConfig = React.useMemo(() => {
    return calculateUrgencyConfig(context);
  }, [context]);

  // Générer les métriques contextuelles
  const contextualMetrics = React.useMemo(() => {
    return generateContextualMetrics(context);
  }, [context]);

  // Gérer le clic avec audio feedback adapté
  const handleScanMeal = () => {
    // Audio feedback selon l'urgence
    if (urgencyConfig.audioFeedback === 'successMajor') {
      successMajor();
    } else if (urgencyConfig.audioFeedback === 'success') {
      success();
    } else {
      click();
    }
    
    navigate('/meals/scan');
  };

  // Styles dynamiques
  const cardStyles = generateUrgencyStyles(urgencyConfig);
  const iconStyles = generateIconStyles(urgencyConfig);
  const buttonStyles = generateButtonStyles(urgencyConfig);

  return (
    <div className="dynamic-scan-cta meal-capture-enter">
      <GlassCard
        className="p-6 md:p-8 text-center relative overflow-hidden cursor-pointer"
        onClick={handleScanMeal}
        interactive
        style={cardStyles}
      >
        {/* Carrés tournants aux coins - Style harmonisé avec les autres forges */}
        <div className="training-hero-corners" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="corner-particle"
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                background: `linear-gradient(135deg, ${urgencyConfig.color}, rgba(255, 255, 255, 0.8))`,
                boxShadow: `0 0 20px ${urgencyConfig.color}`,
                top: i < 2 ? '12px' : 'auto',
                bottom: i >= 2 ? '12px' : 'auto',
                left: i % 2 === 0 ? '12px' : 'auto',
                right: i % 2 === 1 ? '12px' : 'auto'
              }}
              initial={{
                rotate: i % 2 === 0 ? 45 : -45
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
                rotate: i % 2 === 0 ? [45, 60, 45] : [-45, -60, -45]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          ))}
        </div>

        {/* Halo de Forge Dynamique - Animation Pulse Permanente */}
        {!reduceMotion && (
          <div
            className="absolute inset-0 rounded-inherit pointer-events-none urgent-forge-glow-css"
            style={{
              background: `radial-gradient(circle at center, color-mix(in srgb, ${urgencyConfig.color} 8%, transparent) 0%, transparent 70%)`,
              filter: 'blur(20px)',
              transform: 'scale(1.2)',
              zIndex: -1
            }}
          />
        )}

        <div className="relative z-10 space-y-4 md:space-y-6">
          {/* Icône Principale Dynamique */}
          <div
            className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center relative ${
              urgencyConfig.animation === 'pulse' && !reduceMotion ? 'icon-pulse-css' :
              urgencyConfig.animation === 'breathing' && !reduceMotion ? 'icon-breathing-css' : ''
            }`}
            style={iconStyles}
          >
            <SpatialIcon 
              Icon={ICONS[urgencyConfig.icon as keyof typeof ICONS]} 
              size={urgencyConfig.priority === 'high' ? 36 : 32} 
              style={{ color: urgencyConfig.color }} 
            />
            
            {/* Particules de Forge autour de l'icône */}
            {shouldShowParticles(urgencyConfig) && !reduceMotion && 
              [...Array(getParticleCount(urgencyConfig))].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full dynamic-particle-css dynamic-particle-css--${i + 1}`}
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    background: urgencyConfig.color,
                    boxShadow: `0 0 8px color-mix(in srgb, ${urgencyConfig.color} 60%, transparent)`
                  }}
                />
              ))
            }
          </div>

          {/* Contenu Textuel Dynamique */}
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {message.title}
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md mx-auto">
              {message.subtitle}
            </p>
            
            {/* Encouragement contextuel */}
            {message.encouragement && (
              <p className="text-white/60 text-sm italic">
                {message.encouragement}
              </p>
            )}
          </div>

          {/* Métriques Contextuelles */}
          {contextualMetrics.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              {contextualMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 rounded-full metric-badge-enter"
                  style={{
                    background: `color-mix(in srgb, ${urgencyConfig.color} 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${urgencyConfig.color} 25%, transparent)`,
                    color: urgencyConfig.color,
                    backdropFilter: 'blur(8px) saturate(120%)',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="font-medium">{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bouton Principal Dynamique */}
          <div className="flex justify-center">
            <button
              onClick={handleScanMeal}
              className={`px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold relative overflow-hidden rounded-full ${
                urgencyConfig.animation === 'pulse' && !reduceMotion ? 'btn-breathing-css' : ''
              }`}
              style={buttonStyles}
            >
              <div className="flex items-center justify-center gap-3">
                <SpatialIcon 
                  Icon={ICONS[urgencyConfig.icon as keyof typeof ICONS]} 
                  size={24} 
                  className="text-white" 
                />
                <span>{message.buttonText}</span>
              </div>

              {/* Shimmer Effect pour urgence normale */}
              {urgencyConfig.priority === 'medium' && !reduceMotion && (
                <div
                  className="absolute inset-0 rounded-inherit pointer-events-none dynamic-shimmer-css"
                  style={{
                    background: `linear-gradient(90deg, 
                      transparent 0%, 
                      rgba(255,255,255,0.3) 50%, 
                      transparent 100%
                    )`
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DynamicScanCTA;