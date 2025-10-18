import React from 'react';
import { motion } from '@/lib/motion/PerformanceMotion';
import { usePerformanceMode } from '@/system/context/PerformanceModeContext';

interface SkeletonBaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
  shimmer?: boolean;
  pulse?: boolean;
}

const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  className = '',
  style = {},
  shimmer = true,
  pulse = false
}) => {
  const { isPerformanceMode } = usePerformanceMode();

  const baseStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    background: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  // In performance mode, use simple CSS class instead of animations
  if (isPerformanceMode) {
    return (
      <div
        className={`${className} skeleton-glass-performance`}
        style={baseStyle}
      />
    );
  }

  const shimmerAnimation = shimmer ? {
    animate: {
      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    },
    style: {
      ...baseStyle,
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
      backgroundSize: '200% 100%'
    }
  } : {};

  const pulseAnimation = pulse ? {
    animate: {
      opacity: [0.6, 1, 0.6]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  } : {};

  return (
    <motion.div
      className={className}
      style={shimmer || pulse ? undefined : baseStyle}
      {...(shimmer ? shimmerAnimation : {})}
      {...(pulse ? pulseAnimation : {})}
    />
  );
};

export default SkeletonBase;
