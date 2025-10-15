/**
 * BasicHealthTabEnhanced V2 Component
 * Complete redesign with all new health components
 * Comprehensive base health information management
 * Uses centralized coordinator to prevent dirty state false positives
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { BloodTypeSection } from '../components/BloodTypeSection';
import { VaccinationsSection } from '../components/VaccinationsSection';
import { MedicalConditionsCard } from '../components/MedicalConditionsCard';
import { CurrentMedicationsCard } from '../components/CurrentMedicationsCard';
import { AllergiesSection } from '../components/AllergiesSection';
import { useUserStore } from '../../../../system/store/userStore';
import { useCountryHealthData } from '../hooks/useCountryHealthData';
import { useVaccinationsForm } from '../hooks/useVaccinationsForm';
import { useMedicalConditionsForm } from '../hooks/useMedicalConditionsForm';
import { useAllergiesForm } from '../hooks/useAllergiesForm';
import { useBloodTypeForm } from '../hooks/useBloodTypeForm';
import { useBasicHealthTabCoordinator } from '../hooks/useBasicHealthTabCoordinator';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import UnsavedChangesIndicator from '../../../../ui/components/UnsavedChangesIndicator';
import { useUnsavedChangesWarning } from '../../../../hooks/useUnsavedChangesWarning';

export const BasicHealthTabEnhancedV2: React.FC = () => {
  const { profile, saving } = useUserStore();
  const { success } = useFeedback();

  // Get country health data
  const countryData = useCountryHealthData(profile?.country);

  // Vaccinations hook
  const vaccinations = useVaccinationsForm(countryData);

  // Medical conditions hook
  const medicalConditions = useMedicalConditionsForm();

  // Allergies hook
  const allergies = useAllergiesForm();

  // Blood type hook
  const bloodTypeForm = useBloodTypeForm();

  // Central coordinator for dirty state management
  const coordinator = useBasicHealthTabCoordinator({
    bloodTypeState: {
      isDirty: bloodTypeForm.isDirty,
      changedFieldsCount: bloodTypeForm.changedFieldsCount || 0,
    },
    vaccinationsState: {
      isDirty: vaccinations.isDirty,
      changedFieldsCount: vaccinations.changedFieldsCount || 0,
    },
    medicalConditionsState: {
      isDirty: medicalConditions.isDirty,
      changedFieldsCount: medicalConditions.changedFieldsCount || 0,
    },
    allergiesState: {
      isDirty: allergies.isDirty,
      changedFieldsCount: allergies.changedFieldsCount || 0,
    },
  });

  // Warn user about unsaved changes
  useUnsavedChangesWarning({ isDirty: coordinator.hasAnyChanges });

  // Calculate overall completion
  const completion = React.useMemo(() => {
    let filled = 0;
    let total = 4; // blood type, vaccinations, conditions/meds, allergies

    // Blood type
    if (bloodTypeForm.bloodType) filled++;

    // Vaccinations
    if (vaccinations.upToDate || vaccinations.vaccinations.length > 0) filled++;

    // Medical conditions or medications
    if (medicalConditions.conditions.length > 0 || medicalConditions.medications.length > 0 || medicalConditions.hasDeclaredNoIssues) filled++;

    // Allergies
    if (allergies.allergies.length > 0) filled++;

    return Math.round((filled / total) * 100);
  }, [bloodTypeForm.bloodType, vaccinations, medicalConditions, allergies]);

  // Save all sections that have changes
  const saveAllChanges = async () => {
    try {
      logger.info('BASIC_HEALTH_TAB', 'Starting coordinated save of all sections', {
        userId: profile?.userId,
        breakdown: coordinator.breakdown,
        totalChangedFields: coordinator.totalChangedFields,
      });

      // Save each section that has changes
      const savePromises: Promise<void>[] = [];

      if (coordinator.breakdown.bloodType) {
        savePromises.push(bloodTypeForm.saveChanges());
      }

      if (coordinator.breakdown.vaccinations) {
        savePromises.push(vaccinations.onSave());
      }

      if (coordinator.breakdown.medicalConditions) {
        savePromises.push(medicalConditions.saveChanges());
      }

      if (coordinator.breakdown.allergies) {
        savePromises.push(allergies.onSave());
      }

      // Wait for all saves to complete
      await Promise.all(savePromises);

      // Reset coordinator dirty state
      coordinator.resetAllDirtyStates();

      success();
      logger.info('BASIC_HEALTH_TAB', 'All sections saved successfully', {
        userId: profile?.userId,
      });
    } catch (error) {
      logger.error('BASIC_HEALTH_TAB', 'Failed to save all sections', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Unsaved Changes Indicator */}
      <UnsavedChangesIndicator
        isDirty={coordinator.hasAnyChanges}
        onSave={saveAllChanges}
        isSaving={saving}
        isValid={true}
        modifiedFieldsCount={coordinator.totalChangedFields}
      />

      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(239, 68, 68, 0.3)',
        }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                  `,
                  border: '2px solid rgba(239, 68, 68, 0.5)',
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.Scale} size={24} style={{ color: '#EF4444' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Base</h2>
                <p className="text-white/70 text-sm">Informations médicales essentielles</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: '#EF4444',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
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
                  background: 'linear-gradient(90deg, #EF4444, rgba(239, 68, 68, 0.8))',
                  boxShadow: '0 0 12px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
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
      <BloodTypeSection />

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
          onSave={medicalConditions.saveChanges}
          isSaving={medicalConditions.saving}
          isDirty={medicalConditions.isDirty}
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
        onSave={medicalConditions.saveChanges}
        isSaving={medicalConditions.saving}
        isDirty={medicalConditions.isDirty}
      />


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
    </div>
  );
};
