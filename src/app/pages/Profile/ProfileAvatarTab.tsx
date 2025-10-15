/**
 * ProfileAvatarTab Component
 * Displays real avatar data from body and face scans with redirections
 * Now includes Geographic & Environmental Data section
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useAvatarData } from './hooks/useAvatarData';
import { AvatarStatusCard, LastScanCard, QuickActionsCard } from './components/AvatarInfoComponents';
import { uniformStaggerContainerVariants, uniformStaggerItemVariants } from '../../../ui/tabs/tabsConfig';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';

// Geographic components from HealthProfile
import {
  AirQualityWidget,
  WeatherWidget,
  HydrationWidget,
  EnvironmentalExposureWidget,
} from '../HealthProfile/components/geographic';
import { CountryHealthDataDisplay } from './components/health/CountryHealthDataDisplay';

// Hooks
import { useGeographicData } from '../../../hooks/useGeographicData';
import { useCountryHealthData } from '../../../hooks/useCountryHealthData';
import { useUserStore } from '../../../system/store/userStore';

const ProfileAvatarTab: React.FC = () => {
  const { data, loading, error } = useAvatarData();
  const { profile } = useUserStore();

  // Geographic data hooks
  const { data: geoData, loading: geoLoading, error: geoError, refresh } = useGeographicData();
  const { countryData, loading: countryLoading, error: countryError, refresh: refreshCountryData } = useCountryHealthData();

  const hasCountry = !!profile?.country;
  const isUnsupportedCountry = geoError?.message?.includes('pas encore supporté');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <GlassCard className="p-8 text-center">
          <SpatialIcon Icon={ICONS.Loader2} size={32} className="animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-white/70">Chargement des données avatar...</p>
        </GlassCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <GlassCard
          className="p-6"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
          }}
        >
          <div className="flex items-start gap-3">
            <SpatialIcon Icon={ICONS.AlertCircle} size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-300 font-semibold mb-1">Erreur de chargement</h3>
              <p className="text-red-200 text-sm">{error.message}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={uniformStaggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Avatar Status Card */}
      <motion.div variants={uniformStaggerItemVariants}>
        <AvatarStatusCard data={data} />
      </motion.div>

      {/* Last Scan Card */}
      <motion.div variants={uniformStaggerItemVariants}>
        <LastScanCard data={data} />
      </motion.div>

      {/* Quick Actions Card */}
      <motion.div variants={uniformStaggerItemVariants}>
        <QuickActionsCard data={data} />
      </motion.div>

      {/* GEOGRAPHIC & ENVIRONMENTAL SECTION - MIGRATED FROM HEALTH PROFILE */}
      <motion.div variants={uniformStaggerItemVariants}>
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(168, 85, 247, 0.2)'
        }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, color-mix(in srgb, #A855F7 35%, transparent), color-mix(in srgb, #A855F7 25%, transparent))
                  `,
                  border: '2px solid color-mix(in srgb, #A855F7 50%, transparent)',
                  boxShadow: '0 0 20px color-mix(in srgb, #A855F7 30%, transparent)'
                }}
              >
                <SpatialIcon Icon={ICONS.MapPin} size={20} style={{ color: '#A855F7' }} variant="pure" />
              </div>
              <div>
                <div className="text-xl">Environnement Géographique</div>
                <div className="text-white/60 text-sm font-normal mt-0.5">
                  {geoData?.city && geoData?.country_code ? `${geoData.city}, ${geoData.country_code}` : profile?.country || 'Non configuré'}
                </div>
              </div>
            </h3>
            {hasCountry && geoData && (
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
            )}
          </div>

          {/* No Country Set */}
          {!hasCountry && (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2))
                  `,
                  border: '2px solid rgba(239, 68, 68, 0.5)',
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
                }}
              >
                <SpatialIcon Icon={ICONS.MapPin} size={28} style={{ color: '#EF4444' }} variant="pure" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Pays non renseigné</h4>
              <p className="text-white/70 text-sm mb-4 max-w-md mx-auto">
                Pour accéder aux données géographiques, météorologiques et de qualité de l'air,
                veuillez d'abord renseigner votre pays dans l'onglet Identité.
              </p>
              <button
                onClick={() => window.location.href = '/profile?tab=identity'}
                className="btn-glass--primary px-6 py-3"
              >
                <div className="flex items-center gap-2">
                  <SpatialIcon Icon={ICONS.User} size={18} />
                  <span>Aller à l'onglet Identité</span>
                </div>
              </button>
            </div>
          )}

          {/* Unsupported Country Error */}
          {hasCountry && geoError && isUnsupportedCountry && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20 mb-4">
              <div className="flex items-start gap-3">
                <SpatialIcon Icon={ICONS.AlertTriangle} size={20} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-amber-300 font-semibold mb-2">Pays non encore supporté</h4>
                  <p className="text-amber-200 text-sm mb-3">
                    Les données géographiques ne sont pas encore disponibles pour <strong>{profile?.country}</strong>.
                    Nous couvrons actuellement plus de 130 pays, incluant la France métropolitaine, tous les DOM-TOM, et les pays majeurs.
                  </p>
                  <p className="text-amber-200 text-sm mb-4">
                    Le contexte sanitaire local reste disponible ci-dessous. Les données météo et qualité de l'air seront ajoutées prochainement.
                  </p>
                  <button
                    onClick={() => window.location.href = '/profile?tab=identity'}
                    className="btn-glass text-sm px-4 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <SpatialIcon Icon={ICONS.MapPin} size={14} />
                      <span>Changer de pays</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Other Errors */}
          {hasCountry && geoError && !isUnsupportedCountry && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20 mb-4">
              <div className="flex items-start gap-3">
                <SpatialIcon Icon={ICONS.AlertCircle} size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-red-300 font-semibold mb-1">Erreur de chargement</h4>
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
            </div>
          )}

          {/* Loading State */}
          {hasCountry && geoLoading && !geoData && (
            <div className="text-center py-8">
              <SpatialIcon Icon={ICONS.Loader2} size={32} className="animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-white/70">Chargement des données environnementales...</p>
            </div>
          )}

          {/* Geographic Data Widgets */}
          {hasCountry && geoData && (
            <div className="space-y-4">
              <WeatherWidget weather={geoData.weather} city={geoData.city} />
              <AirQualityWidget airQuality={geoData.air_quality} />
              <HydrationWidget hydration={geoData.hydration_recommendation} />
              <EnvironmentalExposureWidget exposure={geoData.environmental_exposure} />
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* Country Health Context - Always show if country is set */}
      {hasCountry && (
        <motion.div variants={uniformStaggerItemVariants}>
          <GlassCard className="p-6" style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
              var(--glass-opacity)
            `,
            borderColor: 'rgba(168, 85, 247, 0.2)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, color-mix(in srgb, #A855F7 35%, transparent), color-mix(in srgb, #A855F7 25%, transparent))
                    `,
                    border: '2px solid color-mix(in srgb, #A855F7 50%, transparent)',
                    boxShadow: '0 0 20px color-mix(in srgb, #A855F7 30%, transparent)'
                  }}
                >
                  <SpatialIcon Icon={ICONS.Globe} size={20} style={{ color: '#A855F7' }} variant="pure" />
                </div>
                <div>
                  <div className="text-xl">Contexte Sanitaire Local</div>
                  <div className="text-white/60 text-sm font-normal mt-0.5">Risques et recommandations pour {profile?.country}</div>
                </div>
              </h3>
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
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20 mb-4">
                <div className="flex items-start gap-3">
                  <SpatialIcon Icon={ICONS.AlertCircle} size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-300 text-sm font-medium mb-1">Erreur de chargement</p>
                    <p className="text-red-200 text-xs">{countryError.message}</p>
                  </div>
                </div>
              </div>
            )}

            <CountryHealthDataDisplay countryData={countryData} loading={countryLoading} />
          </GlassCard>
        </motion.div>
      )}

      {/* Info Banner */}
      {hasCountry && geoData && (
        <motion.div variants={uniformStaggerItemVariants}>
          <GlassCard className="p-4" style={{
            background: 'rgba(168, 85, 247, 0.05)',
            borderColor: 'rgba(168, 85, 247, 0.2)',
          }}>
            <div className="flex items-start gap-3">
              <SpatialIcon Icon={ICONS.Info} size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-purple-300 text-sm leading-relaxed">
                  <strong>Sources de données:</strong> Les informations météorologiques et de qualité de l'air
                  proviennent d'Open-Meteo, un service open source fournissant des données en temps réel.
                  Les données sont mises à jour toutes les heures automatiquement.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileAvatarTab;
