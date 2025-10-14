/**
 * Configuration centralisée pour les onglets
 * Couleurs, animations et variantes uniformisées pour toute l'application
 */

import { Variants } from 'framer-motion';

/**
 * Mapping des couleurs par type d'onglet
 * Utilisé pour le fond dégradé et l'icône active
 */
export const TAB_COLORS: Record<string, string> = {
  // Profil
  'identity': '#60A5FA',    // Bleu pour identité
  'nutrition': '#10B981',   // Vert pour nutrition
  'health': '#EF4444',      // Rouge pour santé
  'fasting': '#F59E0B',     // Orange pour jeûne
  'preferences': '#18E3FF', // Cyan pour training

  // Atelier de Recettes (Fridge)
  'inventaire': '#06B6D4',  // Cyan pour inventaire
  'recipes': '#EC4899',     // Rose pour recettes
  'plan': '#8B5CF6',        // Violet pour plan
  'courses': '#F59E0B',     // Orange pour courses

  // Meals (Forge Nutritionnelle)
  'daily': '#10B981',       // Vert pour aujourd'hui (nutrition quotidienne)
  'insights': '#F59E0B',    // Orange pour insights nutritionnels
  'progression': '#06B6D4', // Cyan pour progression nutritionnelle
  'history': '#8B5CF6',     // Violet pour historique nutritionnel
  'journal': '#10B981',     // Vert pour journal (legacy)
  'statistiques': '#06B6D4', // Cyan pour statistiques (legacy)

  // Fasting (Forge du Temps)
  'timer': '#F59E0B',       // Orange pour timer
  'protocoles': '#06B6D4',  // Cyan pour protocoles

  // Activity (Forge Énergétique)
  'dailyActivity': '#3B82F6',       // Bleu pour récap du jour activité
  'input': '#3B82F6',       // Bleu pour saisie
  'insightsActivity': '#F59E0B',    // Orange pour insights énergétiques
  'progressionActivity': '#10B981', // Vert pour progression énergétique
  'historyActivity': '#8B5CF6',     // Violet pour historique énergétique

  // Body Scan (Forge Corporelle)
  'scanCta': '#8B5CF6',     // Violet pour scanner (nouvelle couleur)
  'scanner': '#8B5CF6',     // Violet pour scanner (nouvelle couleur)
  'avatar': '#06B6D4',      // Cyan pour avatar
  'projection': '#10B981',  // Vert pour projection
  'insightsAvatar': '#F59E0B', // Orange pour insights avatar (distinct de insights activity)
  'historyAvatar': '#8B5CF6',  // Violet pour historique avatar (distinct de history activity)
  'face': '#EC4899',        // Rose pour visage
  'comparaison': '#A855F7', // Violet pour comparaison

  // Training (Atelier de Training)
  'aujourd hui': '#18E3FF', // Cyan pour aujourd'hui
  'conseils': '#10B981',    // Vert pour conseils
  'progressionTraining': '#F59E0B', // Jaune/Orange pour progression training (distinct de progression activity)
  'records': '#EF4444',     // Rouge pour records
  'historiqueTraining': '#8B5CF6',  // Violet pour historique training (distinct de historique activity)
  'programmes': '#18E3FF',  // Cyan pour programmes
  'exercices': '#06B6D4',   // Cyan pour exercices

  // Settings
  'general': '#8B5CF6',     // Violet pour général
  'notifications': '#EC4899', // Rose pour notifications
  'confidentialite': '#3B82F6', // Bleu pour confidentialité

  // Notifications
  'recentes': '#EC4899',    // Rose pour récentes
  'parametres': '#8B5CF6',  // Violet pour paramètres
};

/**
 * Animation d'entrée uniforme pour tous les onglets
 * Remplace les animations incohérentes
 */
export const uniformTabPanelVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 0.8,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

/**
 * Animation de carte de section uniforme
 * Utilisée pour les GlassCard dans les onglets
 */
export const uniformSectionCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Container stagger pour animer plusieurs cartes séquentiellement
 */
export const uniformStaggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Variant pour les éléments dans un container stagger
 */
export const uniformStaggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

/**
 * Animation fade simple pour les boutons et actions
 */
export const uniformFadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Récupère la couleur d'un onglet
 */
export function getTabColor(tabValue: string): string | undefined {
  return TAB_COLORS[tabValue];
}

/**
 * Vérifie si l'animation réduite est activée
 */
export function shouldReduceMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Retourne les variants appropriés en fonction des préférences
 */
export function getOptimizedVariants(variants: Variants): Variants {
  if (shouldReduceMotion()) {
    return Object.keys(variants).reduce((acc, key) => {
      acc[key] = {
        ...(variants[key] as object),
        transition: { duration: 0 },
      };
      return acc;
    }, {} as Variants);
  }
  return variants;
}
