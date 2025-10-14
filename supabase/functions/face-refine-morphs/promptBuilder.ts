import { canonicalizeDict, canonicalizeK5Envelope } from '../_shared/utils/faceKeys.ts';

/** Builds the OpenAI prompt (canonical keys only) */
export function buildAIRefinementPrompt(options: any) {
  const { photos, blend_face_params, mappingData, resolvedGender, k5_envelope, face_semantic_profile, traceId } = options;

  const blend = canonicalizeDict<number>(blend_face_params || {});
  const k5    = canonicalizeK5Envelope(k5_envelope);
  const dbb   = mappingData.face_values || {};

  const blendStr = Object.entries(blend).map(([k,v]) => `${k}: ${Number.isFinite(v) ? v.toFixed(3) : '0.000'}`).join(', ');
  const k5Str    = Object.entries(k5.shape_params_envelope).map(([k,b]) => `${k}: [${b.min.toFixed(3)}, ${b.max.toFixed(3)}]`).join(', ');
  const dbStr    = Object.entries(dbb).map(([k,b]) => `${k}: [${b.min.toFixed(3)}, ${b.max.toFixed(3)}]`).join(', ');

  const prompt = `
Analyze the provided photos (front + profile) to create personalized 3D facial parameters. PRIORITIZE photo measurements over archetypes.

TASK: Extract facial measurements from photos and adjust parameters within bounds.

DATA:
- Blended Params: { ${blendStr} }
- K=5 Bounds: { ${k5Str} }
- DB Limits: { ${dbStr} }
- Profile: ${face_semantic_profile.face_shape}, ${face_semantic_profile.eye_shape}, ${face_semantic_profile.nose_type}, ${face_semantic_profile.lip_fullness}
- Gender: ${resolvedGender}

RULES:
1) Analyze photos for face shape, eyes, nose, mouth, cheeks
2) Adjust params to match photos (prioritize photos over archetypes)
3) Stay within K=5 bounds, then DB limits
4) Return canonical keys only (no "BS_LOD0.")
5) Aim for 60%+ active params (|value| > 0.05)

OUTPUT JSON:
{
  "final_face_params": { "FaceJawWidth": <num>, ... },
  "ai_confidence": <0-1>,
  "clamped_keys": [],
  "envelope_violations": [],
  "db_violations": []
}
`;
  console.log(`📝 [promptBuilder] [${traceId}] AI Prompt built (canonical).`);
  return prompt;
}
