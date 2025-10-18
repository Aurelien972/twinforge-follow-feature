// src/app/App.tsx
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useMealPlanStore } from '../system/store/mealPlanStore';
import { useExitModalStore } from '../system/store/exitModalStore';
import { cancelMealPlanGeneration, cancelDetailedRecipeGeneration } from '../system/store/mealPlanStore/actions/generationActions';
import { usePWAUpdate } from '../hooks/usePWAUpdate';
import clsx from 'clsx';
import { useToast } from '../ui/components/ToastProvider';
import React, { Suspense, useEffect } from 'react';
import InstallPrompt from '../ui/components/InstallPrompt';
import UpdateNotification from '../ui/components/UpdateNotification';
import { Outlet, useLocation } from 'react-router-dom';
import logger from '../lib/utils/logger';
import { useOverlayStore } from '../system/store/overlayStore';
import { useGlobalEscapeKey } from '../hooks/useGlobalEscapeKey';
import LoadingFallback from './components/LoadingFallback';
import { Header } from './shell/Header/Header';
import Sidebar from './shell/Sidebar';
import NewMobileBottomBar from './shell/NewMobileBottomBar';
import GlobalExitModal from '../ui/components/GlobalExitModal';
import CentralActionsMenu from './shell/CentralActionsMenu';
import UnifiedFloatingButton from '../ui/components/chat/UnifiedFloatingButton';
import UnifiedCoachDrawer from '../ui/components/chat/UnifiedCoachDrawer';
import { ChatButtonProvider, useChatButtonRef } from '../system/context/ChatButtonContext';
import { useVoiceCoachInitialization } from '../hooks/useVoiceCoachInitialization';

