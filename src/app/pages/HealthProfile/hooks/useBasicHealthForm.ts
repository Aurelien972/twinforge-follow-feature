/**
 * Basic Health Form Hook
 * Manages form state for the Basic Health tab (V2)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../../../../system/store/userStore';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import { z } from 'zod';
import { basicHealthSectionSchema, vaccinationsSectionSchema, type BasicHealthSectionForm } from '../../Profile/validation/profileHealthValidationV2';

// Extended schema to include vaccinations in Basic tab
const extendedBasicHealthSchema = basicHealthSectionSchema.extend({
  vaccinations: vaccinationsSectionSchema.optional(),
});

type ExtendedBasicHealthForm = z.infer<typeof extendedBasicHealthSchema>;
import type { HealthProfileV2 } from '../../../../domain/health';

export function useBasicHealthForm() {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const basicInfo = healthV2?.basic;

  // Initialize form with extended schema
  const form = useForm<ExtendedBasicHealthForm>({
    resolver: zodResolver(extendedBasicHealthSchema),
    defaultValues: {
      bloodType: basicInfo?.bloodType,
      height_cm: basicInfo?.height_cm,
      weight_kg: basicInfo?.weight_kg,
      vaccinations: healthV2?.vaccinations ? {
        up_to_date: healthV2.vaccinations.up_to_date,
        records: healthV2.vaccinations.records || [],
      } : undefined,
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty, isValid } = formState;
  const watchedValues = watch();

  // Calculate BMI automatically
  const calculatedBMI = React.useMemo(() => {
    const height = watchedValues.height_cm;
    const weight = watchedValues.weight_kg;

    if (!height || !weight || height <= 0) return undefined;

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
  }, [watchedValues.height_cm, watchedValues.weight_kg]);

  // Calculate completion percentage
  const completion = React.useMemo(() => {
    let filled = 0;
    let total = 3; // bloodType, height_cm, weight_kg

    if (watchedValues.bloodType) filled++;
    if (watchedValues.height_cm && watchedValues.height_cm > 0) filled++;
    if (watchedValues.weight_kg && watchedValues.weight_kg > 0) filled++;

    // Add vaccination to completion if it exists
    if (watchedValues.vaccinations?.up_to_date !== undefined) {
      total++;
      if (watchedValues.vaccinations.up_to_date) filled++;
    }

    return Math.round((filled / total) * 100);
  }, [watchedValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('HEALTH_PROFILE', 'Saving basic health info', {
        userId: profile?.userId,
        hasBloodType: !!data.bloodType,
        hasHeight: !!data.height_cm,
        hasWeight: !!data.weight_kg,
      });

      const updatedBasic = {
        bloodType: data.bloodType,
        height_cm: data.height_cm,
        weight_kg: data.weight_kg,
        bmi: calculatedBMI,
      };

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          basic: updatedBasic,
          vaccinations: data.vaccinations || currentHealth?.vaccinations,
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Informations de base sauvegardées',
        message: 'Vos données médicales de base ont été mises à jour',
        duration: 3000,
      });

      // Reset form with new values
      reset(data);

    } catch (error) {
      logger.error('HEALTH_PROFILE', 'Failed to save basic health info', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les informations de base',
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
      calculatedBMI,
    },
  };
}
