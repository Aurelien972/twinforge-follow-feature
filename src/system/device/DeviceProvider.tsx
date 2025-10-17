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
    if (isMobile) {
      // Add mobile-device class for CSS targeting (mobile-critical-fixes.css)
      document.body.classList.add('mobile-device');
      document.documentElement.classList.add('mobile-device');

      // VERIFY class was added (sometimes fails in strict mode)
      const hasClassOnBody = document.body.classList.contains('mobile-device');
      const hasClassOnHTML = document.documentElement.classList.contains('mobile-device');

      // Log for debugging
      console.log('🔍 MOBILE DEVICE DETECTED - Critical fixes applied:', {
        isMobile,
        isIOS,
        isAndroid,
        hasTouch,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        userAgent: navigator.userAgent,
        classAppliedToBody: hasClassOnBody,
        classAppliedToHTML: hasClassOnHTML,
        optimizations: [
          '✅ Position fixed architecture repaired',
          '✅ Backdrop-blur DISABLED (0px blur)',
          '✅ ALL animations DISABLED',
          '✅ Solid backgrounds only',
          '✅ Simple shadows (max 2 layers)',
          '✅ NO pseudo-element effects',
          '✅ Touch-optimized interactions',
          '✅ Header & bottom bar STICKY enforced'
        ],
        cssFile: 'mobile-critical-fixes.css loaded last'
      });

      // Double-check after 100ms in case of timing issues
      setTimeout(() => {
        if (!document.body.classList.contains('mobile-device')) {
          console.warn('⚠️ mobile-device class was removed! Re-applying...');
          document.body.classList.add('mobile-device');
          document.documentElement.classList.add('mobile-device');
        }
      }, 100);
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