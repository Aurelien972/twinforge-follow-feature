import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

interface MacronutrientsCardProps {
  analysisResults: any;
  celebrationActive: boolean;
}

/**
 * Macronutrients Card - Affichage des 3 Macronutriments (sans calories)
 * Protéines, Glucides, Lipides uniquement
 */
const MacronutrientsCard: React.FC<MacronutrientsCardProps> = ({
  analysisResults,
  celebrationActive,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <GlassCard 
      className="p-6"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--nutrition-secondary) 10%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--nutrition-accent) 8%, transparent) 0%, transparent 50%),
          var(--glass-opacity)
        `,
        borderColor: 'color-mix(in srgb, var(--nutrition-secondary) 30%, transparent)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          0 0 30px color-mix(in srgb, var(--nutrition-secondary) 15%, transparent),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
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
              linear-gradient(135deg, color-mix(in srgb, var(--nutrition-secondary) 40%, transparent), color-mix(in srgb, var(--nutrition-accent) 30%, transparent))
            `,
            border: '2px solid color-mix(in srgb, var(--nutrition-secondary) 60%, transparent)',
            boxShadow: `0 0 30px color-mix(in srgb, var(--nutrition-secondary) 50%, transparent)`
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <SpatialIcon 
            Icon={ICONS.BarChart3} 
            size={20} 
            style={{ color: 'var(--nutrition-secondary)' }}
          />
        </motion.div>
        <h3 className="text-xl font-bold text-white">Macronutriments Forgés</h3>
      </div>
      
      {/* Grille 3 Colonnes - Protéines, Glucides, Lipides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Protéines */}
        <motion.div 
          className="text-center p-6 rounded-xl nutrition-stat-card"
          style={{
            background: `
              radial-gradient(circle at center, color-mix(in srgb, var(--nutrition-proteins) 20%, transparent) 0%, transparent 60%),
              rgba(255, 255, 255, 0.05)
            `,
            border: '2px solid color-mix(in srgb, var(--nutrition-proteins) 40%, transparent)',
            backdropFilter: 'blur(12px) saturate(140%)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              0 0 20px color-mix(in srgb, var(--nutrition-proteins) 20%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: reduceMotion ? 0.1 : 0.5, 
            delay: reduceMotion ? 0 : 0.1 
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.25),
              0 0 30px color-mix(in srgb, var(--nutrition-proteins) 30%, transparent)
            `
          }}
        >
          <motion.div
            className="w-10 h-10 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{
              background: `color-mix(in srgb, var(--nutrition-proteins) 25%, transparent)`,
              border: `1px solid color-mix(in srgb, var(--nutrition-proteins) 40%, transparent)`
            }}
            animate={celebrationActive ? {
              scale: [1, 1.2, 1],
              boxShadow: [
                `0 0 12px color-mix(in srgb, var(--nutrition-proteins) 40%, transparent)`,
                `0 0 20px color-mix(in srgb, var(--nutrition-proteins) 60%, transparent)`,
                `0 0 12px color-mix(in srgb, var(--nutrition-proteins) 40%, transparent)`
              ]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: celebrationActive ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <SpatialIcon Icon={ICONS.Activity} size={20} style={{ color: 'var(--nutrition-proteins)' }} />
          </motion.div>
          <motion.div 
            className="text-4xl font-bold mb-2"
            style={{ color: 'var(--nutrition-proteins)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: reduceMotion ? 'tween' : 'spring',
              stiffness: 300,
              delay: reduceMotion ? 0 : 0.3
            }}
          >
            {Math.round(analysisResults.macronutrients.proteins)}g
          </motion.div>
          <div className="text-white font-medium text-sm">Protéines</div>
          <div className="text-white/50 text-xs mt-1">Récupération</div>
        </motion.div>
        
        {/* Glucides */}
        <motion.div 
          className="text-center p-6 rounded-xl nutrition-stat-card"
          style={{
            background: `
              radial-gradient(circle at center, color-mix(in srgb, var(--nutrition-carbs) 20%, transparent) 0%, transparent 60%),
              rgba(255, 255, 255, 0.05)
            `,
            border: '2px solid color-mix(in srgb, var(--nutrition-carbs) 40%, transparent)',
            backdropFilter: 'blur(12px) saturate(140%)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              0 0 20px color-mix(in srgb, var(--nutrition-carbs) 20%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: reduceMotion ? 0.1 : 0.5, 
            delay: reduceMotion ? 0 : 0.2 
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.25),
              0 0 30px color-mix(in srgb, var(--nutrition-carbs) 30%, transparent)
            `
          }}
        >
          <motion.div
            className="w-10 h-10 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{
              background: `color-mix(in srgb, var(--nutrition-carbs) 25%, transparent)`,
              border: `1px solid color-mix(in srgb, var(--nutrition-carbs) 40%, transparent)`
            }}
            animate={celebrationActive ? {
              scale: [1, 1.2, 1],
              boxShadow: [
                `0 0 12px color-mix(in srgb, var(--nutrition-carbs) 40%, transparent)`,
                `0 0 20px color-mix(in srgb, var(--nutrition-carbs) 60%, transparent)`,
                `0 0 12px color-mix(in srgb, var(--nutrition-carbs) 40%, transparent)`
              ]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: celebrationActive ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <SpatialIcon Icon={ICONS.Zap} size={20} style={{ color: 'var(--nutrition-carbs)' }} />
          </motion.div>
          <motion.div 
            className="text-4xl font-bold mb-2"
            style={{ color: 'var(--nutrition-carbs)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: reduceMotion ? 'tween' : 'spring',
              stiffness: 300,
              delay: reduceMotion ? 0 : 0.4
            }}
          >
            {Math.round(analysisResults.macronutrients.carbs)}g
          </motion.div>
          <div className="text-white font-medium text-sm">Glucides</div>
          <div className="text-white/50 text-xs mt-1">Énergie rapide</div>
        </motion.div>
        
        {/* Lipides */}
        <motion.div 
          className="text-center p-6 rounded-xl nutrition-stat-card"
          style={{
            background: `
              radial-gradient(circle at center, color-mix(in srgb, var(--nutrition-fats) 20%, transparent) 0%, transparent 60%),
              rgba(255, 255, 255, 0.05)
            `,
            border: '2px solid color-mix(in srgb, var(--nutrition-fats) 40%, transparent)',
            backdropFilter: 'blur(12px) saturate(140%)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              0 0 20px color-mix(in srgb, var(--nutrition-fats) 20%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: reduceMotion ? 0.1 : 0.5, 
            delay: reduceMotion ? 0 : 0.3 
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.25),
              0 0 30px color-mix(in srgb, var(--nutrition-fats) 30%, transparent)
            `
          }}
        >
          <motion.div
            className="w-10 h-10 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{
              background: `color-mix(in srgb, var(--nutrition-fats) 25%, transparent)`,
              border: `1px solid color-mix(in srgb, var(--nutrition-fats) 40%, transparent)`
            }}
            animate={celebrationActive ? {
              scale: [1, 1.2, 1],
              boxShadow: [
                `0 0 12px color-mix(in srgb, var(--nutrition-fats) 40%, transparent)`,
                `0 0 20px color-mix(in srgb, var(--nutrition-fats) 60%, transparent)`,
                `0 0 12px color-mix(in srgb, var(--nutrition-fats) 40%, transparent)`
              ]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: celebrationActive ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.4
            }}
          >
            <SpatialIcon Icon={ICONS.Heart} size={20} style={{ color: 'var(--nutrition-fats)' }} />
          </motion.div>
          <motion.div 
            className="text-4xl font-bold mb-2"
            style={{ color: 'var(--nutrition-fats)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: reduceMotion ? 'tween' : 'spring',
              stiffness: 300,
              delay: reduceMotion ? 0 : 0.5
            }}
          >
            {Math.round(analysisResults.macronutrients.fats)}g
          </motion.div>
          <div className="text-white font-medium text-sm">Lipides</div>
          <div className="text-white/50 text-xs mt-1">Graisses saines</div>
        </motion.div>
      </div>

      {/* Confiance de l'Analyse Macros */}
      <motion.div 
        className="flex items-center justify-between p-5 rounded-xl confidence-indicator mt-6"
        style={{
          background: `
            linear-gradient(135deg, color-mix(in srgb, var(--nutrition-secondary) 20%, transparent), color-mix(in srgb, var(--nutrition-accent) 15%, transparent)),
            rgba(255, 255, 255, 0.05)
          `,
          border: '2px solid color-mix(in srgb, var(--nutrition-secondary) 40%, transparent)',
          backdropFilter: 'blur(16px) saturate(150%)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 30px color-mix(in srgb, var(--nutrition-secondary) 20%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: reduceMotion ? 0.1 : 0.6, 
          delay: reduceMotion ? 0 : 0.6 
        }}
      >
        <div className="flex items-center gap-2">
          <SpatialIcon 
            Icon={ICONS.BarChart3} 
            size={16} 
            style={{
              color: 'var(--nutrition-secondary)',
              filter: 'drop-shadow(0 0 8px color-mix(in srgb, var(--nutrition-secondary) 60%, transparent))'
            }}
          />
          <span className="text-white/90 text-sm font-medium">Répartition Macronutritionnelle</span>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg" style={{ color: 'var(--nutrition-secondary)' }}>
            {Math.round(
              (analysisResults.macronutrients.proteins + 
               analysisResults.macronutrients.carbs + 
               analysisResults.macronutrients.fats) / 3
            )}g
          </div>
          <div className="text-white/60 text-xs">Moyenne</div>
        </div>
      </motion.div>
    </GlassCard>
  );
};

export default MacronutrientsCard;