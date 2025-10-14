/**
 * Body Projection Repository
 * Handles all database operations for body projections
 */

import { supabase } from '../../supabase/client';
import logger from '../../../lib/utils/logger';

export interface BodyProjection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  base_scan_id?: string;
  activity_level: number;
  nutrition_quality: number;
  caloric_balance: number;
  time_period_months: number;
  projected_weight?: number;
  projected_bmi?: number;
  projected_waist_circumference?: number;
  projected_muscle_mass_percentage?: number;
  projected_body_fat_percentage?: number;
  projected_morph_values: Record<string, number>;
  projected_limb_masses: Record<string, number>;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBodyProjectionInput {
  name: string;
  description?: string;
  base_scan_id?: string;
  activity_level: number;
  nutrition_quality: number;
  caloric_balance: number;
  time_period_months: number;
  projected_weight: number;
  projected_bmi: number;
  projected_waist_circumference: number;
  projected_muscle_mass_percentage: number;
  projected_body_fat_percentage: number;
  projected_morph_values: Record<string, number>;
  projected_limb_masses: Record<string, number>;
  is_favorite?: boolean;
}

export interface UpdateBodyProjectionInput {
  name?: string;
  description?: string;
  activity_level?: number;
  nutrition_quality?: number;
  caloric_balance?: number;
  time_period_months?: number;
  projected_weight?: number;
  projected_bmi?: number;
  projected_waist_circumference?: number;
  projected_muscle_mass_percentage?: number;
  projected_body_fat_percentage?: number;
  projected_morph_values?: Record<string, number>;
  projected_limb_masses?: Record<string, number>;
  is_favorite?: boolean;
}

/**
 * Get all projections for the current user
 */
export async function getUserBodyProjections(): Promise<BodyProjection[]> {
  logger.info('BODY_PROJECTION_REPO', 'Fetching user body projections');

  const { data, error } = await supabase
    .from('body_projections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    logger.error('BODY_PROJECTION_REPO', 'Error fetching projections', { error });
    throw error;
  }

  logger.info('BODY_PROJECTION_REPO', 'Successfully fetched projections', {
    count: data?.length || 0
  });

  return data || [];
}

/**
 * Get favorite projections for quick access
 */
export async function getFavoriteBodyProjections(): Promise<BodyProjection[]> {
  logger.info('BODY_PROJECTION_REPO', 'Fetching favorite body projections');

  const { data, error } = await supabase
    .from('body_projections')
    .select('*')
    .eq('is_favorite', true)
    .order('created_at', { ascending: false });

  if (error) {
    logger.error('BODY_PROJECTION_REPO', 'Error fetching favorite projections', { error });
    throw error;
  }

  return data || [];
}

/**
 * Get a single projection by ID
 */
export async function getBodyProjectionById(id: string): Promise<BodyProjection | null> {
  logger.info('BODY_PROJECTION_REPO', 'Fetching projection by ID', { id });

  const { data, error } = await supabase
    .from('body_projections')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    logger.error('BODY_PROJECTION_REPO', 'Error fetching projection', { error, id });
    throw error;
  }

  return data;
}

/**
 * Create a new body projection
 */
export async function createBodyProjection(
  input: CreateBodyProjectionInput
): Promise<BodyProjection> {
  logger.info('BODY_PROJECTION_REPO', 'Creating new body projection', {
    name: input.name,
    timePeriod: input.time_period_months
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    logger.error('BODY_PROJECTION_REPO', 'User not authenticated', { userError });
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('body_projections')
    .insert({
      user_id: userData.user.id,
      ...input
    })
    .select()
    .single();

  if (error) {
    logger.error('BODY_PROJECTION_REPO', 'Error creating projection', { error });
    throw error;
  }

  logger.info('BODY_PROJECTION_REPO', 'Successfully created projection', {
    id: data.id,
    name: data.name
  });

  return data;
}

/**
 * Update an existing body projection
 */
export async function updateBodyProjection(
  id: string,
  input: UpdateBodyProjectionInput
): Promise<BodyProjection> {
  logger.info('BODY_PROJECTION_REPO', 'Updating body projection', { id });

  const { data, error } = await supabase
    .from('body_projections')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    logger.error('BODY_PROJECTION_REPO', 'Error updating projection', { error, id });
    throw error;
  }

  logger.info('BODY_PROJECTION_REPO', 'Successfully updated projection', { id });

  return data;
}

/**
 * Delete a body projection
 */
export async function deleteBodyProjection(id: string): Promise<void> {
  logger.info('BODY_PROJECTION_REPO', 'Deleting body projection', { id });

  const { error } = await supabase
    .from('body_projections')
    .delete()
    .eq('id', id);

  if (error) {
    logger.error('BODY_PROJECTION_REPO', 'Error deleting projection', { error, id });
    throw error;
  }

  logger.info('BODY_PROJECTION_REPO', 'Successfully deleted projection', { id });
}

/**
 * Toggle favorite status of a projection
 */
export async function toggleProjectionFavorite(
  id: string,
  isFavorite: boolean
): Promise<BodyProjection> {
  logger.info('BODY_PROJECTION_REPO', 'Toggling projection favorite', { id, isFavorite });

  return updateBodyProjection(id, { is_favorite: isFavorite });
}

/**
 * Get projections for a specific base scan
 */
export async function getProjectionsForScan(baseScanId: string): Promise<BodyProjection[]> {
  logger.info('BODY_PROJECTION_REPO', 'Fetching projections for scan', { baseScanId });

  const { data, error } = await supabase
    .from('body_projections')
    .select('*')
    .eq('base_scan_id', baseScanId)
    .order('created_at', { ascending: false });

  if (error) {
    logger.error('BODY_PROJECTION_REPO', 'Error fetching scan projections', { error, baseScanId });
    throw error;
  }

  return data || [];
}
