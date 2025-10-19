// src/app/pages/BodyScan/BodyScanCapture/services/scanProcessingService.ts
/**
 * Scan Processing Service
 * Handles the complete body scan processing pipeline
 */

import { bodyScanRepo } from '../../../../../system/data/repositories/bodyScanRepo';
import { supabase } from '../../../../../system/supabase/client';
import { scanAnalytics } from '../../../../../lib/utils/analytics';
import { useProgressStore } from '../../../../../system/store/progressStore';
import logger from '../../../../../lib/utils/logger';
import type { CapturedPhotoEnhanced } from '../../../../../domain/types';
import { getSignedUrl, PRIVATE_BUCKETS } from '../../../../../lib/storage/signedUrlService';

interface ScanProcessingConfig {
  userId: string;
  clientScanId: string;
  capturedPhotos: CapturedPhotoEnhanced[];
  stableScanParams: {
    sex: 'male' | 'female';
    height_cm: number;
    weight_kg: number;
  };
  resolvedGender: 'masculine' | 'feminine'; // MODIFIED: Type updated
}

interface ScanProcessingResult {
  estimate: any;
  semantic: any;
  match: any;
  commit: any;
  completeResults: any;
}

/**
 * Process complete body scan pipeline
 */
export async function processBodyScanPipeline(
  config: ScanProcessingConfig
): Promise<ScanProcessingResult> {
  const { userId, clientScanId, capturedPhotos, stableScanParams, resolvedGender } = config;
  const { 
    setProcessingStep, 
    setServerScanId, 
    setComplete, 
    setOverallProgress, 
    incrementProgress,
    startDynamicProcessing,
    stopDynamicProcessing
  } = useProgressStore.getState();

  logger.info('SCAN_PROCESSING_SERVICE', 'Starting complete pipeline processing', {
    clientScanId,
    userId,
    photosCount: capturedPhotos.length,
    userProfile: stableScanParams,
    resolvedGender,
    timestamp: new Date().toISOString()
  });

  // STEP 0: Upload photos to Supabase Storage
  setOverallProgress(52, 'Préparation des données', 'Téléchargement sécurisé de vos photos...');
  
  // Simulation de progression pendant l'upload
  const uploadProgressInterval = setInterval(() => {
    incrementProgress(1, 'Préparation des données', 'Téléchargement sécurisé de vos photos...');
  }, 200);
  
  const uploadedPhotos = await uploadPhotosToStorage(userId, clientScanId, capturedPhotos);
  clearInterval(uploadProgressInterval);

  // START DYNAMIC PROCESSING: Begin detailed step-by-step progression
  logger.info('SCAN_PROCESSING_SERVICE', 'Starting dynamic processing progression', {
    clientScanId,
    startPercentage: 52,
    endPercentage: 92,
    totalSteps: 17, // SCAN_STATUS_STEPS.length
    philosophy: 'dynamic_scan_progression_start'
  });
  
  // Start dynamic progression from 52% to 92%
  startDynamicProcessing(52, 92);
  
  // STEP 1: scan-estimate (AI photo analysis)
  const estimateResult = await callScanEstimate(
    userId, 
    uploadedPhotos, 
    stableScanParams, 
    resolvedGender, 
    clientScanId
  );

  // STEP 2: scan-semantic (semantic classification)  
  const semanticResult = await callScanSemantic(
    userId, 
    uploadedPhotos, 
    estimateResult, 
    resolvedGender, 
    clientScanId
  );

  // STEP 3: scan-match (archetype matching)  
  const matchResult = await callScanMatch(
    userId, 
    estimateResult, 
    semanticResult, 
    resolvedGender, 
    clientScanId
  );

  // STEP 3.5: AI Morphological Refinement  
  const enhancedMatchResult = await performAIRefinement(
    matchResult,
    uploadedPhotos,
    estimateResult,
    semanticResult,
    stableScanParams,
    resolvedGender,
    clientScanId,
    userId // CRITICAL FIX: Pass userId to performAIRefinement
  );

  // STOP DYNAMIC PROCESSING: Before final commit
  logger.info('SCAN_PROCESSING_SERVICE', 'Stopping dynamic processing before commit', {
    clientScanId,
    philosophy: 'dynamic_scan_progression_stop_before_commit'
  });
  
  stopDynamicProcessing();
  
  // STEP 4: scan-commit (data persistence)
  setOverallProgress(92, 'Sauvegarde des Données', 'Persistance de votre avatar personnalisé...');

  const { commitResult, skinTone } = await callScanCommit(
    userId,
    estimateResult,
    enhancedMatchResult,
    semanticResult,
    capturedPhotos,
    resolvedGender,
    clientScanId
  );

  // Store server scan ID
  if (commitResult.scan_id) {
    setServerScanId(commitResult.scan_id);
  }

  // STEP 5: Complete processing - DO NOT mark as complete yet
  // The celebration screen should only show after navigation to review page
  setProcessingStep('model_loading');
  setOverallProgress(95, 'Finalisation', 'Préparation de votre avatar 3D...');

  // Small delay to show completion visually
  await new Promise(resolve => setTimeout(resolve, 800));

  setProcessingStep('model_loaded');
  setOverallProgress(98, 'Prêt', 'Tout est prêt !');

  // Validate skin tone before building complete results
  logger.info('SCAN_PROCESSING_SERVICE', '🎨 CRITICAL: Validating skin tone before buildCompleteResults', {
    clientScanId,
    hasSkinTone: !!skinTone,
    skinToneSchema: skinTone?.schema,
    skinToneRGB: skinTone?.rgb ? `rgb(${skinTone.rgb.r}, ${skinTone.rgb.g}, ${skinTone.rgb.b})` : 'unknown',
    skinToneHex: skinTone?.hex || 'unknown',
    skinToneSource: skinTone?.source,
    skinToneConfidence: skinTone?.confidence,
    philosophy: 'pre_build_complete_results_validation'
  });

  // Build complete scan results
  // CRITICAL: Pass the already-extracted skinTone from Step 4 to avoid re-extraction with fallback
  const completeResults = buildCompleteResults(
    estimateResult,
    semanticResult,
    enhancedMatchResult,
    commitResult,
    uploadedPhotos,
    stableScanParams,
    resolvedGender,
    clientScanId,
    userId, // CRITICAL FIX: Pass actual userId to buildCompleteResults
    skinTone // CRITICAL FIX: Pass pre-extracted V2 skin tone to ensure consistency
  );

  logger.info('SCAN_PROCESSING_SERVICE', 'Complete pipeline processing finished successfully', {
    clientScanId,
    serverScanId: commitResult.scan_id,
    hasAllResults: !!(completeResults.estimate && completeResults.semantic && completeResults.match && completeResults.commit),
    finalConfidence: completeResults.estimate?.extracted_data?.processing_confidence || 0,
    aiRefined: !!enhancedMatchResult.ai_refinement?.ai_refine,
    aiConfidence: enhancedMatchResult.ai_refinement?.ai_confidence,
    insightsCount: completeResults.insights?.items?.length || 0,
    timestamp: new Date().toISOString(),
    philosophy: 'pipeline_complete_ready_for_navigation'
  });

  // Mark as complete only after all data is ready
  setComplete();
  setOverallProgress(100, 'Terminé', 'Traitement complet !');

  logger.info('SCAN_PROCESSING_SERVICE', 'Processing state marked as complete, ready for celebration', {
    clientScanId,
    serverScanId: commitResult.scan_id,
    philosophy: 'ready_for_celebration_after_complete_processing'
  });

  return {
    estimate: estimateResult,
    semantic: semanticResult,
    match: enhancedMatchResult,
    commit: commitResult,
    completeResults
  };
}

