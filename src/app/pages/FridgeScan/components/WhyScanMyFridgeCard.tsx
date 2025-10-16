import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

/**
 * Why Scan My Fridge Card
 * Composant éducatif expliquant les bénéfices du scan de frigo
 */
const WhyScanMyFridgeCard: React.FC = () => {
  const benefits = [
    {
      icon: 'ChefHat',
      title: 'Recettes Personnalisées',
      description: 'Générez des recettes adaptées à vos ingrédients disponibles',
      color: 'var(--color-fridge-primary)'
    },
    {
      icon: 'TrendingDown',
      title: 'Réduction du Gaspillage',
      description: 'Utilisez vos aliments avant leur péremption',
      color: 'var(--color-nutrition-primary)'
    },
    {
      icon: 'DollarSign',
      title: 'Économies Intelligentes',
      description: 'Optimisez vos courses et votre budget alimentaire',
      color: 'var(--color-fasting-primary)'
    },
    {
      icon: 'Calendar',
      title: 'Planification Facile',
      description: 'Créez des plans de repas hebdomadaires automatiquement',
      color: 'var(--color-training-primary)'
    },
    {
      icon: 'ShoppingCart',
      title: 'Listes de Courses',
      description: 'Générez des listes précises basées sur vos besoins',
      color: 'var(--color-ember-copper)'
    },
    {
      icon: 'Heart',
      title: 'Santé & Nutrition',
      description: 'Suivez votre équilibre nutritionnel et vos objectifs',
      color: 'var(--color-health-primary)'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
          transition={{ delay: 0.2, duration: 0.6 }}
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
              Icon={ICONS.Lightbulb}
              size={48}
              style={{
                color: 'var(--brand-primary)',
                filter: 'drop-shadow(0 0 12px color-mix(in srgb, var(--brand-primary) 50%, transparent))'
              }}
            />
          </div>
        </motion.div>

        {/* En-tête de la section */}
        <div className="text-center mb-6">
          <motion.h4
            className="text-xl font-bold mb-3 text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Pourquoi Scanner Mon Frigo ?
          </motion.h4>
          <motion.p
            className="text-sm text-white/70 max-w-md mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Transformez votre inventaire en opportunités culinaires et économies intelligentes
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
                staggerChildren: 0.1,
                delayChildren: 0.5
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

        {/* Section supplémentaire avec statistiques */}
        <motion.div
          className="mt-6 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">30%</div>
              <div className="text-xs text-white/60">Économies moyennes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">50%</div>
              <div className="text-xs text-white/60">Réduction gaspillage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">2h</div>
              <div className="text-xs text-white/60">Temps gagné/semaine</div>
            </div>
          </div>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
};

export default WhyScanMyFridgeCard;
