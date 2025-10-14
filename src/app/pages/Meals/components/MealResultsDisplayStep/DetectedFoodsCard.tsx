import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface DetectedFoodsCardProps {
  analysisResults: any;
}

/**
 * Get color for food category
 */
function getFoodCategoryColor(category?: string): string {
  const colors = {
    protein: '#EF4444',      // Rouge pour protéines
    carbs: '#F59E0B',        // Orange pour glucides
    vegetables: '#22C55E',   // Vert pour légumes
    healthy_fats: '#8B5CF6', // Violet pour lipides sains
    dairy: '#06B6D4',        // Cyan pour produits laitiers
    fruits: '#EC4899',       // Rose pour fruits
    grains: '#D97706',       // Brun pour céréales
    default: '#10B981'       // Vert TwinForge par défaut
  };
  
  return colors[category as keyof typeof colors] || colors.default;
}

/**
 * Detected Foods Card - Liste des aliments détectés
 */
const DetectedFoodsCard: React.FC<DetectedFoodsCardProps> = ({
  analysisResults,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <GlassCard 
      className="p-6 glass-card--foods-detected"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--nutrition-accent) 12%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--nutrition-secondary) 8%, transparent) 0%, transparent 50%),
          var(--glass-opacity)
        `,
        borderColor: 'color-mix(in srgb, var(--nutrition-accent) 30%, transparent)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          0 0 30px color-mix(in srgb, var(--nutrition-accent) 15%, transparent),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `,
        backdropFilter: 'blur(20px) saturate(150%)',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, color-mix(in srgb, var(--nutrition-accent) 40%, transparent), color-mix(in srgb, var(--nutrition-accent) 30%, transparent))
            `,
            border: '2px solid color-mix(in srgb, var(--nutrition-accent) 60%, transparent)',
            boxShadow: `0 0 30px color-mix(in srgb, var(--nutrition-accent) 50%, transparent)`
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <SpatialIcon 
            Icon={ICONS.Eye} 
            size={20} 
            style={{ color: 'var(--nutrition-accent)' }}
          />
        </motion.div>
        <h3 className="text-xl font-bold text-white">Aliments Détectés</h3>
      </div>
      
      <div className="space-y-3">
        {analysisResults.detected_foods.map((food: any, index: number) => (
          <motion.div
            key={index}
            className="food-item-card p-5 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: reduceMotion ? 0.1 : 0.4, 
              delay: reduceMotion ? 0 : 0.3 + index * 0.1 
            }}
            style={{
              background: `
                radial-gradient(circle at 30% 20%, color-mix(in srgb, ${getFoodCategoryColor(food.category)} 8%, transparent) 0%, transparent 60%),
                rgba(255, 255, 255, 0.08)
              `,
              border: `2px solid color-mix(in srgb, ${getFoodCategoryColor(food.category)} 25%, transparent)`,
              backdropFilter: 'blur(12px) saturate(130%)',
              boxShadow: `
                0 4px 16px rgba(0, 0, 0, 0.15),
                0 0 12px color-mix(in srgb, ${getFoodCategoryColor(food.category)} 15%, transparent),
                inset 0 1px 0 rgba(255, 255, 255, 0.12)
              `,
              transition: 'all 250ms ease',
              cursor: 'pointer'
            }}
            whileHover={{
              scale: 1.03,
              y: -2,
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.2),
                0 0 20px color-mix(in srgb, ${getFoodCategoryColor(food.category)} 25%, transparent),
                inset 0 2px 0 rgba(255, 255, 255, 0.15)
              `
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: getFoodCategoryColor(food.category),
                    boxShadow: `0 0 12px ${getFoodCategoryColor(food.category)}80`,
                    border: `1px solid ${getFoodCategoryColor(food.category)}CC`
                  }}
                />
                <div>
                  <div className="text-white font-semibold text-lg">{food.name}</div>
                  {food.portion_size && (
                    <div className="text-white/60 text-sm mb-1">{food.portion_size}</div>
                  )}
                  <div className="text-white/70 text-sm">
                    P: {Math.round(food.proteins)}g • G: {Math.round(food.carbs)}g • L: {Math.round(food.fats)}g
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-xl">{food.calories}</div>
                <div className="text-white/70 text-sm">kcal</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default DetectedFoodsCard;