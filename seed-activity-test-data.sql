/*
  Script de Test - Données d'Activité pour la Forge Énergétique

  Ce script insère des données de test pour l'utilisateur 53b79d4b-0c23-4c19-8fb4-08466b457f5a

  Contenu:
  - 90 jours d'activités variées (course, musculation, vélo, natation, yoga)
  - Différentes intensités et durées
  - Calories calculées de manière réaliste
  - Données enrichies avec métriques de montre connectée
  - Objectifs connectés pour tester les trackers

  IMPORTANT: Exécuter ce script directement dans Supabase SQL Editor
*/

-- =====================================================
-- 1. NETTOYAGE DES DONNÉES EXISTANTES (OPTIONNEL)
-- =====================================================
-- Décommenter si vous voulez partir sur une base propre
-- DELETE FROM public.activities WHERE user_id = '53b79d4b-0c23-4c19-8fb4-08466b457f5a';
-- DELETE FROM public.wearable_metrics WHERE user_id = '53b79d4b-0c23-4c19-8fb4-08466b457f5a';
-- DELETE FROM public.connected_devices WHERE user_id = '53b79d4b-0c23-4c19-8fb4-08466b457f5a';

-- =====================================================
-- 2. CRÉATION D'UN APPAREIL CONNECTÉ SIMULÉ
-- =====================================================
INSERT INTO public.connected_devices (
  id,
  user_id,
  device_type,
  device_name,
  brand,
  model,
  is_active,
  last_sync_at,
  created_at
) VALUES (
  'c0000000-0000-0000-0000-000000000001',
  '53b79d4b-0c23-4c19-8fb4-08466b457f5a',
  'smartwatch',
  'Apple Watch Series 9',
  'Apple',
  'Series 9',
  true,
  NOW(),
  NOW() - INTERVAL '30 days'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. INSERTION DES ACTIVITÉS (90 JOURS)
-- =====================================================

-- Fonction helper pour générer des timestamps aléatoires dans la journée
DO $$
DECLARE
  user_uuid UUID := '53b79d4b-0c23-4c19-8fb4-08466b457f5a';
  device_uuid UUID := 'c0000000-0000-0000-0000-000000000001';
  activity_types TEXT[] := ARRAY['Course à pied', 'Musculation', 'Vélo', 'Natation', 'Yoga', 'HIIT', 'Marche', 'Football'];
  intensities TEXT[] := ARRAY['low', 'medium', 'high', 'very_high'];
  day_offset INT;
  activity_count INT;
  i INT;
  random_type TEXT;
  random_intensity TEXT;
  random_duration INT;
  random_calories INT;
  random_hour INT;
  random_minute INT;
  activity_timestamp TIMESTAMPTZ;
  avg_hr INT;
  max_hr INT;
  distance_km NUMERIC;
BEGIN
  -- Boucle sur les 90 derniers jours
  FOR day_offset IN 0..89 LOOP
    -- Nombre aléatoire d'activités par jour (0 à 3)
    activity_count := (random() * 3)::INT;

    -- Si c'est un jour de repos, on skip
    IF activity_count = 0 THEN
      CONTINUE;
    END IF;

    -- Générer les activités pour ce jour
    FOR i IN 1..activity_count LOOP
      -- Sélection aléatoire du type d'activité
      random_type := activity_types[1 + (random() * (array_length(activity_types, 1) - 1))::INT];

      -- Intensité aléatoire avec distribution réaliste
      IF random() < 0.15 THEN
        random_intensity := 'very_high';
      ELSIF random() < 0.40 THEN
        random_intensity := 'high';
      ELSIF random() < 0.75 THEN
        random_intensity := 'medium';
      ELSE
        random_intensity := 'low';
      END IF;

      -- Durée selon le type et l'intensité
      CASE
        WHEN random_type IN ('Course à pied', 'Vélo', 'Natation') THEN
          random_duration := 30 + (random() * 60)::INT;
        WHEN random_type = 'Musculation' THEN
          random_duration := 45 + (random() * 45)::INT;
        WHEN random_type = 'HIIT' THEN
          random_duration := 15 + (random() * 30)::INT;
        WHEN random_type = 'Yoga' THEN
          random_duration := 30 + (random() * 60)::INT;
        ELSE
          random_duration := 20 + (random() * 40)::INT;
      END CASE;

      -- Calcul des calories (formule simplifiée basée sur type, intensité, durée)
      CASE
        WHEN random_intensity = 'very_high' THEN
          random_calories := (random_duration * (10 + random() * 5))::INT;
        WHEN random_intensity = 'high' THEN
          random_calories := (random_duration * (7 + random() * 3))::INT;
        WHEN random_intensity = 'medium' THEN
          random_calories := (random_duration * (5 + random() * 2))::INT;
        ELSE
          random_calories := (random_duration * (3 + random() * 2))::INT;
      END CASE;

      -- Heure aléatoire (6h-22h)
      random_hour := 6 + (random() * 16)::INT;
      random_minute := (random() * 60)::INT;

      -- Timestamp de l'activité
      activity_timestamp := (NOW() - (day_offset || ' days')::INTERVAL) +
                            (random_hour || ' hours')::INTERVAL +
                            (random_minute || ' minutes')::INTERVAL;

      -- Métriques de fréquence cardiaque (si activité cardio)
      IF random_type IN ('Course à pied', 'Vélo', 'Natation', 'HIIT') THEN
        CASE random_intensity
          WHEN 'very_high' THEN
            avg_hr := 160 + (random() * 20)::INT;
            max_hr := 175 + (random() * 20)::INT;
          WHEN 'high' THEN
            avg_hr := 140 + (random() * 20)::INT;
            max_hr := 160 + (random() * 15)::INT;
          WHEN 'medium' THEN
            avg_hr := 120 + (random() * 20)::INT;
            max_hr := 145 + (random() * 15)::INT;
          ELSE
            avg_hr := 100 + (random() * 20)::INT;
            max_hr := 125 + (random() * 15)::INT;
        END CASE;
      ELSE
        avg_hr := NULL;
        max_hr := NULL;
      END IF;

      -- Distance (pour activités avec distance)
      IF random_type IN ('Course à pied', 'Vélo', 'Marche') THEN
        CASE random_type
          WHEN 'Course à pied' THEN
            distance_km := (5 + random() * 15)::NUMERIC(5,2);
          WHEN 'Vélo' THEN
            distance_km := (15 + random() * 50)::NUMERIC(5,2);
          WHEN 'Marche' THEN
            distance_km := (2 + random() * 8)::NUMERIC(5,2);
        END CASE;
      ELSE
        distance_km := NULL;
      END IF;

      -- Insertion de l'activité
      INSERT INTO public.activities (
        user_id,
        type,
        duration_min,
        intensity,
        calories_est,
        timestamp,
        wearable_device_id,
        avg_heart_rate,
        max_heart_rate,
        distance_km,
        notes,
        created_at
      ) VALUES (
        user_uuid,
        random_type,
        random_duration,
        random_intensity,
        random_calories,
        activity_timestamp,
        CASE WHEN random() > 0.3 THEN device_uuid ELSE NULL END, -- 70% des activités avec montre
        avg_hr,
        max_hr,
        distance_km,
        CASE
          WHEN random() > 0.7 THEN 'Session enregistrée automatiquement'
          WHEN random() > 0.5 THEN 'Bon ressenti pendant la session'
          ELSE NULL
        END,
        activity_timestamp
      );

    END LOOP;
  END LOOP;

  RAISE NOTICE 'Données d''activités insérées avec succès pour 90 jours';
END $$;

-- =====================================================
-- 4. AJOUT D'ACTIVITÉS SPÉCIFIQUES POUR AUJOURD'HUI
-- =====================================================

-- Activité du matin (déjà faite)
INSERT INTO public.activities (
  user_id,
  type,
  duration_min,
  intensity,
  calories_est,
  timestamp,
  wearable_device_id,
  avg_heart_rate,
  max_heart_rate,
  distance_km,
  notes,
  created_at
) VALUES (
  '53b79d4b-0c23-4c19-8fb4-08466b457f5a',
  'Course à pied',
  45,
  'high',
  420,
  NOW() - INTERVAL '6 hours',
  'c0000000-0000-0000-0000-000000000001',
  155,
  172,
  7.5,
  'Belle course matinale ! Bon rythme',
  NOW() - INTERVAL '6 hours'
);

-- Activité de midi (déjà faite)
INSERT INTO public.activities (
  user_id,
  type,
  duration_min,
  intensity,
  calories_est,
  timestamp,
  wearable_device_id,
  avg_heart_rate,
  max_heart_rate,
  notes,
  created_at
) VALUES (
  '53b79d4b-0c23-4c19-8fb4-08466b457f5a',
  'Musculation',
  60,
  'medium',
  320,
  NOW() - INTERVAL '2 hours',
  'c0000000-0000-0000-0000-000000000001',
  125,
  148,
  'Session upper body - 4 séries par exercice',
  NOW() - INTERVAL '2 hours'
);

-- =====================================================
-- 5. CRÉATION D'OBJECTIFS CONNECTÉS
-- =====================================================

-- Objectif hebdomadaire de calories
INSERT INTO public.connected_goals (
  id,
  user_id,
  goal_type,
  target_value,
  current_value,
  unit,
  frequency,
  start_date,
  end_date,
  is_active,
  created_at
) VALUES (
  'g0000000-0000-0000-0000-000000000001',
  '53b79d4b-0c23-4c19-8fb4-08466b457f5a',
  'calories',
  2500,
  1200,
  'kcal',
  'weekly',
  DATE_TRUNC('week', NOW()),
  DATE_TRUNC('week', NOW()) + INTERVAL '7 days',
  true,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Objectif mensuel de durée d'activité
INSERT INTO public.connected_goals (
  id,
  user_id,
  goal_type,
  target_value,
  current_value,
  unit,
  frequency,
  start_date,
  end_date,
  is_active,
  created_at
) VALUES (
  'g0000000-0000-0000-0000-000000000002',
  '53b79d4b-0c23-4c19-8fb4-08466b457f5a',
  'duration',
  1200,
  680,
  'minutes',
  'monthly',
  DATE_TRUNC('month', NOW()),
  DATE_TRUNC('month', NOW()) + INTERVAL '1 month',
  true,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 6. VÉRIFICATION DES DONNÉES INSÉRÉES
-- =====================================================

-- Compter le nombre d'activités insérées
DO $$
DECLARE
  activity_count INT;
  today_count INT;
  last_7_days_count INT;
  last_30_days_count INT;
BEGIN
  SELECT COUNT(*) INTO activity_count
  FROM public.activities
  WHERE user_id = '53b79d4b-0c23-4c19-8fb4-08466b457f5a';

  SELECT COUNT(*) INTO today_count
  FROM public.activities
  WHERE user_id = '53b79d4b-0c23-4c19-8fb4-08466b457f5a'
    AND timestamp >= DATE_TRUNC('day', NOW());

  SELECT COUNT(*) INTO last_7_days_count
  FROM public.activities
  WHERE user_id = '53b79d4b-0c23-4c19-8fb4-08466b457f5a'
    AND timestamp >= NOW() - INTERVAL '7 days';

  SELECT COUNT(*) INTO last_30_days_count
  FROM public.activities
  WHERE user_id = '53b79d4b-0c23-4c19-8fb4-08466b457f5a'
    AND timestamp >= NOW() - INTERVAL '30 days';

  RAISE NOTICE '============================================';
  RAISE NOTICE 'RÉSUMÉ DES DONNÉES INSÉRÉES';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Total activités: %', activity_count;
  RAISE NOTICE 'Activités aujourd''hui: %', today_count;
  RAISE NOTICE 'Activités 7 derniers jours: %', last_7_days_count;
  RAISE NOTICE 'Activités 30 derniers jours: %', last_30_days_count;
  RAISE NOTICE '============================================';
END $$;
