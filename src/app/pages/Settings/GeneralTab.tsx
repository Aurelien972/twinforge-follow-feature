/**
 * General Tab - Onglet Général des Paramètres
 * Performance and Appearance Settings
 * VisionOS Premium Design
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useGlassmorphismPreference } from '../../../hooks/useGlassmorphismPreference';
import { usePerformanceMode } from '../../../hooks/usePerformanceMode';
import logger from '../../../lib/utils/logger';

const GeneralTab: React.FC = () => {
  const { glassEffectsEnabled, toggleGlassEffects } = useGlassmorphismPreference();
  const performanceMetrics = usePerformanceMode();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;

    setIsToggling(true);
    logger.info('GENERAL_TAB', 'User toggling glass effects', {
      currentValue: glassEffectsEnabled,
    });

    try {
      await toggleGlassEffects();
      logger.info('GENERAL_TAB', 'Glass effects toggled successfully');
    } catch (error) {
      logger.error('GENERAL_TAB', 'Failed to toggle glass effects', {
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Performance & Appearance Section */}
      <div
        className="glass-card p-6"
        style={{
          background: 'var(--liquid-glass-bg-base)',
          backdropFilter: 'blur(var(--liquid-blur-medium)) saturate(var(--liquid-saturate-medium))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.25))',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <SpatialIcon Icon={ICONS.Sparkles} size={24} color="#8B5CF6" />
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.25rem',
              }}
            >
              Performance et Apparence
            </h3>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.5',
              }}
            >
              Optimisez l'affichage pour votre appareil
            </p>
          </div>
        </div>

        {/* Glass Effects Toggle */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    margin: 0,
                  }}
                >
                  Effets Glass
                </h4>
                {!glassEffectsEnabled && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      background: 'rgba(34, 197, 94, 0.15)',
                      color: '#22C55E',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                    }}
                  >
                    Mode Performance
                  </span>
                )}
                {performanceMetrics.isLowEndDevice && glassEffectsEnabled && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      background: 'rgba(251, 191, 36, 0.15)',
                      color: '#FBB F24',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                    }}
                  >
                    Appareil ancien détecté
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {glassEffectsEnabled
                  ? 'Les effets de transparence et de flou sont activés pour une expérience visuelle premium.'
                  : 'Les effets de transparence sont désactivés pour améliorer les performances sur votre appareil.'}
              </p>
              {performanceMetrics.deviceInfo !== 'Unknown' && (
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    lineHeight: '1.4',
                    margin: '0.5rem 0 0 0',
                    fontStyle: 'italic',
                  }}
                >
                  Appareil détecté : {performanceMetrics.deviceInfo} • FPS estimé : ~{Math.round(performanceMetrics.estimatedFPS)}
                </p>
              )}
            </div>

            {/* Toggle Switch */}
            <button
              onClick={handleToggle}
              disabled={isToggling}
              aria-label={glassEffectsEnabled ? 'Désactiver les effets glass' : 'Activer les effets glass'}
              style={{
                position: 'relative',
                width: '56px',
                height: '32px',
                borderRadius: '16px',
                border: 'none',
                cursor: isToggling ? 'not-allowed' : 'pointer',
                background: glassEffectsEnabled
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.5))'
                  : 'rgba(255, 255, 255, 0.1)',
                transition: 'background 0.3s ease',
                opacity: isToggling ? 0.6 : 1,
              }}
            >
              <motion.div
                animate={{
                  x: glassEffectsEnabled ? 26 : 2,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: '2px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isToggling ? (
                  <SpatialIcon Icon={ICONS.Loader2} size={16} color="#8B5CF6" className="animate-spin" />
                ) : glassEffectsEnabled ? (
                  <SpatialIcon Icon={ICONS.Check} size={16} color="#8B5CF6" />
                ) : (
                  <SpatialIcon Icon={ICONS.X} size={16} color="#6B7280" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Information Box */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            background: glassEffectsEnabled
              ? 'rgba(59, 130, 246, 0.08)'
              : 'rgba(34, 197, 94, 0.08)',
            border: glassEffectsEnabled
              ? '1px solid rgba(59, 130, 246, 0.2)'
              : '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <SpatialIcon
              Icon={ICONS.Info}
              size={20}
              color={glassEffectsEnabled ? '#3B82F6' : '#22C55E'}
              style={{ flexShrink: 0, marginTop: '0.125rem' }}
            />
            <div>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: '1.5',
                  margin: 0,
                  marginBottom: '0.5rem',
                }}
              >
                {glassEffectsEnabled ? (
                  <>
                    <strong>Effets activés :</strong> Vous profitez de l'expérience visuelle complète avec
                    transparences, flous et animations.
                  </>
                ) : (
                  <>
                    <strong>Mode Performance activé :</strong> Les effets visuels coûteux sont désactivés pour
                    améliorer la fluidité.
                  </>
                )}
              </p>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {glassEffectsEnabled
                  ? performanceMetrics.isLowEndDevice
                    ? 'Votre appareil est ancien. Activez le mode performance pour une meilleure expérience (iPhone 8, etc.).'
                    : 'Recommandé pour les appareils récents et performants.'
                  : 'Toutes les fonctionnalités et couleurs restent identiques. Seuls les effets visuels sont simplifiés.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits List */}
        {!glassEffectsEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ marginTop: '1rem' }}
          >
            <p
              style={{
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0.5rem',
              }}
            >
              Avantages du mode performance :
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {[
                'Amélioration de la fluidité (60 FPS)',
                'Réduction de la consommation de batterie',
                'Meilleure réactivité sur appareils anciens',
                'Toutes les fonctionnalités préservées',
              ].map((benefit, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8125rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#22C55E',
                      flexShrink: 0,
                    }}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Coming Soon Section */}
      <div
        className="glass-card p-6"
        style={{
          background: 'var(--liquid-glass-bg-base)',
          backdropFilter: 'blur(var(--liquid-blur-medium)) saturate(var(--liquid-saturate-medium))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <SpatialIcon Icon={ICONS.Clock} size={20} color="#06B6D4" />
          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', margin: 0 }}>
            Prochainement
          </h4>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: '1.5' }}>
          D'autres options de personnalisation de l'apparence et des performances seront disponibles
          prochainement : thèmes, animations réduites, et plus encore.
        </p>
      </div>
    </motion.div>
  );
};

export default GeneralTab;
