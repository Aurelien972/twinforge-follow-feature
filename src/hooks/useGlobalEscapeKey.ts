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

      // Priority: Close chat first if it's open (highest priority)
      if (isChatOpen) {
        logger.debug('ESCAPE_KEY', 'Closing chat drawer');
        closeChat();
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Then close any other overlay
      if (activeOverlayId !== 'none') {
        logger.debug('ESCAPE_KEY', 'Closing overlay', { overlayId: activeOverlayId });
        close();
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
