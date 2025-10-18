/**
 * Performance Motion Wrapper
 *
 * Remplace automatiquement Framer Motion par des composants natifs en mode performance
 * Desktop: Utilise framer-motion normalement
 * Mobile Performance: Utilise des divs natifs avec CSS transitions
 */

import React, { forwardRef } from 'react';
import {
  motion as framerMotion,
  AnimatePresence as FramerAnimatePresence,
  type HTMLMotionProps,
  type MotionProps
} from 'framer-motion';
import { usePerformanceMode } from '../../system/context/PerformanceModeContext';

// Types pour les props simplifiées en mode performance
type SimplifiedMotionProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'animate' | 'whileHover' | 'whileTap'> & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/**
 * Composant motion.div conditionnel
 * Mode quality: framer-motion complet
 * Mode performance: div natif avec CSS
 */
export const MotionDiv = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>((props, ref) => {
  const { isPerformanceMode } = usePerformanceMode();

  if (isPerformanceMode) {
    // Mode performance: div natif sans animations
    const {
      initial,
      animate,
      exit,
      variants,
      whileHover,
      whileTap,
      whileFocus,
      whileDrag,
      whileInView,
      transition,
      layout,
      layoutId,
      drag,
      dragConstraints,
      onDragEnd,
      onDragStart,
      onAnimationComplete,
      onAnimationStart,
      ...restProps
    } = props;

    // Convertir les classes CSS pour hover/tap
    const className = [
      props.className,
      whileHover && 'hover-effect',
      whileTap && 'tap-effect'
    ].filter(Boolean).join(' ');

    return <div ref={ref} {...restProps} className={className} />;
  }

  // Mode quality: framer-motion complet
  return <framerMotion.div ref={ref} {...props} />;
});

MotionDiv.displayName = 'MotionDiv';

/**
 * Composant motion.button conditionnel
 */
export const MotionButton = forwardRef<HTMLButtonElement, HTMLMotionProps<'button'>>((props, ref) => {
  const { isPerformanceMode } = usePerformanceMode();

  if (isPerformanceMode) {
    const {
      initial,
      animate,
      exit,
      variants,
      whileHover,
      whileTap,
      whileFocus,
      transition,
      onAnimationComplete,
      onAnimationStart,
      ...restProps
    } = props;

    const className = [
      props.className,
      whileHover && 'hover-effect',
      whileTap && 'tap-effect'
    ].filter(Boolean).join(' ');

    return <button ref={ref} {...restProps} className={className} />;
  }

  return <framerMotion.button ref={ref} {...props} />;
});

MotionButton.displayName = 'MotionButton';

/**
 * Composant AnimatePresence conditionnel
 * Mode performance: Rendu direct sans animations
 */
export const AnimatePresence: React.FC<{
  children?: React.ReactNode;
  mode?: 'sync' | 'wait' | 'popLayout';
  initial?: boolean;
  onExitComplete?: () => void;
}> = ({ children, mode, initial, onExitComplete }) => {
  const { isPerformanceMode } = usePerformanceMode();

  if (isPerformanceMode) {
    // Mode performance: rendu direct sans AnimatePresence
    return <>{children}</>;
  }

  return (
    <FramerAnimatePresence
      mode={mode}
      initial={initial}
      onExitComplete={onExitComplete}
    >
      {children}
    </FramerAnimatePresence>
  );
};

/**
 * Objet motion conditionnel
 * Expose les mêmes composants que framer-motion mais avec comportement adaptatif
 */
export const motion = {
  div: MotionDiv,
  button: MotionButton,
  span: forwardRef<HTMLSpanElement, HTMLMotionProps<'span'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, whileHover, whileTap, transition, ...restProps } = props;
      return <span ref={ref} {...restProps} />;
    }
    return <framerMotion.span ref={ref} {...props} />;
  }),
  p: forwardRef<HTMLParagraphElement, HTMLMotionProps<'p'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, whileHover, transition, ...restProps } = props;
      return <p ref={ref} {...restProps} />;
    }
    return <framerMotion.p ref={ref} {...props} />;
  }),
  h1: forwardRef<HTMLHeadingElement, HTMLMotionProps<'h1'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <h1 ref={ref} {...restProps} />;
    }
    return <framerMotion.h1 ref={ref} {...props} />;
  }),
  h2: forwardRef<HTMLHeadingElement, HTMLMotionProps<'h2'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <h2 ref={ref} {...restProps} />;
    }
    return <framerMotion.h2 ref={ref} {...props} />;
  }),
  h3: forwardRef<HTMLHeadingElement, HTMLMotionProps<'h3'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <h3 ref={ref} {...restProps} />;
    }
    return <framerMotion.h3 ref={ref} {...props} />;
  }),
  section: forwardRef<HTMLElement, HTMLMotionProps<'section'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <section ref={ref} {...restProps} />;
    }
    return <framerMotion.section ref={ref} {...props} />;
  }),
  article: forwardRef<HTMLElement, HTMLMotionProps<'article'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <article ref={ref} {...restProps} />;
    }
    return <framerMotion.article ref={ref} {...props} />;
  }),
  ul: forwardRef<HTMLUListElement, HTMLMotionProps<'ul'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <ul ref={ref} {...restProps} />;
    }
    return <framerMotion.ul ref={ref} {...props} />;
  }),
  li: forwardRef<HTMLLIElement, HTMLMotionProps<'li'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, whileHover, transition, ...restProps } = props;
      return <li ref={ref} {...restProps} />;
    }
    return <framerMotion.li ref={ref} {...props} />;
  }),
  nav: forwardRef<HTMLElement, HTMLMotionProps<'nav'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <nav ref={ref} {...restProps} />;
    }
    return <framerMotion.nav ref={ref} {...props} />;
  }),
  form: forwardRef<HTMLFormElement, HTMLMotionProps<'form'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <form ref={ref} {...restProps} />;
    }
    return <framerMotion.form ref={ref} {...props} />;
  }),
  input: forwardRef<HTMLInputElement, HTMLMotionProps<'input'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, whileFocus, transition, ...restProps } = props;
      return <input ref={ref} {...restProps} />;
    }
    return <framerMotion.input ref={ref} {...props} />;
  }),
  textarea: forwardRef<HTMLTextAreaElement, HTMLMotionProps<'textarea'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, whileFocus, transition, ...restProps } = props;
      return <textarea ref={ref} {...restProps} />;
    }
    return <framerMotion.textarea ref={ref} {...props} />;
  }),
  a: forwardRef<HTMLAnchorElement, HTMLMotionProps<'a'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, whileHover, whileTap, transition, ...restProps } = props;
      return <a ref={ref} {...restProps} />;
    }
    return <framerMotion.a ref={ref} {...props} />;
  }),
  img: forwardRef<HTMLImageElement, HTMLMotionProps<'img'>>((props, ref) => {
    const { isPerformanceMode } = usePerformanceMode();
    if (isPerformanceMode) {
      const { initial, animate, exit, variants, transition, ...restProps } = props;
      return <img ref={ref} {...restProps} />;
    }
    return <framerMotion.img ref={ref} {...props} />;
  }),
};

// Export des hooks framer-motion (fonctionnent normalement dans les deux modes)
export {
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
  useReducedMotion,
  useDragControls,
  useAnimationControls,
  useMotionTemplate,
  useVelocity,
  useMotionValueEvent,
  type Variants,
  type Transition,
  type Target,
  type TargetAndTransition
} from 'framer-motion';
