/**
 * Geographic Data Service
 * Fetches weather, air quality, and environmental data from Open-Meteo and OpenWeatherMap APIs
 * Calculates personalized hydration recommendations
 */

import { supabase } from '../supabase/client';
import logger from '../../lib/utils/logger';
import type {
  GeographicData,
  GeographicDataCache,
  WeatherData,
  AirQualityData,
  AirQualityLevel,
  EnvironmentalExposure,
  HydrationRecommendation,
  PhysicalActivityLevel
} from '../../domain/health';

const CACHE_DURATION_HOURS = 1;

// Country coordinates for weather data (capital cities)
const COUNTRY_COORDINATES: Record<string, { lat: number; lon: number; city: string }> = {
  FR: { lat: 48.8566, lon: 2.3522, city: 'Paris' },
  US: { lat: 38.9072, lon: -77.0369, city: 'Washington D.C.' },
  GB: { lat: 51.5074, lon: -0.1278, city: 'London' },
  DE: { lat: 52.5200, lon: 13.4050, city: 'Berlin' },
  ES: { lat: 40.4168, lon: -3.7038, city: 'Madrid' },
  IT: { lat: 41.9028, lon: 12.4964, city: 'Rome' },
  CA: { lat: 45.4215, lon: -75.6972, city: 'Ottawa' },
  AU: { lat: -35.2809, lon: 149.1300, city: 'Canberra' },
  JP: { lat: 35.6762, lon: 139.6503, city: 'Tokyo' },
  CN: { lat: 39.9042, lon: 116.4074, city: 'Beijing' },
  BR: { lat: -15.8267, lon: -47.9218, city: 'Brasília' },
  IN: { lat: 28.6139, lon: 77.2090, city: 'New Delhi' },
  MX: { lat: 19.4326, lon: -99.1332, city: 'Mexico City' },
  RU: { lat: 55.7558, lon: 37.6173, city: 'Moscow' },
  ZA: { lat: -25.7479, lon: 28.2293, city: 'Pretoria' },
};

/**
 * Get AQI level from numeric AQI value
 */
function getAQILevel(aqi: number): AirQualityLevel {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy_sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'very_unhealthy';
  return 'hazardous';
}

/**
 * Get health recommendations based on AQI level
 */
function getAQIRecommendations(level: AirQualityLevel): string[] {
  switch (level) {
    case 'good':
      return ['Qualité de l\'air excellente. Activités en extérieur recommandées.'];
    case 'moderate':
      return [
        'Qualité de l\'air acceptable.',
        'Personnes sensibles: limitez les efforts intenses prolongés en extérieur.'
      ];
    case 'unhealthy_sensitive':
      return [
        'Qualité de l\'air nocive pour les groupes sensibles.',
        'Réduisez les efforts physiques prolongés en extérieur.',
        'Personnes à risque: restez à l\'intérieur autant que possible.'
      ];
    case 'unhealthy':
      return [
        'Qualité de l\'air malsaine.',
        'Évitez les efforts physiques en extérieur.',
        'Portez un masque si vous devez sortir.',
        'Gardez les fenêtres fermées.'
      ];
    case 'very_unhealthy':
      return [
        'Qualité de l\'air très malsaine.',
        'Restez à l\'intérieur.',
        'Utilisez un purificateur d\'air.',
        'Évitez tout exercice physique.'
      ];
    case 'hazardous':
      return [
        'Alerte pollution: risque sanitaire majeur.',
        'Ne sortez pas sauf urgence absolue.',
        'Portez un masque FFP2 si vous devez sortir.',
        'Consultez un médecin en cas de symptômes.'
      ];
  }
}

/**
 * Fetch weather data from Open-Meteo API
 */
