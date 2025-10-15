import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Stock food images from Pexels (known working URLs)
const STOCK_FOOD_IMAGES = [
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640779/pexels-photo-1640779.jpeg?auto=compress&cs=tinysrgb&w=800'
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Method not allowed'
      }), {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Parse request body
    const { recipe_details, image_signature, user_id, recipe_id } = await req.json();

    // Validate input
    if (!recipe_details || !recipe_details.title) {
      return new Response(JSON.stringify({
        error: 'recipe_details with title is required'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    if (!image_signature) {
      return new Response(JSON.stringify({
        error: 'image_signature is required'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    if (!user_id) {
      return new Response(JSON.stringify({
        error: 'user_id is required'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Validate recipe_id for database updates
    if (!recipe_id) {
      return new Response(JSON.stringify({
        error: 'recipe_id is required for database updates'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    const startTime = Date.now();
    console.log('IMAGE_GENERATOR', 'Starting image generation', {
      user_id,
      recipe_id,
      recipe_title: recipe_details.title,
      image_signature,
      ai_first_strategy: true,
      timestamp: new Date().toISOString()
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // PRIORITIZE CACHE - Check long-term cache first (90+ days)
    const { data: cachedResult } = await supabase
      .from('ai_analysis_jobs')
      .select('result_payload')
      .eq('input_hash', image_signature)
      .eq('analysis_type', 'recipe_image_generation')
      .gte('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()) // 90 days TTL
      .single();

    if (cachedResult?.result_payload) {
      console.log('IMAGE_GENERATOR', 'Long-term cache hit', {
        user_id,
        recipe_id,
        image_signature,
        cached_method: cachedResult.result_payload.generation_method,
        timestamp: new Date().toISOString()
      });

      // Update recipes table with cached image URL for persistence
      await supabase
        .from('recipes')
        .update({ 
          image_url: cachedResult.result_payload.image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', recipe_id);

      return new Response(JSON.stringify({
        ...cachedResult.result_payload,
        cache_hit: true,
        processing_time_ms: Date.now() - startTime
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // AI-FIRST IMAGE GENERATION - Use DALL-E 3 with stock fallback
    const imageResult = await generateImageWithFallback(recipe_details, image_signature);
    const processingTime = Date.now() - startTime;

    const response = {
      image_url: imageResult.url,
      processing_time_ms: processingTime,
      cost_usd: imageResult.cost,
      cache_hit: false,
      generation_method: imageResult.method,
      recipe_id: recipe_id
    };

    // UPDATE RECIPES TABLE - Critical for persistence with AI-generated images
    const { error: recipeUpdateError } = await supabase
      .from('recipes')
      .update({ 
        image_url: imageResult.url,
        updated_at: new Date().toISOString()
      })
      .eq('id', recipe_id);

    if (recipeUpdateError) {
      console.error('IMAGE_GENERATOR', 'Failed to update recipe with image URL', {
        recipe_id,
        error: recipeUpdateError.message,
        generation_method: imageResult.method,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('IMAGE_GENERATOR', 'Recipe updated with image URL', {
        recipe_id,
        image_url: imageResult.url,
        generation_method: imageResult.method,
        cost_usd: imageResult.cost,
        timestamp: new Date().toISOString()
      });
    }

    // UPDATE AI_ANALYSIS_JOBS TABLE - Cache the AI result for long-term storage
    await supabase.from('ai_analysis_jobs').upsert({
      user_id,
      analysis_type: 'recipe_image_generation',
      status: 'completed',
      input_hash: image_signature,
      request_payload: {
        recipe_details: recipe_details,
        recipe_id: recipe_id
      },
      result_payload: response,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    console.log('IMAGE_GENERATOR', 'Image generation completed', {
      user_id,
      recipe_id,
      recipe_title: recipe_details.title,
      image_url: imageResult.url,
      processing_time_ms: processingTime,
      generation_method: imageResult.method,
      cost_usd: imageResult.cost,
      database_updated: !recipeUpdateError,
      ai_powered: imageResult.method === 'dall_e_3',
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('IMAGE_GENERATOR', 'Error in image generation', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});

// AI Image Generation Function - DALL-E 3 Integration
async function generateAIImage(recipeDetails: any, openaiApiKey: string): Promise<{ url: string, cost: number }> {
  console.log('IMAGE_GENERATOR', 'Starting DALL-E 3 generation', {
    recipe_title: recipeDetails.title,
    ingredients_count: recipeDetails.ingredients?.length || 0,
    model: 'dall-e-3',
    timestamp: new Date().toISOString()
  });

  // Create optimized prompt for food photography
  const mainIngredients = (recipeDetails.ingredients || [])
    .slice(0, 4)
    .map((i: any) => i.name)
    .join(', ');

  const imagePrompt = `A beautiful, appetizing photo of ${recipeDetails.title}. 
Professional food photography, well-lit, colorful, restaurant quality presentation.
Main ingredients visible: ${mainIngredients}.
Style: Clean, modern, Instagram-worthy food photo with natural lighting.
High resolution, vibrant colors, appetizing presentation.`;

  console.log('IMAGE_GENERATOR', 'DALL-E 3 prompt created', {
    prompt_length: imagePrompt.length,
    main_ingredients: mainIngredients,
    timestamp: new Date().toISOString()
  });

  const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: imagePrompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    }),
  });

  if (!imageResponse.ok) {
    const errorBody = await imageResponse.text();
    console.error('IMAGE_GENERATOR', 'DALL-E 3 API error', {
      status: imageResponse.status,
      statusText: imageResponse.statusText,
      errorBody: errorBody,
      timestamp: new Date().toISOString()
    });
    throw new Error(`DALL-E API error: ${imageResponse.status} - ${errorBody}`);
  }

  const imageData = await imageResponse.json();
  const imageUrl = imageData.data[0]?.url;

  if (!imageUrl) {
    throw new Error('No image URL returned from DALL-E 3');
  }

  console.log('IMAGE_GENERATOR', 'DALL-E 3 generation successful', {
    image_url: imageUrl,
    cost_usd: 0.040,
    model: 'dall-e-3',
    timestamp: new Date().toISOString()
  });

  return {
    url: imageUrl,
    cost: 0.040 // DALL-E 3 standard pricing: $0.040 per image
  };
}

// Stock Image Selection Function
function selectStockImage(recipeDetails: any): string {
  // Enhanced hash-based selection for consistent images per recipe
  const titleHash = recipeDetails.title.split('').reduce((a: number, b: string) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Add ingredients to hash for more variety
  const ingredientsHash = (recipeDetails.ingredients || [])
    .slice(0, 3)
    .map((i: any) => i.name || '')
    .join('')
    .split('')
    .reduce((a: number, b: string) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  
  const combinedHash = titleHash + ingredientsHash;
  const index = Math.abs(combinedHash) % STOCK_FOOD_IMAGES.length;
  
  console.log('IMAGE_GENERATOR', 'Stock image selected as fallback', {
    recipe_title: recipeDetails.title,
    selected_index: index,
    selected_url: STOCK_FOOD_IMAGES[index],
    hash_method: 'title_plus_ingredients',
    timestamp: new Date().toISOString()
  });
  
  return STOCK_FOOD_IMAGES[index];
}

// Main Image Generation Function with AI-First Strategy
async function generateImageWithFallback(recipeDetails: any, imageSignature: string): Promise<{ url: string, cost: number, method: string }> {
  console.log('IMAGE_GENERATOR', 'Starting AI-first image generation strategy', {
    recipe_title: recipeDetails.title,
    image_signature: imageSignature,
    strategy: 'dall_e_3_with_stock_fallback',
    timestamp: new Date().toISOString()
  });

  // Check if OpenAI API key is available
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openaiApiKey) {
    console.warn('IMAGE_GENERATOR', 'OpenAI API key not configured, using stock images', {
      recipe_title: recipeDetails.title,
      fallback_reason: 'missing_api_key',
      timestamp: new Date().toISOString()
    });
    
    return {
      url: selectStockImage(recipeDetails),
      cost: 0,
      method: 'stock_fallback_no_key'
    };
  }

  // Try DALL-E 3 generation first
  try {
    console.log('IMAGE_GENERATOR', 'Attempting DALL-E 3 generation', {
      recipe_title: recipeDetails.title,
      has_openai_key: true,
      model: 'dall-e-3',
      timestamp: new Date().toISOString()
    });

    const aiResult = await generateAIImage(recipeDetails, openaiApiKey);
    
    console.log('IMAGE_GENERATOR', 'DALL-E 3 generation successful', {
      recipe_title: recipeDetails.title,
      image_url: aiResult.url,
      cost_usd: aiResult.cost,
      method: 'dall_e_3',
      timestamp: new Date().toISOString()
    });

    return {
      url: aiResult.url,
      cost: aiResult.cost,
      method: 'dall_e_3'
    };

  } catch (aiError) {
    console.warn('IMAGE_GENERATOR', 'DALL-E 3 generation failed, falling back to stock images', {
      recipe_title: recipeDetails.title,
      ai_error: aiError.message,
      fallback_reason: 'dall_e_3_api_error',
      timestamp: new Date().toISOString()
    });

    // Fallback to stock images
    return {
      url: selectStockImage(recipeDetails),
      cost: 0,
      method: 'stock_fallback_ai_error'
    };
  }
}