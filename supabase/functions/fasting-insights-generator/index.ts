import { createClient } from 'npm:@supabase/supabase-js@2.54.0';
import { createHash } from 'node:crypto';

/**
 * GPT-5 Mini pricing for cost calculation and logging
 */
const GPT5_MINI_PRICING = {
  inputTokensPerDollar: 1000000 / 0.15,  // ~6.67M tokens per $1 for input
  outputTokensPerDollar: 1000000 / 0.60, // ~1.67M tokens per $1 for output
  avgInputOutputRatio: 0.3 // Assume 30% of tokens are output
};

/**
 * Calculate cost from tokens for logging purposes
 */
function calculateCostFromTokens(totalTokens: number): number {
  const inputTokens = Math.round(totalTokens * (1 - GPT5_MINI_PRICING.avgInputOutputRatio));
  const outputTokens = Math.round(totalTokens * GPT5_MINI_PRICING.avgInputOutputRatio);
  
  const inputCost = inputTokens / GPT5_MINI_PRICING.inputTokensPerDollar;
  const outputCost = outputTokens / GPT5_MINI_PRICING.outputTokensPerDollar;
  
  return inputCost + outputCost;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, apikey",
};

interface FastingSession {
  id: string;
  start_time: string;
  end_time: string | null;
  target_hours: number;
  actual_duration_hours: number | null;
  protocol_id: string | null;
  status: 'active' | 'completed' | 'cancelled';
  notes: string | null;
}

interface UserProfile {
  weight_kg?: number;
  height_cm?: number;
  objective?: string;
  activity_level?: string;
  sex?: string;
  birthdate?: string;
  emotions?: {
    chronotype?: string;
    stress?: number;
    sleepHours?: number;
  };
  nutrition?: {
    diet?: string;
    fastingWindow?: {
      protocol?: string;
      windowHours?: number;
    };
  };
}

interface FastingInsight {
  id: string;
  type: 'pattern' | 'recommendation' | 'achievement' | 'warning';
  priority: 'low' | 'medium' | 'high';
  title: string;
  content: string;
  actionable?: string;
  icon: string;
  color: string;
}

interface FastingInsightsSummary {
  overallScore: number;
  keyFindings: string[];
  mainRecommendation: string;
  sentiment: 'positive' | 'neutral' | 'encouraging';
}

interface FastingInsightsResponse {
  summary: FastingInsightsSummary;
  insights: FastingInsight[];
  dataQuality: 'excellent' | 'good' | 'limited' | 'insufficient';
  analysisDate: string;
  periodDays: number;
  aiModel: string;
  tokensUsed: number;
  cached: boolean;
}

/**
 * Generate cache key for fasting insights
 */
function generateCacheKey(userId: string, periodDays: number, profile: UserProfile, sessions: FastingSession[]): string {
  const cacheData = {
    userId,
    periodDays,
    profileHash: {
      weight_kg: profile.weight_kg,
      height_cm: profile.height_cm,
      objective: profile.objective,
      activity_level: profile.activity_level,
      sex: profile.sex,
      chronotype: profile.emotions?.chronotype,
      diet: profile.nutrition?.diet,
      fastingProtocol: profile.nutrition?.fastingWindow?.protocol,
    },
    sessionsHash: sessions.map(s => ({
      target_hours: s.target_hours,
      actual_duration_hours: s.actual_duration_hours,
      status: s.status,
      protocol_id: s.protocol_id,
      date: s.start_time.split('T')[0] // Only date, not time
    }))
  };
  
  return createHash('sha256').update(JSON.stringify(cacheData)).digest('hex');
}

/**
 * Check for cached insights
 */
async function getCachedInsights(supabase: any, userId: string, inputHash: string): Promise<FastingInsightsResponse | null> {
  try {
    const { data, error } = await supabase
      .from('ai_analysis_jobs')
      .select('*')
      .eq('user_id', userId)
      .eq('analysis_type', 'fasting_insights')
      .eq('input_hash', inputHash)
      .eq('status', 'completed')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Cache lookup error:', error);
      return null;
    }

    if (data && data.length > 0) {
      const cachedResult = data[0];
      console.log('FASTING_INSIGHTS_CACHE_HIT', 'Found cached insights', {
        userId,
        inputHash,
        cacheAge: Date.now() - new Date(cachedResult.created_at).getTime(),
        tokensUsed: cachedResult.result_payload?.tokensUsed || 0
      });

      return {
        ...cachedResult.result_payload,
        cached: true
      };
    }

    return null;
  } catch (error) {
    console.error('Cache lookup exception:', error);
    return null;
  }
}

/**
 * Store insights in cache
 */
