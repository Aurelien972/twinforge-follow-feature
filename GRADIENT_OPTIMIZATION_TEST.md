# Guide de Test - Optimisation des Gradients

## Comment Activer le Mode Performance

Le mode performance s'active automatiquement via le système `PerformanceModeContext` basé sur les capacités du device.

### Activation Manuelle (pour Tests)

#### 1. Via Chrome DevTools Console
```javascript
// Activer le mode performance
document.body.classList.add('performance-mode');

// Désactiver le mode performance
document.body.classList.remove('performance-mode');

// Toggle le mode
document.body.classList.toggle('performance-mode');
```

#### 2. Via React DevTools
Localiser le `PerformanceModeProvider` et modifier le state:
```javascript
// Dans React DevTools
$r.setState({ mode: 'performance' })  // Activer
$r.setState({ mode: 'auto' })         // Auto-détection
```

#### 3. Forcer via localStorage
```javascript
// Forcer le mode performance
localStorage.setItem('performance_mode', 'performance');
location.reload();

// Retour en mode auto
localStorage.removeItem('performance_mode');
location.reload();
```

## Tests Visuels

### Éléments à Vérifier

#### 1. Sidebar Icons (40+ gradients)
**Desktop**:
- Orbes glass avec multi-layered radial gradients
- Corner highlights visibles
- Glow sur icône active

**Mobile Performance**:
- Background solide rgba(15, 25, 39, 0.85)
- Border simple rgba(255, 255, 255, 0.15)
- Pas de glow, border coloré à la place

**Test**:
```javascript
document.body.classList.toggle('performance-mode');
// Observer les icônes de sidebar
```

#### 2. Glass Cards (150+ gradients)
**Desktop**:
- Radial gradient corner highlights
- Multiple shadow layers
- Border gradient subtil

**Mobile Performance**:
- Background opaque
- Single shadow
- Border solide

**Test**: Ouvrir n'importe quelle page avec glass cards (Activity, Meals, etc.)

#### 3. Bottom Bar (35+ gradients)
**Desktop**:
- Tricolor gradient border
- Multi-layer shadow avec glow
- Background avec saturate

**Mobile Performance**:
- Border solide cyan
- Simple shadow
- Background opaque

**Test**:
```javascript
document.body.classList.toggle('performance-mode');
// Inspecter .mobile-bottom-bar
```

#### 4. Training Hero (25+ gradients)
**Desktop**:
- Animated gradient background
- Button avec gradient orange
- Icon avec glow gradient

**Mobile Performance**:
- Solid background #0F1927
- Gradient orange simplifié (2 couleurs)
- Icon sans glow

**Test**: Naviguer vers `/training`

#### 5. Progress Headers (32+ gradients)
**Desktop**:
- Multi-step gradient background
- Gradient progress bars

**Mobile Performance**:
- Solid background
- Solid color progress

**Test**: Lancer un scan (Body, Face, Meal, Activity)

#### 6. Skeleton Loaders (20+ gradients)
**Desktop**:
- Animated shimmer gradient

**Mobile Performance**:
- Static rgba(255, 255, 255, 0.05)
- No animation

**Test**:
```javascript
// Force skeleton display
document.querySelectorAll('.skeleton-shimmer').forEach(el => {
  el.style.display = 'block';
});
```

## Tests de Performance

### Chrome DevTools Performance Tab

#### Baseline (Desktop - Sans Performance Mode)
1. Ouvrir Chrome DevTools → Performance
2. Cliquer "Record"
3. Naviguer: Home → Training → Activity → Meals
4. Stop recording après 15 secondes

**Métriques attendues**:
- FPS: 60
- GPU Paint Time: 15-20ms
- Composite Layers: ~150

#### Test Performance Mode (Mobile Simulation)
1. DevTools → Toggle device toolbar (iPhone 10)
2. Activer performance mode:
```javascript
document.body.classList.add('performance-mode');
```
3. Répéter le test ci-dessus

**Métriques attendues**:
- FPS: 50-60
- GPU Paint Time: 20-30ms (réduction 40-50%)
- Composite Layers: ~70-90 (réduction 60%)

### Layers Panel

#### Sans Performance Mode
```javascript
// Console
document.body.classList.remove('performance-mode');
```
1. DevTools → More tools → Layers
2. Observer le nombre de compositing layers
3. Hover sur cartes glass → voir nouveaux layers créés

**Observation**: Beaucoup de layers avec transform/filter

#### Avec Performance Mode
```javascript
document.body.classList.add('performance-mode');
```
1. Répéter les étapes ci-dessus
2. Comparer le nombre de layers

**Observation**: Réduction significative des layers

### Memory Profiling

#### Heap Snapshot Comparison
1. Sans performance mode: Heap snapshot
2. Avec performance mode: Heap snapshot
3. Comparer la size

**Réduction attendue**: 25-30%

## Tests de Régression Design

### Checklist Visuelle

