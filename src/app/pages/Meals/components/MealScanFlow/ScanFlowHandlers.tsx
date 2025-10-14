import React from 'react';
import { nanoid } from 'nanoid';
import { type UserProfileContext } from '../../../../../system/data/repositories/mealsRepo';
import logger from '../../../../../lib/utils/logger';
import type { CapturedMealPhoto, ScanFlowState } from './ScanFlowState';

/**
 * Convert File to Base64 for API transmission
 */
async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix to get just the base64 data
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Build complete user profile context for AI analysis
 */
export function buildUserProfileContext(profile: any): UserProfileContext {
  return {
    // Données d'identité
    sex: profile?.sex,
    height_cm: profile?.height_cm,
    weight_kg: profile?.weight_kg,
    target_weight_kg: profile?.target_weight_kg,
    activity_level: profile?.activity_level,
    objective: profile?.objective,
    birthdate: profile?.birthdate,
    job_category: profile?.job_category,
    
    // Données nutritionnelles
    nutrition: {
      diet: profile?.nutrition?.diet,
      allergies: profile?.nutrition?.allergies || [],
      intolerances: profile?.nutrition?.intolerances || [],
      disliked: profile?.nutrition?.disliked || [],
      budgetLevel: profile?.nutrition?.budgetLevel,
      proteinTarget_g: profile?.nutrition?.proteinTarget_g,
      fastingWindow: profile?.nutrition?.fastingWindow,
    },
    
    // Données de santé
    health: {
      bloodType: profile?.health?.bloodType,
      conditions: profile?.health?.conditions || [],
      medications: profile?.health?.medications || [],
    },
    
    // Données émotionnelles
    emotions: {
      chronotype: profile?.emotions?.chronotype,
      stress: profile?.emotions?.stress,
      sleepHours: profile?.emotions?.sleepHours,
      moodBaseline: profile?.emotionBaseline?.moodBaseline,
      sensitivities: profile?.emotions?.sensitivities || [],
    },
    
    // Préférences d'entraînement
    workout: {
      type: profile?.preferences?.workout?.type,
      sessionsPerWeek: profile?.preferences?.workout?.sessionsPerWeek,
      preferredDuration: profile?.preferences?.workout?.preferredDuration,
      equipment: profile?.preferences?.workout?.equipment || [],
      morningWorkouts: profile?.preferences?.workout?.morningWorkouts,
      highIntensity: profile?.preferences?.workout?.highIntensity,
      groupWorkouts: profile?.preferences?.workout?.groupWorkouts,
      outdoorActivities: profile?.preferences?.workout?.outdoorActivities,
    },
    
    // Contraintes alimentaires
    constraints: profile?.constraints || {},
    
    // Métadonnées calculées pour l'IA
    calculated_metrics: (() => {
      const age = profile?.birthdate ? 
        new Date().getFullYear() - new Date(profile.birthdate).getFullYear() : undefined;
      
      const bmi = profile?.height_cm && profile?.weight_kg ? 
        profile.weight_kg / Math.pow(profile.height_cm / 100, 2) : undefined;
      
      // Calcul BMR (Harris-Benedict)
      const bmr = profile?.height_cm && profile?.weight_kg && age ? 
        (profile.sex === 'male' 
          ? 88.362 + (13.397 * profile.weight_kg) + (4.799 * profile.height_cm) - (5.677 * age)
          : 447.593 + (9.247 * profile.weight_kg) + (3.098 * profile.height_cm) - (4.330 * age)
        ) : undefined;
      
      // Calcul TDEE (Total Daily Energy Expenditure)
      const activityFactor = profile?.activity_level === 'sedentary' ? 1.2 :
                            profile?.activity_level === 'light' ? 1.375 :
                            profile?.activity_level === 'moderate' ? 1.55 :
                            profile?.activity_level === 'active' ? 1.725 :
                            profile?.activity_level === 'athlete' ? 1.9 : 1.55;
      
      const tdee = bmr ? bmr * activityFactor : undefined;
      
      // Calcul cible protéines (1.6-2.2g/kg selon objectif)
      const proteinMultiplier = profile?.objective === 'muscle_gain' ? 2.2 :
                               profile?.objective === 'fat_loss' ? 2.0 : 1.6;
      const protein_target_calculated = profile?.weight_kg ? 
        profile.weight_kg * proteinMultiplier : undefined;
      
      return {
        age,
        bmi: bmi ? Math.round(bmi * 10) / 10 : undefined,
        bmr: bmr ? Math.round(bmr) : undefined,
        tdee: tdee ? Math.round(tdee) : undefined,
        protein_target_calculated: protein_target_calculated ? Math.round(protein_target_calculated) : undefined,
        daily_calorie_target: tdee ? Math.round(tdee) : undefined,
      };
    })(),
  };
}

/**
 * Custom hook for scan flow handlers
 */
