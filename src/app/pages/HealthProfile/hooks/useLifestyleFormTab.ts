/**
 * Lifestyle Form Tab Hook
 * Manages form state for the Lifestyle tab (V2)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserStore } from '../../../../system/store/userStore';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import type { HealthProfileV2 } from '../../../../domain/health';

// Lifestyle form schema
const lifestyleFormSchema = z.object({
  smoking_status: z.enum(['never', 'former', 'current']).optional(),
  smoking_years: z.number().min(0).max(100).optional(),
  alcohol_frequency: z.enum(['never', 'occasional', 'moderate', 'frequent']).optional(),
  alcohol_units_per_week: z.number().min(0).max(200).optional(),
  sleep_hours_avg: z.number().min(0).max(24).optional(),
  sleep_quality: z.number().min(1).max(10).optional(),
  stress_level: z.number().min(1).max(10).optional(),
  anxiety_level: z.number().min(1).max(10).optional(),
  mood_rating: z.number().min(1).max(10).optional(),
  hydration_liters_per_day: z.number().min(0).max(10).optional(),
  screen_time_hours_per_day: z.number().min(0).max(24).optional(),
  takes_screen_breaks: z.string().optional(),
});

type LifestyleFormData = z.infer<typeof lifestyleFormSchema>;

export function useLifestyleFormTab() {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const lifestyle = healthV2?.lifestyle;

  // Prepare default values from profile
  const defaultValues = React.useMemo(() => ({
    smoking_status: lifestyle?.smoking_status,
    smoking_years: lifestyle?.smoking_years,
    alcohol_frequency: lifestyle?.alcohol_frequency,
    alcohol_units_per_week: lifestyle?.alcohol_units_per_week,
    sleep_hours_avg: lifestyle?.sleep_hours_avg,
    sleep_quality: lifestyle?.sleep_quality,
    stress_level: lifestyle?.stress_level,
    anxiety_level: lifestyle?.anxiety_level,
    mood_rating: lifestyle?.mood_rating,
    hydration_liters_per_day: lifestyle?.hydration_liters_per_day,
    screen_time_hours_per_day: lifestyle?.screen_time_hours_per_day,
    takes_screen_breaks: lifestyle?.takes_screen_breaks !== undefined ? String(lifestyle.takes_screen_breaks) : undefined,
  }), [lifestyle]);

  // Initialize form
  const form = useForm<LifestyleFormData>({
    resolver: zodResolver(lifestyleFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { register, handleSubmit, formState, watch, reset, control } = form;
  const { errors, isDirty, isValid } = formState;
  const watchedValues = watch();

  // Calculate completion percentage
  const completion = React.useMemo(() => {
    let filled = 0;
    const total = 12; // All lifestyle fields

    if (watchedValues.smoking_status) filled++;
    if (watchedValues.alcohol_frequency) filled++;
    if (watchedValues.sleep_hours_avg && watchedValues.sleep_hours_avg > 0) filled++;
    if (watchedValues.sleep_quality && watchedValues.sleep_quality > 0) filled++;
    if (watchedValues.stress_level && watchedValues.stress_level > 0) filled++;
    if (watchedValues.anxiety_level && watchedValues.anxiety_level > 0) filled++;
    if (watchedValues.mood_rating && watchedValues.mood_rating > 0) filled++;
    if (watchedValues.hydration_liters_per_day && watchedValues.hydration_liters_per_day > 0) filled++;
    if (watchedValues.screen_time_hours_per_day !== undefined) filled++;
    if (watchedValues.takes_screen_breaks) filled++;
    if (watchedValues.smoking_status === 'current' || watchedValues.smoking_status === 'former') {
      if (watchedValues.smoking_years !== undefined) filled++;
    } else {
      filled++;
    }
    if (watchedValues.alcohol_frequency !== 'never' && watchedValues.alcohol_frequency) {
      if (watchedValues.alcohol_units_per_week !== undefined) filled++;
    } else if (watchedValues.alcohol_frequency === 'never') {
      filled++;
    }

    return Math.round((filled / total) * 100);
  }, [watchedValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('HEALTH_PROFILE', 'Saving lifestyle data', {
        userId: profile?.userId,
        smokingStatus: data.smoking_status,
        alcoholFrequency: data.alcohol_frequency,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      // Convert takes_screen_breaks from string to boolean
      const takes_screen_breaks = data.takes_screen_breaks === 'true' ? true :
                                   data.takes_screen_breaks === 'false' ? false :
                                   undefined;

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          lifestyle: {
            ...data,
            takes_screen_breaks,
          },
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
      reset({
        ...data,
        takes_screen_breaks: takes_screen_breaks !== undefined ? String(takes_screen_breaks) : undefined,
      });

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
      control,
      handleSubmit: onSubmit,
      errors,
      isDirty,
      isValid,
      watchedValues,
    },
    state: {
      saving,
      completion,
    },
  };
}
