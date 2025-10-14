/**
 * Generation Actions for Meal Plan Store
 * Handles meal plan generation and regeneration
 */

import { supabase } from '../../../supabase/client';
import { useUserStore } from '../../userStore';
import logger from '../../../../lib/utils/logger';
import type { MealPlanState, MealPlanData, MealPlanDay } from '../types';
import { getWeekStartDate, transformEdgeDayToFrontendDay } from '../constants';
import { useMealPlanStore } from '..';
import type { DetailedRecipe } from '../../../../domain/recipe';

export interface GenerationActions {
  generateMealPlan: (weekNumber: number, inventory?: any[]) => Promise<void>;
  regenerateWeek: (weekNumber: number) => Promise<void>;
  generateNextWeek: () => Promise<void>;
  generateSpecificWeek: (weekNumber: number) => Promise<void>;
  setIsGeneratingDetailedRecipes: (isGenerating: boolean) => void;
  cancelDetailedRecipeGeneration: () => void;
}

// Helper function to create skeleton day
const createSkeletonDay = (date: string, dayName: string): MealPlanDay => ({
  date,
  dayName,
  meals: {
    breakfast: {
      title: '',
      description: '',
      ingredients: [],
      prep_time_min: 0,
      calories_est: 0,
      status: 'idle',
      isDetailedRecipeGenerated: false
    },
    lunch: {
      title: '',
      description: '',
      ingredients: [],
      prep_time_min: 0,
      calories_est: 0,
      status: 'idle',
      isDetailedRecipeGenerated: false
    },
    dinner: {
      title: '',
      description: '',
      ingredients: [],
      prep_time_min: 0,
      calories_est: 0,
      status: 'idle',
      isDetailedRecipeGenerated: false
    },
    snack: {
      title: '',
      description: '',
      ingredients: [],
      prep_time_min: 0,
      calories_est: 0,
      status: 'idle',
      isDetailedRecipeGenerated: false
    }
  },
  daily_summary: '',
  prepTime: 0,
  cookTime: 0,
  totalCalories: 0,
  status: 'loading'
});

