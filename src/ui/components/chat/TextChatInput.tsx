/**
 * Text Chat Input Component
 * Input textuel pour communiquer avec le coach en mode texte
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';

interface TextChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  color?: string;
  className?: string;
}

const TextChatInput: React.FC<TextChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Tapez votre message...',
  color = '#3B82F6',
  className = ''
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);
    setMessage('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Envoyer avec Enter (sans Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={handleSubmit}
      className={`text-chat-input ${className}`}
      style={{
        padding: '12px 16px',
        borderTop: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
        background: `
          linear-gradient(180deg,
            rgba(11, 14, 23, 0.6) 0%,
            rgba(11, 14, 23, 0.8) 100%
          )
        `,
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px'
      }}
    >
      {/* Textarea */}
      <div
        className="textarea-container flex-1"
        style={{
          position: 'relative',
          minHeight: '40px'
        }}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          style={{
            width: '100%',
            minHeight: '40px',
            maxHeight: '120px',
            padding: '10px 14px',
            borderRadius: '12px',
            border: isFocused
              ? `2px solid color-mix(in srgb, ${color} 50%, transparent)`
              : '2px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '14px',
            lineHeight: '1.5',
            resize: 'none',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {/* Send Button */}
      <motion.button
        type="submit"
        disabled={!canSend}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: canSend
            ? `
              radial-gradient(circle at 30% 30%, color-mix(in srgb, ${color} 40%, transparent) 0%, transparent 50%),
              rgba(255, 255, 255, 0.15)
            `
            : 'rgba(255, 255, 255, 0.05)',
          border: canSend
            ? `2px solid color-mix(in srgb, ${color} 50%, transparent)`
            : '2px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canSend ? 'pointer' : 'not-allowed',
          flexShrink: 0,
          transition: 'all 0.2s ease',
          opacity: canSend ? 1 : 0.5
        }}
        whileHover={canSend ? { scale: 1.05 } : {}}
        whileTap={canSend ? { scale: 0.95 } : {}}
        aria-label="Envoyer le message"
      >
        <SpatialIcon
          Icon={ICONS.Send}
          size={18}
          style={{
            color: canSend ? color : 'rgba(255, 255, 255, 0.4)',
            filter: canSend ? `drop-shadow(0 0 8px ${color})` : 'none'
          }}
        />
      </motion.button>
    </form>
  );
};

export default TextChatInput;
