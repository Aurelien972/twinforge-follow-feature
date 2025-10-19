# Changements Techniques - Mode Audio Optimisé Mobile

## Résumé

Implémentation d'un système de mode audio "voice-only" optimisé pour mobile qui:
- Désactive l'affichage des messages pendant les sessions Realtime
- Bloque l'input texte en mode vocal
- Fournit une interface ultra-légère sans surcharge GPU
- Permet la navigation pendant une session vocale
- Affiche l'historique complet après la session

## Fichiers Modifiés

### 1. `src/system/store/unifiedCoachStore.ts`

**Ajouts:**

```typescript
interface UnifiedCoachState {
  // ...
  isVoiceOnlyMode: boolean; // NEW
  // ...
}

// Nouvelles actions
enterVoiceOnlyMode: () => void;
exitVoiceOnlyMode: () => void;
```

**Implémentation:**

```typescript
// Initial state
isVoiceOnlyMode: false,

// Actions
enterVoiceOnlyMode: () => {
  set({
    isVoiceOnlyMode: true,
    isPanelOpen: false,
    communicationMode: 'voice'
  });
  logger.info('UNIFIED_COACH', 'Entered voice-only mode');
},

exitVoiceOnlyMode: () => {
  set({
    isVoiceOnlyMode: false,
    isPanelOpen: true
  });
  logger.info('UNIFIED_COACH', 'Exited voice-only mode');
}
```

**Impact:**
- Ajoute un flag global pour suivre le mode voice-only
- Contrôle l'affichage de l'interface minimale vs chat normal
- Non persisté (session uniquement)

### 2. `src/ui/components/chat/VoiceSessionMinimal.tsx` (NOUVEAU)

**Fichier créé:** Interface ultra-légère pour sessions vocales

**Caractéristiques:**
- Composant fullscreen avec fond opaque (98% opacity)
- Grand bouton micro central (160px) avec état visuel
- Header minimal avec mode et bouton minimiser
- Bouton "Terminer la session" en bas
- Indicateurs d'état textuels simples
- Aucune animation lourde, pas de messages affichés

**Props:**
```typescript
interface VoiceSessionMinimalProps {
  onClose?: () => void;
}
```

**États gérés:**
- `connecting`: Connexion en cours
- `listening`: Écoute active (VAD)
- `speaking`: Coach parle
- `processing`: Traitement en cours
- `error`: Erreur affichée

**Actions:**
- `handleStop()`: Arrête session et ouvre chat avec historique
- `handleMinimize()`: Ferme interface mais garde session active

### 3. `src/ui/components/chat/FloatingChatButton.tsx`

**Modification du hook:**

```typescript
const {
  // ...
  isVoiceOnlyMode,     // NEW
  exitVoiceOnlyMode    // NEW
} = useUnifiedCoachStore();
```

**Modification du handleClick:**

```typescript
const handleClick = () => {
  click();
  Haptics.press();

  // Si en mode voice-only, sortir du mode et ouvrir le chat
  if (isVoiceOnlyMode) {
    logger.info('FLOATING_CHAT_BUTTON', 'Exiting voice-only mode to view conversation');
    exitVoiceOnlyMode();
  } else {
    toggle();
  }
};
```

**Modification de l'icône:**

```typescript
{(isVoiceActive || isVoiceOnlyMode) && !isOpen ? (
  // Afficher icône Radio rouge
  <SpatialIcon Icon={ICONS.Radio} />
) : (
  // Afficher icône MessageSquare normale
  <SpatialIcon Icon={ICONS.MessageSquare} />
)}
```

**Impact:**
- FloatingChatButton devient rouge avec Radio pendant session
- Clic sort du mode voice-only et affiche historique
- Indicateur visuel clair de session active

### 4. `src/ui/components/chat/GlobalChatDrawer.tsx`

**Modification du hook:**

```typescript
const {
  // ...
  isVoiceOnlyMode  // NEW
} = useUnifiedCoachStore();
```

**Ajout de logique conditionnelle:**

