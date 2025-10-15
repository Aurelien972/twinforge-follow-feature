/**
 * Family History Form Tab Hook
 * Manages form state for the Family History tab (V2)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../../../../system/store/userStore';
import logger from '../../../../lib/utils/logger';
import { familyHistorySectionSchema, type FamilyHistorySectionForm } from '../../Profile/validation/profileHealthValidationV2';
import type { HealthProfileV2 } from '../../../../domain/health';
import { useHealthProfileSave } from './useHealthProfileSave';
import { useHealthFormDirtyState } from './useHealthFormDirtyState';

export function useFamilyHistoryFormTab() {
  const { profile } = useUserStore();
  const { saveSection, isSectionSaving } = useHealthProfileSave();

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
  const { errors, isValid } = formState;
  const watchedValues = watch();

  // Track initial values for intelligent dirty detection
  const [initialValues, setInitialValues] = React.useState<FamilyHistorySectionForm>({
    cardiovascular: familyHistory?.cardiovascular || false,
    diabetes: familyHistory?.diabetes || false,
    cancer: familyHistory?.cancer || [],
    hypertension: familyHistory?.hypertension || false,
    alzheimers: familyHistory?.alzheimers || false,
    genetic_conditions: familyHistory?.genetic_conditions || [],
  });

  // Use intelligent dirty state detection
  const { isDirty, changedFieldsCount, resetDirtyState } = useHealthFormDirtyState({
    currentValues: watchedValues,
    initialValues,
    formName: 'FAMILY_HISTORY',
  });

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
      logger.info('FAMILY_HISTORY_FORM', 'Saving family history', {
        userId: profile?.userId,
        hasCardiovascular: data.cardiovascular,
        hasDiabetes: data.diabetes,
        cancerTypes: data.cancer?.length || 0,
        geneticConditions: data.genetic_conditions?.length || 0,
      });

      await saveSection({
        section: 'family_history',
        data,
        onSuccess: () => {
          setInitialValues(data);
          resetDirtyState(data);
          reset(data);
          logger.info('FAMILY_HISTORY_FORM', 'Successfully saved and reset dirty state');
        },
      });
    } catch (error) {
      logger.error('FAMILY_HISTORY_FORM', 'Save failed (already handled by saveSection)', {
        error: error instanceof Error ? error.message : 'Unknown error',
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
      saving: isSectionSaving('family_history'),
      completion,
      geneticRisk,
    },
    changedFieldsCount,
  };
}
