/**
 * Ready For Processing Card – TwinForge / VisionOS26
 * - Contient la carte complète (GlassCard + contenu + CTA)
 * - Animations Framer Motion internes (respect du reduced-motion via DeviceProvider)
 * - CTA accessible et désactivée pendant la validation
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { usePreferredMotion } from '../../../../../system/device/DeviceProvider';

interface ReadyForProcessingCardProps {
  isAnyPhotoValidating: boolean;
  onProceedToProcessing: () => void;
  glassClick: () => void;
}

const ReadyForProcessingCard: React.FC<ReadyForProcessingCardProps> = 
({ isAnyPhotoValidating,
  onProceedToProcessing,
  glassClick,
}) => {
  const preferredMotion = usePreferredMotion();

  const handleLaunch = () => {
    if (isAnyPhotoValidating) return;
    glassClick();
    onProceedToProcessing();
  };

  return (
    <GlassCard className="glass-card refined-glass-cta p-8 text-center relative overflow-visible rounded-3xl">
      {/* Layers visuels pilotés par vos CSS */}
      <div className="refined-inner-glow absolute inset-0 rounded-[inherit] pointer-events-none" />
      <div className="refined-glass-texture absolute inset-0 rounded-[inherit] pointer-events-none" />

      <div className="relative z-10 space-y-8">
        <motion.div
          className="flex items-center justify-center gap-4 mb-2"
          initial={preferredMotion ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="refined-success-icon-container relative">
            <div className="refined-success-halo absolute inset-0" />
            <div className="refined-success-icon size-12 rounded-full grid place-items-center relative z-10">
              <SpatialIcon Icon={ICONS.Check} size={24} className="text-white" />
            </div>
            <div className="refined-success-ring-1 absolute inset-0 rounded-full" />
            <div className="refined-success-ring-2 absolute inset-0 rounded-full" />
          </div>

          <motion.span
            className="refined-success-text text-xl font-bold"
            initial={preferredMotion ? { opacity: 0, x: -16 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            Photos capturées avec succès&nbsp;!
          </motion.span>
        </motion.div>

        <motion.p
          className="refined-description text-lg leading-relaxed max-w-md mx-auto"
          initial={preferredMotion ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
        >
          Vos photos de face et de profil sont prêtes pour l’analyse IA avancée.
        </motion.p>

        <motion.button
          data-launch-analysis
          onClick={handleLaunch}
          className="refined-cta-button w-full relative overflow-hidden rounded-full py-3 glass-focus hover-lift"
          disabled={isAnyPhotoValidating}
          aria-busy={isAnyPhotoValidating}
          aria-live="polite"
          whileHover={preferredMotion ? { scale: 1.02, y: -2 } : undefined}
          whileTap={preferredMotion ? { scale: 0.98 } : undefined}
          initial={preferredMotion ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          type="button"
        >
          <span className="refined-cta-glow absolute inset-0 pointer-events-none rounded-[inherit]" />
          <span className="refined-cta-content relative z-10 flex items-center justify-center gap-3">
            <motion.span
              className="refined-cta-icon"
              animate={isAnyPhotoValidating ? { rotate: 360 } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <SpatialIcon
                Icon={isAnyPhotoValidating ? ICONS.Loader2 : ICONS.Zap}
                size={20}
                className="text-white"
              />
            </motion.span>
            <span className="refined-cta-text text-lg font-bold">
              {isAnyPhotoValidating ? 'Analyse en cours…' : 'Lancer l’analyse IA'}
            </span>
          </span>
        </motion.button>
      </div>
    </GlassCard>
  );
};

export default ReadyForProcessingCard;