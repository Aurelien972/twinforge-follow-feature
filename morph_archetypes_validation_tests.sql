-- ============================================================
-- TESTS DE VALIDATION: morph_archetypes - Couverture 98%
-- ============================================================
-- Script de validation pour mesurer la couverture morphologique
-- post-optimisation et identifier les gaps restants
-- ============================================================

-- Test 1: Métriques globales
-- ============================================================
SELECT '=== TEST 1: MÉTRIQUES GLOBALES ===' as test_section;

SELECT
  'Total Archétypes' as metric,
  COUNT(*)::text as value,
  CASE
    WHEN COUNT(*) >= 290 THEN '✅ Objectif atteint'
    WHEN COUNT(*) >= 255 THEN '⚠️ Phase 2 en cours'
    WHEN COUNT(*) >= 246 THEN '⚠️ Phase 1 complétée'
    ELSE '❌ En-dessous objectif Phase 1'
  END as status
FROM morph_archetypes

UNION ALL

SELECT
  'Archétypes Féminins',
  COUNT(*)::text,
  CASE
    WHEN COUNT(*) >= 145 THEN '✅ Excellent'
    WHEN COUNT(*) >= 130 THEN '⚠️ Acceptable'
    ELSE '❌ Insuffisant'
  END
FROM morph_archetypes WHERE gender = 'feminine'

UNION ALL

SELECT
  'Archétypes Masculins',
  COUNT(*)::text,
  CASE
    WHEN COUNT(*) >= 140 THEN '✅ Excellent'
    WHEN COUNT(*) >= 105 THEN '⚠️ Acceptable'
    ELSE '❌ Insuffisant'
  END
FROM morph_archetypes WHERE gender = 'masculine';

-- Test 2: Couverture BMI 15-45
-- ============================================================
SELECT '=== TEST 2: COUVERTURE BMI 15-45 ===' as test_section;

WITH bmi_coverage AS (
  SELECT
    gender,
    COUNT(DISTINCT FLOOR(bmi_range[1])) as covered_bmi_points
  FROM morph_archetypes
  WHERE bmi_range[1] BETWEEN 15 AND 45
  GROUP BY gender
)
SELECT
  gender,
  covered_bmi_points as covered_points,
  31 as total_possible_points,
  ROUND(covered_bmi_points * 100.0 / 31, 2)::text || '%' as coverage_percentage,
  CASE
    WHEN covered_bmi_points = 31 THEN '✅ Couverture complète'
    WHEN covered_bmi_points >= 30 THEN '⚠️ Quasi-complet (BMI 15 manquant)'
    ELSE '❌ Gaps significatifs'
  END as status
FROM bmi_coverage
ORDER BY gender;

-- Test 3: Gap Athlètes Féminines BMI 22-24
-- ============================================================
SELECT '=== TEST 3: ATHLÈTES FÉMININES BMI 22-24 ===' as test_section;

SELECT
  muscularity,
  COUNT(*) as archetype_count,
  COUNT(DISTINCT morphotype) as morphotypes_covered,
  CASE
    WHEN COUNT(*) >= 12 AND muscularity = 'Musclée' THEN '✅ Excellente couverture'
    WHEN COUNT(*) >= 6 AND muscularity = 'Moyennement musclée' THEN '✅ Bonne couverture'
    WHEN COUNT(*) >= 3 THEN '⚠️ Couverture modérée'
    ELSE '❌ Sous-couvert'
  END as status
FROM morph_archetypes
WHERE gender = 'feminine'
  AND muscularity IN ('Musclée', 'Moyennement musclée')
  AND bmi_range[1] >= 21.5 AND bmi_range[2] <= 24.5
GROUP BY muscularity
ORDER BY archetype_count DESC;

-- Test 4: Gap Athlètes Féminines BMI 19-22
-- ============================================================
SELECT '=== TEST 4: ATHLÈTES FÉMININES BMI 19-22 ===' as test_section;

SELECT
  COUNT(*) as current_count,
  10 as target_count,
  COUNT(DISTINCT morphotype) as morphotypes_covered,
  6 as morphotypes_target,
  CASE
    WHEN COUNT(*) >= 10 THEN '✅ Objectif atteint'
    WHEN COUNT(*) >= 7 THEN '⚠️ Proche de l''objectif'
    WHEN COUNT(*) >= 3 THEN '⚠️ En cours'
    ELSE '❌ Très insuffisant'
  END as status
FROM morph_archetypes
WHERE gender = 'feminine'
  AND muscularity IN ('Musclée', 'Moyennement musclée')
  AND bmi_range[1] >= 19.0 AND bmi_range[2] <= 22.0;

-- Test 5: Couverture BMI 15 Extrême
-- ============================================================
SELECT '=== TEST 5: BMI 15 EXTRÊME (ANOREXIE) ===' as test_section;

