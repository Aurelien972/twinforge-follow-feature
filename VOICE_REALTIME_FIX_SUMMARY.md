# Résolution du blocage "en attente" du système vocal Realtime

## Date
18 Octobre 2025

## Problème identifié

Le système vocal utilisant l'API OpenAI Realtime restait bloqué sur "en attente" sans jamais démarrer la session vocale. L'utilisateur ne voyait aucune transcription ni retour audio.

## Cause racine

### Problème 1: Désalignement des stores (CRITIQUE)
- **L'orchestrateur** (`voiceCoachOrchestrator.ts`) utilisait `voiceCoachStore` (ancien store)
- **L'interface utilisateur** (`UnifiedCoachDrawer.tsx`) utilisait `unifiedCoachStore` (nouveau store)
- **Résultat**: Les messages de l'API Realtime arrivaient mais étaient stockés dans le mauvais store, donc jamais affichés dans l'UI

### Problème 2: Manque de logs de débogage
- Impossible de tracer le flux de données
- Pas de logs pour identifier où le processus se bloquait
- Aucune visibilité sur la connexion WebSocket

### Problème 3: Pas de gestion des timeouts
- Si la connexion échouait silencieusement, l'état restait bloqué indéfiniment
- Aucun feedback à l'utilisateur sur les problèmes
- Pas de fallback vers le mode texte

## Solutions implémentées

### 1. Unification des stores ✅

**Fichier**: `src/system/services/voiceCoachOrchestrator.ts`

**Changements**:
- Remplacement de tous les imports de `useVoiceCoachStore` par `useUnifiedCoachStore`
- Adaptation des appels de méthodes pour correspondre à l'API de `unifiedCoachStore`
- Simplification de la gestion d'état (pas besoin de `startConversation` async)

**Impact**: Les messages de l'API Realtime sont maintenant stockés dans le bon store et apparaissent dans l'UI.

### 2. Ajout de logs détaillés ✅

**Fichiers modifiés**:
- `src/system/services/voiceCoachOrchestrator.ts`
- `src/system/services/openaiRealtimeService.ts`

**Logs ajoutés**:
- 🚀 Début de chaque étape importante
- ✅ Succès d'une opération
- ❌ Erreurs avec contexte détaillé
- 📨 Messages reçus de l'API Realtime
- 🔄 Changements d'état

**Exemples de logs**:
```typescript
logger.info('VOICE_ORCHESTRATOR', '🚀 STARTING CONNECTION TO REALTIME API')
logger.info('VOICE_ORCHESTRATOR', '✅ Audio input service initialized')
logger.info('VOICE_ORCHESTRATOR', '✅✅✅ Voice session started successfully ✅✅✅')
```

### 3. Surveillance d'état avec timeouts ✅

**Fichier**: `src/ui/components/chat/UnifiedCoachDrawer.tsx`

**useEffect de surveillance**:
- Surveille l'état `voiceState` en mode vocal
- Timeouts différenciés par état:
  - `connecting`: 15 secondes max
  - `processing`: 30 secondes max
  - `speaking`: 60 secondes max
- Si timeout atteint:
  - Affiche un message d'erreur clair
  - Propose automatiquement de basculer en mode texte après 5 secondes
  - Log détaillé du problème

**useEffect de logging**:
- Log tous les changements d'état vocal
- Timestamp précis pour chaque transition
- Contexte complet (isProcessing, isSpeaking)

### 4. Amélioration des logs dans handleStartVoiceSession ✅

**Ajouts**:
- Log au début de la fonction
- Log avant chaque étape (initialisation, connexion)
- Log après chaque succès
- Log détaillé des erreurs avec stack trace
- Logs de fallback vers le mode texte

## Flux de données corrigé

### Avant (CASSÉ):
```
User clicks voice button
  → UnifiedCoachDrawer.handleStartVoiceSession()
  → voiceCoachOrchestrator.startVoiceSession()
  → openaiRealtimeService.connect()
  → WebSocket messages arrive
  → voiceCoachOrchestrator.handleRealtimeMessage()
  → Updates voiceCoachStore ❌ (MAUVAIS STORE)
  → UnifiedCoachDrawer reads unifiedCoachStore ❌ (PAS DE DONNÉES)
  → UI shows "en attente" forever ❌
```

