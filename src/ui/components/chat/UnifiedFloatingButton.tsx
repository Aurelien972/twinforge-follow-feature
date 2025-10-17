/**
 * Unified Floating Button
 * Bouton flottant unique pour gérer le mode chat et vocal
 * Remplace FloatingChatButton et FloatingVoiceCoachButton
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../../../system/device/DeviceProvider';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import { useUnifiedCoachStore } from '../../../system/store/unifiedCoachStore';
import { Z_INDEX } from '../../../system/store/overlayStore';
import { useFeedback } from '../../../hooks/useFeedback';
import { Haptics } from '../../../utils/haptics';
import ContextualTooltip from '../ContextualTooltip';
import ChatNotificationBubble from './ChatNotificationBubble';
import { chatNotificationService } from '../../../system/services/chatNotificationService';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import '../../../styles/components/unified-floating-button.css';

interface UnifiedFloatingButtonProps {
  className?: string;
}

const UnifiedFloatingButton = React.forwardRef<HTMLButtonElement, UnifiedFloatingButtonProps>(
  ({ className = '' }, ref) => {
    const location = useLocation();
    const { click } = useFeedback();
    const isMobile = useIsMobile();
    const { isScrollingDown } = useScrollDirection({ threshold: 10 });
    const [isDesktop, setIsDesktop] = useState(
      typeof window !== 'undefined' ? window.innerWidth >= 1025 : false
    );
    const internalButtonRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalButtonRef;

    const {
      isPanelOpen,
      communicationMode,
      currentMode,
      modeConfigs,
      hasUnreadMessages,
      unreadCount,
      isInStep2,
      togglePanel
    } = useUnifiedCoachStore();

    const isStep2Active = isInStep2 || location.pathname.includes('/pipeline/step-2');

    // Sur desktop, cacher le bouton chat quand on scroll vers le bas
    const shouldHideButton = !isMobile && isScrollingDown;

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1025);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (isPanelOpen) return;

      if (location.pathname.includes('/pipeline/step-2')) {
        chatNotificationService.scheduleNotification(currentMode, 'step2');
      } else if (location.pathname.includes('/training')) {
        chatNotificationService.scheduleNotification('training', 'step1');
      } else if (location.pathname.includes('/meals') || location.pathname.includes('/fridge')) {
        chatNotificationService.scheduleNotification('nutrition');
      } else if (location.pathname.includes('/fasting')) {
        chatNotificationService.scheduleNotification('fasting');
      } else {
        chatNotificationService.scheduleNotification('general', 'step1');
      }

      return () => {
        chatNotificationService.clearScheduledNotification();
      };
    }, [location.pathname, isPanelOpen, currentMode]);

    const modeConfig = modeConfigs[currentMode];
    const modeColor = modeConfig.color;
    const isVoiceMode = communicationMode === 'voice';

    const handleClick = () => {
      click();
      Haptics.press();
      togglePanel();
    };

    // Icône dynamique basée sur le mode de communication
    const ButtonIcon = isVoiceMode ? ICONS.Mic : ICONS.MessageSquare;

    const buttonElement = (
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
        className={`unified-floating-button ${
          isStep2Active ? 'unified-floating-button--step2' : ''
        } ${isVoiceMode ? 'unified-floating-button--voice' : 'unified-floating-button--text'} ${className}`}
        style={{
          position: 'fixed',
          right: shouldHideButton || (isPanelOpen && !isDesktop) ? '-100px' : isDesktop ? '24px' : '8px',
          bottom: isDesktop
            ? '24px'
            : 'calc(var(--new-bottom-bar-height) + var(--new-bottom-bar-bottom-offset) + 8px)',
          zIndex: Z_INDEX.FLOATING_CHAT_BUTTON,
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          pointerEvents: 'auto',
          transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '50%',
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
          width: isDesktop ? '60px' : '68px',
          height: isDesktop ? '60px' : '68px',
          background: isMobile
            ? (isVoiceMode
              ? `linear-gradient(135deg, ${modeColor} 0%, color-mix(in srgb, ${modeColor} 80%, #000) 100%)`
              : hasUnreadMessages
              ? `linear-gradient(135deg, ${modeColor} 0%, color-mix(in srgb, ${modeColor} 80%, #000) 100%)`
              : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.10) 100%)')
            : (isVoiceMode
              ? `
                  radial-gradient(circle at 30% 30%, color-mix(in srgb, ${modeColor} 40%, transparent) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(255,255,255,0.30) 0%, transparent 60%),
                  var(--liquid-pill-bg)
                `
              : hasUnreadMessages
              ? `
                  radial-gradient(circle at 30% 30%, color-mix(in srgb, ${modeColor} 30%, transparent) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(255,255,255,0.25) 0%, transparent 60%),
                  var(--liquid-pill-bg)
                `
              : `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.20) 0%, transparent 50%),
                  var(--liquid-pill-bg)
                `),
          border: isVoiceMode
            ? `2px solid color-mix(in srgb, ${modeColor} 50%, transparent)`
            : hasUnreadMessages
            ? `1.5px solid color-mix(in srgb, ${modeColor} 40%, transparent)`
            : '1.5px solid rgba(255,255,255,0.22)',
          backdropFilter: isMobile ? 'none' : 'blur(var(--liquid-pill-blur)) saturate(var(--liquid-pill-saturate))',
          WebkitBackdropFilter: isMobile ? 'none' : 'blur(var(--liquid-pill-blur)) saturate(var(--liquid-pill-saturate))',
          boxShadow: isVoiceMode
            ? `
                var(--liquid-pill-shadow),
                0 0 48px color-mix(in srgb, ${modeColor} 40%, transparent),
                0 0 72px color-mix(in srgb, ${modeColor} 20%, transparent),
                0 4px 24px rgba(0, 0, 0, 0.3)
              `
            : hasUnreadMessages
            ? `
                var(--liquid-pill-shadow),
                0 0 40px color-mix(in srgb, ${modeColor} 30%, transparent),
                0 0 60px color-mix(in srgb, ${modeColor} 15%, transparent)
              `
            : `
                var(--liquid-pill-shadow),
                0 0 32px color-mix(in srgb, ${modeColor} 15%, transparent)
              `,
          cursor: 'pointer',
          transition:
            'right 400ms cubic-bezier(0.25, 0.1, 0.25, 1), transform var(--liquid-transition-medium), background var(--liquid-transition-fast), box-shadow var(--liquid-transition-fast), border-color var(--liquid-transition-fast)',
          willChange: 'right, transform, filter'
        }}
        initial={false}
        animate={
          isMobile ? {} : (isVoiceMode && !isPanelOpen
            ? {
                scale: [1, 1.06, 1],
                boxShadow: [
                  `var(--liquid-pill-shadow), 0 0 48px color-mix(in srgb, ${modeColor} 40%, transparent), 0 0 72px color-mix(in srgb, ${modeColor} 20%, transparent)`,
                  `var(--liquid-pill-shadow), 0 0 56px color-mix(in srgb, ${modeColor} 50%, transparent), 0 0 84px color-mix(in srgb, ${modeColor} 25%, transparent)`,
                  `var(--liquid-pill-shadow), 0 0 48px color-mix(in srgb, ${modeColor} 40%, transparent), 0 0 72px color-mix(in srgb, ${modeColor} 20%, transparent)`,
                ],
              }
            : {})
        }
        transition={
          isMobile ? { duration: 0 } : (isVoiceMode && !isPanelOpen
            ? {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {})
        }
        whileHover={isMobile ? {} : {
          scale: 1.12,
          boxShadow: `
            var(--liquid-pill-shadow),
            0 0 48px color-mix(in srgb, ${modeColor} 25%, transparent),
            0 4px 20px rgba(0, 0, 0, 0.3)
          `,
          transition: {
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
        whileTap={isMobile ? {} : {
          scale: 0.92,
          transition: { duration: 0.15 }
        }}
        aria-label={isPanelOpen ? 'Fermer le coach' : 'Ouvrir le coach'}
        aria-expanded={isPanelOpen}
      >
        {/* Pulse Ring Effect for Voice Mode - Désactivé sur mobile */}
        <AnimatePresence>
          {!isMobile && isVoiceMode && !isPanelOpen && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.4, 1.6],
                  opacity: [0.6, 0.3, 0],
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '50%',
                  border: `2px solid ${modeColor}`,
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.3, 1.5],
                  opacity: [0.5, 0.25, 0],
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '50%',
                  border: `2px solid ${modeColor}`,
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Corner highlight effect */}
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '50%',
            bottom: '50%',
            borderRadius: 'inherit',
            background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)',
            opacity: 0.6,
            pointerEvents: 'none'
          }}
        />

        {/* Icon with mode-specific color and animation - Désactivé sur mobile */}
        <motion.div
          animate={isMobile ? { rotate: isPanelOpen ? 180 : 0 } : {
            rotate: isPanelOpen ? 180 : 0,
            scale: isVoiceMode ? [1, 1.1, 1] : 1
          }}
          transition={isMobile ? {
            rotate: { duration: 0.3 }
          } : {
            rotate: { duration: 0.3 },
            scale: isVoiceMode
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              : { duration: 0 }
          }}
          className="button-icon"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <SpatialIcon
            Icon={ButtonIcon}
            size={isDesktop ? 28 : isVoiceMode ? 30 : 26}
            style={{
              color: modeColor,
              filter: isStep2Active
                ? `drop-shadow(0 0 16px rgba(59, 130, 246, 0.8))`
                : isVoiceMode
                ? `drop-shadow(0 0 18px color-mix(in srgb, ${modeColor} 70%, transparent))`
                : `drop-shadow(0 0 14px color-mix(in srgb, ${modeColor} 60%, transparent))`
            }}
          />
        </motion.div>

        {/* Mode indicator badge */}
        <AnimatePresence>
          {!isPanelOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: isVoiceMode
                  ? `radial-gradient(circle at 30% 30%, #EF4444 0%, #DC2626 100%)`
                  : `radial-gradient(circle at 30% 30%, ${modeColor} 0%, color-mix(in srgb, ${modeColor} 80%, #000) 100%)`,
                border: '2px solid rgba(11, 14, 23, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isVoiceMode
                  ? '0 0 16px rgba(239, 68, 68, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)'
                  : `0 0 16px color-mix(in srgb, ${modeColor} 60%, transparent), 0 2px 8px rgba(0, 0, 0, 0.4)`,
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <SpatialIcon
                Icon={isVoiceMode ? ICONS.Mic : ICONS.MessageSquare}
                size={10}
                style={{ color: 'white' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread Badge Count or Step 2 notification */}
        <AnimatePresence>
          {!isPanelOpen && (hasUnreadMessages && unreadCount > 0 || isStep2Active) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={
                isStep2Active && !hasUnreadMessages
                  ? 'unified-floating-button--step2-notification'
                  : 'unified-floating-badge'
              }
              title={
                isStep2Active && !hasUnreadMessages
                  ? 'Ton coach t\'attend pour ajuster ta séance !'
                  : undefined
              }
              style={
                isStep2Active && !hasUnreadMessages
                  ? {}
                  : {
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      minWidth: '20px',
                      height: '20px',
                      padding: '0 6px',
                      borderRadius: '10px',
                      background: `
                        radial-gradient(circle at 30% 30%, ${modeColor} 0%, color-mix(in srgb, ${modeColor} 80%, #000) 100%)
                      `,
                      border: '2px solid rgba(11, 14, 23, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: `
                        0 0 16px color-mix(in srgb, ${modeColor} 60%, transparent),
                        0 2px 8px rgba(0, 0, 0, 0.4)
                      `,
                      zIndex: 10,
                      pointerEvents: 'none'
                    }
              }
            >
              {isStep2Active ? '!' : unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );

    if (isStep2Active && !isPanelOpen) {
      return (
        <>
          <ContextualTooltip
            content="Ton coach t'attend pour ajuster ta séance ! Clique pour ouvrir le chat."
            title="Ajuste ton programme"
            placement="left"
            delay={500}
            maxWidth={280}
          >
            {buttonElement}
          </ContextualTooltip>
          <ChatNotificationBubble buttonRef={buttonRef} />
        </>
      );
    }

    return (
      <>
        {buttonElement}
        <ChatNotificationBubble buttonRef={buttonRef} />
      </>
    );
  }
);

UnifiedFloatingButton.displayName = 'UnifiedFloatingButton';

export default UnifiedFloatingButton;
