import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../hooks/useFeedback';
import { usePreferredMotion } from '../../../../../system/device/DeviceProvider';
import { useUserStore } from '@/system/store/userStore';
import { useFastingPipeline, useFastingElapsedSeconds, useFastingProgressPercentage } from '../../hooks/useFastingPipeline';
import { getCurrentFastingPhase, getMotivationalMessage } from '../../../../../lib/nutrition/fastingPhases';
import { formatElapsedTime } from '../../utils/fastingUtils';
import { getProtocolById } from '../../../../../lib/nutrition/fastingProtocols';

interface FastingCTAProps {
  className?: string;
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
 * Déterminer l'urgence basée sur l'état du jeûne
 */
function getUrgencyConfig(
  isActive: boolean,
  hasPreferredProtocol: boolean,
  elapsedHours: number
): UrgencyConfig {
  // TOUJOURS ORANGE pour l'onglet Aujourd'hui
  return {
    priority: isActive ? 'medium' : hasPreferredProtocol ? 'medium' : 'high',
    color: '#F59E0B',
    icon: 'Timer',
    animation: isActive ? 'breathing' : hasPreferredProtocol ? 'breathing' : 'pulse'
  };
}

/**
 * Obtenir le message CTA basé sur l'état du jeûne
 */
function getCTAMessage(
  isActive: boolean,
  hasPreferredProtocol: boolean,
  preferredProtocol: string | null,
  elapsedHours: number,
  currentPhase?: any
): CTAMessage {
  if (isActive) {
    const phaseMessage = currentPhase ? ` - Phase ${currentPhase.name}` : '';
    return {
      title: 'Session Active',
      subtitle: `Votre jeûne progresse${phaseMessage}`,
      buttonText: 'Gérer ma session',
      encouragement: 'Continuez votre excellent travail !'
    };
  }
  
  if (hasPreferredProtocol && preferredProtocol) {
    const protocol = getProtocolById(preferredProtocol);
    const protocolName = protocol?.name || preferredProtocol;
    
    return {
      title: 'Prêt à jeûner',
      subtitle: `Démarrez votre protocole ${protocolName}`,
      buttonText: 'Commencer le jeûne',
      encouragement: 'Votre protocole est configuré et prêt'
    };
  }
  
  return {
    title: 'Forgez votre métabolisme !',
    subtitle: 'Commencez votre première session de jeûne intermittent',
    buttonText: 'Démarrer une session',
    encouragement: 'Maîtrisez votre sèche avec le jeûne'
  };
}

/**
 * Obtenir les métriques contextuelles
 */
function getContextualMetrics(
  isActive: boolean,
  elapsedHours: number,
  targetHours: number,
  currentPhase?: any
): string[] {
  const metrics: string[] = [];
  
  if (isActive) {
    if (elapsedHours > 0) {
      const hours = Math.floor(elapsedHours);
      const minutes = Math.floor((elapsedHours - hours) * 60);
      metrics.push(`${hours}h ${minutes}m écoulées`);
    }
    
    if (targetHours > 0) {
      metrics.push(`Objectif ${targetHours}h`);
    }
    
    if (currentPhase) {
      metrics.push(`Phase ${currentPhase.name}`);
    }
  }
  
  return metrics;
}

/**
 * Dynamic Fasting CTA - Call to Action dynamique pour le jeûne
 * Incite l'utilisateur à démarrer ou gérer ses sessions de jeûne selon son état actuel
 */
const DynamicFastingCTA: React.FC<FastingCTAProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { click } = useFeedback();
  const reduceMotion = usePreferredMotion() === 'reduced';
  const { profile } = useUserStore();
  const { isActive, session } = useFastingPipeline();
  
  // Use dynamic selectors for real-time updates
  const elapsedSeconds = useFastingElapsedSeconds();
  const progressPercentage = useFastingProgressPercentage();
  
  // Déterminer l'état du jeûne
  const elapsedHours = elapsedSeconds / 3600;
  const targetHours = session?.targetHours || 16;
  const preferredProtocol = profile?.nutrition?.fastingWindow?.protocol;
  const hasPreferredProtocol = !!(preferredProtocol && preferredProtocol !== '');
  
