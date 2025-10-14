// supabase/functions/face-refine-morphs/index.ts
import { corsHeaders, jsonResponse } from './response.ts';
import { validateRefineRequest } from './requestValidator.ts';
import { refetchFaceMorphologyMapping } from './mappingRefetcher.ts';
import { buildAIRefinementPrompt } from './promptBuilder.ts';
import { callOpenAIForRefinement } from './openaiClient.ts';
import { validateAndClampAIResults } from './aiResultValidator.ts';

// Verify OpenAI API key is set
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
if (!openaiApiKey) {
  console.error('ERROR: [face-refine-morphs] OPENAI_API_KEY is NOT set!');
} else {
  console.log('DEBUG: [face-refine-morphs] OPENAI_API_KEY is set.');
}

/**
 * Face Refine Morphs Edge Function - AI-Driven Facial Morphological Refinement
 * Takes blended facial morphs and photos, uses AI to produce photo-realistic final vector
 * Respects ONLY physiological bounds from database (no rigid policies)
 */
Deno.serve(async (req) => {
  const processingStartTime = performance.now();
  const traceId = `face_refine_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    console.log(`DEBUG: [face-refine-morphs] [${traceId}] Handling OPTIONS request.`);
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  if (req.method !== "POST") {
    console.log(`DEBUG: [face-refine-morphs] [${traceId}] Method not allowed: ${req.method}.`);
    return jsonResponse({
      error: "Method not allowed"
    }, 405);
  }

  let requestData;
  try {
    // Parse and validate request
    requestData = await req.json();
    const validationError = validateRefineRequest(requestData);
    if (validationError) {
      console.error(`❌ [face-refine-morphs] [${traceId}] Request validation failed:`, validationError);
      return jsonResponse({
        error: validationError
      }, 400);
    }

    const {
      scan_id,
      user_id,
      resolvedGender,
      photos,
      blend_face_params,
      mapping_version,
      k5_envelope,
      face_semantic_profile
    } = requestData;

    console.log(`📥 [face-refine-morphs] [${traceId}] AI facial refinement request received:`, {
      scan_id,
      user_id,
      resolvedGender,
      photosCount: photos?.length,
      blendFaceParamsKeys: Object.keys(blend_face_params || {}),
      mapping_version,
      hasK5Envelope: !!k5_envelope,
      hasFaceSemanticProfile: !!face_semantic_profile,
      traceId,
      philosophy: 'phase_b_ai_driven_k5_envelope_constrained_facial'
    });

    // PHASE B: Validate K=5 envelope is present
    if (!k5_envelope) {
      console.error(`❌ [face-refine-morphs] [${traceId}] PHASE B: K=5 envelope missing from request`);
      return jsonResponse({
        error: "K=5 envelope is required for PHASE B AI facial refinement",
        phase: "B",
        fallback_available: false
      }, 400);
    }

    // PHASE B: Validate face semantic profile is present
    if (!face_semantic_profile) {
      console.error(`❌ [face-refine-morphs] [${traceId}] PHASE B: Face semantic profile missing from request`);
      return jsonResponse({
        error: "Face semantic profile is required for PHASE B AI facial refinement",
        phase: "B",
        fallback_available: false
      }, 400);
    }

    // CRITICAL: Refetch mapping from database (never trust client)
    console.log(`🔍 [face-refine-morphs] [${traceId}] Refetching facial mapping from database`);
    const mappingData = await refetchFaceMorphologyMapping(mapping_version, resolvedGender);

    if (!mappingData) {
      console.error(`❌ [face-refine-morphs] [${traceId}] Failed to refetch facial mapping data`);
      return jsonResponse({
        error: "Failed to retrieve facial morphology mapping from database",
        phase: "B",
        fallback_available: true
      }, 500);
    }

    console.log(`✅ [face-refine-morphs] [${traceId}] Facial mapping refetched successfully:`, {
      resolvedGender,
      mapping_version,
      faceValuesCount: Object.keys(mappingData.face_values || {}).length,
      philosophy: 'phase_b_database_source_of_truth_facial'
    });

    // PHASE B: Build AI refinement prompt with strict constraints
    console.log(`🔍 [face-refine-morphs] [${traceId}] PHASE B: Building strict AI facial refinement prompt`);
    const aiPrompt = buildAIRefinementPrompt({
      photos,
      blend_face_params,
      mappingData,
      resolvedGender,
      k5_envelope,
      face_semantic_profile,
      traceId
    });

    // PHASE B: Call OpenAI for strict AI-driven facial refinement
    console.log(`🔍 [face-refine-morphs] [${traceId}] PHASE B: Calling OpenAI for K=5 envelope constrained facial refinement`);
    const aiRefinementResult = await callOpenAIForRefinement(aiPrompt, photos, traceId);

    console.log(`✅ [face-refine-morphs] [${traceId}] PHASE B: AI facial refinement completed:`, {
      hasFaceParams: !!aiRefinementResult.final_face_params,
      faceParamsCount: Object.keys(aiRefinementResult.final_face_params || {}).length,
      aiConfidence: aiRefinementResult.confidence,
      philosophy: 'phase_b_ai_driven_k5_envelope_constrained_facial'
    });

    // PHASE B: Validate and clamp AI results with K=5 envelope and DB bounds
    console.log(`🔍 [face-refine-morphs] [${traceId}] PHASE B: Validating with K=5 envelope and DB bounds`);
    const validationResult = await validateAndClampAIResults(
      aiRefinementResult,
      mappingData,
      k5_envelope,
      resolvedGender,
      face_semantic_profile,
      traceId
    );

    // Calculate refinement deltas
    const deltas = calculateRefinementDeltas(
      blend_face_params,
      validationResult.final_face_params
    );

    // Count active keys (|value| > 0.05)
    const activeKeysCount = countActiveKeys(validationResult.final_face_params);

    const response = {
      // AI-refined final facial vectors
      final_face_params: validationResult.final_face_params,

      // Quality metrics
      ai_refine: true,
      mapping_version,
      clamped_keys: validationResult.clamped_keys,
      envelope_violations: validationResult.envelope_violations,
      db_violations: validationResult.db_violations,
      gender_violations: validationResult.gender_violations,
      out_of_range_count: validationResult.out_of_range_count,
      missing_keys_added: validationResult.missing_keys_added,
      extra_keys_removed: validationResult.extra_keys_removed,
      active_keys_count: activeKeysCount,

      // Refinement analysis
      refinement_deltas: {
        top_10_face_deltas: deltas.topFaceDeltas,
        total_face_changes: deltas.totalFaceChanges
      },

      // Metadata
      ai_confidence: aiRefinementResult.confidence || 0.8,
      processing_time_ms: performance.now() - processingStartTime,
      philosophy: 'phase_b_ai_driven_k5_envelope_db_bounds_strict_facial'
    };

    const processingTime = performance.now() - processingStartTime;
    console.log(`🎉 [face-refine-morphs] [${traceId}] PHASE B: AI-driven facial refinement completed successfully:`, {
      processingTimeMs: processingTime.toFixed(2),
      finalFaceParamsCount: Object.keys(response.final_face_params).length,
      clampedKeysCount: response.clamped_keys.length,
      envelopeViolationsCount: response.envelope_violations.length,
      dbViolationsCount: response.db_violations.length,
      genderViolationsCount: response.gender_violations?.length || 0,
      outOfRangeCount: response.out_of_range_count,
      missingKeysAddedCount: response.missing_keys_added.length,
      extraKeysRemovedCount: response.extra_keys_removed.length,
      activeKeysCount: response.active_keys_count,
      topFaceDeltas: deltas.topFaceDeltas.slice(0, 3),
      aiConfidence: response.ai_confidence,
      philosophy: 'phase_b_strict_validation_success_facial'
    });

    return jsonResponse(response);

  } catch (error) {
    const processingTime = performance.now() - processingStartTime;
    console.error(`❌ [face-refine-morphs] [${traceId}] PHASE B: AI facial refinement failed:`, error);

    // PHASE B: Return strict fallback with blend data (clamped)
    const fallbackResponse = {
      final_face_params: requestData?.blend_face_params || {},
      ai_refine: false,
      ai_refinement_failed: true, // NEW: Flag to indicate AI refinement failure
      mapping_version: requestData?.mapping_version || 'v1.0',
      clamped_keys: [],
      envelope_violations: [],
      db_violations: [],
      gender_violations: [],
      out_of_range_count: 0,
      missing_keys_added: [],
      extra_keys_removed: [],
      active_keys_count: 0,
      refinement_deltas: {
        top_10_face_deltas: [],
        total_face_changes: 0
      },
      ai_confidence: 0.3, // REDUCED: Lower confidence for fallback data
      processing_time_ms: processingTime,
      error_occurred: true,
      error_message: error instanceof Error ? error.message : "Unknown error",
      personalization_quality: 'POOR', // NEW: Quality indicator
      warning: 'AI refinement failed - using generic archetype blend. Facial features may not match photos accurately.',
      philosophy: 'phase_b_fallback_blend_data_ai_failed_facial'
    };

    console.log(`🔧 [face-refine-morphs] [${traceId}] PHASE B: Returning strict fallback response:`, {
      fallbackFaceParamsCount: Object.keys(fallbackResponse.final_face_params).length,
      processingTime: processingTime.toFixed(2),
      philosophy: 'phase_b_resilient_fallback_facial'
    });

    return jsonResponse(fallbackResponse, 200); // Return 200 with fallback data
  }
});

/**
 * Calculate refinement deltas between blend and AI-refined facial values
 */
function calculateRefinementDeltas(
  blendFaceParams: Record<string, number>,
  finalFaceParams: Record<string, number>
) {
  const faceDeltas: Array<{
    key: string;
    delta: number;
    blend: number;
    final: number;
  }> = [];

  // Calculate face parameter deltas
  Object.keys(finalFaceParams).forEach((key) => {
    const blendValue = blendFaceParams[key] || 0;
    const finalValue = finalFaceParams[key] || 0;
    const delta = Math.abs(finalValue - blendValue);

    if (delta > 0.01) {
      faceDeltas.push({
        key,
        delta,
        blend: blendValue,
        final: finalValue
      });
    }
  });

  // Sort by delta magnitude and take top 10
  const topFaceDeltas = faceDeltas
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 10)
    .map((d) => ({
      key: d.key,
      delta: parseFloat(d.delta.toFixed(3)),
      blend: parseFloat(d.blend.toFixed(3)),
      final: parseFloat(d.final.toFixed(3))
    }));

  return {
    topFaceDeltas,
    totalFaceChanges: faceDeltas.length
  };
}

/**
 * Count active keys (|value| > 0.05)
 */
function countActiveKeys(faceParams: Record<string, number>) {
  let count = 0;

  Object.values(faceParams).forEach((value) => {
    if (Math.abs(value) > 0.05) count++;
  });

  return count;
}
