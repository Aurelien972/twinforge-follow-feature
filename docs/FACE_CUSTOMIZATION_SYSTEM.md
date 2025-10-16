# Système de Personnalisation Faciale

## Vue d'ensemble

Le système de personnalisation faciale permet aux utilisateurs d'ajuster finement leur avatar facial en temps réel avec une interface intuitive en français. Les modifications sont synchronisées automatiquement à travers tous les viewers 3D de l'application et persistées dans Supabase.

## Architecture

### Composants Principaux

#### 1. FaceShapeControls (`src/ui/components/face/FaceShapeControls.tsx`)

Composant UI principal qui affiche les contrôles d'ajustement organisés par catégories:
- Forme du visage
- Yeux
- Nez
- Bouche
- Pommettes
- Front

**Caractéristiques:**
- Sliders personnalisés avec preview en temps réel
- Indicateurs visuels pour les valeurs modifiées
- Boutons de réinitialisation par catégorie et global
- Animation d'expansion/collapse pour chaque catégorie
- Badge de modifications non enregistrées

**Props:**
```typescript
interface FaceShapeControlsProps {
  currentValues: Record<string, number>;
  onValuesChange: (values: Record<string, number>) => void;
  onSave: () => void;
  isSaving?: boolean;
}
```

#### 2. useGlobalFaceParams (`src/hooks/useGlobalFaceParams.ts`)

Hook React pour gérer la synchronisation globale des paramètres faciaux.

**API:**
```typescript
const {
  currentFaceParams,       // Paramètres actuels
  updateFaceParams,        // Mettre à jour localement
  saveFaceParams,          // Sauvegarder dans Supabase
  isSaving,                // État de sauvegarde
  error,                   // Erreur éventuelle
  resetToDefaults,         // Réinitialiser
  updateSingleKey          // Modifier une seule clé
} = useGlobalFaceParams();
```

**Flux de données:**
1. Lecture depuis `profile.preferences.face.final_face_params`
2. Modifications locales via `setProfile`
3. Sauvegarde dans Supabase via API
4. Invalidation automatique du cache
5. Synchronisation avec tous les viewers

#### 3. faceShapeKeysMapping (`src/config/faceShapeKeysMapping.ts`)

Configuration centralisée des clés de forme faciales avec mapping technique → UX.

**Structure:**
```typescript
interface FaceShapeKeyConfig {
  key: string;              // Clé Blender (ex: "FaceJawWidth")
  label: string;            // Nom UX (ex: "Largeur de la mâchoire")
  description?: string;     // Description pour l'utilisateur
  min: number;              // -1
  max: number;              // 1
  default: number;          // 0
  step: number;             // 0.05
}
```

**Catégories disponibles:**
- `face_shape`: 5 paramètres (mâchoire, pommettes, largeur, menton)
- `eyes`: 5 paramètres (taille, écartement, hauteur, paupières, monolid)
- `nose`: 4 paramètres (taille, largeur, arête, bout)
- `mouth`: 5 paramètres (largeur, épaisseur, lèvres supérieure/inférieure, position)
- `cheeks`: 3 paramètres (hauteur, profondeur, rondeur)
- `forehead`: 3 paramètres (hauteur, largeur, profondeur)

**Total: 25 paramètres ajustables**

### Intégration dans FaceTab

Le composant FaceTab a été modifié pour:
1. Désactiver la rotation automatique (`autoRotate={false}`)
2. Ajuster le cadrage caméra pour afficher uniquement tête et cou
3. Supprimer le texte "Vue enrichie avec les données corporelles"
4. Ajouter un bouton "Ajuster le visage" qui affiche/masque les contrôles
5. Utiliser les paramètres en temps réel quand les contrôles sont affichés

```tsx
const activeFaceMorphData = showControls ? currentFaceParams : faceMorphData;
```

## Configuration Caméra (Mode Visage)

Dans `sceneManager.ts`, le mode `faceOnly` a été optimisé:

```typescript
if (faceOnly) {
  // Position optimisée pour tête et cou uniquement
  initialDistance = 0.65;  // 65 cm de distance
  initialHeight = 1.65;    // Centré sur le visage

  // Limites de zoom
  controls.minDistance = 0.4;  // 40 cm
  controls.maxDistance = 1.2;  // 1.2 m

  // Angles de rotation limités
  controls.minPolarAngle = Math.PI * 0.35;
  controls.maxPolarAngle = Math.PI * 0.65;
  controls.setTarget(new THREE.Vector3(0, 1.65, 0));
}
```

## Synchronisation Multi-Viewers

Les paramètres faciaux sont automatiquement synchronisés via le store Zustand:

1. **FaceTab**: Utilise `useGlobalFaceParams` pour les modifications
2. **AvatarTab**: Lit `profile.preferences.face.final_face_params`
3. **ProjectionTab**: Lit `profile.preferences.face.final_face_params`
4. **Futurs scans**: Utilisent les paramètres ajustés comme base

