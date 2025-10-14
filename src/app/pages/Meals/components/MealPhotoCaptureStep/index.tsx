import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CaptureGuide from './CaptureGuide';
import CapturedPhotoDisplay from './CapturedPhotoDisplay';
import ReadyForProcessing from './ReadyForProcessing';
import NavigationControls from './NavigationControls';
import MealProgressHeader from '../MealProgressHeader';

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
  onPhotoCapture: (file: File, captureReport: any) => void;
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
  onPhotoCapture,
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
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

        {/* Ready for Processing */}
        {capturedPhoto && (
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
    </div>
  );
};

export default MealPhotoCaptureStep;