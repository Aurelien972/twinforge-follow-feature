/**
 * OpenAI Realtime API Service
 * Service pour gérer la connexion WebSocket avec l'API Realtime d'OpenAI
 * Gère l'audio bidirectionnel, les transcriptions et les réponses vocales
 */

import logger from '../../lib/utils/logger';
import type { ChatMode } from '../store/globalChatStore';
import type { VoiceType } from '../store/voiceCoachStore';

interface RealtimeConfig {
  model: string;
  voice: VoiceType;
  temperature?: number;
  maxTokens?: number;
}

interface RealtimeMessage {
  type: string;
  [key: string]: any;
}

type MessageHandler = (message: RealtimeMessage) => void;
type ErrorHandler = (error: Error) => void;
type ConnectionHandler = () => void;

class OpenAIRealtimeService {
  private ws: WebSocket | null = null;
  private config: RealtimeConfig | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 1000;
  private messageHandlers: Set<MessageHandler> = new Set();
  private errorHandlers: Set<ErrorHandler> = new Set();
  private connectHandlers: Set<ConnectionHandler> = new Set();
  private disconnectHandlers: Set<ConnectionHandler> = new Set();
  private audioQueue: ArrayBuffer[] = [];
  private isProcessingQueue = false;

  /**
   * Initialiser la connexion à l'API Realtime via notre edge function
   */
  async connect(config: RealtimeConfig): Promise<void> {
    if (this.isConnected && this.ws) {
      logger.debug('REALTIME_API', 'Already connected');
      return;
    }

    this.config = config;

    try {
      logger.info('REALTIME_API', 'Initiating connection via edge function', {
        model: config.model,
        voice: config.voice
      });

      // Récupérer le token Supabase pour l'authentification
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing');
      }

      // URL de notre edge function proxy
      // Pour les WebSockets, on doit construire l'URL correctement
      // Format: wss://[project-ref].supabase.co/functions/v1/[function-name]
      // Important: Supabase nécessite l'apikey dans l'URL pour les WebSockets
      const wsUrl = supabaseUrl
        .replace('https://', 'wss://')
        .replace('/rest/v1', '') // Retirer le path REST si présent
        + `/functions/v1/voice-coach-realtime?model=${encodeURIComponent(config.model)}&apikey=${supabaseAnonKey}`;

      logger.info('REALTIME_API', 'WebSocket URL constructed', {
        originalUrl: supabaseUrl,
        wsUrl: wsUrl.replace(supabaseAnonKey, '[REDACTED]'),
        model: config.model
      });

      // Créer la connexion WebSocket via notre edge function
      logger.info('REALTIME_API', 'Creating WebSocket connection...');
      this.ws = new WebSocket(wsUrl);

      // Note: WebSocket ne supporte pas les headers custom dans le constructeur
      // L'authentification Supabase se fait via le paramètre apikey dans l'URL

      this.ws.binaryType = 'arraybuffer';
      logger.info('REALTIME_API', 'WebSocket instance created, waiting for connection...');

      this.ws.onopen = () => this.handleOpen();
      this.ws.onmessage = (event) => this.handleMessage(event);
      this.ws.onerror = (event) => this.handleError(event);
      this.ws.onclose = (event) => this.handleClose(event);

      // Attendre la connexion
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, 10000);

        const onConnect = () => {
          clearTimeout(timeout);
          this.connectHandlers.delete(onConnect);
          resolve();
        };

        this.connectHandlers.add(onConnect);
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Détecter si on est dans StackBlitz (WebContainer)
      const isStackBlitz = window.location.hostname.includes('stackblitz') ||
                          window.location.hostname.includes('webcontainer');

      if (isStackBlitz) {
        const stackBlitzError = new Error(
          '🚫 La fonctionnalité vocale n\'est pas disponible dans l\'environnement de développement StackBlitz.\n\n' +
          'Raison : Les WebSockets externes ne sont pas supportés dans WebContainer.\n\n' +
          '💡 Solutions :\n' +
          '• Utilisez le chat texte à la place\n' +
          '• Déployez l\'application en production pour accéder au chat vocal'
        );
        logger.error('REALTIME_API', 'StackBlitz WebSocket limitation', {
          message: 'WebSockets are not supported in StackBlitz WebContainer environment',
          suggestion: 'Use text chat or deploy to production'
        });
        throw stackBlitzError;
      }