/**
 * Upload photos to Supabase Storage
 */
async function uploadPhotosToStorage(
  userId: string,
  clientScanId: string,
  capturedPhotos: CapturedPhotoEnhanced[]
): Promise<Array<{ view: string; url: string; report?: any }>> {
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 0: Starting photo upload', { 
    clientScanId,
    photosCount: capturedPhotos.length 
  });

  const uploadedPhotos = await Promise.all(
    capturedPhotos.map(async (photo, index) => {
      try {
        const response = await fetch(photo.url);
        const blob = await response.blob();
        const file = new File([blob], `scan-${clientScanId}-${photo.type}.jpg`, { type: 'image/jpeg' });
        
        const filePath = `scans/${userId}/${clientScanId}/${photo.type}.jpg`;
        const { data, error } = await supabase.storage
          .from('body-scans')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) {
          throw new Error(`Upload failed for ${photo.type}: ${error.message}`);
        }

        // Get signed URL for private storage (1 hour expiry)
        const signedUrl = await getSignedUrl(PRIVATE_BUCKETS.BODY_SCANS, filePath);

        if (!signedUrl) {
          throw new Error(`Failed to get signed URL for ${photo.type}`);
        }

        return {
          view: photo.type,
          url: signedUrl,
          report: photo.captureReport
        };
      } catch (error) {
        logger.error('SCAN_PROCESSING_SERVICE', `Failed to upload ${photo.type} photo`, { 
          clientScanId,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
      }
    })
  );

  logger.info('SCAN_PROCESSING_SERVICE', 'Step 0: Photo upload completed', { 
    clientScanId,
    uploadedCount: uploadedPhotos.length,
    uploadedUrls: uploadedPhotos.map(p => ({ view: p.view, urlLength: p.url.length }))
  });

  return uploadedPhotos;
}

/**
 * Call scan-estimate Edge Function
 */
async function callScanEstimate(
  userId: string,
  uploadedPhotos: Array<{ view: string; url: string; report?: any }>,
  stableScanParams: { sex: 'male' | 'female'; height_cm: number; weight_kg: number },
  resolvedGender: 'masculine' | 'feminine', // MODIFIED: Type updated
  clientScanId: string
) {
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 1: Starting scan-estimate', { 
    clientScanId,
    requestData: {
      userId,
      photosCount: uploadedPhotos.length,
      userMetrics: stableScanParams
    }
  });

  const estimateRequest = {
    user_id: userId,
    photos: uploadedPhotos,
    user_declared_height_cm: stableScanParams.height_cm,
    user_declared_weight_kg: stableScanParams.weight_kg,
    user_declared_gender: resolvedGender, // MODIFIED: Directly use resolvedGender
    clientScanId,
    resolvedGender
  };

  const estimateResult = await bodyScanRepo.estimate(estimateRequest);

  logger.info('SCAN_PROCESSING_SERVICE', 'Step 1: scan-estimate completed', {
    clientScanId,
    hasExtractedData: !!estimateResult.extracted_data,
    confidence: estimateResult.extracted_data?.processing_confidence,
    hasSkinTone: !!estimateResult.extracted_data?.skin_tone,
    measurementsKeys: estimateResult.extracted_data?.raw_measurements ? 
      Object.keys(estimateResult.extracted_data.raw_measurements) : []
  });

  return estimateResult;
}