export function useScanFlowHandlers({
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
  onAnalysisError,
  onSuccess
}: {
  scanFlowState: ScanFlowState;
  setScanFlowState: React.Dispatch<React.SetStateAction<ScanFlowState>>;
  profile: any;
  userId: string | undefined;
  clientScanIdRef: React.MutableRefObject<string | null>;
  processingGuardRef: React.MutableRefObject<boolean>;
  readyForProcessingRef: React.RefObject<HTMLDivElement>;
  showToast: (message: string, type?: string) => void;
  success: () => void;
  errorSound: () => void;
  queryClient: any;
  onAnalysisError: (error: string) => void;
  onSuccess: () => void;
}) {
  // Gérer la capture de photo
  const handlePhotoCapture = React.useCallback(async (
    file: File,
    captureReport: any
  ) => {
    const photo: CapturedMealPhoto = {
      file,
      url: URL.createObjectURL(file),
      validationResult: {
        isValid: captureReport.validation?.isValid ?? true,
        issues: captureReport.validation?.issues ?? [],
        confidence: captureReport.validation?.confidence ?? 0.8,
      },
      captureReport,
    };

    setScanFlowState(prev => ({
      ...prev,
      capturedPhoto: photo,
      analysisError: null,
      progress: 33,
      progressMessage: 'Forge du Repas',
      progressSubMessage: 'Photo capturée avec succès'
    }));
    
    logger.info('MEAL_SCAN_FLOW', 'Photo captured', { 
      clientScanId: clientScanIdRef.current,
      isValid: photo.validationResult.isValid 
    });
    
    // Scroll fluide vers la section "Ready For Processing" après capture
    setTimeout(() => {
      if (readyForProcessingRef.current) {
        readyForProcessingRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 300);
  }, [setScanFlowState, clientScanIdRef, readyForProcessingRef]);

  // Gérer la reprise de photo
  const handleRetake = React.useCallback(() => {
    setScanFlowState(prev => ({
      ...prev,
      capturedPhoto: null,
      analysisError: null,
      analysisMetadata: null,
      currentStep: 'capture',
      progress: 0,
      progressMessage: 'Forge du Repas',
      progressSubMessage: 'Prêt pour une nouvelle capture'
    }));
    
    logger.info('MEAL_SCAN_FLOW', 'Photo retake requested', { 
      clientScanId: clientScanIdRef.current 
    });
  }, [setScanFlowState, clientScanIdRef]);

  // Procéder au traitement
  const handleProceedToProcessing = React.useCallback(async () => {
    if (processingGuardRef.current || !scanFlowState.capturedPhoto || !userId) {
      return;
    }

    processingGuardRef.current = true;
    setScanFlowState(prev => ({
      ...prev,
      isProcessing: true,
      currentStep: 'processing',
      analysisError: null,
      progress: 40,
      progressMessage: 'Analyse du Carburant',
      progressSubMessage: 'Démarrage de l\'analyse IA...'
    }));

    const clientScanId = clientScanIdRef.current!;

    try {
      setScanFlowState(prev => ({
        ...prev,
        progress: 50,
        progressSubMessage: 'Identification des aliments...'
      }));
      
      // Construction du contexte utilisateur complet pour l'IA GPT-5 mini
      const userContext = buildUserProfileContext(profile);

      const analysisRequest = {
        user_id: userId,
        image_data: await convertFileToBase64(scanFlowState.capturedPhoto.file),
        meal_type: 'dinner' as const,
        timestamp: new Date().toISOString(),
        user_profile_context: userContext,
      };

      // Log du contexte transmis pour audit
      logger.info('MEAL_SCAN_FLOW', 'Transmitting complete user context to analysis', {
        clientScanId,
        contextKeys: Object.keys(userContext),
        philosophy: 'complete_user_context_transmission_to_analysis'
      });
      
      // Pause pour montrer l'étape processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setScanFlowState(prev => ({
        ...prev,
        progress: 60,
        progressSubMessage: 'Analyse des nutriments...'
      }));
      
      // Import dynamique pour éviter les dépendances circulaires
      const { mealsRepo } = await import('../../../../../system/data/repositories/mealsRepo');
      const analysisResponse = await mealsRepo.analyzeMeal(analysisRequest);
      
      // Store analysis metadata for display
      const analysisMetadata = {
        model: analysisResponse.analysis_metadata.ai_model_used,
        tokensUsed: analysisResponse.analysis_metadata.tokens_used?.total || 0,
        costUSD: analysisResponse.analysis_metadata.tokens_used?.cost_estimate_usd || 0,
        fallbackUsed: analysisResponse.analysis_metadata.fallback_used || false,
        photo_url: scanFlowState.capturedPhoto?.url,
      };
      
      setScanFlowState(prev => ({
        ...prev,
        progress: 70,
        progressSubMessage: 'Calcul des macronutriments...',
        analysisMetadata
      }));
      
      // Brief pause for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setScanFlowState(prev => ({
        ...prev,
        progress: 85,
        progressSubMessage: 'Optimisation pour vos objectifs...'
      }));
      
      await new Promise(resolve => setTimeout(resolve, 500));

      setScanFlowState(prev => ({
        ...prev,
        analysisResults: analysisResponse,
        progress: 95,
        progressMessage: 'Énergie Raffinée',
        progressSubMessage: 'Finalisation des données...'
      }));
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setScanFlowState(prev => ({
        ...prev,
        progress: 100,
        currentStep: 'results'
      }));
      
      onSuccess();

      logger.info('MEAL_SCAN_FLOW', 'Analysis completed', {
        clientScanId,
        totalCalories: analysisResponse.total_calories,
        confidence: analysisResponse.confidence,
        insightsCount: analysisResponse.personalized_insights?.length || 0,
        aiModelUsed: analysisResponse.analysis_metadata?.ai_model_used,
        tokensUsed: analysisResponse.analysis_metadata?.tokens_used,
        analysisId: analysisResponse.analysis_id,
        philosophy: 'analysis_with_complete_user_context'
      });

    } catch (error) {
      logger.error('MEAL_SCAN_FLOW', 'Analysis failed', { 
        clientScanId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      onAnalysisError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setScanFlowState(prev => ({ ...prev, isProcessing: false }));
      processingGuardRef.current = false;
    }
  }, [scanFlowState.capturedPhoto, userId, profile, setScanFlowState, clientScanIdRef, processingGuardRef, onAnalysisError, onSuccess]);

  return {
    handlePhotoCapture,
    handleRetake,
    handleProceedToProcessing,
  };
}