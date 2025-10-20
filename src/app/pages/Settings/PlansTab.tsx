import React, { useState, useEffect } from 'react';
import { ConditionalMotion } from '../../../lib/motion';
import GlassCard from '../../../ui/cards/GlassCard';
import TokenIcon from '../../../ui/icons/TokenIcon';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import { useToast } from '../../../ui/components/ToastProvider';
import { TokenService, type TokenBalance, type PricingConfig, type UserSubscription } from '../../../system/services/tokenService';

interface PlanCardProps {
  planId: string;
  name: string;
  priceEur: number;
  tokensPerMonth: number;
  isCurrentPlan: boolean;
  isFree: boolean;
  onSelect: (planId: string) => void;
  isLoading: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  planId,
  name,
  priceEur,
  tokensPerMonth,
  isCurrentPlan,
  isFree,
  onSelect,
  isLoading,
}) => {
  const isPremium = priceEur >= 29;
  const isElite = priceEur >= 39;

  const getPlanLabel = () => {
    if (isFree) return 'Essai Gratuit';
    if (priceEur === 9) return 'Starter';
    if (priceEur === 19) return 'Pro';
    if (priceEur === 29) return 'Premium';
    if (priceEur === 39) return 'Elite';
    if (priceEur === 49) return 'Expert';
    if (priceEur === 59) return 'Master';
    if (priceEur === 99) return 'Ultimate';
    return name;
  };

  const getGradientColors = () => {
    if (isFree) return 'from-slate-500/20 to-slate-600/10';
    if (priceEur === 9) return 'from-blue-500/20 to-cyan-500/10';
    if (priceEur === 19) return 'from-emerald-500/20 to-teal-500/10';
    if (priceEur === 29) return 'from-orange-500/20 to-amber-500/10';
    if (priceEur === 39) return 'from-purple-500/20 to-pink-500/10';
    if (priceEur === 49) return 'from-red-500/20 to-rose-500/10';
    if (priceEur === 59) return 'from-violet-500/20 to-fuchsia-500/10';
    if (priceEur === 99) return 'from-yellow-500/20 to-orange-500/10';
    return 'from-gray-500/20 to-gray-600/10';
  };

  const getBorderColor = () => {
    if (isFree) return 'rgba(148, 163, 184, 0.3)';
    if (priceEur === 9) return 'rgba(59, 130, 246, 0.3)';
    if (priceEur === 19) return 'rgba(16, 185, 129, 0.3)';
    if (priceEur === 29) return 'rgba(249, 115, 22, 0.3)';
    if (priceEur === 39) return 'rgba(168, 85, 247, 0.3)';
    if (priceEur === 49) return 'rgba(239, 68, 68, 0.3)';
    if (priceEur === 59) return 'rgba(139, 92, 246, 0.3)';
    if (priceEur === 99) return 'rgba(234, 179, 8, 0.3)';
    return 'rgba(156, 163, 175, 0.3)';
  };

  return (
    <ConditionalMotion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <GlassCard
        className={`p-5 transition-all cursor-pointer hover:scale-[1.02] ${
          isCurrentPlan ? 'ring-2 ring-white/30' : ''
        }`}
        style={{
          background: `linear-gradient(135deg, ${getGradientColors().split(' ')[0].replace('from-', 'rgba(')}, ${getGradientColors().split(' ')[1].replace('to-', 'rgba(')})`,
          borderColor: getBorderColor(),
        }}
        onClick={() => !isCurrentPlan && !isLoading && onSelect(planId)}
      >
        {isCurrentPlan && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            Plan Actuel
          </div>
        )}

        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-white mb-1">{getPlanLabel()}</h3>
          {isFree && (
            <p className="text-xs text-slate-400">Découvrez l'application</p>
          )}
        </div>

        <div className="flex items-center justify-center mb-4">
          <TokenIcon size={48} variant={isCurrentPlan ? 'success' : 'normal'} withGlow={isCurrentPlan} />
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-white mb-1">
            {isFree ? 'Gratuit' : `${priceEur}€`}
          </div>
          <div className="text-xs text-slate-400">
            {isFree ? 'À l\'inscription' : 'par mois'}
          </div>
        </div>

        <div
          className="mb-4 py-3 px-4 rounded-lg border text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="text-2xl font-bold mb-1 text-white force-visible-text">
            {TokenService.formatTokenAmount(tokensPerMonth)}
          </div>
          <div className="text-xs text-slate-400">tokens / mois</div>
        </div>

        {!isCurrentPlan && !isFree && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(planId);
            }}
            disabled={isLoading}
            className="w-full px-4 py-2.5 rounded-lg font-semibold text-white text-sm transition-all disabled:opacity-50"
            style={{
              background: isElite
                ? 'linear-gradient(135deg, #8B5CF6, #A855F7)'
                : isPremium
                ? 'linear-gradient(135deg, #F97316, #FB923C)'
                : 'linear-gradient(135deg, #3B82F6, #60A5FA)',
            }}
          >
            {isLoading ? 'Chargement...' : 'Choisir ce plan'}
          </button>
        )}

        {isFree && !isCurrentPlan && (
          <div className="text-center text-xs text-slate-500">
            Plan offert à l'inscription
          </div>
        )}
      </GlassCard>
    </ConditionalMotion>
  );
};

