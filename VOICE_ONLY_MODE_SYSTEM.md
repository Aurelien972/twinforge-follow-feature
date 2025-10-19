# Système de Mode Audio Optimisé pour Mobile

## Vue d'ensemble

Le système de mode audio a été optimisé pour offrir une expérience vocale ultra-légère sur mobile, sans surcharge GPU et avec une UI minimaliste pendant les sessions Realtime.

## Architecture

### 1. Store State (`unifiedCoachStore`)

**Nouveau flag:** `isVoiceOnlyMode: boolean`

- `true`: Interface minimale active, messages accumulés en arrière-plan
- `false`: Interface de chat normale avec messages visibles

**Nouvelles actions:**
- `enterVoiceOnlyMode()`: Active le mode minimal et ferme le drawer
- `exitVoiceOnlyMode()`: Désactive le mode minimal et ouvre le drawer avec l'historique

### 2. Composant VoiceSessionMinimal

Interface ultra-légère pour les sessions vocales:

**Caractéristiques:**
- Fond sombre opaque (98% opacity) pour masquer l'app
- Grand bouton micro central (160px) avec état visuel
- Indicateurs d'état simples (Connexion, Je t'écoute, Coach parle, Traitement)
- Bouton "Terminer la session" en bas
- Bouton "Minimiser" en haut pour mettre en arrière-plan
- Aucune animation lourde, pas de waveform, pas de messages affichés
- Pas de backdrop-filter ou blur pendant la session

**États visuels:**
- `connecting`: Icône Loader grise
- `listening`: Icône Micro rouge avec anneaux pulsants
- `speaking`: Icône Radio rouge avec glow
- `processing`: Icône Loader avec texte "Traitement..."
- `error`: Affichage de l'erreur

### 3. FloatingChatButton Adapté

**Comportement dynamique:**

Quand `isVoiceOnlyMode === true`:
- Affiche l'icône Radio rouge au lieu de MessageSquare
- Bordure rouge pulsante pour indiquer session active
- Clic ouvre le chat avec l'historique (via `exitVoiceOnlyMode()`)

Quand `isVoiceOnlyMode === false`:
- Comportement normal de toggle du chat

### 4. GlobalChatDrawer Adapté

**Logique de rendu:**

```typescript
if (isVoiceOnlyMode) {
  return <VoiceSessionMinimal onClose={close} />;
}

// Sinon, rendu normal du chat drawer
```

Quand en mode voice-only, le drawer affiche l'interface minimale au lieu du chat complet.

### 5. ChatInputBar Adapté

**Blocage du texte en mode Realtime:**

```typescript
const isTextInputBlocked = realtimeState !== 'idle' && realtimeState !== 'error';
```

- Input textarea désactivé avec opacity réduite
- Placeholder: "Mode vocal actif - Texte désactivé"
- Impossible d'écrire pendant une session Realtime (voice-only)

### 6. voiceCoachOrchestrator Adapté

**Au démarrage de session:**

```typescript
// Après connexion réussie
store.enterVoiceOnlyMode(); // Active l'interface minimale
store.setVoiceState('listening');
```

**À l'arrêt de session:**

```typescript
// Ne PAS sortir du mode voice-only ici
// C'est géré par VoiceSessionMinimal.handleStop()
// qui appelle exitVoiceOnlyMode() pour afficher l'historique
```

## Flux Utilisateur

### Démarrage Session Vocale

1. User clique sur le bouton Realtime rouge dans ChatInputBar
2. `voiceCoachOrchestrator.startVoiceSession()` appelé
3. Connexion WebRTC établie
4. `store.enterVoiceOnlyMode()` active l'interface minimale
5. GlobalChatDrawer affiche VoiceSessionMinimal
6. Messages accumulés en arrière-plan sans affichage
7. FloatingChatButton affiche Radio rouge

### Pendant la Session

**User peut:**
- Parler librement (détection VAD automatique)
- Voir l'état visuel (Je t'écoute / Coach parle)
- Minimiser l'interface (bouton en haut à droite)
- Naviguer dans l'app (session continue en arrière-plan)
- Cliquer sur FloatingChatButton pour voir l'historique

