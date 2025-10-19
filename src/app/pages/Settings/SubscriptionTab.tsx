import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useToast } from '../../../ui/components/ToastProvider';
import { TokenService, type TokenBalance, type PricingConfig, type UserSubscription, type TokenTransaction } from '../../../system/services/tokenService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SubscriptionTab: React.FC = () => {
  const { showToast } = useToast();
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | null>(null);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [balance, sub, config, txs] = await Promise.all([
        TokenService.getTokenBalance(),
        TokenService.getUserSubscription(),
        TokenService.getPricingConfig(),
        TokenService.getTokenTransactions(20),
      ]);
      setTokenBalance(balance);
      setSubscription(sub);
      setPricingConfig(config);
      setTransactions(txs);
    } catch (error) {
      console.error('Error loading subscription data:', error);
      showToast({
        type: 'error',
        title: 'Erreur',
        message: 'Impossible de charger les données d\'abonnement',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (planType: string) => {
    if (isCreatingSession) return;
    setIsCreatingSession(true);
    try {
      const result = await TokenService.createCheckoutSession('subscription', planType);
      if (result?.url) {
        window.location.href = result.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      showToast({
        type: 'error',
        title: 'Erreur',
        message: 'Impossible de créer la session de paiement',
        duration: 3000,
      });
      setIsCreatingSession(false);
    }
  };

  const handlePurchaseTokens = async (packId: string) => {
    if (isCreatingSession) return;
    setIsCreatingSession(true);
    try {
      const result = await TokenService.createCheckoutSession('payment', undefined, packId);
      if (result?.url) {
        window.location.href = result.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      showToast({
        type: 'error',
        title: 'Erreur',
        message: 'Impossible de créer la session de paiement',
        duration: 3000,
      });
      setIsCreatingSession(false);
    }
  };

  const handleManageSubscription = async () => {
    if (isCreatingSession) return;
    setIsCreatingSession(true);
    try {
      const result = await TokenService.createPortalSession();
      if (result?.url) {
        window.location.href = result.url;
      } else {
        throw new Error('Failed to create portal session');
      }
    } catch (error) {
      console.error('Error creating portal session:', error);
      showToast({
        type: 'error',
        title: 'Erreur',
        message: 'Impossible d\'accéder au portail de gestion',
        duration: 3000,
      });
      setIsCreatingSession(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-400';
      case 'trialing':
        return 'text-blue-400';
      case 'canceled':
      case 'past_due':
      case 'unpaid':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'trialing':
        return 'Essai';
      case 'canceled':
        return 'Annulé';
      case 'past_due':
        return 'Paiement en retard';
      case 'unpaid':
        return 'Impayé';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-slate-400">Chargement...</div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <SpatialIcon Icon={ICONS.Coins} size={28} color="#10B981" variant="pure" />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Solde de Tokens</h3>
            <p className="text-sm text-slate-400">
              Les tokens sont utilisés pour les fonctionnalités IA de TwinForgeFit
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">Tokens Disponibles</span>
              <SpatialIcon Icon={ICONS.Zap} size={16} color="#10B981" variant="pure" />
            </div>
            <div className="text-3xl font-bold text-white">
              {tokenBalance ? TokenService.formatTokenAmount(tokenBalance.balance) : '0'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              1 token = 0.001€ de coût IA
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">Statut</span>
              <SpatialIcon
                Icon={subscription?.status === 'active' ? ICONS.Check : ICONS.AlertCircle}
                size={16}
                color={subscription?.status === 'active' ? '#10B981' : '#F59E0B'}
                variant="pure"
              />
            </div>
            <div className={`text-2xl font-bold ${subscription ? getStatusColor(subscription.status) : 'text-slate-400'}`}>
              {subscription ? getStatusLabel(subscription.status) : 'Essai Gratuit'}
            </div>
            {subscription && (
              <div className="text-xs text-slate-500 mt-1">
                Renouvellement le {format(new Date(subscription.currentPeriodEnd), 'dd MMMM yyyy', { locale: fr })}
              </div>
            )}
          </div>
        </div>

        {subscription && (
          <div className="flex gap-3">
            <button
              onClick={handleManageSubscription}
              disabled={isCreatingSession}
              className="flex-1 px-4 py-3 bg-blue-500/20 text-blue-400 rounded-xl font-medium hover:bg-blue-500/30 transition-all border border-blue-500/30 disabled:opacity-50"
            >
              Gérer mon abonnement
            </button>
          </div>
        )}
      </GlassCard>

      {!subscription && pricingConfig && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Abonnements Mensuels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(pricingConfig.subscriptionPlans).map(([key, plan]) => (
              <GlassCard key={key} className="p-5">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-white mb-1">{plan.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {TokenService.formatCurrency(plan.price_eur)}
                    </span>
                    <span className="text-sm text-slate-500">/mois</span>
                  </div>
                </div>

                <div className="mb-4 py-3 px-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="text-2xl font-bold text-emerald-400">
                    {TokenService.formatTokenAmount(plan.tokens_per_month)} tokens
                  </div>
                  <div className="text-xs text-slate-400 mt-1">par mois</div>
                </div>

                <button
                  onClick={() => handleSubscribe(key)}
                  disabled={isCreatingSession}
                  className="w-full px-4 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all disabled:opacity-50"
                >
                  S'abonner
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {pricingConfig && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Achats de Tokens</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(pricingConfig.tokenPacks).map(([key, pack]) => (
              <GlassCard key={key} className="p-4">
                <div className="mb-3">
                  <div className="text-xl font-bold text-white mb-1">
                    {TokenService.formatTokenAmount(pack.tokens)}
                  </div>
                  <div className="text-xs text-slate-500">tokens</div>
                </div>

                {pack.bonus_percent > 0 && (
                  <div className="mb-3 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-md inline-block">
                    +{pack.bonus_percent}% bonus
                  </div>
                )}

                <div className="text-lg font-bold text-white mb-3">
                  {TokenService.formatCurrency(pack.price_eur)}
                </div>

                <button
                  onClick={() => handlePurchaseTokens(key)}
                  disabled={isCreatingSession}
                  className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-all border border-blue-500/30 disabled:opacity-50 text-sm"
                >
                  Acheter
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {transactions.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <SpatialIcon Icon={ICONS.History} size={24} color="#60A5FA" variant="pure" />
            <h3 className="text-lg font-bold text-white">Historique des Transactions</h3>
          </div>

          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-white mb-1">
                    {tx.operationType ? TokenService.getOperationTypeLabel(tx.operationType) : tx.source || 'Transaction'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {format(new Date(tx.createdAt), 'dd MMM yyyy HH:mm', { locale: fr })}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-bold ${
                      tx.transactionType === 'consume' ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {tx.transactionType === 'consume' ? '-' : '+'}
                    {tx.amount}
                  </div>
                  <div className="text-xs text-slate-500">
                    Solde: {tx.balanceAfter}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard className="p-6">
        <div className="flex items-start gap-3">
          <SpatialIcon Icon={ICONS.Info} size={20} color="#60A5FA" variant="pure" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-2">À propos des Tokens</h4>
            <ul className="text-xs text-slate-400 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>
                  Les tokens sont utilisés pour toutes les fonctionnalités IA: analyses corporelles, génération de repas, coaching vocal, et plus encore.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>
                  Avec un abonnement, vos tokens se renouvellent automatiquement chaque mois.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>
                  Achetez des packs de tokens ponctuellement si vous dépassez votre allocation mensuelle.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>
                  Essai gratuit: 100 tokens offerts pour découvrir TwinForgeFit (valeur de 0.10€).
                </span>
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default SubscriptionTab;
