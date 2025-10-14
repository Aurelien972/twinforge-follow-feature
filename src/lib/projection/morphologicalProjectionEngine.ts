/**
 * Morphological Projection Engine
 *
 * This engine calculates body composition changes and morphological transformations
 * based on activity level, nutrition quality, and caloric balance over time.
 *
 * Scientific basis:
 * - Caloric deficit/surplus: ~7700 kcal per kg of body mass change
 * - Muscle gain: ~0.25-1kg per month depending on activity and nutrition
 * - Fat loss: ~0.5-1kg per week sustainable rate
 * - BMR calculations: Mifflin-St Jeor equation
 */

import logger from '../utils/logger';

// Cache pour les calculs BMR/TDEE répétitifs
const calculationCache = new Map<string, any>();
const MAX_CACHE_SIZE = 100;

// Fonction pour créer une clé de cache
function createCacheKey(prefix: string, ...values: any[]): string {
  return `${prefix}:${values.join(':')}`;
}

// Fonction pour nettoyer le cache si trop grand
function cleanCache() {
  if (calculationCache.size > MAX_CACHE_SIZE) {
    const keysToDelete = Array.from(calculationCache.keys()).slice(0, 50);
    keysToDelete.forEach(key => calculationCache.delete(key));
  }
}

export interface ProjectionInputs {
  // Current state
  currentWeight: number; // kg
  currentHeight: number; // cm
  currentAge: number; // years
  currentGender: 'male' | 'female';
  currentBodyFatPercentage?: number; // % (optional, estimated if not provided)
  currentMorphValues?: Record<string, number>; // Current morph target values
  currentLimbMasses?: Record<string, number>; // Current limb masses

  // Projection parameters
  activityLevel: number; // 0-100 scale
  nutritionQuality: number; // 0-100 scale
  caloricBalance: number; // -100 (large deficit) to +100 (large surplus)
  timePeriodMonths: number; // 1, 3, 6, or 12

  // Optional overrides
  targetWeight?: number; // kg (if user has specific target)
}

export interface ProjectionOutputs {
  // Projected metrics
  projectedWeight: number; // kg
  projectedBMI: number;
  projectedWaistCircumference: number; // cm
  projectedMuscleMassPercentage: number; // %
  projectedBodyFatPercentage: number; // %

  // Morphological data for 3D visualization
  projectedMorphValues: Record<string, number>;
  projectedLimbMasses: Record<string, number>;

  // Intermediate calculations for transparency
  calculations: {
    basalMetabolicRate: number; // kcal/day
    totalDailyEnergyExpenditure: number; // kcal/day
    dailyCaloricAdjustment: number; // kcal/day
    totalCaloricDifference: number; // kcal over period
    estimatedWeightChange: number; // kg
    estimatedFatChange: number; // kg
    estimatedMuscleChange: number; // kg
  };
}

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor equation
 * OPTIMIZED: Avec cache pour éviter les recalculs identiques
 */
function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  const cacheKey = createCacheKey('bmr', weight, height, age, gender);

  if (calculationCache.has(cacheKey)) {
    return calculationCache.get(cacheKey);
  }

  // Mifflin-St Jeor: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + s
  // where s is +5 for males and -161 for females
  const s = gender === 'male' ? 5 : -161;
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + s;

  calculationCache.set(cacheKey, bmr);
  cleanCache();

  return bmr;
}

/**
 * Calculate Total Daily Energy Expenditure based on activity level
 * OPTIMIZED: Calcul simplifié et caché
 */
function calculateTDEE(bmr: number, activityLevel: number): number {
  const cacheKey = createCacheKey('tdee', bmr.toFixed(1), activityLevel);

  if (calculationCache.has(cacheKey)) {
    return calculationCache.get(cacheKey);
  }

  // OPTIMIZED: Lookup table pour éviter les if/else multiples
  const multipliers = [
    { max: 20, base: 1.2, next: 1.375 },
    { max: 40, base: 1.375, next: 1.55 },
    { max: 60, base: 1.55, next: 1.725 },
    { max: 80, base: 1.725, next: 1.9 },
    { max: 100, base: 1.9, next: 1.9 }
  ];

  let multiplier = 1.2;
  for (let i = 0; i < multipliers.length; i++) {
    const range = multipliers[i];
    if (activityLevel <= range.max) {
      const prevMax = i > 0 ? multipliers[i - 1].max : 0;
      const rangeSize = range.max - prevMax;
      const positionInRange = activityLevel - prevMax;
      multiplier = range.base + (positionInRange / rangeSize) * (range.next - range.base);
      break;
    }
  }

  const tdee = bmr * multiplier;
  calculationCache.set(cacheKey, tdee);
  cleanCache();

  return tdee;
}