/**
 * Call scan-semantic Edge Function
 */
async function callScanSemantic(
  userId: string,
  uploadedPhotos: Array<{ view: string; url: string; report?: any }>,
  estimateResult: any,
  resolvedGender: 'masculine' | 'feminine', // MODIFIED: Type updated
  clientScanId: string
) {
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 2: Starting scan-semantic', { 
    clientScanId,
    requestData: {
      userId,
      hasExtractedData: !!estimateResult.extracted_data,
      estimatedBMI: estimateResult.extracted_data?.estimated_bmi
    }
  });

  const semanticRequest = {
    user_id: userId,
    photos: uploadedPhotos,
    extracted_data: estimateResult.extracted_data,
    user_declared_gender: resolvedGender, // MODIFIED: Directly use resolvedGender
    clientScanId,
    resolvedGender
  };

  const semanticResult = await bodyScanRepo.semantic(semanticRequest);

  logger.info('SCAN_PROCESSING_SERVICE', 'Step 2: scan-semantic completed', {
    clientScanId,
    hasSemanticProfile: !!semanticResult.semantic_profile,
    semanticConfidence: semanticResult.semantic_confidence,
    adjustmentsMade: semanticResult.adjustments_made?.length || 0,
    semanticClasses: semanticResult.semantic_profile ? {
      obesity: semanticResult.semantic_profile.obesity,
      muscularity: semanticResult.semantic_profile.muscularity,
      level: semanticResult.semantic_profile.level,
      morphotype: semanticResult.semantic_profile.morphotype
    } : null
  });

  return semanticResult;
}

/**
 * Call scan-match Edge Function
 */
async function callScanMatch(
  userId: string,
  estimateResult: any,
  semanticResult: any,
  resolvedGender: 'masculine' | 'feminine', // MODIFIED: Type updated
  clientScanId: string
) {
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 3: Starting scan-match', { 
    clientScanId,
    userBMICalculated: estimateResult.extracted_data?.estimated_bmi,
    semanticClassificationForMatching: {
      obesity: semanticResult.semantic_profile?.obesity,
      muscularity: semanticResult.semantic_profile?.muscularity,
      level: semanticResult.semantic_profile?.level,
      morphotype: semanticResult.semantic_profile?.morphotype
    }
  });

  const matchRequest = {
    user_id: userId,
    extracted_data: estimateResult.extracted_data,
    semantic_profile: semanticResult.semantic_profile,
    user_semantic_indices: {
      morph_index: semanticResult.semantic_profile.morph_index || 0,
      muscle_index: semanticResult.semantic_profile.muscle_index || 0
    },
    matching_config: {
      gender: resolvedGender, // MODIFIED: Directly use resolvedGender
      limit: 5
    },
    clientScanId,
    resolvedGender
  };

  const matchResult = await bodyScanRepo.match(matchRequest);

  logger.info('SCAN_PROCESSING_SERVICE', 'Step 3: scan-match completed', {
    clientScanId,
    selectedArchetypesCount: matchResult.selected_archetypes?.length || 0,
    strategyUsed: matchResult.strategy_used,
    semanticCoherenceScore: matchResult.semantic_coherence_score
  });

  return matchResult;
}

/**
 * Perform AI morphological refinement
 */
