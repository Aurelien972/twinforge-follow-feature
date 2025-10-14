/**
 * TrainingPage - Atelier de Training
 * Complete training workshop with 4 focused tabs
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tabs from '../../ui/tabs/TabsComponent';
import PageHeader from '../../ui/page/PageHeader';
import GlassCard from '../../ui/cards/GlassCard';
import { PLACEHOLDER_PAGES_CONFIG } from '../../config/placeholderPagesConfig';
import {
  HeroTrainingCTA,
  SavedDraftsCard,
  CurrentGoalCard,
  ForgeMetricsCTACard,
  WearableTodayDashboard,
  TodayEnergyLevelIndicator,
  OptimalTrainingWindow,
  TodayEmptyState,
} from '../../ui/components/training/today';
import { AdaptiveRecommendationsCard, NextWeekPlanCard } from '../../ui/components/training/insights';
import {
  AIPrimaryAdviceCard,
  WeeklyCoachingInsightsGrid,
  VolumeAdviceCard,
  IntensityAdviceCard,
  RecoveryOptimizationAdvice,
  StrategyAdviceCard,
  DisciplineDistributionCard,
  CrossDisciplineInsightsCard,
  ConseilsEmptyState
} from '../../ui/components/training/advice';
import TrainingProgressTab from './Training/TrainingProgressTab';
import TrainingRecordsTab from './Training/TrainingRecordsTab';
import {
  HistoryFilterBar,
  SessionHistoryTimeline,
  HistoryStatsOverview,
  HistoryEmptyState
} from '../../ui/components/training/history';
import type { HistoryFilters, HistoryTabData } from '../../domain/trainingToday';
import { trainingHistoryService } from '../../system/services/trainingHistoryService';
import { useTodayTrainingContext, useDisciplineAdaptiveContent } from '../../hooks';
import { useTrainingAdvice, usePriorityRecommendations, useMarkRecommendationHelpful } from '../../hooks/useTrainingAdvice';
import { ICONS } from '../../ui/icons/registry';


const TrainingPage: React.FC = () => {
  const config = PLACEHOLDER_PAGES_CONFIG.training;
  const [hasTrainingData] = useState(true);
  const [activeTab, setActiveTab] = useState(config.tabs[0].value);

  // History tab state
  const [historyFilters, setHistoryFilters] = useState<HistoryFilters>({
    period: 'month',
    type: 'all'
  });
  const [historyData, setHistoryData] = useState<HistoryTabData | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyHasMore, setHistoryHasMore] = useState(false);

  // Load history data when filters change
  React.useEffect(() => {
    const loadHistory = async () => {
      setLoadingHistory(true);
      try {
        const { sessions, totalCount, hasMore } = await trainingHistoryService.getSessionHistory(historyFilters, historyPage, 10);
        const stats = await trainingHistoryService.getHistoryStats(historyFilters);
        setHistoryData({ sessions, stats });
        setHistoryHasMore(hasMore);
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadHistory();
  }, [historyFilters, historyPage]);

  const currentTabConfig = React.useMemo(() => {
    return config.tabs.find(tab => tab.value === activeTab) || config.tabs[0];
  }, [activeTab, config.tabs]);

  const currentHeaderConfig = currentTabConfig.pageHeader || {
    icon: config.icon,
    title: config.title,
    subtitle: config.subtitle,
    color: config.color
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6 relative"
    >
      <PageHeader
        icon={currentHeaderConfig.icon as keyof typeof ICONS}
        title={currentHeaderConfig.title}
        subtitle={currentHeaderConfig.subtitle}
        circuit={config.circuit as any}
        iconColor={currentHeaderConfig.color}
      />

      <Tabs defaultValue={config.tabs[0].value} className="w-full training-tabs" onValueChange={setActiveTab}>
        <Tabs.List role="tablist" aria-label="Sections de l'Atelier de Training" className="mb-6 w-full">
          {config.tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value} icon={tab.icon}>
              <span className="tab-text">{tab.label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* ONGLET 1: AUJOURD'HUI */}
        <Tabs.Panel value="aujourd hui">
          <TodayTabContent />
        </Tabs.Panel>

        {/* ONGLET 2: CONSEILS */}
        <Tabs.Panel value="conseils">
          <ConseilsTabContent />
        </Tabs.Panel>

        {/* ONGLET 3: PROGRESSION */}
        <Tabs.Panel value="progression">
          <TrainingProgressTab />
        </Tabs.Panel>

        {/* ONGLET 4: RECORDS */}
        <Tabs.Panel value="records">
          <TrainingRecordsTab />
        </Tabs.Panel>

        {/* ONGLET 5: HISTORIQUE */}
        <Tabs.Panel value="historique">
          <div className="space-y-6">
            <HistoryFilterBar
              period={historyFilters.period}
              type={historyFilters.type}
              discipline={historyFilters.discipline}
              onPeriodChange={(period) => {
                setHistoryFilters(prev => ({ ...prev, period }));
                setHistoryPage(1);
              }}
              onTypeChange={(type) => {
                setHistoryFilters(prev => ({ ...prev, type }));
                setHistoryPage(1);
              }}
              onDisciplineChange={(discipline) => {
                setHistoryFilters(prev => ({
                  ...prev,
                  discipline: discipline === 'all' ? undefined : discipline
                }));
                setHistoryPage(1);
              }}
            />

            {loadingHistory && historyPage === 1 ? (
              <GlassCard className="p-8 text-center">
                <div className="text-white/60">Chargement de l'historique...</div>
              </GlassCard>
            ) : historyData ? (
              <>
                {historyData.sessions.length > 0 ? (
                  <>
                    <HistoryStatsOverview stats={historyData.stats} />
                    <SessionHistoryTimeline sessions={historyData.sessions} />
                    {historyHasMore && (
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={() => setHistoryPage(prev => prev + 1)}
                          disabled={loadingHistory}
                          className="px-6 py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50"
                          style={{
                            background: 'rgba(24, 227, 255, 0.15)',
                            border: '1px solid rgba(24, 227, 255, 0.3)'
                          }}
                        >
                          {loadingHistory ? 'Chargement...' : 'Charger plus'}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <HistoryEmptyState />
                )}
              </>
            ) : null}
          </div>
        </Tabs.Panel>
      </Tabs>
    </motion.div>
  );
};

