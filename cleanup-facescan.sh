#!/bin/bash
# Script de nettoyage complet du Face Scan

set -e

echo "🧹 Début du nettoyage du Face Scan..."

# 1. Supprimer le dossier FaceScan complet
echo "Suppression du dossier FaceScan..."
rm -rf src/app/pages/FaceScan
rm -f src/app/pages/FaceScanPage.tsx

# 2. Supprimer les Edge Functions face-scan
echo "Suppression des Edge Functions face-scan..."
rm -rf supabase/functions/face-match
rm -rf supabase/functions/face-commit
rm -rf supabase/functions/face-semantic
rm -rf supabase/functions/face-refine-morphs

# 3. Supprimer les utilitaires face dans _shared
echo "Suppression des utilitaires face..."
rm -f supabase/functions/_shared/utils/faceKeys.ts

# 4. Supprimer les hooks face scan
echo "Suppression des hooks face scan..."
rm -f src/hooks/useProfileFaceData.ts
rm -f src/hooks/useGlobalFaceParams.ts

# 5. Supprimer les composants UI face
echo "Suppression des composants UI face..."
rm -f src/components/3d/FaceViewer3D.tsx
rm -rf src/ui/components/face
rm -f src/ui/components/skeletons/FaceViewer3DSkeleton.tsx

# 6. Supprimer le repository et configurations face
echo "Suppression du repository et configurations..."
rm -f src/system/data/repositories/faceScanRepo.ts
rm -f src/config/faceShapeKeysMapping.ts

# 7. Supprimer les fichiers de merge face/body morphs
echo "Suppression de mergeFaceAndBodyMorphs..."
rm -f src/lib/morph/mergeFaceAndBodyMorphs.ts

# 8. Supprimer les styles CSS face
echo "Suppression des styles CSS face..."
rm -f src/styles/components/face-shape-controls.css

# 9. Supprimer la documentation face
echo "Suppression de la documentation face..."
rm -f docs/FACE_CUSTOMIZATION_SYSTEM.md
rm -rf docs/BodyFaceScan/face-forge
rm -f docs/BodyFaceScan/FORGE_CORPORELLE_FACE_SCAN.md

# 10. Supprimer les fichiers backup
echo "Suppression des fichiers backup..."
rm -f src/app/pages/MealsPage.tsx.backup
rm -f src/app/pages/Avatar/tabs/ScanCTA.tsx.backup

# 11. Supprimer les scripts de test
echo "Suppression des scripts de test..."
rm -f test-edge-functions.sh
rm -f test-illustration-system.sh
rm -f test-recovery-intelligence.sh

# 12. Supprimer le fichier SQL de validation des archétypes
echo "Suppression du fichier SQL de tests..."
rm -f morph_archetypes_validation_tests.sql

# 13. Supprimer la migration face archetypes
echo "Suppression de la migration face archetypes..."
rm -f supabase/migrations/20251012215356_enrich_face_archetypes_with_missing_keys_v3.sql

echo "✅ Nettoyage du Face Scan terminé!"
echo "📊 Fichiers et dossiers supprimés avec succès."
