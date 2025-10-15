/**
 * GeographicTab Component
 * Displays geographic, weather, air quality, and environmental data
 * Includes country health context
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useGeographicData } from '../../../../hooks/useGeographicData';
import { useUserStore } from '../../../../system/store/userStore';
import { CountryHealthDataDisplay } from '../../Profile/components/health/CountryHealthDataDisplay';
import { useCountryHealthData } from '../../../../hooks/useCountryHealthData';
import {
  AirQualityWidget,
  WeatherWidget,
  HydrationWidget,
  EnvironmentalExposureWidget,
} from '../components/geographic';

export const GeographicTab: React.FC = () => {
  const { profile } = useUserStore();
  const { data: geoData, loading: geoLoading, error: geoError, refresh } = useGeographicData();
  const { countryData, loading: countryLoading, error: countryError, refresh: refreshCountryData } = useCountryHealthData();

  const hasCountry = !!profile?.country;

  if (!hasCountry) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center" style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(6, 182, 212, 0.2)',
          }}>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2))
                `,
                border: '2px solid rgba(6, 182, 212, 0.5)',
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
              }}
            >
              <SpatialIcon Icon={ICONS.MapPin} size={32} style={{ color: '#06B6D4' }} variant="pure" />
            </div>
            <h2 className="text-white font-bold text-2xl mb-3">Pays non renseigné</h2>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              Pour accéder aux données géographiques, météorologiques et de qualité de l'air,
              veuillez d'abord renseigner votre pays dans l'onglet Identité de votre profil.
            </p>
            <button
              onClick={() => {
                window.location.href = '/profile?tab=identity';
              }}
              className="btn-glass--primary px-6 py-3"
            >
              <div className="flex items-center gap-2">
                <SpatialIcon Icon={ICONS.User} size={18} />
                <span>Aller à l'onglet Identité</span>
              </div>
            </button>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(6, 182, 212, 0.3)',
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2))
                  `,
                  border: '2px solid rgba(6, 182, 212, 0.5)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.MapPin} size={24} style={{ color: '#06B6D4' }} variant="pure" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Environnement Géographique</h2>
                <p className="text-white/70 text-sm">
                  {geoData?.city && geoData?.country_code ? `${geoData.city}, ${geoData.country_code}` : profile.country}
                </p>
              </div>
            </div>
            <button
              onClick={refresh}
              disabled={geoLoading}
              className="btn-glass px-4 py-2"
              title="Rafraîchir les données"
            >
              <SpatialIcon
                Icon={ICONS.RefreshCw}
                size={16}
                className={geoLoading ? 'animate-spin' : ''}
              />
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Error State */}
      {geoError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-6" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
          }}>
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.AlertCircle} size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-red-300 font-semibold mb-1">Erreur de chargement</h3>
                <p className="text-red-200 text-sm mb-3">{geoError.message}</p>
                <button
                  onClick={refresh}
                  className="btn-glass text-sm px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <SpatialIcon Icon={ICONS.RefreshCw} size={14} />
                    <span>Réessayer</span>
                  </div>
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Loading State */}
      {geoLoading && !geoData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <SpatialIcon Icon={ICONS.Loader2} size={32} className="animate-spin text-cyan-400 mx-auto mb-4" />
            <p className="text-white/70">Chargement des données environnementales...</p>
          </GlassCard>
        </motion.div>
      )}

      {/* Geographic Data Widgets */}
      {geoData && (
        <>
          {/* Weather Widget */}
          <WeatherWidget weather={geoData.weather} city={geoData.city} />

          {/* Air Quality Widget */}
          <AirQualityWidget airQuality={geoData.air_quality} />

          {/* Hydration Widget */}
          <HydrationWidget hydration={geoData.hydration_recommendation} />

          {/* Environmental Exposure Widget */}
          <EnvironmentalExposureWidget exposure={geoData.environmental_exposure} />
        </>
      )}

      {/* Country Health Context */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2))
                `,
                border: '2px solid rgba(6, 182, 212, 0.5)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
              }}
            >
              <SpatialIcon Icon={ICONS.Globe} size={20} style={{ color: '#06B6D4' }} variant="pure" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Contexte Sanitaire Local</h3>
              <p className="text-white/60 text-sm">Risques et recommandations pour {profile.country}</p>
            </div>
          </div>
          {countryData && (
            <button
              onClick={refreshCountryData}
              disabled={countryLoading}
              className="btn-glass px-3 py-2 text-sm"
              title="Rafraîchir les données sanitaires"
            >
              <SpatialIcon
                Icon={ICONS.RefreshCw}
                size={16}
                className={countryLoading ? 'animate-spin' : ''}
              />
            </button>
          )}
        </div>

        {countryError && (
          <GlassCard className="p-4 mb-4" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
          }}>
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.AlertCircle} size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-300 text-sm font-medium mb-1">Erreur de chargement</p>
                <p className="text-red-200 text-xs">{countryError.message}</p>
              </div>
            </div>
          </GlassCard>
        )}

        <CountryHealthDataDisplay countryData={countryData} loading={countryLoading} />
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GlassCard className="p-4" style={{
          background: 'rgba(59, 130, 246, 0.05)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
        }}>
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-300 text-sm leading-relaxed">
                <strong>Sources de données:</strong> Les informations météorologiques et de qualité de l'air
                proviennent d'Open-Meteo, un service open source fournissant des données en temps réel.
                Les données sont mises à jour toutes les heures automatiquement.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
