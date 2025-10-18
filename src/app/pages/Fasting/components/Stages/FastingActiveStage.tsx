import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import { useExitModalStore } from '@/system/store/exitModalStore';
import { usePerformanceMode } from '@/system/context/PerformanceModeContext';
import { useFastingTimerTick } from '../../hooks/useFastingPipeline';

interface FastingSession {
  id?: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  targetHours: number;
  actualDurationHours?: number;
  protocol: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
}

interface FastingActiveStageProps {
  session: FastingSession | null;
  elapsedSeconds: number;
  progressPercentage: number;
  targetHours: number;
  onStopFasting: () => void;
  formatElapsedTime: (seconds: number) => string;
}

/**
 * Fasting Active Stage - Contrôles de Session Active (Pipeline)
 * Interface de contrôle simplifiée pour gérer une session de jeûne en cours
 *
 * RÔLE: Contrôles d'action uniquement (arrêter le jeûne)
 * Pour la visualisation détaillée, voir l'onglet Tracker
 */
const FastingActiveStage: React.FC<FastingActiveStageProps> = ({
  session,
  elapsedSeconds,
  progressPercentage,
  targetHours,
  onStopFasting,
  formatElapsedTime
}) => {
  // Enable real-time timer updates
  useFastingTimerTick();

  const { showModal: showExitModal } = useExitModalStore();
  const { isPerformanceMode } = usePerformanceMode();

  // Conditional motion components
  const MotionDiv = isPerformanceMode ? 'div' : motion.div;

  const handleStopFasting = () => {
    const elapsedHours = Math.floor(elapsedSeconds / 3600);
    const elapsedMinutes = Math.floor((elapsedSeconds % 3600) / 60);
    const elapsedTimeDisplay = `${elapsedHours}h ${elapsedMinutes.toString().padStart(2, '0')}m`;

    showExitModal({
      title: "Terminer votre jeûne ?",
      message: `Vous avez jeûné pendant ${elapsedTimeDisplay}. Voulez-vous vraiment terminer votre session maintenant ?`,
      processName: "Fin de Jeûne",
      onConfirm: () => {
        onStopFasting();
      },
      onCancel: () => {
        // Modal will close automatically
      }
    });
  };

  return (
    <GlassCard
      className="p-6 md:p-8"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, #EF4444 15%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, #F59E0B 12%, transparent) 0%, transparent 50%),
          var(--glass-opacity)
        `,
        borderColor: 'color-mix(in srgb, #EF4444 30%, transparent)',
        boxShadow: isPerformanceMode
          ? `0 20px 60px rgba(0, 0, 0, 0.4)`
          : `
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 40px color-mix(in srgb, #EF4444 20%, transparent),
            0 0 80px color-mix(in srgb, #F59E0B 15%, transparent),
            inset 0 2px 0 rgba(255, 255, 255, 0.2)
          `,
        backdropFilter: isPerformanceMode ? 'none' : 'blur(28px) saturate(170%)'
      }}
    >
      <div className="space-y-6">
        {/* Header avec indicateur de session active */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${!isPerformanceMode ? 'breathing-icon' : ''}`}
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, #EF4444 40%, transparent), color-mix(in srgb, #F59E0B 30%, transparent))`,
                border: `2px solid color-mix(in srgb, #EF4444 60%, transparent)`,
                boxShadow: isPerformanceMode ? 'none' : `0 0 25px color-mix(in srgb, #EF4444 50%, transparent)`
              }}
            >
              <SpatialIcon
                Icon={ICONS.Timer}
                size={24}
                style={{ color: '#EF4444' }}
                variant="pure"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Session Active</h3>
              <p className="text-white/80 text-sm mt-0.5">
                Contrôles de la session en cours
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${!isPerformanceMode ? 'animate-pulse' : ''}`}
              style={{
                background: '#EF4444',
                boxShadow: isPerformanceMode ? 'none' : '0 0 8px #EF444460'
              }}
            />
            <span className="text-red-300 text-sm font-medium">En cours</span>
          </div>
        </div>

        {/* Temps Écoulé et Progression - Version simplifiée */}
        <div className="text-center space-y-3">
          <div className="text-5xl md:text-6xl font-black text-red-400">
            {formatElapsedTime(elapsedSeconds)}
          </div>
          <p className="text-white/70 text-base">
            Objectif : {session?.targetHours}h • {progressPercentage?.toFixed(1) || '0.0'}% accompli
          </p>

          {/* Barre de Progression */}
          <div className="max-w-md mx-auto">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <MotionDiv
                className="h-3 rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, #EF4444, #F59E0B)`,
                  boxShadow: isPerformanceMode ? 'none' : `0 0 12px color-mix(in srgb, #EF4444 60%, transparent)`,
                  width: `${progressPercentage || 0}%`
                }}
                {...(!isPerformanceMode && {
                  initial: { width: 0 },
                  animate: { width: `${progressPercentage || 0}%` },
                  transition: { duration: 0.8, ease: "easeOut" }
                })}
              >
                {!isPerformanceMode && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg,
                        transparent 0%,
                        rgba(255,255,255,0.4) 50%,
                        transparent 100%
                      )`,
                      animation: 'progressShimmer 2s ease-in-out infinite'
                    }}
                  />
                )}
              </MotionDiv>
            </div>
          </div>
        </div>

        {/* Message d'information */}
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: 'color-mix(in srgb, #06B6D4 8%, transparent)',
            border: '1px solid color-mix(in srgb, #06B6D4 20%, transparent)'
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <SpatialIcon Icon={ICONS.Info} size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">
              Suivi Détaillé
            </span>
          </div>
          <p className="text-white/75 text-sm leading-relaxed">
            Pour voir les métriques détaillées de votre session (phases métaboliques, calories, bénéfices),
            consultez l'onglet <strong className="text-white">Tracker</strong>.
          </p>
        </div>

        {/* Bouton d'Arrêt Principal */}
        <div className="flex justify-center">
          <button
            onClick={handleStopFasting}
            className="px-8 py-4 text-xl font-bold rounded-full relative overflow-hidden w-full md:w-auto"
            style={{
              background: `linear-gradient(135deg,
                color-mix(in srgb, #EF4444 80%, transparent),
                color-mix(in srgb, #F59E0B 60%, transparent)
              )`,
              border: '3px solid color-mix(in srgb, #EF4444 60%, transparent)',
              boxShadow: isPerformanceMode
                ? `0 16px 50px color-mix(in srgb, #EF4444 50%, transparent)`
                : `
                  0 16px 50px color-mix(in srgb, #EF4444 50%, transparent),
                  0 0 80px color-mix(in srgb, #EF4444 40%, transparent),
                  inset 0 4px 0 rgba(255,255,255,0.5)
                `,
              backdropFilter: isPerformanceMode ? 'none' : 'blur(24px) saturate(170%)',
              color: '#fff',
              transition: 'all 0.2s ease'
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <SpatialIcon Icon={ICONS.Square} size={24} className="text-white" />
              <span>Terminer le Jeûne</span>
            </div>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default FastingActiveStage;
