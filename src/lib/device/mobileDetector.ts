/**
 * Mobile Detection and Configuration System
 * Ultra-conservative approach for mobile stability
 */

export interface MobileConfig {
  isMobile: boolean;
  isLowEndMobile: boolean;
  shouldDisableThreeJS: boolean;
  shouldDisableFramerMotion: boolean;
  shouldDisableGlassmorphism: boolean;
  shouldDisableAnimations: boolean;
  maxConcurrentAnimations: number;
  maxCacheSize: number; // in MB
}

/**
 * Detect if device is mobile with ultra-conservative approach
 */
export function detectMobile(): boolean {
  // Check user agent
  const ua = navigator.userAgent.toLowerCase();
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);

  // Check screen size
  const isSmallScreen = window.innerWidth <= 1024;

  // Check touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return isMobileUA || (isSmallScreen && hasTouch);
}

/**
 * Detect if device is low-end mobile
 */
export function detectLowEndMobile(): boolean {
  const isMobile = detectMobile();
  if (!isMobile) return false;

  // Check memory
  const memory = (navigator as any).deviceMemory;
  const hasLowMemory = memory && memory < 4;

  // Check cores
  const cores = navigator.hardwareConcurrency || 2;
  const hasLowCores = cores < 4;

  // Check GPU
  const hasLowEndGPU = detectLowEndGPU();

  return hasLowMemory || hasLowCores || hasLowEndGPU;
}

/**
 * Detect low-end GPU
 */
function detectLowEndGPU(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) return true;

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return false;

    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    // Known low-end mobile GPUs
    const lowEndGPUs = [
      /Mali-[34]/i,
      /Adreno [34]/i,
      /PowerVR SGX/i,
      /VideoCore/i,
      /Tegra 3/i,
    ];

    return lowEndGPUs.some(pattern => pattern.test(renderer));
  } catch {
    return false;
  }
}

/**
 * Get mobile configuration based on device capabilities
 */
export function getMobileConfig(): MobileConfig {
  const isMobile = detectMobile();
  const isLowEndMobile = detectLowEndMobile();

  // Ultra-conservative mobile config
  if (isMobile) {
    return {
      isMobile: true,
      isLowEndMobile,
      shouldDisableThreeJS: true, // ALWAYS disable Three.js on mobile
      shouldDisableFramerMotion: true, // ALWAYS disable Framer Motion on mobile
      shouldDisableGlassmorphism: true, // ALWAYS disable glassmorphism on mobile
      shouldDisableAnimations: isLowEndMobile, // Disable animations on low-end
      maxConcurrentAnimations: isLowEndMobile ? 0 : 2,
      maxCacheSize: isLowEndMobile ? 3 : 5, // MB
    };
  }

  // Desktop config - keep all features
  return {
    isMobile: false,
    isLowEndMobile: false,
    shouldDisableThreeJS: false,
    shouldDisableFramerMotion: false,
    shouldDisableGlassmorphism: false,
    shouldDisableAnimations: false,
    maxConcurrentAnimations: 8,
    maxCacheSize: 50, // MB
  };
}

/**
 * Apply mobile configuration to DOM
 */
export function applyMobileConfig(config: MobileConfig): void {
  const root = document.documentElement;

  // Add mobile class
  if (config.isMobile) {
    root.classList.add('is-mobile');
    root.classList.add('mobile-optimized');
  }

  if (config.isLowEndMobile) {
    root.classList.add('is-low-end-mobile');
  }

  // Disable features via classes
  if (config.shouldDisableThreeJS) {
    root.classList.add('disable-threejs');
  }

  if (config.shouldDisableFramerMotion) {
    root.classList.add('disable-framer-motion');
  }

  if (config.shouldDisableGlassmorphism) {
    root.classList.add('disable-glassmorphism');
  }

  if (config.shouldDisableAnimations) {
    root.classList.add('disable-all-animations');
  }

  // Set CSS variables
  root.style.setProperty('--max-concurrent-animations', String(config.maxConcurrentAnimations));
  root.style.setProperty('--max-cache-size-mb', String(config.maxCacheSize));
}

/**
 * Initialize mobile detection and apply configuration
 */
export function initializeMobileOptimizations(): MobileConfig {
  const config = getMobileConfig();
  applyMobileConfig(config);

  // Log configuration for debugging
  if (import.meta.env.DEV) {
    console.info('[MobileDetector] Configuration applied:', config);
  }

  return config;
}

// Singleton instance
let mobileConfigInstance: MobileConfig | null = null;

export function getMobileConfigInstance(): MobileConfig {
  if (!mobileConfigInstance) {
    mobileConfigInstance = initializeMobileOptimizations();
  }
  return mobileConfigInstance;
}