async function performAIRefinement(
  matchResult: any,
  uploadedPhotos: Array<{ view: string; url: string; report?: any }>,
  estimateResult: any,
  semanticResult: any,
  stableScanParams: { sex: 'male' | 'female'; height_cm: number; weight_kg: number },
  resolvedGender: 'masculine' | 'feminine', // MODIFIED: Type updated
  clientScanId: string,
  userId: string // CRITICAL FIX: Add userId parameter
) {
  logger.info('AI_REFINEMENT', 'Starting AI morphological refinement', {
    scanId: clientScanId,
    resolvedGender,
    mappingVersion: 'v1.0',
    blendShapeParamsCount: Object.keys(matchResult.selected_archetypes?.[0]?.morph_values || {}).length,
    philosophy: 'ai_driven_photo_realistic_refinement'
  });

  // Extract photos for AI refinement
  const photosForAI = uploadedPhotos.map(photo => ({
    view: photo.view,
    url: photo.url,
    report: photo.report
  }));

  // Prepare blend data for AI refinement
  const blendShapeParams = matchResult.selected_archetypes?.[0]?.morph_values || {};
  const blendLimbMasses = matchResult.selected_archetypes?.[0]?.limb_masses || {};

  // Prepare user measurements for AI guidance
  const userMeasurements = {
    height_cm: stableScanParams.height_cm,
    weight_kg: stableScanParams.weight_kg,
    estimated_bmi: estimateResult.extracted_data?.estimated_bmi || (stableScanParams.weight_kg / Math.pow(stableScanParams.height_cm / 100, 2)),
    raw_measurements: {
      waist_cm: estimateResult.extracted_data?.raw_measurements?.waist_cm || 80,
      chest_cm: estimateResult.extracted_data?.raw_measurements?.chest_cm || 95,
      hips_cm: estimateResult.extracted_data?.raw_measurements?.hips_cm || 100
    }
  };

  let aiRefinementResult = null;
  try {
    aiRefinementResult = await bodyScanRepo.refine({
      scan_id: clientScanId,
      user_id: userId, // CRITICAL FIX: Use passed userId parameter
      resolvedGender: resolvedGender, // MODIFIED: Directly use resolvedGender
      photos: photosForAI,
      blend_shape_params: blendShapeParams,
      blend_limb_masses: blendLimbMasses,
      k5_envelope: matchResult.k5_envelope,
      vision_classification: semanticResult.semantic_profile,
      mapping_version: 'v1.0',
      user_measurements: userMeasurements
    });

    logger.info('AI_REFINEMENT', 'AI refinement completed successfully', {
      scanId: clientScanId,
      resolvedGender,
      aiRefine: aiRefinementResult.ai_refine,
      finalShapeParamsCount: Object.keys(aiRefinementResult.final_shape_params || {}).length,
      finalLimbMassesCount: Object.keys(aiRefinementResult.final_limb_masses || {}).length,
      clampedKeysCount: aiRefinementResult.clamped_keys?.length || 0,
      outOfRangeCount: aiRefinementResult.out_of_range_count || 0,
      activeKeysCount: aiRefinementResult.active_keys_count || 0,
      aiConfidence: aiRefinementResult.ai_confidence,
      topDeltas: aiRefinementResult.refinement_deltas?.top_10_shape_deltas?.slice(0, 3) || [],
      philosophy: 'ai_refinement_success'
    });

    // Enhance match result with AI refinement
    matchResult.ai_refinement = aiRefinementResult;
    matchResult.final_shape_params = aiRefinementResult.final_shape_params;
    matchResult.final_limb_masses = aiRefinementResult.final_limb_masses;

  } catch (aiError) {
    logger.warn('AI_REFINEMENT', 'AI refinement failed, using blend fallback', {
      scanId: clientScanId,
      resolvedGender,
      error: aiError instanceof Error ? aiError.message : 'Unknown error',
      philosophy: 'ai_refinement_fallback'
    });

    // Continue with blend data if AI refinement fails
    matchResult.ai_refinement = {
      ai_refine: false,
      error: aiError instanceof Error ? aiError.message : 'Unknown error',
      fallback_used: true
    };
  }

  return matchResult;
}

/**
 * Call scan-commit Edge Function
 * @returns Object containing commitResult and extracted skinTone
 */
