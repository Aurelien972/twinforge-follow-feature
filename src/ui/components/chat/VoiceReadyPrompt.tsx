/**
 * Voice Ready Prompt
 * Composant affiché dans le panneau pour inviter l'utilisateur à démarrer une conversation vocale
 * Inspiré de ChatGPT Voice - affiche un état "ready" avant de lancer la session
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import { useFeedback } from '../../../hooks/useFeedback';
import { Haptics } from '../../../utils/haptics';

interface VoiceReadyPromptProps {
  modeColor: string;
  modeName: string;
  onStartSession: () => Promise<void>;
  onCancel: () => void;
}

const VoiceReadyPrompt: React.FC<VoiceReadyPromptProps> = ({
  modeColor,
  modeName,
  onStartSession,
  onCancel
}) => {
  const { click } = useFeedback();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    click();
    Haptics.press();
    setIsStarting(true);

    try {
      await onStartSession();
    } catch (error) {
      setIsStarting(false);
    }
  };

  const handleCancel = () => {
    click();
    Haptics.tap();
    onCancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center h-full px-6 py-8"
    >
      <motion.div
        animate={
          isStarting
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: isStarting ? Infinity : 0,
          ease: 'easeInOut'
        }}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 30% 30%, color-mix(in srgb, ${modeColor} 40%, transparent) 0%, transparent 70%),
            rgba(255, 255, 255, 0.15)
          `,
          border: `3px solid color-mix(in srgb, ${modeColor} 50%, transparent)`,
          boxShadow: `
            0 0 30px color-mix(in srgb, ${modeColor} 30%, transparent),
            0 0 60px color-mix(in srgb, ${modeColor} 15%, transparent),
            inset 0 2px 10px rgba(255, 255, 255, 0.1)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}
      >
        <SpatialIcon
          Icon={isStarting ? ICONS.Loader : ICONS.Mic}
          size={36}
          style={{
            color: modeColor,
            filter: `drop-shadow(0 0 12px ${modeColor})`
          }}
        />
      </motion.div>

      <h3
        className="text-xl font-bold text-white text-center mb-2"
        style={{
          textShadow: `0 0 20px ${modeColor}40`
        }}
      >
        {isStarting ? 'Connexion en cours...' : `Parler avec ${modeName}`}
      </h3>

      <p className="text-sm text-white/70 text-center mb-8 max-w-xs">
        {isStarting
          ? 'Établissement de la connexion sécurisée avec le coach'
          : 'Appuyez sur le bouton pour démarrer une conversation vocale avec votre coach'}
      </p>

      {!isStarting && (
        <>
          <motion.button
            onClick={handleStart}
            className="w-full max-w-xs"
            style={{
              padding: '16px 24px',
              borderRadius: '16px',
              background: `
                linear-gradient(135deg,
                  color-mix(in srgb, ${modeColor} 40%, transparent) 0%,
                  color-mix(in srgb, ${modeColor} 20%, transparent) 100%
                ),
                rgba(255, 255, 255, 0.1)
              `,
              border: `2px solid color-mix(in srgb, ${modeColor} 50%, transparent)`,
              boxShadow: `
                0 4px 20px color-mix(in srgb, ${modeColor} 20%, transparent),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: `
                0 6px 30px color-mix(in srgb, ${modeColor} 30%, transparent),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
            whileTap={{ scale: 0.98 }}
          >
            <SpatialIcon Icon={ICONS.Mic} size={20} style={{ color: 'white' }} />
            Démarrer la conversation
          </motion.button>

          <motion.button
            onClick={handleCancel}
            className="mt-4"
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            whileHover={{
              color: 'rgba(255, 255, 255, 0.9)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Annuler
          </motion.button>
        </>
      )}

      {isStarting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-xs text-white/50 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <SpatialIcon Icon={ICONS.Loader} size={12} />
            </motion.div>
            Vérification des permissions micro...
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VoiceReadyPrompt;
