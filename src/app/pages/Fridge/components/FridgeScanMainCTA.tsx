import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useFeedback } from '../../../../hooks/useFeedback';

/**
 * FridgeScanMainCTA - Composant CTA Principal pour Scanner un Frigo
 * Thème rose avec icône principale, bulles animées, carrés aux coins et effets VisionOS 26
 */
const FridgeScanMainCTA: React.FC = () => {
  const navigate = useNavigate();
  const { click } = useFeedback();

  const handleScanClick = () => {
    click();
    navigate('/fridge-scan');
  };

  return (
    <GlassCard
      className="relative overflow-hidden p-10 text-center"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, #EC4899 20%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, #F472B6 18%, transparent) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, color-mix(in srgb, #DB2777 15%, transparent) 0%, transparent 70%),
          linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.10)),
          rgba(11, 14, 23, 0.85)
        `,
        borderColor: 'color-mix(in srgb, #EC4899 45%, transparent)',
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.35),
          0 0 40px color-mix(in srgb, #EC4899 30%, transparent),
          0 0 80px color-mix(in srgb, #F472B6 25%, transparent),
          inset 0 2px 0 rgba(255, 255, 255, 0.2)
        `,
        backdropFilter: 'blur(32px) saturate(170%)',
        WebkitBackdropFilter: 'blur(32px) saturate(170%)'
      }}
    >
      {/* Carrés Animés aux 4 Coins */}
      {[
        { top: '20px', left: '20px', rotation: 0 },
        { top: '20px', right: '20px', rotation: 90 },
        { bottom: '20px', left: '20px', rotation: 270 },
        { bottom: '20px', right: '20px', rotation: 180 }
      ].map((position, index) => (
        <motion.div
          key={`corner-${index}`}
          className="absolute w-8 h-8 rounded-lg pointer-events-none"
          style={{
            ...position,
            background: `
              linear-gradient(135deg,
                color-mix(in srgb, #EC4899 60%, transparent),
                color-mix(in srgb, #F472B6 40%, transparent)
              )
            `,
            border: '2px solid color-mix(in srgb, #EC4899 70%, transparent)',
            boxShadow: `
              0 0 20px color-mix(in srgb, #EC4899 50%, transparent),
              inset 0 2px 0 rgba(255,255,255,0.3)
            `
          }}
          animate={{
            rotate: [position.rotation, position.rotation + 360],
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.2
          }}
        />
      ))}

      <div className="relative z-10 space-y-8">
        {/* Conteneur Icône Principale avec Bulles */}
        <div className="relative inline-block">
          {/* Bulles Animées autour de l'Icône */}
          {[
            { size: 16, distance: 80, angle: 45, delay: 0 },
            { size: 20, distance: 90, angle: 135, delay: 0.3 },
            { size: 14, distance: 85, angle: 225, delay: 0.6 },
            { size: 18, distance: 95, angle: 315, delay: 0.9 }
          ].map((bubble, index) => (
            <motion.div
              key={`bubble-${index}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: '50%',
                top: '50%',
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, transparent 70%),
                  linear-gradient(135deg,
                    color-mix(in srgb, #EC4899 70%, transparent),
                    color-mix(in srgb, #F472B6 50%, transparent)
                  )
                `,
                border: '2px solid color-mix(in srgb, #EC4899 80%, transparent)',
                boxShadow: `
                  0 0 20px color-mix(in srgb, #EC4899 60%, transparent),
                  inset 0 2px 4px rgba(255,255,255,0.4)
                `
              }}
              animate={{
                x: [
                  0,
                  Math.cos((bubble.angle * Math.PI) / 180) * bubble.distance,
                  0
                ],
                y: [
                  0,
                  Math.sin((bubble.angle * Math.PI) / 180) * bubble.distance,
                  0
                ],
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: bubble.delay
              }}
            />
          ))}

          {/* Icône Principale avec Animation de Respiration */}
          <motion.div
            className="w-28 h-28 mx-auto rounded-full flex items-center justify-center relative"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%),
                radial-gradient(circle at 70% 70%, color-mix(in srgb, #EC4899 35%, transparent) 0%, transparent 50%),
                linear-gradient(135deg, color-mix(in srgb, #EC4899 65%, transparent), color-mix(in srgb, #F472B6 55%, transparent))
              `,
              border: '4px solid color-mix(in srgb, #EC4899 75%, transparent)',
              boxShadow: `
                0 0 50px color-mix(in srgb, #EC4899 70%, transparent),
                0 0 100px color-mix(in srgb, #F472B6 50%, transparent),
                inset 0 4px 0 rgba(255,255,255,0.5)
              `
            }}
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 0 50px color-mix(in srgb, #EC4899 70%, transparent), 0 0 100px color-mix(in srgb, #F472B6 50%, transparent)',
                '0 0 60px color-mix(in srgb, #EC4899 85%, transparent), 0 0 120px color-mix(in srgb, #F472B6 65%, transparent)',
                '0 0 50px color-mix(in srgb, #EC4899 70%, transparent), 0 0 100px color-mix(in srgb, #F472B6 50%, transparent)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SpatialIcon
              Icon={ICONS.Refrigerator}
              size={56}
              color="rgba(255, 255, 255, 0.95)"
              variant="pure"
            />

            {/* Anneau de Pulsation */}
            <motion.div
              className="absolute inset-0 rounded-full border-3"
              style={{
                borderColor: 'color-mix(in srgb, #EC4899 70%, transparent)'
              }}
              animate={{
                scale: [1, 1.6, 1.6],
                opacity: [0.8, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          </motion.div>
        </div>

        {/* Titre et Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{
              textShadow: '0 0 25px color-mix(in srgb, #EC4899 50%, transparent)'
            }}
          >
            Scanner Votre Frigo
          </h2>
          <p className="text-white/85 text-lg leading-relaxed max-w-2xl mx-auto">
            Capturez l'intérieur de votre réfrigérateur pour une analyse IA instantanée.
            Générez des recettes personnalisées et des plans repas adaptés à vos ingrédients.
          </p>
        </motion.div>

        {/* Bouton Principal avec Shimmer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={handleScanClick}
            className="relative overflow-hidden px-12 py-5 text-xl font-bold rounded-2xl transition-all duration-300 group"
            style={{
              background: `
                linear-gradient(135deg,
                  color-mix(in srgb, #EC4899 90%, transparent),
                  color-mix(in srgb, #F472B6 75%, transparent),
                  color-mix(in srgb, #DB2777 65%, transparent)
                )
              `,
              border: '3px solid color-mix(in srgb, #EC4899 80%, transparent)',
              boxShadow: `
                0 20px 65px color-mix(in srgb, #EC4899 65%, transparent),
                0 0 110px color-mix(in srgb, #F472B6 55%, transparent),
                inset 0 5px 0 rgba(255,255,255,0.6)
              `,
              color: 'white'
            }}
            onMouseEnter={(e) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)';
                e.currentTarget.style.boxShadow = `
                  0 26px 85px color-mix(in srgb, #EC4899 80%, transparent),
                  0 0 140px color-mix(in srgb, #F472B6 70%, transparent),
                  inset 0 5px 0 rgba(255,255,255,0.7)
                `;
              }
            }}
            onMouseLeave={(e) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 20px 65px color-mix(in srgb, #EC4899 65%, transparent),
                  0 0 110px color-mix(in srgb, #F472B6 55%, transparent),
                  inset 0 5px 0 rgba(255,255,255,0.6)
                `;
              }
            }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)'
              }}
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="flex items-center gap-3 relative z-10">
              <SpatialIcon Icon={ICONS.ScanLine} size={24} color="white" variant="pure" />
              <span>Lancer le Scan</span>
            </div>
          </button>
        </motion.div>

        {/* Statistiques Visuelles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4"
        >
          {[
            { icon: ICONS.ScanLine, label: '12 Scans', color: '#EC4899' },
            { icon: ICONS.Package, label: '145 Items', color: '#F472B6' },
            { icon: ICONS.ChefHat, label: '34 Recettes', color: '#DB2777' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: `color-mix(in srgb, ${stat.color} 18%, transparent)`,
                border: `2px solid color-mix(in srgb, ${stat.color} 35%, transparent)`,
                backdropFilter: 'blur(18px) saturate(150%)'
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <SpatialIcon Icon={stat.icon} size={18} style={{ color: stat.color }} />
              <span className="text-white/90 text-sm font-semibold">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </GlassCard>
  );
};

export default FridgeScanMainCTA;
