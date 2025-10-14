import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../hooks/useFeedback';

interface ActionButtonsProps {
  isSaving: boolean;
  onSaveMeal: () => Promise<void>;
  onRetake: () => void;
  onNewScan: () => void;
  analysisResults: any;
}

/**
 * Action Buttons - Boutons d'action pour les résultats
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSaving,
  onSaveMeal,
  onRetake,
  onNewScan,
  analysisResults,
}) => {
  const reduceMotion = useReducedMotion();
  const { click, formSubmit } = useFeedback();

  const handleSaveMeal = async () => {
    formSubmit(); // Audio feedback for save start
    
    try {
      // Appeler la fonction de sauvegarde du parent qui gère tout
      await onSaveMeal();
    } catch (error) {
      // Les erreurs sont gérées par le parent
      console.error('ActionButtons: Save meal failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: reduceMotion ? 0.1 : 0.6, 
        delay: reduceMotion ? 0 : 0.4 
      }}
      className="space-y-4"
    >
      {/* Bouton Principal - Sauvegarder */}
      <button
        onClick={handleSaveMeal}
        disabled={isSaving}
        className="w-full py-4 btn-breathing-css btn-touch-feedback touch-feedback-css"
        style={{
          '--scan-primary': '#10B981',
          position: 'relative',
          overflow: 'hidden',
          background: `
            linear-gradient(135deg, 
              rgba(16, 185, 129, 0.9), 
              rgba(34, 197, 94, 0.7),
                color-mix(in srgb, var(--nutrition-primary) 90%, transparent), 
                color-mix(in srgb, var(--nutrition-secondary) 70%, transparent),
                color-mix(in srgb, var(--nutrition-accent) 80%, transparent)
            )`,
          backdropFilter: 'blur(20px) saturate(160%)',
          boxShadow: `
            0 12px 32px rgba(16, 185, 129, 0.3),
            0 0 40px rgba(16, 185, 129, 0.2),
            inset 0 3px 0 rgba(255,255,255,0.4),
            inset 0 -3px 0 rgba(0,0,0,0.2)
          `,
          borderRadius: '999px',
          border: '2px solid color-mix(in srgb, var(--nutrition-primary) 60%, transparent)',
          transition: 'all 200ms ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          if (window.matchMedia('(hover: hover)').matches) {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = `
              0 16px 40px rgba(16, 185, 129, 0.4),
              0 0 60px rgba(16, 185, 129, 0.3),
              inset 0 3px 0 rgba(255,255,255,0.5),
              inset 0 -3px 0 rgba(0,0,0,0.2)
            `;
          }
        }}
        onMouseLeave={(e) => {
          if (window.matchMedia('(hover: hover)').matches) {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = `
              0 12px 32px rgba(16, 185, 129, 0.3),
              0 0 40px rgba(16, 185, 129, 0.2),
              inset 0 3px 0 rgba(255,255,255,0.4),
              inset 0 -3px 0 rgba(0,0,0,0.2)
            `;
          }
        }}
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          <div className={isSaving ? 'icon-spin-css' : ''}>
            <SpatialIcon 
              Icon={isSaving ? ICONS.Loader2 : ICONS.Check} 
              size={24} 
              style={{
               background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
               animation: 'celebration-cta-shimmer-movement 3s ease-in-out infinite',
               overflow: 'hidden',
               borderRadius: 'inherit'
              }}
            />
          </div>
          <span className="text-2xl font-bold text-white">
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder le Repas'}
          </span>
        </div>
      </button>

      {/* Actions Secondaires */}
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => {
            click();
            onRetake();
          }}
          className="btn-glass--secondary-nav py-4 touch-target touch-feedback-css"
          style={{
            background: 'color-mix(in srgb, var(--nutrition-accent) 8%, transparent)',
            borderColor: 'color-mix(in srgb, var(--nutrition-accent) 25%, transparent)',
            backdropFilter: 'blur(12px) saturate(130%)',
            boxShadow: `0 0 20px color-mix(in srgb, var(--nutrition-accent) 10%, transparent)`
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <SpatialIcon Icon={ICONS.RotateCcw} size={18} />
            <span className="font-medium">Reprendre</span>
          </div>
        </button>

        <button
          onClick={() => {
            click();
            onNewScan();
          }}
          className="btn-glass--secondary-nav py-4 touch-target touch-feedback-css"
          style={{
            background: 'color-mix(in srgb, var(--color-plasma-cyan) 8%, transparent)',
            borderColor: 'color-mix(in srgb, var(--color-plasma-cyan) 25%, transparent)',
            backdropFilter: 'blur(12px) saturate(130%)',
            boxShadow: `0 0 20px color-mix(in srgb, var(--color-plasma-cyan) 10%, transparent)`
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <SpatialIcon Icon={ICONS.Plus} size={18} />
            <span className="font-medium">Nouveau Scan</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default ActionButtons;