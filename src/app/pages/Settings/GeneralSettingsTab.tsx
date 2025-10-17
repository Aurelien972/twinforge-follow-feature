import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { usePerformanceMode } from '../../../system/context/PerformanceModeContext';
import { useToast } from '../../../ui/components/ToastProvider';

const GeneralSettingsTab: React.FC = () => {
  const { isPerformanceMode, isLoading, togglePerformanceMode } = usePerformanceMode();
  const { showToast } = useToast();

  const handleToggle = async () => {
    try {
      await togglePerformanceMode();
      showToast({
        type: 'success',
        title: isPerformanceMode ? 'Mode Performance désactivé' : 'Mode Performance activé',
        message: isPerformanceMode
          ? 'Tous les effets visuels sont maintenant actifs'
          : 'Optimisation pour iPhone 10 et appareils anciens activée',
        duration: 3000,
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erreur',
        message: 'Impossible de modifier le mode performance',
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <SpatialIcon
                Icon={ICONS.Zap}
                size={24}
                color={isPerformanceMode ? '#10B981' : '#94A3B8'}
                variant="pure"
              />
              <h3 className="text-lg font-semibold text-white">
                Mode Performance
              </h3>
            </div>

            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Optimise l'application pour les appareils anciens (iPhone 10, iPhone 8, etc.) en désactivant
              tous les effets visuels coûteux. Élimine le flickering et garantit une fluidité à 60fps.
            </p>

            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-start gap-2">
                <span className="text-slate-600">•</span>
                <span>Désactive les animations et transitions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-600">•</span>
                <span>Remplace les effets de verre par des fonds solides</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-600">•</span>
                <span>Supprime les particules et effets lumineux</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-600">•</span>
                <span>Conserve toute la navigation et les fonctionnalités</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleToggle}
              disabled={isLoading}
              className="relative inline-flex h-12 w-24 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              style={{
                backgroundColor: isPerformanceMode ? '#10B981' : '#334155',
                borderColor: isPerformanceMode ? '#10B981' : '#475569',
              }}
              role="switch"
              aria-checked={isPerformanceMode}
              aria-label="Activer le mode performance"
            >
              <motion.span
                className="pointer-events-none inline-block h-10 w-10 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
                style={{
                  backgroundColor: 'white',
                }}
                animate={{
                  x: isPerformanceMode ? 48 : 2,
                  y: 2,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </button>

            <span className="text-xs font-medium text-slate-400">
              {isPerformanceMode ? 'Activé' : 'Désactivé'}
            </span>
          </div>
        </div>

        {isPerformanceMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-2xl"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <div className="flex items-start gap-3">
              <SpatialIcon
                Icon={ICONS.CheckCircle}
                size={20}
                color="#10B981"
                variant="pure"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-400 mb-1">
                  Mode Performance actif
                </p>
                <p className="text-xs text-emerald-300 opacity-90">
                  Votre appareil bénéficie maintenant d'une expérience optimisée pour des performances maximales
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-start gap-3">
          <SpatialIcon
            Icon={ICONS.Info}
            size={20}
            color="#60A5FA"
            variant="pure"
          />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-2">
              Recommandations
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Le mode performance est recommandé pour les appareils de plus de 5 ans ou si vous constatez
              du flickering, des ralentissements ou une consommation de batterie élevée. Vous pouvez activer
              et désactiver ce mode à tout moment selon vos besoins.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default GeneralSettingsTab;
