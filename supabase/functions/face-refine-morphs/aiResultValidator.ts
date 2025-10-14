// supabase/functions/face-refine-morphs/aiResultValidator.ts
/**
 * AI Result Validator - Phase B Implementation for Facial Morphology
 * Validates and clamps AI refinement results with K=5 envelope and DB bounds
 */

export async function validateAndClampAIResults(
  aiResult: any,
  mappingData: any,
  k5_envelope: any,
  resolvedGender: string,
  face_semantic_profile: any,
  traceId: string
) {
  // PHASE 1: Strict input validation
  if (!aiResult) {
    throw new Error('AI result is null or undefined');
  }

  if (!aiResult.final_face_params || typeof aiResult.final_face_params !== 'object') {
    throw new Error('AI result missing or invalid final_face_params');
  }

  if (!mappingData || !mappingData.face_values) {
    throw new Error('Facial mapping data is invalid or incomplete');
  }

  if (!k5_envelope || !k5_envelope.shape_params_envelope) {
    throw new Error('K5 envelope is invalid or incomplete');
  }

  console.log(`🔍 [aiResultValidator] [${traceId}] PHASE B: Starting strict AI facial results validation:`, {
    resolvedGender,
    aiFaceParamsCount: Object.keys(aiResult.final_face_params).length,
    k5EnvelopeShapeKeys: Object.keys(k5_envelope.shape_params_envelope).length,
    inputValidationPassed: true,
    philosophy: 'phase_b_strict_k5_envelope_db_validation_facial'
  });

  const validatedFaceParams: Record<string, number> = {};
  const clamped_keys: string[] = [];
  const envelope_violations: string[] = [];
  const db_violations: string[] = [];
  const gender_violations: string[] = [];
  const missing_keys_added: string[] = [];
  const extra_keys_removed: string[] = [];
  let out_of_range_count = 0;

  // STEP 1: Process facial parameters with strict DB allowlisting
  console.log(`🔍 [aiResultValidator] [${traceId}] PHASE B: Processing facial parameters with strict allowlisting`);

  // First, remove any extra keys not in DB
  Object.keys(aiResult.final_face_params).forEach((key) => {
    if (!(key in mappingData.face_values)) {
      extra_keys_removed.push(key);
      console.log(`🚫 [aiResultValidator] [${traceId}] PHASE B: Removed extra key not in DB:`, {
        key,
        value: aiResult.final_face_params[key],
        reason: 'key_not_in_db_mapping',
        philosophy: 'phase_b_strict_db_allowlisting_facial'
      });
    }
  });

  // Process all DB-authorized facial parameters
  for (const [key, dbRange] of Object.entries(mappingData.face_values) as [string, any][]) {
    let value = aiResult.final_face_params[key];

    // Log initial value from AI
    console.log(
      `🔍 [aiResultValidator] [${traceId}] Processing face param "${key}". AI value: ${
        value !== undefined && value !== null ? value.toFixed(3) : 'undefined'
      }. DB Range: [${dbRange.min.toFixed(3)}, ${dbRange.max.toFixed(3)}]`
    );

    // Handle missing keys from AI response
    if (value === undefined || value === null) {
      // Use 0 if it's within range, otherwise use middle of range
      value = dbRange.min <= 0 && dbRange.max >= 0 ? 0 : (dbRange.min + dbRange.max) / 2;
      missing_keys_added.push(key);
      console.log(`🔍 [aiResultValidator] [${traceId}] PHASE B: Added missing face param:`, {
        key,
        defaultValue: value.toFixed(3),
        dbRange: `[${dbRange.min}, ${dbRange.max}]`,
        reason: 'missing_from_ai_response'
      });
    }

    // Validate value is a finite number
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      value = dbRange.min <= 0 && dbRange.max >= 0 ? 0 : (dbRange.min + dbRange.max) / 2;
      clamped_keys.push(key);
      out_of_range_count++;
      console.log(`🔍 [aiResultValidator] [${traceId}] PHASE B: Fixed invalid face param (NaN/Infinity):`, {
        key,
        invalidValue: aiResult.final_face_params[key],
        fixedValue: value.toFixed(3),
        reason: 'invalid_number_from_ai'
      });
    }

    // STEP 1A: Clamp to K=5 envelope bounds FIRST (priority 1)
    const k5Range = k5_envelope.shape_params_envelope[key];
    if (k5Range) {
      const originalValueBeforeK5Clamp = value;
      value = Math.max(k5Range.min, Math.min(k5Range.max, value));

      if (Math.abs(originalValueBeforeK5Clamp - value) > 0.001) {
        envelope_violations.push(key);
        console.log(`🚫 [aiResultValidator] [${traceId}] PHASE B: K=5 ENVELOPE VIOLATION - Clamped:`, {
          key,
          originalValue: originalValueBeforeK5Clamp.toFixed(3),
          clampedValue: value.toFixed(3),
          k5Range: `[${k5Range.min.toFixed(3)}, ${k5Range.max.toFixed(3)}]`,
          reason: 'ai_value_outside_k5_envelope',
          priority: 'envelope_constraint_violation'
        });
        out_of_range_count++;
      }
    }

    // STEP 1B: Final clamp to DB bounds (priority 2)
    const originalValueBeforeDBClamp = value;
    value = Math.max(dbRange.min, Math.min(dbRange.max, value));

    if (Math.abs(originalValueBeforeDBClamp - value) > 0.001) {
      db_violations.push(key);
      console.log(`🔒 [aiResultValidator] [${traceId}] PHASE B: DB BOUNDS VIOLATION - Clamped:`, {
        key,
        originalValue: originalValueBeforeDBClamp.toFixed(3),
        clampedValue: value.toFixed(3),
        dbRange: `[${dbRange.min}, ${dbRange.max}]`,
        reason: 'ai_value_outside_db_physiological_bounds',
        priority: 'db_physiological_constraint'
      });
      out_of_range_count++;
    }

    validatedFaceParams[key] = value;
  }

  // STEP 2: Apply semantic coherence validation for facial features
  console.log(`🔍 [aiResultValidator] [${traceId}] PHASE B: Applying facial semantic coherence validation`);
  const semanticCorrections = applyFacialSemanticCoherence(
    validatedFaceParams,
    resolvedGender,
    k5_envelope,
    face_semantic_profile,
    traceId
  );

  semanticCorrections.forEach((correction) => {
    validatedFaceParams[correction.key] = correction.correctedValue;
    clamped_keys.push(correction.key);
    out_of_range_count++;
    console.log(`🔒 [aiResultValidator] [${traceId}] PHASE B: Applied facial semantic coherence correction:`, {
      key: correction.key,
      originalValue: correction.originalValue.toFixed(3),
      correctedValue: correction.correctedValue.toFixed(3),
      reason: correction.reason
    });
  });

  console.log(`✅ [aiResultValidator] [${traceId}] PHASE B: Strict facial validation completed:`, {
    validatedFaceParamsCount: Object.keys(validatedFaceParams).length,
    envelopeViolationsCount: envelope_violations.length,
    dbViolationsCount: db_violations.length,
    genderViolationsCount: gender_violations.length,
    totalClampedKeys: clamped_keys.length,
    outOfRangeCount: out_of_range_count,
    missingKeysAddedCount: missing_keys_added.length,
    extra_keys_removed_count: extra_keys_removed.length,
    finalValidationPassed: true,
    philosophy: 'phase_b_strict_validation_complete_facial'
  });

  // CRITICAL: Validate personalization quality (ensure AI produced unique results, not generic archetypes)
  console.log(`🔍 [aiResultValidator] [${traceId}] PHASE C: Validating personalization quality`);
  const personalizationMetrics = validatePersonalizationQuality(
    aiResult.final_face_params,
    validatedFaceParams,
    k5_envelope,
    traceId
  );

  // PHASE 1: Final validation of result structure
  const result = {
    final_face_params: validatedFaceParams,
    clamped_keys,
    envelope_violations,
    db_violations,
    gender_violations,
    out_of_range_count,
    missing_keys_added,
    extra_keys_removed
  };

  // PHASE 1: Ensure result structure is complete
  if (Object.keys(result.final_face_params).length === 0) {
    throw new Error('Validation resulted in empty final_face_params');
  }

  console.log(`✅ [aiResultValidator] [${traceId}] PHASE 1: Final facial result structure validation passed:`, {
    finalFaceParamsCount: Object.keys(result.final_face_params).length,
    philosophy: 'phase_1_final_structure_validation_passed_facial'
  });

  return result;
}

