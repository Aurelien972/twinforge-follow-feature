import React from 'react';

interface AnalysisEffectsProps {
  reduceMotion: boolean;
}

/**
 * Analysis Effects - Effets de fond énergétiques
 * Lignes de scan, particules et grille d'analyse
 */
const AnalysisEffects: React.FC<AnalysisEffectsProps> = ({ reduceMotion }) => {
  if (reduceMotion) return null;

  return (
    <>
      {/* Lignes de Scan Énergétique */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
        <div
          className="absolute top-0 bottom-0 w-1 opacity-60"
          style={{
            left: '25%',
            borderRadius: 'inherit',
            background: `linear-gradient(180deg, 
              transparent 0%, 
              color-mix(in srgb, #3B82F6 80%, transparent) 50%, 
              transparent 100%
            )`,
            animation: 'energyScanVertical 3s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute top-0 bottom-0 w-1 opacity-60"
          style={{
            left: '75%',
            borderRadius: 'inherit',
            background: `linear-gradient(180deg, 
              transparent 0%, 
              color-mix(in srgb, #06B6D4 80%, transparent) 50%, 
              transparent 100%
            )`,
            animation: 'energyScanVertical 3s ease-in-out infinite',
            animationDelay: '1.5s'
          }}
        />
      </div>

      {/* Particules de Données Énergétiques */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: i % 2 === 0 ? '#3B82F6' : '#06B6D4',
              boxShadow: `0 0 12px color-mix(in srgb, ${i % 2 === 0 ? '#3B82F6' : '#06B6D4'} 80%, transparent)`,
              animation: 'energyParticleFloat 4s ease-in-out infinite',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Grille d'Analyse Énergétique */}
      <div 
        className="absolute inset-4 pointer-events-none overflow-hidden"
        style={{
          borderRadius: 'inherit',
          background: `
            linear-gradient(90deg, color-mix(in srgb, #3B82F6 20%, transparent) 1px, transparent 1px),
            linear-gradient(180deg, color-mix(in srgb, #06B6D4 20%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.3,
          animation: 'energyGridPulse 2s ease-in-out infinite'
        }}
      />
    </>
  );
};

export default AnalysisEffects;