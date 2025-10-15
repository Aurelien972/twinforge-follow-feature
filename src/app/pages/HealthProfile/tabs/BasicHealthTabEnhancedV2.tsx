/**
 * BasicHealthTabEnhanced V2 Component
 * Complete redesign with all new health components
 * Comprehensive base health information management
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { BloodTypeSection } from '../components/BloodTypeSection';
import { VaccinationsSection } from '../components/VaccinationsSection';
import { MedicalConditionsCard } from '../components/MedicalConditionsCard';
import { CurrentMedicationsCard } from '../components/CurrentMedicationsCard';
import { AllergiesSection } from '../components/AllergiesSection';
import { FamilyHistorySection } from '../../Profile/components/health/FamilyHistorySection';
import { useUserStore } from '../../../../system/store/userStore';
import { useCountryHealthData } from '../hooks/useCountryHealthData';
import { useVaccinationsForm } from '../hooks/useVaccinationsForm';
import { useMedicalConditionsForm } from '../hooks/useMedicalConditionsForm';
import { useAllergiesForm } from '../hooks/useAllergiesForm';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import type { HealthProfileV2 } from '../../../../domain/health';

// Schema for the comprehensive health form
const comprehensiveHealthSchema = z.object({
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  medical_history: z.object({
    family_history: z.object({
      cardiovascular: z.boolean().optional(),
      diabetes: z.boolean().optional(),
      cancer: z.array(z.string()).optional(),
      hypertension: z.boolean().optional(),
      alzheimers: z.boolean().optional(),
      genetic_conditions: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
});

type ComprehensiveHealthForm = z.infer<typeof comprehensiveHealthSchema>;

export const BasicHealthTabEnhancedV2: React.FC = () => {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;

  // Get country health data
  const countryData = useCountryHealthData(profile?.country);

  // Vaccinations hook
  const vaccinations = useVaccinationsForm(countryData);

  // Medical conditions hook
  const medicalConditions = useMedicalConditionsForm();

  // Allergies hook
  const allergies = useAllergiesForm();

  // Main form for blood type and family history
  const form = useForm<ComprehensiveHealthForm>({
    resolver: zodResolver(comprehensiveHealthSchema),
    defaultValues: {
      bloodType: healthV2?.basic?.bloodType,
      medical_history: {
        family_history: {
          cardiovascular: healthV2?.medical_history?.family_history?.cardiovascular,
          diabetes: healthV2?.medical_history?.family_history?.diabetes,
          cancer: healthV2?.medical_history?.family_history?.cancer || [],
          hypertension: healthV2?.medical_history?.family_history?.hypertension,
          alzheimers: healthV2?.medical_history?.family_history?.alzheimers,
          genetic_conditions: healthV2?.medical_history?.family_history?.genetic_conditions || [],
        },
      },
    },
    mode: 'onChange',
  });

  const { register, handleSubmit, formState, watch, setValue } = form;
  const { errors, isDirty } = formState;
  const watchedValues = watch();

  // Calculate overall completion
  const completion = React.useMemo(() => {
    let filled = 0;
    let total = 5; // blood type, vaccinations, conditions/meds, allergies, family history

    // Blood type
    if (watchedValues.bloodType) filled++;

    // Vaccinations
    if (vaccinations.upToDate || vaccinations.vaccinations.length > 0) filled++;

    // Medical conditions or medications
    if (medicalConditions.conditions.length > 0 || medicalConditions.medications.length > 0 || medicalConditions.hasDeclaredNoIssues) filled++;

    // Allergies
    if (allergies.allergies.length > 0) filled++;

    // Family history - check if at least one field is filled
    const familyHistory = watchedValues.medical_history?.family_history;
    if (
      familyHistory?.cardiovascular ||
      familyHistory?.diabetes ||
      familyHistory?.hypertension ||
      familyHistory?.alzheimers ||
      (familyHistory?.cancer && familyHistory.cancer.length > 0) ||
      (familyHistory?.genetic_conditions && familyHistory.genetic_conditions.length > 0)
    ) {
      filled++;
    }

    return Math.round((filled / total) * 100);
  }, [watchedValues, vaccinations, medicalConditions, allergies]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      logger.info('HEALTH_PROFILE', 'Saving comprehensive health info', {
        userId: profile?.userId,
        hasBloodType: !!data.bloodType,
        hasFamilyHistory: !!data.medical_history?.family_history,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          basic: {
            ...currentHealth?.basic,
            bloodType: data.bloodType,
          },
          medical_history: {
            ...currentHealth?.medical_history,
            conditions: currentHealth?.medical_history?.conditions || [],
            medications: currentHealth?.medical_history?.medications || [],
            family_history: data.medical_history?.family_history,
          },
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Informations sauvegardées',
        message: 'Vos données de santé ont été mises à jour',
        duration: 3000,
      });
    } catch (error) {
      logger.error('HEALTH_PROFILE', 'Failed to save health info', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les informations',
        duration: 4000,
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(6, 182, 212, 0.3)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2))
                  `,
                  border: '2px solid rgba(6, 182, 212, 0.5)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Heart} size={24} style={{ color: '#06B6D4' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Base</h2>
                <p className="text-white/70 text-sm">Informations médicales essentielles et antécédents familiaux</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: '#06B6D4',
                    boxShadow: '0 0 8px rgba(6, 182, 212, 0.6)',
                  }}
                />
                <span className="text-white font-bold text-lg">{completion}%</span>
              </div>
              <span className="text-white/60 text-xs">Complété</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-3 rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #06B6D4, rgba(6, 182, 212, 0.8))',
                  boxShadow: '0 0 12px rgba(6, 182, 212, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg,
                      transparent 0%,
                      rgba(255,255,255,0.4) 50%,
                      transparent 100%
                    )`,
                    animation: 'progressShimmer 2s ease-in-out infinite',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Blood Type Section */}
      <BloodTypeSection
        register={register}
        errors={errors}
        currentBloodType={watchedValues.bloodType}
      />

      {/* Vaccinations Section */}
      <VaccinationsSection
        vaccinations={vaccinations.vaccinations}
        countryData={countryData}
        onAddVaccination={vaccinations.onAddVaccination}
        onUpdateVaccination={vaccinations.onUpdateVaccination}
        onRemoveVaccination={vaccinations.onRemoveVaccination}
        onToggleUpToDate={vaccinations.onToggleUpToDate}
        upToDate={vaccinations.upToDate}
        onSave={vaccinations.onSave}
        isSaving={vaccinations.isSaving}
        isDirty={vaccinations.isDirty}
      />

      {/* Medical Conditions and Allergies Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicalConditionsCard
          conditions={medicalConditions.conditions}
          newCondition={medicalConditions.newCondition}
          setNewCondition={medicalConditions.setNewCondition}
          onAddCondition={medicalConditions.addCondition}
          onRemoveCondition={medicalConditions.removeCondition}
          onDeclareNoConditions={undefined}
          hasDeclaredNoConditions={undefined}
        />

        <AllergiesSection
          allergies={allergies.allergies}
          onAddAllergy={allergies.onAddAllergy}
          onRemoveAllergy={allergies.onRemoveAllergy}
          onSave={allergies.onSave}
          isSaving={allergies.isSaving}
          isDirty={allergies.isDirty}
        />
      </div>

      {/* Medications Card */}
      <CurrentMedicationsCard
        medications={medicalConditions.medications}
        newMedication={medicalConditions.newMedication}
        setNewMedication={medicalConditions.setNewMedication}
        onAddMedication={medicalConditions.addMedication}
        onRemoveMedication={medicalConditions.removeMedication}
      />

      {/* Family History Section */}
      <GlassCard className="p-6" style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
          var(--glass-opacity)
        `,
        borderColor: 'rgba(168, 85, 247, 0.2)',
      }}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0.2))
              `,
              border: '2px solid rgba(168, 85, 247, 0.5)',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
            }}
          >
            <SpatialIcon Icon={ICONS.Users} size={24} style={{ color: '#A855F7' }} variant="pure" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-xl">Antécédents Familiaux</h3>
            <p className="text-white/70 text-sm">Historique médical de la famille</p>
          </div>
        </div>

        <FamilyHistorySection
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      </GlassCard>

      {/* Save button for conditions and medications */}
      {medicalConditions.isDirty && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={medicalConditions.saveChanges}
            disabled={medicalConditions.saving}
            className="btn-glass px-4 py-2 text-sm"
          >
            <div className="flex items-center gap-2">
              {medicalConditions.saving ? (
                <SpatialIcon Icon={ICONS.Loader2} size={14} className="animate-spin" />
              ) : (
                <SpatialIcon Icon={ICONS.Save} size={14} />
              )}
              <span>{medicalConditions.saving ? 'Sauvegarde...' : 'Sauvegarder les conditions'}</span>
            </div>
          </button>
        </div>
      )}

      {/* Global Save Button */}
      {isDirty && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <button
            type="submit"
            disabled={saving}
            className="btn-glass--primary px-8 py-3"
          >
            <div className="flex items-center gap-2">
              {saving ? (
                <SpatialIcon Icon={ICONS.Loader2} size={18} className="animate-spin" />
              ) : (
                <SpatialIcon Icon={ICONS.Save} size={18} />
              )}
              <span>{saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}</span>
            </div>
          </button>
        </motion.div>
      )}

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GlassCard className="p-4" style={{
          background: 'rgba(59, 130, 246, 0.05)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
        }}>
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-blue-300">Note:</strong> Ces informations sont essentielles pour votre sécurité et permettent une personnalisation optimale de vos programmes de santé. Consultez votre médecin pour un suivi complet.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </form>
  );
};