### Après (CORRIGÉ):
```
User clicks voice button
  → UnifiedCoachDrawer.handleStartVoiceSession() 🚀
  → voiceCoachOrchestrator.startVoiceSession() 🎤
  → openaiRealtimeService.connect() 🌐
  → WebSocket OPEN ✅
  → Session configured ⚙️
  → Audio recording started 🎙️
  → State = listening ✅
  → WebSocket messages arrive 📨
  → voiceCoachOrchestrator.handleRealtimeMessage() 📝
  → Updates unifiedCoachStore ✅ (BON STORE)
  → UnifiedCoachDrawer reads unifiedCoachStore ✅ (DONNÉES PRÉSENTES)
  → UI shows transcriptions and responses ✅
```

## Points clés de débogage

### Logs à surveiller pour diagnostiquer les problèmes:

1. **Connexion WebSocket**:
   - `🚀 STARTING CONNECTION TO REALTIME API`
   - `🔌 Creating WebSocket connection`
   - `✅✅✅ WebSocket OPEN event - Connection established ✅✅✅`

2. **Configuration de session**:
   - `⚙️ Configuring session...`
   - `✅ Session configuration sent to server`

3. **Messages de l'API**:
   - `📨 Important message received: [type]`
   - `📝 User transcription delta`
   - `💬 Coach transcript delta`

4. **Changements d'état**:
   - `🔄 Voice state changed to: [state]`
   - Vérifier la progression: `idle` → `connecting` → `listening` → `processing` → `speaking` → `listening`

5. **Timeouts**:
   - `⏱️ Starting timeout monitor for state: [state]`
   - `❌ STATE TIMEOUT DETECTED` (si problème)

## Tests recommandés

1. **Test de connexion**:
   - Ouvrir la console développeur
   - Activer le mode vocal
   - Vérifier les logs de connexion
   - Confirmer que l'état passe à `listening`

2. **Test de transcription**:
   - Parler dans le micro
   - Vérifier que les deltas de transcription apparaissent dans les logs
   - Vérifier que le texte s'affiche en temps réel dans l'UI

3. **Test de réponse**:
   - Attendre la réponse du coach
   - Vérifier que l'état passe à `processing` puis `speaking`
   - Vérifier que l'audio est joué
   - Vérifier que la transcription du coach s'affiche

4. **Test de timeout**:
   - Si la connexion échoue, vérifier qu'un timeout se déclenche après 15 secondes
   - Vérifier que le message d'erreur est clair
   - Vérifier que le fallback vers le mode texte fonctionne

## Configuration requise

### Variables d'environnement Supabase:
- `VITE_SUPABASE_URL`: URL du projet Supabase
- `VITE_SUPABASE_ANON_KEY`: Clé publique Supabase

### Edge Function:
- `voice-coach-realtime` doit être déployée
- L'API Key OpenAI doit être configurée dans Supabase

### Permissions navigateur:
- Microphone access requis
- WebSockets doivent être supportés (pas de StackBlitz)

## Limitations connues

1. **Environnement StackBlitz**:
   - Les WebSockets externes ne sont pas supportés
   - Le mode vocal est automatiquement désactivé
   - Fallback automatique vers le mode texte

2. **Navigateurs mobiles**:
   - Permissions micro peuvent nécessiter une interaction utilisateur
   - Qualité audio peut varier selon l'appareil

3. **Connexion réseau**:
   - Nécessite une connexion stable
   - Les WebSockets peuvent être bloqués par certains proxies/firewalls

## Résumé des fichiers modifiés

1. ✅ `src/system/services/voiceCoachOrchestrator.ts`
   - Unification du store
   - Logs détaillés
   - Meilleure gestion d'erreur

2. ✅ `src/system/services/openaiRealtimeService.ts`
   - Logs de connexion WebSocket
   - Logs des messages reçus/envoyés
   - Meilleure gestion des erreurs WebSocket

3. ✅ `src/ui/components/chat/UnifiedCoachDrawer.tsx`
   - Surveillance d'état avec timeouts
   - Logs de changements d'état
   - Amélioration de handleStartVoiceSession

## Prochaines étapes

1. **Tester en production** avec un vrai appareil et connexion
2. **Monitorer les logs** pour identifier d'autres points de défaillance potentiels
3. **Optimiser les timeouts** si nécessaire selon les retours utilisateurs
4. **Ajouter des métriques** pour suivre le taux de succès des sessions vocales

## Conclusion

Le problème principal était un **désalignement architectural** entre les couches de service et d'UI. En unifiant les stores et en ajoutant une traçabilité complète du flux de données, le système vocal devrait maintenant fonctionner correctement.

Les logs ajoutés permettront de diagnostiquer rapidement tout problème futur et les timeouts éviteront que l'utilisateur reste bloqué indéfiniment.

**Note**: En production, vérifier que l'edge function `voice-coach-realtime` est bien déployée et que l'API Key OpenAI est configurée.
