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
 * Structure simplifiée par catégories: Alimentation, Activité, Santé
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
        color: '#F7931E',
        available: true,
        description: 'Retourner au tableau de bord principal'
      }
    ]
  },

  // ==================== CATÉGORIE: ALIMENTATION ====================
  {
    key: 'alimentation',
    title: 'Alimentation',
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
        id: 'scan-fridge',
        label: 'Scanner de Frigo',
        subtitle: 'Inventaire intelligent',
        icon: 'Refrigerator',
        route: '/fridge/scan',
        color: '#EC4899',
        available: true,
        description: 'Scanner le contenu de votre frigo'
      },
      {
        id: 'generate-recipe',
        label: 'Générateur de Recettes',
        subtitle: 'Recettes personnalisées',
        icon: 'ChefHat',
        route: '/fridge#recipes',
        color: '#8B5CF6',
        available: true,
        description: 'Générer des recettes personnalisées'
      },
      {
        id: 'generate-meal-plan',
        label: 'Générateur de Plan',
        subtitle: 'Plan alimentaire hebdo',
        icon: 'Calendar',
        route: '/fridge#plan',
        color: '#3B82F6',
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
  {
    key: 'activite',
    title: 'Activité',
    actions: [
      {
        id: 'activity-tracker',
        label: "Tracker d'Activité",
        subtitle: "Enregistrez vos séances",
        icon: 'Activity',
        route: '/activity/input',
        color: '#3B82F6',
        available: true,
        description: "Enregistrer une nouvelle séance d'activité"
      },
      {
        id: 'body-scan',
        label: 'Scanner Corporel',
        subtitle: 'Morphologie 3D',
        icon: 'Scan',
        route: '/body-scan',
        color: '#A855F7',
        available: true,
        description: 'Scanner et analyser votre corps en 3D'
      }
    ]
  },

  // ==================== CATÉGORIE: SANTÉ ====================
  {
    key: 'sante',
    title: 'Santé',
    actions: [
      {
        id: 'fasting-tracker',
        label: 'Tracker de Jeûne',
        subtitle: 'Gérez vos sessions',
        icon: 'Timer',
        route: '/fasting/input',
        color: '#F59E0B',
        available: true,
        description: 'Commencer une période de jeûne'
      },
      {
        id: 'vital-forge',
        label: 'Forge Vitale',
        subtitle: 'COMING SOON',
        icon: 'HeartPulse',
        route: '/vital',
        color: '#EF4444',
        available: false,
        description: 'Médecine préventive - Bientôt disponible'
      }
    ]
  }
];