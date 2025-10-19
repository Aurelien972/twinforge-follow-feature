# 🚨 Fix Rapide: Erreur HTTP 500 Voice Realtime

## Le Problème

Votre système vocal ne fonctionne pas en production et affiche:
```
❌ Session creation failed: HTTP 500
❌ Unable to connect to voice service
```

## La Solution (5 minutes)

### Étape 1: Obtenir une clé OpenAI

1. Allez sur https://platform.openai.com/api-keys
2. Cliquez "Create new secret key"
3. Copiez la clé (commence par `sk-`)

### Étape 2: Configurer dans Supabase

1. Ouvrez https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Menu latéral → **Edge Functions**
4. Trouvez `voice-coach-realtime`
5. Onglet **Secrets** → **New secret**
6. Nom: `OPENAI_API_KEY`
7. Valeur: Collez votre clé `sk-...`
8. **Save**

### Étape 3: Déployer les Améliorations

```bash
# Si vous avez la CLI Supabase installée
supabase functions deploy voice-coach-realtime

# Sinon, le code sera déployé au prochain push
```

### Étape 4: Tester

```bash
# Option A: Test automatique
./test-voice-realtime-production.sh

# Option B: Test manuel
# Ouvrez votre app en production et testez le vocal
```

## Vérification Rapide

Testez que la clé est configurée:

```bash
curl -H "apikey: VOTRE_SUPABASE_ANON_KEY" \
     "https://VOTRE_PROJECT.supabase.co/functions/v1/voice-coach-realtime/health"
```

Vous devriez voir:
```json
{
  "status": "ok",
  "hasOpenAIKey": true,
  "message": "Edge function is configured and ready for WebRTC"
}
```

## Améliorations Incluses

✅ Retry automatique en cas d'erreur temporaire
✅ Logs détaillés pour diagnostic
✅ Nouveau modèle OpenAI (December 2024)
✅ Timeout de 30s pour éviter les blocages
✅ Messages d'erreur explicites

## Documentation Complète

Pour plus de détails, consultez:
- **Setup complet**: `VOICE_REALTIME_PRODUCTION_SETUP.md`
- **Résumé des changements**: `VOICE_REALTIME_FIX_SUMMARY.md`
- **Script de test**: `test-voice-realtime-production.sh`

## Besoin d'Aide ?

1. Vérifiez que votre compte OpenAI a des crédits
2. Consultez https://status.openai.com/ pour le statut du service
3. Examinez les logs dans Supabase Dashboard → Edge Functions → Logs
4. Cherchez "OPENAI_API_KEY" dans les logs pour voir les erreurs

---

**Note**: Après avoir configuré la clé, attendez 30 secondes avant de tester.
