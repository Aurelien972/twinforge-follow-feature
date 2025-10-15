/**
 * Basic Health Form Hook
 * Manages form state for the Basic Health tab (V2) with improved error handling
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../../../../system/store/userStore';
import logger from '../../../../lib/utils/logger';
import { z } from 'zod';
import { basicHealthSectionSchema, vaccinationsSectionSchema } from '../../Profile/validation/profileHealthValidationV2';
import { useHealthProfileSave } from './useHealthProfileSave';
import { useHealthFormDirtyState } from './useHealthFormDirtyState';

// Extended schema to include vaccinations in Basic tab
const extendedBasicHealthSchema = basicHealthSectionSchema.extend({
  vaccinations: vaccinationsSectionSchema.optional(),
});

type ExtendedBasicHealthForm = z.infer<typeof extendedBasicHealthSchema>;
import type { HealthProfileV2 } from '../../../../domain/health';

export function useBasicHealthForm() {
  const { profile } = useUserStore();
  const { saveSection, isSectionSaving } = useHealthProfileSave();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const basicInfo = healthV2?.basic;

  // Initialize form with extended schema
  const form = useForm<ExtendedBasicHealthForm>({
    resolver: zodResolver(extendedBasicHealthSchema),
    defaultValues: {
      bloodType: basicInfo?.bloodType,
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

  // Calculate BMI using data from Identity tab
  const calculatedBMI = React.useMemo(() => {
    const height = profile?.height_cm;
    const weight = profile?.weight_kg;

    if (!height || !weight || height <= 0) return undefined;

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
  }, [profile?.height_cm, profile?.weight_kg]);

  // Calculate completion percentage
  const completion = React.useMemo(() => {
    let filled = 0;
    let total = 1; // bloodType only

    if (watchedValues.bloodType) filled++;

    // Add vaccination to completion if it exists
    if (watchedValues.vaccinations?.up_to_date !== undefined) {
      total++;
      if (watchedValues.vaccinations.up_to_date) filled++;
    }

    return Math.round((filled / total) * 100);
  }, [watchedValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('BASIC_HEALTH_FORM', 'Saving basic health info', {
        userId: profile?.userId,
        hasBloodType: !!data.bloodType,
      });

      await saveSection({
        section: 'basic',
        data: {
          bloodType: data.bloodType,
        },
        onSuccess: () => {
          reset(data);
          logger.info('BASIC_HEALTH_FORM', 'Successfully saved and reset form', {
            bloodType: data.bloodType,
          });
        },
      });
    } catch (error) {
      logger.error('BASIC_HEALTH_FORM', 'Save failed (already handled by saveSection)', {
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
    },
    state: {
      saving: isSectionSaving('basic'),
      completion,
      calculatedBMI,
    },
  };
}
