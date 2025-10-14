#!/bin/bash

# Script de test pour l'intelligence de récupération et progression de charge
# Phase 2.5 - Intelligence Contextuelle

echo "=================================================="
echo "Test de l'Intelligence de Récupération"
echo "=================================================="
echo ""

# Configuration
SUPABASE_URL="${VITE_SUPABASE_URL}"
ANON_KEY="${VITE_SUPABASE_ANON_KEY}"
TEST_USER_ID="test-user-123"

# Couleurs pour output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📋 Configuration:"
echo "  - Supabase URL: ${SUPABASE_URL}"
echo "  - User ID: ${TEST_USER_ID}"
echo ""

# Test 1: Context Collector - Vérifier recoveryAnalysis
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 1: Context Collector - Recovery Analysis"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Calling training-context-collector..."

CONTEXT_RESPONSE=$(curl -s -X POST "${SUPABASE_URL}/functions/v1/training-context-collector" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -d "{\"userId\": \"${TEST_USER_ID}\"}")

# Vérifier si recoveryAnalysis existe
if echo "$CONTEXT_RESPONSE" | jq -e '.data.userContext.recoveryAnalysis' > /dev/null 2>&1; then
  echo -e "${GREEN}✓ recoveryAnalysis présent dans le contexte${NC}"

  # Extraire les détails
  MUSCLE_GROUPS=$(echo "$CONTEXT_RESPONSE" | jq '.data.userContext.recoveryAnalysis.muscleGroupsWorked | keys | length')
  RECENT_EXERCISES=$(echo "$CONTEXT_RESPONSE" | jq '.data.userContext.recoveryAnalysis.recentExercises | keys | length')
  RECOVERY_STATUS=$(echo "$CONTEXT_RESPONSE" | jq '.data.userContext.recoveryAnalysis.recoveryStatus | keys | length')
  LAST_WORKOUT=$(echo "$CONTEXT_RESPONSE" | jq -r '.data.userContext.recoveryAnalysis.lastWorkoutDate')

  echo "  - Groupes musculaires analysés: ${MUSCLE_GROUPS}"
  echo "  - Exercices récents trackés: ${RECENT_EXERCISES}"
  echo "  - Statuts de récupération: ${RECOVERY_STATUS}"
  echo "  - Dernière séance: ${LAST_WORKOUT}"

  # Afficher détails de récupération
  echo ""
  echo "  Détails récupération par groupe:"
  echo "$CONTEXT_RESPONSE" | jq -r '.data.userContext.recoveryAnalysis.recoveryStatus | to_entries[] | "    - \(.key): \(.value.status) (\(.value.hoursSinceLastWorkout)h depuis dernier workout)"'

else
  echo -e "${RED}✗ recoveryAnalysis manquant dans le contexte${NC}"
  echo "Response: $CONTEXT_RESPONSE" | jq '.'
fi

echo ""

# Test 2: Coach Force - Vérifier variation et load progression
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 2: Coach Force - Variation & Load Progression"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Calling training-coach-force avec contexte enrichi..."

PREPARER_CONTEXT='{
  "availableTime": 60,
  "wantsShortVersion": false,
  "locationId": "loc-test-123",
  "locationName": "Salle de sport",
  "locationMode": "gym",
  "availableEquipment": ["barbell", "dumbbell", "rack"],
  "energyLevel": 8,
  "hasFatigue": false,
  "hasPain": false
}'

# Extraire userContext du context-collector
USER_CONTEXT=$(echo "$CONTEXT_RESPONSE" | jq '.data.userContext')

FORCE_RESPONSE=$(curl -s -X POST "${SUPABASE_URL}/functions/v1/training-coach-force" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -d "{
    \"userId\": \"${TEST_USER_ID}\",
    \"userContext\": ${USER_CONTEXT},
    \"preparerContext\": ${PREPARER_CONTEXT}
  }")

