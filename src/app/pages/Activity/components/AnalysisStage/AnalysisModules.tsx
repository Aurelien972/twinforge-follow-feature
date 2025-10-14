import { motion } from 'framer-motion';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import React from 'react';

interface AnalysisModulesProps {
  progress: number;
  reduceMotion: boolean;
}

/**
 * Analysis Modules - Modules de traitement énergétique
 * Grille des modules de traitement avec états actifs
 */
const AnalysisModules: React.FC<AnalysisModulesProps> = ({ progress, reduceMotion }) => {
  const modules = [
    { 
      icon: 'Volume2', 
      label: 'Décodage Énergétique', 
      sublabel: 'Extraction des données vocales',
      color: '#3B82F6',
      active: progress >= 10
    },
    { 
      icon: 'Target', 
      label: 'Analyse de Mouvement', 
      sublabel: 'Identification des activités',
      color: '#06B6D4',
      active: progress >= 40
    },
    { 
      icon: 'Zap', 
      label: 'Calcul Énergétique', 
      sublabel: 'Optimisation des métriques',
      color: '#10B981',
      active: progress >= 70
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {modules.map((step, index) => (
        <motion.div
          key={step.label}
          className="p-6 rounded-xl relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, ${step.color} ${step.active ? '15' : '8'}%, transparent) 0%, transparent 60%),
              rgba(255,255,255,${step.active ? '0.08' : '0.04'})
            `,
            border: `2px solid color-mix(in srgb, ${step.color} ${step.active ? '40' : '20'}%, transparent)`,
            backdropFilter: 'blur(12px) saturate(140%)',
            WebkitBackdropFilter: 'blur(12px) saturate(140%)',
            boxShadow: step.active ? 
              `0 0 20px color-mix(in srgb, ${step.color} 30%, transparent)` : 
              `0 0 8px color-mix(in srgb, ${step.color} 15%, transparent)`,
            transition: 'all 0.6s ease'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          {/* Indicateur d'État Actif */}
          {step.active && !reduceMotion && (
            <div
              className="absolute top-2 right-2 w-3 h-3 rounded-full"
              style={{
                background: step.color,
                boxShadow: `0 0 12px color-mix(in srgb, ${step.color} 80%, transparent)`,
                animation: 'energyPulse 1.5s ease-in-out infinite'
              }}
            />
          )}

          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step.active && !reduceMotion ? 'breathing-icon' : ''
              }`}
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, ${step.color} 40%, transparent), color-mix(in srgb, ${step.color} 30%, transparent))
                `,
                border: `2px solid color-mix(in srgb, ${step.color} 60%, transparent)`,
                boxShadow: `
                  0 0 20px color-mix(in srgb, ${step.color} 50%, transparent),
                  inset 0 2px 0 rgba(255,255,255,0.3)
                `
              }}
            >
              <SpatialIcon
                Icon={ICONS[step.icon as keyof typeof ICONS]}
                size={20}
                style={{ color: step.color }}
                variant="pure"
              />
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-base font-bold mb-1" style={{ color: step.color }}>
              {step.label}
            </div>
            <div className="text-xs text-white/60">
              {step.sublabel}
            </div>
          </div>

          {/* Effet de Flux Énergétique */}
          {step.active && !reduceMotion && (
            <div
              className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl overflow-hidden"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  ${step.color} 50%, 
                  transparent 100%
                )`,
                animation: 'energyFlow 2s ease-in-out infinite'
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AnalysisModules;