async function callScanCommit(
  userId: string,
  estimateResult: any,
  matchResult: any,
  semanticResult: any,
  capturedPhotos: CapturedPhotoEnhanced[],
  resolvedGender: 'masculine' | 'feminine', // MODIFIED: Type updated
  clientScanId: string
): Promise<{ commitResult: any; skinTone: any }> {
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: Starting scan-commit', {
    clientScanId,
    requestData: {
      userId,
      hasEstimateResult: !!estimateResult,
      hasMatchResult: !!matchResult,
      hasSemanticResult: !!semanticResult,
      hasAIRefinement: !!matchResult.ai_refinement
    }
  });

  // DEBUG: Log matchResult structure to identify available properties
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: Analyzing matchResult structure', {
    clientScanId,
    matchResultKeys: matchResult ? Object.keys(matchResult) : [],
    hasK5Envelope: !!matchResult?.k5_envelope,
    hasMorphBounds: !!matchResult?.morph_bounds,
    hasSelectedArchetypes: !!matchResult?.selected_archetypes,
    selectedArchetypesCount: matchResult?.selected_archetypes?.length || 0,
    hasAIRefinement: !!matchResult?.ai_refinement,
    philosophy: 'debug_match_result_structure'
  });

  // CRITICAL: Extract final avatar data for persistence
  const finalShapeParams = matchResult.ai_refinement?.final_shape_params ||
                          matchResult.final_shape_params ||
                          matchResult.selected_archetypes?.[0]?.morph_values || {};
  const finalLimbMasses = matchResult.ai_refinement?.final_limb_masses ||
                         matchResult.final_limb_masses ||
                         matchResult.selected_archetypes?.[0]?.limb_masses || {};

  // CRITICAL FIX: Use the V2 skin tone extractor from dataExtractors
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: 🔍 About to import V2 skin tone extractor', {
    clientScanId,
    philosophy: 'pre_skin_tone_extraction_import'
  });

  let skinTone;
  try {
    // Simple log to verify we reach this point
    console.log('🔍 [SKIN TONE DEBUG] Starting extraction, photos count:', capturedPhotos?.length || 0);

    const { extractSkinToneFromScanData: extractSkinToneV2 } = await import('../utils/dataExtractors');
    logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: ✅ V2 extractor imported successfully', {
      clientScanId,
      philosophy: 'extractor_import_success'
    });

    // CRITICAL FIX: Convert capturedPhotos to format expected by extractor
    // The extractor expects photos with { report: { skin_tone } }
    // capturedPhotos has { captureReport: { skin_tone } }
    const photosForExtraction = capturedPhotos.map(photo => ({
      view: photo.type,
      url: photo.url,
      report: photo.captureReport  // Map captureReport to report
    }));

    // Pass converted photos to use Priority 1 (photo capture reports with correct skin tone)
    skinTone = extractSkinToneV2(photosForExtraction, estimateResult, clientScanId);

    logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: ✅ Skin tone extracted successfully', {
      clientScanId,
      hasSkinTone: !!skinTone,
      skinToneType: typeof skinTone,
      skinToneKeys: skinTone && typeof skinTone === 'object' ? Object.keys(skinTone) : [],
      skinToneSchema: skinTone?.schema,
      skinToneRGB: skinTone?.rgb ? `rgb(${skinTone.rgb.r}, ${skinTone.rgb.g}, ${skinTone.rgb.b})` : 'unknown',
      skinToneHex: skinTone?.hex || 'unknown',
      philosophy: 'skin_tone_extraction_success'
    });
  } catch (skinToneError) {
    logger.error('SCAN_PROCESSING_SERVICE', 'Step 4: ❌ Skin tone extraction FAILED', {
      clientScanId,
      error: skinToneError instanceof Error ? skinToneError.message : String(skinToneError),
      stack: skinToneError instanceof Error ? skinToneError.stack : undefined,
      errorType: skinToneError?.constructor?.name,
      errorName: skinToneError instanceof Error ? skinToneError.name : 'unknown',
      capturedPhotosCount: capturedPhotos?.length || 0,
      hasEstimateResult: !!estimateResult,
      philosophy: 'skin_tone_extraction_fatal_error'
    });

    // Log full error to console for debugging
    console.error('🚨 [SKIN TONE EXTRACTION ERROR] Full error details:', skinToneError);

    throw skinToneError;
  }

  // CRITICAL FIX: Use k5_envelope instead of morph_bounds
  // scan-match returns k5_envelope, not morph_bounds
  const k5Envelope = matchResult.k5_envelope || null;

  logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: Building commit request', {
    clientScanId,
    hasFinalShapeParams: !!finalShapeParams,
    finalShapeParamsCount: Object.keys(finalShapeParams).length,
    finalShapeParamsKeys: Object.keys(finalShapeParams).slice(0, 5),
    hasFinalLimbMasses: !!finalLimbMasses,
    finalLimbMassesCount: Object.keys(finalLimbMasses).length,
    finalLimbMassesKeys: Object.keys(finalLimbMasses),
    hasSkinTone: !!skinTone,
    hasK5Envelope: !!k5Envelope,
    hasAIRefinement: !!matchResult.ai_refinement,
    aiRefined: !!matchResult.ai_refinement?.ai_refine,
    philosophy: 'pre_commit_request_construction_v2'
  });

  const commitRequest = {
    user_id: userId,
    resolvedGender,
    estimate_result: estimateResult,
    match_result: matchResult,
    morph_bounds: k5Envelope, // FIXED: Use k5_envelope from matchResult
    semantic_result: semanticResult,
    ai_refinement_result: matchResult.ai_refinement,
    validation_metadata: {},
    temporal_analysis: {},
    smoothing_metadata: {},
    visionfit_result: {},
    photos_metadata: capturedPhotos.map(photo => ({
      type: photo.type,
      captureReport: photo.captureReport
    })),
    // CRITICAL: Include complete avatar data for server persistence
    final_shape_params: finalShapeParams,
    final_limb_masses: finalLimbMasses,
    skin_tone: skinTone,
    resolved_gender: resolvedGender,
    mapping_version: 'v1.0',
    gltf_model_id: `${resolvedGender}_v4.13`,
    material_config_version: 'pbr-v2',
    avatar_version: 'v2.0',
    clientScanId
  };

  // CRITICAL: Log the complete commit request structure AND skin tone details before sending
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: Complete commit request prepared', {
    clientScanId,
    requestKeys: Object.keys(commitRequest),
    finalDataSummary: {
      finalShapeParamsCount: Object.keys(finalShapeParams).length,
      finalLimbMassesCount: Object.keys(finalLimbMasses).length,
      skinTonePresent: !!skinTone,
      aiRefinementPresent: !!matchResult.ai_refinement,
      aiRefine: matchResult.ai_refinement?.ai_refine || false,
      k5EnvelopePresent: !!k5Envelope
    },
    philosophy: 'commit_request_structure_audit_v2'
  });

  // CRITICAL: Log complete skin tone structure before sending to scan-commit
  logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: 🎨 SKIN TONE BEFORE COMMIT', {
    clientScanId,
    skinToneComplete: skinTone,
    skinToneKeys: skinTone && typeof skinTone === 'object' ? Object.keys(skinTone) : [],
    skinToneSchema: skinTone?.schema,
    skinToneRGB: skinTone?.rgb,
    skinToneHex: skinTone?.hex,
    skinToneSource: skinTone?.source,
    skinToneConfidence: skinTone?.confidence,
    philosophy: 'CRITICAL_SKIN_TONE_AUDIT_BEFORE_COMMIT'
  });

  try {
    logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: Complete avatar data prepared for commit', {
      clientScanId,
      finalShapeParamsCount: Object.keys(finalShapeParams).length,
      finalLimbMassesCount: Object.keys(finalLimbMasses).length,
      hasSkinTone: !!skinTone,
      skinToneType: typeof skinTone,
      skinToneKeys: skinTone && typeof skinTone === 'object' ? Object.keys(skinTone) : [],
      skinToneV2: skinTone && skinTone.rgb ? {
        rgb: `rgb(${skinTone.rgb.r}, ${skinTone.rgb.g}, ${skinTone.rgb.b})`,
        hex: skinTone.hex,
        schema: skinTone.schema,
        source: skinTone.source,
        confidence: skinTone.confidence
      } : 'invalid_or_missing',
      skinToneRaw: JSON.stringify(skinTone),
      resolvedGender,
      philosophy: 'complete_avatar_data_v2_for_server_persistence'
    });
  } catch (logError) {
    logger.error('SCAN_PROCESSING_SERVICE', 'Failed to log skin tone structure', {
      clientScanId,
      error: logError instanceof Error ? logError.message : String(logError),
      skinToneType: typeof skinTone,
      skinToneStringified: String(skinTone)
    });
  }

  logger.info('SCAN_PROCESSING_SERVICE', '🚨 CRITICAL: About to call bodyScanRepo.commit', {
    clientScanId,
    requestKeys: Object.keys(commitRequest),
    requestSummary: {
      user_id: commitRequest.user_id?.substring(0, 8) + '...',
      resolved_gender: commitRequest.resolvedGender,
      has_final_shape_params: !!commitRequest.final_shape_params,
      final_shape_params_count: commitRequest.final_shape_params ? Object.keys(commitRequest.final_shape_params).length : 0,
      has_final_limb_masses: !!commitRequest.final_limb_masses,
      final_limb_masses_count: commitRequest.final_limb_masses ? Object.keys(commitRequest.final_limb_masses).length : 0,
      has_skin_tone: !!commitRequest.skin_tone,
      skin_tone_type: typeof commitRequest.skin_tone,
      skin_tone_preview: commitRequest.skin_tone && typeof commitRequest.skin_tone === 'object' ? {
        has_rgb: !!commitRequest.skin_tone.rgb,
        has_hex: !!commitRequest.skin_tone.hex,
        has_schema: !!commitRequest.skin_tone.schema,
        schema_value: commitRequest.skin_tone.schema
      } : 'not_object'
    },
    philosophy: 'pre_commit_call_audit'
  });

  let commitResult;
  try {
    commitResult = await bodyScanRepo.commit(commitRequest);
    logger.info('SCAN_PROCESSING_SERVICE', '✅ bodyScanRepo.commit returned successfully', {
      clientScanId,
      hasResult: !!commitResult,
      resultKeys: commitResult ? Object.keys(commitResult) : []
    });
  } catch (commitError) {
    logger.error('SCAN_PROCESSING_SERVICE', '❌ bodyScanRepo.commit threw error', {
      clientScanId,
      error: commitError instanceof Error ? commitError.message : String(commitError),
      stack: commitError instanceof Error ? commitError.stack : undefined,
      errorType: commitError?.constructor?.name || typeof commitError
    });
    throw commitError;
  }

  logger.info('SCAN_PROCESSING_SERVICE', 'Step 4: scan-commit completed', {
    clientScanId,
    serverScanId: commitResult.scan_id,
    commitSuccess: !!commitResult.success,
    processingComplete: !!commitResult.processing_complete
  });

  // Return both commitResult and skinTone for use in buildCompleteResults
  return { commitResult, skinTone };
}

