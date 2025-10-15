import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

/**
 * Contextual Info Card - Carte d'Information Contextuelle
 * Composant éducatif expliquant le processus d'analyse de la Forge Spatiale
 */
const ContextualInfoCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <GlassCard 
        className="p-6"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-plasma-cyan) 8%, transparent) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'color-mix(in srgb, var(--color-plasma-cyan) 20%, transparent)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 20px color-mix(in srgb, var(--color-plasma-cyan) 12%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.12)
          `
        }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
            style={{
              background: 'color-mix(in srgb, var(--color-plasma-cyan) 15%, transparent)',
              border: '2px solid color-mix(in srgb, var(--color-plasma-cyan) 30%, transparent)'
            }}
          >
            <SpatialIcon Icon={ICONS.Info} size={12} style={{ color: 'var(--color-plasma-cyan)' }} />
          </div>
          <div>
            <h4 className="text-cyan-300 font-semibold mb-2">Que fait la Forge Spatiale ?</h4>
            <div className="space-y-2 text-sm text-cyan-200">
              <p>• <strong>Vision de la Forge :</strong> Détection précise des aliments et ingrédients</p>
              <p>• <strong>Analyse Nutritionnelle :</strong> Évaluation de la fraîcheur et des quantités</p>
              <p>• <strong>Cartographie de la Forge :</strong> Catégorisation et normalisation des données</p>
              <p>• <strong>Préparation Recettes :</strong> Optimisation pour la génération de recettes</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ContextualInfoCard;