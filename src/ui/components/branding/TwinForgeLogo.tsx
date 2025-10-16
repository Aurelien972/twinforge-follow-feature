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
        className={`flex flex-col items-center ${className}`}
        style={{
          transition: 'all 300ms ease-out',
          gap: '6px'
        }}
      >
        {/* T marteau dans une glass card */}
        <div
          style={{
            position: 'relative',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `
              radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.22) 0%, transparent 50%),
              radial-gradient(circle at 65% 65%, rgba(247, 147, 30, 0.18) 0%, transparent 60%),
              linear-gradient(135deg, rgba(255, 107, 53, 0.20), rgba(247, 147, 30, 0.15))
            `,
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px) saturate(150%)',
            WebkitBackdropFilter: 'blur(10px) saturate(150%)',
            boxShadow: isHovered
              ? `0 4px 16px rgba(247, 147, 30, 0.3), 0 0 24px rgba(253, 200, 48, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.35)`
              : `0 2px 10px rgba(247, 147, 30, 0.2), 0 0 16px rgba(253, 200, 48, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
            transition: 'all 300ms ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <ForgeHammerIcon
            width={28}
            height={32}
            isHovered={isHovered}
          />
        </div>

        {/* Texte TWINFORGE */}
        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0' }}>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '1px',
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
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '1px',
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
            FORGE
          </span>
        </div>
      </div>
    );
  }

  // Mobile: T marteau dans glass card au-dessus du texte
  return (
    <div
      className={`flex flex-col items-center ${className}`}
      style={{
        transition: 'all 300ms ease-out',
        gap: '4px'
      }}
    >
      {/* T marteau dans une glass card - mobile */}
      <div
        style={{
          position: 'relative',
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `
            radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.22) 0%, transparent 50%),
            radial-gradient(circle at 65% 65%, rgba(247, 147, 30, 0.18) 0%, transparent 60%),
            linear-gradient(135deg, rgba(255, 107, 53, 0.20), rgba(247, 147, 30, 0.15))
          `,
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px) saturate(150%)',
          WebkitBackdropFilter: 'blur(10px) saturate(150%)',
          boxShadow: isHovered
            ? `0 4px 14px rgba(247, 147, 30, 0.3), 0 0 20px rgba(253, 200, 48, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.35)`
            : `0 2px 8px rgba(247, 147, 30, 0.2), 0 0 14px rgba(253, 200, 48, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
          transition: 'all 300ms ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <ForgeHammerIcon
          width={24}
          height={28}
          isHovered={isHovered}
        />
      </div>

      {/* Texte TWINFORGE */}
      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0' }}>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.7px',
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
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.7px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            textTransform: 'uppercase',
            filter: isHovered
              ? 'drop-shadow(0 0 10px rgba(253, 200, 48, 0.4))'
              : 'drop-shadow(0 0 5px rgba(247, 147, 30, 0.25))',
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
