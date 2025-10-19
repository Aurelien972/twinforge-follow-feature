# Scripts Stripe

Scripts automatisés pour la gestion des produits Stripe.

## 🚀 Démarrage rapide

### 1. Configuration

Ajoutez vos clés Stripe à `.env`:

```bash
# Mode Test (développement)
STRIPE_TEST_SECRET_KEY=sk_test_...

# Mode Live (production)
STRIPE_LIVE_SECRET_KEY=sk_live_...
```

### 2. Installation

```bash
npm install
```

### 3. Créer les produits (mode test)

```bash
npm run stripe:setup
```

Ou étape par étape:

```bash
# Créer les produits
npm run stripe:create:test

# Vérifier les produits
npm run stripe:verify:test
```

## 📝 Scripts disponibles

### Création de produits

```bash
# Mode test
npm run stripe:create:test
node scripts/create-stripe-products.js --mode=test

# Mode production
npm run stripe:create:live
node scripts/create-stripe-products.js --mode=live
```

**Ce que fait ce script:**
- Lit la configuration depuis `token_pricing_config`
- Crée 7 produits Stripe (Essential à Titan)
- Configure les prix mensuels en EUR
- Met à jour automatiquement la base de données
- Affiche un rapport détaillé

### Vérification

```bash
# Mode test
npm run stripe:verify:test
node scripts/verify-stripe-products.js --mode=test

# Mode production
npm run stripe:verify:live
node scripts/verify-stripe-products.js --mode=live
```

**Ce que fait ce script:**
- Vérifie que tous les Price IDs sont configurés
- Valide que les produits existent dans Stripe
- Compare les prix entre Stripe et Supabase
- Détecte les incohérences

### Setup complet (test)

```bash
npm run stripe:setup
```

Équivalent à:
```bash
npm run stripe:create:test && npm run stripe:verify:test
```

## 📊 Plans créés

| Plan | Prix | Tokens/mois |
|------|------|-------------|
| Essential | 9€ | 150,000 |
| Pro | 19€ | 350,000 |
| Elite | 29€ | 600,000 |
| Champion | 39€ | 900,000 |
| Master | 49€ | 1,200,000 |
| Legend | 59€ | 1,600,000 |
| Titan | 99€ | 3,000,000 |

## 🔧 Dépannage

### "STRIPE_TEST_SECRET_KEY non définie"

Ajoutez la clé à votre `.env`:
```bash
STRIPE_TEST_SECRET_KEY=sk_test_votre_cle_ici
```

### "No active pricing configuration found"

Appliquez la migration du système de tokens:
```bash
supabase db push
```

### Les produits existent déjà

Archivez les anciens produits dans le Stripe Dashboard avant de relancer le script.

## 📚 Documentation complète

Voir [docs/STRIPE_PRODUCTS_SETUP.md](../docs/STRIPE_PRODUCTS_SETUP.md) pour:
- Guide complet étape par étape
- Résolution de problèmes avancée
- Workflow de déploiement
- Fonctions SQL utilitaires
- Checklist de production

## 🔐 Sécurité

- Ne commitez jamais les clés secrètes
- Testez toujours en mode test avant production
- Les scripts utilisent uniquement les clés depuis `.env`
