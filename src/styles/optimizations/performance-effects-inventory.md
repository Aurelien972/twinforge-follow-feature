# Inventaire des Effets Coûteux - Performance Optimization

## Statistiques Générales

- **Backdrop-filter**: ~500 occurrences dans 61 fichiers CSS
- **Animations @keyframes**: ~648 occurrences dans 69 fichiers CSS
- **Gradients complexes**: ~644 occurrences dans 77 fichiers CSS
- **Box-shadows multiples**: ~574 occurrences dans 80 fichiers CSS
- **Framer Motion**: ~313 fichiers React (composants)

---

## 1. Backdrop-Filter - Mapping Desktop/Mobile

### Fichiers Critiques
- `glassV2/cards.css` - Glass cards principales
- `glassV2/liquid-glass-premium.css` - Effets premium
- `pipeline/forge-*.css` - Pipelines de forge
- `components/header/sidebar` - Navigation

### Remplacement Mobile
```css
/* Desktop (Quality Mode) */
backdrop-filter: blur(var(--glass-blur-base)) saturate(var(--glass-saturate-base));

/* Mobile (High-Performance Mode) */
background: rgba(15, 25, 39, 0.95); /* Opaque #0F1927 avec légère transparence */
backdrop-filter: none;
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

## 2. Gradients Complexes - Simplification

### Types de Gradients Identifiés

#### A. Linear Gradient Multi-Stops (> 3 couleurs)
**Desktop**: `linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)`
**Mobile**: `background: #F7931E;` (couleur centrale)

#### B. Radial Gradient Complexes
**Desktop**: `radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)`
**Mobile**: `background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255,255,255,0.06);`

#### C. Gradient Borders Animés
**Desktop**: Gradient animé avec @keyframes
**Mobile**: `border: 1px solid var(--primary-color);`

---

## 3. Box-Shadow - Simplification

### Patterns Identifiés

#### Ombres Multiples (3+ layers)
```css
/* Desktop */
box-shadow:
  0 2px 8px rgba(0, 0, 0, 0.3),
  0 8px 24px rgba(0, 0, 0, 0.2),
  inset 0 1px 0 rgba(255, 255, 255, 0.1),
  0 0 40px rgba(0, 200, 255, 0.2); /* glow */

/* Mobile */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
```

#### Ombres Colorées (Glows)
**Desktop**: `box-shadow: 0 0 40px rgba(253, 200, 48, 0.4);`
**Mobile**: `border: 1px solid rgba(253, 200, 48, 0.3);`

---

## 4. Animations @keyframes - Catégorisation

### Animations ESSENTIELLES (à conserver en mobile)
1. `icon-spin-css` - Loaders/spinners
2. `slide-in` - Entrées de modals
3. `fade-in` - Transitions de base

### Animations DÉCORATIVES (à supprimer en mobile)
1. `breathing` - Pulsations d'icônes
2. `pulse` - Effets de pulsation
3. `shimmer` - Effets de brillance
4. `glow` - Halos lumineux
5. `float` - Flottements
6. `skeleton-glow` - Squelettes animés (remplacer par pulse simple)

---

## 5. Framer Motion - Composants à Wrapper

### Catégories d'Utilisation

#### Navigation/Header (68 composants)
- `HeaderLogo.tsx`
- `Sidebar.tsx`
- `NewMobileBottomBar.tsx`
- Actions: Conserver animations légères desktop, simplifier mobile

#### Cards & Lists (142 composants)
- Tous les `*Card.tsx`
- Tous les `*Skeleton.tsx`
- Actions: Wrapper conditionnel `motion.div` → `div`

#### Modals & Drawers (45 composants)
- `*Modal.tsx`
- `*Drawer.tsx`
- Actions: Simplifier AnimatePresence → CSS transitions

#### Forms & Inputs (58 composants)
- Actions: Remplacer whileHover/whileTap par CSS :hover/:active

---

## 6. Logo FØRGE - Optimisation

### Problème Actuel
```tsx
background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)',
WebkitBackgroundClip: 'text',
filter: 'drop-shadow(0 0 12px rgba(253, 200, 48, 0.5))'
```

### Solution Performance (Mobile)
```tsx
// Lettres individuelles avec couleurs distinctes
F: #FF6B35 (rouge-orange)
Ø: #F89442 (orange moyen)
R: #F7931E (orange vif)
G: #FCBB45 (jaune-orange)
E: #FDC830 (jaune doré)

// Drop-shadow simplifié
filter: 'drop-shadow(0 0 4px rgba(247, 147, 30, 0.3))'
```

---

## 7. Squelettes Glass - Correction

### Problème Identifié
Avec `backdrop-filter: none`, le background opaque `#0F1927` rend visible le conteneur des squelettes.

### Solution
```css
.performance-mode .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.03) 100%
  );
  animation: shimmer 2s ease-in-out infinite;
}

.performance-mode .glass-card.skeleton-container {
  background: rgba(15, 25, 39, 0.5) !important; /* Semi-transparent */
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

---

## 8. Position Fixed - Hiérarchie Z-Index

### Système Proposé
```css
/* Z-Index System */
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
--z-notification: 1080;
--z-header: 1090;
--z-bottom-bar: 1090;
--z-debug: 9999;
```

### Éléments Fixed Critiques
1. Header - `z-index: var(--z-header)`
2. Bottom Bar - `z-index: var(--z-bottom-bar)`
3. Floating Chat Button - `z-index: var(--z-fixed)`
4. Voice Coach Panel - `z-index: var(--z-modal)`

---

## 9. Plan d'Implémentation Étape par Étape

### Phase 1: Infrastructure (Étapes 1-2)
- ✅ Inventaire complet
- Créer fichiers architecture

### Phase 2: Backdrop-Filter (Étape 3)
- Remplacer 500 occurrences
- Tester squelettes

### Phase 3: Logo (Étape 4)
- Optimiser FØRGE

### Phase 4: Gradients & Shadows (Étapes 5-6)
- 644 gradients
- 574 box-shadows

### Phase 5: Animations (Étapes 7-8)
- 648 @keyframes
- 313 Framer Motion

### Phase 6: Tests & Validation (Étape 9)
- Header/Bottom Bar position
- 60 FPS scroll
- Screenshots avant/après