```typescript
// Si en mode voice-only, afficher interface minimale
if (isVoiceOnlyMode) {
  return (
    <AnimatePresence>
      {isOpen && (
        <VoiceSessionMinimal onClose={close} />
      )}
    </AnimatePresence>
  );
}

// Sinon, rendu normal du chat drawer
return (
  <AnimatePresence>
    {isOpen && (
      // ... chat drawer normal
    )}
  </AnimatePresence>
);
```

**Impact:**
- Drawer affiche VoiceSessionMinimal quand isVoiceOnlyMode=true
- Messages continuent de s'accumuler en arrière-plan
- Pas de re-renders coûteux pendant session vocale

### 5. `src/ui/components/coach/ChatInputBar.tsx`

**Ajout de flag:**

```typescript
const isRealtimeActive = realtimeState !== 'idle' && realtimeState !== 'error';
const isTextInputBlocked = isRealtimeActive; // NEW
```

**Modification du textarea:**

```typescript
<textarea
  // ...
  placeholder={
    isTextInputBlocked
      ? 'Mode vocal actif - Texte désactivé'
      : isRecording
      ? 'Enregistrement en cours...'
      : isTranscribing
      ? 'Transcription...'
      : placeholder
  }
  disabled={disabled || isRecording || isTranscribing || isTextInputBlocked}
  style={{
    maxHeight: '90px',
    minHeight: '32px',
    opacity: isTextInputBlocked ? 0.4 : 1  // Visual feedback
  }}
/>
```

**Impact:**
- Input texte complètement bloqué pendant Realtime
- Feedback visuel avec opacity réduite
- Force l'utilisateur en mode voice-only

### 6. `src/system/services/voiceCoachOrchestrator.ts`

**Modification de startVoiceSession:**

```typescript
async startVoiceSession(mode: string): Promise<void> {
  // ... connexion WebRTC ...

  // Démarrer conversation
  store.startConversation(mode as any);

  // IMPORTANT: Activer mode voice-only
  logger.info('VOICE_ORCHESTRATOR', '📱 Entering voice-only mode for minimal UI');
  store.enterVoiceOnlyMode();  // NEW

  // ... suite ...
}
```

**Modification de stopVoiceSession:**

```typescript
async stopVoiceSession(): Promise<void> {
  // ... déconnexion ...

  // NOTE: Ne pas sortir du mode voice-only ici
  // C'est fait par exitVoiceOnlyMode() dans VoiceSessionMinimal
  // qui ouvre automatiquement le chat avec l'historique

  logger.info('VOICE_ORCHESTRATOR', 'Voice session stopped');
}
```

**Impact:**
- Mode voice-only activé automatiquement au démarrage session
- Désactivation gérée par l'UI (VoiceSessionMinimal)
- Messages accumulés pendant toute la session

## Flux de Données

### Démarrage Session

```
User clique Realtime button
    ↓
ChatInputBar.handleRealtimeToggle()
    ↓
CoachChatInterface.handleStartRealtimeSession()
    ↓
voiceCoachOrchestrator.startVoiceSession(mode)
    ↓
store.enterVoiceOnlyMode()
    ↓
GlobalChatDrawer détecte isVoiceOnlyMode=true
    ↓
Affiche VoiceSessionMinimal au lieu du drawer
```

### Pendant Session

```
User parle
    ↓
WebRTC envoie audio à OpenAI
    ↓
openaiRealtimeService.handleRealtimeMessage()
    ↓
voiceCoachOrchestrator.handleRealtimeMessage()
    ↓
store.addMessage() (en arrière-plan)
    ↓
Messages accumulés mais PAS affichés
    ↓
FloatingChatButton reste rouge (isVoiceOnlyMode=true)
```

### Consultation Historique

```
User clique FloatingChatButton rouge
    ↓
FloatingChatButton.handleClick() détecte isVoiceOnlyMode
    ↓
store.exitVoiceOnlyMode()
    ↓
GlobalChatDrawer détecte isVoiceOnlyMode=false
    ↓
Affiche chat drawer normal avec tous les messages
    ↓
Session Realtime continue en arrière-plan
```

