# Voice-to-Text et Optimisations Realtime - Résumé d'implémentation

## Modifications apportées

### 1. Icône Waves dans le bouton Realtime

**Fichier**: `src/ui/components/coach/ChatInputBar.tsx`

- Remplacé le point rouge par une icône `Waves` de Lucide
- L'icône change de style selon l'état (actif/inactif)
- Utilise des filtres drop-shadow pour un effet visuel premium
- L'icône représente clairement la fonctionnalité de voice realtime

**Fichier**: `src/ui/icons/registry.ts`

- Ajouté `Waves`, `Radio`, et `PhoneCall` au registre d'icônes

### 2. Service de transcription Whisper

**Nouveau fichier**: `src/system/services/openaiWhisperService.ts`

Fonctionnalités:
- Gestion de l'enregistrement audio via MediaRecorder API
- Support multi-format (webm, ogg, mp4, mpeg)
- Configuration audio optimisée pour Whisper (16kHz, mono)
- Validation de la taille des fichiers (1KB min, 25MB max)
- Envoi vers l'Edge Function Supabase
- Gestion complète des erreurs
- Nettoyage automatique des ressources

Méthodes publiques:
- `startRecording()`: Démarre l'enregistrement
- `stopRecording()`: Arrête et retourne le blob audio
- `transcribe(audioBlob)`: Envoie l'audio pour transcription
- `cancelRecording()`: Annule l'enregistrement en cours
- `recording`: Propriété getter pour l'état

### 3. Edge Function Supabase

**Nouveau fichier**: `supabase/functions/audio-transcribe/index.ts`

Fonctionnalités:
- Endpoint POST pour recevoir les fichiers audio
- Gestion CORS complète
- Validation de la taille des fichiers
- Appel à l'API OpenAI Whisper
- Configuration: modèle whisper-1, langue française
- Format de réponse JSON
- Gestion exhaustive des erreurs

Variables d'environnement requises:
- `OPENAI_API_KEY`: Clé API OpenAI (déjà configurée automatiquement)

### 4. Intégration ChatInputBar

**Fichier**: `src/ui/components/coach/ChatInputBar.tsx`

Modifications:
- Import du service `openaiWhisperService`
- Ajout de l'état `isTranscribing` pour l'UI
- Ajout de l'état `transcriptionError` pour les erreurs
- Handler `handleVoiceToggle` modifié pour:
  - Démarrer l'enregistrement au premier clic
  - Arrêter, transcrire, et envoyer automatiquement au deuxième clic
- Affichage des erreurs de transcription
- Indicateur de transcription en cours
- Placeholder dynamique selon l'état
- Désactivation de l'input pendant la transcription

### 5. CoachChatInterface

**Fichier**: `src/ui/components/coach/CoachChatInterface.tsx`

- Mise à jour des commentaires pour indiquer que le voice-to-text est géré par ChatInputBar
- Les handlers sont conservés pour la compatibilité

### 6. Optimisations mode performance

**Fichier**: `src/styles/optimizations/performance-mode.css`

Modifications sur `.floating-chat-button`:
- Suppression de tous les glows cyan/turquoise colorés
- Remplacement par des ombres noires simples: `0 2px 8px rgba(0, 0, 0, 0.25)`
- Hover: `0 4px 12px rgba(0, 0, 0, 0.3)`
- Désactivation de tous les pseudo-éléments décoratifs (::before, ::after)
- Suppression des animations et effets de pulsation
- Override des inline styles qui pourraient ajouter des colored shadows
- Suppression des filtres blur sur les enfants

Le bouton reste parfaitement fonctionnel et visible, mais sans les effets coûteux en performance.

## Flux utilisateur - Voice-to-Text

1. **Clic 1 sur le bouton Mic**:
   - Démarre l'enregistrement audio
   - Icône change en MicOff rouge
   - Animations de pulsation apparaissent
   - Placeholder: "Enregistrement en cours..."

2. **Clic 2 sur le bouton Mic**:
   - Arrête l'enregistrement
   - Affiche "Transcription en cours..." avec spinner
   - Envoie l'audio à l'Edge Function
   - Reçoit le texte transcrit
   - Envoie automatiquement le message au coach
   - Feedback haptique de confirmation

3. **En cas d'erreur**:
   - Banner d'erreur affiché en haut
   - Message explicite (microphone, transcription, taille fichier)
   - Nettoyage automatique des ressources

## Flux utilisateur - Realtime

Le bouton Realtime (cercle rouge) reste distinct:
- Affiche maintenant l'icône Waves
- Active/désactive la session voice realtime
- États visuels distincts (connecting, listening, speaking)
- Pas de confusion avec le voice-to-text

## Tests recommandés

### Voice-to-Text
1. Tester l'enregistrement audio sur différents navigateurs
2. Vérifier la transcription en français
3. Tester avec des enregistrements courts (<2s)
4. Tester avec des enregistrements longs (>30s)
5. Vérifier la gestion des erreurs microphone
6. Tester l'envoi automatique du message

### Realtime
1. Vérifier que l'icône Waves est visible
2. Tester les différents états (idle, connecting, listening, speaking)
3. Vérifier que les deux fonctionnalités vocales coexistent

### Mode Performance
1. Activer le mode performance
2. Vérifier que le bouton flottant n'a plus de glows cyan
3. Vérifier que l'ombre reste visible (noire)
4. Tester le hover (ombre plus forte)
5. Vérifier que le bouton reste cliquable

## Configuration requise

### Variables d'environnement
- `VITE_SUPABASE_URL`: URL Supabase (✓ déjà configuré)
- `VITE_SUPABASE_ANON_KEY`: Clé anonyme Supabase (✓ déjà configuré)
- `OPENAI_API_KEY`: Clé API OpenAI dans Supabase (✓ déjà configuré)

### Déploiement Edge Function

Pour déployer la fonction `audio-transcribe`:

```bash
supabase functions deploy audio-transcribe
```

La fonction sera disponible à:
`https://[votre-projet].supabase.co/functions/v1/audio-transcribe`

## Coûts estimés

### OpenAI Whisper API
- $0.006 / minute d'audio
- Exemple: 10 enregistrements de 30s = 5 minutes = $0.03

### Optimisations
- Audio encodé en 16kHz mono = réduction ~50% de la taille
- Format WebM Opus = compression optimale
- Limites: min 1KB, max 25MB

## Sécurité

1. **Validation côté serveur**:
   - Taille des fichiers vérifiée
   - Type MIME validé
   - Clé API OpenAI sécurisée côté serveur

2. **Permissions navigateur**:
   - Demande explicite d'accès microphone
   - Gestion du refus utilisateur
   - Nettoyage automatique du stream

3. **CORS**:
   - Headers configurés pour tous les domaines
   - Support des méthodes POST et OPTIONS

## Améliorations futures possibles

1. **Qualité**:
   - Ajout du paramètre `prompt` pour améliorer la transcription
   - Support multi-langue automatique
   - Détection de la langue automatique

2. **UX**:
   - Visualisation du niveau audio pendant l'enregistrement
   - Option d'édition du texte transcrit avant envoi
   - Historique des transcriptions

3. **Performance**:
   - Compression audio supplémentaire
   - Transcription en streaming (si disponible)
   - Cache des transcriptions fréquentes

4. **Accessibilité**:
   - Raccourcis clavier pour démarrer/arrêter
   - Mode "push-to-talk"
   - Feedback visuel pour utilisateurs malentendants