async function storeInsightsCache(
  supabase: any, 
  userId: string, 
  inputHash: string, 
  insights: FastingInsightsResponse,
  tokensUsed: number
): Promise<void> {
  try {
    const { error } = await supabase
      .from('ai_analysis_jobs')
      .insert({
        user_id: userId,
        analysis_type: 'fasting_insights',
        status: 'completed',
        input_hash: inputHash,
        request_payload: {
          periodDays: insights.periodDays,
          timestamp: new Date().toISOString()
        },
        result_payload: {
          ...insights,
          tokensUsed,
          cached: false
        }
      });

    if (error) {
      console.error('Cache storage error:', error);
    } else {
      console.log('FASTING_INSIGHTS_CACHE_STORE', 'Insights cached successfully', {
        userId,
        inputHash,
        tokensUsed
      });
    }
  } catch (error) {
    console.error('Cache storage exception:', error);
  }
}

/**
 * Build AI prompt for fasting insights
 */
function buildFastingInsightsPrompt(profile: UserProfile, sessions: FastingSession[], periodDays: number): string {
  const completedSessions = sessions.filter(s => s.status === 'completed' && s.actual_duration_hours);
  const totalHours = completedSessions.reduce((sum, s) => sum + (s.actual_duration_hours || 0), 0);
  const avgDuration = completedSessions.length > 0 ? totalHours / completedSessions.length : 0;
  
  // Calculate success rate
  const successfulSessions = completedSessions.filter(s => 
    s.actual_duration_hours && s.target_hours && 
    (s.actual_duration_hours / s.target_hours) >= 0.9
  );
  const successRate = completedSessions.length > 0 ? 
    (successfulSessions.length / completedSessions.length) * 100 : 0;

  return `Tu es un expert en jeûne intermittent et en optimisation métabolique. Analyse les données de jeûne de cet utilisateur et génère des insights personnalisés.

PROFIL UTILISATEUR:
- Sexe: ${profile.sex || 'Non spécifié'}
- Poids: ${profile.weight_kg || 'Non spécifié'} kg
- Taille: ${profile.height_cm || 'Non spécifié'} cm
- Objectif: ${profile.objective || 'Non spécifié'}
- Niveau d'activité: ${profile.activity_level || 'Non spécifié'}
- Chronotype: ${profile.emotions?.chronotype || 'Non spécifié'}
- Niveau de stress: ${profile.emotions?.stress || 'Non spécifié'}/10
- Heures de sommeil: ${profile.emotions?.sleepHours || 'Non spécifié'}h
- Régime alimentaire: ${profile.nutrition?.diet || 'Non spécifié'}
- Protocole de jeûne préféré: ${profile.nutrition?.fastingWindow?.protocol || 'Non spécifié'}

DONNÉES DE JEÛNE (${periodDays} derniers jours):
- Sessions totales: ${sessions.length}
- Sessions complétées: ${completedSessions.length}
- Temps total jeûné: ${totalHours.toFixed(1)}h
- Durée moyenne: ${avgDuration.toFixed(1)}h
- Taux de succès: ${successRate.toFixed(1)}%
- Sessions par protocole: ${JSON.stringify(
  sessions.reduce((acc, s) => {
    const protocol = s.protocol_id || 'custom';
    acc[protocol] = (acc[protocol] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
)}

SESSIONS DÉTAILLÉES:
${completedSessions.slice(0, 10).map(s => 
  `- ${s.start_time.split('T')[0]}: ${s.actual_duration_hours}h/${s.target_hours}h (${s.protocol_id || 'custom'})`
).join('\n')}

INSTRUCTIONS:
1. Génère un résumé global avec un score de 0-100 basé sur la régularité, la progression et l'atteinte des objectifs
2. Identifie 3-5 insights spécifiques (patterns, recommandations, achievements, warnings)
3. Chaque insight doit avoir un titre accrocheur, un contenu explicatif, et si possible une action concrète
4. Adapte tes conseils au profil de l'utilisateur (objectif, chronotype, niveau d'activité)
5. Sois encourageant mais réaliste
6. Utilise un ton expert mais accessible

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "summary": {
    "overallScore": number,
    "keyFindings": string[],
    "mainRecommendation": string,
    "sentiment": "positive" | "neutral" | "encouraging"
  },
  "insights": [
    {
      "id": string,
      "type": "pattern" | "recommendation" | "achievement" | "warning",
      "priority": "low" | "medium" | "high",
      "title": string,
      "content": string,
      "actionable": string | null,
      "icon": string,
      "color": string
    }
  ]
}`;
}

/**
 * Call OpenAI GPT-5 mini for insights generation
 */
