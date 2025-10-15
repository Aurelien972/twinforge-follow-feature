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
import type { ScannedProduct, ScannedBarcode, ScanType } from '../MealScanFlow/ScanFlowState';
import ScanTypeSelector from './ScanTypeSelector';

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
  scanType: ScanType;
  onSelectScanType: (scanType: ScanType) => void;
  capturedPhoto: CapturedMealPhoto | null;
  scannedBarcodes: ScannedBarcode[];
  scannedProducts: ScannedProduct[];
  onPhotoCapture: (file: File, captureReport: any) => void;
  onBarcodeDetected: (barcode: ScannedBarcode) => void;
  onProductScanned: (product: ScannedProduct) => void;
  onProductPortionChange: (barcode: string, multiplier: number) => void;
  onProductRemove: (barcode: string) => void;
  onBarcodePortionChange: (barcode: string, multiplier: number) => void;
  onBarcodeRemove: (barcode: string) => void;
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
  scanType,
  onSelectScanType,
  capturedPhoto,
  scannedBarcodes,
  scannedProducts,
  onPhotoCapture,
  onBarcodeDetected,
  onProductScanned,
  onProductPortionChange,
  onProductRemove,
  onBarcodePortionChange,
  onBarcodeRemove,
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

  const handleBarcodeDetected = (barcode: ScannedBarcode) => {
    onBarcodeDetected(barcode);
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

      {/* Scan Type Toggle Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => onSelectScanType('photo-analysis')}
          className={`flex-1 p-4 rounded-xl transition-all touch-feedback-css ${
            scanType === 'photo-analysis' ? 'btn-active' : ''
          }`}
          style={{
            background:
              scanType === 'photo-analysis'
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.15))'
                : 'rgba(107, 114, 128, 0.1)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor:
              scanType === 'photo-analysis'
                ? 'rgba(16, 185, 129, 0.5)'
                : 'rgba(107, 114, 128, 0.3)',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <SpatialIcon
              Icon={ICONS.Camera}
              size={24}
              className={scanType === 'photo-analysis' ? 'text-emerald-300' : 'text-gray-400'}
            />
            <span
              className={`font-semibold text-sm ${
                scanType === 'photo-analysis' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Scan Repas IA
            </span>
          </div>
        </button>

        <button
          onClick={() => onSelectScanType('barcode-scan')}
          className={`flex-1 p-4 rounded-xl transition-all touch-feedback-css ${
            scanType === 'barcode-scan' ? 'btn-active' : ''
          }`}
          style={{
            background:
              scanType === 'barcode-scan'
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.15))'
                : 'rgba(107, 114, 128, 0.1)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor:
              scanType === 'barcode-scan'
                ? 'rgba(99, 102, 241, 0.5)'
                : 'rgba(107, 114, 128, 0.3)',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <SpatialIcon
              Icon={ICONS.ScanBarcode}
              size={24}
              className={scanType === 'barcode-scan' ? 'text-indigo-300' : 'text-gray-400'}
            />
            <span
              className={`font-semibold text-sm ${
                scanType === 'barcode-scan' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Code-Barre
            </span>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {scanType === 'photo-analysis' && !capturedPhoto && (
            <div className="mt-6">
              <CaptureGuide
                isValidating={isValidating}
                onCameraClick={handleCameraClick}
                onGalleryClick={handleGalleryClick}
                onBarcodeClick={handleBarcodeClick}
                onBarcodeImageUpload={handleBarcodeImageUpload}
              />
            </div>
          )}

          {scanType === 'photo-analysis' && capturedPhoto && (
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

          {scanType === 'barcode-scan' && scannedBarcodes.length === 0 && scannedProducts.length === 0 && (
            <div className="mt-6">
              <GlassCard
                className="p-6"
                style={{
                  background: `
                    radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
                    radial-gradient(circle at 70% 80%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
                    var(--glass-opacity)
                  `,
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  boxShadow: `
                    0 12px 40px rgba(0, 0, 0, 0.25),
                    0 0 30px rgba(99, 102, 241, 0.15),
                    inset 0 2px 0 rgba(255, 255, 255, 0.15)
                  `
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `
                          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
                          linear-gradient(135deg, rgba(99, 102, 241, 0.45), rgba(79, 70, 229, 0.35))
                        `,
                        border: '2px solid rgba(99, 102, 241, 0.6)',
                        boxShadow: `
                          0 0 20px rgba(99, 102, 241, 0.6),
                          0 0 40px rgba(99, 102, 241, 0.3),
                          inset 0 2px 0 rgba(255,255,255,0.35),
                          inset 0 -2px 0 rgba(0,0,0,0.2)
                        `
                      }}
                    >
                      <SpatialIcon
                        Icon={ICONS.ScanBarcode}
                        size={18}
                        style={{
                          color: '#fff',
                          filter: 'drop-shadow(0 2px 8px rgba(99, 102, 241, 0.9)) drop-shadow(0 0 4px rgba(255,255,255,0.5))'
                        }}
                      />
                    </div>
                    <h4
                      className="text-white font-bold text-base"
                      style={{
                        textShadow: '0 2px 8px rgba(99, 102, 241, 0.4), 0 0 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      Scan Code-Barre
                    </h4>
                  </div>
                  <div
                    className="flex items-center gap-2 px-3 py-1.5"
                    style={{
                      background: `
                        linear-gradient(135deg,
                          rgba(59, 130, 246, 0.2),
                          rgba(37, 99, 235, 0.15)
                        )
                      `,
                      border: '2px solid rgba(59, 130, 246, 0.4)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(12px) saturate(130%)',
                      boxShadow: `
                        0 4px 16px rgba(59, 130, 246, 0.25),
                        0 0 24px rgba(59, 130, 246, 0.15),
                        inset 0 1px 0 rgba(255,255,255,0.2)
                      `
                    }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: '#3B82F6',
                        boxShadow: '0 0 10px #3B82F6'
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: '#fff',
                        textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      En attente
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className="relative aspect-[4/3] rounded-xl overflow-visible"
                    style={{
                      background: `
                        radial-gradient(circle at 40% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
                        radial-gradient(circle at 60% 70%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
                        linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(79, 70, 229, 0.06))
                      `,
                      border: '2px dashed rgba(99, 102, 241, 0.35)',
                      backdropFilter: 'blur(8px) saturate(120%)'
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div
                          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center relative"
                          style={{
                            background: `
                              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%),
                              linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.35))
                            `,
                            border: '2px solid rgba(99, 102, 241, 0.5)',
                            boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)'
                          }}
                        >
                          <SpatialIcon
                            Icon={ICONS.ScanBarcode}
                            size={48}
                            className="text-indigo-400"
                            style={{
                              filter: 'drop-shadow(0 2px 8px rgba(99, 102, 241, 0.5))'
                            }}
                          />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold mb-2 text-base md:text-lg">
                            Scan Rapide
                          </h5>
                          <p className="text-indigo-200 text-xs md:text-sm leading-relaxed max-w-full sm:max-w-xs mx-auto px-2 sm:px-0">
                            Scannez le code-barre pour une analyse instantanée du produit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBarcodeClick}
                    className="w-full btn-glass--primary touch-feedback-css"
                    style={{
                      background: `
                        linear-gradient(135deg,
                          rgba(99, 102, 241, 0.8),
                          rgba(79, 70, 229, 0.6)
                        )
                      `,
                      backdropFilter: 'blur(20px) saturate(160%)',
                      boxShadow: `
                        0 12px 40px rgba(99, 102, 241, 0.4),
                        0 0 60px rgba(99, 102, 241, 0.3),
                        inset 0 3px 0 rgba(255,255,255,0.3),
                        inset 0 -3px 0 rgba(0,0,0,0.2)
                      `,
                      border: '2px solid rgba(99, 102, 241, 0.6)'
                    }}
                  >
                    <div className="relative flex items-center justify-center gap-3">
                      <SpatialIcon
                        Icon={ICONS.ScanBarcode}
                        size={24}
                        className="text-white"
                        style={{
                          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                        }}
                      />
                      <span className="font-bold text-lg">
                        Scanner Code-Barre
                      </span>
                    </div>
                  </button>
                </div>
              </GlassCard>
            </div>
          )}

        {/* Scanned Barcodes List */}
        {scannedBarcodes.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <SpatialIcon Icon={ICONS.ScanBarcode} size={20} className="text-indigo-400" />
                <span>Codes-barres détectés</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  {scannedBarcodes.length}
                </span>
              </h3>
            </div>

            <div className="space-y-3">
              {scannedBarcodes.map((barcodeItem, index) => (
                <GlassCard
                  key={`barcode-${barcodeItem.barcode}-${index}-${barcodeItem.scannedAt}`}
                  className="p-4"
                  style={{
                    background: 'rgba(99, 102, 241, 0.08)',
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(79, 70, 229, 0.2))',
                          border: '1px solid rgba(99, 102, 241, 0.4)',
                        }}
                      >
                        <SpatialIcon Icon={ICONS.ScanBarcode} size={24} className="text-indigo-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm mb-1">{barcodeItem.barcode}</p>
                        <p className="text-indigo-300 text-xs">En attente d'analyse</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onBarcodeRemove(barcodeItem.barcode)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/20"
                      style={{
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                      }}
                    >
                      <SpatialIcon Icon={ICONS.X} size={16} className="text-red-400" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Option to add photo for scanned barcodes */}
            {!capturedPhoto && scannedBarcodes.length > 0 && (
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

        {/* Scanned Products List (already analyzed) */}
        {scannedProducts.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <SpatialIcon Icon={ICONS.Check} size={20} className="text-green-400" />
                <span>Produits analysés</span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-bold">
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
          </div>
        )}

        {/* Ready for Processing */}
        {(capturedPhoto || scannedBarcodes.length > 0 || scannedProducts.length > 0) && (
          <div
            ref={readyForProcessingRef}
            className="mt-8"
          >
            <ReadyForProcessing
              onProceedToProcessing={onProceedToProcessing}
              isProcessingInProgress={isProcessingInProgress}
              hasPhoto={!!capturedPhoto}
              hasScannedBarcodes={scannedBarcodes.length > 0}
              hasScannedProducts={scannedProducts.length > 0}
              scannedBarcodesCount={scannedBarcodes.length}
              scannedProductsCount={scannedProducts.length}
            />
          </div>
        )}

        {/* Benefits Info Card - Show only when no photo or products AND photo-analysis selected */}
        {scanType === 'photo-analysis' && !capturedPhoto && scannedBarcodes.length === 0 && scannedProducts.length === 0 && (
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
          onBarcodeDetected={handleBarcodeDetected}
          onClose={handleBarcodeClose}
          mode={barcodeScanMode}
          uploadedImage={barcodeScanMode === 'upload' ? barcodeImageInputRef.current?.files?.[0] : undefined}
        />
      )}
    </div>
  );
};

export default MealPhotoCaptureStep;