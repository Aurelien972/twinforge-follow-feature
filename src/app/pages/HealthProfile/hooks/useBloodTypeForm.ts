/**
 * useBloodTypeForm Hook
 * Manages blood type state and save functionality
 */

import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '../../../../system/store/userStore';
import type { HealthProfileV2 } from '../../../../domain/health';
import logger from '../../../../lib/utils/logger';
import { useHealthProfileSave } from './useHealthProfileSave';

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export function useBloodTypeForm() {
  const { profile } = useUserStore();
  const { saveSection, isSectionSaving } = useHealthProfileSave();
  const health = (profile as any)?.health as HealthProfileV2 | undefined;

  const [bloodType, setBloodType] = useState<BloodType | undefined>(undefined);
  const [initialBloodType, setInitialBloodType] = useState<BloodType | undefined>(undefined);

  // Initialize from profile
  useEffect(() => {
    const currentBloodType = health?.basic?.bloodType as BloodType | undefined;
    setBloodType(currentBloodType);
    setInitialBloodType(currentBloodType);

    logger.debug('BLOOD_TYPE_FORM', 'Initialized from database', {
      bloodType: currentBloodType,
    });
  }, [health?.basic?.bloodType]);

  // Check if dirty
  const isDirty = bloodType !== initialBloodType;

  const handleChange = useCallback((newBloodType: BloodType) => {
    setBloodType(newBloodType);
    logger.info('BLOOD_TYPE_FORM', 'Blood type changed', { newBloodType });
  }, []);

  const saveChanges = useCallback(async () => {
    if (!bloodType) {
      logger.warn('BLOOD_TYPE_FORM', 'Cannot save: no blood type selected');
      return;
    }

    try {
      logger.info('BLOOD_TYPE_FORM', 'Saving blood type', {
        bloodType,
        userId: profile?.userId,
      });

      await saveSection({
        section: 'basic',
        data: {
          bloodType,
        },
        onSuccess: () => {
          setInitialBloodType(bloodType);
          logger.info('BLOOD_TYPE_FORM', 'Successfully saved and reset dirty state', {
            bloodType,
          });
        },
      });
    } catch (error) {
      logger.error('BLOOD_TYPE_FORM', 'Save failed (already handled by saveSection)', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, [bloodType, profile?.userId, saveSection]);

  return {
    bloodType,
    onChange: handleChange,
    saveChanges,
    saving: isSectionSaving('basic'),
    isDirty,
  };
}
