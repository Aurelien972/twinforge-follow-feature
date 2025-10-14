import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';
import { useFeedback } from '../../hooks/useFeedback';
import { bottomBarClick, centralButtonClick } from '../../audio/effects/forgeronSounds';
import { useOverlayStore } from '../../system/store/overlayStore';
import { useGlobalChatStore } from '../../system/store/globalChatStore';
import { Haptics } from '../../utils/haptics';
import CentralActionsMenu from './CentralActionsMenu';

/**
 * Configuration des boutons de la nouvelle barre inférieure
 */
const BOTTOM_BAR_BUTTONS = [
  {
    id: 'nutrition',
    label: 'Nutrition',
    icon: 'Utensils' as const,
    route: '/meals',
    color: '#10B981', // Vert nutrition
  },
  {
    id: 'activity',
    label: 'Activité',
    icon: 'Activity' as const,
    route: '/activity',
    color: '#3B82F6', // Bleu activité
  },
  {
    id: 'central',
    icon: 'Zap' as const,
    color: '#F7931E', // Logo Orange (mid gradient)
    isCentral: true,
  },
  {
    id: 'chat',
    icon: 'MessageSquare' as const,
    color: '#F7931E', // Logo Orange (même couleur que central)
    isChat: true,
  },
  {
    id: 'fasting',
    label: 'Jeûne',
    icon: 'Timer' as const,
    route: '/fasting',
    color: '#F59E0B', // Orange jeûne
  },
  {
    id: 'body',
    label: 'Corps',
    icon: 'Scan' as const,
    route: '/body-scan',
    color: '#A855F7', // Violet
  },
];

/**
 * Bouton de barre mobile
 */
function BarButton({
  button,
  active,
  onClick,
  hasUnread,
  unreadCount,
}: {
  button: typeof BOTTOM_BAR_BUTTONS[0];
  active: boolean;
  onClick: () => void;
  hasUnread?: boolean;
  unreadCount?: number;
}) {
  const handleClick = () => {
    if (button.isCentral) {
      centralButtonClick(!active);
    } else if (button.isChat) {
      Haptics.press();
    } else {
      bottomBarClick(button.color, active);
    }
    onClick();
  };

  const isBigButton = button.isCentral || button.isChat;
  const iconSize = isBigButton ? 28 : 20;

  return (
    <motion.button
      onClick={handleClick}
      className={`new-bottom-bar-button ${
        button.isCentral ? 'new-bottom-bar-button--central central-action-button' : ''
      } ${
        button.isChat ? 'new-bottom-bar-button--chat' : ''
      }`}
      style={{
        '--button-color': button.color,
        '--button-active': active ? '1' : '0'
      } as React.CSSProperties}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-current={active ? 'page' : undefined}
      aria-label={
        button.isCentral
          ? 'Ouvrir le menu d\'actions'
          : button.isChat
          ? 'Ouvrir le chat'
          : `Aller à ${button.label}`
      }
    >
      <div className={`new-bottom-bar-icon-container ${active ? 'new-bottom-bar-icon-container--active' : ''} ${button.isChat && hasUnread ? 'new-bottom-bar-icon-container--unread' : ''}`}>
        <SpatialIcon
          Icon={ICONS[button.icon]}
          size={iconSize}
          style={{
            color: active || (button.isChat && hasUnread) ? button.color : 'rgba(255, 255, 255, 0.5)',
            filter: button.isChat && hasUnread
              ? `drop-shadow(0 0 14px color-mix(in srgb, ${button.color} 60%, transparent))`
              : undefined
          }}
        />
      </div>
      {!isBigButton && (
        <div className={`new-bottom-bar-label ${active ? 'new-bottom-bar-label--active' : ''}`}>
          {button.label}
        </div>
      )}

      {/* Badge Count for chat unread messages */}
      {button.isChat && hasUnread && unreadCount && unreadCount > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="chat-notification-badge"
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              minWidth: '18px',
              height: '18px',
              padding: '0 5px',
              borderRadius: '9px',
              background: `radial-gradient(circle at 30% 30%, ${button.color} 0%, color-mix(in srgb, ${button.color} 80%, #000) 100%)`,
              border: '2px solid rgba(11, 14, 23, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: `0 0 16px color-mix(in srgb, ${button.color} 60%, transparent), 0 2px 8px rgba(0, 0, 0, 0.4)`,
              zIndex: 2
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.button>
  );
}

/**
 * New Mobile Bottom Bar - Barre de navigation inférieure redesignée
 * 6 boutons en pleine largeur avec bouton central pour actions rapides et bouton chat
 */
const NewMobileBottomBar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isOpen, toggle, close } = useOverlayStore();
  const centralMenuOpen = isOpen('centralMenu');

  const {
    isOpen: chatIsOpen,
    toggle: toggleChat,
    hasUnreadMessages,
    unreadCount
  } = useGlobalChatStore();

  const handleButtonClick = (button: typeof BOTTOM_BAR_BUTTONS[0]) => {
    if (button.isCentral) {
      toggle('centralMenu');
    } else if (button.isChat) {
      toggleChat();
    } else if (button.route) {
      navigate(button.route);
      close();
    }
  };

  const isButtonActive = (button: typeof BOTTOM_BAR_BUTTONS[0]) => {
    if (button.isCentral) return centralMenuOpen;
    if (button.isChat) return chatIsOpen;
    return button.route ? pathname.startsWith(button.route) : false;
  };

  return (
    <>
      <nav 
        className="new-mobile-bottom-bar" 
        aria-label="Navigation principale mobile"
        style={{
          position: 'fixed',
          bottom: 'var(--new-bottom-bar-bottom-offset)',
          left: '8px',
          right: '8px',
          zIndex: 9996,
        }}
      >
        <div className="new-mobile-bottom-bar-container">
          <div className="new-mobile-bottom-bar-buttons">
            {BOTTOM_BAR_BUTTONS.map((button) => (
              <BarButton
                key={button.id}
                button={button}
                active={isButtonActive(button)}
                onClick={() => handleButtonClick(button)}
                hasUnread={button.isChat ? hasUnreadMessages : undefined}
                unreadCount={button.isChat ? unreadCount : undefined}
              />
            ))}
          </div>
        </div>
      </nav>

    </>
  );
};

export default NewMobileBottomBar;