/**
 * Apple Health / HealthKit Plugin Definitions
 * Interface entre le code TypeScript et le code natif iOS
 */

export interface AppleHealthPlugin {
  /**
   * Vérifie si HealthKit est disponible sur cet appareil
   */
  isAvailable(): Promise<{ available: boolean }>;

  /**
   * Demande les permissions HealthKit pour les types de données spécifiés
   */
  requestAuthorization(options: {
    readTypes: HealthDataType[];
    writeTypes?: HealthDataType[];
  }): Promise<{ granted: boolean }>;

  /**
   * Vérifie le statut des permissions pour un type de données
   */
  getAuthorizationStatus(options: {
    type: HealthDataType;
  }): Promise<{ status: AuthorizationStatus }>;

  /**
   * Récupère les données de fréquence cardiaque
   */
  getHeartRateData(options: {
    startDate: string;
    endDate: string;
    limit?: number;
  }): Promise<{ data: HeartRateData[] }>;

  /**
   * Récupère les données de variabilité cardiaque (HRV)
   */
  getHRVData(options: {
    startDate: string;
    endDate: string;
    limit?: number;
  }): Promise<{ data: HRVData[] }>;

  /**
   * Récupère les pas
   */
  getStepsData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: StepsData[] }>;

  /**
   * Récupère les calories actives
   */
  getActiveCaloriesData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: CaloriesData[] }>;

  /**
   * Récupère les calories de repos
   */
  getRestingCaloriesData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: CaloriesData[] }>;

  /**
   * Récupère la distance parcourue
   */
  getDistanceData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: DistanceData[] }>;

  /**
   * Récupère les entraînements
   */
  getWorkouts(options: {
    startDate: string;
    endDate: string;
    limit?: number;
  }): Promise<{ workouts: WorkoutData[] }>;

  /**
   * Récupère les détails complets d'un entraînement
   */
  getWorkoutDetails(options: {
    workoutId: string;
  }): Promise<{ workout: WorkoutDetailData }>;

  /**
   * Récupère les données de sommeil
   */
  getSleepData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: SleepData[] }>;

  /**
   * Récupère le VO2Max
   */
  getVO2MaxData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: VO2MaxData[] }>;

  /**
   * Récupère la fréquence cardiaque au repos
   */
  getRestingHeartRateData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: RestingHeartRateData[] }>;

  /**
   * Démarre l'observation en temps réel d'un type de données
   */
  startObserving(options: {
    type: HealthDataType;
  }): Promise<{ success: boolean }>;

  /**
   * Arrête l'observation d'un type de données
   */
  stopObserving(options: {
    type: HealthDataType;
  }): Promise<{ success: boolean }>;
}

export type HealthDataType =
  | 'heartRate'
  | 'heartRateVariability'
  | 'steps'
  | 'activeCalories'
  | 'restingCalories'
  | 'distance'
  | 'workout'
  | 'sleep'
  | 'vo2Max'
  | 'restingHeartRate'
  | 'bloodPressure'
  | 'bloodGlucose'
  | 'oxygenSaturation'
  | 'bodyTemperature'
  | 'respiratoryRate';

export type AuthorizationStatus =
  | 'notDetermined'
  | 'sharingDenied'
  | 'sharingAuthorized'
  | 'unknown';

export interface HeartRateData {
  value: number;
  unit: 'bpm';
  startDate: string;
  endDate: string;
  sourceApp: string;
  device?: string;
}

export interface HRVData {
  value: number;
  unit: 'ms';
  startDate: string;
  endDate: string;
  sourceApp: string;
  device?: string;
}

export interface StepsData {
  value: number;
  unit: 'count';
  startDate: string;
  endDate: string;
  sourceApp: string;
  device?: string;
}

export interface CaloriesData {
  value: number;
  unit: 'kcal';
  startDate: string;
  endDate: string;
  sourceApp: string;
  device?: string;
}

export interface DistanceData {
  value: number;
  unit: 'meters';
  startDate: string;
  endDate: string;
  sourceApp: string;
  device?: string;
}

export interface WorkoutData {
  id: string;
  activityType: WorkoutActivityType;
  startDate: string;
  endDate: string;
  duration: number;
  totalDistance?: number;
  totalCalories?: number;
  sourceApp: string;
  device?: string;
}

export interface WorkoutDetailData extends WorkoutData {
  heartRateSamples: HeartRateData[];
  distanceSamples: DistanceData[];
  caloriesBurned: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
  minHeartRate?: number;
  zones?: {
    zone1Minutes: number;
    zone2Minutes: number;
    zone3Minutes: number;
    zone4Minutes: number;
    zone5Minutes: number;
  };
  elevationGain?: number;
  averagePace?: number;
  averageCadence?: number;
  averagePower?: number;
  route?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  }[];
}

export type WorkoutActivityType =
  | 'running'
  | 'walking'
  | 'cycling'
  | 'swimming'
  | 'hiking'
  | 'yoga'
  | 'functionalStrength'
  | 'traditionalStrength'
  | 'coreTraining'
  | 'flexibility'
  | 'highIntensityInterval'
  | 'crossTraining'
  | 'rowing'
  | 'stairs'
  | 'elliptical'
  | 'other';

export interface SleepData {
  startDate: string;
  endDate: string;
  value: 'inBed' | 'asleep' | 'awake';
  sourceApp: string;
  device?: string;
}

export interface VO2MaxData {
  value: number;
  unit: 'ml/kg/min';
  startDate: string;
  endDate: string;
  sourceApp: string;
  device?: string;
}

export interface RestingHeartRateData {
  value: number;
  unit: 'bpm';
  date: string;
  sourceApp: string;
  device?: string;
}
