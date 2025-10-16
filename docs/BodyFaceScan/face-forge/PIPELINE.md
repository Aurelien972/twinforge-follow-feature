# Pipeline de Scan Facial - Face Forge

**Version:** 2.0 • **Statut:** Production • **Dernière mise à jour:** Octobre 2025

Le pipeline de scan facial génère un modèle 3D facial photoréaliste avec analyse des traits et indicateurs de bien-être.

---

## 📋 Vue d'Ensemble

### Objectif

Transformer 2 photos faciales (face et profil) en modèle 3D facial avec:
- **Analyse morphologique faciale** (forme visage, traits)
- **Indicateurs de bien-être** (stress, sommeil, hydratation)
- **Recommandations personnalisées** pour santé faciale
- **Intégration avatar corps** pour représentation complète

### Architecture Pipeline

```
Photos (Face + Profil)
    ↓
face-match (GPT-4o Vision) → Détection traits + mesures
    ↓
face-semantic (GPT-5 Mini) → Classification morphologique
    ↓
face-refine-morphs (GPT-4o) → Raffinement AI précis
    ↓
face-commit → Génération modèle 3D + persistance
    ↓
Base de Données (user_face_profiles)
    ↓
Visualisation 3D + Insights
```

---

## 🏗️ Étapes du Pipeline

### Étape 1: face-match (Analyse Initiale)

**Modèle:** GPT-4o Vision
**Durée:** 5-20s • **Coût:** ~$0.001-0.005

**Traitement:**
- Détection traits faciaux (yeux, nez, lèvres, jawline)
- Extraction mesures faciales (largeur, hauteur, distances)
- Analyse symétrie et proportions
- Évaluation qualité photos

**Sortie:**
```typescript
{
  facial_features: {
    face_shape: 'oval' | 'round' | 'square' | 'heart' | 'diamond',
    eye_shape: 'almond' | 'round' | 'hooded' | 'monolid',
    nose_type: 'straight' | 'roman' | 'button' | 'aquiline',
    lip_fullness: 'thin' | 'average' | 'full' | 'pouty',
    facial_symmetry: number,  // 0-1
    jawline_definition: 'soft' | 'moderate' | 'sharp'
  },
  facial_measurements: {
    face_width_mm: number,
    face_height_mm: number,
    eye_distance_mm: number,
    // ...
  },
  quality_assessment: { /* ... */ },
  processing_confidence: number
}
```

### Étape 2: face-semantic (Classification)

**Modèle:** GPT-5 Mini
**Durée:** 3-12s • **Coût:** ~$0.0005-0.002

**Traitement:**
- Classification détaillée traits par catégorie
- Analyse wellness indicators (peau, stress, sommeil)
- Scores de confiance par feature
- Détection patterns bien-être

**Sortie:**
```typescript
{
  semantic_analysis: {
    face_shape_confidence: Record<string, number>,
    feature_classifications: {
      eyes: { shape, size, spacing },
      nose: { type, size, bridge_height },
      lips: { fullness, shape, symmetry },
      jawline: { definition, width, angle }
    },
    wellness_indicators: {
      skin_quality_score: number,
      stress_indicators: string[],
      sleep_quality_indicators: string[],
      hydration_level: 'low' | 'moderate' | 'good'
    }
  }
}
```

### Étape 3: face-refine-morphs (Raffinement)

**Modèle:** GPT-4o
**Durée:** 8-25s • **Coût:** ~$0.0008-0.004

**Traitement:**
- Raffinement paramètres faciaux (68 points)
- Analyse bien-être approfondie
- Ajustements précision basés AI
- Documentation reasoning

**Sortie:**
```typescript
{
  refined_face_params: Record<string, number>,  // 68 paramètres
  wellness_analysis: {
    overall_wellness_score: number,
    wellness_factors: Array<{
      factor: string,
      score: number,
      impact: 'positive' | 'negative',
      recommendations: string[]
    }>
  },
  refinement_reasoning: string,
  confidence_improvement: number
}
```

### Étape 4: face-commit (Génération)

**Type:** Processing algorithmique
**Durée:** 3-10s • **Coût:** ~$0.0001-0.0005

**Traitement:**
- Compilation données faciales finales
- Génération modèle 3D facial
- Persistance `user_face_profiles`
- Mise à jour profil utilisateur
- Extraction skin tone facial

**Sortie:**
```typescript
{
  face_profile_id: string,
  final_face_params: Record<string, number>,
  archetype_mix: Record<string, number>,
  skin_tone: {
    base_color: string,
    undertone: string,
    saturation: number,
    brightness: number
  },
  wellness_summary: {
    overall_score: number,
    key_indicators: string[],
    recommendations: string[]
  }
}
```

---

## 💰 Coûts et Performance

### Coûts par Étape

| Étape | Coût Min | Coût Max | Coût Moyen |
|-------|----------|----------|------------|
| face-match | $0.001 | $0.005 | $0.002 |
| face-semantic | $0.0005 | $0.002 | $0.001 |
| face-refine-morphs | $0.0008 | $0.004 | $0.002 |
| face-commit | $0.0001 | $0.0005 | $0.0002 |
| **TOTAL** | **$0.0024** | **$0.0115** | **$0.0052** |

