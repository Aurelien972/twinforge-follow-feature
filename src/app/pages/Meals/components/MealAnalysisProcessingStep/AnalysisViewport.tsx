import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import AnalysisOverlays from './AnalysisOverlays';

interface CapturedMealPhoto {
  file: File;
  url: string;
  validationResult: {
    isValid: boolean;
    issues: string[];
    confidence: number;
  };
  captureReport: any;
}

interface AnalysisViewportProps {
  capturedPhoto: CapturedMealPhoto;
  analysisZones: Array<{ x: number; y: number; intensity: number; id: string }>;
  currentPhase: 'detection' | 'analysis' | 'calculation';
  analysisColor: string;
}

/**
 * Analysis Viewport Component
 * Viewport principal d'analyse avec overlays
 */
const AnalysisViewport: React.FC<AnalysisViewportProps> = ({
  capturedPhoto,
  analysisZones,
  currentPhase,
  analysisColor,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <GlassCard 
      className="p-6 relative overflow-visible glass-card--analysis"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
          var(--glass-opacity)
        `,
        borderColor: 'rgba(16, 185, 129, 0.3)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          0 0 30px rgba(16, 185, 129, 0.15),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `,
        backdropFilter: 'blur(20px) saturate(150%)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Titre avec icône sur fond coloré */}
        <div className="flex items-center gap-3">
          {/* Icône sur fond coloré */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.3))
              `,
              border: '2px solid rgba(16, 185, 129, 0.6)',
              boxShadow: `
                0 0 24px rgba(16, 185, 129, 0.5),
                inset 0 2px 0 rgba(255,255,255,0.3),
                inset 0 -2px 0 rgba(0,0,0,0.2)
              `
            }}
          >
            <SpatialIcon
              Icon={ICONS.Scan}
              size={20}
              style={{
                color: '#fff',
                filter: 'drop-shadow(0 2px 6px rgba(16, 185, 129, 0.8))'
              }}
            />
          </div>
          <h4 className="text-white font-bold text-lg" style={{
            textShadow: '0 2px 8px rgba(16, 185, 129, 0.4), 0 0 4px rgba(0,0,0,0.3)'
          }}>
            Forge Nutritionnelle
          </h4>
        </div>

        {/* Bouton de résumé dynamique - Beau bouton arrondi */}
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(16, 185, 129, 0.25),
                rgba(34, 197, 94, 0.2)
              )
            `,
            border: '2px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '20px',
            backdropFilter: 'blur(16px) saturate(140%)',
            boxShadow: `
              0 4px 20px rgba(16, 185, 129, 0.3),
              0 0 30px rgba(16, 185, 129, 0.2),
              inset 0 1px 0 rgba(255,255,255,0.25)
            `
          }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: analysisColor,
              boxShadow: `0 0 12px ${analysisColor}`
            }}
            animate={reduceMotion ? {} : {
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span
            className="font-bold text-sm"
            style={{
              color: '#fff',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)'
            }}
          >
            {currentPhase === 'detection' ? 'Détection' :
             currentPhase === 'analysis' ? 'Analyse' : 'Calcul'}
          </span>
        </div>
      </div>
      
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/20 analysis-viewport">
        <img
          src={capturedPhoto.url}
          alt="Repas en cours d'analyse"
          className="w-full h-full object-cover border border-green-400/20"
        />
        
        {/* Overlays d'Analyse Dynamiques */}
        {!reduceMotion && (
          <AnalysisOverlays
            analysisZones={analysisZones}
            currentPhase={currentPhase}
            analysisColor={analysisColor}
          />
        )}
      </div>
    </GlassCard>
  );
};

export default AnalysisViewport;