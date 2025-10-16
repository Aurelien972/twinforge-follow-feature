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
 * 7 boutons : 3 à gauche - 1 central (éclair) - 3 à droite
 * Le bouton de chat est maintenant flottant au-dessus de la bottom bar
 */
const BOTTOM_BAR_BUTTONS = [
  {
    id: 'meal-scan',
    label: 'Repas',
    icon: 'Utensils' as const,
    route: '/meals/scan',
    color: '#10B981', // Vert nutrition
  },
  {
    id: 'fridge-scan',
    label: 'Frigo',
    icon: 'Refrigerator' as const,
    route: '/fridge/scan',
    color: '#14B8A6', // Turquoise
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
    id: 'fasting',
    label: 'Jeûne',
    icon: 'Timer' as const,
    route: '/fasting',
    color: '#F59E0B', // Orange jeûne
  },
  {
    id: 'training',
    label: 'Coaching',
    icon: 'Dumbbell' as const,
    route: '/training',
    color: '#EC4899', // Rose coaching
  },
  {
    id: 'twin',
    label: 'Twin',
    icon: 'User' as const,
    route: '/avatar',
    color: '#8B5CF6', // Violet
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
    } else {
      bottomBarClick(button.color, active);
    }
    onClick();
  };

  const isBigButton = button.isCentral;
  const iconSize = isBigButton ? 28 : 20;

  return (
    <motion.button
      onClick={handleClick}
      className={`new-bottom-bar-button ${
        button.isCentral ? 'new-bottom-bar-button--central central-action-button' : ''
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
          : `Aller à ${button.label}`
      }
    >
      <div className={`new-bottom-bar-icon-container ${active ? 'new-bottom-bar-icon-container--active' : ''}`}>
        <SpatialIcon
          Icon={ICONS[button.icon]}
          size={iconSize}
          style={{
            color: active ? button.color : 'rgba(255, 255, 255, 0.5)'
          }}
        />
      </div>
      {!isBigButton && (
        <div className={`new-bottom-bar-label ${active ? 'new-bottom-bar-label--active' : ''}`}>
          {button.label}
        </div>
      )}
    </motion.button>
  );
}

/**
 * New Mobile Bottom Bar - Barre de navigation inférieure redesignée
 * 7 boutons : Scanner Repas - Scanner Frigo - Activité - ACTION (éclair) - Jeûne - Coaching - Twin 3D
 * Le bouton de chat est maintenant flottant au-dessus du coin droit de la bottom bar
 */
const NewMobileBottomBar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isOpen, toggle, close } = useOverlayStore();
  const centralMenuOpen = isOpen('centralMenu');

  const handleButtonClick = (button: typeof BOTTOM_BAR_BUTTONS[0]) => {
    if (button.isCentral) {
      toggle('centralMenu');
    } else if (button.route) {
      navigate(button.route);
      close();
    }
  };

  const isButtonActive = (button: typeof BOTTOM_BAR_BUTTONS[0]) => {
    if (button.isCentral) return centralMenuOpen;
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
              />
            ))}
          </div>
        </div>
      </nav>

    </>
  );
};

export default NewMobileBottomBar;