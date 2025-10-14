import React, { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useBlocker, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useFeedback } from '@/hooks/useFeedback';
import { useToast } from '@/ui/components/ToastProvider';
import { useUserStore } from '@/system/store/userStore';
import { useExitModalStore } from '@/system/store/exitModalStore';
import { useFastingProgressionData } from '../../hooks/useFastingProgressionData';
import { getFastingFeatureFlags } from '@/config/featureFlags';
import { useTodayFastingSessions } from '../../hooks/useTodayFastingSessions';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import FastingPeriodSelector from '../Shared/FastingPeriodSelector';
import FastingDataCompletenessAlert from '../Shared/FastingDataCompletenessAlert';
import FastingProgressionLoadingSkeleton from '../Progression/FastingProgressionLoadingSkeleton';
import FastingProgressionSummaryCard from '../Progression/FastingProgressionSummaryCard';
import FastingConsistencyChart from '../Progression/FastingConsistencyChart';

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
  const [showDataAlert, setShowDataAlert] = useState(true);
  
  // Get total sessions count for period selector
  const { data: todayData } = useTodayFastingSessions();
  
  // Fetch progression data
  const {
    data: progressionData,
    isLoading,
    error
  } = useFastingProgressionData(selectedPeriod);
  
  // Check data completeness for AI analysis
  const missingData = useMemo(() => {
    const missing: string[] = [];
    
    if (!profile?.weight_kg) missing.push('Poids corporel');
    if (!profile?.height_cm) missing.push('Taille');
    if (!profile?.objective) missing.push('Objectif de santé');
    
    return missing;
  }, [profile]);
  
  const shouldShowDataAlert = missingData.length > 0 && showDataAlert;
  
  // Calculate available sessions count for the selected period
  const availableSessionsCount = progressionData?.metrics?.totalSessions || 0;
  
  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <FastingPeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        availableSessionsCount={availableSessionsCount}
        getMinSessionsForPeriod={getProgressionMinSessions}
      />
      
      {/* Data Completeness Alert */}
      <AnimatePresence>
        {shouldShowDataAlert && (
          <FastingDataCompletenessAlert
            missingData={missingData}
            analysisType="analyse de progression IA"
            onDismiss={() => setShowDataAlert(false)}
          />
        )}
      </AnimatePresence>
      
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
            radial-gradient(circle at 30% 20%, color-mix(in srgb, #06B6D4 8%, transparent) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'color-mix(in srgb, #06B6D4 20%, transparent)'
        }}>
          <div className="space-y-4">
            <div 
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
              style={{
                background: 'color-mix(in srgb, #06B6D4 15%, transparent)',
                border: '2px solid color-mix(in srgb, #06B6D4 25%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.TrendingUp} size={32} style={{ color: '#06B6D4' }} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Données Insuffisantes pour l'IA
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto">
                La Forge Spatiale nécessite plus de données pour générer une analyse de progression IA. 
                Complétez votre profil et ajoutez des sessions de jeûne pour débloquer l'analyse avancée.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/fasting/input')}
              className="btn-glass--primary px-6 py-3"
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
          
          {/* Consistency Chart */}
          <FastingConsistencyChart
            data={progressionData.consistencyData}
            periodDays={selectedPeriod}
          />
        </div>
      )}
    </div>
  );
};

export default FastingProgressionTab;