async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.statusText}`);
    }

    const data = await response.json();
    const current = data.current;

    // Map weather codes to descriptions
    const weatherDescriptions: Record<number, string> = {
      0: 'Dégagé',
      1: 'Principalement dégagé',
      2: 'Partiellement nuageux',
      3: 'Couvert',
      45: 'Brouillard',
      48: 'Brouillard givrant',
      51: 'Bruine légère',
      53: 'Bruine modérée',
      55: 'Bruine dense',
      61: 'Pluie légère',
      63: 'Pluie modérée',
      65: 'Pluie forte',
      71: 'Chute de neige légère',
      73: 'Chute de neige modérée',
      75: 'Chute de neige forte',
      95: 'Orage',
    };

    return {
      temperature_celsius: current.temperature_2m,
      feels_like_celsius: current.apparent_temperature,
      humidity_percent: current.relative_humidity_2m,
      wind_speed_ms: current.wind_speed_10m,
      wind_direction: current.wind_direction_10m,
      precipitation_mm: current.precipitation,
      cloud_cover_percent: current.cloud_cover,
      weather_condition: weatherDescriptions[current.weather_code] || 'Inconnu',
      last_updated: new Date().toISOString(),
    };
  } catch (error) {
    logger.error('GEOGRAPHIC_SERVICE', 'Failed to fetch weather data', {
      error: error instanceof Error ? error.message : 'Unknown error',
      lat,
      lon,
    });
    throw error;
  }
}

/**
 * Fetch air quality data from Open-Meteo Air Quality API
 */
async function fetchAirQualityData(lat: number, lon: number): Promise<AirQualityData> {
  try {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo Air Quality API error: ${response.statusText}`);
    }

    const data = await response.json();
    const current = data.current;

    const aqi = current.european_aqi || 50;
    const level = getAQILevel(aqi);

    // Determine dominant pollutant
    const pollutants = {
      'PM2.5': current.pm2_5,
      'PM10': current.pm10,
      'CO': current.carbon_monoxide,
      'NO2': current.nitrogen_dioxide,
      'O3': current.ozone,
      'SO2': current.sulphur_dioxide,
    };
    const dominant = Object.entries(pollutants)
      .filter(([, value]) => value !== undefined && value > 0)
      .sort(([, a], [, b]) => (b || 0) - (a || 0))[0]?.[0] || 'PM2.5';

    return {
      aqi,
      level,
      pm2_5: current.pm2_5,
      pm10: current.pm10,
      co: current.carbon_monoxide,
      no2: current.nitrogen_dioxide,
      o3: current.ozone,
      so2: current.sulphur_dioxide,
      dominant_pollutant: dominant,
      health_recommendations: getAQIRecommendations(level),
      last_updated: new Date().toISOString(),
    };
  } catch (error) {
    logger.error('GEOGRAPHIC_SERVICE', 'Failed to fetch air quality data', {
      error: error instanceof Error ? error.message : 'Unknown error',
      lat,
      lon,
    });
    throw error;
  }
}

/**
 * Calculate personalized hydration recommendations
 */
function calculateHydrationRecommendation(
  weather: WeatherData,
  userWeightKg?: number,
  activityLevel?: PhysicalActivityLevel
): HydrationRecommendation {
  // Base hydration (European Food Safety Authority recommendations)
  const baseAmount = userWeightKg ? (userWeightKg * 0.033) : 2.0; // 33ml per kg, or 2L default

  // Temperature adjustment
  let tempAdjustment = 0;
  if (weather.temperature_celsius > 25) {
    tempAdjustment = ((weather.temperature_celsius - 25) / 5) * 0.5; // +0.5L per 5°C above 25°C
  }

  // Humidity adjustment
  let humidityAdjustment = 0;
  if (weather.humidity_percent < 30) {
    humidityAdjustment = 0.3; // +0.3L in dry conditions
  } else if (weather.humidity_percent > 80) {
    humidityAdjustment = 0.2; // +0.2L in very humid conditions (harder to cool down)
  }

  const weatherAdjustment = tempAdjustment + humidityAdjustment;

  // Activity level adjustment
  const activityAdjustments: Record<PhysicalActivityLevel, number> = {
    sedentary: 0,
    light: 0.3,
    moderate: 0.6,
    active: 1.0,
    athlete: 1.5,
  };
  const activityAdjustment = activityLevel ? activityAdjustments[activityLevel] : 0;

  const totalRecommended = Math.round((baseAmount + weatherAdjustment + activityAdjustment) * 10) / 10;

  // Generate recommendations
  const recommendations: string[] = [
    `Objectif d'hydratation: ${totalRecommended}L par jour`,
  ];

  if (weather.temperature_celsius > 30) {
    recommendations.push('⚠️ Température élevée: augmentez votre consommation d\'eau');
  }

  if (weather.humidity_percent < 30) {
    recommendations.push('🌵 Air sec: hydratez-vous régulièrement');
  }

  if (activityLevel && ['active', 'athlete'].includes(activityLevel)) {
    recommendations.push('🏃 Activité intense: buvez avant, pendant et après l\'exercice');
  }

  // Alerts
  const alerts: string[] = [];
  if (totalRecommended > 4.0) {
    alerts.push('Conditions extrêmes détectées. Surveillez votre hydratation attentivement.');
  }

  return {
    base_amount_liters: Math.round(baseAmount * 10) / 10,
    weather_adjustment_liters: Math.round(weatherAdjustment * 10) / 10,
    activity_adjustment_liters: Math.round(activityAdjustment * 10) / 10,
    total_recommended_liters: totalRecommended,
    factors: {
      temperature: weather.temperature_celsius,
      humidity: weather.humidity_percent,
      physical_activity_level: activityLevel || 'non renseigné',
      user_weight_kg: userWeightKg,
    },
    recommendations,
    alerts,
  };
}

/**
 * Calculate environmental exposure
 */
