/**
 * MedicalFollowUpSection Component
 * Tracks medical checkups and follow-ups
 */

import React from 'react';
import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';

interface MedicalFollowUpSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  lastCheckupDate?: string;
  nextCheckupDue?: string;
}

export const MedicalFollowUpSection: React.FC<MedicalFollowUpSectionProps> = ({
  register,
  errors,
  lastCheckupDate,
  nextCheckupDue,
}) => {
  const isOverdue = React.useMemo(() => {
    if (!nextCheckupDue) return false;
    return new Date(nextCheckupDue) < new Date();
  }, [nextCheckupDue]);

  const daysUntilCheckup = React.useMemo(() => {
    if (!nextCheckupDue) return null;
    const diff = new Date(nextCheckupDue).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [nextCheckupDue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard
        className="p-6"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(168, 85, 247, 0.2)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0.2))
              `,
              border: '2px solid rgba(168, 85, 247, 0.5)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
            }}
          >
            <SpatialIcon Icon={ICONS.Calendar} size={24} style={{ color: '#A855F7' }} variant="pure" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-xl">Suivi Médical</h3>
            <p className="text-white/60 text-sm mt-1">Planification de vos bilans de santé</p>
          </div>
          {isOverdue && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-red-300 text-sm font-medium">En retard</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Last Checkup Date */}
          <div>
            <label htmlFor="last_checkup_date" className="block text-white/90 text-sm font-medium mb-3">
              Dernier bilan médical
            </label>
            <div className="relative">
              <input
                {...register('last_checkup_date')}
                type="date"
                id="last_checkup_date"
                className="glass-input"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SpatialIcon Icon={ICONS.Calendar} size={16} className="text-white/40" />
              </div>
            </div>
            {errors.last_checkup_date && (
              <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
                <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                {errors.last_checkup_date.message}
              </p>
            )}
            {lastCheckupDate && (
              <p className="text-white/50 text-xs mt-2">
                Il y a {Math.floor((new Date().getTime() - new Date(lastCheckupDate).getTime()) / (1000 * 60 * 60 * 24))} jours
              </p>
            )}
          </div>

          {/* Next Checkup Due */}
          <div>
            <label htmlFor="next_checkup_due" className="block text-white/90 text-sm font-medium mb-3">
              Prochain bilan recommandé
            </label>
            <div className="relative">
              <input
                {...register('next_checkup_due')}
                type="date"
                id="next_checkup_due"
                className="glass-input"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SpatialIcon Icon={ICONS.Calendar} size={16} className="text-white/40" />
              </div>
            </div>
            {errors.next_checkup_due && (
              <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
                <SpatialIcon Icon={ICONS.AlertCircle} size={12} />
                {errors.next_checkup_due.message}
              </p>
            )}
            {daysUntilCheckup !== null && (
              <p className={`text-xs mt-2 ${isOverdue ? 'text-red-300' : daysUntilCheckup <= 30 ? 'text-yellow-300' : 'text-white/50'}`}>
                {isOverdue
                  ? `En retard de ${Math.abs(daysUntilCheckup)} jours`
                  : daysUntilCheckup === 0
                  ? 'Aujourd\'hui'
                  : daysUntilCheckup === 1
                  ? 'Demain'
                  : `Dans ${daysUntilCheckup} jours`}
              </p>
            )}
          </div>
        </div>

        {/* Checkup Status Card */}
        {nextCheckupDue && (
          <div className={`mt-6 p-4 rounded-xl border ${
            isOverdue
              ? 'bg-red-500/10 border-red-400/20'
              : daysUntilCheckup && daysUntilCheckup <= 30
              ? 'bg-yellow-500/10 border-yellow-400/20'
              : 'bg-green-500/10 border-green-400/20'
          }`}>
            <div className="flex items-start gap-3">
              <SpatialIcon
                Icon={isOverdue ? ICONS.AlertTriangle : daysUntilCheckup && daysUntilCheckup <= 30 ? ICONS.Clock : ICONS.CheckCircle}
                size={20}
                className={`mt-0.5 ${
                  isOverdue ? 'text-red-400' : daysUntilCheckup && daysUntilCheckup <= 30 ? 'text-yellow-400' : 'text-green-400'
                }`}
              />
              <div className="flex-1">
                <p className={`font-medium text-sm mb-1 ${
                  isOverdue ? 'text-red-300' : daysUntilCheckup && daysUntilCheckup <= 30 ? 'text-yellow-300' : 'text-green-300'
                }`}>
                  {isOverdue
                    ? 'Votre bilan est en retard'
                    : daysUntilCheckup && daysUntilCheckup <= 30
                    ? 'Bilan bientôt recommandé'
                    : 'Bilan planifié'}
                </p>
                <p className="text-white/70 text-xs">
                  {isOverdue
                    ? 'Prenez rendez-vous avec votre médecin dès que possible pour votre bilan annuel.'
                    : daysUntilCheckup && daysUntilCheckup <= 30
                    ? 'Pensez à prendre rendez-vous avec votre médecin pour votre prochain bilan.'
                    : 'Votre prochain bilan de santé est planifié. Un rappel vous sera envoyé.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-6 p-3 rounded-lg bg-blue-500/10 border border-blue-400/20">
          <div className="flex items-start gap-2">
            <SpatialIcon Icon={ICONS.Info} size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/70 text-xs leading-relaxed">
              Un bilan de santé annuel est recommandé pour surveiller votre état général et détecter précocement d'éventuels problèmes de santé.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
