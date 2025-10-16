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

  // State for expanded forge menus
  const [expandedForges, setExpandedForges] = React.useState<Record<string, boolean>>({});

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

  // Memoize navSections to prevent re-renders
  const navSections = useMemo(() => navFor(), []);

  // Auto-expand menu if user is on a sub-page and close others
  React.useEffect(() => {
    const currentPath = location.pathname;
    const newExpandedState: Record<string, boolean> = {};

    navSections.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems && item.subItems.length > 0) {
          const hasActiveSubItem = item.subItems.some(subItem => {
            const subPath = subItem.to.split('#')[0];
            return currentPath === subPath;
          });

          // If this item has an active sub-item, expand it
          if (hasActiveSubItem) {
            newExpandedState[item.to] = true;
          } else {
            newExpandedState[item.to] = false;
          }
        }
      });
    });

    setExpandedForges(newExpandedState);
  }, [location.pathname, navSections]);

  // Handle toggle expand for forge items with auto-close others
  const handleToggleExpand = useCallback((itemTo: string) => {
    setExpandedForges(prev => {
      const isCurrentlyExpanded = prev[itemTo];

      // If closing the current item, just toggle it
      if (isCurrentlyExpanded) {
        return {
          ...prev,
          [itemTo]: false
        };
      }

      // If opening, close all others and open this one
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      newState[itemTo] = true;

      return newState;
    });
  }, []);

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
            <div className="py-4 pl-4 pr-2 space-y-6">
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
                  {section.items.map((item) => {
                    const hasSubItems = item.subItems && item.subItems.length > 0;

                    // Check if any sub-item is active
                    const hasActiveSubItem = hasSubItems && item.subItems.some(subItem => {
                      const subPath = subItem.to.split('#')[0];
                      const subHash = subItem.to.split('#')[1];
                      const currentPath = location.pathname;
                      const currentHash = location.hash.replace('#', '') || 'daily';
                      return currentPath === subPath && (!subHash || currentHash === subHash);
                    });

                    const handleNavItemClick = (e: React.MouseEvent) => {
                      if (hasSubItems) {
                        e.preventDefault();
                        handleToggleExpand(item.to);
                      } else {
                        setDrawer(false);
                      }
                    };

                    return (
                      <div key={item.to} className="relative sidebar-nav-item-container">
                        <Link
                          to={item.to}
                          className={`sidebar-item ${
                            hasSubItems ? 'sidebar-item--with-submenu' : ''
                          } group focus-ring ${
                            isActive(item.to) || hasActiveSubItem
                              ? 'text-white shadow-sm'
                              : 'text-white/70 hover:text-white'
                          }`}
                          onClick={handleNavItemClick}
                          style={{ '--item-circuit-color': getCircuitColor(item.to) } as React.CSSProperties}
                        >
                          {/* Icon container with glass pill effect */}
                          <div className={`sidebar-item-icon-container ${
                            isActive(item.to) || hasActiveSubItem ? 'sidebar-item-icon-container--active' : ''
                          }`}>
                            <SpatialIcon
                              Icon={ICONS[item.icon]}
                              size={16}
                              className={`sidebar-item-icon ${isActive(item.to) || hasActiveSubItem ? '' : 'opacity-80 group-hover:opacity-100'}`}
                              color={isActive(item.to) || hasActiveSubItem ? getCircuitColor(item.to) : undefined}
                              style={isActive(item.to) || hasActiveSubItem ? {
                                color: getCircuitColor(item.to),
                                filter: `drop-shadow(0 0 8px ${getCircuitColor(item.to)}60)`
                              } : undefined}
                            />
                          </div>

                          {/* Text content */}
                          <div className="flex-1 min-w-0">
                            <div className={`sidebar-item-label font-medium text-xs truncate ${
                              isActive(item.to) || hasActiveSubItem ? 'text-white' : 'text-white/82'
                            }`}>
                              {item.label}
                            </div>
                            <div className={`sidebar-item-subtitle text-xxs truncate mt-0 ${
                              isActive(item.to) || hasActiveSubItem ? 'text-white/70' : 'text-white/50'
                            }`}>
                              {item.subtitle}
                            </div>
                          </div>
                        </Link>

                        {/* Sub-items menu */}
                        {hasSubItems && (
                          <div
                            className={`sidebar-submenu ${expandedForges[item.to] ? 'sidebar-submenu--expanded' : ''}`}
                            role="group"
                            aria-label={`Sous-menu ${item.label}`}
                          >
                            <div className="sidebar-submenu-inner">
                              {item.subItems.map((subItem) => {
                                const SubIcon = ICONS[subItem.icon];
                                const subPath = subItem.to.split('#')[0];
                                const subHash = subItem.to.split('#')[1];
                                const currentPath = location.pathname;
                                const currentHash = location.hash.replace('#', '') || 'daily';
                                const isSubActive = currentPath === subPath && (!subHash || currentHash === subHash);

                                return (
                                  <Link
                                    key={subItem.to}
                                    to={subItem.to}
                                    className={`
                                      sidebar-submenu-item
                                      ${subItem.isPrimarySubMenu ? 'sidebar-submenu-item--primary' : 'sidebar-submenu-item--secondary'}
                                      ${isSubActive ? 'sidebar-submenu-item--active' : ''}
                                      focus-ring
                                    `}
                                    onClick={() => setDrawer(false)}
                                    aria-current={isSubActive ? 'page' : undefined}
                                    style={{ '--item-circuit-color': getCircuitColor(item.to) } as React.CSSProperties}
                                  >
                                    <div className={`sidebar-submenu-item-icon-container ${isSubActive ? 'sidebar-submenu-item-icon-container--active' : ''}`}>
                                      <SpatialIcon
                                        Icon={SubIcon}
                                        size={subItem.isPrimarySubMenu ? 16 : 14}
                                        className="sidebar-submenu-item-icon"
                                      />
                                    </div>
                                    <span className="sidebar-submenu-item-label">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
