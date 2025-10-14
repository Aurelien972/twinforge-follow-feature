import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useBlocker } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useUserStore } from '../../../system/store/userStore';
import { useToast } from '../../../ui/components/ToastProvider';
import { useFeedback } from '../../../hooks';
import { mealsRepo } from '../../../system/data/repositories/mealsRepo';
import MealPhotoCaptureStep from './components/MealPhotoCaptureStep/index';
import MealAnalysisProcessingStep from './components/MealAnalysisProcessingStep/index';
import MealResultsDisplayStep from './components/MealResultsDisplayStep';
import GlassCard from '../../../ui/cards/GlassCard';
import SpatialIcon from '../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../ui/icons/registry';
import PageHeader from '../../../ui/page/PageHeader';
import logger from '../../../lib/utils/logger';
import { initialScanFlowState, type ScanFlowState } from './components/MealScanFlow/ScanFlowState';
import { useScanFlowHandlers } from './components/MealScanFlow/ScanFlowHandlers';
import ScanExitConfirmationModal from './components/MealScanFlow/ScanExitConfirmationModal';
import AIStatusBadge from './components/MealScanFlow/AIStatusBadge';
import { uploadMealPhoto } from '../../../lib/storage/imageUpload';
import Portal from '../../../ui/components/Portal';

/**
 * Meal Scan Flow Page - HARMONISÉ avec MealsPage.tsx
 * Utilise exactement la même structure que les autres pages
 */
const MealScanFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile, authReady, session, user } = useUserStore();
  const { showToast } = useToast();
  const { success, error: errorSound } = useFeedback();

  // State pour le flux de scan de repas
  const [scanFlowState, setScanFlowState] = useState<ScanFlowState>(initialScanFlowState);
  
  // State pour la modal de confirmation de sortie
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  
  // Refs pour éviter les doubles appels
  const clientScanIdRef = useRef<string | null>(null);
  const processingGuardRef = useRef(false);
  const readyForProcessingRef = useRef<HTMLDivElement>(null);
  
  // Get userId from multiple sources with fallback
  const userId = session?.user?.id || user?.id || profile?.userId;

  // Bloquer la navigation si un scan est en cours
  const shouldBlockNavigation = !!(
    scanFlowState.capturedPhoto || 
    scanFlowState.isProcessing || 
    scanFlowState.analysisResults
  );

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => {
      // Ne pas bloquer si on reste sur la même page
      if (currentLocation.pathname === nextLocation.pathname) {
        return false;
      }
      
      // Bloquer seulement si un scan est en cours
      return shouldBlockNavigation;
    }
  );

  // Gérer le blocage de navigation
  React.useEffect(() => {
    if (blocker.state === 'blocked') {
      logger.info('MEAL_SCAN_EXIT', 'Navigation blocked - showing confirmation', {
        currentStep: scanFlowState.currentStep,
        hasCapturedPhoto: !!scanFlowState.capturedPhoto,
        isProcessing: scanFlowState.isProcessing,
        hasResults: !!scanFlowState.analysisResults,
        timestamp: new Date().toISOString()
      });
      
      // Stocker la navigation en attente
      setPendingNavigation(() => () => {
        blocker.proceed();
      });
      
      // Afficher la modal de confirmation
      setShowExitConfirmation(true);
    }
  }, [blocker.state, scanFlowState]);

  // Force scroll to top on step changes
  React.useEffect(() => {
    const scrollToTop = () => {
      // Scroll to top of main content container
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Also scroll window as fallback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Scroll on step changes with delay to allow DOM updates
    const timeoutId = setTimeout(scrollToTop, 100);
    
    logger.debug('MEAL_SCAN_SCROLL', 'Auto scroll triggered on step change', {
      currentStep: scanFlowState.currentStep,
      progress: scanFlowState.progress,
      timestamp: new Date().toISOString()
    });
    
    return () => clearTimeout(timeoutId);
  }, [scanFlowState.currentStep]);

  // Enhanced debugging for auth state - CRITICAL DIAGNOSTIC
  React.useEffect(() => {
    logger.info('MEAL_SCAN_FLOW_AUTH_DEBUG', 'Complete auth state in MealScanFlowPage', {
      // Direct Session Analysis
      hasSession: !!session,
      sessionUserId: session?.user?.id,
      sessionUserEmail: session?.user?.email,
      sessionAccessToken: session?.access_token ? 'present' : 'missing',
      sessionExpiresAt: session?.expires_at,
      
      // Direct User Analysis
      hasUser: !!user,
      userIdDirect: user?.id,
      userEmail: user?.email,
      
      // Profile Analysis
      hasProfile: !!profile,
      profileUserId: profile?.userId,
      profileDisplayName: profile?.displayName,
      profileKeys: profile ? Object.keys(profile) : [],
      
      // Auth Ready State
      authReady,
      
      // Derived userId
      userId
    });
  }, [session, user, profile, authReady, userId]);

  // Get scan flow handlers
  const scanFlowHandlers = useScanFlowHandlers({
    scanFlowState,
    setScanFlowState,
    profile,
    userId,
    clientScanIdRef,
    processingGuardRef,
    readyForProcessingRef,
    showToast,
    success,
    errorSound,
    queryClient,
    onAIError: (error: string) => {
      setScanFlowState(prev => ({ ...prev, analysisError: error }));
      showToast(`Erreur d'analyse: ${error}`, 'error');
      errorSound();
    },
    onSuccess: () => {
      success();
    }
  });

  // State pour la sauvegarde
  const [isSaving, setIsSaving] = useState(false);

  // Handle save meal and reset - Fonction complète de sauvegarde et réinitialisation
  const handleSaveMealAndReset = async () => {
    if (!userId || !scanFlowState.analysisResults || isSaving) {
      return;
    }

    setIsSaving(true);
    
    try {
      logger.info('MEAL_SCAN_SAVE', 'Starting meal save and reset process', {
        userId,
        hasAnalysisResults: !!scanFlowState.analysisResults,
        totalCalories: scanFlowState.analysisResults.total_calories,
        hasCapturedPhoto: !!scanFlowState.capturedPhoto,
        timestamp: new Date().toISOString()
      });

      // Upload photo to Supabase Storage if available
      let photoUrl: string | undefined;
      if (scanFlowState.capturedPhoto?.file) {
        logger.info('MEAL_SCAN_SAVE', 'Uploading meal photo to storage', {
          userId,
          fileSize: scanFlowState.capturedPhoto.file.size,
          fileType: scanFlowState.capturedPhoto.file.type,
          timestamp: new Date().toISOString()
        });

        const uploadResult = await uploadMealPhoto(
          scanFlowState.capturedPhoto.file,
          userId
        );

        if (uploadResult.success && uploadResult.publicUrl) {
          photoUrl = uploadResult.publicUrl;
          logger.info('MEAL_SCAN_SAVE', 'Photo uploaded successfully', {
            publicUrl: photoUrl,
            uploadPath: uploadResult.uploadPath,
            userId,
            timestamp: new Date().toISOString()
          });
        } else {
          logger.warn('MEAL_SCAN_SAVE', 'Photo upload failed, continuing without photo', {
            error: uploadResult.error,
            userId,
            timestamp: new Date().toISOString()
          });
          
          // Show user-friendly message about photo upload failure
          showToast({
            type: 'warning',
            title: 'Photo non sauvegardée',
            message: uploadResult.error || 'La photo n\'a pas pu être sauvegardée, mais votre repas sera enregistré.',
            duration: 4000,
          });
        }
      }

      // Préparer les données du repas
      const mealData = {
        user_id: userId,
        timestamp: new Date().toISOString(),
        items: scanFlowState.analysisResults.detected_foods || [],
        total_kcal: scanFlowState.analysisResults.total_calories || 0,
        meal_type: (scanFlowState.analysisResults.meal_type || 'dinner') as 'breakfast' | 'lunch' | 'dinner' | 'snack',
        meal_name: scanFlowState.analysisResults.meal_name,
        photo_url: photoUrl, // Use uploaded photo URL instead of blob URL
      };

      // Sauvegarder le repas
      const savedMeal = await mealsRepo.saveMeal(mealData);
      
      // Invalider les requêtes pour mise à jour UI
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['meals-today', userId] }),
        queryClient.invalidateQueries({ queryKey: ['meals-week', userId] }),
        queryClient.invalidateQueries({ queryKey: ['meals-month', userId] }),
        queryClient.invalidateQueries({ queryKey: ['meals-history', userId] }),
        queryClient.invalidateQueries({ queryKey: ['daily-ai-summary', userId] })
      ]);

      // Audio feedback de succès
      success();
      
      // Toast de succès
      showToast({
        type: 'success',
        title: 'Repas sauvegardé !',
        message: `${scanFlowState.analysisResults.total_calories} kcal ajoutées à votre forge nutritionnelle${photoUrl ? ' avec photo' : ''}`,
        duration: 3000,
      });

      logger.info('MEAL_SCAN_SAVE', 'Meal saved successfully, resetting scan state', {
        mealId: savedMeal.id,
        userId,
        photoSaved: !!photoUrl,
        timestamp: new Date().toISOString()
      });

      // CRITIQUE: Réinitialiser complètement l'état du scan AVANT la navigation
      setScanFlowState(initialScanFlowState);
      clientScanIdRef.current = null;
      processingGuardRef.current = false;
      
      // Attendre un tick pour que l'état soit mis à jour
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Navigation vers la page des repas
      navigate('/meals');
      
    } catch (error) {
      errorSound();
      logger.error('MEAL_SCAN_SAVE', 'Failed to save meal', {
        error: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        userId,
        mealData: {
          totalCalories: scanFlowState.analysisResults?.total_calories,
          itemsCount: scanFlowState.analysisResults?.detected_foods?.length,
          mealType: scanFlowState.analysisResults?.meal_type,
          hasPhoto: !!photoUrl
        },
        timestamp: new Date().toISOString()
      });

      showToast({
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: `Impossible de sauvegarder le repas: ${error instanceof Error ? error.message : 'Erreur inconnue'}. Veuillez réessayer.`,
        duration: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Gestionnaires pour la modal de confirmation
  const handleSaveAndExit = async () => {
    try {
      if (scanFlowState.analysisResults) {
        await handleSaveMealAndReset();
      }
      setShowExitConfirmation(false);
      if (pendingNavigation) {
        pendingNavigation();
        setPendingNavigation(null);
      }
    } catch (error) {
      logger.error('MEAL_SCAN_EXIT', 'Failed to save before exit', { error });
      showToast('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleDiscardAndExit = () => {
    logger.info('MEAL_SCAN_EXIT', 'User chose to discard scan and exit', {
      currentStep: scanFlowState.currentStep,
      hasCapturedPhoto: !!scanFlowState.capturedPhoto,
      hasResults: !!scanFlowState.analysisResults,
      timestamp: new Date().toISOString()
    });
    
    // Nettoyer l'état du scan
    setScanFlowState(initialScanFlowState);
    clientScanIdRef.current = null;
    
    setShowExitConfirmation(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleCancelExit = () => {
    logger.info('MEAL_SCAN_EXIT', 'User cancelled exit, continuing scan', {
      currentStep: scanFlowState.currentStep,
      timestamp: new Date().toISOString()
    });
    
    setShowExitConfirmation(false);
    setPendingNavigation(null);
    
    // Reset blocker
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  };

  // Handle retry AI
  const handleRetryAI = () => {
    // Scroll to top when retrying
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scanFlowHandlers.handleRetryAI();
  };

  // Handle manual entry
  const handleManualEntry = () => {
    navigate('/meals/add');
  };

  // Early return si pas d'auth
  if (!authReady) {
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          icon="Loader"
          title="Chargement..."
          subtitle="Initialisation de votre session"
          circuit="meal-scan"
        />
        <GlassCard className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Chargement de votre session...</p>
        </GlassCard>
      </div>
    );
  }

  // Early return si pas d'utilisateur connecté
  if (!userId) {
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          icon="LogIn"
          title="Connexion Requise"
          subtitle="Connectez-vous pour analyser vos repas"
          circuit="meal-scan"
        />
        <GlassCard className="p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Connexion Requise</h2>
          <p className="text-gray-300 mb-6">
            Vous devez être connecté pour utiliser l'analyse de repas.
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="btn-glass--primary w-full"
          >
            <div className="flex items-center justify-center gap-2">
              <SpatialIcon Icon={ICONS.LogIn} size={16} />
              <span>Se Connecter</span>
            </div>
          </button>
        </GlassCard>
      </div>
    );
  }

  // Early return si pas de profil
  if (!profile) {
    logger.warn('MEAL_SCAN_FLOW_NO_PROFILE', 'CRITICAL: No profile detected, showing incomplete profile', {
      hasProfile: !!profile,
      hasSessionInfo: !!sessionInfo,
      authReady,
      userId,
      profileType: typeof profile,
      profileStringified: profile ? JSON.stringify(profile, null, 2).substring(0, 500) + '...' : 'null',
      userStoreProfileState: {
        profile: !!useUserStore.getState().profile,
        profileUserId: useUserStore.getState().profile?.userId,
        profileDisplayName: useUserStore.getState().profile?.displayName
      },
      timestamp: new Date().toISOString()
    });
    
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          icon="User"
          title="Profil Incomplet"
          subtitle="Complétez votre profil pour des analyses nutritionnelles personnalisées"
          circuit="meal-scan"
        />
        <GlassCard className="p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Profil Incomplet</h2>
          <p className="text-gray-300 mb-6">
            Complétez votre profil pour bénéficier d'analyses nutritionnelles personnalisées.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="btn-glass--primary w-full mb-3"
          >
            <div className="flex items-center justify-center gap-2">
              <SpatialIcon Icon={ICONS.User} size={16} />
              <span>Compléter le Profil</span>
            </div>
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-glass--secondary-nav w-full"
          >
            <div className="flex items-center justify-center gap-2">
              <SpatialIcon Icon={ICONS.Home} size={16} />
              <span>Retour à l'accueil</span>
            </div>
          </button>
        </GlassCard>
      </div>
    );
  }

  // Rendu du contenu selon l'étape
  const renderContent = () => {
    if (scanFlowState.analysisError && scanFlowState.currentStep === 'processing') {
      return (
        <ErrorDisplay
          error={scanFlowState.analysisError}
          onRetry={handleRetryAI}
          onManualEntry={handleManualEntry}
          fallbackAvailable={true}
        />
      );
    }
    
    switch (scanFlowState.currentStep) {
      case 'capture':
        return (
          <MealPhotoCaptureStep
            capturedPhoto={scanFlowState.capturedPhoto}
            onPhotoCapture={scanFlowHandlers.handlePhotoCapture}
            onBack={() => navigate('/meals')}
            onProceedToProcessing={scanFlowHandlers.handleProceedToProcessing}
            isProcessingInProgress={scanFlowState.isProcessing}
            readyForProcessingRef={readyForProcessingRef}
            progress={scanFlowState.progress}
            progressMessage={scanFlowState.progressMessage}
            progressSubMessage={scanFlowState.progressSubMessage}
          />
        );
      
      case 'processing':
        return (
          <MealAnalysisProcessingStep
            capturedPhoto={scanFlowState.capturedPhoto}
            progress={scanFlowState.progress}
            progressMessage={scanFlowState.progressMessage}
            progressSubMessage={scanFlowState.progressSubMessage}
          />
        );
      
      case 'results':
        return (
          <MealResultsDisplayStep
            analysisResults={scanFlowState.analysisResults}
            capturedPhoto={scanFlowState.capturedPhoto}
            progress={scanFlowState.progress}
            progressMessage={scanFlowState.progressMessage}
            progressSubMessage={scanFlowState.progressSubMessage}
            onSaveMeal={handleSaveMealAndReset}
            isSaving={isSaving}
            onRetake={scanFlowHandlers.handleRetake}
            onNewScan={() => {
              setScanFlowState({
                ...initialScanFlowState,
                progressMessage: 'Forge du Repas',
                progressSubMessage: 'Capturez votre carburant nutritionnel'
              });
              clientScanIdRef.current = nanoid();
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-w-0 pb-8" style={{ overflow: 'visible !important' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={scanFlowState.currentStep}
          className="meal-scan-step pb-6"
          data-step={scanFlowState.currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ minHeight: 'auto', overflow: 'visible' }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      
      {/* Modal de Confirmation de Sortie */}
      <Portal>
        <ScanExitConfirmationModal
          isOpen={showExitConfirmation}
          onSaveAndExit={handleSaveAndExit}
          onDiscardAndExit={handleDiscardAndExit}
          onCancel={handleCancelExit}
          hasResults={!!scanFlowState.analysisResults}
          isProcessing={scanFlowState.isProcessing}
          capturedPhoto={scanFlowState.capturedPhoto}
        />
      </Portal>
    </div>
  );
};

export default MealScanFlowPage;