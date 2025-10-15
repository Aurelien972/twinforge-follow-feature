import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

interface CapturedPhotosDisplayProps {
  capturedPhotos: string[];
  onRemovePhoto: (index: number) => void;
}

/**
 * Captured Photos Display - Affichage des Photos Capturées
 * Composant pour afficher et gérer les photos capturées
 */
const CapturedPhotosDisplay: React.FC<CapturedPhotosDisplayProps> = ({
  capturedPhotos,
  onRemovePhoto
}) => {
  if (capturedPhotos.length === 0) return null;

  return (
    <GlassCard className="glass-fridge-photo-grid">
      {/* Header de la Section */}
      <div className="fridge-photos-header">
        <div className="fridge-photos-icon-circle">
          <SpatialIcon
            Icon={ICONS.Image}
            size={20}
            color="rgba(255, 255, 255, 0.9)"
            variant="pure"
          />
        </div>
        <h3 className="text-white font-semibold text-lg">
          Photos Capturées ({capturedPhotos.length}/6)
        </h3>
      </div>

      {/* Grille des Photos */}
      <div className="fridge-photos-grid">
        {capturedPhotos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="fridge-photo-item">
              <img
                src={photo}
                alt={`Photo du frigo ${index + 1}`}
                loading="lazy"
              />

              {/* Bouton de Suppression - Rond Lumineux en Haut à Droite */}
              <button
                onClick={() => onRemovePhoto(index)}
                className="fridge-photo-delete-btn"
                aria-label="Supprimer la photo"
              >
                <SpatialIcon Icon={ICONS.X} size={14} color="white" variant="pure" />
              </button>

              {/* Label Photo - Sur l'Image */}
              <div className="fridge-photo-label">
                <span>Photo {index + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message d'Information - Bien Espacé */}
      {capturedPhotos.length < 6 && (
        <div className="glass-fridge-info-badge mt-6">
          <div className="flex items-center gap-2">
            <SpatialIcon Icon={ICONS.Info} size={14} color="#EC4899" variant="pure" />
            <span className="text-pink-200 text-sm">
              Vous pouvez ajouter jusqu'à {6 - capturedPhotos.length} photo{6 - capturedPhotos.length > 1 ? 's' : ''} supplémentaire{6 - capturedPhotos.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default CapturedPhotosDisplay;