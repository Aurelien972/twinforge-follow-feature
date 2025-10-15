/**
 * useHealthProfileNavigation Hook
 * Manages tab navigation and active state for Health Profile page
 */

import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type HealthProfileTab =
  | 'basic-info'
  | 'family-history'
  | 'lifestyle'
  | 'intimacy'
  | 'geographic'
  | 'vital-signs';

export interface TabConfig {
  id: HealthProfileTab;
  label: string;
  icon: string;
  description: string;
  color: string;
  requiredForAI: boolean;
  title: string;
  subtitle: string;
}

export const HEALTH_PROFILE_TABS: TabConfig[] = [
  {
    id: 'basic-info',
    label: 'Base',
    icon: 'Scale',
    description: 'Groupe sanguin, mensurations, vaccinations',
    color: '#EF4444',
    requiredForAI: true,
    title: 'Informations Médicales de Base',
    subtitle: 'Groupe sanguin, vaccinations, allergies et médicaments actuels',
  },
  {
    id: 'lifestyle',
    label: 'Vie',
    icon: 'Coffee',
    description: 'Habitudes quotidiennes',
    color: '#F59E0B',
    requiredForAI: true,
    title: 'Habitudes de Vie',
    subtitle: 'Sommeil, stress, hydratation et temps d\'écran quotidien',
  },
  {
    id: 'intimacy',
    label: 'Intimité',
    icon: 'Heart',
    description: 'Santé sexuelle et reproductive',
    color: '#EC4899',
    requiredForAI: true,
    title: 'Santé Intime',
    subtitle: 'Santé sexuelle, reproductive et suivi gynécologique ou andrologique',
  },
  {
    id: 'family-history',
    label: 'Famille',
    icon: 'Users',
    description: 'Antécédents familiaux et prédispositions génétiques',
    color: '#06B6D4',
    requiredForAI: true,
    title: 'Antécédents Familiaux',
    subtitle: 'Historique médical familial et prédispositions héréditaires',
  },
  {
    id: 'vital-signs',
    label: 'Vitales',
    icon: 'Activity',
    description: 'Tension, fréquence cardiaque, glycémie',
    color: '#8B5CF6',
    requiredForAI: true,
    title: 'Signes Vitaux',
    subtitle: 'Tension artérielle, fréquence cardiaque et glycémie',
  },
  {
    id: 'geographic',
    label: 'Géo',
    icon: 'MapPin',
    description: 'Environnement, météo, qualité de l\'air',
    color: '#3B82F6',
    requiredForAI: false,
    title: 'Environnement Géographique',
    subtitle: 'Météo, qualité de l\'air et contexte sanitaire local',
  },
];

export function useHealthProfileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = useMemo<HealthProfileTab>(() => {
    const hash = location.hash.replace('#', '') as HealthProfileTab;
    return HEALTH_PROFILE_TABS.find(tab => tab.id === hash)?.id || 'basic-info';
  }, [location.hash]);

  const [completionByTab, setCompletionByTab] = useState<Record<HealthProfileTab, number>>({
    'basic-info': 0,
    'family-history': 0,
    'lifestyle': 0,
    'intimacy': 0,
    'geographic': 0,
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
