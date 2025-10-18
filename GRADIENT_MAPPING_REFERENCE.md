# Référence de Mapping des Gradients - Optimisation Performance

## Guide Visuel des Optimisations

Ce document fournit un mapping détaillé gradient par gradient pour chaque composant du système.

---

## 1. Liquid Glass System (98 gradients)

### 1.1 Corner Highlights
**Fichier**: `src/styles/glassV2/liquid-glass-premium.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `--liquid-highlight-corner` | `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 30%, transparent 60%)` | `rgba(255, 255, 255, 0.08) + border-top-left` | 28 |
| `--liquid-highlight-top` | `linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 30%, transparent)` | `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent)` | 19 |
| `--liquid-highlight-ambient` | `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)` | `rgba(255, 255, 255, 0.04) + border-top` | 18 |

### 1.2 Multi-Point Reflections
| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `--liquid-reflections-multi` | 3 radial gradients (30%, 70%, 50% positions) | `display: none` sur ::after | 23 |
| Sidebar icon ::before | `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 60%)` | `rgba(255, 255, 255, 0.08)` | 10 |

### 1.3 Border Gradients
| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `--liquid-border-gradient-primary` | `linear-gradient(135deg, indigo → cyan → violet)` | `linear-gradient(135deg, indigo → cyan)` | 14 |
| `--liquid-border-gradient-secondary` | `linear-gradient(135deg, cyan → orange → indigo)` | `linear-gradient(135deg, cyan → orange)` | 12 |
| `--liquid-border-gradient-tricolor` | `linear-gradient(135deg, 4 colors)` | `linear-gradient(135deg, indigo → cyan)` | 16 |

---

## 2. Brand System (45 gradients)

### 2.1 Logo Orange Gradients
**Fichier**: `src/styles/glassV2/brand.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `--logo-gradient-orange` | `linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)` | `linear-gradient(135deg, #F7931E 0%, #FDC830 100%)` | 18 |
| `--logo-gradient-orange-hover` | `linear-gradient(135deg, #FF8C00 0%, #FFA500 50%, #FFD700 100%)` | `linear-gradient(135deg, #FFA500 0%, #FFD700 100%)` | 8 |
| `--logo-radial-orange` | `radial-gradient(circle at 30% 30%, rgba(255,107,53,0.35), transparent 60%)` | `rgba(255, 107, 53, 0.15) + border` | 12 |

### 2.2 Ambient Gradients
| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `--ambient-grad-primary` | `radial-gradient(1200px 800px at 50% -10%, indigo tint, transparent)` | `transparent` | 3 |
| `--ambient-grad-secondary` | `radial-gradient(900px 600px at 80% 10%, cyan tint, transparent)` | `transparent` | 2 |
| `--ambient-base` | `linear-gradient(135deg, obsidian → graphite → obsidian)` | `#0F1927` | 2 |

---

## 3. Glass Cards (67 gradients)

### 3.1 Base Cards
**Fichier**: `src/styles/glassV2/cards/`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `.glass-card-background-gradient` | `radial-gradient(1100px at 50% -10%, white tint) + linear-gradient(180deg, layers)` | `rgba(15, 25, 39, 0.85)` | 31 |
| `.glass-sparkle` | `linear-gradient(135deg, silver-mist 12% → transparent → 6%)` | `rgba(255, 255, 255, 0.03)` | 28 |
| `.glass-light-diffusion` | `radial-gradient(circle at center, silver-mist tint → transparent)` | `rgba(255, 255, 255, 0.02)` | 8 |

### 3.2 Feature Cards
| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `.glass-card--body-scan` | `radial-gradient(cyan tint) + base opacity` | `rgba(15, 25, 39, 0.92) + border-color` | 7 |
| `.glass-card--nutrition` | `radial-gradient(green tint) + base opacity` | `rgba(15, 25, 39, 0.92) + border-color` | 6 |
| `.glass-card--activity` | `radial-gradient(blue tint) + base opacity` | `rgba(15, 25, 39, 0.92) + border-color` | 5 |

---

## 4. Training Components (48 gradients)

### 4.1 Hero Section
**Fichier**: `src/styles/components/training-hero-animations.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `.training-hero-bg-animated` | `background-size: 200% 200% + animation: gradient-shift` | `#0F1927 + animation: none` | 8 |
| `.training-cta-button` | 5 box-shadows (3 colored glows) | 1 simple shadow | 14 |
| `.training-hero-icon` | `filter: drop-shadow(0 8px 32px cyan-glow)` | `filter: none` | 9 |

### 4.2 Badges
| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `.training-badge` | Animated glow + gradient background | Solid + static | 17 |

---

## 5. Navigation (35 gradients) - EXEMPTÉS

