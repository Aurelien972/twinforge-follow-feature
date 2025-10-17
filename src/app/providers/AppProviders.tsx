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

// Detect mobile for optimized cache configuration
const isMobile = window.innerWidth <= 1024 || 'ontouchstart' in window;

// Create QueryClient with mobile-optimized cache configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isMobile ? 5 * 60 * 1000 : 10 * 60 * 1000, // 5min mobile, 10min desktop
      gcTime: isMobile ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000, // 5min mobile, 24h desktop
      retry: isMobile ? 0 : 1, // No retries on mobile to prevent hanging
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: (query) => {
        // CRITICAL: Limit refetches on mobile
        if (isMobile) {
          return false; // Never refetch on mobile to save resources
        }

        const queryKey = query.queryKey;

        // Desktop: Allow refetch for real-time data
        if (queryKey.includes('meals-today')) return true;
        if (queryKey.includes('meals-week')) return true;
        if (queryKey.includes('meals-recent')) return true;
        if (queryKey.includes('daily-ai-summary')) return true;

        return false;
      },
      refetchOnReconnect: false, // Prevent refetch on network reconnect
    },
    mutations: {
      retry: isMobile ? 0 : 1, // No retries on mobile
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

  // MOBILE: Disable cache persistence to prevent freezes and white screens
  if (isMobile) {
    logger.info('REACT_QUERY_PERSISTENCE', 'Cache persistence disabled on mobile for stability');
    persistenceInitialized = true;
    return;
  }

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