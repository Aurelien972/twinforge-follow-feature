import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

interface CaptureMainCTAProps {
  onCameraCapture: () => void;
  onFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const CaptureMainCTA: React.FC<CaptureMainCTAProps> = ({
  onCameraCapture,
  onFileUpload,
  fileInputRef
}) => {
  return (
    <GlassCard
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
      <div className="space-y-8">
        {/* Icône Principale avec Effet Spatial Multi-Couches */}
        <div className="relative flex justify-center">
          <motion.div
            className="w-32 h-32 rounded-full flex items-center justify-center relative"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, transparent 60%),
                radial-gradient(circle at 70% 70%, color-mix(in srgb, #EC4899 30%, transparent) 0%, transparent 50%),
                linear-gradient(135deg, color-mix(in srgb, #EC4899 55%, transparent), color-mix(in srgb, #F472B6 45%, transparent))
              `,
              border: `4px solid color-mix(in srgb, #EC4899 85%, transparent)`,
              boxShadow: `
                0 0 60px color-mix(in srgb, #EC4899 90%, transparent),
                0 0 120px color-mix(in srgb, #EC4899 70%, transparent),
                0 0 180px color-mix(in srgb, #F472B6 60%, transparent),
                inset 0 5px 0 rgba(255,255,255,0.7),
                inset 0 -4px 0 rgba(0,0,0,0.35)
              `,
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)'
            }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                `0 0 60px color-mix(in srgb, #EC4899 90%, transparent),
                 0 0 120px color-mix(in srgb, #EC4899 70%, transparent),
                 0 0 180px color-mix(in srgb, #F472B6 60%, transparent)`,
                `0 0 70px color-mix(in srgb, #EC4899 100%, transparent),
                 0 0 140px color-mix(in srgb, #EC4899 80%, transparent),
                 0 0 210px color-mix(in srgb, #F472B6 70%, transparent)`,
                `0 0 60px color-mix(in srgb, #EC4899 90%, transparent),
                 0 0 120px color-mix(in srgb, #EC4899 70%, transparent),
                 0 0 180px color-mix(in srgb, #F472B6 60%, transparent)`
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SpatialIcon
              Icon={ICONS.Camera}
              size={56}
              color="rgba(255, 255, 255, 0.95)"
              variant="pure"
            />

            {/* Anneaux de Pulsation Multiples */}
            {[0, 0.6, 1.2].map((delay, idx) => (
              <motion.div
                key={idx}
                className="absolute inset-0 rounded-full border-2 pointer-events-none"
                style={{
                  borderColor: idx === 0 ? 'color-mix(in srgb, #EC4899 65%, transparent)'
                            : idx === 1 ? 'color-mix(in srgb, #F472B6 55%, transparent)'
                            : 'color-mix(in srgb, #DB2777 45%, transparent)'
                }}
                animate={{
                  scale: [1, 1.8, 1.8],
                  opacity: [0.8, 0, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay,
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Titre et Description avec Glow */}
        <div className="space-y-4">
          <h2
            className="text-3xl font-bold text-white"
            style={{
              textShadow: `0 0 25px color-mix(in srgb, #EC4899 70%, transparent)`
            }}
          >
            Scanner votre Frigo
          </h2>

          <p className="text-white/85 text-lg max-w-md mx-auto leading-relaxed">
            Prenez 1 à 6 photos de votre frigo, garde-manger, ou armoire pour que la Forge Spatiale analyse vos ingrédients disponibles.
          </p>
        </div>

        {/* Bouton Principal - VisionOS 26 Style */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onCameraCapture}
            className="relative overflow-hidden px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 group"
            style={{
              background: `
                linear-gradient(135deg,
                  color-mix(in srgb, #EC4899 90%, transparent),
                  color-mix(in srgb, #F472B6 75%, transparent),
                  color-mix(in srgb, #DB2777 65%, transparent)
                )
              `,
              border: '3px solid color-mix(in srgb, #EC4899 75%, transparent)',
              boxShadow: `
                0 18px 60px color-mix(in srgb, #EC4899 60%, transparent),
                0 0 100px color-mix(in srgb, #EC4899 50%, transparent),
                0 0 150px color-mix(in srgb, #F472B6 40%, transparent),
                inset 0 5px 0 rgba(255,255,255,0.6)
              `,
              backdropFilter: 'blur(28px) saturate(170%)',
              color: '#fff',
              minWidth: '260px'
            }}
            onMouseEnter={(e) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = `
                  0 24px 80px color-mix(in srgb, #EC4899 75%, transparent),
                  0 0 130px color-mix(in srgb, #EC4899 65%, transparent),
                  0 0 200px color-mix(in srgb, #F472B6 55%, transparent),
                  inset 0 5px 0 rgba(255,255,255,0.7)
                `;
              }
            }}
            onMouseLeave={(e) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 18px 60px color-mix(in srgb, #EC4899 60%, transparent),
                  0 0 100px color-mix(in srgb, #EC4899 50%, transparent),
                  0 0 150px color-mix(in srgb, #F472B6 40%, transparent),
                  inset 0 5px 0 rgba(255,255,255,0.6)
                `;
              }
            }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: `linear-gradient(90deg,
                  transparent 0%,
                  rgba(255,255,255,0.45) 50%,
                  transparent 100%
                )`
              }}
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            <div className="flex items-center gap-3 relative z-10">
              <SpatialIcon
                Icon={ICONS.Camera}
                size={28}
                color="white"
                variant="pure"
              />
              <span>Prendre une Photo</span>
            </div>
          </button>

          {/* Bouton Secondaire Élégant */}
          <button
            onClick={onFileUpload}
            className="text-pink-300 hover:text-pink-100 text-base font-medium transition-all duration-300 flex items-center gap-2 group"
          >
            <SpatialIcon
              Icon={ICONS.Image}
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="underline decoration-pink-400/40 hover:decoration-pink-300/60">
              ou choisir depuis la galerie
            </span>
          </button>
        </div>

        {/* Badge de Statut */}
        <div className="flex justify-center pt-2">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{
              background: 'color-mix(in srgb, #EC4899 18%, transparent)',
              border: '2px solid color-mix(in srgb, #EC4899 35%, transparent)',
              backdropFilter: 'blur(18px) saturate(150%)'
            }}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: '#EC4899' }}
              animate={{
                opacity: [1, 0.4, 1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <span className="text-pink-200 text-sm font-semibold">
              Forge Spatiale Prête
            </span>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
        multiple
        className="hidden"
      />
    </GlassCard>
  );
};

export default CaptureMainCTA;