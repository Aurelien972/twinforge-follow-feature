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
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
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
  const [barcodeScanMode, setBarcodeScanMode] = useState<'camera' | 'upload' | null>(null);

  // DEBUG: Log barcode scanner state
  React.useEffect(() => {
    console.log('🔍 BARCODE_SCANNER_STATE:', { showBarcodeScanner, barcodeScanMode });
  }, [showBarcodeScanner, barcodeScanMode]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const barcodeImageInputRef = useRef<HTMLInputElement>(null);

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
    console.log('Camera button clicked');
    console.log('fileInputRef.current:', fileInputRef.current);

    if (!fileInputRef.current) {
      console.error('fileInputRef.current is null or undefined');
      return;
    }

    try {
      console.log('Attempting to trigger file input click');
      fileInputRef.current.click();
      console.log('File input click triggered successfully');
    } catch (error) {
      console.error('Error clicking file input:', error);
    }
  };

  const handleGalleryClick = () => {
    console.log('Gallery button clicked');
    console.log('galleryInputRef.current:', galleryInputRef.current);

    if (!galleryInputRef.current) {
      console.error('galleryInputRef.current is null or undefined');
      return;
    }

    try {
      console.log('Attempting to reset and trigger gallery input');
      // Force reset the input value to allow selecting the same file again
      galleryInputRef.current.value = '';
      galleryInputRef.current.click();
      console.log('Gallery input click triggered successfully');
    } catch (error) {
      console.error('Error clicking gallery input:', error);
    }
  };

  const handleBarcodeClick = () => {
    setShowBarcodeScanner(true);
    setBarcodeScanMode('camera');
  };

  const handleBarcodeImageUpload = () => {
    barcodeImageInputRef.current?.click();
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
    console.log('File selected:', file?.name, 'from:', event.target === fileInputRef.current ? 'camera' : 'gallery');

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
      // Reset both file inputs
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (galleryInputRef.current) {
        galleryInputRef.current.value = '';
      }
    }
  };

  return (
    <div
      className="space-y-6 pb-32"
      style={{ minHeight: '100vh' }}
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
              onBarcodeImageUpload={handleBarcodeImageUpload}
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
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <SpatialIcon Icon={ICONS.ScanBarcode} size={20} className="text-indigo-400" />
                <span>Produits scannés</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  {scannedProducts.length}
                </span>
              </h3>
            </div>

            <div className="space-y-3">
              {scannedProducts.map((product) => (
                <ScannedProductCard
                  key={product.barcode}
                  product={product}
                  onPortionChange={onProductPortionChange}
                  onRemove={onProductRemove}
                />
              ))}
            </div>

            {/* Option to add photo for scanned products */}
            {!capturedPhoto && scannedProducts.length > 0 && (
              <div className="mt-4">
                <GlassCard
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(99, 102, 241, 0.05)',
                    borderColor: 'rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <p className="text-gray-300 text-sm mb-3">
                    Ajouter une photo pour enrichir votre analyse nutritionnelle
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCameraClick}
                      className="flex-1 btn-glass touch-feedback-css"
                      style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderColor: 'rgba(16, 185, 129, 0.25)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <SpatialIcon Icon={ICONS.Camera} size={16} />
                        <span className="text-sm font-medium">Appareil photo</span>
                      </div>
                    </button>
                    <button
                      onClick={handleGalleryClick}
                      className="flex-1 btn-glass touch-feedback-css"
                      style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderColor: 'rgba(16, 185, 129, 0.25)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <SpatialIcon Icon={ICONS.Image} size={16} />
                        <span className="text-sm font-medium">Galerie</span>
                      </div>
                    </button>
                  </div>
                </GlassCard>
              </div>
            )}
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
              hasPhoto={!!capturedPhoto}
              hasScannedProducts={scannedProducts.length > 0}
              scannedProductsCount={scannedProducts.length}
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
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
          opacity: 0,
          pointerEvents: 'none'
        }}
        capture="environment"
        data-testid="camera-file-input"
      />
      
      {/* Hidden Gallery Input */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
          opacity: 0,
          pointerEvents: 'none'
        }}
        data-testid="gallery-file-input"
      />

      {/* Hidden Barcode Image Input */}
      <input
        ref={barcodeImageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setShowBarcodeScanner(true);
            setBarcodeScanMode('upload');
          }
        }}
        className="hidden"
      />

      {/* Navigation Controls - Fixed at bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 z-50"
        style={{
          pointerEvents: 'none'
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <NavigationControls
            capturedPhoto={capturedPhoto}
            onBack={onBack}
          />
        </div>
      </div>

      {/* Barcode Scanner Inline Component */}
      {showBarcodeScanner && (
        <BarcodeScannerView
          onProductScanned={handleProductScanned}
          onClose={handleBarcodeClose}
          mode={barcodeScanMode}
          uploadedImage={barcodeScanMode === 'upload' ? barcodeImageInputRef.current?.files?.[0] : undefined}
        />
      )}
    </div>
  );
};

export default MealPhotoCaptureStep;