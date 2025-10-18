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
      logger.info('REALTIME_API', '✅ Already connected, skipping');
      return;
    }

    this.config = config;

    try {
      logger.info('REALTIME_API', '🚀 STARTING CONNECTION TO REALTIME API via edge function', {
        model: config.model,
        voice: config.voice,
        temperature: config.temperature,
        maxTokens: config.maxTokens
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

      logger.info('REALTIME_API', '🌐 WebSocket URL constructed', {
        originalUrl: supabaseUrl,
        wsUrl: wsUrl.replace(supabaseAnonKey, '[REDACTED]'),
        model: config.model
      });

      // Créer la connexion WebSocket via notre edge function
      logger.info('REALTIME_API', '🔌 Creating WebSocket connection to edge function...');
      this.ws = new WebSocket(wsUrl);
      logger.info('REALTIME_API', '✅ WebSocket object created');

      // Note: WebSocket ne supporte pas les headers custom dans le constructeur
      // L'authentification Supabase se fait via le paramètre apikey dans l'URL

      this.ws.binaryType = 'arraybuffer';
      logger.info('REALTIME_API', '⏳ WebSocket instance created, setting up event handlers...');

      this.ws.onopen = () => {
        logger.info('REALTIME_API', '📡 WebSocket.onopen triggered');
        this.handleOpen();
      };
      this.ws.onmessage = (event) => {
        logger.debug('REALTIME_API', '📨 WebSocket.onmessage triggered');
        this.handleMessage(event);
      };
      this.ws.onerror = (event) => {
        logger.error('REALTIME_API', '❌ WebSocket.onerror triggered', { event });
        this.handleError(event);
      };
      this.ws.onclose = (event) => {
        logger.info('REALTIME_API', '🔌 WebSocket.onclose triggered', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        this.handleClose(event);
      };

      logger.info('REALTIME_API', '✅ Event handlers attached, waiting for connection...');

      // Attendre la connexion
      logger.info('REALTIME_API', '⏳ Waiting for WebSocket connection (timeout: 10s)...');
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          logger.error('REALTIME_API', '❌ CONNECTION TIMEOUT after 10 seconds');
          logger.error('REALTIME_API', 'WebSocket state at timeout', {
            readyState: this.ws?.readyState,
            readyStateNames: {
              0: 'CONNECTING',
              1: 'OPEN',
              2: 'CLOSING',
              3: 'CLOSED'
            }[this.ws?.readyState ?? 3]
          });
          reject(new Error('Connection timeout - WebSocket did not open within 10 seconds'));
        }, 10000);

        const onConnect = () => {
          logger.info('REALTIME_API', '✅ Connection promise resolved');
          clearTimeout(timeout);
          this.connectHandlers.delete(onConnect);
          resolve();
        };

        this.connectHandlers.add(onConnect);
        logger.info('REALTIME_API', '👂 Listening for connection event...');
      });

      logger.info('REALTIME_API', '✅✅✅ SUCCESSFULLY CONNECTED TO REALTIME API ✅✅✅');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      logger.error('REALTIME_API', '❌❌❌ CONNECTION FAILED ❌❌❌', {
        errorMessage,
        errorStack,
        wsState: this.ws?.readyState,
        isConnected: this.isConnected
      });

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
      logger.error('REALTIME_API', '❌ Cannot send message: not connected', {
        hasWs: !!this.ws,
        readyState: this.ws?.readyState,
        messageType: message.type
      });
      return;
    }

    try {
      this.ws.send(JSON.stringify(message));
      logger.info('REALTIME_API', '📤 Message sent to server', {
        type: message.type,
        keys: Object.keys(message)
      });
    } catch (error) {
      logger.error('REALTIME_API', '❌ Error sending message', {
        error: error instanceof Error ? error.message : String(error),
        messageType: message.type
      });
    }
  }

  /**
   * Configurer la session avec le système prompt
   */
  configureSession(systemPrompt: string, mode: ChatMode): void {
    logger.info('REALTIME_API', '⚙️ Configuring session...', {
      mode,
      voice: this.config?.voice || 'alloy',
      systemPromptLength: systemPrompt.length
    });

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

    logger.info('REALTIME_API', '✅ Session configuration sent to server', { mode });
  }

  /**
   * Envoyer de l'audio à l'API pour transcription et traitement
   */
  sendAudio(audioData: ArrayBuffer): void {
    if (!this.isConnected) {
      logger.warn('REALTIME_API', '⚠️ Cannot send audio: not connected');
      return;
    }

    logger.debug('REALTIME_API', '🎙️ Audio data added to queue', {
      bytesLength: audioData.byteLength,
      queueLength: this.audioQueue.length + 1
    });

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
    logger.info('REALTIME_API', '✅ Committing audio buffer for processing');
    this.sendMessage({
      type: 'input_audio_buffer.commit'
    });
    logger.info('REALTIME_API', '🚀 Audio buffer commit sent to server');
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
    logger.info('REALTIME_API', '✅✅✅ WebSocket OPEN event - Connection established ✅✅✅');
    this.isConnected = true;
    this.reconnectAttempts = 0;

    logger.info('REALTIME_API', '📢 Notifying connection handlers', {
      handlerCount: this.connectHandlers.size
    });
    this.connectHandlers.forEach(handler => {
      try {
        handler();
        logger.debug('REALTIME_API', '✅ Connection handler executed');
      } catch (error) {
        logger.error('REALTIME_API', '❌ Error in connection handler', { error });
      }
    });
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data) as RealtimeMessage;

      // Log détaillé pour les types importants
      const importantTypes = [
        'session.updated',
        'conversation.item.input_audio_transcription.delta',
        'conversation.item.input_audio_transcription.completed',
        'response.audio.delta',
        'response.audio_transcript.delta',
        'response.done',
        'error'
      ];

      if (importantTypes.includes(message.type)) {
        logger.info('REALTIME_API', `📨 Important message received: ${message.type}`, {
          type: message.type,
          hasContent: !!message.delta || !!message.transcript || !!message.audio
        });
      } else {
        logger.debug('REALTIME_API', '📨 Message received', { type: message.type });
      }

      // Dispatcher le message à tous les handlers
      logger.debug('REALTIME_API', '📢 Dispatching to handlers', {
        handlerCount: this.messageHandlers.size,
        messageType: message.type
      });
      this.messageHandlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          logger.error('REALTIME_API', '❌ Error in message handler', {
            error: error instanceof Error ? error.message : String(error),
            messageType: message.type
          });
        }
      });

    } catch (error) {
      logger.error('REALTIME_API', '❌ Error parsing message', {
        error: error instanceof Error ? error.message : String(error),
        data: typeof event.data === 'string' ? event.data.substring(0, 200) : 'binary data'
      });
    }
  }

  private handleError(event: Event): void {
    // Essayer d'extraire plus d'informations sur l'erreur
    const errorDetails: any = {
      type: event.type,
      target: event.target ? {
        readyState: (event.target as WebSocket).readyState,
        readyStateNames: {
          0: 'CONNECTING',
          1: 'OPEN',
          2: 'CLOSING',
          3: 'CLOSED'
        }[(event.target as WebSocket).readyState],
        url: (event.target as WebSocket).url
      } : null
    };

    const error = new Error(`WebSocket error: ${JSON.stringify(errorDetails)}`);
    logger.error('REALTIME_API', '❌❌❌ WebSocket ERROR event ❌❌❌', errorDetails);

    logger.info('REALTIME_API', '📢 Notifying error handlers', {
      handlerCount: this.errorHandlers.size
    });
    this.errorHandlers.forEach(handler => {
      try {
        handler(error);
      } catch (handlerError) {
        logger.error('REALTIME_API', '❌ Error in error handler', { handlerError });
      }
    });
  }

  private handleClose(event: CloseEvent): void {
    logger.info('REALTIME_API', '🔌🔌🔌 WebSocket CLOSED 🔌🔌🔌', {
      code: event.code,
      reason: event.reason || 'No reason provided',
      wasClean: event.wasClean,
      closeCodeMeaning: this.getCloseCodeMeaning(event.code)
    });

    this.isConnected = false;
    this.ws = null;

    logger.info('REALTIME_API', '📢 Notifying disconnect handlers', {
      handlerCount: this.disconnectHandlers.size
    });
    this.disconnectHandlers.forEach(handler => {
      try {
        handler();
      } catch (error) {
        logger.error('REALTIME_API', '❌ Error in disconnect handler', { error });
      }
    });

    // Tentative de reconnexion si ce n'était pas une fermeture propre
    if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
      logger.info('REALTIME_API', '🔄 Will attempt reconnection (unclean close)');
      this.attemptReconnect();
    } else if (event.wasClean) {
      logger.info('REALTIME_API', '✅ Clean close, no reconnection needed');
    } else {
      logger.warn('REALTIME_API', '⚠️ Max reconnection attempts reached, giving up');
    }
  }

  /**
   * Obtenir la signification d'un code de fermeture WebSocket
   */
  private getCloseCodeMeaning(code: number): string {
    const meanings: Record<number, string> = {
      1000: 'Normal Closure',
      1001: 'Going Away',
      1002: 'Protocol Error',
      1003: 'Unsupported Data',
      1005: 'No Status Received',
      1006: 'Abnormal Closure',
      1007: 'Invalid Frame Payload Data',
      1008: 'Policy Violation',
      1009: 'Message Too Big',
      1010: 'Mandatory Extension',
      1011: 'Internal Server Error',
      1015: 'TLS Handshake'
    };
    return meanings[code] || `Unknown (${code})`;
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
