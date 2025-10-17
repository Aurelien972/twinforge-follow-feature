import React, { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { DataProvider } from './DataProvider';
import { ToastProvider } from '../../ui/components/ToastProvider';
import { DeviceProvider } from '../../system/device/DeviceProvider';
import { ErrorBoundary } from './ErrorBoundary';
import { IllustrationCacheProvider } from '../../system/context/IllustrationCacheContext';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';
import { useAutoSync } from '../../hooks/useAutoSync';
import { useUserStore } from '../../system/store/userStore';
import logger from '../../lib/utils/logger';

// Create QueryClient with enhanced cache configuration for persistence
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes - increased for better persistence
      gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep data longer in cache
      retry: 1,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: (query) => {
        // CRITICAL: Allow refetch on mount for real-time data that changes frequently
        const queryKey = query.queryKey;

        // Always refetch meals data on mount (user just saved a meal)
        if (queryKey.includes('meals-today')) return true;
        if (queryKey.includes('meals-week')) return true;
        if (queryKey.includes('meals-recent')) return true;

        // Always refetch daily summaries (depends on meals data)
        if (queryKey.includes('daily-ai-summary')) return true;

        // Don't refetch other queries on mount
        return false;
      },
      refetchOnReconnect: false, // Prevent refetch on network reconnect
    },
    mutations: {
      retry: 1,
    },
  },
});

// Create localStorage persister for React Query cache
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'twinforge-react-query-cache',
  serialize: JSON.stringify,
  deserialize: (cachedString) => {
    try {
      // ISO 8601 date string pattern
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
      
      // Reviver function to convert ISO date strings back to Date objects
      const dateReviver = (key: string, value: any) => {
        if (typeof value === 'string' && isoDateRegex.test(value)) {
          const date = new Date(value);
          // Only return the Date object if it's valid
          return isNaN(date.getTime()) ? value : date;
        }
        return value;
      };
      
      const parsed = JSON.parse(cachedString, dateReviver);
      
      // Fix invalid timestamps in queries to prevent RangeError: Invalid time value
      if (parsed && parsed.queries) {
        parsed.queries.forEach((query: any) => {
          if (query.state) {
            // Ensure dataUpdatedAt and fetchedAt are valid timestamps
            if (query.state.dataUpdatedAt === null || query.state.dataUpdatedAt === undefined) {
              query.state.dataUpdatedAt = 0;
            }
            if (query.state.fetchedAt === null || query.state.fetchedAt === undefined) {
              query.state.fetchedAt = 0;
            }
            
            // Validate timestamp values
            if (typeof query.state.dataUpdatedAt === 'number' && isNaN(query.state.dataUpdatedAt)) {
              query.state.dataUpdatedAt = 0;
            }
            if (typeof query.state.fetchedAt === 'number' && isNaN(query.state.fetchedAt)) {
              query.state.fetchedAt = 0;
            }
          }
        });
      }
      
      return parsed;
    } catch (error) {
      logger.error('REACT_QUERY_PERSISTENCE', 'Failed to deserialize cache', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      return null;
    }
  },
});

// Initialize cache persistence
let persistenceInitialized = false;

