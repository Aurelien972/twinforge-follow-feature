/**
 * Training Location Domain Types
 * Types pour la gestion des lieux d'entraînement avec équipements et photos
 */

export type LocationType = 'home' | 'gym' | 'outdoor';

export interface TrainingLocation {
  id: string;
  user_id: string;
  name?: string;
  type: LocationType;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocationEquipment {
  id: string;
  location_id: string;
  equipment_name: string;
  is_custom: boolean;
  created_at: string;
}

export interface LocationPhoto {
  id: string;
  location_id: string;
  photo_url: string;
  photo_order: number;
  created_at: string;
}

export interface TrainingLocationWithDetails extends TrainingLocation {
  equipment: LocationEquipment[];
  photos: LocationPhoto[];
}

export interface CreateLocationDTO {
  name?: string;
  type: LocationType;
  is_default?: boolean;
  equipment?: string[];
  photos?: File[];
}

export interface UpdateLocationDTO {
  name?: string;
  type?: LocationType;
  is_default?: boolean;
}
