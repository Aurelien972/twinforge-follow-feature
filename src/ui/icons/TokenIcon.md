# TokenIcon Component

Un composant d'icône de jeton personnalisé avec le gradient orange signature de TwinForge.

## Design

Le TokenIcon représente un jeton circulaire avec un "T" en Montserrat ExtraBold au centre, utilisant le même gradient que le logo :
- Start: `#FF6B35`
- Mid: `#F7931E`
- End: `#FDC830`

## Utilisation

```tsx
import TokenIcon from '@/ui/icons/TokenIcon';

// Usage de base
<TokenIcon size={32} />

// Avec variante
<TokenIcon size={40} variant="warning" />

// Avec glow désactivé
<TokenIcon size={28} variant="success" withGlow={false} />
```

## Props

### `size?: number`
Taille de l'icône en pixels (défaut: 32)

### `variant?: 'normal' | 'warning' | 'critical' | 'success'`
Variante de couleur du jeton :
- `normal` : Gradient orange (défaut)
- `warning` : Gradient orange-jaune (solde moyen)
- `critical` : Gradient rouge (solde faible)
- `success` : Gradient vert (solde élevé)

### `withGlow?: boolean`
Active/désactive l'effet de glow autour du jeton (défaut: true)

### `className?: string`
Classes CSS additionnelles pour personnalisation

## Exemples d'utilisation

### Widget de solde
```tsx
<TokenIcon
  size={36}
  variant={balance < 50 ? 'critical' : balance < 200 ? 'warning' : 'success'}
  withGlow={true}
/>
```

### Historique de transactions
```tsx
<TokenIcon
  size={28}
  variant={transaction.type === 'consume' ? 'warning' : 'success'}
  withGlow={false}
/>
```

### Section informative
```tsx
<TokenIcon size={32} variant="normal" withGlow={false} />
```

## Cohérence visuelle

Le TokenIcon utilise les mêmes couleurs de gradient que :
- Le logo TwinForge (partie "FØRGE")
- Le favicon mis à jour
- Les éléments de l'interface liés aux tokens

Cette cohérence renforce l'identité visuelle de la marque et améliore la reconnaissance du système de tokens.
