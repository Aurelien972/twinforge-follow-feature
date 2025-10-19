/**
 * Voice Audio Integration Example
 * Exemple d'intégration du système audio avec gestion de l'autoplay
 *
 * Ce fichier montre comment intégrer les composants audio
 * dans votre interface utilisateur Voice Coach.
 */

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAudioAutoplayHandler } from '../hooks/useAudioAutoplayHandler';
import AudioEnablePrompt from '../ui/components/chat/AudioEnablePrompt';
import AudioDiagnostics from '../ui/components/chat/AudioDiagnostics';
import { openaiRealtimeService } from '../system/services/openaiRealtimeService';
import logger from '../lib/utils/logger';

interface VoiceAudioIntegrationExampleProps {
  // Votre config existante
  modeColor?: string;
  showDiagnostics?: boolean;
}

/**
 * Exemple d'intégration complète du système audio
 */
const VoiceAudioIntegrationExample: React.FC<VoiceAudioIntegrationExampleProps> = ({
  modeColor = '#3b82f6',
  showDiagnostics = false
}) => {
  // Hook pour gérer l'autoplay
  const { shouldShowPrompt, handleAudioEnabled, handleDismiss } = useAudioAutoplayHandler();

  // Handler pour tester l'audio manuellement
  const handleTestAudio = async () => {
    logger.info('AUDIO_TEST', 'Testing audio playback...');
    const success = await openaiRealtimeService.enableAudioPlayback();

    if (success) {
      logger.info('AUDIO_TEST', '✅ Audio test successful');
      alert('✅ Audio est actif !');
    } else {
      logger.error('AUDIO_TEST', '❌ Audio test failed');
      alert('❌ Impossible d\'activer l\'audio');
    }
  };

  // Handler pour logger les diagnostics
  const handleLogDiagnostics = () => {
    openaiRealtimeService.logAudioDiagnostics();
    alert('📋 Diagnostics loggés dans la console');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>Voice Audio System Example</h1>

      {/* Prompt d'activation audio (s'affiche automatiquement si nécessaire) */}
      <AnimatePresence>
        {shouldShowPrompt && (
          <AudioEnablePrompt
            onAudioEnabled={handleAudioEnabled}
            onDismiss={handleDismiss}
            color={modeColor}
          />
        )}
      </AnimatePresence>

      {/* Diagnostics audio (optionnel, pour debug) */}
      {showDiagnostics && (
        <div style={{ marginTop: '20px' }}>
          <AudioDiagnostics color={modeColor} compact={false} />
        </div>
      )}

      {/* Boutons de test */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={handleTestAudio}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            background: modeColor,
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          🔊 Tester l'audio
        </button>

        <button
          onClick={handleLogDiagnostics}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          📋 Logger diagnostics
        </button>

        <button
          onClick={() => {
            const diag = openaiRealtimeService.getAudioDiagnostics();
            alert(JSON.stringify(diag, null, 2));
          }}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          🔍 Afficher diagnostics
        </button>
      </div>

      {/* Documentation rapide */}
      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          fontSize: '13px',
          lineHeight: '1.6'
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '14px' }}>
          💡 Comment l'utiliser dans votre code
        </h3>

        <p style={{ margin: '10px 0' }}>
          <strong>1. Ajouter le hook dans votre composant :</strong>
        </p>
        <code
          style={{
            display: 'block',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
          }}
        >
          {`const { shouldShowPrompt, handleAudioEnabled, handleDismiss } = useAudioAutoplayHandler();`}
        </code>

        <p style={{ margin: '10px 0' }}>
          <strong>2. Afficher le prompt si nécessaire :</strong>
        </p>
        <code
          style={{
            display: 'block',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
          }}
        >
          {`{shouldShowPrompt && (
  <AudioEnablePrompt
    onAudioEnabled={handleAudioEnabled}
    onDismiss={handleDismiss}
    color="#3b82f6"
  />
)}`}
        </code>

        <p style={{ margin: '10px 0' }}>
          <strong>3. Optionnel - Afficher les diagnostics :</strong>
        </p>
        <code
          style={{
            display: 'block',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
          }}
        >
          {`<AudioDiagnostics color="#10b981" compact={true} />`}
        </code>

        <p style={{ margin: '15px 0 0 0', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
          📚 Voir <code>VOICE_AUDIO_SYSTEM_GUIDE.md</code> pour la documentation complète
        </p>
      </div>
    </div>
  );
};

export default VoiceAudioIntegrationExample;

/**
 * Exemple d'utilisation dans votre composant Voice Coach existant
 */
export const ExampleUsageInVoiceCoach = () => {
  return `
// Dans votre composant VoiceCoachPanel ou GlobalChatDrawer

import { useAudioAutoplayHandler } from '../hooks/useAudioAutoplayHandler';
import AudioEnablePrompt from '../ui/components/chat/AudioEnablePrompt';

const YourVoiceCoachComponent = () => {
  const { shouldShowPrompt, handleAudioEnabled, handleDismiss } = useAudioAutoplayHandler();
  const modeColor = '#3b82f6'; // Votre couleur de mode

  return (
    <div className="voice-coach-panel">
      {/* Votre UI existante */}

      {/* Ajouter le prompt d'activation audio */}
      {shouldShowPrompt && (
        <AudioEnablePrompt
          onAudioEnabled={handleAudioEnabled}
          onDismiss={handleDismiss}
          color={modeColor}
        />
      )}

      {/* Reste de votre UI */}
    </div>
  );
};
  `;
};
