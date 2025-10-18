import React from 'react';
import ForgeHammerIcon from '../../icons/ForgeHammerIcon';
import { usePerformanceMode } from '../../../system/context/PerformanceModeContext';

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
  const { isPerformanceMode, mode } = usePerformanceMode();

  if (isDesktop) {
    return (
      <div
        className={`flex items-center ${className}`}
        style={{
          transition: mode === 'quality' ? 'all 300ms ease-out' : 'none',
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
              filter: mode === 'quality'
                ? (isHovered
                  ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
                  : 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.15))')
                : 'none',
              transition: mode === 'quality' ? 'filter 300ms ease' : 'none'
            }}
          >
            TWIN
          </span>
          {mode === 'high-performance' ? (
            // Mode Performance: Lettres individuelles avec couleurs distinctes
            <span style={{ display: 'inline-flex', gap: '0' }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '25px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                color: '#FF6B35',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: 'none',
                transition: 'none'
              }}>F</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '25px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                color: '#F89442',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: 'none',
                transition: 'none'
              }}>Ø</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '25px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                color: '#F7931E',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: 'none',
                transition: 'none'
              }}>R</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '25px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                color: '#FCBB45',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: 'none',
                transition: 'none'
              }}>G</span>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '25px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                color: '#FDC830',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: 'none',
                transition: 'none'
              }}>E</span>
            </span>
          ) : (
            // Mode Balanced & Quality: Gradient
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
                filter: mode === 'quality'
                  ? (isHovered
                    ? 'drop-shadow(0 0 12px rgba(253, 200, 48, 0.5))'
                    : 'drop-shadow(0 0 6px rgba(247, 147, 30, 0.3))')
                  : 'none',
                transition: mode === 'quality' ? 'filter 300ms ease' : 'none'
              }}
            >
              FØRGE
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        transition: mode === 'quality' ? 'all 300ms ease-out' : 'none',
        gap: '8px',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <ForgeHammerIcon
          width={42}
          height={50}
          isHovered={isHovered}
        />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        transform: 'translateY(2px)'
      }}>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            color: '#E5E7EB',
            lineHeight: 1,
            textTransform: 'uppercase',
            filter: mode === 'quality'
              ? (isHovered
                ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))'
                : 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.15))')
              : 'none',
            transition: mode === 'quality' ? 'filter 300ms ease' : 'none'
          }}
        >
          TWIN
        </span>
        {mode === 'high-performance' ? (
          // Mode Performance: Lettres individuelles avec couleurs distinctes
          <span style={{ display: 'inline-flex', gap: '0' }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              color: '#FF6B35',
              lineHeight: 1,
              textTransform: 'uppercase',
              filter: 'none',
              transition: 'none'
            }}>F</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              color: '#F89442',
              lineHeight: 1,
              textTransform: 'uppercase',
              filter: 'none',
              transition: 'none'
            }}>Ø</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              color: '#F7931E',
              lineHeight: 1,
              textTransform: 'uppercase',
              filter: 'none',
              transition: 'none'
            }}>R</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              color: '#FCBB45',
              lineHeight: 1,
              textTransform: 'uppercase',
              filter: 'none',
              transition: 'none'
            }}>G</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              color: '#FDC830',
              lineHeight: 1,
              textTransform: 'uppercase',
              filter: 'none',
              transition: 'none'
            }}>E</span>
          </span>
        ) : (
          // Mode Balanced & Quality: Gradient
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
              filter: mode === 'quality'
                ? (isHovered
                  ? 'drop-shadow(0 0 10px rgba(253, 200, 48, 0.4))'
                  : 'drop-shadow(0 0 5px rgba(247, 147, 30, 0.25))')
                : 'none',
              transition: mode === 'quality' ? 'filter 300ms ease' : 'none'
            }}
          >
            FØRGE
          </span>
        )}
      </div>
    </div>
  );
};

export default TwinForgeLogo;
