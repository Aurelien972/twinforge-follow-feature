import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../../hooks/useFeedback';
import { usePreferredMotion } from '../../../../../../system/device/DeviceProvider';
import React from 'react';

interface ActivityCTAProps {
  todayStats?: {
    totalCalories: number;
    activitiesCount: number;
    totalDuration: number;
    lastActivityTime?: Date;
  };
  profile?: any;
}

interface UrgencyConfig {
  priority: 'low' | 'medium' | 'high';
  color: string;
  icon: keyof typeof ICONS;
  animation: 'none' | 'breathing' | 'pulse';
}

interface CTAMessage {
  title: string;
  subtitle: string;
  buttonText: string;
  encouragement?: string;
}

/**
 * Déterminer l'urgence basée sur les statistiques du jour
 */
function getUrgencyConfig(todayStats?: any): UrgencyConfig {
  const activitiesCount = todayStats?.activitiesCount || 0;
  const totalCalories = todayStats?.totalCalories || 0;
  
  // Haute urgence : aucune activité aujourd'hui
  if (activitiesCount === 0) {
    return {
      priority: 'high',
      color: '#3B82F6',
      icon: 'Zap',
      animation: 'pulse'
    };
  }
  
  // Urgence moyenne : peu d'activités
  if (activitiesCount < 2 || totalCalories < 200) {
    return {
      priority: 'medium',
      color: '#06B6D4',
      icon: 'Activity',
      animation: 'breathing'
    };
  }
  
  // Faible urgence : objectifs atteints
  return {
    priority: 'low',
    color: '#22C55E',
    icon: 'Target',
    animation: 'none'
  };
}

/**
 * Obtenir le message CTA basé sur l'urgence
 */
function getCTAMessage(urgencyConfig: UrgencyConfig, todayStats?: any): CTAMessage {
  const activitiesCount = todayStats?.activitiesCount || 0;
  
  if (urgencyConfig.priority === 'high') {
    return {
      title: 'Forgez votre énergie !',
      subtitle: 'Commencez votre journée active en enregistrant votre première activité',
      buttonText: 'Enregistrer une activité',
      encouragement: 'Chaque mouvement compte pour votre bien-être'
    };
  }
  
  if (urgencyConfig.priority === 'medium') {
    return {
      title: 'Continuez sur votre lancée',
      subtitle: `${activitiesCount} activité${activitiesCount > 1 ? 's' : ''} enregistrée${activitiesCount > 1 ? 's' : ''} - Ajoutez-en une autre !`,
      buttonText: 'Ajouter une activité',
      encouragement: 'Maintenez votre rythme énergétique'
    };
  }
  
  return {
    title: 'Excellente journée active !',
    subtitle: 'Vous avez déjà bien forgé votre énergie aujourd\'hui',
    buttonText: 'Ajouter une activité',
    encouragement: 'Continuez à cultiver votre vitalité'
  };
}

/**
 * Obtenir les métriques contextuelles
 */
function getContextualMetrics(todayStats?: any, urgencyConfig?: UrgencyConfig): string[] {
  const metrics: string[] = [];
  
  if (todayStats?.totalCalories > 0) {
    metrics.push(`${todayStats.totalCalories} kcal brûlées`);
  }
  
  if (todayStats?.totalDuration > 0) {
    metrics.push(`${todayStats.totalDuration} min actives`);
  }
  
  if (todayStats?.activitiesCount > 0) {
    metrics.push(`${todayStats.activitiesCount} activité${todayStats.activitiesCount > 1 ? 's' : ''}`);
  }
  
  return metrics;
}

/**
 * Vérifier si les particules doivent être affichées
 */
function shouldShowParticles(urgencyConfig: UrgencyConfig): boolean {
  return urgencyConfig.priority === 'high' || urgencyConfig.priority === 'medium';
}

/**
 * Obtenir le nombre de particules
 */
function getParticleCount(urgencyConfig: UrgencyConfig): number {
  if (urgencyConfig.priority === 'high') return 6;
  if (urgencyConfig.priority === 'medium') return 4;
  return 0;
}

/**
 * Dynamic Activity CTA - Call to Action dynamique pour les activités
 * Incite l'utilisateur à enregistrer des activités selon son état actuel
 */
