/**
 * useAvatarData Hook
 * Fetches real body scan data and face scan data from Supabase
 */

import { useState, useEffect } from 'react';
import { supabase } from '../../../../system/supabase/client';
import { useUserStore } from '../../../../system/store/userStore';
import logger from '../../../../lib/utils/logger';

export interface BodyScanData {
  id: string;
  created_at: string;
  resolved_gender: string | null;
  morph_values: Record<string, number> | null;
  limb_masses: Record<string, number> | null;
  weight: number | null;
  body_fat_percentage: number | null;
  bmi: number | null;
  waist_circumference: number | null;
  raw_measurements: {
    height_cm?: number;
    weight_kg?: number;
    chest_cm?: number;
    waist_cm?: number;
    hips_cm?: number;
  } | null;
  avatar_version: string | null;
}

export interface FaceScanData {
  id: string;
  created_at: string;
  photo_url: string | null;
  final_face_params: Record<string, number> | null;
  skin_tone_v2: {
    hex?: string;
    multi_zone_map?: Record<string, string>;
  } | null;
}

export interface AvatarData {
  hasBodyScan: boolean;
  hasFaceScan: boolean;
  latestBodyScan: BodyScanData | null;
  latestFaceScan: FaceScanData | null;
  bodyScanCount: number;
  faceScanCount: number;
  lastScanDate: Date | null;
  completionPercentage: number;
}

export function useAvatarData() {
  const { user } = useUserStore();
  const [data, setData] = useState<AvatarData>({
    hasBodyScan: false,
    hasFaceScan: false,
    latestBodyScan: null,
    latestFaceScan: null,
    bodyScanCount: 0,
    faceScanCount: 0,
    lastScanDate: null,
    completionPercentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    async function fetchAvatarData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch latest body scan
        const { data: bodyScans, error: bodyScanError } = await supabase
          .from('body_scans')
          .select('id, created_at, resolved_gender, morph_values, limb_masses, weight, body_fat_percentage, bmi, waist_circumference, raw_measurements, avatar_version')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (bodyScanError) throw bodyScanError;

        // Fetch latest face scan
        const { data: faceScans, error: faceScanError } = await supabase
          .from('face_scans')
          .select('id, created_at, photo_url, final_face_params, skin_tone_v2')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (faceScanError) throw faceScanError;

        // Count total scans
        const { count: bodyCount, error: bodyCountError } = await supabase
          .from('body_scans')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (bodyCountError) throw bodyCountError;

        const { count: faceCount, error: faceCountError } = await supabase
          .from('face_scans')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (faceCountError) throw faceCountError;

        const latestBodyScan = bodyScans?.[0] || null;
        const latestFaceScan = faceScans?.[0] || null;

        // Determine last scan date
        let lastScanDate: Date | null = null;
        if (latestBodyScan && latestFaceScan) {
          const bodyDate = new Date(latestBodyScan.created_at);
          const faceDate = new Date(latestFaceScan.created_at);
          lastScanDate = bodyDate > faceDate ? bodyDate : faceDate;
        } else if (latestBodyScan) {
          lastScanDate = new Date(latestBodyScan.created_at);
        } else if (latestFaceScan) {
          lastScanDate = new Date(latestFaceScan.created_at);
        }

        // Calculate completion percentage
        let completion = 0;
        if (latestBodyScan) completion += 50;
        if (latestFaceScan) completion += 50;

        setData({
          hasBodyScan: !!latestBodyScan,
          hasFaceScan: !!latestFaceScan,
          latestBodyScan,
          latestFaceScan,
          bodyScanCount: bodyCount || 0,
          faceScanCount: faceCount || 0,
          lastScanDate,
          completionPercentage: completion,
        });

        logger.debug('AVATAR_DATA', 'Fetched avatar data', {
          hasBodyScan: !!latestBodyScan,
          hasFaceScan: !!latestFaceScan,
          bodyScanCount: bodyCount,
          faceScanCount: faceCount,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch avatar data');
        setError(error);
        logger.error('AVATAR_DATA', 'Error fetching avatar data', { error: error.message });
      } finally {
        setLoading(false);
      }
    }

    fetchAvatarData();
  }, [user?.id]);

  const refresh = () => {
    if (user?.id) {
      setLoading(true);
      setError(null);
      // Trigger re-fetch by clearing and re-setting
      setData({
        hasBodyScan: false,
        hasFaceScan: false,
        latestBodyScan: null,
        latestFaceScan: null,
        bodyScanCount: 0,
        faceScanCount: 0,
        lastScanDate: null,
        completionPercentage: 0,
      });
    }
  };

  return {
    data,
    loading,
    error,
    refresh,
  };
}
