# Résolution du système d'abonnement - Octobre 2025

## Problèmes identifiés

### 1. Affichage des tokens mensuels à 0
**Cause**: Incohérence de nomenclature entre la base de données (`tokens_monthly`) et le code frontend (`tokens_per_month`)

### 2. Échec de création de session de paiement Stripe
**Cause**:
- Stripe Price IDs correctement configurés dans la base de données
- Gestion d'erreur insuffisante dans la fonction Edge
- Validations manquantes avant l'appel à l'API Stripe

## Solutions appliquées

### 1. Standardisation de la nomenclature (Migration 20251020160000)
- ✅ Remplacement de `tokens_monthly` par `tokens_per_month` dans tous les plans
- ✅ Conservation de tous les `stripe_price_id` existants
- ✅ Mise à jour de la table `token_pricing_config`

### 2. Mise à jour des Edge Functions

#### stripe-webhooks/index.ts
- ✅ Support de `tokens_per_month` avec fallback sur `tokens_monthly`
- ✅ Gestion robuste lors de la création d'abonnement

#### create-checkout-session/index.ts
- ✅ Validation stricte des paramètres d'entrée
- ✅ Logs détaillés pour le debugging
- ✅ Messages d'erreur explicites
- ✅ Vérification de l'existence des plans et des Price IDs

#### reset-monthly-tokens/index.ts
- ✅ Déjà compatible avec `tokens_per_month`

### 3. Mise à jour des scripts Stripe

#### create-stripe-products.js
- ✅ Support de `tokens_per_month` et `tokens_monthly`
- ✅ Métadonnées Stripe utilisant `tokens_per_month`

#### verify-stripe-products.js
- ✅ Affichage compatible avec les deux nomenclatures

### 4. Mise à jour des fonctions SQL
- ✅ Fonction `get_plan_by_stripe_price_id()` retourne `tokens_per_month`
- ✅ Fallback sur `tokens_monthly` pour compatibilité

## État actuel de la base de données

Tous les plans sont correctement configurés avec:
- ✅ `tokens_per_month` défini
- ✅ `stripe_price_id` présent pour tous les plans payants
- ✅ Prix en EUR correctement configurés

### Plans disponibles:
- **Free**: 15,000 tokens/mois (essai gratuit)
- **Starter**: 150,000 tokens/mois - 9€
- **Pro**: 350,000 tokens/mois - 19€
- **Premium**: 600,000 tokens/mois - 29€
- **Elite**: 900,000 tokens/mois - 39€
- **Expert**: 1,200,000 tokens/mois - 49€
- **Master**: 1,600,000 tokens/mois - 59€
- **Ultimate**: 3,000,000 tokens/mois - 99€

## Fonctionnement attendu

### 1. Affichage des tokens
Les cartes de plans doivent maintenant afficher correctement le nombre de tokens mensuels au lieu de "0".

### 2. Souscription aux plans
Lors de la sélection d'un plan:
1. Validation des paramètres côté Edge Function
2. Récupération du plan depuis la base de données
3. Vérification du `stripe_price_id`
4. Création de la session Stripe
5. Redirection vers la page de paiement Stripe

### 3. Gestion des erreurs
En cas de problème:
- Messages d'erreur explicites dans les logs
- Feedback clair pour l'utilisateur
- Indication précise de la cause (plan manquant, Price ID non configuré, etc.)

## Actions restantes

### Si les stripe_price_id sont manquants
Exécuter le script de création de produits Stripe:
```bash
npm run stripe:create:test  # Pour le mode test
# ou
npm run stripe:create:live  # Pour la production
```

### Vérification
Pour vérifier que tout est configuré:
```bash
npm run stripe:verify:test  # Pour le mode test
# ou
npm run stripe:verify:live  # Pour la production
```

## Fichiers modifiés

### Migrations
- `20251020160000_standardize_tokens_monthly_to_tokens_per_month.sql`
- `20251020130000_add_stripe_product_management_functions.sql` (fonction mise à jour)

### Edge Functions
- `supabase/functions/stripe-webhooks/index.ts`
- `supabase/functions/create-checkout-session/index.ts`

### Scripts
- `scripts/create-stripe-products.js`
- `scripts/verify-stripe-products.js`

### Aucune modification frontend nécessaire
Le code frontend utilisait déjà la bonne nomenclature `tokens_per_month`.

## Notes importantes

1. **Compatibilité descendante**: Les fonctions supportent temporairement `tokens_monthly` pour éviter tout problème pendant la transition

2. **Stripe**: Les Price IDs doivent être configurés dans Stripe avant de pouvoir souscrire aux plans

3. **Mode test vs production**: Assurez-vous d'utiliser les bons scripts selon l'environnement

4. **Sécurité**: Toutes les fonctions Edge incluent des validations et des logs pour le debugging en production
