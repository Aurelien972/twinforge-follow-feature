# Fichiers à Supprimer Manuellement - Nettoyage Face Scan

Cette liste contient tous les fichiers et dossiers qui doivent être supprimés pour nettoyer complètement le code du système de scan facial.

## 1. Pages et Composants Face Scan

### Dossier FaceScan complet
```
src/app/pages/FaceScan/
├── components/
│   ├── FaceScanImmersiveAnalysis.tsx
│   ├── FaceScanResultViewer.tsx
│   └── ImmersiveFaceAnalysis.tsx
│   └── ImmersiveFaceAnalysisOptimized.tsx
├── FaceScanCelebrationStep.tsx
├── FaceScanCelebrationWithHeader.tsx
├── FaceScanPhotoCaptureStep.tsx
├── FaceScanProgressHeader.tsx
├── FaceScanProgressHeader.module.css
├── FaceScanProgressHeaderOptimized.tsx
├── FaceScanReviewFinal.tsx
├── FaceScanReviewPage.tsx
├── FaceScanReviewPageSimple.tsx
└── FaceScanReviewWithHeader.tsx
```

### Page principale
```
src/app/pages/FaceScanPage.tsx
```

## 2. Edge Functions Supabase

```
supabase/functions/face-match/
├── index.ts
├── faceEnvelopeBuilder.ts
├── faceMorphologyHelpers.ts
├── requestValidator.ts
└── response.ts

supabase/functions/face-commit/
├── index.ts
├── faceDataStorage.ts
├── profileUpdater.ts
├── requestValidator.ts
└── response.ts

supabase/functions/face-semantic/
├── index.ts
├── FaceSemanticAnalyzer.ts
├── faceSemanticFallback.ts
├── dbFaceSemanticValidator.ts
├── requestValidator.ts
└── response.ts

supabase/functions/face-refine-morphs/
├── index.ts
├── aiResultValidator.ts
├── mappingRefetcher.ts
├── openaiClient.ts
├── promptBuilder.ts
├── requestValidator.ts
└── response.ts
```

## 3. Utilitaires Partagés

```
supabase/functions/_shared/utils/faceKeys.ts
```

## 4. Hooks Face Scan

```
src/hooks/useProfileFaceData.ts
src/hooks/useGlobalFaceParams.ts
```

## 5. Composants UI Face

```
src/components/3d/FaceViewer3D.tsx
src/ui/components/face/
├── index.ts
└── FaceShapeControls.tsx
src/ui/components/skeletons/FaceViewer3DSkeleton.tsx
```

## 6. Repositories et Configurations

```
src/system/data/repositories/faceScanRepo.ts
src/config/faceShapeKeysMapping.ts
src/lib/morph/mergeFaceAndBodyMorphs.ts
```

## 7. Styles CSS

```
src/styles/components/face-shape-controls.css
```

## 8. Documentation

```
docs/FACE_CUSTOMIZATION_SYSTEM.md
docs/BodyFaceScan/FORGE_CORPORELLE_FACE_SCAN.md
docs/BodyFaceScan/face-forge/
└── PIPELINE.md
```

## 9. Migrations SQL

```
supabase/migrations/20251012215356_enrich_face_archetypes_with_missing_keys_v3.sql
```

## 10. Fichiers Backup et Scripts de Test

```
src/app/pages/MealsPage.tsx.backup
src/app/pages/Avatar/tabs/ScanCTA.tsx.backup
test-edge-functions.sh
test-illustration-system.sh
test-recovery-intelligence.sh
morph_archetypes_validation_tests.sql
```

## 11. Scripts de Nettoyage

```
cleanup-facescan.sh
```

---

## Commandes de Suppression Rapide

Pour supprimer tous ces fichiers en une seule fois, exécutez:

```bash
chmod +x cleanup-facescan.sh
./cleanup-facescan.sh
```

Ou manuellement:

```bash
# Supprimer les dossiers
rm -rf src/app/pages/FaceScan
rm -rf supabase/functions/face-match
rm -rf supabase/functions/face-commit
rm -rf supabase/functions/face-semantic
rm -rf supabase/functions/face-refine-morphs
rm -rf src/ui/components/face
rm -rf docs/BodyFaceScan/face-forge

# Supprimer les fichiers individuels
rm -f src/app/pages/FaceScanPage.tsx
rm -f supabase/functions/_shared/utils/faceKeys.ts
rm -f src/hooks/useProfileFaceData.ts
rm -f src/hooks/useGlobalFaceParams.ts
rm -f src/components/3d/FaceViewer3D.tsx
rm -f src/ui/components/skeletons/FaceViewer3DSkeleton.tsx
rm -f src/system/data/repositories/faceScanRepo.ts
rm -f src/config/faceShapeKeysMapping.ts
rm -f src/lib/morph/mergeFaceAndBodyMorphs.ts
rm -f src/styles/components/face-shape-controls.css
rm -f docs/FACE_CUSTOMIZATION_SYSTEM.md
rm -f docs/BodyFaceScan/FORGE_CORPORELLE_FACE_SCAN.md
rm -f supabase/migrations/20251012215356_enrich_face_archetypes_with_missing_keys_v3.sql
rm -f src/app/pages/MealsPage.tsx.backup
rm -f src/app/pages/Avatar/tabs/ScanCTA.tsx.backup
rm -f test-edge-functions.sh
rm -f test-illustration-system.sh
rm -f test-recovery-intelligence.sh
rm -f morph_archetypes_validation_tests.sql
rm -f cleanup-facescan.sh
```

---

## Modifications Déjà Effectuées

Ces fichiers ont déjà été modifiés et n'ont plus besoin de changements:

- ✅ `src/main.tsx` - Routes face-scan supprimées
- ✅ `src/app/pages/Avatar/tabs/FaceTab.tsx` - Transformé en simple message "À venir"
- ✅ `src/ui/components/skeletons/index.ts` - Export FaceViewer3DSkeleton retiré

---

## Estimation de Gain d'Espace

- **Pages FaceScan**: ~150 KB
- **Edge Functions**: ~80 KB
- **Hooks et composants**: ~40 KB
- **Documentation**: ~60 KB
- **Fichiers backup/test**: ~30 KB
- **Total estimé**: ~360 KB de code source

Le gain réel après build sera d'environ **500-800 KB** dans le bundle final.
