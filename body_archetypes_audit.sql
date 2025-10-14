-- ============================================================
-- AUDIT COMPLET: morph_archetypes - Couverture Corporelle
-- Objectif: Atteindre 98% de couverture morphologique
-- ============================================================

-- 1. VUE D'ENSEMBLE: Distribution par genre
SELECT
  gender,
  COUNT(*) as total_archetypes,
  COUNT(DISTINCT obesity) as obesity_variants,
  COUNT(DISTINCT muscularity) as muscularity_variants,
  COUNT(DISTINCT level) as level_variants,
  COUNT(DISTINCT morphotype) as morphotype_variants,
  COUNT(CASE WHEN morph_values IS NOT NULL THEN 1 END) as with_morph_values,
  COUNT(CASE WHEN limb_masses IS NOT NULL THEN 1 END) as with_limb_masses,
  ROUND(AVG((bmi_range->>0)::numeric), 2) as avg_bmi_min,
  ROUND(AVG((bmi_range->>1)::numeric), 2) as avg_bmi_max
FROM morph_archetypes
GROUP BY gender
ORDER BY gender;

-- 2. COUVERTURE BMI: Analyse détaillée par genre
SELECT
  gender,
  FLOOR((bmi_range->>0)::numeric) as bmi_bucket_start,
  FLOOR((bmi_range->>1)::numeric) as bmi_bucket_end,
  COUNT(*) as archetypes_in_range,
  ARRAY_AGG(DISTINCT obesity ORDER BY obesity) as obesity_levels,
  ARRAY_AGG(DISTINCT muscularity ORDER BY muscularity) as muscularity_levels
FROM morph_archetypes
WHERE bmi_range IS NOT NULL
GROUP BY gender, FLOOR((bmi_range->>0)::numeric), FLOOR((bmi_range->>1)::numeric)
ORDER BY gender, bmi_bucket_start;

-- 3. GAPS BMI: Identifier les plages BMI sans couverture
WITH bmi_coverage AS (
  SELECT
    gender,
    (bmi_range->>0)::numeric as bmi_min,
    (bmi_range->>1)::numeric as bmi_max
  FROM morph_archetypes
  WHERE bmi_range IS NOT NULL
),
bmi_ranges AS (
  SELECT
    gender,
    generate_series(15, 45, 1) as bmi_point
  FROM (SELECT DISTINCT gender FROM morph_archetypes) g
),
coverage_check AS (
  SELECT
    br.gender,
    br.bmi_point,
    BOOL_OR(br.bmi_point BETWEEN bc.bmi_min - 0.5 AND bc.bmi_max + 0.5) as is_covered
  FROM bmi_ranges br
  LEFT JOIN bmi_coverage bc ON br.gender = bc.gender
  GROUP BY br.gender, br.bmi_point
)
SELECT
  gender,
  bmi_point,
  is_covered
FROM coverage_check
WHERE is_covered = false
ORDER BY gender, bmi_point;

-- 4. COMBINAISONS SÉMANTIQUES: Matrice complète
SELECT
  gender,
  obesity,
  muscularity,
  level,
  morphotype,
  COUNT(*) as archetype_count,
  ROUND(AVG((bmi_range->>0)::numeric), 1) as avg_bmi_min,
  ROUND(AVG((bmi_range->>1)::numeric), 1) as avg_bmi_max,
  ARRAY_AGG(id::text) as archetype_ids
FROM morph_archetypes
GROUP BY gender, obesity, muscularity, level, morphotype
ORDER BY gender, obesity, muscularity, level, morphotype;

-- 5. COMBINAISONS MANQUANTES: Analyse théorique vs réelle
WITH all_combinations AS (
  SELECT
    g.gender,
    o.obesity,
    m.muscularity,
    l.level,
    mt.morphotype
  FROM
    (SELECT DISTINCT gender FROM morph_archetypes) g
    CROSS JOIN (SELECT DISTINCT obesity FROM morph_archetypes WHERE obesity IS NOT NULL) o
    CROSS JOIN (SELECT DISTINCT muscularity FROM morph_archetypes WHERE muscularity IS NOT NULL) m
    CROSS JOIN (SELECT DISTINCT level FROM morph_archetypes WHERE level IS NOT NULL) l
    CROSS JOIN (SELECT DISTINCT morphotype FROM morph_archetypes WHERE morphotype IS NOT NULL) mt
),
existing_combinations AS (
  SELECT DISTINCT
    gender,
    obesity,
    muscularity,
    level,
    morphotype
  FROM morph_archetypes
  WHERE obesity IS NOT NULL
    AND muscularity IS NOT NULL
    AND level IS NOT NULL
    AND morphotype IS NOT NULL
)
SELECT
  ac.gender,
  ac.obesity,
  ac.muscularity,
  ac.level,
  ac.morphotype,
  'MISSING' as status
FROM all_combinations ac
LEFT JOIN existing_combinations ec ON
  ac.gender = ec.gender AND
  ac.obesity = ec.obesity AND
  ac.muscularity = ec.muscularity AND
  ac.level = ec.level AND
  ac.morphotype = ec.morphotype
