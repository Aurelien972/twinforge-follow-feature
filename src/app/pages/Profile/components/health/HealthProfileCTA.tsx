/**
 * HealthProfileCTA Component
 * Call-to-action card to redirect users to the comprehensive health profile
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';

export const HealthProfileCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/health-profile');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard
        className="p-6 cursor-pointer hover:scale-[1.01] transition-transform"
        onClick={handleNavigate}
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 60%),
            var(--glass-opacity)
          `,
          borderColor: 'rgba(6, 182, 212, 0.4)',
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(6, 182, 212, 0.3))
                  `,
                  border: '2px solid rgba(6, 182, 212, 0.6)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
                }}
              >
                <SpatialIcon Icon={ICONS.Sparkles} size={24} style={{ color: '#06B6D4' }} variant="pure" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">
                  Débloquez votre Profil de Santé Complet
                </h3>
                <p className="text-cyan-300 text-sm font-medium mt-1">
                  Médecine préventive par Intelligence Artificielle
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <p className="text-white/90 leading-relaxed">
                Accédez à un profil médical complet avec analyses préventives personnalisées par IA.
                Complétez vos informations de santé pour bénéficier de recommandations adaptées.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <SpatialIcon Icon={ICONS.CheckCircle} size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">Analyses préventives par IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <SpatialIcon Icon={ICONS.CheckCircle} size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">Suivi des constantes vitales</span>
                </div>
                <div className="flex items-start gap-2">
                  <SpatialIcon Icon={ICONS.CheckCircle} size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">Historique médical complet</span>
                </div>
                <div className="flex items-start gap-2">
                  <SpatialIcon Icon={ICONS.CheckCircle} size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">Risques sanitaires locaux</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-cyan-300 text-sm">
              <SpatialIcon Icon={ICONS.Lock} size={14} />
              <span>100% confidentiel • Conforme RGPD • Données chiffrées</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleNavigate}
              className="btn-glass--primary px-6 py-3 text-base font-semibold"
              style={{
                background: 'rgba(6, 182, 212, 0.2)',
                borderColor: 'rgba(6, 182, 212, 0.5)',
              }}
            >
              <div className="flex items-center gap-2">
                <span>Accéder au Profil</span>
                <SpatialIcon Icon={ICONS.ArrowRight} size={18} />
              </div>
            </button>

            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">5 min</div>
              <div className="text-xs text-white/60">Pour commencer</div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
