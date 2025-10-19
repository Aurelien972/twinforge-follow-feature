/**
 * Floating Chat Button
 * Bouton flottant pour ouvrir/fermer le chat global depuis le côté droit de l'écran
 *
 * @deprecated Ce composant est obsolète. Utilisez UnifiedFloatingButton à la place.
 * @see UnifiedFloatingButton
 *
 * Migration:
 * - Remplacer FloatingChatButton par UnifiedFloatingButton
 * - Utiliser useUnifiedCoachStore au lieu de useGlobalChatStore
 * - Voir docs/technical/UNIFIED_CHAT_SYSTEM.md pour plus d'informations
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import { useGlobalChatStore } from '../../../system/store/globalChatStore';
import { Z_INDEX, useOverlayStore } from '../../../system/store/overlayStore';
import { useFeedback } from '../../../hooks/useFeedback';
import { Haptics } from '../../../utils/haptics';
import ContextualTooltip from '../ContextualTooltip';
import ChatNotificationBubble from './ChatNotificationBubble';
import { unifiedNotificationService } from '../../../system/services/unifiedNotificationService';
import logger from '../../../lib/utils/logger';
import '../../../styles/components/floating-chat-button.css';
import '../../../styles/components/floating-chat-button-step2.css';

interface FloatingChatButtonProps {
  className?: string;
}

const FloatingChatButton = React.forwardRef<HTMLButtonElement, FloatingChatButtonProps>(({ className = '' }, ref) => {
  const location = useLocation();
  const { isOpen, toggle, currentMode, modeConfigs, hasUnreadMessages, unreadCount, isInStep2 } = useGlobalChatStore();
  const { click } = useFeedback();
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1025 : false);
  const internalButtonRef = useRef<HTMLButtonElement>(null);
  const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalButtonRef;

  const isStep2Active = isInStep2 || location.pathname.includes('/pipeline/step-2');

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) return;

    if (location.pathname.includes('/pipeline/step-2')) {
      unifiedNotificationService.scheduleNotification('step2-adjust');
    } else if (location.pathname.includes('/training')) {
      unifiedNotificationService.scheduleNotification('training-intro');
    } else if (location.pathname.includes('/meals') || location.pathname.includes('/fridge')) {
      unifiedNotificationService.scheduleNotification('nutrition-intro');
    } else if (location.pathname.includes('/fasting')) {
      unifiedNotificationService.scheduleNotification('fasting-intro');
    } else {
      unifiedNotificationService.scheduleNotification('step1-welcome');
    }

    return () => {
      unifiedNotificationService.cancelScheduled();
    };
  }, [location.pathname, isOpen, currentMode]);

  const modeConfig = modeConfigs[currentMode];
  const modeColor = modeConfig.color;

  const handleClick = () => {
    click();
    Haptics.press();
    // Le toggle du chat gère automatiquement les autres overlays via overlayStore
    toggle();
  };

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
      className={`floating-chat-button ${isStep2Active ? 'floating-chat-button--step2' : ''} ${className}`}
      style={{
        position: 'fixed',
        right: (isOpen && !isDesktop) ? '-100px' : (isDesktop ? '24px' : '8px'),
        bottom: isDesktop ? '24px' : 'calc(var(--new-bottom-bar-height) + var(--new-bottom-bar-bottom-offset) + 8px)',
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
        background: hasUnreadMessages
          ? `
              radial-gradient(circle at 30% 30%, color-mix(in srgb, ${modeColor} 30%, transparent) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.25) 0%, transparent 60%),
              var(--liquid-pill-bg)
            `
          : `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.20) 0%, transparent 50%),
              var(--liquid-pill-bg)
            `,
        border: hasUnreadMessages
          ? `1.5px solid color-mix(in srgb, ${modeColor} 40%, transparent)`
          : '1.5px solid rgba(255,255,255,0.22)',
        backdropFilter: 'blur(var(--liquid-pill-blur)) saturate(var(--liquid-pill-saturate))',
        WebkitBackdropFilter: 'blur(var(--liquid-pill-blur)) saturate(var(--liquid-pill-saturate))',
        boxShadow: 'none',
        cursor: 'pointer',
        transition: 'right 400ms cubic-bezier(0.25, 0.1, 0.25, 1), transform var(--liquid-transition-medium), background var(--liquid-transition-fast), box-shadow var(--liquid-transition-fast), border-color var(--liquid-transition-fast)',
        willChange: 'right, transform, filter',
        transform: 'translateZ(0)'
      }}
      initial={false}
      whileHover={{
        scale: 1.08,
        boxShadow: 'none',
        transition: {
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      whileTap={{
        scale: 0.92,
        transition: { duration: 0.15 }
      }}
      aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      aria-expanded={isOpen}
    >
      {/* Corner highlight effect matching bottom bar pills */}
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

      {/* Icon with mode color */}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="button-icon"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <SpatialIcon
          Icon={ICONS.MessageSquare}
          size={isDesktop ? 28 : 24}
          style={{
            color: modeColor,
            filter: 'none'
          }}
        />
      </motion.div>

      {/* Badge for unread messages - Only shown when NO contextual notification is active */}
      <AnimatePresence>
        {!isOpen && hasUnreadMessages && unreadCount > 0 && !isStep2Active && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="floating-chat-badge"
            style={{
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
              boxShadow: 'none'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2 Alert Badge - Higher priority, shown separately */}
      <AnimatePresence>
        {!isOpen && isStep2Active && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="floating-chat-button--step2-notification"
            title="Ton coach t'attend pour ajuster ta séance !"
          >
            !
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );

  if (isStep2Active && !isOpen) {
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
});

FloatingChatButton.displayName = 'FloatingChatButton';

export default FloatingChatButton;