/**
 * Estimate body fat percentage if not provided
 * Uses BMI-based estimation (rough approximation)
 */
function estimateBodyFatPercentage(bmi: number, gender: 'male' | 'female', age: number): number {
  // Deurenberg formula
  const genderFactor = gender === 'male' ? 1 : 0;
  return (1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
}

/**
 * Calculate daily caloric adjustment based on caloric balance parameter
 */
function calculateDailyCaloricAdjustment(caloricBalance: number, tdee: number): number {
  // Map caloricBalance (-100 to +100) to reasonable caloric adjustments
  // -100: -1000 kcal/day (aggressive deficit)
  // -50: -500 kcal/day (moderate deficit)
  // 0: maintenance
  // +50: +500 kcal/day (moderate surplus)
  // +100: +1000 kcal/day (aggressive surplus)

  const maxAdjustment = Math.min(tdee * 0.5, 1000); // Cap at 50% of TDEE or 1000 kcal
  return (caloricBalance / 100) * maxAdjustment;
}

/**
 * Calculate muscle gain potential based on activity and nutrition
 * UPGRADED: Increased base gains and factor ranges for more visible transformations
 */
function calculateMuscleGainPotential(
  activityLevel: number,
  nutritionQuality: number,
  caloricBalance: number,
  gender: 'male' | 'female',
  months: number
): number {
  // UPGRADED: Base muscle gain potential increased by 60%
  // Male: 0.8-1.6kg/month, Female: 0.4-0.8kg/month (was 0.5-1 and 0.25-0.5)
  const baseGain = gender === 'male' ? 1.2 : 0.6;

  // UPGRADED: Activity factor expanded range (0.3-2.0 multiplier, was 0.5-1.5)
  const activityFactor = 0.3 + (activityLevel / 100) * 1.7;

  // UPGRADED: Nutrition factor expanded range (0.3-2.0 multiplier, was 0.5-1.5)
  const nutritionFactor = 0.3 + (nutritionQuality / 100) * 1.7;

  // UPGRADED: Caloric surplus factor increased (0.5-2.5 multiplier, was 0.3-1.5)
  const caloricFactor = caloricBalance >= 0
    ? Math.min(1 + caloricBalance / 100 * 1.5, 2.5)
    : 0.5; // Reduced penalty in deficit (was 0.3)

  return baseGain * activityFactor * nutritionFactor * caloricFactor * months;
}

/**
 * Calculate parameter synergy bonus - rewards coherent combinations
 * UPGRADED: New system to amplify effects when parameters work together
 */
function calculateSynergyBonus(
  activityLevel: number,
  nutritionQuality: number,
  caloricBalance: number
): number {
  // Normalize all to 0-1 scale
  const activity = activityLevel / 100;
  const nutrition = nutritionQuality / 100;
  const balance = (caloricBalance + 100) / 200; // -100 to +100 becomes 0 to 1

  // Calculate coherence: all parameters should work together
  // High activity + good nutrition + appropriate balance = high synergy
  const avgQuality = (activity + nutrition) / 2;

  // Bonus for consistent high values (multiplicative effect)
  const consistencyBonus = Math.min(activity, nutrition) * 0.5;

  // Total synergy: 1.0 (no bonus) to 1.5 (50% bonus)
  return 1.0 + (avgQuality * consistencyBonus);
}

/**
 * Calculate temporal amplification factor based on projection period
 * UPGRADED: Longer periods get exponential benefits (cumulative adaptation)
 */
function calculateTemporalAmplification(months: number): number {
  // Progressive amplification:
  // 1 month = 1.0x, 3 months = 1.3x, 6 months = 1.7x, 12 months = 2.2x
  const amplificationMap: Record<number, number> = {
    1: 1.0,
    3: 1.3,
    6: 1.7,
    12: 2.2
  };

  return amplificationMap[months] || 1.0 + (months / 12) * 1.2;
}

/**
 * Map weight/body composition changes to morph target adjustments
 * UPGRADED: Doubled conversion ratios, expanded factors, extended ranges
 */
function calculateMorphAdjustments(
  currentMorphValues: Record<string, number>,
  weightChange: number,
  fatChange: number,
  muscleChange: number,
  gender: 'male' | 'female',
  timePeriodMonths: number,
  activityLevel: number,
  nutritionQuality: number,
  caloricBalance: number
): Record<string, number> {
  // UPGRADED: Reduced threshold from 0.1 to 0.001 for micro-changes
  if (Math.abs(weightChange) < 0.001 && Math.abs(fatChange) < 0.001 && Math.abs(muscleChange) < 0.001) {
    return currentMorphValues;
  }

  const adjustedMorphs = { ...currentMorphValues };

  // UPGRADED: Calculate synergy and temporal bonuses
  const synergyBonus = calculateSynergyBonus(activityLevel, nutritionQuality, caloricBalance);
  const temporalAmp = calculateTemporalAmplification(timePeriodMonths);
  const totalMultiplier = synergyBonus * temporalAmp;

  // UPGRADED: Fat ratio doubled (was /10, now /5) for 2x visual impact
  if (Math.abs(fatChange) > 0.001) {
    const fatRatio = (fatChange / 5) * totalMultiplier;

    // UPGRADED: Factors doubled (0.5-1.0 instead of 0.25-0.5)
    const fatMorphs = [
      { key: 'bodyFat', factor: 1.0, min: -1.5, max: 1.5 },
      { key: 'assLarge', factor: 0.6, min: -1.5, max: 1.5 },
      { key: 'bigHips', factor: 0.5, min: -1.5, max: 1.5 },
      { key: 'pearFigure', factor: 0.8, min: -1.5, max: 1.5 },
      { key: 'narrowWaist', factor: -0.8, min: -1.5, max: 1.5 },
      { key: 'animeWaist', factor: -0.6, min: -1.5, max: 1.5 }
    ];

    for (const morph of fatMorphs) {
      adjustedMorphs[morph.key] = clamp(
        (adjustedMorphs[morph.key] || 0) + fatRatio * morph.factor,
        morph.min,
        morph.max
      );
    }
  }

  // UPGRADED: Muscle ratio increased (was /5, now /3) for more visible gains
  if (Math.abs(muscleChange) > 0.001) {
    const muscleRatio = (muscleChange / 3) * totalMultiplier;

    // UPGRADED: bodybuilderSize factor doubled (0.6 -> 1.2) and range extended (0-2)
    adjustedMorphs.bodybuilderSize = clamp(
      (adjustedMorphs.bodybuilderSize || 0) + muscleRatio * 1.2,
      0,
      2.0
    );

    // UPGRADED: bodybuilderDetails threshold lowered (0.3 -> 0.2) and factor increased
    if ((adjustedMorphs.bodybuilderSize || 0) > 0.2) {
      adjustedMorphs.bodybuilderDetails = clamp(
        (adjustedMorphs.bodybuilderDetails || 0) + muscleRatio * 1.0,
        0,
        2.0
      );
    }

    // NEW: Add muscle definition morphs for advanced stages
    if ((adjustedMorphs.bodybuilderSize || 0) > 0.5) {
      adjustedMorphs.muscularV = clamp(
        (adjustedMorphs.muscularV || 0) + muscleRatio * 0.8,
        0,
        2.0
      );
    }
  }

  // UPGRADED: Emaciation threshold reduced and range extended
  if (weightChange < -8) {
    const emaciation = Math.abs(weightChange) / 15 * temporalAmp;
    adjustedMorphs.emaciated = clamp(
      (adjustedMorphs.emaciated || 0) + emaciation,
      -1.5,
      0
    );
  } else if (weightChange > 0 && muscleChange > 0) {
    adjustedMorphs.emaciated = clamp(
      (adjustedMorphs.emaciated || 0) - Math.abs(muscleChange) / 8,
      -1.5,
      0
    );
  }

  logger.debug('PROJECTION_ENGINE', 'Morph adjustments calculated', {
    synergyBonus: synergyBonus.toFixed(2),
    temporalAmp: temporalAmp.toFixed(2),
    totalMultiplier: totalMultiplier.toFixed(2),
    fatChange: fatChange.toFixed(2),
    muscleChange: muscleChange.toFixed(2),
    philosophy: 'upgraded_projection_v2'
  });

  return adjustedMorphs;
}

/**
 * Map body composition changes to limb mass adjustments
 * UPGRADED: Doubled factors and extended ranges for visible limb changes
 */
function calculateLimbMassAdjustments(
  currentLimbMasses: Record<string, number>,
  muscleChange: number,
  fatChange: number,
  timePeriodMonths: number
): Record<string, number> {
  // UPGRADED: Threshold reduced from 0.1 to 0.001
  if (Math.abs(muscleChange) < 0.001 && Math.abs(fatChange) < 0.001) {
    return currentLimbMasses;
  }

  const adjustedLimbMasses = { ...currentLimbMasses };

  // UPGRADED: Temporal amplification for limb masses
  const temporalAmp = calculateTemporalAmplification(timePeriodMonths);

  // UPGRADED: Ratios increased and factors doubled
  const muscleRatio = muscleChange / 3; // was /5
  const fatRatio = fatChange / 5; // was /10
  const muscleAdjustment = muscleRatio * 0.3 * temporalAmp; // was 0.15
  const fatAdjustment = fatRatio * 0.15 * temporalAmp; // was 0.08
  const totalAdjustment = muscleAdjustment + fatAdjustment;

  // UPGRADED: Range extended from [-0.5, 0.5] to [-1.0, 1.0]
  const limbKeys = ['leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'torso'];
  for (const limb of limbKeys) {
    adjustedLimbMasses[limb] = clamp(
      (adjustedLimbMasses[limb] || 0) + totalAdjustment,
      -1.0,
      1.0
    );
  }

  return adjustedLimbMasses;
}

/**
 * Clamp value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Main projection engine function
 * OPTIMIZED: Cache global et early returns
 */
export function calculateBodyProjection(inputs: ProjectionInputs): ProjectionOutputs {
  // OPTIMIZED: Créer une clé de cache pour toute la projection
  const projectionCacheKey = createCacheKey(
    'projection',
    inputs.currentWeight,
    inputs.currentHeight,
    inputs.currentAge,
    inputs.currentGender,
    inputs.activityLevel,
    inputs.nutritionQuality,
    inputs.caloricBalance,
    inputs.timePeriodMonths
  );

  // OPTIMIZED: Retourner le résultat caché si disponible
  if (calculationCache.has(projectionCacheKey)) {
    const cached = calculationCache.get(projectionCacheKey);
    logger.debug('PROJECTION_ENGINE', 'Using cached projection result');
    return cached;
  }

  logger.info('PROJECTION_ENGINE', 'Starting body projection calculation', {
    weight: inputs.currentWeight,
    height: inputs.currentHeight,
    activityLevel: inputs.activityLevel,
    nutritionQuality: inputs.nutritionQuality,
    caloricBalance: inputs.caloricBalance,
    months: inputs.timePeriodMonths
  });

  // Calculate current BMI
  const currentBMI = inputs.currentWeight / Math.pow(inputs.currentHeight / 100, 2);

  // Estimate body fat if not provided
  const currentBodyFat = inputs.currentBodyFatPercentage ||
    estimateBodyFatPercentage(currentBMI, inputs.currentGender, inputs.currentAge);

  // Calculate BMR and TDEE
  const bmr = calculateBMR(inputs.currentWeight, inputs.currentHeight, inputs.currentAge, inputs.currentGender);
  const tdee = calculateTDEE(bmr, inputs.activityLevel);

  // Calculate daily caloric adjustment
  const dailyCaloricAdjustment = calculateDailyCaloricAdjustment(inputs.caloricBalance, tdee);

  // Total caloric difference over the period
  const daysInPeriod = inputs.timePeriodMonths * 30;
  const totalCaloricDifference = dailyCaloricAdjustment * daysInPeriod;

  // Estimate weight change (7700 kcal ≈ 1 kg)
  const estimatedWeightChange = totalCaloricDifference / 7700;

  // Calculate muscle gain potential
  const musclePotential = calculateMuscleGainPotential(
    inputs.activityLevel,
    inputs.nutritionQuality,
    inputs.caloricBalance,
    inputs.currentGender,
    inputs.timePeriodMonths
  );

  // Split weight change into fat and muscle components
  let estimatedFatChange: number;
  let estimatedMuscleChange: number;

  if (inputs.caloricBalance >= 0) {
    // Surplus: gain both muscle and fat
    estimatedMuscleChange = Math.min(musclePotential, estimatedWeightChange * 0.6);
    estimatedFatChange = estimatedWeightChange - estimatedMuscleChange;
  } else {
    // Deficit: lose primarily fat, preserve/gain some muscle with good nutrition and activity
    estimatedFatChange = estimatedWeightChange * 0.85; // 85% fat loss
    estimatedMuscleChange = musclePotential * 0.3; // Reduced muscle gain in deficit
  }

  // Calculate projected weight
  const projectedWeight = inputs.targetWeight || (inputs.currentWeight + estimatedWeightChange);

  // Calculate projected BMI
  const projectedBMI = projectedWeight / Math.pow(inputs.currentHeight / 100, 2);

  // Calculate projected body composition
  const currentLeanMass = inputs.currentWeight * (1 - currentBodyFat / 100);
  const projectedLeanMass = currentLeanMass + estimatedMuscleChange;
  const projectedFatMass = inputs.currentWeight * (currentBodyFat / 100) + estimatedFatChange;
  const projectedBodyFat = (projectedFatMass / projectedWeight) * 100;
  const projectedMuscleMass = (projectedLeanMass / projectedWeight) * 100;

  // Estimate waist circumference (rough correlation with weight/body fat)
  const waistFactor = inputs.currentGender === 'male' ? 0.52 : 0.48;
  const projectedWaist = inputs.currentHeight * waistFactor * (projectedBMI / 22);

  // Calculate morphological adjustments with synergy and temporal bonuses
  const projectedMorphValues = calculateMorphAdjustments(
    inputs.currentMorphValues || {},
    estimatedWeightChange,
    estimatedFatChange,
    estimatedMuscleChange,
    inputs.currentGender,
    inputs.timePeriodMonths,
    inputs.activityLevel,
    inputs.nutritionQuality,
    inputs.caloricBalance
  );

  const projectedLimbMasses = calculateLimbMassAdjustments(
    inputs.currentLimbMasses || {},
    estimatedMuscleChange,
    estimatedFatChange,
    inputs.timePeriodMonths
  );

  logger.info('PROJECTION_ENGINE', 'Projection calculation complete', {
    projectedWeight,
    projectedBMI,
    weightChange: estimatedWeightChange,
    muscleChange: estimatedMuscleChange,
    fatChange: estimatedFatChange
  });

  const result: ProjectionOutputs = {
    projectedWeight: Math.round(projectedWeight * 10) / 10,
    projectedBMI: Math.round(projectedBMI * 10) / 10,
    projectedWaistCircumference: Math.round(projectedWaist * 10) / 10,
    projectedMuscleMassPercentage: Math.round(projectedMuscleMass * 10) / 10,
    projectedBodyFatPercentage: Math.round(projectedBodyFat * 10) / 10,
    projectedMorphValues,
    projectedLimbMasses,
    calculations: {
      basalMetabolicRate: Math.round(bmr),
      totalDailyEnergyExpenditure: Math.round(tdee),
      dailyCaloricAdjustment: Math.round(dailyCaloricAdjustment),
      totalCaloricDifference: Math.round(totalCaloricDifference),
      estimatedWeightChange: Math.round(estimatedWeightChange * 10) / 10,
      estimatedFatChange: Math.round(estimatedFatChange * 10) / 10,
      estimatedMuscleChange: Math.round(estimatedMuscleChange * 10) / 10
    }
  };

  // OPTIMIZED: Mettre en cache le résultat
  calculationCache.set(projectionCacheKey, result);
  cleanCache();

  return result;
}
