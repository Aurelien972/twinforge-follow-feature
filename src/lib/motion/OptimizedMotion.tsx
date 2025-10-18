/**
 * Optimized Motion Wrapper
 * Conditionally replaces Framer Motion with standard HTML elements based on performance mode
 *
 * Usage:
 * - mode-high-performance: Returns standard HTML element with CSS transitions
 * - mode-balanced: Returns Framer Motion with simplified animations
 * - mode-quality: Returns full Framer Motion with all effects
 */

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { usePerformanceMode } from '../../system/context/PerformanceModeContext';

type OptimizedMotionProps = MotionProps & {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  role?: string;
  title?: string;
};

/**
 * Optimized motion wrapper that adapts to performance mode
 */
export function OptimizedMotion({
  as = 'div',
  children,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  type,
  disabled,
  whileHover,
  whileTap,
  animate,
  initial,
  exit,
  transition,
  variants,
  ...restProps
}: OptimizedMotionProps) {
  const { mode } = usePerformanceMode();

  // Mode high-performance: Return standard HTML element with CSS transitions
  if (mode === 'high-performance') {
    const Component = as as any;

    // Merge styles with performance-optimized defaults
    const optimizedStyle: React.CSSProperties = {
      ...style,
      transition: 'transform 0.15s ease, background-color 0.15s ease, opacity 0.15s ease',
    };

    // Add active state styles for buttons
    const optimizedClassName = `${className || ''} optimized-motion-element`;

    return (
      <Component
        className={optimizedClassName}
        style={optimizedStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type={type}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </Component>
    );
  }

  // Mode balanced: Simplified Framer Motion
  if (mode === 'balanced') {
    const MotionComponent = motion[as] as any;

    // Simplify animations
    const simplifiedTransition = {
      duration: 0.2,
      ease: 'easeOut',
    };

    const simplifiedWhileHover = whileHover ? { scale: 1.02 } : undefined;
    const simplifiedWhileTap = whileTap ? { scale: 0.98 } : undefined;

    return (
      <MotionComponent
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type={type}
        disabled={disabled}
        whileHover={simplifiedWhileHover}
        whileTap={simplifiedWhileTap}
        transition={simplifiedTransition}
        {...restProps}
      >
        {children}
      </MotionComponent>
    );
  }

  // Mode quality: Full Framer Motion with all effects
  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
      animate={animate}
      initial={initial}
      exit={exit}
      transition={transition}
      variants={variants}
      {...restProps}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Optimized AnimatePresence that skips animation in high-performance mode
 */
export function OptimizedAnimatePresence({
  children,
  mode: animatePresenceMode
}: {
  children: React.ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
}) {
  const { mode } = usePerformanceMode();

  // In high-performance mode, just render children without AnimatePresence
  if (mode === 'high-performance') {
    return <>{children}</>;
  }

  // Otherwise use standard AnimatePresence
  const { AnimatePresence } = require('framer-motion');
  return (
    <AnimatePresence mode={animatePresenceMode}>
      {children}
    </AnimatePresence>
  );
}

/**
 * Hook to get simplified motion variants based on performance mode
 */
export function useOptimizedVariants<T extends Record<string, any>>(
  variants: T
): T | undefined {
  const { mode } = usePerformanceMode();

  if (mode === 'high-performance') {
    return undefined; // No variants in high-performance mode
  }

  if (mode === 'balanced') {
    // Simplify variants by reducing durations and complexity
    const simplifiedVariants: any = {};
    for (const key in variants) {
      const variant = variants[key];
      if (typeof variant === 'object') {
        simplifiedVariants[key] = {
          ...variant,
          transition: {
            duration: 0.2,
            ease: 'easeOut',
          },
        };
      } else {
        simplifiedVariants[key] = variant;
      }
    }
    return simplifiedVariants as T;
  }

  return variants; // Full variants in quality mode
}
