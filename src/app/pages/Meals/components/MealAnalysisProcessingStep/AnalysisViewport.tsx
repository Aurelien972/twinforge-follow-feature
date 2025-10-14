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
        <h4 className="text-white font-semibold flex items-center gap-2">
          <SpatialIcon 
            Icon={ICONS.Scan} 
            size={18} 
            style={{ 
              color: analysisColor,
              filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))'
            }} 
          />
          <span className="text-lg">Forge Nutritionnelle</span>
        </h4>
        <div 
          className="capture-status-badge capture-status-badge--analyzing flex items-center gap-2"
          style={{ 
            background: `
              linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.15)),
              rgba(255, 255, 255, 0.05)
            `,
            borderColor: 'rgba(16, 185, 129, 0.4)',
            color: analysisColor,
            border: '1px solid',
            backdropFilter: 'blur(12px) saturate(130%)',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.3)'
          }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: analysisColor }}
            animate={reduceMotion ? {} : {
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="capture-status-text font-medium">
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