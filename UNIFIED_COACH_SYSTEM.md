# Système Coach Unifié - Refonte Complète

## Vue d'ensemble

Le système de coach a été complètement refactorisé pour unifier les fonctionnalités de chat texte et vocal dans une seule interface cohérente et intuitive.

## Nouveaux Composants

### 1. `UnifiedCoachStore` (`src/system/store/unifiedCoachStore.ts`)
Store Zustand unifié qui remplace et fusionne:
- `globalChatStore` (mode chat texte)
- `voiceCoachStore` (mode vocal)

**Fonctionnalités:**
- Gestion unifiée des messages
- Basculement entre modes texte/vocal
- Persistance de l'historique de conversation
- Synchronisation avec les modes contextuels (training, nutrition, fasting, etc.)
- Gestion des notifications et messages non lus
- Conservation du dernier mode utilisé

### 2. `UnifiedCoachDrawer` (`src/ui/components/chat/UnifiedCoachDrawer.tsx`)
Drawer unifié qui remplace:
- `GlobalChatDrawer`
- `VoiceCoachPanel`

**Caractéristiques:**
- Interface unique avec toggle mode texte/vocal visible dans le header
- Affichage contextuel selon le mode actif:
  - **Mode Texte:** Messages + champ de saisie
  - **Mode Vocal:** Visualisation audio + transcription optionnelle
- Détection automatique de l'environnement (StackBlitz)
- Avertissement si mode vocal indisponible
- Champ de saisie toujours visible en mode texte
- Pas de bouton minimize/maximize inutile
- Conservation de l'historique lors du changement de mode

### 3. `UnifiedFloatingButton` (`src/ui/components/chat/UnifiedFloatingButton.tsx`)
Bouton flottant unique qui remplace:
- `FloatingChatButton`
- `FloatingVoiceCoachButton`

**Fonctionnalités:**
- Icône dynamique selon le mode actif (MessageSquare pour texte, Mic pour vocal)
- Badge de mode en bas à droite pour indiquer le mode actif
- Badge de notifications non lues
- Gestion des notifications Step 2 (pipeline training)
- Animation différenciée selon le mode
- Tooltip contextuel

## Architecture

```
UnifiedCoachStore
├── Communication Mode (text | voice)
├── Chat Mode (training | nutrition | fasting | general | body-scan)
├── Messages (historique unifié)
├── Voice State (idle | listening | speaking | etc.)
└── UI State (notifications, typing, etc.)

UnifiedCoachDrawer
├── Header
│   ├── Icône du mode actif
│   ├── Toggle texte/vocal
│   ├── Toggle transcription (vocal uniquement)
│   └── Bouton fermer
├── Content
│   ├── Mode Texte
│   │   ├── CoachChatInterface (historique + input)
│   │   └── Champ de saisie fixe
│   └── Mode Vocal
│       ├── AudioWaveform (visualisation)
│       ├── Transcription (optionnelle)
│       └── TextChatInput (si transcription activée)
└── Environment Warning (si StackBlitz)

UnifiedFloatingButton
├── Icône principale (selon mode)
├── Badge mode (texte/vocal)
├── Badge notifications
└── Badge Step 2 (si applicable)
```

## Flux de Données

### Mode Texte
1. Utilisateur ouvre le drawer
2. Mode texte actif par défaut (ou dernier utilisé)
3. Champ de saisie visible et accessible
4. Messages envoyés via `textChatService`
5. Réponses streamées en temps réel
6. Historique conservé dans le store

### Mode Vocal
1. Utilisateur bascule vers mode vocal via toggle
2. Vérification des capacités de l'environnement
3. Si disponible: connexion au service vocal
4. Si indisponible: message d'erreur + suggestion mode texte
5. Visualisation audio pendant l'écoute
6. Transcription optionnelle affichable
7. Historique conservé dans le store

### Changement de Mode
1. Utilisateur clique sur toggle texte/vocal
2. Store met à jour `communicationMode`
3. Interface se met à jour instantanément
4. Historique de messages conservé
5. Mode sauvegardé dans localStorage

