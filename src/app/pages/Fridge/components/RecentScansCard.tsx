import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import { useFeedback } from '../../../../hooks/useFeedback';
import { useFridgeScanPipeline } from '../../../../system/store/fridgeScan';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * RecentScansCard - Affiche l'historique des 3 derniers scans de frigo
 * Avec miniatures, métadonnées et animations Framer Motion
 */
const RecentScansCard: React.FC = () => {
  const navigate = useNavigate();
  const { click } = useFeedback();
  const { recentSessions } = useFridgeScanPipeline();

  // Limiter aux 3 dernières sessions
  const displaySessions = recentSessions.slice(0, 3);

  const handleSessionClick = (sessionId: string) => {
    click();
    // Navigate to inventory tab with session selected
    navigate(`/fridge#inventaire`);
  };

  const handleViewAll = () => {
    click();
    navigate('/fridge#inventaire');
  };

  return (
    <GlassCard
      className="p-6"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, color-mix(in srgb, #EC4899 12%, transparent) 0%, transparent 60%),
          radial-gradient(circle at 70% 80%, color-mix(in srgb, #F472B6 10%, transparent) 0%, transparent 50%),
          linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08)),
          rgba(11, 14, 23, 0.80)
        `,
        borderColor: 'color-mix(in srgb, #EC4899 35%, transparent)',
        boxShadow: `
          0 12px 40px rgba(0, 0, 0, 0.25),
          0 0 30px color-mix(in srgb, #EC4899 20%, transparent),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `,
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
                linear-gradient(135deg, color-mix(in srgb, #EC4899 45%, transparent), color-mix(in srgb, #F472B6 35%, transparent))
              `,
              border: '2px solid color-mix(in srgb, #EC4899 60%, transparent)',
              boxShadow: '0 0 20px color-mix(in srgb, #EC4899 40%, transparent)'
            }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 20px color-mix(in srgb, #EC4899 40%, transparent)',
                '0 0 30px color-mix(in srgb, #EC4899 55%, transparent)',
                '0 0 20px color-mix(in srgb, #EC4899 40%, transparent)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SpatialIcon Icon={ICONS.History} size={20} className="text-pink-300" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-white">Scans Récents</h3>
            <p className="text-sm text-white/70">Vos derniers inventaires</p>
          </div>
        </div>

        <button
          onClick={handleViewAll}
          className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
          style={{
            background: 'color-mix(in srgb, #EC4899 15%, transparent)',
            border: '2px solid color-mix(in srgb, #EC4899 30%, transparent)',
            color: '#F472B6'
          }}
          onMouseEnter={(e) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.background = 'color-mix(in srgb, #EC4899 25%, transparent)';
              e.currentTarget.style.borderColor = 'color-mix(in srgb, #EC4899 45%, transparent)';
            }
          }}
          onMouseLeave={(e) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.background = 'color-mix(in srgb, #EC4899 15%, transparent)';
              e.currentTarget.style.borderColor = 'color-mix(in srgb, #EC4899 30%, transparent)';
            }
          }}
        >
          Voir tout
        </button>
      </div>

      {/* Liste des Scans */}
      <div className="space-y-4">
        {displaySessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                background: 'color-mix(in srgb, #EC4899 15%, transparent)',
                border: '2px solid color-mix(in srgb, #EC4899 25%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Package} size={32} className="text-pink-300 opacity-50" />
            </div>
            <p className="text-white/60 text-sm">
              Aucun scan effectué pour le moment
            </p>
            <p className="text-white/50 text-xs mt-2">
              Lancez votre premier scan pour commencer
            </p>
          </motion.div>
        ) : (
          displaySessions.map((session, index) => (
            <motion.button
              key={session.sessionId}
              onClick={() => handleSessionClick(session.sessionId)}
              className="w-full text-left rounded-xl p-4 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                background: 'rgba(236, 72, 153, 0.08)',
                borderColor: 'color-mix(in srgb, #EC4899 30%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #EC4899 20%, transparent)'
              }}
            >
              <div className="flex items-center gap-4">
                {/* Thumbnail ou Icône */}
                <div
                  className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, color-mix(in srgb, #EC4899 35%, transparent), color-mix(in srgb, #F472B6 25%, transparent))
                    `,
                    border: '2px solid color-mix(in srgb, #EC4899 40%, transparent)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  {session.capturedPhotos && session.capturedPhotos.length > 0 ? (
                    <img
                      src={session.capturedPhotos[0]}
                      alt="Scan preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <SpatialIcon Icon={ICONS.Refrigerator} size={32} className="text-pink-300" />
                  )}
                </div>

                {/* Métadonnées */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-base truncate">
                      Scan du {format(new Date(session.createdAt), 'd MMM yyyy', { locale: fr })}
                    </span>
                    {session.stage === 'completed' && (
                      <div
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: 'color-mix(in srgb, #10B981 20%, transparent)',
                          color: '#10B981',
                          border: '1px solid color-mix(in srgb, #10B981 30%, transparent)'
                        }}
                      >
                        Terminé
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1.5">
                      <SpatialIcon Icon={ICONS.Package} size={14} />
                      <span>{session.rawDetectedItems?.length || 0} items</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <SpatialIcon Icon={ICONS.Camera} size={14} />
                      <span>{session.capturedPhotos?.length || 0} photos</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/50 mt-1">
                    {format(new Date(session.createdAt), 'HH:mm', { locale: fr })}
                  </p>
                </div>

                {/* Chevron */}
                <SpatialIcon
                  Icon={ICONS.ChevronRight}
                  size={20}
                  className="text-white/40 flex-shrink-0"
                />
              </div>
            </motion.button>
          ))
        )}
      </div>
    </GlassCard>
  );
};

export default RecentScansCard;
