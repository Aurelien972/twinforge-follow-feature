// src/hooks/useGlobalFaceParams.ts
import { useState, useCallback, useEffect, useMemo } from 'react';
import React from 'react';
import { useUserStore } from '../system/store/userStore';
import { supabase } from '../system/supabase/client';
import logger from '../lib/utils/logger';
import { normalizeFaceShapeValue } from '../config/faceShapeKeysMapping';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook global pour gérer les paramètres faciaux
 * Synchronise les modifications entre tous les viewers et avec Supabase
 */
export function useGlobalFaceParams() {
  const { profile, setProfile } = useUserStore();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localFaceParams, setLocalFaceParams] = useState<Record<string, number>>({});

  // Récupérer les paramètres faciaux actuels (memoized to prevent reference changes)
  const currentFaceParams = React.useMemo(
    () => profile?.preferences?.face?.final_face_params || {},
    [profile?.preferences?.face?.final_face_params]
  );

  // Initialize local params from profile
  useEffect(() => {
    if (profile?.preferences?.face?.final_face_params) {
      setLocalFaceParams(profile.preferences.face.final_face_params);
    }
  }, [profile?.preferences?.face?.final_face_params]);

  /**
   * Mettre à jour les paramètres faciaux localement (sans sauvegarder)
   */
  const updateFaceParams = useCallback((newParams: Record<string, number>) => {
    if (!profile) {
      logger.error('USE_GLOBAL_FACE_PARAMS', 'Cannot update face params: no profile', {
        philosophy: 'no_profile_error'
      });
      return;
    }

    // Normaliser les valeurs
    const normalizedParams: Record<string, number> = {};
    Object.entries(newParams).forEach(([key, value]) => {
      normalizedParams[key] = normalizeFaceShapeValue(key, value);
    });

    // Mettre à jour l'état local immédiatement pour l'UI
    setLocalFaceParams(normalizedParams);

    // Mettre à jour le profil localement pour les viewers
    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        face: {
          ...profile.preferences?.face,
          final_face_params: normalizedParams
        }
      }
    };

    setProfile(updatedProfile);

    logger.info('USE_GLOBAL_FACE_PARAMS', 'Face params updated locally', {
      userId: profile.userId,
      paramsCount: Object.keys(normalizedParams).length,
      sampleKeys: Object.keys(normalizedParams).slice(0, 5),
      sampleValues: Object.keys(normalizedParams).slice(0, 5).map(k => ({ [k]: normalizedParams[k] })),
      philosophy: 'local_update'
    });

    // Force trigger for debugging
    console.log('🔄 useGlobalFaceParams: Updated face params', {
      totalKeys: Object.keys(normalizedParams).length,
      sampleKeys: Object.keys(normalizedParams).slice(0, 5)
    });
  }, [profile, setProfile]);

  /**
   * Sauvegarder les paramètres faciaux dans Supabase
   */
  const saveFaceParams = useCallback(async (paramsToSave?: Record<string, number>) => {
    if (!profile?.userId) {
      logger.error('USE_GLOBAL_FACE_PARAMS', 'Cannot save face params: no user ID', {
        philosophy: 'no_user_id_error'
      });
      setError('Utilisateur non connecté');
      return { success: false, error: 'Utilisateur non connecté' };
    }

    const params = paramsToSave || currentFaceParams;

    setIsSaving(true);
    setError(null);

    logger.info('USE_GLOBAL_FACE_PARAMS', 'Saving face params to Supabase', {
      userId: profile.userId,
      paramsCount: Object.keys(params).length,
      philosophy: 'supabase_save_start'
    });

    try {
      // Normaliser les valeurs avant sauvegarde
      const normalizedParams: Record<string, number> = {};
      Object.entries(params).forEach(([key, value]) => {
        normalizedParams[key] = normalizeFaceShapeValue(key, value);
      });

      // Construire l'objet face complet
      const faceData = {
        ...profile.preferences?.face,
        final_face_params: normalizedParams,
        updated_at: new Date().toISOString()
      };

      // Mettre à jour dans Supabase
      const { error: updateError } = await supabase
        .from('user_profile')
        .update({
          preferences: {
            ...profile.preferences,
            face: faceData
          }
        })
        .eq('user_id', profile.userId);

      if (updateError) {
        throw updateError;
      }

      // Mettre à jour le profil local avec la nouvelle date
      const updatedProfile = {
        ...profile,
        preferences: {
          ...profile.preferences,
          face: faceData
        }
      };
      setProfile(updatedProfile);

      // Invalider le cache React Query pour forcer le rechargement dans tous les composants
      await queryClient.invalidateQueries({ queryKey: ['profile-face-data'] });
      await queryClient.invalidateQueries({ queryKey: ['user-profile'] });

      logger.info('USE_GLOBAL_FACE_PARAMS', 'Face params saved successfully', {
        userId: profile.userId,
        paramsCount: Object.keys(normalizedParams).length,
        cacheInvalidated: true,
        philosophy: 'supabase_save_success'
      });

      setIsSaving(false);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      logger.error('USE_GLOBAL_FACE_PARAMS', 'Failed to save face params', {
        userId: profile.userId,
        error: errorMessage,
        philosophy: 'supabase_save_error'
      });

      setError(errorMessage);
      setIsSaving(false);
      return { success: false, error: errorMessage };
    }
  }, [profile, currentFaceParams, setProfile]);

  /**
   * Réinitialiser aux valeurs par défaut
   */
  const resetToDefaults = useCallback(() => {
    updateFaceParams({});
    logger.info('USE_GLOBAL_FACE_PARAMS', 'Face params reset to defaults', {
      userId: profile?.userId,
      philosophy: 'reset_to_defaults'
    });
  }, [updateFaceParams, profile]);

  /**
   * Mettre à jour une seule clé
   */
  const updateSingleKey = useCallback((key: string, value: number) => {
    const newParams = {
      ...currentFaceParams,
      [key]: normalizeFaceShapeValue(key, value)
    };
    updateFaceParams(newParams);
  }, [currentFaceParams, updateFaceParams]);

  return {
    // État
    currentFaceParams,
    isSaving,
    error,

    // Actions
    updateFaceParams,
    saveFaceParams,
    resetToDefaults,
    updateSingleKey
  };
}
