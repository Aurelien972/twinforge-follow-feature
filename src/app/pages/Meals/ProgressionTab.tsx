import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mealsRepo } from '../../../system/data/repositories/mealsRepo';
import { useUserStore } from '../../../system/store/userStore';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import ProgressionMetrics from './components/MealInsights/ProgressionMetrics';
import CalorieTrendChart from './components/MealInsights/CalorieTrendChart';
import MacroDistributionChart from './components/MealInsights/MacroDistributionChart';
import NutritionHeatmap from './components/MealInsights/NutritionHeatmap';
import { getProgressionMetrics } from './components/MealInsights/progressionMetricsUtils';
import { usePerformanceMode } from '../../../system/context/PerformanceModeContext';

/**
 * Progression Tab - Suivi de la Progression Nutritionnelle TwinForge
 * Onglet dédié au suivi des métriques et tendances nutritionnelles
 */
const ProgressionTab: React.FC = () => {
  const navigate = useNavigate();
  const { session, profile } = useUserStore();
  const { isPerformanceMode } = usePerformanceMode();
  const userId = session?.user?.id;

  // Conditional component based on performance mode
  const MotionDiv = isPerformanceMode ? 'div' : motion.div;

  // Récupérer les repas des 7 derniers jours pour les métriques de progression
  const { data: weekMeals, isLoading: isWeekLoading } = useQuery({
    queryKey: ['meals-week', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const weekAgo = startOfDay(subDays(new Date(), 7));
      const today = endOfDay(new Date());
      return mealsRepo.getUserMeals(userId, weekAgo, today);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Récupérer les repas des 30 derniers jours pour les graphiques de tendances
  const { data: monthMeals, isLoading: isMonthLoading } = useQuery({
    queryKey: ['meals-month', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const monthAgo = startOfDay(subDays(new Date(), 30));
      const today = endOfDay(new Date());
      return mealsRepo.getUserMeals(userId, monthAgo, today, 100); // Limite plus élevée pour 30 jours
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Calculer les métriques de progression
  const progressionMetrics = React.useMemo(() => getProgressionMetrics(weekMeals, profile), [weekMeals, profile]);

  // Préparer les données pour les graphiques
  const chartData = React.useMemo(() => {
    if (!monthMeals || monthMeals.length === 0) {
      return { dailyCalories: [], macroDistribution: [] };
    }

    // Données pour le graphique de tendance calorique (30 derniers jours)
    const dailyCaloriesMap = new Map<string, number>();

    monthMeals.forEach(meal => {
      try {
        const date = format(new Date(meal.timestamp), 'yyyy-MM-dd');
        const current = dailyCaloriesMap.get(date) || 0;
        const mealCalories = meal.total_kcal || 0;
        dailyCaloriesMap.set(date, current + mealCalories);
      } catch (error) {
        console.warn('Invalid meal timestamp:', meal.timestamp, error);
      }
    });

    // S'assurer qu'on a au moins quelques données avant de continuer
    if (dailyCaloriesMap.size === 0) {
      return { dailyCalories: [], macroDistribution: [] };
    }

    const dailyCalories = Array.from(dailyCaloriesMap.entries())
      .map(([date, calories]) => ({
        date,
        calories: calories || 0,
        formattedDate: format(new Date(date), 'dd/MM'),
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14); // Derniers 14 jours pour lisibilité

    // Données pour la distribution des macros (semaine en cours)
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    weekMeals?.forEach(meal => {
      if (meal.items && Array.isArray(meal.items)) {
        meal.items.forEach((item: any) => {
          totalProteins += item.proteins || 0;
          totalCarbs += item.carbs || 0;
          totalFats += item.fats || 0;
        });
      }
    });

    const totalMacros = totalProteins + totalCarbs + totalFats;

    const macroDistribution = totalMacros > 0 ? [
      {
        name: 'Protéines',
        value: totalProteins,
        percentage: (totalProteins / totalMacros) * 100,
        color: '#EF4444',
        target: profile?.calculated_metrics?.target_protein_percentage || 30,
      },
      {
        name: 'Glucides',
        value: totalCarbs,
        percentage: (totalCarbs / totalMacros) * 100,
        color: '#F59E0B',
        target: profile?.calculated_metrics?.target_carbs_percentage || 40,
      },
      {
        name: 'Lipides',
        value: totalFats,
        percentage: (totalFats / totalMacros) * 100,
        color: '#10B981',
        target: profile?.calculated_metrics?.target_fats_percentage || 30,
      },
    ] : [];

    return { dailyCalories, macroDistribution };
  }, [monthMeals, weekMeals, profile]);

  // État de chargement initial
  if (isWeekLoading || isMonthLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <GlassCard key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-white/10 rounded w-1/3"></div>
              <div className="h-32 bg-white/10 rounded"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }

  // État vide - Pas assez de données
  if (!weekMeals || weekMeals.length < 3) {
    return (
      <div className="space-y-6">
        <GlassCard className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <SpatialIcon Icon={ICONS.TrendingUp} size={40} className="text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Analyse Avancée en Préparation
          </h3>
          <p className="text-white/70 text-lg mb-6 max-w-md mx-auto leading-relaxed">
            Scannez au moins 3 repas pour débloquer l'analyse complète
            et vos graphiques de tendances nutritionnelles.
          </p>
          <div className="text-cyan-300 text-sm mb-6">
            {weekMeals?.length || 0} / 3 repas minimum
          </div>
          
          {/* CTA pour scanner un repas */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/meals/scan')}
              className="btn-glass--primary px-8 py-4 text-lg font-semibold"
              style={{
                background: `
                  linear-gradient(135deg,
                    color-mix(in srgb, #06B6D4 80%, transparent),
                    color-mix(in srgb, #0891B2 60%, transparent)
                  )
                `,
                backdropFilter: 'blur(20px) saturate(160%)',
                boxShadow: `
                  0 12px 40px color-mix(in srgb, #06B6D4 40%, transparent),
                  0 0 60px color-mix(in srgb, #06B6D4 30%, transparent),
                  inset 0 3px 0 rgba(255,255,255,0.4),
                  inset 0 -3px 0 rgba(0,0,0,0.2)
                `,
                border: '2px solid color-mix(in srgb, #06B6D4 60%, transparent)',
              }}
            >
              <div className="flex items-center gap-3">
                <SpatialIcon Icon={ICONS.Camera} size={20} className="text-white" />
                <span>Scanner un Repas</span>
              </div>
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <MotionDiv
      {...(!isPerformanceMode && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' }
      })}
      className="space-y-6 w-full"
    >
      {/* Métriques de Progression - Hero Section */}
      {progressionMetrics && (
        <ProgressionMetrics 
          metrics={progressionMetrics}
          profile={profile}
        />
      )}

      {/* Graphiques Principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique de Tendance Calorique */}
        <CalorieTrendChart
          data={chartData.dailyCalories}
          targetCalories={progressionMetrics?.targetCalories || 2000}
          objective={profile?.objective}
        />

        {/* Distribution des Macronutriments */}
        {chartData.macroDistribution.length > 0 && (
          <MacroDistributionChart
            data={chartData.macroDistribution}
            profile={profile}
          />
        )}
      </div>

      {/* Heatmap Nutritionnelle */}
      {monthMeals && monthMeals.length > 7 && (
        <NutritionHeatmap 
          meals={monthMeals}
          profile={profile}
        />
      )}
    </MotionDiv>
  );
};

export default ProgressionTab;