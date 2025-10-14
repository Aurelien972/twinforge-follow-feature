import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { getTabColorWithContext } from '@/ui/tabs/tabsConfig';

/**
 * Hook personnalisé pour récupérer la couleur de l'onglet actif de la Forge du Temps
 * Utilisé pour appliquer dynamiquement les couleurs aux composants selon l'onglet actif
 */
export function useFastingTabColor() {
  const location = useLocation();

  const activeTab = useMemo(() => {
    const hash = location.hash.replace('#', '');
    return hash && ['daily', 'insights', 'progression', 'history'].includes(hash) ? hash : 'daily';
  }, [location.hash]);

  const tabColor = useMemo(() => {
    return getTabColorWithContext(activeTab, 'fasting');
  }, [activeTab]);

  return {
    activeTab,
    tabColor: tabColor || '#F59E0B', // Fallback to orange
    isDailyTab: activeTab === 'daily',
    isInsightsTab: activeTab === 'insights',
    isProgressionTab: activeTab === 'progression',
    isHistoryTab: activeTab === 'history',
  };
}

/**
 * Récupère la couleur spécifique pour chaque onglet de la Forge du Temps
 */
export function getFastingTabColor(tab: 'daily' | 'insights' | 'progression' | 'history'): string {
  const colors = {
    daily: '#F59E0B',     // Orange
    insights: '#10B981',  // Vert
    progression: '#06B6D4', // Cyan
    history: '#8B5CF6',   // Violet
  };
  return colors[tab];
}
