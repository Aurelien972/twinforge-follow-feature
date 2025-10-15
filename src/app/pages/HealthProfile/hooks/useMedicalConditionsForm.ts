/**
 * useMedicalConditionsForm Hook
 * Manages medical conditions and medications form state
 */

import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '../../../../system/store/userStore';
import type { HealthProfileV2 } from '../../../../domain/health';
import logger from '../../../../lib/utils/logger';

export function useMedicalConditionsForm() {
  const { profile, updateProfile } = useUserStore();
  const health = (profile as any)?.health as HealthProfileV2 | undefined;

  const [conditions, setConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [hasDeclaredNoIssues, setHasDeclaredNoIssues] = useState(false);

  // Initialize from profile
  useEffect(() => {
    if (health?.medical_history) {
      setConditions(health.medical_history.conditions || []);
      setMedications(health.medical_history.medications || []);
    }
    if (health) {
      setHasDeclaredNoIssues(health.declaredNoIssues || false);
    }
  }, [health]);

  const addCondition = useCallback(() => {
    if (newCondition.trim()) {
      setConditions(prev => [...prev, newCondition.trim()]);
      setNewCondition('');
      setIsDirty(true);
      if (hasDeclaredNoIssues) {
        setHasDeclaredNoIssues(false);
      }
    }
  }, [newCondition, hasDeclaredNoIssues]);

  const removeCondition = useCallback((index: number) => {
    setConditions(prev => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  }, []);

  const addMedication = useCallback(() => {
    if (newMedication.trim()) {
      setMedications(prev => [...prev, newMedication.trim()]);
      setNewMedication('');
      setIsDirty(true);
      if (hasDeclaredNoIssues) {
        setHasDeclaredNoIssues(false);
      }
    }
  }, [newMedication, hasDeclaredNoIssues]);

  const removeMedication = useCallback((index: number) => {
    setMedications(prev => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  }, []);

  const declareNoIssues = useCallback(async () => {
    try {
      setSaving(true);

      const updatedHealth: HealthProfileV2 = {
        ...health,
        version: '2.0',
        medical_history: {
          ...(health?.medical_history || { conditions: [], medications: [] }),
          conditions: [],
          medications: [],
        },
        declaredNoIssues: true,
      };

      await updateProfile({
        health: updatedHealth,
      });

      setConditions([]);
      setMedications([]);
      setHasDeclaredNoIssues(true);
      setIsDirty(false);

      logger.info('MEDICAL_CONDITIONS', 'Declared no health issues');
    } catch (error) {
      logger.error('MEDICAL_CONDITIONS', 'Failed to declare no issues', { error });
      throw error;
    } finally {
      setSaving(false);
    }
  }, [health, updateProfile]);

  const saveChanges = useCallback(async () => {
    try {
      setSaving(true);

      const updatedHealth: HealthProfileV2 = {
        ...health,
        version: '2.0',
        medical_history: {
          ...(health?.medical_history || { conditions: [], medications: [] }),
          conditions,
          medications,
        },
        declaredNoIssues: conditions.length === 0 && medications.length === 0 ? hasDeclaredNoIssues : false,
      };

      await updateProfile({
        health: updatedHealth,
      });

      setIsDirty(false);

      logger.info('MEDICAL_CONDITIONS', 'Saved medical conditions and medications', {
        conditionsCount: conditions.length,
        medicationsCount: medications.length,
      });
    } catch (error) {
      logger.error('MEDICAL_CONDITIONS', 'Failed to save medical conditions', { error });
      throw error;
    } finally {
      setSaving(false);
    }
  }, [health, conditions, medications, hasDeclaredNoIssues, updateProfile]);

  return {
    conditions,
    medications,
    newCondition,
    newMedication,
    setNewCondition,
    setNewMedication,
    addCondition,
    removeCondition,
    addMedication,
    removeMedication,
    declareNoIssues,
    hasDeclaredNoIssues,
    saveChanges,
    saving,
    isDirty,
  };
}
