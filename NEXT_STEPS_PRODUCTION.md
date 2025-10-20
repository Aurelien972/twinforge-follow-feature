# Prochaines étapes pour la production

## ✅ Ce qui a été fait

Toutes les corrections nécessaires ont été appliquées pour résoudre:
1. L'affichage "0 tokens/mois" sur les cartes de plans
2. Les erreurs lors de la création de session de paiement Stripe

### Modifications effectuées:
- ✅ Migration de la base de données pour standardiser `tokens_monthly` → `tokens_per_month`
- ✅ Mise à jour de toutes les fonctions Edge (stripe-webhooks, create-checkout-session, reset-monthly-tokens)
- ✅ Mise à jour des scripts de gestion Stripe
- ✅ Mise à jour des fonctions SQL (get_plan_by_stripe_price_id)
- ✅ Build du projet vérifié et réussi

## 🚀 Actions requises pour la production

### 1. Vérifier la configuration actuelle de la base de données

Les stripe_price_id sont déjà configurés dans votre base de données:

```
pro_19: price_1SK5h132IDQ30bQjnuIs8Xx1
starter_9: price_1SK5h332IDQ30bQjoyBZcYzK
elite_39: price_1SK5h132IDQ30bQjm7goDQYQ
expert_49: price_1SK5h232IDQ30bQjpdI68oZq
master_59: price_1SK5h232IDQ30bQjPBStUXUs
premium_29: price_1SK5h332IDQ30bQjECPv6K9m
ultimate_99: price_1SK5h432IDQ30bQjMAWveek2
```

### 2. Vérifier dans Stripe Dashboard

1. Connectez-vous à https://dashboard.stripe.com
2. Allez dans **Products** → **Subscriptions**
3. Vérifiez que chaque Price ID ci-dessus existe et correspond bien aux prix attendus:
   - Starter (9€), Pro (19€), Premium (29€), Elite (39€), Expert (49€), Master (59€), Ultimate (99€)

### 3. Si les produits n'existent PAS dans Stripe

Si ces Price IDs n'existent pas dans Stripe (par exemple, ils ont été créés en mode test mais vous êtes en production):

```bash
# Configurez votre clé Stripe dans scripts/.env.stripe
cp scripts/.env.stripe.example scripts/.env.stripe
# Éditez le fichier et ajoutez votre STRIPE_SECRET_KEY

# Créez les produits en mode live
npm run stripe:create:live

# Vérifiez qu'ils sont bien créés
npm run stripe:verify:live
```

### 4. Si vous utilisez le mode Test de Stripe

```bash
# Utilisez les scripts en mode test
npm run stripe:create:test
npm run stripe:verify:test
```

### 5. Déployer les modifications

Une fois que vous avez vérifié que tout est correct:

```bash
# Déployez votre application
# (votre commande de déploiement habituelle)
```

## 🧪 Test en développement

Pour tester localement avant le déploiement:

1. **Vérifiez l'affichage des tokens:**
   - Allez sur `/settings?tab=subscription`
   - Vous devriez voir les nombres de tokens corrects sur chaque carte de plan
   - Plus de "0 tokens / mois"

2. **Testez la souscription:**
   - Cliquez sur "Choisir ce plan" pour un plan
   - Vérifiez que vous êtes bien redirigé vers Stripe
   - La page Stripe Checkout devrait s'afficher correctement

## 📊 Monitoring après déploiement

Surveillez les logs des Edge Functions pour détecter d'éventuels problèmes:

```bash
# Dans Supabase Dashboard:
Edge Functions → create-checkout-session → Logs
Edge Functions → stripe-webhooks → Logs
```

Recherchez:
- ❌ Erreurs "stripe_price_id not configured"
- ❌ Erreurs "Plan not found"
- ✅ Messages "Session created successfully"

## 🆘 En cas de problème

### L'affichage montre toujours "0 tokens/mois"

1. Vérifiez que la migration a bien été appliquée:
   ```sql
   SELECT subscription_plans->'pro_19' FROM token_pricing_config WHERE is_active = true;
   ```
   Vous devriez voir `tokens_per_month` dans le résultat.

2. Videz le cache du navigateur et rechargez

### Erreur "stripe_price_id not configured"

1. Vérifiez que les Price IDs sont bien dans la base:
   ```sql
   SELECT subscription_plans FROM token_pricing_config WHERE is_active = true;
   ```

2. Si manquants, exécutez le script de création de produits Stripe

### Erreur Stripe 400 lors du paiement

1. Vérifiez que le Price ID existe dans Stripe Dashboard
2. Vérifiez que le mode (test/live) correspond entre votre app et Stripe
3. Consultez les logs détaillés de l'Edge Function create-checkout-session

## 📝 Notes importantes

- **Mode Test vs Live**: Assurez-vous que votre clé Stripe (dans les variables d'environnement Supabase) correspond au mode que vous utilisez
- **Webhooks**: Configurez les webhooks Stripe pour pointer vers votre Edge Function stripe-webhooks
- **Prix**: Si vous modifiez les prix, vous devrez recréer les produits dans Stripe et mettre à jour les Price IDs dans la base

## ✨ Résultat attendu

Après ces étapes:
- ✅ Les tokens mensuels s'affichent correctement sur toutes les cartes de plans
- ✅ Les utilisateurs peuvent souscrire aux plans sans erreur
- ✅ Les paiements sont traités correctement via Stripe
- ✅ Les tokens sont alloués automatiquement après paiement

---

**Temps estimé**: 10-15 minutes pour vérifier et déployer
**Complexité**: Faible (principalement de la vérification)