WHERE ec.gender IS NULL
ORDER BY ac.gender, ac.obesity, ac.muscularity, ac.level, ac.morphotype;

-- 6. COHÉRENCE BMI-HEIGHT-WEIGHT
SELECT
  id,
  name,
  gender,
  obesity,
  muscularity,
  bmi_range,
  height_range,
  weight_range,
  -- Vérification cohérence BMI = weight / (height^2)
  ROUND((weight_range->>0)::numeric / (((height_range->>0)::numeric / 100.0) ^ 2), 2) as calculated_bmi_min,
  ROUND((weight_range->>1)::numeric / (((height_range->>1)::numeric / 100.0) ^ 2), 2) as calculated_bmi_max,
  ROUND((bmi_range->>0)::numeric, 2) as stated_bmi_min,
  ROUND((bmi_range->>1)::numeric, 2) as stated_bmi_max,
  CASE
    WHEN ABS((weight_range->>0)::numeric / (((height_range->>0)::numeric / 100.0) ^ 2) - (bmi_range->>0)::numeric) > 2 THEN 'INCONSISTENT'
    ELSE 'OK'
  END as consistency_check
FROM morph_archetypes
WHERE bmi_range IS NOT NULL
  AND height_range IS NOT NULL
  AND weight_range IS NOT NULL
ORDER BY consistency_check DESC, gender, obesity;

-- 7. ANALYSE MUSCULARITY: Transitions et gaps
SELECT
  gender,
  muscularity,
  COUNT(*) as archetype_count,
  ROUND(AVG((bmi_range->>0)::numeric), 2) as avg_bmi_min,
  ROUND(AVG((bmi_range->>1)::numeric), 2) as avg_bmi_max,
  ROUND(MIN((bmi_range->>0)::numeric), 2) as min_bmi,
  ROUND(MAX((bmi_range->>1)::numeric), 2) as max_bmi,
  ARRAY_AGG(DISTINCT obesity ORDER BY obesity) as obesity_coverage
FROM morph_archetypes
WHERE muscularity IS NOT NULL
GROUP BY gender, muscularity
ORDER BY gender,
  CASE muscularity
    WHEN 'Atrophié sévère' THEN 1
    WHEN 'Atrophié' THEN 2
    WHEN 'Légèrement atrophié' THEN 3
    WHEN 'Normal' THEN 4
    WHEN 'Moyen musclé' THEN 5
    WHEN 'Musclé' THEN 6
    WHEN 'Normal costaud' THEN 7
    WHEN 'Athlétique' THEN 8
    ELSE 9
  END;

-- 8. EDGE CASES: Morphologies extrêmes
SELECT
  'BMI < 17 (Anorexie/Émacié)' as category,
  gender,
  COUNT(*) as archetype_count,
  ARRAY_AGG(id::text) as archetype_ids
FROM morph_archetypes
WHERE (bmi_range->>0)::numeric < 17
GROUP BY gender

UNION ALL

SELECT
  'BMI > 40 (Obésité morbide)' as category,
  gender,
  COUNT(*) as archetype_count,
  ARRAY_AGG(id::text) as archetype_ids
FROM morph_archetypes
WHERE (bmi_range->>1)::numeric > 40
GROUP BY gender

UNION ALL

SELECT
  'Athlète (Musclé + BMI Normal 22-24)' as category,
  gender,
  COUNT(*) as archetype_count,
  ARRAY_AGG(id::text) as archetype_ids
FROM morph_archetypes
WHERE muscularity IN ('Musclé', 'Athlétique', 'Moyen musclé')
  AND (bmi_range->>0)::numeric >= 22
  AND (bmi_range->>1)::numeric <= 24
GROUP BY gender

UNION ALL

SELECT
  'Morphotypes rares (Triangle inversé féminin)' as category,
  'feminine' as gender,
  COUNT(*) as archetype_count,
  ARRAY_AGG(id::text) as archetype_ids
FROM morph_archetypes
WHERE gender = 'feminine'
  AND morphotype = 'TRI'
GROUP BY gender;

-- 9. RÉSUMÉ STATISTIQUE
SELECT
  'TOTAL ARCHETYPES' as metric,
  COUNT(*)::text as value
FROM morph_archetypes

UNION ALL

SELECT
  'MASCULINE ARCHETYPES',
  COUNT(*)::text
FROM morph_archetypes WHERE gender = 'masculine'

UNION ALL

SELECT
  'FEMININE ARCHETYPES',
  COUNT(*)::text
FROM morph_archetypes WHERE gender = 'feminine'

UNION ALL

SELECT
  'UNIQUE SEMANTIC COMBINATIONS',
  COUNT(DISTINCT (gender, obesity, muscularity, level, morphotype))::text
FROM morph_archetypes

UNION ALL

SELECT
  'ARCHETYPES WITH COMPLETE DATA',
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM morph_archetypes), 2)::text || '%'
FROM morph_archetypes
WHERE morph_values IS NOT NULL
  AND limb_masses IS NOT NULL
  AND obesity IS NOT NULL
  AND muscularity IS NOT NULL
  AND level IS NOT NULL
  AND morphotype IS NOT NULL;