const DynamicActivityCTA: React.FC<ActivityCTAProps> = ({ todayStats, profile }) => {
  const navigate = useNavigate();
  const { click } = useFeedback();
  const reduceMotion = usePreferredMotion() === 'reduced';
  
  const urgencyConfig = getUrgencyConfig(todayStats);
  const message = getCTAMessage(urgencyConfig, todayStats);
  const contextualMetrics = getContextualMetrics(todayStats, urgencyConfig);

  const handleActivityInput = () => {
    click();
    navigate('/activity/input');
  };

  const cardStyles = {
    background: `
      radial-gradient(circle at 30% 20%, color-mix(in srgb, ${urgencyConfig.color} 12%, transparent) 0%, transparent 60%),
      radial-gradient(circle at 70% 80%, color-mix(in srgb, ${urgencyConfig.color} 8%, transparent) 0%, transparent 50%),
      var(--glass-opacity)
    `,
    borderColor: `color-mix(in srgb, ${urgencyConfig.color} 25%, transparent)`,
    '--glow-color': `color-mix(in srgb, ${urgencyConfig.color} 30%, transparent)`
  } as React.CSSProperties;

  const iconStyles = {
    background: `
      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
      linear-gradient(135deg, color-mix(in srgb, ${urgencyConfig.color} 40%, transparent), color-mix(in srgb, ${urgencyConfig.color} 28%, transparent))
    `,
    border: `2px solid color-mix(in srgb, ${urgencyConfig.color} 55%, transparent)`,
    boxShadow: `0 0 30px color-mix(in srgb, ${urgencyConfig.color} 40%, transparent)`,
    '--icon-color': urgencyConfig.color
  } as React.CSSProperties;

  const buttonColorMap = {
    '#3B82F6': { light: '#60A5FA', base: '#3B82F6', dark: '#2563EB' },
    '#06B6D4': { light: '#22D3EE', base: '#06B6D4', dark: '#0891B2' },
    '#22C55E': { light: '#4ADE80', base: '#22C55E', dark: '#16A34A' }
  };

  const buttonColors = buttonColorMap[urgencyConfig.color as keyof typeof buttonColorMap] || buttonColorMap['#3B82F6'];

  const buttonStyles = {
    '--btn-color-light': buttonColors.light,
    '--btn-color-base': buttonColors.base,
    '--btn-color-dark': buttonColors.dark,
    '--btn-shadow': `color-mix(in srgb, ${urgencyConfig.color} 60%, transparent)`,
    '--btn-glow': `color-mix(in srgb, ${urgencyConfig.color} 80%, transparent)`
  } as React.CSSProperties;

  return (
    <div className="dynamic-activity-cta activity-capture-enter">
      <GlassCard
        className="p-6 md:p-8 text-center relative overflow-hidden cursor-pointer activity-card-base"
        onClick={handleActivityInput}
        interactive
        style={cardStyles}
      >
        {/* Carrés tournants aux coins */}
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
                rotate: i % 2 === 0 ? [45, 405] : [-45, -405]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5
              }}
            />
          ))}
        </div>

        {urgencyConfig.priority === 'high' && !reduceMotion && (
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
          <div
            className={`activity-icon-enhanced mx-auto rounded-full flex items-center justify-center relative ${
              urgencyConfig.animation === 'pulse' && !reduceMotion ? 'icon-pulse-css' :
              urgencyConfig.animation === 'breathing' && !reduceMotion ? 'icon-breathing-css' : ''
            }`}
            style={iconStyles}
          >
            <SpatialIcon
              Icon={ICONS[urgencyConfig.icon]}
              size={urgencyConfig.priority === 'high' ? 64 : 56}
              style={{ color: urgencyConfig.color }}
            />

            {shouldShowParticles(urgencyConfig) && !reduceMotion &&
              [...Array(getParticleCount(urgencyConfig))].map((_, i) => {
                const angle = (i * 360) / getParticleCount(urgencyConfig);
                const radius = 60;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full dynamic-particle-css dynamic-particle-css--${i + 1}`}
                    style={{
                      background: urgencyConfig.color,
                      boxShadow: `0 0 12px color-mix(in srgb, ${urgencyConfig.color} 70%, transparent)`,
                      '--particle-x': `${x * 0.4}px`,
                      '--particle-y': `${y * 0.4}px`,
                      '--particle-x-end': `${x}px`,
                      '--particle-y-end': `${y}px`
                    } as React.CSSProperties}
                  />
                );
              })
            }
          </div>

          <div className="space-y-2 md:space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {message.title}
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md mx-auto">
              {message.subtitle}
            </p>

            {message.encouragement && (
              <p className="text-white/60 text-sm italic">
                {message.encouragement}
              </p>
            )}
          </div>

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

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleActivityInput}
              className="training-cta-button px-8 py-4 rounded-2xl font-bold text-lg text-white relative overflow-hidden min-h-[64px]"
              style={{
                background: `
                  linear-gradient(165deg,
                    var(--btn-color-light, #60A5FA) 0%,
                    var(--btn-color-base, #3B82F6) 50%,
                    var(--btn-color-dark, #2563EB) 100%
                  )
                `,
                boxShadow: `
                  0 1px 0 0 rgba(255, 255, 255, 0.4) inset,
                  0 -1px 0 0 rgba(0, 0, 0, 0.2) inset,
                  0 20px 50px -12px var(--btn-shadow, rgba(59, 130, 246, 0.6)),
                  0 10px 30px -8px rgba(0, 0, 0, 0.5),
                  0 2px 12px 0 var(--btn-glow, rgba(59, 130, 246, 0.8))
                `,
                border: 'none',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                ...buttonStyles
              }}
            >
              {/* Top Glass Layer */}
              <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                  height: '50%',
                  background: `
                    linear-gradient(180deg,
                      rgba(255, 255, 255, 0.25) 0%,
                      rgba(255, 255, 255, 0.08) 50%,
                      transparent 100%
                    )
                  `,
                  borderRadius: 'inherit'
                }}
              />

              {/* Shine Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(135deg,
                      transparent 0%,
                      transparent 40%,
                      rgba(255, 255, 255, 0.4) 50%,
                      transparent 60%,
                      transparent 100%
                    )
                  `,
                  animation: 'training-button-shine 4s ease-in-out infinite',
                  borderRadius: 'inherit'
                }}
              />

              <div className="relative z-10 flex items-center justify-center gap-3">
                <SpatialIcon
                  Icon={ICONS[urgencyConfig.icon]}
                  size={24}
                  className="text-white"
                />
                <span>{message.buttonText}</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/activity/progress')}
              className="training-cta-button px-8 py-4 rounded-2xl font-bold text-lg text-white relative overflow-hidden min-h-[64px]"
              style={{
                background: `
                  linear-gradient(165deg,
                    var(--btn-color-light, #60A5FA) 0%,
                    var(--btn-color-base, #3B82F6) 50%,
                    var(--btn-color-dark, #2563EB) 100%
                  )
                `,
                boxShadow: `
                  0 1px 0 0 rgba(255, 255, 255, 0.4) inset,
                  0 -1px 0 0 rgba(0, 0, 0, 0.2) inset,
                  0 20px 50px -12px var(--btn-shadow, rgba(59, 130, 246, 0.6)),
                  0 10px 30px -8px rgba(0, 0, 0, 0.5),
                  0 2px 12px 0 var(--btn-glow, rgba(59, 130, 246, 0.8))
                `,
                border: 'none',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                ...buttonStyles
              }}
            >
              {/* Top Glass Layer */}
              <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                  height: '50%',
                  background: `
                    linear-gradient(180deg,
                      rgba(255, 255, 255, 0.25) 0%,
                      rgba(255, 255, 255, 0.08) 50%,
                      transparent 100%
                    )
                  `,
                  borderRadius: 'inherit'
                }}
              />

              {/* Shine Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(135deg,
                      transparent 0%,
                      transparent 40%,
                      rgba(255, 255, 255, 0.4) 50%,
                      transparent 60%,
                      transparent 100%
                    )
                  `,
                  animation: 'training-button-shine 4s ease-in-out infinite',
                  borderRadius: 'inherit'
                }}
              />

              <div className="relative z-10 flex items-center justify-center gap-3">
                <SpatialIcon
                  Icon={ICONS.TrendingUp}
                  size={24}
                  className="text-white"
                />
                <span>Voir mes Insights</span>
              </div>
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DynamicActivityCTA;