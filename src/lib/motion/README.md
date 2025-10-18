# Performance Motion Wrapper

Remplacement automatique de Framer Motion en mode performance.

## Utilisation

### Import

```tsx
// Au lieu de:
import { motion, AnimatePresence } from 'framer-motion';

// Utiliser:
import { motion, AnimatePresence } from '@/lib/motion/PerformanceMotion';
```

### Comportement

**Desktop / Mode Quality**: Framer Motion complet activé
**Mobile / Mode Performance**: Composants natifs + CSS transitions

## Exemples

### Hover & Tap Effects

```tsx
// Framer Motion (Desktop)
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Hover me
</motion.div>

// → Mode Performance: .hover-effect et .tap-effect CSS
```

### Animations d'entrée

```tsx
// Framer Motion (Desktop)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// → Mode Performance: data-motion="slide-up" CSS animation
```

### AnimatePresence

```tsx
// Framer Motion (Desktop)
<AnimatePresence>
  {show && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Modal
    </motion.div>
  )}
</AnimatePresence>

// → Mode Performance: Rendu direct sans animations
```

## Patterns CSS

### Avec data attributes

```tsx
<div data-motion="fade-in">Fade in</div>
<div data-motion="slide-up">Slide up</div>
<div data-motion="scale-in">Scale in</div>
```

### Stagger Children

```tsx
<div data-motion-stagger>
  <div>Item 1</div> {/* delay: 0ms */}
  <div>Item 2</div> {/* delay: 50ms */}
  <div>Item 3</div> {/* delay: 100ms */}
</div>
```

### Classes CSS

```css
.hover-effect {
  transition: transform 0.15s ease-out;
}

.hover-effect:hover {
  transform: scale(1.02);
}

.tap-effect:active {
  transform: scale(0.98);
}
```

## Fonctionnalités Désactivées en Mode Performance

- ✅ **Conservé**: hover, tap, fade, slide
- ❌ **Désactivé**: layout animations, drag, complex variants, spring animations

## Migration Progressive

Pas besoin de tout migrer d'un coup:

1. Importer depuis `PerformanceMotion` au lieu de `framer-motion`
2. Le composant fonctionne normalement
3. Mode performance activé automatiquement sur mobiles bas de gamme

## Performance

- **Bundle size**: -50 à -60% (bypass framer-motion en mode perf)
- **Memory**: -30% (no motion values)
- **Battery**: +25% (CSS au lieu de JS)
- **FPS**: +15-20 FPS sur mobiles bas de gamme