### SLO Performance

- **Temps E2E (p95):** < 60s
- **Taux succès:** > 95%
- **Confiance moyenne:** > 90%

---

## 🗄️ Structure Données

### Table: user_face_profiles

```sql
CREATE TABLE user_face_profiles (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  active boolean DEFAULT true,
  final_face_params jsonb,      -- 68 paramètres faciaux
  archetype_mix jsonb,           -- Blend archétypes
  skin_tone jsonb,               -- Couleur peau faciale
  head_model_url text,           -- URL modèle 3D
  preview_url text,              -- Preview image
  resolved_gender gender_enum,
  created_at timestamptz,
  updated_at timestamptz,

  -- Résultats pipeline
  estimate_result jsonb,
  match_result jsonb,
  semantic_result jsonb,
  refine_result jsonb,

  -- Métadonnées
  client_scan_id text,
  photos_metadata jsonb
);

-- RLS
ALTER TABLE user_face_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own face profiles"
  ON user_face_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

### Table: face_archetypes

```sql
CREATE TABLE face_archetypes (
  id text PRIMARY KEY,
  name text NOT NULL,
  gender gender_enum,
  face_shape face_shape_enum,
  eye_shape eye_shape_enum,
  nose_type nose_type_enum,
  lip_fullness lip_fullness_enum,
  face_values jsonb,             -- Paramètres morphologiques
  face_embedding vector(256),    -- Vector similarity search
  preview_path text,
  created_at timestamptz
);

-- Index vector
CREATE INDEX face_archetypes_embedding_idx
  ON face_archetypes
  USING ivfflat (face_embedding vector_cosine_ops);
```

---

## 🎨 Intégration Frontend

### Hook: useFaceScanData

```typescript
import { useQuery } from '@tanstack/react-query';

export function useFaceScanData() {
  return useQuery({
    queryKey: ['face:profile', 'current'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_face_profiles')
        .select('*')
        .eq('active', true)
        .maybeSingle();

      return data;
    },
    staleTime: 24 * 60 * 60 * 1000  // 24h
  });
}
```

### Composant: FaceViewer3D

```typescript
import { Avatar3DViewer } from '@/components/3d/Avatar3DViewer';

export function FaceViewer3D({ faceData }: { faceData: FaceProfile }) {
  return (
    <Avatar3DViewer
      morphData={faceData.final_face_params}
      skinTone={faceData.skin_tone}
      renderMode="face-only"
      quality="high"
      controls={{
        rotation: true,
        zoom: true,
        pan: false
      }}
    />
  );
}
```

---

## 📊 Indicateurs Bien-être

### Analyse Wellness

Le pipeline facial extrait plusieurs indicateurs de bien-être:

**Qualité Peau:**
- Texture et éclat
- Hydratation
- Signes de fatigue

**Stress:**
- Tension faciale
- Rides d'expression
- Cernes

**Sommeil:**
- Poches sous yeux
- Teint
- Éclat du regard

**Hydratation:**
- Texture peau
- Lèvres
- Zones déshydratées

### Recommandations AI

```typescript
interface WellnessRecommendations {
  priority: 'high' | 'medium' | 'low';
  category: 'skincare' | 'sleep' | 'hydration' | 'stress';
  recommendations: Array<{
    title: string;
    description: string;
    expectedImpact: string;
    timeline: string;
  }>;
}
```

---

## 🔗 Intégration Body + Face

### Avatar Complet

Combine body scan + face scan pour avatar complet:

```typescript
interface CombinedAvatar {
  body: {
    morph3d: Record<string, number>;
    limb_masses: Record<string, number>;
    skin_tone: SkinTone;
  };
  face: {
    face_params: Record<string, number>;
    skin_tone: SkinTone;
    facial_features: FacialFeatures;
  };
  combined: {
    full_avatar_url: string;
    skin_tone_unified: SkinTone;  // Harmonisé corps+face
    render_ready: boolean;
  };
}
```

### Viewer Unifié

```tsx
<Avatar3DViewer
  bodyData={bodyMorphology}
  faceData={faceMorphology}
  renderMode="combined"
  skinToneBlend="weighted"  // Harmonise teintes
  quality="ultra"
/>
```

---

## 📞 Références

### Fichiers Clés

**Frontend:**
- Pipeline: `src/app/pages/FaceScan/FaceScanPhotoCaptureStep.tsx`
- Viewer: `src/components/3d/FaceViewer3D.tsx`
- Onglet Face: `src/app/pages/Avatar/tabs/FaceTab.tsx`
- Repository: `src/system/data/repositories/faceScanRepo.ts`

**Backend:**
- Edge Functions: `supabase/functions/face-*`
- Migrations: `supabase/migrations/*face*`

### Documentation Connexe

- [Pipeline Body Scan](../body-forge/PIPELINE.md)
- [Onglets Avatar](../body-forge/TABS.md)
- [API Reference](../../api/FACE_FORGE.md)

---

*Documentation maintenue à jour. Dernière révision: Octobre 2025*
