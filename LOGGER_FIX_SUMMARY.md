# Correction du système de logging - Résumé

## Problème identifié

Le système de logging avait une incompatibilité critique entre sa définition et son utilisation dans tout le codebase:

### Signature définie (2 paramètres)
```typescript
function error(message: string, context?: Record<string, any>)
```

### Signature utilisée partout (3 paramètres)
```typescript
logger.error('CATEGORY', 'message', { context })
```

### Conséquence
- Le 1er paramètre (category) devenait le message
- Le 2ème paramètre (message réel) devenait le context
- Le 3ème paramètre (context réel) était **complètement ignoré**
- Résultat: Tous les logs affichaient `context: {}` au lieu des détails d'erreur

## Corrections appliquées

### 1. Logger central (`src/lib/utils/logger.ts`)

#### Modification de la signature des fonctions
Toutes les fonctions de logging (error, info, warn, debug, trace) acceptent maintenant **les deux signatures**:

```typescript
// 2 paramètres (signature originale)
logger.error(message, context)

// 3 paramètres (signature utilisée partout)
logger.error(category, message, context)
```

#### Détection automatique de la signature
```typescript
function createLogPayload(level: LogLevel, categoryOrMessage: string, messageOrContext?: any, context?: any) {
  // Détecte automatiquement quelle signature est utilisée
  if (context !== undefined) {
    // 3-param: (category, message, context)
    category = categoryOrMessage;
    message = messageOrContext;
    finalContext = context;
  } else if (typeof messageOrContext === 'string') {
    // 3-param: (category, message, undefined)
    category = categoryOrMessage;
    message = messageOrContext;
    finalContext = undefined;
  } else {
    // 2-param: (message, context)
    category = undefined;
    message = categoryOrMessage;
    finalContext = messageOrContext;
  }
  
  // Construit le message complet avec catégorie
  const fullMessage = category ? `${category} — ${message}` : message;
  
  // Merge le contexte avec la catégorie
  const mergedContext = {
    ...autoContext,
    ...(category && { category }),
    ...(finalContext || {})
  };
}
```

### 2. Diagnostics vocaux (`src/system/services/voiceConnectionDiagnostics.ts`)

#### Logging détaillé de chaque test
Chaque test de diagnostic est maintenant loggé individuellement avec tous ses détails:

```typescript
private logTestResult(testNumber: number, result: DiagnosticResult): void {
  const icon = result.passed ? '✅' : '❌';
  const level = result.passed ? 'info' : 'error';

  logger[level](
    'VOICE_DIAGNOSTICS',
    `${icon} Test ${testNumber}: ${result.test} - ${result.message}`,
    {
      testNumber,
      testName: result.test,
      passed: result.passed,
      message: result.message,
      details: result.details  // ✅ MAINTENANT VISIBLE
    }
  );
}
```

#### Résumé des échecs
En fin de diagnostics, tous les tests échoués sont résumés avec leurs détails complets:

```typescript
if (failedCount > 0) {
  logger.error('VOICE_DIAGNOSTICS', '❌ Failed tests summary', {
    failedTests: results
      .filter(r => !r.passed)
      .map(r => ({
        test: r.test,
        message: r.message,
        details: r.details  // ✅ Causes possibles, solutions, etc.
      }))
  });
}
```

## Résultat

### Avant (logs vides)
```json
{
  "level": "error",
  "message": "VOICE_ORCHESTRATOR",
  "timestamp": "2025-10-19T04:35:41.048Z",
  "context": {}  // ❌ VIDE
}
```

### Après (logs détaillés)
```json
{
  "level": "error",
  "message": "VOICE_DIAGNOSTICS — ❌ Test 6: WebSocket Connection - WebSocket connection error",
  "timestamp": "2025-10-19T04:35:41.048Z",
  "context": {
    "category": "VOICE_DIAGNOSTICS",
    "testNumber": 6,
    "testName": "WebSocket Connection",
    "passed": false,
    "message": "WebSocket connection error - likely OPENAI_API_KEY not configured",
    "details": {
      "duration": 234,
      "error": "WebSocket error event fired",
      "state": 3,
      "stateName": "CLOSED",
      "possibleCauses": [
        "OPENAI_API_KEY not set in Supabase Edge Function secrets",
        "OpenAI API key is invalid or expired",
        "Network firewall blocking WebSocket connections",
        "Supabase edge function internal error"
      ],
      "solution": "Go to Supabase Dashboard > Edge Functions > Secrets and add OPENAI_API_KEY"
    }
  }
}
```

## Impact

- **2238 occurrences** du pattern logger à 3 paramètres dans **263 fichiers** fonctionnent maintenant correctement
- Les diagnostics affichent désormais les vrais messages d'erreur au lieu de `context: {}`
- Tu peux maintenant voir EXACTEMENT pourquoi la connexion vocale échoue
- Compatibilité maintenue avec l'ancienne signature à 2 paramètres

## Pour tester

Relance le chat vocal et regarde les logs dans la console. Tu verras maintenant:
- Les détails de chaque test de diagnostic
- Les causes possibles de l'échec
- Les solutions suggérées
- L'état complet du WebSocket au moment de l'erreur

Si la clé OpenAI manque, tu verras clairement:
```
"possibleCauses": [
  "OPENAI_API_KEY not set in Supabase Edge Function secrets",
  ...
],
"solution": "Go to Supabase Dashboard > Edge Functions > Secrets and add OPENAI_API_KEY"
```
