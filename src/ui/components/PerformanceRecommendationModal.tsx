import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformanceRecommendation } from '../../hooks/usePerformanceRecommendation';
import { usePreferencesStore } from '../../system/store/preferencesStore';
import SpatialIcon from '../icons/SpatialIcon';
import { ICONS } from '../icons/registry';

const PerformanceRecommendationModal: React.FC = () => {
  const { recommendation, dismissRecommendation } = usePerformanceRecommendation();
  const { setPerformanceMode } = usePreferencesStore();

  if (!recommendation || !recommendation.shouldRecommend) {
    return null;
  }

  const handleAccept = async () => {
    await setPerformanceMode(recommendation.recommendedMode);
    dismissRecommendation();
  };

  const handleDismiss = () => {
    dismissRecommendation();
  };

  const severityColors = {
    high: {
      bg: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.4)',
      icon: '#EF4444',
      buttonBg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(245, 158, 11, 0.25) 100%)',
      buttonBorder: 'rgba(239, 68, 68, 0.5)',
    },
    medium: {
      bg: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.4)',
      icon: '#F59E0B',
      buttonBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%)',
      buttonBorder: 'rgba(245, 158, 11, 0.5)',
    },
    low: {
      bg: 'rgba(24, 227, 255, 0.15)',
      border: 'rgba(24, 227, 255, 0.4)',
      icon: '#18E3FF',
      buttonBg: 'linear-gradient(135deg, rgba(24, 227, 255, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%)',
      buttonBorder: 'rgba(24, 227, 255, 0.5)',
    },
  };

  const colors = severityColors[recommendation.severity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
        }}
        onClick={handleDismiss}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '500px',
            width: '100%',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 30, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
              style={{
                display: 'inline-flex',
                padding: '16px',
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '50%',
                marginBottom: '16px',
              }}
            >
              <SpatialIcon Icon={ICONS.Zap} size={32} color={colors.icon} />
            </motion.div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
              Optimisation Recommandée
            </h2>

            <p
              style={{
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: '1.6',
                marginBottom: '8px',
              }}
            >
              {recommendation.reason}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                marginTop: '16px',
              }}
            >
              <SpatialIcon Icon={ICONS.Gauge} size={18} color={colors.icon} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: colors.icon }}>
                Mode {recommendation.recommendedMode === 'ultra' ? 'Ultra-Performance' : 'Optimisé'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={handleDismiss}
              style={{
                flex: 1,
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              Non merci
            </button>

            <button
              onClick={handleAccept}
              style={{
                flex: 1,
                padding: '14px',
                background: colors.buttonBg,
                border: `1px solid ${colors.buttonBorder}`,
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${colors.border}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Activer
            </button>
          </div>

          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: 'center',
              marginTop: '16px',
            }}
          >
            Vous pouvez toujours changer ce paramètre dans Réglages → Général
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceRecommendationModal;
