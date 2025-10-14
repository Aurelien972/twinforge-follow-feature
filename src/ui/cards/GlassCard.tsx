// src/ui/cards/GlassCard.tsx
import * as React from "react";
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { HoverEffectManager, supportsAdvancedHover } from './cardUtils';
import { useFeedback } from '../../hooks/useFeedback';

type GlassCardProps = React.PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  interactive?: boolean;
  elevation?: 'sm' | 'md' | 'lg';
  onClick?: React.MouseEventHandler;
  role?: string;
  tabIndex?: number;
  disabled?: boolean;
  type?: 'button' | 'submit';
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-busy'?: boolean;
  'aria-disabled'?: boolean;
  'aria-pressed'?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  style?: React.CSSProperties;
  circuit?: string;
  variant?: string;
  isParent?: boolean;
  size?: 'sm' | 'base' | 'lg';
  /** Désactive le halo "projecteur" global, on garde juste un sheen local propre */
  spotlight?: boolean;
  /** Active/Désactive le petit sheen local sur la carte */
  sheen?: boolean;
}>;

const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const GlassCard = React.forwardRef<HTMLElement, GlassCardProps>(({
  className,
  as = 'div',
  interactive = true,
  elevation = 'md',
  children,
  disabled = false,
  size = 'base',
  spotlight = false,
  sheen = true,
  onPointerDown,
  style,
  ...rest
}, ref) => {
  const Comp: any = (motion as any)[as] ?? motion.div;
  const reduceMotion = useReducedMotion();
  const { glassClick } = useFeedback();

  // Get performance-optimized hover effect class
  const [hoverEffectClass, setHoverEffectClass] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (ref && 'current' in ref && ref.current && supportsAdvancedHover()) {
      const effectClass = HoverEffectManager.getInstance().getEffectClass(ref.current);
      setHoverEffectClass(effectClass);
    }
  }, [ref]);

  // ACIER SUR VERRE - Enhanced pointer down handler with forge-specific audio
  const handlePointerDown = (e: React.PointerEvent) => {
    // console.log('🔊 AUDIO_DEBUG: GlassCard pointerDown', {
    //   disabled,
    //   interactive,
    //   eventType: e.type,
    //   timestamp: new Date().toISOString()
    // });
    
    if (!disabled && interactive) {
      glassClick(); // Son forge spécifique aux éléments en acier sur verre
    }
    onPointerDown?.(e);
  };

  // CRITICAL: Désactiver les animations sur mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const shouldAnimate = !reduceMotion && !isMobile;

  const handleMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!interactive || !hasFinePointer() || disabled || !sheen || isMobile) return;
      
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      // Mettre à jour les variables CSS pour le sheen
      el.style.setProperty('--mx', String(px));
      el.style.setProperty('--my', String(py));
      el.style.setProperty('--sheen-size', 'var(--glass-sheen-size)');
    },
    [interactive, disabled, sheen, isMobile]
  );

  const handleEnter = React.useCallback((e: React.MouseEvent) => {
    if (!interactive || !hasFinePointer() || disabled || !sheen || isMobile) return;
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty('--sheen-visible', '1');
  }, [interactive, disabled, sheen, isMobile]);

  const handleLeave = React.useCallback((e: React.MouseEvent) => {
    if (!interactive || disabled || !sheen || isMobile) return;
    const el = e.currentTarget as HTMLElement;
    el.style.removeProperty('--sheen-visible');
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }, [interactive, disabled, sheen, isMobile]);

  // Interactions desktop uniquement
  const interactiveDesktop = interactive && hasFinePointer() && !disabled && shouldAnimate;

  const sizeClasses = {
    sm: 'p-3',
    base: 'p-4',
    lg: 'p-6',
  };

  const elevationClasses = {
    sm: 'glass-elev-sm',
    md: 'glass-elev-md', 
    lg: 'glass-elev-lg',
  };

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onPointerDown={handlePointerDown}
      data-hover-effect={hoverEffectClass}
      whileTap={!disabled && !reduceMotion ? {
        scale: 'var(--interaction-scale-active)',
        opacity: 'var(--interaction-opacity-active)',
        transition: { 
          duration: 0.15, 
          ease: "easeOut" 
        }
      } : {}}
      className={clsx(
        'glass-base glass-card relative will-transform group',
        'rounded-3xl', // CRITICAL: Default border-radius class
        sizeClasses[size],
        elevationClasses[elevation],
        interactive && 'transform-gpu preserve-3d',
        interactive && !disabled && 'cursor-pointer glass-focus',
        disabled && 'opacity-50 cursor-not-allowed',
        'z-0', // z-index handled by CSS class
        className
      )}
      style={{
        ['--spotlight-opacity' as any]: spotlight ? 0.6 : 0,
        ['--glass-sheen-size' as any]: window.innerWidth < 768 ? '240px' : '420px',
        position: 'relative',
        isolation: 'isolate',
        ...style,
      }}
      // sécurité : éviter de propager disabled sur un div
      {...(as === 'button' ? { disabled } : {})}
      {...rest}
    >
      {/* sheen local (z au-dessus du verre, masqué en radial) - étendu jusqu'aux bords */}
      {sheen && (
        <div
          aria-hidden
          className="glass-sheen pointer-events-none absolute rounded-[inherit] overflow-hidden"
          style={{
            inset: '-1px',
          }}
        />
      )}

      {/* contenu */}
      <div className="relative z-10 pointer-events-auto">{children}</div>
    </Comp>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