export const createGenerationActions = (
  set: (partial: Partial<MealPlanState>) => void,
  get: () => MealPlanState
): GenerationActions => ({
  generateMealPlan: async (weekNumber: number, inventory?: any[]) => {
    const state = get();
    
    if (!state.selectedInventoryId) {
      logger.error('MEAL_PLAN_STORE', 'No inventory selected for meal plan generation');
      return;
    }

    try {
      set({ 
        isGenerating: true, 
        generationProgress: 0,
        currentLoadingTitle: 'Initialisation',
        currentLoadingSubtitle: 'Préparation de votre plan personnalisé',
        loadingMessage: 'Démarrage de la génération...'
      });

      // Initialize reference date if not set (first generation)
      if (!state.referenceStartDate && weekNumber === 1) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        set({ referenceStartDate: today.toISOString() });
      }

      // Calculate week dates using reference date
      const weekStartDate = getWeekStartDate(weekNumber, state.referenceStartDate);
      const skeletonDays: MealPlanDay[] = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStartDate);
        currentDate.setDate(weekStartDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        const dayName = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });

        skeletonDays.push(createSkeletonDay(dateString, dayName));
      }

      // Initialize skeleton plan immediately WITH skeleton days
      const skeletonPlan: MealPlanData = {
        id: `week-${weekNumber}-skeleton`,
        weekNumber,
        startDate: weekStartDate.toISOString().split('T')[0],
        days: skeletonDays,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      set({
        currentPlan: skeletonPlan,
        currentWeek: weekNumber
      });

      logger.info('MEAL_PLAN_STORE', 'Skeleton plan initialized - EmptyPlanState will NOT show', {
        weekNumber,
        skeletonDaysCount: skeletonDays.length,
        hasSkeleton: true,
        currentPlanSet: true,
        timestamp: new Date().toISOString()
      });

      // Start progress simulation
      get().startProgressSimulation();

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const userProfile = useUserStore.getState().profile;
      if (!userProfile) throw new Error('User profile not found');

      logger.info('MEAL_PLAN_STORE', 'Starting meal plan generation', {
        weekNumber,
        inventoryId: state.selectedInventoryId,
        userId: user.id,
        timestamp: new Date().toISOString()
      });

      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);

      // Call the Edge function
      // Use direct fetch to handle SSE stream
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meal-plan-generator`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          week_number: weekNumber,
          start_date: weekStartDate.toISOString().split('T')[0],
          end_date: weekEndDate.toISOString().split('T')[0],
          inventory_count: inventory?.length || 0,
          has_preferences: !!userProfile
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Handle SSE stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let transformedDays: MealPlanDay[] = [];
      let planId = `week-${weekNumber}-${Date.now()}`;
      let nutritionalSummary: any = null;
      let estimatedWeeklyCost: number | null = null;
      let batchCookingDays: string[] = [];
      let aiExplanation: any = null;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.type === 'day') {
                  const transformedDay = transformEdgeDayToFrontendDay(data.data);

                  // Add the new day to transformedDays
                  transformedDays.push(transformedDay);

                  // Get current plan with skeleton days
                  const currentPlan = get().currentPlan;
                  if (!currentPlan) return;

                  // Replace skeleton day with real day by date
                  const updatedDays = currentPlan.days.map(skeletonDay => {
                    const matchingRealDay = transformedDays.find(rd => rd.date === skeletonDay.date);
                    return matchingRealDay || skeletonDay;
                  });

                  // Update the plan with progressively replaced days
                  const updatedPlan = {
                    ...currentPlan,
                    days: updatedDays,
                    updatedAt: new Date().toISOString()
                  };

                  set({ currentPlan: updatedPlan });

                  // Update progress based on days received
                  const readyDaysCount = transformedDays.filter(d => d.status === 'ready').length;
                  const progress = Math.min(90, (readyDaysCount / 7) * 80);
                  set({ generationProgress: progress });

                  logger.info('MEAL_PLAN_STORE', 'Day received and skeleton replaced', {
                    date: transformedDay.date,
                    dayName: transformedDay.dayName,
                    readyDaysCount,
                    progress,
                    timestamp: new Date().toISOString()
                  });
                } else if (data.type === 'complete') {
                  planId = data.data.id || planId;
                  nutritionalSummary = data.data.nutritional_summary;
                  estimatedWeeklyCost = data.data.estimated_weekly_cost;
                  batchCookingDays = data.data.batch_cooking_days || [];
                  aiExplanation = data.data.ai_explanation || null;
                }
              } catch (parseError) {
                logger.warn('MEAL_PLAN_STORE', 'Failed to parse SSE data', { 
                  line: line,
                  error: parseError instanceof Error ? parseError.message : 'Unknown error',
                  lineLength: line.length,
                  lineSlice: line.slice(6),
                  timestamp: new Date().toISOString()
                });
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      const readyDays = transformedDays.filter(d => d.status === 'ready');
      if (readyDays.length === 0) {
        throw new Error('No meal plan days received from generation');
      }

      const mealPlanData: MealPlanData = {
        id: planId,
        weekNumber,
        startDate: weekStartDate.toISOString().split('T')[0],
        days: transformedDays,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        nutritionalSummary,
        estimatedWeeklyCost,
        batchCookingDays,
        aiExplanation
      };

      // Update store state
      const newAvailableWeeks = [...new Set([...state.availableWeeks, weekNumber])].sort((a, b) => a - b);
      const newMaxAvailableWeek = Math.max(state.maxAvailableWeek, weekNumber);

      set({
        currentPlan: mealPlanData,
        currentWeek: weekNumber,
        availableWeeks: newAvailableWeeks,
        maxAvailableWeek: newMaxAvailableWeek,
        isGenerating: false,
        generationProgress: 100,
        currentLoadingTitle: 'Terminé !',
        currentLoadingSubtitle: 'Votre plan est prêt',
        loadingMessage: 'Plan de repas généré avec succès'
      });

      // Stop progress simulation
      get().stopProgressSimulation();

      logger.info('MEAL_PLAN_STORE', 'Meal plan generation completed', {
        weekNumber,
        planId: mealPlanData.id,
        daysCount: readyDays.length,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      // IMPORTANT: On error, set currentPlan to null so EmptyPlanState shows again
      set({
        currentPlan: null,
        isGenerating: false,
        generationProgress: 0,
        currentLoadingTitle: 'Erreur',
        currentLoadingSubtitle: 'Échec de la génération',
        loadingMessage: error instanceof Error ? error.message : 'Erreur inconnue'
      });

      // Stop progress simulation
      get().stopProgressSimulation();

      logger.error('MEAL_PLAN_STORE', 'Meal plan generation failed - EmptyPlanState will show', {
        weekNumber,
        error: error instanceof Error ? error.message : 'Unknown error',
        currentPlanCleared: true,
        timestamp: new Date().toISOString()
      });
    }
  },

  regenerateWeek: async (inventory: any[], weekNumber: number) => {
    logger.info('MEAL_PLAN_STORE', 'Regenerating week', { weekNumber });
    await get().generateMealPlan(weekNumber, inventory);
  },

  generateNextWeek: async (inventory: any[]) => {
    const state = get();
    const nextWeek = state.maxAvailableWeek + 1;
    logger.info('MEAL_PLAN_STORE', 'Generating next week', { nextWeek });
    await get().generateMealPlan(nextWeek, inventory);
  },

  generateSpecificWeek: async (inventory: any[], weekNumber: number) => {
    logger.info('MEAL_PLAN_STORE', 'Generating specific week', { weekNumber });
    await get().generateMealPlan(weekNumber, inventory);
  },

  setIsGeneratingDetailedRecipes: (isGenerating: boolean) => {
    set({ isGeneratingDetailedRecipes: isGenerating });
  },

  cancelDetailedRecipeGeneration: () => {
    const state = get();
    
    // Reset the generation flag
    set({ isGeneratingDetailedRecipes: false });
    
    // Reset any meals that are currently loading back to idle
    if (state.currentPlan) {
      const updatedPlan = {
        ...state.currentPlan,
        days: state.currentPlan.days.map(day => ({
          ...day,
          meals: {
            breakfast: day.meals.breakfast?.status === 'loading' 
              ? { ...day.meals.breakfast, status: 'idle' as const }
              : day.meals.breakfast,
            lunch: day.meals.lunch?.status === 'loading'
              ? { ...day.meals.lunch, status: 'idle' as const }
              : day.meals.lunch,
            dinner: day.meals.dinner?.status === 'loading'
              ? { ...day.meals.dinner, status: 'idle' as const }
              : day.meals.dinner,
            snack: day.meals.snack?.status === 'loading'
              ? { ...day.meals.snack, status: 'idle' as const }
              : day.meals.snack
          }
        }))
      };
      
      set({ currentPlan: updatedPlan });
    }
    
    logger.info('MEAL_PLAN_STORE', 'Detailed recipe generation cancelled');
  }
});

/**
 * Update meal image URL in the current plan
 */
export const updateMealImageUrlInPlan = (
  dayIndex: number,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  imageUrl: string,
  updatedAt: string,
  imageGenerationError?: boolean
) => {
  const { currentPlan, setCurrentPlan } = useMealPlanStore.getState();
  
  if (!currentPlan || !currentPlan.days[dayIndex]) {
    console.error('MEAL_PLAN_STORE No plan or day found for image URL update');
    return;
  }

  const updatedPlan = {
    ...currentPlan,
    days: currentPlan.days.map((day, index) => 
      index === dayIndex 
        ? {
            ...day,
            meals: {
              ...day.meals,
              [mealType]: {
                ...day.meals[mealType],
                imageUrl: imageGenerationError ? undefined : imageUrl,
                imageGenerationError: imageGenerationError || false,
                updatedAt: updatedAt
              }
            }
          }
        : day
    )
  };
  
  setCurrentPlan(updatedPlan);
};

/**
 * Trigger image generation for a specific meal (background process)
 */
const _triggerImageGenerationForMeal = async (
  dayIndex: number,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  meal: any
) => {
  try {
    console.log('MEAL_PLAN_STORE Starting image generation for meal', {
      dayIndex,
      mealType,
      mealTitle: meal.mealName || meal.title,
      hasDetailedRecipe: !!meal.detailedRecipe
    });

    // Create stable recipe details payload for hashing
    const recipeDetailsPayload = {
      title: meal.detailedRecipe?.title || meal.mealName || meal.title || 'Generated Meal Image',
      description: meal.detailedRecipe?.description || meal.descriptionSummary || '',
      ingredients: meal.detailedRecipe?.ingredients || 
        (meal.mainIngredients || []).map(ingredient => 
          typeof ingredient === 'string' ? { name: ingredient } : ingredient
        )
    };

    // Generate stable image signature using SHA-256
    const canonicalPayload = JSON.stringify({
      title: recipeDetailsPayload.title,
      ingredients: recipeDetailsPayload.ingredients
        .map(ing => ing.name)
        .sort()
        .join(',')
    });
    
    const encoder = new TextEncoder();
    const data = encoder.encode(canonicalPayload);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const imageSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Ensure robust recipe_id
    const recipeId = meal.detailedRecipe?.id || meal.recipeId || crypto.randomUUID();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No session found');
    }

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/image-generator`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipe_id: recipeId,
        type: 'recipe',
        recipe_details: recipeDetailsPayload,
        image_signature: imageSignature,
        user_id: (await supabase.auth.getUser()).data.user?.id
      })
    });

    if (!response.ok) {
      console.error('MEAL_PLAN_STORE Image generation failed:', response.status);
      updateMealImageUrlInPlan(dayIndex, mealType, '', new Date().toISOString(), true);
      return;
    }

    const imageData = await response.json();
    
    console.log('MEAL_PLAN_STORE Image generated successfully', {
      dayIndex,
      mealType,
      imageUrl: imageData.image_url
    });

    // Update meal with image URL
    updateMealImageUrlInPlan(dayIndex, mealType, imageData.image_url, new Date().toISOString(), false);

  } catch (error) {
    console.error('MEAL_PLAN_STORE Error generating image for meal:', error);
    updateMealImageUrlInPlan(dayIndex, mealType, '', new Date().toISOString(), true);
  }
};

