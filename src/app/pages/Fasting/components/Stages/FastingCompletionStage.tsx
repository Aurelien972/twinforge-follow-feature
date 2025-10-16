import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import GlassCard from '@/ui/cards/GlassCard';
import SpatialIcon from '@/ui/icons/SpatialIcon';
import { ICONS } from '@/ui/icons/registry';
import { formatElapsedTimeHours, determineSessionOutcome, getOutcomeTheme } from '@/app/pages/Fasting/utils/fastingUtils';
import FastingSessionSummaryCard from '@/app/pages/Fasting/components/Cards/FastingSessionSummaryCard';
import FastingAchievementsCard from '@/app/pages/Fasting/components/Cards/FastingAchievementsCard';

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

interface FastingCompletionStageProps {
  session: FastingSession | null;
  targetHours: number;
  onSaveFastingSession: () => void;
}

/**
 * Fasting Completion Stage - Finalisation de la Session de Jeûne
 * Interface de félicitations et sauvegarde après une session complétée
 */
const FastingCompletionStage: React.FC<FastingCompletionStageProps> = ({
  session,
  targetHours,
  onSaveFastingSession
}) => {
  // Déterminer l'outcome de la session
  const sessionOutcome = session?.actualDurationHours ? 
    determineSessionOutcome(session.actualDurationHours, session.targetHours || targetHours) : 
    'missed';
  
  // Obtenir le thème dynamique
  const theme = getOutcomeTheme(sessionOutcome);
  
  // Formater la durée avec précision
  const actualDuration = session?.actualDurationHours ? 
    formatElapsedTimeHours(session.actualDurationHours) : 
    '0h 00m 00s';

  return (
    <div className="space-y-6">
      {/* Composant Principal de Completion */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1],
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
      >
        <GlassCard 
          className="p-8 text-center"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, ${theme.primaryColor} 15%, transparent) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, color-mix(in srgb, ${theme.secondaryColor} 12%, transparent) 0%, transparent 50%),
              var(--glass-opacity)
            `,
            borderColor: `color-mix(in srgb, ${theme.primaryColor} 30%, transparent)`,
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.4),
              0 0 40px color-mix(in srgb, ${theme.primaryColor} 20%, transparent),
              0 0 80px color-mix(in srgb, ${theme.secondaryColor} 15%, transparent),
              inset 0 2px 0 rgba(255, 255, 255, 0.2)
            `,
            backdropFilter: 'blur(28px) saturate(170%)'
          }}
        >
          <div className="space-y-6">
            {/* Icône Dynamique */}
            <div className="flex items-center justify-center w-full">
              <motion.div
                className="w-32 h-32 rounded-full flex items-center justify-center relative"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
                    radial-gradient(circle at 70% 70%, color-mix(in srgb, ${theme.primaryColor} 20%, transparent) 0%, transparent 50%),
                    linear-gradient(135deg, color-mix(in srgb, ${theme.primaryColor} 45%, transparent), color-mix(in srgb, ${theme.secondaryColor} 35%, transparent))
                  `,
                  border: `4px solid color-mix(in srgb, ${theme.primaryColor} 70%, transparent)`,
                  boxShadow: `
                    0 0 60px color-mix(in srgb, ${theme.primaryColor} 70%, transparent),
                    0 0 100px color-mix(in srgb, ${theme.primaryColor} 50%, transparent),
                    0 0 140px color-mix(in srgb, ${theme.secondaryColor} 40%, transparent),
                    inset 0 4px 0 rgba(255,255,255,0.5),
                    inset 0 -3px 0 rgba(0,0,0,0.2)
                  `,
                  backdropFilter: 'blur(20px) saturate(170%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(170%)',
                  margin: '0 auto'
                }}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 150,
                  damping: 12
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <SpatialIcon
                    Icon={ICONS[theme.icon]}
                    size={64}
                    style={{
                      color: theme.primaryColor,
                      filter: `
                        drop-shadow(0 0 16px color-mix(in srgb, ${theme.primaryColor} 90%, transparent))
                        drop-shadow(0 0 32px color-mix(in srgb, ${theme.primaryColor} 70%, transparent))
                        drop-shadow(0 0 48px color-mix(in srgb, ${theme.secondaryColor} 50%, transparent))
                      `
                    }}
                    variant="pure"
                  />
                </motion.div>

                {/* Anneaux de Célébration */}
                {sessionOutcome === 'success' && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: `color-mix(in srgb, ${theme.primaryColor} 50%, transparent)` }}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ 
                        duration: 2, 
                        delay: 1,
                        repeat: Infinity,
                        ease: 'easeOut'
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: `color-mix(in srgb, ${theme.secondaryColor} 40%, transparent)` }}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ 
                        duration: 2.5, 
                        delay: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut'
                      }}
                    />
                  </>
                )}
              </motion.div>
            </div>

            {/* Message Dynamique */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h2 
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {theme.title}
              </motion.h2>
              <motion.p 
                className="text-white/80 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {theme.subtitle}
              </motion.p>
              
              {/* Durée Réelle avec Animation */}
              <motion.div 
                className="text-4xl font-black"
                style={{ color: theme.primaryColor }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
              >
                {actualDuration}
              </motion.div>
              <motion.p 
                className="text-white/70 text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Durée réelle de votre jeûne
              </motion.p>
            </motion.div>

            {/* Bouton de Sauvegarde */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <button
                onClick={onSaveFastingSession}
                className="px-8 py-4 text-xl font-bold rounded-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, 
                    color-mix(in srgb, #3B82F6 80%, transparent), 
                    color-mix(in srgb, #06B6D4 60%, transparent)
                  )`,
                  border: '3px solid color-mix(in srgb, #3B82F6 60%, transparent)',
                  boxShadow: `
                    0 16px 50px color-mix(in srgb, #3B82F6 50%, transparent),
                    0 0 80px color-mix(in srgb, #3B82F6 40%, transparent),
                    inset 0 4px 0 rgba(255,255,255,0.5)
                  `,
                  backdropFilter: 'blur(24px) saturate(170%)',
                  color: '#fff',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="flex items-center gap-3">
                  <SpatialIcon Icon={ICONS.Save} size={28} className="text-white" />
                  <span>Sauvegarder</span>
                </div>
              </button>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Résumé de Session - Composant Extrait */}
      <FastingSessionSummaryCard 
        session={session}
        sessionOutcome={sessionOutcome}
      />

      {/* Accomplissements et Conseils */}
      <FastingAchievementsCard 
        session={session}
        sessionOutcome={sessionOutcome}
      />
    </div>
  );
};

export default FastingCompletionStage;