SELECT
  gender,
  COUNT(*) as archetype_count,
  CASE
    WHEN COUNT(*) >= 1 THEN '✅ Couvert'
    ELSE '❌ Non couvert'
  END as status
FROM morph_archetypes
WHERE bmi_range[1] <= 15.5
GROUP BY gender

UNION ALL

SELECT
  'TOTAL' as gender,
  COUNT(*),
  CASE
    WHEN COUNT(*) >= 2 THEN '✅ Objectif atteint (2+ archétypes)'
    WHEN COUNT(*) = 1 THEN '⚠️ Partiellement couvert'
    ELSE '❌ Non couvert'
  END
FROM morph_archetypes
WHERE bmi_range[1] <= 15.5;

-- Test 6: Obésité Morbide Extrême BMI >42
-- ============================================================
SELECT '=== TEST 6: OBÉSITÉ MORBIDE EXTRÊME BMI >42 ===' as test_section;

SELECT
  gender,
  COUNT(*) as archetype_count,
  COUNT(DISTINCT morphotype) as morphotypes_covered,
  CASE
    WHEN COUNT(*) >= 20 THEN '✅ Excellente couverture'
    WHEN COUNT(*) >= 15 THEN '⚠️ Bonne couverture'
    WHEN COUNT(*) >= 10 THEN '⚠️ Couverture modérée'
    ELSE '❌ Insuffisant'
  END as status
FROM morph_archetypes
WHERE bmi_range[2] >= 42
GROUP BY gender
ORDER BY gender;

-- Test 7: Combinaisons Sémantiques Sous-représentées
-- ============================================================
SELECT '=== TEST 7: COMBINAISONS AVEC 1 SEUL ARCHÉTYPE ===' as test_section;

WITH single_archetype_combos AS (
  SELECT
    gender,
    obesity,
    muscularity,
    level,
    morphotype,
    COUNT(*) as archetype_count
  FROM morph_archetypes
  WHERE obesity IS NOT NULL
    AND muscularity IS NOT NULL
    AND level IS NOT NULL
    AND morphotype IS NOT NULL
  GROUP BY gender, obesity, muscularity, level, morphotype
  HAVING COUNT(*) = 1
)
SELECT
  gender,
  COUNT(*) as combinations_with_single_archetype,
  CASE
    WHEN COUNT(*) <= 10 THEN '✅ Excellent (<10 combos)'
    WHEN COUNT(*) <= 25 THEN '⚠️ Acceptable (10-25 combos)'
    WHEN COUNT(*) <= 40 THEN '⚠️ À améliorer (25-40 combos)'
    ELSE '❌ Beaucoup de gaps (>40 combos)'
  END as status
FROM single_archetype_combos
GROUP BY gender
ORDER BY gender;

-- Test 8: Distribution par Morphotype
-- ============================================================
SELECT '=== TEST 8: DISTRIBUTION PAR MORPHOTYPE ===' as test_section;

SELECT
  gender,
  morphotype,
  COUNT(*) as archetype_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY gender), 1)::text || '%' as percentage,
  CASE
    WHEN COUNT(*) >= 15 THEN '✅ Bien représenté'
    WHEN COUNT(*) >= 10 THEN '⚠️ Acceptable'
    ELSE '❌ Sous-représenté'
  END as status
FROM morph_archetypes
WHERE morphotype IS NOT NULL
GROUP BY gender, morphotype
ORDER BY gender, archetype_count DESC;

-- Test 9: Semantic Coherence Score (Simulation)
-- ============================================================
SELECT '=== TEST 9: SEMANTIC COHERENCE POTENTIEL ===' as test_section;

WITH semantic_combo_density AS (
  SELECT
    gender,
    obesity,
    muscularity,
    level,
    COUNT(*) as archetypes_per_combo,
    AVG(COUNT(*)) OVER (PARTITION BY gender) as avg_density
  FROM morph_archetypes
  WHERE obesity IS NOT NULL
    AND muscularity IS NOT NULL
    AND level IS NOT NULL
  GROUP BY gender, obesity, muscularity, level
)
SELECT
  gender,
  ROUND(AVG(archetypes_per_combo), 2) as avg_archetypes_per_semantic_combo,
  ROUND(AVG(avg_density), 2) as overall_density,
  CASE
    WHEN AVG(archetypes_per_combo) >= 5 THEN '✅ K=5 matching facile'
    WHEN AVG(archetypes_per_combo) >= 3 THEN '⚠️ K=5 possible mais serré'
    ELSE '❌ Risque de K=5 failures'
  END as k5_matching_quality
FROM semantic_combo_density
GROUP BY gender
ORDER BY gender;