      logger.error('REALTIME_API', 'Connection failed', { error: errorMessage });
      throw error;
    }
  }

  /**
   * Déconnecter de l'API
   */
  disconnect(): void {
    if (this.ws) {
      logger.info('REALTIME_API', 'Disconnecting');
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
      this.isConnected = false;
    }
  }

  /**
   * Envoyer un message à l'API
   */
  private sendMessage(message: RealtimeMessage): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      logger.error('REALTIME_API', 'Cannot send message: not connected');
      return;
    }

    try {
      this.ws.send(JSON.stringify(message));
      logger.debug('REALTIME_API', 'Message sent', { type: message.type });
    } catch (error) {
      logger.error('REALTIME_API', 'Error sending message', { error });
    }
  }

  /**
   * Configurer la session avec le système prompt
   */
  configureSession(systemPrompt: string, mode: ChatMode): void {
    this.sendMessage({
      type: 'session.update',
      session: {
        modalities: ['text', 'audio'],
        instructions: systemPrompt,
        voice: this.config?.voice || 'alloy',
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        input_audio_transcription: {
          model: 'whisper-1'
        },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500
        },
        temperature: this.config?.temperature || 0.8,
        max_response_output_tokens: this.config?.maxTokens || 4096
      }
    });

    logger.info('REALTIME_API', 'Session configured', { mode });
  }

  /**
   * Envoyer de l'audio à l'API pour transcription et traitement
   */
  sendAudio(audioData: ArrayBuffer): void {
    if (!this.isConnected) {
      logger.warn('REALTIME_API', 'Cannot send audio: not connected');
      return;
    }

    this.audioQueue.push(audioData);
    this.processAudioQueue();
  }

  /**
   * Traiter la file d'attente audio
   */
  private async processAudioQueue(): Promise<void> {
    if (this.isProcessingQueue || this.audioQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    while (this.audioQueue.length > 0) {
      const audioData = this.audioQueue.shift();
      if (audioData) {
        await this.sendAudioChunk(audioData);
      }
    }

    this.isProcessingQueue = false;
  }

  /**
   * Envoyer un chunk audio
   */
  private async sendAudioChunk(audioData: ArrayBuffer): Promise<void> {
    // Convertir en base64
    const base64Audio = this.arrayBufferToBase64(audioData);

    this.sendMessage({
      type: 'input_audio_buffer.append',
      audio: base64Audio
    });
  }

  /**
   * Valider l'input audio buffer pour traitement
   */
  commitAudioBuffer(): void {
    this.sendMessage({
      type: 'input_audio_buffer.commit'
    });

    logger.debug('REALTIME_API', 'Audio buffer committed');
  }

  /**
   * Annuler la réponse en cours
   */
  cancelResponse(): void {
    this.sendMessage({
      type: 'response.cancel'
    });

    logger.debug('REALTIME_API', 'Response cancelled');
  }

  /**
   * Envoyer un message texte
   */
  sendTextMessage(text: string): void {
    this.sendMessage({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [
          {
            type: 'input_text',
            text
          }
        ]
      }
    });

    // Demander une réponse
    this.sendMessage({
      type: 'response.create'
    });

    logger.debug('REALTIME_API', 'Text message sent', { text });
  }

  /**
   * Handlers d'événements
   */
  private handleOpen(): void {
    logger.info('REALTIME_API', 'WebSocket connected');
    this.isConnected = true;
    this.reconnectAttempts = 0;

    this.connectHandlers.forEach(handler => handler());
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data) as RealtimeMessage;

      logger.debug('REALTIME_API', 'Message received', { type: message.type });

      // Dispatcher le message à tous les handlers
      this.messageHandlers.forEach(handler => handler(message));

    } catch (error) {
      logger.error('REALTIME_API', 'Error parsing message', { error });
    }
  }

  private handleError(event: Event): void {
    // Essayer d'extraire plus d'informations sur l'erreur
    const errorDetails: any = {
      type: event.type,
      target: event.target ? {
        readyState: (event.target as WebSocket).readyState,
        url: (event.target as WebSocket).url
      } : null
    };

    const error = new Error(`WebSocket error: ${JSON.stringify(errorDetails)}`);
    logger.error('REALTIME_API', 'WebSocket error', errorDetails);

    this.errorHandlers.forEach(handler => handler(error));
  }

  private handleClose(event: CloseEvent): void {
    logger.info('REALTIME_API', 'WebSocket closed', {
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean
    });

    this.isConnected = false;
    this.ws = null;

    this.disconnectHandlers.forEach(handler => handler());

    // Tentative de reconnexion si ce n'était pas une fermeture propre
    if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.attemptReconnect();
    }
  }

  /**
   * Tentative de reconnexion
   */
  private async attemptReconnect(): Promise<void> {
    this.reconnectAttempts++;

    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    logger.info('REALTIME_API', 'Attempting reconnection', {
      attempt: this.reconnectAttempts,
      delay
    });

    await new Promise(resolve => setTimeout(resolve, delay));

    if (this.config) {
      try {
        await this.connect(this.config);
      } catch (error) {
        logger.error('REALTIME_API', 'Reconnection failed', { error });
      }
    }
  }

  /**
   * Enregistrer des handlers d'événements
   */
  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onError(handler: ErrorHandler): () => void {
    this.errorHandlers.add(handler);
    return () => this.errorHandlers.delete(handler);
  }

  onConnect(handler: ConnectionHandler): () => void {
    this.connectHandlers.add(handler);
    return () => this.connectHandlers.delete(handler);
  }

  onDisconnect(handler: ConnectionHandler): () => void {
    this.disconnectHandlers.add(handler);
    return () => this.disconnectHandlers.delete(handler);
  }

  /**
   * Utilitaires
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Getters
   */
  get connected(): boolean {
    return this.isConnected;
  }

  get readyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }
}

// Export singleton
export const openaiRealtimeService = new OpenAIRealtimeService();
