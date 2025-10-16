import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/system/store/userStore';
import { useFastingProgressionData } from '../../hooks/useFastingProgressionData';
import { useTodayFastingSessions } from '../../hooks/useTodayFastingSessions';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import FastingPeriodSelector from '../Shared/FastingPeriodSelector';
import FastingProgressionLoadingSkeleton from '../Progression/FastingProgressionLoadingSkeleton';
import FastingProgressionSummaryCard from '../Progression/FastingProgressionSummaryCard';
import FastingConsistencyChart from '../Progression/FastingConsistencyChart';
import FastingStreakDiagram from '../Progression/FastingStreakDiagram';
import FastingDurationTrendChart from '../Progression/FastingDurationTrendChart';

/**
 * Get minimum sessions required for Progression AI analysis
 */
const getProgressionMinSessions = (period: number): number => {
  switch (period) {
    case 7: return 5;    // Progression requires more data than Insights
    case 30: return 12;  // Higher threshold for monthly analysis
    case 90: return 20;  // Same as Insights for quarterly
    default: return 5;
  }
};

/**
 * Fasting Progression Tab - Onglet Progression de la Forge du Temps
 * Analyse de l'évolution des performances de jeûne
 */
const FastingProgressionTab: React.FC = () => {
  const { profile, session } = useUserStore();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  
  // Get total sessions count for period selector
  const { data: todayData } = useTodayFastingSessions();
  
  // Fetch progression data
  const {
    data: progressionData,
    isLoading,
    error
  } = useFastingProgressionData(selectedPeriod);
  
  
  // Calculate available sessions count for the selected period
  const availableSessionsCount = progressionData?.metrics?.totalSessions || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Period Selector with Cyan Color for Progression Tab */}
      <div className="flex justify-center">
        <div className="inline-flex gap-2 p-1 rounded-lg" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {[7, 30, 90].map((period) => {
            const isSelected = selectedPeriod === period;
            const accentColor = '#06B6D4'; // Bleu cyan pour Progression
            const threshold = getProgressionMinSessions(period);
            const isAvailable = availableSessionsCount >= threshold;

            return (
              <button
                key={period}
                onClick={() => {
                  if (isAvailable) {
                    setSelectedPeriod(period);
                  }
                }}
                disabled={!isAvailable}
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: isSelected ? `${accentColor}33` : 'transparent',
                  color: isSelected ? accentColor : isAvailable ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)',
                  border: isSelected ? `1px solid ${accentColor}66` : '1px solid transparent',
                  boxShadow: isSelected ? `0 0 20px ${accentColor}4D` : 'none',
                  opacity: isAvailable ? 1 : 0.5,
                  cursor: isAvailable ? 'pointer' : 'not-allowed'
                }}
              >
                {period === 7 ? '7 jours' : period === 30 ? '30 jours' : '90 jours'}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <FastingProgressionLoadingSkeleton />
      )}
      
      {/* Error State */}
      {error && (
        <GlassCard className="p-6" style={{
          background: 'color-mix(in srgb, #EF4444 8%, transparent)',
          borderColor: 'color-mix(in srgb, #EF4444 20%, transparent)'
        }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <SpatialIcon Icon={ICONS.AlertCircle} size={16} className="text-red-400" />
            </div>
            <div>
              <h4 className="text-red-300 font-semibold">Erreur d'Analyse</h4>
              <p className="text-red-200 text-sm">
                Impossible de charger les données de progression.
              </p>
            </div>
          </div>
        </GlassCard>
      )}
      
      {/* No Data State */}
      {progressionData && progressionData.metrics.totalSessions === 0 && !isLoading && (
        <GlassCard className="p-8 text-center" style={{
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, #06B6D4 15%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, color-mix(in srgb, #06B6D4 12%, transparent) 0%, transparent 50%),
            linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%),
            var(--glass-opacity)
          `,
          borderColor: 'color-mix(in srgb, #06B6D4 30%, transparent)',
          boxShadow: `
            0 12px 40px rgba(0, 0, 0, 0.25),
            0 0 30px color-mix(in srgb, #06B6D4 20%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.15)
          `
        }}>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%),
                    linear-gradient(135deg, color-mix(in srgb, #06B6D4 30%, transparent), color-mix(in srgb, #06B6D4 20%, transparent))
                  `,
                  border: '2px solid color-mix(in srgb, #06B6D4 40%, transparent)',
                  boxShadow: '0 0 30px color-mix(in srgb, #06B6D4 30%, transparent)'
                }}
              >
                <SpatialIcon Icon={ICONS.TrendingUp} size={40} style={{ color: '#06B6D4' }} />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white">Progression en Construction</h3>
                <p className="text-white/70 text-base">Plus de sessions nécessaires</p>
              </div>
            </div>

            <div>
              <p className="text-white/70 text-base leading-relaxed max-w-lg mx-auto">
                Enregistrez plus de sessions de jeûne pour débloquer une analyse de progression complète
                et visualiser l'évolution de votre discipline temporelle.
              </p>
            </div>

            <button
              onClick={() => navigate('/fasting/input')}
              className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb, #06B6D4 80%, transparent), color-mix(in srgb, #06B6D4 60%, transparent))',
                border: '2px solid color-mix(in srgb, #06B6D4 60%, transparent)',
                boxShadow: `0 12px 40px color-mix(in srgb, #06B6D4 40%, transparent), 0 0 60px color-mix(in srgb, #06B6D4 30%, transparent)`,
                color: '#fff'
              }}
            >
              <div className="flex items-center gap-2">
                <SpatialIcon Icon={ICONS.Timer} size={16} />
                <span>Ajouter des Sessions</span>
              </div>
            </button>
          </div>
        </GlassCard>
      )}
      
      {/* Progression Content */}
      {progressionData && progressionData.metrics.totalSessions > 0 && !isLoading && (
        <div className="space-y-6">
          {/* Summary Card */}
          <FastingProgressionSummaryCard
            metrics={progressionData.metrics}
            periodDays={selectedPeriod}
            aiAnalysis={progressionData.aiAnalysis}
            aiModel={progressionData.aiModel}
            tokensUsed={progressionData.tokensUsed}
            cached={progressionData.cached}
          />

          {/* Graphiques de Progression */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FastingConsistencyChart
              data={progressionData.consistencyData}
              periodDays={selectedPeriod}
            />
            <FastingDurationTrendChart
              data={progressionData.durationTrend || []}
              periodDays={selectedPeriod}
            />
          </div>

          {/* Streak Diagram */}
          {progressionData.sessions && (
            <FastingStreakDiagram
              sessions={progressionData.sessions}
              periodDays={selectedPeriod}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default FastingProgressionTab;