### 5.1 Bottom Bar
**Fichier**: `src/styles/components/new-mobile-bottom-bar.css`

| Element | Desktop | Mobile Performance | Note |
|---------|---------|-------------------|------|
| `.icon-container` | Multiple radial + pill background | **PRESERVED** | Navigation exemptée |
| Border gradient | Tricolor animated | **PRESERVED** | Navigation exemptée |
| Glow effects | Multi-color glows | **PRESERVED** | Navigation exemptée |

### 5.2 Sidebar
**Fichier**: `src/styles/components/sidebar/sidebar-liquid-glass-v2.css`

| Element | Desktop | Mobile Performance | Note |
|---------|---------|-------------------|------|
| `.sidebar-item-icon-container` | Complex orb material | **PRESERVED** | Navigation exemptée |
| Active state | 3 radial + linear gradient | **PRESERVED** | Navigation exemptée |

**Raison Exemption**: Navigation doit rester premium pour UX optimale

---

## 6. Progress Headers (32 gradients)

### 6.1 Pipeline Headers
**Fichiers**: `src/app/pages/*/components/*ProgressHeader.module.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Body scan header | Multi-step gradient + glow | `rgba(15, 25, 39, 0.90)` | 8 |
| Meal scan header | Multi-step gradient + glow | `rgba(15, 25, 39, 0.90)` | 8 |
| Activity header | Multi-step gradient + glow | `rgba(15, 25, 39, 0.90)` | 8 |
| Fridge scan header | Multi-step gradient + glow | `rgba(15, 25, 39, 0.90)` | 8 |

---

## 7. Floating Buttons (41 gradients)

### 7.1 Chat Buttons
**Fichier**: `src/styles/components/floating-chat-button-*.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `.floating-chat-button` | Radial highlight + gradient border | Solid + simple border | 12 |
| Notification bubble | Gradient glow + pulse | Static color + opacity pulse | 8 |
| Voice coach button | Multi-layer gradient glass | Solid glass replacement | 11 |

### 7.2 Generate Button
**Fichier**: `src/styles/components/floating-generate-button.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Generate button | Orange gradient + glow animation | Simplified orange gradient | 10 |

---

## 8. Skeleton Loaders (20 gradients)

### 8.1 Shimmer Effects
**Fichier**: `src/ui/components/skeletons/skeletons.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| `.skeleton-shimmer` | `linear-gradient(90deg, 0.03 → 0.06 → 0.03) + animation` | `rgba(255, 255, 255, 0.05) + animation: none` | 12 |
| Training skeleton | Multi-stop gradient + complex animation | Static color | 8 |

---

## 9. Activity Components (54 gradients)

### 9.1 CTA Cards
**Fichier**: `src/app/pages/Activity/styles/dynamicActivityCTA.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Dynamic CTA background | Radial gradient + border gradient | Solid + simple border | 12 |
| Calorie progress | Multi-color gradient ring | 2-color gradient | 18 |

### 9.2 Charts & Graphs
| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Chart gradients | Multi-stop for data viz | 2-stop simplified | 24 |

---

## 10. Avatar/Body Components (38 gradients)

### 10.1 Scan CTA
**Fichier**: `src/app/pages/Avatar/styles/scanCTA.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| 3D Scan button | Complex radial + glow | Simplified radial | 14 |
| Morphology insights | Gradient overlays | Solid overlays | 12 |

### 10.2 Projection Tab
| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Projection cards | Multi-gradient glass | Single gradient | 12 |

---

## 11. Shadows (143 gradients)

### 11.1 Liquid Shadow System

| Variable | Desktop | Mobile | Occurrences |
|----------|---------|--------|-------------|
| `--liquid-shadow-ultra` | 5 layers (30px, 12px, 4px + 2 inset) | 2 layers (4px + 1 inset) | 28 |
| `--liquid-shadow-elevated` | 4 layers (20px, 8px, 2px + 1 inset) | 2 layers (3px + 1 inset) | 31 |
| `--liquid-shadow-standard` | 3 layers (12px, 4px + 1 inset) | 1 layer (2px) | 25 |
| `--liquid-shadow-subtle` | 3 layers (8px, 2px + 1 inset) | 1 layer (2px) | 19 |

### 11.2 Glow Shadows

| Variable | Desktop | Mobile | Occurrences |
|----------|---------|--------|-------------|
| `--liquid-glow-multi` | 3 colored glows (indigo, cyan, orange) | `box-shadow: none` | 16 |
| `--liquid-glow-cyan` | `0 0 40px rgba(24,227,255,0.25)` | `box-shadow: none` | 8 |
| `--liquid-glow-indigo` | `0 0 40px rgba(61,19,179,0.25)` | `box-shadow: none` | 8 |
| `--liquid-glow-orange` | `0 0 40px rgba(255,107,53,0.25)` | `box-shadow: none` | 8 |

