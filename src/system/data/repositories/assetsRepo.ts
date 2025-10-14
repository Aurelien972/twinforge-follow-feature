/**
 * Assets Repository - Supabase Storage Integration
 * Handles 3D model and asset loading from Supabase Storage
 */

import logger from '../../../lib/utils/logger';

// Direct model URLs - no Supabase Storage lookup needed
const MODEL_URLS = {
  male: 'https://kwipydbtjagypocpvbwn.supabase.co/storage/v1/object/public/3d-models/M_character_uniq.glb',
  female: 'https://kwipydbtjagypocpvbwn.supabase.co/storage/v1/object/public/3d-models/F_character_uniq_4.13.glb',
};

/**
 * Get model URL for gender - ALWAYS returns valid public URL (no 404s)
 */
export function getModelUrlForGender(gender: 'male' | 'female'): string {
  const url = MODEL_URLS[gender] || MODEL_URLS.male;
  const modelFileName = url.split('/').pop();

  logger.info('ASSETS_REPO', '📦 GETTING MODEL URL FOR GENDER', {
    inputGender: gender,
    inputGenderType: typeof gender,
    resolvedUrl: url,
    modelFileName,
    isMale: gender === 'male',
    isFemale: gender === 'female',
    usedFallback: !MODEL_URLS[gender],
    availableGenders: Object.keys(MODEL_URLS),
    timestamp: new Date().toISOString(),
    philosophy: 'gender_to_url_mapping_diagnostic'
  });

  return url;
}

/**
 * Get fallback model URL - same as getModelUrlForGender (no custom models)
 */
function getFallbackModelUrl(gender: 'male' | 'female'): string {
  const url = getModelUrlForGender(gender);
  
  logger.debug('ASSETS_REPO', 'Using fallback model URL', {
    gender,
    fallbackUrl: url,
    reason: 'no_custom_models_implemented',
    timestamp: new Date().toISOString()
  });
  
  return url;
}