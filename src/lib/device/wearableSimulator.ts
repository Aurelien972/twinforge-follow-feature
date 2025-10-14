/**
 * Wearable Device Simulator
 * Generates realistic mock data for testing without real devices
 */

import type { ConnectedDevice, WearableHealthData, Provider, HealthDataType } from '../../domain/connectedDevices';
import logger from '../utils/logger';

export class WearableSimulator {
  private simulatedDevices: Map<string, ConnectedDevice> = new Map();
  private dataGenerationIntervals: Map<string, number> = new Map();

  createSimulatedDevice(provider: Provider, userId: string): ConnectedDevice {
    const deviceId = `sim-${provider}-${Date.now()}`;

    const device: ConnectedDevice = {
      id: deviceId,
      userId,
      provider,
      providerUserId: `sim-user-${Math.random().toString(36).substring(7)}`,
      displayName: `${provider.toUpperCase()} (Simulation)`,
      deviceType: this.getDeviceType(provider),
      status: 'connected',
      scopes: ['read', 'activity:read_all'],
      lastSyncAt: new Date().toISOString(),
      lastError: null,
      errorCount: 0,
      metadata: { simulated: true },
      connectedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.simulatedDevices.set(deviceId, device);
    logger.info('SIMULATOR', 'Created simulated device', { provider, deviceId });

    return device;
  }

  generateHealthData(
    deviceId: string,
    dataType: HealthDataType,
    count: number = 10
  ): WearableHealthData[] {
    const device = this.simulatedDevices.get(deviceId);
    if (!device) {
      throw new Error('Simulated device not found');
    }

    const data: WearableHealthData[] = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now - i * 60 * 60 * 1000);

      data.push({
        id: `sim-data-${dataType}-${i}-${Date.now()}`,
        userId: device.userId,
        deviceId,
        dataType,
        timestamp: timestamp.toISOString(),
        valueNumeric: this.generateValue(dataType, i),
        unit: this.getUnit(dataType),
        qualityScore: 85 + Math.random() * 15,
        rawData: { simulated: true, index: i },
        syncedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    }

    logger.info('SIMULATOR', 'Generated health data', { deviceId, dataType, count });
    return data;
  }

  generateWorkoutData(deviceId: string, workoutType: string = 'running'): WearableHealthData {
    const device = this.simulatedDevices.get(deviceId);
    if (!device) {
      throw new Error('Simulated device not found');
    }

    const durationMinutes = 30 + Math.random() * 60;
    const distanceKm = 5 + Math.random() * 15;

    const workout = {
      activityType: workoutType,
      startTime: new Date(Date.now() - durationMinutes * 60 * 1000).toISOString(),
      endTime: new Date().toISOString(),
      durationSeconds: durationMinutes * 60,
      distanceMeters: distanceKm * 1000,
      caloriesBurned: Math.round(durationMinutes * 10 + Math.random() * 100),
      avgHeartRate: 140 + Math.round(Math.random() * 30),
      maxHeartRate: 170 + Math.round(Math.random() * 20),
      elevationGainMeters: Math.round(Math.random() * 200),
      avgPace: this.formatPace(durationMinutes / distanceKm),
      zones: {
        zone1Minutes: Math.round(durationMinutes * 0.1),
        zone2Minutes: Math.round(durationMinutes * 0.3),
        zone3Minutes: Math.round(durationMinutes * 0.4),
        zone4Minutes: Math.round(durationMinutes * 0.15),
        zone5Minutes: Math.round(durationMinutes * 0.05),
      },
    };

    return {
      id: `sim-workout-${Date.now()}`,
      userId: device.userId,
      deviceId,
      dataType: 'workout',
      timestamp: workout.startTime,
      valueJson: workout,
      unit: 'activity',
      qualityScore: 90,
      sourceWorkoutId: `sim-workout-id-${Date.now()}`,
      rawData: { simulated: true, ...workout },
      syncedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  }

  generateDailySummary(deviceId: string): Record<HealthDataType, number> {
    return {
      heart_rate: 72 + Math.round(Math.random() * 10),
      resting_heart_rate: 60 + Math.round(Math.random() * 10),
      steps: 5000 + Math.round(Math.random() * 10000),
      calories: 1800 + Math.round(Math.random() * 800),
      distance: 5 + Math.random() * 10,
      active_minutes: 30 + Math.round(Math.random() * 120),
      sleep: 6 + Math.random() * 3,
      hrv: 40 + Math.round(Math.random() * 60),
      spo2: 95 + Math.round(Math.random() * 4),
      stress_level: 20 + Math.round(Math.random() * 60),
      vo2max: 40 + Math.round(Math.random() * 20),
    } as any;
  }

  startRealtimeSimulation(deviceId: string, dataTypes: HealthDataType[]): void {
    if (this.dataGenerationIntervals.has(deviceId)) {
      logger.warn('SIMULATOR', 'Realtime simulation already running', { deviceId });
      return;
    }

    const interval = window.setInterval(() => {
      dataTypes.forEach((dataType) => {
        const data = this.generateHealthData(deviceId, dataType, 1)[0];
        logger.debug('SIMULATOR', 'Generated realtime data', { deviceId, dataType, data });
      });
    }, 5000);

    this.dataGenerationIntervals.set(deviceId, interval);
    logger.info('SIMULATOR', 'Started realtime simulation', { deviceId, dataTypes });
  }

  stopRealtimeSimulation(deviceId: string): void {
    const interval = this.dataGenerationIntervals.get(deviceId);
    if (interval) {
      clearInterval(interval);
      this.dataGenerationIntervals.delete(deviceId);
      logger.info('SIMULATOR', 'Stopped realtime simulation', { deviceId });
    }
  }

  simulateError(deviceId: string, errorMessage: string): void {
    const device = this.simulatedDevices.get(deviceId);
    if (device) {
      device.status = 'error';
      device.lastError = errorMessage;
      device.errorCount++;
      logger.warn('SIMULATOR', 'Simulated error', { deviceId, errorMessage });
    }
  }

  simulateTokenExpiry(deviceId: string): void {
    const device = this.simulatedDevices.get(deviceId);
    if (device) {
      device.status = 'token_expired';
      logger.warn('SIMULATOR', 'Simulated token expiry', { deviceId });
    }
  }

  getSimulatedDevices(): ConnectedDevice[] {
    return Array.from(this.simulatedDevices.values());
  }

  clearSimulation(): void {
    this.dataGenerationIntervals.forEach((interval) => clearInterval(interval));
    this.dataGenerationIntervals.clear();
    this.simulatedDevices.clear();
    logger.info('SIMULATOR', 'Cleared all simulations');
  }

  private getDeviceType(provider: Provider): ConnectedDevice['deviceType'] {
    const types: Record<Provider, ConnectedDevice['deviceType']> = {
      strava: 'smartwatch',
      garmin: 'smartwatch',
      fitbit: 'fitness_tracker',
      apple_health: 'smartwatch',
      polar: 'running_watch',
      wahoo: 'bike_computer',
      whoop: 'fitness_tracker',
      oura: 'other',
      suunto: 'running_watch',
      coros: 'running_watch',
      google_fit: 'fitness_tracker',
    };
    return types[provider];
  }

  private generateValue(dataType: HealthDataType, index: number): number {
    const baseValues: Record<HealthDataType, number> = {
      heart_rate: 70 + Math.sin(index) * 20,
      resting_heart_rate: 60,
      steps: 1000 + Math.random() * 500,
      calories: 100 + Math.random() * 50,
      distance: 0.5 + Math.random() * 2,
      active_minutes: 10 + Math.random() * 20,
      elevation: 10 + Math.random() * 50,
      cadence: 160 + Math.random() * 20,
      power: 200 + Math.random() * 100,
      hrv: 50 + Math.random() * 30,
      spo2: 96 + Math.random() * 3,
      stress_level: 30 + Math.random() * 40,
      vo2max: 45 + Math.random() * 15,
      body_battery: 70 + Math.random() * 25,
      temperature: 36.5 + Math.random() * 0.5,
    } as any;

    return baseValues[dataType] || 0;
  }

  private getUnit(dataType: HealthDataType): string {
    const units: Record<HealthDataType, string> = {
      heart_rate: 'bpm',
      resting_heart_rate: 'bpm',
      steps: 'steps',
      calories: 'kcal',
      distance: 'km',
      active_minutes: 'minutes',
      elevation: 'meters',
      cadence: 'rpm',
      power: 'watts',
      pace: 'min/km',
      hrv: 'ms',
      spo2: '%',
      stress_level: 'score',
      vo2max: 'ml/kg/min',
      body_battery: 'score',
      temperature: '°C',
      weight: 'kg',
      blood_pressure: 'mmHg',
      sleep: 'hours',
      workout: 'activity',
      hydration: 'ml',
      nutrition: 'kcal',
    } as any;

    return units[dataType] || 'unit';
  }

  private formatPace(minutesPerKm: number): string {
    const minutes = Math.floor(minutesPerKm);
    const seconds = Math.round((minutesPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export const wearableSimulator = new WearableSimulator();
