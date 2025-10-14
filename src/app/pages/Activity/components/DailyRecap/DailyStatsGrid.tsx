import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import React from 'react';

// Optimized with CSS classes - see dailyRecap.css

interface DailyStatsGridProps {
  todayStats?: {
    totalCalories: number;
    activitiesCount: number;
    totalDuration: number;
    lastActivityTime?: Date;
  };
}

/**
 * Daily Stats Grid - Grille des statistiques quotidiennes d'activité
 * Affiche les métriques clés de la journée
 * OPTIMIZED: Styles inline remplacés par classes CSS réutilisables
 */
const DailyStatsGrid: React.FC<DailyStatsGridProps> = React.memo(({ todayStats }) => {
  return (
    <div className="daily-stats-grid">
      {/* Énergie Quotidienne (Calories brûlées) */}
      <GlassCard className="daily-stat-card daily-stat-card-primary">
        <div className="text-center mb-6">
          <div className="daily-stat-icon-container daily-stat-icon-primary">
            <SpatialIcon Icon={ICONS.Zap} size={28} style={{ color: '#3B82F6' }} />
          </div>
          <h3 className="daily-stat-title">Énergie Quotidienne</h3>
          <p className="daily-stat-subtitle">Calories brûlées aujourd'hui</p>
        </div>
        <div className="daily-stat-value">
          {todayStats?.totalCalories || 0}
        </div>
        <div className="daily-stat-label">
          Calories forgées
        </div>
      </GlassCard>

      {/* Activités Enregistrées */}
      <GlassCard className="daily-stat-card daily-stat-card-secondary">
        <div className="text-center mb-6">
          <div className="daily-stat-icon-container daily-stat-icon-secondary">
            <SpatialIcon Icon={ICONS.Activity} size={28} className="text-cyan-400" />
          </div>
          <h3 className="daily-stat-title">Activités Forgées</h3>
          <p className="daily-stat-subtitle">Mouvements enregistrés</p>
        </div>
        <div className="daily-stat-value">
          {todayStats?.activitiesCount || 0}
        </div>
        <div className="daily-stat-label">
          Aujourd'hui
        </div>
      </GlassCard>

      {/* Dernière Activité */}
      <GlassCard className="daily-stat-card daily-stat-card-accent">
        <div className="text-center mb-6">
          <div className="daily-stat-icon-container daily-stat-icon-accent">
            <SpatialIcon Icon={ICONS.Clock} size={28} className="text-purple-400" />
          </div>
          <h3 className="daily-stat-title">Dernière Forge</h3>
          <p className="daily-stat-subtitle">Timing de votre dernière activité</p>
        </div>
        <div className="daily-stat-value">
          {todayStats?.lastActivityTime ? format(todayStats.lastActivityTime, 'HH:mm') : '--:--'}
        </div>
        <div className="daily-stat-label">
          {todayStats?.lastActivityTime ? format(todayStats.lastActivityTime, 'dd/MM', { locale: fr }) : 'Aucune'}
        </div>
      </GlassCard>
    </div>
  );
});

DailyStatsGrid.displayName = 'DailyStatsGrid';

export default DailyStatsGrid;
