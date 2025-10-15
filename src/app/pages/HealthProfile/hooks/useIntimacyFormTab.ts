/**
 * Intimacy Form Tab Hook
 * Manages form state for the Intimacy tab with gender-specific fields
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

// Male reproductive health schema
const maleReproductiveSchema = z.object({
  male_fertility_concerns: z.string().optional(),
  male_fertility_details: z.string().optional(),
  erectile_function: z.number().min(1).max(10).optional(),
  libido_level: z.number().min(1).max(10).optional(),
  testosterone_concerns: z.string().optional(),
  prostate_checkup_date: z.string().optional(),
});

// Female reproductive health schema
const femaleReproductiveSchema = z.object({
  menstrual_cycle_regular: z.string().optional(),
  cycle_length_days: z.number().min(1).max(100).optional(),
  last_period_date: z.string().optional(),
  menstrual_symptoms: z.string().optional(),
  pregnancy_count: z.number().min(0).max(50).optional(),
  menopause_status: z.enum(['pre', 'peri', 'post', 'not_applicable']).optional(),
  menopause_age: z.number().min(18).max(100).optional(),
  menopause_symptoms: z.string().optional(),
  contraception_type: z.string().optional(),
  contraception_start_date: z.string().optional(),
  contraception_side_effects: z.string().optional(),
});

// Common sexual health schema (gender-neutral)
const commonSexualHealthSchema = z.object({
  sexual_activity_frequency: z.enum(['never', 'rarely', 'monthly', 'weekly', 'daily']).optional(),
  sexual_satisfaction: z.number().min(1).max(10).optional(),
  sexual_concerns: z.string().optional(),
  last_sti_screening_date: z.string().optional(),
  sti_screening_results: z.string().optional(),
});

// Combined intimacy form schema
const intimacyFormSchema = maleReproductiveSchema
  .merge(femaleReproductiveSchema)
  .merge(commonSexualHealthSchema);

type IntimacyFormData = z.infer<typeof intimacyFormSchema>;

export function useIntimacyFormTab() {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const reproductiveHealth = healthV2?.reproductive_health;
  const userGender = profile?.sex;

  // Initialize form
  const form = useForm<IntimacyFormData>({
    resolver: zodResolver(intimacyFormSchema),
    defaultValues: {
      // Male fields
      male_fertility_concerns: reproductiveHealth?.male_fertility_concerns !== undefined
        ? String(reproductiveHealth.male_fertility_concerns)
        : undefined,
      male_fertility_details: reproductiveHealth?.male_fertility_details,
      erectile_function: reproductiveHealth?.erectile_function,
      libido_level: reproductiveHealth?.libido_level,
      testosterone_concerns: reproductiveHealth?.testosterone_concerns !== undefined
        ? String(reproductiveHealth.testosterone_concerns)
        : undefined,
      prostate_checkup_date: reproductiveHealth?.prostate_checkup_date,

      // Female fields
      menstrual_cycle_regular: reproductiveHealth?.menstrual_cycle_regular !== undefined
        ? String(reproductiveHealth.menstrual_cycle_regular)
        : undefined,
      cycle_length_days: reproductiveHealth?.cycle_length_days,
      last_period_date: reproductiveHealth?.last_period_date,
      menstrual_symptoms: reproductiveHealth?.menstrual_symptoms?.join(', '),
      pregnancy_count: reproductiveHealth?.pregnancy_count,
      menopause_status: reproductiveHealth?.menopause_status,
      menopause_age: reproductiveHealth?.menopause_age,
      menopause_symptoms: reproductiveHealth?.menopause_symptoms?.join(', '),
      contraception_type: reproductiveHealth?.contraception_type,
      contraception_start_date: reproductiveHealth?.contraception_start_date,
      contraception_side_effects: reproductiveHealth?.contraception_side_effects,

      // Common fields
      sexual_activity_frequency: reproductiveHealth?.sexual_activity_frequency,
      sexual_satisfaction: reproductiveHealth?.sexual_satisfaction,
      sexual_concerns: reproductiveHealth?.sexual_concerns,
      last_sti_screening_date: reproductiveHealth?.last_sti_screening_date,
      sti_screening_results: reproductiveHealth?.sti_screening_results,
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isDirty, isValid } = formState;
  const watchedValues = watch();

  // Calculate completion percentage based on user gender
  const completion = React.useMemo(() => {
    let filled = 0;
    let total = 5; // Common fields: frequency, satisfaction, STI screening date, results, concerns

    // Common fields
    if (watchedValues.sexual_activity_frequency) filled++;
    if (watchedValues.sexual_satisfaction && watchedValues.sexual_satisfaction > 0) filled++;
    if (watchedValues.last_sti_screening_date) filled++;
    if (watchedValues.sti_screening_results) filled++;
    if (watchedValues.sexual_concerns) filled++;

    // Gender-specific fields
    if (userGender === 'male') {
      total += 6; // Male-specific fields
      if (watchedValues.male_fertility_concerns) filled++;
      if (watchedValues.erectile_function && watchedValues.erectile_function > 0) filled++;
      if (watchedValues.libido_level && watchedValues.libido_level > 0) filled++;
      if (watchedValues.testosterone_concerns) filled++;
      if (watchedValues.prostate_checkup_date) filled++;
      // Conditional: fertility details only if concerns exist
      if (watchedValues.male_fertility_concerns === 'true') {
        total++;
        if (watchedValues.male_fertility_details) filled++;
      }
    } else if (userGender === 'female') {
      total += 9; // Female-specific base fields
      if (watchedValues.menstrual_cycle_regular) filled++;
      if (watchedValues.last_period_date) filled++;
      if (watchedValues.pregnancy_count !== undefined) filled++;
      if (watchedValues.menopause_status) filled++;
      if (watchedValues.contraception_type) filled++;

      // Conditional: cycle length only if regular
      if (watchedValues.menstrual_cycle_regular === 'true') {
        total++;
        if (watchedValues.cycle_length_days && watchedValues.cycle_length_days > 0) filled++;
      }

      // Conditional: menopause age only if in peri/post
      if (watchedValues.menopause_status === 'peri' || watchedValues.menopause_status === 'post') {
        total++;
        if (watchedValues.menopause_age && watchedValues.menopause_age > 0) filled++;
      }

      // Optional arrays
      if (watchedValues.menstrual_symptoms) filled++;
      if (watchedValues.menopause_symptoms) filled++;
      if (watchedValues.contraception_side_effects) filled++;
      if (watchedValues.contraception_start_date) filled++;
    }

    return Math.round((filled / total) * 100);
  }, [watchedValues, userGender]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('HEALTH_PROFILE', 'Saving intimacy data', {
        userId: profile?.userId,
        gender: userGender,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      // Convert string booleans to actual booleans
      const male_fertility_concerns = data.male_fertility_concerns === 'true' ? true :
                                       data.male_fertility_concerns === 'false' ? false :
                                       undefined;

      const testosterone_concerns = data.testosterone_concerns === 'true' ? true :
                                     data.testosterone_concerns === 'false' ? false :
                                     undefined;

      const menstrual_cycle_regular = data.menstrual_cycle_regular === 'true' ? true :
                                       data.menstrual_cycle_regular === 'false' ? false :
                                       undefined;

      // Parse comma-separated strings to arrays
      const menstrual_symptoms = data.menstrual_symptoms
        ? data.menstrual_symptoms.split(',').map(s => s.trim()).filter(Boolean)
        : undefined;

      const menopause_symptoms = data.menopause_symptoms
        ? data.menopause_symptoms.split(',').map(s => s.trim()).filter(Boolean)
        : undefined;

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          reproductive_health: {
            ...currentHealth?.reproductive_health,
            // Male fields
            male_fertility_concerns,
            male_fertility_details: data.male_fertility_details,
            erectile_function: data.erectile_function,
            libido_level: data.libido_level,
            testosterone_concerns,
            prostate_checkup_date: data.prostate_checkup_date,
            // Female fields
            menstrual_cycle_regular,
            cycle_length_days: data.cycle_length_days,
            last_period_date: data.last_period_date,
            menstrual_symptoms,
            pregnancy_count: data.pregnancy_count,
            menopause_status: data.menopause_status,
            menopause_age: data.menopause_age,
            menopause_symptoms,
            contraception_type: data.contraception_type,
            contraception_start_date: data.contraception_start_date,
            contraception_side_effects: data.contraception_side_effects,
            // Common fields
            sexual_activity_frequency: data.sexual_activity_frequency,
            sexual_satisfaction: data.sexual_satisfaction,
            sexual_concerns: data.sexual_concerns,
            last_sti_screening_date: data.last_sti_screening_date,
            sti_screening_results: data.sti_screening_results,
          },
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Intimité sauvegardée',
        message: 'Vos informations de santé reproductive ont été mises à jour',
        duration: 3000,
      });

      // Reset form with new values
      reset({
        ...data,
        male_fertility_concerns: male_fertility_concerns !== undefined ? String(male_fertility_concerns) : undefined,
        testosterone_concerns: testosterone_concerns !== undefined ? String(testosterone_concerns) : undefined,
        menstrual_cycle_regular: menstrual_cycle_regular !== undefined ? String(menstrual_cycle_regular) : undefined,
      });

    } catch (error) {
      logger.error('HEALTH_PROFILE', 'Failed to save intimacy data', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les données d\'intimité',
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
      userGender,
    },
  };
}
