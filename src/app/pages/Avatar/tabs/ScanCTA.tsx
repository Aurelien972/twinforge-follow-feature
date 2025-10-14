import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../../system/supabase/client';
import { useUserStore } from '../../../../system/store/userStore';
import { useFeedback } from '../../../../hooks/useFeedback';
import GlassCard from '../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import logger from '../../../../lib/utils/logger';

/**
 * Calculate days since last scan
 */
function calculateDaysSinceLastScan(lastScanDate: string | null): number {
  if (!lastScanDate) return Infinity;
  
  const now = new Date();
  const scanDate = new Date(lastScanDate);
  const diffTime = Math.abs(now.getTime() - scanDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Get scan status based on days since last scan
 */
function getScanStatus(daysSince: number): {
  status: 'up_to_date' | 'due_soon' | 'overdue' | 'never_scanned';
  urgency: 'low' | 'medium' | 'high';
  color: string;
  message: string;
  subtitle: string;
} {
  if (daysSince === Infinity) {
    return {
      status: 'never_scanned',
      urgency: 'high',
      color: '#06B6D4', // Cyan pour premier scan
      message: 'Créez votre premier avatar',
      subtitle: 'Commencez votre parcours de transformation corporelle'
    };
  }

  if (daysSince <= 7) {
    return {
      status: 'up_to_date',
      urgency: 'low',
      color: '#06B6D4', // Cyan pour statut à jour
      message: 'Vous êtes à jour !',
      subtitle: `Dernier scan il y a ${daysSince} jour${daysSince > 1 ? 's' : ''}`
    };
  }
  
  if (daysSince <= 10) {
    return {
      status: 'due_soon',
      urgency: 'medium',
      color: '#F59E0B',
      message: 'Scan recommandé bientôt',
      subtitle: `Dernier scan il y a ${daysSince} jours`
    };
  }
  
  return {
    status: 'overdue',
    urgency: 'high',
    color: '#EF4444',
    message: 'Nouveau scan recommandé',
    subtitle: `Dernier scan il y a ${daysSince} jours`
  };
}

/**
 * Fetch latest body scan for user
 */
async function fetchLatestBodyScan(userId: string) {
  const { data, error } = await supabase
    .from('body_scans')
    .select('id, created_at, timestamp')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);
    
  if (error) {
    logger.error('SCAN_CTA', 'Failed to fetch latest body scan', {
      error: error.message,
      userId,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
  
  return data && data.length > 0 ? data[0] : null;
}

/**
 * Scan CTA Tab - Call to Action pour encourager les scans réguliers
 * Onglet dédié pour inciter l'utilisateur à scanner son corps tous les 7 jours
 */
const ScanCTA: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const { click, success } = useFeedback();

  // Fetch latest body scan
  const { data: latestScan, isLoading, error } = useQuery({
    queryKey: ['body-scans', 'latest', profile?.userId],
    queryFn: () => fetchLatestBodyScan(profile?.userId!),
    enabled: !!profile?.userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const daysSinceLastScan = calculateDaysSinceLastScan(latestScan?.created_at || null);
  const scanStatus = getScanStatus(daysSinceLastScan);

  const handleStartNewScan = () => {
    click();
    success();
    
    logger.info('SCAN_CTA', 'User initiated new scan from CTA', {
      userId: profile?.userId,
      daysSinceLastScan,
      scanStatus: scanStatus.status,
      timestamp: new Date().toISOString()
    });
    
    navigate('/body-scan');
  };

  const handleViewInsights = () => {
    click();
    
    logger.info('SCAN_CTA', 'User navigated to insights from CTA', {
      userId: profile?.userId,
      daysSinceLastScan,
      scanStatus: scanStatus.status,
      timestamp: new Date().toISOString()
    });
    
    navigate('/avatar#avatar');
  };

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <GlassCard 
          className="text-center p-8"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-body-scan-primary) 8%, transparent) 0%, transparent 60%),
              var(--glass-opacity-base)
            `,
            borderColor: 'color-mix(in srgb, var(--color-body-scan-primary) 25%, transparent)',
            boxShadow: `
              var(--glass-shadow-sm),
              0 0 16px color-mix(in srgb, var(--color-body-scan-primary) 10%, transparent)
            `
          }}
        >
          <SpatialIcon Icon={ICONS.Loader2} size={48} className="bodyscan-text-accent loader-essential mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">Vérification de votre historique...</h3>
          <p className="text-white/70 text-sm">Analyse de vos scans précédents.</p>
        </GlassCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 w-full">
        <GlassCard 
          className="text-center p-8"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-body-scan-error) 8%, transparent) 0%, transparent 60%),
              var(--glass-opacity-base)
            `,
            borderColor: 'color-mix(in srgb, var(--color-body-scan-error) 25%, transparent)',
            boxShadow: `
              var(--glass-shadow-sm),
              0 0 16px color-mix(in srgb, var(--color-body-scan-error) 10%, transparent)
            `
          }}
        >
          <SpatialIcon Icon={ICONS.AlertCircle} size={48} className="bodyscan-text-error mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">Erreur de chargement</h3>
          <p className="bodyscan-text-error text-sm mb-6">{(error as any)?.message}</p>
          <button onClick={() => window.location.reload()} className="btn-glass--primary">
            Réessayer
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Main CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard
          className="p-8 text-center relative overflow-visible"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, ${scanStatus.color} 12%, transparent) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, color-mix(in srgb, ${scanStatus.color} 8%, transparent) 0%, transparent 50%),
              var(--glass-opacity-base)
            `,
            borderColor: `color-mix(in srgb, ${scanStatus.color} 30%, transparent)`,
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.25),
              0 0 30px color-mix(in srgb, ${scanStatus.color} 20%, transparent),
              inset 0 2px 0 rgba(255, 255, 255, 0.15)
            `
          }}
        >
          {/* 4 Carrés décoratifs aux coins - inspire du HeroTrainingCTA */}
          <div className="training-hero-corners" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="corner-particle"
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: `linear-gradient(135deg, ${scanStatus.color}, rgba(255, 255, 255, 0.8))`,
                  boxShadow: `0 0 20px ${scanStatus.color}`,
                  top: i < 2 ? '12px' : 'auto',
                  bottom: i >= 2 ? '12px' : 'auto',
                  left: i % 2 === 0 ? '12px' : 'auto',
                  right: i % 2 === 1 ? '12px' : 'auto'
                }}
                initial={{
                  rotate: i % 2 === 0 ? 45 : -45
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                  rotate: i % 2 === 0 ? [45, 60, 45] : [-45, -60, -45]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
            ))}
          </div>
          {/* Status Icon */}
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, color-mix(in srgb, ${scanStatus.color} 35%, transparent), color-mix(in srgb, ${scanStatus.color} 25%, transparent))
              `,
              border: `2px solid color-mix(in srgb, ${scanStatus.color} 50%, transparent)`,
              boxShadow: `0 0 40px color-mix(in srgb, ${scanStatus.color} 40%, transparent)`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
          >
            <SpatialIcon 
              Icon={scanStatus.status === 'never_scanned' ? ICONS.Scan : 
                    scanStatus.status === 'up_to_date' ? ICONS.Check : 
                    ICONS.Timer} 
              size={48} 
              style={{ color: scanStatus.color }}
              variant="pure"
            />
            
            {/* Pulse ring for urgent states */}
            {scanStatus.urgency === 'high' && (
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: `color-mix(in srgb, ${scanStatus.color} 40%, transparent)` }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>

          {/* Status Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h3 
              className="text-3xl font-bold mb-3"
              style={{ color: scanStatus.color }}
            >
              {scanStatus.message}
            </h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto">
              {scanStatus.subtitle}
            </p>
          </motion.div>

          {/* Scan Frequency Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8 p-4 rounded-xl"
            style={{
              background: `color-mix(in srgb, ${scanStatus.color} 8%, transparent)`,
              border: `1px solid color-mix(in srgb, ${scanStatus.color} 20%, transparent)`,
              backdropFilter: 'blur(12px) saturate(130%)'
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <SpatialIcon Icon={ICONS.Info} size={16} style={{ color: scanStatus.color }} />
              <span className="text-white font-medium text-sm">Recommandation TwinForge</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Pour un suivi optimal de votre évolution corporelle, nous recommandons un scan tous les 7 jours. 
              Cela permet de détecter les changements subtils et d'ajuster vos objectifs en conséquence.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary CTA - New Scan - GlassCard avec thème cyan/bleu */}
            <GlassCard
              className="p-0 overflow-hidden"
              interactive
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 60%),
                  radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.10) 0%, transparent 50%),
                  var(--glass-opacity-base)
                `,
                borderColor: 'rgba(6, 182, 212, 0.4)',
                boxShadow: `
                  0 12px 40px rgba(0, 0, 0, 0.25),
                  0 0 40px rgba(6, 182, 212, 0.25),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2)
                `
              }}
            >
              <motion.button
                onClick={handleStartNewScan}
                className="w-full px-8 py-4 rounded-2xl font-bold text-lg text-white relative overflow-hidden min-h-[64px]"
                style={{
                  background: `
                    linear-gradient(135deg,
                      rgba(6, 182, 212, 0.25),
                      rgba(6, 182, 212, 0.15)
                    )
                  `,
                  border: 'none',
                  backdropFilter: 'blur(20px) saturate(160%)'
                }}
                whileHover={{
                  scale: 1.01,
                  y: -1
                }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Shimmer Effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent)',
                    animation: 'celebration-cta-shimmer-movement 2s ease-in-out infinite',
                    borderRadius: 'inherit'
                  }}
                />

                <div className="relative z-10 flex items-center justify-center gap-3">
                  <SpatialIcon
                    Icon={ICONS.Scan}
                    size={24}
                    style={{
                      color: '#06B6D4',
                      filter: 'drop-shadow(0 2px 6px rgba(6, 182, 212, 0.5))'
                    }}
                    variant="pure"
                  />
                  <span style={{
                    textShadow: '0 2px 8px rgba(6, 182, 212, 0.6)',
                    color: 'white'
                  }}>
                    {scanStatus.status === 'never_scanned' ? 'Créer mon Avatar 3D' : 'Nouveau Scan Corporel'}
                  </span>
                </div>
              </motion.button>
            </GlassCard>

            {/* Secondary CTA - View Insights (only if scans exist) */}
            {scanStatus.status !== 'never_scanned' && (
              <motion.button
                onClick={handleViewInsights}
                className="px-6 py-4 rounded-full font-medium text-white/90 transition-all duration-200 min-h-[64px]"
                style={{
                  background: `color-mix(in srgb, ${scanStatus.color} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${scanStatus.color} 20%, transparent)`,
                  backdropFilter: 'blur(12px) saturate(130%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `color-mix(in srgb, ${scanStatus.color} 12%, transparent)`;
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${scanStatus.color} 30%, transparent)`;
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `color-mix(in srgb, ${scanStatus.color} 8%, transparent)`;
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${scanStatus.color} 20%, transparent)`;
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <SpatialIcon Icon={ICONS.Zap} size={20} color="white" variant="pure" />
                  <span>Voir mes Insights</span>
                </div>
              </motion.button>
            )}
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Progress Tracking Card */}
      {scanStatus.status !== 'never_scanned' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard 
            className="p-6"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-body-scan-primary) 8%, transparent) 0%, transparent 60%),
                var(--glass-opacity-base)
              `,
              borderColor: 'color-mix(in srgb, var(--color-body-scan-primary) 25%, transparent)',
              boxShadow: `
                0 12px 40px rgba(0, 0, 0, 0.25),
                0 0 30px color-mix(in srgb, var(--color-body-scan-primary) 15%, transparent),
                inset 0 2px 0 rgba(255, 255, 255, 0.15)
              `
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold bodyscan-flex-center bodyscan-gap-sm text-xl">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                      linear-gradient(135deg, color-mix(in srgb, var(--color-body-scan-primary) 35%, transparent), color-mix(in srgb, var(--color-body-scan-primary) 25%, transparent))
                    `,
                    border: '2px solid color-mix(in srgb, var(--color-body-scan-primary) 50%, transparent)',
                    boxShadow: '0 0 20px color-mix(in srgb, var(--color-body-scan-primary) 30%, transparent)'
                  }}
                >
                  <SpatialIcon Icon={ICONS.TrendingUp} size={20} style={{ color: 'var(--color-body-scan-primary)' }} variant="pure" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Suivi de Progression</div>
                  <div className="text-white/60 text-xs font-normal mt-0.5">État de votre évolution corporelle</div>
                </div>
              </h4>
              <div className="flex items-center gap-2">
                <div className="bodyscan-status-badge bodyscan-status-badge--active">
                  <div className="bodyscan-status-icon" />
                  <span className="bodyscan-status-text">
                    {scanStatus.urgency === 'low' ? 'À jour' : 
                     scanStatus.urgency === 'medium' ? 'Bientôt' : 'Urgent'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="space-y-4">
              {/* Days Counter */}
              <div className="text-center">
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: scanStatus.color }}
                >
                  {daysSinceLastScan === Infinity ? '∞' : daysSinceLastScan}
                </div>
                <div className="text-white/70 text-sm">
                  {daysSinceLastScan === Infinity ? 'Aucun scan effectué' : 
                   daysSinceLastScan === 1 ? 'jour depuis le dernier scan' : 
                   'jours depuis le dernier scan'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-3 rounded-full relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(90deg, ${scanStatus.color}, color-mix(in srgb, ${scanStatus.color} 80%, white))`,
                      boxShadow: `0 0 12px ${scanStatus.color}60, inset 0 1px 0 rgba(255,255,255,0.3)`
                    }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.min(100, Math.max(0, 100 - (daysSinceLastScan / 7 * 100)))}%` 
                    }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
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
                
                <div className="flex justify-between mt-2 text-xs text-white/50">
                  <span>Nouveau</span>
                  <span>7 jours</span>
                </div>
              </div>

              {/* Next Scan Recommendation */}
              <div 
                className="text-center p-3 rounded-xl"
                style={{
                  background: `color-mix(in srgb, ${scanStatus.color} 6%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${scanStatus.color} 15%, transparent)`
                }}
              >
                <p className="text-white/80 text-sm">
                  {scanStatus.status === 'up_to_date' ? 
                    `Prochain scan recommandé dans ${7 - daysSinceLastScan} jour${7 - daysSinceLastScan > 1 ? 's' : ''}` :
                    'Un nouveau scan est recommandé pour suivre votre évolution'
                  }
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Benefits Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <GlassCard 
          className="p-6"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-body-scan-accent) 6%, transparent) 0%, transparent 60%),
              var(--glass-opacity-base)
            `,
            borderColor: 'color-mix(in srgb, var(--color-body-scan-accent) 20%, transparent)',
            boxShadow: `
              var(--glass-shadow-sm),
              0 0 12px color-mix(in srgb, var(--color-body-scan-accent) 8%, transparent)
            `
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                  linear-gradient(135deg, color-mix(in srgb, #8B5CF6 35%, transparent), color-mix(in srgb, #8B5CF6 25%, transparent))
                `,
                border: '2px solid color-mix(in srgb, #8B5CF6 50%, transparent)',
                boxShadow: '0 0 20px color-mix(in srgb, #8B5CF6 30%, transparent)'
              }}
            >
              <SpatialIcon Icon={ICONS.Info} size={20} style={{ color: '#8B5CF6' }} variant="pure" />
            </div>
            <div>
              <div className="font-semibold">Pourquoi scanner régulièrement ?</div>
              <div className="text-white/60 text-xs font-normal mt-0.5">Optimisez votre suivi corporel avec des scans réguliers</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              className="morphology-insight-item"
              style={{ '--insight-color': '#22C55E' } as React.CSSProperties}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="morphology-insight-icon-container">
                <SpatialIcon Icon={ICONS.TrendingUp} size={20} style={{ color: '#22C55E' }} variant="pure" />
              </div>
              
              <div className="morphology-insight-value">
                Suivi Précis
              </div>
              
              <div className="morphology-insight-title">
                Détectez les changements subtils
              </div>
            </motion.div>
            
            <motion.div
              className="morphology-insight-item"
              style={{ '--insight-color': '#3B82F6' } as React.CSSProperties}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -2 }}
            >
              <div className="morphology-insight-icon-container">
                <SpatialIcon Icon={ICONS.Zap} size={20} style={{ color: '#3B82F6' }} variant="pure" />
              </div>
              
              <div className="morphology-insight-value">
                Insights IA
              </div>
              
              <div className="morphology-insight-title">
                Recommandations personnalisées
              </div>
            </motion.div>
            
            <motion.div
              className="morphology-insight-item"
              style={{ '--insight-color': '#A855F7' } as React.CSSProperties}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -2 }}
            >
              <div className="morphology-insight-icon-container">
                <SpatialIcon Icon={ICONS.Heart} size={20} style={{ color: '#A855F7' }} variant="pure" />
              </div>
              
              <div className="morphology-insight-value">
                Motivation
              </div>
              
              <div className="morphology-insight-title">
                Visualisez vos progrès
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ScanCTA;