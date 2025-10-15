import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CaptureGuide from './CaptureGuide';
import CapturedPhotoDisplay from './CapturedPhotoDisplay';
import ReadyForProcessing from './ReadyForProcessing';
import NavigationControls from './NavigationControls';
import MealProgressHeader from '../MealProgressHeader';
import BenefitsInfoCard, { Benefit } from '../../../../../ui/cards/BenefitsInfoCard';
import BarcodeScannerView from './BarcodeScannerView';
import ScannedProductCard from './ScannedProductCard';
import type { ScannedProduct } from '../MealScanFlow/ScanFlowState';

interface CapturedMealPhoto {
  file: File;
  url: string;
  validationResult: {
    isValid: boolean;
    issues: string[];
    confidence: number;
  };
  captureReport: any;
}


interface MealPhotoCaptureStepProps {
  capturedPhoto: CapturedMealPhoto | null;
  scannedProducts: ScannedProduct[];
  onPhotoCapture: (file: File, captureReport: any) => void;
  onProductScanned: (product: ScannedProduct) => void;
  onProductPortionChange: (barcode: string, multiplier: number) => void;
  onProductRemove: (barcode: string) => void;
  onRetake: () => void;
  onBack: () => void;
  onProceedToProcessing: () => void;
  isProcessingInProgress: boolean;
  readyForProcessingRef: React.RefObject<HTMLDivElement>;
  progress: number;
  progressMessage: string;
  progressSubMessage: string;
}

/**
 * Meal Photo Capture Step - Main Component
 * Handles photo capture flow for meal scanning
 */
const MealPhotoCaptureStep: React.FC<MealPhotoCaptureStepProps> = ({
  capturedPhoto,
  scannedProducts,
  onPhotoCapture,
  onProductScanned,
  onProductPortionChange,
  onProductRemove,
  onRetake,
  onBack,
  onProceedToProcessing,
  isProcessingInProgress,
  readyForProcessingRef,
  progress,
  progressMessage,
  progressSubMessage,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const mealScanBenefits: Benefit[] = [
    {
      id: 'nutrition-tracking',
      icon: 'TrendingUp',
      color: '#22C55E',
      title: 'Suivi Nutritionnel',
      description: 'Analysez vos apports en macronutriments et calories'
    },
    {
      id: 'ai-detection',
      icon: 'Zap',
      color: '#10B981',
      title: 'Détection IA',
      description: 'Identification automatique des aliments et portions'
    },
    {
      id: 'personalized-insights',
      icon: 'Target',
      color: '#059669',
      title: 'Conseils Personnalisés',
      description: 'Recommandations adaptées à vos objectifs'
    }
  ];

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handleBarcodeClick = () => {
    setShowBarcodeScanner(true);
  };

  const handleBarcodeClose = () => {
    setShowBarcodeScanner(false);
  };

  const handleProductScanned = (product: ScannedProduct) => {
    onProductScanned(product);
    setShowBarcodeScanner(false);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsValidating(true);

    try {
      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const captureReport = {
        validation: {
          isValid: true,
          issues: [],
          confidence: 0.9,
        },
        metadata: {
          fileSize: file.size,
          dimensions: { width: 1920, height: 1080 },
          timestamp: new Date().toISOString(),
        }
      };

      onPhotoCapture(file, captureReport);
      setShowSuccessAnimation(true);
      
      // Hide success animation after delay
      setTimeout(() => setShowSuccessAnimation(false), 2000);

    } catch (error) {
      console.error('Photo validation failed:', error);
    } finally {
      setIsValidating(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div 
      className="space-y-6 pb-24" 
    >
      {/* MealProgressHeader au-dessus de tout */}
      <MealProgressHeader
        currentStep="capture"
        progress={progress}
        message={progressMessage}
        subMessage={progressSubMessage}
      />
      
      {/* Main Content */}
      <div 
        className="space-y-6 mt-6" 
      >
        {!capturedPhoto ? (
          <div className="mt-6">
            <CaptureGuide
              isValidating={isValidating}
              onCameraClick={handleCameraClick}
              onGalleryClick={handleGalleryClick}
              onBarcodeClick={handleBarcodeClick}
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="captured"
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CapturedPhotoDisplay
                capturedPhoto={capturedPhoto}
                showSuccessAnimation={showSuccessAnimation}
                onRetake={onRetake}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Scanned Products List */}
        {scannedProducts.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <span>Produits scannés</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                {scannedProducts.length}
              </span>
            </h3>
            {scannedProducts.map((product) => (
              <ScannedProductCard
                key={product.barcode}
                product={product}
                onPortionChange={onProductPortionChange}
                onRemove={onProductRemove}
              />
            ))}
          </div>
        )}

        {/* Ready for Processing */}
        {(capturedPhoto || scannedProducts.length > 0) && (
          <div
            ref={readyForProcessingRef}
            className="mt-8"
          >
            <ReadyForProcessing
              onProceedToProcessing={onProceedToProcessing}
              isProcessingInProgress={isProcessingInProgress}
            />
          </div>
        )}

        {/* Benefits Info Card - Show only when no photo or products */}
        {!capturedPhoto && scannedProducts.length === 0 && (
          <BenefitsInfoCard
            benefits={mealScanBenefits}
            themeColor="#10B981"
            title="Pourquoi scanner mes repas ?"
          />
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        capture="environment"
      />
      
      {/* Hidden Gallery Input */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Navigation Controls - Fixed at bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 z-50"
      >
        <NavigationControls
          capturedPhoto={capturedPhoto}
          onBack={onBack}
        />
      </div>

      {/* Barcode Scanner Modal */}
      {showBarcodeScanner && (
        <BarcodeScannerView
          onProductScanned={handleProductScanned}
          onClose={handleBarcodeClose}
        />
      )}
    </div>
  );
};

export default MealPhotoCaptureStep;