/**
 * Apple Health Service
 * Service pour gérer la synchronisation des données Apple Health/HealthKit
 */

import { AppleHealth } from '../../plugins/apple-health';
import type {
  HealthDataType,
  WorkoutData,
  WorkoutDetailData,
} from '../../plugins/apple-health';
import { supabase } from '../supabase/client';
import type { WearableHealthData } from '../../domain/connectedDevices';
import logger from '../../lib/utils/logger';

export class AppleHealthService {
  /**
   * Vérifie si Apple Health est disponible
   */
  async isAvailable(): Promise<boolean> {
    try {
      const { available } = await AppleHealth.isAvailable();
      return available;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Error checking availability', { error });
      return false;
    }
  }

  /**
   * Demande les permissions pour tous les types de données nécessaires
   */
  async requestPermissions(): Promise<boolean> {
    try {
      logger.info('APPLE_HEALTH', 'Requesting permissions');

      const readTypes: HealthDataType[] = [
        'heartRate',
        'heartRateVariability',
        'steps',
        'activeCalories',
        'restingCalories',
        'distance',
        'workout',
        'sleep',
        'vo2Max',
        'restingHeartRate',
        'oxygenSaturation',
      ];

      const { granted } = await AppleHealth.requestAuthorization({
        readTypes,
      });

      if (granted) {
        logger.info('APPLE_HEALTH', 'Permissions granted');
        await this.createDeviceConnection();
      } else {
        logger.warn('APPLE_HEALTH', 'Permissions denied');
      }

      return granted;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Error requesting permissions', { error });
      return false;
    }
  }

