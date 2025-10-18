# Phase 2 - Optimisation Performance Mode
## Shopping List, Recipe System & Meal Plan
## Date: 2025-10-18
## Status: 🎯 READY TO START

---

## 🎯 Objectif Phase 2

Optimiser les 8 composants restants qui utilisent des effets GPU intensifs sans être liés au performance mode.

**Impact attendu:** +30% amélioration GPU supplémentaire

---

## 📋 Composants à Optimiser (8 fichiers)

### Groupe 1: Shopping List Components (3 fichiers)

#### 1.1 ShoppingListHeader.tsx
**Fichier:** `src/app/pages/Fridge/tabs/ShoppingListTab/components/ShoppingListHeader.tsx`

**Problèmes détectés:**
- ❌ Pas de `usePerformanceMode()` hook
- ❌ Animations non conditionnelles
- ❌ Radial gradients lourds

**Actions requises:**
```tsx
// 1. Import
import { usePerformanceMode } from '../../../../../../system/context/PerformanceModeContext';

// 2. Hook
const { isPerformanceMode } = usePerformanceMode();
const MotionDiv = isPerformanceMode ? 'div' : motion.div;

// 3. Wrapper animations
<MotionDiv {...(!isPerformanceMode && { animate: {...} })}>

// 4. Simplifier gradients
style={isPerformanceMode ? {
  background: 'linear-gradient(145deg, #1e293b, #0f172a)'
} : {
  background: 'radial-gradient(...)'
}}
```

---

#### 1.2 ShoppingListGeneratorCard.tsx
**Fichier:** `src/app/pages/Fridge/tabs/ShoppingListTab/ShoppingListGeneratorCard.tsx`

**Problèmes:** 3 occurrences `motion.` non conditionnelles

**Actions:** Même pattern que 1.1

---

#### 1.3 ShoppingListMainLoader.tsx (Optionnel)
**Fichier:** `src/app/pages/Fridge/tabs/ShoppingListTab/components/ShoppingListMainLoader.tsx`

**Note:** Loader déjà avec animations - vérifier si critique

---

### Groupe 2: Recipe System Components (4 fichiers)

#### 2.1 RecipeFilterSystem.tsx
**Fichier:** `src/app/pages/Fridge/tabs/RecipesTab/components/RecipeFilterSystem.tsx`

**Problèmes:** 4 occurrences `motion.`

**Priorité:** HAUTE (utilisé constamment)

---

#### 2.2 RecipeValidationCTA.tsx
**Fichier:** `src/app/pages/Fridge/tabs/RecipesTab/components/RecipeValidationCTA.tsx`

**Problèmes:** 4 occurrences `motion.` + radial gradients

**Priorité:** HAUTE (CTA important)

---

#### 2.3 RecipeGenerationHeader.tsx
**Fichier:** `src/app/pages/Fridge/tabs/RecipesTab/components/RecipeGenerationHeader.tsx`

**Problèmes:** 6 occurrences `motion.` (le plus lourd)

**Priorité:** CRITIQUE

---

#### 2.4 RecipeActionButtons.tsx (Optionnel)
**Fichier:** `src/app/pages/Fridge/tabs/RecipesTab/components/RecipeActionButtons.tsx`

**Note:** Vérifier impact réel

---

### Groupe 3: Meal Plan Components (2 fichiers)

#### 3.1 MealPlanReviewAndGenerateCTA.tsx
**Fichier:** `src/app/pages/Fridge/tabs/PlanTab/components/MealPlanReviewAndGenerateCTA.tsx`

**Problèmes:** 2 occurrences `motion.` + gradients

**Priorité:** HAUTE

---

#### 3.2 PlanGenerationProgress.tsx
**Fichier:** `src/app/pages/Fridge/tabs/PlanTab/components/PlanGenerationProgress.tsx`

**Problèmes:** Animations progress + backdrop-filter

**Priorité:** MOYENNE

---

## 🔄 Workflow d'Optimisation

### Pour Chaque Composant

**Étape 1: Audit (2 min)**
```bash
# Vérifier imports
grep "usePerformanceMode" <file>

# Compter animations
grep "motion\." <file> | wc -l

# Trouver gradients
grep "radial-gradient" <file>
grep "backdrop-filter" <file>
```

**Étape 2: Optimisation (5-10 min)**
1. Ajouter import `usePerformanceMode`
2. Créer hook + MotionDiv wrapper
3. Wrapper toutes animations avec conditions
4. Simplifier gradients en performance mode
5. Désactiver backdrop-filter

**Étape 3: Validation (2 min)**
1. Vérifier pas d'erreurs TypeScript
2. Test rapide visuel
3. Marquer comme ✅ dans checklist

---

## 📊 Pattern de Référence

### Template d'Optimisation

```tsx
// AVANT
import { motion } from 'framer-motion';

const MyComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div style={{
        background: 'radial-gradient(...)',
        backdropFilter: 'blur(20px)'
      }}>
        Content
      </div>
    </motion.div>
  );
};

// APRÈS
import { motion } from 'framer-motion';
import { usePerformanceMode } from '../path/to/context';

const MyComponent = () => {
  const { isPerformanceMode } = usePerformanceMode();
  const MotionDiv = isPerformanceMode ? 'div' : motion.div;

  return (
    <MotionDiv
      {...(!isPerformanceMode && {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      })}
    >
      <div style={isPerformanceMode ? {
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
      } : {
        background: 'radial-gradient(...)',
        backdropFilter: 'blur(20px)'
      }}>
        Content
      </div>
    </MotionDiv>
  );
};
```

