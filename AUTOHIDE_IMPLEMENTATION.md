# Auto-Hide Implementation - Header, Bottom Bar & Chat Button

## Vue d'ensemble

Implémentation d'un système d'auto-hide pour le header, la bottom bar et le bouton chat sur desktop. Ces éléments se cachent automatiquement lors du scroll vers le bas et réapparaissent lors du scroll vers le haut.

## Composants Modifiés

### 1. Hook `useScrollDirection`

**Fichier**: `src/hooks/useScrollDirection.ts`

Hook personnalisé qui détecte la direction du scroll avec les features suivantes :
- Détection de direction (up/down/static)
- Threshold configurable (par défaut 10px)
- Debounce optionnel pour éviter les changements trop fréquents
- Optimisé avec `requestAnimationFrame` pour les performances
- Event listener passif pour ne pas bloquer le scroll

**API**:
```typescript
const {
  scrollDirection,    // 'up' | 'down' | 'static'
  isScrolled,        // boolean - true si scrollY > threshold
  isScrollingDown,   // boolean - shortcut
  isScrollingUp,     // boolean - shortcut
  isStatic,          // boolean - shortcut
} = useScrollDirection({ threshold: 10, debounce: 0 });
```

### 2. Header (`Header.tsx`)

**Modifications**:
- Import du hook `useScrollDirection`
- Calcul de `shouldHideHeader = !isMobile && isScrollingDown`
- Style `top` dynamique : `-80px` (caché) ou `8px` (visible)
- Transition CSS smooth : `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

**Comportement**:
- Desktop uniquement (`!isMobile`)
- Se cache en scrollant vers le bas
- Réapparaît immédiatement en scrollant vers le haut
- Reste visible sur mobile

### 3. Bottom Bar (`NewMobileBottomBar.tsx`)

**Modifications**:
- Import du hook `useScrollDirection` et `useIsMobile`
- Calcul de `shouldHideBottomBar = !isMobile && isScrollingDown`
- Style `bottom` dynamique : `-100px` (caché) ou `safe-area-inset` (visible)
- Transition CSS smooth : `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

**Comportement**:
- Desktop uniquement
- Se cache en scrollant vers le bas
- Réapparaît en scrollant vers le haut
- Toujours visible sur mobile

### 4. Bouton Chat Flottant (`UnifiedFloatingButton.tsx`)

**Modifications**:
- Import du hook `useScrollDirection`
- Calcul de `shouldHideButton = !isMobile && isScrollingDown`
- Style `right` dynamique : `-100px` (caché) ou position normale (visible)
- Transition CSS smooth : `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

**Comportement**:
- Desktop uniquement
- Se synchronise avec le header et bottom bar
- Reste caché si le panel est ouvert

## Configuration

### Threshold de Détection

Le threshold par défaut est de **10px** pour tous les composants. Cela signifie :
- Le scroll doit dépasser 10px avant de déclencher un changement de direction
- Évite les faux positifs lors de petits mouvements

### Animation

Tous les composants utilisent la même courbe de Bézier pour une expérience cohérente :
```css
transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

Cette courbe offre :
- Démarrage rapide
- Ralentissement en fin d'animation
- Animation naturelle et fluide

## Comportement Mobile

Sur mobile (`isMobile === true`), tous les éléments restent **toujours visibles** :
- Header fixe en haut
- Bottom bar fixe en bas
- Chat button visible

Raison : Sur mobile, l'espace d'écran est précieux et les utilisateurs sont habitués aux éléments fixes.

## Performance

### Optimisations Appliquées

1. **requestAnimationFrame** : Le hook utilise `requestAnimationFrame` pour limiter les calculs
2. **Throttling** : Un flag `ticking` empêche les calculs multiples par frame
3. **Event Passif** : L'event listener scroll est passif (`{ passive: true }`)
4. **GPU Acceleration** : `transform: translate3d(0, 0, 0)` force l'accélération matérielle
5. **will-change** : Hint au navigateur pour optimiser les animations

### Impact

- CPU : Minimal (calculs throttlés)
- GPU : Optimisé (layer dédié)
- Scroll : Aucun impact (event passif)

## Tests

### Desktop
1. Ouvrir l'application sur desktop (>1024px)
2. Scroller vers le bas → Header, Bottom Bar et Chat se cachent
3. Scroller vers le haut → Éléments réapparaissent
4. Scroller en haut de page → Éléments visibles (static)

### Mobile
1. Ouvrir sur mobile (<1024px)
2. Scroller → Tous les éléments restent visibles

### Edge Cases
- Scroll très rapide → Détection correcte
- Petits mouvements → Ignorés (threshold)
- Top de page → État static
- Panel chat ouvert → Chat button caché

## Accessibilité

- Les éléments cachés sont toujours dans le DOM
- `aria-label` conservés sur tous les boutons
- Navigation clavier fonctionnelle
- Focus visible maintenu

## Extension Future

Pour personnaliser le comportement, modifier les options dans chaque composant :

```typescript
const { isScrollingDown } = useScrollDirection({
  threshold: 20,  // Plus grand = moins sensible
  debounce: 100   // Délai avant changement (ms)
});
```

## Compatibilité

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+

Toutes les propriétés utilisées sont largement supportées.
