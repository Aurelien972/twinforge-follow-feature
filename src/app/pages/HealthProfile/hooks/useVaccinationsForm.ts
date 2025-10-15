/**
 * Vaccinations Form Hook
 * Manages vaccination state and interactions
 */

import React from 'react';
import { useUserStore } from '../../../../system/store/userStore';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import type { VaccinationRecord, HealthProfileV2, CountryHealthData } from '../../../../domain/health';

export function useVaccinationsForm(countryData: CountryHealthData | null) {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;
  const [vaccinations, setVaccinations] = React.useState<VaccinationRecord[]>(
    healthV2?.vaccinations?.records || []
  );
  const [upToDate, setUpToDate] = React.useState(
    healthV2?.vaccinations?.up_to_date || false
  );
  const [isDirty, setIsDirty] = React.useState(false);

  const handleAddVaccination = (vaccination: VaccinationRecord) => {
    setVaccinations((prev) => [...prev, vaccination]);
    setIsDirty(true);
    logger.info('VACCINATIONS', 'Added vaccination', { name: vaccination.name });
  };

  const handleUpdateVaccination = (index: number, vaccination: VaccinationRecord) => {
    setVaccinations((prev) => {
      const updated = [...prev];
      updated[index] = vaccination;
      return updated;
    });
    setIsDirty(true);
    logger.info('VACCINATIONS', 'Updated vaccination', { index, name: vaccination.name });
  };

  const handleRemoveVaccination = (index: number) => {
    setVaccinations((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
    logger.info('VACCINATIONS', 'Removed vaccination', { index });
  };

  const handleToggleUpToDate = (checked: boolean) => {
    setUpToDate(checked);
    setIsDirty(true);
    logger.info('VACCINATIONS', 'Toggled up to date status', { checked });
  };

  const handleSave = async () => {
    try {
      logger.info('VACCINATIONS', 'Saving vaccinations', {
        userId: profile?.userId,
        count: vaccinations.length,
        upToDate,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          vaccinations: {
            up_to_date: upToDate,
            records: vaccinations,
            last_reviewed: new Date().toISOString(),
          },
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Vaccinations sauvegardées',
        message: 'Vos informations de vaccination ont été mises à jour',
        duration: 3000,
      });

      setIsDirty(false);
    } catch (error) {
      logger.error('VACCINATIONS', 'Failed to save vaccinations', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les vaccinations',
        duration: 4000,
      });
    }
  };

  return {
    vaccinations,
    upToDate,
    onAddVaccination: handleAddVaccination,
    onUpdateVaccination: handleUpdateVaccination,
    onRemoveVaccination: handleRemoveVaccination,
    onToggleUpToDate: handleToggleUpToDate,
    onSave: handleSave,
    isSaving: saving,
    isDirty,
  };
}
