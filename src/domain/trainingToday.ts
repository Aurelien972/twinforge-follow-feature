/**
 * Training Today Domain Types
 * Types for the "Aujourd'hui" tab of the Training Workshop
 */

export type SessionType = 'full_body' | 'upper' | 'lower' | 'push' | 'pull' | 'legs' | 'cardio' | 'mobility';

export type ReadinessStatus = 'ready' | 'recovering' | 'fatigued';

export type IntensityLevel = 'light' | 'moderate' | 'intense';

export type GoalType = 'strength' | 'endurance' | 'weight_loss' | 'muscle_gain' | 'maintenance';

export type PerformanceIndicator = 'good' | 'moderate' | 'poor';

export interface HistoryFilters {
  period: 'week' | 'month' | 'quarter' | 'year' | 'all';
  type: 'all' | SessionType;
  discipline?: string;
}

export interface StreakMilestone {
  days: number;
  achieved: boolean;
  achievedDate: Date | null;
}

export interface StreakData {
  current: number;
  longest: number;
  milestones: StreakMilestone[];
}

export interface RecoveryData {
  muscular: number;
  systemic: number;
  lastCalculated: Date;
}

export interface OptimalWindow {
  start: Date;
  end: Date;
  type: 'morning' | 'evening';
  reason: string;
}

export interface TrainingSession {
  id: string;
  date: Date;
  type: SessionType;
  duration: number;
  rpeAverage: number;
  completed: boolean;
  exercisesCompleted: number;
  exercisesTotal: number;
}

export interface QuickHistoryItem {
  id: string;
  date: Date;
  type: SessionType;
  duration: number;
  rpeAverage: number;
  completed: boolean;
  performanceIndicator: PerformanceIndicator;
}

export interface TrainingGoal {
  id: string;
  title: string;
  type: GoalType;
  currentValue: number;
  targetValue: number;
  unit: string;
  deadline: Date;
  createdAt: Date;
  progress: number;
}

export interface QuickInsights {
  streak: number;
  sessionsThisMonth: number;
  sessionsLastMonth: number;
  rpeAverage7d: number;
  totalTimeThisMonth: number;
  timeGoal: number | null;
  comparisons: {
    sessionsVsLastMonth: number;
    timeVsGoal: number | null;
  };
}

export interface NextActionSuggestionData {
  suggestion: string;
  reason: string;
  suggestedTime: Date | null;
  intensity: IntensityLevel;
  confidence: number;
}

export interface HeroCtaData {
  lastSessionDate: Date | null;
  streak: number;
  recoveryStatus: ReadinessStatus;
  optimalWindow: OptimalWindow | null;
  estimatedEnergy: number;
  title: string;
  subtitle: string;
  showStreakBadge: boolean;
  showOptimalWindowBadge: boolean;
}

export interface TodayStatus {
  lastSession: TrainingSession | null;
  streak: StreakData;
  recovery: RecoveryData;
  optimalWindows: OptimalWindow[];
  estimatedEnergy: number;
  readinessScore: number;
  readinessStatus: ReadinessStatus;
}

// =====================================================
// CONSEILS TAB TYPES
// =====================================================

export interface ProgressionTrend {
  period: string;
  rpeAverage: number;
  volumeTotal: number;
  intensityScore: number;
}

export interface WeeklyPattern {
  dayOfWeek: number;
  dayName: string;
  sessionsCount: number;
  avgRpe: number;
  avgDuration: number;
}

export interface MuscleGroupProgress {
  group: string;
  color: string;
  sessionsCount: number;
  volumeTrend: 'up' | 'stable' | 'down';
  lastSession: Date | null;
}

export interface VolumeIntensityBalance {
  volumeScore: number;
  intensityScore: number;
  recoveryScore: number;
  recommendation: string;
  color: string;
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  category: string;
  value: number;
  unit: string;
  achievedDate: Date;
  color: string;
}

export interface GoalAlignment {
  goalTitle: string;
  currentProgress: number;
  targetValue: number;
  onTrack: boolean;
  daysRemaining: number;
  recommendedAction: string;
  color: string;
}

export interface AdaptiveRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'intensity' | 'volume' | 'recovery' | 'schedule' | 'equipment';
  priority: 'high' | 'medium' | 'low';
  color: string;
  icon: string;
  actionable: boolean;
  actionLabel?: string;
}

export interface NextWeekPlan {
  weekNumber: number;
  suggestedSessions: number;
  suggestedDays: string[];
  intensityDistribution: {
    light: number;
    moderate: number;
    intense: number;
  };
  focusAreas: string[];
  restDaysRecommended: number;
}

export interface ConseilsTabData {
  progressionTrends: ProgressionTrend[];
  weeklyPatterns: WeeklyPattern[];
  muscleGroupProgress: MuscleGroupProgress[];
  volumeIntensityBalance: VolumeIntensityBalance;
  personalRecords: PersonalRecord[];
  goalAlignment: GoalAlignment[];
  recommendations: AdaptiveRecommendation[];
  nextWeekPlan: NextWeekPlan;
}

// =====================================================
// HISTORIQUE TAB TYPES
// =====================================================

export type HistoryFilterPeriod = 'week' | 'month' | 'quarter' | 'year' | 'all';

export type HistoryFilterType = 'all' | SessionType;

export interface HistoryFilters {
  period: HistoryFilterPeriod;
  type: HistoryFilterType;
  startDate?: Date;
  endDate?: Date;
}

export interface SessionHistoryDetail extends TrainingSession {
  location?: string;
  equipment?: string[];
  exercises: {
    id: string;
    name: string;
    sets?: number;
    reps?: string;
    load?: number;
    rpeTarget?: number;
    completed?: boolean;
  }[];
  notes?: string;

  // Discipline tracking
  discipline?: string;

  // Discipline-specific metrics
  primaryMetric?: number;
  primaryMetricUnit?: string;
  secondaryMetric?: number;

  // Additional metrics
  totalVolume?: number;
  avgIntensity?: number;
  performanceScore?: number;
}

export interface HistoryStats {
  totalSessions: number;
  totalMinutes: number;
  avgDuration: number;
  avgRpe: number;
  currentStreak: number;
  completionRate: number;
  periodLabel: string;

  // Discipline-specific metrics (optional)
  volumeKg?: number;
  maxWeight?: number;
  distanceKm?: number;
  avgPace?: string;
}

export interface MonthlyCalendarData {
  year: number;
  month: number;
  days: {
    date: Date;
    hasSessions: boolean;
    sessionsCount: number;
    avgRpe: number;
    types: SessionType[];
  }[];
}

export interface HistoryTabData {
  sessions: SessionHistoryDetail[];
  stats: HistoryStats;
  calendarData?: MonthlyCalendarData;
  filters?: HistoryFilters;
}
