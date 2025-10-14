/**
 * useHealthProfileNavigation Hook
 * Manages tab navigation and active state for Health Profile page
 */

import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type HealthProfileTab =
  | 'overview'
  | 'medical-history'
  | 'family-history'
  | 'vital-signs'
  | 'lifestyle'
  | 'vaccinations'
  | 'mental-health'
  | 'reproductive-health'
  | 'emergency-contacts'
  | 'history'
  | 'insights'
  | 'import-export';

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
    label: 'Vue d\'ensemble',
    icon: 'LayoutDashboard',
    description: 'Tableau de bord et métriques clés',
    color: '#06B6D4',
    requiredForAI: false,
  },
  {
    id: 'medical-history',
    label: 'Historique Médical',
    icon: 'FileText',
    description: 'Conditions, traitements, interventions',
    color: '#EF4444',
    requiredForAI: true,
  },
  {
    id: 'family-history',
    label: 'Antécédents Familiaux',
    icon: 'Users',
    description: 'Prédispositions génétiques',
    color: '#8B5CF6',
    requiredForAI: true,
  },
  {
    id: 'vital-signs',
    label: 'Constantes Vitales',
    icon: 'Activity',
    description: 'Tension, fréquence cardiaque, glycémie',
    color: '#F59E0B',
    requiredForAI: true,
  },
  {
    id: 'lifestyle',
    label: 'Style de Vie',
    icon: 'Coffee',
    description: 'Habitudes quotidiennes',
    color: '#3B82F6',
    requiredForAI: true,
  },
  {
    id: 'vaccinations',
    label: 'Vaccinations',
    icon: 'Shield',
    description: 'Carnet vaccinal et rappels',
    color: '#14B8A6',
    requiredForAI: false,
  },
  {
    id: 'mental-health',
    label: 'Santé Mentale',
    icon: 'Brain',
    description: 'Bien-être psychologique',
    color: '#A855F7',
    requiredForAI: false,
  },
  {
    id: 'reproductive-health',
    label: 'Santé Reproductive',
    icon: 'Heart',
    description: 'Données spécifiques cycle de vie',
    color: '#EC4899',
    requiredForAI: false,
  },
  {
    id: 'emergency-contacts',
    label: 'Contacts d\'Urgence',
    icon: 'Phone',
    description: 'Informations critiques',
    color: '#EF4444',
    requiredForAI: false,
  },
  {
    id: 'history',
    label: 'Historique',
    icon: 'Clock',
    description: 'Évolution temporelle',
    color: '#6366F1',
    requiredForAI: false,
  },
  {
    id: 'insights',
    label: 'Analyses IA',
    icon: 'Sparkles',
    description: 'Intelligence artificielle préventive',
    color: '#F59E0B',
    requiredForAI: false,
  },
  {
    id: 'import-export',
    label: 'Import/Export',
    icon: 'Download',
    description: 'Gestion des données',
    color: '#64748B',
    requiredForAI: false,
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
    'medical-history': 0,
    'family-history': 0,
    'vital-signs': 0,
    'lifestyle': 0,
    'vaccinations': 0,
    'mental-health': 0,
    'reproductive-health': 0,
    'emergency-contacts': 0,
    'history': 100,
    'insights': 100,
    'import-export': 100,
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
