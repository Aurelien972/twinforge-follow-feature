/**
 * useHealthCompletion Hook
 * Calculates completion percentage for each health profile section
 */

import { useMemo } from 'react';
import type { HealthProfileV2 } from '../../../../domain/health';

interface HealthCompletionBreakdown {
  basicInfo: number;
  basic: number;
  medicalHistory: number;
  familyHistory: number;
  vitalSigns: number;
  lifestyle: number;
  intimacy: number;
  emergencyContacts: number;
  overall: number;
}

export function useHealthCompletion(health?: HealthProfileV2): HealthCompletionBreakdown {
  return useMemo(() => {
    if (!health) {
      return {
        basicInfo: 0,
        basic: 0,
        medicalHistory: 0,
        familyHistory: 0,
        vitalSigns: 0,
        lifestyle: 0,
        intimacy: 0,
        emergencyContacts: 0,
        overall: 0,
      };
    }

    // Calculate basic completion (bloodType, height_cm, weight_kg, vaccinations, mental_health basics)
    const basicFields = [
      health.basic?.bloodType,
      health.basic?.height_cm,
      health.basic?.weight_kg,
    ];
    let basicFieldsCount = basicFields.filter(Boolean).length;
    let totalBasicFields = basicFields.length;

    // Add vaccination status
    if (health.vaccinations?.up_to_date !== undefined) {
      basicFieldsCount++;
      totalBasicFields++;
    }

    const basicCompletion = Math.round(
      (basicFieldsCount / totalBasicFields) * 100
    );

    // Calculate medical history completion
    const medicalHistoryFields = [
      health.medical_history?.conditions?.length ?? 0,
      health.medical_history?.medications?.length ?? 0,
      health.medical_history?.allergies?.length ?? 0,
    ];
    const medicalHistoryCompletion = Math.round(
      (medicalHistoryFields.filter(val => val > 0).length / medicalHistoryFields.length) * 100
    );

    // Calculate family history completion
    const familyHistoryFields = [
      health.medical_history?.family_history?.cardiovascular,
      health.medical_history?.family_history?.diabetes,
      health.medical_history?.family_history?.hypertension,
      health.medical_history?.family_history?.alzheimers,
    ];
    const familyHistoryCompletion = Math.round(
      (familyHistoryFields.filter(val => val !== undefined).length / familyHistoryFields.length) * 100
    );

    // Calculate vital signs completion
    const vitalSignsFields = [
      health.vital_signs?.blood_pressure_systolic,
      health.vital_signs?.blood_pressure_diastolic,
      health.vital_signs?.resting_heart_rate,
    ];
    const vitalSignsCompletion = Math.round(
      (vitalSignsFields.filter(Boolean).length / vitalSignsFields.length) * 100
    );

    // Calculate lifestyle completion
    const lifestyleFields = [
      health.lifestyle?.smoking_status,
      health.lifestyle?.alcohol_frequency,
      health.lifestyle?.sleep_hours_avg,
      health.lifestyle?.physical_activity_level,
    ];
    const lifestyleCompletion = Math.round(
      (lifestyleFields.filter(Boolean).length / lifestyleFields.length) * 100
    );

    // Calculate intimacy completion (common fields only, as gender-specific completeness is calculated in the hook)
    const intimacyCommonFields = [
      health.reproductive_health?.sexual_activity_frequency,
      health.reproductive_health?.sexual_satisfaction,
      health.reproductive_health?.last_sti_screening_date,
    ];
    const intimacyCompletion = Math.round(
      (intimacyCommonFields.filter(Boolean).length / intimacyCommonFields.length) * 100
    );

    // Calculate emergency contacts completion
    const emergencyContactsFields = [
      health.emergency_contact?.name,
      health.emergency_contact?.phone,
      health.primary_care_physician?.name,
    ];
    const emergencyContactsCompletion = Math.round(
      (emergencyContactsFields.filter(Boolean).length / emergencyContactsFields.length) * 100
    );

    // Calculate overall completion (weighted average of required sections)
    const requiredSections = [
      basicCompletion,
      medicalHistoryCompletion,
      familyHistoryCompletion,
      vitalSignsCompletion,
      lifestyleCompletion,
    ];
    const overallCompletion = Math.round(
      requiredSections.reduce((sum, val) => sum + val, 0) / requiredSections.length
    );

    return {
      basicInfo: basicCompletion,
      basic: basicCompletion,
      medicalHistory: medicalHistoryCompletion,
      familyHistory: familyHistoryCompletion,
      vitalSigns: vitalSignsCompletion,
      lifestyle: lifestyleCompletion,
      intimacy: intimacyCompletion,
      emergencyContacts: emergencyContactsCompletion,
      overall: overallCompletion,
    };
  }, [health]);
}
