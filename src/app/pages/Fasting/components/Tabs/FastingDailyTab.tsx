import React from 'react';
import { motion } from 'framer-motion';
import { useFastingPipeline } from '../../hooks/useFastingPipeline';
import { useUserStore } from '@/system/store/userStore';
import { usePerformanceMode } from '@/system/context/PerformanceModeContext';
import ProfileCompletenessAlert from '@/ui/components/profile/ProfileCompletenessAlert';
import DynamicFastingCTA from '../Cards/DynamicFastingCTA';
import FastingDailySummaryCard from '../Cards/FastingDailySummaryCard';
import FastingTipsCard from '../Cards/FastingTipsCard';

interface FastingDailyTabProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

/**
 * Fasting Daily Tab - Onglet Tracker de la Forge du Temps
 * Affiche le statut actuel du jeûne avec toutes les métriques détaillées
 *
 * RÔLE: Vue d'information complète pour le suivi du jeûne (lecture seule)
 * Pour les actions (démarrer/arrêter), l'utilisateur est redirigé vers /fasting/input
 */
const FastingDailyTab: React.FC<FastingDailyTabProps> = ({ onLoadingChange }) => {
  const { profile } = useUserStore();
  const { isActive, session: fastingSession } = useFastingPipeline();
  const { isPerformanceMode } = usePerformanceMode();

  // Conditional motion component
  const MotionDiv = isPerformanceMode ? 'div' : motion.div;

  return (
    <MotionDiv
      {...(!isPerformanceMode && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' }
      })}
      className="space-y-6"
    >
      {/* Alerte de profil incomplet pour le jeûne */}
      <ProfileCompletenessAlert
        profile={profile}
        forgeContext="fasting"
      />

      {/*
        CTA Dynamique Enrichi pour le Jeûne
        Affiche toutes les informations de la session active:
        - Timer en temps réel
        - Progression globale
        - 4 métriques principales (Phase, Calories, État métabolique, Protocole)
        - Message motivationnel
        - Bénéfices actuels de la phase

        Si aucune session active: affiche un CTA pour démarrer un jeûne
      */}
      <DynamicFastingCTA />

      {/*
        Résumé Quotidien - Affiché uniquement si aucune session active
        Affiche les statistiques des sessions complétées aujourd'hui
      */}
      {!isActive && <FastingDailySummaryCard />}

      {/* Conseils de Jeûne */}
      <FastingTipsCard />
    </MotionDiv>
  );
};

export default FastingDailyTab;