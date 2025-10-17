import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Session, User } from '@supabase/supabase-js';
import type { UserProfile } from '../../domain/profile';
import type {
  HouseholdDetails,
  MealPrepPreferences,
  KitchenEquipment,
  FoodPreferences,
  SensoryPreferences,
  MacroTargets,
  ShoppingPreferences
} from '../../domain/recipe';
import type { HealthProfile, CountryHealthData } from '../../domain/health';
import logger from '../../lib/utils/logger';
import { safeStorageOperation, monitorStorageUsage, logStorageUsage } from '../../lib/utils/storageManager';

type Role = 'user' | 'coach' | 'admin';

type SessionInfo = {
  userId: string;
  role: Role;
  email?: string;
  displayName?: string;
};

/**
 * Utility function to convert empty strings to null
 */
function emptyStringToNull(value: any): any {
  if (typeof value === 'string' && value.trim() === '') {
    return null;
  }
  return value;
}

/**
 * Clean profile data by converting empty strings to null
 */
function cleanProfileForStorage(profile: Profile | null): Profile | null {
  if (!profile) return null;
  
  return {
    ...profile,
    displayName: emptyStringToNull(profile.displayName),
    phoneNumber: emptyStringToNull(profile.phoneNumber),
    sex: emptyStringToNull(profile.sex),
    activity_level: emptyStringToNull(profile.activity_level),
    job_category: emptyStringToNull(profile.job_category),
    objective: emptyStringToNull(profile.objective),
    birthdate: emptyStringToNull(profile.birthdate),
    portraitUrl: emptyStringToNull(profile.portraitUrl),
    avatarUrl: emptyStringToNull(profile.avatarUrl),
    portraitSource: emptyStringToNull(profile.portraitSource),
    avatarStatus: emptyStringToNull(profile.avatarStatus),
  };
}

// Stable storage key to prevent conflicts
const STORAGE_KEY = 'fastlift:userstore:main';

type Profile = UserProfile & {
  id: string;
  displayName?: string;
  phoneNumber?: string;
  country?: string;
  avatarStatus?: 'none' | 'pending' | 'ready' | 'error';
  avatarUrl?: string;
  avatarOnboardingCompleted?: boolean;
  portraitUrl?: string;
  portraitSource?: string;
  // Enhanced nutrition preferences for Recipe Workshop
  householdDetails?: HouseholdDetails;
  mealPrepPreferences?: MealPrepPreferences;
  kitchenEquipment?: KitchenEquipment;
  foodPreferences?: FoodPreferences;
  sensoryPreferences?: SensoryPreferences;
  macroTargets?: MacroTargets;
  shoppingPreferences?: ShoppingPreferences;
  // Legacy fields for backward compatibility
  preferences?: any;
  // Enhanced nutrition data structure
  nutrition?: {
    diet?: string;
    budgetLevel?: 'low' | 'medium' | 'high';
    allergies?: string[];
    intolerances?: string[];
    proteinTarget_g?: number;
    // Legacy field - will be migrated to foodPreferences
    disliked?: string[];
  };
  // Fasting data structure (will be moved to separate tab)
  fastingWindow?: {
    start?: string;
    end?: string;
    windowHours?: number;
    mealsPerDay?: number;
    protocol?: string;
  };
  // Health data structure - supports both V1 (basic) and V2 (enriched)
  health?: HealthProfile;
  // Country health data cache
  country_health_cache?: CountryHealthData;
  health_enriched_at?: string;
  health_schema_version?: '1.0' | '2.0';
};

type UserState = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  saving: boolean;
  initialized: boolean;
  sessionReady: boolean;
  
  // Consolidated auth state
  sessionInfo: SessionInfo | null;
  authReady: boolean;
  
  // Actions
  setSession: (session: Session | null) => void;
  setSessionReady: (ready: boolean) => void;
  setSessionInfo: (s: SessionInfo | null) => void;
  setAuthReady: (ready: boolean) => void;
  fetchProfile: () => Promise<void>;
  setProfile: (updates: Partial<Profile>) => void;
  saveProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
};

