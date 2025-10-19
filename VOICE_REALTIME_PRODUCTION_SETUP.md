# Voice Realtime Production Setup Guide

## Date
19 Octobre 2025

## Problème Résolu

L'erreur HTTP 500 lors de la création de session WebRTC avec OpenAI Realtime API en production. Cette erreur était causée par une configuration manquante ou incorrecte de la clé API OpenAI dans les secrets Supabase Edge Functions.

---

## Configuration Production - Étapes Obligatoires

### 1. Obtenir une Clé API OpenAI

#### Étapes:

1. Créez un compte OpenAI sur https://platform.openai.com/signup si vous n'en avez pas
2. Connectez-vous à votre compte OpenAI
3. Naviguez vers https://platform.openai.com/api-keys
4. Cliquez sur "Create new secret key"
5. Donnez un nom à votre clé (ex: "TwinForgeFit Production")
6. **IMPORTANT**: Copiez la clé immédiatement (elle commence par `sk-`)
7. Conservez cette clé en sécurité (vous ne pourrez plus la voir)

#### Vérifications importantes:

- ✅ La clé doit commencer par `sk-`
- ✅ Vérifiez que votre compte OpenAI a des crédits suffisants
- ✅ Assurez-vous que l'API Realtime est accessible depuis votre compte
- ✅ Vérifiez les quotas et limites de votre compte OpenAI

---

### 2. Configurer la Clé dans Supabase Edge Functions

#### Méthode 1: Via le Dashboard Supabase (Recommandé)

1. Connectez-vous à votre projet Supabase: https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Dans le menu latéral, allez à **Edge Functions**
4. Trouvez la fonction `voice-coach-realtime`
5. Cliquez sur l'onglet **Secrets**
6. Cliquez sur **"New secret"** ou **"Add secret"**
7. Nom du secret: `OPENAI_API_KEY`
8. Valeur: Collez votre clé OpenAI (commençant par `sk-`)
9. Cliquez sur **Save** ou **Add**

#### Méthode 2: Via la CLI Supabase

```bash
# Installer la CLI Supabase si nécessaire
npm install -g supabase

# Se connecter à votre projet
supabase login

# Lier votre projet local au projet distant
supabase link --project-ref votre-project-ref

# Configurer le secret
supabase secrets set OPENAI_API_KEY=sk-votre-cle-openai-complete

# Vérifier que le secret est configuré
supabase secrets list
```

---

### 3. Déployer l'Edge Function (Si Nécessaire)

Si vous avez modifié le code de l'Edge Function, déployez-la:

```bash
# Déployer la fonction voice-coach-realtime
supabase functions deploy voice-coach-realtime

# Vérifier le déploiement
supabase functions list
```

**Note**: Les secrets sont persistés indépendamment des déploiements. Une fois configurés, ils restent actifs même après un nouveau déploiement.

---

### 4. Tester la Configuration

#### Test Automatique avec le Script

Exécutez le script de test fourni:

```bash
# Rendre le script exécutable (première fois seulement)
chmod +x test-voice-realtime-production.sh

# Exécuter le test
./test-voice-realtime-production.sh
```

Le script va:
- ✅ Vérifier les variables d'environnement
- ✅ Tester le endpoint health
- ✅ Confirmer que OPENAI_API_KEY est configurée
- ✅ Vérifier l'accessibilité de l'endpoint session

#### Test Manuel via l'Application

1. Ouvrez votre application déployée en production
2. Naviguez vers une page avec le chat vocal
3. Cliquez sur le bouton microphone/voix
4. Autorisez l'accès au microphone si demandé
5. Parlez quelques mots
6. Vérifiez que:
   - La transcription apparaît
   - Le coach répond vocalement
   - Aucune erreur HTTP 500 n'apparaît

---

## Améliorations Implémentées

### 1. Mise à Jour du Modèle

**Avant**: `gpt-4o-realtime-preview-2024-10-01`
**Après**: `gpt-4o-realtime-preview-2024-12-17`

Le nouveau modèle offre:
- Meilleures performances (30.5% vs 20.6% sur MultiChallenge)
- Function calling amélioré (66.5% vs 49.7% sur ComplexFuncBench)
- Gestion native des appels de fonction longs

### 2. Validation Améliorée de la Clé API

Ajout d'une fonction `validateApiKey()` qui vérifie:
- ✅ La clé existe
- ✅ La clé commence par `sk-`
- ✅ La clé a une longueur suffisante

Messages d'erreur détaillés avec steps de troubleshooting.

### 3. Retry Logic avec Backoff Exponentiel

En cas d'erreur 5xx temporaire:
- Retry automatique jusqu'à 2 fois
- Backoff: 1s, 2s, 4s (max 5s)
- Logs détaillés de chaque tentative

### 4. Timeout de 30 Secondes

Protection contre les requêtes qui ne répondent jamais:
```typescript
signal: AbortSignal.timeout(30000)
```

### 5. Logs Enrichis

Tous les logs incluent maintenant:
- `timestamp`: Date ISO précise
- `requestId`: UUID unique par requête
- `environment`: 'production'
- `service`: 'voice-coach-realtime'
- Contexte détaillé de chaque étape

### 6. Messages d'Erreur Structurés

Format JSON standardisé pour toutes les erreurs:
```json
{
  "error": "Description courte",
  "details": "Détails techniques",
  "troubleshooting": {
    "step1": "Action à prendre",
    "step2": "Vérification suivante",
    ...
  }
}
```

---

