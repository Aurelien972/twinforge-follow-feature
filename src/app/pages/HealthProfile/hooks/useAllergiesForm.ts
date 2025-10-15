/**
 * Allergies Form Hook
 * Manages allergies state and operations
 */

import React from 'react';
import { useUserStore } from '../../../../system/store/userStore';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useFeedback } from '../../../../hooks/useFeedback';
import logger from '../../../../lib/utils/logger';
import type { HealthProfileV2 } from '../../../../domain/health';

interface Allergy {
  name: string;
  category: 'food' | 'medication' | 'environmental';
  severity: 'mild' | 'moderate' | 'severe' | 'anaphylaxis';
}

export function useAllergiesForm() {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success } = useFeedback();

  // Extract V2 health data
  const healthV2 = (profile as any)?.health as HealthProfileV2 | undefined;

  // Parse allergies from medical_history.allergies (string array) to structured format
  // For now, we store them as simple strings, but we could enhance the data model
  const [allergies, setAllergies] = React.useState<Allergy[]>([]);
  const [isDirty, setIsDirty] = React.useState(false);

  // Initialize allergies (simplified - in real implementation, parse from stored data)
  React.useEffect(() => {
    const storedAllergies = healthV2?.medical_history?.allergies || [];
    // For now, treat all stored allergies as food/mild (would need schema update for full support)
    const parsedAllergies: Allergy[] = storedAllergies.map(name => ({
      name,
      category: 'food' as const,
      severity: 'mild' as const,
    }));
    setAllergies(parsedAllergies);
  }, [healthV2?.medical_history?.allergies]);

  const handleAddAllergy = (allergy: Allergy) => {
    setAllergies((prev) => [...prev, allergy]);
    setIsDirty(true);
    logger.info('ALLERGIES', 'Added allergy', {
      name: allergy.name,
      category: allergy.category,
      severity: allergy.severity,
    });
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
    logger.info('ALLERGIES', 'Removed allergy', { index });
  };

  const handleSave = async () => {
    try {
      logger.info('ALLERGIES', 'Saving allergies', {
        userId: profile?.userId,
        count: allergies.length,
      });

      const currentHealth = (profile as any)?.health as HealthProfileV2 | undefined;

      // Convert structured allergies back to string array for storage
      const allergyNames = allergies.map(a => a.name);

      await updateProfile({
        health: {
          ...currentHealth,
          version: '2.0' as const,
          medical_history: {
            ...currentHealth?.medical_history,
            conditions: currentHealth?.medical_history?.conditions || [],
            medications: currentHealth?.medical_history?.medications || [],
            allergies: allergyNames,
          },
        },
        updated_at: new Date().toISOString(),
      });

      success();
      showToast({
        type: 'success',
        title: 'Allergies sauvegardées',
        message: 'Vos informations d\'allergies ont été mises à jour',
        duration: 3000,
      });

      setIsDirty(false);
    } catch (error) {
      logger.error('ALLERGIES', 'Failed to save allergies', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: profile?.userId,
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder les allergies',
        duration: 4000,
      });
    }
  };

  return {
    allergies,
    onAddAllergy: handleAddAllergy,
    onRemoveAllergy: handleRemoveAllergy,
    onSave: handleSave,
    isSaving: saving,
    isDirty,
  };
}
