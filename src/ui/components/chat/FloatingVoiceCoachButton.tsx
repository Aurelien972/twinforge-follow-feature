/**
 * Floating Voice Coach Button
 * Bouton flottant refondé pour l'interaction vocale avec le coach
 * Remplace le bouton chat classique avec indicateurs visuels d'état vocal
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import { useVoiceCoachStore } from '../../../system/store/voiceCoachStore';
import { useGlobalChatStore } from '../../../system/store/globalChatStore';
import { Z_INDEX } from '../../../system/store/overlayStore';
import { useFeedback } from '../../../hooks/useFeedback';
import { Haptics } from '../../../utils/haptics';
import { voiceCoachOrchestrator } from '../../../system/services/voiceCoachOrchestrator';
import logger from '../../../lib/utils/logger';
import '../../../styles/components/floating-voice-coach-button.css';

interface FloatingVoiceCoachButtonProps {
  className?: string;
}

const FloatingVoiceCoachButton = React.forwardRef<HTMLButtonElement, FloatingVoiceCoachButtonProps>(
  ({ className = '' }, ref) => {
    const location = useLocation();
    const { click } = useFeedback();
    const [isDesktop, setIsDesktop] = useState(
      typeof window !== 'undefined' ? window.innerWidth >= 1025 : false
    );
    const internalButtonRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalButtonRef;

    // Voice coach store
    const {
      voiceState,
      isPanelOpen,
      togglePanel,
      startListening,
      visualization,
      preferences
    } = useVoiceCoachStore();

    // Global chat store pour les couleurs de mode
    const { currentMode, modeConfigs } = useGlobalChatStore();

    const modeConfig = modeConfigs[currentMode];
    const modeColor = modeConfig.color;

    // Déterminer l'icône selon l'état vocal
    const getIconForState = () => {
      switch (voiceState) {
        case 'listening':
          return ICONS.Mic;
        case 'processing':
          return ICONS.Loader;
        case 'speaking':
          return ICONS.Volume2;
        case 'error':
          return ICONS.AlertCircle;
        default:
          return ICONS.Mic;
      }
    };

    const CurrentIcon = getIconForState();

    // Gestion du responsive
    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1025);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Gestion du clic
    const handleClick = async () => {
      click();
      Haptics.press();

      try {
        if (voiceState === 'idle') {
          // Vérifier que l'orchestrateur est initialisé
          if (!voiceCoachOrchestrator.initialized) {
            logger.error('VOICE_COACH_BUTTON', 'Orchestrator not initialized - voice system is disabled. Check if VITE_OPENAI_API_KEY is configured.');

            // Message détaillé pour l'utilisateur
            const message =
              'Le système vocal n\'est pas disponible.\n\n' +
              'Pour l\'activer :\n' +
              '1. Ajoutez votre clé API OpenAI dans le fichier .env\n' +
              '2. Créez la variable VITE_OPENAI_API_KEY=sk-votre-cle\n' +
              '3. Redémarrez l\'application\n\n' +
              'Consultez VOICE_COACH_SETUP.md pour plus de détails.';

            alert(message);
            return;
          }

          logger.info('VOICE_COACH_BUTTON', 'Starting voice session', { currentMode });

          // Ouvrir le panel
          if (!isPanelOpen) {
            togglePanel();
          }

          // Démarrer une session vocale via l'orchestrateur
          await voiceCoachOrchestrator.startVoiceSession(currentMode);

          logger.info('VOICE_COACH_BUTTON', 'Voice session started', { mode: currentMode });

        } else if (voiceState === 'listening' || voiceState === 'speaking') {
          // Arrêter la session vocale
          await voiceCoachOrchestrator.stopVoiceSession();
          logger.info('VOICE_COACH_BUTTON', 'Voice session stopped');

        } else {
          // Toggle panel pour les autres états (processing, error)
          togglePanel();
        }
      } catch (error) {
        logger.error('VOICE_COACH_BUTTON', 'Error handling click', { error });
      }
    };

    // Déterminer si on doit animer (état actif)
    const isActive = voiceState !== 'idle';
    const isSpeaking = voiceState === 'speaking';
    const isListening = voiceState === 'listening';

    return (
      <motion.button
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          }
          if (internalButtonRef) {
            internalButtonRef.current = node;
          }
        }}
        onClick={handleClick}
        className={`floating-voice-coach-button ${className}`}
        style={{
          position: 'fixed',
          right: isPanelOpen && !isDesktop ? '-100px' : isDesktop ? '24px' : '8px',
          bottom: isDesktop
            ? '24px'
            : 'calc(var(--new-bottom-bar-height) + var(--new-bottom-bar-bottom-offset) + 8px)',
          zIndex: Z_INDEX.FLOATING_CHAT_BUTTON,
          borderRadius: '50%',
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
          isolation: 'isolate',
          width: isDesktop ? '60px' : '56px',
          height: isDesktop ? '60px' : '56px',
          background: isActive
            ? `
              radial-gradient(circle at 30% 30%, color-mix(in srgb, ${modeColor} 40%, transparent) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3) 0%, transparent 60%),
              var(--liquid-pill-bg)
            `
            : `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.20) 0%, transparent 50%),
              var(--liquid-pill-bg)
            `,
          border: isActive
            ? `2px solid color-mix(in srgb, ${modeColor} 50%, transparent)`
            : '1.5px solid rgba(255,255,255,0.22)',
          backdropFilter: 'blur(var(--liquid-pill-blur)) saturate(var(--liquid-pill-saturate))',
          WebkitBackdropFilter:
            'blur(var(--liquid-pill-blur)) saturate(var(--liquid-pill-saturate))',
          boxShadow: isActive
            ? `
              var(--liquid-pill-shadow),
              0 0 40px color-mix(in srgb, ${modeColor} 35%, transparent),
              0 0 60px color-mix(in srgb, ${modeColor} 20%, transparent)
            `
            : `
              var(--liquid-pill-shadow),
              0 0 32px color-mix(in srgb, ${modeColor} 15%, transparent)
            `,
          cursor: 'pointer',
          transition:
            'right 400ms cubic-bezier(0.25, 0.1, 0.25, 1), transform var(--liquid-transition-medium), background var(--liquid-transition-fast), box-shadow var(--liquid-transition-fast), border-color var(--liquid-transition-fast)',
          willChange: 'right, transform, filter',
          transform: 'translateZ(0)'
        }}
        initial={false}
        animate={
          isActive
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  `var(--liquid-pill-shadow), 0 0 40px color-mix(in srgb, ${modeColor} 35%, transparent)`,
                  `var(--liquid-pill-shadow), 0 0 50px color-mix(in srgb, ${modeColor} 45%, transparent)`,
                  `var(--liquid-pill-shadow), 0 0 40px color-mix(in srgb, ${modeColor} 35%, transparent)`
                ]
              }
            : {}
        }
        transition={
          isActive
            ? {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            : {}
        }
        whileHover={{
          scale: 1.08,
          boxShadow: `
          var(--liquid-pill-shadow),
          0 0 48px color-mix(in srgb, ${modeColor} 30%, transparent),
          0 4px 20px rgba(0, 0, 0, 0.3)
        `,
          transition: {
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
        whileTap={{
          scale: 0.92,
          transition: { duration: 0.15 }
        }}
        aria-label={
          voiceState === 'idle'
            ? 'Parler avec le coach'
            : voiceState === 'listening'
            ? 'En écoute'
            : voiceState === 'speaking'
            ? 'Coach en train de parler'
            : 'Traitement en cours'
        }
        aria-expanded={isPanelOpen}
      >
        {/* Corner highlight effect */}
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '50%',
            bottom: '50%',
            borderRadius: 'inherit',
            background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 60%)',
            opacity: 0.7,
            pointerEvents: 'none'
          }}
        />

        {/* Visualisation des ondes audio pour l'état listening */}
        <AnimatePresence>
          {isListening && preferences.showVisualizations && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="audio-waves-container"
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="audio-wave"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: `2px solid ${modeColor}`,
                    opacity: 0.3
                  }}
                  animate={{
                    scale: [1, 1.5, 1.8],
                    opacity: [0.5, 0.3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icône avec état */}
        <motion.div
          animate={{
            rotate: voiceState === 'processing' ? 360 : 0,
            scale: isSpeaking ? [1, 1.1, 1] : 1
          }}
          transition={{
            rotate: {
              duration: 1,
              repeat: voiceState === 'processing' ? Infinity : 0,
              ease: 'linear'
            },
            scale: {
              duration: 0.5,
              repeat: isSpeaking ? Infinity : 0,
              ease: 'easeInOut'
            }
          }}
          className="button-icon"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <SpatialIcon
            Icon={CurrentIcon}
            size={isDesktop ? 28 : 24}
            style={{
              color: isActive ? modeColor : 'rgba(255, 255, 255, 0.9)',
              filter: isActive
                ? `drop-shadow(0 0 16px ${modeColor})`
                : `drop-shadow(0 0 14px color-mix(in srgb, ${modeColor} 60%, transparent))`
            }}
          />
        </motion.div>

        {/* Indicateur de volume pour l'état speaking */}
        <AnimatePresence>
          {isSpeaking && preferences.showVisualizations && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="volume-indicator"
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '2px',
                pointerEvents: 'none'
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    width: '3px',
                    height: '8px',
                    borderRadius: '2px',
                    background: modeColor,
                    boxShadow: `0 0 6px ${modeColor}`
                  }}
                  animate={{
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge d'erreur */}
        <AnimatePresence>
          {voiceState === 'error' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="error-badge"
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#EF4444',
                border: '2px solid rgba(11, 14, 23, 0.9)',
                boxShadow: '0 0 12px rgba(239, 68, 68, 0.6)'
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

FloatingVoiceCoachButton.displayName = 'FloatingVoiceCoachButton';

export default FloatingVoiceCoachButton;
