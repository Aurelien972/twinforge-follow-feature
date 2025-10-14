// src/ui/components/face/FaceShapeControls.tsx
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpatialIcon from '../../icons/SpatialIcon';
import { ICONS } from '../../icons/registry';
import GlassCard from '../../cards/GlassCard';
import {
  FACE_SHAPE_KEYS_MAPPING,
  type FaceShapeCategory,
  type FaceShapeKeyConfig
} from '../../../config/faceShapeKeysMapping';

interface FaceShapeControlsProps {
  currentValues: Record<string, number>;
  onValuesChange: (values: Record<string, number>) => void;
  onSave: () => void;
  isSaving?: boolean;
  saveError?: string | null;
}

/**
 * Composant de contrôle des formes faciales
 * Permet aux utilisateurs d'ajuster leur visage avec des sliders intuitifs en français
 */
const FaceShapeControls: React.FC<FaceShapeControlsProps> = ({
  currentValues,
  onValuesChange,
  onSave,
  isSaving = false,
  saveError = null
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('face_shape');
  const [hasChanges, setHasChanges] = useState(false);
  const [localValues, setLocalValues] = useState(currentValues);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Update local values when currentValues change from external source
  React.useEffect(() => {
    setLocalValues(currentValues);
  }, [currentValues]);

  // Gérer le changement d'une valeur avec debouncing pour les performances
  const handleValueChange = useCallback((key: string, value: number) => {
    // Update local state immediately for responsive UI
    const newValues = { ...localValues, [key]: value };
    setLocalValues(newValues);
    setHasChanges(true);

    // Debounce the actual morph update to reduce 3D viewer strain
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      onValuesChange(newValues);
    }, 100); // 100ms debounce - responsive but not overwhelming
  }, [localValues, onValuesChange]);

  // Cleanup debounce timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Réinitialiser une catégorie
  const handleResetCategory = useCallback((category: FaceShapeCategory) => {
    const newValues = { ...localValues };
    category.keys.forEach(keyConfig => {
      newValues[keyConfig.key] = keyConfig.default;
    });
    setLocalValues(newValues);
    onValuesChange(newValues);
    setHasChanges(true);
  }, [localValues, onValuesChange]);

  // Réinitialiser tout
  const handleResetAll = useCallback(() => {
    const newValues: Record<string, number> = {};
    FACE_SHAPE_KEYS_MAPPING.forEach(category => {
      category.keys.forEach(keyConfig => {
        newValues[keyConfig.key] = keyConfig.default;
      });
    });
    onValuesChange(newValues);
    setHasChanges(true);
  }, [onValuesChange]);

  // Sauvegarder
  const handleSave = useCallback(() => {
    onSave();
    setHasChanges(false);
  }, [onSave]);

  // Basculer l'expansion d'une catégorie
  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  }, []);

  return (
    <div className="space-y-4">
      {/* En-tête avec boutons d'action */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold text-lg">Ajuster votre visage</h3>
            <p className="text-white/60 text-sm mt-1">
              Personnalisez les traits de votre avatar facial
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAll}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex items-center gap-2">
                <SpatialIcon Icon={ICONS.RotateCcw} size={16} />
                <span>Réinitialiser</span>
              </div>
            </button>
            {hasChanges && (
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.85), rgba(236, 72, 153, 0.70))',
                  border: '2px solid #EC4899',
                  boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center gap-2">
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sauvegarde...</span>
                    </>
                  ) : (
                    <>
                      <SpatialIcon Icon={ICONS.Save} size={16} />
                      <span>Enregistrer</span>
                    </>
                  )}
                </div>
              </motion.button>
            )}
          </div>
        </div>

        {hasChanges && !saveError && (
          <motion.div
            className="flex items-center gap-2 text-xs text-orange-300 bg-orange-500/10 border border-orange-400/20 rounded-lg px-3 py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SpatialIcon Icon={ICONS.AlertCircle} size={14} />
            <span>Modifications non enregistrées</span>
          </motion.div>
        )}

        {saveError && (
          <motion.div
            className="flex items-center justify-between gap-2 text-xs text-red-300 bg-red-500/10 border border-red-400/20 rounded-lg px-3 py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <SpatialIcon Icon={ICONS.AlertCircle} size={14} />
              <span>Erreur de sauvegarde: {saveError}</span>
            </div>
            <button
              onClick={onSave}
              disabled={isSaving}
              className="px-2 py-1 rounded text-xs font-medium text-red-200 hover:text-white hover:bg-red-500/20 transition-colors"
            >
              Réessayer
            </button>
          </motion.div>
        )}
      </GlassCard>

      {/* Catégories de contrôles */}
      <div className="space-y-3">
        {FACE_SHAPE_KEYS_MAPPING.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            currentValues={currentValues}
            isExpanded={expandedCategory === category.id}
            onToggle={() => toggleCategory(category.id)}
            onValueChange={handleValueChange}
            onReset={() => handleResetCategory(category)}
          />
        ))}
      </div>
    </div>
  );
};

