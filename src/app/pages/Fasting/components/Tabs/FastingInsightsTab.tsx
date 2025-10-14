import React, { useState, useMemo } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { useFastingInsightsGenerator } from '../../hooks/useFastingInsightsGenerator';
import { useUserStore } from '@/system/store/userStore';
import { useExitModalStore } from '@/system/store/exitModalStore';
import { useToast } from '@/ui/components/ToastProvider';
import { useFastingHistory } from '../../hooks/useFastingHistory';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import GlassCard from '@/ui/cards/GlassCard';
import FastingPeriodSelector from '../Shared/FastingPeriodSelector';
import FastingDataCompletenessAlert from '../Shared/FastingDataCompletenessAlert';
import FastingInsightsLoadingSkeleton from '../Insights/FastingInsightsLoadingSkeleton';
import FastingInsightsSummaryCard from '../Insights/FastingInsightsSummaryCard';
import FastingInsightCard from '../Insights/FastingInsightCard';

/**
 * Get minimum sessions required for Insights AI analysis
 */
const getInsightsMinSessions = (period: number): number => {
  switch (period) {
    case 7: return 3;    // Insights requirements
    case 30: return 8;   
    case 90: return 20;  
    default: return 3;
  }
};

/**
 * Fasting Insights Tab - Onglet Insights de la Forge du Temps
 * Conseils IA personnalisés basés sur les patterns de jeûne
 */
interface FastingInsightsTabProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

const FastingInsightsTab: React.FC<FastingInsightsTabProps> = ({ onLoadingChange }) => {
  const { profile } = useUserStore();
  const { showModal: showExitModal } = useExitModalStore();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [showDataAlert, setShowDataAlert] = useState(true);
  
  // Get available sessions count for the selected period
  const { data: historyData } = useFastingHistory(100, {
    dateRange: {
      start: new Date(Date.now() - selectedPeriod * 24 * 60 * 60 * 1000),
      end: new Date()
    }
  });
  
  const availableSessionsCount = historyData?.sessions?.filter(s => s.status === 'completed').length || 0;
  
  // Generate insights for selected period
  const {
    data: insightsData,
    isLoading,
    error
  } = useFastingInsightsGenerator(selectedPeriod);

  // Notify parent about loading state changes
  React.useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  // Block navigation during insights generation
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => {
      // Block navigation during AI generation to prevent cost waste
      return isLoading && 
             currentLocation.pathname !== nextLocation.pathname &&
             !insightsData?.cached; // Don't block if data is cached (instant)
    }
  );

  // Handle blocked navigation
  React.useEffect(() => {
    if (blocker.state === 'blocked') {
      showExitModal({
        title: "Quitter la génération IA en cours ?",
        message: "La Forge Spatiale génère vos insights personnalisés avec GPT-5 mini. Quitter maintenant annulera l'analyse et pourrait engendrer des coûts sans résultat.",
        processName: "Génération IA",
        onConfirm: () => {
          blocker.proceed();
        },
        onCancel: () => {
          blocker.reset();
        }
      });
    }
  }, [blocker, showExitModal]);

  // Check if we should show data completeness alert
  const shouldShowDataAlert = showDataAlert && (
    !profile?.weight_kg || 
    !profile?.height_cm || 
    !profile?.objective || 
    !profile?.activity_level ||
    (insightsData?.dataQuality === 'insufficient') ||
    (insightsData?.missingData && insightsData.missingData.length > 0)
  );
  
  const missingData = [];
  if (!profile?.weight_kg) missingData.push('Poids corporel');
  if (!profile?.height_cm) missingData.push('Taille');
  if (!profile?.objective) missingData.push('Objectif fitness');
  if (!profile?.activity_level) missingData.push('Niveau d\'activité');
  if (!profile?.emotions?.chronotype) missingData.push('Chronotype (onglet Émotions)');
  if (insightsData?.missingData) {
    // Add unique missing data from AI response
    insightsData.missingData.forEach(item => {
      if (!missingData.includes(item)) {
        missingData.push(item);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <FastingPeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        availableSessionsCount={availableSessionsCount}
        getMinSessionsForPeriod={getInsightsMinSessions}
      />
      
      {/* Data Completeness Alert */}
      <AnimatePresence>
        {shouldShowDataAlert && (
          <FastingDataCompletenessAlert
            missingData={missingData}
            analysisType="insights IA"
            onDismiss={() => setShowDataAlert(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Loading State */}
      {isLoading && (
        <FastingInsightsLoadingSkeleton />
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
                Impossible de générer les insights. Réessayez dans quelques instants.
              </p>
            </div>
          </div>
        </GlassCard>
      )}
      
      {/* Insights Content */}
      {insightsData && !isLoading && (
        <div className="space-y-6">
          {/* Summary Card */}
          <FastingInsightsSummaryCard
            summary={insightsData.summary}
            periodDays={selectedPeriod}
            aiModel={insightsData.aiModel}
            tokensUsed={insightsData.tokensUsed}
            cached={insightsData.cached}
          />
          
          {/* Individual Insights */}
          {insightsData.insights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <SpatialIcon Icon={ICONS.Lightbulb} size={18} className="text-purple-400" />
                Insights Détaillés ({insightsData.insights.length})
              </h3>
              
              <div className="space-y-4">
                {insightsData.insights.map((insight, index) => (
                  <FastingInsightCard
                    key={insight.id}
                    insight={insight}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Data Quality Indicator */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20">
                <SpatialIcon Icon={ICONS.Shield} size={12} className="text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">
                  Qualité : {
                    insightsData.dataQuality === 'excellent' ? 'Excellente' :
                    insightsData.dataQuality === 'good' ? 'Bonne' :
                    insightsData.dataQuality === 'limited' ? 'Limitée' : 'Insuffisante'
                  }
                </span>
              </div>
              
              {insightsData.aiModel && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20">
                  <SpatialIcon Icon={ICONS.Zap} size={12} className="text-cyan-400" />
                  <span className="text-cyan-300 text-sm font-medium">
                    {insightsData.aiModel} • {insightsData.tokensUsed} tokens
                    {insightsData.cached && ' • Mis en cache'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* No Data State */}
      {insightsData && insightsData.insights.length === 0 && !isLoading && (
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
              <SpatialIcon Icon={ICONS.Timer} size={32} style={{ color: '#06B6D4' }} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Données Insuffisantes pour l'IA
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto">
                La Forge Spatiale nécessite plus de données pour générer des insights IA personnalisés. 
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
    </div>
  );
};

export default FastingInsightsTab;