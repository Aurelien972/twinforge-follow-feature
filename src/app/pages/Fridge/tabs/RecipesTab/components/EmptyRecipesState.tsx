import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';
import { useFridgeScanPipeline } from '../../../../../../system/store/fridgeScan';

interface EmptyRecipesStateProps {
  selectedInventoryId?: string;
  availableInventories: any[];
  hasSelectedInventory: boolean;
  onGenerateRecipes: () => void;
}

const EmptyRecipesState: React.FC<EmptyRecipesStateProps> = ({
  selectedInventoryId,
  availableInventories,
  hasSelectedInventory,
  onGenerateRecipes
}) => {
  const navigate = useNavigate();
  const { startScan } = useFridgeScanPipeline();

  const handleStartFridgeScan = () => {
    startScan();
    navigate('/fridge/scan');
  };

  // Dynamic content based on inventory availability
  const title = hasSelectedInventory 
    ? "Générer vos premières recettes"
    : "Votre bibliothèque de recettes est vide";
    
  const description = hasSelectedInventory
    ? "Vous avez un inventaire sélectionné. Générez des recettes personnalisées basées sur vos ingrédients disponibles."
    : "Commencez par scanner votre frigo pour générer des recettes personnalisées";
    
  const buttonText = hasSelectedInventory
    ? "Générer mes recettes"
    : "Scanner mon frigo pour générer des recettes";
    
  const buttonAction = hasSelectedInventory
    ? onGenerateRecipes
    : handleStartFridgeScan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 py-1"
    >
      <GlassCard 
        className="p-8"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(236, 72, 153, 0.15) 0%, 
            rgba(244, 114, 182, 0.08) 50%, 
            rgba(0, 0, 0, 0.4) 100%)`,
          borderColor: 'rgba(236, 72, 153, 0.3)',
          boxShadow: `
            0 0 30px rgba(236, 72, 153, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          backdropFilter: 'blur(20px) saturate(1.2)'
        }}
      >
        <div className="space-y-6 flex flex-col items-center">
          {/* Icon */}
          <div 
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, 
                rgba(236, 72, 153, 0.3) 0%, 
                rgba(244, 114, 182, 0.15) 70%, 
                transparent 100%)`,
              border: '1px solid rgba(236, 72, 153, 0.4)',
              boxShadow: `
                0 0 25px rgba(236, 72, 153, 0.3),
                0 4px 20px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
          >
            <SpatialIcon 
              Icon={hasSelectedInventory ? ICONS.Sparkles : ICONS.ChefHat} 
              size={48} 
              className="text-pink-400"
              style={{
                filter: `drop-shadow(0 0 12px rgba(236, 72, 153, 0.8)) 
                         drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))`
              }}
            />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {title}
            </h2>
            <p className="text-white/70 text-lg">
              {description}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="text-center space-y-3">
              <div 
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(236, 72, 153, 0.3) 0%, 
                    rgba(244, 114, 182, 0.1) 70%, 
                    transparent 100%)`,
                  border: '1px solid rgba(236, 72, 153, 0.4)',
                  boxShadow: `
                    0 0 20px rgba(236, 72, 153, 0.3),
                    0 4px 15px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <SpatialIcon 
                  Icon={hasSelectedInventory ? ICONS.Sparkles : ICONS.Camera} 
                  size={24} 
                  className="text-pink-400"
                  style={{
                    filter: `drop-shadow(0 0 8px rgba(236, 72, 153, 0.6)) 
                             drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))`
                  }}
                />
              </div>
              <h3 className="font-semibold text-white">
                {hasSelectedInventory ? "Génération par la Forge" : "Scanner intelligent"}
              </h3>
              <p className="text-white/60 text-sm">
                {hasSelectedInventory 
                  ? "Recettes créées par la Forge basées sur vos ingrédients"
                  : "Analysez automatiquement vos ingrédients disponibles"
                }
              </p>
            </div>

            <div className="text-center space-y-3">
              <div 
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(236, 72, 153, 0.3) 0%, 
                    rgba(244, 114, 182, 0.1) 70%, 
                    transparent 100%)`,
                  border: '1px solid rgba(236, 72, 153, 0.4)',
                  boxShadow: `
                    0 0 20px rgba(236, 72, 153, 0.3),
                    0 4px 15px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <SpatialIcon 
                  Icon={ICONS.Sparkles} 
                  size={24} 
                  className="text-pink-400"
                  style={{
                    filter: `drop-shadow(0 0 8px rgba(236, 72, 153, 0.6)) 
                             drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))`
                  }}
                />
              </div>
              <h3 className="font-semibold text-white">Forge personnalisée</h3>
              <p className="text-white/60 text-sm">
                Recettes adaptées à vos goûts et contraintes alimentaires
              </p>
            </div>

            <div className="text-center space-y-3">
              <div 
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, 
                    rgba(236, 72, 153, 0.3) 0%, 
                    rgba(244, 114, 182, 0.1) 70%, 
                    transparent 100%)`,
                  border: '1px solid rgba(236, 72, 153, 0.4)',
                  boxShadow: `
                    0 0 20px rgba(236, 72, 153, 0.3),
                    0 4px 15px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <SpatialIcon 
                  Icon={ICONS.Clock} 
                  size={24} 
                  className="text-pink-400"
                  style={{
                    filter: `drop-shadow(0 0 8px rgba(236, 72, 153, 0.6)) 
                             drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))`
                  }}
                />
              </div>
              <h3 className="font-semibold text-white">Zéro gaspillage</h3>
              <p className="text-white/60 text-sm">
                Utilisez tous vos ingrédients avant qu'ils ne périment
              </p>
            </div>
          </div>

          {/* 3D CTA Button */}
          <div className="pt-4">
            <button
              onClick={buttonAction}
              className="group relative px-8 py-4 text-white font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(236, 72, 153, 0.8) 0%, 
                  rgba(244, 114, 182, 0.9) 100%)`,
                border: '2px solid rgba(236, 72, 153, 0.6)',
                boxShadow: `
                  0 0 30px rgba(236, 72, 153, 0.4),
                  0 8px 25px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                `,
                backdropFilter: 'blur(10px) saturate(1.2)'
              }}
            >
              <div className="flex items-center gap-3">
                <SpatialIcon 
                  Icon={hasSelectedInventory ? ICONS.Sparkles : ICONS.Camera} 
                  size={24} 
                  className="group-hover:rotate-12 transition-transform duration-300"
                  style={{
                    color: 'white',
                    filter: `drop-shadow(0 0 10px rgba(236, 72, 153, 0.8)) 
                             drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3))`
                  }}
                />
                <span className="text-lg">{buttonText}</span>
              </div>
              
              {/* 3D Effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(236, 72, 153, 0.6) 0%, 
                    rgba(244, 114, 182, 0.6) 100%)`
                }}
              ></div>
            </button>
          </div>

          {/* Additional Info */}
          <div
            className="text-white/50 text-sm p-3 rounded-xl"
            style={{
              background: `radial-gradient(ellipse at center, 
                rgba(236, 72, 153, 0.1) 0%, 
                transparent 70%)`,
              border: '1px solid rgba(236, 72, 153, 0.2)',
              boxShadow: `0 0 15px rgba(236, 72, 153, 0.1)`
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <SpatialIcon 
                Icon={ICONS.Lightbulb} 
                size={16} 
                className="text-pink-400"
                style={{
                  filter: `drop-shadow(0 0 6px rgba(236, 72, 153, 0.6))`
                }}
              />
              <span>
                {hasSelectedInventory 
                  ? "Astuce : Vos recettes seront sauvegardées dans votre bibliothèque personnelle !"
                  : "Astuce : Plus votre frigo est rempli, plus vous aurez de recettes créatives !"
                }
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default EmptyRecipesState;