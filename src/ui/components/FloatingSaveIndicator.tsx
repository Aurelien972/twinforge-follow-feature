/**
 * Floating Save Indicator
 * VisionOS 26 style floating indicator showing save status in real-time
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../cards/GlassCard';
import SpatialIcon from '../icons/SpatialIcon';
import { ICONS } from '../icons/registry';
import type { SaveStatus } from '../../hooks/useSmartAutoSave';

interface FloatingSaveIndicatorProps {
  status: SaveStatus;
  lastSaved: Date | null;
  errorCount?: number;
  queueSize?: number;
  onRetry?: () => void;
  className?: string;
}

/**
 * Format relative time (ex: "il y a 2 minutes")
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffSeconds < 5) return "à l'instant";
  if (diffSeconds < 60) return `il y a ${diffSeconds}s`;
  if (diffMinutes < 60) return `il y a ${diffMinutes}min`;
  if (diffHours < 24) return `il y a ${diffHours}h`;
  return 'il y a plus d\'un jour';
}

/**
 * Get status configuration (icon, color, text)
 */
function getStatusConfig(status: SaveStatus) {
  switch (status) {
    case 'saved':
      return {
        icon: ICONS.Check,
        color: '#10B981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        text: 'Sauvegardé',
        pulse: false,
      };
    case 'saving':
      return {
        icon: ICONS.Loader2,
        color: '#F59E0B',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        borderColor: 'rgba(245, 158, 11, 0.3)',
        text: 'Sauvegarde...',
        pulse: false,
        spin: true,
      };
    case 'unsaved':
      return {
        icon: ICONS.Clock,
        color: '#F59E0B',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        borderColor: 'rgba(245, 158, 11, 0.3)',
        text: 'Non sauvegardé',
        pulse: true,
      };
    case 'error':
      return {
        icon: ICONS.AlertCircle,
        color: '#EF4444',
        bgColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        text: 'Erreur',
        pulse: true,
      };
  }
}

const FloatingSaveIndicator: React.FC<FloatingSaveIndicatorProps> = ({
  status,
  lastSaved,
  errorCount = 0,
  queueSize = 0,
  onRetry,
  className = '',
}) => {
  const config = getStatusConfig(status);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Auto-collapse after 3 seconds when saved
  React.useEffect(() => {
    if (status === 'saved' && isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, isExpanded]);

  // Auto-expand when status changes to show info
  React.useEffect(() => {
    if (status !== 'saved') {
      setIsExpanded(true);
    }
  }, [status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => status === 'saved' && setIsExpanded(false)}
    >
      <GlassCard
        className="overflow-hidden transition-all duration-300"
        style={{
          background: config.bgColor,
          borderColor: config.borderColor,
          minWidth: isExpanded ? '200px' : '48px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 20px ${config.color}30,
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        <div className="flex items-center gap-3 p-3">
          {/* Status Icon */}
          <motion.div
            className="relative flex-shrink-0"
            animate={config.pulse ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: config.pulse ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${config.color}40, ${config.color}20)`,
                border: `1px solid ${config.color}60`,
                boxShadow: `0 0 12px ${config.color}40`,
              }}
            >
              <SpatialIcon
                Icon={config.icon}
                size={14}
                style={{ color: config.color }}
                className={config.spin ? 'animate-spin' : ''}
              />
            </div>

            {/* Pulse ring for unsaved/error */}
            {config.pulse && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${config.color}`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
          </motion.div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="min-w-0">
                    <div
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: config.color }}
                    >
                      {config.text}
                    </div>

                    {/* Last saved time */}
                    {lastSaved && status === 'saved' && (
                      <div className="text-xs text-white/60 whitespace-nowrap">
                        {formatRelativeTime(lastSaved)}
                      </div>
                    )}

                    {/* Queue info */}
                    {queueSize > 0 && status === 'saving' && (
                      <div className="text-xs text-white/60">
                        {queueSize} en attente
                      </div>
                    )}

                    {/* Error count */}
                    {errorCount > 0 && status === 'error' && (
                      <div className="text-xs text-white/60">
                        {errorCount} échec{errorCount > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* Retry button for errors */}
                  {status === 'error' && onRetry && (
                    <button
                      onClick={onRetry}
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                      aria-label="Réessayer"
                    >
                      <SpatialIcon
                        Icon={ICONS.RotateCcw}
                        size={14}
                        style={{ color: config.color }}
                      />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated progress bar for saving */}
        {status === 'saving' && (
          <motion.div
            className="h-0.5"
            style={{
              background: config.color,
              transformOrigin: 'left'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </GlassCard>
    </motion.div>
  );
};

export default FloatingSaveIndicator;
