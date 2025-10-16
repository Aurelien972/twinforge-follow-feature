// src/app/components/CentralActionsMenu.tsx
import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';
import { useFeedback } from '../../hooks/useFeedback';
import { forgeStrike, tileClick, pillClick, homeClick, panelClose } from '../../audio/effects/forgeronSounds';
import { useOverlayStore, Z_INDEX } from '../../system/store/overlayStore';
import { QUICK_ACTION_SECTIONS, type QuickAction } from '../../config/quickActionsConfig';
import logger from '../../lib/utils/logger';

/* Utils */
function hexToRgbArray(hex: string): [number, number, number] {
  const h = (hex || '#999999').replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

/** Sélection de section tolérante (clé ou titre) */
function pickSection(
  sections: { key?: string; title: string; actions: QuickAction[] }[],
  keys: string[],
  titleIncludes: string[]
) {
  const byKey = sections.find((s) => s.key && keys.includes(s.key));
  if (byKey) return byKey;
  const lowerInc = titleIncludes.map((t) => t.toLowerCase());
  return sections.find((s) => lowerInc.some((inc) => s.title?.toLowerCase?.().includes(inc)));
}

interface CentralActionsMenuProps {
  isOpen: boolean;
  onClose: () => void; // conservé pour compatibilité
}

/**
 * CentralActionsMenu
 * - Outils de Suivi : tuiles 2×2 (grandes cartes)
 * - Atelier des Saveurs : petits boutons (pills) 2×2 — même style que "Générateur d'Entraînement"
 * - Atelier Workout : petits boutons (pills)
 */
const CentralActionsMenu: React.FC<CentralActionsMenuProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { click, success } = useFeedback();
  const { close: closeOverlay } = useOverlayStore();

  const trackingSection =
    pickSection(QUICK_ACTION_SECTIONS, ['tracking'], ['outils de suivi', 'suivi']) ??
    { title: 'Outils de Suivi', actions: [] };

  const flavorsSection =
    pickSection(QUICK_ACTION_SECTIONS, ['flavors', 'saveurs'], ['atelier des saveurs', 'saveurs']) ??
    { title: 'Atelier des Saveurs', actions: [] };

  const workoutSection =
    pickSection(QUICK_ACTION_SECTIONS, ['workout'], ['atelier workout', 'workout']) ??
    { title: 'Atelier Workout', actions: [] };

  const homeSection =
    pickSection(QUICK_ACTION_SECTIONS, ['navigation', 'home', 'main'], ['navigation', 'accueil']) ??
    { title: 'Navigation', actions: [] };

  const homeAction =
    homeSection.actions.find(
      (a) =>
        ['home', 'dashboard', 'root'].includes(a.id) ||
        /accueil|home|cœur|coeur|coeur de la forge|forge/i.test(a.label)
    ) || null;

  const handleActionClick = (action: QuickAction, isTile: boolean = false, event?: React.MouseEvent) => {
    if (!action?.available) {
      logger.warn('CENTRAL_ACTIONS', 'Action not available', { actionId: action?.id });
      return;
    }

    logger.info('CENTRAL_ACTIONS', 'Action clicked', {
      actionId: action.id,
      actionLabel: action.label,
      route: action.route,
      hasEvent: !!event
    });

    // Play appropriate sound based on action type
    if (action.id === 'home') {
      homeClick();
    } else if (isTile) {
      tileClick(action.color);
    } else {
      pillClick(action.color);
    }

    // Close overlay first for immediate feedback
    closeOverlay();

    // Then handle navigation or custom action
    if (action.route) {
      logger.info('CENTRAL_ACTIONS', 'Navigating to route', {
        actionId: action.id,
        actionLabel: action.label,
        route: action.route,
        timestamp: new Date().toISOString(),
      });

      // Use setTimeout to ensure overlay closes before navigation
      setTimeout(() => {
        logger.info('CENTRAL_ACTIONS', 'Executing navigation', { route: action.route });
        navigate(action.route!);
      }, 100);
    } else if (typeof action.onClick === 'function') {
      action.onClick();
    }
  };

  /** Play opening sound */
  React.useEffect(() => {
    if (isOpen) {
      forgeStrike();
    } else {
      panelClose();
    }
  }, [isOpen]);

  /** Fermer au clic extérieur & ESC */
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      // Ignore if clicking on action buttons inside the menu
      const target = e.target as HTMLElement;
      if (target.closest('button[role="menuitem"]')) {
        return;
      }

      const centralButtons = document.querySelectorAll('.central-action-button, .user-panel-toggle');
      const actionMenu = document.querySelector('.central-actions-menu');

      let clickedOnToggle = false;
      centralButtons.forEach(btn => {
        if (btn.contains(e.target as Node)) {
          clickedOnToggle = true;
        }
      });

      if (!clickedOnToggle && actionMenu && !actionMenu.contains(e.target as Node)) {
        closeOverlay();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOverlay]);

  const springy = reduceMotion
    ? { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as any }
    : { type: 'spring' as const, stiffness: 280, damping: 22, mass: 0.9 };

  /** Grandes tuiles (suivi) */
  const PrimaryTile: React.FC<{ action: QuickAction; index: number }> = ({ action, index }) => {
    const [r, g, b] = hexToRgbArray(action.color || '#7A5AF8');
    return (
      <motion.button
        key={action.id}
        onClick={(e) => handleActionClick(action, true, e)}
        className="glass-card rounded-2xl p-2 text-left overflow-hidden"
        style={{
          minHeight: 72,
          background: 'var(--glass-opacity-base)',
          border: `1px solid rgba(${r}, ${g}, ${b}, 0.28)`,
          boxShadow:
            '0 8px 26px rgba(0,0,0,0.25), 0 0 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15)'
        }}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...springy, delay: reduceMotion ? 0 : index * 0.04 }}
        whileHover={reduceMotion ? {} : { scale: 1.02, y: -2 }}
        whileTap={reduceMotion ? {} : { scale: 0.98 }}
        role="menuitem"
        aria-label={action.description || action.label}
      >
        <div className="flex items-start gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.35), rgba(${r}, ${g}, ${b}, 0.2))`,
              border: `1px solid rgba(${r}, ${g}, ${b}, 0.45)`,
              borderRadius: '0.75rem',
              overflow: 'hidden'
            }}
          >
            <SpatialIcon Icon={ICONS[action.icon]} size={18} style={{ color: action.color }} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-white font-semibold text-[12px] leading-tight">
              {action.label}
            </div>
            {action.subtitle && (
              <div className="text-white/70 text-[10px] leading-tight mt-0.5 w-full">
                {action.subtitle}
              </div>
            )}
          </div>
        </div>
      </motion.button>
    );
  };

  /** Petits boutons (pills) — style identique Workout */
  const SecondaryPill: React.FC<{ action: QuickAction; index: number }> = ({ action, index }) => {
    const [r, g, b] = hexToRgbArray(action.color || '#18E3FF');
    return (
      <motion.button
        key={action.id}
        onClick={(e) => handleActionClick(action, false, e)}
        className="glass-card rounded-xl px-2 py-1.5 flex items-center gap-1.5 w-full"
        style={{
          background: 'var(--glass-opacity-base)',
          border: `1px solid rgba(${r}, ${g}, ${b}, 0.24)`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 14px rgba(0,0,0,0.18)'
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springy, delay: reduceMotion ? 0 : index * 0.05 }}
        whileHover={reduceMotion ? {} : { y: -1, scale: 1.02 }}
        whileTap={reduceMotion ? {} : { scale: 0.98 }}
        role="menuitem"
        aria-label={action.description || action.label}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.3), rgba(${r}, ${g}, ${b}, 0.18))`,
            border: `1px solid rgba(${r}, ${g}, ${b}, 0.4)`,
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}
        >
          <SpatialIcon Icon={ICONS[action.icon]} size={13} style={{ color: action.color }} />
        </div>
        <span className="text-[11px] font-semibold text-white leading-tight break-words flex-1 text-left">
          {action.label}
        </span>
      </motion.button>
    );
  };

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  const isDesktop = window.innerWidth >= 1024;

  const animationVariants = {
    initial: {
      opacity: 0,
      scale: 0.88,
      y: isMobile || isTablet ? 32 : -32
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: 0.90,
      y: isMobile || isTablet ? 24 : -24
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="central-actions-menu fixed"
          style={{
            zIndex: Z_INDEX.CENTRAL_MENU,
            transformOrigin: isDesktop ? 'top right' : 'bottom center',
            overflow: 'visible',
            // Dynamic positioning based on device
            ...(isMobile ? {
              bottom: 'calc(var(--new-bottom-bar-height) + var(--new-bottom-bar-bottom-offset) + 12px)',
              left: '8px',
              right: '8px',
              width: 'auto',
              maxHeight: 'calc(100vh - var(--new-bottom-bar-height) - var(--new-bottom-bar-bottom-offset) - 96px)'
            } : isTablet ? {
              bottom: 'calc(var(--new-bottom-bar-height) + var(--new-bottom-bar-bottom-offset) + 16px)',
              left: '16px',
              right: '16px',
              width: 'auto',
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(100vh - var(--new-bottom-bar-height) - var(--new-bottom-bar-bottom-offset) - 120px)'
            } : {
              top: '80px',
              right: '24px',
              left: 'auto',
              width: '400px',
              maxHeight: 'calc(100vh - 120px)'
            })
          }}
          initial={animationVariants.initial}
          animate={animationVariants.animate}
          exit={animationVariants.exit}
          transition={springy}
          role="dialog"
          aria-label="Actions rapides"
          aria-modal="true"
        >
          {/* PANEL - Ultra-transparent Liquid Glass */}
          <div
            className="rounded-3xl overflow-hidden relative central-actions-panel liquid-glass-premium max-h-[inherit]"
            style={{
              padding: 12,
              isolation: 'isolate'
            }}
          >
            {/* Inner scroll container */}
            <div className="central-actions-scroll-container"
              style={{
                maxHeight: 'inherit',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3 px-1.5">
              <div className="flex items-center gap-2">
                <div aria-hidden className="h-1.5 w-10 rounded-full bg-white/40" />
                <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">
                  Outils du Forgeron
                </span>
              </div>

              {homeAction && (
                <button
                  onClick={(e) => handleActionClick(homeAction, false, e)}
                  className="glass-card rounded-full px-3 py-1.5 flex items-center gap-1.5"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 60%),
                      radial-gradient(circle at 70% 70%, rgba(247, 147, 30, 0.15) 0%, transparent 65%),
                      var(--liquid-pill-bg)
                    `,
                    border: '1px solid rgba(247, 147, 30, 0.35)',
                    boxShadow: `
                      0 2px 8px rgba(247, 147, 30, 0.15),
                      0 0 16px rgba(247, 147, 30, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.15)
                    `
                  }}
                >
                  <SpatialIcon
                    Icon={ICONS.Home}
                    size={14}
                    style={{
                      color: '#FDC830',
                      filter: 'drop-shadow(0 0 4px rgba(253, 200, 48, 0.5))'
                    }}
                  />
                  <span className="text-[11px] font-semibold" style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}>Tableau de Bord</span>
                </button>
              )}
            </div>

            {/* OUTILS DE SUIVI — grandes tuiles 2×2 */}
            {trackingSection.actions.length > 0 && (
              <div>
                <div className="px-1.5 mb-2">
                  <h4 className="text-white/70 text-[10px] uppercase tracking-wider font-semibold">
                    Outils de suivi
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {trackingSection.actions.map((a, i) => (
                    <PrimaryTile key={a.id} action={a} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* ATELIER DES SAVEURS — pills 2×2 (petits boutons) */}
            {flavorsSection.actions.length > 0 && (
              <div className="mt-4">
                <div className="px-1.5 mb-2">
                  <h4 className="text-white/70 text-[10px] uppercase tracking-wider font-semibold">
                    Atelier des Saveurs
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {flavorsSection.actions.map((a, i) => (
                    <SecondaryPill key={a.id} action={a} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* ATELIER WORKOUT — pills (2 par ligne si + d'un) */}
            {workoutSection.actions.length > 0 && (
              <div className="mt-4">
                <div className="px-1.5 mb-2">
                  <h4 className="text-white/70 text-[10px] uppercase tracking-wider font-semibold">
                    Atelier Workout
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {workoutSection.actions.map((a, i) => (
                    <SecondaryPill key={a.id} action={a} index={i} />
                  ))}
                </div>
              </div>
            )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CentralActionsMenu;