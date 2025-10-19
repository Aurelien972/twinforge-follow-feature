/**
 * Chat Input Bar
 * Sticky input for text and voice messaging with coach
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import { useFeedback } from '../../../hooks/useFeedback';
import { Haptics } from '../../../utils/haptics';

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
  onStartVoiceRecording: () => void;
  onStopVoiceRecording: () => void;
  onStartRealtimeSession: () => Promise<void>;
  onStopRealtimeSession: () => void;
  isRecording: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  realtimeState: 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';
  realtimeError?: string;
  voiceEnabled: boolean;
  stepColor: string;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({
  onSendMessage,
  onStartVoiceRecording,
  onStopVoiceRecording,
  onStartRealtimeSession,
  onStopRealtimeSession,
  isRecording,
  isProcessing,
  isSpeaking,
  realtimeState,
  realtimeError,
  voiceEnabled,
  stepColor,
  placeholder = 'Parle à ton coach...',
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { click } = useFeedback();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      click();
      Haptics.tap();
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      onStopVoiceRecording();
    } else {
      onStartVoiceRecording();
    }
    click();
    Haptics.press();
  };

  const handleRealtimeToggle = async () => {
    click();
    Haptics.press();

    if (realtimeState === 'idle' || realtimeState === 'error') {
      await onStartRealtimeSession();
    } else {
      onStopRealtimeSession();
    }
  };

  const isRealtimeActive = realtimeState !== 'idle' && realtimeState !== 'error';

  return (
    <div
      className="chat-input-bar-container"
      style={{
        position: 'relative',
        width: '100%',
        zIndex: 1,
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.6 : 1,
        margin: '0',
        padding: '0'
      }}
    >
      {/* Error Banner */}
      <AnimatePresence>
        {realtimeError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              padding: '8px 16px',
              marginBottom: '8px',
              borderRadius: '12px',
              background: 'linear-gradient(180deg, rgba(220, 38, 38, 0.2) 0%, rgba(153, 27, 27, 0.15) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SpatialIcon Icon={ICONS.AlertTriangle} size={14} style={{ color: '#EF4444' }} />
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>
                {realtimeError}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Realtime Status Bar */}
      <AnimatePresence>
        {realtimeState === 'connecting' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              padding: '6px 16px',
              marginBottom: '8px',
              borderRadius: '12px',
              background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '12px',
                height: '12px',
                border: '2px solid #EF4444',
                borderTopColor: 'transparent',
                borderRadius: '50%'
              }}
            />
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>
              Connexion au coach vocal...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Status Bar - En haut avec marge réduite */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              padding: '6px 16px',
              marginBottom: '8px',
              borderRadius: '12px',
              background: `
                linear-gradient(180deg,
                  rgba(11, 14, 23, 0.8) 0%,
                  rgba(11, 14, 23, 0.6) 100%
                )
              `,
              backdropFilter: 'blur(16px)',
              border: `1px solid color-mix(in srgb, ${stepColor} 20%, transparent)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '12px',
                height: '12px',
                border: `2px solid ${stepColor}`,
                borderTopColor: 'transparent',
                borderRadius: '50%'
              }}
            />
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Traitement en cours...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`chat-input-bar ${isFocused ? 'chat-input-bar--focused' : ''}`}
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%, color-mix(in srgb, ${stepColor} 12%, transparent) 0%, transparent 60%),
            var(--liquid-reflections-multi),
            var(--liquid-highlight-ambient),
            var(--liquid-glass-bg-base)
          `,
          backdropFilter: 'blur(var(--liquid-bottombar-blur)) saturate(var(--liquid-bottombar-saturate))',
          WebkitBackdropFilter: 'blur(var(--liquid-bottombar-blur)) saturate(var(--liquid-bottombar-saturate))',
          border: isFocused
            ? `1.5px solid color-mix(in srgb, ${stepColor} 40%, transparent)`
            : '1.5px solid rgba(255, 255, 255, 0.15)',
          boxShadow: isFocused
            ? `
                0 4px 24px rgba(0, 0, 0, 0.25),
                0 0 32px color-mix(in srgb, ${stepColor} 20%, transparent),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)
              `
            : `
                0 4px 20px rgba(0, 0, 0, 0.2),
                0 0 24px rgba(255, 255, 255, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
          borderRadius: '18px',
          padding: '6px 8px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
        <div className="flex items-center gap-2">
          {/* Voice Button */}
          {voiceEnabled && (
            <motion.button
              onClick={handleVoiceToggle}
              className={`chat-input-button flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${isRecording ? 'chat-input-button--recording' : ''}`}
              style={{
                background: isRecording
                  ? `
                      radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 70%),
                      rgba(239, 68, 68, 0.15)
                    `
                  : `
                      radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.18) 0%, transparent 50%),
                      var(--liquid-pill-bg)
                    `,
                border: isRecording ? '1.5px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: isRecording
                  ? '0 0 20px rgba(239, 68, 68, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)'
                  : 'var(--liquid-pill-shadow)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={disabled || isProcessing}
            >
              <AnimatePresence mode="wait">
                {isRecording ? (
                  <motion.div
                    key="recording"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                  >
                    <SpatialIcon
                      Icon={ICONS.MicOff}
                      size={18}
                      style={{ color: '#EF4444' }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                  >
                    <SpatialIcon
                      Icon={ICONS.Mic}
                      size={18}
                      style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Animation de pulsation pendant l'enregistrement */}
              {isRecording && (
                <>
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '50%',
                      border: '2px solid rgba(239, 68, 68, 0.6)',
                      pointerEvents: 'none'
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      border: '2px solid rgba(239, 68, 68, 0.4)',
                      pointerEvents: 'none'
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.3
                    }}
                  />
                </>
              )}
            </motion.button>
          )}

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isRecording ? 'Enregistrement en cours...' : placeholder}
              disabled={disabled || isRecording}
              rows={1}
              className="chat-textarea w-full resize-none bg-transparent border-none outline-none text-white placeholder-white/40 text-sm leading-relaxed py-1.5 px-1.5"
              style={{
                maxHeight: '90px',
                minHeight: '32px'
              }}
            />
          </div>

          {/* Realtime Voice Button (RED with RED DOT) */}
          {voiceEnabled && (
            <motion.button
              onClick={handleRealtimeToggle}
              className="chat-input-button flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center relative"
              style={{
                background: isRealtimeActive
                  ? `
                      radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.4) 0%, transparent 70%),
                      linear-gradient(135deg, rgba(239, 68, 68, 0.85), rgba(220, 38, 38, 0.95))
                    `
                  : `
                      radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 70%),
                      linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(220, 38, 38, 0.8))
                    `,
                border: isRealtimeActive ? '2px solid rgba(239, 68, 68, 0.8)' : '2px solid rgba(239, 68, 68, 0.6)',
                boxShadow: isRealtimeActive
                  ? `
                      0 0 30px rgba(239, 68, 68, 0.6),
                      0 6px 16px rgba(0, 0, 0, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `
                  : `
                      0 0 20px rgba(239, 68, 68, 0.4),
                      0 4px 12px rgba(0, 0, 0, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: `
                  0 0 35px rgba(239, 68, 68, 0.7),
                  0 8px 20px rgba(0, 0, 0, 0.5),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `
              }}
              whileTap={{ scale: 0.92 }}
              disabled={disabled}
            >
              {/* RED DOT inside the RED CIRCLE - Recording Indicator */}
              <AnimatePresence>
                {(realtimeState === 'listening' || realtimeState === 'speaking') && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, #FF6B6B 0%, #DC2626 100%)',
                      boxShadow: `
                        0 0 12px rgba(239, 68, 68, 0.8),
                        0 0 20px rgba(239, 68, 68, 0.6),
                        inset 0 1px 2px rgba(255, 255, 255, 0.5)
                      `,
                      zIndex: 2
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Pulsating glow effect */}
              {isRealtimeActive && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.3)',
                    filter: 'blur(8px)',
                    zIndex: -1
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )}

              {/* Connecting state - spinning border */}
              {realtimeState === 'connecting' && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -3,
                    borderRadius: '50%',
                    border: '2px solid transparent',
                    borderTopColor: '#EF4444',
                    borderRightColor: '#EF4444',
                    pointerEvents: 'none'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              )}
            </motion.button>
          )}

          {/* Send Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled || isProcessing}
            className={`chat-input-button flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${message.trim() && !disabled ? 'chat-input-button--send-enabled' : ''}`}
            style={{
              background: message.trim()
                ? `
                    radial-gradient(circle at 30% 30%, color-mix(in srgb, ${stepColor} 35%, transparent) 0%, transparent 70%),
                    linear-gradient(135deg, color-mix(in srgb, ${stepColor} 30%, transparent), color-mix(in srgb, ${stepColor} 18%, transparent))
                  `
                : 'rgba(255, 255, 255, 0.05)',
              border: message.trim()
                ? `1.5px solid color-mix(in srgb, ${stepColor} 50%, transparent)`
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: message.trim()
                ? `0 0 16px color-mix(in srgb, ${stepColor} 25%, transparent), 0 4px 12px rgba(0, 0, 0, 0.2)`
                : 'none',
              cursor: message.trim() && !disabled ? 'pointer' : 'not-allowed',
              opacity: message.trim() && !disabled ? 1 : 0.5
            }}
            whileHover={message.trim() && !disabled ? { scale: 1.05 } : undefined}
            whileTap={message.trim() && !disabled ? { scale: 0.95 } : undefined}
          >
            <SpatialIcon
              Icon={ICONS.Send}
              size={18}
              style={{
                color: message.trim() ? stepColor : 'rgba(255, 255, 255, 0.4)',
                filter: message.trim() ? `drop-shadow(0 0 8px color-mix(in srgb, ${stepColor} 40%, transparent))` : 'none'
              }}
            />
          </motion.button>
        </div>

        {/* Recording Indicator */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="recording-indicator mt-3 pt-3 border-t border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="recording-dot" />
                  <span className="text-xs text-white/70">Enregistrement en cours...</span>
                </div>
                <span className="text-xs text-white/50">Tap pour arrêter</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="processing-indicator mt-3 pt-3 border-t border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="processing-spinner">
                  <SpatialIcon Icon={ICONS.Loader} size={14} style={{ color: stepColor }} />
                </div>
                <span className="text-xs text-white/70">Traitement en cours...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatInputBar;
