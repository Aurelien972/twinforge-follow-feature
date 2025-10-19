# Guide de Test Rapide - Mode Audio Optimisé Mobile

## Prérequis

1. App démarrée: `npm run dev`
2. Microphone autorisé dans le navigateur
3. Connexion Supabase active
4. API OpenAI Realtime configurée

## Test 1: Session Vocale Complète

### Étapes

1. **Ouvrir le chat** (cliquer sur FloatingChatButton)
2. **Cliquer sur le bouton Realtime rouge** (en bas à droite de l'input)
3. **Vérifier l'interface minimale s'affiche:**
   - Fond noir opaque
   - Grand bouton micro central
   - État "Connexion..." puis "Je t'écoute"
   - FloatingChatButton devient rouge avec icône Radio

4. **Parler au coach:**
   - Dire: "Bonjour, peux-tu m'aider avec ma nutrition?"
   - Vérifier état change à "Traitement..."
   - Vérifier état change à "Coach parle..."
   - Écouter la réponse audio

5. **Vérifier input texte bloqué:**
   - Input affiche "Mode vocal actif - Texte désactivé"
   - Impossible de taper du texte

6. **Terminer la session:**
   - Cliquer "Terminer la session"
   - Chat drawer s'ouvre automatiquement
   - **VÉRIFIER:** Tous les messages échangés sont visibles dans l'historique
   - FloatingChatButton redevient normal (icône MessageSquare)

### Résultat attendu

✅ Interface minimale ultra-légère sans lag
✅ Messages accumulés invisibles pendant session
✅ Historique complet visible après arrêt
✅ Input texte bloqué pendant Realtime
✅ Performance fluide sur mobile

## Test 2: Navigation Pendant Session

### Étapes

1. **Démarrer une session Realtime** (voir Test 1, étapes 1-4)
2. **Cliquer sur "Minimiser"** (bouton en haut à droite)
3. **Vérifier:**
   - Interface minimale se ferme
   - FloatingChatButton reste rouge avec icône Radio
   - Session continue en arrière-plan

4. **Naviguer dans l'app:**
   - Aller sur page Profile
   - Aller sur page Training
   - Aller sur page Meals

5. **Parler pendant navigation:**
   - Dire: "Quel est mon objectif de calories?"
   - Vérifier réponse audio fonctionne
   - Pas de problème de performance

6. **Cliquer sur FloatingChatButton rouge:**
   - Interface minimale se rouvre
   - État correct affiché (listening/speaking)

7. **Terminer session et vérifier historique**

### Résultat attendu

✅ Session continue pendant navigation
✅ Performance stable sur toutes les pages
✅ Audio fonctionne même app en arrière-plan
✅ Possible de rouvrir interface minimale à tout moment

## Test 3: Consultation Historique Pendant Session

### Étapes

1. **Démarrer session Realtime**
2. **Parler plusieurs fois avec le coach** (3-4 échanges)
3. **Cliquer sur FloatingChatButton rouge** (sans terminer session)
4. **Vérifier:**
   - Chat drawer s'ouvre
   - Tous les messages sont visibles
   - Session Realtime toujours active
   - Input texte toujours bloqué

5. **Cliquer à nouveau sur bouton Realtime rouge:**
   - Interface minimale se rouvre
   - Session continue là où elle était
   - État correct affiché

6. **Parler à nouveau:**
   - Vérifier échange fonctionne
   - Nouveaux messages accumulés

7. **Terminer session et vérifier historique complet**

### Résultat attendu

✅ Historique consultable pendant session active
✅ Session pas interrompue par consultation
✅ Possible de reprendre session vocale facilement
✅ Input texte reste bloqué pendant Realtime

## Test 4: Performance GPU/CPU

### Outils

Chrome DevTools > Performance

### Étapes

1. **Ouvrir Performance tab**
2. **Démarrer recording**
3. **Lancer session Realtime**
4. **Parler 3-4 fois avec le coach**
5. **Naviguer entre 2-3 pages**
6. **Arrêter recording**

### Métriques à vérifier

✅ CPU < 30% pendant session (mobile)
✅ GPU < 20% (pas d'animations lourdes)
✅ Memory stable (pas de fuites)
✅ FPS stable ~60 pendant navigation
✅ Pas de janks ou freezes

## Test 5: Gestion d'Erreurs

### Test erreur réseau

1. **Démarrer session Realtime**
2. **Couper wifi/réseau**
3. **Vérifier:**
   - État passe à "error"
   - Message d'erreur affiché
   - Bouton "Terminer session" reste accessible

4. **Terminer session:**
   - Chat drawer s'ouvre
   - Messages échangés avant erreur visibles
   - Possible de relancer session après reconnexion

### Test erreur microphone

1. **Révoquer permission micro dans navigateur**
2. **Tenter démarrer session Realtime**
3. **Vérifier:**
   - Erreur "Microphone permission required"
   - Interface minimale pas affichée
   - Chat drawer reste accessible

### Résultat attendu

✅ Erreurs gérées proprement
✅ Messages préservés en cas d'erreur
✅ Interface reste utilisable
✅ Possible de relancer après erreur

## Checklist Finale

Avant de considérer le système prêt:

- [ ] Test 1 réussi (session complète)
- [ ] Test 2 réussi (navigation)
- [ ] Test 3 réussi (consultation historique)
- [ ] Test 4 réussi (performance < 30% CPU mobile)
- [ ] Test 5 réussi (erreurs gérées)
- [ ] Input texte bloqué pendant Realtime
- [ ] Messages jamais affichés pendant session
- [ ] Historique complet après session
- [ ] FloatingChatButton rouge pendant session
- [ ] Performance fluide sur mobile réel

## Debug

### Console logs à surveiller

```
VOICE_ORCHESTRATOR: Starting voice session
VOICE_ORCHESTRATOR: Entering voice-only mode for minimal UI
UNIFIED_COACH: Entered voice-only mode
VOICE_ORCHESTRATOR: Voice session started successfully - STATE = LISTENING
```

### Store state à vérifier

Chrome DevTools > Redux DevTools (ou console):

```javascript
// Pendant session Realtime
useUnifiedCoachStore.getState().isVoiceOnlyMode // true
useUnifiedCoachStore.getState().voiceState // 'listening' | 'speaking'
useUnifiedCoachStore.getState().isPanelOpen // false (minimisé)

// Après terminer session
useUnifiedCoachStore.getState().isVoiceOnlyMode // false
useUnifiedCoachStore.getState().isPanelOpen // true
useUnifiedCoachStore.getState().messages.length // > 0
```

## Problèmes Connus & Solutions

### "Mode vocal actif mais pas de son"

- Vérifier permission micro
- Vérifier connexion WebRTC établie
- Check console pour erreurs API

### "Messages pas visibles après session"

- Vérifier `exitVoiceOnlyMode()` appelé
- Vérifier `isPanelOpen` true après stop
- Check store messages non vide

### "Performance pas fluide sur mobile"

- Désactiver animations dans DevTools
- Vérifier pas de backdrop-filter actif
- Check GPU layers dans Performance tab

### "FloatingChatButton pas rouge"

- Vérifier `isVoiceOnlyMode` true dans store
- Check condition render dans FloatingChatButton
- Vérifier `voiceState` !== 'idle'
