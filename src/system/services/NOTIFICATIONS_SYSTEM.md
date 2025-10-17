# Système Unifié de Notifications

## Vue d'ensemble

Le système unifié de notifications gère de manière cohérente et hiérarchique toutes les notifications du bouton de chat flottant. Il remplace l'ancien système dual qui créait des conflits entre les badges de compteur et les bulles de notification contextuelles.

## Architecture

### Hiérarchie des notifications

Le système respecte une hiérarchie stricte de priorité:

1. **Step 2 Alerts** (Priorité 10): Notifications critiques pour ajuster les séances
2. **Notifications contextuelles** (Priorité 2-3): Messages d'accueil basés sur le contexte
3. **Badges de messages non lus** (Priorité 1): Compteur simple de messages non lus

**Règle importante**: Une seule notification visuelle est affichée à la fois. Les notifications de priorité supérieure masquent les notifications de priorité inférieure.

### Composants

#### `unifiedNotificationService.ts`

Service principal qui gère:
- File d'attente des notifications avec tri par priorité
- Persistance dans localStorage avec cooldown et compteur de vues
- Planification et temporisation des notifications
- Nettoyage automatique pour éviter les conditions de course

#### `useNotifications.ts`

Hook React qui fournit:
- Détection automatique du contexte (route) pour afficher la bonne notification
- Méthodes pour planifier, masquer et réinitialiser les notifications
- Nettoyage automatique lors du démontage du composant

#### `FloatingChatButton.tsx`

Bouton flottant simplifié avec:
- Logique claire de badge: messages non lus OU notification Step2 (jamais les deux)
- Intégration propre avec le service unifié
- Animations et styles conditionnels basés sur le type de notification

#### `ChatNotificationBubble.tsx`

Bulle de notification avec:
- Positionnement intelligent (desktop vs mobile)
- Gestion des clics (fermeture ou ouverture du chat)
- Intégration avec le service unifié pour le cycle de vie

## Configuration des notifications

Chaque notification est configurée dans `NOTIFICATION_CONFIGS`:

```typescript
{
  type: 'contextual' | 'unread-badge' | 'step2-alert',
  message: string,              // Message affiché
  mode: ChatMode,               // Mode du chat associé
  priority: number,             // Priorité (plus élevé = plus important)
  addToHistory: boolean,        // Ajouter au chat ou non
  autoHideDelay?: number        // Délai avant masquage auto (ms)
}
```

### Types de notifications existants

| ID | Type | Priorité | Message | Ajouté au chat |
|---|---|---|---|---|
| `step2-adjust` | step2-alert | 10 | Ton coach t'attend pour ajuster ta séance ! | Non |
| `training-intro` | contextual | 3 | Prêt pour ta séance ? Clique pour commencer ! | Non |
| `nutrition-intro` | contextual | 3 | Un conseil nutrition ? Je suis disponible ! | Non |
| `fasting-intro` | contextual | 3 | Ton coach jeûne est là pour t'accompagner ! | Non |
| `step1-welcome` | contextual | 2 | Salut ! Je suis là si tu as besoin 👋 | Non |

## Système de persistance

### Stockage localStorage

Chaque notification vue est enregistrée avec:
- `viewCount`: Nombre de fois vue (max: 3)
- `firstSeenAt`: Date de première vue
- `lastSeenAt`: Date de dernière vue
- `cooldownUntil`: Date jusqu'à laquelle la notification ne sera pas réaffichée

### Règles de cooldown

- **Durée**: 30 minutes après chaque vue
- **Maximum de vues**: 3 fois par notification
- **Reset**: Possible manuellement via `resetNotification()`

## Utilisation

### Dans un composant

```typescript
import { useNotifications } from '../hooks/useNotifications';

function MyComponent() {
  const { scheduleNotification, hideNotification } = useNotifications();

  // Planifier une notification
  scheduleNotification('training-intro');

  // Masquer la notification active
  hideNotification();
}
```

### Planification directe

```typescript
import { unifiedNotificationService } from '../system/services/notifications';

// Planifier immédiatement
unifiedNotificationService.scheduleNotification('step2-adjust', true);

// Mettre en file d'attente
unifiedNotificationService.queueNotification('nutrition-intro');

// Annuler la planification
unifiedNotificationService.cancelScheduled();
```

## Comportements

### Affichage automatique

Les notifications sont automatiquement planifiées en fonction de la route:
- `/pipeline/step-2` → `step2-adjust`
- `/training` → `training-intro`
- `/meals` ou `/fridge` → `nutrition-intro`
- `/fasting` → `fasting-intro`
- Autres routes → `step1-welcome`

### Conditions de non-affichage

Une notification ne s'affiche PAS si:
1. Le chat est ouvert
2. Une notification du même type est déjà active
3. La notification est en période de cooldown
4. Le maximum de vues (3) est atteint

### File d'attente

Si une notification est demandée alors qu'une autre est active:
1. Elle est ajoutée à la file avec tri par priorité
2. Elle s'affiche automatiquement quand la notification active se termine
3. Les doublons dans la file sont évités

## Migration depuis l'ancien système

### Ancien système (deprecated)

```typescript
// ❌ Ne plus utiliser
import { chatNotificationService } from '../services/chatNotificationService';
chatNotificationService.scheduleNotification('training', 'step1');
```

### Nouveau système

```typescript
// ✅ Utiliser maintenant
import { unifiedNotificationService } from '../services/notifications';
unifiedNotificationService.scheduleNotification('training-intro');
```

## Tests recommandés

1. **Test de priorité**: Vérifier que Step2 masque les autres notifications
2. **Test de cooldown**: Vérifier qu'après 3 vues, la notification ne s'affiche plus
3. **Test de changement de route**: Naviguer rapidement entre pages
4. **Test de file d'attente**: Déclencher plusieurs notifications rapidement
5. **Test de persistance**: Rafraîchir la page et vérifier le compteur

## Maintenance

### Ajouter une nouvelle notification

1. Ajouter l'ID dans le type `NotificationId`
2. Configurer dans `NOTIFICATION_CONFIGS`
3. Utiliser via `scheduleNotification(newId)`

### Modifier les délais

Modifier dans `unifiedNotificationService.ts`:
- `NOTIFICATION_DELAYS.appearance`: Délai avant apparition (2000ms)
- `NOTIFICATION_DELAYS.step2Appearance`: Délai Step2 (1000ms)
- `COOLDOWN_MINUTES`: Durée du cooldown (30min)
- `MAX_VIEW_COUNT`: Nombre max de vues (3)

### Debugging

Activer les logs dans la console:
```typescript
// Les logs sont automatiques via logger.ts
// Rechercher: UNIFIED_NOTIFICATION
```

## Problèmes résolus

- ✅ Double système de notifications concurrent
- ✅ Affichage simultané de badge et bulle
- ✅ Conflits entre notifications Step2 et régulières
- ✅ Persistance incohérente entre mémoire et localStorage
- ✅ Conditions de course sur changements de route rapides
- ✅ Pollution de l'historique du chat avec messages génériques