  // Obtenir la phase métabolique actuelle si session active
  const currentPhase = isActive ? getCurrentFastingPhase(elapsedHours) : null;
  
  const urgencyConfig = getUrgencyConfig(isActive, hasPreferredProtocol, elapsedHours);
  const message = getCTAMessage(isActive, hasPreferredProtocol, preferredProtocol, elapsedHours, currentPhase);
  const contextualMetrics = getContextualMetrics(isActive, elapsedHours, targetHours, currentPhase);

  const handleFastingAction = () => {
    click();
    navigate('/fasting/input');
  };

  const cardStyles = {
    background: `
      radial-gradient(circle at 30% 20%, color-mix(in srgb, ${urgencyConfig.color} 12%, transparent) 0%, transparent 60%),
      radial-gradient(circle at 70% 80%, color-mix(in srgb, ${urgencyConfig.color} 8%, transparent) 0%, transparent 50%),
      var(--glass-opacity)
    `,
    borderColor: `color-mix(in srgb, ${urgencyConfig.color} 25%, transparent)`,
    boxShadow: `
      0 12px 40px rgba(0, 0, 0, 0.25),
      0 0 30px color-mix(in srgb, ${urgencyConfig.color} 15%, transparent),
      inset 0 2px 0 rgba(255, 255, 255, 0.15)
    `,
    backdropFilter: 'blur(20px) saturate(160%)'
  };

  const iconStyles = {
    background: `
      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
      radial-gradient(circle at 70% 70%, color-mix(in srgb, ${urgencyConfig.color} 15%, transparent) 0%, transparent 50%),
      linear-gradient(135deg, color-mix(in srgb, ${urgencyConfig.color} 35%, transparent), color-mix(in srgb, ${urgencyConfig.color} 25%, transparent))
    `,
    border: `2px solid color-mix(in srgb, ${urgencyConfig.color} 50%, transparent)`,
    boxShadow: `
      0 0 30px color-mix(in srgb, ${urgencyConfig.color} 40%, transparent),
      0 0 60px color-mix(in srgb, ${urgencyConfig.color} 25%, transparent),
      inset 0 2px 0 rgba(255,255,255,0.3)
    `
  };

  const buttonStyles = {
    background: `linear-gradient(135deg, 
      color-mix(in srgb, ${urgencyConfig.color} 80%, transparent), 
      color-mix(in srgb, ${urgencyConfig.color} 60%, transparent)
    )`,
    border: `2px solid color-mix(in srgb, ${urgencyConfig.color} 60%, transparent)`,
    boxShadow: `
      0 12px 40px color-mix(in srgb, ${urgencyConfig.color} 40%, transparent),
      0 0 60px color-mix(in srgb, ${urgencyConfig.color} 30%, transparent),
      inset 0 3px 0 rgba(255,255,255,0.4)
    `,
    backdropFilter: 'blur(20px) saturate(160%)',
    color: '#fff',
    transition: 'all 0.2s ease'
  };

