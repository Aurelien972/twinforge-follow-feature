# Déploiement Netlify - TwinForgeFit

## Informations du projet Netlify

- **Nom du projet**: fascinating-marshmallow-4b00f8
- **Domaine**: twinforgefit.ai
- **Project ID**: 55cb3e29-7206-4bea-bdfe-4c9bfe188214
- **Owner**: Digital Freedom Caraibe

## Configuration des variables d'environnement

Pour que l'application fonctionne correctement sur Netlify, tu dois configurer les variables d'environnement suivantes dans les paramètres de ton site Netlify :

### Étapes pour configurer les variables d'environnement :

1. Va sur [Netlify Dashboard](https://app.netlify.com)
2. Sélectionne ton site **fascinating-marshmallow-4b00f8**
3. Clique sur **Site settings** → **Environment variables**
4. Ajoute les variables suivantes :

#### Variables Supabase (OBLIGATOIRES)

```
VITE_SUPABASE_URL=https://kwipydbtjagypocpvbwn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aXB5ZGJ0amFneXBvY3B2YnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2ODg0MjIsImV4cCI6MjA3MDI2NDQyMn0.IS5IdKbmnGtgU_AaGYtUgX3ewaNpsiSAui5kbFV31_U
```

## Configuration du build

Le fichier `netlify.toml` a été créé avec la configuration suivante :

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

## Fichiers créés

✅ `netlify.toml` - Configuration principale de Netlify
✅ `public/_redirects` - Redirections pour le routage SPA (React Router)

## Headers de sécurité configurés

Les headers suivants sont automatiquement ajoutés :

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Cache configuré

- **Assets statiques** (`/assets/*`): Cache 1 an (immutable)
- **Service Worker** (`/sw.js`): Pas de cache
- **Manifest PWA**: Cache 1 heure

## Déploiement

Une fois les variables d'environnement configurées, Netlify déploiera automatiquement l'application à chaque push sur la branche principale du repo GitHub.

### Vérifier le déploiement

1. Va sur ton dashboard Netlify
2. Clique sur **Deploys**
3. Tu verras le statut du build en cours
4. Une fois terminé, ton site sera accessible sur **twinforgefit.ai**

## Support PWA

L'application est configurée comme Progressive Web App (PWA) :

- Offline support via Service Worker
- Manifest webmanifest configuré
- Installation possible sur mobile et desktop

## Troubleshooting

### Build échoue

Si le build échoue sur Netlify :

1. Vérifie que les variables d'environnement sont bien configurées
2. Vérifie les logs de build dans l'onglet **Deploys**
3. Assure-toi que la version de Node est compatible (Node 18)

### Routes ne fonctionnent pas

Si les routes React Router ne fonctionnent pas après déploiement :

- Vérifie que le fichier `public/_redirects` est bien présent
- Vérifie la configuration `[[redirects]]` dans `netlify.toml`

### Variables d'environnement non détectées

- Les variables doivent commencer par `VITE_` pour être accessibles dans l'application
- Redémarre le build après avoir ajouté les variables

## Prochaines étapes

1. ✅ Fichiers de configuration créés
2. ⏳ Configure les variables d'environnement dans Netlify
3. ⏳ Push les fichiers sur GitHub
4. ⏳ Netlify déploiera automatiquement
5. ⏳ Vérifie que le site fonctionne sur twinforgefit.ai
