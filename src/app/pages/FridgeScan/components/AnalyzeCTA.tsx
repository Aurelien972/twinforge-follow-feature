import React from 'react';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

interface AnalyzeCTAProps {
  capturedPhotosCount: number;
  onAnalyzePhotos: () => void;
}

/**
 * Analyze CTA - Call to Action pour l'Analyse
 * Composant optimisé VisionOS 26 avec style rose TwinForge
 */
const AnalyzeCTA: React.FC<AnalyzeCTAProps> = ({
  capturedPhotosCount,
  onAnalyzePhotos
}) => {
  if (capturedPhotosCount === 0) return null;

  return (
    <GlassCard
      id="analyze-cta"
      className="p-8 text-center"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, #EC4899 18%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, #F472B6 15%, transparent) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, color-mix(in srgb, #DB2777 12%, transparent) 0%, transparent 70%),
          linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.10)),
          rgba(11, 14, 23, 0.85)
        `,
        borderColor: 'color-mix(in srgb, #EC4899 40%, transparent)',
        boxShadow: `
          0 25px 80px rgba(0, 0, 0, 0.5),
          0 0 60px color-mix(in srgb, #EC4899 30%, transparent),
          0 0 120px color-mix(in srgb, #F472B6 25%, transparent),
          0 0 180px color-mix(in srgb, #DB2777 20%, transparent),
          inset 0 3px 0 rgba(255, 255, 255, 0.3),
          inset 0 -2px 0 rgba(0, 0, 0, 0.2)
        `,
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)'
      }}
    >
      <div className="space-y-6">
        {/* Icône Principale avec Effet Spatial */}
        <div className="relative flex justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center breathing-icon relative"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%),
                radial-gradient(circle at 70% 70%, color-mix(in srgb, #EC4899 25%, transparent) 0%, transparent 50%),
                linear-gradient(135deg, color-mix(in srgb, #EC4899 50%, transparent), color-mix(in srgb, #F472B6 40%, transparent))
              `,
              border: `4px solid color-mix(in srgb, #EC4899 80%, transparent)`,
              boxShadow: `
                0 0 50px color-mix(in srgb, #EC4899 80%, transparent),
                0 0 100px color-mix(in srgb, #EC4899 60%, transparent),
                0 0 150px color-mix(in srgb, #F472B6 50%, transparent),
                inset 0 4px 0 rgba(255,255,255,0.6),
                inset 0 -3px 0 rgba(0,0,0,0.3)
              `,
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)'
            }}
          >
            <SpatialIcon
              Icon={ICONS.Zap}
              size={40}
              color="rgba(255, 255, 255, 0.9)"
              variant="pure"
            />

            {/* Anneaux de Pulsation Multiples */}
            <div
              className="absolute inset-0 rounded-full border-2 pointer-events-none"
              style={{ 
                borderColor: 'color-mix(in srgb, #EC4899 60%, transparent)',
                animation: 'scan-completion-ripple 2s ease-out infinite'
              }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 pointer-events-none"
              style={{ 
                borderColor: 'color-mix(in srgb, #F472B6 50%, transparent)',
                animation: 'scan-completion-ripple 2.5s ease-out infinite',
                animationDelay: '0.5s'
              }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 pointer-events-none"
              style={{ 
                borderColor: 'color-mix(in srgb, #DB2777 40%, transparent)',
                animation: 'scan-completion-ripple 3s ease-out infinite',
                animationDelay: '1s'
              }}
            />
          </div>
        </div>

        {/* Titre et Message avec Glow */}
        <div className="space-y-3">
          <h3 
            className="text-2xl font-bold text-white"
            style={{
              textShadow: `0 0 20px color-mix(in srgb, #EC4899 60%, transparent)`
            }}
          >
            Prêt pour l'Analyse
          </h3>
          
          <p className="text-white/90 text-lg">
            {capturedPhotosCount} photo{capturedPhotosCount > 1 ? 's' : ''} prête{capturedPhotosCount > 1 ? 's' : ''} à être analysée{capturedPhotosCount > 1 ? 's' : ''} par la Forge Spatiale
          </p>
        </div>

        {/* Bouton d'Analyse Principal - Style VisionOS 26 */}
        <div className="flex justify-center">
          <button
            onClick={onAnalyzePhotos}
            disabled={capturedPhotosCount === 0}
            className="relative overflow-hidden px-10 py-4 text-xl font-bold rounded-full transition-all duration-300"
            style={{
              background: `
                linear-gradient(135deg, 
                  color-mix(in srgb, #EC4899 85%, transparent), 
                  color-mix(in srgb, #F472B6 70%, transparent),
                  color-mix(in srgb, #DB2777 60%, transparent)
                )
              `,
              border: '3px solid color-mix(in srgb, #EC4899 70%, transparent)',
              boxShadow: `
                0 16px 50px color-mix(in srgb, #EC4899 50%, transparent),
                0 0 80px color-mix(in srgb, #EC4899 40%, transparent),
                0 0 120px color-mix(in srgb, #F472B6 30%, transparent),
                inset 0 4px 0 rgba(255,255,255,0.5)
              `,
              backdropFilter: 'blur(24px) saturate(170%)',
              color: '#fff'
            }}
            onMouseEnter={(e) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = `
                  0 20px 60px color-mix(in srgb, #EC4899 60%, transparent),
                  0 0 100px color-mix(in srgb, #EC4899 50%, transparent),
                  0 0 150px color-mix(in srgb, #F472B6 40%, transparent),
                  inset 0 4px 0 rgba(255,255,255,0.6)
                `;
              }
            }}
            onMouseLeave={(e) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 16px 50px color-mix(in srgb, #EC4899 50%, transparent),
                  0 0 80px color-mix(in srgb, #EC4899 40%, transparent),
                  0 0 120px color-mix(in srgb, #F472B6 30%, transparent),
                  inset 0 4px 0 rgba(255,255,255,0.5)
                `;
              }
            }}
          >
            {/* Shimmer Effect */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.4) 50%, 
                  transparent 100%
                )`,
                animation: 'fridge-spatial-shimmer 2s ease-in-out infinite'
              }}
            />

            <div className="flex items-center gap-3 relative z-10">
              <SpatialIcon 
                Icon={ICONS.Zap} 
                size={24} 
                color="white" 
                variant="pure"
              />
              <span>Analyser mes Photos</span>
            </div>
          </button>
        </div>

        {/* Badge de Statut */}
        <div className="flex justify-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'color-mix(in srgb, #EC4899 15%, transparent)',
              border: '2px solid color-mix(in srgb, #EC4899 30%, transparent)',
              backdropFilter: 'blur(16px) saturate(140%)'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#EC4899' }}
            />
            <span className="text-pink-300 text-sm font-bold">
              Forge Spatiale Prête
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default AnalyzeCTA;