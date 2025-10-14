/*
  Fonction Edge: activity-analyzer
  Agent 2 - Analyse des activités avec gpt-5-mini
  
  Rôle: Extraire les activités, durées, intensités et calculer les calories
  Modèle: gpt-5-mini (optimisé pour le raisonnement et l'analyse)
*/ import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';
// Table MET pour différentes activités (valeurs de référence)
const MET_VALUES = {
  // Cardio
  'marche_lente': {
    low: 2.5,
    medium: 3.0,
    high: 3.5,
    very_high: 4.0
  },
  'marche_rapide': {
    low: 3.5,
    medium: 4.0,
    high: 4.5,
    very_high: 5.0
  },
  'course': {
    low: 6.0,
    medium: 8.0,
    high: 10.0,
    very_high: 12.0
  },
  'velo': {
    low: 4.0,
    medium: 6.0,
    high: 8.0,
    very_high: 10.0
  },
  'natation': {
    low: 4.0,
    medium: 6.0,
    high: 8.0,
    very_high: 10.0
  },
  // Musculation
  'musculation': {
    low: 3.0,
    medium: 4.0,
    high: 5.0,
    very_high: 6.0
  },
  'crossfit': {
    low: 5.0,
    medium: 7.0,
    high: 9.0,
    very_high: 12.0
  },
  'calisthenics': {
    low: 3.5,
    medium: 4.5,
    high: 5.5,
    very_high: 6.5
  },
  // Sports
  'football': {
    low: 4.0,
    medium: 6.0,
    high: 8.0,
    very_high: 10.0
  },
  'basketball': {
    low: 4.5,
    medium: 6.5,
    high: 8.5,
    very_high: 10.5
  },
  'tennis': {
    low: 4.0,
    medium: 5.5,
    high: 7.0,
    very_high: 8.5
  },
  // Autres
  'yoga': {
    low: 2.0,
    medium: 2.5,
    high: 3.0,
    very_high: 3.5
  },
  'pilates': {
    low: 2.5,
    medium: 3.0,
    high: 3.5,
    very_high: 4.0
  },
  'danse': {
    low: 3.0,
    medium: 4.5,
    high: 6.0,
    very_high: 7.5
  },
  'escalade': {
    low: 5.0,
    medium: 7.0,
    high: 9.0,
    very_high: 11.0
  },
  // Défaut pour activités non reconnues
  'activite_generale': {
    low: 3.0,
    medium: 4.0,
    high: 5.0,
    very_high: 6.0
  }
};
function calculateCalories(metValue, weightKg, durationMin) {
  // Formule MET: Calories = METs × Poids (kg) × Durée (heures)
  const durationHours = durationMin / 60;
  const calories = metValue * weightKg * durationHours;
  return Math.round(calories);
}
function getMetValue(activityType, intensity) {
  const normalizedType = activityType.toLowerCase().replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/[ç]/g, 'c');
  // Recherche de correspondance dans la table MET
  for (const [key, values] of Object.entries(MET_VALUES)){
    if (normalizedType.includes(key.replace('_', ' ')) || normalizedType.includes(key.replace('_', ''))) {
      return values[intensity] || values.medium;
    }
  }
  // Valeur par défaut
  return MET_VALUES.activite_generale[intensity] || 4.0;
}
function calculateAge(birthdate) {
  if (!birthdate) return 30; // Âge par défaut
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
    age--;
  }
  return Math.max(16, Math.min(100, age)); // Limites raisonnables
}
Deno.serve(async (req)=>{
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }
  try {
    const { cleanText, userId, userProfile, clientTraceId } = await req.json();
    const startTime = Date.now();
    console.log('🔥 [ACTIVITY_ANALYZER] Starting analysis', {
      userId,
      clientTraceId,
      textLength: cleanText?.length || 0,
      userProfile: {
        weight_kg: userProfile?.weight_kg,
        sex: userProfile?.sex,
        activity_level: userProfile?.activity_level
      },
      timestamp: new Date().toISOString()
    });
    // Validation des données d'entrée
    if (!cleanText || !userId || !userProfile?.weight_kg) {
      throw new Error('Clean text, user ID, and user weight are required');
    }
    // Calcul de l'âge pour personnaliser l'analyse
    const userAge = calculateAge(userProfile.birthdate);
    // Prompt optimisé pour gpt-5-mini
    const analysisPrompt = `Tu es un expert en analyse d'activités physiques pour la Forge Énergétique TwinForge.

PROFIL UTILISATEUR:
- Poids: ${userProfile.weight_kg} kg
- Taille: ${userProfile.height_cm || 'Non spécifiée'} cm
- Genre: ${userProfile.sex || 'Non spécifié'}
- Âge: ${userAge} ans
- Niveau d'activité: ${userProfile.activity_level || 'Non spécifié'}

TÂCHE: Analyse le texte suivant qui décrit des activités physiques et extrais:
1. Chaque activité distincte
2. La durée de chaque activité (en minutes)
3. L'intensité de chaque activité (low/medium/high/very_high)
4. Le type d'activité (course, musculation, yoga, etc.)

RÈGLES:
- Si la durée n'est pas mentionnée, estime une durée raisonnable
- L'intensité doit être basée sur les descriptions (facile=low, normal=medium, intense=high, très intense=very_high)
- Sois précis et réaliste dans tes estimations
- Si plusieurs activités sont mentionnées, sépare-les clairement

TEXTE À ANALYSER:
"${cleanText}"

RÉPONSE REQUISE (JSON uniquement):
{
  "activities": [
    {
      "type": "nom_de_l_activite",
      "duration_min": nombre_en_minutes,
      "intensity": "low|medium|high|very_high",
      "notes": "détails_optionnels"
    }
  ],
  "insights": [
    "insight_personnalisé_basé_sur_le_profil"
  ]
}`;
    // Appel à gpt-5-mini pour l'analyse
    const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        reasoning_effort: 'low',
        max_completion_tokens: 2000,
        response_format: {
          type: 'json_object'
        }
      })
    });
    if (!analysisResponse.ok) {
      throw new Error(`Activity analysis failed: ${analysisResponse.statusText}`);
    }
    const analysisData = await analysisResponse.json();
    const analysisResult = JSON.parse(analysisData.choices[0]?.message?.content || '{}');
    // Traitement des résultats et calcul des calories
    const activities = (analysisResult.activities || []).map((activity)=>{
      const metValue = getMetValue(activity.type, activity.intensity);
      const calories = calculateCalories(metValue, userProfile.weight_kg, activity.duration_min);
      return {
        type: activity.type,
        duration_min: activity.duration_min,
        intensity: activity.intensity,
        calories_est: calories,
        met_value: metValue,
        notes: activity.notes || null
      };
    });
    const totalCalories = activities.reduce((sum, activity)=>sum + activity.calories_est, 0);
    const totalDuration = activities.reduce((sum, activity)=>sum + activity.duration_min, 0);
    // Génération d'insights personnalisés pour la Forge Énergétique
    const forgeInsights = [
      `Votre Forge Énergétique a traité ${activities.length} activité${activities.length > 1 ? 's' : ''}`,
      `Énergie forgée: ${totalCalories} calories en ${totalDuration} minutes`,
      ...analysisResult.insights || []
    ];
    const processingTime = Date.now() - startTime;
    // Estimation du coût pour gpt-5-mini
    const estimatedInputTokens = Math.ceil(analysisPrompt.length / 4);
    const estimatedOutputTokens = Math.ceil(JSON.stringify(analysisResult).length / 4);
    const costUsd = estimatedInputTokens / 1000000 * 0.25 + estimatedOutputTokens / 1000000 * 2.0;
    console.log('✅ [ACTIVITY_ANALYZER] Analysis completed', {
      userId,
      clientTraceId,
      activitiesCount: activities.length,
      totalCalories,
      totalDuration,
      processingTime,
      costUsd: costUsd.toFixed(6),
      timestamp: new Date().toISOString()
    });
    // Store cost tracking in database
    try {
      const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
      await supabase.from('ai_analysis_jobs').insert({
        user_id: userId,
        analysis_type: 'activity_analysis',
        status: 'completed',
        request_payload: {
          clientTraceId,
          cleanTextLength: cleanText.length,
          userProfile: {
            weight_kg: userProfile.weight_kg,
            sex: userProfile.sex,
            activity_level: userProfile.activity_level
          }
        },
        result_payload: {
          activities,
          totalCalories,
          totalDuration,
          forgeInsights,
          confidence: 0.85,
          processingTime,
          costUsd,
          estimatedInputTokens,
          estimatedOutputTokens,
          model: 'gpt-5-mini'
        }
      });
      console.log('💰 [ACTIVITY_ANALYZER] Cost tracking saved to database', {
        userId,
        costUsd: costUsd.toFixed(6),
        activitiesCount: activities.length,
        timestamp: new Date().toISOString()
      });
    } catch (dbError) {
      console.error('💰 [ACTIVITY_ANALYZER] Failed to save cost tracking', {
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
        userId,
        costUsd: costUsd.toFixed(6),
        timestamp: new Date().toISOString()
      });
    // Don't fail the main function if cost tracking fails
    }
    const response = {
      activities,
      totalCalories,
      totalDuration,
      processingTime,
      costUsd,
      confidence: 0.85,
      forgeInsights
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('❌ [ACTIVITY_ANALYZER] Error:', error);
    return new Response(JSON.stringify({
      error: 'Activity analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
});
