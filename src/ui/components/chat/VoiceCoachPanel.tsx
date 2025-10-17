/**
 * Voice Coach Panel
 * Interface vocale minimale et non-intrusive pour parler avec le coach
 * Affichage de la transcription en temps réel et visualisations audio
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import { useVoiceCoachStore } from '../../../system/store/voiceCoachStore';
import { useGlobalChatStore } from '../../../system/store/globalChatStore';
import { Z_INDEX } from '../../../system/store/overlayStore';
import { useFeedback } from '../../../hooks/useFeedback';
import { Haptics } from '../../../utils/haptics';
import { openaiRealtimeService } from '../../../system/services/openaiRealtimeService';
import AudioWaveform from './AudioWaveform';
import TextChatInput from './TextChatInput';
import VoiceReadyPrompt from './VoiceReadyPrompt';
import { voiceCoachOrchestrator } from '../../../system/services/voiceCoachOrchestrator';
import '../../../styles/components/voice-coach-panel.css';

const VoiceCoachPanel: React.FC = () => {
  const { navClose } = useFeedback();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isPanelOpen,
    isPanelMinimized,
    voiceState,
    messages,
    currentTranscription,
    showTranscript,
    showReadyPrompt,
    visualization,
    preferences,
    communicationMode,
    closePanel,
    minimizePanel,
    maximizePanel,
    toggleTranscript,
    toggleCommunicationMode,
    stopListening,
    addMessage,
    setShowReadyPrompt,
    setVoiceState,
    setError
  } = useVoiceCoachStore();

  const { currentMode, modeConfigs } = useGlobalChatStore();

  const modeConfig = modeConfigs[currentMode];
  const modeColor = modeConfig.color;

  // Auto-scroll vers le bas quand nouveaux messages
  useEffect(() => {
    if (showTranscript) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentTranscription, showTranscript]);

  // Fermer avec ESC
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navClose();
        Haptics.tap();
        closePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, navClose, closePanel]);

  const handleClose = () => {
    navClose();
    Haptics.tap();
    closePanel();
    if (voiceState === 'listening') {
      stopListening();
    }
  };

  const handleStartVoiceSession = async () => {
    try {
      setVoiceState('connecting');
      setShowReadyPrompt(false);

      // Initialiser l'orchestrateur si nécessaire
      if (!voiceCoachOrchestrator.initialized) {
        await voiceCoachOrchestrator.initialize();
      }

      // Démarrer la session vocale
      await voiceCoachOrchestrator.startVoiceSession(currentMode);

      logger.info('VOICE_COACH_PANEL', 'Voice session started successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start voice session';
      logger.error('VOICE_COACH_PANEL', 'Failed to start voice session', { error: errorMessage });

      setVoiceState('error');
      setError(errorMessage);
      setShowReadyPrompt(true);

      // Afficher une notification toast pour les erreurs StackBlitz
      if (errorMessage.includes('StackBlitz') || errorMessage.includes('WebContainer')) {
        console.error('❌ LIMITATION STACKBLITZ DÉTECTÉE :\n\n' + errorMessage);
      }
    }
  };

  const handleCancelReadyPrompt = () => {
    setShowReadyPrompt(false);
    setVoiceState('idle');
    closePanel();
  };

  const handleSendTextMessage = (text: string) => {
    // Ajouter le message de l'utilisateur
    addMessage({
      role: 'user',
      content: text
    });

    // Envoyer via l'API Realtime
    openaiRealtimeService.sendTextMessage(text);
  };

  const isTextMode = communicationMode === 'text';

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* Overlay - Mobile only */}
          <motion.div
            key="voice-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="lg:hidden"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: Z_INDEX.CHAT_DRAWER - 1
            }}
          />

          {/* Panel */}
          <motion.div
            key="voice-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            className={`voice-coach-panel ${isPanelMinimized ? 'voice-coach-panel--minimized' : ''}`}
            style={{
              position: 'fixed',
              top: 'calc(64px + 12px)',
              right: '8px',
              bottom: 'calc(var(--new-bottom-bar-height) + var(--new-bottom-bar-bottom-offset) + 12px)',
              width: isPanelMinimized ? '80px' : 'min(420px, calc(100vw - 16px))',
              zIndex: Z_INDEX.CHAT_DRAWER,
              borderRadius: '20px',
              background: `
                var(--liquid-reflections-multi),
                var(--liquid-highlight-ambient),
                var(--liquid-glass-bg-elevated)
              `,
              backdropFilter: 'blur(var(--liquid-panel-blur)) saturate(var(--liquid-panel-saturate))',
              WebkitBackdropFilter:
                'blur(var(--liquid-panel-blur)) saturate(var(--liquid-panel-saturate))',
              boxShadow: 'var(--liquid-panel-shadow)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              isolation: 'isolate',
              transform: 'translateZ(0)',
              willChange: 'transform, filter, width',
              transition: 'width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          >
            {/* Border gradient */}
            <div
              style={{
                position: 'absolute',
                inset: '-2px',
                borderRadius: 'inherit',
                padding: '2px',
                background: 'var(--liquid-border-gradient-tricolor)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
                opacity: 1,
                zIndex: 1,
                animation: 'borderPulse 4s ease-in-out infinite'
              }}
            />

            {/* Ambient glow */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: 'calc(20px + 4px)',
                background: `radial-gradient(
                  ellipse at 80% 50%,
                  color-mix(in srgb, ${modeColor} 15%, transparent) 0%,
                  rgba(61, 19, 179, 0.1) 40%,
                  transparent 70%
                )`,
                opacity: 0.8,
                zIndex: -1,
                pointerEvents: 'none',
                animation: 'glowPulse 3s ease-in-out infinite alternate'
              }}
            />

            {/* Header */}
            <div
              className="voice-panel-header"
              style={{
                padding: isPanelMinimized ? '12px' : '16px 20px',
                borderBottom: `1px solid color-mix(in srgb, ${modeColor} 20%, transparent)`,
                background: `
                  linear-gradient(180deg,
                    rgba(11, 14, 23, 0.6) 0%,
                    rgba(11, 14, 23, 0.3) 100%
                  )
                `,
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexShrink: 0
              }}
            >
              {!isPanelMinimized && (
                <div className="flex items-center gap-3">
                  <div
                    className="mode-icon-container"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: `
                        radial-gradient(circle at 30% 30%, color-mix(in srgb, ${modeColor} 30%, transparent), transparent 70%),
                        rgba(255, 255, 255, 0.1)
                      `,
                      border: `2px solid color-mix(in srgb, ${modeColor} 40%, transparent)`,
                      boxShadow: `0 0 20px color-mix(in srgb, ${modeColor} 25%, transparent)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <SpatialIcon
                      Icon={ICONS[modeConfig.icon as keyof typeof ICONS] || ICONS.MessageSquare}
                      size={20}
                      style={{ color: modeColor }}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">{modeConfig.displayName}</h3>
                    <p className="text-white/60 text-xs">
                      {isTextMode
                        ? 'Mode texte'
                        : voiceState === 'listening'
                        ? 'En écoute...'
                        : voiceState === 'speaking'
                        ? 'En train de parler...'
                        : voiceState === 'processing'
                        ? 'Traitement...'
                        : voiceState === 'error'
                        ? 'Erreur de connexion'
                        : 'Prêt à écouter'}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Toggle communication mode (voice/text) */}
                {!isPanelMinimized && (
                  <motion.button
                    onClick={toggleCommunicationMode}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isTextMode
                        ? `rgba(255, 255, 255, 0.15)`
                        : 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isTextMode ? 'Passer en mode vocal' : 'Passer en mode texte'}
                  >
                    <SpatialIcon
                      Icon={isTextMode ? ICONS.Mic : ICONS.MessageSquare}
                      size={16}
                      style={{
                        color: isTextMode ? modeColor : 'rgba(255, 255, 255, 0.7)',
                        filter: isTextMode ? `drop-shadow(0 0 8px ${modeColor})` : 'none'
                      }}
                    />
                  </motion.button>
                )}

                {/* Toggle transcript (only in voice mode) */}
                {!isPanelMinimized && !isTextMode && (
                  <motion.button
                    onClick={toggleTranscript}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: showTranscript
                        ? `rgba(255, 255, 255, 0.15)`
                        : 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Afficher/masquer la transcription"
                  >
                    <SpatialIcon
                      Icon={ICONS.FileText}
                      size={16}
                      style={{
                        color: showTranscript ? modeColor : 'rgba(255, 255, 255, 0.7)',
                        filter: showTranscript ? `drop-shadow(0 0 8px ${modeColor})` : 'none'
                      }}
                    />
                  </motion.button>
                )}

                {/* Minimize/Maximize */}
                <motion.button
                  onClick={isPanelMinimized ? maximizePanel : minimizePanel}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={isPanelMinimized ? 'Agrandir' : 'Réduire'}
                >
                  <SpatialIcon
                    Icon={isPanelMinimized ? ICONS.Maximize2 : ICONS.Minimize2}
                    size={16}
                    className="text-white/70"
                  />
                </motion.button>

                {/* Close */}
                <motion.button
                  onClick={handleClose}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Fermer"
                >
                  <SpatialIcon Icon={ICONS.X} size={18} className="text-white/70" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            {!isPanelMinimized && (
              <div className="voice-panel-content flex-1 overflow-hidden flex flex-col">
                {/* Voice Ready Prompt */}
                {showReadyPrompt && !isTextMode && (
                  <VoiceReadyPrompt
                    modeColor={modeColor}
                    modeName={modeConfig.displayName}
                    onStartSession={handleStartVoiceSession}
                    onCancel={handleCancelReadyPrompt}
                  />
                )}

                {/* Visualisation audio (only in voice mode) */}
                {!showReadyPrompt && !isTextMode && preferences.showVisualizations && (
                  <div
                    className="audio-visualization-container"
                    style={{
                      padding: '20px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <AudioWaveform
                      frequencies={visualization.frequencies}
                      color={modeColor}
                      isActive={voiceState === 'listening' || voiceState === 'speaking'}
                      height={80}
                    />
                  </div>
                )}

                {/* Messages / Transcription (always shown in text mode, conditional in voice mode) */}
                {!showReadyPrompt && (isTextMode || showTranscript) && (
                  <div
                    className="messages-container flex-1 overflow-y-auto px-4 py-3"
                    style={{
                      overscrollBehavior: 'contain',
                      minHeight: 0
                    }}
                  >
                    {messages.length === 0 && !currentTranscription ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-md"
                        >
                          <div
                            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${modeColor} 35%, transparent) 0%, transparent 70%), rgba(255, 255, 255, 0.1)`,
                              border: `2px solid color-mix(in srgb, ${modeColor} 40%, transparent)`,
                              boxShadow: `0 0 20px color-mix(in srgb, ${modeColor} 25%, transparent)`
                            }}
                          >
                            <SpatialIcon Icon={ICONS.Mic} size={20} style={{ color: modeColor }} />
                          </div>
                          <p className="text-sm text-white/70">
                            Parlez pour commencer la conversation
                          </p>
                        </motion.div>
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`message-item mb-3 ${
                              message.role === 'user' ? 'text-right' : 'text-left'
                            }`}
                          >
                            <div
                              className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${
                                message.role === 'user'
                                  ? 'bg-white/10 text-white'
                                  : 'bg-gradient-to-br from-white/15 to-white/5 text-white'
                              }`}
                              style={{
                                backdropFilter: 'blur(8px)',
                                border:
                                  message.role === 'coach'
                                    ? `1px solid color-mix(in srgb, ${modeColor} 30%, transparent)`
                                    : '1px solid rgba(255, 255, 255, 0.1)'
                              }}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              {message.emotion && (
                                <span className="text-xs text-white/50 mt-1 block">
                                  {message.emotion}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}

                        {/* Transcription en cours */}
                        {currentTranscription && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="message-item mb-3 text-right"
                          >
                            <div
                              className="inline-block px-4 py-2 rounded-2xl max-w-[80%] bg-white/10 text-white"
                              style={{
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                              }}
                            >
                              <p className="text-sm leading-relaxed">{currentTranscription}</p>
                              <motion.span
                                className="inline-block ml-1"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              >
                                |
                              </motion.span>
                            </div>
                          </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>
                )}

                {/* Text Chat Input (only in text mode) */}
                {!showReadyPrompt && isTextMode && !isPanelMinimized && (
                  <TextChatInput
                    onSendMessage={handleSendTextMessage}
                    disabled={voiceState === 'processing'}
                    placeholder="Tapez votre message..."
                    color={modeColor}
                  />
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VoiceCoachPanel;