// Create a storage wrapper with quota handling
const createSafeStorage = () => {
  return {
    getItem: (name: string) => {
      try {
        const value = localStorage.getItem(name);
        if (value) {
          // Monitor storage on read
          monitorStorageUsage();
        }
        return value;
      } catch (error) {
        logger.error('STORAGE', 'Failed to read from localStorage', {
          key: name,
          error: error instanceof Error ? error.message : String(error),
        });
        return null;
      }
    },
    setItem: (name: string, value: string) => {
      return safeStorageOperation(
        () => {
          localStorage.setItem(name, value);
          logger.debug('STORAGE', 'Successfully wrote to localStorage', {
            key: name,
            sizeMB: (new Blob([value]).size / (1024 * 1024)).toFixed(2),
          });
        },
        'USERSTORE_PERSIST'
      );
    },
    removeItem: (name: string) => {
      try {
        localStorage.removeItem(name);
      } catch (error) {
        logger.error('STORAGE', 'Failed to remove from localStorage', {
          key: name,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  };
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      profile: null,
      loading: false,
      saving: false,
      initialized: false,
      sessionReady: false,
      sessionInfo: null,
      authReady: false,

      setSession: (session) => {
        set({ 
          session, 
          user: session?.user || null,
          initialized: true,
          authReady: !!session?.user, // Set authReady based on actual session
          sessionInfo: session?.user ? {
            userId: session.user.id,
            role: 'user',
            email: session.user.email || undefined,
            displayName: session.user.user_metadata?.display_name || session.user.email?.split('@')[0] || undefined,
          } : null,
        });
        
        // Log authentication state change
        logger.debug('USER_STORE', 'Session updated', { hasSession: !!session, hasUser: !!session?.user, authReady: !!session?.user });
        
        // Fetch profile immediately after session is set
        if (session?.user) {
          setTimeout(() => {
            get().fetchProfile();
          }, 100);
        }
      },

      setSessionReady: (sessionReady) => {
        set({ sessionReady });
      },

      setSessionInfo: (sessionInfo) => {
        set({ sessionInfo });
      },

      setAuthReady: (authReady) => {
        set({ authReady });
      },

      setProfile: (updates) => {
        // Handle null updates (e.g., during sign-out)
        if (updates === null) {
          set({ profile: null });
          return;
        }
        
        set(state => ({
          profile: { 
            ...state.profile, 
            ...updates,
            // Ensure nested objects are properly merged
            preferences: updates.preferences ? {
              ...state.profile?.preferences,
              ...updates.preferences
            } : state.profile?.preferences,
            // Ensure enhanced nutrition fields are properly merged
            nutrition: updates.nutrition ? {
              ...state.profile?.nutrition,
              ...updates.nutrition
            } : state.profile?.nutrition,
            householdDetails: updates.householdDetails ? {
              ...state.profile?.householdDetails,
              ...updates.householdDetails
            } : state.profile?.householdDetails,
            mealPrepPreferences: updates.mealPrepPreferences ? {
              ...state.profile?.mealPrepPreferences,
              ...updates.mealPrepPreferences
            } : state.profile?.mealPrepPreferences,
            kitchenEquipment: updates.kitchenEquipment ? {
              ...state.profile?.kitchenEquipment,
              ...updates.kitchenEquipment
            } : state.profile?.kitchenEquipment,
            foodPreferences: updates.foodPreferences ? {
              ...state.profile?.foodPreferences,
              ...updates.foodPreferences
            } : state.profile?.foodPreferences,
            sensoryPreferences: updates.sensoryPreferences ? {
              ...state.profile?.sensoryPreferences,
              ...updates.sensoryPreferences
            } : state.profile?.sensoryPreferences,
            macroTargets: updates.macroTargets ? {
              ...state.profile?.macroTargets,
              ...updates.macroTargets
            } : state.profile?.macroTargets,
            shoppingPreferences: updates.shoppingPreferences ? {
              ...state.profile?.shoppingPreferences,
              ...updates.shoppingPreferences
            } : state.profile?.shoppingPreferences,
            fastingWindow: updates.fastingWindow ? {
              ...state.profile?.fastingWindow,
              ...updates.fastingWindow
            } : state.profile?.fastingWindow
          }
        }));
      },

      fetchProfile: async () => {
        const { session } = get();
        logger.debug('USER_STORE', 'fetchProfile called', { hasSession: !!session, userId: session?.user?.id });
        
        if (!session?.user?.id) return;
        
        set({ loading: true });
        
        try {
          const { supabase } = await import('../supabase/client');
          
          logger.info('USER_STORE_FETCH_PROFILE', 'Starting profile fetch from database', {
            userId: session.user.id,
            timestamp: new Date().toISOString(),
            philosophy: 'profile_fetch_audit'
          });
          
          const { data, error } = await supabase
            .from('user_profile')
            .select('*')
            .eq('user_id', session.user.id)
            .limit(1);
          
          // DEBUG: Log raw database response
          logger.info('USER_STORE_FETCH_PROFILE', 'Raw DB response received', { 
            hasData: !!data, 
            dataLength: data?.length || 0,
            hasError: !!error,
            errorMessage: error?.message,
            rawProfileData: data && data.length > 0 ? {
              user_id: data[0].user_id,
              display_name: data[0].display_name,
              sex: data[0].sex,
              height_cm: data[0].height_cm,
              weight_kg: data[0].weight_kg,
              target_weight_kg: data[0].target_weight_kg,
              activity_level: data[0].activity_level,
              objective: data[0].objective,
              birthdate: data[0].birthdate,
              hasPreferences: !!data[0].preferences,
              preferencesKeys: data[0].preferences ? Object.keys(data[0].preferences) : []
            } : null,
            philosophy: 'raw_db_response_audit'
          });
          
          // CRITICAL AUDIT: Log raw DB response for skin_tone debugging
          if (data && data.length > 0 && data[0].preferences?.skin_tone) {
            logger.info('USER_STORE_CRITICAL_AUDIT', 'AUDIT: Raw DB response contains skin_tone', {
              rawDbSkinTone: data[0].preferences.skin_tone,
              rawDbSkinToneType: typeof data[0].preferences.skin_tone,
              rawDbSkinToneKeys: data[0].preferences.skin_tone ? Object.keys(data[0].preferences.skin_tone) : [],
              rawDbSkinToneStringified: data[0].preferences.skin_tone ? JSON.stringify(data[0].preferences.skin_tone) : null,
              hasAllV2PropertiesInRawDb: !!(data[0].preferences.skin_tone?.rgb && data[0].preferences.skin_tone?.hex && data[0].preferences.skin_tone?.srgb_f32 && data[0].preferences.skin_tone?.linear_f32 && data[0].preferences.skin_tone?.schema),
              v2PropertiesIntegrityInRawDb: data[0].preferences.skin_tone ? {
                rgb: data[0].preferences.skin_tone.rgb,
                hex: data[0].preferences.skin_tone.hex,
                srgb_f32: data[0].preferences.skin_tone.srgb_f32,
                linear_f32: data[0].preferences.skin_tone.linear_f32,
                schema: data[0].preferences.skin_tone.schema,
                source: data[0].preferences.skin_tone.source,
                confidence: data[0].preferences.skin_tone.confidence
              } : null,
              philosophy: 'raw_db_response_skin_tone_audit'
            });
          }
          
          // Check if profile exists
          const fetchData = data && data.length > 0 ? data[0] : null;
          
          if (error || !fetchData) {
            logger.info('USER_STORE_FETCH_PROFILE', 'No existing profile found, creating new profile', {
              userId: session.user.id,
              hasError: !!error,
              errorMessage: error?.message,
              philosophy: 'new_profile_creation'
            });
            
            // Create new profile for new users
            const newProfile = {
              user_id: session.user.id,
              display_name: session.user.user_metadata?.display_name || session.user.email?.split('@')[0] || null,
              sex: null,
              height_cm: null,
              weight_kg: null,
              target_weight_kg: null,
              activity_level: null,
              objective: null,
              avatar_status: 'none' as const,
              preferences: {
                onboardingCompleted: false,
                onboardingSkipped: false,
                profileCompletion: 0.1,
                authProvider: 'email',
              },
              nutrition: { allergies: [], intolerances: [] },
              health: {},
              emotions: {},
            };
            
            try {
              const { data: createdProfile, error: createError } = await supabase
                .from('user_profile')
                .upsert(newProfile, { 
                  onConflict: 'user_id',
                  ignoreDuplicates: false
                })
                .select()
                .single();
                
              if (!createError) {
                const mappedProfile = await mapDbProfileToProfile(createdProfile);
                logger.info('USER_STORE_FETCH_PROFILE', 'New profile created and mapped successfully', {
                  userId: session.user.id,
                  mappedProfileKeys: Object.keys(mappedProfile),
                  hasRequiredFields: !!(mappedProfile.sex && mappedProfile.height_cm && mappedProfile.weight_kg),
                  philosophy: 'new_profile_creation_success'
                });
                set({ profile: mappedProfile });
              } else {
                logger.error('USER_STORE_FETCH_PROFILE', 'Failed to create new profile in DB', {
                  userId: session.user.id,
                  createError: createError.message,
                  philosophy: 'new_profile_creation_db_error'
                });
                set({ 
                  profile: {
                    userId: session.user.id,
                    id: session.user.id,
                    displayName: session.user.user_metadata?.display_name || session.user.email?.split('@')[0],
                    sex: null,
                    height_cm: null,
                    weight_kg: null,
                    preferences: {
                      onboardingCompleted: false,
                      onboardingSkipped: false,
                      profileCompletion: 0.1,
                    },
                    nutrition: { allergies: [], intolerances: [] },
                    health: {},
                    emotions: {},
                  } as any
                });
              }
            } catch (createError) {
              logger.error('USER_STORE_FETCH_PROFILE', 'Exception during new profile creation', {
                userId: session.user.id,
                createError: createError instanceof Error ? createError.message : 'Unknown error',
                philosophy: 'new_profile_creation_exception'
              });
              set({ 
                profile: {
                  userId: session.user.id,
                  id: session.user.id,
                  displayName: session.user.user_metadata?.display_name || session.user.email?.split('@')[0],
                  sex: null,
                  height_cm: null,
                  weight_kg: null,
                  preferences: {
                    onboardingCompleted: false,
                    onboardingSkipped: false,
                    profileCompletion: 0.1,
                  },
                  nutrition: { allergies: [], intolerances: [] },
                  health: {},
                  emotions: {},
                } as any
              });
            }
          } else {
            const mappedProfile = await mapDbProfileToProfile(fetchData);
            
            logger.info('USER_STORE_FETCH_PROFILE', 'Existing profile fetched and mapped', {
              userId: session.user.id,
              mappedProfileKeys: Object.keys(mappedProfile),
              profileIdentityData: {
                displayName: mappedProfile.displayName,
                sex: mappedProfile.sex,
                height_cm: mappedProfile.height_cm,
                weight_kg: mappedProfile.weight_kg,
                target_weight_kg: mappedProfile.target_weight_kg,
                activity_level: mappedProfile.activity_level,
                objective: mappedProfile.objective,
                birthdate: mappedProfile.birthdate
              },
              hasRequiredFields: !!(mappedProfile.sex && mappedProfile.height_cm && mappedProfile.weight_kg),
              isProfileCompleteForScan: !!(mappedProfile.sex && mappedProfile.height_cm && mappedProfile.weight_kg),
              philosophy: 'existing_profile_fetch_success'
            });
            
            // CRITICAL AUDIT: Log skin_tone after mapping from DB
            if (mappedProfile.preferences?.skin_tone) {
              logger.info('USER_STORE_CRITICAL_AUDIT', 'AUDIT: skin_tone after mapping from DB', {
                mappedSkinTone: mappedProfile.preferences.skin_tone,
                mappedSkinToneType: typeof mappedProfile.preferences.skin_tone,
                mappedSkinToneKeys: mappedProfile.preferences.skin_tone ? Object.keys(mappedProfile.preferences.skin_tone) : [],
                mappedSkinToneStringified: mappedProfile.preferences.skin_tone ? JSON.stringify(mappedProfile.preferences.skin_tone) : null,
                hasAllV2PropertiesAfterMapping: !!(mappedProfile.preferences.skin_tone?.rgb && mappedProfile.preferences.skin_tone?.hex && mappedProfile.preferences.skin_tone?.srgb_f32 && mappedProfile.preferences.skin_tone?.linear_f32 && mappedProfile.preferences.skin_tone?.schema),
                v2PropertiesIntegrityAfterMapping: mappedProfile.preferences.skin_tone ? {
                  rgb: mappedProfile.preferences.skin_tone.rgb,
                  hex: mappedProfile.preferences.skin_tone.hex,
                  srgb_f32: mappedProfile.preferences.skin_tone.srgb_f32,
                  linear_f32: mappedProfile.preferences.skin_tone.linear_f32,
                  schema: mappedProfile.preferences.skin_tone.schema,
                  source: mappedProfile.preferences.skin_tone.source,
                  confidence: mappedProfile.preferences.skin_tone.confidence
                } : null,
                philosophy: 'mapped_skin_tone_after_db_fetch_audit'
              });
            }
            
            // DETAILED SKIN TONE AUDIT - AFTER MAPPING
            if (mappedProfile.preferences?.skin_tone) {
              logger.info('USER_STORE', 'DETAILED SKIN TONE AUDIT - After mapping from DB', {
                userId: session.user.id,
                mappedSkinTone: mappedProfile.preferences.skin_tone,
                skinToneType: typeof mappedProfile.preferences.skin_tone,
                skinToneConstructor: mappedProfile.preferences.skin_tone.constructor?.name,
                skinToneKeys: Object.keys(mappedProfile.preferences.skin_tone),
                skinToneStringified: JSON.stringify(mappedProfile.preferences.skin_tone),
                hasRgbAfterMapping: !!mappedProfile.preferences.skin_tone.rgb,
                hasLinearF32AfterMapping: !!mappedProfile.preferences.skin_tone.linear_f32,
                hasSrgbF32AfterMapping: !!mappedProfile.preferences.skin_tone.srgb_f32,
                hasHexAfterMapping: !!mappedProfile.preferences.skin_tone.hex,
                hasSchemaAfterMapping: !!mappedProfile.preferences.skin_tone.schema,
                rgbValueAfterMapping: mappedProfile.preferences.skin_tone.rgb,
                linearF32ValueAfterMapping: mappedProfile.preferences.skin_tone.linear_f32,
                srgbF32ValueAfterMapping: mappedProfile.preferences.skin_tone.srgb_f32,
                hexValueAfterMapping: mappedProfile.preferences.skin_tone.hex,
                schemaValueAfterMapping: mappedProfile.preferences.skin_tone.schema,
                philosophy: 'mapped_skin_tone_structure_audit_after_db_fetch'
              });
            }
            set({ profile: mappedProfile });
          }
          
        } catch (error) {
          logger.error('USER_STORE_FETCH_PROFILE', 'Exception during profile fetch', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            userId: session?.user?.id,
            philosophy: 'profile_fetch_exception'
          });
        } finally {
          set({ loading: false });
        }
      },

      saveProfile: async () => {
        const { session, profile } = get();
        if (!session?.user?.id || !profile) return;
        
        logger.info('USER_STORE_UPDATE_PROFILE', 'Starting profile update', {
          userId: session.user.id,
          updateKeys: Object.keys(profile),
          updateValues: profile,
          currentProfileKeys: Object.keys(profile),
          philosophy: 'profile_update_start'
        });
        
        set({ saving: true });
        try {
          const { supabase } = await import('../supabase/client');
          const dbProfile = mapProfileToDb(profile, session.user.id);
          
          const { data, error } = await supabase
            .from('user_profile')
            .upsert(dbProfile)
            .select()
            .single();
            
          if (error) throw error;
          set({ profile: await mapDbProfileToProfile(data) });
        } catch (error) {
          throw error;
        } finally {
          set({ saving: false });
        }
      },

      updateProfile: async (updates) => {
        const { session } = get();
        if (!session?.user?.id) return;
        
        logger.debug('USER_STORE_UPDATE_PROFILE', 'Starting profile update with data', {
          updates,
          userId: session.user.id,
          philosophy: 'profile_update_debug'
        });

        // Optimistic update - update local state immediately
        const currentProfile = get().profile;
        if (currentProfile) {
          set({ 
            profile: { 
              ...currentProfile, 
              ...updates,
              // Ensure nested objects are properly merged
              preferences: updates.preferences ? {
                ...currentProfile.preferences,
                ...updates.preferences
              } : currentProfile.preferences
            }
          });
        }
        
        try {
          const { supabase } = await import('../supabase/client');
          const dbUpdates = mapProfileUpdatesToDb(updates, currentProfile);

          logger.debug('USER_STORE_UPDATE_PROFILE', 'Mapped updates for database', {
            dbUpdates,
            userId: session.user.id,
            philosophy: 'db_updates_mapping_debug'
          });

          // Ensure user_id is included for upsert operation
          dbUpdates.user_id = session.user.id;
          
          const { data, error } = await supabase
            .from('user_profile')
            .upsert(dbUpdates, { onConflict: 'user_id' })
            .select()
            .single();
            
          if (error) throw error;
          
          logger.debug('USER_STORE_UPDATE_PROFILE', 'Profile update successful', {
            userId: session.user.id,
            philosophy: 'profile_update_success'
          });


          // Update with confirmed data from database
          set({ profile: await mapDbProfileToProfile(data) });
        } catch (error) {
          logger.error('USER_STORE_UPDATE_PROFILE', 'Profile update failed', {
            error: error instanceof Error ? error.message : 'Unknown error',
            userId: session.user.id,
            philosophy: 'profile_update_error'
          });
          // Rollback optimistic update on error
          if (currentProfile) {
            set({ profile: currentProfile });
          }
          throw error;
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(createSafeStorage),
      partialize: (state) => ({
        session: state.session,
        profile: state.profile ? {
          // Only persist essential profile data to reduce storage usage
          userId: state.profile.userId,
          id: state.profile.id,
          displayName: state.profile.displayName,
          sex: state.profile.sex,
          height_cm: state.profile.height_cm,
          weight_kg: state.profile.weight_kg,
          birthdate: state.profile.birthdate,
          country: state.profile.country,
          avatarStatus: state.profile.avatarStatus,
          avatarUrl: state.profile.avatarUrl,
          health: state.profile.health,
          // Exclude large objects that can be re-fetched
          // preferences, nutrition, etc will be loaded from DB
        } : null,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        // Clean profile data from storage to convert empty strings to null
        profile: cleanProfileForStorage((persistedState as any)?.profile),
        loading: currentState.loading,
        saving: currentState.saving,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            logger.error('USERSTORE_REHYDRATE', 'Failed to rehydrate store', {
              error: error.message,
            });
            // Log storage usage on rehydration error
            logStorageUsage('USERSTORE_REHYDRATE_ERROR');
          } else {
            logger.info('USERSTORE_REHYDRATE', 'Store rehydrated successfully');
            // Log storage usage on successful rehydration
            logStorageUsage('USERSTORE_REHYDRATE_SUCCESS');
          }
        };
      },
    }
  )
);

// Helper function to map camelCase profile updates to snake_case database columns
function mapProfileUpdatesToDb(updates: Partial<Profile>, currentProfile: Profile | null): any {
  const DB_COLUMNS = new Set([
    'user_id', 'display_name', 'birthdate', 'sex', 'height_cm', 'weight_kg',
    'target_weight_kg', 'body_fat_perc', 'activity_level', 'job_category', 'phone_number',
    'country',
    'objective', 'avatar_status', 'avatar_url', 'created_at', 'updated_at',
    'goals', 'constraints', 'preferences', 'emotion_baseline', 'role',
    'emotions', 'nutrition', 'health', 'avatar_onboarding_completed',
    'portrait_url', 'portrait_source',
    // Health V2 system columns
    'health_schema_version', 'country_health_cache', 'health_enriched_at',
    'full_name', 'email', 'language',
    // Enhanced nutrition preferences for Recipe Workshop
    'household_details', 'meal_prep_preferences', 'kitchen_equipment',
    'food_preferences', 'sensory_preferences', 'macro_targets', 'shopping_preferences'
  ]);

  // Text fields that should be null instead of empty strings
  const TEXT_FIELDS = new Set([
    'display_name', 'phone_number', 'sex', 'objective', 'activity_level', 'job_category', 'birthdate', 'country'
  ]);

  function camelToSnake(key: string): string {
    return key.replace(/[A-Z]/g, m => '_' + m.toLowerCase());
  }

  const dbUpdates: any = {};

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) continue;

    const snakeKey = camelToSnake(key);
    if (DB_COLUMNS.has(snakeKey)) {
      // Convert empty strings to null for text fields
      if (TEXT_FIELDS.has(snakeKey) && value === '') {
        dbUpdates[snakeKey] = null;
      } else {
        dbUpdates[snakeKey] = value;
      }
    } else if (key === 'preferences' && typeof value === 'object') {
      // Merge preferences instead of replacing
      dbUpdates.preferences = {
        ...(currentProfile?.preferences || {}),
        ...value
      };
    } else if (key === 'nutrition' && typeof value === 'object') {
      // Handle nutrition object updates
      dbUpdates.nutrition = {
        ...(currentProfile?.nutrition || {}),
        ...value
      };
    } else if (key === 'health' && typeof value === 'object') {
      // Handle health object updates
      dbUpdates.health = {
        ...(currentProfile?.health || {}),
        ...value
      };
    } else if (key === 'fastingWindow' && typeof value === 'object') {
      // Handle fasting window updates - store in nutrition for now
      dbUpdates.nutrition = {
        ...(currentProfile?.nutrition || {}),
        fastingWindow: value
      };
    }
  }

  return dbUpdates;
}

