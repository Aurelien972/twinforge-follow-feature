/**
 * Unified Coach Drawer
 * Interface unifiée pour chat texte et mode vocal
 * Fusionne GlobalChatDrawer et VoiceCoachPanel
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import { useUnifiedCoachStore } from '../../../system/store/unifiedCoachStore';
import { Z_INDEX } from '../../../system/store/overlayStore';
import { useFeedback } from '../../../hooks/useFeedback';
import { Haptics } from '../../../utils/haptics';
import logger from '../../../lib/utils/logger';
import { chatAIService } from '../../../system/services/chatAiService';
import { chatConversationService } from '../../../system/services/chatConversationService';
import { textChatService } from '../../../system/services/textChatService';
import { voiceCoachOrchestrator } from '../../../system/services/voiceCoachOrchestrator';
import { environmentDetectionService } from '../../../system/services/environmentDetectionService';
import { voiceConnectionDiagnostics } from '../../../system/services/voiceConnectionDiagnostics';
import CoachChatInterface from '../coach/CoachChatInterface';
import AudioWaveform from './AudioWaveform';
import TextChatInput from './TextChatInput';
import VoiceReadyPrompt from './VoiceReadyPrompt';
import '../../../styles/components/unified-coach-drawer.css';

interface UnifiedCoachDrawerProps {
  chatButtonRef?: React.RefObject<HTMLButtonElement>;
}

const UnifiedCoachDrawer: React.FC<UnifiedCoachDrawerProps> = ({ chatButtonRef }) => {
  const location = useLocation();
  const { navClose } = useFeedback();
  const previousPathRef = useRef(location.pathname);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [environmentChecked, setEnvironmentChecked] = useState(false);

  // Use shallow selector to ensure React detects array changes
  const isPanelOpen = useUnifiedCoachStore(state => state.isPanelOpen);
  const communicationMode = useUnifiedCoachStore(state => state.communicationMode);
  const currentMode = useUnifiedCoachStore(state => state.currentMode);
  const modeConfigs = useUnifiedCoachStore(state => state.modeConfigs);
  const messages = useUnifiedCoachStore(state => state.messages);
  const conversationId = useUnifiedCoachStore(state => state.conversationId);
  const currentTranscription = useUnifiedCoachStore(state => state.currentTranscription);
  const voiceState = useUnifiedCoachStore(state => state.voiceState);
  const isTyping = useUnifiedCoachStore(state => state.isTyping);
  const isProcessing = useUnifiedCoachStore(state => state.isProcessing);
  const isSpeaking = useUnifiedCoachStore(state => state.isSpeaking);
  const showTranscript = useUnifiedCoachStore(state => state.showTranscript);
  const showReadyPrompt = useUnifiedCoachStore(state => state.showReadyPrompt);
  const visualization = useUnifiedCoachStore(state => state.visualization);
  const hasUnreadMessages = useUnifiedCoachStore(state => state.hasUnreadMessages);
  const closeOnNavigation = useUnifiedCoachStore(state => state.closeOnNavigation);
  const errorMessage = useUnifiedCoachStore(state => state.errorMessage);

  // Actions
  const closePanel = useUnifiedCoachStore(state => state.closePanel);
  const setCommunicationMode = useUnifiedCoachStore(state => state.setCommunicationMode);
  const toggleCommunicationMode = useUnifiedCoachStore(state => state.toggleCommunicationMode);
  const setMode = useUnifiedCoachStore(state => state.setMode);
  const addMessage = useUnifiedCoachStore(state => state.addMessage);
  const setTyping = useUnifiedCoachStore(state => state.setTyping);
  const incrementUnread = useUnifiedCoachStore(state => state.incrementUnread);
  const markAsRead = useUnifiedCoachStore(state => state.markAsRead);
  const hideNotification = useUnifiedCoachStore(state => state.hideNotification);
  const setCurrentTranscription = useUnifiedCoachStore(state => state.setCurrentTranscription);
  const setVoiceState = useUnifiedCoachStore(state => state.setVoiceState);
  const setProcessing = useUnifiedCoachStore(state => state.setProcessing);
  const setSpeaking = useUnifiedCoachStore(state => state.setSpeaking);
  const toggleTranscript = useUnifiedCoachStore(state => state.toggleTranscript);
  const setShowReadyPrompt = useUnifiedCoachStore(state => state.setShowReadyPrompt);
  const stopListening = useUnifiedCoachStore(state => state.stopListening);
  const setError = useUnifiedCoachStore(state => state.setError);
  const clearError = useUnifiedCoachStore(state => state.clearError);
  const updateVisualization = useUnifiedCoachStore(state => state.updateVisualization);

  const modeConfig = modeConfigs[currentMode];
  const modeColor = modeConfig.color;
  const isTextMode = communicationMode === 'text';
  const caps = environmentDetectionService.getCapabilities();

  // Détection d'environnement au premier rendu
  useEffect(() => {
    if (!environmentChecked) {
      const caps = environmentDetectionService.detect();

      logger.info('UNIFIED_COACH_DRAWER', 'Environment detected', {
        environment: caps.environmentName,
        canUseVoice: caps.canUseVoiceMode,
        isStackBlitz: caps.isStackBlitz
      });

      // Si on ne peut pas utiliser le mode vocal, forcer le mode texte
      if (!caps.canUseVoiceMode && communicationMode === 'voice') {
        logger.warn('UNIFIED_COACH_DRAWER', 'Forcing text mode due to environment limitations');
        setCommunicationMode('text');
      }

      setEnvironmentChecked(true);
    }
  }, [environmentChecked, communicationMode, setCommunicationMode]);

  // Initialiser le service de chat texte quand le mode change
  useEffect(() => {
    if (communicationMode === 'text' && currentMode) {
      const config = modeConfigs[currentMode];

      textChatService.initialize({
        mode: currentMode,
        systemPrompt: config.systemPrompt
      });

      logger.info('UNIFIED_COACH_DRAWER', 'Text chat service initialized', { mode: currentMode });
    }
  }, [communicationMode, currentMode, modeConfigs]);

  // Setup handlers pour le service de chat texte
  useEffect(() => {
    if (communicationMode !== 'text') return;

    logger.info('UNIFIED_COACH_DRAWER', 'Setting up text chat handlers');

    const unsubscribeMessage = textChatService.onMessage((chunk, isDelta) => {
      if (isDelta && chunk) {
        logger.debug('UNIFIED_COACH_DRAWER', 'Received delta chunk', {
          chunkLength: chunk.length,
          chunkPreview: chunk.substring(0, 50)
        });

        // Utiliser setState directement pour garantir l'immutabilité
        const newState = useUnifiedCoachStore.getState().messages;
        const lastMessage = newState[newState.length - 1];

        if (lastMessage && lastMessage.role === 'coach') {
          // Créer un nouveau tableau avec le message mis à jour
          const updatedMessages = [...newState];
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            content: lastMessage.content + chunk
          };

          logger.info('UNIFIED_COACH_DRAWER', '✅ Appending to existing coach message', {
            messageId: lastMessage.id,
            chunkLength: chunk.length,
            previousLength: lastMessage.content.length,
            newContentLength: updatedMessages[updatedMessages.length - 1].content.length
          });

          useUnifiedCoachStore.setState({ messages: updatedMessages });
        } else {
          // Créer un nouveau message coach
          const newMessage = {
            id: crypto.randomUUID(),
            role: 'coach' as const,
            content: chunk,
            timestamp: new Date()
          };

          logger.info('UNIFIED_COACH_DRAWER', '🆕 Creating new coach message', {
            messageId: newMessage.id,
            contentLength: chunk.length,
            lastMessageRole: lastMessage?.role || 'none'
          });

          useUnifiedCoachStore.setState({ messages: [...newState, newMessage] });
        }
      } else if (!isDelta) {
        logger.info('UNIFIED_COACH_DRAWER', 'Stream completed, clearing processing state');
        setProcessing(false);
      }
    });

    const unsubscribeError = textChatService.onError((error) => {
      logger.error('UNIFIED_COACH_DRAWER', 'Text chat error', { error: error.message });
      setError(error.message);
      setProcessing(false);
    });

    return () => {
      logger.debug('UNIFIED_COACH_DRAWER', 'Cleaning up text chat handlers');
      unsubscribeMessage();
      unsubscribeError();
    };
  }, [communicationMode, setError, setProcessing]);

  const handleClose = () => {
    const lastMessage = messages[messages.length - 1];
    const isCoachMessage = lastMessage && lastMessage.role === 'coach';

    if (isTyping || isCoachMessage) {
      incrementUnread();
      logger.debug('UNIFIED_COACH_DRAWER', 'Closing with unread messages', {
        mode: currentMode,
        isTyping,
        hasUnreadCoachMessage: isCoachMessage,
        timestamp: new Date().toISOString()
      });
    }

    navClose();
    Haptics.tap();
    closePanel();

    if (voiceState === 'listening') {
      stopListening();
    }

    if (communicationMode === 'text') {
      textChatService.cleanup();
    }
  };

  // Fermer le chat lors de la navigation si l'option est activée
  useEffect(() => {
    if (previousPathRef.current !== location.pathname) {
      if (isPanelOpen && closeOnNavigation) {
        logger.debug('UNIFIED_COACH_DRAWER', 'Closing on navigation', {
          from: previousPathRef.current,
          to: location.pathname,
          timestamp: new Date().toISOString()
        });
        navClose();
        Haptics.tap();
        handleClose();
      }
      previousPathRef.current = location.pathname;
    }
  }, [location.pathname, isPanelOpen, closeOnNavigation, navClose]);

  // Détection automatique du mode selon la route
  useEffect(() => {
    if (!isPanelOpen) return;

    let detectedMode = currentMode;

    if (location.pathname.startsWith('/training') || location.pathname.includes('/pipeline')) {
      detectedMode = 'training';
    } else if (location.pathname.startsWith('/meals') || location.pathname.startsWith('/fridge')) {
      detectedMode = 'nutrition';
    } else if (location.pathname.startsWith('/fasting')) {
      detectedMode = 'fasting';
    } else if (location.pathname.startsWith('/body-scan') || location.pathname.startsWith('/avatar')) {
      detectedMode = 'body-scan';
    } else {
      detectedMode = 'general';
    }

    if (detectedMode !== currentMode) {
      logger.debug('UNIFIED_COACH_DRAWER', 'Auto-switching mode based on route', {
        route: location.pathname,
        from: currentMode,
        to: detectedMode,
        timestamp: new Date().toISOString()
      });
      setMode(detectedMode);

      addMessage({
        role: 'system',
        type: 'system',
        content: `Passage en mode ${modeConfigs[detectedMode].displayName}`
      });
    }
  }, [location.pathname, isPanelOpen]);

  // Charger l'historique des messages au changement de mode
  useEffect(() => {
    if (!isPanelOpen) return;

    const loadConversationHistory = async () => {
      try {
        const convId = await chatConversationService.getActiveConversationByMode(currentMode);

        if (convId) {
          const history = await chatConversationService.getConversationMessages(convId);

          if (history.length > 0) {
            useUnifiedCoachStore.setState({ conversationId: convId, messages: history });
            logger.debug('UNIFIED_COACH_DRAWER', 'Loaded conversation history', {
              conversationId: convId,
              messageCount: history.length,
              mode: currentMode
            });
          }
        }
      } catch (error) {
        logger.error('UNIFIED_COACH_DRAWER', 'Error loading conversation history', { error });
      }
    };

    loadConversationHistory();
  }, [currentMode, isPanelOpen]);

  // Fermer le drawer avec ESC
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navClose();
        Haptics.tap();
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, navClose, handleClose]);

  // Auto-scroll vers le bas quand nouveaux messages
  useEffect(() => {
    if (showTranscript || communicationMode === 'text') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, currentTranscription, showTranscript, communicationMode]);

  const handleSendMessage = async (message: string) => {
    if (isTextMode) {
      // Mode texte
      try {
        logger.info('UNIFIED_COACH_DRAWER', 'Sending text message', {
          mode: currentMode,
          messageLength: message.length
        });

        // Ajouter le message utilisateur
        addMessage({
          role: 'user',
          content: message
        });

        logger.debug('UNIFIED_COACH_DRAWER', 'User message added to store');

        setProcessing(true);

        // Ne PAS créer de message coach vide ici
        // Il sera créé automatiquement par le handler onMessage lors du premier chunk

        logger.info('UNIFIED_COACH_DRAWER', 'Calling textChatService.sendMessage');

        await textChatService.sendMessage(message, true);

        logger.info('UNIFIED_COACH_DRAWER', 'Text message sent successfully');

      } catch (error) {
        logger.error('UNIFIED_COACH_DRAWER', 'Error sending text message', { error });
        setProcessing(false);

        const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
        setError(errorMessage);
      }
    } else {
      // Mode chat classique pour compatibilité
      const userMessage = {
        role: 'user' as const,
        type: 'text' as const,
        content: message
      };

      addMessage(userMessage);
      setTyping(true);

      try {
        const convId = conversationId || await chatConversationService.getOrCreateConversation(currentMode);

        if (!convId) {
          throw new Error('Failed to get or create conversation');
        }

        if (!conversationId) {
          useUnifiedCoachStore.setState({ conversationId: convId });
        }

        await chatConversationService.saveMessage(convId, userMessage);

        let systemPrompt = modeConfig.systemPrompt;

        const conversationMessages = messages.slice(-10);

        const apiMessages = [
          { role: 'system' as const, content: systemPrompt },
          ...chatAIService.convertMessagesToAPI(conversationMessages),
          { role: 'user' as const, content: message }
        ];

        const response = await chatAIService.sendMessage({
          messages: apiMessages,
          mode: currentMode
        });

        const assistantMessage = {
          role: 'coach' as const,
          type: 'text' as const,
          content: response.message.content
        };

        addMessage(assistantMessage);
        await chatConversationService.saveMessage(convId, assistantMessage);

      } catch (error) {
        logger.error('UNIFIED_COACH_DRAWER', 'Error sending message', { error });

        addMessage({
          role: 'system' as const,
          type: 'system' as const,
          content: 'Désolé, une erreur est survenue. Veuillez réessayer.'
        });
      } finally {
        setTyping(false);
      }
    }
  };

  // Surveillance d'état vocal pour détecter les blocages
  useEffect(() => {
    if (communicationMode !== 'voice') return;

    let timeoutId: NodeJS.Timeout | null = null;
    const stateStartTime = Date.now();

    // Timeouts différents selon l'état
    const timeouts = {
      connecting: 15000, // 15 secondes max pour la connexion
      processing: 30000, // 30 secondes max pour le traitement
      speaking: 60000    // 60 secondes max pour la réponse vocale
    };

    const timeoutDuration = timeouts[voiceState as keyof typeof timeouts];

    if (timeoutDuration) {
      logger.info('UNIFIED_COACH_DRAWER', `⏱️ Starting timeout monitor for state: ${voiceState}`, {
        timeoutMs: timeoutDuration,
        state: voiceState
      });

      timeoutId = setTimeout(() => {
        const elapsedTime = Date.now() - stateStartTime;
        logger.error('UNIFIED_COACH_DRAWER', `❌ STATE TIMEOUT DETECTED`, {
          state: voiceState,
          elapsedMs: elapsedTime,
          maxMs: timeoutDuration
        });

        // Afficher une erreur à l'utilisateur
        setError(`La session vocale semble bloquée (état: ${voiceState}). Veuillez réessayer ou passer en mode texte.`);
        setVoiceState('error');

        // Proposer de basculer en mode texte
        setTimeout(() => {
          setCommunicationMode('text');
          setVoiceState('idle');
          clearError();
        }, 5000);
      }, timeoutDuration);
    }

    return () => {
      if (timeoutId) {
        logger.debug('UNIFIED_COACH_DRAWER', `✅ Clearing timeout monitor for state: ${voiceState}`);
        clearTimeout(timeoutId);
      }
    };
  }, [voiceState, communicationMode, setCommunicationMode, setVoiceState, setError, clearError]);

  // Logger tous les changements d'état vocal
  useEffect(() => {
    if (communicationMode === 'voice') {
      logger.info('UNIFIED_COACH_DRAWER', `🔄 Voice state changed to: ${voiceState}`, {
        state: voiceState,
        timestamp: new Date().toISOString(),
        isProcessing,
        isSpeaking
      });
    }
  }, [voiceState, communicationMode, isProcessing, isSpeaking]);

  const handleStartVoiceSession = async () => {
    logger.info('UNIFIED_COACH_DRAWER', '🚀 handleStartVoiceSession called', {
      currentMode,
      communicationMode,
      environmentChecked,
      timestamp: new Date().toISOString()
    });

    // Detailed environment check logging
    const envCaps = environmentDetectionService.getCapabilities();
    logger.info('UNIFIED_COACH_DRAWER', '🔍 Environment capabilities check', {
      canUseVoiceMode: envCaps.canUseVoiceMode,
      canUseWebSocket: envCaps.canUseWebSocket,
      isStackBlitz: envCaps.isStackBlitz,
      isWebContainer: envCaps.isWebContainer,
      environmentName: envCaps.environmentName,
      limitations: envCaps.limitations,
      recommendations: envCaps.recommendations
    });

    if (!envCaps.canUseVoiceMode) {
      logger.error('UNIFIED_COACH_DRAWER', '❌ Voice mode not available in this environment', {
        reason: 'Environment capabilities check failed',
        environment: envCaps.environmentName,
        limitations: envCaps.limitations
      });

      const errorMessage = environmentDetectionService.getVoiceModeUnavailableMessage();
      logger.error('UNIFIED_COACH_DRAWER', '❌ Error message to display', {
        errorMessage,
        messageLength: errorMessage?.length || 0,
        isEmpty: !errorMessage || errorMessage.length === 0
      });

      setError(errorMessage);
      setVoiceState('error');

      setTimeout(() => {
        setCommunicationMode('text');
        setVoiceState('idle');
        setShowReadyPrompt(false);
      }, 3000);

      return;
    }

    try {
      logger.info('UNIFIED_COACH_DRAWER', '⏳ Setting state to connecting...');
      setVoiceState('connecting');
      setShowReadyPrompt(false);

      // Check microphone permissions first
      logger.info('UNIFIED_COACH_DRAWER', '🎙️ Checking microphone permissions...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        logger.info('UNIFIED_COACH_DRAWER', '✅ Microphone permission granted');
        stream.getTracks().forEach(track => track.stop());
      } catch (permError) {
        const permErrorMsg = permError instanceof Error ? permError.message : String(permError);
        logger.error('UNIFIED_COACH_DRAWER', '❌ Microphone permission denied or error', {
          error: permErrorMsg,
          name: permError instanceof Error ? permError.name : undefined
        });
        throw new Error(`Microphone access denied: ${permErrorMsg}`);
      }

      if (!voiceCoachOrchestrator.initialized) {
        logger.info('UNIFIED_COACH_DRAWER', '🔧 Initializing voiceCoachOrchestrator...');
        await voiceCoachOrchestrator.initialize();
        logger.info('UNIFIED_COACH_DRAWER', '✅ voiceCoachOrchestrator initialized');
      } else {
        logger.info('UNIFIED_COACH_DRAWER', '✅ voiceCoachOrchestrator already initialized');
      }

      logger.info('UNIFIED_COACH_DRAWER', '🎤 Starting voice session...', {
        mode: currentMode,
        modeConfig: modeConfigs[currentMode]?.displayName,
        timestamp: new Date().toISOString()
      });

      await voiceCoachOrchestrator.startVoiceSession(currentMode);

      logger.info('UNIFIED_COACH_DRAWER', '✅✅✅ Voice session started successfully ✅✅✅', {
        mode: currentMode,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start voice session';
      const errorName = error instanceof Error ? error.name : 'UnknownError';
      const errorStack = error instanceof Error ? error.stack : undefined;

      logger.error('UNIFIED_COACH_DRAWER', '❌ Failed to start voice session', {
        error: errorMessage,
        errorName,
        stack: errorStack,
        currentMode,
        timestamp: new Date().toISOString()
      });

      setVoiceState('error');
      setError(errorMessage);
      setShowReadyPrompt(true);

      // Check if it's an environment-related error
      const isEnvError = errorMessage.includes('StackBlitz') ||
                        errorMessage.includes('WebContainer') ||
                        errorMessage.includes('WebSocket') ||
                        errorMessage.includes('timeout') ||
                        errorMessage.includes('network');

      if (isEnvError) {
        logger.warn('UNIFIED_COACH_DRAWER', '💡 Environment-related error detected, suggesting text mode', {
          errorMessage,
          willSwitchToText: true
        });

        setTimeout(() => {
          setCommunicationMode('text');
          setVoiceState('idle');
          setShowReadyPrompt(false);
          clearError();
        }, 5000);
      } else {
        logger.warn('UNIFIED_COACH_DRAWER', '💡 Non-environment error, keeping in voice mode for retry', {
          errorMessage
        });
      }
    }
  };

  const handleCancelReadyPrompt = () => {
    setShowReadyPrompt(false);
    setVoiceState('idle');
    closePanel();
  };

  const handleToggleCommunicationMode = () => {
    if (communicationMode === 'text' && !caps.canUseVoiceMode) {
      logger.warn('UNIFIED_COACH_DRAWER', 'Voice mode not available, staying in text mode');
      setError(environmentDetectionService.getVoiceModeUnavailableMessage());

      setTimeout(() => {
        clearError();
      }, 5000);

      return;
    }

    toggleCommunicationMode();
  };

  const handleRunDiagnostics = async () => {
    logger.info('UNIFIED_COACH_DRAWER', '🔬 Running voice connection diagnostics...');

    try {
      const results = await voiceConnectionDiagnostics.runAllTests();
      voiceConnectionDiagnostics.printResults(results);

      const allPassed = results.every(r => r.passed);
      const failedTests = results.filter(r => !r.passed);

      if (allPassed) {
        setError('✅ All diagnostics passed! Voice mode should work.\n\nCheck console for detailed results.');
      } else {
        const failureMsg = failedTests.map(t => `❌ ${t.test}: ${t.message}`).join('\n');
        setError(`⚠️ Some diagnostics failed:\n\n${failureMsg}\n\nCheck console for detailed results and troubleshooting steps.`);
      }

      setTimeout(() => {
        clearError();
      }, 10000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logger.error('UNIFIED_COACH_DRAWER', '❌ Diagnostics failed', { error: errorMsg });
      setError(`❌ Diagnostics failed: ${errorMsg}`);

      setTimeout(() => {
        clearError();
      }, 5000);
    }
  };

  const scrollToBottom = (smooth = true) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* Overlay - Mobile only */}
          <motion.div
            key="unified-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="lg:hidden"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: Z_INDEX.CHAT_DRAWER - 1
            }}
          />

          {/* Drawer */}
          <motion.div
            key="unified-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            className="unified-coach-drawer"
            style={{
              position: 'fixed',
              top: 'calc(64px + 12px)',
              right: '8px',
              bottom: 'calc(var(--new-bottom-bar-height) + var(--new-bottom-bar-bottom-offset) + 12px)',
              width: 'min(420px, calc(100vw - 16px))',
              zIndex: Z_INDEX.CHAT_DRAWER,
              borderRadius: '20px',
              background: `
                var(--liquid-reflections-multi),
                var(--liquid-highlight-ambient),
                var(--liquid-glass-bg-elevated)
              `,
              backdropFilter: 'blur(var(--liquid-panel-blur)) saturate(var(--liquid-panel-saturate))',
              WebkitBackdropFilter: 'blur(var(--liquid-panel-blur)) saturate(var(--liquid-panel-saturate))',
              boxShadow: 'var(--liquid-panel-shadow)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              isolation: 'isolate',
              transform: 'translateZ(0)',
              willChange: 'transform, filter'
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

            {/* Environment Warning Banner (StackBlitz) */}
            {caps.isStackBlitz && (
              <div
                style={{
                  padding: '8px 16px',
                  background: 'rgba(251, 191, 36, 0.15)',
                  borderBottom: '1px solid rgba(251, 191, 36, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <SpatialIcon Icon={ICONS.AlertTriangle} size={14} style={{ color: '#fbbf24' }} />
                <p style={{ fontSize: '11px', color: '#fbbf24', margin: 0 }}>
                  Mode vocal indisponible en {caps.environmentName}
                </p>
              </div>
            )}

            {/* Header */}
            <div
              className="drawer-header"
              style={{
                padding: '16px 20px',
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
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-lg">
                      {modeConfig.displayName}
                    </h3>
                    <motion.div
                      animate={{
                        scale: isProcessing || voiceState === 'processing' || voiceState === 'connecting' ? [1, 1.3, 1] : 1,
                        opacity: isProcessing || voiceState === 'processing' || voiceState === 'connecting' ? [1, 0.6, 1] : 1
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isProcessing || voiceState === 'processing' || voiceState === 'connecting' ? Infinity : 0,
                        ease: 'easeInOut'
                      }}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: voiceState === 'error' || errorMessage
                          ? '#EF4444'
                          : isProcessing || voiceState === 'processing' || voiceState === 'connecting'
                          ? '#FBBF24'
                          : voiceState === 'listening' || voiceState === 'speaking'
                          ? '#10B981'
                          : isTextMode
                          ? modeColor
                          : 'rgba(255, 255, 255, 0.5)',
                        boxShadow: voiceState === 'error' || errorMessage
                          ? '0 0 8px #EF4444'
                          : isProcessing || voiceState === 'processing' || voiceState === 'connecting'
                          ? '0 0 8px #FBBF24'
                          : voiceState === 'listening' || voiceState === 'speaking'
                          ? '0 0 8px #10B981'
                          : isTextMode
                          ? `0 0 8px ${modeColor}`
                          : 'none'
                      }}
                      title={
                        voiceState === 'error' || errorMessage
                          ? 'Erreur de connexion'
                          : isProcessing || voiceState === 'processing'
                          ? 'Traitement en cours'
                          : voiceState === 'connecting'
                          ? 'Connexion...'
                          : voiceState === 'listening' || voiceState === 'speaking'
                          ? 'Connecté'
                          : isTextMode
                          ? 'Mode texte actif'
                          : 'Inactif'
                      }
                    />
                  </div>
                  <p className="text-white/60 text-xs">
                    {isTextMode
                      ? isProcessing ? 'Traitement...' : 'Mode texte'
                      : voiceState === 'listening'
                      ? 'En écoute...'
                      : voiceState === 'speaking'
                      ? 'En train de parler...'
                      : voiceState === 'processing'
                      ? 'Traitement...'
                      : voiceState === 'connecting'
                      ? 'Connexion...'
                      : voiceState === 'error'
                      ? 'Erreur de connexion'
                      : 'Prêt à écouter'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Diagnostics button (shown when voice has errors) */}
                {(voiceState === 'error' || (!caps.canUseVoiceMode && !isTextMode)) && (
                  <motion.button
                    onClick={handleRunDiagnostics}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '12px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#EF4444',
                      fontWeight: '500'
                    }}
                    whileHover={{ scale: 1.02, background: 'rgba(239, 68, 68, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    title="Exécuter les diagnostics de connexion vocale"
                  >
                    <SpatialIcon Icon={ICONS.AlertCircle} size={14} style={{ color: '#EF4444' }} />
                    Diagnostics
                  </motion.button>
                )}

                {/* Toggle communication mode (voice/text) */}
                <motion.button
                  onClick={handleToggleCommunicationMode}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isTextMode
                      ? 'rgba(255, 255, 255, 0.08)'
                      : `rgba(255, 255, 255, 0.15)`,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: !caps.canUseVoiceMode && !isTextMode ? 0.5 : 1
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={
                    !caps.canUseVoiceMode && !isTextMode
                      ? 'Mode vocal indisponible dans cet environnement'
                      : isTextMode
                      ? 'Passer en mode vocal'
                      : 'Passer en mode texte'
                  }
                >
                  <SpatialIcon
                    Icon={isTextMode ? ICONS.Mic : ICONS.MessageSquare}
                    size={16}
                    style={{
                      color: isTextMode ? 'rgba(255, 255, 255, 0.7)' : modeColor,
                      filter: isTextMode ? 'none' : `drop-shadow(0 0 8px ${modeColor})`
                    }}
                  />
                </motion.button>

                {/* Toggle transcript (only in voice mode) */}
                {!isTextMode && (
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

                {/* Scroll to Bottom Button */}
                <AnimatePresence>
                  {showScrollButton && isTextMode && (
                    <motion.button
                      className="scroll-to-bottom"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => scrollToBottom(true)}
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
                      whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.12)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SpatialIcon
                        Icon={ICONS.ArrowDown}
                        size={16}
                        style={{
                          color: modeColor,
                          filter: `drop-shadow(0 0 8px color-mix(in srgb, ${modeColor} 40%, transparent))`
                        }}
                      />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Close Button */}
                <motion.button
                  className="header-button"
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
                  whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.12)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SpatialIcon
                    Icon={ICONS.X}
                    size={18}
                    className="text-white/70"
                  />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="drawer-content flex-1 overflow-hidden flex flex-col">
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
              {!showReadyPrompt && !isTextMode && (
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

              {/* Messages / Chat Interface */}
              {!showReadyPrompt && (
                <div className="chat-interface-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', minHeight: 0 }}>
                  {isTextMode ? (
                    <CoachChatInterface
                      stepColor={modeColor}
                      onSendMessage={handleSendMessage}
                      isTyping={isTyping}
                      className="flex-1"
                      messagesContainerRef={messagesContainerRef}
                      onScrollChange={setShowScrollButton}
                    />
                  ) : (
                    <>
                      {/* Transcription (voice mode) */}
                      {showTranscript && (
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
                                  <SpatialIcon
                                    Icon={ICONS.Mic}
                                    size={20}
                                    style={{ color: modeColor }}
                                  />
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
                                  </div>
                                </motion.div>
                              ))}

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

                      {/* Text Chat Input (only in voice mode with transcript) */}
                      {showTranscript && (
                        <TextChatInput
                          onSendMessage={handleSendMessage}
                          disabled={isProcessing}
                          placeholder="Tapez votre message..."
                          color={modeColor}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UnifiedCoachDrawer;
