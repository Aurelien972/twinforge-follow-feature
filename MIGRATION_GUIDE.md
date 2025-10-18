# Migration Guide: Inline Styles to Utility Classes

## Overview

This guide helps migrate inline gradient and animation styles to the new centralized utility classes for better performance and maintainability.

## Why Migrate?

### Benefits
- **Better Performance:** CSS classes are cached by browsers
- **Smaller Bundle:** Reuse reduces HTML size
- **Easier Maintenance:** Change once, apply everywhere
- **Type Safety:** Can add TypeScript definitions
- **Consistency:** Enforces design system

### Performance Impact
- HTML size: -5-10%
- CSS cache hit rate: +40-50%
- Bundle size: Slightly larger CSS, but better compression
- Runtime performance: Faster style recalculation

## Gradient Migration

### Brand Gradients

#### Orange (Logo)
```tsx
// Before
<div style={{
  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)'
}} />

// After
<div className="gradient-brand-orange" />

// Simplified version (2 colors)
<div className="gradient-brand-orange-simple" />

// Hover state
<div className="gradient-brand-orange-hover" />
```

#### Cyan
```tsx
// Before
<div style={{
  background: 'linear-gradient(135deg, #06B6D4 0%, #18E3FF 100%)'
}} />

// After
<div className="gradient-brand-cyan" />
```

#### Indigo & Violet
```tsx
<div className="gradient-brand-indigo" />
<div className="gradient-brand-violet" />
```

### Glass Effect Gradients

```tsx
// Primary glass gradient
<div className="gradient-glass-primary" />

// Secondary glass gradient
<div className="gradient-glass-secondary" />

// Tricolor gradient
<div className="gradient-glass-tricolor" />

// Light glass highlight
<div className="gradient-glass-light" />

// Ambient glow
<div className="gradient-glass-ambient" />
```

### Status Gradients

```tsx
// Success
<div className="gradient-success" />

// Warning
<div className="gradient-warning" />

// Error
<div className="gradient-error" />

// Info
<div className="gradient-info" />
```

### Feature Gradients

```tsx
// Training page
<div className="gradient-training" />

// Nutrition page
<div className="gradient-nutrition" />

// Activity page
<div className="gradient-activity" />

// Fasting page
<div className="gradient-fasting" />

// Avatar page
<div className="gradient-avatar" />
```

### Background Gradients

```tsx
// Dark background
<div className="gradient-bg-dark" />

// Darker background
<div className="gradient-bg-darker" />

// Ambient light
<div className="gradient-bg-ambient" />

// Spotlight effect
<div className="gradient-bg-spotlight" />
```

### Shimmer Effects

```tsx
// Standard shimmer (for loading states)
<div className="gradient-shimmer gradient-shimmer-animated" />

// Skeleton loading
<div className="gradient-skeleton" />
```

### Radial Gradients

```tsx
// Corner highlight
<div className="gradient-radial-highlight" />

// Glows
<div className="gradient-radial-glow-cyan" />
<div className="gradient-radial-glow-orange" />
<div className="gradient-radial-glow-indigo" />
```

### Text Gradients

```tsx
// Brand text gradient
<h1 className="gradient-text-brand">Title</h1>

// Cyan text
<span className="gradient-text-cyan">Accent</span>

// Premium white text
<h2 className="gradient-text-premium">Premium</h2>
```

### Border Gradients

```tsx
// Using wrapper class
<div className="gradient-border-wrapper">
  <div className="content">...</div>
</div>

// Or direct classes
<div className="gradient-border-primary" />
<div className="gradient-border-glow" />
<div className="gradient-border-active" />
```

## Animation Migration

All keyframes are now globally available. No need to define them in each file.

### Fade Animations

```tsx
// Before
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// After (in performance mode or as fallback)
<div className="animate-fadeIn">
  Content
</div>

// Or use CSS directly
<div style={{ animation: 'fadeIn 0.3s ease-out' }}>
  Content
</div>
```

Available fade animations:
- `fadeIn`
- `fadeOut`
- `fade-in-mobile`
- `fadeInUp`

### Slide Animations

```tsx
// Slide in from bottom
<div style={{ animation: 'slideInUp 0.3s ease-out' }}>
  Content
</div>

// Slide out to bottom
<div style={{ animation: 'slideOutDown 0.3s ease-in' }}>
  Content
</div>

// Mobile slide
<div style={{ animation: 'slide-in-mobile 0.3s ease-out' }}>
  Content
</div>
```

### Scale Animations

```tsx
// Scale in
<div style={{ animation: 'scaleIn 0.3s ease-out' }}>
  Content
</div>

// Scale out
<div style={{ animation: 'scaleOut 0.3s ease-in' }}>
  Content
</div>

// Spring effect
<div style={{ animation: 'spring-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
  Content
</div>
```