// Composant pour une section de catégorie (memoized to prevent re-renders of collapsed sections)
interface CategorySectionProps {
  category: FaceShapeCategory;
  currentValues: Record<string, number>;
  isExpanded: boolean;
  onToggle: () => void;
  onValueChange: (key: string, value: number) => void;
  onReset: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = React.memo(({
  category,
  currentValues,
  isExpanded,
  onToggle,
  onValueChange,
  onReset
}) => {
  const iconName = category.icon as keyof typeof ICONS;
  const Icon = ICONS[iconName] || ICONS.Circle;

  return (
    <GlassCard className="overflow-hidden" interactive={false}>
      {/* En-tête de la catégorie */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(236, 72, 153, 0.15))',
              border: '2px solid rgba(236, 72, 153, 0.4)',
              boxShadow: '0 0 15px rgba(236, 72, 153, 0.2)'
            }}
          >
            <SpatialIcon Icon={Icon} size={18} style={{ color: '#EC4899' }} />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold">{category.label}</div>
            <div className="text-white/50 text-xs">
              {category.keys.length} paramètre{category.keys.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Réinitialiser cette catégorie"
          >
            <SpatialIcon Icon={ICONS.RotateCcw} size={14} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          </button>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <SpatialIcon Icon={ICONS.ChevronDown} size={20} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          </motion.div>
        </div>
      </button>

      {/* Contenu des sliders */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-white/10">
              {category.keys.map((keyConfig) => (
                <ShapeKeySlider
                  key={keyConfig.key}
                  config={keyConfig}
                  value={currentValues[keyConfig.key] ?? keyConfig.default}
                  onChange={(value) => onValueChange(keyConfig.key, value)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if expanded state or relevant values change
  if (prevProps.isExpanded !== nextProps.isExpanded) return false;
  if (prevProps.category.id !== nextProps.category.id) return false;

  // If collapsed, skip value comparison (no need to re-render)
  if (!nextProps.isExpanded) return true;

  // If expanded, check if any category values changed
  return prevProps.category.keys.every(
    key => prevProps.currentValues[key.key] === nextProps.currentValues[key.key]
  );
});

// Composant pour un slider individuel
interface ShapeKeySliderProps {
  config: FaceShapeKeyConfig;
  value: number;
  onChange: (value: number) => void;
}

const ShapeKeySlider: React.FC<ShapeKeySliderProps> = ({ config, value, onChange }) => {
  const percentage = ((value - config.min) / (config.max - config.min)) * 100;
  const isModified = Math.abs(value - config.default) > 0.01;

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-white text-sm font-medium flex items-center gap-2">
            {config.label}
            {isModified && (
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            )}
          </div>
          {config.description && (
            <div className="text-white/50 text-xs mt-0.5">{config.description}</div>
          )}
        </div>
        <div className="text-white/80 text-sm font-mono min-w-[3rem] text-right">
          {value.toFixed(2)}
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right,
              rgba(236, 72, 153, 0.6) 0%,
              rgba(236, 72, 153, 0.8) ${percentage}%,
              rgba(255, 255, 255, 0.1) ${percentage}%,
              rgba(255, 255, 255, 0.1) 100%)`,
            outline: 'none'
          }}
        />
        {/* Marqueur de valeur par défaut */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-white/30"
          style={{
            left: `${((config.default - config.min) / (config.max - config.min)) * 100}%`
          }}
        />
      </div>

      {/* Bouton de réinitialisation rapide */}
      {isModified && (
        <motion.button
          onClick={() => onChange(config.default)}
          className="mt-2 text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <SpatialIcon Icon={ICONS.RotateCcw} size={12} />
          <span>Réinitialiser</span>
        </motion.button>
      )}
    </div>
  );
};

export default FaceShapeControls;