Le hook `useGlobalFaceParams` met à jour le profil avec `setProfile`, ce qui déclenche automatiquement un re-render de tous les composants qui dépendent du profil.

## Persistance des Données

### Structure Supabase

Les paramètres faciaux sont stockés dans la table `profiles`:

```json
{
  "preferences": {
    "face": {
      "final_face_params": {
        "FaceJawWidth": 0.15,
        "FaceEyeSize": -0.10,
        ...
      },
      "skin_tone": { ... },
      "updated_at": "2025-10-14T07:00:00.000Z",
      "last_face_scan_id": "uuid"
    }
  }
}
```

### Sauvegarde

La sauvegarde est effectuée via:

```typescript
await supabase
  .from('profiles')
  .update({
    preferences: {
      ...profile.preferences,
      face: {
        ...profile.preferences.face,
        final_face_params: normalizedParams,
        updated_at: new Date().toISOString()
      }
    }
  })
  .eq('user_id', userId);
```

## Styles CSS

Les styles des sliders sont définis dans `face-shape-controls.css`:
- Design personnalisé des sliders (thumb et track)
- Effets de hover et focus
- Animation de pulsation pour les valeurs modifiées
- Support responsive (mobile)
- États désactivés

## Flux Utilisateur

1. **Accès**: L'utilisateur va sur l'onglet "Visage" dans Avatar
2. **Activation**: Clic sur "Ajuster le visage"
3. **Modification**: Utilisation des sliders pour ajuster les traits
4. **Preview**: Mise à jour en temps réel du viewer 3D
5. **Sauvegarde**: Clic sur "Enregistrer" (apparaît seulement si modifications)
6. **Confirmation**: Toast de succès
7. **Synchronisation**: Tous les viewers utilisent les nouveaux paramètres

## Validation et Normalisation

Toutes les valeurs sont normalisées avant sauvegarde:

```typescript
function normalizeFaceShapeValue(key: string, value: number): number {
  const config = getFaceShapeKeyConfig(key);
  if (!config) return value;
  return Math.max(config.min, Math.min(config.max, value));
}
```

Cela garantit que les valeurs restent dans les limites définies (-1 à 1 pour la plupart des paramètres).

## Extensibilité

Pour ajouter une nouvelle clé de forme:

1. Ajouter la configuration dans `FACE_SHAPE_KEYS_MAPPING`
2. Vérifier que la clé existe dans le modèle Blender
3. La nouvelle clé apparaîtra automatiquement dans l'interface

Pour ajouter une nouvelle catégorie:

```typescript
{
  id: 'ears',
  label: 'Oreilles',
  icon: 'Volume2',
  keys: [
    {
      key: 'FaceEarSize',
      label: 'Taille des oreilles',
      description: 'Oreilles plus grandes ou plus petites',
      min: -1,
      max: 1,
      default: 0,
      step: 0.05
    }
  ]
}
```

## Limitations Actuelles

1. **Temps réel**: Les modifications sont appliquées immédiatement mais peuvent causer un léger lag sur les appareils bas de gamme
2. **Historique**: Seule la dernière version est conservée (pas de système d'undo/redo)
3. **Présets**: Pas de système de présets ou de favoris
4. **Partage**: Pas de fonctionnalité de partage des paramètres entre utilisateurs

## Améliorations Futures

1. **Système d'undo/redo**: Historique des modifications
2. **Présets**: Templates pré-définis (visage ovale, carré, etc.)
3. **Comparaison**: Vue côte à côte avant/après
4. **Export**: Possibilité d'exporter les paramètres
5. **AI Suggestions**: Suggestions basées sur l'analyse faciale initiale
6. **Randomisation**: Bouton pour générer un visage aléatoire
7. **Validation visuelle**: Affichage de warnings si valeurs extrêmes
8. **Tutoriel interactif**: Guide pour les nouveaux utilisateurs

## Debugging

Pour débugger le système:

1. **Console logs**: Activer les logs avec `DEBUG=FACE_*`
2. **React DevTools**: Observer les changements de state
3. **Supabase Dashboard**: Vérifier les données persistées
4. **3D Viewer**: Vérifier que les morphs sont appliqués

```typescript
logger.info('USE_GLOBAL_FACE_PARAMS', 'Face params updated', {
  userId: profile.userId,
  paramsCount: Object.keys(normalizedParams).length
});
```

## Performance

Le système est optimisé pour:
- Pas de re-renders inutiles via `useMemo` et `useCallback`
- Normalisation en O(n) où n = nombre de clés
- Sauvegarde asynchrone avec feedback utilisateur
- Preview 3D optimisé GPU

## Sécurité

- Validation côté client ET serveur (RLS Supabase)
- Normalisation stricte des valeurs
- Pas d'injection SQL possible (utilisation ORM Supabase)
- Authentification requise pour toutes les opérations
