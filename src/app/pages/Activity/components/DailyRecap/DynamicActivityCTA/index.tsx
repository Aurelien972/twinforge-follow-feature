import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../../hooks/useFeedback';
import { usePreferredMotion } from '../../../../../../system/device/DeviceProvider';
import { useLastActivity } from '../../../hooks/useActivitiesData';
import { analyzeActivityContext } from './contextAnalysis';
import { generateCTAMessage } from './messageGenerator';
import { calculateUrgencyConfig, shouldShowParticles, getParticleCount } from './urgencyCalculator';
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

/**
 * Obtenir les métriques contextuelles pour affichage
 */
function getContextualMetrics(todayStats?: any): string[] {
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
 * Dynamic Activity CTA - Call to Action dynamique pour les activités
 * Incite l'utilisateur à enregistrer des activités selon son état actuel ET son historique global
 */
const DynamicActivityCTA: React.FC<ActivityCTAProps> = ({ todayStats, profile }) => {
  const navigate = useNavigate();
  const { click } = useFeedback();
  const reduceMotion = usePreferredMotion() === 'reduced';

  // Récupérer la dernière activité globale (pas uniquement aujourd'hui)
  const { data: lastActivity } = useLastActivity();

  // Analyser le contexte d'activité complet
  const activityContext = React.useMemo(() => {
    return analyzeActivityContext(todayStats || null, lastActivity);
  }, [todayStats, lastActivity]);

  // Générer le message CTA basé sur le contexte
  const message = React.useMemo(() => {
    return generateCTAMessage(activityContext);
  }, [activityContext]);

  // Calculer la configuration d'urgence
  const urgencyConfig = React.useMemo(() => {
    return calculateUrgencyConfig(activityContext);
  }, [activityContext]);

  const contextualMetrics = getContextualMetrics(todayStats);
  const hasActivities = (todayStats?.activitiesCount || 0) > 0;

  const handleActivityInput = () => {
    click();
    navigate('/activity/input');
  };

  const handleViewInsights = () => {
    click();
    navigate('/activity#insights');
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

        {(urgencyConfig.priority === 'high' || urgencyConfig.priority === 'critical') && !reduceMotion && (
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
              Icon={ICONS[urgencyConfig.icon as keyof typeof ICONS]}
              size={(urgencyConfig.priority === 'high' || urgencyConfig.priority === 'critical') ? 64 : 56}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col gap-4 items-center"
          >
            {/* Primary CTA - Enregistrer une activité */}
            <motion.button
              onClick={handleActivityInput}
              className="px-8 py-4 rounded-full font-bold text-lg text-white relative overflow-hidden min-h-[64px] w-full sm:w-auto"
              style={{
                background: `
                  linear-gradient(135deg,
                    color-mix(in srgb, ${urgencyConfig.color} 85%, transparent),
                    color-mix(in srgb, ${urgencyConfig.color} 70%, transparent)
                  )
                `,
                border: `2px solid ${urgencyConfig.color}`,
                boxShadow: `
                  0 12px 40px color-mix(in srgb, ${urgencyConfig.color} 40%, transparent),
                  0 0 60px color-mix(in srgb, ${urgencyConfig.color} 30%, transparent),
                  inset 0 3px 0 rgba(255, 255, 255, 0.4)
                `,
                backdropFilter: 'blur(20px) saturate(160%)'
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: `
                  0 16px 50px color-mix(in srgb, ${urgencyConfig.color} 50%, transparent),
                  0 0 80px color-mix(in srgb, ${urgencyConfig.color} 40%, transparent),
                  inset 0 3px 0 rgba(255, 255, 255, 0.5)
                `
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'celebration-cta-shimmer-movement 2s ease-in-out infinite',
                  borderRadius: 'inherit'
                }}
              />

              <div className="relative z-10 flex items-center justify-center gap-3">
                <SpatialIcon
                  Icon={ICONS[urgencyConfig.icon as keyof typeof ICONS]}
                  size={24}
                  style={{
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                  }}
                  variant="pure"
                />
                <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {message.buttonText}
                </span>
              </div>
            </motion.button>

            {/* Secondary CTA - View Insights (transparent button) */}
            {hasActivities && (
              <motion.button
                onClick={handleViewInsights}
                className="px-6 py-4 rounded-full font-medium text-white/90 transition-all duration-200 min-h-[64px]"
                style={{
                  background: `color-mix(in srgb, ${urgencyConfig.color} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${urgencyConfig.color} 20%, transparent)`,
                  backdropFilter: 'blur(12px) saturate(130%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `color-mix(in srgb, ${urgencyConfig.color} 12%, transparent)`;
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${urgencyConfig.color} 30%, transparent)`;
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `color-mix(in srgb, ${urgencyConfig.color} 8%, transparent)`;
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${urgencyConfig.color} 20%, transparent)`;
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <SpatialIcon Icon={ICONS.Zap} size={20} color="white" variant="pure" />
                  <span>Voir mes Insights</span>
                </div>
              </motion.button>
            )}
          </motion.div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DynamicActivityCTA;