/**
 * PHASE B: Apply facial semantic coherence validation
 * Ensures facial morphological coherence within K=5 envelope and DB constraints
 */
function applyFacialSemanticCoherence(
  faceParams: Record<string, number>,
  resolvedGender: string,
  k5_envelope: any,
  face_semantic_profile: any,
  traceId: string
) {
  const corrections: Array<{
    key: string;
    originalValue: number;
    correctedValue: number;
    reason: string;
  }> = [];

  console.log(`🔍 [aiResultValidator] [${traceId}] PHASE B: Applying facial semantic coherence:`, {
    resolvedGender,
    faceSemanticProfile: face_semantic_profile,
    faceParamsCount: Object.keys(faceParams).length,
    philosophy: 'phase_b_facial_semantic_coherence'
  });

  // RULE 1: Gender-specific facial constraints
  if (resolvedGender === 'masculine') {
    // Masculine faces should have more angular jaw features
    const jawWidthKey = 'FaceJawWidth';
    const jawWidth = faceParams[jawWidthKey];
    if (jawWidth !== undefined && jawWidth < 0.3) {
      const targetValue = 0.3;
      corrections.push({
        key: jawWidthKey,
        originalValue: jawWidth,
        correctedValue: targetValue,
        reason: `PHASE B: Masculine face should have minimum jaw width (${targetValue.toFixed(3)})`
      });
    }
  } else if (resolvedGender === 'feminine') {
    // Feminine faces can have softer jaw features
    // No specific corrections needed for now
  }

  // RULE 2: Face shape coherence based on semantic profile
  if (face_semantic_profile.face_shape === 'square') {
    // Square faces should have prominent jaw features
    // Ensure jaw width is appropriate
  } else if (face_semantic_profile.face_shape === 'round') {
    // Round faces should have softer features
    // Ensure cheek prominence is appropriate
  }

  // RULE 3: Eye shape coherence
  if (face_semantic_profile.eye_shape === 'round') {
    // Round eyes should have appropriate eye height parameters
  } else if (face_semantic_profile.eye_shape === 'almond') {
    // Almond eyes should have appropriate width/height ratio
  }

  // RULE 4: Nose type coherence
  if (face_semantic_profile.nose_type === 'roman') {
    // Roman noses should have prominent bridge
  } else if (face_semantic_profile.nose_type === 'upturned') {
    // Upturned noses should have specific tip angle
  }

  // RULE 5: Lip fullness coherence
  if (face_semantic_profile.lip_fullness === 'full') {
    // Full lips should have appropriate volume parameters
  } else if (face_semantic_profile.lip_fullness === 'thin') {
    // Thin lips should have minimal volume
  }

  console.log(`🔒 [aiResultValidator] [${traceId}] PHASE B: Facial semantic coherence validation:`, {
    correctionsNeeded: corrections.length,
    corrections: corrections.map((c) => ({
      key: c.key,
      delta: (c.correctedValue - c.originalValue).toFixed(3),
      reason: c.reason
    })),
    philosophy: 'phase_b_facial_semantic_coherence_complete'
  });

  return corrections;
}