function AppContent() {
  const { isInstallable, isInstalled } = usePWAInstall();
  const { isUpdateAvailable, updateInfo, applyUpdate, dismissUpdate } = usePWAUpdate();
  const { showToast } = useToast();
  const location = useLocation();
  const { isAnyOpen, isOpen: checkIsOpen, close } = useOverlayStore();
  const isCentralMenuOpen = checkIsOpen('centralMenu');
  const { chatButtonRef } = useChatButtonRef();

  // Initialiser le système Voice Coach
  useVoiceCoachInitialization();

  useGlobalEscapeKey();

  React.useEffect(() => {
    const anyOverlayOpen = isAnyOpen();
    if (anyOverlayOpen) {
      // CRITICAL: On mobile, overflow:hidden on body breaks position:fixed
      // Use touch-action instead to prevent scroll
      const isMobile = window.innerWidth <= 1024;

      if (isMobile) {
        const originalTouchAction = document.body.style.touchAction;
        const originalPosition = document.body.style.position;

        document.body.style.touchAction = 'none';
        document.body.style.position = 'relative';

        logger.debug('OVERLAY_BODY_LOCK', 'Body scroll locked (mobile)', {
          anyOverlayOpen,
          timestamp: new Date().toISOString(),
        });

        return () => {
          document.body.style.touchAction = originalTouchAction;
          document.body.style.position = originalPosition;
          logger.debug('OVERLAY_BODY_UNLOCK', 'Body scroll unlocked (mobile)', {
            timestamp: new Date().toISOString(),
          });
        };
      } else {
        // Desktop: safe to use overflow hidden
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        logger.debug('OVERLAY_BODY_LOCK', 'Body scroll locked (desktop)', {
          anyOverlayOpen,
          timestamp: new Date().toISOString(),
        });

        return () => {
          document.body.style.overflow = originalOverflow;
          logger.debug('OVERLAY_BODY_UNLOCK', 'Body scroll unlocked (desktop)', {
            timestamp: new Date().toISOString(),
          });
        };
      }
    }
  }, [isAnyOpen]);

  React.useEffect(() => {
    const scrollToTop = () => {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        const scrollableContainers = document.querySelectorAll('[data-scroll-container]');
        scrollableContainers.forEach((c) =>
          (c as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' }),
        );
      } catch {}
    };
    const timeoutId = setTimeout(scrollToTop, 100);
    logger.debug('APP_NAVIGATION', 'Smooth scroll to top on route change', {
      newPath: location.pathname,
      previousScrollY: window.scrollY,
      pwa: { isInstallable, isInstalled, isUpdateAvailable },
      timestamp: new Date().toISOString(),
    });
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.pathname.includes('/meals/scan')) {
      const timeoutId = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, location.hash]);
  const { isGenerating, isGeneratingDetailedRecipes, cancelDetailedRecipeGeneration: cancelDetailedRecipes } = useMealPlanStore();
  const { isOpen, showModal, hideModal } = useExitModalStore();

  const shouldApplyBodyScanClass =
    location.pathname.startsWith('/body-scan') || location.pathname.startsWith('/avatar');
  const shouldExpandWidth =
    location.pathname.startsWith('/body-scan') || location.pathname.startsWith('/avatar');

  // Block navigation during meal plan generation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isGenerating || isGeneratingDetailedRecipes) {
        e.preventDefault();
        e.returnValue = '';
        showModal({
          title: isGenerating ? 'Génération de plan en cours' : 'Génération de recettes en cours',
          message: isGenerating 
            ? 'Votre plan alimentaire est en cours de génération. Êtes-vous sûr de vouloir quitter ?'
            : 'Les recettes détaillées sont en cours de génération. Êtes-vous sûr de vouloir quitter ?',
          processName: isGenerating ? 'Génération de Plan Alimentaire' : 'Génération de Recettes Détaillées',
          onConfirm: () => {
            if (isGenerating) {
              cancelMealPlanGeneration();
            }
            if (isGeneratingDetailedRecipes) {
              cancelDetailedRecipes();
            }
            hideModal();
            window.location.reload();
          },
          onCancel: hideModal
        });
        return '';
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (isGenerating || isGeneratingDetailedRecipes) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        showModal({
          title: isGenerating ? 'Génération de plan en cours' : 'Génération de recettes en cours',
          message: isGenerating 
            ? 'Votre plan alimentaire est en cours de génération. Êtes-vous sûr de vouloir quitter ?'
            : 'Les recettes détaillées sont en cours de génération. Êtes-vous sûr de vouloir quitter ?',
          processName: isGenerating ? 'Génération de Plan Alimentaire' : 'Génération de Recettes Détaillées',
          onConfirm: () => {
            if (isGenerating) {
              cancelMealPlanGeneration();
            }
            if (isGeneratingDetailedRecipes) {
              cancelDetailedRecipes();
            }
            hideModal();
            window.history.back();
          },
          onCancel: hideModal
        });
      }
    };

    if (isGenerating || isGeneratingDetailedRecipes) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
      
      // Prevent back navigation
      window.history.pushState(null, '', window.location.href);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isGenerating, isGeneratingDetailedRecipes, showModal, hideModal, cancelDetailedRecipes]);


  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        position: 'relative',
        zIndex: 0,
        // CRITICAL: No transforms on root to prevent breaking position:fixed on mobile
        transform: 'none',
        transformStyle: 'flat',
        perspective: 'none',
        filter: 'none',
        isolation: 'auto',
        contain: 'none'
      }}
    >
      <Header />

      {/* Fixed Sidebar - Rendered outside of flex layout */}
      <Sidebar />

      {/* Parent flex : on autorise la contraction des enfants */}
      <div
        className="flex-1 flex min-w-0"
        style={{
          // CRITICAL: No transforms to prevent breaking position:fixed
          position: 'static',
          overflow: 'visible',
          transform: 'none',
          transformStyle: 'flat',
          filter: 'none',
          perspective: 'none',
          contain: 'none',
          isolation: 'auto',
          zIndex: 'auto'
        }}
      >
        {/* Sidebar spacer (hidden on mobile) - maintains layout spacing */}
        <div className="hidden lg:block lg:w-[240px] xl:w-[260px] shrink-0" aria-hidden="true" />

        {/* MAIN — fix mobile: min-w-0 pour éviter le rognage à droite */}
        <main
          id="main-content"
          className={`flex-1 min-w-0 px-4 py-4 md:px-6 lg:px-6 xl:px-8 md:pb-4 pt-20 pb-32 ${
            shouldApplyBodyScanClass ? 'body-scan-page' : ''
          }`}
          style={{
            position: 'relative',
            overflow: 'visible',
            minHeight: '100dvh',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            marginLeft: 0,
          }}
          role="main"
          aria-label="Contenu principal de l'application"
        >
          <div className={clsx('w-full min-w-0', { 'mx-auto': !shouldExpandWidth })}>
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>

      {isInstallable && !isInstalled && (
        <InstallPrompt
          variant="floating"
          onInstallSuccess={() =>
            showToast({
              type: 'success',
              title: 'TwinForge installé !',
              message: "L'application est maintenant disponible sur votre écran d'accueil",
              duration: 4000,
            })
          }
        />
      )}

      <UpdateNotification
        isVisible={isUpdateAvailable}
        onUpdate={async () => {
          try {
            await applyUpdate();
            showToast({
              type: 'success',
              title: 'Mise à jour appliquée',
              message: 'TwinForge redémarre avec la nouvelle version',
              duration: 4000,
            });
          } catch (error) {
            logger.error('PWA_UPDATE', 'Failed to apply update', {
              error: error instanceof Error ? error.message : 'Unknown error',
              timestamp: new Date().toISOString(),
            });
            showToast({
              type: 'error',
              title: 'Erreur de mise à jour',
              message: "Impossible d'appliquer la mise à jour. Réessayez plus tard.",
              duration: 4000,
            });
          }
        }}
        onDismiss={dismissUpdate}
        updateInfo={updateInfo}
      />

      <NewMobileBottomBar />
      <GlobalExitModal />

      {/* Central Actions Menu - Accessible depuis mobile (via bottom bar) et desktop (via header) */}
      <CentralActionsMenu
        isOpen={isCentralMenuOpen}
        onClose={close}
      />

      {/* Unified Coach System */}
      <UnifiedFloatingButton ref={chatButtonRef} />
      <UnifiedCoachDrawer chatButtonRef={chatButtonRef} />
    </div>
  );
}

export default function App() {
  return (
    <ChatButtonProvider>
      <AppContent />
    </ChatButtonProvider>
  );
}