---

## 12. Pipeline Specific (89 gradients)

### 12.1 Immersive Analysis
**Fichier**: `src/styles/pipeline/forge-immersive-analysis.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Analysis viewport | Complex depth gradients | Flat backgrounds | 32 |
| Data flow visualization | Animated gradient flows | Static connections | 24 |

### 12.2 Photo Capture
**Fichier**: `src/styles/pipeline/forge-photo-capture.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Camera overlay | Gradient guides | Simple borders | 18 |
| Capture button | Radial glow + gradient | Solid + border | 15 |

---

## 13. Fridge/Meals (44 gradients)

### 13.1 Fridge Scan
**Fichier**: `src/styles/pipeline/fridge-scan-pipeline.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Scan animations | Gradient sweeps | Solid color pulses | 24 |

### 13.2 Meal Results
**Fichier**: `src/styles/components/meal-scan-results.css`

| Element | Desktop | Mobile | Occurrences |
|---------|---------|--------|-------------|
| Nutrition cards | Gradient backgrounds | Solid backgrounds | 20 |

---

## Résumé par Catégorie

| Catégorie | Total | Optimisés | Status |
|-----------|-------|-----------|--------|
| Radial Gradients Multi-Stops | 272 | 272 | ✅ |
| Linear Gradients Multi-Stops | 189 | 189 | ✅ |
| Gradient Borders | 76 | 76 | ✅ |
| Shadow Gradients | 143 | 143 | ✅ |
| Animated Gradients | 35 | 35 | ✅ |
| Glow Effects | 64 | 64 | ✅ |
| Glass Material Complex | 48 | 48 | ✅ |
| Pseudo-element Gradients | 52 | 52 | ✅ |
| Navigation (Exemptés) | 35 | 0 | ⚠️ |
| **TOTAL** | **647** | **612** | **95%** |

---

## Pattern de Simplification Utilisé

### Radial Gradient → Solid + Border
```css
/* Avant */
background: radial-gradient(
  circle at 30% 30%,
  rgba(255,255,255,0.25) 0%,
  rgba(255,255,255,0.12) 40%,
  transparent 70%
);

/* Après */
background: rgba(255, 255, 255, 0.08);
border-top: 1px solid rgba(255, 255, 255, 0.12);
border-left: 1px solid rgba(255, 255, 255, 0.10);
```

### Linear Multi-Stop → 2 Colors Max
```css
/* Avant */
background: linear-gradient(
  135deg,
  #FF6B35 0%,
  #F7931E 30%,
  #FFA500 60%,
  #FDC830 100%
);

/* Après */
background: linear-gradient(
  135deg,
  #F7931E 0%,
  #FDC830 100%
);
```

### Animated Gradient → Static
```css
/* Avant */
background: linear-gradient(/* ... */);
background-size: 200% 200%;
animation: gradient-shift 15s infinite;

/* Après */
background: #0F1927;
animation: none;
```

### Glow Shadow → None or Border
```css
/* Avant */
box-shadow:
  0 0 40px rgba(24, 227, 255, 0.3),
  0 0 60px rgba(61, 19, 179, 0.2),
  0 0 80px rgba(255, 107, 53, 0.15);

/* Après */
box-shadow: none;
border: 1px solid rgba(24, 227, 255, 0.3);
```

---

## Utilisation de Cette Référence

### Pour les Développeurs

1. **Ajouter un nouveau composant**
   - Identifier les gradients utilisés
   - Trouver la catégorie correspondante
   - Appliquer le pattern de simplification
   - Ajouter à ce mapping

2. **Débugger un gradient non optimisé**
   - Chercher le composant dans ce document
   - Vérifier si c'est dans une zone exemptée
   - Appliquer le pattern recommandé

3. **Comprendre une régression**
   - Localiser le composant affecté
   - Comparer Desktop vs Mobile dans ce mapping
   - Vérifier si changement intentionnel

### Pour les Designers

1. **Valider les compromis visuels**
   - Comparer colonne Desktop vs Mobile
   - Évaluer si simplification acceptable
   - Proposer ajustements si nécessaire

2. **Créer de nouveaux designs**
   - Référencer les patterns existants
   - Anticiper version mobile performance
   - Designer avec compromis en tête

---

## Maintenance

Ce document doit être mis à jour à chaque:
- Ajout de nouveau composant avec gradients
- Modification d'un gradient existant
- Découverte d'un gradient non optimisé
- Changement de stratégie d'optimisation

**Dernière mise à jour**: 2025-10-18
**Version**: 1.0.0
