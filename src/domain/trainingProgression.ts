/**
 * Training Progression Domain Types
 * Types for the "Progression" tab - long-term evolution and achievements
 */

export type AchievementCategory = 'volume' | 'strength' | 'consistency' | 'milestone' | 'streak';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type MilestoneType = 'sessions' | 'volume' | 'streak' | 'duration' | 'strength';

// User Level and XP System
export interface UserLevel {
  currentLevel: number;
  currentXP: number;
  xpForNextLevel: number;
  xpProgress: number;
  totalXP: number;
  levelTitle: string;
}

// Achievement Badge System
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;
  color: string;
  unlockedAt: Date | null;
  isUnlocked: boolean;
  progress: number;
  target: number;
  xpReward: number;
}

// Milestone Tracking
export interface Milestone {
  id: string;
  type: MilestoneType;
  title: string;
  description: string;
  target: number;
  current: number;
  progress: number;
  isCompleted: boolean;
  completedAt: Date | null;
  icon: string;
  color: string;
  nextMilestone?: number;
}

// Volume Progression Over Time
export interface VolumeDataPoint {
  weekLabel: string;
  weekNumber: number;
  totalVolume: number;
  sessionsCount: number;
  avgVolumePerSession: number;
  startDate: Date;
  endDate: Date;
}

// Strength Evolution by Muscle Group
export interface StrengthDataPoint {
  date: Date;
  muscleGroup: string;
  maxWeight: number;
  totalVolume: number;
  exerciseName: string;
}

export interface StrengthEvolution {
  muscleGroup: string;
  color: string;
  dataPoints: StrengthDataPoint[];
  percentageChange: number;
  bestLift: {
    weight: number;
    date: Date;
    exercise: string;
  };
}

// Consistency Calendar Data
export interface CalendarDay {
  date: Date;
  hasSession: boolean;
  sessionsCount: number;
  totalVolume: number;
  avgRPE: number;
  intensity: 'none' | 'light' | 'moderate' | 'high';
}

export interface ConsistencyCalendar {
  startDate: Date;
  endDate: Date;
  days: CalendarDay[];
  stats: {
    totalDays: number;
    activeDays: number;
    consistencyPercentage: number;
    currentStreak: number;
    longestStreak: number;
  };
}

// Personal Records Timeline
export interface PersonalRecord {
  id: string;
  exerciseName: string;
  muscleGroup: string;
  recordType: 'max_weight' | 'max_volume' | 'max_reps' | 'best_time';
  value: number;
  unit: string;
  achievedAt: Date;
  previousRecord: number | null;
  improvement: number | null;
  color: string;
  notes?: string;
}

// Monthly Comparison Data
export interface MonthlyStats {
  year: number;
  month: number;
  monthLabel: string;
  totalSessions: number;
  totalVolume: number;
  totalDuration: number;
  avgRPE: number;
  newRecords: number;
  consistencyPercentage: number;
}

export interface MonthlyComparison {
  currentMonth: MonthlyStats;
  previousMonth: MonthlyStats;
  changes: {
    sessions: { value: number; percentage: number };
    volume: { value: number; percentage: number };
    duration: { value: number; percentage: number };
    rpe: { value: number; percentage: number };
    consistency: { value: number; percentage: number };
  };
}

// Year over Year Comparison
export interface YearlyComparison {
  currentYear: {
    year: number;
    months: MonthlyStats[];
    totals: {
      sessions: number;
      volume: number;
      duration: number;
    };
  };
  previousYear: {
    year: number;
    months: MonthlyStats[];
    totals: {
      sessions: number;
      volume: number;
      duration: number;
    };
  };
}

// RPE Distribution Analysis
export interface RPEDistribution {
  rpeLevel: number;
  count: number;
  percentage: number;
  color: string;
}

// Intensity vs Volume Analysis
export interface IntensityVolumePoint {
  date: Date;
  avgRPE: number;
  totalVolume: number;
  sessionType: string;
  color: string;
}

// Recovery Trends Over Time
export interface RecoveryTrend {
  date: Date;
  muscularRecovery: number;
  systemicRecovery: number;
  readinessScore: number;
  wasRestDay: boolean;
}

// Predictive Insights
export interface ProgressionPrediction {
  metric: string;
  currentValue: number;
  predicted30Days: number;
  predicted90Days: number;
  confidence: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

// Quest System for Gamification
export interface ProgressionQuest {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  target: number;
  xpReward: number;
  deadline: Date | null;
  isActive: boolean;
  isCompleted: boolean;
  completedAt: Date | null;
  icon: string;
  color: string;
}

// Main Progression Data Structure
export interface ProgressionTabData {
  // User Level and XP
  userLevel: UserLevel;

  // Achievements and Milestones
  achievements: Achievement[];
  milestones: Milestone[];
  activeQuests: ProgressionQuest[];

  // Time-based Progression
  volumeProgression: VolumeDataPoint[];
  strengthEvolution: StrengthEvolution[];
  consistencyCalendar: ConsistencyCalendar;

  // Records and Comparisons
  personalRecords: PersonalRecord[];
  monthlyComparison: MonthlyComparison;
  yearlyComparison: YearlyComparison | null;

  // Analysis and Insights
  rpeDistribution: RPEDistribution[];
  intensityVolumeData: IntensityVolumePoint[];
  recoveryTrends: RecoveryTrend[];
  predictions: ProgressionPrediction[];

  // Summary Stats
  summary: {
    totalSessions: number;
    totalVolume: number;
    totalDuration: number;
    achievementsUnlocked: number;
    milestonesCompleted: number;
    currentStreak: number;
    longestStreak: number;
    recordsSet: number;
  };
}

// Filter options for progression view
export type ProgressionPeriod = '1month' | '3months' | '6months' | '1year' | 'all';

export interface ProgressionFilters {
  period: ProgressionPeriod;
  category?: AchievementCategory;
  muscleGroup?: string;
}
