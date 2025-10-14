/**
 * HealthScoreWidget Component
 * Displays global health profile score with breakdown
 */

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { calculateHealthScore, getScoreColor, getScoreLabel, getAIReadinessLabel } from '../utils/healthScoreCalculations';
import type { HealthProfileV2 } from '../../../../domain/health';

interface HealthScoreWidgetProps {
  health: HealthProfileV2 | null | undefined;
  onClick?: () => void;
}

export const HealthScoreWidget: React.FC<HealthScoreWidgetProps> = ({ health, onClick }) => {
  const score = calculateHealthScore(health);
  const scoreColor = getScoreColor(score.total);
  const scoreLabel = getScoreLabel(score.total);
  const aiReadinessLabel = getAIReadinessLabel(score.aiReadiness);

  return (
    <GlassCard
      className="p-6 cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={onClick}
      style={{
        background: `
          radial-gradient(circle at 30% 20%, ${scoreColor}15 0%, transparent 60%),
          var(--glass-opacity)
        `,
        borderColor: `${scoreColor}40`,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, ${scoreColor}40, ${scoreColor}20)
              `,
              border: `2px solid ${scoreColor}60`,
              boxShadow: `0 0 20px ${scoreColor}30`,
            }}
          >
            <SpatialIcon Icon={ICONS.Heart} size={24} style={{ color: scoreColor }} variant="pure" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-xl">Score de Santé Global</h3>
            <p className="text-white/60 text-sm mt-0.5">Complétude du profil médical</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold text-4xl" style={{ color: scoreColor }}>
              {score.total}
            </span>
            <span className="text-white/60 text-lg">/ {score.maxScore}</span>
          </div>
          <p className="text-sm font-medium mt-1" style={{ color: scoreColor }}>
            {scoreLabel}
          </p>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
          <motion.div
            className="h-4 rounded-full relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}CC)`,
              boxShadow: `0 0 12px ${scoreColor}60, inset 0 1px 0 rgba(255,255,255,0.3)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${score.total}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg,
                  transparent 0%,
                  rgba(255,255,255,0.4) 50%,
                  transparent 100%
                )`,
                animation: 'progressShimmer 2s ease-in-out infinite',
              }}
            />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ScoreItem label="Base" value={score.basic} max={15} />
        <ScoreItem label="Médical" value={score.medicalHistory} max={20} />
        <ScoreItem label="Famille" value={score.familyHistory} max={15} />
        <ScoreItem label="Constantes" value={score.vitalSigns} max={20} />
        <ScoreItem label="Style de vie" value={score.lifestyle} max={15} />
        <ScoreItem label="Vaccins" value={score.vaccinations} max={5} />
      </div>

      <div
        className="p-4 rounded-xl flex items-center gap-3"
        style={{
          background: score.aiReadiness >= 80
            ? 'rgba(16, 185, 129, 0.1)'
            : score.aiReadiness >= 60
            ? 'rgba(245, 158, 11, 0.1)'
            : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${score.aiReadiness >= 80
            ? 'rgba(16, 185, 129, 0.3)'
            : score.aiReadiness >= 60
            ? 'rgba(245, 158, 11, 0.3)'
            : 'rgba(239, 68, 68, 0.3)'}`,
        }}
      >
        <SpatialIcon
          Icon={ICONS.Sparkles}
          size={20}
          className={score.aiReadiness >= 80 ? 'text-green-400' : score.aiReadiness >= 60 ? 'text-orange-400' : 'text-red-400'}
        />
        <div className="flex-1">
          <p className="text-white/90 font-medium text-sm">Préparation IA: {score.aiReadiness}%</p>
          <p
            className="text-xs mt-1"
            style={{
              color: score.aiReadiness >= 80
                ? '#10B981'
                : score.aiReadiness >= 60
                ? '#F59E0B'
                : '#EF4444',
            }}
          >
            {aiReadinessLabel}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

const ScoreItem: React.FC<{ label: string; value: number; max: number }> = ({ label, value, max }) => {
  const percentage = (value / max) * 100;
  const color = getScoreColor(percentage);

  return (
    <div className="p-3 rounded-lg bg-white/5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/70 text-xs">{label}</span>
        <span className="text-white font-semibold text-sm">{Math.round(value)}/{max}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
};
