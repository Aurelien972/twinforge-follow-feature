/**
 * Navigation System - TwinForge
 * Architecture hiérarchisée en 3 niveaux:
 * 1. Navigation Principale (Tableau de Bord)
 * 2. Navigation Twin (Mon Twin)
 * 3. Forges par Catégories (Alimentation, Activité, Santé)
 */

import { ICONS } from '../../ui/icons/registry';

interface NavSubItem {
  to: string;
  icon: keyof typeof ICONS;
  label: string;
  isPrimarySubMenu?: boolean; // Le sous-menu principal mis en avant
}

interface NavItem {
  to: string;
  icon: keyof typeof ICONS;
  label: string;
  subtitle: string;
  actionLabel?: string; // Label de l'action principale (Scanner, Tracker, etc.)
  isPrimary?: boolean;
  isTwin?: boolean;
  isForge?: boolean;
  circuitColor?: string;
  tabs?: string[]; // Onglets disponibles pour cette page
  subItems?: NavSubItem[]; // Sous-menus pour les forges
}

interface NavSection {
  title: string;
  type?: 'primary' | 'twin' | 'forge-category'; // Type de section pour styling différencié
  items: NavItem[];
}

/**
 * Structure de navigation hiérarchisée pour TwinForge
 */
export function navFor(): NavSection[] {
  const sections: NavSection[] = [
    // ========================================
    // NIVEAU 1: Navigation Principale
    // ========================================
    {
      title: '',
      type: 'primary',
      items: [
        {
          to: '/',
          icon: 'Home',
          label: 'Tableau de Bord',
          subtitle: 'Vue d\'ensemble TwinForge',
          isPrimary: true,
          circuitColor: '#F7931E' // Logo Orange
        },
      ],
    },

    // ========================================
    // NIVEAU 2: Navigation Twin
    // ========================================
    {
      title: '',
      type: 'twin',
      items: [
        {
          to: '/avatar',
          icon: 'User',
          label: 'Mon Twin',
          subtitle: 'Avatar 3D & Morphologie',
          isTwin: true,
          circuitColor: '#8B5CF6', // Violet
          tabs: ['Scanner', 'Avatar', 'Projection', 'Insights', 'Historique']
        },
      ],
    },

    // ========================================
    // NIVEAU 3: Forges par Catégories
    // ========================================

    // CATÉGORIE: Alimentation
    {
      title: 'Alimentation',
      type: 'forge-category',
      items: [
        {
          to: '/meals',
          icon: 'Utensils',
          label: 'Forge Nutritionnelle',
          subtitle: 'Nutrition & Repas',
          actionLabel: 'Scanner',
          isForge: true,
          circuitColor: '#10B981', // Vert
          tabs: ['Scanner', 'Insights', 'Progression', 'Historique'],
          subItems: [
            {
              to: '/meals#daily',
              icon: 'ScanLine',
              label: 'Scanner',
              isPrimarySubMenu: true
            },
            {
              to: '/meals#insights',
              icon: 'TrendingUp',
              label: 'Insights'
            },
            {
              to: '/meals#progression',
              icon: 'BarChart3',
              label: 'Progression'
            },
            {
              to: '/meals#history',
              icon: 'History',
              label: 'Historique'
            }
          ]
        },
        {
          to: '/fridge',
          icon: 'ChefHat',
          label: 'Forge Culinaire',
          subtitle: 'Recettes & Plans',
          actionLabel: 'Scanner',
          isForge: true,
          circuitColor: '#EC4899', // Rose
          tabs: ['Scanner', 'Inventaire', 'Recettes', 'Plan', 'Courses']
        },
      ],
    },

    // CATÉGORIE: Activité
    {
      title: 'Activité',
      type: 'forge-category',
      items: [
        {
          to: '/activity',
          icon: 'Activity',
          label: 'Forge Énergétique',
          subtitle: 'Activités & Dépenses',
          actionLabel: 'Tracker',
          isForge: true,
          circuitColor: '#3B82F6', // Bleu
          tabs: ['Tracker', 'Insights', 'Progression', 'Historique']
        },
        {
          to: '/training',
          icon: 'Dumbbell',
          label: 'Forge Corporelle',
          subtitle: 'Training & Performance',
          actionLabel: 'Générer',
          isForge: true,
          circuitColor: '#18E3FF', // Cyan électrique
          tabs: ['Aujourd\'hui', 'Programmes', 'Progression', 'Historique']
        },
      ],
    },

    // CATÉGORIE: Santé
    {
      title: 'Santé',
      type: 'forge-category',
      items: [
        {
          to: '/fasting',
          icon: 'Timer',
          label: 'Forge du Temps',
          subtitle: 'Jeûne Intermittent',
          actionLabel: 'Tracker',
          isForge: true,
          circuitColor: '#F59E0B', // Orange
          tabs: ['Tracker', 'Insights', 'Progression', 'Historique']
        },
        {
          to: '/vital',
          icon: 'HeartPulse',
          label: 'Forge Vitale',
          subtitle: 'Santé & Prévention',
          actionLabel: 'Analyser',
          isForge: true,
          circuitColor: '#EF4444', // Rouge santé
          tabs: ['Dossier', 'Analyses', 'Suivi', 'Prévention']
        },
      ],
    },
  ];

  return sections;
}
