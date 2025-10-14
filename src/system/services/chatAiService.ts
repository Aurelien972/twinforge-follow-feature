/**
 * Chat AI Service
 * Service for interacting with the chat-ai Edge Function
 */

import { supabase } from '../supabase/client';
import logger from '../../lib/utils/logger';
import type { ChatMessage } from '../../domain/coachChat';
import type { ChatMode } from '../store/globalChatStore';

export interface ChatAIRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  mode: ChatMode;
  contextData?: any;
  stream?: boolean;
}

export interface ChatAIResponse {
  message: {
    role: 'assistant';
    content: string;
  };
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class ChatAIService {
  private baseUrl: string;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    this.baseUrl = `${supabaseUrl}/functions/v1`;
  }

  async sendMessage(request: ChatAIRequest): Promise<ChatAIResponse> {
    try {
      logger.debug('CHAT_AI_SERVICE', 'Sending message to AI', {
        mode: request.mode,
        messageCount: request.messages.length,
        hasContext: !!request.contextData
      });

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${this.baseUrl}/chat-ai`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data: ChatAIResponse = await response.json();

      logger.info('CHAT_AI_SERVICE', 'Received AI response', {
        mode: request.mode,
        tokensUsed: data.usage?.total_tokens
      });

      return data;
    } catch (error) {
      logger.error('CHAT_AI_SERVICE', 'Error sending message', { error });
      throw error;
    }
  }

  async sendStreamMessage(
    request: ChatAIRequest,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${this.baseUrl}/chat-ai`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
        },
        body: JSON.stringify({
          ...request,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;

              if (content) {
                onChunk(content);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      logger.error('CHAT_AI_SERVICE', 'Error in stream', { error });
      throw error;
    }
  }

  convertMessagesToAPI(messages: ChatMessage[]): ChatAIRequest['messages'] {
    return messages.map(msg => ({
      role: msg.role === 'coach' ? 'assistant' : msg.role as 'system' | 'user' | 'assistant',
      content: msg.content
    }));
  }
}

export const chatAIService = new ChatAIService();
