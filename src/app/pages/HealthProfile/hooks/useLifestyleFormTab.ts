/**
 * Lifestyle Form Tab Hook
 * Manages form state for the Lifestyle tab (V2)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../../../../system/store/userStore';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import { lifestyleSectionSchema, type LifestyleSectionForm } from '../../Profile/validation/profileHealthValidationV2';
import type { HealthProfileV2 } from '../../../../domain/health';

export function useLifestyleFormTab() {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const lifestyle = healthV2?.lifestyle;

  // Initialize form
  const form = useForm<LifestyleSectionForm>({
    resolver: zodResolver(lifestyleSectionSchema),
    defaultValues: {
      smoking_status: lifestyle?.smoking_status,
      smoking_years: lifestyle?.smoking_years,
      alcohol_frequency: lifestyle?.alcohol_frequency,
      sleep_hours_avg: lifestyle?.sleep_hours_avg,
      stress_level: lifestyle?.stress_level,
      physical_activity_level: lifestyle?.physical_activity_level,
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty, isValid } = formState;
  const watchedValues = watch();

  // Calculate completion percentage
  const completion = React.useMemo(() => {
    let filled = 0;
    const total = 6; // All lifestyle fields

    if (watchedValues.smoking_status) filled++;
    if (watchedValues.alcohol_frequency) filled++;
    if (watchedValues.sleep_hours_avg && watchedValues.sleep_hours_avg > 0) filled++;
    if (watchedValues.stress_level && watchedValues.stress_level > 0) filled++;
    if (watchedValues.physical_activity_level) filled++;
    if (watchedValues.smoking_status === 'current' || watchedValues.smoking_status === 'former') {
      if (watchedValues.smoking_years !== undefined) filled += 0.5;
    } else {
      filled += 0.5;
    }

    return Math.round((filled / (total + 0.5)) * 100);
  }, [watchedValues]);

  // Calculate lifestyle risk score
  const lifestyleRisk = React.useMemo(() => {
    let riskFactors: string[] = [];
    let score = 0; // 0-10 scale, lower is better

    // Smoking risk
    if (watchedValues.smoking_status === 'current') {
      riskFactors.push('Tabagisme actif');
      score += 3;
    } else if (watchedValues.smoking_status === 'former' && watchedValues.smoking_years && watchedValues.smoking_years > 10) {
      riskFactors.push('Ancien fumeur (long terme)');
      score += 1;
    }

    // Alcohol risk
    if (watchedValues.alcohol_frequency === 'frequent') {
      riskFactors.push('Consommation d\'alcool fréquente');
      score += 2;
    }

    // Sleep risk
    if (watchedValues.sleep_hours_avg) {
      if (watchedValues.sleep_hours_avg < 6 || watchedValues.sleep_hours_avg > 9) {
        riskFactors.push('Durée de sommeil non optimale');
        score += 1.5;
      }
    }

    // Stress risk
    if (watchedValues.stress_level && watchedValues.stress_level >= 8) {
      riskFactors.push('Niveau de stress élevé');
      score += 2;
    }

    // Activity risk
    if (watchedValues.physical_activity_level === 'sedentary') {
      riskFactors.push('Mode de vie sédentaire');
      score += 2;
    } else if (watchedValues.physical_activity_level === 'light') {
      score += 1;
    }

    let category: 'optimal' | 'good' | 'moderate' | 'high' = 'optimal';
    if (score >= 7) category = 'high';
    else if (score >= 4) category = 'moderate';
    else if (score >= 2) category = 'good';

    return {
      score: Math.min(10, score),
      category,
      riskFactors,
      hasRisks: riskFactors.length > 0,
    };
  }, [watchedValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('HEALTH_PROFILE', 'Saving lifestyle data', {
        userId: profile?.userId,
        smokingStatus: data.smoking_status,
        alcoholFrequency: data.alcohol_frequency,
        activityLevel: data.physical_activity_level,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          lifestyle: data,
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Mode de vie sauvegardé',
        message: 'Vos informations de style de vie ont été mises à jour',
        duration: 3000,
      });

      // Reset form with new values
      reset(data);

    } catch (error) {
      logger.error('HEALTH_PROFILE', 'Failed to save lifestyle data', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les données de mode de vie',
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
    },
    state: {
      saving,
      completion,
      lifestyleRisk,
    },
  };
}
