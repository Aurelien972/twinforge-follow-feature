import GlassCard from '../../../../../ui/cards/GlassCard';
import { useActivityPerformance } from '../../hooks/useActivityPerformance';
import AnalysisIcon from './AnalysisIcon';
import AnalysisProgress from './AnalysisProgress';
import AnalysisModules from './AnalysisModules';
import AnalysisEffects from './AnalysisEffects';
import React, { useEffect, useRef } from 'react';

interface AnalysisContainerProps {
  isProcessing: boolean;
  progress: number;
  currentMessage: string;
  subMessage?: string;
}

/**
 * Analysis Container - Conteneur principal de l'analyse
 * Orchestrateur des composants d'analyse avec effets visuels
 */
const AnalysisContainer: React.FC<AnalysisContainerProps> = ({
  isProcessing,
  progress,
  currentMessage,
  subMessage
}) => {
  const perf = useActivityPerformance();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const perfClass = `activity-perf-${perf.mode}`;
      containerRef.current.classList.add(perfClass);
      return () => {
        containerRef.current?.classList.remove(perfClass);
      };
    }
  }, [perf.mode]);

  return (
    <div className="space-y-6 relative overflow-hidden analysis-stage-container" ref={containerRef}>
      {/* Conteneur Principal d'Analyse */}
      <GlassCard
        className="p-8 text-center relative overflow-hidden analysis-stage-card"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, #3B82F6 15%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, color-mix(in srgb, #06B6D4 12%, transparent) 0%, transparent 50%),
            linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08)),
            var(--glass-opacity)
          `,
          borderColor: 'color-mix(in srgb, #3B82F6 30%, transparent)',
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 40px color-mix(in srgb, #3B82F6 20%, transparent),
            0 0 80px color-mix(in srgb, #06B6D4 18%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.25),
            inset 0 -2px 0 rgba(0, 0, 0, 0.15)
          `,
          backdropFilter: 'blur(28px) saturate(170%)',
          WebkitBackdropFilter: 'blur(28px) saturate(170%)'
        }}
      >
        {/* Effets de Fond Énergétiques */}
        <AnalysisEffects />

        <div className="space-y-6 relative z-10">
          {/* Icône Centrale de la Forge Énergétique */}
          <AnalysisIcon
            progress={progress}
          />

          {/* Messages Dynamiques de la Forge */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white mb-2">
              {currentMessage || "Analyse de Forge en Cours"}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-lg mx-auto">
              {subMessage || "Votre empreinte énergétique est en cours de traitement par la Forge Spatiale"}
            </p>
            
            {/* Barre de Progression Énergétique */}
            <AnalysisProgress progress={progress} />
          </div>

          {/* Modules de Traitement Énergétique */}
          <AnalysisModules progress={progress} />
        </div>
      </GlassCard>
    </div>
  );
};

export default AnalysisContainer;