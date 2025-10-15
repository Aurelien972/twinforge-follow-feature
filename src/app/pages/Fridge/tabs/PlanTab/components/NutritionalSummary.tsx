/**
 * Nutritional Summary Component
 * Component for displaying nutritional summary of the meal plan
 */

import React from 'react';
import GlassCard from '../../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../../ui/icons/registry';
import type { MealPlanData } from '../types';

interface NutritionalSummaryProps {
  nutritionalSummary: MealPlanData['nutritionalSummary'];
  estimatedWeeklyCost?: number;
}

/**
 * Nutritional Summary Component - Résumé Nutritionnel
 */
const NutritionalSummary: React.FC<NutritionalSummaryProps> = ({ 
  nutritionalSummary, 
  estimatedWeeklyCost 
}) => {
  if (!nutritionalSummary) return null;

  return (
    <GlassCard className="p-6" style={{
      background: `
        radial-gradient(circle at 30% 20%, color-mix(in srgb, #10B981 8%, transparent) 0%, transparent 60%),
        var(--glass-opacity)
      `,
      borderColor: 'color-mix(in srgb, #10B981 20%, transparent)'
    }}>
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'color-mix(in srgb, #10B981 15%, transparent)',
            border: '2px solid color-mix(in srgb, #10B981 25%, transparent)'
          }}
        >
          <SpatialIcon Icon={ICONS.BarChart3} size={16} style={{ color: '#10B981' }} />
        </div>
        <div>
          <h4 className="text-green-300 font-semibold text-lg">Résumé Nutritionnel</h4>
          <p className="text-green-200 text-sm">Moyennes quotidiennes calculées</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Calories */}
        <div className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-400/20">
          <div className="text-2xl font-bold text-orange-400 mb-1">
            {nutritionalSummary.avgCaloriesPerDay}
          </div>
          <div className="text-orange-300 text-sm font-medium">kcal/jour</div>
        </div>

        {/* Protéines */}
        <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-400/20">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {nutritionalSummary.avgProteinPerDay}g
          </div>
          <div className="text-red-300 text-sm font-medium">Protéines</div>
        </div>

        {/* Glucides */}
        <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-400/20">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {nutritionalSummary.avgCarbsPerDay}g
          </div>
          <div className="text-blue-300 text-sm font-medium">Glucides</div>
        </div>

        {/* Lipides */}
        <div className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-400/20">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {nutritionalSummary.avgFatPerDay}g
          </div>
          <div className="text-purple-300 text-sm font-medium">Lipides</div>
        </div>
      </div>

      {/* Coût Estimé */}
      {estimatedWeeklyCost && (
        <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-400/20 text-center">
          <div className="text-xl font-bold text-green-400 mb-1">
            {estimatedWeeklyCost.toFixed(2)}€
          </div>
          <div className="text-green-300 text-sm">Coût estimé par semaine</div>
        </div>
      )}
    </GlassCard>
  );
};

export default NutritionalSummary;