## Détection d'Environnement

Le système détecte automatiquement:
- **StackBlitz/WebContainer:** Mode vocal désactivé, message informatif
- **Navigateur standard:** Tous les modes disponibles

## Gestion des Erreurs

- Erreurs de connexion vocale → Suggestion automatique mode texte
- Erreurs réseau → Message d'erreur clair
- Mode vocal indisponible → Banner d'avertissement + forçage mode texte

## Styles CSS

### `unified-coach-drawer.css`
- Styles pour le drawer principal
- Animations des messages
- Scrollbar custom
- Responsive mobile/desktop

### `unified-floating-button.css`
- Styles pour le bouton flottant
- Animations selon le mode
- Badges et notifications
- Responsive

## Migration depuis l'Ancien Système

### Fichiers Obsolètes (À NE PLUS UTILISER)
- `src/system/store/globalChatStore.ts` → Utiliser `unifiedCoachStore`
- `src/system/store/voiceCoachStore.ts` → Utiliser `unifiedCoachStore`
- `src/ui/components/chat/GlobalChatDrawer.tsx` → Utiliser `UnifiedCoachDrawer`
- `src/ui/components/chat/VoiceCoachPanel.tsx` → Utiliser `UnifiedCoachDrawer`
- `src/ui/components/chat/VoiceCoachPanel.backup.tsx` → À supprimer
- `src/ui/components/chat/FloatingChatButton.tsx` → Utiliser `UnifiedFloatingButton`
- `src/ui/components/chat/FloatingVoiceCoachButton.tsx` → Utiliser `UnifiedFloatingButton`

### Code à Migrer

**Avant:**
```typescript
import { useGlobalChatStore } from '../system/store/globalChatStore';
import { useVoiceCoachStore } from '../system/store/voiceCoachStore';
```

**Après:**
```typescript
import { useUnifiedCoachStore } from '../system/store/unifiedCoachStore';
```

**Avant:**
```tsx
<FloatingChatButton ref={chatButtonRef} />
<GlobalChatDrawer />
<FloatingVoiceCoachButton />
<VoiceCoachPanel />
```

**Après:**
```tsx
<UnifiedFloatingButton ref={chatButtonRef} />
<UnifiedCoachDrawer chatButtonRef={chatButtonRef} />
```

## Avantages de la Refonte

1. **Interface Unifiée:** Un seul système pour texte et vocal
2. **Expérience Cohérente:** Design uniforme, transitions fluides
3. **Toggle Visible:** Pas besoin de chercher comment changer de mode
4. **Champ de Saisie Toujours Visible:** En mode texte, l'input est clair et accessible
5. **Pas de Bouton Inutile:** Suppression du minimize/maximize
6. **Détection Intelligente:** Adaptation automatique à l'environnement
7. **Conservation de l'Historique:** Messages préservés lors du changement de mode
8. **Code Plus Simple:** Moins de duplication, maintenance facilitée
9. **Performance Optimisée:** Un seul store, moins de re-renders
10. **Responsive:** Adaptation mobile/desktop

## Points d'Attention

- Le mode vocal n'est **pas disponible sur StackBlitz/WebContainer**
- Le système force automatiquement le mode texte dans ces environnements
- L'historique est limité aux 50 derniers messages en localStorage
- Les conversations sont liées au mode contextuel (training, nutrition, etc.)

## Tests Recommandés

1. Ouvrir le drawer → Vérifier que le champ de saisie est visible
2. Basculer texte/vocal → Vérifier la transition
3. Envoyer un message texte → Vérifier la réponse
4. Changer de page → Vérifier le changement de mode contextuel
5. Fermer/réouvrir → Vérifier la conservation du mode
6. Mobile → Vérifier le responsive
7. StackBlitz → Vérifier le message d'avertissement

## Support

Pour toute question ou bug, consulter les logs avec le préfixe `UNIFIED_COACH`.
