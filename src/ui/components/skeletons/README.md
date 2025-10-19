# Skeletons System - Atelier Trainings

This directory contains a comprehensive skeleton loading system for the Training Pipeline (Atelier Trainings). The skeleton components provide smooth loading states while data is being fetched or generated, improving perceived performance and user experience.

## Architecture

### Base Components

**SkeletonBase**
- Core skeleton component with shimmer and pulse animations
- Configurable width, height, border radius, and style
- Foundation for all other skeleton components

**SkeletonUtilities**
- Pre-configured skeleton utilities for common patterns:
  - `SkeletonBar`: Rectangular skeleton bars
  - `SkeletonCircle`: Circular skeleton shapes
  - `SkeletonButton`: Button-shaped skeletons
  - `SkeletonText`: Multi-line text skeletons
  - `SkeletonGrid`: Grid layout skeletons
  - `SkeletonCard`: Card container with glass morphism
  - `SkeletonStatBox`: Stat box skeletons

### Animation System

**skeletonAnimations.ts**
- Standardized animation timings
- Reusable animation variants for Framer Motion
- Shimmer and pulse keyframes
- Stagger animation support

## Training Pipeline Skeletons

### Step 1 - Preparer

- **DisciplineSelectorSkeleton**: Discipline selection cards
- **LocationQuickSelectorSkeleton**: Location selection interface
- **PhotoGallerySkeleton**: Photo gallery thumbnails
- **EquipmentChipSkeleton**: Equipment tags/chips
- **ContextGatheringSkeleton**: Complete context gathering screen

### Step 2 - Activer

- **WarmupCardSkeleton**: Warmup exercise cards
- **TrainingPrescriptionCardSkeleton**: Force training prescription cards
- **EnduranceSessionDisplaySkeleton**: Endurance session blocks
- **FunctionalPrescriptionCardSkeleton**: Functional training prescriptions
- **CompetitionStationDisplaySkeleton**: Competition stations
- **AdjustmentButtonsSkeleton**: Adjustment control buttons

### Step 3 - Seance

- **ExerciseSessionCardSkeleton**: Active exercise card during session
- **NextExercisePreviewSkeleton**: Preview of next exercise
- **WarmupPhaseCardSkeleton**: Warmup phase display
- **SessionTimerSkeleton**: Session timer floating card
- **RestCountdownSkeleton**: Rest countdown overlay

### Step 4 - Adapter

- **WearableInsightsCardSkeleton**: Wearable device insights
- **PersonalizedInsightsCardSkeleton**: AI-generated insights

Note: Step 4 also uses existing skeletons:
- `PersonalizedMetricsCardSkeleton`
- `ScoreGlobalCardSkeleton`
- `AnalysisCardSkeleton`
- `BadgesCardSkeleton`

### Step 5 - Avancer

- **NextActionRecommendationCardSkeleton**: Primary action recommendation
- **MotivationalInsightCardSkeleton**: Motivational messages
- **NextSessionRecommendationsCardSkeleton**: Next session suggestions
- **RecoveryStatusCardSkeleton**: Recovery status and metrics
- **ProgressionPathCardSkeleton**: Progression milestones

### Cross-Cutting Components

- **TrainingProgressHeaderSkeleton**: Pipeline progress indicator
- **SavedDraftsCardSkeleton**: Saved draft sessions
- **CurrentGoalCardSkeleton**: Current training goal
- **QuickHistoryCardSkeleton**: Recent session history
- **HeroTrainingCTASkeleton**: Hero CTA card on Today tab

## Usage Guidelines

### Basic Usage

```tsx
import { TrainingPrescriptionCardSkeleton } from '@/ui/components/skeletons';

const MyComponent = () => {
  const { data, isLoading } = useQuery(...);

  if (isLoading) {
    return <TrainingPrescriptionCardSkeleton stepColor="#18E3FF" />;
  }

  return <TrainingPrescriptionCard data={data} />;
};
```

### With AnimatePresence

