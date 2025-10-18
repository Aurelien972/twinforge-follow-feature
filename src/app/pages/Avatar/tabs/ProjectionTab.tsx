import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { ProjectionControlPanel, type ProjectionParams } from '../../BodyProjection/ProjectionControlPanel';
import { ProjectionMetricsDisplay } from '../../BodyProjection/ProjectionMetricsDisplay';
import { SingleProjectionViewer } from '../../BodyProjection/SingleProjectionViewer';
import { useBodyProjection } from '../../../../hooks/useBodyProjection';
import { useUserStore } from '../../../../system/store/userStore';
import { useFeedback } from '../../../../hooks/useFeedback';
import { useBodyScanData } from '../../../../hooks/useBodyScanData';
import SpatialIcon from '../../../../ui/icons/SpatialIcon';
import ProjectionTabSkeleton from '../../../../ui/components/skeletons/ProjectionTabSkeleton';
import logger from '../../../../lib/utils/logger';
import { usePerformanceMode } from '../../../../system/context/PerformanceModeContext';
import { ConditionalMotion } from '../../../../lib/motion/ConditionalMotion';

const ProjectionTab: React.FC = () => {
  const { profile } = useUserStore();
  const { bodyScanData: bodyScan, isLoading: profileLoading } = useBodyScanData();
  const [currentGender, setCurrentGender] = useState<'male' | 'female'>('female');
  const [isComponentMounting, setIsComponentMounting] = useState(true);
  const [isViewerReady, setIsViewerReady] = useState(false);

  // Minimum display time for skeleton to avoid flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComponentMounting(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Extract current state data from body scan
  useEffect(() => {
    if (profile?.sex) {
      const gender = profile.sex === 'male' ? 'male' : 'female';
      setCurrentGender(gender);
    }
  }, [profile?.sex]);
  const { showError } = useFeedback();

  const [projectionParams, setProjectionParams] = useState<ProjectionParams>({
    activityLevel: 50,
    nutritionQuality: 50,
    caloricBalance: 0,
    timePeriodMonths: 3
  });

  // OPTIMIZED: Ultra-stable callback using ref pattern to eliminate recreation
  const handleParamsChange = useCallback((params: ProjectionParams) => {
    setProjectionParams(params);
  }, []); // Empty deps - callback never recreates

  // Use custom hook for projection calculation
  const { projection, isCalculating, error: projectionError } = useBodyProjection({
    profile,
    bodyScan,
    projectionParams,
    enabled: !profileLoading
  });


  // Show error from projection calculation
  useEffect(() => {
    if (projectionError) {
      showError(projectionError);
    }
  }, [projectionError, showError]);


  // Memoize current metrics to avoid recalculation
  const currentMetrics = useMemo(() => {
    const currentWeight = bodyScan?.weight || profile?.weight || 0;
    const currentHeight = profile?.height || 0;
    const currentBMI = currentWeight && currentHeight
      ? currentWeight / Math.pow(currentHeight / 100, 2)
      : 0;

    return { currentWeight, currentHeight, currentBMI };
  }, [bodyScan?.weight, profile?.weight, profile?.height]);

  // OPTIMIZED: Stable refs pour éviter les re-renders inutiles
  const morphDataRef = useRef<Record<string, number> | undefined>();
  const projectedMorphRef = useRef<Record<string, number> | undefined>();
  const limbMassesRef = useRef<Record<string, number> | undefined>();
  const projectedLimbMassesRef = useRef<Record<string, number> | undefined>();
  const skinToneRef = useRef<any>();

  // OPTIMIZED: Additional debounce for viewer updates (separate from projection calculation)
  const viewerUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingProjectionRef = useRef<any>(null);

  // PHASE 1 OPTIMIZATION: Threshold increased from 0.02 to 0.05 to reduce unnecessary re-renders
  const MORPH_CHANGE_THRESHOLD = 0.05;

  // PHASE 1 OPTIMIZATION: Reduced logging overhead - only log in dev mode
  const areObjectsEqual = useCallback((a: any, b: any, threshold: number = MORPH_CHANGE_THRESHOLD, debugLabel?: string): boolean => {
    if (a === b) {
      return true;
    }
    if (!a || !b) {
      return a === b;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }

    const differences: string[] = [];
    const isEqual = keysA.every(key => {
      const diff = Math.abs((a[key] || 0) - (b[key] || 0));
      const equal = diff < threshold;
      if (!equal && debugLabel && import.meta.env.DEV) {
        differences.push(`${key}: ${a[key]?.toFixed(3)} → ${b[key]?.toFixed(3)} (Δ=${diff.toFixed(3)})`);
      }
      return equal;
    });

    // PHASE 1 OPTIMIZATION: Only log significant changes in dev mode
    if (!isEqual && debugLabel && differences.length > 0 && import.meta.env.DEV) {
      logger.info('PROJECTION_TAB', `${debugLabel}: Detected significant changes`, {
        changedKeys: differences.slice(0, 5),
        totalChanges: differences.length,
        threshold,
        philosophy: 'deep_compare_significant_change'
      });
    }

    return isEqual;
  }, [MORPH_CHANGE_THRESHOLD]);

  // PHASE 1 OPTIMIZATION: Reduced logging - only in dev mode
  const stableMorphData = useMemo(() => {
    if (areObjectsEqual(bodyScan?.morph_values, morphDataRef.current, MORPH_CHANGE_THRESHOLD, 'stableMorphData')) {
      return morphDataRef.current;
    }
    if (import.meta.env.DEV) {
      logger.info('PROJECTION_TAB', 'stableMorphData: New reference created', {
        keyCount: bodyScan?.morph_values ? Object.keys(bodyScan.morph_values).length : 0,
        philosophy: 'morph_cache_miss'
      });
    }
    morphDataRef.current = bodyScan?.morph_values;
    return bodyScan?.morph_values;
  }, [bodyScan?.morph_values, areObjectsEqual, MORPH_CHANGE_THRESHOLD]);

  const stableLimbMasses = useMemo(() => {
    if (areObjectsEqual(bodyScan?.limb_masses, limbMassesRef.current, MORPH_CHANGE_THRESHOLD, 'stableLimbMasses')) {
      return limbMassesRef.current;
    }
    if (import.meta.env.DEV) {
      logger.info('PROJECTION_TAB', 'stableLimbMasses: New reference created', {
        keyCount: bodyScan?.limb_masses ? Object.keys(bodyScan.limb_masses).length : 0,
        philosophy: 'limb_cache_miss'
      });
    }
    limbMassesRef.current = bodyScan?.limb_masses;
    return bodyScan?.limb_masses;
  }, [bodyScan?.limb_masses, areObjectsEqual, MORPH_CHANGE_THRESHOLD]);

  const stableSkinTone = useMemo(() => {
    const current = bodyScan?.skin_tone;
    if (current === skinToneRef.current) return skinToneRef.current;
    skinToneRef.current = current;
    return current;
  }, [bodyScan?.skin_tone]);

  // CRITICAL: Stabilize serverScanId permanently - NEVER allow remount
  // This ref is initialized once and should NEVER change during projection mode
  const stableServerScanIdRef = useRef<string | undefined>(undefined);

  // Initialize stableServerScanId only once when first available
  if (!stableServerScanIdRef.current && bodyScan?.id) {
    stableServerScanIdRef.current = bodyScan.id;
    logger.info('PROJECTION_TAB', '🔒 ServerScanId locked for projection session', {
      lockedId: stableServerScanIdRef.current,
      philosophy: 'permanent_scan_id_lock'
    });
  }

  // Monitor for unexpected changes (should never happen in projection mode)
  useEffect(() => {
    const currentId = bodyScan?.id;
    if (currentId && stableServerScanIdRef.current && currentId !== stableServerScanIdRef.current) {
      logger.error('PROJECTION_TAB', '🚨 CRITICAL: ServerScanId changed during projection session!', {
        lockedId: stableServerScanIdRef.current,
        attemptedNewId: currentId,
        willIgnoreChange: true,
        philosophy: 'scan_id_change_blocked'
      });
      // DO NOT update the ref - keep using the locked ID
    }
  }, [bodyScan?.id]);

  const stableServerScanId = stableServerScanIdRef.current;

  // OPTIMIZED: Projection morphs avec comparaison profonde et debounce supplémentaire
  const [debouncedProjection, setDebouncedProjection] = useState<any>(null);

  useEffect(() => {
    if (!projection) {
      setDebouncedProjection(null);
      return;
    }

    // Clear previous timeout
    if (viewerUpdateTimeoutRef.current) {
      clearTimeout(viewerUpdateTimeoutRef.current);
    }

    // Store pending projection
    pendingProjectionRef.current = projection;

    // Debounce viewer updates by 400ms (on top of calculation debounce)
    viewerUpdateTimeoutRef.current = setTimeout(() => {
      setDebouncedProjection(pendingProjectionRef.current);
    }, 400);

    return () => {
      if (viewerUpdateTimeoutRef.current) {
        clearTimeout(viewerUpdateTimeoutRef.current);
      }
    };
  }, [projection]);

  const stableProjectedMorphs = useMemo(() => {
    const newMorphs = debouncedProjection?.projectedMorphValues;
    if (areObjectsEqual(newMorphs, projectedMorphRef.current, MORPH_CHANGE_THRESHOLD, 'stableProjectedMorphs')) {
      return projectedMorphRef.current;
    }
    if (import.meta.env.DEV) {
      logger.info('PROJECTION_TAB', 'stableProjectedMorphs: New projection applied', {
        keyCount: newMorphs ? Object.keys(newMorphs).length : 0,
        hasDebounced: !!debouncedProjection,
        philosophy: 'projected_morph_cache_miss'
      });
    }
    projectedMorphRef.current = newMorphs;
    return newMorphs;
  }, [debouncedProjection?.projectedMorphValues, areObjectsEqual, MORPH_CHANGE_THRESHOLD]);

  const stableProjectedLimbMasses = useMemo(() => {
    const newLimbMasses = debouncedProjection?.projectedLimbMasses;
    if (areObjectsEqual(newLimbMasses, projectedLimbMassesRef.current, MORPH_CHANGE_THRESHOLD, 'stableProjectedLimbMasses')) {
      return projectedLimbMassesRef.current;
    }
    if (import.meta.env.DEV) {
      logger.info('PROJECTION_TAB', 'stableProjectedLimbMasses: New projection applied', {
        keyCount: newLimbMasses ? Object.keys(newLimbMasses).length : 0,
        philosophy: 'projected_limb_cache_miss'
      });
    }
    projectedLimbMassesRef.current = newLimbMasses;
    return newLimbMasses;
  }, [debouncedProjection?.projectedLimbMasses, areObjectsEqual, MORPH_CHANGE_THRESHOLD]);

  // Combined loading state for skeleton display
  const isFullyLoading = profileLoading || isComponentMounting || (!isViewerReady && !!bodyScan);

  // Callback when viewer is ready
  const handleViewerReady = useCallback(() => {
    setIsViewerReady(true);
    logger.info('PROJECTION_TAB', 'Projection viewer fully initialized');
  }, []);

  // Safety timeout to prevent infinite skeleton
  useEffect(() => {
    if (!isViewerReady && bodyScan?.id) {
      const safetyTimer = setTimeout(() => {
        if (!isViewerReady) {
          logger.warn('PROJECTION_TAB', 'Safety timeout: forcing viewer ready after 10s');
          setIsViewerReady(true);
        }
      }, 10000);
      return () => clearTimeout(safetyTimer);
    }
  }, [isViewerReady, bodyScan?.id]);

  // Show skeleton during initial loading
  if (isFullyLoading && bodyScan) {
    return <ProjectionTabSkeleton />;
  }

  // Enhanced no-scan state with more context
  if (!bodyScan) {
    return (
      <div className="glass-card p-8 text-center">
        <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Scan corporel requis
        </h3>
        <p className="text-white/70 mb-6">
          {profileLoading
            ? 'Chargement de vos données...'
            : 'Vous devez d\'abord effectuer un scan corporel pour utiliser le système de projection.'}
        </p>
        {!profileLoading && (
          <a
            href="/body-scan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600
                       text-white rounded-lg transition-colors"
          >
            Effectuer un scan corporel
          </a>
        )}
      </div>
    );
  }

  // Invalid scan data state
  if (bodyScan && (!bodyScan.morph_values || Object.keys(bodyScan.morph_values).length === 0)) {
    return (
      <div className="glass-card p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Données de scan incomplètes
        </h3>
        <p className="text-white/70 mb-6">
          Votre dernier scan ne contient pas toutes les données nécessaires.
          Veuillez effectuer un nouveau scan corporel.
        </p>
        <a
          href="/body-scan"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600
                     text-white rounded-lg transition-colors"
        >
          Effectuer un nouveau scan
        </a>
      </div>
    );
  }

  return (
    <ConditionalMotion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6 w-full"
    >
      {/* Projection Parameters Section */}
      <div className="w-full">
        <ProjectionControlPanel
          onParamsChange={handleParamsChange}
          initialParams={projectionParams}
          isCalculating={isCalculating}
        />
      </div>

      {/* 3D Viewer Section */}
      <div className="w-full">
        <SingleProjectionViewer
          serverScanId={stableServerScanId}
          currentMorphData={stableMorphData}
          currentLimbMasses={stableLimbMasses}
          currentSkinTone={stableSkinTone}
          currentGender={currentGender}
          projectedMorphData={stableProjectedMorphs}
          projectedLimbMasses={stableProjectedLimbMasses}
          projectedSkinTone={stableSkinTone}
          projectedGender={currentGender}
          isLoading={profileLoading || isCalculating}
          onViewerReady={handleViewerReady}
        />
      </div>

      {/* Metrics Section */}
      <div className="w-full">
        <ProjectionMetricsDisplay
          currentWeight={currentMetrics.currentWeight}
          currentBMI={currentMetrics.currentBMI}
          projection={debouncedProjection}
          isLoading={isCalculating}
        />
      </div>
    </ConditionalMotion>
  );
};

export default ProjectionTab;
