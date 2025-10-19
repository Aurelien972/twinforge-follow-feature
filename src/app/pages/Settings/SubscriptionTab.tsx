import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../../ui/cards/GlassCard';
import TokenIcon from '../../../ui/icons/TokenIcon';
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

  const pack19 = pricingConfig?.tokenPacks?.pack_19;

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <TokenIcon size={40} variant="normal" withGlow={true} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Solde de Tokens</h3>
            <p className="text-sm text-slate-400">
              Les tokens alimentent toutes les fonctionnalités avancées de TwinForgeFit
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            className="rounded-xl p-5 border"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(253, 200, 48, 0.05))',
              borderColor: 'rgba(247, 147, 30, 0.3)',
              boxShadow: '0 4px 16px rgba(247, 147, 30, 0.1)'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-medium">Tokens Disponibles</span>
              <TokenIcon size={24} variant="success" withGlow={false} />
            </div>
            <div className="text-4xl font-bold mb-1" style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {tokenBalance ? TokenService.formatTokenAmount(tokenBalance.balance) : '0'}
            </div>
            <div className="text-xs text-slate-500">
              Votre réserve d'énergie numérique
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-medium">Statut</span>
              <SpatialIcon
                Icon={ICONS.Check}
                size={20}
                color="#10B981"
                variant="pure"
              />
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-1">
              Essai Gratuit
            </div>
            <div className="text-xs text-slate-500">
              15 000 tokens offerts pour découvrir l'app
            </div>
          </div>
        </div>
      </GlassCard>

      {pack19 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Recharger mes Tokens</h3>
          <div className="max-w-md mx-auto">
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center mb-4">
                  <TokenIcon size={64} variant="normal" withGlow={true} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Pack Standard</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Rechargez votre réserve de tokens pour continuer à utiliser toutes les fonctionnalités
                </p>
              </div>

              <div
                className="mb-6 py-5 px-6 rounded-xl border"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15), rgba(253, 200, 48, 0.08))',
                  borderColor: 'rgba(247, 147, 30, 0.35)',
                  boxShadow: '0 4px 20px rgba(247, 147, 30, 0.15)'
                }}
              >
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold" style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {TokenService.formatTokenAmount(pack19.tokens)}
                  </span>
                  <span className="text-lg text-slate-400 font-medium">tokens</span>
                </div>
                <div className="text-xs text-center text-slate-400 font-medium">
                  ≈ 100 analyses complètes ou 8 générations de plan repas
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-white mb-1">
                  {TokenService.formatCurrency(pack19.price_eur)}
                </div>
                <div className="text-xs text-slate-500">
                  Paiement unique • Tokens permanents
                </div>
              </div>

              <button
                onClick={() => handlePurchaseTokens('pack_19')}
                disabled={isCreatingSession}
                className="w-full px-6 py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
                  boxShadow: '0 8px 24px rgba(247, 147, 30, 0.35)',
                  transform: isCreatingSession ? 'scale(0.98)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (!isCreatingSession) {
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(247, 147, 30, 0.45)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCreatingSession) {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 147, 30, 0.35)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {isCreatingSession ? 'Chargement...' : 'Recharger mes Tokens'}
              </button>

              <div className="mt-4 text-center text-xs text-slate-500">
                Paiement sécurisé via Stripe
              </div>
            </GlassCard>
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
                <div className="flex items-center gap-3 flex-1">
                  <TokenIcon
                    size={28}
                    variant={tx.transactionType === 'consume' ? 'warning' : 'success'}
                    withGlow={false}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white mb-1">
                      {tx.operationType ? TokenService.getOperationTypeLabel(tx.operationType) : tx.source || 'Transaction'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {format(new Date(tx.createdAt), 'dd MMM yyyy HH:mm', { locale: fr })}
                    </div>
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
        <div className="flex items-start gap-3 mb-4">
          <SpatialIcon Icon={ICONS.Info} size={20} color="#60A5FA" variant="pure" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-3">Comment fonctionnent les Tokens ?</h4>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <TokenIcon size={32} variant="normal" withGlow={false} />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-white mb-1">Carburant de vos fonctionnalités</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Les tokens sont l'unité d'énergie qui alimente toutes les fonctionnalités avancées : analyses corporelles détaillées, génération de plans nutritionnels personnalisés, coaching vocal interactif, et bien plus encore. Chaque action consomme une quantité proportionnelle de tokens selon sa complexité.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <TokenIcon size={32} variant="success" withGlow={false} />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-white mb-1">Démarrage gratuit généreux</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                À votre inscription, vous recevez 15 000 tokens offerts pour découvrir l'application. C'est suffisant pour réaliser plusieurs analyses complètes, générer des plans repas, et tester toutes les fonctionnalités. Aucune carte bancaire requise pour commencer.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <SpatialIcon Icon={ICONS.ShoppingCart} size={16} color="#A78BFA" variant="pure" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-white mb-1">Recharge simple et transparente</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Besoin de plus de tokens ? Rechargez à tout moment avec notre pack standard à 19€. Les tokens achetés sont permanents et ne s'épuisent jamais. Vous gardez le contrôle total de vos dépenses, sans abonnement contraignant.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <TokenIcon size={32} variant="warning" withGlow={false} />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-white mb-1">Consommation optimisée et transparente</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chaque fonctionnalité affiche sa consommation en tokens avant utilisation. Les opérations simples (analyse de repas) coûtent environ 2 000 tokens, tandis que les générations complexes (plan repas complet) utilisent environ 25 000 tokens. Consultez l'historique pour suivre vos dépenses.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default SubscriptionTab;
