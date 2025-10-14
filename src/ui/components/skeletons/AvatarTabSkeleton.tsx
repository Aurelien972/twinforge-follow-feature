import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../cards/GlassCard';
import SkeletonBase from './SkeletonBase';

interface AvatarTabSkeletonProps {
  className?: string;
}

/**
 * AvatarTabSkeleton - Skeleton animé pour le chargement de l'onglet Avatar
 * Affiche des placeholders pour Avatar3DViewer, BodyMetricsCard et MorphologyInsightsCard
 */
const AvatarTabSkeleton: React.FC<AvatarTabSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-8 w-full ${className}`}>
      {/* 3D Avatar Viewer Skeleton */}
      <GlassCard className="p-6">
        <div className="flex items-center mb-4">
          {/* Header skeleton */}
          <div className="flex items-center gap-2">
            <SkeletonBase
              width="40px"
              height="40px"
              borderRadius="50%"
              shimmer
            />
            <SkeletonBase
              width="150px"
              height="24px"
              shimmer
            />
          </div>
        </div>

        {/* Main viewer skeleton */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.04))',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}
        >
          {/* Center pulsing circle to represent avatar loading */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Outer ring */}
              <motion.div
                className="w-32 h-32 rounded-full border-4"
                style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Inner circle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="w-24 h-24 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0.1))',
                    boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)'
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Loading text */}
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white/70 text-sm font-medium">
                  Chargement de votre avatar...
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner shimmer effect */}
          <motion.div
            className="absolute top-4 right-4 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
      </GlassCard>

      {/* Body Metrics Card Skeleton */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SkeletonBase
              width="40px"
              height="40px"
              borderRadius="50%"
              shimmer
            />
            <SkeletonBase
              width="180px"
              height="20px"
              shimmer
            />
          </div>
          <SkeletonBase
            width="100px"
            height="24px"
            borderRadius="12px"
            shimmer
          />
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <SkeletonBase width="32px" height="32px" borderRadius="8px" shimmer />
                <SkeletonBase width="80px" height="12px" shimmer />
              </div>
              <SkeletonBase width="60px" height="24px" shimmer className="mb-1" />
              <SkeletonBase width="50px" height="14px" shimmer />
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Morphology Insights Card Skeleton */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SkeletonBase
              width="40px"
              height="40px"
              borderRadius="50%"
              shimmer
            />
            <SkeletonBase
              width="200px"
              height="20px"
              shimmer
            />
          </div>
          <SkeletonBase
            width="120px"
            height="24px"
            borderRadius="12px"
            shimmer
          />
        </div>

        {/* Insights Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="p-4 rounded-xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex justify-center mb-3">
                <SkeletonBase width="48px" height="48px" borderRadius="50%" shimmer />
              </div>
              <SkeletonBase width="80%" height="16px" shimmer className="mx-auto mb-2" />
              <SkeletonBase width="60%" height="14px" shimmer className="mx-auto" />
            </motion.div>
          ))}
        </div>

        {/* Summary Card Skeleton */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-4 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <SkeletonBase width="100%" height="14px" shimmer className="mb-2" />
          <SkeletonBase width="90%" height="14px" shimmer className="mb-2" />
          <SkeletonBase width="80%" height="14px" shimmer />
        </motion.div>
      </GlassCard>

      {/* Nouveau Scan Button Skeleton */}
      <div className="mt-8 text-center">
        <SkeletonBase
          width="250px"
          height="56px"
          borderRadius="28px"
          shimmer
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default AvatarTabSkeleton;
