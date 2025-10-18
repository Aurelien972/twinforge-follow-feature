import React, { useState, useCallback, useMemo, useRef } from 'react';
import { ConditionalMotion } from '../../../../../lib/motion/ConditionalMotion';
import { useBodyScanPerformance } from '../../../../../hooks/useBodyScanPerformance';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../hooks/useFeedback';
import type { MorphologyMappingData } from '../../../../../hooks/useMorphologyMapping';
import type { MorphPolicy } from '../../../../../lib/morph/constraints';
import { useDebounce } from '../../../../../lib/utils/hooks';
import logger from '../../../../../lib/utils/logger';

const ADJUSTMENT_STEP = 0.05;

const KEY_MORPHS = {
  bodyShape: [
    { key: 'bodybuilderSize', label: 'Développement musculaire', icon: 'Zap' as const, color: '#8B5CF6' },
    { key: 'pearFigure', label: 'Masse grasse', icon: 'Triangle' as const, color: '#F59E0B' },
    { key: 'narrowWaist', label: 'Tour de taille', icon: 'Minimize2' as const, color: '#10B981' },
    { key: 'emaciated', label: 'Gabarit', icon: 'Minus' as const, color: '#06B6D4' },
  ],
  curves: [
    { key: 'bigHips', label: 'Hanches', icon: 'Circle' as const, color: '#EC4899' },
    { key: 'assLarge', label: 'Fessiers', icon: 'Circle' as const, color: '#F97316' },
  ],
  chest: []
};

interface MorphAdjustmentControlsProps {
  currentMorphData: Record<string, number>;
  setCurrentMorphData: (morphData: Record<string, number>) => void;
  resetMorphsToInitial: () => void;
  morphPolicy: MorphPolicy;
  morphologyMapping: MorphologyMappingData;
  resolvedGender: 'male' | 'female';
  isViewerReady: boolean;
  avatar3DRef: React.RefObject<any>;
}

function getAvailableMorphs(
  gender: 'male' | 'female',
  morphPolicy: MorphPolicy
): Array<{ key: string; label: string; icon: keyof typeof ICONS; color: string; category: string }> {
  const availableMorphs: Array<{ key: string; label: string; icon: keyof typeof ICONS; color: string; category: string }> = [];
  
  KEY_MORPHS.bodyShape.forEach(morph => {
    const range = morphPolicy.ranges[morph.key];
    if (range && !(range.min === 0 && range.max === 0)) {
      availableMorphs.push({ ...morph, category: 'Corps' });
    }
  });

  KEY_MORPHS.curves.forEach(morph => {
    const range = morphPolicy.ranges[morph.key];
    if (range && !(range.min === 0 && range.max === 0)) {
      availableMorphs.push({ ...morph, category: 'Courbes' });
    }
  });

  KEY_MORPHS.chest.forEach(morph => {
    const range = morphPolicy.ranges[morph.key];
    if (range && !(range.min === 0 && range.max === 0)) {
      availableMorphs.push({ ...morph, category: 'Poitrine' });
    }
  });

  return availableMorphs;
}

