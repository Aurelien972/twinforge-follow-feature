/**
 * Face K=5 Envelope Builder - Adapted from Body Scan
 * Builds dynamic facial morphological constraints from selected face archetypes
 *
 * CRITICAL FIX: This replaces the broken SQL function face_k5_envelope() which was filtering
 * ARKit blendshape keys instead of Blender morphological Face keys.
 */

import { toCanonicalKey } from '../_shared/utils/faceKeys.ts';

/**
 * Build K=5 envelope from selected face archetypes with DB fallback
 * Adapted from bodyscan envelopeBuilder.ts to work with face_values
 */
export function buildFaceK5Envelope(selectedArchetypes: any[], genderMapping: any, traceId: string) {
  console.log(`🔍 [faceEnvelopeBuilder] [${traceId}] Building Face K=5 envelope`, {
    archetypesCount: selectedArchetypes.length,
    archetypeIds: selectedArchetypes.map((a) => a.id),
    genderMappingFaceKeys: Object.keys(genderMapping.face_values || {}).length,
    philosophy: 'face_k5_envelope_dynamic_constraints'
  });

  const shape_params_envelope: Record<string, any> = {};
  let keys_with_archetype_data = 0;
  let keys_using_db_fallback = 0;

  // Process facial shape parameters
  console.log(`🔍 [faceEnvelopeBuilder] [${traceId}] Processing facial shape parameters for envelope`);

  Object.keys(genderMapping.face_values).forEach((morphKey) => {
    const dbRange = genderMapping.face_values[morphKey];

    // Collect values from face archetypes
    const archetypeValues: number[] = [];

    selectedArchetypes.forEach((archetype) => {
      let faceValues: any;

      try {
        faceValues = typeof archetype.face_values === 'string'
          ? JSON.parse(archetype.face_values)
          : archetype.face_values;
      } catch (error) {
        console.warn(`[faceEnvelopeBuilder] Failed to parse face_values for archetype ${archetype.id}`);
        return;
      }

      if (faceValues && typeof faceValues === 'object') {
        // Try to find the value with different key formats
        // DB stores keys like "BS_LOD0.FaceJawWidth" but we need to match canonical keys
        const canonicalMorphKey = toCanonicalKey(morphKey);

        // Try exact match first
        let value = faceValues[morphKey];

        // Try with BS_LOD0 prefix
        if (value === undefined) {
          value = faceValues[`BS_LOD0.${morphKey}`];
        }

        // Try canonical key
        if (value === undefined) {
          value = faceValues[canonicalMorphKey];
        }

        // Try canonical with prefix
        if (value === undefined) {
          value = faceValues[`BS_LOD0.${canonicalMorphKey}`];
        }

        if (typeof value === 'number' && Number.isFinite(value)) {
          archetypeValues.push(value);
        }
      }
    });

    if (archetypeValues.length >= 2) {
      // Use archetype data for envelope
      const archetypeMin = Math.min(...archetypeValues);
      const archetypeMax = Math.max(...archetypeValues);

      // Expand envelope slightly for AI flexibility (10% margin)
      const margin = (archetypeMax - archetypeMin) * 0.1;
      const envelopeMin = Math.max(dbRange.min, archetypeMin - margin);
      const envelopeMax = Math.min(dbRange.max, archetypeMax + margin);

      shape_params_envelope[morphKey] = {
        min: envelopeMin,
        max: envelopeMax,
        archetype_min: archetypeMin,
        archetype_max: archetypeMax,
        source: 'archetypes'
      };

      keys_with_archetype_data++;

      console.log(`✅ [faceEnvelopeBuilder] [${traceId}] Face param envelope from archetypes`, {
        morphKey,
        archetypeValues: archetypeValues.map((v) => v.toFixed(3)),
        archetypeRange: [archetypeMin.toFixed(3), archetypeMax.toFixed(3)],
        envelopeRange: [envelopeMin.toFixed(3), envelopeMax.toFixed(3)],
        dbRange: [dbRange.min.toFixed(3), dbRange.max.toFixed(3)],
        margin: margin.toFixed(3)
      });
    } else {
      // Use DB range as fallback
      shape_params_envelope[morphKey] = {
        min: dbRange.min,
        max: dbRange.max,
        archetype_min: dbRange.min,
        archetype_max: dbRange.max,
        source: 'db_fallback'
      };

      keys_using_db_fallback++;

      console.log(`🔧 [faceEnvelopeBuilder] [${traceId}] Face param envelope from DB fallback`, {
        morphKey,
        archetypeValuesCount: archetypeValues.length,
        dbRange: [dbRange.min.toFixed(3), dbRange.max.toFixed(3)],
        reason: 'insufficient_archetype_data'
      });
    }
  });

  const envelope = {
    shape_params_envelope,
    limb_masses_envelope: {}, // Empty for face scans
    envelope_metadata: {
      archetypes_used: selectedArchetypes.map((a) => a.id),
      total_keys_processed: Object.keys(shape_params_envelope).length,
      keys_with_archetype_data,
      keys_using_db_fallback,
      envelope_generation_timestamp: new Date().toISOString(),
      envelope_version: 'v1.0-face-k5'
    }
  };

  console.log(`✅ [faceEnvelopeBuilder] [${traceId}] Face K=5 envelope built successfully`, {
    faceParamsKeys: Object.keys(shape_params_envelope).length,
    keysWithArchetypeData: keys_with_archetype_data,
    keysUsingDBFallback: keys_using_db_fallback,
    archetypesUsed: selectedArchetypes.map((a) => a.id),
    sampleKeys: Object.keys(shape_params_envelope).slice(0, 5),
    philosophy: 'face_k5_envelope_construction_complete'
  });

  return envelope;
}

/**
 * Validate face envelope integrity and apply corrections if needed
 */
export function validateFaceEnvelopeIntegrity(envelope: any, traceId: string) {
  console.log(`🔍 [faceEnvelopeBuilder] [${traceId}] Validating face envelope integrity`);

  const issues: string[] = [];
  const correctedEnvelope = JSON.parse(JSON.stringify(envelope)); // Deep copy
  let correctionsMade = 0;

  // Validate face parameters envelope
  Object.entries(envelope.shape_params_envelope).forEach(([key, range]: [string, any]) => {
    if (range.min > range.max) {
      issues.push(`Invalid face param range: ${key} min > max`);
      correctedEnvelope.shape_params_envelope[key] = {
        ...range,
        min: Math.min(range.min, range.max),
        max: Math.max(range.min, range.max)
      };
      correctionsMade++;
    }

    if (!Number.isFinite(range.min) || !Number.isFinite(range.max)) {
      issues.push(`Non-finite values in face param range: ${key}`);
      correctedEnvelope.shape_params_envelope[key] = {
        ...range,
        min: Number.isFinite(range.min) ? range.min : -1,
        max: Number.isFinite(range.max) ? range.max : 1
      };
      correctionsMade++;
    }
  });

  const isValid = issues.length === 0;

  console.log(
    `${isValid ? '✅' : '⚠️'} [faceEnvelopeBuilder] [${traceId}] Face envelope integrity validation`,
    {
      isValid,
      issuesCount: issues.length,
      correctionsMade,
      issues: issues.slice(0, 5),
      philosophy: 'face_envelope_integrity_validation'
    }
  );

  return {
    isValid,
    issues,
    correctedEnvelope: correctionsMade > 0 ? correctedEnvelope : undefined
  };
}
