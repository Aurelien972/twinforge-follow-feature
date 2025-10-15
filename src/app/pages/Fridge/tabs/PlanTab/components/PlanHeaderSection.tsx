import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';
import { useFeedback } from '../../../../../../hooks/useFeedback';
import CustomDropdown from '../../RecipesTab/components/CustomDropdown';
import NutritionalSummary from './NutritionalSummary';

interface PlanHeaderSectionProps {
  currentPlan: any;
  selectedInventoryId: string | null;
  availableInventories: any[];
  selectInventory: (inventoryId: string) => void;
  isGenerating: boolean;
  currentWeek: number;
  availableWeeks: number[];
  maxAvailableWeek: number;
  canGenerateNextWeek: boolean;
  setCurrentWeek: (week: number) => void;
  getWeekDateRange: (week: number) => { formatted: string; startDate: string; endDate: string };
  handleGenerateMealPlan: () => void;
  isWeekAvailable: (week: number) => boolean;
  weekDateRange: { formatted: string; startDate: string; endDate: string };
}

/**
 * Header section of the Plan Tab containing title, actions, and inventory selector
 */
const PlanHeaderSection: React.FC<PlanHeaderSectionProps> = ({
  currentPlan,
  selectedInventoryId,
  availableInventories,
  selectInventory,
  isGenerating,
  currentWeek,
  availableWeeks,
  maxAvailableWeek,
  canGenerateNextWeek,
  setCurrentWeek,
  getWeekDateRange,
  handleGenerateMealPlan,
  isWeekAvailable,
  weekDateRange
}) => {
  const { click } = useFeedback();

  // Week navigation logic
  const canGoToPrevious = currentWeek > 1;
  const canGoToNext = currentWeek < maxAvailableWeek || canGenerateNextWeek;

  // Week options for dropdown
  const weekOptions = availableWeeks.map(week => ({
    value: week.toString(),
    label: `Semaine ${week} - ${getWeekDateRange(week).formatted}`
  }));

  // Check if current week has a plan
  const hasCurrentWeekPlan = currentPlan && currentPlan.weekNumber === currentWeek;

  return (
    <>
      {/* Résumé Nutritionnel */}
      {currentPlan?.nutritionalSummary && (
        <NutritionalSummary
          nutritionalSummary={currentPlan.nutritionalSummary}
          estimatedWeeklyCost={currentPlan.estimatedWeeklyCost}
        />
      )}

      {/* Header avec Actions */}
      <GlassCard
        className="p-6"
        style={{
          position: 'relative',
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, #8B5CF6 12%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, color-mix(in srgb, #A855F7 8%, transparent) 0%, transparent 50%),
            var(--glass-opacity)
          `,
          borderColor: 'color-mix(in srgb, #8B5CF6 25%, transparent)',
          boxShadow: `
            0 12px 40px rgba(0, 0, 0, 0.25),
            0 0 30px color-mix(in srgb, #8B5CF6 15%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.15)
          `
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 flex-1">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center breathing-icon"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #8B5CF6 35%, transparent), color-mix(in srgb, #8B5CF6 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #8B5CF6 50%, transparent)',
                boxShadow: '0 0 30px color-mix(in srgb, #8B5CF6 40%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Calendar} size={32} style={{ color: '#8B5CF6' }} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Générateur de Plan Repas
              </h3>
              <p className="text-white/70 text-sm">
                Organisez vos repas de la semaine avec votre inventaire
              </p>
            </div>
          </div>
        </div>
        
        <CustomDropdown
          value={selectedInventoryId || ''}
          options={availableInventories.map(inv => ({ 
            value: inv.id, 
            label: `Inventaire du ${new Date(inv.created_at).toLocaleDateString('fr-FR')} (${inv.inventory_final?.length || 0} ingrédients)` 
          }))}
          onChange={selectInventory}
          placeholder="Sélectionner un inventaire..."
          className="w-full"
          aria-label="Sélectionner l'inventaire pour le plan de repas"
          disabled={isGenerating}
        />
        
        {/* Week Navigation Section - Only show if weeks are available */}
        {weekOptions.length > 0 && (
          <div className="space-y-4 mt-4 pt-4 border-t border-white/10">
            {/* Week Selector with Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  click();
                  setCurrentWeek(currentWeek - 1);
                }}
                disabled={!canGoToPrevious || isGenerating}
                className="btn-glass w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                title={canGoToPrevious ? 'Semaine précédente' : 'Aucune semaine précédente disponible'}
                style={{
                  background: 'color-mix(in srgb, #8B5CF6 15%, transparent)',
                  border: '1px solid color-mix(in srgb, #8B5CF6 25%, transparent)'
                }}
              >
                <SpatialIcon Icon={ICONS.ChevronLeft} size={14} className="text-cyan-300" />
              </button>
              
              <div className="flex-1 min-w-0">
                <CustomDropdown
                  options={weekOptions}
                  value={currentWeek.toString()}
                  onChange={(value) => {
                    click();
                    setCurrentWeek(parseInt(value));
                  }}
                  placeholder="Sélectionner une semaine"
                  disabled={isGenerating}
                  className="w-full"
                />
              </div>
              
              <button
                onClick={() => {
                  click();
                  setCurrentWeek(currentWeek + 1);
                }}
                disabled={!canGoToNext || isGenerating}
                className="btn-glass w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                title={canGoToNext ? 'Semaine suivante' : 'Semaine suivante non disponible'}
                style={{
                  background: 'color-mix(in srgb, #8B5CF6 15%, transparent)',
                  border: '1px solid color-mix(in srgb, #8B5CF6 25%, transparent)'
                }}
              >
                <SpatialIcon Icon={ICONS.ChevronRight} size={14} className="text-cyan-300" />
              </button>
            </div>
          </div>
        )}
        
          {/* Résumé Nutritionnel Compact */}
          {currentPlan?.nutritionalSummary && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-sm">
              <span className="text-purple-300 font-medium">
                ~{Math.round(currentPlan.nutritionalSummary.avgCaloriesPerDay)} kcal/jour
              </span>
              <span className="text-cyan-300 font-medium">
                {Math.round(currentPlan.nutritionalSummary.avgProteinPerDay)}g protéines/jour
              </span>
            </div>
          )}
      </GlassCard>

      {/* Generate Plan Button */}
      {currentPlan && (
        <div className="mt-4">
          {!hasCurrentWeekPlan && selectedInventoryId && isWeekAvailable(currentWeek) && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => {
                    click();
                    handleGenerateMealPlan();
                  }}
                  disabled={isGenerating}
                  className="btn-glass btn-glass--primary w-full px-6 py-3 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={!isGenerating ? {
                    background: `
                      linear-gradient(135deg, 
                        color-mix(in srgb, #8B5CF6 80%, transparent),
                        color-mix(in srgb, #A855F7 70%, transparent)
                      )
                    `,
                    border: '2px solid color-mix(in srgb, #8B5CF6 60%, transparent)',
                    boxShadow: `
                      0 8px 32px color-mix(in srgb, #8B5CF6 40%, transparent),
                      0 0 40px color-mix(in srgb, #8B5CF6 30%, transparent),
                      inset 0 2px 0 rgba(255, 255, 255, 0.4),
                      inset 0 -2px 0 rgba(0, 0, 0, 0.2)
                    `,
                    backdropFilter: 'blur(20px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                    color: 'white',
                  } : undefined}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isGenerating ? (
                      <SpatialIcon Icon={ICONS.Loader2} size={20} className="animate-spin" style={{ color: 'white' }} />
                    ) : (
                      <SpatialIcon Icon={ICONS.Calendar} size={20} style={{ color: 'white' }} />
                    )}
                    <span>{isGenerating ? 'Génération...' : `Générer Semaine ${currentWeek}`}</span>
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
    </>
  );
};

export default PlanHeaderSection;