import React from 'react';
import ForgeHammerIcon from '../../icons/ForgeHammerIcon';

interface TwinForgeLogoProps {
  variant?: 'desktop' | 'mobile';
  isHovered?: boolean;
  className?: string;
}

export const TwinForgeLogo: React.FC<TwinForgeLogoProps> = ({
  variant = 'desktop',
  isHovered = false,
  className = ''
}) => {
  const isDesktop = variant === 'desktop';

  if (isDesktop) {
    return (
      <div
        className={`flex items-center ${className}`}
        style={{
          transition: 'all 300ms ease-out',
          height: '100%'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0' }}>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '25px',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: '#E5E7EB',
              lineHeight: 1,
              textTransform: 'uppercase',
              filter: isHovered
                ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
                : 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.15))',
              transition: 'filter 300ms ease'
            }}
          >
            TWIN
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '25px',
              fontWeight: 800,
              letterSpacing: '1.2px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              textTransform: 'uppercase',
              filter: isHovered
                ? 'drop-shadow(0 0 12px rgba(253, 200, 48, 0.5))'
                : 'drop-shadow(0 0 6px rgba(247, 147, 30, 0.3))',
              transition: 'filter 300ms ease'
            }}
          >
            FØRGE
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        transition: 'all 300ms ease-out',
        gap: '6px',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <ForgeHammerIcon
          width={32}
          height={38}
          isHovered={isHovered}
        />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        transform: 'translateY(1px)'
      }}>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            color: '#E5E7EB',
            lineHeight: 1,
            textTransform: 'uppercase',
            filter: isHovered
              ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))'
              : 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.15))',
            transition: 'filter 300ms ease'
          }}
        >
          twin
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.6px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            textTransform: 'uppercase',
            filter: isHovered
              ? 'drop-shadow(0 0 8px rgba(253, 200, 48, 0.4))'
              : 'drop-shadow(0 0 4px rgba(247, 147, 30, 0.25))',
            transition: 'filter 300ms ease'
          }}
        >
          FORGE
        </span>
      </div>
    </div>
  );
};

export default TwinForgeLogo;
