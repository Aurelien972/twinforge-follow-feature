import React, { createContext, useContext, useEffect } from 'react';
import { usePerformanceModeStore } from '../store/performanceModeStore';
import { useUserStore } from '../store/userStore';

interface PerformanceModeContextType {
  isPerformanceMode: boolean;
  isLoading: boolean;
  togglePerformanceMode: () => Promise<void>;
}

const PerformanceModeContext = createContext<PerformanceModeContextType>({
  isPerformanceMode: false,
  isLoading: true,
  togglePerformanceMode: async () => {},
});

export const usePerformanceMode = () => useContext(PerformanceModeContext);

interface PerformanceModeProviderProps {
  children: React.ReactNode;
}

export const PerformanceModeProvider: React.FC<PerformanceModeProviderProps> = ({ children }) => {
  const { isPerformanceMode, isLoading, setPerformanceMode, loadPerformanceMode } = usePerformanceModeStore();
  const { profile } = useUserStore();

  // Load performance mode on mount
  useEffect(() => {
    loadPerformanceMode(profile?.id);
  }, [profile?.id, loadPerformanceMode]);

  const togglePerformanceMode = async () => {
    await setPerformanceMode(!isPerformanceMode, profile?.id);
  };

  const value: PerformanceModeContextType = {
    isPerformanceMode,
    isLoading,
    togglePerformanceMode,
  };

  return (
    <PerformanceModeContext.Provider value={value}>
      {children}
    </PerformanceModeContext.Provider>
  );
};
