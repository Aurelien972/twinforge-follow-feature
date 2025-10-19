/**
 * Global Escape Key Handler
 * Closes the topmost open overlay when Escape is pressed
 */

import { useEffect } from 'react';
import { useOverlayStore } from '../system/store/overlayStore';
import { useGlobalChatStore } from '../system/store/globalChatStore';
import logger from '../lib/utils/logger';

export const useGlobalEscapeKey = () => {
  const { activeOverlayId, close } = useOverlayStore();
  const { isOpen: isChatOpen, close: closeChat } = useGlobalChatStore();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      // Priority system: close the currently active overlay
      // Chat drawer has same priority as other overlays now
      if (activeOverlayId === 'chatDrawer' && isChatOpen) {
        logger.debug('ESCAPE_KEY', 'Closing chat drawer via overlay system');
        closeChat(); // This will also close the overlay
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Close any other overlay
      if (activeOverlayId !== 'none') {
        logger.debug('ESCAPE_KEY', 'Closing overlay', { overlayId: activeOverlayId });
        close();
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Fallback: if chat is open but not tracked by overlay (shouldn't happen)
      if (isChatOpen) {
        logger.warn('ESCAPE_KEY', 'Chat open but not tracked by overlay - closing directly');
        closeChat();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    };

    document.addEventListener('keydown', handleEscape, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleEscape, { capture: true });
    };
  }, [activeOverlayId, isChatOpen, close, closeChat]);
};
