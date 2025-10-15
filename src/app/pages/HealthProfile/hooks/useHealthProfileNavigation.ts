/**
 * useHealthProfileNavigation Hook
 * Manages tab navigation and active state for Health Profile page
 */

import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type HealthProfileTab =
  | 'overview'
  | 'basic-info'
  | 'lifestyle'
  | 'medical-history'
  | 'family-history'
  | 'vital-signs';

export interface TabConfig {
  id: HealthProfileTab;
  label: string;
  icon: string;
  description: string;
  color: string;
  requiredForAI: boolean;
}

export const HEALTH_PROFILE_TABS: TabConfig[] = [
  {
    id: 'overview',
    label: 'Vue',
    icon: 'LayoutDashboard',
    description: 'Tableau de bord et métriques clés',
    color: '#06B6D4',
    requiredForAI: false,
  },
  {
    id: 'basic-info',
    label: 'Base',
    icon: 'Scale',
    description: 'Groupe sanguin, mensurations, vaccinations',
    color: '#06B6D4',
    requiredForAI: true,
  },
  {
    id: 'lifestyle',
    label: 'Vie',
    icon: 'Coffee',
    description: 'Habitudes quotidiennes',
    color: '#FF9800',
    requiredForAI: true,
  },
  {
    id: 'medical-history',
    label: 'Historique',
    icon: 'FileText',
    description: 'Conditions, traitements, interventions',
    color: '#EF4444',
    requiredForAI: true,
  },
  {
    id: 'family-history',
    label: 'Famille',
    icon: 'Users',
    description: 'Antécédents familiaux',
    color: '#A855F7',
    requiredForAI: true,
  },
  {
    id: 'vital-signs',
    label: 'Vitales',
    icon: 'Activity',
    description: 'Tension, fréquence cardiaque, glycémie',
    color: '#EF4444',
    requiredForAI: true,
  },
];

export function useHealthProfileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = useMemo<HealthProfileTab>(() => {
    const hash = location.hash.replace('#', '') as HealthProfileTab;
    return HEALTH_PROFILE_TABS.find(tab => tab.id === hash)?.id || 'overview';
  }, [location.hash]);

  const [completionByTab, setCompletionByTab] = useState<Record<HealthProfileTab, number>>({
    'overview': 100,
    'basic-info': 0,
    'lifestyle': 0,
    'medical-history': 0,
    'family-history': 0,
    'vital-signs': 0,
  });

  const navigateToTab = useCallback((tabId: HealthProfileTab) => {
    navigate(`/health-profile#${tabId}`, { replace: true });
  }, [navigate]);

  const getTabConfig = useCallback((tabId: HealthProfileTab): TabConfig | undefined => {
    return HEALTH_PROFILE_TABS.find(tab => tab.id === tabId);
  }, []);

  const updateTabCompletion = useCallback((tabId: HealthProfileTab, completion: number) => {
    setCompletionByTab(prev => ({
      ...prev,
      [tabId]: Math.max(0, Math.min(100, completion)),
    }));
  }, []);

  const globalCompletion = useMemo(() => {
    const requiredTabs = HEALTH_PROFILE_TABS.filter(tab => tab.requiredForAI);
    const requiredCompletions = requiredTabs.map(tab => completionByTab[tab.id]);
    const total = requiredCompletions.reduce((sum, val) => sum + val, 0);
    return Math.round(total / requiredTabs.length);
  }, [completionByTab]);

  const aiReadiness = useMemo(() => {
    const requiredTabs = HEALTH_PROFILE_TABS.filter(tab => tab.requiredForAI);
    const allRequired80Plus = requiredTabs.every(tab => completionByTab[tab.id] >= 80);
    return allRequired80Plus;
  }, [completionByTab]);

  const nextIncompleteTab = useMemo(() => {
    const requiredTabs = HEALTH_PROFILE_TABS.filter(tab => tab.requiredForAI);
    return requiredTabs.find(tab => completionByTab[tab.id] < 100);
  }, [completionByTab]);

  return {
    activeTab,
    navigateToTab,
    getTabConfig,
    completionByTab,
    updateTabCompletion,
    globalCompletion,
    aiReadiness,
    nextIncompleteTab,
    allTabs: HEALTH_PROFILE_TABS,
  };
}