## Troubleshooting

### Erreur: "OPENAI_API_KEY is not set in environment"

**Cause**: Le secret n'est pas configuré dans Supabase

**Solution**:
1. Suivez la section "2. Configurer la Clé dans Supabase Edge Functions"
2. Vérifiez que le nom du secret est exactement `OPENAI_API_KEY`
3. Attendez 30 secondes après la configuration
4. Réessayez

---

### Erreur: "OPENAI_API_KEY format is invalid"

**Cause**: La clé API ne commence pas par `sk-`

**Solution**:
1. Vérifiez votre clé OpenAI sur https://platform.openai.com/api-keys
2. Assurez-vous de copier la clé complète (commence par `sk-`)
3. Reconfigurez le secret avec la bonne clé

---

### Erreur: "OpenAI API error 401"

**Cause**: La clé API est invalide ou révoquée

**Solution**:
1. Vérifiez que votre clé n'a pas été révoquée
2. Créez une nouvelle clé sur https://platform.openai.com/api-keys
3. Mettez à jour le secret dans Supabase
4. Réessayez

---

### Erreur: "OpenAI API error 429"

**Cause**: Limite de taux atteinte ou crédits insuffisants

**Solution**:
1. Vérifiez vos crédits OpenAI: https://platform.openai.com/account/billing
2. Vérifiez vos quotas: https://platform.openai.com/account/limits
3. Attendez quelques minutes si c'est une limite de taux temporaire
4. Ajoutez des crédits si nécessaire

---

### Erreur: "OpenAI API error 500" (Côté OpenAI)

**Cause**: Problème temporaire du service OpenAI

**Solution**:
1. Le système va automatiquement retry (jusqu'à 2 fois)
2. Vérifiez le statut d'OpenAI: https://status.openai.com/
3. Réessayez dans quelques minutes
4. Si le problème persiste, contactez le support OpenAI

---

### Le test de santé passe mais la session WebRTC échoue

**Causes possibles**:
1. Problème de permissions microphone
2. Navigateur non compatible avec WebRTC
3. Firewall bloquant WebRTC
4. Problème réseau temporaire

**Solutions**:
1. Autorisez l'accès au microphone dans le navigateur
2. Utilisez Chrome, Firefox, ou Safari récent
3. Testez depuis un autre réseau
4. Vérifiez les logs dans la console développeur

---

## Vérification de la Configuration

### Checklist de Production

Avant de déployer en production, vérifiez:

- [ ] OPENAI_API_KEY configurée dans Supabase Edge Functions
- [ ] La clé commence par `sk-` et est valide
- [ ] Le compte OpenAI a des crédits suffisants
- [ ] L'Edge Function `voice-coach-realtime` est déployée
- [ ] Le script de test passe tous les checks
- [ ] Test manuel dans l'application réussit
- [ ] Les logs ne montrent pas d'erreurs 500
- [ ] La transcription fonctionne correctement
- [ ] Les réponses vocales sont audibles

---

## Monitoring et Logs

### Accéder aux Logs Supabase

1. Dashboard Supabase → Edge Functions → voice-coach-realtime
2. Onglet "Logs"
3. Filtrer par niveau (info, warn, error)

### Logs Clés à Surveiller

**Succès**:
```
✅ OPENAI_API_KEY validation passed
✅ Received SDP answer from OpenAI
✅ Returning SDP answer to client
```

**Erreurs**:
```
❌ OPENAI_API_KEY validation failed
❌ OpenAI API returned error response
❌ Failed to create Realtime session
```

### Métriques Importantes

- Taux de succès des sessions WebRTC
- Temps de réponse de l'API OpenAI
- Nombre d'erreurs 500 vs 200
- Coût des appels API (tokens utilisés)

---

## Sécurité

### Bonnes Pratiques

1. **Ne jamais** commiter la clé OpenAI dans le code
2. **Ne jamais** exposer la clé côté client
3. **Toujours** utiliser les secrets Supabase
4. **Régulièrement** vérifier l'utilisation et les coûts
5. **Immédiatement** révoquer une clé compromise

### En Cas de Clé Compromise

1. Allez sur https://platform.openai.com/api-keys
2. Révquez la clé compromise immédiatement
3. Créez une nouvelle clé
4. Mettez à jour le secret dans Supabase:
   ```bash
   supabase secrets unset OPENAI_API_KEY
   supabase secrets set OPENAI_API_KEY=sk-nouvelle-cle
   ```
5. Surveillez votre compte OpenAI pour toute utilisation anormale

---

## Support et Ressources

### Documentation Officielle

- **OpenAI Realtime API**: https://platform.openai.com/docs/guides/realtime
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions
- **Supabase Secrets**: https://supabase.com/docs/guides/functions/secrets

### Liens Utiles

- **OpenAI Status**: https://status.openai.com/
- **OpenAI API Keys**: https://platform.openai.com/api-keys
- **OpenAI Billing**: https://platform.openai.com/account/billing
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## Résumé

L'erreur HTTP 500 en production était causée par l'absence ou la mauvaise configuration de `OPENAI_API_KEY` dans les secrets Supabase Edge Functions.

**Pour résoudre**:
1. Obtenir une clé API OpenAI valide
2. Configurer le secret dans Supabase
3. Tester avec le script fourni
4. Valider dans l'application en production

Les améliorations implémentées (retry logic, validation, logs enrichis, nouveau modèle) assurent une meilleure robustesse et facilitent le diagnostic des problèmes futurs.
