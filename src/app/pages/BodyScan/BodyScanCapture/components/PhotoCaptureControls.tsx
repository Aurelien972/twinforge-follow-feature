import React from 'react';
import { motion } from 'framer-motion';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import logger from '../../../../../lib/utils/logger';

interface PhotoCaptureControlsProps {
  photoType: 'front' | 'profile';
  isValidating: boolean;
  onCameraCapture: () => void;
  onGallerySelect: () => void;
  isProgressInitialized: boolean;
  /** Optionnel : permet d’ouvrir directement le sélecteur système */
  fileInputRef?: React.RefObject<HTMLInputElement>;
  onFileSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoCaptureControls: React.FC<PhotoCaptureControlsProps> = ({
  photoType,
  isValidating,
  onCameraCapture,
  onGallerySelect,
  isProgressInitialized,
  fileInputRef,
  onFileSelect,
}) => {
  const buttonColor =
    photoType === 'front' ? 'var(--color-plasma-cyan)' : '#A855F7';

  logger.debug('PHOTO_CONTROLS', 'state', {
    photoType,
    isValidating,
    isProgressInitialized,
  });

  const disabled = isValidating || !isProgressInitialized;

  const handleGallery = () => {
    // Si on a un input fourni, on l’ouvre, sinon on délègue à la callback existante
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    } else {
      onGallerySelect();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {/* Camera */}
        <motion.button
          type="button"
          onClick={onCameraCapture}
          disabled={disabled}
          aria-busy={isValidating}
          className="px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: `
              linear-gradient(135deg,
                color-mix(in srgb, ${buttonColor} 80%, transparent),
                color-mix(in srgb, ${buttonColor} 60%, transparent)
              )
            `,
            border: `2px solid color-mix(in srgb, ${buttonColor} 60%, transparent)`,
            boxShadow: `
              0 8px 32px color-mix(in srgb, ${buttonColor} 40%, transparent),
              0 0 40px color-mix(in srgb, ${buttonColor} 25%, transparent),
              inset 0 2px 0 rgba(255, 255, 255, 0.30)
            `,
            backdropFilter: 'blur(16px) saturate(150%)',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
          } as React.CSSProperties}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={isValidating ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <SpatialIcon
                Icon={isValidating ? ICONS.Loader2 ?? ICONS.Camera : ICONS.Camera}
                size={16}
                color="white"
                glowColor={buttonColor}
                variant="pure"
              />
            </motion.div>
            <span>{isValidating ? 'Validation…' : 'Caméra'}</span>
          </div>
        </motion.button>

        {/* Gallery */}
        <motion.button
          type="button"
          onClick={handleGallery}
          disabled={disabled}
          className="px-6 py-3 rounded-full font-medium text-white/90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          style={{
            background: `color-mix(in srgb, ${buttonColor} 8%, transparent)`,
            border: `1px solid color-mix(in srgb, ${buttonColor} 20%, transparent)`,
            backdropFilter: 'blur(12px) saturate(130%)',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
          } as React.CSSProperties}
        >
          <div className="flex items-center gap-2">
            <SpatialIcon
              Icon={ICONS.Image}
              size={16}
              color="white"
              glowColor={buttonColor}
              variant="pure"
            />
            <span>Galerie</span>
          </div>
        </motion.button>
      </div>

      {/* File Input (optionnel) */}
      {fileInputRef && onFileSelect && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden"
          // utile sur mobile pour ouvrir la caméra si la galerie n’est pas souhaitée
          capture="environment"
        />
      )}
    </>
  );
};

export default PhotoCaptureControls;