import React from 'react';
import { usePerformanceMode } from '../../../system/context/PerformanceModeContext';
import { useDeviceCapabilities } from '../../../hooks/useDeviceCapabilities';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';

export function PerformanceSettingsTab() {
  const { mode, recommendedMode, setMode } = usePerformanceMode();
  const capabilities = useDeviceCapabilities();

  const modes = [
    {
      value: 'high-performance' as const,
      label: 'Haute Performance',
      description: 'Performance maximale pour mobile. 0% effets coûteux, 60 FPS garanti.',
      icon: ICONS.Zap,
      color: '#10B981',
      features: [
        'Backdrop-filter: 0% (couleurs solides)',
        'Gradients: 0% (couleurs unies)',
        'Animations: essentielles uniquement',
        'Box-shadow: simple (1 layer)',
        'Framer Motion: désactivé',
      ],
    },
    {
      value: 'balanced' as const,
      label: 'Équilibré',
      description: 'Équilibre entre qualité et performance pour tablettes et mid-range.',
      icon: ICONS.Settings,
      color: '#3B82F6',
      features: [
        'Backdrop-filter: léger (6px blur)',
        'Gradients: simplifiés (2 couleurs max)',
        'Animations: loaders uniquement',
        'Box-shadow: 1-2 layers',
        'Framer Motion: simplifié',
      ],
    },
    {
      value: 'quality' as const,
      label: 'Qualité Maximale',
      description: 'Tous les effets visuels pour desktop et high-end devices.',
      icon: ICONS.Sparkles,
      color: '#8B5CF6',
      features: [
        'Backdrop-filter: 100% (blur 24px)',
        'Gradients: 100% tous effets',
        'Animations: toutes actives',
        'Box-shadow: multiples layers',
        'Framer Motion: complet',
      ],
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Mode de Performance</h2>
        <p className="text-sm text-gray-400">
          Choisissez le mode qui convient le mieux à votre appareil pour optimiser l'expérience visuelle et la fluidité.
        </p>
      </div>

      {/* Device Info */}
      <div className="glass-card p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <SpatialIcon Icon={ICONS.Smartphone} size={16} />
          <span className="text-gray-300">Détection automatique</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
          <div>
            <span className="font-medium">Type:</span> {capabilities.isMobile ? 'Mobile' : capabilities.isTablet ? 'Tablette' : 'Desktop'}
          </div>
          <div>
            <span className="font-medium">Écran:</span> {capabilities.screenWidth}×{capabilities.screenHeight}
          </div>
          <div>
            <span className="font-medium">Mémoire:</span> {capabilities.memoryGB} GB
          </div>
          <div>
            <span className="font-medium">CPU:</span> {capabilities.cores} cores
          </div>
        </div>
        {recommendedMode && (
          <div className="mt-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm">
            Mode recommandé: <span className="font-semibold">{modes.find(m => m.value === recommendedMode)?.label}</span>
          </div>
        )}
      </div>

      {/* Mode Selection */}
      <div className="space-y-4">
        {modes.map((modeOption) => {
          const isActive = mode === modeOption.value;
          const isRecommended = recommendedMode === modeOption.value;

          return (
            <button
              key={modeOption.value}
              onClick={() => setMode(modeOption.value)}
              className={`
                w-full text-left p-5 rounded-2xl border-2 transition-all
                ${isActive
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`
                    p-3 rounded-xl
                    ${isActive ? 'bg-cyan-500/20' : 'bg-white/10'}
                  `}
                  style={{
                    color: isActive ? '#06B6D4' : modeOption.color,
                  }}
                >
                  <SpatialIcon Icon={modeOption.icon} size={24} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {modeOption.label}
                    </h3>
                    {isActive && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full">
                        Actif
                      </span>
                    )}
                    {isRecommended && !isActive && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full">
                        Recommandé
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-400">
                    {modeOption.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 mt-3">
                    {modeOption.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-gray-600 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Radio Indicator */}
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isActive ? 'border-cyan-500' : 'border-gray-600'}
                  `}
                >
                  {isActive && (
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Performance Stats */}
      <div className="glass-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <SpatialIcon Icon={ICONS.BarChart} size={16} />
          Impact sur les performances
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold" style={{ color: modes.find(m => m.value === mode)?.color }}>
              {mode === 'high-performance' ? '0%' : mode === 'balanced' ? '25%' : '100%'}
            </div>
            <div className="text-xs text-gray-500">Effets coûteux</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-400">
              {mode === 'high-performance' ? '60' : mode === 'balanced' ? '45-55' : '30-60'}
            </div>
            <div className="text-xs text-gray-500">FPS cible</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-400">
              {mode === 'high-performance' ? 'Min' : mode === 'balanced' ? 'Moy' : 'Max'}
            </div>
            <div className="text-xs text-gray-500">Charge GPU</div>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-sm text-gray-400">
        <div className="flex items-start gap-2">
          <SpatialIcon Icon={ICONS.Info} size={16} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-white mb-1">À propos des modes</p>
            <p>
              Le mode de performance adapte automatiquement tous les effets visuels de l'application :
              backdrop-filter, gradients, animations, ombres et Framer Motion. Vos préférences sont
              sauvegardées et synchronisées sur tous vos appareils.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
