import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

/**
 * Analysis Loading Skeleton - VisionOS 26 Forge Spatial
 * Composant de chargement immersif pour l'analyse nutritionnelle avancée
 */
const AnalysisLoadingSkeleton: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-6 analysis-loading-container">
      {/* Header de Forge Nutritionnelle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
      >
        <GlassCard 
          className="p-8 text-center relative overflow-visible"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.06) 0%, transparent 70%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(16, 185, 129, 0.3)',
            boxShadow: `
              0 16px 48px rgba(0, 0, 0, 0.3),
              0 0 40px rgba(16, 185, 129, 0.2),
              0 0 80px rgba(34, 197, 94, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.2)
            `,
            backdropFilter: 'blur(24px) saturate(160%)'
          }}
        >
          {/* Halo de Forge Nutritionnelle Spatial */}
          <div
            className="absolute inset-0 rounded-inherit pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
              filter: 'blur(20px)',
              transform: 'scale(1.2)',
              zIndex: -1,
              animation: !reduceMotion ? 'forge-glow 4s ease-in-out infinite' : 'none'
            }}
          />

          <div className="relative z-10 space-y-6">
            {/* Icône de Forge Nutritionnelle Centrale */}
            <motion.div
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center relative"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(34, 197, 94, 0.6))
                `,
                border: '3px solid rgba(16, 185, 129, 0.8)',
                boxShadow: `
                  0 0 60px rgba(16, 185, 129, 0.6),
                  0 0 120px rgba(16, 185, 129, 0.3),
                  inset 0 3px 0 rgba(255,255,255,0.4)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              animate={reduceMotion ? {} : {
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 60px rgba(16, 185, 129, 0.6), 0 0 120px rgba(16, 185, 129, 0.3)',
                  '0 0 80px rgba(16, 185, 129, 0.8), 0 0 160px rgba(16, 185, 129, 0.4)',
                  '0 0 60px rgba(16, 185, 129, 0.6), 0 0 120px rgba(16, 185, 129, 0.3)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="flex items-center justify-center"
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <SpatialIcon 
                  Icon={ICONS.Zap} 
                  size={36} 
                  className="text-white"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.8))',
                    display: 'block'
                  }}
                />
              </motion.div>
              
              {/* Particules de Forge IA autour de l'icône */}
              {!reduceMotion && [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: 'rgba(52, 211, 153, 0.8)',
                    left: `${15 + i * 15}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)',
                    animation: `ai-particle-orbit 6s ease-in-out infinite ${i * 0.5}s`
                  }}
                />
              ))}
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Analyse Nutritionnelle Avancée
              </h2>
              <p className="text-green-100 text-lg leading-relaxed max-w-md mx-auto">
                Analyse de vos patterns nutritionnels 
                pour générer des insights personnalisés
              </p>
            </div>

            {/* Phases d'Analyse */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { phase: 'Analyse des Patterns', icon: 'BarChart3', color: '#10B981' },
                { phase: 'Génération d\'Insights', icon: 'TrendingUp', color: '#22C55E' },
                { phase: 'Recommandations Personnalisées', icon: 'Target', color: '#34D399' }
              ].map((item, index) => (
                <motion.div
                  key={item.phase}
                  className="p-4 rounded-xl text-center"
                  style={{
                    background: `rgba(16, 185, 129, 0.1)`,
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    backdropFilter: 'blur(8px) saturate(120%)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: reduceMotion ? 0.1 : 0.5, 
                    delay: reduceMotion ? 0 : 0.2 + index * 0.1 
                  }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{
                      background: `color-mix(in srgb, ${item.color} 20%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${item.color} 30%, transparent)`
                    }}
                    animate={reduceMotion ? {} : {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        `0 0 16px ${item.color}40`,
                        `0 0 24px ${item.color}60`,
                        `0 0 16px ${item.color}40`
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <SpatialIcon 
                      Icon={ICONS[item.icon as keyof typeof ICONS]} 
                      size={20} 
                      style={{ color: item.color }}
                    />
                  </motion.div>
                  <div className="text-white font-medium text-sm">{item.phase}</div>
                </motion.div>
              ))}
            </div>

            {/* Barre de Progression Globale */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-300 font-medium">Analyse en cours...</span>
                <span className="text-white/60">Système Avancé</span>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: `
                      linear-gradient(90deg, 
                        #10B981, 
                        #22C55E,
                        #34D399
                      )
                    `,
                    boxShadow: '0 0 16px rgba(16, 185, 129, 0.6)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: reduceMotion ? 0.1 : 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Shimmer effect */}
                  {!reduceMotion && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, 
                          transparent 0%, 
                          rgba(255,255,255,0.6) 50%, 
                          transparent 100%
                        )`,
                        animation: 'progressShimmer 2s ease-in-out infinite'
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Squelettes de Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Squelette Graphique de Tendance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: reduceMotion ? 0.1 : 0.6, 
            delay: reduceMotion ? 0 : 0.3 
          }}
        >
          <GlassCard className="p-6 h-80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <SpatialIcon Icon={ICONS.LineChart} size={16} className="text-blue-400" />
              </div>
              <div className="space-y-1">
                <div className="h-4 bg-white/10 rounded w-32 skeleton-glass"></div>
                <div className="h-3 bg-white/5 rounded w-24"></div>
              </div>
            </div>
            
            {/* Squelette de graphique linéaire */}
            <div className="relative h-48 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-around p-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-blue-400/30 rounded-t"
                    style={{
                      width: '12px',
                      height: `${30 + Math.random() * 60}%`
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${30 + Math.random() * 60}%` }}
                    transition={{
                      duration: reduceMotion ? 0.1 : 1.5,
                      delay: reduceMotion ? 0 : i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Squelette Graphique de Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: reduceMotion ? 0.1 : 0.6, 
            delay: reduceMotion ? 0 : 0.4 
          }}
        >
          <GlassCard className="p-6 h-80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <SpatialIcon Icon={ICONS.BarChart3} size={16} className="text-purple-400" />
              </div>
              <div className="space-y-1">
                <div className="h-4 bg-white/10 rounded w-36 skeleton-glass"></div>
                <div className="h-3 bg-white/5 rounded w-28"></div>
              </div>
            </div>
            
            {/* Squelette de graphique circulaire */}
            <div className="relative h-48 flex items-center justify-center">
              <motion.div
                className="w-32 h-32 rounded-full border-8 border-transparent relative"
                style={{
                  background: `conic-gradient(from 0deg, 
                    #EF4444 0% 30%, 
                    #F59E0B 30% 60%, 
                    #8B5CF6 60% 100%
                  )`,
                  mask: 'radial-gradient(circle at center, transparent 40%, black 42%)',
                  WebkitMask: 'radial-gradient(circle at center, transparent 40%, black 42%)'
                }}
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30" />
              </motion.div>
              
              {/* Centre du donut */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold text-lg">Macros</div>
                  <div className="text-white/60 text-sm">Analyse...</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Squelettes d'Insights IA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: reduceMotion ? 0.1 : 0.5, 
              delay: reduceMotion ? 0 : 0.5 + index * 0.1 
            }}
          >
            <GlassCard 
              className="p-5"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(52, 211, 153, 0.06) 0%, transparent 60%),
                  var(--glass-opacity)
                `,
                borderColor: 'rgba(52, 211, 153, 0.15)'
              }}
            >
              <div className="flex items-start gap-3">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0"
                  animate={reduceMotion ? {} : {
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <SpatialIcon 
                    Icon={[ICONS.TrendingUp, ICONS.Target, ICONS.BarChart3, ICONS.Zap][index]} 
                    size={14} 
                    className="text-emerald-400"
                  />
                </motion.div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded skeleton-glass" style={{ width: `${60 + Math.random() * 30}%` }}></div>
                  <div className="h-3 bg-white/5 rounded skeleton-glass" style={{ width: `${80 + Math.random() * 15}%` }}></div>
                  <div className="h-3 bg-white/5 rounded skeleton-glass" style={{ width: `${40 + Math.random() * 40}%` }}></div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Flux de Données IA */}
      {!reduceMotion && (
        <motion.div
          className="relative h-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Particules de données flottantes */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `linear-gradient(135deg, #10B981, #22C55E)`,
                  left: `${5 + i * 8}%`,
                  top: `${40 + (i % 3) * 20}%`,
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                  animation: `ai-data-flow 4s ease-in-out infinite ${i * 0.2}s`
                }}
              />
            ))}
            
            {/* Connecteurs de flux */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.path
                  key={i}
                  d={`M ${10 + i * 25} 50 Q ${25 + i * 25} 20 ${40 + i * 25} 50`}
                  stroke="#10B981"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </svg>
          </div>
        </motion.div>
      )}

      {/* Message d'Encouragement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: reduceMotion ? 0.1 : 0.6, 
          delay: reduceMotion ? 0 : 1.0 
        }}
      >
        <GlassCard 
          className="p-6 text-center"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(34, 197, 94, 0.2)'
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-emerald-400" />
            <p className="text-emerald-200 text-sm">
              Analyse de vos {' '}
              <span className="font-semibold text-emerald-100">patterns nutritionnels</span>
              {' '} en cours pour générer des recommandations sur mesure...
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* CSS Animations Personnalisées */}
      <style>{`
        @keyframes forge-glow {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
          50% { 
            opacity: 0.9;
            transform: scale(1.3);
          }
        }
        
        @keyframes particle-orbit {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-12px) translateX(8px) scale(1.3);
            opacity: 1;
          }
          50% { 
            transform: translateY(-16px) translateX(-4px) scale(1.4);
            opacity: 1;
          }
          75% { 
            transform: translateY(-8px) translateX(-8px) scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes data-flow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-8px) translateX(4px) scale(1.2);
            opacity: 0.9;
          }
          50% { 
            transform: translateY(-12px) translateX(-2px) scale(1.3);
            opacity: 1;
          }
          75% { 
            transform: translateY(-8px) translateX(-4px) scale(1.1);
            opacity: 0.8;
          }
        }
        
        /* Support pour reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .forge-glow,
          .particle-orbit,
          .data-flow {
            animation: none !important;
          }
          
          .forge-glow {
            opacity: 0.7 !important;
            transform: scale(1.2) !important;
          }
          
          .particle-orbit {
            opacity: 0.8 !important;
            transform: translateY(-10px) scale(1.2) !important;
          }
          
          .data-flow {
            opacity: 0.7 !important;
            transform: translateY(-6px) scale(1.1) !important;
          }
        }
        
        /* Optimisations mobile */
        @media (max-width: 768px) {
          .analysis-loading-container {
            padding: 0.5rem;
          }
          
          .forge-glow {
            animation-duration: 5s; /* Plus lent sur mobile pour économiser la batterie */
          }
          
          .particle-orbit {
            animation-duration: 8s;
          }
          
          .data-flow {
            animation-duration: 6s;
          }
        }
      `}</style>
    </div>
  );
};

export default AnalysisLoadingSkeleton;