import React, { Suspense, lazy } from 'react';
import { getMobileConfigInstance } from '../../lib/device/mobileDetector';
import Avatar3DViewerMobileFallback from './Avatar3DViewerMobileFallback';
import { ErrorBoundaryPage } from '../../app/components/ErrorBoundaryPage';

// Lazy load the actual 3D viewer (heavy Three.js dependency)
const Avatar3DViewerActual = lazy(() => import('./Avatar3DViewer'));

interface Avatar3DViewerSafeProps {
  morphPayload?: Record<string, number>;
  skinTone?: string;
  className?: string;
  enableRotation?: boolean;
  autoRotate?: boolean;
  [key: string]: any;
}

/**
 * Safe wrapper for Avatar3DViewer
 * - Detects mobile and shows fallback
 * - Lazy loads Three.js only when needed
 * - Catches errors to prevent white screen
 */
export function Avatar3DViewerSafe(props: Avatar3DViewerSafeProps) {
  const config = getMobileConfigInstance();

  // Mobile: show fallback immediately, no Three.js loading
  if (config.shouldDisableThreeJS) {
    return <Avatar3DViewerMobileFallback {...props} />;
  }

  // Desktop: load actual 3D viewer with error boundary
  return (
    <ErrorBoundaryPage
      pageName="Avatar 3D Viewer"
      fallback={<Avatar3DViewerMobileFallback {...props} />}
    >
      <Suspense fallback={
        <div className="glass-card p-8 text-center">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
          </div>
        </div>
      }>
        <Avatar3DViewerActual {...props} />
      </Suspense>
    </ErrorBoundaryPage>
  );
}

export default Avatar3DViewerSafe;
