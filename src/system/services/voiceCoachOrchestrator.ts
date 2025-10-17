/**
 * Voice Coach Orchestrator
 * Service central qui coordonne tous les composants du système vocal
 * Gère la connexion, l'audio, les transcriptions et les réponses
 */

import logger from '../../lib/utils/logger';
import { useVoiceCoachStore } from '../store/voiceCoachStore';
import { useGlobalChatStore } from '../store/globalChatStore';
import { openaiRealtimeService } from './openaiRealtimeService';
import { audioInputService } from './audioInputService';
import type { VoiceState } from '../store/voiceCoachStore';

class VoiceCoachOrchestrator {
  private isInitialized = false;
  private audioBuffer: Float32Array[] = [];
  private isProcessingAudio = false;
  private silenceTimer: NodeJS.Timeout | null = null;
  private silenceDuration = 1500; // ms de silence avant d'envoyer

  /**
   * Initialiser l'orchestrateur
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      logger.debug('VOICE_ORCHESTRATOR', 'Already initialized');
      return;
    }

    try {
      logger.info('VOICE_ORCHESTRATOR', 'Initializing voice coach orchestrator');

      // Récupérer la clé API depuis l'environnement
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        throw new Error('OpenAI API key not found');
      }

      // Setup event handlers pour l'API Realtime
      this.setupRealtimeHandlers();

      // Setup event handlers pour l'audio input
      this.setupAudioHandlers();

      this.isInitialized = true;

      logger.info('VOICE_ORCHESTRATOR', 'Voice coach orchestrator initialized');
    } catch (error) {
      logger.error('VOICE_ORCHESTRATOR', 'Initialization failed', { error });
      throw error;
    }
  }

  /**
   * Démarrer une session vocale
   */
  async startVoiceSession(mode: string): Promise<void> {
    try {
      logger.info('VOICE_ORCHESTRATOR', 'Starting voice session', { mode });

      const store = useVoiceCoachStore.getState();
      const globalStore = useGlobalChatStore.getState();

      // Récupérer la configuration du mode
      const modeConfig = globalStore.modeConfigs[mode as any];

      if (!modeConfig) {
        throw new Error(`Invalid mode: ${mode}`);
      }

      // Initialiser l'audio input si pas déjà fait
      if (!audioInputService.initialized) {
        await audioInputService.initialize({
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        });
      }

      // Connecter à l'API Realtime
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      await openaiRealtimeService.connect({
        apiKey,
        model: 'gpt-4o-realtime-preview-2024-10-01',
        voice: store.preferences.preferredVoice,
        temperature: 0.8,
        maxTokens: 4096
      });

      // Configurer la session avec le system prompt
      openaiRealtimeService.configureSession(modeConfig.systemPrompt, mode as any);

      // Démarrer une conversation dans le store
      await store.startConversation(mode as any);

      // Démarrer l'enregistrement audio
      audioInputService.startRecording();

      logger.info('VOICE_ORCHESTRATOR', 'Voice session started successfully');
    } catch (error) {
      logger.error('VOICE_ORCHESTRATOR', 'Failed to start voice session', { error });

      const store = useVoiceCoachStore.getState();
      store.setVoiceState('error');
      store.setError('Failed to start voice session');

      throw error;
    }
  }

  /**
   * Arrêter la session vocale
   */
  async stopVoiceSession(): Promise<void> {
    try {
      logger.info('VOICE_ORCHESTRATOR', 'Stopping voice session');

      // Arrêter l'enregistrement audio
      if (audioInputService.recording) {
        audioInputService.stopRecording();
      }

      // Envoyer le buffer audio final si nécessaire
      if (this.audioBuffer.length > 0) {
        await this.flushAudioBuffer();
      }

      // Déconnecter de l'API
      openaiRealtimeService.disconnect();

      // Nettoyer l'audio input
      audioInputService.cleanup();

      // Terminer la conversation
      const store = useVoiceCoachStore.getState();
      await store.endConversation();

      // Reset état
      store.setVoiceState('idle');

      logger.info('VOICE_ORCHESTRATOR', 'Voice session stopped');
    } catch (error) {
      logger.error('VOICE_ORCHESTRATOR', 'Error stopping voice session', { error });
    }
  }

  /**
   * Setup des handlers pour l'API Realtime
   */
  private setupRealtimeHandlers(): void {
    // Handler pour les messages reçus
    openaiRealtimeService.onMessage((message) => {
      this.handleRealtimeMessage(message);
    });

    // Handler pour les erreurs
    openaiRealtimeService.onError((error) => {
      logger.error('VOICE_ORCHESTRATOR', 'Realtime API error', { error });

      const store = useVoiceCoachStore.getState();
      store.setVoiceState('error');
      store.setError(error.message);
    });

    // Handler pour la connexion
    openaiRealtimeService.onConnect(() => {
      logger.info('VOICE_ORCHESTRATOR', 'Realtime API connected');
    });

    // Handler pour la déconnexion
    openaiRealtimeService.onDisconnect(() => {
      logger.info('VOICE_ORCHESTRATOR', 'Realtime API disconnected');
    });
  }

