import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenIcon from '../../ui/icons/TokenIcon';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';
import { TokenService, type TokenBalance } from '../../system/services/tokenService';
import { useFeedback } from '@/hooks';
import { useOverlayStore } from '../../system/store/overlayStore';

const TokenBalanceWidget: React.FC = () => {
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { sidebarClick } = useFeedback();
  const { close } = useOverlayStore();

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
    close(); // Ferme le drawer mobile s'il est ouvert
    navigate('/settings?tab=account');
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
  const isCritical = balance.balance < 50;

  const getWidgetClassName = () => {
    const baseClass = 'sidebar-token-widget';
    if (isCritical) return `${baseClass} sidebar-token-widget--critical`;
    if (isLow) return `${baseClass} sidebar-token-widget--low`;
    return baseClass;
  };

  return (
    <button
      onClick={handleClick}
      className={getWidgetClassName()}
    >
      <div className="sidebar-token-widget-content">
        <div className="sidebar-token-widget-icon">
          <TokenIcon
            size={24}
            variant={variant}
            withGlow={isLow}
          />
        </div>
        <div className="sidebar-token-widget-info">
          <div className="sidebar-token-widget-balance">
            {TokenService.formatTokenAmount(balance.balance)}
          </div>
          <div className="sidebar-token-widget-label">
            {isLow ? 'Recharger mes tokens' : 'Tokens disponibles'}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isLow && (
            <div className="sidebar-token-widget-alert">
              <SpatialIcon
                Icon={ICONS.AlertCircle}
                size={12}
                className="opacity-70"
                style={{
                  color: isCritical ? '#EF4444' : '#F59E0B'
                }}
              />
            </div>
          )}
          <div className="sidebar-token-widget-arrow">
            <SpatialIcon
              Icon={ICONS.ChevronRight}
              size={12}
              className="opacity-40"
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default TokenBalanceWidget;