// Helper functions to map between DB and store formats
async function mapDbProfileToProfile(dbProfile: any): Promise<Profile> {
  logger.debug('USER_STORE_MAP_DB_PROFILE', 'Mapping database profile to store format', {
    dbProfileNutrition: dbProfile.nutrition,
    hasNoKnownAllergies: dbProfile.nutrition?.noKnownAllergies,
    userId: dbProfile.user_id,
    philosophy: 'db_profile_mapping_debug'
  });

  const correctedPreferences = dbProfile.preferences || {};
  
  return {
    userId: dbProfile.user_id,
    id: dbProfile.user_id,
    displayName: emptyStringToNull(dbProfile.display_name),
    phoneNumber: emptyStringToNull(dbProfile.phone_number),
    country: emptyStringToNull(dbProfile.country),
    birthdate: emptyStringToNull(dbProfile.birthdate || dbProfile.dob),
    sex: emptyStringToNull(dbProfile.sex),
    height_cm: dbProfile.height_cm,
    weight_kg: dbProfile.weight_kg,
    target_weight_kg: dbProfile.target_weight_kg,
    bodyFatPerc: dbProfile.body_fat_perc,
    activity_level: emptyStringToNull(dbProfile.activity_level),
    job_category: emptyStringToNull(dbProfile.job_category),
    objective: emptyStringToNull(dbProfile.objective),
    // Enhanced nutrition structure
    nutrition: {
      diet: dbProfile.nutrition?.diet || '',
      budgetLevel: dbProfile.nutrition?.budgetLevel || undefined,
      allergies: Array.isArray(dbProfile.nutrition?.allergies) ? dbProfile.nutrition.allergies : [],
      intolerances: Array.isArray(dbProfile.nutrition?.intolerances) ? dbProfile.nutrition.intolerances : [],
      noKnownAllergies: dbProfile.nutrition?.noKnownAllergies ?? false,
      proteinTarget_g: dbProfile.nutrition?.proteinTarget_g || undefined,
      disliked: Array.isArray(dbProfile.nutrition?.disliked) ? dbProfile.nutrition.disliked : [],
    },
    // Fasting window (will be moved to separate tab)
    fastingWindow: dbProfile.nutrition?.fastingWindow || {},
    health: dbProfile.health || {},
    // Enhanced nutrition preferences for Recipe Workshop
    householdDetails: dbProfile.household_details || {},
    mealPrepPreferences: dbProfile.meal_prep_preferences || {},
    kitchenEquipment: dbProfile.kitchen_equipment || {},
    foodPreferences: dbProfile.food_preferences || { cuisines: [], ingredients: [], flavors: [] },
    sensoryPreferences: dbProfile.sensory_preferences || {},
    macroTargets: dbProfile.macro_targets || {},
    shoppingPreferences: dbProfile.shopping_preferences || {},
    // Legacy support
    goals: dbProfile.goals || {},
    constraints: dbProfile.constraints || {},
    preferences: correctedPreferences,
    emotionBaseline: dbProfile.emotion_baseline || {},
    avatarStatus: emptyStringToNull(dbProfile.avatar_status),
    avatarUrl: emptyStringToNull(dbProfile.avatar_url),
    avatarOnboardingCompleted: dbProfile.avatar_onboarding_completed,
    portraitUrl: emptyStringToNull(dbProfile.portrait_url),
    portraitSource: emptyStringToNull(dbProfile.portrait_source),
  };
}