  /**
   * Setup des handlers pour l'audio input
   */
  private setupAudioHandlers(): void {
    // Handler pour les données audio
    audioInputService.onAudioData((audioData) => {
      if (!this.isProcessingAudio) {
        this.handleAudioData(audioData);
      }
    });

    // Handler pour le niveau audio (pour visualisation)
    audioInputService.onAudioLevel((level) => {
      const store = useVoiceCoachStore.getState();

      // Mettre à jour la visualisation
      store.updateVisualization({
        volume: level.volume,
        isSpeaking: level.isSpeaking
      });

      // Gérer la détection automatique de silence
      if (store.preferences.defaultMode === 'auto' || store.preferences.defaultMode === 'continuous') {
        if (level.isSpeaking) {
          // Réinitialiser le timer de silence
          if (this.silenceTimer) {
            clearTimeout(this.silenceTimer);
            this.silenceTimer = null;
          }
        } else if (store.voiceState === 'listening' && this.audioBuffer.length > 0) {
          // Démarrer le timer de silence si pas déjà actif
          if (!this.silenceTimer) {
            this.silenceTimer = setTimeout(() => {
              this.handleSilenceDetected();
            }, this.silenceDuration);
          }
        }
      }
    });
  }

  /**
   * Traiter les données audio capturées
   */
  private handleAudioData(audioData: Float32Array): void {
    // Ajouter au buffer
    this.audioBuffer.push(new Float32Array(audioData));

    // Mettre à jour les fréquences pour visualisation
    const frequencies = audioInputService.getFrequencyData();
    if (frequencies) {
      const store = useVoiceCoachStore.getState();
      store.updateVisualization({
        frequencies: Array.from(frequencies.slice(0, 32))
      });
    }
  }

  /**
   * Silence détecté - envoyer l'audio
   */
  private async handleSilenceDetected(): Promise<void> {
    logger.debug('VOICE_ORCHESTRATOR', 'Silence detected, sending audio');

    this.silenceTimer = null;

    if (this.audioBuffer.length > 0) {
      await this.flushAudioBuffer();
    }
  }

  /**
   * Envoyer le buffer audio accumulé
   */
  private async flushAudioBuffer(): Promise<void> {
    if (this.audioBuffer.length === 0) return;

    try {
      this.isProcessingAudio = true;

      // Concaténer tous les chunks
      const totalLength = this.audioBuffer.reduce((sum, chunk) => sum + chunk.length, 0);
      const concatenated = new Float32Array(totalLength);

      let offset = 0;
      for (const chunk of this.audioBuffer) {
        concatenated.set(chunk, offset);
        offset += chunk.length;
      }

      // Convertir en PCM16
      const pcm16 = this.float32ToPCM16(concatenated);

      // Envoyer à l'API
      openaiRealtimeService.sendAudio(pcm16.buffer);
      openaiRealtimeService.commitAudioBuffer();

      // Vider le buffer
      this.audioBuffer = [];

      // Mettre à jour l'état
      const store = useVoiceCoachStore.getState();
      store.setVoiceState('processing');

      this.isProcessingAudio = false;
    } catch (error) {
      logger.error('VOICE_ORCHESTRATOR', 'Error flushing audio buffer', { error });
      this.isProcessingAudio = false;
    }
  }

  /**
   * Traiter les messages de l'API Realtime
   */
  private handleRealtimeMessage(message: any): void {
    const store = useVoiceCoachStore.getState();

    switch (message.type) {
      // Transcription de l'utilisateur
      case 'conversation.item.input_audio_transcription.completed':
        if (message.transcript) {
          store.updateTranscription(message.transcript);
          store.finalizeTranscription();
        }
        break;

      // Début de réponse du coach
      case 'response.audio.delta':
        if (store.voiceState !== 'speaking') {
          store.setVoiceState('speaking');
        }
        // Ici on pourrait jouer l'audio reçu
        break;

      // Transcription de la réponse du coach
      case 'response.audio_transcript.delta':
        if (message.delta) {
          // Ajouter au message du coach
          const lastMessage = store.messages[store.messages.length - 1];
          if (lastMessage && lastMessage.role === 'coach') {
            // Update le contenu du dernier message
          } else {
            // Créer un nouveau message
            store.addMessage({
              role: 'coach',
              content: message.delta
            });
          }
        }
        break;

      // Fin de réponse
      case 'response.audio.done':
      case 'response.done':
        store.setVoiceState('idle');

        // Redémarrer l'écoute en mode continu
        if (store.preferences.defaultMode === 'continuous') {
          setTimeout(() => {
            if (store.voiceState === 'idle') {
              store.startListening();
            }
          }, 500);
        }
        break;

      // Erreur
      case 'error':
        logger.error('VOICE_ORCHESTRATOR', 'Realtime API error', { message });
        store.setVoiceState('error');
        store.setError(message.error?.message || 'Unknown error');
        break;

      default:
        logger.debug('VOICE_ORCHESTRATOR', 'Unhandled message type', { type: message.type });
    }
  }

  /**
   * Convertir Float32 en PCM16
   */
  private float32ToPCM16(float32Array: Float32Array): Int16Array {
    const pcm16 = new Int16Array(float32Array.length);

    for (let i = 0; i < float32Array.length; i++) {
      // Clamper entre -1 et 1
      const clamped = Math.max(-1, Math.min(1, float32Array[i]));
      // Convertir en Int16
      pcm16[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
    }

    return pcm16;
  }

  /**
   * Nettoyer l'orchestrateur
   */
  cleanup(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    this.audioBuffer = [];
    this.isProcessingAudio = false;
    this.isInitialized = false;
  }
}

// Export singleton
export const voiceCoachOrchestrator = new VoiceCoachOrchestrator();
