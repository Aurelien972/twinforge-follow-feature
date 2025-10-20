/**
 * Apple Health Plugin - Web Implementation
 * Fallback pour le développement web (retourne des données mockées)
 */

import type {
  AppleHealthPlugin,
  HealthDataType,
  AuthorizationStatus,
  HeartRateData,
  HRVData,
  StepsData,
  CaloriesData,
  DistanceData,
  WorkoutData,
  WorkoutDetailData,
  SleepData,
  VO2MaxData,
  RestingHeartRateData,
} from './definitions';

export class AppleHealthWeb implements AppleHealthPlugin {
  async isAvailable(): Promise<{ available: boolean }> {
    console.log('AppleHealthWeb: isAvailable called - returning false (web platform)');
    return { available: false };
  }

  async requestAuthorization(options: {
    readTypes: HealthDataType[];
    writeTypes?: HealthDataType[];
  }): Promise<{ granted: boolean }> {
    console.log('AppleHealthWeb: requestAuthorization called', options);
    return { granted: false };
  }

  async getAuthorizationStatus(options: {
    type: HealthDataType;
  }): Promise<{ status: AuthorizationStatus }> {
    console.log('AppleHealthWeb: getAuthorizationStatus called', options);
    return { status: 'notDetermined' };
  }

  async getHeartRateData(options: {
    startDate: string;
    endDate: string;
    limit?: number;
  }): Promise<{ data: HeartRateData[] }> {
    console.log('AppleHealthWeb: getHeartRateData called', options);
    return { data: [] };
  }

  async getHRVData(options: {
    startDate: string;
    endDate: string;
    limit?: number;
  }): Promise<{ data: HRVData[] }> {
    console.log('AppleHealthWeb: getHRVData called', options);
    return { data: [] };
  }

  async getStepsData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: StepsData[] }> {
    console.log('AppleHealthWeb: getStepsData called', options);
    return { data: [] };
  }

  async getActiveCaloriesData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: CaloriesData[] }> {
    console.log('AppleHealthWeb: getActiveCaloriesData called', options);
    return { data: [] };
  }

  async getRestingCaloriesData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: CaloriesData[] }> {
    console.log('AppleHealthWeb: getRestingCaloriesData called', options);
    return { data: [] };
  }

  async getDistanceData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: DistanceData[] }> {
    console.log('AppleHealthWeb: getDistanceData called', options);
    return { data: [] };
  }

  async getWorkouts(options: {
    startDate: string;
    endDate: string;
    limit?: number;
  }): Promise<{ workouts: WorkoutData[] }> {
    console.log('AppleHealthWeb: getWorkouts called', options);
    return { workouts: [] };
  }

  async getWorkoutDetails(options: {
    workoutId: string;
  }): Promise<{ workout: WorkoutDetailData }> {
    console.log('AppleHealthWeb: getWorkoutDetails called', options);
    throw new Error('No workout found');
  }

  async getSleepData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: SleepData[] }> {
    console.log('AppleHealthWeb: getSleepData called', options);
    return { data: [] };
  }

  async getVO2MaxData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: VO2MaxData[] }> {
    console.log('AppleHealthWeb: getVO2MaxData called', options);
    return { data: [] };
  }

  async getRestingHeartRateData(options: {
    startDate: string;
    endDate: string;
  }): Promise<{ data: RestingHeartRateData[] }> {
    console.log('AppleHealthWeb: getRestingHeartRateData called', options);
    return { data: [] };
  }

  async startObserving(options: {
    type: HealthDataType;
  }): Promise<{ success: boolean }> {
    console.log('AppleHealthWeb: startObserving called', options);
    return { success: false };
  }

  async stopObserving(options: {
    type: HealthDataType;
  }): Promise<{ success: boolean }> {
    console.log('AppleHealthWeb: stopObserving called', options);
    return { success: false };
  }
}
