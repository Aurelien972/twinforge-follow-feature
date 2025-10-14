/**
 * Coach Chat Interface
 * Main chat component for coach interaction
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoachChatStore } from '../../../system/store/coachChatStore';
import { useGlobalChatStore } from '../../../system/store/globalChatStore';
import CoachMessage from './CoachMessage';
import CoachMessageRenderer from './CoachMessageRenderer';
import TypingIndicator from './TypingIndicator';
import ChatInputBar from './ChatInputBar';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import type { ExtendedChatMessage } from '../../../domain/chatMessages';
import type { ExerciseAdjustmentCategory } from '../../../config/exerciseAdjustmentConfig';

// Helper to generate CTAs from coach messages
const generateCTAsForCoachMessage = (message: string): { label: string; action: string }[] => {
  const ctaButtons: { label: string; action: string }[] = [];

  // Extract common coach prompts and generate appropriate CTAs
  if (message.toLowerCase().includes('prêt') || message.toLowerCase().includes('commencer')) {
    ctaButtons.push({ label: 'Oui, allons-y !', action: 'confirm' });
    ctaButtons.push({ label: 'Pas encore', action: 'wait' });
  }

  if (message.toLowerCase().includes('ajuster') || message.toLowerCase().includes('modifier')) {
    ctaButtons.push({ label: 'Modifier', action: 'modify' });
    ctaButtons.push({ label: 'C\'est bon', action: 'keep' });
  }

  return ctaButtons;
};

interface CoachChatInterfaceProps {
  stepColor: string;
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  className?: string;
  messagesContainerRef?: React.RefObject<HTMLDivElement>;
  onScrollChange?: (showButton: boolean) => void;
  onExerciseClick?: (exerciseId: string, exerciseName: string) => void;
  onCategorySelect?: (category: ExerciseAdjustmentCategory) => void;
  onOptionSelect?: (optionId: string) => void;
  onValidate?: () => void;
  onModify?: () => void;
  onViewExercise?: () => void;
  onContinue?: () => void;
  onBack?: () => void;
}

const CoachChatInterface: React.FC<CoachChatInterfaceProps> = ({
  stepColor,
  onSendMessage,
  isTyping = false,
  className = '',
  messagesContainerRef: externalMessagesContainerRef,
  onScrollChange,
  onExerciseClick,
  onCategorySelect,
  onOptionSelect,
  onValidate,
  onModify,
  onViewExercise,
  onContinue,
  onBack
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const internalMessagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = externalMessagesContainerRef || internalMessagesContainerRef;

  const {
    messages: coachMessages,
    isRecording,
    isProcessing,
    isSpeaking,
    voiceSettings
  } = useCoachChatStore();

  const { messages: globalMessages, currentMode } = useGlobalChatStore();

  const messages = currentMode === 'training' ? globalMessages : coachMessages;

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isTyping]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    const shouldShow = !isNearBottom;

    if (onScrollChange) {
      onScrollChange(shouldShow);
    }
  };

  const handleStartRecording = () => {
    console.log('Start voice recording');
  };

  const handleStopRecording = () => {
    console.log('Stop voice recording');
  };

  return (
    <div className={`coach-chat-interface flex flex-col ${className}`} style={{ height: '100%', position: 'relative', minHeight: 0 }}>
      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="messages-container flex-1 overflow-y-auto px-2.5 pt-1.5 pb-0"
        style={{
          overscrollBehavior: 'contain',
          minHeight: 0
        }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, color-mix(in srgb, ${stepColor} 35%, transparent) 0%, transparent 70%),
                    rgba(255, 255, 255, 0.1)
                  `,
                  border: `2px solid color-mix(in srgb, ${stepColor} 40%, transparent)`,
                  boxShadow: `0 0 24px color-mix(in srgb, ${stepColor} 25%, transparent)`
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <span className="text-3xl">💪</span>
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ton Coach est Prêt !
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Utilise le chat ci-dessous pour échanger avec ton coach IA
              </p>
            </motion.div>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const extendedMessage = message as ExtendedChatMessage;
              const isInteractiveMessage = [
                'exercise-list-intro',
                'category-selection',
                'option-selection',
                'validation',
                'update-complete'
              ].includes(extendedMessage.type);

              if (isInteractiveMessage && currentMode === 'training') {
                return (
                  <CoachMessageRenderer
                    key={message.id}
                    message={extendedMessage}
                    stepColor={stepColor}
                    onExerciseClick={onExerciseClick}
                    onCategorySelect={onCategorySelect}
                    onOptionSelect={onOptionSelect}
                    onValidate={onValidate}
                    onModify={onModify}
                    onViewExercise={onViewExercise}
                    onContinue={onContinue}
                    onBack={onBack}
                  />
                );
              }

              const isCoach = message.role === 'coach';
              const isTrainingMode = currentMode === 'training';
              const shouldShowCTA = isCoach && isTrainingMode && message.type === 'text';
              const ctaButtons = shouldShowCTA ? generateCTAsForCoachMessage(message.content) : [];

              const handleCTAClick = (buttonId: string) => {
                const responses: Record<string, string> = {
                  'reduce-intensity': 'Je voudrais réduire la difficulté',
                  'increase-intensity': 'J\'aimerais augmenter l\'intensité',
                  'adjust-sets': 'Je veux ajuster le nombre de séries',
                  'adjust-reps': 'Je veux modifier les répétitions',
                  'show-alternatives': 'Montre-moi les alternatives',
                  'keep-exercise': 'Je garde cet exercice',
                  'keep-as-is': 'C\'est parfait comme ça',
                  'yes-perfect': 'Oui, c\'est parfait !',
                  'need-changes': 'J\'aimerais faire quelques ajustements',
                  'understood': 'Compris'
                };

                const userResponse = responses[buttonId] || 'OK';
                onSendMessage(userResponse);
              };

              return (
                <CoachMessage
                  key={message.id}
                  message={message}
                  stepColor={stepColor}
                  showCTA={shouldShowCTA}
                  ctaButtons={ctaButtons}
                  onCTAClick={handleCTAClick}
                />
              );
            })}

            {isTyping && <TypingIndicator stepColor={stepColor} />}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Chat Input Bar - Fixed at bottom with minimal spacing */}
      <div className="chat-input-footer flex-shrink-0" style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '8px 8px 0px 8px'
      }}>
        <ChatInputBar
          onSendMessage={onSendMessage}
          onStartVoiceRecording={handleStartRecording}
          onStopVoiceRecording={handleStopRecording}
          isRecording={isRecording}
          isProcessing={isProcessing}
          isSpeaking={isSpeaking}
          voiceEnabled={voiceSettings.enabled}
          stepColor={stepColor}
        />
      </div>

      <style>{`
        .messages-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default CoachChatInterface;