async function generateFastingInsights(
  profile: UserProfile, 
  sessions: FastingSession[], 
  periodDays: number
): Promise<{ insights: FastingInsightsResponse; tokensUsed: number }> {
  const prompt = buildFastingInsightsPrompt(profile, sessions, periodDays);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      messages: [
        {
          role: 'system',
          content: 'Tu es un expert en jeûne intermittent et en optimisation métabolique. Tu analyses les données de jeûne et génères des insights personnalisés et actionnables.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 1,
      max_completion_tokens: 3000,
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  // Validate that we have a proper response with content
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    throw new Error('Invalid OpenAI API response: missing content');
  }
  
  const content = data.choices[0].message.content.trim();
  if (!content) {
    throw new Error('Empty response from OpenAI API');
  }
  
  let aiResponse;
  try {
    aiResponse = JSON.parse(content);
  } catch (parseError) {
    console.error('JSON parsing failed. Raw content:', content);
    throw new Error(`Failed to parse AI response as JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
  }
  
  const tokensUsed = data.usage?.total_tokens || 0;

  // Validate and structure the response
  const insights: FastingInsightsResponse = {
    summary: aiResponse.summary,
    insights: aiResponse.insights,
    dataQuality: sessions.length >= 15 ? 'excellent' : 
                sessions.length >= 8 ? 'good' : 
                sessions.length >= 3 ? 'limited' : 'insufficient',
    analysisDate: new Date().toISOString(),
    periodDays,
    aiModel: 'gpt-5-mini',
    tokensUsed,
    cached: false
  };

  return { insights, tokensUsed };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { userId, periodDays, profile } = await req.json();

    if (!userId || !periodDays) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: userId, periodDays' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('FASTING_INSIGHTS_GENERATOR', 'Starting insights generation', {
      userId,
      periodDays,
      hasProfile: !!profile,
      timestamp: new Date().toISOString()
    });

    // Fetch fasting sessions for the period
    const startDate = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000).toISOString();
    const endDate = new Date().toISOString();

    const { data: sessions, error: sessionsError } = await supabase
      .from('fasting_sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('start_time', startDate)
      .lte('start_time', endDate)
      .order('start_time', { ascending: false });

    if (sessionsError) {
      console.error('FASTING_INSIGHTS_GENERATOR', 'Failed to fetch sessions', {
        error: sessionsError.message,
        userId,
        periodDays
      });
      throw new Error(`Failed to fetch fasting sessions: ${sessionsError.message}`);
    }

    const fastingSessions = sessions || [];

    // Check data sufficiency
    const completedSessions = fastingSessions.filter(s => s.status === 'completed');
    const minSessionsRequired = periodDays === 7 ? 3 : periodDays === 30 ? 8 : 20;
    
    if (completedSessions.length < minSessionsRequired) {
      console.log('FASTING_INSIGHTS_GENERATOR', 'Insufficient data for AI insights', {
        userId,
        periodDays,
        completedSessions: completedSessions.length,
        minRequired: minSessionsRequired
      });

      return new Response(
        JSON.stringify({
          summary: {
            overallScore: 0,
            keyFindings: ['Données insuffisantes pour l\'analyse IA'],
            mainRecommendation: `Complétez au moins ${minSessionsRequired} sessions de jeûne pour débloquer les insights de la Forge Spatiale`,
            sentiment: 'encouraging'
          },
          insights: [],
          dataQuality: 'insufficient',
          analysisDate: new Date().toISOString(),
          periodDays,
          aiModel: 'gpt-5-mini',
          tokensUsed: 0,
          cached: false,
          missingData: [`Au moins ${minSessionsRequired} sessions de jeûne complétées`]
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate cache key
    const inputHash = generateCacheKey(userId, periodDays, profile, fastingSessions);

    // Check for cached results
    const cachedInsights = await getCachedInsights(supabase, userId, inputHash);
    if (cachedInsights) {
      console.log('FASTING_INSIGHTS_GENERATOR', 'Returning cached insights', {
        userId,
        periodDays,
        inputHash,
        cacheAge: Date.now() - new Date(cachedInsights.analysisDate).getTime()
      });

      return new Response(
        JSON.stringify(cachedInsights),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate new insights with AI
    console.log('FASTING_INSIGHTS_GENERATOR', 'Generating new AI insights', {
      userId,
      periodDays,
      sessionsCount: fastingSessions.length,
      completedSessions: completedSessions.length
    });

    const { insights, tokensUsed } = await generateFastingInsights(profile, fastingSessions, periodDays);

    // Store in cache
    await storeInsightsCache(supabase, userId, inputHash, insights, tokensUsed);

    // Calculate and log cost information for dashboard monitoring
    const estimatedCostUSD = calculateCostFromTokens(tokensUsed);
    
    console.log('FASTING_INSIGHTS_COST_AUDIT', 'AI generation cost calculated', {
      userId,
      analysisType: 'fasting_insights',
      periodDays,
      tokensUsed,
      estimatedCostUSD: Math.round(estimatedCostUSD * 100000) / 100000, // 5 decimal precision
      model: 'gpt-5-mini',
      cached: false,
      timestamp: new Date().toISOString(),
      philosophy: 'ai_cost_transparency_audit'
    });

    console.log('FASTING_INSIGHTS_GENERATOR', 'AI insights generated successfully', {
      userId,
      periodDays,
      insightsCount: insights.insights.length,
      tokensUsed,
      overallScore: insights.summary.overallScore
    });

    return new Response(
      JSON.stringify(insights),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('FASTING_INSIGHTS_GENERATOR', 'Generation failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate fasting insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});