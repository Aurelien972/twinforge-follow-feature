import React from 'react';
import { getMobileConfigInstance } from '../lib/device/mobileDetector';

interface Avatar3DViewerMobileFallbackProps {
  morphPayload?: Record<string, number>;
  skinTone?: string;
  className?: string;
}

/**
 * Mobile Fallback for Avatar3DViewer
 * Shows a placeholder instead of loading heavy Three.js on mobile
 */
export function Avatar3DViewerMobileFallback({
  morphPayload,
  skinTone,
  className = '',
}: Avatar3DViewerMobileFallbackProps) {
  const config = getMobileConfigInstance();

  // On desktop, show nothing (actual 3D viewer will render)
  if (!config.isMobile) {
    return null;
  }

  return (
    <div className={`avatar-3d-fallback ${className}`}>
      <div className="glass-card p-8 text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full mx-auto flex items-center justify-center">
            <svg
              className="w-12 h-12 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">
          Avatar 3D
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          La visualisation 3D est désactivée sur mobile pour des performances optimales.
        </p>

        {morphPayload && Object.keys(morphPayload).length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-2">
              Morphologie détectée
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-300 rounded">
                {Object.keys(morphPayload).length} paramètres
              </span>
              {skinTone && (
                <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded">
                  Carnation détectée
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="text-xs text-gray-500">
            💡 Utilisez un ordinateur pour visualiser votre avatar en 3D
          </p>
        </div>
      </div>
    </div>
  );
}

export default Avatar3DViewerMobileFallback;
