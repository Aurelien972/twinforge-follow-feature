import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useProfilePerformance } from './hooks/useProfilePerformance';
import { ConditionalMotionSlide } from './components/shared/ConditionalMotionProfile';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useUserStore } from '../../../system/store/userStore';
import { useProfileNutritionForm } from './hooks/useProfileNutritionForm';
import { useUnsavedChangesStore } from '../../../system/store/unsavedChangesStore';
import ProfileNudge from '../../../ui/components/ProfileNudge';
import { calculateRecipeWorkshopCompletion } from '../../../system/profile/profileCompletionService';
import { calculateNutritionCompletion } from './utils/profileCompletion';
import { ProgressBar } from './components/ProfileNutritionComponents';
import { DietBudgetSection } from './components/nutrition/DietBudgetSection';
import { EssentialsSection } from './components/nutrition/EssentialsSection';
import { FoodPreferencesSection } from './components/nutrition/FoodPreferencesSection';
import { RestrictionsSection } from './components/nutrition/RestrictionsSection';
import { MacroTargetsSection } from './components/nutrition/MacroTargetsSection';
import { ShoppingPreferencesSection } from './components/nutrition/ShoppingPreferencesSection';
import GlassCard from '../../../ui/cards/GlassCard';
import { uniformTabPanelVariants, uniformStaggerContainerVariants, uniformStaggerItemVariants } from '../../../ui/tabs/tabsConfig';
import Haptics from '../../../utils/haptics';

/**
 * Profile Nutrition Tab - Enhanced for Recipe Workshop
 * Comprehensive nutrition preferences management with VisionOS 26 design
 */
const ProfileNutritionTab: React.FC = () => {
  const { profile } = useUserStore();

  // Performance optimization
  const performanceConfig = useProfilePerformance();

  // Check profile completion for Recipe Workshop
  const profileCompletion = calculateRecipeWorkshopCompletion(profile);
  const { form, actions, state } = useProfileNutritionForm();
  const setTabDirty = useUnsavedChangesStore(state => state.setTabDirty);

  // Calculate nutrition-specific completion percentage - memoized
  const nutritionCompletionPercentage = useMemo(
    () => calculateNutritionCompletion(profile),
    [profile?.diet, profile?.allergies, profile?.food_preferences]
  );

  
  const { register, handleSubmit, errors, isDirty, watchedValues, setValue } = form;
  const { 
    saveDietSection, 
    saveRestrictionsSection, 
    saveEssentialsSection,
    savePreferencesSection,
    saveNutritionSection,
    saveShoppingSection,
    onSubmit 
  } = actions;
  const { 
    saving, 
    sectionSaving, 
    hasDietChanges, 
    hasRestrictionsChanges,
    hasEssentialsChanges,
    hasPreferencesChanges,
    hasNutritionChanges,
    hasShoppingChanges
  } = state;
  
  return (
    <ConditionalMotionSlide
      performanceConfig={performanceConfig}
      direction="up"
      distance={20}
      className="space-y-6 profile-section"
    >
      {/* Profile Nudge for Recipe Workshop - Show completion guidance */}
      {performanceConfig.shouldUseAnimatePresence ? (
        <AnimatePresence>
          {!profileCompletion.isSufficient && (
            <ProfileNudge
              completion={profileCompletion}
              variant="banner"
              showDismiss={false}
            />
          )}
        </AnimatePresence>
      ) : (
        !profileCompletion.isSufficient && (
          <ProfileNudge
            completion={profileCompletion}
            variant="banner"
            showDismiss={false}
          />
        )
      )}
      
      {/* Progress Header */}
      <ProgressBar
        percentage={nutritionCompletionPercentage}
        title="Forge Nutritionnelle"
        subtitle="Configurez vos préférences alimentaires pour une personnalisation optimale"
        color="#10B981"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Diet & Budget Card */}
        <DietBudgetSection
          register={register}
          isDirty={hasDietChanges}
          isSaving={sectionSaving === 'diet'}
          onSave={saveDietSection}
        />

        {/* Essentials Card - Foyer, Temps, Niveau, Équipement */}
        <EssentialsSection
          register={register}
          watchedValues={watchedValues}
          isDirty={hasEssentialsChanges}
          isSaving={sectionSaving === 'essentials'}
          onSave={saveEssentialsSection}
        />

        {/* Food Preferences Card */}
        <FoodPreferencesSection
          register={register}
          watchedValues={watchedValues}
          setValue={setValue}
          isDirty={hasPreferencesChanges}
          isSaving={sectionSaving === 'preferences'}
          onSave={savePreferencesSection}
        />

        {/* Restrictions Card */}
        <RestrictionsSection
          register={register}
          watchedValues={watchedValues}
          setValue={setValue}
          isDirty={hasRestrictionsChanges}
          isSaving={sectionSaving === 'restrictions'}
          onSave={saveRestrictionsSection}
        />

        {/* Macro Targets Card */}
        <MacroTargetsSection
          register={register}
          isDirty={hasNutritionChanges}
          isSaving={sectionSaving === 'nutrition'}
          onSave={saveNutritionSection}
        />

        {/* Shopping Preferences Card */}
        <ShoppingPreferencesSection
          register={register}
          watchedValues={watchedValues}
          setValue={setValue}
          isDirty={hasShoppingChanges}
          isSaving={sectionSaving === 'shopping'}
          onSave={saveShoppingSection}
        />

        {/* Global Save Action */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={saving || !isDirty}
            className={`btn-glass--primary px-8 py-4 text-lg font-semibold ${
              !isDirty ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => Haptics.tap()}
          >
            <div className="flex items-center gap-3">
              {saving ? (
                <SpatialIcon Icon={ICONS.Loader2} size={20} className="animate-spin" />
              ) : (
                <SpatialIcon Icon={ICONS.Save} size={20} />
              )}
              <span>{saving ? 'Sauvegarde...' : 'Sauvegarder Tout'}</span>
            </div>
          </button>
        </div>

        {/* Validation Summary */}
        {Object.keys(errors).length > 0 && (
          <GlassCard className="p-4" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}>
            <h4 className="text-red-300 font-medium mb-3 flex items-center gap-2">
              <SpatialIcon Icon={ICONS.AlertCircle} size={16} />
              Erreurs de validation
            </h4>
            <div className="space-y-2">
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-red-200 text-sm flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-400" />
                  {error?.message as string}
                </p>
              ))}
            </div>
          </GlassCard>
        )}
      </form>
    </ConditionalMotionSlide>
  );
};

export default ProfileNutritionTab;