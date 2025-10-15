import React from 'react';
import type { MealItem } from '../../../../system/data/repositories/mealsRepo';

export type MealScanStep = 'capture' | 'processing' | 'results';
export type CaptureMode = 'photo' | 'barcode';

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

export interface ScannedProduct {
  barcode: string;
  name: string;
  brand?: string;
  image_url?: string;
  mealItem: MealItem;
  portionMultiplier: number;
  scannedAt: string;
}

export interface ScanFlowState {
  currentStep: MealScanStep;
  captureMode: CaptureMode;
  capturedPhoto: CapturedMealPhoto | null;
  scannedProducts: ScannedProduct[];
  analysisResults: any;
  isProcessing: boolean;
  progress: number;
  progressMessage: string;
  progressSubMessage: string;
  analysisError: string | null;
  analysisMetadata: any;
  isScanningBarcode: boolean;
}

export const initialScanFlowState: ScanFlowState = {
  currentStep: 'capture',
  captureMode: 'photo',
  capturedPhoto: null,
  scannedProducts: [],
  analysisResults: null,
  isProcessing: false,
  progress: 0,
  progressMessage: 'Forge du Repas',
  progressSubMessage: 'Capturez votre carburant nutritionnel',
  analysisError: null,
  analysisMetadata: null,
  isScanningBarcode: false,
};