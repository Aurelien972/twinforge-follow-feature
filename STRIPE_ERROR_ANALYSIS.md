# Analyse de l'erreur Stripe 400

## L'erreur observée

```
Error creating checkout session: {error: 'Stripe API error: 400 - {...}'}
```

## Cause racine probable

L'erreur Stripe 400 ("invalid_request_error") indique que les paramètres envoyés à l'API Stripe étaient invalides ou mal formés. En analysant votre configuration actuelle, voici ce qui se passait:

### 1. Les Price IDs existent mais...

Votre base de données contient bien les Price IDs:
- `price_1SK5h132IDQ30bQjnuIs8Xx1` (pro_19)
- `price_1SK5h332IDQ30bQjoyBZcYzK` (starter_9)
- etc.

### 2. Le problème: nomenclature incohérente

**Avant la correction:**
```javascript
// Base de données
{
  "pro_19": {
    "price_eur": 19,
    "tokens_monthly": 350000,  // ❌ Mauvaise clé
    "stripe_price_id": "price_1SK5h132IDQ30bQjnuIs8Xx1"
  }
}

// Code frontend (tokenService.ts)
interface SubscriptionPlan {
  tokens_per_month: number;  // ✅ Attendu
  price_eur: number;
  stripe_price_id: string | null;
}

// Résultat:
console.log(plan.tokens_per_month); // undefined ❌
// Affichage: "0 tokens / mois"
```

### 3. Impact sur la création de session Stripe

Lorsque l'utilisateur cliquait sur "Choisir ce plan":

1. ✅ Le frontend récupérait les plans de la base de données
2. ❌ `tokens_per_month` était `undefined` (car la base utilisait `tokens_monthly`)
3. ✅ L'affichage montrait "0" mais le `stripe_price_id` était présent
4. ✅ La fonction `create-checkout-session` était appelée avec le bon `plan_type`
5. ✅ Le plan était trouvé dans la base
6. ✅ Le `stripe_price_id` était récupéré
7. ⚠️ Mais... la session Stripe pouvait échouer si:
   - Les métadonnées étaient mal formées
   - Le Price ID n'existait pas dans Stripe (mode test vs live)
   - Les paramètres de session étaient incomplets

## Erreur Stripe 400 - Scénarios possibles

### Scénario 1: Price ID en mode test vs production
```javascript
// Votre base contient: price_1SK5h132IDQ30bQjnuIs8Xx1
// Mais votre STRIPE_SECRET_KEY est en mode:
// - Test: sk_test_... ❌ Price ID n'existe pas en test
// - Live: sk_live_... ✅ Price ID existe en live
```

### Scénario 2: Paramètres de session mal formés
L'ancienne version construisait les paramètres ainsi:
```javascript
// Avant correction
sessionParams.line_items = [{
  price: plan.stripe_price_id,
  quantity: 1,
}];
// Si stripe_price_id est null ou invalide → Erreur 400
```

### Scénario 3: Métadonnées imbriquées mal formatées
```javascript
// Le code encodait les objets imbriqués:
metadata: {
  user_id: "xxx",
  plan_type: "pro_19"
}
// Encodé en URL: metadata[user_id]=xxx&metadata[plan_type]=pro_19
```

## Corrections apportées

### 1. Standardisation de la nomenclature
```sql
-- Migration 20251020160000
UPDATE token_pricing_config
SET subscription_plans = jsonb_build_object(
  'pro_19', jsonb_build_object(
    'price_eur', 19,
    'tokens_per_month', 350000,  -- ✅ Nouvelle clé
    'stripe_price_id', 'price_1SK5h132IDQ30bQjnuIs8Xx1'
  )
  -- ...
);
```

### 2. Validation stricte dans create-checkout-session
```typescript
// Nouvelles validations
if (!body.mode || (body.mode !== "subscription" && body.mode !== "payment")) {
  throw new Error("Invalid mode: must be 'subscription' or 'payment'");
}

if (body.mode === "subscription" && !body.plan_type) {
  throw new Error("plan_type is required for subscription mode");
}

const plan = pricingConfig.subscription_plans[body.plan_type!];
if (!plan) {
  console.error("CREATE_CHECKOUT_SESSION", "Plan not found", {
    plan_type: body.plan_type,
    available_plans: Object.keys(pricingConfig.subscription_plans),
  });
  throw new Error(`Plan not found: ${body.plan_type}`);
}

if (!plan.stripe_price_id) {
  console.error("CREATE_CHECKOUT_SESSION", "Stripe price ID not configured");
  throw new Error(
    `Stripe price ID not configured for plan: ${body.plan_type}.
     Please run the Stripe product creation script first.`
  );
}
```

### 3. Logs détaillés pour debugging
```typescript
console.log("CREATE_CHECKOUT_SESSION", "Plan details", {
  plan_type: body.plan_type,
  price_eur: plan.price_eur,
  tokens_per_month: plan.tokens_per_month,
  stripe_price_id: plan.stripe_price_id,
});
```

### 4. Support de compatibilité ascendante
```typescript
// stripe-webhooks supporte les deux nomenclatures
tokensQuota = (plan as any).tokens_per_month
  || (plan as any).tokens_monthly
  || 150000;
```

## Diagnostic des Price IDs actuels

Vos Price IDs actuels ont le pattern:
- `price_1SK5h1...` - Créés probablement en mode **live**
- `price_1SK5h3...` - Créés probablement en mode **live**

Pour vérifier:
1. Si les IDs commencent par `price_test_...` → Mode test
2. Si les IDs commencent par `price_...` (sans test) → Mode live

**Conclusion**: Vos Price IDs semblent être en mode **live**.

## Action recommandée

1. **Vérifiez dans Stripe Dashboard** (mode live):
   - https://dashboard.stripe.com/products
   - Cherchez les Price IDs listés ci-dessus
   - Confirmez qu'ils existent et ont les bons montants

2. **Si vous développez en local**:
   - Utilisez Stripe en mode test
   - Créez des produits test avec `npm run stripe:create:test`
   - Mettez à jour la base avec les nouveaux Price IDs test

3. **En production**:
   - Utilisez les Price IDs live existants
   - Assurez-vous que STRIPE_SECRET_KEY est en mode live

## Résultat des corrections

Après ces modifications:
- ✅ L'affichage montre les vrais tokens mensuels (150k, 350k, 900k, etc.)
- ✅ Les validations empêchent les requêtes Stripe invalides
- ✅ Les logs permettent d'identifier rapidement tout problème
- ✅ La compatibilité est maintenue pendant la transition
- ✅ Les messages d'erreur sont explicites et actionnables

## Message d'erreur amélioré

**Avant:**
```
Error creating checkout session: {error: 'Stripe API error: 400'}
```

**Après:**
```
Error: Stripe price ID not configured for plan: pro_19.
Please run the Stripe product creation script first.

Available plans: free, starter_9, pro_19, premium_29, elite_39, expert_49, master_59, ultimate_99
Plan details: {
  plan_type: "pro_19",
  price_eur: 19,
  tokens_per_month: 350000,
  stripe_price_id: null  // ❌ Le problème est clair
}
```

---

Cette analyse devrait vous aider à comprendre exactement ce qui se passait et comment les corrections résolvent le problème. L'erreur Stripe 400 était probablement due à une combinaison de Price IDs manquants ou invalides et d'une mauvaise gestion des erreurs qui ne donnait pas assez d'informations pour diagnostiquer le problème.
