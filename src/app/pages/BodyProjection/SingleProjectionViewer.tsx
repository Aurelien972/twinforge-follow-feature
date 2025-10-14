import React, { useMemo, memo } from 'react';
import Avatar3DViewer from '../../../components/3d/Avatar3DViewer/Avatar3DViewer';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';

interface SingleProjectionViewerProps {
  serverScanId?: string;
  currentMorphData?: Record<string, number>;
  currentLimbMasses?: Record<string, number>;
  currentSkinTone?: any;
  currentGender?: 'male' | 'female';
  projectedMorphData?: Record<string, number>;
  projectedLimbMasses?: Record<string, number>;
  projectedSkinTone?: any;
  projectedGender?: 'male' | 'female';
  faceMorphData?: Record<string, number>;
  faceSkinTone?: any;
  isLoading?: boolean;
  onViewerReady?: () => void;
}

// OPTIMIZED: Threshold augmenté à 0.02 pour réduire les updates inutiles sur différences infimes
// Un seuil plus élevé évite les rechargements pour des variations imperceptibles visuellement
const MORPH_EQUALITY_THRESHOLD = 0.02;

// OPTIMIZED: Helper pour comparaison rapide des morphs
function areMorphsEqual(
  prev: Record<string, number> | undefined,
  next: Record<string, number> | undefined,
  threshold: number = MORPH_EQUALITY_THRESHOLD
): boolean {
  if (prev === next) return true;
  if (!prev || !next) return prev === next;

  const keysP = Object.keys(prev);
  const keysN = Object.keys(next);

  if (keysP.length !== keysN.length) return false;

  // OPTIMIZED: Comparaison avec seuil pour éviter les différences infimes
  return keysP.every(key => {
    const diff = Math.abs((prev[key] || 0) - (next[key] || 0));
    return diff < threshold;
  });
}

// OPTIMIZED: Custom comparison function for React.memo
function arePropsEqual(
  prevProps: SingleProjectionViewerProps,
  nextProps: SingleProjectionViewerProps
): boolean {
  // OPTIMIZED: Compare primitive values first (fastest)
  if (
    prevProps.serverScanId !== nextProps.serverScanId ||
    prevProps.currentGender !== nextProps.currentGender ||
    prevProps.projectedGender !== nextProps.projectedGender ||
    prevProps.isLoading !== nextProps.isLoading
  ) {
    return false;
  }

  // OPTIMIZED: Comparaison optimisée avec seuil au lieu de hash
  // Plus rapide et plus précis pour détecter les vrais changements
  if (!areMorphsEqual(prevProps.projectedMorphData, nextProps.projectedMorphData)) {
    return false;
  }

  if (!areMorphsEqual(prevProps.currentMorphData, nextProps.currentMorphData)) {
    return false;
  }

  if (!areMorphsEqual(prevProps.projectedLimbMasses, nextProps.projectedLimbMasses)) {
    return false;
  }

  if (!areMorphsEqual(prevProps.currentLimbMasses, nextProps.currentLimbMasses)) {
    return false;
  }

  // OPTIMIZED: Skin tone comparison (simple reference check is enough)
  if (prevProps.currentSkinTone !== nextProps.currentSkinTone) {
    return false;
  }

  if (prevProps.projectedSkinTone !== nextProps.projectedSkinTone) {
    return false;
  }

  // Props are equal
  return true;
}

const SingleProjectionViewerComponent: React.FC<SingleProjectionViewerProps> = ({
  serverScanId,
  currentMorphData,
  currentLimbMasses,
  currentSkinTone,
  currentGender,
  projectedMorphData,
  projectedLimbMasses,
  projectedSkinTone,
  projectedGender,
  faceMorphData,
  faceSkinTone,
  isLoading = false,
  onViewerReady
}) => {
  // Use projected data if available, otherwise fall back to current data
  const displayMorphData = useMemo(() =>
    projectedMorphData || currentMorphData,
    [projectedMorphData, currentMorphData]
  );

  const displayLimbMasses = useMemo(() =>
    projectedLimbMasses || currentLimbMasses,
    [projectedLimbMasses, currentLimbMasses]
  );

  const displaySkinTone = useMemo(() =>
    projectedSkinTone || currentSkinTone,
    [projectedSkinTone, currentSkinTone]
  );

  const displayGender = useMemo(() =>
    projectedGender || currentGender,
    [projectedGender, currentGender]
  );

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-96 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!serverScanId || !currentMorphData) {
    return (
      <div className="glass-card p-6">
        <div className="h-96 flex items-center justify-center bg-white/5 rounded-lg">
          <p className="text-white/40">Aucun scan disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Calculating indicator */}
      {isLoading && (
        <div className="glass-card p-3 bg-purple-500/20 border border-purple-400/30">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>
            <p className="text-sm text-purple-300 font-medium">
              Calcul de la projection en cours...
            </p>
          </div>
        </div>
      )}

      {/* 3D Viewer */}
      <div className="glass-card p-4 w-full rounded-2xl"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 60%),
            var(--glass-opacity-base)
          `,
          borderColor: 'rgba(16, 185, 129, 0.3)',
          boxShadow: `
            var(--glass-shadow-sm),
            0 0 16px rgba(16, 185, 129, 0.15)
          `
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(16, 185, 129, 0.25))
              `,
              border: '2px solid rgba(16, 185, 129, 0.5)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}
          >
            <SpatialIcon Icon={ICONS.Eye} size={20} style={{ color: '#10B981' }} variant="pure" />
          </div>
          <h3 className="text-lg font-semibold text-white">Visualisation 3D de la Projection</h3>
        </div>
        <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] rounded-xl overflow-hidden">
          <Avatar3DViewer
            key="projection-viewer-stable"
            serverScanId={serverScanId}
            overrideMorphData={displayMorphData}
            overrideLimbMasses={displayLimbMasses}
            overrideSkinTone={displaySkinTone}
            overrideGender={displayGender}
            faceMorphData={faceMorphData}
            faceSkinTone={faceSkinTone}
            showControls={true}
            className="w-full h-full"
            onViewerReady={onViewerReady}
          />
        </div>
      </div>

      {/* Info */}
      <div className="glass-card p-4 bg-white/5 w-full rounded-xl border border-white/10">
        <div className="flex items-start gap-2">
          <SpatialIcon Icon={ICONS.Info} size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/60 leading-relaxed">
            <strong className="text-white/80">Projection en temps réel:</strong> Ajustez les paramètres
            d'activité, nutrition et balance calorique pour visualiser immédiatement l'impact
            sur votre morphologie projetée.
          </p>
        </div>
      </div>
    </div>
  );
};

// Export memoized component with custom comparison
export const SingleProjectionViewer = memo(SingleProjectionViewerComponent, arePropsEqual);
