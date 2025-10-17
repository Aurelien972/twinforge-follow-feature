import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreferencesStore, PerformanceMode, ThemeMode } from '../../../system/store/preferencesStore';
import { useUserStore } from '../../../system/store/userStore';
import { deviceCapabilityManager } from '../../../lib/device/deviceCapabilityManager';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import logger from '../../../lib/utils/logger';

const GeneralSettingsTab: React.FC = () => {
  const { user } = useUserStore();
  const {
    preferences,
    isLoading,
    isSyncing,
    setPerformanceMode,
    setThemeMode,
    loadPreferences,
    resetToDefaults,
  } = usePreferencesStore();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const capabilities = deviceCapabilityManager.getCapabilities();

  useEffect(() => {
    if (user?.id) {
      loadPreferences(user.id);
    }
  }, [user?.id, loadPreferences]);

  const handlePerformanceModeChange = async (mode: PerformanceMode) => {
    logger.info('[GENERAL_SETTINGS] Performance mode changed', { mode });
    await setPerformanceMode(mode);
    showTemporarySuccess();
  };

  const handleThemeModeChange = async (mode: ThemeMode) => {
    logger.info('[GENERAL_SETTINGS] Theme mode changed', { mode });
    await setThemeMode(mode);
    showTemporarySuccess();
  };

  const handleReset = async () => {
    if (confirm('Voulez-vous vraiment réinitialiser tous les paramètres par défaut?')) {
      await resetToDefaults();
      showTemporarySuccess();
    }
  };

  const showTemporarySuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const performanceModes: Array<{
    id: PerformanceMode;
    label: string;
    description: string;
    icon: keyof typeof ICONS;
    color: string;
    badge?: string;
  }> = [
    {
      id: 'auto',
      label: 'Auto',
      description: 'Adapte automatiquement les effets selon les capacités de votre appareil',
      icon: 'Sparkles',
      color: '#18E3FF',
    },
    {
      id: 'optimized',
      label: 'Optimisé',
      description: 'Réduit les effets pour améliorer les performances sur tous les appareils',
      icon: 'Zap',
      color: '#F59E0B',
    },
    {
      id: 'ultra',
      label: 'Ultra-Performance',
      description: 'Design plat sans glassmorphisme. Garanti 60fps sur iPhone 7/8',
      icon: 'Gauge',
      color: '#EF4444',
      badge: 'iPhone 7/8',
    },
  ];

  const themeModes: Array<{
    id: ThemeMode;
    label: string;
    description: string;
    icon: keyof typeof ICONS;
    color: string;
  }> = [
    {
      id: 'auto',
      label: 'Automatique',
      description: 'Suit les préférences système de votre appareil',
      icon: 'MonitorSmartphone',
      color: '#18E3FF',
    },
    {
      id: 'light',
      label: 'Clair',
      description: 'Thème lumineux pour une meilleure visibilité en journée',
      icon: 'Sun',
      color: '#F59E0B',
    },
    {
      id: 'dark',
      label: 'Sombre',
      description: 'Thème sombre confortable pour les yeux et économise la batterie',
      icon: 'Moon',
      color: '#8B5CF6',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <SpatialIcon Icon={ICONS.Loader2} size={40} color="#18E3FF" className="animate-spin mx-auto mb-4" />
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Chargement des préférences...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-8"
    >
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '80px',
              right: '16px',
              zIndex: 10000,
              padding: '12px 20px',
              background: 'linear-gradient(135deg, rgba(24, 227, 255, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
              border: '1px solid rgba(24, 227, 255, 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <SpatialIcon Icon={ICONS.CheckCircle2} size={20} color="#10B981" />
            <span style={{ color: '#10B981', fontWeight: 600, fontSize: '14px' }}>Préférences enregistrées</span>
          </motion.div>
        )}
      </AnimatePresence>

      {capabilities.performanceLevel === 'low' && preferences.performanceMode === 'auto' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <SpatialIcon Icon={ICONS.AlertTriangle} size={24} color="#F59E0B" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#F59E0B', fontWeight: 600, marginBottom: '4px' }}>
              Appareil peu performant détecté
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '14px', marginBottom: '12px' }}>
              Pour une expérience fluide, nous vous recommandons d'activer le mode Ultra-Performance.
            </p>
            <button
              onClick={() => handlePerformanceModeChange('ultra')}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                color: '#F59E0B',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(245, 158, 11, 0.25) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)';
              }}
            >
              Activer maintenant
            </button>
          </div>
        </motion.div>
      )}

      <div>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>
            Mode de Performance
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>
            Choisissez le niveau d'effets visuels selon les capacités de votre appareil
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {performanceModes.map((mode) => {
            const isSelected = preferences.performanceMode === mode.id;

            return (
              <motion.button
                key={mode.id}
                onClick={() => handlePerformanceModeChange(mode.id)}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px',
                  background: isSelected
                    ? `linear-gradient(135deg, ${mode.color}15 0%, ${mode.color}08 100%)`
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected
                    ? `2px solid ${mode.color}60`
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      padding: '10px',
                      background: `linear-gradient(135deg, ${mode.color}20 0%, ${mode.color}10 100%)`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SpatialIcon Icon={ICONS[mode.icon]} size={24} color={mode.color} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>
                        {mode.label}
                      </h4>
                      {mode.badge && (
                        <span
                          style={{
                            padding: '2px 8px',
                            background: `${mode.color}20`,
                            border: `1px solid ${mode.color}40`,
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: mode.color,
                          }}
                        >
                          {mode.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.5' }}>
                      {mode.description}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <SpatialIcon Icon={ICONS.CheckCircle2} size={20} color={mode.color} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '32px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>
            Thème de l'Application
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>
            Personnalisez l'apparence avec un thème clair ou sombre
          </p>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {themeModes.map((theme) => {
            const isSelected = preferences.themeMode === theme.id;

            return (
              <motion.button
                key={theme.id}
                onClick={() => handleThemeModeChange(theme.id)}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px',
                  background: isSelected
                    ? `linear-gradient(135deg, ${theme.color}15 0%, ${theme.color}08 100%)`
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected
                    ? `2px solid ${theme.color}60`
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      padding: '10px',
                      background: `linear-gradient(135deg, ${theme.color}20 0%, ${theme.color}10 100%)`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SpatialIcon Icon={ICONS[theme.icon]} size={24} color={theme.color} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>
                      {theme.label}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.5' }}>
                      {theme.description}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <SpatialIcon Icon={ICONS.CheckCircle2} size={20} color={theme.color} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '32px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>
            Informations de l'Appareil
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>
            Détails techniques détectés automatiquement
          </p>
        </div>

        <div
          style={{
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
          }}
        >
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>Niveau de performance</span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: capabilities.performanceLevel === 'high' ? '#10B981' : capabilities.performanceLevel === 'medium' ? '#F59E0B' : '#EF4444',
                }}
              >
                {capabilities.performanceLevel === 'high' ? 'Élevé' : capabilities.performanceLevel === 'medium' ? 'Moyen' : 'Faible'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>GPU disponible</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: capabilities.gpuAvailable ? '#10B981' : '#EF4444' }}>
                {capabilities.gpuAvailable ? 'Oui' : 'Non'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>RAM estimée</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{capabilities.ram} GB</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>Cœurs CPU</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{capabilities.cores}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)' }}>Appareil mobile</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{capabilities.isMobile ? 'Oui' : 'Non'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '32px' }}>
        <button
          onClick={handleReset}
          disabled={isSyncing}
          style={{
            padding: '12px 24px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#EF4444',
            fontWeight: 600,
            fontSize: '14px',
            cursor: isSyncing ? 'not-allowed' : 'pointer',
            opacity: isSyncing ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 150ms ease',
          }}
          onMouseEnter={(e) => {
            if (!isSyncing) {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
          }}
        >
          <SpatialIcon Icon={ICONS.RotateCcw} size={16} />
          Réinitialiser par défaut
        </button>
      </div>
    </motion.div>
  );
};

export default GeneralSettingsTab;
