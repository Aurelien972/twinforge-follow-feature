# Configuration du Système Voice Coach

Le système Voice Coach utilise l'API Realtime d'OpenAI pour permettre des conversations vocales bidirectionnelles avec le coach.

## Prérequis

Pour activer le système Voice Coach, vous devez configurer une clé API OpenAI.

## Configuration

### 1. Obtenir une Clé API OpenAI

1. Créez un compte sur [OpenAI Platform](https://platform.openai.com/)
2. Naviguez vers [API Keys](https://platform.openai.com/api-keys)
3. Créez une nouvelle clé API
4. Copiez la clé (elle commence par `sk-...`)

### 2. Configurer la Variable d'Environnement

Ajoutez la clé API dans votre fichier `.env` :

```env
VITE_OPENAI_API_KEY=sk-votre-cle-api-ici
```

**Important** :
- Ne commitez JAMAIS votre clé API dans git
- Le fichier `.env` est déjà dans `.gitignore`
- La clé doit commencer par `VITE_` pour être accessible dans le frontend

### 3. Redémarrer l'Application

Après avoir ajouté la clé, redémarrez le serveur de développement :

```bash
npm run dev
```

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
2. Le panel s'ouvre et la connexion WebSocket s'établit
3. Parlez dans votre microphone
4. Le coach répond en vocal et/ou textuel
5. Utilisez le bouton de basculement pour passer en mode texte

## Dépannage

### Erreur : "Orchestrator not initialized"
- Vérifiez que `VITE_OPENAI_API_KEY` est bien définie dans `.env`
- Redémarrez le serveur de développement après avoir ajouté la clé

### Erreur : "Microphone permission denied"
- Autorisez l'accès au microphone dans votre navigateur
- Sur Chrome : Cliquez sur l'icône de cadenas dans la barre d'adresse

### Erreur de connexion WebSocket
- Vérifiez que votre clé API est valide
- Assurez-vous d'avoir des crédits sur votre compte OpenAI
- Consultez les logs de la console pour plus de détails

## Architecture

```
FloatingVoiceCoachButton (UI)
    ↓
voiceCoachOrchestrator (coordination)
    ↓
    ├─→ openaiRealtimeService (WebSocket)
    ├─→ audioInputService (microphone)
    └─→ audioOutputService (haut-parleurs)
```

## Coûts

L'API Realtime d'OpenAI est payante. Consultez la [tarification OpenAI](https://openai.com/pricing) pour connaître les tarifs actuels.

## Sécurité

⚠️ **Important** :
- La clé API est exposée côté client (frontend)
- Pour une application en production, utilisez un proxy backend
- Mettez en place des limites de taux (rate limiting)
- Surveillez l'utilisation de votre clé API

## Support

Pour toute question ou problème, consultez les logs de la console du navigateur qui contiennent des informations détaillées sur chaque étape du processus d'initialisation et d'utilisation.
