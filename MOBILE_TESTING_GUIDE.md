# Guide de Test - Optimisations Mobile Avatar 3D

## 🎯 Objectif du Test
Valider que les optimisations résolvent les problèmes de performance sur votre iPhone 14 Pro Max et autres appareils mobiles.

---

## ✅ Checklist de Test sur Mobile

### Phase 1: Test Initial (iPhone 14 Pro Max)

#### 1. Chargement de l'Avatar
- [ ] L'avatar se charge en moins de 5 secondes
- [ ] Pas de refresh/crash automatique de la page
- [ ] Le téléphone reste à température normale

#### 2. Rotation de l'Avatar
- [ ] La rotation tactile est fluide (pas de saccades)
- [ ] Le FPS reste stable pendant la rotation
- [ ] Pas de lag ou freeze pendant la manipulation

#### 3. Utilisation CPU/Température
- [ ] Ouvrir les outils de développement Safari
- [ ] Aller dans l'onglet "Performance"
- [ ] Observer l'utilisation CPU pendant 30 secondes:
  - **Target: CPU < 50% (avant: 80-106%)**
  - **Température: Normale (avant: Surchauffe)**

#### 4. Changement d'Onglet
- [ ] Naviguer vers un autre onglet (ex: Profile)
- [ ] Revenir sur l'onglet Avatar
- [ ] **CRITIQUE:** Vérifier qu'il n'y a AUCUN lag résiduel
- [ ] Le téléphone ne devrait pas chauffer après avoir quitté l'avatar

#### 5. Test de Durée
- [ ] Laisser l'avatar affiché pendant 2 minutes
- [ ] Observer si le téléphone chauffe progressivement
- [ ] Vérifier que le FPS reste stable (30 FPS)

---

### Phase 2: Indicateurs Visuels de Performance

#### Badge FPS (coin supérieur droit)
Vous devriez voir un petit badge avec:
- Point vert + "30 FPS" = **Performance excellente** ✅
- Point orange + "20-25 FPS" = **Performance acceptable** ⚠️
- Point rouge + "<20 FPS" = **Performance faible** ❌

#### Détection Automatique
L'application détecte automatiquement:
- **Type d'appareil:** Mobile, Tablette ou Desktop
- **Niveau de performance:** Low, Medium ou High
- **Mode appliqué:** Économie, Équilibré ou Haute Qualité

Sur iPhone 14 Pro Max, vous devriez avoir:
- Type: Mobile
- Niveau: Medium
- Mode: Équilibré (30 FPS, 4 lumières, sans ombres)

---

### Phase 3: Comparaison Avant/Après

#### Métriques à Comparer

| Métrique | Avant (Problème) | Après (Target) | Votre Résultat |
|----------|------------------|----------------|----------------|
| CPU Moyen | 80% | 30-40% | ____% |
| CPU Max | 106% | 50-60% | ____% |
| FPS | ~15-20 | 30 stable | ____ |
| Surchauffe | Oui | Non | Oui / Non |
| Crash/Refresh | Oui | Non | Oui / Non |
| Lag après onglet | Oui | Non | Oui / Non |

---

## 🔍 Diagnostic des Problèmes

### Si l'avatar ne se charge pas:
1. Vérifier la console JavaScript pour erreurs
2. Essayer de rafraîchir la page
3. Vérifier que vous avez un scan corporel enregistré

### Si le FPS est < 20:
1. L'application devrait afficher une alerte automatique
2. Le mode va se dégrader automatiquement
3. Si problème persiste, signaler l'appareil/navigateur utilisé

### Si le téléphone chauffe toujours:
1. Vérifier que le badge FPS est visible (= optimisations actives)
2. Essayer de désactiver/réactiver l'auto-rotation
3. Fermer d'autres applications en arrière-plan

---

## 📊 Informations à Collecter

Si vous rencontrez des problèmes, notez:

### Informations Appareil:
- **Modèle:** iPhone 14 Pro Max
- **iOS Version:** ____
- **Navigateur:** Safari / Chrome / Autre: ____
- **Version navigateur:** ____

### Informations Performance:
- **CPU moyen observé:** ____%
- **FPS moyen observé:** ____
- **Température:** Normale / Tiède / Chaude
- **Comportement:** Fluide / Saccadé / Freeze

### Console JavaScript:
- [ ] Aucune erreur
- [ ] Erreurs présentes (copier les messages)

---

## 🎨 Qualité Visuelle Attendue sur Mobile

### Ce qui est RÉDUIT (pour performance):
- ❌ Pas d'ombres portées
- ❌ Pas de textures détaillées (pores de peau)
- ❌ GridHelper désactivé
- ❌ Moins de lumières (4 au lieu de 10)
- ❌ Matériaux simplifiés

### Ce qui est PRÉSERVÉ:
- ✅ Avatar 3D complet et fidèle
- ✅ Rotation fluide 360°
- ✅ Teinte de peau correcte
- ✅ Morphologie corporelle précise
- ✅ Proportions exactes

**Important:** La qualité visuelle est volontairement réduite pour garantir une expérience fluide sans surchauffe. C'est un compromis nécessaire sur mobile.

---

## 🚀 Tests Avancés (Optionnel)

### Test de Stress:
1. Ouvrir 3 onglets avec l'avatar
2. Naviguer entre les onglets rapidement
3. Vérifier que chaque onglet se met en pause correctement
4. **Target:** Pas d'accumulation de lag

### Test Batterie:
1. Noter le % de batterie initial
2. Utiliser l'avatar pendant 10 minutes
3. Noter le % de batterie final
4. **Target:** Consommation < 5% (avant: ~15-20%)

### Test Multitâche:
1. Ouvrir l'avatar
2. Mettre l'app en arrière-plan (home button)
3. Attendre 10 secondes
4. Revenir à l'app
5. **Target:** Avatar se réactive proprement, pas de crash

---

## 📝 Rapport de Test

### Template de Feedback:

```
APPAREIL: iPhone 14 Pro Max
iOS: ____
NAVIGATEUR: Safari __.__

RÉSULTATS:
- Chargement: ✅ / ❌
- Rotation fluide: ✅ / ❌
- CPU: ____%
- FPS: ____
- Surchauffe: Oui / Non
- Crash/Refresh: Oui / Non
- Lag après onglet: Oui / Non

QUALITÉ VISUELLE:
- Acceptable / Trop dégradée / Parfaite

COMMENTAIRES:
[Vos observations]

PROBLÈMES RENCONTRÉS:
[Si applicable]
```

---

## 🎯 Critères de Succès

Les optimisations sont considérées **réussies** si:

1. ✅ CPU < 50% en moyenne (avant: 80-106%)
2. ✅ Pas de surchauffe du téléphone
3. ✅ Pas de refresh/crash automatique
4. ✅ Rotation fluide à 30 FPS
5. ✅ Pas de lag après changement d'onglet
6. ✅ Qualité visuelle acceptable (même si réduite)

---

## 📞 Prochaines Étapes

### Si les tests sont réussis:
- ✅ Marquer les optimisations comme validées
- ✅ Déployer en production
- ✅ Monitorer les métriques utilisateurs réels

### Si problèmes persistent:
1. Collecter les informations de diagnostic ci-dessus
2. Ajuster les seuils de performance si nécessaire
3. Envisager un mode "avatar 2D statique" pour appareils très faibles

---

*Guide créé le 18 octobre 2025*
*Optimisations basées sur les captures d'écran et spécifications fournies*
