/**
 * Apple Health Plugin
 * Point d'entrée pour l'accès à HealthKit
 *
 * Note: Capacitor will be loaded dynamically when installed
 * This allows the app to build without Capacitor dependencies
 */

import type { AppleHealthPlugin } from './definitions';
import { AppleHealthWeb } from './web';

// Create a proxy that will load the real implementation when needed
const createAppleHealthProxy = (): AppleHealthPlugin => {
  let implementation: AppleHealthPlugin = new AppleHealthWeb();
  let initialized = false;

  const initializeCapacitor = async () => {
    if (initialized) return;
    initialized = true;

    try {
      // Use Function constructor to avoid static analysis by bundler
      const dynamicImport = new Function('modulePath', 'return import(modulePath)');
      const capacitorModule = await dynamicImport('@capacitor/core');
      const { registerPlugin } = capacitorModule;

      implementation = registerPlugin<AppleHealthPlugin>('AppleHealth', {
        web: () => Promise.resolve(new AppleHealthWeb()),
      });

      console.info('Apple Health: Capacitor plugin registered');
    } catch (error) {
      // Capacitor not available, continue with web implementation
      console.info('Apple Health: Using web implementation (Capacitor not installed)');
    }
  };

  // Initialize in the background
  if (typeof window !== 'undefined') {
    initializeCapacitor();
  }

  // Proxy all methods to the current implementation
  return {
    isAvailable: (...args) => implementation.isAvailable(...args),
    requestAuthorization: (...args) => implementation.requestAuthorization(...args),
    getAuthorizationStatus: (...args) => implementation.getAuthorizationStatus(...args),
    getHeartRateData: (...args) => implementation.getHeartRateData(...args),
    getHRVData: (...args) => implementation.getHRVData(...args),
    getStepsData: (...args) => implementation.getStepsData(...args),
    getActiveCaloriesData: (...args) => implementation.getActiveCaloriesData(...args),
    getRestingCaloriesData: (...args) => implementation.getRestingCaloriesData(...args),
    getDistanceData: (...args) => implementation.getDistanceData(...args),
    getWorkouts: (...args) => implementation.getWorkouts(...args),
    getWorkoutDetails: (...args) => implementation.getWorkoutDetails(...args),
    getSleepData: (...args) => implementation.getSleepData(...args),
    getVO2MaxData: (...args) => implementation.getVO2MaxData(...args),
    getRestingHeartRateData: (...args) => implementation.getRestingHeartRateData(...args),
    startObserving: (...args) => implementation.startObserving(...args),
    stopObserving: (...args) => implementation.stopObserving(...args),
  };
};

const AppleHealth = createAppleHealthProxy();

export * from './definitions';
export { AppleHealth };
