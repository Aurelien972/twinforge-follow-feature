/**
 * ProfileTrainingTab Component
 * Onglet Training du profil avec sections indépendantes
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useUserStore } from '../../../system/store/userStore';
import { useToast } from '../../../ui/components/ToastProvider';
import { useFeedback } from '../../../hooks/useFeedback';
import { preferencesSchema, type PreferencesForm } from './validation/profilePreferencesValidation';
import { TrainingLocationManager, EquipmentManagerCard, MeasurableGoalsSection } from '../../../ui/components/training';
import { useTrainingLocations } from '../../../hooks/useTrainingLocations';
import { calculateTrainingCompletion } from './utils/profileCompletion';
import WearableStatusCard from './components/WearableStatusCard';
import {
  FITNESS_LEVELS_DETAILED,
  TRAINING_CATEGORIES
} from '../../../system/store/trainingPipeline/constants';

const ProfileTrainingTab: React.FC = () => {
  const { profile, updateProfile, saving } = useUserStore();
  const { showToast } = useToast();
  const { success, formSubmit } = useFeedback();
  const { locations, selectedLocation, refetchLocations } = useTrainingLocations();

  const completionPercentage = calculateTrainingCompletion(profile);

  const form = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      workout: {
        type: profile?.preferences?.workout?.type || undefined,
        fitnessLevel: profile?.preferences?.workout?.fitnessLevel || undefined,
        sessionsPerWeek: profile?.preferences?.workout?.sessionsPerWeek || undefined,
        preferredDuration: profile?.preferences?.workout?.preferredDuration || undefined,
        equipment: profile?.preferences?.workout?.equipment || [],
        specificGoals: profile?.preferences?.workout?.specificGoals || [],
        morningWorkouts: profile?.preferences?.workout?.morningWorkouts || false,
        highIntensity: profile?.preferences?.workout?.highIntensity || false,
        groupWorkouts: profile?.preferences?.workout?.groupWorkouts || false,
        outdoorActivities: profile?.preferences?.workout?.outdoorActivities || false
      }
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty } = formState;

  const onSubmit = async (data: PreferencesForm) => {
    try {
      formSubmit();

      await updateProfile({
        preferences: {
          ...profile?.preferences,
          workout: data.workout
        },
        updated_at: new Date().toISOString()
      });

      success();
      showToast({
        type: 'success',
        title: 'Profil sportif sauvegardé',
        message: 'Vos informations ont été mises à jour',
        duration: 4000
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Impossible de sauvegarder votre profil sportif',
        duration: 4000
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="relative overflow-hidden rounded-xl p-6"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          border: '2px solid rgba(6, 182, 212, 0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Profil Sportif</h2>
            <p className="text-white/60 text-sm">Configurez vos préférences d'entraînement</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white mb-1">{completionPercentage}%</div>
            <div className="text-cyan-300 text-xs">Complété</div>
          </div>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
              background: 'linear-gradient(90deg, #06B6D4 0%, #3B82F6 100%)',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
            }}
          />
        </div>
      </div>

      {/* Section 1: Profil Sportif avec son propre formulaire */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <GlassCard
          className="p-6"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(6, 182, 212, 0.2)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.35) 0%, transparent 60%),
                    rgba(255, 255, 255, 0.12)
                  `,
                  border: '2px solid rgba(6, 182, 212, 0.5)',
                  boxShadow: `
                    0 4px 16px rgba(6, 182, 212, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <SpatialIcon
                  Icon={ICONS.User}
                  size={24}
                  style={{
                    color: '#06B6D4',
                    filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.7))'
                  }}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl">Profil Sportif</h3>
                <p className="text-white/60 text-sm mt-1">
                  Vos caractéristiques athlétiques de base
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Essentiel</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fitnessLevel" className="block text-white/90 text-sm font-medium mb-3">
                Niveau de forme physique
              </label>
              <select {...register('workout.fitnessLevel')} id="fitnessLevel" className="glass-input">
                <option value="">Sélectionner votre niveau</option>
                {FITNESS_LEVELS_DETAILED.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label} - {level.description}
                  </option>
                ))}
              </select>
              {errors.workout?.fitnessLevel && (
                <p className="text-red-300 text-xs mt-2">
                  {errors.workout.fitnessLevel.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="workoutType" className="block text-white/90 text-sm font-medium mb-3">
                Type d'entraînement préféré
              </label>
              <select {...register('workout.type')} id="workoutType" className="glass-input">
                <option value="">Sélectionner votre discipline</option>
                {TRAINING_CATEGORIES.map((category) => (
                  <optgroup key={category.id} label={category.label}>
                    {category.types.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.workout?.type && (
                <p className="text-red-300 text-xs mt-2">{errors.workout.type.message}</p>
              )}
              <p className="text-white/50 text-xs mt-2">
                Un coach spécialisé sera assigné selon votre choix
              </p>
            </div>

            <div>
              <label htmlFor="sessionsPerWeek" className="block text-white/90 text-sm font-medium mb-3">
                Séances par semaine
              </label>
              <input
                {...register('workout.sessionsPerWeek', { valueAsNumber: true })}
                type="number"
                id="sessionsPerWeek"
                min="0"
                max="14"
                step="1"
                className="glass-input"
                placeholder="3"
              />
              {errors.workout?.sessionsPerWeek && (
                <p className="text-red-300 text-xs mt-2">
                  {errors.workout.sessionsPerWeek.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="preferredDuration" className="block text-white/90 text-sm font-medium mb-3">
                Durée préférée par séance (minutes)
              </label>
              <input
                {...register('workout.preferredDuration', { valueAsNumber: true })}
                type="number"
                id="preferredDuration"
                min="15"
                max="180"
                step="15"
                className="glass-input"
                placeholder="60"
              />
              {errors.workout?.preferredDuration && (
                <p className="text-red-300 text-xs mt-2">
                  {errors.workout.preferredDuration.message}
                </p>
              )}
            </div>
          </div>

          {/* Wearable Status Card */}
          <div className="mt-6">
            <WearableStatusCard />
          </div>

          {/* Bouton de sauvegarde pour cette section */}
          {isDirty && (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={saving}
                className="btn-glass px-6 py-3 text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  {saving ? (
                    <SpatialIcon Icon={ICONS.Loader2} size={16} className="animate-spin" />
                  ) : (
                    <SpatialIcon Icon={ICONS.Save} size={16} />
                  )}
                  <span>{saving ? 'Sauvegarde...' : 'Sauvegarder Profil Sportif'}</span>
                </div>
              </button>
            </div>
          )}
        </GlassCard>

        {/* Section 1.5: Gestion des Équipements (dans Profil Sportif) */}
        {(selectedLocation || (locations.length > 0)) && (
          <div className="mt-6">
            <EquipmentManagerCard
              location={selectedLocation || locations[0]}
              onEquipmentUpdated={refetchLocations}
            />
          </div>
        )}
      </form>

      {/* Section 3: Lieux d'Entraînement (Photos & Détection IA) */}
      <TrainingLocationManager />

      {/* Section 3: Objectifs Mesurables (sauvegarde automatique intégrée) */}
      <MeasurableGoalsSection />
    </div>
  );
};

export default ProfileTrainingTab;
