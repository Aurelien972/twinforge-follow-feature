/**
 * Apple Health Connection Card
 * Interface pour connecter et gérer Apple Health
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppleHealth } from '../../../../hooks/useAppleHealth';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../ui/icons/registry';
import GlassCard from '../../../../ui/cards/GlassCard';
import { useFeedback } from '../../../../hooks/useFeedback';

export const AppleHealthCard: React.FC = () => {
  const {
    isAvailable,
    isConnected,
    isLoading,
    error,
    requestPermissions,
    syncData,
    checkConnection,
  } = useAppleHealth();

  const { click, success, error: errorSound } = useFeedback();
  const [syncing, setSyncing] = useState(false);
  const [syncDays, setSyncDays] = useState(7);
  const [lastSyncResult, setLastSyncResult] = useState<{
    success: boolean;
    recordsStored: number;
  } | null>(null);

  const handleConnect = async () => {
    click();
    const granted = await requestPermissions();

    if (granted) {
      success();
      await checkConnection();
    } else {
      errorSound();
    }
  };

  const handleSync = async () => {
    click();
    setSyncing(true);
    setLastSyncResult(null);

    const result = await syncData(syncDays);
    setLastSyncResult(result);

    if (result.success) {
      success();
    } else {
      errorSound();
    }

    setSyncing(false);
  };

  if (!isAvailable) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(255, 59, 48, 0.15)',
                border: '1px solid rgba(255, 59, 48, 0.3)',
              }}
            >
              <SpatialIcon Icon={ICONS.Heart} size={24} style={{ color: '#FF3B30' }} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Apple Health</h3>
            <p className="text-white/60 text-sm mb-4">
              Apple Health n'est disponible que sur les appareils iOS. Veuillez ouvrir cette
              page sur votre iPhone ou iPad pour connecter Apple Health.
            </p>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: isConnected
                ? 'rgba(52, 199, 89, 0.15)'
                : 'rgba(255, 59, 48, 0.15)',
              border: isConnected
                ? '1px solid rgba(52, 199, 89, 0.3)'
                : '1px solid rgba(255, 59, 48, 0.3)',
            }}
          >
            <SpatialIcon
              Icon={ICONS.Heart}
              size={24}
              style={{ color: isConnected ? '#34C759' : '#FF3B30' }}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-white">Apple Health</h3>
            {isConnected && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-green-300 text-xs font-medium">Connecté</span>
              </div>
            )}
          </div>

          <p className="text-white/60 text-sm mb-4">
            {isConnected
              ? 'Synchronisez vos données Apple Watch et iPhone avec TwinForge'
              : 'Connectez Apple Health pour tracker vos données de santé et fitness'}
          </p>

          {error && (
            <div
              className="mb-4 p-3 rounded-xl border"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
              }}
            >
              <div className="flex items-start gap-2">
                <SpatialIcon Icon={ICONS.AlertTriangle} size={14} className="text-red-300 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          {lastSyncResult && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-xl border"
                style={{
                  background: lastSyncResult.success
                    ? 'rgba(52, 199, 89, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  borderColor: lastSyncResult.success
                    ? 'rgba(52, 199, 89, 0.3)'
                    : 'rgba(239, 68, 68, 0.3)',
                }}
              >
                <div className="flex items-start gap-2">
                  <SpatialIcon
                    Icon={lastSyncResult.success ? ICONS.CheckCircle2 : ICONS.AlertTriangle}
                    size={14}
                    className={lastSyncResult.success ? 'text-green-300' : 'text-red-300'}
                  />
                  <p
                    className={`text-sm ${
                      lastSyncResult.success ? 'text-green-200' : 'text-red-200'
                    }`}
                  >
                    {lastSyncResult.success
                      ? `Synchronisation réussie : ${lastSyncResult.recordsStored} enregistrements importés`
                      : 'Erreur lors de la synchronisation'}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl font-medium text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #FF3B30, #FF6B6B)',
                boxShadow: '0 4px 16px rgba(255, 59, 48, 0.3)',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <SpatialIcon Icon={ICONS.Loader2} size={18} className="animate-spin" />
                ) : (
                  <SpatialIcon Icon={ICONS.Heart} size={18} />
                )}
                <span>{isLoading ? 'Connexion...' : 'Connecter Apple Health'}</span>
              </div>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-white/80 text-sm font-medium">
                  Synchroniser les
                </label>
                <select
                  value={syncDays}
                  onChange={(e) => setSyncDays(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-lg text-sm text-white"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <option value={1}>dernières 24h</option>
                  <option value={7}>7 derniers jours</option>
                  <option value={14}>14 derniers jours</option>
                  <option value={30}>30 derniers jours</option>
                  <option value={90}>90 derniers jours</option>
                </select>
              </div>

              <button
                onClick={handleSync}
                disabled={syncing}
                className="w-full px-4 py-3 rounded-xl font-medium text-white transition-all"
                style={{
                  background: syncing
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'linear-gradient(135deg, #34C759, #30D158)',
                  boxShadow: syncing ? 'none' : '0 4px 16px rgba(52, 199, 89, 0.3)',
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  {syncing ? (
                    <>
                      <SpatialIcon Icon={ICONS.Loader2} size={18} className="animate-spin" />
                      <span>Synchronisation en cours...</span>
                    </>
                  ) : (
                    <>
                      <SpatialIcon Icon={ICONS.RefreshCw} size={18} />
                      <span>Synchroniser maintenant</span>
                    </>
                  )}
                </div>
              </button>

              <div className="pt-3 border-t border-white/10">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/50 mb-1">Données synchronisées</p>
                    <p className="text-white font-medium">
                      Fréquence cardiaque, HRV, Pas, Calories, Distance, Entraînements
                    </p>
                  </div>
                  <div>
                    <p className="text-white/50 mb-1">Fréquence</p>
                    <p className="text-white font-medium">Manuel</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-white/70 hover:text-white text-sm">
            <span>Permissions et confidentialité</span>
            <SpatialIcon
              Icon={ICONS.ChevronDown}
              size={16}
              className="transition-transform group-open:rotate-180"
            />
          </summary>
          <div className="mt-3 text-white/60 text-sm space-y-2">
            <p>
              TwinForge accède uniquement aux données de santé que vous autorisez explicitement.
              Vos données restent privées et ne sont jamais partagées avec des tiers.
            </p>
            <p>
              Vous pouvez révoquer les permissions à tout moment dans Réglages → Santé →
              Partage de données → Apps.
            </p>
          </div>
        </details>
      </div>
    </GlassCard>
  );
};
