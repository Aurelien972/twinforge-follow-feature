import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import type { FridgeItem } from '../../../../domain/recipe';

interface InventoryItemProps {
  item: FridgeItem;
  index: number;
  isEditing: boolean;
  onEdit: (itemId: string, field: keyof FridgeItem, value: any) => void;
  onRemove: (itemId: string) => void;
  onStartEdit: (itemId: string) => void;
  onStopEdit: () => void;
}

/**
 * Inventory Item - Élément d'Inventaire Individuel
 * Composant pour afficher et éditer un ingrédient détecté
 */
const InventoryItem: React.FC<InventoryItemProps> = ({
  item,
  index,
  isEditing,
  onEdit,
  onRemove,
  onStartEdit,
  onStopEdit
}) => {
  const getCategoryColor = (category: string): string => {
    const categoryColors: Record<string, string> = {
      'Légumes': '#22C55E',
      'Fruits': '#F59E0B',
      'Viandes': '#EF4444',
      'Poissons': '#06B6D4',
      'Produits laitiers': '#8B5CF6',
      'Céréales': '#D97706',
      'Épices': '#EC4899',
      'Autre': '#6B7280'
    };
    return categoryColors[category] || '#6B7280';
  };

  const categoryColor = getCategoryColor(item.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <GlassCard className="glass-fridge-inventory-item">
        <div className="fridge-inventory-item-content">
          {/* Icône de Catégorie */}
          <div
            className="fridge-inventory-category-icon"
            style={{
              background: `color-mix(in srgb, ${categoryColor} 15%, transparent)`,
              borderColor: categoryColor
            }}
          >
            <SpatialIcon
              Icon={ICONS.Utensils}
              size={20}
              style={{ color: categoryColor }}
            />
          </div>

          {/* Informations de l'Ingrédient */}
          <div className="fridge-inventory-info">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onEdit(item.id, 'name', e.target.value)}
                  className="fridge-inventory-input"
                  placeholder="Nom de l'ingrédient"
                  autoFocus
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => onEdit(item.id, 'quantity', e.target.value)}
                    className="fridge-inventory-input"
                    placeholder="Quantité"
                  />
                  <select
                    value={item.category}
                    onChange={(e) => onEdit(item.id, 'category', e.target.value)}
                    className="fridge-inventory-input"
                  >
                    <option value="Légumes">Légumes</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Viandes">Viandes</option>
                    <option value="Poissons">Poissons</option>
                    <option value="Produits laitiers">Produits laitiers</option>
                    <option value="Céréales">Céréales</option>
                    <option value="Épices">Épices</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="fridge-inventory-name">{item.name}</h4>
                <div className="fridge-inventory-meta">
                  <span className="fridge-inventory-quantity">{item.quantity}</span>
                  <span
                    className="fridge-inventory-category-badge"
                    style={{
                      background: `color-mix(in srgb, ${categoryColor} 15%, transparent)`,
                      color: categoryColor
                    }}
                  >
                    {item.category}
                  </span>
                  {item.confidence < 0.7 && (
                    <span className="text-orange-400 text-xs flex items-center gap-1">
                      <SpatialIcon Icon={ICONS.AlertTriangle} size={10} />
                      Incertain
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

          {/* Actions */}
          <div className="fridge-inventory-actions">
            {isEditing ? (
              <button
                onClick={onStopEdit}
                className="fridge-inventory-btn"
                aria-label="Valider"
              >
                <SpatialIcon Icon={ICONS.Check} size={14} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onStartEdit(item.id)}
                  className="fridge-inventory-btn"
                  aria-label="Modifier"
                >
                  <SpatialIcon Icon={ICONS.Edit} size={14} />
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="fridge-inventory-btn hover:bg-red-500/20"
                  aria-label="Supprimer"
                >
                  <SpatialIcon Icon={ICONS.Trash2} size={14} className="text-red-400" />
                </button>
              </>
            )}
          </div>
      </GlassCard>
    </motion.div>
  );
};

export default InventoryItem;