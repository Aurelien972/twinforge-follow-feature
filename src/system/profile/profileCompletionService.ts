/**
 * Profile Completion Service
 * Service for checking profile completeness and providing guidance for Recipe Workshop
 */

import type { UserProfile } from '../../domain/profile';
import logger from '../../lib/utils/logger';

export interface CriticalField {
  key: string;
  label: string;
  description: string;
  profileTab: 'identity' | 'nutrition' | 'health' | 'fasting' | 'preferences' | 'avatar';
  priority: 'high' | 'medium' | 'low';
}

export interface ProfileCompletionResult {
  isSufficient: boolean;
  completionPercentage: number;
  missingCriticalFields: CriticalField[];
  missingHighPriorityFields: CriticalField[];
  suggestedMessage: string;
  nextAction: {
    label: string;
    route: string;
  } | null;
}

/**
 * Critical fields required for optimal Recipe Workshop experience
 */
const CRITICAL_FIELDS: CriticalField[] = [
  // High Priority - Essential for basic functionality
  {
    key: 'sex',
    label: 'Genre',
    description: 'Nécessaire pour calculer les besoins nutritionnels',
    profileTab: 'identity',
    priority: 'high'
  },
  {
    key: 'weight_kg',
    label: 'Poids',
    description: 'Essentiel pour les portions et calories',
    profileTab: 'identity',
    priority: 'high'
  },
  {
    key: 'height_cm',
    label: 'Taille',
    description: 'Nécessaire pour les calculs métaboliques',
    profileTab: 'identity',
    priority: 'high'
  },
  {
    key: 'allergies',
    label: 'Allergies',
    description: 'Important pour la sécurité alimentaire',
    profileTab: 'nutrition',
    priority: 'medium'
  },
  {
    key: 'householdDetails.adults',
    label: 'Nombre d\'adultes',
    description: 'Pour adapter les portions des recettes',
    profileTab: 'nutrition',
    priority: 'high'
  },
  
  // Medium Priority - Important for personalization
  {
    key: 'diet',
    label: 'Régime alimentaire',
    description: 'Pour des recettes adaptées à votre style',
    profileTab: 'nutrition',
    priority: 'medium'
  },
  {
    key: 'mealPrepPreferences.cookingSkill',
    label: 'Niveau de cuisine',
    description: 'Pour adapter la complexité des recettes',
    profileTab: 'nutrition',
    priority: 'medium'
  },
  {
    key: 'kitchenEquipment',
    label: 'Équipement de cuisine',
    description: 'Pour des recettes réalisables chez vous',
    profileTab: 'nutrition',
    priority: 'medium'
  },
  {
    key: 'objective',
    label: 'Objectif fitness',
    description: 'Pour des recettes alignées sur vos objectifs',
    profileTab: 'identity',
    priority: 'medium'
  },
  
  // Low Priority - Nice to have for advanced personalization
  {
    key: 'intolerances',
    label: 'Intolérances',
    description: 'Pour éviter les inconforts digestifs',
    profileTab: 'nutrition',
    priority: 'low'
  },
  {
    key: 'foodPreferences.cuisines',
    label: 'Cuisines préférées',
    description: 'Pour des recettes qui vous plaisent',
    profileTab: 'nutrition',
    priority: 'low'
  },
  {
    key: 'macroTargets.kcal',
    label: 'Objectif calories',
    description: 'Pour des recettes équilibrées',
    profileTab: 'fasting',
    priority: 'low'
  }
];

/**
 * Check if a field exists and has a meaningful value
 */
function hasValidValue(profile: any, fieldKey: string): boolean {
  // Special case for allergies - if user explicitly said they have no allergies, consider it valid
  if (fieldKey === 'allergies') {
    const hasAllergies = profile?.nutrition?.allergies && Array.isArray(profile.nutrition.allergies) && profile.nutrition.allergies.length > 0;
    const noKnownAllergies = profile?.nutrition?.noKnownAllergies === true;
    return hasAllergies || noKnownAllergies;
  }
  
  const keys = fieldKey.split('.');
  let current = profile;
  
  for (const key of keys) {
    if (!current || current[key] === undefined || current[key] === null) {
      return false;
    }
    current = current[key];
  }
  
  // Additional checks for meaningful values
  if (typeof current === 'string' && current.trim() === '') {
    return false;
  }
  
  if (Array.isArray(current) && current.length === 0) {
    return false;
  }
  
  if (typeof current === 'object' && Object.keys(current).length === 0) {
    return false;
  }
  
  if (typeof current === 'number' && current <= 0) {
    return false;
  }
  
  return true;
}

/**
 * Calculate profile completion for Recipe Workshop
 */
export function calculateRecipeWorkshopCompletion(profile: UserProfile | null): ProfileCompletionResult {
  if (!profile) {
    return {
      isSufficient: false,
      completionPercentage: 0,
      missingCriticalFields: CRITICAL_FIELDS,
      missingHighPriorityFields: CRITICAL_FIELDS.filter(f => f.priority === 'high'),
      suggestedMessage: 'Créez votre profil pour des recettes personnalisées',
      nextAction: {
        label: 'Créer mon profil',
        route: '/profile#identity'
      }
    };
  }

  logger.debug('PROFILE_COMPLETION_SERVICE', 'Calculating Recipe Workshop completion', {
    userId: profile.userId,
    hasBasicInfo: !!(profile.sex && profile.weight_kg && profile.height_cm),
    hasNutritionInfo: !!(profile.nutrition),
    hasHouseholdInfo: !!(profile.householdDetails),
    timestamp: new Date().toISOString()
  });

  const missingFields: CriticalField[] = [];
  const missingHighPriorityFields: CriticalField[] = [];
  
  // Check each critical field
  CRITICAL_FIELDS.forEach(field => {
    if (!hasValidValue(profile, field.key)) {
      missingFields.push(field);
      if (field.priority === 'high') {
        missingHighPriorityFields.push(field);
      }
    }
  });

  // Calculate completion percentage
  const totalFields = CRITICAL_FIELDS.length;
  const completedFields = totalFields - missingFields.length;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  // Determine if profile is sufficient for recipe generation
  // Require at least all high priority fields + 50% of medium priority fields
  const highPriorityFields = CRITICAL_FIELDS.filter(f => f.priority === 'high');
  const mediumPriorityFields = CRITICAL_FIELDS.filter(f => f.priority === 'medium');
  const missingMediumFields = missingFields.filter(f => f.priority === 'medium');
  
  const hasAllHighPriority = missingHighPriorityFields.length === 0;
  const hasEnoughMediumPriority = missingMediumFields.length <= Math.floor(mediumPriorityFields.length * 0.5);
  
  const isSufficient = hasAllHighPriority && hasEnoughMediumPriority;

  // Generate guidance message and next action
  let suggestedMessage: string;
  let nextAction: { label: string; route: string } | null = null;

  if (missingHighPriorityFields.length > 0) {
    const firstMissing = missingHighPriorityFields[0];
    suggestedMessage = `Complétez votre ${firstMissing.label.toLowerCase()} pour des recettes personnalisées`;
    nextAction = {
      label: `Ajouter ${firstMissing.label}`,
      route: `/profile#${firstMissing.profileTab}`
    };
  } else if (missingFields.length > 0) {
    const firstMissing = missingFields[0];
    suggestedMessage = `Ajoutez votre ${firstMissing.label.toLowerCase()} pour une meilleure personnalisation`;
    nextAction = {
      label: `Compléter ${firstMissing.label}`,
      route: `/profile#${firstMissing.profileTab}`
    };
  } else {
    suggestedMessage = 'Profil complet ! Recettes ultra-personnalisées disponibles';
    nextAction = null;
  }

  logger.debug('PROFILE_COMPLETION_SERVICE', 'Recipe Workshop completion calculated', {
    userId: profile.userId,
    isSufficient,
    completionPercentage,
    missingHighPriorityCount: missingHighPriorityFields.length,
    missingTotalCount: missingFields.length,
    hasAllHighPriority,
    hasEnoughMediumPriority,
    timestamp: new Date().toISOString()
  });

  return {
    isSufficient,
    completionPercentage,
    missingCriticalFields: missingFields,
    missingHighPriorityFields,
    suggestedMessage,
    nextAction
  };
}

/**
 * Get specific guidance for a particular Recipe Workshop feature
 */
export function getFeatureSpecificGuidance(
  profile: UserProfile | null,
  feature: 'recipes' | 'shopping' | 'planning'
): {
  canProceed: boolean;
  warningMessage?: string;
  missingForFeature: CriticalField[];
} {
  const completion = calculateRecipeWorkshopCompletion(profile);
  
  // Feature-specific requirements
  const featureRequirements = {
    recipes: ['sex', 'weight_kg', 'allergies', 'householdDetails.adults'],
    shopping: ['householdDetails.adults', 'allergies', 'shoppingPreferences.frequencyPerWeek'],
    planning: ['householdDetails.adults', 'mealPrepPreferences.cookingSkill', 'macroTargets.kcal']
  };

  const requiredFields = featureRequirements[feature] || [];
  const missingForFeature = completion.missingCriticalFields.filter(field => 
    requiredFields.includes(field.key)
  );

  const canProceed = missingForFeature.length === 0 || completion.isSufficient;
  
  let warningMessage = '';
  if (!canProceed && missingForFeature.length > 0) {
    const fieldNames = missingForFeature.slice(0, 2).map(f => f.label.toLowerCase()).join(' et ');
    warningMessage = `Ajoutez votre ${fieldNames} pour une ${feature === 'recipes' ? 'génération' : feature === 'shopping' ? 'liste' : 'planification'} optimale`;
  }

  return {
    canProceed,
    warningMessage,
    missingForFeature
  };
}

/**
 * Check if user has minimum data for any Recipe Workshop functionality
 */
export function hasMinimumDataForRecipeWorkshop(profile: UserProfile | null): boolean {
  if (!profile) return false;

  // Absolute minimum: at least basic identity info
  return !!(profile.sex && profile.weight_kg && profile.height_cm);
}

/**
 * Profile Completion Service Object
 * Convenient wrapper for all profile completion functions
 */
export const profileCompletionService = {
  checkCompleteness: calculateRecipeWorkshopCompletion,
  getFeatureGuidance: getFeatureSpecificGuidance,
  hasMinimumData: hasMinimumDataForRecipeWorkshop
};