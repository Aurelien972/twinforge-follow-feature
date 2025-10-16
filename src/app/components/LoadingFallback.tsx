import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading Fallback Component
 * Consistent loading state for lazy-loaded routes with enhanced glassmorphism
 */
export const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-transparent loading-minimum gpu-layer">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-8 rounded-2xl relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, color-mix(in srgb, #3B82F6 12%, transparent) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, color-mix(in srgb, #8B5CF6 8%, transparent) 0%, transparent 50%),
            rgba(255, 255, 255, 0.03)
          `,
          backdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 20px color-mix(in srgb, #3B82F6 10%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.15)
          `
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
            opacity: 0.5
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'linear'
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            {/* Animated loader circle */}
            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-full loading-instant gpu-only-transform"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                    linear-gradient(135deg, color-mix(in srgb, #3B82F6 35%, transparent), color-mix(in srgb, #8B5CF6 25%, transparent))
                  `,
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  boxShadow: '0 0 20px color-mix(in srgb, #3B82F6 30%, transparent)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTopColor: '#3B82F6',
                  borderRightColor: '#8B5CF6'
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'linear'
                }}
              />
            </div>

            <div>
              <motion.h3
                className="text-white font-semibold text-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Chargement...
              </motion.h3>
              <motion.p
                className="text-white/60 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Préparation de votre espace
              </motion.p>
            </div>
          </div>

          {/* Animated dots */}
          <div className="flex items-center gap-2 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;