#### ✅ Éléments qui DOIVENT Changer
- [x] Gradients multi-stops → 2 couleurs max
- [x] Radial gradients → couleur solide + border
- [x] Animations gradient → désactivées
- [x] Glow effects → supprimés
- [x] Shadow multi-layer → single shadow

#### ❌ Éléments qui NE DOIVENT PAS Changer
- [ ] Couleurs primaires (indigo, cyan, orange)
- [ ] Typographie et spacing
- [ ] Layout et structure
- [ ] Icons et illustrations
- [ ] Hiérarchie visuelle

### Comparaison Côte à Côte

```javascript
// Split screen test
const iframe1 = document.createElement('iframe');
iframe1.src = window.location.href;
iframe1.style = 'width:50vw;height:100vh;position:fixed;left:0;top:0;z-index:9999';
document.body.appendChild(iframe1);

const iframe2 = document.createElement('iframe');
iframe2.src = window.location.href;
iframe2.style = 'width:50vw;height:100vh;position:fixed;right:0;top:0;z-index:9999';
document.body.appendChild(iframe2);

// Dans iframe1: activer performance mode
// Dans iframe2: laisser desktop mode
```

## Tests Automatisés (Optionnel)

### Jest + Testing Library

```typescript
describe('Gradient Optimizations', () => {
  it('should apply performance-mode class on low-end devices', () => {
    // Mock device capabilities
    jest.spyOn(navigator, 'hardwareConcurrency', 'get').mockReturnValue(2);

    render(<App />);

    expect(document.body).toHaveClass('performance-mode');
  });

  it('should not apply performance-mode on high-end devices', () => {
    jest.spyOn(navigator, 'hardwareConcurrency', 'get').mockReturnValue(8);

    render(<App />);

    expect(document.body).not.toHaveClass('performance-mode');
  });
});
```

### Cypress Visual Testing

```javascript
describe('Gradient Optimization Visual Tests', () => {
  it('desktop mode should show rich gradients', () => {
    cy.visit('/');
    cy.get('body').should('not.have.class', 'performance-mode');
    cy.matchImageSnapshot('desktop-rich-gradients');
  });

  it('performance mode should show simplified gradients', () => {
    cy.visit('/');
    cy.get('body').invoke('addClass', 'performance-mode');
    cy.matchImageSnapshot('mobile-simplified-gradients');
  });
});
```

## Debug Mode

### Activer le Mode Debug
```javascript
// Highlight tous les gradients non optimisés en rouge
document.body.classList.add('performance-mode', 'debug-gradients');
```

**Résultat**: Éléments avec `style*="gradient"` non couverts par les optimisations apparaissent avec outline rouge.

### Compter les Gradients
```javascript
// Console
function countGradients() {
  const elements = document.querySelectorAll('*');
  let count = 0;

  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.backgroundImage.includes('gradient')) {
      count++;
      console.log(el, style.backgroundImage);
    }
  });

  return count;
}

// Sans performance mode
document.body.classList.remove('performance-mode');
const beforeCount = countGradients();

// Avec performance mode
document.body.classList.add('performance-mode');
const afterCount = countGradients();

console.log(`Réduction: ${beforeCount} → ${afterCount} (${Math.round((1 - afterCount/beforeCount) * 100)}%)`);
```

## Scénarios de Test Recommandés

### 1. Test de Navigation Complète
```
Home → Training → Activity Input → Meals Scan → Profile
```
- Activer performance mode
- Vérifier fluidité 60 FPS
- Observer changements visuels

### 2. Test de Stress (Scroll)
```
Activity History (100+ items) → Scroll rapide
```
- Sans performance mode: noter FPS
- Avec performance mode: comparer FPS

### 3. Test d'Animation
```
Training → Ouvrir Coach Chat → Animations de message
```
- Vérifier que animations essentielles fonctionnent
- Gradients décoratifs simplifiés

### 4. Test de State Changes
```
Glass Card Normal → Hover → Active
```
- Desktop: effets riches
- Mobile Performance: feedback simplifié mais présent

## Rapporter un Bug

### Template de Bug Report
```markdown
**Description**
Gradient non optimisé ou régression visuelle

**Steps to Reproduce**
1. Activer performance mode
2. Naviguer vers [page]
3. Observer [élément]

**Expected Behavior**
Gradient simplifié mais design cohérent

**Actual Behavior**
[Screenshot ou description]

**Device**
- Browser: Chrome 120
- Device: iPhone 10 simulation
- Performance Mode: Active

**CSS Element**
Selector: `.class-name`
File: `src/styles/components/file.css`
Line: 123
```

## Conclusion

Ce système d'optimisation des gradients doit:
- ✅ Réduire la charge GPU de 40-50%
- ✅ Maintenir 90%+ de similarité visuelle
- ✅ Préserver la hiérarchie et lisibilité
- ✅ Améliorer FPS de 15-25 points sur devices bas de gamme
- ✅ Être transparent pour l'utilisateur final

**Note**: Les compromis visuels sont minimes et justifiés par le gain de performance significatif.
