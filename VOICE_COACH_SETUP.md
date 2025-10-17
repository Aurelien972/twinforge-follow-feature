# Configuration du Système Voice Coach

Le système Voice Coach utilise l'API Realtime d'OpenAI pour permettre des conversations vocales bidirectionnelles avec le coach.

## Architecture de Sécurité

Pour des raisons de sécurité, la clé API OpenAI n'est **jamais exposée côté client**. Le système utilise une edge function Supabase qui sert de proxy WebSocket sécurisé.

```
Client (Browser)
    ↓ WebSocket
Edge Function (voice-coach-realtime)
    ↓ WebSocket + API Key
OpenAI Realtime API
```

## Prérequis

1. Un compte Supabase actif avec ce projet
2. Une clé API OpenAI
3. L'edge function `voice-coach-realtime` déployée

## Configuration

### 1. Obtenir une Clé API OpenAI

1. Créez un compte sur [OpenAI Platform](https://platform.openai.com/)
2. Naviguez vers [API Keys](https://platform.openai.com/api-keys)
3. Créez une nouvelle clé API
4. Copiez la clé (elle commence par `sk-...`)

### 2. Configurer le Secret Supabase

La clé API OpenAI doit être stockée comme secret Supabase (jamais dans le code ou .env côté client) :

**Via l'interface Supabase Dashboard :**
1. Allez dans votre projet Supabase
2. Naviguez vers Project Settings → Edge Functions
3. Cliquez sur "Manage secrets"
4. Créez un nouveau secret :
   - Nom : `OPENAI_API_KEY`
   - Valeur : votre clé API OpenAI (sk-...)

**Ou via Supabase CLI :**
```bash
supabase secrets set OPENAI_API_KEY=sk-votre-cle-api-ici
```

### 3. Déployer l'Edge Function

L'edge function `voice-coach-realtime` est déjà dans le code source du projet (`supabase/functions/voice-coach-realtime/index.ts`).

Pour la déployer sur votre projet Supabase :

```bash
# Si vous n'avez pas encore lié votre projet
supabase link --project-ref votre-projet-ref

# Déployer la fonction
supabase functions deploy voice-coach-realtime
```

L'edge function est maintenant disponible à l'URL :
```
https://votre-projet.supabase.co/functions/v1/voice-coach-realtime
```

### 4. Vérifier la Configuration Locale

Assurez-vous que votre fichier `.env` contient les variables Supabase :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

**Note** : Ces variables sont déjà présentes si vous avez configuré Supabase pour ce projet.

### 5. Tester la Connexion

1. Redémarrez votre serveur de développement : `npm run dev`
2. Cliquez sur le bouton microphone dans l'interface
3. Vérifiez les logs dans la console :
   - ✅ `VOICE_ORCHESTRATOR — Voice coach orchestrator initialized successfully`
   - ✅ `REALTIME_API — Initiating connection via edge function`
   - ✅ `REALTIME_API — WebSocket connected`

## Fonctionnalités

Une fois configuré, le système Voice Coach offre :

### Mode Vocal
- **Conversation bidirectionnelle** : Parlez et recevez des réponses audio
- **Transcription en temps réel** : Voir ce que vous dites pendant que vous parlez
- **Visualisation audio** : Affichage des fréquences audio
- **Détection automatique de silence** : L'audio est envoyé automatiquement après 1.5s de silence

### Mode Textuel
- **Chat textuel** : Tapez vos messages au lieu de parler
- **Historique unifié** : Messages vocaux et textuels dans la même conversation
- **Basculement rapide** : Switchez entre vocal et textuel à tout moment

## Utilisation

1. **Cliquez sur le bouton microphone** en bas à droite
2. Le panel s'ouvre et la connexion WebSocket s'établit via l'edge function
3. Parlez dans votre microphone
4. Le coach répond en vocal et/ou textuel
5. Utilisez le bouton de basculement pour passer en mode texte

## Dépannage

### Erreur : "Orchestrator not initialized"
- Vérifiez que Supabase est bien configuré (VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env)
- Vérifiez que l'edge function est déployée : `supabase functions list`
- Consultez les logs de la console pour plus de détails

### Erreur : "OpenAI API key not configured"
- La clé API n'est pas définie dans les secrets Supabase
- Ajoutez le secret `OPENAI_API_KEY` dans le dashboard Supabase
- Redéployez l'edge function après avoir ajouté le secret

### Erreur de connexion WebSocket
- Vérifiez que l'edge function répond : ouvrez l'URL dans le navigateur (doit retourner une erreur 426 "Expected WebSocket upgrade")
- Vérifiez les logs de l'edge function dans le dashboard Supabase
- Assurez-vous que votre clé API OpenAI est valide et a des crédits

### Erreur : "Microphone permission denied"
- Autorisez l'accès au microphone dans votre navigateur
- Sur Chrome : Cliquez sur l'icône de cadenas dans la barre d'adresse

## Architecture Technique

### Edge Function (voice-coach-realtime)

La fonction sert de proxy WebSocket sécurisé :
- Reçoit les connexions WebSocket des clients
- Établit une connexion WebSocket vers l'API Realtime d'OpenAI avec la clé API
- Transfère les messages bidirectionnellement
- Garde la clé API totalement invisible côté client

### Client (openaiRealtimeService)

Le service client :
- Se connecte à l'edge function (pas directement à OpenAI)
- Envoie l'audio et les messages textuels
- Reçoit les réponses audio et les transcriptions
- Gère la reconnexion automatique

### Flow Complet

```
1. Client → Edge Function : WebSocket connect (wss://...)
2. Edge Function → OpenAI : WebSocket connect + API Key
3. Client → Edge Function → OpenAI : Audio chunks (base64)
4. OpenAI → Edge Function → Client : Audio response + transcription
5. Client : Decode et joue l'audio via audioOutputService
```

## Coûts

L'API Realtime d'OpenAI est payante. Consultez la [tarification OpenAI](https://openai.com/pricing) pour connaître les tarifs actuels des modèles Realtime.

## Sécurité

✅ **Avantages de cette architecture** :
- La clé API OpenAI n'est jamais exposée côté client
- Authentification via Supabase (utilisateurs authentifiés seulement)
- Les secrets sont gérés par Supabase de manière sécurisée
- Possibilité d'ajouter du rate limiting dans l'edge function
- Logs centralisés des connexions

⚠️ **Recommandations** :
- Surveillez l'utilisation de votre clé API dans le dashboard OpenAI
- Configurez des alertes de coûts
- Mettez en place du rate limiting si nécessaire
- Limitez l'accès à la fonction aux utilisateurs authentifiés

## Support

Pour toute question ou problème, consultez les logs :
- **Console navigateur** : Logs détaillés de chaque étape côté client
- **Supabase Dashboard** : Logs de l'edge function sous "Functions → voice-coach-realtime → Logs"
- **OpenAI Dashboard** : Utilisation de l'API et erreurs

Les logs incluent des informations détaillées à chaque étape pour faciliter le debugging.
