import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import { useExitModalStore } from '@/system/store/exitModalStore';
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
 * Fasting Active Stage - Session de Jeûne Active
 * Interface de suivi en temps réel d'une session de jeûne
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
      className="p-8 text-center"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, #EF4444 15%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, #F59E0B 12%, transparent) 0%, transparent 50%),
          var(--glass-opacity)
        `,
        borderColor: 'color-mix(in srgb, #EF4444 30%, transparent)',
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 0 40px color-mix(in srgb, #EF4444 20%, transparent),
          0 0 80px color-mix(in srgb, #F59E0B 15%, transparent),
          inset 0 2px 0 rgba(255, 255, 255, 0.2)
        `,
        backdropFilter: 'blur(28px) saturate(170%)'
      }}
    >
      <div className="space-y-6">
        {/* Icône Centrale Active */}
        <div className="flex items-center justify-center w-full">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center relative breathing-icon"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
                radial-gradient(circle at 70% 70%, color-mix(in srgb, #EF4444 20%, transparent) 0%, transparent 50%),
                linear-gradient(135deg, color-mix(in srgb, #EF4444 45%, transparent), color-mix(in srgb, #F59E0B 35%, transparent))
              `,
              border: `4px solid color-mix(in srgb, #EF4444 70%, transparent)`,
              boxShadow: `
                0 0 60px color-mix(in srgb, #EF4444 70%, transparent),
                0 0 100px color-mix(in srgb, #EF4444 50%, transparent),
                0 0 140px color-mix(in srgb, #F59E0B 40%, transparent),
                inset 0 4px 0 rgba(255,255,255,0.5),
                inset 0 -3px 0 rgba(0,0,0,0.2)
              `,
              backdropFilter: 'blur(20px) saturate(170%)',
              WebkitBackdropFilter: 'blur(20px) saturate(170%)',
              margin: '0 auto'
            }}
          >
            <SpatialIcon
              Icon={ICONS.Timer}
              size={64}
              style={{
                color: '#EF4444',
                filter: `
                  drop-shadow(0 0 16px color-mix(in srgb, #EF4444 90%, transparent))
                  drop-shadow(0 0 32px color-mix(in srgb, #EF4444 70%, transparent))
                  drop-shadow(0 0 48px color-mix(in srgb, #F59E0B 50%, transparent))
                `
              }}
              variant="pure"
            />

            {/* Anneaux de Pulsation pour Session Active */}
            <div
              className="absolute inset-0 rounded-full border-2 animate-ping"
              style={{
                borderColor: 'color-mix(in srgb, #EF4444 50%, transparent)',
                animationDuration: '2s'
              }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 animate-ping"
              style={{
                borderColor: 'color-mix(in srgb, #F59E0B 40%, transparent)',
                animationDuration: '2.5s',
                animationDelay: '0.5s'
              }}
            />
          </div>
        </div>

        {/* Temps Écoulé */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white">Session Active</h2>
          <div className="text-6xl font-black text-red-400">
            {formatElapsedTime(elapsedSeconds)}
          </div>
          <p className="text-white/80 text-lg">
            Objectif : {session?.targetHours}h • Progression : {progressPercentage?.toFixed(2) || '0.00'}%
          </p>
          
          {/* Barre de Progression */}
          <div className="max-w-md mx-auto">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-3 rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, #EF4444, #F59E0B)`,
                  boxShadow: `0 0 12px color-mix(in srgb, #EF4444 60%, transparent)`,
                  width: `${progressPercentage || 0}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage || 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
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
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bouton d'Arrêt */}
        <div className="flex justify-center">
          <button
            onClick={handleStopFasting}
            className="px-8 py-4 text-xl font-bold rounded-full relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, 
                color-mix(in srgb, #EF4444 80%, transparent), 
                color-mix(in srgb, #F59E0B 60%, transparent)
              )`,
              border: '3px solid color-mix(in srgb, #EF4444 60%, transparent)',
              boxShadow: `
                0 16px 50px color-mix(in srgb, #EF4444 50%, transparent),
                0 0 80px color-mix(in srgb, #EF4444 40%, transparent),
                inset 0 4px 0 rgba(255,255,255,0.5)
              `,
              backdropFilter: 'blur(24px) saturate(170%)',
              color: '#fff',
              transition: 'all 0.2s ease'
            }}
          >
            <div className="flex items-center gap-3">
              <SpatialIcon Icon={ICONS.Square} size={28} className="text-white" />
              <span>Terminer le Jeûne</span>
            </div>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default FastingActiveStage;