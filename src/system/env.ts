/**
 * Environment variables configuration
 * Client-side environment variables only
 */

import logger from '../lib/utils/logger';

export const env = {
  supabaseUrl: (() => {
    const url = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
    // Ensure HTTPS protocol for Supabase domains to prevent mixed content errors
    if (url && (url.includes('supabase.co') || url.includes('supabase.in'))) {
      return url.replace(/^http:\/\//, 'https://');
    }
    return url;
  })(),
  supabaseAnon: import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '',
};

// Validate environment variables with graceful fallbacks
export const isSupabaseConfigured = () => {
  const hasUrl = env.supabaseUrl && env.supabaseUrl.length > 0;
  const hasKey = env.supabaseAnon && env.supabaseAnon.length > 0;
  const isValidUrl = hasUrl && (env.supabaseUrl.includes('supabase.co') || env.supabaseUrl.includes('supabase.in'));

  return hasUrl && hasKey && isValidUrl;
};

// Log environment configuration
export const logEnvConfig = () => {
  const hasUrl = env.supabaseUrl && env.supabaseUrl.length > 0;
  const hasKey = env.supabaseAnon && env.supabaseAnon.length > 0;
  const isValidUrl = hasUrl && (env.supabaseUrl.includes('supabase.co') || env.supabaseUrl.includes('supabase.in'));

  logger.debug('Supabase configuration check', { hasUrl, hasKey, isValidUrl });

  // Log environment info for production debugging
  if (import.meta.env.PROD) {
    if (isSupabaseConfigured()) {
      logger.info('Supabase Production: Client configured successfully');
    } else {
      logger.error('Supabase Production: Configuration missing!', { hasUrl: !!env.supabaseUrl, hasKey: !!env.supabaseAnon });
    }
  }
};