/**
 * Build complete scan results object
 * @param preExtractedSkinTone - CRITICAL: Use the V2 skin tone already extracted in Step 4 to avoid fallback
 */
function buildCompleteResults(
  estimateResult: any,
  semanticResult: any,
  matchResult: any,
  commitResult: any,
  uploadedPhotos: any[],
  stableScanParams: { sex: 'male' | 'female'; height_cm: number; weight_kg: number },
  resolvedGender: 'masculine' | 'feminine', // MODIFIED: Type updated
  clientScanId: string,
  userId: string,
  preExtractedSkinTone?: any // CRITICAL FIX: Accept pre-extracted V2 skin tone to ensure consistency
) {
  logger.info('BUILD_COMPLETE_RESULTS', 'Building complete results with pre-extracted skin tone', {
    clientScanId,
    hasPreExtractedSkinTone: !!preExtractedSkinTone,
    skinToneSchema: preExtractedSkinTone?.schema,
    philosophy: 'use_pre_extracted_skin_tone_v2'
  });

  // Determine which skin tone to use
  const finalSkinTone = preExtractedSkinTone || extractSkinToneFromScanData(uploadedPhotos, estimateResult, clientScanId);
  const usedPreExtracted = !!preExtractedSkinTone;

  logger.info('BUILD_COMPLETE_RESULTS', '🎨 CRITICAL: Final skin tone decision for complete results', {
    clientScanId,
    usedPreExtracted,
    finalSkinToneSchema: finalSkinTone?.schema,
    finalSkinToneRGB: finalSkinTone?.rgb ? `rgb(${finalSkinTone.rgb.r}, ${finalSkinTone.rgb.g}, ${finalSkinTone.rgb.b})` :
                      (finalSkinTone?.r ? `rgb(${finalSkinTone.r}, ${finalSkinTone.g}, ${finalSkinTone.b})` : 'unknown'),
    finalSkinToneHex: finalSkinTone?.hex || 'unknown',
    finalSkinToneSource: finalSkinTone?.source,
    finalSkinToneConfidence: finalSkinTone?.confidence,
    philosophy: usedPreExtracted ? 'using_pre_extracted_v2_no_fallback' : 'emergency_extraction_called'
  });

  return {
    resolvedGender,
    estimate: estimateResult,
    semantic: semanticResult,
    match: matchResult,
    commit: commitResult,
    userId: userId, // CRITICAL FIX: Use actual userId, not sex
    serverScanId: commitResult.scan_id,
    userProfile: {
      ...stableScanParams,
      sex: resolvedGender
    },
    insights: generateInsights(estimateResult, semanticResult, matchResult),
    clientScanId,
    // CRITICAL FIX: Use pre-extracted V2 skin tone if available, preventing fallback
    skin_tone: finalSkinTone,
    limb_masses: extractLimbMassesFromScanData(matchResult, estimateResult, clientScanId),
  };
}