const PlansTab: React.FC = () => {
  const { showToast } = useToast();
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [balance, sub, config] = await Promise.all([
        TokenService.getTokenBalance(),
        TokenService.getUserSubscription(),
        TokenService.getPricingConfig(),
      ]);
      setTokenBalance(balance);
      setSubscription(sub);
      setPricingConfig(config);

      if (config?.subscriptionPlans) {
        console.log('Loaded subscription plans:', config.subscriptionPlans);
        Object.entries(config.subscriptionPlans).forEach(([planId, plan]) => {
          console.log(`Plan ${planId}:`, plan);
        });
      }
    } catch (error) {
      console.error('Error loading plans data:', error);
      showToast({
        type: 'error',
        title: 'Erreur',
        message: 'Impossible de charger les forfaits',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlan = async (planId: string) => {
    if (isCreatingSession) return;
    setIsCreatingSession(true);
    try {
      const result = await TokenService.createCheckoutSession('subscription', planId);
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

  const handlePurchaseTokenPack = async () => {
    if (isCreatingSession) return;
    setIsCreatingSession(true);
    try {
      const result = await TokenService.createCheckoutSession('payment', undefined, 'pack_19');
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
            <div className="text-slate-400">Chargement des forfaits...</div>
          </div>
        </GlassCard>
      </div>
    );
  }

  const currentPlanType = subscription?.planType || 'free';
  const plans = pricingConfig?.subscriptionPlans || {};
  const pack19 = pricingConfig?.tokenPacks?.pack_19;

  return (
    <div className="space-y-6">
      {/* Current Balance */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TokenIcon size={40} variant="normal" withGlow={true} />
            <div>
              <h3 className="text-lg font-bold text-white">Solde Actuel</h3>
              <p className="text-sm text-slate-400">Tokens disponibles</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-1 text-white force-visible-text">
              {tokenBalance ? TokenService.formatTokenAmount(tokenBalance.balance) : '0'}
            </div>
            <div className="text-xs text-slate-500">
              Renouvelé chaque mois
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Plans Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Forfaits Mensuels</h2>
        <p className="text-sm text-slate-400 mb-6">
          Choisissez le forfait qui correspond à votre utilisation. Vos tokens sont renouvelés automatiquement chaque mois.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(plans).map(([planId, plan]) => {
            if (!plan) {
              return null;
            }
            return (
              <PlanCard
                key={planId}
                planId={planId}
                name={plan.name || planId}
                priceEur={plan.price_eur || 0}
                tokensPerMonth={plan.tokens_monthly || 0}
                isCurrentPlan={currentPlanType === planId}
                isFree={planId === 'free'}
                onSelect={handleSelectPlan}
                isLoading={isCreatingSession}
              />
            );
          })}
        </div>
      </div>

      {/* Token Pack Option */}
      {pack19 && (
        <GlassCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <TokenIcon size={48} variant="warning" withGlow={false} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Besoin de tokens supplémentaires ?</h3>
              <p className="text-sm text-slate-400 mb-4">
                Rechargez votre réserve à tout moment avec un pack de tokens. Les tokens achetés sont permanents et s'ajoutent à votre solde mensuel.
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    background: 'rgba(247, 147, 30, 0.1)',
                    borderColor: 'rgba(247, 147, 30, 0.3)',
                  }}
                >
                  <div className="text-sm font-semibold text-white">
                    {TokenService.formatTokenAmount(pack19.tokens)} tokens
                  </div>
                </div>
                <button
                  onClick={handlePurchaseTokenPack}
                  disabled={isCreatingSession}
                  className="px-6 py-2 rounded-lg font-semibold text-white text-sm transition-all disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                  }}
                >
                  {isCreatingSession ? 'Chargement...' : `Acheter pour ${TokenService.formatCurrency(pack19.price_eur)}`}
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Info Card */}
      <GlassCard className="p-6">
        <div className="flex items-start gap-3">
          <SpatialIcon Icon={ICONS.Info} size={20} color="#60A5FA" variant="pure" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-3">Comment fonctionnent les forfaits ?</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p>
                <strong className="text-white">Renouvellement automatique :</strong> Vos tokens sont renouvelés automatiquement chaque mois à la date anniversaire de votre abonnement.
              </p>
              <p>
                <strong className="text-white">Tokens non utilisés :</strong> Les tokens non utilisés d'un mois ne sont pas reportés. Choisissez le forfait adapté à votre utilisation réelle.
              </p>
              <p>
                <strong className="text-white">Changement de forfait :</strong> Vous pouvez changer de forfait à tout moment. Le changement prendra effet lors du prochain renouvellement.
              </p>
              <p>
                <strong className="text-white">Annulation :</strong> Vous pouvez annuler votre abonnement à tout moment depuis l'onglet Abonnement. Vous conserverez l'accès jusqu'à la fin de la période en cours.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default PlansTab;