# Vérifier si génération réussie
if echo "$FORCE_RESPONSE" | jq -e '.success' | grep -q "true"; then
  echo -e "${GREEN}✓ Prescription générée avec succès${NC}"

  # Analyser les exercices
  EXERCISES=$(echo "$FORCE_RESPONSE" | jq '.data.exercises')
  EXERCISE_COUNT=$(echo "$EXERCISES" | jq 'length')

  echo "  - Nombre d'exercices: ${EXERCISE_COUNT}"
  echo ""
  echo "  Analyse des exercices:"

  for i in $(seq 0 $(($EXERCISE_COUNT - 1))); do
    EXERCISE=$(echo "$EXERCISES" | jq ".[$i]")
    NAME=$(echo "$EXERCISE" | jq -r '.name')
    LOAD=$(echo "$EXERCISE" | jq '.load')
    LOAD_TYPE=$(echo "$LOAD" | jq -r 'type')

    echo ""
    echo "    Exercice #$((i+1)): ${NAME}"

    if [ "$LOAD_TYPE" == "array" ]; then
      echo -e "      ${GREEN}✓ Progression de charge détectée (load array)${NC}"
      LOAD_VALUES=$(echo "$LOAD" | jq -r 'join(" -> ")')
      echo "      Progression: ${LOAD_VALUES} kg"

      # Vérifier incréments
      FIRST_LOAD=$(echo "$LOAD" | jq '.[0]')
      LAST_LOAD=$(echo "$LOAD" | jq '.[-1]')
      PERCENT=$(echo "scale=1; ($FIRST_LOAD / $LAST_LOAD) * 100" | bc)
      echo "      Warm-up ratio: ${PERCENT}% (devrait être ~50-60%)"
    else
      echo -e "      ${YELLOW}⚠ Charge unique (load number)${NC}"
      echo "      Charge: ${LOAD} kg"
    fi
  done

  echo ""
  echo "  Focus de la séance:"
  echo "$FORCE_RESPONSE" | jq -r '.data.focus[]' | sed 's/^/    - /'

  echo ""
  echo "  Rationale du coach:"
  echo "$FORCE_RESPONSE" | jq -r '.data.coachRationale' | fold -w 70 -s | sed 's/^/    /'

else
  echo -e "${RED}✗ Échec de la génération${NC}"
  echo "Response: $FORCE_RESPONSE" | jq '.'
fi

echo ""

# Test 3: Vérifier cache avec date
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 3: Cache avec Date"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Rappel de Coach Force avec mêmes paramètres..."

FORCE_RESPONSE_2=$(curl -s -X POST "${SUPABASE_URL}/functions/v1/training-coach-force" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -d "{
    \"userId\": \"${TEST_USER_ID}\",
    \"userContext\": ${USER_CONTEXT},
    \"preparerContext\": ${PREPARER_CONTEXT}
  }")

CACHED=$(echo "$FORCE_RESPONSE_2" | jq -r '.metadata.cached')

if [ "$CACHED" == "true" ]; then
  echo -e "${GREEN}✓ Cache hit détecté (normal pour 2ème appel immédiat)${NC}"
  LATENCY=$(echo "$FORCE_RESPONSE_2" | jq -r '.metadata.latencyMs')
  echo "  - Latence: ${LATENCY}ms (devrait être < 100ms)"
else
  echo -e "${YELLOW}⚠ Pas de cache hit (nouvelle génération)${NC}"
  LATENCY=$(echo "$FORCE_RESPONSE_2" | jq -r '.metadata.latencyMs')
  echo "  - Latence: ${LATENCY}ms"
fi

echo ""

# Test 4: Validation Structure
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 4: Validation Structure JSON"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier champs obligatoires
REQUIRED_FIELDS=("sessionId" "type" "category" "exercises" "warmup" "cooldown" "overallNotes" "coachRationale")
ALL_VALID=true

for FIELD in "${REQUIRED_FIELDS[@]}"; do
  if echo "$FORCE_RESPONSE" | jq -e ".data.${FIELD}" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ ${FIELD} présent${NC}"
  else
    echo -e "${RED}✗ ${FIELD} manquant${NC}"
    ALL_VALID=false
  fi
done

echo ""
if [ "$ALL_VALID" = true ]; then
  echo -e "${GREEN}✅ Tous les tests passés avec succès!${NC}"
else
  echo -e "${RED}❌ Certains tests ont échoué${NC}"
fi

echo ""
echo "=================================================="
echo "Fin des tests"
echo "=================================================="