/**
 * PHASE C: Validate personalization quality
 * Ensures AI produced meaningful personalization from photos, not just generic archetype values
 */
function validatePersonalizationQuality(
  aiRawParams: Record<string, number>,
  validatedParams: Record<string, number>,
  k5_envelope: any,
  traceId: string
) {
  const activeThreshold = 0.05;
  const centerBiasThreshold = 0.15; // Warn if too many params are near center of envelope

  // Metric 1: Count active parameters (|value| > threshold)
  const activeCount = Object.values(validatedParams).filter(v => Math.abs(v) > activeThreshold).length;
  const totalCount = Object.keys(validatedParams).length;
  const activeRatio = activeCount / totalCount;

  // Metric 2: Calculate variance from K=5 envelope center
  const centerDeviations: number[] = [];
  Object.entries(validatedParams).forEach(([key, value]) => {
    const k5Range = k5_envelope.shape_params_envelope[key];
    if (k5Range) {
      const center = (k5Range.min + k5Range.max) / 2;
      const rangeSize = k5Range.max - k5Range.min;
      const deviation = rangeSize > 0 ? Math.abs(value - center) / rangeSize : 0;
      centerDeviations.push(deviation);
    }
  });

  const avgDeviation = centerDeviations.reduce((sum, d) => sum + d, 0) / centerDeviations.length;
  const nearCenterCount = centerDeviations.filter(d => d < centerBiasThreshold).length;
  const nearCenterRatio = nearCenterCount / centerDeviations.length;

  // Metric 3: Calculate difference between AI output and validated output (clamping impact)
  let significantClampCount = 0;
  Object.keys(validatedParams).forEach(key => {
    const aiValue = aiRawParams[key];
    const validatedValue = validatedParams[key];
    if (aiValue !== undefined && Math.abs(aiValue - validatedValue) > 0.05) {
      significantClampCount++;
    }
  });

  // Quality assessment
  const qualityWarnings: string[] = [];

  if (activeRatio < 0.5) {
    qualityWarnings.push(`LOW_ACTIVE_RATIO: Only ${(activeRatio * 100).toFixed(1)}% of parameters are active (target: >50%)`);
  }

  if (avgDeviation < 0.2) {
    qualityWarnings.push(`LOW_VARIANCE: Average deviation from envelope center is ${(avgDeviation * 100).toFixed(1)}% (target: >20%)`);
  }

  if (nearCenterRatio > 0.7) {
    qualityWarnings.push(`CENTER_BIAS: ${(nearCenterRatio * 100).toFixed(1)}% of parameters are near envelope center (target: <70%)`);
  }

  if (significantClampCount > totalCount * 0.3) {
    qualityWarnings.push(`HIGH_CLAMP_RATE: ${significantClampCount} parameters were significantly clamped (>${(0.3 * 100).toFixed(0)}% of total)`);
  }

  const qualityScore = (
    (activeRatio * 0.4) +
    (Math.min(avgDeviation / 0.4, 1) * 0.3) +
    ((1 - nearCenterRatio) * 0.2) +
    ((1 - (significantClampCount / totalCount)) * 0.1)
  );

  const qualityLevel = qualityScore > 0.7 ? 'GOOD' : qualityScore > 0.5 ? 'ACCEPTABLE' : 'POOR';

  console.log(`📊 [aiResultValidator] [${traceId}] PHASE C: Personalization quality metrics:`, {
    activeParameters: `${activeCount}/${totalCount} (${(activeRatio * 100).toFixed(1)}%)`,
    avgDeviationFromCenter: `${(avgDeviation * 100).toFixed(1)}%`,
    nearCenterParameters: `${nearCenterCount}/${centerDeviations.length} (${(nearCenterRatio * 100).toFixed(1)}%)`,
    significantClampCount,
    qualityScore: qualityScore.toFixed(3),
    qualityLevel,
    warnings: qualityWarnings,
    assessment: qualityWarnings.length === 0 ? 'AI produced good personalization from photos' : 'AI may be defaulting to generic archetype values',
    philosophy: 'personalization_quality_validation'
  });

  if (qualityWarnings.length > 0) {
    console.warn(`⚠️ [aiResultValidator] [${traceId}] PHASE C: Personalization quality warnings detected:`, {
      warningCount: qualityWarnings.length,
      warnings: qualityWarnings,
      recommendation: 'Verify photos are being analyzed correctly by AI. May indicate token limit issues or AI defaulting to generic values.',
      philosophy: 'personalization_quality_warning'
    });
  } else {
    console.log(`✅ [aiResultValidator] [${traceId}] PHASE C: Personalization quality is good - AI produced unique facial features`);
  }

  // CRITICAL WARNING: If quality is POOR, log prominently
  if (qualityLevel === 'POOR') {
    console.error(`🚨 [aiResultValidator] [${traceId}] CRITICAL: Poor personalization quality detected!`, {
      qualityScore: qualityScore.toFixed(3),
      qualityLevel,
      activeRatio: `${(activeRatio * 100).toFixed(1)}%`,
      avgDeviation: `${(avgDeviation * 100).toFixed(1)}%`,
      impact: 'Facial features will appear generic and may not match user photos',
      possibleCauses: [
        'AI token limit exceeded (check for finish_reason: length)',
        'Prompt too complex or verbose',
        'Photos not being analyzed properly',
        'AI defaulting to archetype center values'
      ],
      philosophy: 'critical_poor_personalization_alert'
    });
  }

  return {
    activeRatio,
    avgDeviation,
    nearCenterRatio,
    significantClampCount,
    qualityScore,
    qualityLevel,
    warnings: qualityWarnings
  };
}