---

## 🎯 Ordre d'Exécution Recommandé

### Sprint 1: Recipe System (1.5h)
1. RecipeGenerationHeader (6 motion) - 15 min
2. RecipeFilterSystem (4 motion) - 10 min
3. RecipeValidationCTA (4 motion) - 10 min
4. RecipeActionButtons (check) - 5 min
5. Test & Build - 10 min

### Sprint 2: Shopping List (1h)
1. ShoppingListHeader - 15 min
2. ShoppingListGeneratorCard - 15 min
3. ShoppingListMainLoader (check) - 5 min
4. Test & Build - 10 min

### Sprint 3: Meal Plan (1h)
1. MealPlanReviewAndGenerateCTA - 15 min
2. PlanGenerationProgress - 15 min
3. Test & Build - 10 min
4. Final validation - 10 min

**Total Phase 2:** ~3.5h

---

## 📈 Métriques de Succès

### Avant Phase 2
- GPU usage: 50-60%
- Scrolling: 50-55 fps
- Paint time: ~550ms
- Flickering: ✅ Éliminé

### Après Phase 2 (Target)
- GPU usage: **40-50%** (-10-20%)
- Scrolling: **60 fps stable** (+5-10 fps)
- Paint time: **~400ms** (-150ms)
- Flickering: ✅ Maintenu

---

## ✅ Checklist Phase 2

### Recipe System
- [ ] RecipeGenerationHeader.tsx
- [ ] RecipeFilterSystem.tsx
- [ ] RecipeValidationCTA.tsx
- [ ] RecipeActionButtons.tsx (vérification)

### Shopping List
- [ ] ShoppingListHeader.tsx
- [ ] ShoppingListGeneratorCard.tsx
- [ ] ShoppingListMainLoader.tsx (vérification)

### Meal Plan
- [ ] MealPlanReviewAndGenerateCTA.tsx
- [ ] PlanGenerationProgress.tsx

### Validation
- [ ] Build sans erreurs
- [ ] Test visuel sur chaque composant
- [ ] Lighthouse mobile audit
- [ ] Performance profiling

---

## 🔧 Commandes Utiles

### Development
```bash
# Watch mode pendant optimisation
npm run dev

# Build rapide
npm run build

# Lighthouse mobile
npx lighthouse http://localhost:5173 --preset=desktop --view
```

### Recherche
```bash
# Trouver motion. non optimisé
grep -r "motion\." src/app/pages/Fridge --include="*.tsx"

# Trouver radial-gradient
grep -r "radial-gradient" src/app/pages/Fridge --include="*.tsx"

# Trouver backdrop-filter
grep -r "backdrop-filter" src/app/pages/Fridge --include="*.tsx"
```

---

## 🎓 Tips & Tricks

### Performance Mode Path Resolution
```tsx
// Fridge/tabs/RecipesTab/components/RecipeCard.tsx
// Path: ../../../../../../system/context/PerformanceModeContext

// Compter les niveaux:
// 1. components
// 2. RecipesTab
// 3. tabs
// 4. Fridge
// 5. pages
// 6. app
// 7. src
```

### Gradient Simplification
```tsx
// AVANT (coûteux)
background: `
  radial-gradient(circle at 30% 20%, color-mix(...) 0%, transparent 60%),
  radial-gradient(circle at 70% 80%, color-mix(...) 0%, transparent 50%),
  radial-gradient(circle at 50% 50%, color-mix(...) 0%, transparent 70%)
`

// APRÈS (performant)
background: 'linear-gradient(145deg, color-mix(in srgb, color 20%, #1e293b), color-mix(in srgb, color 10%, #0f172a))'
```

### Animation Wrap Pattern
```tsx
// Animations complexes
{!isPerformanceMode && (
  <motion.div animate={{ ... }}>
    Heavy animation
  </motion.div>
)}

// Animations simples
<MotionDiv {...(!isPerformanceMode && { animate: {...} })}>
  Content
</MotionDiv>
```

---

## 📊 Impact Estimé par Composant

| Composant | Motion Count | GPU Impact | Time Est. |
|-----------|-------------|------------|-----------|
| RecipeGenerationHeader | 6 | HAUTE | 15 min |
| RecipeFilterSystem | 4 | MOYENNE | 10 min |
| RecipeValidationCTA | 4 | HAUTE | 10 min |
| ShoppingListHeader | 2-3 | MOYENNE | 15 min |
| ShoppingListGeneratorCard | 3 | MOYENNE | 15 min |
| MealPlanReviewAndGenerateCTA | 2 | HAUTE | 15 min |
| PlanGenerationProgress | Variable | MOYENNE | 15 min |

**Total Impact:** +30% GPU improvement
**Total Time:** ~3.5h

---

## 🚀 Ready to Start!

Tous les outils et patterns sont prêts. Phase 2 peut démarrer immédiatement avec:

1. **RecipeGenerationHeader.tsx** (le plus lourd - 6 motion)
2. Suivre le pattern établi en Phase 1
3. Valider au fur et à mesure
4. Build final et tests

**Good luck! 🎯**

---

**Date:** 2025-10-18
**Prepared by:** AI Optimization Assistant
**Status:** 🎯 Ready for implementation
