/**
 * Compatibility hook for voiceCoachStore
 * @deprecated Use useUnifiedCoachStore instead
 * This hook provides backward compatibility during migration
 */

import { useEffect } from 'react';
import { useUnifiedCoachStore } from '../system/store/unifiedCoachStore';

export function useVoiceCoachStoreCompat() {
  useEffect(() => {
    console.warn(
      '⚠️ DEPRECATED: useVoiceCoachStoreCompat is deprecated.\n' +
      '→ Migrate to useUnifiedCoachStore.\n' +
      '→ See docs/technical/UNIFIED_CHAT_SYSTEM.md for migration guide.'
    );
  }, []);

  const store = useUnifiedCoachStore();

  return {
    isPanelOpen: store.isPanelOpen,
    isPanelMinimized: false, // Legacy - no longer supported
    voiceState: store.voiceState,
    messages: store.messages,
    currentTranscription: store.currentTranscription,
    showTranscript: store.showTranscript,
    showReadyPrompt: store.showReadyPrompt,
    visualization: store.visualization,
    preferences: {
      showVisualizations: true,
      autoConnect: false,
    },
    communicationMode: store.communicationMode,
    openPanel: store.openPanel,
    closePanel: store.closePanel,
    minimizePanel: () => console.warn('minimizePanel is deprecated'),
    maximizePanel: () => console.warn('maximizePanel is deprecated'),
    toggleTranscript: store.toggleTranscript,
    toggleCommunicationMode: store.toggleCommunicationMode,
    stopListening: store.stopListening,
    addMessage: store.addMessage,
    setShowReadyPrompt: store.setShowReadyPrompt,
    setVoiceState: store.setVoiceState,
    setError: store.setError,
    setCommunicationMode: store.setCommunicationMode,
  };
}