  return (
    <div className={`dynamic-fasting-cta w-full ${className}`}>
      <GlassCard
        className="p-6 md:p-8 text-center relative overflow-visible cursor-pointer w-full"
        onClick={handleFastingAction}
        interactive
        style={cardStyles}
      >
        {/* 4 Carrés Décoratifs aux coins - Style unifié avec autres forges */}
        {!reduceMotion && (
          <>
            <div
              className="absolute w-3 h-3 rounded-sm"
              style={{
                top: '-6px',
                left: '-6px',
                background: urgencyConfig.color,
                boxShadow: `0 0 12px ${urgencyConfig.color}`,
                opacity: 0.6,
                animation: 'cornerSquarePulse 3s ease-in-out infinite',
                animationDelay: '0s'
              }}
            />
            <div
              className="absolute w-3 h-3 rounded-sm"
              style={{
                top: '-6px',
                right: '-6px',
                background: urgencyConfig.color,
                boxShadow: `0 0 12px ${urgencyConfig.color}`,
                opacity: 0.6,
                animation: 'cornerSquarePulse 3s ease-in-out infinite',
                animationDelay: '0.75s'
              }}
            />
            <div
              className="absolute w-3 h-3 rounded-sm"
              style={{
                bottom: '-6px',
                left: '-6px',
                background: urgencyConfig.color,
                boxShadow: `0 0 12px ${urgencyConfig.color}`,
                opacity: 0.6,
                animation: 'cornerSquarePulse 3s ease-in-out infinite',
                animationDelay: '1.5s'
              }}
            />
            <div
              className="absolute w-3 h-3 rounded-sm"
              style={{
                bottom: '-6px',
                right: '-6px',
                background: urgencyConfig.color,
                boxShadow: `0 0 12px ${urgencyConfig.color}`,
                opacity: 0.6,
                animation: 'cornerSquarePulse 3s ease-in-out infinite',
                animationDelay: '2.25s'
              }}
            />
          </>
        )}

        {/* Halo de Forge Temporelle - Animation Pulse Permanente */}
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
          <div
            className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center relative ${
              urgencyConfig.animation === 'pulse' && !reduceMotion ? 'icon-pulse-css' :
              urgencyConfig.animation === 'breathing' && !reduceMotion ? 'icon-breathing-css' : ''
            }`}
            style={iconStyles}
          >
            <SpatialIcon
              Icon={ICONS[urgencyConfig.icon]}
              size={urgencyConfig.priority === 'high' ? 36 : 32}
              style={{ color: urgencyConfig.color }}
            />

            {/* Particules de Forge Spatiale autour de l'icône pour les états actifs */}
            {(urgencyConfig.priority === 'high' || isActive) && !reduceMotion &&
              [...Array(isActive ? 4 : 6)].map((_, i) => (
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

          <div className="space-y-2 md:space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {message.title}
            </h2>
            
            {isActive && session && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-black mb-2" style={{ color: urgencyConfig.color }}>
                    {formatElapsedTime(elapsedSeconds)}
                  </div>
                  <div className="text-lg md:text-xl text-white/90 font-semibold">
                    Objectif : {session.targetHours}h • {Math.round(progressPercentage)}% accompli
                  </div>
                </div>
                
                {/* Progress Bar for Active Session */}
                <div className="max-w-md mx-auto">
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-3 rounded-full relative overflow-hidden"
                      style={{
                        background: `linear-gradient(90deg, ${urgencyConfig.color}, color-mix(in srgb, ${urgencyConfig.color} 80%, white))`,
                        boxShadow: `0 0 12px color-mix(in srgb, ${urgencyConfig.color} 60%, transparent)`,
                        width: `${progressPercentage}%`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
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
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md mx-auto">
              {isActive && currentPhase ? 
                `Phase ${currentPhase.name} • ${currentPhase.metabolicState}` : 
                message.subtitle
              }
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

          {/* Bouton Principal */}
          <div className="flex justify-center">
            <button
              onClick={handleFastingAction}
              className={`px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold relative overflow-hidden rounded-full ${
                urgencyConfig.animation === 'pulse' && !reduceMotion ? 'btn-breathing-css' : ''
              }`}
              style={buttonStyles}
            >
              <div className="flex items-center justify-center gap-3">
                <SpatialIcon
                  Icon={ICONS[urgencyConfig.icon]}
                  size={24}
                  className="text-white"
                />
                <span>{message.buttonText}</span>
              </div>

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

          {/* Message motivationnel pour session active */}
          {isActive && currentPhase && (
            <div 
              className="px-3 py-1.5 rounded-full"
              style={{
                backdropFilter: 'blur(8px) saturate(120%)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS[currentPhase.icon]} size={14} style={{ color: currentPhase.color }} />
                <span className="text-sm font-semibold" style={{ color: currentPhase.color }}>
                  {currentPhase.name}
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {getMotivationalMessage(currentPhase, elapsedHours)}
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default DynamicFastingCTA;