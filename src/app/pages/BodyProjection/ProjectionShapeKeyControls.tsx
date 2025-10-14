import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Settings, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import logger from '../../../lib/utils/logger';

interface ShapeKeyControl {
  key: string;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
}

const SHAPE_KEY_CONTROLS: ShapeKeyControl[] = [
  {
    key: 'emaciated',
    label: 'Gabarit (Épaisseur/Émacié)',
    description: 'Contrôle l\'épaisseur générale des membres',
    min: -1,
    max: 0,
    step: 0.05
  },
  {
    key: 'pearFigure',
    label: 'Masse Grasse (Gras/Squelettique)',
    description: 'Distribution de la masse grasse',
    min: -1,
    max: 1,
    step: 0.05
  },
  {
    key: 'bodybuilderSize',
    label: 'Développement Musculaire',
    description: 'Taille et volume musculaire général',
    min: 0,
    max: 1,
    step: 0.05
  },
  {
    key: 'bodybuilderDetails',
    label: 'Détails Musculaires',
    description: 'Définition et détails des muscles',
    min: 0,
    max: 1,
    step: 0.05
  }
];

interface ProjectionShapeKeyControlsProps {
  currentMorphData: Record<string, number>;
  onMorphChange: (morphData: Record<string, number>) => void;
  onReset: () => void;
  disabled?: boolean;
}

export const ProjectionShapeKeyControls: React.FC<ProjectionShapeKeyControlsProps> = ({
  currentMorphData,
  onMorphChange,
  onReset,
  disabled = false
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [modifiedKeys, setModifiedKeys] = useState<Set<string>>(new Set());

  const handleSliderChange = useCallback((key: string, value: number) => {
    const newMorphData = {
      ...currentMorphData,
      [key]: value
    };
    onMorphChange(newMorphData);
    setModifiedKeys(prev => new Set([...prev, key]));

    logger.debug('PROJECTION_SHAPE_CONTROLS', 'Shape key adjusted', {
      key,
      value: value.toFixed(3),
      philosophy: 'manual_shape_key_adjustment'
    });
  }, [currentMorphData, onMorphChange]);

  const handleReset = useCallback(() => {
    onReset();
    setModifiedKeys(new Set());
    logger.info('PROJECTION_SHAPE_CONTROLS', 'All shape keys reset', {
      philosophy: 'shape_keys_reset'
    });
  }, [onReset]);

  const modifiedCount = modifiedKeys.size;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h4 className="text-white font-semibold">Ajustements Morphologiques</h4>
            <p className="text-xs text-white/60">
              Affinez manuellement les clés de formes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {modifiedCount > 0 && (
            <button
              onClick={handleReset}
              disabled={disabled}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg
                         transition-colors text-sm flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              title="Réinitialiser tous les ajustements"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Réinitialiser</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center
                       justify-center transition-colors"
            title={isExpanded ? 'Réduire' : 'Développer'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-white" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Info Badge */}
      {modifiedCount > 0 && (
        <div className="px-3 py-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
          <p className="text-sm text-blue-300">
            {modifiedCount} clé{modifiedCount > 1 ? 's' : ''} modifiée{modifiedCount > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Controls */}
      {isExpanded && (
        <div className="space-y-4 pt-2">
          {SHAPE_KEY_CONTROLS.map((control) => {
            const currentValue = currentMorphData[control.key] || 0;
            const isModified = modifiedKeys.has(control.key);

            return (
              <div
                key={control.key}
                className={`p-4 rounded-lg border transition-colors ${
                  isModified
                    ? 'bg-blue-500/10 border-blue-400/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {/* Label and Value */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-white">
                        {control.label}
                      </label>
                      {isModified && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      {control.description}
                    </p>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-lg text-sm font-mono min-w-[70px] text-center ${
                      isModified
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-white/10 text-white/80'
                    }`}
                  >
                    {currentValue.toFixed(2)}
                  </div>
                </div>

                {/* Slider */}
                <div className="relative">
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={currentValue}
                    onChange={(e) => handleSliderChange(control.key, Number(e.target.value))}
                    disabled={disabled}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer
                               disabled:opacity-50 disabled:cursor-not-allowed
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-4
                               [&::-webkit-slider-thumb]:h-4
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-purple-400
                               [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:shadow-lg
                               [&::-webkit-slider-thumb]:hover:bg-purple-300
                               [&::-webkit-slider-thumb]:transition-colors
                               [&::-webkit-slider-thumb]:disabled:bg-gray-400"
                  />

                  {/* Range Labels */}
                  <div className="flex justify-between text-xs text-white/50 mt-2">
                    <span>{control.min}</span>
                    <span>{control.max}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Collapsed State Info */}
      {!isExpanded && modifiedCount > 0 && (
        <div className="text-center py-2">
          <p className="text-sm text-white/60">
            {modifiedCount} ajustement{modifiedCount > 1 ? 's' : ''} appliqué{modifiedCount > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Help Text */}
      {isExpanded && (
        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-white/60 leading-relaxed">
            <strong className="text-white/80">Astuce:</strong> Ces contrôles affinent la projection
            calculée automatiquement. Utilisez-les pour ajuster précisément la morphologie selon vos
            préférences personnelles.
          </p>
        </div>
      )}
    </motion.div>
  );
};
