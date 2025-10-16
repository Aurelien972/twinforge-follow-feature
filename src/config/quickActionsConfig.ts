/**
 * Quick Actions Configuration
 * Configuration centralisée pour les actions rapides du panneau central
 */

import { ICONS } from '../ui/icons/registry';

export interface QuickAction {
  id: string;
  label: string;
  subtitle: string;
  icon: keyof typeof ICONS;
  route?: string;
  color: string;
  available: boolean;
  description: string;
  onClick?: () => void; // optionnel, déjà appelé côté composant
}

export interface QuickActionSection {
  key?: string; // facilite la sélection robuste côté UI
  title: string;
  actions: QuickAction[];
}

/**
 * Configuration des sections d'actions rapides
 */
export const QUICK_ACTION_SECTIONS: QuickActionSection[] = [
  {
    key: 'navigation',
    title: 'Navigation Principale',
    actions: [
      {
        id: 'home',
        label: 'Tableau de Bord',
        subtitle: 'Vue d\'ensemble TwinForge',
        icon: 'Home',
        route: '/',
        color: '#F7931E', // Orange brand color matching sidebar
        available: true,
        description: 'Retourner au tableau de bord principal'
      }
    ]
  },

  // ==================== CATÉGORIE: ALIMENTATION ====================
  // --- Outils de Suivi Alimentation
  {
    key: 'tracking-food',
    title: 'Outils de Suivi',
    actions: [
      {
        id: 'scan-meal',
        label: 'Scanner de Repas',
        subtitle: 'Analysez vos repas',
        icon: 'Camera',
        route: '/meals/scan',
        color: '#10B981',
        available: true,
        description: 'Analyser un repas avec précision'
      },
      {
        id: 'start-fasting',
        label: 'Tracker de Jeûne',
        subtitle: 'Gérez vos sessions',
        icon: 'Timer',
        route: '/fasting/input',
        color: '#F59E0B',
        available: true,
        description: 'Commencer une période de jeûne'
      }
    ]
  },

  // --- Générateurs Alimentation
  {
    key: 'generators-food',
    title: 'Générateurs',
    actions: [
      {
        id: 'generate-recipe',
        label: 'Générateur de Recettes',
        subtitle: 'Recettes personnalisées',
        icon: 'ChefHat',
        route: '/fridge#recipes',
        color: '#EC4899',
        available: true,
        description: 'Générer des recettes personnalisées'
      },
      {
        id: 'generate-meal-plan',
        label: 'Générateur de Plan',
        subtitle: 'Plan alimentaire hebdo',
        icon: 'Calendar',
        route: '/fridge#plan',
        color: '#8B5CF6',
        available: true,
        description: 'Générer un plan de repas personnalisé'
      },
      {
        id: 'generate-shopping-list',
        label: 'Générateur de Courses',
        subtitle: 'Liste optimisée',
        icon: 'ShoppingCart',
        route: '/fridge#courses',
        color: '#F59E0B',
        available: true,
        description: 'Créer une liste de courses optimisée'
      }
    ]
  },

  // ==================== CATÉGORIE: ACTIVITÉ ====================
  // --- Outils de Suivi Activité
  {
    key: 'tracking-activity',
    title: 'Outils de Suivi',
    actions: [
      {
        id: 'forge-energy',
        label: "Tracker d'Activité",
        subtitle: "Enregistrez vos séances",
        icon: 'Activity',
        route: '/activity/input',
        color: '#3B82F6',
        available: true,
        description: "Enregistrer une nouvelle séance d'activité"
      }
    ]
  },

  // --- Générateurs Activité
  {
    key: 'generators-activity',
    title: 'Générateurs',
    actions: [
      {
        id: 'generate-training',
        label: "Générateur d'Entraînement",
        subtitle: 'Programme personnalisé',
        icon: 'Target',
        route: '/training/pipeline',
        color: '#18E3FF',
        available: true,
        description: "Plan d'entraînement personnalisé"
      }
    ]
  },

  // ==================== CATÉGORIE: SANTÉ ====================
  // --- Outils de Suivi Santé
  {
    key: 'tracking-health',
    title: 'Outils de Suivi',
    actions: [
      {
        id: 'body-scan',
        label: 'Scanner Corporel',
        subtitle: 'Morphologie 3D',
        icon: 'Scan',
        route: '/body-scan',
        color: '#D946EF',
        available: true,
        description: 'Scanner et analyser votre corps en 3D'
      }
    ]
  }
];