/**
 * Generate insights from scan results
 */
function generateInsights(estimateResult: any, semanticResult: any, matchResult: any) {
  const insights = [];

  // Add confidence insight
  const confidence = estimateResult?.extracted_data?.processing_confidence || 0;
  if (confidence > 0.8) {
    insights.push({
      id: 'high-confidence',
      type: 'achievement',
      title: 'Analyse de Haute Qualité',
      description: `Votre scan a été analysé avec ${Math.round(confidence * 100)}% de confiance.`,
      category: 'morphology',
      priority: 'high',
      confidence: confidence,
      source: 'ai_analysis',
      color: '#22C55E'
    });
  }

  // Add archetype insight
  if (matchResult?.selected_archetypes?.length > 0) {
    const primaryArchetype = matchResult.selected_archetypes[0];
    insights.push({
      id: 'archetype-match',
      type: 'observation',
      title: 'Profil Morphologique',
      description: `Votre morphologie correspond au profil "${primaryArchetype.name}".`,
      category: 'morphology',
      priority: 'medium',
      confidence: 0.8,
      source: 'archetype',
      color: '#8B5CF6'
    });
  }

  // Add semantic insights
  if (semanticResult?.semantic_profile) {
    const semantic = semanticResult.semantic_profile;
    insights.push({
      id: 'semantic-classification',
      type: 'observation',
      title: 'Classification Morphologique',
      description: `Profil: ${semantic.obesity} • ${semantic.muscularity} • ${semantic.morphotype}`,
      category: 'morphology',
      priority: 'medium',
      confidence: semanticResult.semantic_confidence || 0.6,
      source: 'semantic',
      color: '#06B6D4'
    });
  }

  return {
    items: insights,
    source: 'generated',
    confidence: confidence || 0.8
  };
}

/**
 * DEPRECATED: This function has been replaced by the V2 version in dataExtractors.ts
 * Kept as emergency fallback only if pre-extracted skin tone is not available
 * @deprecated Use extractSkinToneFromScanData from dataExtractors.ts instead
 */
function extractSkinToneFromScanData(
  uploadedPhotos: any[],
  estimateResult: any,
  clientScanId: string
): { r: number; g: number; b: number; confidence?: number } {
  logger.warn('SKIN_TONE_EXTRACTION_DEPRECATED', 'Using deprecated skin tone extraction - should use V2 from dataExtractors', {
    clientScanId,
    uploadedPhotosCount: uploadedPhotos?.length || 0,
    hasEstimateResult: !!estimateResult,
    philosophy: 'emergency_fallback_only'
  });

  // Priority 1: From estimate extracted_data (Vision AI)
  const extractedSkinTone = estimateResult?.extracted_data?.skin_tone;

  // Check for V2 format
  if (extractedSkinTone?.schema === 'v2' && extractedSkinTone?.rgb) {
    logger.info('SKIN_TONE_EXTRACTION_DEPRECATED', 'Found V2 skin tone from Vision AI', {
      clientScanId,
      skinTone: `rgb(${extractedSkinTone.rgb.r}, ${extractedSkinTone.rgb.g}, ${extractedSkinTone.rgb.b})`,
      confidence: extractedSkinTone.confidence || 'unknown',
      source: 'estimate_extracted_data_v2'
    });
    return {
      r: extractedSkinTone.rgb.r,
      g: extractedSkinTone.rgb.g,
      b: extractedSkinTone.rgb.b,
      confidence: extractedSkinTone.confidence
    };
  }

  // Check for legacy format
  if (extractedSkinTone && typeof extractedSkinTone === 'object' &&
      typeof extractedSkinTone.r === 'number' && typeof extractedSkinTone.g === 'number' && typeof extractedSkinTone.b === 'number') {
    logger.info('SKIN_TONE_EXTRACTION_DEPRECATED', 'Found legacy skin tone from Vision AI', {
      clientScanId,
      skinTone: `rgb(${extractedSkinTone.r}, ${extractedSkinTone.g}, ${extractedSkinTone.b})`,
      confidence: extractedSkinTone.confidence || 'unknown',
      source: 'estimate_extracted_data_legacy'
    });
    return extractedSkinTone;
  }

  // Emergency fallback
  const fallbackSkinTone = { r: 153, g: 108, b: 78, confidence: 0.5 };
  logger.error('SKIN_TONE_EXTRACTION_DEPRECATED', 'Using emergency fallback - this should not happen', {
    clientScanId,
    fallbackSkinTone: `rgb(${fallbackSkinTone.r}, ${fallbackSkinTone.g}, ${fallbackSkinTone.b})`,
    reason: 'no_valid_skin_tone_found_in_scan_data',
    source: 'emergency_fallback'
  });

  return fallbackSkinTone;
}

