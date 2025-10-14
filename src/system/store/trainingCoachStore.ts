/**
 * Training Coach Store
 * Zustand store pour gérer l'état des notifications du coach pendant la Step 3
 */

import { create } from 'zustand';
import logger from '../../lib/utils/logger';
import type {
  TrainingNotification,
  TrainingNotificationId,
  NotificationQueueItem,
  TrainingCoachNotificationState,
  NotificationPriority,
  TrainingNotificationContext,
  NotificationType
} from '../../domain/trainingCoachNotification';

interface TrainingCoachStore extends TrainingCoachNotificationState {
  showNotification: (
    id: TrainingNotificationId,
    message: string,
    type: NotificationType,
    priority?: NotificationPriority,
    duration?: number,
    color?: string,
    context?: TrainingNotificationContext
  ) => void;
  _showNotificationImmediate: (
    id: TrainingNotificationId,
    message: string,
    type: NotificationType,
    priority?: NotificationPriority,
    duration?: number,
    color?: string,
    context?: TrainingNotificationContext
  ) => void;
  hideNotification: () => void;
  queueNotification: (
    id: TrainingNotificationId,
    message: string,
    type: NotificationType,
    priority?: NotificationPriority,
    duration?: number,
    delayMs?: number,
    color?: string,
    context?: TrainingNotificationContext
  ) => void;
  processQueue: () => void;
  clearQueue: () => void;
  reset: () => void;
  isFirstNotification: boolean;
  markFirstNotificationShown: () => void;
}

const NOTIFICATION_COOLDOWN_MS = 500;
const DEFAULT_DURATION_MS = 7000;
const FIRST_NOTIFICATION_DELAY_MS = 300;

export const useTrainingCoachStore = create<TrainingCoachStore>((set, get) => ({
  currentNotification: null,
  notificationQueue: [],
  notificationHistory: [],
  isProcessing: false,
  lastNotificationTime: 0,
  isFirstNotification: true,

  showNotification: (id, message, type, priority = 'medium', duration = DEFAULT_DURATION_MS, color, context) => {
    const now = Date.now();
    const { lastNotificationTime, currentNotification, isProcessing, isFirstNotification } = get();

    if (currentNotification && currentNotification.isVisible) {
      logger.debug('TRAINING_COACH', 'Notification already visible, queueing', { id });
      get().queueNotification(id, message, type, priority, duration, 0, color, context);
      return;
    }

    if (now - lastNotificationTime < NOTIFICATION_COOLDOWN_MS && !isProcessing) {
      logger.debug('TRAINING_COACH', 'In cooldown period, queueing', { id });
      get().queueNotification(id, message, type, priority, duration, NOTIFICATION_COOLDOWN_MS, color, context);
      return;
    }

    const showDelay = isFirstNotification ? FIRST_NOTIFICATION_DELAY_MS : 0;

    if (showDelay > 0) {
      logger.debug('TRAINING_COACH', 'Delaying first notification', { id, delay: showDelay });
      setTimeout(() => {
        get()._showNotificationImmediate(id, message, type, priority, duration, color, context);
      }, showDelay);
      get().markFirstNotificationShown();
      return;
    }

    get()._showNotificationImmediate(id, message, type, priority, duration, color, context);
  },

  _showNotificationImmediate: (id, message, type, priority = 'medium', duration = DEFAULT_DURATION_MS, color, context) => {
    const now = Date.now();

    const notification: TrainingNotification = {
      id,
      message,
      type,
      priority,
      duration,
      color,
      context,
      timestamp: new Date(),
      isVisible: true
    };

    set({
      currentNotification: notification,
      lastNotificationTime: now,
      notificationHistory: [...get().notificationHistory, id]
    });

    logger.info('TRAINING_COACH', 'Notification shown', {
      id,
      type,
      priority,
      message: message.substring(0, 50)
    });

    setTimeout(() => {
      const current = get().currentNotification;
      if (current && current.id === id) {
        get().hideNotification();
      }
    }, duration);
  },

  hideNotification: () => {
    const { currentNotification } = get();

    if (currentNotification) {
      set({ currentNotification: null });

      logger.debug('TRAINING_COACH', 'Notification hidden', {
        id: currentNotification.id
      });

      setTimeout(() => {
        get().processQueue();
      }, 300);
    }
  },

  queueNotification: (id, message, type, priority = 'medium', duration = DEFAULT_DURATION_MS, delayMs = 0, color, context) => {
    const queueItem: NotificationQueueItem = {
      notification: {
        id,
        message,
        type,
        priority,
        duration,
        color,
        context,
        timestamp: new Date(),
        isVisible: false
      },
      scheduledAt: Date.now() + delayMs,
      priority
    };

    set((state) => ({
      notificationQueue: [...state.notificationQueue, queueItem].sort(
        (a, b) => {
          const priorityOrder: Record<NotificationPriority, number> = {
            critical: 0,
            high: 1,
            medium: 2,
            low: 3
          };

          if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }

          return a.scheduledAt - b.scheduledAt;
        }
      )
    }));

    logger.debug('TRAINING_COACH', 'Notification queued', {
      id,
      priority,
      queueLength: get().notificationQueue.length + 1
    });

    if (delayMs > 0) {
      setTimeout(() => {
        get().processQueue();
      }, delayMs);
    }
  },

  processQueue: () => {
    const { notificationQueue, currentNotification, isProcessing } = get();

    if (isProcessing || currentNotification?.isVisible) {
      return;
    }

    if (notificationQueue.length === 0) {
      return;
    }

    set({ isProcessing: true });

    const now = Date.now();
    const nextItem = notificationQueue.find(item => item.scheduledAt <= now);

    if (!nextItem) {
      set({ isProcessing: false });

      const nextScheduledTime = Math.min(...notificationQueue.map(item => item.scheduledAt));
      const delay = nextScheduledTime - now;

      if (delay > 0 && delay < 60000) {
        setTimeout(() => {
          get().processQueue();
        }, delay);
      }

      return;
    }

    set((state) => ({
      notificationQueue: state.notificationQueue.filter(item => item !== nextItem),
      isProcessing: false
    }));

    const { notification } = nextItem;
    get().showNotification(
      notification.id,
      notification.message,
      notification.type,
      notification.priority,
      notification.duration,
      notification.color,
      notification.context
    );

    logger.debug('TRAINING_COACH', 'Queue processed', {
      shown: notification.id,
      remaining: get().notificationQueue.length
    });
  },

  clearQueue: () => {
    set({ notificationQueue: [] });
    logger.debug('TRAINING_COACH', 'Queue cleared');
  },

  reset: () => {
    set({
      currentNotification: null,
      notificationQueue: [],
      notificationHistory: [],
      isProcessing: false,
      lastNotificationTime: 0,
      isFirstNotification: true
    });
    logger.info('TRAINING_COACH', 'Store reset');
  },

  markFirstNotificationShown: () => {
    set({ isFirstNotification: false });
  }
}));
