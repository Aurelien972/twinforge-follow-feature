/**
 * Family History Form Tab Hook
 * Manages form state for the Family History tab (V2)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../../../../system/store/userStore';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import { familyHistorySectionSchema, type FamilyHistorySectionForm } from '../../Profile/validation/profileHealthValidationV2';
import type { HealthProfileV2 } from '../../../../domain/health';

export function useFamilyHistoryFormTab() {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const medicalHistory = healthV2?.medical_history;
  const familyHistory = medicalHistory?.family_history;

  // Initialize form
  const form = useForm<FamilyHistorySectionForm>({
    resolver: zodResolver(familyHistorySectionSchema),
    defaultValues: {
      cardiovascular: familyHistory?.cardiovascular || false,
      diabetes: familyHistory?.diabetes || false,
      cancer: familyHistory?.cancer || [],
      hypertension: familyHistory?.hypertension || false,
      alzheimers: familyHistory?.alzheimers || false,
      genetic_conditions: familyHistory?.genetic_conditions || [],
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState, watch, reset, setValue } = form;
  const { errors, isDirty, isValid } = formState;
  const watchedValues = watch();

  // Calculate completion percentage
  const completion = React.useMemo(() => {
    let answered = 0;
    const total = 6; // cardiovascular, diabetes, cancer array, hypertension, alzheimers, genetic_conditions array

    if (watchedValues.cardiovascular !== undefined) answered++;
    if (watchedValues.diabetes !== undefined) answered++;
    if (watchedValues.cancer !== undefined) answered++; // Array can be empty
    if (watchedValues.hypertension !== undefined) answered++;
    if (watchedValues.alzheimers !== undefined) answered++;
    if (watchedValues.genetic_conditions !== undefined) answered++; // Array can be empty

    return Math.round((answered / total) * 100);
  }, [watchedValues]);

  // Calculate genetic risk assessment
  const geneticRisk = React.useMemo(() => {
    let riskFactors: string[] = [];
    let score = 0; // 0-10 scale

    if (watchedValues.cardiovascular) {
      riskFactors.push('Maladies cardiovasculaires familiales');
      score += 2;
    }

    if (watchedValues.diabetes) {
      riskFactors.push('Diabète familial');
      score += 2;
    }

    if (watchedValues.cancer && watchedValues.cancer.length > 0) {
      riskFactors.push(`Cancer familial (${watchedValues.cancer.length} type(s))`);
      score += watchedValues.cancer.length * 1.5;
    }

    if (watchedValues.hypertension) {
      riskFactors.push('Hypertension familiale');
      score += 1.5;
    }

    if (watchedValues.alzheimers) {
      riskFactors.push('Alzheimer familial');
      score += 2;
    }

    if (watchedValues.genetic_conditions && watchedValues.genetic_conditions.length > 0) {
      riskFactors.push(`Conditions génétiques (${watchedValues.genetic_conditions.length})`);
      score += watchedValues.genetic_conditions.length * 2;
    }

    let category: 'low' | 'moderate' | 'elevated' | 'high' = 'low';
    if (score >= 8) category = 'high';
    else if (score >= 5) category = 'elevated';
    else if (score >= 2) category = 'moderate';

    return {
      score: Math.min(10, score),
      category,
      riskFactors,
      hasRisks: riskFactors.length > 0,
    };
  }, [watchedValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('HEALTH_PROFILE', 'Saving family history', {
        userId: profile?.userId,
        hasCardiovascular: data.cardiovascular,
        hasDiabetes: data.diabetes,
        cancerTypes: data.cancer?.length || 0,
        geneticConditions: data.genetic_conditions?.length || 0,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;
      const currentMedicalHistory = currentHealth?.medical_history || {};

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          medical_history: {
            ...currentMedicalHistory,
            family_history: data,
          },
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Antécédents familiaux sauvegardés',
        message: 'Votre historique familial a été mis à jour',
        duration: 3000,
      });

      // Reset form with new values
      reset(data);

    } catch (error) {
      logger.error('HEALTH_PROFILE', 'Failed to save family history', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les antécédents familiaux',
        duration: 4000,
      });
    }
  });

  return {
    form: {
      register,
      handleSubmit: onSubmit,
      errors,
      isDirty,
      isValid,
      watchedValues,
      setValue,
      watch,
    },
    state: {
      saving,
      completion,
      geneticRisk,
    },
  };
}
