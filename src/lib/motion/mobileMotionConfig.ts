/**
 * Mobile Motion Configuration
 * Safely disable Framer Motion animations on mobile devices
 */

/**
 * Returns empty object for mobile to disable all Framer Motion props
 * Returns the original props object for desktop
 */
export function safeMotionProps<T extends Record<string, any>>(
  isMobile: boolean,
  props: T
): T | Record<string, never> {
  if (isMobile) {
    return {} as Record<string, never>;
  }
  return props;
}

/**
 * React hook version for use in components
 */
export function useMobileMotion(isMobile: boolean) {
  return {
    safeProps: <T extends Record<string, any>>(props: T) =>
      safeMotionProps(isMobile, props),
    shouldAnimate: !isMobile,
  };
}

/**
 * Safe transition string that returns 'none' on mobile
 */
export function safeTransition(isMobile: boolean, transition: string): string {
  return isMobile ? 'none' : transition;
}

/**
 * Safe will-change that returns 'auto' on mobile
 */
export function safeWillChange(isMobile: boolean, willChange: string): string {
  return isMobile ? 'auto' : willChange;
}
