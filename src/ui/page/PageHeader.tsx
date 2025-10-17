import React from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../icons/registry';
import SpatialIcon from '../icons/SpatialIcon';
import { CIRCUIT_COLORS, type CircuitKey } from '../theme/circuits';

// Hook pour détecter mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

type Props = {
  icon?: keyof typeof ICONS;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  circuit?: CircuitKey;
  iconColor?: string;
};

export default function PageHeader({
  icon = 'Home',
  title,
  subtitle,
  actions,
  className = '',
  circuit = 'home',
  iconColor
}: Props) {
  const isMobile = useIsMobile();

  // Gestion spéciale pour certains circuits
  const finalIcon = (() => {
    if (circuit === 'track') return ICONS.Target;
    return ICONS[icon];
  })();

  // Utiliser la couleur spécifique ou celle du circuit
  const finalCircuitColor = iconColor || CIRCUIT_COLORS[circuit];

  // Taille de l'icône: beaucoup plus grande sur mobile pour remplir le conteneur
  const iconSize = isMobile ? 72 : 56;
  
  return (
    <header
      className={`pt-6 md:pt-8 mb-4 md:mb-6 will-change-transform-important ${className}`}
      role="banner"
      aria-labelledby="page-title"
    >
      <div className="flex flex-row items-center gap-6 mb-8">
        {/* Icône avec effet de glow renforcé */}
        <div
          className="breathing-icon flex-shrink-0"
          style={{
            '--animation-duration-slower': '5s'
          }}
        >
          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg"
            style={{
              '--header-icon-radius': '24px',
              borderRadius: 'var(--header-icon-radius)',
              WebkitMaskImage: 'radial-gradient(white, black)',
              maskImage: 'radial-gradient(white, black)',
              background: `
                radial-gradient(circle at 30% 30%, color-mix(in srgb, ${finalCircuitColor} 40%, transparent) 0%, transparent 60%),
                radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--brand-primary) 35%, transparent) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, color-mix(in srgb, ${finalCircuitColor} 25%, transparent) 0%, transparent 70%),
                rgba(255, 255, 255, 0.15)
              `,
              border: `2px solid color-mix(in srgb, ${finalCircuitColor} 60%, transparent)`,
              boxShadow: `
                0 16px 64px color-mix(in srgb, ${finalCircuitColor} 45%, transparent),
                0 0 100px color-mix(in srgb, ${finalCircuitColor} 35%, transparent),
                0 0 160px color-mix(in srgb, var(--brand-primary) 25%, transparent),
                inset 0 4px 0 rgba(255, 255, 255, 0.3),
                inset 0 -3px 0 rgba(0, 0, 0, 0.15)
              `,
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              willChange: 'transform, box-shadow',
              transform: 'translateZ(0)',
            }}
            role="img"
            aria-label={`Icône de la page ${title}`}
          >
            <SpatialIcon
              Icon={finalIcon}
              size={iconSize}
              variant="pure"
              className="text-white relative z-10"
              style={{
                color: finalCircuitColor,
                filter: `drop-shadow(0 0 30px color-mix(in srgb, ${finalCircuitColor} 90%, transparent)) drop-shadow(0 0 60px color-mix(in srgb, ${finalCircuitColor} 60%, transparent))`,
                textShadow: `0 0 40px color-mix(in srgb, ${finalCircuitColor} 80%, transparent), 0 0 80px color-mix(in srgb, var(--brand-primary) 40%, transparent)`
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Titre et sous-titre alignés à gauche */}
        <div className="space-y-2 text-left flex-1 min-w-0">
          <h1
            id="page-title"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white page-header-title"
            style={{
              color: 'var(--text-primary)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              textShadow: `0 0 40px color-mix(in srgb, ${finalCircuitColor} 50%, transparent)`,
              lineHeight: '1.2'
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed page-header-subtitle"
              style={{
                color: `color-mix(in srgb, #E5E7EB 90%, ${finalCircuitColor} 10%)`,
                textShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                lineHeight: '1.4'
              }}
              aria-describedby="page-title"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      {actions && (
        <div className="mt-3 md:mt-4 flex justify-center" role="group" aria-label="Actions de la page">
          {actions}
        </div>
      )}
    </header>
  );
}