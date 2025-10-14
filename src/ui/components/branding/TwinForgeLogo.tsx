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
          gap: '12px',
          height: '100%'
        }}
      >
        <ForgeHammerIcon
          width={52}
          height={43}
          isHovered={isHovered}
        />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0', marginLeft: '-2px' }}>
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
              position: 'relative',
              top: '1px',
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
        gap: '10px'
      }}
    >
      <ForgeHammerIcon
        width={40}
        height={33}
        isHovered={isHovered}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', alignItems: 'flex-start', marginLeft: '-1px' }}>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            color: '#E5E7EB',
            lineHeight: 1,
            textTransform: 'uppercase',
            filter: isHovered
              ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))'
              : 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.15))',
            transition: 'filter 300ms ease'
          }}
        >
          TWIN
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            textTransform: 'uppercase',
            position: 'relative',
            top: '0.5px',
            filter: isHovered
              ? 'drop-shadow(0 0 10px rgba(253, 200, 48, 0.4))'
              : 'drop-shadow(0 0 5px rgba(247, 147, 30, 0.25))',
            transition: 'filter 300ms ease'
          }}
        >
          FØRGE
        </span>
      </div>
    </div>
  );
};

export default TwinForgeLogo;
