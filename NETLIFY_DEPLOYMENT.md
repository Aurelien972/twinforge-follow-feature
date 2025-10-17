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

### ❌ Erreur: "Missing environment variables" / "Supabase configuration missing"

**Symptômes:**
- Le site affiche une page blanche
- Console JavaScript affiche: `Missing environment variables. Please check your .env file.`
- Erreur: `Uncaught Error: Supabase configuration missing`

**Cause:**
Les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` ne sont pas configurées dans Netlify.

**Solution:**

1. **Connecte-toi à Netlify:**
   - Va sur https://app.netlify.com
   - Connecte-toi avec ton compte

2. **Accède aux paramètres du site:**
   - Sélectionne le site **fascinating-marshmallow-4b00f8**
   - OU clique directement sur ton domaine **twinforgefit.ai**

3. **Configure les variables d'environnement:**
   - Clique sur **Site settings** (dans le menu de gauche)
   - Clique sur **Environment variables** (dans le menu de gauche)
   - Clique sur **Add a variable** (bouton vert en haut à droite)

4. **Ajoute la première variable:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://kwipydbtjagypocpvbwn.supabase.co`
   - Scopes: Laisse cochés "All scopes" (Production, Deploy Previews, Branch deploys)
   - Clique sur **Create variable**

5. **Ajoute la deuxième variable:**
   - Clique à nouveau sur **Add a variable**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aXB5ZGJ0amFneXBvY3B2YnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2ODg0MjIsImV4cCI6MjA3MDI2NDQyMn0.IS5IdKbmnGtgU_AaGYtUgX3ewaNpsiSAui5kbFV31_U`
   - Scopes: Laisse cochés "All scopes"
   - Clique sur **Create variable**

6. **Redéploie le site:**
   - Va dans l'onglet **Deploys**
   - Clique sur **Trigger deploy** (bouton en haut à droite)
   - Sélectionne **Clear cache and deploy site**
   - Attends que le build se termine (environ 2-3 minutes)

7. **Vérifie que ça fonctionne:**
   - Visite https://twinforgefit.ai
   - Tu devrais maintenant voir le formulaire d'authentification
   - Plus d'erreurs dans la console

**IMPORTANT:** Les variables doivent commencer par `VITE_` pour être accessibles dans l'application Vite côté client.

### Build échoue

Si le build échoue sur Netlify :

1. Vérifie que les variables d'environnement sont bien configurées (voir ci-dessus)
2. Vérifie les logs de build dans l'onglet **Deploys**
3. Assure-toi que la version de Node est compatible (Node 18)
4. Vérifie qu'il n'y a pas d'erreurs TypeScript dans le code

### Routes ne fonctionnent pas

Si les routes React Router ne fonctionnent pas après déploiement :

- Vérifie que le fichier `public/_redirects` est bien présent
- Vérifie la configuration `[[redirects]]` dans `netlify.toml`

### Cache problématique

Si les modifications ne s'affichent pas après un déploiement :

- Fais un "Clear cache and deploy site" depuis l'onglet Deploys
- Vide le cache de ton navigateur (Ctrl+Shift+Delete ou Cmd+Shift+Delete)
- Teste en navigation privée

## Prochaines étapes

1. ✅ Fichiers de configuration créés (.env.example, netlify.toml, _redirects)
2. ⚠️ **ÉTAPE CRITIQUE:** Configure les variables d'environnement dans Netlify (voir instructions détaillées ci-dessus)
3. ✅ Push les fichiers sur GitHub (déjà fait)
4. ⏳ Netlify redéploiera automatiquement après configuration des variables
5. ⏳ Vérifie que le site fonctionne sur twinforgefit.ai

## Checklist rapide pour résoudre l'erreur actuelle

- [ ] Variables d'environnement ajoutées dans Netlify (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
- [ ] Redéploiement déclenché après ajout des variables
- [ ] Build réussi sans erreurs
- [ ] Site accessible sur twinforgefit.ai
- [ ] Formulaire d'authentification visible
- [ ] Pas d'erreurs dans la console du navigateur