/**
 * Generate detailed recipe for a specific meal
 */
export const generateDetailedRecipeForMeal = async (
  dayIndex: number, 
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
) => {
  console.log('🔄 STARTING generateDetailedRecipeForMeal', {
    dayIndex,
    mealType,
    timestamp: new Date().toISOString()
  });

  let currentPlan = useMealPlanStore.getState().currentPlan;
  
  if (!currentPlan || !currentPlan.days[dayIndex]) {
    console.error('MEAL_PLAN_STORE No plan or day found for detailed recipe generation');
    console.error('❌ generateDetailedRecipeForMeal FAILED: No plan or day found', {
      dayIndex,
      mealType,
      hasPlan: !!currentPlan,
      daysCount: currentPlan?.days?.length || 0
    });
    return;
  }

  const meal = currentPlan.days[dayIndex].meals[mealType];
  if (!meal) {
    console.error('MEAL_PLAN_STORE No meal found for detailed recipe generation');
    console.error('❌ generateDetailedRecipeForMeal FAILED: No meal found', {
      dayIndex,
      mealType,
      availableMeals: Object.keys(currentPlan.days[dayIndex].meals || {})
    });
    return;
  }

  try {
    // Get user data
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const userProfile = useUserStore.getState().profile;
    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Set meal status to loading
    currentPlan = useMealPlanStore.getState().currentPlan;
    if (!currentPlan) return;
    
    const updatedPlan = {
      ...currentPlan,
      days: currentPlan.days.map((day, index) => 
        index === dayIndex 
          ? {
              ...day,
              meals: {
                ...day.meals,
                [mealType]: {
                  ...meal,
                  status: 'loading' as const
                }
              }
            }
          : day
      )
    };
    useMealPlanStore.getState().setCurrentPlan(updatedPlan);

    console.log('MEAL_PLAN_STORE Starting detailed recipe generation', {
      dayIndex,
      mealType,
      mealTitle: meal.title
    });
    
    console.log('📡 CALLING Edge Function: recipe-detail-generator', {
      userId: user.id,
      mealTitle: meal.mealName || meal.title || 'Repas sans nom',
      targetCalories: meal.calories_est,
      ingredientsCount: meal.ingredients?.length || 0
    });

    // Get session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No session found');
    }

    // Call recipe-detail-generator Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recipe-detail-generator`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        meal_title: meal.mealName || meal.title || 'Repas sans nom',
        main_ingredients: meal.ingredients || [],
        user_preferences: {
          identity: userProfile,
          nutrition: userProfile.nutrition || {},
          kitchen_equipment: userProfile.kitchen_equipment || {},
          food_preferences: userProfile.food_preferences || {},
          sensory_preferences: userProfile.sensory_preferences || {}
        },
        meal_type: mealType,
        target_calories: meal.calories_est
      })
    });

    if (!response.ok) {
      throw new Error(`Recipe generation failed: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('✅ Edge Function response received', {
      dayIndex,
      mealType,
      cached: responseData.cached,
      modelUsed: responseData.model_used,
      hasRecipe: !!responseData.recipe
    });
    
    const detailedRecipe: DetailedRecipe = responseData.recipe;
    
    console.log('MEAL_PLAN_STORE Detailed recipe generated successfully', {
      dayIndex,
      mealType,
      cached: responseData.cached,
      modelUsed: responseData.model_used
    });

    // Update meal with detailed recipe
    currentPlan = useMealPlanStore.getState().currentPlan;
    if (!currentPlan) return;
    
    const finalUpdatedPlan = {
      ...currentPlan,
      days: currentPlan.days.map((day, index) => 
        index === dayIndex 
          ? {
              ...day,
              meals: {
                ...day.meals,
                [mealType]: {
                  ...meal,
                  status: 'ready' as const,
                  isDetailedRecipeGenerated: true,
                  detailedRecipe,
                  imageUrl: detailedRecipe.imageUrl || meal.imageUrl,
                  imageGenerationError: detailedRecipe.imageGenerationError || meal.imageGenerationError || false,
                  imageSignature: detailedRecipe.imageSignature || meal.imageSignature,
                  updatedAt: new Date().toISOString()
                }
              }
            }
          : day
      )
    };
    useMealPlanStore.getState().setCurrentPlan(finalUpdatedPlan);

    // Trigger image generation in background
    if (detailedRecipe && detailedRecipe.id && !detailedRecipe.imageUrl) {
      const updatedMeal = finalUpdatedPlan.days[dayIndex].meals[mealType];
      _triggerImageGenerationForMeal(dayIndex, mealType, updatedMeal);
    }

  } catch (error) {
    console.error('MEAL_PLAN_STORE Error generating detailed recipe:', error);
    console.error('❌ generateDetailedRecipeForMeal FAILED with error', {
      dayIndex,
      mealType,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Set meal status to error on failure
    currentPlan = useMealPlanStore.getState().currentPlan;
    if (!currentPlan) return;
    
    const errorUpdatedPlan = {
      ...currentPlan,
      days: currentPlan.days.map((day, index) => 
        index === dayIndex 
          ? {
              ...day,
              meals: {
                ...day.meals,
                [mealType]: {
                  ...meal,
                  status: 'error' as const,
                  errorMessage: error instanceof Error ? error.message : 'Erreur lors de la génération de la recette'
                }
              }
            }
          : day
      )
    };
    useMealPlanStore.getState().setCurrentPlan(errorUpdatedPlan);
  }
};

/**
 * Generate all detailed recipes for a specific day
 */
export const generateAllDetailedRecipesForDay = async (dayIndex: number) => {
  console.log('🚀 STARTING generateAllDetailedRecipesForDay', {
    dayIndex,
    timestamp: new Date().toISOString()
  });

  const { currentPlan, setIsGeneratingDetailedRecipes } = useMealPlanStore.getState();
  
  if (!currentPlan || !currentPlan.days[dayIndex]) {
    console.error('MEAL_PLAN_STORE No plan or day found for bulk recipe generation');
    console.error('❌ generateAllDetailedRecipesForDay FAILED: No plan or day found', {
      dayIndex,
      hasPlan: !!currentPlan,
      daysCount: currentPlan?.days?.length || 0
    });
    return;
  }

  // Set the generation flag to true at the start
  setIsGeneratingDetailedRecipes(true);

  const day = currentPlan.days[dayIndex];
  const mealTypes: ('breakfast' | 'lunch' | 'dinner' | 'snack')[] = ['breakfast', 'lunch', 'dinner', 'snack'];
  
  console.log('MEAL_PLAN_STORE Starting bulk recipe generation for day', {
    dayIndex,
    dayName: day.dayName,
    date: day.date
  });
  
  // Collect all meals that need generation
  const mealsToGenerate = mealTypes.filter(mealType => {
    const meal = day.meals[mealType];
    return meal && !meal.isDetailedRecipeGenerated && meal.status !== 'loading';
  });

  console.log('📋 Meals to generate:', {
    dayIndex,
    mealsToGenerate,
    totalMealsCount: mealTypes.length,
    mealsNeedingGeneration: mealsToGenerate.length
  });

  // Generate all recipes concurrently
  console.log('⚡ Starting concurrent recipe generation with Promise.all');
  const generationPromises = mealsToGenerate.map(mealType => 
    generateDetailedRecipeForMeal(dayIndex, mealType).catch(error => {
      console.error(`MEAL_PLAN_STORE Error generating recipe for ${mealType}:`, error);
      console.error(`❌ Individual recipe generation failed for ${mealType}`, {
        dayIndex,
        mealType,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      // Return null or some error indicator, but don't let one failure stop others
      return null;
    })
  );

  // Wait for all generations to complete
  try {
    await Promise.all(generationPromises);
    console.log('✅ All recipe generations completed successfully', {
      dayIndex,
      dayName: day.dayName,
      generatedCount: mealsToGenerate.length
    });
  } catch (error) {
    console.error('❌ Promise.all failed in generateAllDetailedRecipesForDay', {
      dayIndex,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    // Always reset the generation flag when done
    setIsGeneratingDetailedRecipes(false);
  }
  
  console.log('MEAL_PLAN_STORE Bulk recipe generation completed for day', {
    dayIndex,
    dayName: day.dayName,
    generatedCount: mealsToGenerate.length
  });
};

/**
 * Cancel meal plan generation
 */
export const cancelMealPlanGeneration = () => {
  const { setIsGenerating, setCurrentPlan } = useMealPlanStore.getState();
  
  console.log('MEAL_PLAN_STORE Cancelling meal plan generation');
  
  // Stop generation process
  setIsGenerating(false);
  
  // Reset current plan
  setCurrentPlan(null);
};