function mapProfileToDb(profile: Profile, userId: string): any {
  return {
    user_id: userId,
    display_name: profile.displayName,
    phone_number: profile.phoneNumber,
    country: profile.country,
    birthdate: profile.birthdate,
    sex: profile.sex,
    height_cm: profile.height_cm,
    weight_kg: profile.weight_kg,
    target_weight_kg: profile.target_weight_kg,
    activity_level: profile.activity_level,
    job_category: profile.job_category,
    objective: profile.objective,
    portrait_url: profile.portraitUrl,
    portrait_source: profile.portraitSource,
    // Enhanced nutrition structure
    nutrition: {
      ...(profile.nutrition || {}),
      fastingWindow: profile.fastingWindow || {}
    },
    health: profile.health || {},
    preferences: profile.preferences || {},
    // Enhanced nutrition preferences for Recipe Workshop
    household_details: profile.householdDetails || {},
    meal_prep_preferences: profile.mealPrepPreferences || {},
    kitchen_equipment: profile.kitchenEquipment || {},
    food_preferences: profile.foodPreferences || { cuisines: [], ingredients: [], flavors: [] },
    sensory_preferences: profile.sensoryPreferences || {},
    macro_targets: profile.macroTargets || {},
    shopping_preferences: profile.shoppingPreferences || {},
    avatar_status: profile.avatarStatus,
    avatar_url: profile.avatarUrl,
    avatar_onboarding_completed: profile.avatarOnboardingCompleted,
  };
}
