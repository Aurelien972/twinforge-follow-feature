/**
 * Voice Coach Orchestrator
 * Service central qui coordonne tous les composants du système vocal
 * Gère la connexion, l'audio, les transcriptions et les réponses
 */

import logger from '../../lib/utils/logger';
import { useUnifiedCoachStore } from '../store/unifiedCoachStore';
import type { VoiceState } from '../store/unifiedCoachStore';
import { openaiRealtimeService } from './openaiRealtimeService';
import { audioInputService } from './audioInputService';
import { audioOutputService } from './audioOutputService';

class VoiceCoachOrchestrator {
  private isInitialized = false;
  private audioBuffer: Float32Array[] = [];
  private isProcessingAudio = false;
  private silenceTimer: NodeJS.Timeout | null = null;
  private silenceDuration = 1500; // ms de silence avant d'envoyer
  private currentCoachMessage = ''; // Accumulation de la transcription du coach

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

      // Vérifier la configuration Supabase (nécessaire pour l'edge function)
      logger.debug('VOICE_ORCHESTRATOR', 'Checking Supabase configuration');
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        logger.error('VOICE_ORCHESTRATOR', 'Supabase configuration missing');
        throw new Error('Supabase configuration missing');
      }

      logger.debug('VOICE_ORCHESTRATOR', 'Supabase configuration OK, setting up handlers');

      // Setup event handlers pour l'API Realtime
      logger.debug('VOICE_ORCHESTRATOR', 'Setting up Realtime handlers');
      this.setupRealtimeHandlers();

      // Setup event handlers pour l'audio input
      logger.debug('VOICE_ORCHESTRATOR', 'Setting up audio input handlers');
      this.setupAudioHandlers();

      // Initialiser le service de sortie audio
      logger.debug('VOICE_ORCHESTRATOR', 'Initializing audio output service');
      await audioOutputService.initialize(24000);

      this.isInitialized = true;

      logger.info('VOICE_ORCHESTRATOR', 'Voice coach orchestrator initialized successfully');
    } catch (error) {
      logger.error('VOICE_ORCHESTRATOR', 'Initialization failed', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * Démarrer une session vocale
   */
  async startVoiceSession(mode: string): Promise<void> {
    const store = useUnifiedCoachStore.getState();

    try {
      logger.info('VOICE_ORCHESTRATOR', '🚀 Starting voice session', { mode });

      // Vérifier l'état actuel
      if (store.voiceState === 'listening' || store.voiceState === 'speaking') {
        logger.warn('VOICE_ORCHESTRATOR', 'Session already active');
        return;
      }

      // Passer en état connecting
      logger.info('VOICE_ORCHESTRATOR', '📡 Setting voice state to connecting');
      store.setVoiceState('connecting');

      // Récupérer la configuration du mode depuis unifiedCoachStore
      const modeConfig = store.modeConfigs[mode as any];

      if (!modeConfig) {
        throw new Error(`Invalid mode: ${mode}`);
      }

      // Vérifier les permissions micro
      logger.info('VOICE_ORCHESTRATOR', '🎤 Checking microphone permissions');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        logger.info('VOICE_ORCHESTRATOR', '✅ Microphone permission granted');
      } catch (permError) {
        logger.error('VOICE_ORCHESTRATOR', '❌ Microphone permission denied', { error: permError });
        throw new Error('Microphone access required for voice sessions');
      }

      // Initialiser l'audio input si pas déjà fait
      if (!audioInputService.initialized) {
        logger.info('VOICE_ORCHESTRATOR', '🔊 Initializing audio input service');
        await audioInputService.initialize({
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        });
        logger.info('VOICE_ORCHESTRATOR', '✅ Audio input service initialized');
      }

      // Connexion à l'API Realtime via notre edge function
      logger.info('VOICE_ORCHESTRATOR', '🌐 Connecting to Realtime API via edge function');

      await openaiRealtimeService.connect({
        model: 'gpt-4o-realtime-preview-2024-10-01',
        voice: 'alloy',
        temperature: 0.8,
        maxTokens: 4096
      });
      logger.info('VOICE_ORCHESTRATOR', '✅ Connected to Realtime API');

      // Configurer la session avec le system prompt
      logger.info('VOICE_ORCHESTRATOR', '⚙️ Configuring session with system prompt');
      openaiRealtimeService.configureSession(modeConfig.systemPrompt, mode as any);
      logger.info('VOICE_ORCHESTRATOR', '✅ Session configured');

      // Démarrer une conversation dans le store
      logger.info('VOICE_ORCHESTRATOR', '💬 Starting conversation in store');
      store.startConversation(mode as any);

      // Démarrer l'enregistrement audio
      logger.info('VOICE_ORCHESTRATOR', '🎙️ Starting audio recording');
      audioInputService.startRecording();
      logger.info('VOICE_ORCHESTRATOR', '✅ Audio recording started');

      // Passer en état listening
      logger.info('VOICE_ORCHESTRATOR', '👂 Setting voice state to listening');
      store.setVoiceState('listening');

      logger.info('VOICE_ORCHESTRATOR', '✅✅✅ Voice session started successfully - STATE = LISTENING ✅✅✅');
    } catch (error) {
      logger.error('VOICE_ORCHESTRATOR', 'Failed to start voice session', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });

      logger.error('VOICE_ORCHESTRATOR', '❌ CRITICAL: Voice session failed to start');
      store.setVoiceState('error');

      // Message d'erreur détaillé
      let errorMessage = 'Failed to start voice session';
      if (error instanceof Error) {
        if (error.message.includes('permission')) {
          errorMessage = 'Microphone permission required';
        } else if (error.message.includes('connect') || error.message.includes('WebSocket')) {
          errorMessage = 'Unable to connect to voice service';
        } else {
          errorMessage = error.message;
        }
      }

      logger.error('VOICE_ORCHESTRATOR', '💥 Error message for user', { errorMessage });
      store.setError(errorMessage);

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

      // Arrêter la lecture audio
      audioOutputService.stop();

      // Nettoyer l'audio input
      audioInputService.cleanup();

      // Terminer la conversation
      const store = useUnifiedCoachStore.getState();
      store.endConversation();

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
      logger.error('VOICE_ORCHESTRATOR', '❌ Realtime API error', { error: error.message, stack: error.stack });

      const store = useUnifiedCoachStore.getState();
      store.setVoiceState('error');
      store.setError(error.message);
    });

    // Handler pour la connexion
    openaiRealtimeService.onConnect(() => {
      logger.info('VOICE_ORCHESTRATOR', '✅ Realtime API WebSocket connected successfully');
    });

    // Handler pour la déconnexion
    openaiRealtimeService.onDisconnect(() => {
      logger.info('VOICE_ORCHESTRATOR', '🔌 Realtime API disconnected');
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
      const store = useUnifiedCoachStore.getState();

      // Mettre à jour la visualisation
      store.updateVisualization({
        volume: level.volume,
        isSpeaking: level.isSpeaking
      });

      // Gérer la détection automatique de silence (mode auto)
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
      const store = useUnifiedCoachStore.getState();
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
      const store = useUnifiedCoachStore.getState();
      logger.info('VOICE_ORCHESTRATOR', '🔄 Audio buffer flushed, setting state to processing');
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
    const store = useUnifiedCoachStore.getState();

    logger.debug('VOICE_ORCHESTRATOR', '📨 Received Realtime message', {
      type: message.type,
      hasContent: !!message.delta || !!message.transcript
    });

    switch (message.type) {
      // Transcription de l'utilisateur en cours (delta)
      case 'conversation.item.input_audio_transcription.delta':
        if (message.delta) {
          logger.info('VOICE_ORCHESTRATOR', '📝 User transcription delta', { delta: message.delta });
          store.setCurrentTranscription(store.currentTranscription + message.delta);
        }
        break;

      // Transcription de l'utilisateur complète
      case 'conversation.item.input_audio_transcription.completed':
        if (message.transcript) {
          logger.info('VOICE_ORCHESTRATOR', '✅ User transcription completed', { transcript: message.transcript });
          store.setCurrentTranscription(message.transcript);

          // Ajouter le message utilisateur
          store.addMessage({
            role: 'user',
            content: message.transcript
          });

          // Réinitialiser la transcription courante
          store.setCurrentTranscription('');
        }
        break;

      // Début de réponse du coach
      case 'response.audio.delta':
        // Changer l'état en speaking dès le premier chunk audio
        if (store.voiceState !== 'speaking') {
          logger.info('VOICE_ORCHESTRATOR', '🔊 Coach audio started, setting state to speaking');
          store.setVoiceState('speaking');
          store.setSpeaking(true);
        }

        // Jouer l'audio reçu
        if (message.delta) {
          audioOutputService.addAudioChunk(message.delta);
        }
        break;

      // Transcription de la réponse du coach (delta)
      case 'response.audio_transcript.delta':
        if (message.delta) {
          logger.info('VOICE_ORCHESTRATOR', '💬 Coach transcript delta', { delta: message.delta.substring(0, 50) });
          this.currentCoachMessage += message.delta;

          // Mettre à jour le dernier message ou en créer un nouveau
          const messages = store.messages;
          const lastMessage = messages[messages.length - 1];

          if (lastMessage && lastMessage.role === 'coach') {
            // Mettre à jour via le store (Zustand handle l'immutabilité)
            logger.debug('VOICE_ORCHESTRATOR', '🔄 Updating existing coach message');
            // On ne peut pas modifier directement, il faut recréer le tableau
            const updatedMessages = messages.slice(0, -1);
            store.clearMessages();
            updatedMessages.forEach(msg => store.addMessage(msg));
            store.addMessage({
              role: 'coach',
              content: this.currentCoachMessage
            });
          } else {
            // Créer un nouveau message du coach
            logger.info('VOICE_ORCHESTRATOR', '➕ Creating new coach message');
            store.addMessage({
              role: 'coach',
              content: this.currentCoachMessage
            });
          }
        }
        break;

      // Transcription du coach complète
      case 'response.audio_transcript.done':
        if (this.currentCoachMessage) {
          logger.info('VOICE_ORCHESTRATOR', '✅ Coach transcript completed', {
            fullMessage: this.currentCoachMessage.substring(0, 100) + '...'
          });

          // Réinitialiser l'accumulation
          this.currentCoachMessage = '';
        }
        break;

      // Fin de réponse audio
      case 'response.audio.done':
        logger.info('VOICE_ORCHESTRATOR', '✅ Audio response completed');
        store.setSpeaking(false);
        break;

      // Fin de réponse complète
      case 'response.done':
        logger.info('VOICE_ORCHESTRATOR', '✅ Response done, setting state back to listening');
        store.setVoiceState('listening');
        store.setProcessing(false);
        store.setSpeaking(false);
        break;

      // Erreur
      case 'error':
        logger.error('VOICE_ORCHESTRATOR', '❌ Realtime API error from server', {
          errorMessage: message.error?.message,
          errorType: message.error?.type,
          fullMessage: message
        });
        store.setVoiceState('error');
        store.setError(message.error?.message || 'Unknown error');
        audioOutputService.stop();
        break;

      // Session mise à jour
      case 'session.updated':
        logger.info('VOICE_ORCHESTRATOR', '⚙️ Session configuration updated');
        break;

      // Début de création de réponse
      case 'response.created':
        logger.info('VOICE_ORCHESTRATOR', '🎯 Response creation started by server');
        store.setVoiceState('processing');
        store.setProcessing(true);
        break;

      default:
        logger.debug('VOICE_ORCHESTRATOR', '❓ Unhandled message type', { type: message.type });
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

    audioOutputService.cleanup();
    this.audioBuffer = [];
    this.isProcessingAudio = false;
    this.currentCoachMessage = '';
    this.isInitialized = false;
  }

  /**
   * Vérifier si l'orchestrateur est initialisé
   */
  get initialized(): boolean {
    return this.isInitialized;
  }
}

// Export singleton
export const voiceCoachOrchestrator = new VoiceCoachOrchestrator();
