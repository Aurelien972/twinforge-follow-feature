import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

/**
 * GradientText - Component optimized for performance mode
 *
 * This component ensures gradient text remains visible even in
 * ultra-performance mode by using a dedicated class that bypasses
 * performance mode restrictions.
 */
const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
}) => {
  return (
    <span
      className={`gradient-text-component ${className}`}
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
