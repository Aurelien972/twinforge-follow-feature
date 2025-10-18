import React from 'react';
import { motion, HTMLMotionProps, AnimatePresenceProps } from 'framer-motion';
import { usePerformanceMode } from '../../system/context/PerformanceModeContext';

/**
 * ConditionalMotion - Wrapper intelligent pour Framer Motion
 *
 * Mode Quality (Desktop): Utilise Framer Motion complet
 * Mode Performance (Mobile): Utilise HTML standard + CSS classes
 */

type ConditionalMotionProps = HTMLMotionProps<'div'> & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

export const ConditionalMotion = React.forwardRef<HTMLDivElement, ConditionalMotionProps>(
  ({ children, as = 'div', className = '', whileHover, whileTap, animate, initial, exit, variants, transition, ...props }, ref) => {
    const { isPerformanceMode } = usePerformanceMode();

    if (isPerformanceMode) {
      // MODE PERFORMANCE: HTML standard avec classes CSS
      const Component = as as any;

      // Mapper les props Framer Motion vers des classes CSS
      const performanceClasses = [
        className,
        whileHover && 'motion-hover-mobile',
        whileTap && 'motion-tap-mobile',
        animate && typeof animate === 'object' && 'animate' in animate && 'motion-fade-in-mobile'
      ].filter(Boolean).join(' ');

      return (
        <Component ref={ref} className={performanceClasses} {...props}>
          {children}
        </Component>
      );
    }

    // MODE QUALITY: Framer Motion complet
    const MotionComponent = motion[as] as any;

    return (
      <MotionComponent
        ref={ref}
        className={className}
        whileHover={whileHover}
        whileTap={whileTap}
        animate={animate}
        initial={initial}
        exit={exit}
        variants={variants}
        transition={transition}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

ConditionalMotion.displayName = 'ConditionalMotion';

/**
 * ConditionalAnimatePresence - Wrapper pour AnimatePresence
 *
 * Mode Quality: AnimatePresence complet
 * Mode Performance: Fragment simple (pas d'animations)
 */
type ConditionalAnimatePresenceProps = AnimatePresenceProps & {
  children: React.ReactNode;
};

export const ConditionalAnimatePresence: React.FC<ConditionalAnimatePresenceProps> = ({
  children,
  mode,
  initial = true,
  ...props
}) => {
  const { isPerformanceMode } = usePerformanceMode();

  if (isPerformanceMode) {
    // MODE PERFORMANCE: Pas d'AnimatePresence, juste un Fragment
    return <>{children}</>;
  }

  // MODE QUALITY: AnimatePresence complet
  const { AnimatePresence } = require('framer-motion');

  return (
    <AnimatePresence mode={mode} initial={initial} {...props}>
      {children}
    </AnimatePresence>
  );
};

/**
 * Hook pour variants conditionnels
 */
export const useConditionalVariants = <T extends Record<string, any>>(variants: T): T | undefined => {
  const { isPerformanceMode } = usePerformanceMode();
  return isPerformanceMode ? undefined : variants;
};

/**
 * Hook pour transitions conditionnelles
 */
export const useConditionalTransition = <T extends Record<string, any>>(transition: T): T | undefined => {
  const { isPerformanceMode } = usePerformanceMode();
  return isPerformanceMode ? undefined : transition;
};

/**
 * Classes CSS de remplacement pour mode performance
 */
export const motionClasses = {
  hover: 'motion-hover-mobile',
  tap: 'motion-tap-mobile',
  fadeIn: 'motion-fade-in-mobile',
  slideIn: 'motion-slide-in-mobile',
  pulse: 'pulse-mobile-static',
  breathing: 'breathing-mobile-static'
} as const;
