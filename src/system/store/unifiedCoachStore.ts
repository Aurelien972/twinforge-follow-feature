/**
 * Unified Coach Store
 * Store unifié pour gérer le chat et le mode vocal
 * Fusionne les fonctionnalités de globalChatStore et voiceCoachStore
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import logger from '../../lib/utils/logger';
import type { ChatMessage } from '../../domain/coachChat';
import type { NotificationId } from '../../utils/notificationTracker';

export type ChatMode = 'training' | 'nutrition' | 'fasting' | 'general' | 'body-scan';
export type CommunicationMode = 'text' | 'voice';
export type VoiceState = 'idle' | 'connecting' | 'listening' | 'processing' | 'speaking' | 'error';

export interface ChatModeConfig {
  id: ChatMode;
  displayName: string;
  systemPrompt: string;
  capabilities: {
    voice?: boolean;
    suggestions?: boolean;
    exerciseFeedback?: boolean;
    mealAnalysis?: boolean;
    fastingTips?: boolean;
    navigation?: boolean;
  };
  color: string;
  icon: string;
}

export interface ChatNotification {
  id: NotificationId;
  message: string;
  mode: ChatMode;
  isVisible: boolean;
  autoHideDelay?: number;
}

export interface VoiceVisualization {
  frequencies: number[];
  volume: number;
  isActive: boolean;
}

interface UnifiedCoachState {
  // Panel state
  isPanelOpen: boolean;
  communicationMode: CommunicationMode;
  isVoiceOnlyMode: boolean; // New: Track if in voice-only minimal UI mode

  // Chat mode
  currentMode: ChatMode;
  modeConfigs: Record<ChatMode, ChatModeConfig>;

  // Messages
  conversationId: string | null;
  messages: ChatMessage[];
  currentTranscription: string;

  // Voice state
  voiceState: VoiceState;
  isRecording: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  showTranscript: boolean;
  showReadyPrompt: boolean;

  // UI state
  isTyping: boolean;
  hasUnreadMessages: boolean;
  unreadCount: number;
  lastReadMessageId: string | null;

  // Visualization
  visualization: VoiceVisualization;

  // Settings
  closeOnNavigation: boolean;
  isInStep2: boolean;
  hasStep2Intro: boolean;

  // Error handling
  errorMessage: string;

  // Notification
  currentNotification: ChatNotification | null;

  // Actions - Panel
  openPanel: (mode?: ChatMode) => void;
  closePanel: () => void;
  togglePanel: () => void;

  // Actions - Communication Mode
  setCommunicationMode: (mode: CommunicationMode) => void;
  toggleCommunicationMode: () => void;

  // Actions - Chat Mode
  setMode: (mode: ChatMode) => void;

  // Actions - Messages
  startConversation: (mode: ChatMode, contextData?: any) => void;
  endConversation: () => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setCurrentTranscription: (text: string) => void;

  // Actions - Voice
  setVoiceState: (state: VoiceState) => void;
  setRecording: (recording: boolean) => void;
  setProcessing: (processing: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  setShowTranscript: (show: boolean) => void;
  toggleTranscript: () => void;
  setShowReadyPrompt: (show: boolean) => void;
  startListening: () => void;
  stopListening: () => void;

  // Actions - UI
  setTyping: (typing: boolean) => void;
  markAsRead: () => void;
  incrementUnread: () => void;
  resetUnread: () => void;

  // Actions - Visualization
  updateVisualization: (data: Partial<VoiceVisualization>) => void;

  // Actions - Settings
  setCloseOnNavigation: (closeOnNav: boolean) => void;
  setIsInStep2: (isInStep2: boolean) => void;
  setHasStep2Intro: (hasIntro: boolean) => void;

  // Actions - Error
  setError: (message: string) => void;
  clearError: () => void;

  // Actions - Notification
  showNotification: (notification: Omit<ChatNotification, 'isVisible'>) => void;
  hideNotification: () => void;

  // Actions - Voice Only Mode
  enterVoiceOnlyMode: () => void;
  exitVoiceOnlyMode: () => void;
}

const DEFAULT_MODE_CONFIGS: Record<ChatMode, ChatModeConfig> = {
  training: {
    id: 'training',
    displayName: 'Coach Training',
    systemPrompt: 'Tu es un coach sportif expert et ultra-motivant. Accompagne l\'utilisateur pendant sa séance avec des conseils techniques précis et motivants. Reste concis (2-3 phrases max), énergique et pratique. Tutoie l\'utilisateur.',
    capabilities: {
      voice: true,
      suggestions: true,
      exerciseFeedback: true
    },
    color: '#FF6B35',
    icon: 'Dumbbell'
  },
  nutrition: {
    id: 'nutrition',
    displayName: 'Coach Nutrition',
    systemPrompt: 'Tu es un nutritionniste expert et bienveillant. Aide l\'utilisateur à analyser ses repas et optimiser ses choix alimentaires. Reste pédagogue, positif et donne des conseils pratiques applicables. Explique clairement les concepts nutritionnels.',
    capabilities: {
      voice: true,
      suggestions: true,
      mealAnalysis: true
    },
    color: '#10B981',
    icon: 'Utensils'
  },
  fasting: {
    id: 'fasting',
    displayName: 'Coach Jeûne',
    systemPrompt: 'Tu es un expert du jeûne intermittent. Accompagne l\'utilisateur pendant sa session de jeûne avec encouragement et compréhension. Donne des astuces pour gérer la faim et explique les bénéfices. Reste rassurant et motivant.',
    capabilities: {
      voice: true,
      suggestions: true,
      fastingTips: true
    },
    color: '#F59E0B',
    icon: 'Timer'
  },
  general: {
    id: 'general',
    displayName: 'Assistant Général',
    systemPrompt: 'Tu es l\'assistant personnel intelligent de TwinForge. Aide l\'utilisateur à naviguer dans l\'app et atteindre ses objectifs wellness. Reste amical, clair et proactif. Guide vers les bonnes fonctionnalités selon les besoins.',
    capabilities: {
      voice: true,
      suggestions: true,
      navigation: true
    },
    color: '#18E3FF',
    icon: 'MessageSquare'
  },
  'body-scan': {
    id: 'body-scan',
    displayName: 'Coach Corps',
    systemPrompt: 'Tu es un expert en analyse corporelle et posture. Guide l\'utilisateur dans son scan corporel avec expertise et bienveillance. Donne des conseils pratiques sur la posture et l\'alignement.',
    capabilities: {
      voice: true,
      suggestions: true
    },
    color: '#A855F7',
    icon: 'Scan'
  }
};

export const useUnifiedCoachStore = create<UnifiedCoachState>()(
  persist(
    (set, get) => ({
      // Initial state
      isPanelOpen: false,
      communicationMode: 'text',
      isVoiceOnlyMode: false,

      currentMode: 'general',
      modeConfigs: DEFAULT_MODE_CONFIGS,

      conversationId: null,
      messages: [],
      currentTranscription: '',

      voiceState: 'idle',
      isRecording: false,
      isProcessing: false,
      isSpeaking: false,
      showTranscript: false,
      showReadyPrompt: false,

      isTyping: false,
      hasUnreadMessages: false,
      unreadCount: 0,
      lastReadMessageId: null,

      visualization: {
        frequencies: [],
        volume: 0,
        isActive: false
      },

      closeOnNavigation: true,
      isInStep2: false,
      hasStep2Intro: false,

      errorMessage: '',

      currentNotification: null,

      // Panel actions
      openPanel: (mode?: ChatMode) => {
        const currentMode = mode || get().currentMode;

        set({
          isPanelOpen: true,
          currentMode
        });

        get().markAsRead();
        get().hideNotification();

        logger.info('UNIFIED_COACH', 'Panel opened', {
          mode: currentMode,
          communicationMode: get().communicationMode,
          timestamp: new Date().toISOString()
        });
      },

      closePanel: () => {
        set({ isPanelOpen: false });

        // Reset voice state when closing
        if (get().voiceState === 'listening') {
          get().stopListening();
        }

        logger.info('UNIFIED_COACH', 'Panel closed', {
          mode: get().currentMode,
          timestamp: new Date().toISOString()
        });
      },

      togglePanel: () => {
        const { isPanelOpen } = get();
        if (isPanelOpen) {
          get().closePanel();
        } else {
          get().openPanel();
        }
      },

      // Communication mode actions
      setCommunicationMode: (mode: CommunicationMode) => {
        const previousMode = get().communicationMode;

        set({ communicationMode: mode });

        // Reset states when switching modes
        if (mode === 'text') {
          set({
            voiceState: 'idle',
            isRecording: false,
            showReadyPrompt: false,
            currentTranscription: ''
          });
        } else if (mode === 'voice') {
          set({
            isTyping: false
          });
        }

        logger.info('UNIFIED_COACH', 'Communication mode changed', {
          from: previousMode,
          to: mode,
          timestamp: new Date().toISOString()
        });
      },

      toggleCommunicationMode: () => {
        const current = get().communicationMode;
        get().setCommunicationMode(current === 'text' ? 'voice' : 'text');
      },

      // Chat mode actions
      setMode: (mode: ChatMode) => {
        const previousMode = get().currentMode;

        set({ currentMode: mode });

        logger.info('UNIFIED_COACH', 'Chat mode changed', {
          from: previousMode,
          to: mode,
          timestamp: new Date().toISOString()
        });
      },

      // Message actions
      startConversation: (mode: ChatMode, contextData?: any) => {
        const conversationId = nanoid();

        set({
          conversationId,
          currentMode: mode,
          messages: [],
          isPanelOpen: true
        });

        logger.info('UNIFIED_COACH', 'Conversation started', {
          conversationId,
          mode,
          hasContextData: !!contextData,
          timestamp: new Date().toISOString()
        });
      },

      endConversation: () => {
        const { conversationId, currentMode } = get();

        set({
          conversationId: null,
          isTyping: false,
          isRecording: false,
          isProcessing: false,
          isSpeaking: false,
          voiceState: 'idle'
        });

        logger.info('UNIFIED_COACH', 'Conversation ended', {
          conversationId,
          mode: currentMode,
          messageCount: get().messages.length,
          timestamp: new Date().toISOString()
        });
      },

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: nanoid(),
          timestamp: new Date()
        };

        set((state) => ({
          messages: [...state.messages, newMessage]
        }));

        if (newMessage.role === 'coach' && !get().isPanelOpen) {
          get().incrementUnread();
        }

        logger.debug('UNIFIED_COACH', 'Message added', {
          messageId: newMessage.id,
          role: newMessage.role,
          type: newMessage.type,
          mode: get().currentMode,
          timestamp: new Date().toISOString()
        });
      },

      clearMessages: () => {
        set({ messages: [] });

        logger.debug('UNIFIED_COACH', 'Messages cleared', {
          mode: get().currentMode,
          timestamp: new Date().toISOString()
        });
      },

      setCurrentTranscription: (text: string) => {
        set({ currentTranscription: text });
      },

      // Voice actions
      setVoiceState: (state: VoiceState) => {
        set({ voiceState: state });

        logger.debug('UNIFIED_COACH', 'Voice state changed', {
          state,
          timestamp: new Date().toISOString()
        });
      },

      setRecording: (recording: boolean) => {
        set({ isRecording: recording });
      },

      setProcessing: (processing: boolean) => {
        set({ isProcessing: processing });
      },

      setSpeaking: (speaking: boolean) => {
        set({ isSpeaking: speaking });
      },

      setShowTranscript: (show: boolean) => {
        set({ showTranscript: show });
      },

      toggleTranscript: () => {
        set((state) => ({ showTranscript: !state.showTranscript }));
      },

      setShowReadyPrompt: (show: boolean) => {
        set({ showReadyPrompt: show });
      },

      startListening: () => {
        set({
          voiceState: 'listening',
          isRecording: true
        });

        logger.info('UNIFIED_COACH', 'Started listening', {
          timestamp: new Date().toISOString()
        });
      },

      stopListening: () => {
        set({
          voiceState: 'idle',
          isRecording: false,
          currentTranscription: ''
        });

        logger.info('UNIFIED_COACH', 'Stopped listening', {
          timestamp: new Date().toISOString()
        });
      },

      // UI actions
      setTyping: (typing: boolean) => {
        set({ isTyping: typing });
      },

      markAsRead: () => {
        const messages = get().messages;
        const lastMessage = messages[messages.length - 1];

        set({
          hasUnreadMessages: false,
          unreadCount: 0,
          lastReadMessageId: lastMessage?.id || null
        });

        logger.debug('UNIFIED_COACH', 'Messages marked as read', {
          messageCount: messages.length,
          timestamp: new Date().toISOString()
        });
      },

      incrementUnread: () => {
        set((state) => ({
          hasUnreadMessages: true,
          unreadCount: state.unreadCount + 1
        }));

        logger.debug('UNIFIED_COACH', 'Unread count incremented', {
          newCount: get().unreadCount,
          timestamp: new Date().toISOString()
        });
      },

      resetUnread: () => {
        set({
          hasUnreadMessages: false,
          unreadCount: 0
        });

        logger.debug('UNIFIED_COACH', 'Unread count reset', {
          timestamp: new Date().toISOString()
        });
      },

      // Visualization actions
      updateVisualization: (data: Partial<VoiceVisualization>) => {
        set((state) => ({
          visualization: { ...state.visualization, ...data }
        }));
      },

      // Settings actions
      setCloseOnNavigation: (closeOnNav: boolean) => {
        set({ closeOnNavigation: closeOnNav });
      },

      setIsInStep2: (isInStep2: boolean) => {
        set({ isInStep2 });

        logger.debug('UNIFIED_COACH', 'Step 2 status updated', {
          isInStep2,
          timestamp: new Date().toISOString()
        });
      },

      setHasStep2Intro: (hasIntro: boolean) => {
        set({ hasStep2Intro: hasIntro });

        logger.debug('UNIFIED_COACH', 'Step 2 intro status updated', {
          hasIntro,
          timestamp: new Date().toISOString()
        });
      },

      // Error actions
      setError: (message: string) => {
        set({ errorMessage: message });

        logger.error('UNIFIED_COACH', 'Error set', {
          message,
          timestamp: new Date().toISOString()
        });
      },

      clearError: () => {
        set({ errorMessage: '' });
      },

      // Notification actions
      showNotification: (notification: Omit<ChatNotification, 'isVisible'>) => {
        const fullNotification: ChatNotification = {
          ...notification,
          isVisible: true
        };

        set({ currentNotification: fullNotification });

        logger.debug('UNIFIED_COACH', 'Notification shown', {
          notificationId: notification.id,
          mode: notification.mode,
          timestamp: new Date().toISOString()
        });
      },

      hideNotification: () => {
        const currentNotification = get().currentNotification;

        if (currentNotification) {
          set({ currentNotification: null });

          logger.debug('UNIFIED_COACH', 'Notification hidden', {
            notificationId: currentNotification.id,
            timestamp: new Date().toISOString()
          });
        }
      },

      // Voice Only Mode actions
      enterVoiceOnlyMode: () => {
        set({
          isVoiceOnlyMode: true,
          isPanelOpen: false, // Close the chat drawer
          communicationMode: 'voice'
        });

        logger.info('UNIFIED_COACH', 'Entered voice-only mode', {
          timestamp: new Date().toISOString()
        });
      },

      exitVoiceOnlyMode: () => {
        set({
          isVoiceOnlyMode: false,
          isPanelOpen: true // Reopen chat drawer to show conversation
        });

        logger.info('UNIFIED_COACH', 'Exited voice-only mode', {
          timestamp: new Date().toISOString()
        });
      }
    }),
    {
      name: 'unified-coach-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentMode: state.currentMode,
        communicationMode: state.communicationMode,
        closeOnNavigation: state.closeOnNavigation,
        showTranscript: state.showTranscript,
        messages: state.messages.slice(-50)
      })
    }
  )
);