```tsx
import { AnimatePresence } from 'framer-motion';
import { ExerciseSessionCardSkeleton } from '@/ui/components/skeletons';

const SessionView = () => {
  const { data, isLoading } = useData();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <ExerciseSessionCardSkeleton key="skeleton" stepColor="#18E3FF" />
      ) : (
        <ExerciseSessionCard key="content" data={data} />
      )}
    </AnimatePresence>
  );
};
```

### Progressive Reveal (Step 4 Pattern)

```tsx
import { useProgressiveReveal } from '@/hooks/useProgressiveReveal';
import { PersonalizedMetricsCardSkeleton, ScoreGlobalCardSkeleton } from '@/ui/components/skeletons';

const AnalysisView = () => {
  const { data, isLoading } = useAnalysis();

  const { isVisible } = useProgressiveReveal({
    components: [
      { id: 'metrics', delayMs: 0, dataReady: true },
      { id: 'score', delayMs: 3000, dataReady: !!data }
    ]
  });

  return (
    <>
      {!isVisible('metrics') ? (
        <PersonalizedMetricsCardSkeleton stepColor="#FF6B35" />
      ) : (
        <PersonalizedMetricsCard data={data?.metrics} />
      )}

      {!isVisible('score') ? (
        <ScoreGlobalCardSkeleton stepColor="#FF6B35" />
      ) : (
        <ScoreGlobalCard data={data?.score} />
      )}
    </>
  );
};
```

## Color System

Each skeleton accepts a `stepColor` prop that should match the step's theme color:

- **Step 1 (Preparer)**: `#18E3FF` (Cyan)
- **Step 2 (Activer)**: `#18E3FF` (Cyan) or discipline-specific colors
- **Step 3 (Seance)**: `#18E3FF` (Cyan)
- **Step 4 (Adapter)**: `#FF6B35` (Orange)
- **Step 5 (Avancer)**: Multiple colors based on card type

The stepColor is used to:
- Tint the card background
- Color the border
- Apply glow effects
- Match the overall theme of each step

## Design Principles

1. **Match Final Content**: Skeletons should closely resemble the final component's structure
2. **Smooth Transitions**: Use AnimatePresence for seamless skeleton-to-content transitions
3. **Consistent Animations**: All skeletons use standardized shimmer/pulse animations
4. **Performance**: Skeletons are lightweight and GPU-accelerated
5. **VisionOS Style**: Follow the liquid glass design system with backdrop blur

## Performance Considerations

All skeleton components are fully synchronized with the performance mode system and adapt their behavior based on device capabilities:

### Performance Mode Integration

**High-Performance Mode (Mobile/Low-end devices)**
- Zero GPU usage: All animations disabled
- Static gradients replace animated effects
- No backdrop-filter or box-shadow
- Simple CSS backgrounds only
- Optimized for 60fps on constrained devices

**Balanced Mode (Mid-range devices)**
- Simplified Framer Motion animations
- Reduced animation durations (60% of full)
- Moderate GPU usage
- Balance between smoothness and performance

**Quality Mode (Desktop/High-end devices)**
- Full Framer Motion animations
- Rich visual effects (radial gradients, box-shadows)
- Complex stagger and reveal animations
- Maximum visual quality

### Technical Implementation

- All complex skeletons use `ConditionalMotion` wrapper
- `usePerformanceMode()` hook determines active mode
- GPU-heavy effects conditionally rendered
- CSS-only fallbacks for high-performance mode
- Shimmer effects use `background-position` (GPU-accelerated when available)

### Animation Guidelines

- Use ConditionalMotion instead of direct motion.div
- Check isPerformanceMode for GPU-heavy effects
- Provide static fallbacks for all animations
- Minimize layout shifts between skeleton and real content
- Test on actual mobile devices, not just emulators

## Accessibility

- Skeletons are purely decorative and hidden from screen readers
- Loading states should be announced via aria-live regions
- Ensure sufficient color contrast for visibility

## Testing

When adding new skeletons:
1. Test on mobile and desktop viewports
2. Verify smooth transition to real content
3. Check that layout matches final component
4. Validate animations don't cause performance issues
5. Test with different stepColors

## Maintenance

When updating components:
- Update corresponding skeletons to match new layouts
- Keep skeleton structure in sync with component changes
- Document any new skeleton patterns or utilities
- Ensure backwards compatibility with existing usage
