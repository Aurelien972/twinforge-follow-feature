# 🚀 Guide Rapide - Création des Produits Stripe

Ce guide vous permet de créer automatiquement tous les produits Stripe pour TwinForgeFit en quelques minutes.

## ✅ Étapes rapides

### 1. Récupérer vos clés Stripe (2 min)

1. Allez sur https://dashboard.stripe.com
2. Cliquez sur **Developers > API keys**
3. Copiez votre **Secret key** (commence par `sk_test_...`)

### 2. Configurer l'environnement (1 min)

Ajoutez votre clé à `.env`:

```bash
STRIPE_TEST_SECRET_KEY=sk_test_VOTRE_CLE_ICI
```

### 3. Installer les dépendances (1 min)

```bash
npm install
```

### 4. Appliquer la migration SQL (30 sec)

**Option A: Via Supabase CLI**
```bash
supabase db push
```

**Option B: Via Dashboard Supabase**
1. Allez dans votre projet Supabase
2. SQL Editor
3. Copiez le contenu de `supabase/migrations/20251020130000_add_stripe_product_management_functions.sql`
4. Exécutez

### 5. Créer les produits automatiquement (30 sec)

```bash
npm run stripe:setup
```

C'est tout! 🎉

Le script va:
- ✅ Créer 7 produits Stripe (Essential, Pro, Elite, Champion, Master, Legend, Titan)
- ✅ Configurer les prix en EUR
- ✅ Mettre à jour automatiquement votre base de données
- ✅ Afficher un rapport détaillé

## 📊 Résultat

Après l'exécution, vous aurez:

| Produit | Prix | Tokens/mois | Status |
|---------|------|-------------|--------|
| Essential | 9€ | 150,000 | ✅ |
| Pro | 19€ | 350,000 | ✅ |
| Elite | 29€ | 600,000 | ✅ |
| Champion | 39€ | 900,000 | ✅ |
| Master | 49€ | 1,200,000 | ✅ |
| Legend | 59€ | 1,600,000 | ✅ |
| Titan | 99€ | 3,000,000 | ✅ |

## 🧪 Tester un paiement

1. Allez sur votre app `/settings?tab=subscription`
2. Cliquez sur un plan
3. Carte test: `4242 4242 4242 4242`
4. Date: n'importe quelle date future
5. CVC: n'importe quel 3 chiffres

## 🔄 Passer en production

Quand vous êtes prêt:

1. Récupérez votre clé LIVE depuis Stripe Dashboard
2. Ajoutez-la à `.env`:
   ```bash
   STRIPE_LIVE_SECRET_KEY=sk_live_VOTRE_CLE_ICI
   ```
3. Créez les produits en production:
   ```bash
   npm run stripe:create:live
   npm run stripe:verify:live
   ```

## 🆘 Problème?

### Le script ne trouve pas la clé

Vérifiez que votre `.env` contient:
```bash
STRIPE_TEST_SECRET_KEY=sk_test_...
```

### "No active pricing configuration found"

Appliquez d'abord la migration:
```bash
supabase db push
```

### Autre problème

Consultez la documentation complète: `docs/STRIPE_PRODUCTS_SETUP.md`

## 📚 Ressources

- 📖 [Documentation complète](docs/STRIPE_PRODUCTS_SETUP.md)
- 📖 [Guide Stripe principal](STRIPE_SETUP.md)
- 🔧 [Scripts README](scripts/README.md)
- 🌐 [Stripe Dashboard](https://dashboard.stripe.com)

---

**Temps total estimé: 5 minutes** ⏱️
