/**
 * OpenAI Realtime API Service - WebRTC Edition
 * Service pour gérer la connexion WebRTC avec l'API Realtime d'OpenAI
 * Utilise l'interface unifiée recommandée par OpenAI pour les navigateurs
 *
 * Architecture:
 * - Le client crée un RTCPeerConnection
 * - Envoie le SDP offer au backend (/session)
 * - Le backend retourne le SDP answer d'OpenAI
 * - Connexion WebRTC peer-to-peer automatique
 * - Audio géré automatiquement par WebRTC
 * - Événements via RTCDataChannel
 */

import logger from '../../lib/utils/logger';
import type { ChatMode } from '../store/globalChatStore';
import type { VoiceType } from '../store/voiceCoachStore';

interface RealtimeConfig {
  model: string;
  voice: VoiceType;
  temperature?: number;
  maxTokens?: number;
  instructions?: string;
}

interface RealtimeMessage {
  type: string;
  [key: string]: any;
}

type MessageHandler = (message: RealtimeMessage) => void;
type ErrorHandler = (error: Error) => void;
type ConnectionHandler = () => void;

class OpenAIRealtimeService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private config: RealtimeConfig | null = null;
  private isConnected = false;
  private messageHandlers: Set<MessageHandler> = new Set();
  private errorHandlers: Set<ErrorHandler> = new Set();
  private connectHandlers: Set<ConnectionHandler> = new Set();
  private disconnectHandlers: Set<ConnectionHandler> = new Set();
  private audioElement: HTMLAudioElement | null = null;
  private localStream: MediaStream | null = null;

  /**
   * Initialiser la connexion WebRTC à l'API Realtime via l'interface unifiée
   */
  async connect(config: RealtimeConfig): Promise<void> {
    if (this.isConnected && this.peerConnection) {
      logger.info('REALTIME_WEBRTC', '✅ Already connected, skipping');
      return;
    }

    this.config = config;

    try {
      logger.info('REALTIME_WEBRTC', '🚀 STARTING WEBRTC CONNECTION TO REALTIME API', {
        model: config.model,
        voice: config.voice,
        temperature: config.temperature,
        maxTokens: config.maxTokens,
        timestamp: new Date().toISOString()
      });

      // Vérifier la configuration Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      logger.info('REALTIME_WEBRTC', '🔍 Environment variables check', {
        hasSupabaseUrl: !!supabaseUrl,
        supabaseUrlLength: supabaseUrl?.length || 0,
        hasSupabaseAnonKey: !!supabaseAnonKey,
        supabaseAnonKeyLength: supabaseAnonKey?.length || 0
      });

      if (!supabaseUrl || !supabaseAnonKey) {
        const missingVars = [];
        if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
        if (!supabaseAnonKey) missingVars.push('VITE_SUPABASE_ANON_KEY');

        logger.error('REALTIME_WEBRTC', '❌ Missing Supabase configuration', {
          missingVariables: missingVars
        });
        throw new Error(`Supabase configuration missing: ${missingVars.join(', ')}`);
      }

      // Vérifier le support WebRTC
      if (typeof RTCPeerConnection === 'undefined') {
        logger.error('REALTIME_WEBRTC', '❌ WebRTC not available in this environment');
        throw new Error('WebRTC API is not available in this browser/environment');
      }

      logger.info('REALTIME_WEBRTC', '✅ WebRTC API is available');

      // Créer le RTCPeerConnection
      logger.info('REALTIME_WEBRTC', '🔌 Creating RTCPeerConnection...');
      this.peerConnection = new RTCPeerConnection();

      logger.info('REALTIME_WEBRTC', '✅ RTCPeerConnection created', {
        connectionState: this.peerConnection.connectionState,
        iceConnectionState: this.peerConnection.iceConnectionState
      });

      // Configurer l'élément audio pour la lecture
      this.audioElement = document.createElement('audio');
      this.audioElement.autoplay = true;
      logger.info('REALTIME_WEBRTC', '🔊 Audio element created and configured');

      // Gérer les tracks audio entrants (de l'API OpenAI)
      this.peerConnection.ontrack = (event) => {
        logger.info('REALTIME_WEBRTC', '📥 Received remote audio track', {
          streamId: event.streams[0]?.id,
          trackKind: event.track.kind,
          trackId: event.track.id
        });

        if (this.audioElement && event.streams[0]) {
          this.audioElement.srcObject = event.streams[0];
          logger.info('REALTIME_WEBRTC', '✅ Audio stream connected to audio element');
        }
      };

      // Obtenir le flux audio local (microphone)
      logger.info('REALTIME_WEBRTC', '🎤 Requesting microphone access...');
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 24000,
            channelCount: 1
          }
        });

        logger.info('REALTIME_WEBRTC', '✅ Microphone access granted', {
          trackCount: this.localStream.getTracks().length,
          tracks: this.localStream.getTracks().map(t => ({
            kind: t.kind,
            label: t.label,
            enabled: t.enabled
          }))
        });

        // Ajouter le track audio local au peer connection
        this.localStream.getTracks().forEach(track => {
          if (this.peerConnection && this.localStream) {
            this.peerConnection.addTrack(track, this.localStream);
            logger.info('REALTIME_WEBRTC', '✅ Local audio track added to peer connection', {
              trackKind: track.kind,
              trackId: track.id
            });
          }
        });
      } catch (micError) {
        logger.error('REALTIME_WEBRTC', '❌ Failed to get microphone access', {
          error: micError instanceof Error ? micError.message : String(micError)
        });
        throw new Error('Microphone access required for voice sessions');
      }

      // Créer le data channel pour les événements
      logger.info('REALTIME_WEBRTC', '📡 Creating data channel for events...');
      this.dataChannel = this.peerConnection.createDataChannel('oai-events');

      this.setupDataChannelHandlers();

      // Gérer les événements de connexion
      this.setupConnectionHandlers();

      // Créer l'offer SDP
      logger.info('REALTIME_WEBRTC', '📝 Creating SDP offer...');
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      logger.info('REALTIME_WEBRTC', '✅ SDP offer created and set as local description', {
        sdpType: offer.type,
        sdpLength: offer.sdp?.length || 0
      });

      // Envoyer le SDP offer au backend pour obtenir le SDP answer d'OpenAI
      const sessionUrl = `${supabaseUrl}/functions/v1/voice-coach-realtime/session`;

      logger.info('REALTIME_WEBRTC', '🌐 Sending SDP offer to backend', {
        url: sessionUrl
      });

      const response = await fetch(sessionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          sdp: offer.sdp,
          model: config.model,
          voice: config.voice,
          instructions: config.instructions
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error('REALTIME_WEBRTC', '❌ Backend returned error', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Failed to create session: ${response.status} - ${errorText}`);
      }

      // Récupérer le SDP answer
      const sdpAnswer = await response.text();
      logger.info('REALTIME_WEBRTC', '✅ Received SDP answer from backend', {
        sdpAnswerLength: sdpAnswer.length
      });

      // Définir le SDP answer comme remote description
      const answer: RTCSessionDescriptionInit = {
        type: 'answer',
        sdp: sdpAnswer
      };

      await this.peerConnection.setRemoteDescription(answer);
      logger.info('REALTIME_WEBRTC', '✅ SDP answer set as remote description');

      // Attendre que la connexion soit établie
      logger.info('REALTIME_WEBRTC', '⏳ Waiting for connection to establish...');
      await this.waitForConnection();

      logger.info('REALTIME_WEBRTC', '✅✅✅ SUCCESSFULLY CONNECTED TO REALTIME API VIA WEBRTC ✅✅✅');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      logger.error('REALTIME_WEBRTC', '❌❌❌ CONNECTION FAILED ❌❌❌', {
        errorMessage,
        errorStack,
        connectionState: this.peerConnection?.connectionState,
        iceConnectionState: this.peerConnection?.iceConnectionState
      });

      // Nettoyer en cas d'erreur
      this.cleanup();

      throw error;
    }
  }

  /**
   * Attendre que la connexion WebRTC soit établie
   */
  private async waitForConnection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const startTime = Date.now();
      const timeout = 15000; // 15 secondes

      const checkConnection = () => {
        if (!this.peerConnection) {
          reject(new Error('Peer connection lost'));
          return;
        }

        const state = this.peerConnection.connectionState;
        const iceState = this.peerConnection.iceConnectionState;

        logger.debug('REALTIME_WEBRTC', 'Checking connection state', {
          connectionState: state,
          iceConnectionState: iceState,
          elapsed: Date.now() - startTime
        });

        if (state === 'connected' || iceState === 'connected' || iceState === 'completed') {
          logger.info('REALTIME_WEBRTC', '✅ Connection established', {
            connectionState: state,
            iceConnectionState: iceState,
            duration: Date.now() - startTime
          });
          this.isConnected = true;
          this.connectHandlers.forEach(handler => {
            try {
              handler();
            } catch (error) {
              logger.error('REALTIME_WEBRTC', 'Error in connection handler', { error });
            }
          });
          resolve();
          return;
        }

        if (state === 'failed' || iceState === 'failed') {
          logger.error('REALTIME_WEBRTC', '❌ Connection failed', {
            connectionState: state,
            iceConnectionState: iceState
          });
          reject(new Error('WebRTC connection failed'));
          return;
        }

        if (Date.now() - startTime > timeout) {
          logger.error('REALTIME_WEBRTC', '❌ Connection timeout', {
            connectionState: state,
            iceConnectionState: iceState,
            duration: Date.now() - startTime
          });
          reject(new Error('Connection timeout'));
          return;
        }

        // Réessayer après un court délai
        setTimeout(checkConnection, 100);
      };

      checkConnection();
    });
  }

  /**
   * Configurer les handlers du data channel
   */
  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      logger.info('REALTIME_WEBRTC', '✅ Data channel opened');
    };

    this.dataChannel.onclose = () => {
      logger.info('REALTIME_WEBRTC', '🔌 Data channel closed');
    };

    this.dataChannel.onerror = (error) => {
      logger.error('REALTIME_WEBRTC', '❌ Data channel error', { error });
    };

    this.dataChannel.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as RealtimeMessage;

        // Log des types de messages importants
        const importantTypes = [
          'session.updated',
          'conversation.item.input_audio_transcription.delta',
          'conversation.item.input_audio_transcription.completed',
          'response.audio_transcript.delta',
          'response.audio_transcript.done',
          'response.done',
          'error'
        ];

        if (importantTypes.includes(message.type)) {
          logger.info('REALTIME_WEBRTC', `📨 Important message: ${message.type}`, {
            type: message.type,
            hasContent: !!message.delta || !!message.transcript
          });
        }

        // Dispatcher aux handlers
        this.messageHandlers.forEach(handler => {
          try {
            handler(message);
          } catch (error) {
            logger.error('REALTIME_WEBRTC', 'Error in message handler', {
              error: error instanceof Error ? error.message : String(error),
              messageType: message.type
            });
          }
        });
      } catch (error) {
        logger.error('REALTIME_WEBRTC', 'Error parsing data channel message', {
          error: error instanceof Error ? error.message : String(error),
          data: event.data
        });
      }
    };
  }

  /**
   * Configurer les handlers de connexion
   */
  private setupConnectionHandlers(): void {
    if (!this.peerConnection) return;

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection?.connectionState;
      logger.info('REALTIME_WEBRTC', `Connection state changed: ${state}`);

      if (state === 'failed' || state === 'closed' || state === 'disconnected') {
        this.isConnected = false;
        this.disconnectHandlers.forEach(handler => {
          try {
            handler();
          } catch (error) {
            logger.error('REALTIME_WEBRTC', 'Error in disconnect handler', { error });
          }
        });

        if (state === 'failed') {
          const error = new Error('WebRTC connection failed');
          this.errorHandlers.forEach(handler => {
            try {
              handler(error);
            } catch (handlerError) {
              logger.error('REALTIME_WEBRTC', 'Error in error handler', { handlerError });
            }
          });
        }
      }
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection?.iceConnectionState;
      logger.info('REALTIME_WEBRTC', `ICE connection state changed: ${state}`);
    };

    this.peerConnection.onicegatheringstatechange = () => {
      const state = this.peerConnection?.iceGatheringState;
      logger.debug('REALTIME_WEBRTC', `ICE gathering state changed: ${state}`);
    };
  }

  /**
   * Déconnecter de l'API
   */
  disconnect(): void {
    logger.info('REALTIME_WEBRTC', 'Disconnecting...');
    this.cleanup();
  }

  /**
   * Nettoyer toutes les ressources
   */
  private cleanup(): void {
    // Fermer le data channel
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    // Fermer la peer connection
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    // Arrêter les tracks du stream local
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Nettoyer l'élément audio
    if (this.audioElement) {
      this.audioElement.srcObject = null;
      this.audioElement = null;
    }

    this.isConnected = false;

    logger.info('REALTIME_WEBRTC', 'Cleanup complete');
  }

  /**
   * Envoyer un message via le data channel
   */
  private sendMessage(message: RealtimeMessage): void {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      logger.error('REALTIME_WEBRTC', '❌ Cannot send message: data channel not open', {
        hasDataChannel: !!this.dataChannel,
        readyState: this.dataChannel?.readyState,
        messageType: message.type
      });
      return;
    }

    try {
      this.dataChannel.send(JSON.stringify(message));
      logger.debug('REALTIME_WEBRTC', '📤 Message sent', {
        type: message.type
      });
    } catch (error) {
      logger.error('REALTIME_WEBRTC', '❌ Error sending message', {
        error: error instanceof Error ? error.message : String(error),
        messageType: message.type
      });
    }
  }

  /**
   * Configurer la session (pas nécessaire avec WebRTC, tout est dans le SDP)
   * Gardé pour compatibilité mais ne fait rien
   */
  configureSession(systemPrompt: string, mode: ChatMode): void {
    logger.info('REALTIME_WEBRTC', '⚙️ Session configuration handled by backend during connection', {
      mode,
      promptLength: systemPrompt.length
    });
    // Avec WebRTC + interface unifiée, la config est faite lors du POST /session
    // Pas besoin d'envoyer session.update
  }

  /**
   * Envoyer de l'audio (pas nécessaire avec WebRTC, géré automatiquement)
   * Gardé pour compatibilité mais ne fait rien
   */
  sendAudio(audioData: ArrayBuffer): void {
    logger.debug('REALTIME_WEBRTC', 'Audio is handled automatically by WebRTC, ignoring manual send');
    // WebRTC gère l'audio automatiquement via les tracks
  }

  /**
   * Valider l'audio buffer (pas nécessaire avec WebRTC)
   * Gardé pour compatibilité mais ne fait rien
   */
  commitAudioBuffer(): void {
    logger.debug('REALTIME_WEBRTC', 'Audio buffer commit not needed with WebRTC');
    // WebRTC gère tout automatiquement
  }

  /**
   * Annuler la réponse en cours
   */
  cancelResponse(): void {
    this.sendMessage({
      type: 'response.cancel'
    });
    logger.debug('REALTIME_WEBRTC', 'Response cancellation requested');
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

    logger.debug('REALTIME_WEBRTC', 'Text message sent', { text });
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
   * Getters
   */
  get connected(): boolean {
    return this.isConnected;
  }

  get readyState(): number {
    if (!this.peerConnection) return 3; // CLOSED

    // Mapper les états WebRTC aux états WebSocket pour compatibilité
    const state = this.peerConnection.connectionState;
    switch (state) {
      case 'new':
      case 'connecting':
        return 0; // CONNECTING
      case 'connected':
        return 1; // OPEN
      case 'disconnected':
      case 'failed':
      case 'closed':
        return 3; // CLOSED
      default:
        return 3;
    }
  }
}

// Export singleton
export const openaiRealtimeService = new OpenAIRealtimeService();