  /**
   * Crée la connexion du device Apple Health dans la base de données
   */
  private async createDeviceConnection(): Promise<string | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: existing } = await supabase
        .from('connected_devices')
        .select('id')
        .eq('user_id', user.id)
        .eq('provider', 'apple_health')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('connected_devices')
          .update({
            status: 'connected',
            last_sync_at: new Date().toISOString(),
          })
          .eq('id', existing.id);

        return existing.id;
      }

      const { data, error } = await supabase
        .from('connected_devices')
        .insert({
          user_id: user.id,
          provider: 'apple_health',
          provider_user_id: user.id,
          display_name: 'Apple Health',
          device_type: 'smartwatch',
          status: 'connected',
          scopes: [
            'heart_rate',
            'hrv',
            'steps',
            'calories',
            'distance',
            'workout',
            'sleep',
            'vo2max',
          ],
          metadata: {
            device: 'Apple Watch',
            platform: 'iOS',
          },
          connected_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (error) {
        logger.error('APPLE_HEALTH', 'Error creating device connection', { error });
        throw error;
      }

      logger.info('APPLE_HEALTH', 'Device connection created', { deviceId: data.id });
      return data.id;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Failed to create device connection', { error });
      return null;
    }
  }

  /**
   * Synchronise toutes les données depuis une date de début
   */
  async syncAllData(options: {
    startDate: Date;
    endDate?: Date;
  }): Promise<{ success: boolean; recordsStored: number }> {
    const startTime = Date.now();
    const endDate = options.endDate || new Date();
    let recordsStored = 0;

    try {
      logger.info('APPLE_HEALTH', 'Starting full sync', {
        startDate: options.startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: device } = await supabase
        .from('connected_devices')
        .select('id')
        .eq('user_id', user.id)
        .eq('provider', 'apple_health')
        .maybeSingle();

      if (!device) {
        throw new Error('Apple Health device not connected');
      }

      const syncHistory = await this.createSyncHistory(device.id, user.id);

      await supabase
        .from('connected_devices')
        .update({ status: 'syncing' })
        .eq('id', device.id);

      const heartRateCount = await this.syncHeartRate(
        user.id,
        device.id,
        options.startDate,
        endDate
      );
      recordsStored += heartRateCount;

      const hrvCount = await this.syncHRV(user.id, device.id, options.startDate, endDate);
      recordsStored += hrvCount;

      const stepsCount = await this.syncSteps(
        user.id,
        device.id,
        options.startDate,
        endDate
      );
      recordsStored += stepsCount;

      const caloriesCount = await this.syncCalories(
        user.id,
        device.id,
        options.startDate,
        endDate
      );
      recordsStored += caloriesCount;

      const distanceCount = await this.syncDistance(
        user.id,
        device.id,
        options.startDate,
        endDate
      );
      recordsStored += distanceCount;

      const workoutsCount = await this.syncWorkouts(
        user.id,
        device.id,
        options.startDate,
        endDate
      );
      recordsStored += workoutsCount;

      const durationMs = Date.now() - startTime;

      await this.updateSyncHistory(syncHistory.id, {
        status: 'success',
        recordsStored,
        durationMs,
      });

      await supabase
        .from('connected_devices')
        .update({
          status: 'connected',
          last_sync_at: new Date().toISOString(),
          error_count: 0,
          last_error: null,
        })
        .eq('id', device.id);

      logger.info('APPLE_HEALTH', 'Sync completed successfully', {
        recordsStored,
        durationMs,
      });

      return { success: true, recordsStored };
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Sync failed', { error });
      return { success: false, recordsStored };
    }
  }

  /**
   * Synchronise les données de fréquence cardiaque
   */
  private async syncHeartRate(
    userId: string,
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const { data } = await AppleHealth.getHeartRateData({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 1000,
      });

      let stored = 0;
      for (const sample of data) {
        const { error } = await supabase.from('wearable_health_data').insert({
          user_id: userId,
          device_id: deviceId,
          data_type: 'heart_rate',
          timestamp: sample.startDate,
          value_numeric: sample.value,
          unit: 'bpm',
          quality_score: 95,
          raw_data: sample,
          synced_at: new Date().toISOString(),
        });

        if (!error) stored++;
      }

      logger.info('APPLE_HEALTH', 'Heart rate data synced', {
        count: stored,
      });

      return stored;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Failed to sync heart rate', { error });
      return 0;
    }
  }

  /**
   * Synchronise les données de variabilité cardiaque (HRV)
   */
  private async syncHRV(
    userId: string,
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const { data } = await AppleHealth.getHRVData({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 1000,
      });

      let stored = 0;
      for (const sample of data) {
        const { error } = await supabase.from('wearable_health_data').insert({
          user_id: userId,
          device_id: deviceId,
          data_type: 'hrv',
          timestamp: sample.startDate,
          value_numeric: sample.value,
          unit: 'ms',
          quality_score: 95,
          raw_data: sample,
          synced_at: new Date().toISOString(),
        });

        if (!error) stored++;
      }

      logger.info('APPLE_HEALTH', 'HRV data synced', { count: stored });
      return stored;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Failed to sync HRV', { error });
      return 0;
    }
  }

  /**
   * Synchronise les pas
   */
  private async syncSteps(
    userId: string,
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const { data } = await AppleHealth.getStepsData({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      let stored = 0;
      for (const sample of data) {
        const { error } = await supabase.from('wearable_health_data').insert({
          user_id: userId,
          device_id: deviceId,
          data_type: 'steps',
          timestamp: sample.startDate,
          value_numeric: sample.value,
          unit: 'count',
          quality_score: 95,
          raw_data: sample,
          synced_at: new Date().toISOString(),
        });

        if (!error) stored++;
      }

      logger.info('APPLE_HEALTH', 'Steps data synced', { count: stored });
      return stored;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Failed to sync steps', { error });
      return 0;
    }
  }

  /**
   * Synchronise les calories (actives + repos)
   */
  private async syncCalories(
    userId: string,
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const { data: activeData } = await AppleHealth.getActiveCaloriesData({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      const { data: restingData } = await AppleHealth.getRestingCaloriesData({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      let stored = 0;

      for (const sample of activeData) {
        const { error } = await supabase.from('wearable_health_data').insert({
          user_id: userId,
          device_id: deviceId,
          data_type: 'calories',
          timestamp: sample.startDate,
          value_numeric: sample.value,
          unit: 'kcal',
          quality_score: 95,
          raw_data: { ...sample, type: 'active' },
          synced_at: new Date().toISOString(),
        });

        if (!error) stored++;
      }

      for (const sample of restingData) {
        const { error } = await supabase.from('wearable_health_data').insert({
          user_id: userId,
          device_id: deviceId,
          data_type: 'calories',
          timestamp: sample.startDate,
          value_numeric: sample.value,
          unit: 'kcal',
          quality_score: 95,
          raw_data: { ...sample, type: 'resting' },
          synced_at: new Date().toISOString(),
        });

        if (!error) stored++;
      }

      logger.info('APPLE_HEALTH', 'Calories data synced', { count: stored });
      return stored;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Failed to sync calories', { error });
      return 0;
    }
  }

  /**
   * Synchronise la distance
   */
  private async syncDistance(
    userId: string,
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const { data } = await AppleHealth.getDistanceData({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      let stored = 0;
      for (const sample of data) {
        const { error } = await supabase.from('wearable_health_data').insert({
          user_id: userId,
          device_id: deviceId,
          data_type: 'distance',
          timestamp: sample.startDate,
          value_numeric: sample.value,
          unit: 'meters',
          quality_score: 95,
          raw_data: sample,
          synced_at: new Date().toISOString(),
        });

        if (!error) stored++;
      }

      logger.info('APPLE_HEALTH', 'Distance data synced', { count: stored });
      return stored;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Failed to sync distance', { error });
      return 0;
    }
  }

  /**
   * Synchronise les entraînements avec détails complets
   */
  private async syncWorkouts(
    userId: string,
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const { workouts } = await AppleHealth.getWorkouts({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 100,
      });

      let stored = 0;
      for (const workout of workouts) {
        try {
          const { workout: details } = await AppleHealth.getWorkoutDetails({
            workoutId: workout.id,
          });

          const { error } = await supabase.from('wearable_health_data').insert({
            user_id: userId,
            device_id: deviceId,
            data_type: 'workout',
            timestamp: workout.startDate,
            value_json: {
              activityType: workout.activityType,
              duration: workout.duration,
              distance: workout.totalDistance,
              calories: workout.totalCalories,
              averageHeartRate: details.averageHeartRate,
              maxHeartRate: details.maxHeartRate,
              zones: details.zones,
              elevationGain: details.elevationGain,
              averagePace: details.averagePace,
              averageCadence: details.averageCadence,
              averagePower: details.averagePower,
            },
            unit: 'workout',
            quality_score: 98,
            source_workout_id: workout.id,
            raw_data: details,
            synced_at: new Date().toISOString(),
          });

          if (!error) stored++;
        } catch (error) {
          logger.warn('APPLE_HEALTH', 'Failed to get workout details', {
            workoutId: workout.id,
            error,
          });
        }
      }

      logger.info('APPLE_HEALTH', 'Workouts synced', { count: stored });
      return stored;
    } catch (error) {
      logger.error('APPLE_HEALTH', 'Failed to sync workouts', { error });
      return 0;
    }
  }

  private async createSyncHistory(
    deviceId: string,
    userId: string
  ): Promise<{ id: string }> {
    const { data, error } = await supabase
      .from('device_sync_history')
      .insert({
        device_id: deviceId,
        user_id: userId,
        sync_type: 'manual',
        status: 'success',
        data_types_synced: [
          'heart_rate',
          'hrv',
          'steps',
          'calories',
          'distance',
          'workout',
        ],
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) throw error;
    return data;
  }

  private async updateSyncHistory(
    syncId: string,
    updates: {
      status: 'success' | 'partial' | 'failed';
      recordsStored: number;
      durationMs: number;
    }
  ): Promise<void> {
    await supabase
      .from('device_sync_history')
      .update({
        status: updates.status,
        records_stored: updates.recordsStored,
        duration_ms: updates.durationMs,
        completed_at: new Date().toISOString(),
      })
      .eq('id', syncId);
  }
}

export const appleHealthService = new AppleHealthService();
