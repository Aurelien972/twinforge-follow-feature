# Correction de l'API Voice Realtime - Erreur 400

## Problème identifié

L'edge function `voice-coach-realtime` renvoyait systématiquement une erreur 400 avec une réponse vide d'OpenAI:

```json
{
  "error": {
    "message": "",
    "type": "",
    "code": "",
    "param": ""
  }
}
```

## Causes racines

1. **Mauvais endpoint utilisé**: `/v1/realtime/calls` au lieu de `/v1/realtime`
2. **Format de requête incorrect**: Utilisation de `FormData` alors qu'OpenAI attend du SDP brut
3. **Content-Type incorrect**: `multipart/form-data` au lieu de `application/sdp`

## Solution implémentée

### Changements dans l'edge function

**Avant:**
```typescript
// Mauvais endpoint
const response = await fetch(`${OPENAI_REALTIME_API}/calls`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${openaiApiKey}`,
  },
  body: formData, // FormData avec multiples champs
  signal: AbortSignal.timeout(30000),
});
```

**Après:**
```typescript
// Bon endpoint avec query parameters
const url = new URL(`${OPENAI_REALTIME_API}?model=${encodeURIComponent(model)}`);

const response = await fetch(url.toString(), {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${openaiApiKey}`,
    'Content-Type': 'application/sdp', // Content-Type correct
  },
  body: sdpOffer, // SDP brut, pas de FormData
  signal: AbortSignal.timeout(30000),
});
```

## Détails techniques

### Format de requête OpenAI Realtime API

L'API OpenAI Realtime attend:
- **Endpoint**: `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`
- **Method**: `POST`
- **Content-Type**: `application/sdp`
- **Body**: SDP offer brut (chaîne de caractères)
- **Headers**: `Authorization: Bearer <API_KEY>`

### Pourquoi `/v1/realtime/calls` ne fonctionne pas?

D'après la communauté OpenAI:
- `/v1/realtime/calls` est l'endpoint GA (General Availability) mais présente des problèmes de compatibilité
- De nombreux utilisateurs rapportent des erreurs 400 vides avec cet endpoint
- `/v1/realtime` (endpoint beta) fonctionne de manière fiable
- La documentation officielle pointe vers `/v1/realtime/calls` mais l'implémentation recommandée utilise `/v1/realtime`

### Améliorations apportées

1. **Logging amélioré**: Meilleurs messages d'erreur pour le diagnostic
2. **Validation renforcée**: Détection des erreurs 400 avec réponse vide
3. **Gestion d'erreurs**: Recommandations contextuelles en cas d'échec
4. **Documentation**: Commentaires explicatifs dans le code

## Test de la correction

Pour tester la correction:

1. Assurez-vous que votre clé OpenAI est configurée dans Supabase:
   - Dashboard > Edge Functions > Secrets
   - Ajoutez `OPENAI_API_KEY` avec votre clé OpenAI valide

2. Vérifiez que votre clé a accès à l'API Realtime:
   - Connectez-vous à platform.openai.com
   - Vérifiez vos limites d'API et votre niveau d'accès
   - L'API Realtime nécessite un certain niveau de crédit/tier

3. Testez l'endpoint health:
   ```bash
   curl https://your-project.supabase.co/functions/v1/voice-coach-realtime/health
   ```

4. Tentez une connexion vocale depuis l'interface

## Prochaines étapes possibles

Si vous continuez à avoir des erreurs:

1. **Vérifier l'accès à l'API Realtime**: Votre clé OpenAI doit avoir accès à l'API Realtime
2. **Vérifier les crédits**: Assurez-vous d'avoir des crédits disponibles
3. **Tester avec un modèle alternatif**: Essayez `gpt-4o-mini-realtime-preview-2024-12-17`
4. **Alternative avec clés éphémères**: Implémenter un système de clés éphémères pour plus de sécurité

## Références

- [OpenAI Realtime API Guide](https://platform.openai.com/docs/guides/realtime)
- [WebRTC Integration Discussion](https://webrtchacks.com/the-unofficial-guide-to-openai-realtime-webrtc-api/)
- [Community Feedback on /v1/realtime/calls](https://community.openai.com/t/api-call-towards-v1-realtime-calls-endpoint-fail-with-400-bad-request/1358078)
