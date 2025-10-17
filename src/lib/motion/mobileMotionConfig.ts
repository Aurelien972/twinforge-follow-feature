/**
 * Mobile Motion Configuration
 * Disables all Framer Motion animations on mobile devices
 * Returns static config objects for optimal performance
 */

import { useIsMobile } from '../../system/device/DeviceProvider';

/**
 * Hook to get motion-safe props for mobile
 * Returns empty object on mobile to disable all Framer Motion animations
 */
export function useMobileMotion() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return {
      // Disable all motion props on mobile
      animate: undefined,
      initial: undefined,
      exit: undefined,
      whileHover: undefined,
      whileTap: undefined,
      whileFocus: undefined,
      whileDrag: undefined,
      transition: undefined,
      variants: undefined,
    };
  }

  return null; // Return null on desktop - use normal motion props
}

/**
 * Safe motion props that disable on mobile
 * Usage: <motion.div {...safeMotionProps(isMobile, { animate: { ... } })} />
 */
export function safeMotionProps(isMobile: boolean, desktopProps: any) {
  if (isMobile) {
    return {}; // Return empty object - no motion
  }
  return desktopProps;
}

/**
 * Motion config for AnimatePresence
 * Disables mode and initial on mobile
 */
export function getSafePresenceConfig(isMobile: boolean) {
  if (isMobile) {
    return {
      mode: undefined,
      initial: false,
    };
  }
  return {};
}

/**
 * Safe transition config
 * Returns instant transition on mobile
 */
export function getSafeTransition(isMobile: boolean, desktopTransition: any) {
  if (isMobile) {
    return { duration: 0 };
  }
  return desktopTransition;
}

/**
 * Check if device should use reduced motion
 * True if mobile OR user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return true;

  // Check if mobile
  const isMobile = window.innerWidth <= 768 ||
                   'ontouchstart' in window ||
                   navigator.maxTouchPoints > 0;

  // Check user preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return isMobile || prefersReduced;
}
