/**
 * Vital Signs Form Tab Hook
 * Manages form state for the Vital Signs tab (V2)
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '../../../../system/store/userStore';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import { vitalSignsSectionSchema, type VitalSignsSectionForm } from '../../Profile/validation/profileHealthValidationV2';
import type { HealthProfileV2 } from '../../../../domain/health';

export function useVitalSignsFormTab() {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const vitalSigns = healthV2?.vital_signs;

  // Initialize form
  const form = useForm<VitalSignsSectionForm>({
    resolver: zodResolver(vitalSignsSectionSchema),
    defaultValues: {
      blood_pressure_systolic: vitalSigns?.blood_pressure_systolic,
      blood_pressure_diastolic: vitalSigns?.blood_pressure_diastolic,
      resting_heart_rate: vitalSigns?.resting_heart_rate,
      blood_glucose_mg_dl: vitalSigns?.blood_glucose_mg_dl,
      last_measured: vitalSigns?.last_measured,
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty, isValid } = formState;
  const watchedValues = watch();

  // Calculate completion percentage
  const completion = React.useMemo(() => {
    let filled = 0;
    const total = 5; // All vital signs fields

    if (watchedValues.blood_pressure_systolic && watchedValues.blood_pressure_systolic > 0) filled++;
    if (watchedValues.blood_pressure_diastolic && watchedValues.blood_pressure_diastolic > 0) filled++;
    if (watchedValues.resting_heart_rate && watchedValues.resting_heart_rate > 0) filled++;
    if (watchedValues.blood_glucose_mg_dl && watchedValues.blood_glucose_mg_dl > 0) filled++;
    if (watchedValues.last_measured) filled++;

    return Math.round((filled / total) * 100);
  }, [watchedValues]);

  // Assess vital signs health status
  const vitalStatus = React.useMemo(() => {
    const systolic = watchedValues.blood_pressure_systolic;
    const diastolic = watchedValues.blood_pressure_diastolic;
    const heartRate = watchedValues.resting_heart_rate;
    const glucose = watchedValues.blood_glucose_mg_dl;

    let warnings: string[] = [];

    if (systolic) {
      if (systolic >= 140) warnings.push('Tension systolique élevée');
      else if (systolic < 90) warnings.push('Tension systolique basse');
    }

    if (diastolic) {
      if (diastolic >= 90) warnings.push('Tension diastolique élevée');
      else if (diastolic < 60) warnings.push('Tension diastolique basse');
    }

    if (heartRate) {
      if (heartRate >= 100) warnings.push('Fréquence cardiaque élevée');
      else if (heartRate < 50 && heartRate > 30) warnings.push('Fréquence cardiaque basse (peut être normal pour les athlètes)');
    }

    if (glucose) {
      if (glucose >= 126) warnings.push('Glycémie élevée');
      else if (glucose < 70) warnings.push('Glycémie basse');
    }

    return {
      hasWarnings: warnings.length > 0,
      warnings,
      status: warnings.length === 0 ? 'normal' : warnings.length <= 2 ? 'attention' : 'concern',
    };
  }, [watchedValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('HEALTH_PROFILE', 'Saving vital signs', {
        userId: profile?.userId,
        hasBloodPressure: !!(data.blood_pressure_systolic && data.blood_pressure_diastolic),
        hasHeartRate: !!data.resting_heart_rate,
        hasGlucose: !!data.blood_glucose_mg_dl,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          vital_signs: data,
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Constantes vitales sauvegardées',
        message: 'Vos mesures ont été mises à jour avec succès',
        duration: 3000,
      });

      // Reset form with new values
      reset(data);

    } catch (error) {
      logger.error('HEALTH_PROFILE', 'Failed to save vital signs', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les constantes vitales',
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
      vitalStatus,
    },
  };
}
