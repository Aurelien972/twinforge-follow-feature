/**
 * Health Score Calculations
 * Weighted scoring system for health profile completeness and AI readiness
 */

import type { HealthProfileV2 } from '../../../../domain/health';

export interface HealthScoreBreakdown {
  total: number;
  basic: number;
  medicalHistory: number;
  familyHistory: number;
  vitalSigns: number;
  lifestyle: number;
  vaccinations: number;
  emergencyContacts: number;
  aiReadiness: number;
  maxScore: number;
}

const WEIGHT_BASIC = 20;
const WEIGHT_MEDICAL_HISTORY = 20;
const WEIGHT_FAMILY_HISTORY = 15;
const WEIGHT_VITAL_SIGNS = 20;
const WEIGHT_LIFESTYLE = 15;
const WEIGHT_VACCINATIONS = 5;
const WEIGHT_EMERGENCY_CONTACTS = 5;

const MAX_SCORE = 100;

function hasValue(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (typeof value === 'number') return value > 0;
  if (typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return false;
}

function calculateBasicScore(health: HealthProfileV2): number {
  let score = 0;
  const fields = [
    health.basic?.bloodType,
    health.basic?.height_cm,
    health.basic?.weight_kg,
  ];

  // Basic fields (75% of basic score)
  fields.forEach(field => {
    if (hasValue(field)) score += (WEIGHT_BASIC * 0.75) / 3;
  });

  // Vaccinations (25% of basic score)
  if (health.vaccinations?.up_to_date !== undefined) {
    score += WEIGHT_BASIC * 0.25;
  }

  return Math.min(score, WEIGHT_BASIC);
}

function calculateMedicalHistoryScore(health: HealthProfileV2): number {
  let score = 0;

  if (health.medical_history?.conditions && hasValue(health.medical_history.conditions)) {
    score += WEIGHT_MEDICAL_HISTORY * 0.3;
  }

  if (health.medical_history?.medications && hasValue(health.medical_history.medications)) {
    score += WEIGHT_MEDICAL_HISTORY * 0.2;
  }

  if (health.medical_history?.allergies && hasValue(health.medical_history.allergies)) {
    score += WEIGHT_MEDICAL_HISTORY * 0.2;
  }

  if (health.physical_limitations && hasValue(health.physical_limitations)) {
    score += WEIGHT_MEDICAL_HISTORY * 0.15;
  }

  if (health.medical_devices && (hasValue(health.medical_devices.implants) || hasValue(health.medical_devices.devices))) {
    score += WEIGHT_MEDICAL_HISTORY * 0.15;
  }

  return Math.min(score, WEIGHT_MEDICAL_HISTORY);
}

function calculateFamilyHistoryScore(health: HealthProfileV2): number {
  if (!health.medical_history?.family_history) return 0;

  let score = 0;
  const fh = health.medical_history.family_history;

  const fields = [
    fh.cardiovascular,
    fh.diabetes,
    fh.hypertension,
    fh.alzheimers,
    fh.cancer,
    fh.genetic_conditions,
  ];

  fields.forEach(field => {
    if (hasValue(field)) score += WEIGHT_FAMILY_HISTORY / 6;
  });

  return Math.min(score, WEIGHT_FAMILY_HISTORY);
}

function calculateVitalSignsScore(health: HealthProfileV2): number {
  if (!health.vital_signs) return 0;

  let score = 0;
  const vs = health.vital_signs;

  const fields = [
    vs.blood_pressure_systolic,
    vs.blood_pressure_diastolic,
    vs.resting_heart_rate,
    vs.blood_glucose_mg_dl,
  ];

  fields.forEach(field => {
    if (hasValue(field)) score += WEIGHT_VITAL_SIGNS / 4;
  });

  return Math.min(score, WEIGHT_VITAL_SIGNS);
}

function calculateLifestyleScore(health: HealthProfileV2): number {
  if (!health.lifestyle) return 0;

  let score = 0;
  const ls = health.lifestyle;

  const fields = [
    ls.smoking_status,
    ls.alcohol_frequency,
    ls.sleep_hours_avg,
    ls.stress_level,
    ls.physical_activity_level,
  ];

  fields.forEach(field => {
    if (hasValue(field)) score += WEIGHT_LIFESTYLE / 5;
  });

  return Math.min(score, WEIGHT_LIFESTYLE);
}

function calculateVaccinationsScore(health: HealthProfileV2): number {
  if (!health.vaccinations) return 0;

  let score = 0;

  if (typeof health.vaccinations.up_to_date === 'boolean') {
    score += WEIGHT_VACCINATIONS * 0.5;
  }

  if (health.vaccinations.records && health.vaccinations.records.length > 0) {
    score += WEIGHT_VACCINATIONS * 0.5;
  }

  return Math.min(score, WEIGHT_VACCINATIONS);
}


function calculateEmergencyContactsScore(health: HealthProfileV2): number {
  let score = 0;

  if (health.emergency_contact && hasValue(health.emergency_contact.name) && hasValue(health.emergency_contact.phone)) {
    score += WEIGHT_EMERGENCY_CONTACTS * 0.5;
  }

  if (health.primary_care_physician && hasValue(health.primary_care_physician.name) && hasValue(health.primary_care_physician.phone)) {
    score += WEIGHT_EMERGENCY_CONTACTS * 0.5;
  }

  return Math.min(score, WEIGHT_EMERGENCY_CONTACTS);
}

export function calculateHealthScore(health: HealthProfileV2 | null | undefined): HealthScoreBreakdown {
  if (!health || health.version !== '2.0') {
    return {
      total: 0,
      basic: 0,
      medicalHistory: 0,
      familyHistory: 0,
      vitalSigns: 0,
      lifestyle: 0,
      vaccinations: 0,
      emergencyContacts: 0,
      aiReadiness: 0,
      maxScore: MAX_SCORE,
    };
  }

  const basic = calculateBasicScore(health);
  const medicalHistory = calculateMedicalHistoryScore(health);
  const familyHistory = calculateFamilyHistoryScore(health);
  const vitalSigns = calculateVitalSignsScore(health);
  const lifestyle = calculateLifestyleScore(health);
  const vaccinations = calculateVaccinationsScore(health);
  const emergencyContacts = calculateEmergencyContactsScore(health);

  const total = Math.round(
    basic +
    medicalHistory +
    familyHistory +
    vitalSigns +
    lifestyle +
    vaccinations +
    emergencyContacts
  );

  const requiredForAI = basic + medicalHistory + familyHistory + vitalSigns + lifestyle;
  const aiReadiness = Math.round((requiredForAI / (WEIGHT_BASIC + WEIGHT_MEDICAL_HISTORY + WEIGHT_FAMILY_HISTORY + WEIGHT_VITAL_SIGNS + WEIGHT_LIFESTYLE)) * 100);

  return {
    total: Math.min(total, MAX_SCORE),
    basic: Math.round(basic),
    medicalHistory: Math.round(medicalHistory),
    familyHistory: Math.round(familyHistory),
    vitalSigns: Math.round(vitalSigns),
    lifestyle: Math.round(lifestyle),
    vaccinations: Math.round(vaccinations),
    emergencyContacts: Math.round(emergencyContacts),
    aiReadiness,
    maxScore: MAX_SCORE,
  };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#F59E0B';
  if (score >= 40) return '#F97316';
  return '#EF4444';
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Bon';
  if (score >= 40) return 'Moyen';
  if (score >= 20) return 'Faible';
  return 'Incomplet';
}

export function getAIReadinessLabel(aiReadiness: number): string {
  if (aiReadiness >= 80) return 'Prêt pour analyse IA complète';
  if (aiReadiness >= 60) return 'Analyse IA possible avec limitations';
  if (aiReadiness >= 40) return 'Données insuffisantes pour IA';
  return 'Profil trop incomplet pour IA';
}
