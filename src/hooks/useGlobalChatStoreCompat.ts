/**
 * Compatibility hook for globalChatStore
 * @deprecated Use useUnifiedCoachStore instead
 * This hook provides backward compatibility during migration
 */

import { useEffect } from 'react';
import { useUnifiedCoachStore } from '../system/store/unifiedCoachStore';

export function useGlobalChatStoreCompat() {
  useEffect(() => {
    console.warn(
      '⚠️ DEPRECATED: useGlobalChatStoreCompat is deprecated.\n' +
      '→ Migrate to useUnifiedCoachStore.\n' +
      '→ See docs/technical/UNIFIED_CHAT_SYSTEM.md for migration guide.'
    );
  }, []);

  const store = useUnifiedCoachStore();

  return {
    isOpen: store.isPanelOpen,
    toggle: store.togglePanel,
    open: store.openPanel,
    close: store.closePanel,
    currentMode: store.currentMode,
    setMode: store.setMode,
    modeConfigs: store.modeConfigs,
    messages: store.messages,
    addMessage: store.addMessage,
    setTyping: store.setTyping,
    isTyping: store.isTyping,
    hasUnreadMessages: store.hasUnreadMessages,
    unreadCount: store.unreadCount,
    markAsRead: store.markAsRead,
    incrementUnread: store.incrementUnread,
    isInStep2: false, // Legacy prop - no longer used
  };
}