/**
 * Extract limb masses from scan data with detailed logging and fallback strategy
 */
function extractLimbMassesFromScanData(
  matchResult: any,
  estimateResult: any,
  clientScanId: string
): Record<string, number> {
  logger.info('LIMB_MASSES_EXTRACTION', 'Starting limb masses extraction from scan data', {
    clientScanId,
    hasMatchResult: !!matchResult,
    hasEstimateResult: !!estimateResult,
    matchResultKeys: matchResult ? Object.keys(matchResult) : []
  });

  // Priority 1: From match result blended limb masses
  const blendedLimbMasses = matchResult?.blended_limb_masses || 
                           matchResult?.advanced_matching?.blending?.blended_limb_masses;

  if (blendedLimbMasses && typeof blendedLimbMasses === 'object' && Object.keys(blendedLimbMasses).length > 0) {
    logger.info('LIMB_MASSES_EXTRACTION', 'Found limb masses from match result blending', {
      clientScanId,
      limbMassesKeys: Object.keys(blendedLimbMasses),
      sampleValues: Object.entries(blendedLimbMasses).slice(0, 3).map(([k, v]) => ({ key: k, value: v })),
      source: 'match_result_blended'
    });
    return blendedLimbMasses;
  }

  // Priority 2: From selected archetypes (use primary archetype)
  const selectedArchetypes = matchResult?.selected_archetypes;
  if (selectedArchetypes && Array.isArray(selectedArchetypes) && selectedArchetypes.length > 0) {
    const primaryArchetype = selectedArchetypes[0];
    const archetypeLimbMasses = primaryArchetype?.limb_masses;

    if (archetypeLimbMasses && typeof archetypeLimbMasses === 'object' && Object.keys(archetypeLimbMasses).length > 0) {
      logger.info('LIMB_MASSES_EXTRACTION', 'Found limb masses from primary archetype', {
        clientScanId,
        archetypeId: primaryArchetype.id,
        archetypeName: primaryArchetype.name,
        limbMassesKeys: Object.keys(archetypeLimbMasses),
        sampleValues: Object.entries(archetypeLimbMasses).slice(0, 3).map(([k, v]) => ({ key: k, value: v })),
        source: 'primary_archetype'
      });
      return archetypeLimbMasses;
    }
  }

  // Fallback: Generate intelligent limb masses
  return generateIntelligentLimbMassesFallback(estimateResult, clientScanId);
}

/**
 * Generate intelligent limb masses fallback
 */
function generateIntelligentLimbMassesFallback(
  estimateResult: any,
  clientScanId: string
): Record<string, number> {
  const estimatedBMI = estimateResult?.extracted_data?.estimated_bmi || 22;
  const bodyFatPerc = estimateResult?.extracted_data?.estimated_body_fat_perc || 15;

  // Calculate BMI factor for limb mass variation
  const bmiFactor = Math.max(0.7, Math.min(1.4, estimatedBMI / 22));
  const fatFactor = Math.max(0.8, Math.min(1.3, bodyFatPerc / 15));

  // Generate varied limb masses based on anthropometric data
  const intelligentLimbMasses = {
    gate: 1.0,
    armMass: 1.0 + (bmiFactor - 1.0) * 0.3 + (fatFactor - 1.0) * 0.2,
    calfMass: 1.0 + (bmiFactor - 1.0) * 0.25 + (fatFactor - 1.0) * 0.15,
    neckMass: 1.0 + (bmiFactor - 1.0) * 0.2 + (fatFactor - 1.0) * 0.1,
    thighMass: 1.0 + (bmiFactor - 1.0) * 0.4 + (fatFactor - 1.0) * 0.3,
    torsoMass: 1.0 + (bmiFactor - 1.0) * 0.5 + (fatFactor - 1.0) * 0.4,
    forearmMass: 1.0 + (bmiFactor - 1.0) * 0.25 + (fatFactor - 1.0) * 0.15,
  };

  // Clamp to reasonable ranges
  Object.keys(intelligentLimbMasses).forEach(key => {
    if (key !== 'gate') {
      intelligentLimbMasses[key] = Math.max(0.6, Math.min(1.6, intelligentLimbMasses[key]));
    }
  });

  logger.info('LIMB_MASSES_EXTRACTION', 'Generated intelligent limb masses fallback', {
    clientScanId,
    estimatedBMI: estimatedBMI.toFixed(2),
    bodyFatPerc: bodyFatPerc.toFixed(1),
    bmiFactor: bmiFactor.toFixed(3),
    fatFactor: fatFactor.toFixed(3),
    generatedMasses: Object.entries(intelligentLimbMasses).map(([k, v]) => ({ key: k, value: v.toFixed(3) }))
  });

  return intelligentLimbMasses;
}
