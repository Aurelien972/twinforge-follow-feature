// src/app/shell/Header/HeaderRealtimeButton.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useUnifiedCoachStore } from '../../../system/store/unifiedCoachStore';
import { useFeedback } from '../../../hooks';
import { Haptics } from '../../../utils/haptics';
import { voiceCoachOrchestrator } from '../../../system/services/voiceCoachOrchestrator';
import logger from '../../../lib/utils/logger';

export const HeaderRealtimeButton: React.FC = () => {
  const { click } = useFeedback();
  const [isInitializing, setIsInitializing] = useState(false);

  const {
    voiceState,
    currentMode,
    isPanelOpen,
    openPanel,
    setShowReadyPrompt,
    setVoiceState
  } = useUnifiedCoachStore();

  const isActive = voiceState !== 'idle' && voiceState !== 'ready';
  const isConnecting = voiceState === 'connecting';
  const isListening = voiceState === 'listening';
  const isSpeaking = voiceState === 'speaking';

  const handleClick = async () => {
    click();
    Haptics.press();

    try {
      if (voiceState === 'idle') {
        // Ouvrir le panel et afficher le prompt "ready"
        logger.info('HEADER_REALTIME_BUTTON', 'Opening panel with ready prompt');

        if (!isPanelOpen) {
          openPanel();
        }

        // Afficher le prompt pour inviter à démarrer
        setShowReadyPrompt(true);
        setVoiceState('ready');

        logger.info('HEADER_REALTIME_BUTTON', 'Ready prompt shown');

      } else if (isListening || isSpeaking || isConnecting) {
        // Arrêter la session vocale en cours
        await voiceCoachOrchestrator.stopVoiceSession();
        logger.info('HEADER_REALTIME_BUTTON', 'Voice session stopped');

      } else {
        // Toggle panel pour les autres états (ready, processing, error)
        if (isPanelOpen) {
          openPanel();
        } else {
          openPanel();
        }
      }
    } catch (error) {
      logger.error('HEADER_REALTIME_BUTTON', 'Error handling click', { error });
    }
  };

  return (
    <motion.button
      type="button"
      className="header-realtime-button relative"
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        position: 'relative',
        overflow: 'visible',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isActive
          ? 'radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 60%), rgba(239, 68, 68, 0.2)'
          : 'radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.25) 0%, transparent 60%), rgba(239, 68, 68, 0.15)',
        border: isActive
          ? '2px solid rgba(239, 68, 68, 0.6)'
          : '2px solid rgba(239, 68, 68, 0.4)',
        backdropFilter: 'blur(16px) saturate(150%)',
        WebkitBackdropFilter: 'blur(16px) saturate(150%)',
        boxShadow: 'none',
        transition: 'transform 280ms cubic-bezier(0.25, 0.1, 0.25, 1), background 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        transform: 'translateZ(0)',
        willChange: 'transform',
        cursor: 'pointer'
      }}
      aria-label={
        voiceState === 'idle'
          ? 'Démarrer la session vocale'
          : voiceState === 'ready'
          ? 'Prêt à démarrer'
          : voiceState === 'connecting'
          ? 'Connexion en cours'
          : voiceState === 'listening'
          ? 'En écoute'
          : voiceState === 'speaking'
          ? 'Coach en train de parler'
          : 'Traitement en cours'
      }
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Cercle intérieur rouge - toujours visible */}
      <motion.div
        style={{
          position: 'absolute',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #EF4444 0%, #DC2626 100%)',
          border: '2px solid rgba(239, 68, 68, 0.8)',
          zIndex: 2
        }}
        animate={isActive ? {
          scale: [1, 1.15, 1],
          opacity: [0.9, 1, 0.9]
        } : {}}
        transition={isActive ? {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* Icône micro */}
      <motion.div
        animate={{
          rotate: (voiceState === 'processing' || isConnecting) ? 360 : 0,
          scale: isSpeaking ? [1, 1.1, 1] : 1
        }}
        transition={{
          rotate: {
            duration: 1,
            repeat: (voiceState === 'processing' || isConnecting) ? Infinity : 0,
            ease: 'linear'
          },
          scale: {
            duration: 0.5,
            repeat: isSpeaking ? Infinity : 0,
            ease: 'easeInOut'
          }
        }}
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          opacity: 0.7
        }}
      >
        <SpatialIcon
          Icon={isActive ? (isSpeaking ? ICONS.Volume2 : ICONS.Mic) : ICONS.Mic}
          size={20}
          style={{
            color: isActive ? '#EF4444' : 'rgba(239, 68, 68, 0.7)',
            filter: 'none'
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Badge d'erreur */}
      <AnimatePresence>
        {voiceState === 'error' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#EF4444',
              border: '2px solid rgba(11, 14, 23, 0.9)',
              zIndex: 3
            }}
          />
        )}
      </AnimatePresence>

      {/* Ondes audio pour l'état listening */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid #EF4444',
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
    </motion.button>
  );
};
