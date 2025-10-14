import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useFastingPipeline, useFastingElapsedSeconds, useFastingProgressPercentage } from '../../hooks/useFastingPipeline';
import { useUserStore } from '@/system/store/userStore';
import { useToast } from '@/ui/components/ToastProvider';
import { useFeedback } from '@/hooks/useFeedback';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import DynamicFastingCTA from '../Cards/DynamicFastingCTA';
import FastingCurrentSessionCard from '../Cards/FastingCurrentSessionCard';
import FastingDailySummaryCard from '../Cards/FastingDailySummaryCard';
import FastingTipsCard from '../Cards/FastingTipsCard';

/**
 * Fasting Daily Tab - Onglet Aujourd'hui de la Forge du Temps
 * Affiche le statut actuel du jeûne et les sessions de la journée
 */
interface FastingDailyTabProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

const FastingDailyTab: React.FC<FastingDailyTabProps> = ({ onLoadingChange }) => {
  const { profile, session } = useUserStore();
  const { isActive, session: fastingSession } = useFastingPipeline();

  return (
    <div className="space-y-6">
      {/* CTA Dynamique pour le Jeûne */}
      <DynamicFastingCTA />

      {/* Session Active ou Résumé Quotidien */}
      {isActive && fastingSession ? (
        <FastingCurrentSessionCard
          session={fastingSession}
          userWeight={profile?.weight_kg}
        />
      ) : (
        <FastingDailySummaryCard />
      )}

      {/* Conseils de Jeûne */}
      <FastingTipsCard />
    </div>
  );
};

export default FastingDailyTab;