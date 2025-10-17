/**
 * useGlassmorphismPreference Hook
 *
 * Manages the glassmorphism effects preference for the application.
 * Provides access to the current preference state and a method to toggle it.
 *
 * When disabled, the application switches to a performance-optimized mode:
 * - Removes backdrop-filter blur effects
 * - Simplifies shadows to basic drop shadows
 * - Disables decorative animations and gradients
 * - Maintains all colors, structure, and functionality
 *
 * Perfect for users with low-end devices or those who prefer better performance.
 */

import { useEffect } from 'react';
import { useUserStore } from '../system/store/userStore';
import logger from '../lib/utils/logger';

export function useGlassmorphismPreference() {
  const profile = useUserStore(state => state.profile);
  const updateProfile = useUserStore(state => state.updateProfile);

  // Default to true if not set (enable glassmorphism by default)
  const glassEffectsEnabled = profile?.glassEffectsEnabled ?? true;

  /**
   * Toggle glassmorphism effects on/off
   */
  const toggleGlassEffects = async () => {
    const newValue = !glassEffectsEnabled;

    logger.info('GLASSMORPHISM_PREFERENCE', 'Toggling glass effects', {
      previousValue: glassEffectsEnabled,
      newValue,
      userId: profile?.id,
    });

    try {
      await updateProfile({
        glassEffectsEnabled: newValue,
      });

      logger.info('GLASSMORPHISM_PREFERENCE', 'Glass effects preference updated successfully', {
        glassEffectsEnabled: newValue,
        userId: profile?.id,
      });
    } catch (error) {
      logger.error('GLASSMORPHISM_PREFERENCE', 'Failed to update glass effects preference', {
        error: error instanceof Error ? error.message : String(error),
        userId: profile?.id,
      });
      throw error;
    }
  };

  /**
   * Set a specific value for glassmorphism effects
   */
  const setGlassEffects = async (enabled: boolean) => {
    logger.info('GLASSMORPHISM_PREFERENCE', 'Setting glass effects', {
      previousValue: glassEffectsEnabled,
      newValue: enabled,
      userId: profile?.id,
    });

    try {
      await updateProfile({
        glassEffectsEnabled: enabled,
      });

      logger.info('GLASSMORPHISM_PREFERENCE', 'Glass effects preference set successfully', {
        glassEffectsEnabled: enabled,
        userId: profile?.id,
      });
    } catch (error) {
      logger.error('GLASSMORPHISM_PREFERENCE', 'Failed to set glass effects preference', {
        error: error instanceof Error ? error.message : String(error),
        userId: profile?.id,
      });
      throw error;
    }
  };

  // Apply the preference to the document root for CSS cascade
  useEffect(() => {
    if (glassEffectsEnabled) {
      document.documentElement.classList.remove('glassmorphism-disabled');
      logger.debug('GLASSMORPHISM_PREFERENCE', 'Glass effects enabled - class removed from root');
    } else {
      document.documentElement.classList.add('glassmorphism-disabled');
      logger.debug('GLASSMORPHISM_PREFERENCE', 'Glass effects disabled - class added to root');
    }
  }, [glassEffectsEnabled]);

  return {
    glassEffectsEnabled,
    toggleGlassEffects,
    setGlassEffects,
  };
}