const TodayTabContent: React.FC = () => {
  const { data: todayContext, isLoading } = useTodayTrainingContext();
  const { config, motivationalMessage, readinessMessage } = useDisciplineAdaptiveContent(todayContext);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <GlassCard className="p-8 text-center">
          <div className="text-white/60">Chargement de votre contexte...</div>
        </GlassCard>
      </div>
    );
  }

  if (!todayContext) {
    return <TodayEmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* CTA Principal Motivationnel */}
      <HeroTrainingCTA />

      {/* Lien vers Forge si activités aujourd'hui */}
      <ForgeMetricsCTACard />

      {/* Indicateur d'énergie et préparation */}
      <TodayEnergyLevelIndicator readinessScore={todayContext.readinessScore} />

      {/* Fenêtre optimale d'entraînement */}
      {todayContext.optimalWindow && (
        <OptimalTrainingWindow
          window={todayContext.optimalWindow}
          hoursUntil={todayContext.hoursUntilOptimalWindow}
        />
      )}

      {/* Drafts sauvegardés */}
      <SavedDraftsCard />

      {/* Dashboard Wearable si données disponibles */}
      {todayContext.todayWearableMetrics && (
        <WearableTodayDashboard
          metrics={todayContext.todayWearableMetrics}
          deviceName={todayContext.todayWearableMetrics.deviceName}
        />
      )}

      {/* Objectif actif */}
      {todayContext.activeGoal && <CurrentGoalCard />}
    </div>
  );
};

const ConseilsTabContent: React.FC = () => {
  const { data: insights, isLoading } = useTrainingAdvice();
  const priorityRecommendations = usePriorityRecommendations(insights);
  const markHelpful = useMarkRecommendationHelpful();

  const handleMarkHelpful = (recommendationId: string, helpful: boolean) => {
    markHelpful.mutate({ recommendationId, helpful });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <GlassCard className="p-8 text-center">
          <div className="text-white/60">Analyse de votre historique en cours...</div>
        </GlassCard>
      </div>
    );
  }

  if (!insights) {
    return <ConseilsEmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Discipline Distribution */}
      <DisciplineDistributionCard insights={insights} />

      {/* Cross-Discipline Insights */}
      <CrossDisciplineInsightsCard insights={insights} />

      {/* Priority Recommendation */}
      {priorityRecommendations.length > 0 && (
        <AIPrimaryAdviceCard
          recommendation={priorityRecommendations[0]}
          onMarkHelpful={handleMarkHelpful}
        />
      )}

      {/* Weekly Insights Grid */}
      <WeeklyCoachingInsightsGrid insights={insights} />

      {/* Volume Advice */}
      <VolumeAdviceCard insights={insights} />

      {/* Intensity Advice */}
      <IntensityAdviceCard insights={insights} />

      {/* Recovery Advice */}
      <RecoveryOptimizationAdvice insights={insights} />

      {/* Strategy Advice */}
      <StrategyAdviceCard insights={insights} />
    </div>
  );
};

export default TrainingPage;
