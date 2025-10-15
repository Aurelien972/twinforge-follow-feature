import React, { useState } from 'react';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useFeedback } from '../../../../hooks/useFeedback';
import { useToast } from '../../../../ui/components/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useFridgeScanPipeline } from '../../../../system/store/fridgeScan';
import { useMealPlanStore } from '../../../../system/store/mealPlanStore';
import type { FridgeItem } from '../../../../domain/recipe';
import logger from '../../../../lib/utils/logger';

interface ReviewEditActionsCardProps {
  userEditedInventory: FridgeItem[];
  onBack: () => void;
  handleManualExit: () => void;
  onValidateInventory: () => void;
}

/**
 * ReviewEditActionsCard - Dynamic CTA Component for ReviewEditStage
 * Manages the progression from inventory validation to recipe/meal plan generation
 */
const ReviewEditActionsCard: React.FC<ReviewEditActionsCardProps> = ({
  userEditedInventory,
  onBack,
  handleManualExit,
  onValidateInventory
}) => {
  const { click } = useFeedback();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { currentSessionId } = useFridgeScanPipeline();
  const { selectInventory, loadAvailableInventories } = useMealPlanStore();
  
  // Local state for inventory validation
  const [isInventoryValidated, setIsInventoryValidated] = useState(false);


  // Handle inventory validation - now calls the prop function
  const handleValidateInventoryClick = () => {
    onValidateInventory();
    setIsInventoryValidated(true);
  };

  // Handle meal plan generation
  const handleGenerateMealPlan = async () => {
    try {
      logger.info('REVIEW_EDIT_ACTIONS', 'Starting meal plan generation', {
        inventoryCount: userEditedInventory.length,
        timestamp: new Date().toISOString()
      });

      // Ensure inventory is selected in meal plan store
      if (currentSessionId) {
        selectInventory(currentSessionId);
      }
      
      // Navigate to plan tab
      navigate('/fridge#plan');
      
    } catch (error) {
      logger.error('REVIEW_EDIT_ACTIONS', 'Meal plan generation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        inventoryCount: userEditedInventory.length,
        timestamp: new Date().toISOString()
      });

      showToast({
        type: 'error',
        title: 'Erreur de Navigation',
        message: 'Impossible d\'accéder à l\'onglet plan. Veuillez réessayer.',
        duration: 4000
      });
    }
  };

  // Handle recipe generation
  const handleGenerateRecipes = async () => {
    try {
      logger.info('REVIEW_EDIT_ACTIONS', 'Starting recipe generation', {
        inventoryCount: userEditedInventory.length,
        timestamp: new Date().toISOString()
      });

      // Ensure inventory is selected in meal plan store
      if (currentSessionId) {
        selectInventory(currentSessionId);
      }
      
      // Navigate to recipes tab
      navigate('/fridge#recipes');
      
    } catch (error) {
      logger.error('REVIEW_EDIT_ACTIONS', 'Recipe generation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        inventoryCount: userEditedInventory.length,
        timestamp: new Date().toISOString()
      });

      showToast({
        type: 'error',
        title: 'Erreur de Navigation',
        message: 'Impossible d\'accéder à l\'onglet recettes. Veuillez réessayer.',
        duration: 4000
      });
    }
  };

  if (!isInventoryValidated) {
    // Initial state: Validation and Exit buttons
    return (
      <div className="space-y-4">
        {/* Validation CTA */}
        <GlassCard 
          className="p-6 text-center w-full"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, #10B981 15%, transparent) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, color-mix(in srgb, #059669 12%, transparent) 0%, transparent 50%),
              var(--glass-opacity)
            `,
            borderColor: 'color-mix(in srgb, #10B981 30%, transparent)',
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.25),
              0 0 30px color-mix(in srgb, #10B981 20%, transparent),
              inset 0 2px 0 rgba(255, 255, 255, 0.15)
            `
          }}
        >
          <div className="space-y-4">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center breathing-icon"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #10B981 35%, transparent), color-mix(in srgb, #10B981 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #10B981 50%, transparent)',
                boxShadow: '0 0 30px color-mix(in srgb, #10B981 40%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Check} size={32} style={{ color: '#10B981' }} />
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                Valider votre inventaire
              </h4>
              <p className="text-white/80 text-sm mb-4">
                {userEditedInventory.length} ingrédient{userEditedInventory.length > 1 ? 's' : ''} prêt{userEditedInventory.length > 1 ? 's' : ''} à être validé{userEditedInventory.length > 1 ? 's' : ''}. 
                Confirmez pour continuer.
              </p>
            </div>
            
            <button
              onClick={() => {
                click();
                handleValidateInventoryClick();
              }}
              disabled={userEditedInventory.length === 0}
              className="btn-glass--primary px-8 py-3 text-base font-medium"
              style={{
                background: `
                  linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)
                `,
                borderColor: 'color-mix(in srgb, #10B981 60%, transparent)',
                boxShadow: `
                  0 8px 32px rgba(16, 185, 129, 0.3),
                  0 0 20px color-mix(in srgb, #10B981 25%, transparent),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                color: 'white'
              }}
            >
              <div className="flex items-center gap-2">
                <SpatialIcon Icon={ICONS.Check} size={18} />
                <span>Valider l'inventaire</span>
              </div>
            </button>
          </div>
        </GlassCard>

        {/* Exit and Back buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={onBack}
            className="btn-glass--secondary-nav px-6 py-3"
          >
            <div className="flex items-center gap-2">
              <SpatialIcon Icon={ICONS.ArrowLeft} size={16} />
              <span>Retour</span>
            </div>
          </button>

          <button
            onClick={() => {
              click();
              handleManualExit();
            }}
            className="btn-glass--secondary-nav px-6 py-3"
          >
            <div className="flex items-center gap-2">
              <SpatialIcon Icon={ICONS.X} size={16} />
              <span>Quitter l'Atelier de Recettes</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Validated state: Generation buttons
  return (
    <GlassCard 
      className="p-6 text-center w-full"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, #A855F7 15%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, #EC4899 12%, transparent) 0%, transparent 50%),
          var(--glass-opacity)
        `,
        borderColor: 'color-mix(in srgb, #A855F7 30%, transparent)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          0 0 30px color-mix(in srgb, #A855F7 20%, transparent),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      }}
    >
      <div className="space-y-4">
        <div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center breathing-icon"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
              linear-gradient(135deg, color-mix(in srgb, #A855F7 35%, transparent), color-mix(in srgb, #A855F7 25%, transparent))
            `,
            border: '2px solid color-mix(in srgb, #A855F7 50%, transparent)',
            boxShadow: '0 0 30px color-mix(in srgb, #A855F7 40%, transparent)'
          }}
        >
          <SpatialIcon Icon={ICONS.Utensils} size={32} style={{ color: '#A855F7' }} />
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-white mb-2">
            Générer un plan repas ou des recettes
          </h4>
          <p className="text-white/80 text-sm mb-4">
            Inventaire validé ! Choisissez votre option préférée.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              click();
              handleGenerateMealPlan();
            }}
            className="btn-glass--primary px-6 py-3 text-base font-medium"
          >
            <div className="flex items-center gap-2">
              <SpatialIcon Icon={ICONS.Calendar} size={18} />
              <span>Générer un plan repas</span>
            </div>
          </button>
          
          <button
            onClick={() => {
              click();
              handleGenerateRecipes();
            }}
            className="btn-glass--primary px-6 py-3 text-base font-medium"
          >
            <div className="flex items-center gap-2">
              <SpatialIcon Icon={ICONS.Sparkles} size={18} />
              <span>Générer des recettes</span>
            </div>
          </button>
          
          <button
            onClick={() => {
              click();
              navigate('/');
            }}
            className="btn-glass--secondary-nav px-6 py-3 text-base font-medium"
          >
            <div className="flex items-center gap-2">
              <SpatialIcon Icon={ICONS.Home} size={18} />
              <span>Tableau de bord</span>
            </div>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default ReviewEditActionsCard;