const MorphAdjustmentControls: React.FC<MorphAdjustmentControlsProps> = React.memo(({
  currentMorphData,
  setCurrentMorphData,
  resetMorphsToInitial,
  morphPolicy,
  morphologyMapping,
  resolvedGender,
  isViewerReady,
  avatar3DRef
}) => {
  const performanceConfig = useBodyScanPerformance();
  const [isExpanded, setIsExpanded] = useState(false);
  const [adjustedMorphs, setAdjustedMorphs] = useState<Set<string>>(new Set());
  const { click, formInput } = useFeedback();
  
  const debouncedMorphData = useDebounce(currentMorphData, 50);

  const availableMorphs = useMemo(() =>
    getAvailableMorphs(resolvedGender, morphPolicy),
    [resolvedGender, morphPolicy]
  );

  React.useEffect(() => {
    if (isViewerReady && avatar3DRef.current?.updateMorphData) {
      logger.debug('MORPH_ADJUSTMENT', 'Applying debounced morph data to 3D viewer', {
        morphDataKeys: Object.keys(debouncedMorphData),
        resolvedGender,
      });
      avatar3DRef.current.updateMorphData(debouncedMorphData);
    }
  }, [debouncedMorphData, isViewerReady, avatar3DRef, resolvedGender]);

  const handleMorphChange = useCallback((morphKey: string, newValue: number) => {
    const range = morphPolicy.ranges[morphKey];
    if (!range) return;

    const clampedValue = Math.max(range.min, Math.min(range.max, newValue));

    const newMorphData = {
      ...currentMorphData,
      [morphKey]: clampedValue
    };
    setCurrentMorphData(newMorphData);
    setAdjustedMorphs(prev => new Set([...prev, morphKey]));

    try {
      formInput();
    } catch (audioError) {
      console.warn('MORPH_ADJUSTMENT', 'Audio feedback failed for button click', { audioError });
    }

    logger.debug('MORPH_ADJUSTMENT', 'Morph value updated with direct 3D update', {
      morphKey,
      value: clampedValue.toFixed(3),
      resolvedGender,
      philosophy: 'direct_3d_morph_update'
    });
  }, [currentMorphData, setCurrentMorphData, setAdjustedMorphs, formInput, morphPolicy.ranges, resolvedGender]);

  const handleIncrement = useCallback((morphKey: string) => {
    const currentValue = currentMorphData[morphKey] !== undefined && currentMorphData[morphKey] !== null
      ? currentMorphData[morphKey]
      : 0;
    const newValue = currentValue + ADJUSTMENT_STEP;
    handleMorphChange(morphKey, newValue);
  }, [currentMorphData, handleMorphChange]);

  const handleDecrement = useCallback((morphKey: string) => {
    const currentValue = currentMorphData[morphKey] !== undefined && currentMorphData[morphKey] !== null
      ? currentMorphData[morphKey]
      : 0;
    const newValue = currentValue - ADJUSTMENT_STEP;
    handleMorphChange(morphKey, newValue);
  }, [currentMorphData, handleMorphChange]);

  const handleResetAll = useCallback(() => {
    click();
    setAdjustedMorphs(new Set());
    resetMorphsToInitial();
  }, [resetMorphsToInitial, click, setAdjustedMorphs]);

  const morphsByCategory = useMemo(() => {
    const grouped: Record<string, typeof availableMorphs> = {};
    availableMorphs.forEach(morph => {
      if (!grouped[morph.category]) {
        grouped[morph.category] = [];
      }
      grouped[morph.category].push(morph);
    });
    return grouped;
  }, [availableMorphs]);

  // Calculate total hidden morphs for the button text
  const totalHiddenMorphs = useMemo(() => {
    const corpsMorphs = morphsByCategory['Corps'] || [];
    const otherCategories = Object.entries(morphsByCategory).filter(([category]) => category !== 'Corps');
    const hiddenCorpsMorphs = Math.max(0, corpsMorphs.length - 2);
    const hiddenOtherMorphs = otherCategories.reduce((total, [, morphs]) => total + morphs.length, 0);
    return hiddenCorpsMorphs + hiddenOtherMorphs;
  }, [morphsByCategory]);

  if (!isViewerReady || availableMorphs.length === 0) {
    return null;
  }

  const corpsMorphs = morphsByCategory['Corps'] || [];
  const otherCategories = Object.entries(morphsByCategory).filter(([category]) => category !== 'Corps');

  return (
    <ConditionalMotion
      className="slide-enter"
      initial={performanceConfig.enableInitialAnimations ? { opacity: 0, y: 20 } : false}
      animate={performanceConfig.enableInitialAnimations ? { opacity: 1, y: 0 } : { opacity: 1 }}
      transition={performanceConfig.enableFramerMotion ? { duration: 0.6, delay: 0.4 } : undefined}
    >
      <GlassCard className="morph-adjustment-card">
        <div className="bodyscan-flex-between mb-6">
          <h4 className="text-white font-semibold bodyscan-flex-center bodyscan-gap-sm">
            {/* Icon container with glowing effect */}
            <div 
              className="bodyscan-header-icon-container"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, var(--color-body-scan-accent) 35%, transparent), color-mix(in srgb, var(--color-body-scan-accent) 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, var(--color-body-scan-accent) 50%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, var(--color-body-scan-accent) 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Settings} size={20} style={{ color: 'var(--color-body-scan-accent)' }} variant="pure" />
            </div>
            Ajustements morphologiques
            {adjustedMorphs.size > 0 && (
              <span className="morph-adjustment-badge">
                {adjustedMorphs.size} modifié{adjustedMorphs.size > 1 ? 's' : ''}
              </span>
            )}
          </h4>
          
          <div className="bodyscan-flex-center bodyscan-gap-sm">
            {adjustedMorphs.size > 0 && (
              <button
                onClick={handleResetAll}
                className="btn-glass px-4 py-2 text-sm bodyscan-flex-center bodyscan-gap-sm"
                title="Réinitialiser tous les ajustements"
              >
                <SpatialIcon Icon={ICONS.RotateCcw} size={14} />
                <span>Réinitialiser</span>
              </button>
            )}
            <button
              onClick={() => {
                click();
                setIsExpanded(!isExpanded);
              }}
              className="btn-glass--secondary-nav"
            >
              <SpatialIcon 
                Icon={isExpanded ? ICONS.ChevronUp : ICONS.ChevronDown} 
                size={18} 
                className="bodyscan-text-warning" 
              />
            </button>
          </div>
        </div>

        {/* Info text */}
        <p className="text-white/70 text-sm mb-6">
          Ajustez subtilement votre avatar en temps réel. Les modifications sont appliquées instantanément au modèle 3D.
        </p>

        {/* Corps category - always visible with first 2 morphs */}
        {corpsMorphs.length > 0 && (
          <div className="mb-6">
            <h5 className="glowing-title-text bodyscan-flex-center bodyscan-gap-sm mb-4">
              <div className="bodyscan-header-icon-container">
                <SpatialIcon Icon={ICONS.Circle} size={16} className="bodyscan-text-accent" />
              </div>
              Corps
            </h5>
            
            <div className="space-y-3">
              {corpsMorphs.slice(0, isExpanded ? corpsMorphs.length : 2).map((morph, index) => {
                const range = morphPolicy.ranges[morph.key];
                if (!range) return null;

                const currentValue = currentMorphData[morph.key] !== undefined && currentMorphData[morph.key] !== null
                  ? currentMorphData[morph.key]
                  : 0;

                const canDecrement = currentValue > range.min;
                const canIncrement = currentValue < range.max;
                const isAdjusted = adjustedMorphs.has(morph.key);

                return (
                  <ConditionalMotion
                    key={morph.key}
                    className={`glass-nested-card glass-field-container p-4 ${isAdjusted ? 'ring-2 ring-blue-400/30' : ''}`}
                    initial={performanceConfig.enableStaggerAnimations ? { opacity: 0, x: -20 } : false}
                    animate={performanceConfig.enableStaggerAnimations ? { opacity: 1, x: 0 } : { opacity: 1 }}
                    transition={performanceConfig.enableFramerMotion ? { delay: 0.1 * index, duration: 0.4 } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SpatialIcon 
                          Icon={ICONS[morph.icon] || ICONS.Circle} 
                          size={16} 
                          style={{ color: morph.color }}
                          variant="pure"
                        />
                        <span className="text-white font-medium">
                          {morph.label}
                        </span>
                        {isAdjusted && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDecrement(morph.key)}
                          disabled={!canDecrement}
                          className={`btn-glass--secondary-nav w-8 h-8 flex items-center justify-center ${
                            !canDecrement ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                          title="Diminuer"
                        >
                          <SpatialIcon 
                            Icon={ICONS.Minus} 
                            size={14} 
                          />
                        </button>
                        
                        <div
                          className={`glass-field-container px-3 py-1 min-w-[60px] text-center text-sm font-mono ${
                            isAdjusted ? 'text-blue-300' : 'text-white/80'
                          }`}
                          title={currentValue.toFixed(2)}
                        >
                          {currentValue.toFixed(2)}
                        </div>

                        <button
                          onClick={() => handleIncrement(morph.key)}
                          disabled={!canIncrement}
                          className={`btn-glass--secondary-nav w-8 h-8 flex items-center justify-center ${
                            !canIncrement ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                          title="Augmenter"
                        >
                          <SpatialIcon 
                            Icon={ICONS.Plus} 
                            size={14} 
                          />
                        </button>
                      </div>
                    </div>
                  </ConditionalMotion>
                );
              })}
            </div>
          </div>
        )}

        {/* Global expand/collapse button */}
        {totalHiddenMorphs > 0 && (
          <button
            onClick={() => {
              click();
              setIsExpanded(!isExpanded);
            }}
            className="btn-glass w-full py-2 text-sm bodyscan-flex-center bodyscan-gap-sm mb-6"
          >
            <SpatialIcon Icon={isExpanded ? ICONS.ChevronUp : ICONS.ChevronDown} size={14} />
            <span>
              {isExpanded 
                ? 'Réduire' 
                : `Voir ${totalHiddenMorphs} ajusteur${totalHiddenMorphs > 1 ? 's' : ''} de plus`
              }
            </span>
          </button>
        )}

        {/* Other categories - only visible when expanded */}
        {isExpanded && otherCategories.map(([category, morphs]) => (
          <div key={category} className="mb-6">
            <h5 className="glowing-title-text bodyscan-flex-center bodyscan-gap-sm mb-4">
              <div className="bodyscan-header-icon-container">
                <SpatialIcon Icon={ICONS.Circle} size={16} className="bodyscan-text-accent" />
              </div>
              {category}
            </h5>
            
            <div className="space-y-3">
              {morphs.map((morph, index) => {
                const range = morphPolicy.ranges[morph.key];
                if (!range) return null;

                const currentValue = currentMorphData[morph.key] !== undefined && currentMorphData[morph.key] !== null
                  ? currentMorphData[morph.key]
                  : 0;

                const canDecrement = currentValue > range.min;
                const canIncrement = currentValue < range.max;
                const isAdjusted = adjustedMorphs.has(morph.key);

                return (
                  <ConditionalMotion
                    key={morph.key}
                    className={`glass-nested-card glass-field-container p-4 ${isAdjusted ? 'ring-2 ring-blue-400/30' : ''}`}
                    initial={performanceConfig.enableStaggerAnimations ? { opacity: 0, x: -20 } : false}
                    animate={performanceConfig.enableStaggerAnimations ? { opacity: 1, x: 0 } : { opacity: 1 }}
                    transition={performanceConfig.enableFramerMotion ? { delay: 0.1 * index, duration: 0.4 } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SpatialIcon 
                          Icon={ICONS[morph.icon] || ICONS.Circle} 
                          size={16} 
                          style={{ color: morph.color }}
                          variant="pure"
                        />
                        <span className="text-white font-medium">
                          {morph.label}
                        </span>
                        {isAdjusted && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDecrement(morph.key)}
                          disabled={!canDecrement}
                          className={`btn-glass--secondary-nav w-8 h-8 flex items-center justify-center ${
                            !canDecrement ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                          title="Diminuer"
                        >
                          <SpatialIcon 
                            Icon={ICONS.Minus} 
                            size={14} 
                          />
                        </button>
                        
                        <div
                          className={`glass-field-container px-3 py-1 min-w-[60px] text-center text-sm font-mono ${
                            isAdjusted ? 'text-blue-300' : 'text-white/80'
                          }`}
                          title={currentValue.toFixed(2)}
                        >
                          {currentValue.toFixed(2)}
                        </div>

                        <button
                          onClick={() => handleIncrement(morph.key)}
                          disabled={!canIncrement}
                          className={`btn-glass--secondary-nav w-8 h-8 flex items-center justify-center ${
                            !canIncrement ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                          title="Augmenter"
                        >
                          <SpatialIcon 
                            Icon={ICONS.Plus} 
                            size={14} 
                          />
                        </button>
                      </div>
                    </div>
                  </ConditionalMotion>
                );
              })}
            </div>
          </div>
        ))}

        {/* Collapsed state preview */}
        {!isExpanded && adjustedMorphs.size > 0 && (
          <div className="mt-4 p-3 glass-nested-card">
            <p className="text-white/60 text-sm text-center">
              {adjustedMorphs.size} ajustement{adjustedMorphs.size > 1 ? 's' : ''} appliqué{adjustedMorphs.size > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </GlassCard>
    </ConditionalMotion>
  );
});

MorphAdjustmentControls.displayName = 'MorphAdjustmentControls';

export default MorphAdjustmentControls;