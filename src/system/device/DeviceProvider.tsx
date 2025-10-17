/**
 * Device Provider - Mobile Optimized
 * Enhanced device detection with iPhone/iPad specific checks
 * CRITICAL: All mobile devices get performance mode forced
 */

import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface DeviceContextType {
  preferredMotion: 'full' | 'reduced';
  hasTouch: boolean;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

const DeviceContext = createContext<DeviceContextType>({
  preferredMotion: 'full',
  hasTouch: false,
  isMobile: false,
  isIOS: false,
  isAndroid: false,
});

export const usePreferredMotion = () => useContext(DeviceContext).preferredMotion;
export const useHasTouch = () => useContext(DeviceContext).hasTouch;
export const useIsMobile = () => useContext(DeviceContext).isMobile;
export const useIsIOS = () => useContext(DeviceContext).isIOS;
export const useIsAndroid = () => useContext(DeviceContext).isAndroid;

/**
 * Detect mobile device with multiple checks
 */
function detectMobile(): boolean {
  if (typeof window === 'undefined') return false;

  // Check 1: Screen width
  const isSmallScreen = window.innerWidth <= 768;

  // Check 2: Touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check 3: User agent (iPhone, iPad, Android)
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

  // Check 4: Pointer type
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  return isSmallScreen || hasTouch || isMobileUA || isCoarsePointer;
}

/**
 * Detect iOS (iPhone/iPad)
 */
function detectIOS(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
}

/**
 * Detect Android
 */
function detectAndroid(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /android/i.test(userAgent);
}

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const preferredMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = detectMobile();
  const isIOS = detectIOS();
  const isAndroid = detectAndroid();

  const value = {
    preferredMotion,
    hasTouch,
    isMobile,
    isIOS,
    isAndroid,
  };

  // CRITICAL: Add mobile-device class to body for CSS targeting
  // This automatically applies mobile optimizations without user intervention
  useEffect(() => {
    console.log('📱 DeviceProvider: useEffect triggered');
    console.log('📱 Detection results:', { isMobile, isIOS, isAndroid, hasTouch, width: window.innerWidth });

    if (isMobile) {
      // Add mobile-device class for CSS targeting (mobile-no-blur.css, mobile-zero-animations.css)
      document.body.classList.add('mobile-device');
      document.documentElement.classList.add('mobile-device');

      console.log('📱 MOBILE DEVICE DETECTED - Classes added!');
      console.log('📱 Body classes:', document.body.className);
      console.log('📱 HTML classes:', document.documentElement.className);

      // Check if CSS is hiding background
      setTimeout(() => {
        const bg = document.querySelector('.bg-twinforge-visionos');
        const particles = document.querySelector('.cosmic-forge-particles');

        if (bg) {
          const bgStyles = window.getComputedStyle(bg);
          console.log('📱 Background element found:');
          console.log('  - display:', bgStyles.display);
          console.log('  - opacity:', bgStyles.opacity);
          console.log('  - visibility:', bgStyles.visibility);
          console.log('  - background:', bgStyles.background.substring(0, 80));
        } else {
          console.error('📱 ❌ Background element NOT FOUND in DOM!');
        }

        if (particles) {
          const pStyles = window.getComputedStyle(particles);
          console.log('📱 Particles container found:');
          console.log('  - display:', pStyles.display);
          console.log('  - opacity:', pStyles.opacity);
        } else {
          console.error('📱 ❌ Particles container NOT FOUND in DOM!');
        }
      }, 1000);

      // Log for debugging
      console.log('🔍 Mobile device detected - Auto-optimizations applied:', {
        isMobile,
        isIOS,
        isAndroid,
        hasTouch,
        screenWidth: window.innerWidth,
        userAgent: navigator.userAgent,
        optimizations: [
          'Backdrop-blur disabled',
          'Animations reduced',
          'Solid backgrounds',
          'Touch-optimized interactions'
        ]
      });
    } else {
      document.body.classList.remove('mobile-device');
      document.documentElement.classList.remove('mobile-device');

      console.log('🖥️ Desktop device detected - Full visual effects enabled');
    }
  }, [isMobile, isIOS, isAndroid, hasTouch]);

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};