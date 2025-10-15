/**
 * HealthRiskBadges Component
 * Displays health risks based on country and user profile
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import type { CountryHealthData } from '../../../../domain/health';

interface HealthRiskBadgesProps {
  countryData: CountryHealthData | null;
  loading?: boolean;
}

export const HealthRiskBadges: React.FC<HealthRiskBadgesProps> = ({ countryData, loading }) => {
  if (loading) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <SpatialIcon Icon={ICONS.Loader2} size={20} className="animate-spin text-cyan-400" />
          <span className="text-white/90">Chargement des risques sanitaires...</span>
        </div>
      </GlassCard>
    );
  }

  if (!countryData) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <SpatialIcon Icon={ICONS.MapPin} size={20} className="text-orange-400" />
          <div>
            <p className="text-white/90 font-medium">Contexte sanitaire non disponible</p>
            <p className="text-white/60 text-sm mt-1">
              Sélectionnez votre pays dans l'onglet Identité pour voir les risques locaux
            </p>
          </div>
        </div>
      </GlassCard>
    );
  }

  const hasEndemicDiseases = countryData.endemic_diseases && countryData.endemic_diseases.length > 0;
  const hasMissingVaccines = countryData.vaccination_requirements?.recommended && countryData.vaccination_requirements.recommended.length > 0;
  const hasDeficiencies = countryData.common_deficiencies && countryData.common_deficiencies.length > 0;
  const hasRisks = countryData.health_risks && (
    (countryData.health_risks.vector_borne_diseases && countryData.health_risks.vector_borne_diseases.length > 0) ||
    (countryData.health_risks.waterborne_diseases && countryData.health_risks.waterborne_diseases.length > 0)
  );

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GlassCard className="p-6" style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(6, 182, 212, 0.2)',
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2))
                `,
                border: '2px solid rgba(6, 182, 212, 0.5)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
              }}
            >
              <SpatialIcon Icon={ICONS.Globe} size={20} style={{ color: '#06B6D4' }} variant="pure" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{countryData.country_name}</h3>
              <p className="text-white/60 text-sm">Contexte sanitaire local</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hasEndemicDiseases && (
              <RiskBadge
                icon="AlertTriangle"
                label="Maladies Endémiques"
                count={countryData.endemic_diseases!.length}
                color="#F59E0B"
                items={countryData.endemic_diseases!.slice(0, 3)}
              />
            )}

            {hasMissingVaccines && (
              <RiskBadge
                icon="Shield"
                label="Vaccins Recommandés"
                count={countryData.vaccination_requirements!.recommended!.length}
                color="#10B981"
                items={countryData.vaccination_requirements!.recommended!.slice(0, 3)}
              />
            )}

            {hasDeficiencies && (
              <RiskBadge
                icon="Pill"
                label="Carences Communes"
                count={countryData.common_deficiencies!.length}
                color="#F59E0B"
                items={countryData.common_deficiencies!}
              />
            )}

            {hasRisks && countryData.health_risks!.vector_borne_diseases && countryData.health_risks!.vector_borne_diseases.length > 0 && (
              <RiskBadge
                icon="Bug"
                label="Maladies Vectorielles"
                count={countryData.health_risks!.vector_borne_diseases.length}
                color="#EF4444"
                items={countryData.health_risks!.vector_borne_diseases.slice(0, 3)}
              />
            )}
          </div>

          {countryData.climate_data && (
            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-400/20">
              <div className="flex items-center gap-2 mb-2">
                <SpatialIcon Icon={ICONS.Cloud} size={14} className="text-blue-400" />
                <span className="text-white/90 text-sm font-medium">Climat</span>
              </div>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                {countryData.climate_data.climate_zones && (
                  <span>{countryData.climate_data.climate_zones.join(', ')}</span>
                )}
                {countryData.climate_data.avg_temperature_celsius && (
                  <span>{countryData.climate_data.avg_temperature_celsius}°C</span>
                )}
                {countryData.climate_data.avg_humidity_percent && (
                  <span>{countryData.climate_data.avg_humidity_percent}% humidité</span>
                )}
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
};

interface RiskBadgeProps {
  icon: keyof typeof ICONS;
  label: string;
  count: number;
  color: string;
  items: string[];
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ icon, label, count, color, items }) => {
  const IconComponent = ICONS[icon as keyof typeof ICONS] || ICONS.AlertCircle;

  return (
    <div
      className="p-3 rounded-lg"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}30`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <SpatialIcon Icon={IconComponent} size={14} style={{ color }} />
          <span className="text-white/90 text-sm font-medium">{label}</span>
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: `${color}20`,
            color,
          }}
        >
          {count}
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-white/70 text-xs">
            <div className="w-1 h-1 rounded-full" style={{ background: color }} />
            {item}
          </div>
        ))}
        {count > items.length && (
          <p className="text-white/50 text-xs mt-1">
            +{count - items.length} autre{count - items.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
};
