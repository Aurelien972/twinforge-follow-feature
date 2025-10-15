import React from 'react';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

interface CaptureMainCTAProps {
  onCameraCapture: () => void;
  onFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

/**
 * Capture Main CTA - Composant Principal de Capture
 * Interface principale pour initier la capture de photos du frigo
 */
const CaptureMainCTA: React.FC<CaptureMainCTAProps> = ({
  onCameraCapture,
  onFileUpload,
  fileInputRef
}) => {
  return (
    <GlassCard className="glass-fridge-main-cta">
      <div className="fridge-capture-cta-container space-y-6 w-full flex flex-col items-center">
        {/* Icône Centrale avec Glow */}
        <div className="fridge-capture-icon-wrapper">
          <SpatialIcon
            Icon={ICONS.Camera}
            size={64}
            color="rgba(255, 255, 255, 0.9)"
            variant="pure"
          />
        </div>

        <h2 className="fridge-capture-title">
          Scanner votre Frigo
        </h2>
        <p className="fridge-capture-description">
          Prenez 1 à 6 photos de votre frigo, garde-manger, ou armoire avec votre appareil photo pour que la Forge Spatiale analyse vos ingrédients disponibles.
        </p>

        {/* Bouton de Capture Principal */}
        <div className="space-y-4">
          <button
            onClick={onCameraCapture}
            className="glass-fridge-action-button"
          >
            <div className="flex items-center gap-3">
              <SpatialIcon Icon={ICONS.Camera} className="w-6 h-6" color="white" variant="pure" />
              <span>Prendre une Photo</span>
            </div>
          </button>
        </div>

        {/* Bouton Secondaire pour Fichiers (Discret) */}
        <button
          onClick={onFileUpload}
          className="text-white/60 hover:text-white/80 text-sm transition-colors underline"
        >
          ou choisir depuis la galerie
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
          multiple
          className="hidden"
        />
      </div>
    </GlassCard>
  );
};

export default CaptureMainCTA;