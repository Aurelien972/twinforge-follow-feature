/**
 * VisionOS 26 Mobile Animations
 * Framer Motion variants optimized for mobile performance
 */

import { Variants } from 'framer-motion';

/**
 * Detect if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation config based on device capabilities and user preferences
 */
export function getAnimationConfig() {
  const reducedMotion = prefersReducedMotion();

  return {
    reducedMotion,
    // Shorter durations for mobile
    duration: reducedMotion ? 0 : 0.3,
    stiffness: reducedMotion ? 0 : 400,
    damping: reducedMotion ? 0 : 30,
  };
}

/**
 * Tab transition variants
 */
export const tabTransitions: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  enter: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 0.8,
    },
  }),
};

/**
 * Section card variants with staggered children
 */
export const sectionCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Field variants for form inputs
 */
export const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
};

/**
 * Success checkmark animation
 */
export const successCheckVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

/**
 * Glow pulse for active elements
 */
export const glowPulseVariants: Variants = {
  initial: {
    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
  },
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(255, 255, 255, 0)',
      '0 0 20px 4px rgba(255, 255, 255, 0.4)',
      '0 0 0 0 rgba(255, 255, 255, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Ripple effect for touch interactions
 */
export const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Modal/Overlay variants
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Backdrop blur variants
 */
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Toast notification variants
 */
export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Badge notification variants
 */
export const badgeVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/**
 * Loading spinner variants
 */
export const spinnerVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Breathing/Pulsing animation
 */
export const breathingVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 0.8,
  },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Shake animation for errors
 */
export const shakeVariants: Variants = {
  initial: {
    x: 0,
  },
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Bounce animation for attention
 */
export const bounceVariants: Variants = {
  initial: {
    y: 0,
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: 2,
    },
  },
};

/**
 * Fade in up animation
 */
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

/**
 * Slide in from side
 */
export const slideInVariants: Variants = {
  left: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  top: {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  bottom: {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
};

/**
 * Scale pop animation
 */
export const scalePopVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/**
 * Stagger container for lists
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * List item variants
 */
export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
};

/**
 * Get simplified variants for low-power devices
 */
export function getOptimizedVariants(variants: Variants): Variants {
  const config = getAnimationConfig();

  if (config.reducedMotion) {
    // Return instant transitions
    return Object.keys(variants).reduce((acc, key) => {
      acc[key] = {
        ...(variants[key] as object),
        transition: { duration: 0 },
      };
      return acc;
    }, {} as Variants);
  }

  return variants;
}

export default {
  tabTransitions,
  sectionCardVariants,
  fieldVariants,
  successCheckVariants,
  glowPulseVariants,
  rippleVariants,
  modalVariants,
  backdropVariants,
  toastVariants,
  badgeVariants,
  spinnerVariants,
  breathingVariants,
  shakeVariants,
  bounceVariants,
  fadeInUpVariants,
  slideInVariants,
  scalePopVariants,
  staggerContainerVariants,
  listItemVariants,
  getOptimizedVariants,
  getAnimationConfig,
  prefersReducedMotion,
};
