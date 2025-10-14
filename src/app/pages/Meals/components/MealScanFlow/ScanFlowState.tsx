import React from 'react';

export type MealScanStep = 'capture' | 'processing' | 'results';

export interface CapturedMealPhoto {
  file: File;
  url: string;
  validationResult: {
    isValid: boolean;
    issues: string[];
    confidence: number;
  };
  captureReport: any;
}

export interface ScanFlowState {
  currentStep: MealScanStep;
  capturedPhoto: CapturedMealPhoto | null;
  analysisResults: any;
  isProcessing: boolean;
  progress: number;
  progressMessage: string;
  progressSubMessage: string;
  analysisError: string | null;
  analysisMetadata: any;
}

export const initialScanFlowState: ScanFlowState = {
  currentStep: 'capture',
  capturedPhoto: null,
  analysisResults: null,
  isProcessing: false,
  progress: 0,
  progressMessage: 'Forge du Repas',
  progressSubMessage: 'Capturez votre carburant nutritionnel',
  analysisError: null,
  analysisMetadata: null,
};