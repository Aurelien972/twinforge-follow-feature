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

  // --- SUIVI : 4 tuiles principales
  {
    key: 'tracking',
    title: 'Outils de Suivi',
    actions: [
      {
        id: 'scan-meal',
        label: 'Scanner de Repas',
        subtitle: 'Capturez et analysez vos repas',
        icon: 'Camera',
        route: '/meals/scan',
        color: '#10B981', // Vert nutrition
        available: true,
        description: 'Analyser un repas avec précision'
      },
      {
        id: 'forge-energy',
        label: "Tracker d'Activité",
        subtitle: "Enregistrez votre séance d'activité",
        icon: 'Activity',
        route: '/activity/input',
        color: '#3B82F6', // Bleu activité
        available: true,
        description: "Enregistrer une nouvelle séance d'activité"
      },
      {
        id: 'start-fasting',
        label: 'Tracker de Jeûne',
        subtitle: 'Démarrez ou terminez une session',
        icon: 'Timer',
        route: '/fasting/input',
        color: '#F59E0B', // Orange jeûne
        available: true,
        description: 'Commencer une période de jeûne'
      },
      {
        id: 'body-scan',
        label: 'Scanner Corporel',
        subtitle: 'Analysez votre morphologie en 3D',
        icon: 'Scan',
        route: '/body-scan',
        color: '#D946EF', // Fuchsia
        available: true,
        description: 'Scanner et analyser votre corps en 3D'
      }
    ]
  },

  // --- ATELIER DES SAVEURS : 4 boutons en 2x2
  {
    key: 'flavors',
    title: 'Atelier des Saveurs',
    actions: [
      {
        id: 'fridge-scan',
        label: 'Scanner de Frigo',
        subtitle: 'Détectez les ingrédients de votre frigo',
        icon: 'Refrigerator',
        route: '/fridge/scan',
        color: '#06B6D4', // Cyan
        available: true,
        description: 'Scanner votre frigo pour des recettes'
      },
      {
        id: 'generate-recipe',
        label: 'Générateur de recettes',
        subtitle: '',
        icon: 'ChefHat',
        route: '/fridge#recipes',
        color: '#EC4899', // Rose
        available: true,
        description: 'Générer des recettes personnalisées'
      },
      {
        id: 'generate-meal-plan',
        label: 'Générateur de plan repas',
        subtitle: '',
        icon: 'Calendar',
        route: '/fridge#plan',
        color: '#8B5CF6', // Violet
        available: true,
        description: 'Générer un plan de repas personnalisé'
      },
      {
        id: 'generate-shopping-list',
        label: 'Générateur de liste de courses',
        subtitle: '',
        icon: 'ShoppingCart',
        route: '/fridge#courses',
        color: '#F59E0B', // Orange
        available: true,
        description: 'Créer une liste de courses optimisée'
      }
    ]
  },

  // --- WORKOUT
  {
    key: 'workout',
    title: 'Atelier Workout',
    actions: [
      {
        id: 'generate-training',
        label: "Générateur d'Entraînement",
        subtitle: '',
        icon: 'Target',
        route: '/training/pipeline',
        color: '#18E3FF',
        available: true,
        description: "Plan d'entraînement personnalisé"
      }
    ]
  }
];