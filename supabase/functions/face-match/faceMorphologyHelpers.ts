/**
 * Face Morphology Helpers - Adapted from Body Scan
 * Direct face morphology mapping fetching with NO external Edge Function calls
 *
 * CRITICAL FIX: This fetches facial morphology mapping directly from face_archetypes table
 * and builds min/max ranges for face_values (not body morph_values)
 */

import { toCanonicalKey } from '../_shared/utils/faceKeys.ts';

/**
 * Get face morphology mapping directly from database
 * Completely self-sufficient approach that NEVER calls other Edge Functions
 */
export async function getFaceMorphologyMappingDirect(supabase: any) {
  console.log('🔍 [getFaceMorphologyMappingDirect] Starting face mapping fetch from database');

  try {
    console.log('🔍 [getFaceMorphologyMappingDirect] Querying face_archetypes table');

    const { data: archetypes, error: dbError } = await supabase
      .from('face_archetypes')
      .select(`
        id,
        name,
        gender,
        face_shape,
        eye_shape,
        nose_type,
        lip_fullness,
        face_values
      `);

    if (!dbError && archetypes && archetypes.length > 0) {
      console.log('✅ [getFaceMorphologyMappingDirect] Direct DB query successful', {
        archetypesCount: archetypes.length,
        masculineCount: archetypes.filter((a: any) => a.gender === 'masculine').length,
        feminineCount: archetypes.filter((a: any) => a.gender === 'feminine').length,
        philosophy: 'face_mapping_db_query_success'
      });

      const mappingData = buildFaceMappingFromArchetypes(archetypes);

      return {
        success: true,
        data: mappingData,
        metadata: {
          mapping_source: 'database',
          mapping_version: 'v1.0-face-match-direct',
          fallback_used: false,
          fallback_reason: null,
          checksum: `db-${archetypes.length}-face-archetypes`,
          generated_at: new Date().toISOString(),
          total_archetypes_analyzed: archetypes.length
        },
        fallback_used: false
      };
    }

    console.warn('⚠️ [getFaceMorphologyMappingDirect] Direct DB query failed', {
      error: dbError?.message || 'No error message',
      archetypesCount: archetypes?.length || 0,
      dbErrorCode: dbError?.code,
      dbErrorDetails: dbError?.details,
      philosophy: 'db_query_fallback_needed'
    });
  } catch (dbQueryError) {
    console.warn('⚠️ [getFaceMorphologyMappingDirect] Direct DB query exception', {
      error: dbQueryError instanceof Error ? dbQueryError.message : 'Unknown error',
      philosophy: 'db_query_exception_fallback_needed'
    });
  }

  // Fallback: Return error - face archetypes MUST exist
  console.error('❌ [getFaceMorphologyMappingDirect] CRITICAL: No face archetypes found in database');
  return {
    success: false,
    data: null,
    metadata: {
      mapping_source: 'none',
      mapping_version: 'v1.0-face-match-failed',
      fallback_used: false,
      fallback_reason: 'no_face_archetypes_in_database',
      checksum: 'none',
      generated_at: new Date().toISOString(),
      total_archetypes_analyzed: 0
    },
    fallback_used: false,
    error: 'No face archetypes found in database'
  };
}

/**
 * Build face mapping data from archetypes
 */
function buildFaceMappingFromArchetypes(archetypes: any[]) {
  const masculineArchetypes = archetypes.filter((a) => a.gender === 'masculine');
  const feminineArchetypes = archetypes.filter((a) => a.gender === 'feminine');

  console.log('🔍 [buildFaceMappingFromArchetypes] Building face mapping from DB archetypes', {
    totalArchetypes: archetypes.length,
    masculineCount: masculineArchetypes.length,
    feminineCount: feminineArchetypes.length,
    philosophy: 'direct_db_face_mapping_construction'
  });

  return {
    mapping_masculine: buildGenderFaceMapping(masculineArchetypes, 'masculine'),
    mapping_feminine: buildGenderFaceMapping(feminineArchetypes, 'feminine')
  };
}

/**
 * Build gender-specific face mapping
 */
function buildGenderFaceMapping(genderArchetypes: any[], gender: string) {
  // Extract unique semantic categories
  const face_shapes = [...new Set(genderArchetypes.map((a) => a.face_shape).filter(Boolean))].sort();
  const eye_shapes = [...new Set(genderArchetypes.map((a) => a.eye_shape).filter(Boolean))].sort();
  const nose_types = [...new Set(genderArchetypes.map((a) => a.nose_type).filter(Boolean))].sort();
  const lip_fullness = [...new Set(genderArchetypes.map((a) => a.lip_fullness).filter(Boolean))].sort();

  // Build face_values ranges
  const face_values = buildFaceValuesRanges(genderArchetypes);

  console.log('🔍 [buildGenderFaceMapping] Gender face mapping built', {
    gender,
    face_shapes: face_shapes.length,
    eye_shapes: eye_shapes.length,
    nose_types: nose_types.length,
    lip_fullness: lip_fullness.length,
    faceValuesKeys: Object.keys(face_values).length,
    sampleKeys: Object.keys(face_values).slice(0, 5)
  });

  return {
    face_shapes,
    eye_shapes,
    nose_types,
    lip_fullness,
    face_values,
    limb_masses: {} // Empty for face scans
  };
}

/**
 * Build face_values ranges from archetypes
 * CRITICAL: This normalizes keys to canonical format (without BS_LOD0. prefix)
 */
function buildFaceValuesRanges(archetypes: any[]) {
  const faceValuesRanges: Record<string, { min: number; max: number }> = {};

  archetypes.forEach((archetype) => {
    let faceValues: any;

    try {
      faceValues = typeof archetype.face_values === 'string'
        ? JSON.parse(archetype.face_values)
        : archetype.face_values;
    } catch (error) {
      console.warn('[buildFaceValuesRanges] Failed to parse face_values for archetype', archetype.id);
      return;
    }

    if (faceValues && typeof faceValues === 'object') {
      Object.entries(faceValues).forEach(([key, value]) => {
        if (typeof value === 'number' && Number.isFinite(value)) {
          // Normalize key to canonical format (remove BS_LOD0. prefix)
          const canonicalKey = toCanonicalKey(key);

          if (!faceValuesRanges[canonicalKey]) {
            faceValuesRanges[canonicalKey] = {
              min: value,
              max: value
            };
          } else {
            faceValuesRanges[canonicalKey].min = Math.min(faceValuesRanges[canonicalKey].min, value);
            faceValuesRanges[canonicalKey].max = Math.max(faceValuesRanges[canonicalKey].max, value);
          }
        }
      });
    }
  });

  console.log('🔍 [buildFaceValuesRanges] Face values ranges built', {
    totalKeys: Object.keys(faceValuesRanges).length,
    sampleKeys: Object.keys(faceValuesRanges).slice(0, 10),
    sampleRanges: Object.entries(faceValuesRanges)
      .slice(0, 5)
      .map(([k, v]) => ({
        key: k,
        min: v.min.toFixed(3),
        max: v.max.toFixed(3)
      }))
  });

  return faceValuesRanges;
}