-- Test 10: Résumé Final - Estimation de Couverture Globale
-- ============================================================
SELECT '=== TEST 10: ESTIMATION COUVERTURE GLOBALE ===' as test_section;

WITH coverage_metrics AS (
  -- BMI Coverage
  SELECT
    'BMI Coverage' as dimension,
    AVG(CASE
      WHEN gender = 'feminine' THEN
        (SELECT COUNT(DISTINCT FLOOR(bmi_range[1])) * 100.0 / 31
         FROM morph_archetypes
         WHERE gender = 'feminine' AND bmi_range[1] BETWEEN 15 AND 45)
      ELSE
        (SELECT COUNT(DISTINCT FLOOR(bmi_range[1])) * 100.0 / 31
         FROM morph_archetypes
         WHERE gender = 'masculine' AND bmi_range[1] BETWEEN 15 AND 45)
    END) as coverage_pct
  FROM morph_archetypes
  WHERE gender IN ('feminine', 'masculine')

  UNION ALL

  -- Athlètes Féminines Coverage
  SELECT
    'Athlètes Féminines BMI 19-24',
    (SELECT COUNT(*) * 100.0 / 29  -- Target: 29 archétypes (20 BMI 22-24 + 9 BMI 19-22)
     FROM morph_archetypes
     WHERE gender = 'feminine'
       AND muscularity IN ('Musclée', 'Moyennement musclée')
       AND bmi_range[1] >= 19.0 AND bmi_range[2] <= 24.5)
  FROM morph_archetypes
  LIMIT 1

  UNION ALL

  -- Semantic Diversity
  SELECT
    'Diversité Sémantique',
    (SELECT COUNT(DISTINCT (gender, obesity, muscularity, level, morphotype)) * 100.0 / 3024  -- Total théorique
     FROM morph_archetypes
     WHERE obesity IS NOT NULL)
  FROM morph_archetypes
  LIMIT 1
)
SELECT
  dimension,
  ROUND(coverage_pct, 2)::text || '%' as coverage,
  CASE
    WHEN coverage_pct >= 98 THEN '✅ Objectif 98% atteint'
    WHEN coverage_pct >= 95 THEN '⚠️ Proche de l''objectif'
    WHEN coverage_pct >= 90 THEN '⚠️ En progrès'
    ELSE '❌ En-dessous de l''objectif'
  END as status
FROM coverage_metrics;

-- Test 11: Gaps Résiduels Critiques
-- ============================================================
SELECT '=== TEST 11: GAPS RÉSIDUELS IDENTIFIÉS ===' as test_section;

SELECT
  'BMI 15 (Anorexie)' as gap_category,
  2 - (SELECT COUNT(*) FROM morph_archetypes WHERE bmi_range[1] <= 15.5) as missing_count,
  CASE
    WHEN (SELECT COUNT(*) FROM morph_archetypes WHERE bmi_range[1] <= 15.5) >= 2
    THEN '✅ Comblé'
    ELSE '❌ Encore à combler'
  END as status

UNION ALL

SELECT
  'Athlètes Féminines BMI 22-24',
  20 - (SELECT COUNT(*)
        FROM morph_archetypes
        WHERE gender = 'feminine'
          AND muscularity = 'Musclée'
          AND bmi_range[1] >= 21.5 AND bmi_range[2] <= 24.5),
  CASE
    WHEN (SELECT COUNT(*)
          FROM morph_archetypes
          WHERE gender = 'feminine' AND muscularity = 'Musclée'
            AND bmi_range[1] >= 21.5 AND bmi_range[2] <= 24.5) >= 12
    THEN '✅ Objectif largement atteint'
    WHEN (SELECT COUNT(*)
          FROM morph_archetypes
          WHERE gender = 'feminine' AND muscularity = 'Musclée'
            AND bmi_range[1] >= 21.5 AND bmi_range[2] <= 24.5) >= 10
    THEN '⚠️ Proche objectif'
    ELSE '❌ Encore à combler'
  END

UNION ALL

SELECT
  'Obésité Morbide >42',
  40 - (SELECT COUNT(*) FROM morph_archetypes WHERE bmi_range[2] >= 42),
  CASE
    WHEN (SELECT COUNT(*) FROM morph_archetypes WHERE bmi_range[2] >= 42) >= 40
    THEN '✅ Objectif atteint'
    WHEN (SELECT COUNT(*) FROM morph_archetypes WHERE bmi_range[2] >= 42) >= 35
    THEN '⚠️ Proche objectif'
    ELSE '❌ Encore à combler'
  END;

-- ============================================================
-- FIN DES TESTS
-- ============================================================

SELECT '=== TESTS DE VALIDATION TERMINÉS ===' as summary;
SELECT 'Utilisez ces métriques pour identifier les prochaines optimisations nécessaires' as recommendation;