const initializeCachePersistence = async () => {
  if (persistenceInitialized) return;
  
  try {
    logger.info('REACT_QUERY_PERSISTENCE', 'Initializing cache persistence', {
      persisterKey: 'twinforge-react-query-cache',
      storage: 'localStorage',
      timestamp: new Date().toISOString()
    });

    await persistQueryClient({
      queryClient,
      persister: localStoragePersister,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      hydrateOptions: {
        defaultOptions: {
          queries: {
            staleTime: 10 * 60 * 1000, // 10 minutes
          },
        },
      },
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          // Only persist specific query types to avoid bloating localStorage
          const queryKey = query.queryKey;

          // Don't persist fasting queries - they change in real-time and cause persistence loops
          if (queryKey.includes('fasting')) return false;

          // Persist activity insights (expensive AI calls)
          if (queryKey.includes('insights')) return true;

          // Persist activity progression data
          if (queryKey.includes('progression')) return true;

          // Persist trend analyses
          if (queryKey.includes('trend-analysis')) return true;

          // Persist daily summaries
          if (queryKey.includes('daily-summary')) return true;

          // Don't persist real-time data like daily activities
          if (queryKey.includes('daily') && !queryKey.includes('summary')) return false;

          // Don't persist user profile (changes frequently)
          if (queryKey.includes('profile')) return false;

          // Default: persist other queries
          return true;
        },
      },
    });
    
    persistenceInitialized = true;
    
    logger.info('REACT_QUERY_PERSISTENCE', 'Cache persistence initialized successfully', {
      cacheSize: Object.keys(localStorage).filter(key => key.startsWith('twinforge-react-query')).length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    logger.error('REACT_QUERY_PERSISTENCE', 'Failed to initialize cache persistence', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
};

function PerformanceInitializer({ children }: { children: React.ReactNode }) {
  useDevicePerformance();
  return <>{children}</>;
}

function AutoSyncInitializer({ children }: { children: React.ReactNode }) {
  const { profile } = useUserStore();
  useAutoSync(profile?.id || null, { enabled: true, intervalMinutes: 60 });
  return <>{children}</>;
}

/**
 * Background Component - Forge Spatiale TwinForge
 * CRITICAL: This must be rendered at the root level with proper particles
 */
function ForgeBackground() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x0: string;
    x1: string;
    x2: string;
    x3: string;
    x4: string;
    size: string;
    duration: string;
    delay: string;
  }>>([]);

  useEffect(() => {
    console.log('🎨 ForgeBackground: Component mounted');
    console.log('🎨 Window dimensions:', window.innerWidth, 'x', window.innerHeight);
    console.log('🎨 Device classes on body:', document.body.className);
    console.log('🎨 Device classes on html:', document.documentElement.className);

    // Generate particles on mount
    const particleCount = window.innerWidth <= 768 ? 6 : 12;
    console.log('🎨 Generating', particleCount, 'particles');

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i + 1,
      x0: `${20 + Math.random() * 60}vw`,
      x1: `${-20 + Math.random() * 40}px`,
      x2: `${-30 + Math.random() * 60}px`,
      x3: `${-10 + Math.random() * 20}px`,
      x4: `${-5 + Math.random() * 10}px`,
      size: `${2 + Math.random() * 1.5}px`,
      duration: `${20 + Math.random() * 15}s`,
      delay: `${Math.random() * -20}s`,
    }));

    setParticles(newParticles);
    console.log('🎨 Particles generated:', newParticles.length);

    // Check if background elements exist in DOM
    setTimeout(() => {
      const bgElement = document.querySelector('.bg-twinforge-visionos');
      const particlesContainer = document.querySelector('.cosmic-forge-particles');
      const forgeParticles = document.querySelectorAll('.forge-particle');

      console.log('🎨 DOM Check:');
      console.log('  - Background element exists:', !!bgElement);
      console.log('  - Particles container exists:', !!particlesContainer);
      console.log('  - Forge particles count:', forgeParticles.length);

      if (bgElement) {
        const bgStyles = window.getComputedStyle(bgElement);
        console.log('  - Background position:', bgStyles.position);
        console.log('  - Background z-index:', bgStyles.zIndex);
        console.log('  - Background display:', bgStyles.display);
        console.log('  - Background opacity:', bgStyles.opacity);
        console.log('  - Background background:', bgStyles.background.substring(0, 100));

        // CHECK WHAT'S ON TOP OF BACKGROUND
        const body = document.body;
        const bodyStyles = window.getComputedStyle(body);
        console.log('🔍 BODY STYLES:');
        console.log('  - background:', bodyStyles.background);
        console.log('  - backgroundColor:', bodyStyles.backgroundColor);

        const root = document.getElementById('root');
        if (root) {
          const rootStyles = window.getComputedStyle(root);
          console.log('🔍 ROOT DIV STYLES:');
          console.log('  - background:', rootStyles.background);
          console.log('  - backgroundColor:', rootStyles.backgroundColor);
          console.log('  - position:', rootStyles.position);
          console.log('  - zIndex:', rootStyles.zIndex);
        }

        const appDiv = document.querySelector('.min-h-screen');
        if (appDiv) {
          const appStyles = window.getComputedStyle(appDiv);
          console.log('🔍 APP CONTAINER STYLES:');
          console.log('  - background:', appStyles.background);
          console.log('  - backgroundColor:', appStyles.backgroundColor);
          console.log('  - position:', appStyles.position);
          console.log('  - zIndex:', appStyles.zIndex);
        }
      }

      if (particlesContainer) {
        const containerStyles = window.getComputedStyle(particlesContainer);
        console.log('  - Particles opacity:', containerStyles.opacity);
        console.log('  - Particles display:', containerStyles.display);
      }

      if (forgeParticles.length > 0) {
        const firstParticle = forgeParticles[0] as HTMLElement;
        const particleStyles = window.getComputedStyle(firstParticle);
        console.log('  - First particle opacity:', particleStyles.opacity);
        console.log('  - First particle display:', particleStyles.display);
        console.log('  - First particle animation:', particleStyles.animation);
      }
    }, 500);
  }, []);

  console.log('🎨 ForgeBackground: Rendering with', particles.length, 'particles');

  // CRITICAL: The HTML already has a background system in index.html
  // We don't need to duplicate it here - just return null
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Initialize cache persistence on mount
  React.useEffect(() => {
    initializeCachePersistence();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <DeviceProvider>
            <IllustrationCacheProvider>
              <ToastProvider>
                <PerformanceInitializer>
                  <AutoSyncInitializer>
                    <ForgeBackground />
                    {children}
                  </AutoSyncInitializer>
                </PerformanceInitializer>
              </ToastProvider>
            </IllustrationCacheProvider>
          </DeviceProvider>
        </DataProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}