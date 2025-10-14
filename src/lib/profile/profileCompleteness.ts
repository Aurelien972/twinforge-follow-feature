/**
 * Profile Completeness Utilities
 * Functions for checking profile completeness
 */

import type { UserProfile } from '../../domain/profile';

export interface ProfileCompletenessResult {
  percentage: number;
  missingFields: string[];
  missingCritical: string[];
  isComplete: boolean;
  canProvideAccurateAnalysis: boolean;
}

export interface ProfileStatusMessage {
  title: string;
  type: 'error' | 'warning' | 'info' | 'success';
  actionText?: string;
}

/**
 * Calculate profile completeness percentage
 */
export function calculateProfileCompleteness(profile: UserProfile | null): ProfileCompletenessResult {
  if (!profile) {
    return {
      percentage: 0,
      missingFields: ['Profil non chargé'],
      missingCritical: ['Genre', 'Poids', 'Taille', 'Objectif'],
      isComplete: false,
      canProvideAccurateAnalysis: false
    };
  }

  // Critical fields required for accurate nutritional analysis
  const criticalFields = [
    { key: 'sex', label: 'Genre' },
    { key: 'weight_kg', label: 'Poids' },
    { key: 'height_cm', label: 'Taille' },
    { key: 'objective', label: 'Objectif' }
  ];

  // All recommended fields for best experience
  const requiredFields = [
    ...criticalFields,
    { key: 'activity_level', label: 'Niveau d\'activité' },
    { key: 'birthdate', label: 'Date de naissance' },
    { key: 'target_weight_kg', label: 'Poids cible' }
  ];

  const missingCritical = criticalFields
    .filter(field => {
      const value = (profile as any)[field.key];
      return value === null || value === undefined || value === '';
    })
    .map(field => field.label);

  const missingFields = requiredFields
    .filter(field => {
      const value = (profile as any)[field.key];
      return value === null || value === undefined || value === '';
    })
    .map(field => field.label);

  const completedFields = requiredFields.filter(field => {
    const value = (profile as any)[field.key];
    return value !== null && value !== undefined && value !== '';
  });

  const percentage = Math.round((completedFields.length / requiredFields.length) * 100);

  return {
    percentage,
    missingFields,
    missingCritical,
    isComplete: percentage === 100,
    canProvideAccurateAnalysis: missingCritical.length === 0
  };
}

/**
 * Get a status message based on profile completeness
 */
export function getProfileStatusMessage(completeness: ProfileCompletenessResult): ProfileStatusMessage {
  if (completeness.missingCritical.length > 0) {
    return {
      title: 'Profil incomplet - Analyses limitées',
      type: 'error',
      actionText: 'Compléter maintenant'
    };
  }

  if (completeness.isComplete) {
    return {
      title: 'Votre profil est complet !',
      type: 'success',
      actionText: 'Voir le profil'
    };
  }

  if (completeness.percentage >= 80) {
    return {
      title: 'Votre profil est presque complet',
      type: 'info',
      actionText: 'Finaliser'
    };
  }

  if (completeness.percentage >= 60) {
    return {
      title: 'Complétez votre profil pour des analyses plus précises',
      type: 'warning',
      actionText: 'Compléter'
    };
  }

  return {
    title: 'Complétez votre profil pour débloquer toutes les fonctionnalités',
    type: 'warning',
    actionText: 'Commencer'
  };
}

/**
 * Get the most important missing fields
 */
export function getMostImportantMissingFields(profile: UserProfile | null): string[] {
  const completeness = calculateProfileCompleteness(profile);
  return completeness.missingCritical.length > 0
    ? completeness.missingCritical
    : completeness.missingFields.slice(0, 3);
}
