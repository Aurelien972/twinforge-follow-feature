import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFeedback } from '@/hooks';
import { useToast } from '../../../../ui/components/ToastProvider';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import SuggestedItemsCard from '../components/SuggestedItemsCard';
import type { FridgeItem } from '../../../../domain/recipe';
import type { SuggestedFridgeItem } from '../../../../system/store/fridgeScan/types';
import logger from '../../../../lib/utils/logger';

interface ComplementStageProps {
  userEditedInventory: FridgeItem[];
  suggestedComplementaryItems: SuggestedFridgeItem[];
  addSelectedComplementaryItems: (items: FridgeItem[]) => void;
  onContinueToValidation: () => void;
  onBackToPhoto: () => void;
}

const ComplementStage: React.FC<ComplementStageProps> = ({
  userEditedInventory,
  suggestedComplementaryItems,
  addSelectedComplementaryItems,
  onContinueToValidation,
  onBackToPhoto
}) => {
  const { click, success } = useFeedback();
  const { showToast } = useToast();
  const [hasUnaddedSelections, setHasUnaddedSelections] = useState(false);

  const handleAddSelectedItems = (selectedItems: FridgeItem[]) => {
    logger.info('COMPLEMENT_STAGE', 'Adding selected complementary items', {
      selectedItemsCount: selectedItems.length,
      selectedItems: selectedItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity
      })),
      timestamp: new Date().toISOString()
    });

    addSelectedComplementaryItems(selectedItems);
    success();
    setHasUnaddedSelections(false); // Reset state after adding items
    
    showToast({
      type: 'success',
      title: 'Ingrédients ajoutés !',
      message: `${selectedItems.length} ingrédient${selectedItems.length > 1 ? 's' : ''} ajouté${selectedItems.length > 1 ? 's' : ''} à votre inventaire`,
      duration: 3000
    });

    // Auto-redirect to validation after adding items
    setTimeout(() => {
      onContinueToValidation();
    }, 1000); // Small delay to let user see the success toast
  };

  const handleContinueToValidation = () => {
    click();
    logger.info('COMPLEMENT_STAGE', 'User chose to continue to validation', {
      currentInventoryCount: userEditedInventory.length,
      suggestedItemsCount: suggestedComplementaryItems.length,
      hasUnaddedSelections,
      timestamp: new Date().toISOString()
    });
    onContinueToValidation();
  };

  const handleBackToPhoto = () => {
    click();
    logger.info('COMPLEMENT_STAGE', 'User chose to go back to photo capture', {
      timestamp: new Date().toISOString()
    });
    onBackToPhoto();
  };

  return (
    <div className="glass-card p-6 space-y-6"
         style={{
           background: `
             radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-fridge-primary, #EC4899) 15%, transparent) 0%, transparent 60%),
             radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--color-plasma-cyan, #18E3FF) 12%, transparent) 0%, transparent 50%),
             var(--glass-opacity)
           `,
           borderColor: 'color-mix(in srgb, var(--color-fridge-primary, #EC4899) 30%, transparent)',
           boxShadow: `
             0 12px 40px rgba(0, 0, 0, 0.25),
             0 0 30px color-mix(in srgb, var(--color-fridge-primary, #EC4899) 20%, transparent),
             inset 0 2px 0 rgba(255, 255, 255, 0.15)
           `
         }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Information Card */}
        <div className="glass-card p-4"
             style={{
               background: `
                 radial-gradient(circle at 30% 20%, color-mix(in srgb, #8B5CF6 15%, transparent) 0%, transparent 60%),
                 var(--glass-opacity)
               `,
               borderColor: 'color-mix(in srgb, #8B5CF6 30%, transparent)'
             }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full breathing-icon flex items-center justify-center"
                   style={{
                     background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(168, 85, 247, 0.25) 100%)',
                     border: '1px solid rgba(147, 51, 234, 0.3)',
                     boxShadow: '0 0 20px rgba(147, 51, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                     backdropFilter: 'blur(10px)'
                   }}>
                <SpatialIcon Icon={ICONS.AlertCircle} size={20} className="text-purple-400" glowColor="rgba(147, 51, 234, 0.6)" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-semibold text-white mb-2">
                Inventaire Insuffisant Détecté
              </h3>
              <p className="text-sm text-gray-300">
                Votre frigo contient seulement <span className="font-semibold text-purple-400">{userEditedInventory.length} ingrédients</span>.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-3 text-center">
            Pour optimiser vos possibilités culinaires, nous vous suggérons d'ajouter quelques ingrédients complémentaires.
          </p>
        </div>

        {/* Suggested Items Card */}
        {suggestedComplementaryItems.length > 0 && (
          <SuggestedItemsCard
            suggestedItems={suggestedComplementaryItems}
            onAddSelectedItems={handleAddSelectedItems}
            onSelectionChange={setHasUnaddedSelections}
          />
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleContinueToValidation}
            className="flex-1 btn-glass--primary px-6 py-4"
          >
            <div className="flex items-center justify-center gap-3">
              <SpatialIcon Icon={ICONS.ArrowRight} size={20} />
              <span className="font-medium">Continuer la Validation</span>
            </div>
          </button>
          
          <button
            onClick={handleBackToPhoto}
            className="flex-1 btn-glass--secondary-nav px-6 py-4"
          >
            <div className="flex items-center justify-center gap-3">
              <SpatialIcon Icon={ICONS.Camera} size={20} />
              <span className="font-medium">Reprendre des Photos</span>
            </div>
          </button>
        </div>

        {/* Dynamic guidance text */}
        {hasUnaddedSelections && (
          <div className="text-center">
            <p className="text-sm text-orange-300 bg-orange-500/10 border border-orange-500/20 rounded-lg px-4 py-2">
              💡 Vous avez sélectionné des aliments mais ne les avez pas encore ajoutés. 
              Cliquez sur "Ajouter X aliments" ou continuez sans les ajouter.
            </p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="glass-card p-4"
             style={{
               background: `
                 radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-plasma-cyan, #18E3FF) 15%, transparent) 0%, transparent 60%),
                 var(--glass-opacity)
               `,
               borderColor: 'color-mix(in srgb, var(--color-plasma-cyan, #18E3FF) 30%, transparent)'
             }}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">{userEditedInventory.length}</div>
              <div className="text-sm text-gray-400">Ingrédients détectés</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{suggestedComplementaryItems.length}</div>
              <div className="text-sm text-gray-400">Suggestions disponibles</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplementStage;