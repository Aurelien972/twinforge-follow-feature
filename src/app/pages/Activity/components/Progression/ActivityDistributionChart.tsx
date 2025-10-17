import { motion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { usePreferredMotion } from '../../../../../system/device/DeviceProvider';
import React from 'react';

interface ActivityDistribution {
  activity_types: Array<{
    name: string;
    percentage: number;
    total_minutes: number;
    total_calories: number;
    color: string;
  }>;
  intensity_levels: Array<{
    level: string;
    percentage: number;
    sessions_count: number;
    color: string;
  }>;
  time_patterns: Array<{
    period: string;
    activity_count: number;
    avg_calories: number;
    color: string;
  }>;
}

interface ActivityDistributionChartProps {
  data?: ActivityDistribution;
  profile?: any;
  period: 'week' | 'month' | 'quarter';
  apiPeriod: 'last7Days' | 'last30Days' | 'last3Months';
}

/**
 * Obtenir le label de période pour l'affichage
 */
function getPeriodDisplayLabel(period: 'week' | 'month' | 'quarter'): string {
  switch (period) {
    case 'week': return '7 jours';
    case 'month': return '30 jours';
    case 'quarter': return '90 jours';
    default: return '30 jours';
  }
}

/**
 * Custom Tooltip pour les graphiques d'activité
 */
const CustomTooltip: React.FC<{ active?: boolean; payload?: any; label?: string }> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div
      className="p-4 rounded-xl border backdrop-blur-xl"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, ${data.color} 15%, transparent) 0%, transparent 60%),
          rgba(11, 14, 23, 0.95)
        `,
        borderColor: `color-mix(in srgb, ${data.color} 30%, transparent)`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px color-mix(in srgb, ${data.color} 20%, transparent)`
      }}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="text-white font-semibold text-sm">{data.name}</span>
        </div>
        <div className="text-white/80 text-sm">
          <div>{data.percentage}% ({data.total_minutes || data.sessions_count || data.activity_count})</div>
          <div className="text-white/60 text-xs">
            {data.total_calories ? `${data.total_calories} kcal` : 
             data.avg_calories ? `${data.avg_calories} kcal moy.` : 
             `${data.sessions_count || data.activity_count} sessions`}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Custom Legend pour les graphiques d'activité
 */
const CustomLegend: React.FC<{ payload?: any }> = ({ payload }) => {
  return (
    <div className="flex justify-center gap-6 mt-4 flex-wrap">
      {payload?.map((entry: any, index: number) => (
        <motion.div
          key={index}
          className="flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: entry.color,
              boxShadow: `0 0 8px color-mix(in srgb, ${entry.color} 60%, transparent)`
            }}
          />
          <span className="text-white/80 text-sm font-medium">{entry.value}</span>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Activity Distribution Chart - Graphique de Distribution des Activités
 * Visualise la répartition des types d'activités, intensités et patterns temporels
 */
const ActivityDistributionChart: React.FC<ActivityDistributionChartProps> = ({
  data,
  profile,
  period,
  apiPeriod
}) => {
  const reduceMotion = usePreferredMotion() === 'reduced';
  
  // Early return if no data is available
  if (!data || !data.activity_types || data.activity_types.length === 0) {
    return (
      <div className="chart-enter-right">
        <GlassCard
          className="p-6"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-activity-primary) 8%, transparent) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--color-activity-secondary) 6%, transparent) 0%, transparent 50%),
              var(--glass-opacity)
            `,
            borderColor: 'color-mix(in srgb, var(--color-activity-primary) 25%, transparent)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              0 0 20px color-mix(in srgb, var(--color-activity-primary) 10%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.12)
            `
          }}
        >
          <div className="flex items-center justify-center gap-3 p-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #10B981 30%, transparent), color-mix(in srgb, #10B981 20%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #10B981 40%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #10B981 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.BarChart3} size={20} style={{ color: '#10B981' }} />
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-xl mb-2">Distribution Énergétique</h3>
              <p className="text-white/70 text-sm">Données insuffisantes pour l'analyse</p>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }
  
  // Calculer le score d'équilibre des activités
  const calculateBalanceScore = (): number => {
    if (!data?.activity_types || data.activity_types.length === 0) return 0;
    
    // Score basé sur la diversité des types d'activités
    const diversityScore = Math.min(100, (data.activity_types.length / 5) * 100);
    
    // Score basé sur la répartition équilibrée des intensités
    const intensityBalance = (data.intensity_levels || []).reduce((acc, level) => {
      const idealPercentage = 25; // 25% par niveau d'intensité idéalement
      const deviation = Math.abs(level.percentage - idealPercentage);
      return acc + (25 - Math.min(25, deviation));
    }, 0);
    
    return Math.round((diversityScore + intensityBalance) / 2);
  };

  const balanceScore = calculateBalanceScore();
  const scoreColor = balanceScore >= 80 ? '#22C55E' : 
                    balanceScore >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className="chart-enter-right">
      <GlassCard
        className="p-6"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-activity-primary) 8%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--color-activity-secondary) 6%, transparent) 0%, transparent 50%),
            var(--glass-opacity)
          `,
          borderColor: 'color-mix(in srgb, var(--color-activity-primary) 25%, transparent)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 20px color-mix(in srgb, var(--color-activity-primary) 10%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.12)
          `
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #10B981 30%, transparent), color-mix(in srgb, #10B981 20%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #10B981 40%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #10B981 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.BarChart3} size={20} style={{ color: '#10B981' }} />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Distribution Énergétique</h3>
              <p className="text-white/70 text-sm">Répartition de vos activités sur {getPeriodDisplayLabel(period)}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: scoreColor,
                  boxShadow: `0 0 8px color-mix(in srgb, ${scoreColor} 60%, transparent)`
                }}
              />
              <span className="text-white font-bold text-lg">{balanceScore}</span>
            </div>
            <div className="text-white/60 text-xs">Score Équilibre</div>
          </div>
        </div>

        {/* Distribution des Types d'Activités */}
        {data.activity_types && data.activity_types.length > 0 && (
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <SpatialIcon Icon={ICONS.Target} size={16} style={{ color: '#10B981' }} />
              Types d'Activités
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.activity_types.map((activity, index) => (
                <motion.div
                  key={activity.name}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: `color-mix(in srgb, ${activity.color} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${activity.color} 20%, transparent)`,
                    animationDelay: `${0.6 + index * 0.1}s`
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: `color-mix(in srgb, ${activity.color} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${activity.color} 25%, transparent)`
                      }}
                    >
                      <SpatialIcon
                        Icon={ICONS.Activity}
                        size={12}
                        style={{ color: activity.color }}
                      />
                    </div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: activity.color }}>
                    {activity.percentage}%
                  </div>
                  <div className="text-sm font-medium text-white">{activity.name}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {activity.total_minutes} min • {activity.total_calories} kcal
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Distribution des Intensités */}
        {data?.intensity_levels && data.intensity_levels.length > 0 && (
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <SpatialIcon Icon={ICONS.Zap} size={16} style={{ color: '#10B981' }} />
              Niveaux d'Intensité
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.intensity_levels.map((intensity, index) => (
                <motion.div
                  key={intensity.level}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: `color-mix(in srgb, ${intensity.color} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${intensity.color} 20%, transparent)`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-xl font-bold" style={{ color: intensity.color }}>
                    {intensity.percentage}%
                  </div>
                  <div className="text-sm font-medium text-white">{intensity.level}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {intensity.sessions_count} sessions
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Patterns Temporels */}
        {data?.time_patterns && data.time_patterns.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <SpatialIcon Icon={ICONS.Clock} size={16} style={{ color: '#10B981' }} />
              Patterns Temporels
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.time_patterns.map((pattern, index) => (
                <motion.div
                  key={pattern.period}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: `color-mix(in srgb, ${pattern.color} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${pattern.color} 20%, transparent)`
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-lg font-bold" style={{ color: pattern.color }}>
                    {pattern.activity_count}
                  </div>
                  <div className="text-sm font-medium text-white">{pattern.period}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {pattern.avg_calories} kcal moy.
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Analyse de l'Équilibre */}
        <div className="mt-6 p-4 rounded-xl" style={{
          background: `color-mix(in srgb, ${scoreColor} 6%, transparent)`,
          border: `1px solid color-mix(in srgb, ${scoreColor} 18%, transparent)`,
          backdropFilter: 'blur(8px) saturate(120%)'
        }}>
          <div className="flex items-start gap-2">
            <SpatialIcon
              Icon={balanceScore >= 80 ? ICONS.Check : 
                    balanceScore >= 60 ? ICONS.Info : ICONS.AlertCircle}
              size={14}
              style={{ color: scoreColor }}
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-medium" style={{ color: scoreColor }}>
                {balanceScore >= 80 ? 'Excellent équilibre énergétique' :
                 balanceScore >= 60 ? 'Bon équilibre, quelques ajustements possibles' :
                 'Équilibre à améliorer'}
              </p>
              <p className="text-xs mt-1" style={{ color: `${scoreColor}CC` }}>
                {balanceScore >= 80 ? 'Continuez cette diversité d\'activités' :
                 balanceScore >= 60 ? 'Variez davantage vos types d\'activités' :
                 'Essayez d\'intégrer plus de variété dans vos entraînements'}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ActivityDistributionChart;