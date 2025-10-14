/*
  # Script de nettoyage des sessions bloquées

  Ce script identifie et nettoie les sessions training bloquées entre les étapes,
  particulièrement celles bloquées en Step 2 (activer) sans prescription valide.

  Utilisation:
  - Exécuter ce script directement dans l'éditeur SQL de Supabase
  - Ou via un outil de migration si nécessaire

  Sécurité:
  - Ce script ne supprime que les états de session, pas les training_sessions réels
  - Les utilisateurs pourront recommencer normalement après le nettoyage
*/

-- 1. Identifier les sessions bloquées (prescription_exists=true mais pas de prescription en DB)
SELECT
  tss.session_id,
  tss.user_id,
  tss.prescription_exists,
  tss.current_step,
  tss.last_activity_at,
  tss.generation_triggered_at,
  ts.id as training_session_exists,
  ts.prescription as has_prescription
FROM training_session_states tss
LEFT JOIN training_sessions ts ON tss.session_id = ts.id AND tss.user_id = ts.user_id
WHERE tss.prescription_exists = true
  AND (ts.id IS NULL OR ts.prescription IS NULL)
ORDER BY tss.last_activity_at DESC;

-- 2. Nettoyer les sessions orphelines (état existe mais pas de training_session correspondant)
DELETE FROM training_session_states
WHERE prescription_exists = true
  AND session_id NOT IN (
    SELECT id FROM training_sessions
    WHERE prescription IS NOT NULL
  );

-- 3. Nettoyer les sessions abandonnées depuis plus de 24h sans activité
DELETE FROM training_session_states
WHERE last_activity_at < now() - interval '24 hours'
  AND prescription_exists = false;

-- 4. Réinitialiser les sessions bloquées en génération depuis plus de 10 minutes
UPDATE training_session_states
SET
  generation_triggered = false,
  generation_triggered_at = NULL,
  prescription_exists = false,
  updated_at = now()
WHERE generation_triggered = true
  AND generation_triggered_at < now() - interval '10 minutes'
  AND prescription_exists = false;

-- 5. Vérifier les résultats après nettoyage
SELECT
  current_step,
  prescription_exists,
  generation_triggered,
  COUNT(*) as count
FROM training_session_states
WHERE last_activity_at > now() - interval '24 hours'
GROUP BY current_step, prescription_exists, generation_triggered
ORDER BY current_step, prescription_exists, generation_triggered;

-- 6. Statistiques des sessions actives
SELECT
  'Total sessions actives (24h)' as metric,
  COUNT(*) as count
FROM training_session_states
WHERE last_activity_at > now() - interval '24 hours'
UNION ALL
SELECT
  'Sessions bloquées potentielles' as metric,
  COUNT(*) as count
FROM training_session_states
WHERE prescription_exists = true
  AND session_id NOT IN (
    SELECT id FROM training_sessions
    WHERE prescription IS NOT NULL
  );
