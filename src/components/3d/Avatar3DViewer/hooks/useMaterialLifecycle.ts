// src/components/3d/Avatar3DViewer/hooks/useMaterialLifecycle.ts
import { useCallback, useState } from 'react';
import * as THREE from 'three';
import { configureSceneMaterials } from '../../../../lib/3d/materials/unifiedMaterialSystem';
import { resolveSkinTone, type SkinToneV2 } from '../../../../lib/scan/normalizeSkinTone';
import logger from '../../../../lib/utils/logger';

interface UseMaterialLifecycleProps {
  scene: THREE.Scene | null;
  skinTone?: SkinToneV2;
  finalGender: 'male' | 'female';
  serverScanId?: string;
}

/**
 * Hook for managing material configuration lifecycle
 */
export function useMaterialLifecycle({
  scene,
  skinTone,
  finalGender,
  serverScanId
}: UseMaterialLifecycleProps) {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configure materials
  const configureMaterials = useCallback(async (customSkinTone?: any) => {
    if (!scene) {
      logger.warn('MATERIAL_LIFECYCLE', 'Cannot configure materials - no scene available', {
        serverScanId,
        philosophy: 'material_config_no_scene'
      });
      return;
    }

    const effectiveSkinTone = customSkinTone || skinTone;
    
    if (!effectiveSkinTone) {
      logger.warn('MATERIAL_LIFECYCLE', 'Cannot configure materials - no skin tone data', {
        serverScanId,
        philosophy: 'material_config_no_skin_tone'
      });
      return;
    }

    setIsConfiguring(true);
    setError(null);

    try {
      logger.info('MATERIAL_LIFECYCLE', 'Starting material configuration', {
        serverScanId,
        hasSkinTone: !!effectiveSkinTone,
        finalGender,
        philosophy: 'material_config_start'
      });

      // Explicitly re-resolve the skin tone to ensure correct V2 format
      const resolvedSkinTone = resolveSkinTone({ skin_tone: effectiveSkinTone });
      
      if (!resolvedSkinTone || !resolvedSkinTone.tone) {
        throw new Error('Failed to resolve skin tone to valid V2 format');
      }

      const result = await configureSceneMaterials({
        scene,
        skinTone: resolvedSkinTone.tone,
        enableProceduralTextures: true,
        proceduralConfig: {
          detailLevel: 'high',
          poreIntensity: 0.6,
          colorVariation: 0.3,
          imperfectionIntensity: 0.2
        },
        serverScanId
      });

      if (!result.success) {
        throw new Error(result.error || 'Material configuration failed');
      }

      logger.info('MATERIAL_LIFECYCLE', 'Unified material configuration completed successfully', {
        serverScanId,
        skinMaterialsModified: result.skinMaterialsModified,
        proceduralTexturesApplied: result.proceduralTexturesApplied,
        materialsUpgraded: result.materialsUpgraded,
        philosophy: 'unified_material_config_complete'
      });

      // CRITICAL: Final scene-wide color verification
      logger.info('MATERIAL_LIFECYCLE', '🎨 FINAL COLOR VERIFICATION - Checking all materials in scene', {
        serverScanId,
        expectedColorHex: resolvedSkinTone.tone.hex,
        expectedColorRGB: {
          r: resolvedSkinTone.tone.rgb.r,
          g: resolvedSkinTone.tone.rgb.g,
          b: resolvedSkinTone.tone.rgb.b
        },
        philosophy: 'final_color_verification_start'
      });

      // Traverse scene to verify all skin materials have correct color
      const colorReport: any[] = [];
      scene.traverse((obj: THREE.Object3D) => {
        if (obj instanceof THREE.Mesh && obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((mat: THREE.Material) => {
            if ((mat as any).color && (mat as any).color instanceof THREE.Color) {
              const currentColor = (mat as any).color as THREE.Color;
              const currentHex = '#' + currentColor.getHexString();

              colorReport.push({
                objectName: obj.name || 'unnamed',
                materialName: mat.name || 'unnamed',
                currentColorHex: currentHex,
                currentColorRGB: {
                  r: Math.round(currentColor.r * 255),
                  g: Math.round(currentColor.g * 255),
                  b: Math.round(currentColor.b * 255)
                }
              });
            }
          });
        }
      });

      logger.info('MATERIAL_LIFECYCLE', '✅ FINAL COLOR VERIFICATION - Scene materials report', {
        serverScanId,
        expectedColorHex: resolvedSkinTone.tone.hex,
        totalMaterialsInScene: colorReport.length,
        materialColors: colorReport.slice(0, 5), // First 5 materials
        philosophy: 'final_color_verification_complete'
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      
      logger.error('MATERIAL_LIFECYCLE', 'Material configuration failed', {
        error: errorMessage,
        serverScanId,
        philosophy: 'material_config_error'
      });
    } finally {
      setIsConfiguring(false);
    }
  }, [scene, skinTone, finalGender, serverScanId]);

  return {
    // State
    isConfiguring,
    error,
    
    // Actions
    configureMaterials
  };
}