import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '../nav/Link';
import { ICONS } from '../../ui/icons/registry';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { useUserStore } from '../../system/store/userStore';
import { getCircuitColor } from '../../ui/theme/circuits';
import { navFor } from './navigation';
import { useFeedback } from '@/hooks';
import logger from '../../lib/utils/logger';

interface NavItemProps {
  to: string;
  icon: keyof typeof ICONS;
  label: string;
  subtitle: string;
  actionLabel?: string;
  isPrimary?: boolean;
  isTwin?: boolean;
  isForge?: boolean;
  isActive?: boolean;
  circuitColor?: string;
  tabs?: string[];
}

const NavItem = React.memo(({
  to,
  icon,
  label,
  subtitle,
  actionLabel,
  isPrimary = false,
  isTwin = false,
  isForge = false,
  isActive,
  circuitColor,
  tabs
}: NavItemProps) => {
  const Icon = ICONS[icon];
  const itemColor = circuitColor || getCircuitColor(to);
  const { sidebarClick } = useFeedback();

  const handleNavItemClick = (e: React.MouseEvent) => {
    logger.trace('SIDEBAR', 'NavItem click captured', { to, label, isActive });
    logger.trace('SIDEBAR', 'NavItem click triggered', { to, label, currentPath: window.location.pathname });
  };

  // Déterminer la classe CSS en fonction du type
  let itemClass = 'sidebar-item';
  if (isPrimary) {
    itemClass = 'sidebar-item sidebar-item--primary';
  } else if (isTwin) {
    itemClass = 'sidebar-item sidebar-item--twin';
  } else if (isForge) {
    itemClass = 'sidebar-item sidebar-item--forge';
  }

  return (
    <div className="relative">
      <Link
        to={to}
        className={`
          ${itemClass}
          group focus-ring
          ${isActive
            ? 'text-white shadow-sm'
            : 'text-white/70 hover:text-white'
          }
        `}
        onClick={handleNavItemClick}
        onPointerDown={(e) => {
          logger.trace('SIDEBAR', 'NavItem pointer down', { to, label });
        }}
        onMouseDown={(e) => {
          logger.trace('SIDEBAR', 'NavItem mouse down', { to, label });
        }}
        aria-current={isActive ? 'page' : undefined}
        style={{ '--item-circuit-color': itemColor } as React.CSSProperties}
      >
        {/* Icon container with glass pill effect */}
        <div className={`sidebar-item-icon-container ${isActive ? 'sidebar-item-icon-container--active' : ''}`}>
          <SpatialIcon
            Icon={Icon}
            size={isPrimary ? 22 : isTwin ? 20 : 18}
            className={`sidebar-item-icon ${isActive ? '' : 'opacity-80 group-hover:opacity-100'}`}
            color={isActive ? itemColor : undefined}
            style={isActive ? {
              color: itemColor,
              filter: `drop-shadow(0 0 8px ${itemColor}60)`
            } : undefined}
          />
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className={`sidebar-item-label font-medium ${
            isPrimary ? 'text-base' : isTwin ? 'text-sm' : 'text-xs'
          } truncate ${
            isActive ? 'text-white' : 'text-white/82'
          }`}>
            {label}
          </div>
          <div className={`sidebar-item-subtitle text-xxs truncate ${isPrimary ? 'mt-0.5' : 'mt-0'} ${
            isActive ? 'text-white/70' : 'text-white/50'
          }`}>
            {subtitle}
          </div>
        </div>

        {/* Badge d'action pour les forges */}
        {isForge && actionLabel && (
          <div
            className={`sidebar-item-action-badge ${isActive ? 'sidebar-item-action-badge--active' : ''}`}
          >
            {actionLabel}
          </div>
        )}
      </Link>
    </div>
  );
});
NavItem.displayName = 'NavItem';

const Section = ({
  title,
  type,
  children
}: {
  title: string;
  type?: 'primary' | 'twin' | 'forge-category';
  children: React.ReactNode
}) => {
  // Pas d'espacement avant pour primary et twin (premières sections)
  const shouldHaveTopSpace = type === 'forge-category';

  return (
    <div className={`space-y-1 ${shouldHaveTopSpace ? 'mt-4' : ''}`}>
      {title && (
        <>
          {/* Séparateur visuel pour les catégories de forges */}
          {type === 'forge-category' && (
            <div className="sidebar-category-separator" />
          )}
          <h3
            className={`sidebar-section-title ${getSectionClass(title, type)}`}
            role="heading"
            aria-level="3"
          >
            {title}
          </h3>
        </>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

/**
 * Get section-specific CSS class for visual differentiation
 */
function getSectionClass(title: string, type?: string): string {
  if (type === 'forge-category') {
    return 'sidebar-section--forge-category';
  }

  // Classes legacy pour compatibilité
  switch (title) {
    case 'Rituels du Forgeron':
      return 'sidebar-section--daily-tracking';
    case 'Ateliers du Forgeron':
      return 'sidebar-section--forge-tools';
    case 'Mon Profil':
      return 'sidebar-section--profile';
    default:
      return '';
  }
}

const Sidebar = React.memo(({ className = '' }: { className?: string }) => {
  const location = useLocation();
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);
  
  // Log sidebar render
  React.useEffect(() => {
    logger.trace('SIDEBAR', 'Component rendered', { currentPath: location.pathname });
  }, [location.pathname]);

  // Get navigation structure
  const navigation = navFor();

  return (
    <aside
      className={`hidden lg:flex flex-col ${className}
        sticky top-[88px] left-0
        h-[calc(100dvh-104px)]
        w-full
        sidebar-glass-enhanced rounded-2xl visionos-grid
      `}
      role="complementary"
      aria-label="Main navigation"
    >
      <div className="sidebar-content space-y-2 flex-1 pt-2">

        {/* Navigation Dynamique avec 3 Niveaux Hiérarchiques */}
        {navigation.map((section) => (
          <Section key={section.title || section.type} title={section.title} type={section.type}>
            {section.items.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                subtitle={item.subtitle}
                actionLabel={item.actionLabel}
                isPrimary={item.isPrimary}
                isTwin={item.isTwin}
                isForge={item.isForge}
                isActive={isActive(item.to)}
                circuitColor={item.circuitColor}
                tabs={item.tabs}
              />
            ))}
          </Section>
        ))}
      </div>
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';


export default Sidebar;