**User ne peut PAS:**
- Écrire en texte (input bloqué)
- Voir les messages en temps réel (accumulés en arrière-plan)

### Navigation Pendant Session

1. User clique sur Minimiser dans VoiceSessionMinimal
2. Interface minimale se ferme
3. Session Realtime continue en arrière-plan
4. FloatingChatButton reste rouge avec icône Radio
5. User navigue librement dans l'app
6. Clic sur FloatingChatButton rouvre VoiceSessionMinimal

### Fin de Session

1. User clique sur "Terminer la session" dans VoiceSessionMinimal
2. `voiceCoachOrchestrator.stopVoiceSession()` appelé
3. Connexion WebRTC fermée
4. `exitVoiceOnlyMode()` appelé
5. GlobalChatDrawer s'ouvre automatiquement
6. Tous les messages échangés sont visibles dans l'historique
7. User peut continuer en mode texte ou relancer une session vocale

### Reprise Consultation Historique

À tout moment pendant la session:

1. User clique sur FloatingChatButton (icône Radio rouge)
2. `exitVoiceOnlyMode()` appelé
3. Session vocale continue (pas arrêtée)
4. GlobalChatDrawer affiche le chat normal
5. Historique complet visible
6. User peut relancer Realtime ou continuer en texte

## Optimisations Performance

### GPU & Rendering

- **Pas d'animations lourdes:** Utilisation minimale de framer-motion
- **Pas de backdrop-filter:** Fond opaque simple
- **Pas de blur:** Effets coûteux désactivés
- **Pas de waveform:** Visualisation audio désactivée
- **Messages non rendus:** Accumulation en mémoire seulement

### Mémoire

- Messages stockés dans Zustand sans composants React
- Pas de re-renders pendant la session vocale
- Nettoyage automatique après déconnexion

### CPU

- Détection VAD côté serveur (WebRTC)
- Pas de traitement audio local
- Transcriptions reçues directement du serveur

## Sécurité & État

### Persistence

- `isVoiceOnlyMode` NON persisté (session uniquement)
- Messages persistés (dernier 50 dans localStorage)
- Preferences vocales persistées

### Gestion d'erreur

- Erreurs affichées dans VoiceSessionMinimal
- Auto-sortie du mode voice-only en cas d'erreur
- Historique préservé même en cas de crash

## Tests Recommandés

1. **Test session complète:**
   - Démarrer Realtime
   - Parler plusieurs fois
   - Terminer session
   - Vérifier historique complet

2. **Test navigation:**
   - Démarrer Realtime
   - Minimiser
   - Naviguer dans l'app
   - Revenir via FloatingChatButton
   - Terminer session

3. **Test consultation historique:**
   - Démarrer Realtime
   - Parler
   - Cliquer FloatingChatButton
   - Vérifier messages visibles
   - Cliquer Realtime à nouveau
   - Vérifier reprise session

4. **Test blocage texte:**
   - Démarrer Realtime
   - Tenter d'écrire dans input
   - Vérifier input désactivé
   - Terminer session
   - Vérifier input réactivé

## Points d'Attention

### Ne PAS faire

- ❌ Afficher les messages pendant une session Realtime active
- ❌ Permettre l'écriture en texte pendant Realtime
- ❌ Utiliser des animations ou effets lourds
- ❌ Persister isVoiceOnlyMode dans localStorage
- ❌ Ouvrir le chat drawer complet pendant une session vocale

### À faire

- ✅ Accumuler les messages en arrière-plan
- ✅ Maintenir la session active pendant navigation
- ✅ Afficher l'historique après fin de session
- ✅ Utiliser une UI minimaliste et performante
- ✅ Permettre consultation historique pendant session
- ✅ Bloquer complètement l'input texte en mode Realtime

## Métriques de Succès

- **Performance:** Session vocale < 5% CPU mobile
- **Mémoire:** Pas de fuites pendant sessions longues
- **UX:** Latence < 500ms entre parole et réponse
- **Fiabilité:** Pas de perte de messages
- **Navigation:** Session continue sans interruption
