/**
 * useBasicHealthTabCoordinator Hook
 * Central coordinator for all Basic Health tab sub-forms
 * Prevents false positives and synchronizes dirty state across all sections
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import logger from '../../../../lib/utils/logger';

interface SubFormState {
  isDirty: boolean;
  changedFieldsCount: number;
}

interface CoordinatorState {
  bloodType: SubFormState;
  vaccinations: SubFormState;
  medicalConditions: SubFormState;
  allergies: SubFormState;
}

interface UseBasicHealthTabCoordinatorOptions {
  bloodTypeState: SubFormState;
  vaccinationsState: SubFormState;
  medicalConditionsState: SubFormState;
  allergiesState: SubFormState;
}

const INITIALIZATION_DELAY_MS = 800; // Wait 800ms after mount before tracking changes

export function useBasicHealthTabCoordinator({
  bloodTypeState,
  vaccinationsState,
  medicalConditionsState,
  allergiesState,
}: UseBasicHealthTabCoordinatorOptions) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasAnyChanges, setHasAnyChanges] = useState(false);
  const initTimerRef = useRef<number | null>(null);
  const mountTimeRef = useRef<number>(Date.now());

  // Initialize: wait for all data to load from database
  useEffect(() => {
    logger.info('BASIC_HEALTH_COORDINATOR', 'Starting initialization period', {
      delayMs: INITIALIZATION_DELAY_MS,
      timestamp: new Date().toISOString(),
    });

    initTimerRef.current = window.setTimeout(() => {
      setIsInitializing(false);
      logger.info('BASIC_HEALTH_COORDINATOR', 'Initialization period complete', {
        elapsedMs: Date.now() - mountTimeRef.current,
        timestamp: new Date().toISOString(),
      });
    }, INITIALIZATION_DELAY_MS);

    return () => {
      if (initTimerRef.current) {
        clearTimeout(initTimerRef.current);
      }
    };
  }, []);

  // Calculate global dirty state, but only after initialization
  useEffect(() => {
    if (isInitializing) {
      // During initialization, force dirty state to false
      setHasAnyChanges(false);
      return;
    }

    const anyDirty =
      bloodTypeState.isDirty ||
      vaccinationsState.isDirty ||
      medicalConditionsState.isDirty ||
      allergiesState.isDirty;

    const totalChangedFields =
      bloodTypeState.changedFieldsCount +
      vaccinationsState.changedFieldsCount +
      medicalConditionsState.changedFieldsCount +
      allergiesState.changedFieldsCount;

    // Only log state changes after initialization
    if (hasAnyChanges !== anyDirty) {
      logger.info('BASIC_HEALTH_COORDINATOR', 'Global dirty state changed', {
        wasDirty: hasAnyChanges,
        nowDirty: anyDirty,
        breakdown: {
          bloodType: bloodTypeState.isDirty,
          vaccinations: vaccinationsState.isDirty,
          medicalConditions: medicalConditionsState.isDirty,
          allergies: allergiesState.isDirty,
        },
        totalChangedFields,
        timestamp: new Date().toISOString(),
      });
    }

    setHasAnyChanges(anyDirty);
  }, [
    isInitializing,
    bloodTypeState.isDirty,
    vaccinationsState.isDirty,
    medicalConditionsState.isDirty,
    allergiesState.isDirty,
    bloodTypeState.changedFieldsCount,
    vaccinationsState.changedFieldsCount,
    medicalConditionsState.changedFieldsCount,
    allergiesState.changedFieldsCount,
    hasAnyChanges,
  ]);

  // Reset dirty state manually (call after successful save)
  const resetAllDirtyStates = useCallback(() => {
    logger.info('BASIC_HEALTH_COORDINATOR', 'Manually resetting all dirty states', {
      timestamp: new Date().toISOString(),
    });
    setHasAnyChanges(false);
  }, []);

  // Calculate total changed fields count
  const totalChangedFields =
    bloodTypeState.changedFieldsCount +
    vaccinationsState.changedFieldsCount +
    medicalConditionsState.changedFieldsCount +
    allergiesState.changedFieldsCount;

  return {
    isInitializing,
    hasAnyChanges: isInitializing ? false : hasAnyChanges, // Force false during initialization
    totalChangedFields,
    resetAllDirtyStates,
    breakdown: {
      bloodType: bloodTypeState.isDirty,
      vaccinations: vaccinationsState.isDirty,
      medicalConditions: medicalConditionsState.isDirty,
      allergies: allergiesState.isDirty,
    },
  };
}

export default useBasicHealthTabCoordinator;