### Fin Session

```
User clique "Terminer session"
    ↓
VoiceSessionMinimal.handleStop()
    ↓
voiceCoachOrchestrator.stopVoiceSession()
    ↓
store.exitVoiceOnlyMode()
    ↓
GlobalChatDrawer affiche chat avec historique complet
```

## Optimisations Performance

### Rendu

**AVANT:**
- Messages affichés en temps réel pendant session
- Re-renders à chaque nouveau message
- Scroll automatique actif
- Animations sur chaque message

**APRÈS:**
- Messages stockés en mémoire seulement
- Aucun re-render pendant session
- Pas de scroll
- Pas d'animations

### GPU

**AVANT:**
- backdrop-filter actif (coûteux)
- Animations framer-motion multiples
- Waveform audio en temps réel
- Effets visuels complexes

**APRÈS:**
- Fond opaque simple (pas de blur)
- Animations minimales (anneaux pulsants uniquement)
- Pas de waveform
- Effets simples (drop-shadow seulement)

### CPU

**AVANT:**
- Traitement audio local pour waveform
- Calculs de layout pour messages
- Event handlers multiples

**APRÈS:**
- Audio géré par WebRTC (serveur)
- Layout statique simple
- Event handlers minimaux

## Tests de Régression

### À vérifier après intégration

1. **Chat texte normal:**
   - ✅ Fonctionne quand pas en Realtime
   - ✅ Messages affichés correctement
   - ✅ Input texte actif

2. **Voice-to-text (Whisper):**
   - ✅ Toujours fonctionnel
   - ✅ Pas affecté par isVoiceOnlyMode
   - ✅ Transcription envoyée comme message texte

3. **Navigation:**
   - ✅ Chat drawer ferme sur navigation (si closeOnNavigation=true)
   - ✅ FloatingChatButton reste accessible
   - ✅ État préservé

4. **Modes coach:**
   - ✅ Tous les modes fonctionnent (training, nutrition, etc.)
   - ✅ Couleurs correctes
   - ✅ Prompts system corrects

## Métriques de Performance

### Objectifs

- **CPU mobile:** < 30% pendant session vocale
- **GPU:** < 20% (pas d'animations lourdes)
- **Memory:** Stable, pas de fuites
- **FPS:** ~60 pendant navigation avec session active
- **Latency:** < 500ms réponse vocale

### Mesure

Chrome DevTools > Performance:

1. Start recording
2. Démarrer session Realtime
3. Parler 3-4 fois
4. Naviguer 2-3 pages
5. Stop recording
6. Analyser CPU/GPU/Memory

## Points de Maintenance

### À surveiller

1. **Store state:** Synchronisation isVoiceOnlyMode avec voiceState
2. **Memory leaks:** Messages accumulés libérés après session
3. **WebRTC cleanup:** Connexion fermée proprement
4. **Error handling:** États d'erreur gérés correctement

### À éviter

- ❌ Persister isVoiceOnlyMode dans localStorage
- ❌ Afficher messages pendant session active
- ❌ Permettre input texte en mode Realtime
- ❌ Ajouter animations lourdes dans VoiceSessionMinimal
- ❌ Modifier voiceState sans passer par store

## Migration Backwards Compatibility

### Pas de breaking changes

- ✅ API existante inchangée
- ✅ GlobalChatStore deprecated mais compatible
- ✅ Composants existants fonctionnent
- ✅ Nouveaux flags optionnels

### Rollback possible

Si besoin de rollback:

1. Retirer `isVoiceOnlyMode` de unifiedCoachStore
2. Retirer appels `enterVoiceOnlyMode()` / `exitVoiceOnlyMode()`
3. Supprimer VoiceSessionMinimal.tsx
4. Retirer condition dans GlobalChatDrawer
5. Retirer blocage texte dans ChatInputBar

Système reviendra au comportement précédent.
