// src/app/shell/Header/Header.tsx
import React from 'react';
import { motion } from 'framer-motion';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useShell } from '../../../ui/shell/useShell';
import MobileDrawer from '../../../ui/shell/MobileDrawer';
import { HeaderLogo } from './HeaderLogo';
import { HeaderActions } from './HeaderActions';
import { useFeedback } from '../../../hooks';
import { BackButton } from '../../../ui/buttons';
import { useOverlayStore } from '../../../system/store/overlayStore';
import UserPanel from '../UserPanel';
import CentralActionsMenu from '../CentralActionsMenu';

export const Header = React.memo(() => {
  const { setDrawer } = useShell();
  const { click } = useFeedback();
  const { isOpen, toggle } = useOverlayStore();
  const centralMenuOpen = isOpen('centralMenu');
  const userPanelOpen = isOpen('userPanel');

  return (
    <>
      <header
        className="
          header-liquid-glass h-[64px] z-9997-important will-change-transform-important position-fixed-important transform-gpu-important isolation-isolate-important contain-layout-style-paint-important
          fixed top-2 left-4 right-4 z-[9999]
          rounded-glass-lg
          backdrop-blur-xl
          transition-all duration-300
        "
        style={{
          left: '24px',
          right: '24px',
          top: '8px',
          borderRadius: '20px',
          overflow: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransformStyle: 'preserve-3d',
          transformStyle: 'preserve-3d',
          WebkitPerspective: '1000px',
          perspective: '1000px',
        }}
        role="banner"
        aria-label="TwinForge Pont de Commandement"
      >
        <div className="w-full h-full flex items-center justify-between gap-2 px-4 md:px-6">
          {/* Left */}
          <div className="flex items-center gap-3" style={{ height: '100%' }}>
            {/* Bouton Retour - Référence visuelle */}
            <BackButton />
            <HeaderLogo />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Bouton Zap - Outils du Forgeron (desktop uniquement) */}
            <motion.button
              type="button"
              className="hidden lg:flex user-panel-toggle relative central-action-button"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'visible',
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center',
                background: centralMenuOpen
                  ? `radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.35) 0%, transparent 60%), linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(253, 200, 48, 0.15))`
                  : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 50%), rgba(255, 255, 255, 0.10)`,
                border: centralMenuOpen
                  ? '1px solid rgba(247, 147, 30, 0.4)'
                  : '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(16px) saturate(140%)',
                WebkitBackdropFilter: 'blur(16px) saturate(140%)',
                boxShadow: centralMenuOpen
                  ? `0 8px 24px rgba(0, 0, 0, 0.25), 0 2px 12px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 28px rgba(247, 147, 30, 0.4), 0 0 40px rgba(253, 200, 48, 0.2)`
                  : `0 8px 24px rgba(0, 0, 0, 0.25), 0 2px 12px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
                transition: 'transform 280ms cubic-bezier(0.25, 0.1, 0.25, 1), background 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                transform: 'translateZ(0)',
                willChange: 'transform, filter',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (window.matchMedia('(hover: hover)').matches && !centralMenuOpen) {
                  e.currentTarget.style.background = `
                    radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.25) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(255, 107, 53, 0.15), rgba(253, 200, 48, 0.1))
                  `;
                  e.currentTarget.style.borderColor = 'rgba(247, 147, 30, 0.3)';
                  e.currentTarget.style.boxShadow = `
                    0 8px 24px rgba(0, 0, 0, 0.25),
                    0 2px 12px rgba(0, 0, 0, 0.18),
                    inset 0 1px 0 rgba(255, 255, 255, 0.12),
                    0 0 20px rgba(247, 147, 30, 0.3),
                    0 4px 16px rgba(0,0,0,0.2)
                  `;
                }
              }}
              onMouseLeave={(e) => {
                if (window.matchMedia('(hover: hover)').matches && !centralMenuOpen) {
                  e.currentTarget.style.background = `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 50%),
                    rgba(255, 255, 255, 0.10)
                  `;
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.boxShadow = `
                    0 8px 24px rgba(0, 0, 0, 0.25),
                    0 2px 12px rgba(0, 0, 0, 0.18),
                    inset 0 1px 0 rgba(255, 255, 255, 0.12)
                  `;
                }
              }}
              aria-label="Ouvrir les outils du forgeron"
              aria-expanded={centralMenuOpen}
              aria-haspopup="menu"
              onPointerDown={() => click()}
              onClick={() => toggle('centralMenu')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  click();
                  toggle('centralMenu');
                }
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <SpatialIcon
                Icon={ICONS.Zap}
                size={20}
                style={{
                  color: centralMenuOpen ? '#FDC830' : 'rgba(255,255,255,0.9)',
                  filter: centralMenuOpen
                    ? 'drop-shadow(0 0 12px rgba(253, 200, 48, 0.6))'
                    : 'drop-shadow(0 0 8px rgba(247, 147, 30, 0.3))'
                }}
                aria-hidden="true"
              />
            </motion.button>

            {/* Profil */}
            <HeaderActions />

            {/* Bouton Hamburger (mobile seulement) - Menu de navigation */}
            <motion.button
              type="button"
              className="lg:hidden user-panel-toggle relative"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'visible',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 50%),
                  rgba(255, 255, 255, 0.10)
                `,
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(16px) saturate(140%)',
                WebkitBackdropFilter: 'blur(16px) saturate(140%)',
                boxShadow: `
                  0 8px 24px rgba(0, 0, 0, 0.25),
                  0 2px 12px rgba(0, 0, 0, 0.18),
                  inset 0 1px 0 rgba(255, 255, 255, 0.12)
                `,
                transition: 'transform 280ms cubic-bezier(0.25, 0.1, 0.25, 1), background 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                transform: 'translateZ(0)',
                willChange: 'transform, filter',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.background = `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
                    rgba(255, 255, 255, 0.10)
                  `;
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.boxShadow = `
                    0 8px 24px rgba(0, 0, 0, 0.25),
                    0 2px 12px rgba(0, 0, 0, 0.18),
                    inset 0 1px 0 rgba(255, 255, 255, 0.12),
                    0 0 20px rgba(255,255,255,0.15),
                    0 4px 16px rgba(0,0,0,0.2)
                  `;
                }
              }}
              onMouseLeave={(e) => {
                if (window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.background = `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, transparent 50%),
                    rgba(255, 255, 255, 0.10)
                  `;
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.boxShadow = `
                    0 8px 24px rgba(0, 0, 0, 0.25),
                    0 2px 12px rgba(0, 0, 0, 0.18),
                    inset 0 1px 0 rgba(255, 255, 255, 0.12)
                  `;
                }
              }}
              aria-label="Ouvrir le menu de navigation principal"
              aria-expanded="false"
              aria-haspopup="menu"
              onPointerDown={() => click()}
              onClick={() => setDrawer(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  click();
                  setDrawer(true);
                }
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <SpatialIcon
                Icon={ICONS.Menu}
                size={20}
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  filter: 'drop-shadow(0 0 8px rgba(247, 147, 30, 0.3))'
                }}
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </header>

      <MobileDrawer />
      <CentralActionsMenu isOpen={centralMenuOpen} onClose={() => {}} />
      <UserPanel isOpen={userPanelOpen} />
    </>
  );
});

Header.displayName = 'Header';