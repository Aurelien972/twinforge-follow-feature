import { FRIDGE_SCAN_STEPS } from '../constants';
import type { FridgeScanPipelineState } from '../types';

export const createNavigationActions = (
  set: (partial: Partial<FridgeScanPipelineState>) => void,
  get: () => FridgeScanPipelineState
) => ({
  goToStep: (step: FridgeScanPipelineState['currentStep']) => {
    const targetStep = FRIDGE_SCAN_STEPS.find(s => s.id === step);
    const updates: Partial<FridgeScanPipelineState> = { 
      currentStep: step,
      simulatedOverallProgress: targetStep?.startProgress || 0
    };
    
    set(updates);
  },

  nextStep: () => {
    const state = get();
    const currentIndex = FRIDGE_SCAN_STEPS.findIndex(s => s.id === state.currentStep);
    if (currentIndex < FRIDGE_SCAN_STEPS.length - 1) {
      set({ currentStep: FRIDGE_SCAN_STEPS[currentIndex + 1].id });
    }
  },

  previousStep: () => {
    const state = get();
    const currentIndex = FRIDGE_SCAN_STEPS.findIndex(s => s.id === state.currentStep);
    if (currentIndex > 0) {
      set({ currentStep: FRIDGE_SCAN_STEPS[currentIndex - 1].id });
    }
  }
});