import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const balanceColor = balance.balance < 50 ? '#EF4444' : balance.balance < 200 ? '#F59E0B' : '#10B981';
  const balanceOpacity = balance.balance < 50 ? 1 : 0.9;

  return (
    <button
      onClick={handleClick}
      className="w-full px-3 py-2.5 rounded-xl transition-all group hover:bg-white/5"
      style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.05))',
        border: '1px solid rgba(16, 185, 129, 0.2)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${balanceColor}22, ${balanceColor}11)`,
            border: `1.5px solid ${balanceColor}40`,
            boxShadow: `0 0 12px ${balanceColor}20`,
          }}
        >
          <SpatialIcon
            Icon={ICONS.Coins}
            size={18}
            style={{
              color: balanceColor,
              opacity: balanceOpacity,
              filter: `drop-shadow(0 0 6px ${balanceColor}60)`,
            }}
          />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="text-xs font-semibold text-white truncate">
            {TokenService.formatTokenAmount(balance.balance)} tokens
          </div>
          <div className="text-xxs text-white/50 truncate">
            Reforger
          </div>
        </div>
        <SpatialIcon
          Icon={ICONS.ChevronRight}
          size={14}
          className="flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity"
        />
      </div>
    </button>
  );
};

export default TokenBalanceWidget;
