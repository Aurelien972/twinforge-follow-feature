import React, { useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShell } from './useShell';
import { Link } from '../../app/nav/Link';
import { ICONS } from '../icons/registry';
import SpatialIcon from '../icons/SpatialIcon';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../../system/store/userStore';
import { getCircuitColor } from '../theme/circuits';
import { navFor } from '../../app/shell/navigation';

const Section = React.memo(({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-white/60 text-xs uppercase tracking-wider font-medium mb-2 px-3" style={{ color: 'var(--brand-accent)' }}>
      {title}
    </h3>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
));
Section.displayName = 'Section';

const MobileDrawer = React.memo(() => {
  const { drawerOpen, setDrawer } = useShell();
  const location = useLocation();
  const navRef = React.useRef<HTMLElement>(null);


  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  // Body scroll lock - Empêche le scroll de la page principale quand la sidebar est ouverte
  useEffect(() => {
    if (drawerOpen) {
      // Sauvegarder l'état original du body
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;

      // Verrouiller le scroll du body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';

      return () => {
        // Restaurer l'état original
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = '';
        document.body.style.height = '';
      };
    }
  }, [drawerOpen]);

  const navSections = navFor();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDrawer(false)}
          />

          {/* Drawer */}
          <motion.nav
            ref={navRef}
            className="mobile-drawer fixed top-0 left-0 h-full w-[85vw] max-w-[340px] z-[9999] overflow-y-auto"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="navigation"
            aria-label="Navigation mobile"
          >
            <div className="p-6 space-y-6">
              {/* Header - Close button only */}
              <div className="flex items-center justify-end mb-2">
                <motion.button
                  onClick={() => setDrawer(false)}
                  className="mobile-drawer-close-btn"
                  aria-label="Fermer le menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SpatialIcon Icon={ICONS.X} size={20} className="text-white/90" />
                </motion.button>
              </div>

              {/* Navigation Sections */}
              {navSections.map((section, index) => (
                <Section key={index} title={section.title}>
                  {section.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`sidebar-item ${
                      isActive(item.to) ? 'sidebar-item--active' : ''
                    } group focus-ring ${
                      isActive(item.to)
                        ? 'text-white shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                    onClick={() => setDrawer(false)}
                    style={{ '--item-circuit-color': getCircuitColor(item.to) } as React.CSSProperties}
                  >
                    {/* Icon container with glass pill effect */}
                    <div className={`sidebar-item-icon-container ${
                      isActive(item.to) ? 'sidebar-item-icon-container--active' : ''
                    }`}>
                      <SpatialIcon
                        Icon={ICONS[item.icon]}
                        size={16}
                        className={`sidebar-item-icon ${isActive(item.to) ? '' : 'opacity-80 group-hover:opacity-100'}`}
                        color={isActive(item.to) ? getCircuitColor(item.to) : undefined}
                        style={isActive(item.to) ? {
                          color: getCircuitColor(item.to),
                          filter: `drop-shadow(0 0 8px ${getCircuitColor(item.to)}60)`
                        } : undefined}
                      />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div className={`sidebar-item-label font-medium text-xs truncate ${
                        isActive(item.to) ? 'text-white' : 'text-white/82'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`sidebar-item-subtitle text-xxs truncate mt-0 ${
                        isActive(item.to) ? 'text-white/70' : 'text-white/50'
                      }`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </Link>
                  ))}
                </Section>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
});

MobileDrawer.displayName = 'MobileDrawer';

export default MobileDrawer;
