import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenIcon from '../../ui/icons/TokenIcon';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';
import { TokenService, type TokenBalance } from '../../system/services/tokenService';
import { useFeedback } from '@/hooks';

const TokenBalanceWidget: React.FC = () => {
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { sidebarClick } = useFeedback();

  useEffect(() => {
    loadBalance();

    const unsubscribe = TokenService.subscribeToTokenBalance(
      '',
      (newBalance) => {
        setBalance(newBalance);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const loadBalance = async () => {
    try {
      const result = await TokenService.getTokenBalance();
      setBalance(result);
    } catch (error) {
      console.error('Error loading token balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    sidebarClick();
    navigate('/settings?tab=subscription');
  };

  if (isLoading) {
    return null;
  }

  if (!balance) {
    return null;
  }

  const getVariant = () => {
    if (balance.balance < 50) return 'critical';
    if (balance.balance < 200) return 'warning';
    return 'success';
  };

  const variant = getVariant();
  const isLow = balance.balance < 200;

  const getBackgroundGradient = () => {
    switch (variant) {
      case 'critical':
        return 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(220, 38, 38, 0.08))';
      case 'warning':
        return 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.08))';
      default:
        return 'linear-gradient(135deg, rgba(255, 107, 53, 0.12), rgba(253, 200, 48, 0.08))';
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'critical':
        return 'rgba(239, 68, 68, 0.35)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.35)';
      default:
        return 'rgba(247, 147, 30, 0.35)';
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-3 py-3 rounded-xl transition-all group hover:bg-white/5 relative"
      style={{
        background: getBackgroundGradient(),
        border: `1.5px solid ${getBorderColor()}`,
        animation: isLow ? 'pulse-subtle 3s ease-in-out infinite' : 'none'
      }}
    >
      <style>
        {`
          @keyframes pulse-subtle {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.95;
              transform: scale(0.995);
            }
          }
        `}
      </style>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <TokenIcon
            size={36}
            variant={variant}
            withGlow={true}
          />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="text-sm font-bold text-white truncate" style={{
            textShadow: isLow ? '0 0 8px rgba(255, 255, 255, 0.3)' : 'none'
          }}>
            {TokenService.formatTokenAmount(balance.balance)}
          </div>
          <div className="text-xxs text-white/60 truncate mt-0.5">
            {isLow ? 'Recharger mes tokens' : 'Tokens disponibles'}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1">
          {isLow && (
            <SpatialIcon
              Icon={ICONS.AlertCircle}
              size={14}
              className="opacity-70"
              style={{
                color: variant === 'critical' ? '#EF4444' : '#F59E0B'
              }}
            />
          )}
          <SpatialIcon
            Icon={ICONS.ChevronRight}
            size={14}
            className="opacity-40 group-hover:opacity-70 transition-opacity"
          />
        </div>
      </div>
    </button>
  );
};

export default TokenBalanceWidget;
