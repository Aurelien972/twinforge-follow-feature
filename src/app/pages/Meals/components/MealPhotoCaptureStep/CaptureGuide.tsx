import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface CaptureGuideProps {
  isValidating: boolean;
  onCameraClick: () => void;
  onGalleryClick: () => void;
  onBarcodeClick: () => void;
  onBarcodeImageUpload: () => void;
}

/**
 * Capture Guide Component - Guide de capture TwinForge
 * Interface de guidage pour la capture de photo de repas
 */
const CaptureGuide: React.FC<CaptureGuideProps> = ({
  isValidating,
  onCameraClick,
  onGalleryClick,
  onBarcodeClick,
  onBarcodeImageUpload,
}) => {
  const [showBarcodeOptions, setShowBarcodeOptions] = React.useState(false);

  return (
    <GlassCard 
      className="p-6 relative glass-card--capture meal-capture-enter"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
          var(--glass-opacity)
        `,
        borderColor: 'rgba(16, 185, 129, 0.25)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          0 0 30px rgba(16, 185, 129, 0.12),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      }}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Titre avec icône lumineuse */}
        <div className="flex items-center gap-3">
          {/* Icône sur fond coloré lumineux */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.45), rgba(5, 150, 105, 0.35))
              `,
              border: '2px solid rgba(16, 185, 129, 0.6)',
              boxShadow: `
                0 0 20px rgba(16, 185, 129, 0.6),
                0 0 40px rgba(16, 185, 129, 0.3),
                inset 0 2px 0 rgba(255,255,255,0.35),
                inset 0 -2px 0 rgba(0,0,0,0.2)
              `
            }}
          >
            <SpatialIcon
              Icon={ICONS.Camera}
              size={18}
              style={{
                color: '#fff',
                filter: 'drop-shadow(0 2px 8px rgba(16, 185, 129, 0.9)) drop-shadow(0 0 4px rgba(255,255,255,0.5))'
              }}
            />
          </div>
          <h4
            className="text-white font-bold text-base"
            style={{
              textShadow: '0 2px 8px rgba(16, 185, 129, 0.4), 0 0 4px rgba(0,0,0,0.3)'
            }}
          >
            Photo de votre repas
          </h4>
        </div>

        {/* Joli bouton "En attente" */}
        <div
          className="flex items-center gap-2 px-3 py-1.5"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(59, 130, 246, 0.2),
                rgba(37, 99, 235, 0.15)
              )
            `,
            border: '2px solid rgba(59, 130, 246, 0.4)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px) saturate(130%)',
            boxShadow: `
              0 4px 16px rgba(59, 130, 246, 0.25),
              0 0 24px rgba(59, 130, 246, 0.15),
              inset 0 1px 0 rgba(255,255,255,0.2)
            `
          }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#3B82F6',
              boxShadow: '0 0 10px #3B82F6'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span
            className="text-xs font-semibold"
            style={{
              color: '#fff',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)'
            }}
          >
            En attente
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Guide Overlay */}
        <div 
          className="relative aspect-[4/3] rounded-xl overflow-visible meal-capture-guide"
          style={{
            background: `
              radial-gradient(circle at 40% 30%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 60% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(34, 197, 94, 0.04))
            `,
            border: '2px dashed rgba(16, 185, 129, 0.3)',
            backdropFilter: 'blur(8px) saturate(120%)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div 
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center relative"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(34, 197, 94, 0.3))
                  `,
                  border: '2px solid rgba(16, 185, 129, 0.4)',
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)'
                }}
              >
                <SpatialIcon 
                  Icon={ICONS.Camera} 
                  size={48} 
                  className="text-green-400 icon-pulse-css"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(16, 185, 129, 0.4))'
                  }}
                />
                
                {/* Particules CSS simplifiées */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-green-400 particle-css particle-css--${i + 1}`}
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${20 + (i % 2) * 60}%`,
                      boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                      '--particle-color': '#10B981'
                    }}
                  />
                ))}
              </div>
              <div>
                <h5 className="text-white font-semibold mb-2 text-base md:text-lg">
                  Forgez Votre Nutrition
                </h5>
                <p className="text-green-200 text-xs md:text-sm leading-relaxed max-w-full sm:max-w-xs mx-auto px-2 sm:px-0">
                  Capturez votre repas pour une analyse complète des nutriments et calories
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={onCameraClick}
          className="w-full btn-glass--primary btn-breathing-css touch-feedback-css"
          disabled={isValidating}
          style={{
            '--scan-primary': '#10B981',
            background: `
              linear-gradient(135deg, 
                rgba(16, 185, 129, 0.8), 
                rgba(34, 197, 94, 0.6)
              )
            `,
            backdropFilter: 'blur(20px) saturate(160%)',
            boxShadow: `
              0 12px 40px rgba(16, 185, 129, 0.4),
              0 0 60px rgba(16, 185, 129, 0.3),
              inset 0 3px 0 rgba(255,255,255,0.3),
              inset 0 -3px 0 rgba(0,0,0,0.2)
            `,
            border: '2px solid rgba(16, 185, 129, 0.6)'
          }}
        >
          <div className="relative flex items-center justify-center gap-3">
            <div className={isValidating ? 'icon-spin-css' : ''}>
              <SpatialIcon 
                Icon={isValidating ? ICONS.Loader2 : ICONS.Camera} 
                size={24} 
                className="text-white"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                }}
              />
            </div>
            <span className="font-bold text-lg">
              {isValidating ? 'Validation...' : 'Appareil photo'}
            </span>
          </div>
        </button>

        <button
          onClick={onGalleryClick}
          className="w-full btn-glass btn-glass--secondary-nav touch-feedback-css"
          disabled={isValidating}
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            borderColor: 'rgba(16, 185, 129, 0.25)',
            backdropFilter: 'blur(12px) saturate(130%)',
            boxShadow: `
              0 4px 16px rgba(0, 0, 0, 0.15),
              0 0 20px rgba(16, 185, 129, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <SpatialIcon Icon={ICONS.Image} size={18} />
            <span className="font-medium">Galerie</span>
          </div>
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gray-900/80 px-3 text-gray-400">ou</span>
          </div>
        </div>

        <button
          onClick={() => setShowBarcodeOptions(!showBarcodeOptions)}
          className="w-full btn-glass touch-feedback-css group relative overflow-hidden"
          disabled={isValidating}
          style={{
            background: `
              linear-gradient(145deg,
                rgba(99, 102, 241, 0.35),
                rgba(79, 70, 229, 0.25),
                rgba(67, 56, 202, 0.20)
              )
            `,
            borderColor: 'rgba(99, 102, 241, 0.5)',
            backdropFilter: 'blur(16px) saturate(140%)',
            boxShadow: `
              0 8px 32px rgba(99, 102, 241, 0.35),
              0 4px 16px rgba(0, 0, 0, 0.25),
              0 0 40px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.25),
              inset 0 -2px 8px rgba(0, 0, 0, 0.15)
            `,
            transform: 'translateZ(0)',
            perspective: '1000px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = `
              0 12px 48px rgba(99, 102, 241, 0.45),
              0 6px 24px rgba(0, 0, 0, 0.3),
              0 0 60px rgba(99, 102, 241, 0.3),
              inset 0 3px 0 rgba(255, 255, 255, 0.3),
              inset 0 -3px 12px rgba(0, 0, 0, 0.2)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = `
              0 8px 32px rgba(99, 102, 241, 0.35),
              0 4px 16px rgba(0, 0, 0, 0.25),
              0 0 40px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.25),
              inset 0 -2px 8px rgba(0, 0, 0, 0.15)
            `;
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
            e.currentTarget.style.boxShadow = `
              0 4px 16px rgba(99, 102, 241, 0.3),
              0 2px 8px rgba(0, 0, 0, 0.2),
              0 0 30px rgba(99, 102, 241, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 4px 12px rgba(0, 0, 0, 0.25)
            `;
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = `
              0 12px 48px rgba(99, 102, 241, 0.45),
              0 6px 24px rgba(0, 0, 0, 0.3),
              0 0 60px rgba(99, 102, 241, 0.3),
              inset 0 3px 0 rgba(255, 255, 255, 0.3),
              inset 0 -3px 12px rgba(0, 0, 0, 0.2)
            `;
          }}
        >
          {/* Shine effect overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Animated glow particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-indigo-300"
                style={{
                  left: `${20 + i * 30}%`,
                  top: '50%',
                  boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)'
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 relative z-10">
            <div
              className="relative"
              style={{
                transform: 'translateZ(20px)',
                filter: 'drop-shadow(0 4px 12px rgba(99, 102, 241, 0.6))'
              }}
            >
              <SpatialIcon Icon={ICONS.ScanBarcode} size={22} className="text-white" />

              {/* Icon glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
            <span
              className="font-bold text-base text-white"
              style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.5)',
                transform: 'translateZ(10px)'
              }}
            >
              Scanner Code-Barre
            </span>
          </div>
        </button>

        {/* Barcode Options Dropdown */}
        <AnimatePresence>
          {showBarcodeOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="rounded-xl p-4 space-y-3"
                style={{
                  background: `
                    radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
                    radial-gradient(circle at 70% 80%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
                    rgba(17, 24, 39, 0.6)
                  `,
                  border: '2px solid rgba(99, 102, 241, 0.3)',
                  backdropFilter: 'blur(16px) saturate(130%)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    0 0 40px rgba(99, 102, 241, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                <div className="text-center mb-3">
                  <p className="text-sm text-indigo-200 font-medium">Choisissez votre méthode de scan</p>
                </div>

                {/* Camera Option */}
                <motion.button
                  onClick={() => {
                    onBarcodeClick();
                    setShowBarcodeOptions(false);
                  }}
                  className="w-full p-4 rounded-lg group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.15))',
                    border: '2px solid rgba(99, 102, 241, 0.4)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(79, 70, 229, 0.3))',
                        border: '1px solid rgba(99, 102, 241, 0.5)',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
                      }}
                    >
                      <SpatialIcon Icon={ICONS.Camera} size={20} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold text-sm">Scanner en direct</p>
                      <p className="text-indigo-300 text-xs">Utilisez votre caméra</p>
                    </div>
                    <SpatialIcon Icon={ICONS.ChevronRight} size={18} className="text-indigo-300" />
                  </div>
                </motion.button>

                {/* Upload Option */}
                <motion.button
                  onClick={() => {
                    onBarcodeImageUpload();
                    setShowBarcodeOptions(false);
                  }}
                  className="w-full p-4 rounded-lg group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.15))',
                    border: '2px solid rgba(99, 102, 241, 0.4)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(79, 70, 229, 0.3))',
                        border: '1px solid rgba(99, 102, 241, 0.5)',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
                      }}
                    >
                      <SpatialIcon Icon={ICONS.Image} size={20} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold text-sm">Télécharger une image</p>
                      <p className="text-indigo-300 text-xs">Depuis votre appareil</p>
                    </div>
                    <SpatialIcon Icon={ICONS.ChevronRight} size={18} className="text-indigo-300" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};

export default CaptureGuide;