function calculateEnvironmentalExposure(airQuality: AirQualityData): EnvironmentalExposure {
  const exposureLevel =
    airQuality.level === 'good' || airQuality.level === 'moderate' ? 'low' :
    airQuality.level === 'unhealthy_sensitive' ? 'moderate' :
    airQuality.level === 'unhealthy' ? 'high' : 'severe';

  const pollutionSources: string[] = [];
  if (airQuality.pm2_5 && airQuality.pm2_5 > 25) pollutionSources.push('Particules fines (PM2.5)');
  if (airQuality.pm10 && airQuality.pm10 > 50) pollutionSources.push('Particules (PM10)');
  if (airQuality.no2 && airQuality.no2 > 40) pollutionSources.push('Dioxyde d\'azote (NO2)');
  if (airQuality.o3 && airQuality.o3 > 100) pollutionSources.push('Ozone (O3)');

  const protectiveMeasures: string[] = [];
  if (exposureLevel === 'moderate' || exposureLevel === 'high') {
    protectiveMeasures.push('Limitez les activités extérieures intenses');
    protectiveMeasures.push('Fermez les fenêtres pendant les pics de pollution');
  }
  if (exposureLevel === 'high' || exposureLevel === 'severe') {
    protectiveMeasures.push('Portez un masque lors des sorties');
    protectiveMeasures.push('Utilisez un purificateur d\'air intérieur');
  }

  return {
    air_quality: airQuality,
    pollution_sources: pollutionSources,
    exposure_level: exposureLevel,
    protective_measures: protectiveMeasures,
  };
}

/**
 * Get cached geographic data or fetch new data
 */
export async function getGeographicData(
  userId: string,
  countryCode: string,
  userWeightKg?: number,
  activityLevel?: PhysicalActivityLevel
): Promise<GeographicData> {
  try {
    const coords = COUNTRY_COORDINATES[countryCode];
    if (!coords) {
      throw new Error(`No coordinates found for country: ${countryCode}`);
    }

    const locationKey = `${countryCode}_${coords.city.replace(/\s/g, '')}`;

    // Check cache first
    const { data: cachedData, error: cacheError } = await supabase
      .from('geographic_data_cache')
      .select('*')
      .eq('user_id', userId)
      .eq('location_key', locationKey)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (cachedData && !cacheError) {
      logger.info('GEOGRAPHIC_SERVICE', 'Using cached geographic data', { userId, locationKey });

      // Recalculate hydration with current user data
      const weather = cachedData.weather_data as WeatherData;
      const hydrationData = calculateHydrationRecommendation(weather, userWeightKg, activityLevel);

      return {
        user_id: userId,
        country_code: countryCode,
        city: coords.city,
        latitude: coords.lat,
        longitude: coords.lon,
        weather: weather,
        air_quality: cachedData.air_quality_data as AirQualityData,
        environmental_exposure: cachedData.environmental_data as EnvironmentalExposure,
        hydration_recommendation: hydrationData,
        last_updated: cachedData.created_at,
        next_update_due: cachedData.expires_at,
      };
    }

    // Fetch fresh data
    logger.info('GEOGRAPHIC_SERVICE', 'Fetching fresh geographic data', {
      userId,
      countryCode,
      city: coords.city,
    });

    const [weather, airQuality] = await Promise.all([
      fetchWeatherData(coords.lat, coords.lon),
      fetchAirQualityData(coords.lat, coords.lon),
    ]);

    const environmentalExposure = calculateEnvironmentalExposure(airQuality);
    const hydrationRecommendation = calculateHydrationRecommendation(weather, userWeightKg, activityLevel);

    // Cache the data
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + CACHE_DURATION_HOURS);

    const { error: insertError } = await supabase
      .from('geographic_data_cache')
      .upsert({
        user_id: userId,
        country_code: countryCode,
        city: coords.city,
        location_key: locationKey,
        weather_data: weather,
        air_quality_data: airQuality,
        environmental_data: environmentalExposure,
        hydration_data: hydrationRecommendation,
        expires_at: expiresAt.toISOString(),
      }, {
        onConflict: 'user_id,location_key',
      });

    if (insertError) {
      logger.error('GEOGRAPHIC_SERVICE', 'Failed to cache geographic data', {
        error: insertError.message,
        userId,
      });
    }

    return {
      user_id: userId,
      country_code: countryCode,
      city: coords.city,
      latitude: coords.lat,
      longitude: coords.lon,
      weather,
      air_quality: airQuality,
      environmental_exposure: environmentalExposure,
      hydration_recommendation: hydrationRecommendation,
      last_updated: new Date().toISOString(),
      next_update_due: expiresAt.toISOString(),
    };
  } catch (error) {
    logger.error('GEOGRAPHIC_SERVICE', 'Failed to get geographic data', {
      error: error instanceof Error ? error.message : 'Unknown error',
      userId,
      countryCode,
    });
    throw error;
  }
}

/**
 * Clean up expired cache entries
 */
export async function cleanupExpiredGeographicData(): Promise<void> {
  try {
    const { error } = await supabase
      .from('geographic_data_cache')
      .delete()
      .lt('expires_at', new Date().toISOString());

    if (error) {
      logger.error('GEOGRAPHIC_SERVICE', 'Failed to cleanup expired data', {
        error: error.message,
      });
    } else {
      logger.info('GEOGRAPHIC_SERVICE', 'Cleaned up expired geographic data');
    }
  } catch (error) {
    logger.error('GEOGRAPHIC_SERVICE', 'Failed to cleanup expired data', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
