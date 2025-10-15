import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

/**
 * Capture Tips Card - Conseils de Capture Optimisés
 * Composant éducatif pour optimiser la qualité des photos et guider l'utilisateur
 */
const CaptureTipsCard: React.FC = () => {
  const captureSteps = [
    { 
      icon: 'Eye', 
      text: 'Éclairage uniforme et suffisant',
      color: 'var(--color-ember-copper)'
    },
    { 
      icon: 'Target', 
      text: 'Cadrez les étagères principales',
      color: 'var(--color-plasma-cyan)'
    },
    { 
      icon: 'Maximize2', 
      text: 'Évitez reflets et ombres portées',
      color: 'var(--color-health-primary)'
    },
    { 
      icon: 'List', 
      text: 'Organisez légèrement avant capture',
      color: 'var(--color-nutrition-primary)'
    }
  ];

  const benefits = [
    {
      icon: 'ChefHat',
      title: 'Recettes sur Mesure',
      description: 'Créez des plats uniques adaptés à vos ingrédients et préférences',
      color: 'var(--color-fridge-primary)'
    },
    {
      icon: 'Calendar',
      title: 'Plans Hebdomadaires',
      description: 'Planification nutritionnelle intelligente pour toute la semaine',
      color: 'var(--color-training-primary)'
    },
    {
      icon: 'ShoppingCart',
      title: 'Listes Optimisées',
      description: 'Courses automatisées basées sur vos besoins réels',
      color: 'var(--color-fasting-primary)'
    },
    {
      icon: 'Zap',
      title: 'Forge Nutritionnelle',
      description: 'Optimisation continue de votre alimentation personnelle',
      color: 'var(--color-plasma-cyan)'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Carte principale des conseils */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlassCard 
          className="p-6" 
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-fridge-primary) 12%, transparent) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--color-plasma-cyan) 8%, transparent) 0%, transparent 50%),
              var(--glass-opacity)
            `,
            borderColor: 'color-mix(in srgb, var(--color-fridge-primary) 25%, transparent)',
            boxShadow: `
              0 8px 32px color-mix(in srgb, var(--color-fridge-primary) 15%, transparent),
              0 0 0 1px color-mix(in srgb, var(--color-fridge-primary) 20%, transparent),
              inset 0 1px 0 color-mix(in srgb, white 10%, transparent)
            `,
            backdropFilter: 'blur(20px) saturate(180%)'
          }}
        >
          {/* En-tête optimisé */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: `
                  radial-gradient(circle, color-mix(in srgb, var(--color-fridge-primary) 20%, transparent) 0%, 
                  color-mix(in srgb, var(--color-fridge-primary) 5%, transparent) 70%)
                `,
                border: '2px solid color-mix(in srgb, var(--color-fridge-primary) 30%, transparent)',
                boxShadow: `
                  0 0 20px color-mix(in srgb, var(--color-fridge-primary) 25%, transparent),
                  inset 0 1px 0 color-mix(in srgb, white 15%, transparent)
                `
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <SpatialIcon 
                Icon={ICONS.Lightbulb} 
                size={24} 
                style={{ 
                  color: 'var(--color-fridge-primary)',
                  filter: 'drop-shadow(0 0 8px color-mix(in srgb, var(--color-fridge-primary) 40%, transparent))'
                }} 
              />
            </motion.div>
            <div className="flex-1">
              <motion.h4 
                className="text-xl font-bold mb-2 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Optimisation de la Forge : Conseils de Capture
              </motion.h4>
              <motion.p 
                className="text-sm text-white/70"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Maximisez la précision de votre scan pour des créations culinaires parfaites
              </motion.p>
            </div>
          </div>

          {/* Astuces de capture améliorées */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5
                }
              }
            }}
          >
            {captureSteps.map((tip, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{
                  background: 'color-mix(in srgb, var(--glass-opacity) 50%, transparent)',
                  border: '1px solid color-mix(in srgb, white 10%, transparent)'
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `
                      radial-gradient(circle, color-mix(in srgb, ${tip.color} 20%, transparent) 0%, 
                      color-mix(in srgb, ${tip.color} 5%, transparent) 70%)
                    `,
                    border: `2px solid color-mix(in srgb, ${tip.color} 25%, transparent)`,
                    boxShadow: `0 0 12px color-mix(in srgb, ${tip.color} 20%, transparent)`
                  }}
                >
                  <SpatialIcon 
                    Icon={ICONS[tip.icon as keyof typeof ICONS]} 
                    size={18} 
                    style={{ 
                      color: tip.color,
                      filter: `drop-shadow(0 0 4px color-mix(in srgb, ${tip.color} 30%, transparent))`
                    }} 
                  />
                </div>
                <span className="text-sm font-medium text-white/85">
                  {tip.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Nouvelle section des bénéfices */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <GlassCard 
          className="p-6" 
          style={{
            background: `
              radial-gradient(circle at 20% 30%, color-mix(in srgb, var(--brand-primary) 10%, transparent) 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, color-mix(in srgb, var(--color-plasma-cyan) 8%, transparent) 0%, transparent 50%),
              var(--glass-opacity)
            `,
            borderColor: 'color-mix(in srgb, var(--brand-primary) 25%, transparent)',
            boxShadow: `
              0 8px 32px color-mix(in srgb, var(--brand-primary) 12%, transparent),
              0 0 0 1px color-mix(in srgb, var(--brand-primary) 20%, transparent),
              inset 0 1px 0 color-mix(in srgb, white 10%, transparent)
            `,
            backdropFilter: 'blur(20px) saturate(180%)'
          }}
        >
          {/* Icône centrale au-dessus du titre */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle, color-mix(in srgb, var(--brand-primary) 25%, transparent) 0%, 
                  color-mix(in srgb, var(--color-plasma-cyan) 10%, transparent) 70%)
                `,
                border: '3px solid color-mix(in srgb, var(--brand-primary) 35%, transparent)',
                boxShadow: `
                  0 0 30px color-mix(in srgb, var(--brand-primary) 30%, transparent),
                  inset 0 2px 0 color-mix(in srgb, white 20%, transparent)
                `
              }}
            >
              <SpatialIcon 
                Icon={ICONS.Sparkles} 
                size={48} 
                style={{ 
                  color: 'var(--brand-primary)',
                  filter: 'drop-shadow(0 0 12px color-mix(in srgb, var(--brand-primary) 50%, transparent))'
                }} 
              />
            </div>
          </motion.div>

          {/* En-tête de la section bénéfices */}
          <div className="text-center mb-6">
            <motion.h4 
              className="text-xl font-bold mb-3 text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              La Puissance de la Forge Spatiale : Vos Bénéfices
            </motion.h4>
            <motion.p 
              className="text-sm text-white/70 max-w-md mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Transformez vos ingrédients en opportunités culinaires infinies grâce à notre Moteur de Forge avancé
            </motion.p>
          </div>

          {/* Liste des bénéfices */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 1.3
                }
              }
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{
                  background: 'color-mix(in srgb, var(--glass-opacity) 60%, transparent)',
                  border: '1px solid color-mix(in srgb, white 12%, transparent)'
                }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `
                      radial-gradient(circle, color-mix(in srgb, ${benefit.color} 20%, transparent) 0%, 
                      color-mix(in srgb, ${benefit.color} 5%, transparent) 70%)
                    `,
                    border: `2px solid color-mix(in srgb, ${benefit.color} 25%, transparent)`,
                    boxShadow: `0 0 16px color-mix(in srgb, ${benefit.color} 20%, transparent)`
                  }}
                >
                  <SpatialIcon 
                    Icon={ICONS[benefit.icon as keyof typeof ICONS]} 
                    size={20} 
                    style={{ 
                      color: benefit.color,
                      filter: `drop-shadow(0 0 6px color-mix(in srgb, ${benefit.color} 35%, transparent))`
                    }} 
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-sm mb-1 text-white">
                    {benefit.title}
                  </h5>
                  <p className="text-xs text-white/75 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default CaptureTipsCard;