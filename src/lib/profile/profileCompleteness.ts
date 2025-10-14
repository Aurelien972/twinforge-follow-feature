/**
 * Profile Completeness Utilities
 * Functions for checking profile completeness
 */

import type { UserProfile } from '../../domain/profile';

export interface ProfileCompletenessResult {
  percentage: number;
  missingFields: string[];
  isComplete: boolean;
}

/**
 * Calculate profile completeness percentage
 */
export function calculateProfileCompleteness(profile: UserProfile | null): ProfileCompletenessResult {
  if (!profile) {
    return {
      percentage: 0,
      missingFields: ['Profil non chargé'],
      isComplete: false
    };
  }

  const requiredFields = [
    { key: 'sex', label: 'Genre' },
    { key: 'weight_kg', label: 'Poids' },
    { key: 'height_cm', label: 'Taille' },
    { key: 'objective', label: 'Objectif' },
    { key: 'activity_level', label: 'Niveau d\'activité' }
  ];

  const completedFields = requiredFields.filter(field => {
    const value = (profile as any)[field.key];
    return value !== null && value !== undefined && value !== '';
  });

  const missingFields = requiredFields
    .filter(field => {
      const value = (profile as any)[field.key];
      return value === null || value === undefined || value === '';
    })
    .map(field => field.label);

  const percentage = Math.round((completedFields.length / requiredFields.length) * 100);

  return {
    percentage,
    missingFields,
    isComplete: percentage === 100
  };
}

/**
 * Get a status message based on profile completeness
 */
export function getProfileStatusMessage(completeness: ProfileCompletenessResult): string {
  if (completeness.isComplete) {
    return 'Votre profil est complet !';
  }

  if (completeness.percentage >= 80) {
    return 'Votre profil est presque complet';
  }

  if (completeness.percentage >= 50) {
    return 'Complétez votre profil pour des analyses plus précises';
  }

  return 'Complétez votre profil pour débloquer toutes les fonctionnalités';
}

/**
 * Get the most important missing fields
 */
export function getMostImportantMissingFields(profile: UserProfile | null): string[] {
  const completeness = calculateProfileCompleteness(profile);
  return completeness.missingFields.slice(0, 3);
}