### Shimmer & Pulse

```tsx
// Shimmer effect
<div style={{ animation: 'shimmerPass 2s ease-in-out infinite' }}>
  Content
</div>

// Border pulse
<div style={{ animation: 'borderPulse 2s ease-in-out infinite' }}>
  Content
</div>

// Glow pulse
<div style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
  Content
</div>

// Breathing effect
<div style={{ animation: 'breathing-glow 3s ease-in-out infinite' }}>
  Content
</div>
```

### Loading States

```tsx
// Skeleton loader
<div className="gradient-skeleton" style={{ animation: 'skeleton-pulse 2s ease-in-out infinite' }}>
  Loading...
</div>

// Dots loading
<span style={{ animation: 'dot-pulse 1.4s infinite' }}>•</span>

// Spin loader
<div style={{ animation: 'spin 1s linear infinite' }}>
  ⟳
</div>
```

## Advanced Examples

### Combining Gradient + Animation

```tsx
// Shimmer gradient that animates
<div className="gradient-shimmer gradient-shimmer-animated">
  Loading...
</div>

// Border gradient with pulse
<div className="gradient-border-wrapper">
  <div className="content" style={{ animation: 'borderPulse 2s infinite' }}>
    Content
  </div>
</div>
```

### Conditional Classes

```tsx
// Using clsx for conditional gradients
import clsx from 'clsx';

<div className={clsx(
  'base-class',
  isTraining && 'gradient-training',
  isNutrition && 'gradient-nutrition',
  isActive && 'gradient-shimmer-animated'
)}>
  Content
</div>
```

### With Framer Motion (Quality Mode)

```tsx
import { ConditionalMotion } from '@/lib/motion';

// This uses framer-motion in quality mode, CSS in performance mode
<ConditionalMotion
  className="gradient-brand-orange"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Button
</ConditionalMotion>
```

## Migration Strategy

### Phase 1: New Components (Current)
- Use utility classes in all new components
- Reduces tech debt from day one

### Phase 2: High-Traffic Components (Next)
- Migrate most-visited pages first
- Measure performance impact
- Prioritize mobile-heavy pages

### Phase 3: Gradual Migration
- Migrate during regular maintenance
- No rush - both approaches work
- Update when touching related code

### Phase 4: Cleanup (Future)
- Remove unused inline styles
- Add TypeScript types
- Generate documentation

## Performance Considerations

### When to Use Inline Styles
- Truly dynamic values (user-generated colors)
- One-off unique styles
- Prototyping / experimentation

### When to Use Utility Classes
- Repeated patterns
- Design system colors
- Brand gradients
- Standard animations
- Production code

### Optimization Tips
1. Prefer utility classes for static styles
2. Use inline for dynamic, computed values
3. Combine classes with CSS variables for flexibility
4. Use performance mode classes on mobile

## TypeScript Support (Future)

```tsx
// Future: Type-safe gradient classes
type GradientClass =
  | 'gradient-brand-orange'
  | 'gradient-brand-cyan'
  | 'gradient-glass-primary'
  // ... more

interface GradientProps {
  gradient?: GradientClass;
}

const MyComponent = ({ gradient }: GradientProps) => (
  <div className={gradient}>Content</div>
);
```

## Testing

### Visual Regression
- Compare screenshots before/after migration
- Test on multiple devices
- Check hover states
- Verify animations

### Performance Testing
```bash
# Lighthouse CI
npm run lighthouse

# Bundle analyzer
npm run analyze

# Runtime performance
Chrome DevTools > Performance
```

## Common Issues & Solutions

### Issue: Gradient not showing
```tsx
// Wrong - needs a size
<div className="gradient-brand-orange" />

// Right - ensure element has dimensions
<div className="gradient-brand-orange" style={{ width: '100%', height: '100px' }} />
```

### Issue: Animation not working
```tsx
// Wrong - animation name mismatch
<div style={{ animation: 'fade-in 0.3s' }} />

// Right - use exact keyframe name
<div style={{ animation: 'fadeIn 0.3s' }} />
```

### Issue: Hover not working on mobile
✅ This is intentional! Hover effects are disabled on touch devices for performance.

### Issue: Shimmer stopped animating
```tsx
// Need both classes
<div className="gradient-shimmer gradient-shimmer-animated" />
```

## Reference

- Gradient utilities: `src/styles/utilities/gradients.css`
- Keyframes: `src/styles/utilities/keyframes.css`
- Performance modes: `src/styles/optimizations/performance-modes.css`
- Examples: See `PERFORMANCE_AUDIT_SUMMARY.md`

## Questions?

Check the documentation or reach out to the team. Happy optimizing! 🚀
