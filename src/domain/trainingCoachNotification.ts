/**
 * Training Coach Notification Domain Types
 * Types pour le système de notifications contextuelles du coach pendant la Step 3
 */

export type TrainingNotificationId =
  | 'step2-generation-start'
  | 'step2-generation-analyzing'
  | 'step2-generation-selecting'
  | 'step2-generation-calculating'
  | 'step2-generation-complete'
  | 'step2-welcome-intro'
  | 'step2-welcome-help'
  | 'step2-sets-increased'
  | 'step2-sets-decreased'
  | 'step2-reps-increased'
  | 'step2-reps-decreased'
  | 'step2-load-increased'
  | 'step2-load-decreased'
  | 'step2-alternative-selected'
  | 'step2-exercise-regenerating'
  | 'step2-exercise-regenerated'
  | 'step2-exercise-error'
  | 'step3-warmup-start'
  | 'step3-warmup-tip'
  | 'step3-warmup-complete'
  | 'step3-warmup-skipped'
  | 'step3-arrival'
  | 'step3-countdown-10s'
  | 'step3-countdown-5s'
  | 'step3-countdown-3s'
  | 'step3-countdown-go'
  | 'step3-new-exercise'
  | 'step3-set-complete'
  | 'step3-load-adjust-up'
  | 'step3-load-adjust-down'
  | 'step3-rest-tip-1'
  | 'step3-rest-tip-2'
  | 'step3-rest-tip-3'
  | 'step3-transition-ready'
  | 'step3-rpe-feedback-easy'
  | 'step3-rpe-feedback-moderate'
  | 'step3-rpe-feedback-hard'
  | 'step3-exercise-complete'
  | 'step3-session-paused'
  | 'step3-session-resumed'
  | 'step3-rest-paused'
  | 'step3-rest-resumed'
  | 'step4-arrival-welcome'
  | 'step4-analysis-ready'
  | 'step4-insights-highlight';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export type NotificationType = 'motivation' | 'instruction' | 'tip' | 'feedback' | 'warning' | 'success';

export interface TrainingNotificationContext {
  exerciseName?: string;
  exerciseVariant?: string;
  currentSet?: number;
  totalSets?: number;
  sets?: number;
  reps?: number;
  load?: number;
  oldLoad?: number;
  newLoad?: number;
  loadAdjustment?: number;
  loadIncrement?: number;
  restTime?: number;
  rpe?: number;
  nextExerciseName?: string;
  nextExerciseVariant?: string;
  newExerciseName?: string;
  completedExercises?: number;
  totalExercises?: number;
  substitutionName?: string;
  currentExerciseIndex?: number;
}

export interface TrainingNotification {
  id: TrainingNotificationId;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  duration: number;
  color?: string;
  context?: TrainingNotificationContext;
  timestamp: Date;
  isVisible: boolean;
}

export interface NotificationQueueItem {
  notification: TrainingNotification;
  scheduledAt: number;
  priority: NotificationPriority;
}

export interface TrainingCoachNotificationState {
  currentNotification: TrainingNotification | null;
  notificationQueue: NotificationQueueItem[];
  notificationHistory: TrainingNotificationId[];
  isProcessing: boolean;
  lastNotificationTime: number;
}
