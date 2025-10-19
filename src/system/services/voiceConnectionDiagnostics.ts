/**
 * Voice Connection Diagnostics
 * Utility to diagnose voice connection issues
 */

import logger from '../../lib/utils/logger';
import { environmentDetectionService } from './environmentDetectionService';

export interface DiagnosticResult {
  passed: boolean;
  test: string;
  message: string;
  details?: any;
}

export class VoiceConnectionDiagnostics {
  /**
   * Run all diagnostic tests
   */
  async runAllTests(): Promise<DiagnosticResult[]> {
    logger.info('VOICE_DIAGNOSTICS', '🔬 Starting voice connection diagnostics');

    const results: DiagnosticResult[] = [];

    // Test 1: Environment variables
    results.push(await this.testEnvironmentVariables());

    // Test 2: WebSocket API availability
    results.push(await this.testWebSocketAPI());

    // Test 3: Environment capabilities
    results.push(await this.testEnvironmentCapabilities());

    // Test 4: Supabase edge function reachability (HTTP)
    results.push(await this.testEdgeFunctionReachability());

    // Test 5: Microphone permissions
    results.push(await this.testMicrophonePermissions());

    // Test 6: WebSocket connection (if all previous tests passed)
    const allPreviousPassed = results.every(r => r.passed);
    if (allPreviousPassed) {
      results.push(await this.testWebSocketConnection());
    }

    logger.info('VOICE_DIAGNOSTICS', '✅ Diagnostics complete', {
      totalTests: results.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length
    });

    return results;
  }

  /**
   * Test 1: Environment variables
   */
  private async testEnvironmentVariables(): Promise<DiagnosticResult> {
    logger.info('VOICE_DIAGNOSTICS', 'Test 1: Checking environment variables');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const hasUrl = !!supabaseUrl;
    const hasKey = !!supabaseAnonKey;
    const passed = hasUrl && hasKey;

    const details = {
      VITE_SUPABASE_URL: hasUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING',
      VITE_SUPABASE_ANON_KEY: hasKey ? 'SET (length: ' + supabaseAnonKey.length + ')' : 'MISSING',
      allViteVars: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_'))
    };

    return {
      passed,
      test: 'Environment Variables',
      message: passed
        ? 'Supabase configuration found'
        : `Missing environment variables: ${!hasUrl ? 'VITE_SUPABASE_URL ' : ''}${!hasKey ? 'VITE_SUPABASE_ANON_KEY' : ''}`,
      details
    };
  }

  /**
   * Test 2: WebSocket API availability
   */
  private async testWebSocketAPI(): Promise<DiagnosticResult> {
    logger.info('VOICE_DIAGNOSTICS', 'Test 2: Checking WebSocket API availability');

    const passed = typeof WebSocket !== 'undefined';

    return {
      passed,
      test: 'WebSocket API',
      message: passed
        ? 'WebSocket API is available'
        : 'WebSocket API is not available in this browser/environment',
      details: {
        hasWebSocket: passed,
        userAgent: navigator.userAgent
      }
    };
  }

  /**
   * Test 3: Environment capabilities
   */
  private async testEnvironmentCapabilities(): Promise<DiagnosticResult> {
    logger.info('VOICE_DIAGNOSTICS', 'Test 3: Checking environment capabilities');

    const caps = environmentDetectionService.getCapabilities();
    const passed = caps.canUseVoiceMode;

    return {
      passed,
      test: 'Environment Capabilities',
      message: passed
        ? 'Voice mode is supported in this environment'
        : `Voice mode not supported: ${caps.limitations.join(', ')}`,
      details: {
        canUseVoiceMode: caps.canUseVoiceMode,
        canUseWebSocket: caps.canUseWebSocket,
        environmentName: caps.environmentName,
        isStackBlitz: caps.isStackBlitz,
        isWebContainer: caps.isWebContainer,
        limitations: caps.limitations,
        recommendations: caps.recommendations
      }
    };
  }

  /**
   * Test 4: Edge function reachability (HTTP test)
   */
  private async testEdgeFunctionReachability(): Promise<DiagnosticResult> {
    logger.info('VOICE_DIAGNOSTICS', 'Test 4: Testing edge function reachability (HTTP)');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        passed: false,
        test: 'Edge Function Reachability',
        message: 'Cannot test - missing configuration',
        details: { reason: 'Environment variables not set' }
      };
    }

    try {
      // Test with a simple HTTP request first (not WebSocket)
      const httpUrl = `${supabaseUrl}/functions/v1/voice-coach-realtime`;

      logger.info('VOICE_DIAGNOSTICS', 'Making HTTP OPTIONS request to edge function', {
        url: httpUrl
      });

      const response = await fetch(httpUrl, {
        method: 'OPTIONS',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });

      const passed = response.ok || response.status === 426; // 426 = Upgrade Required is expected for WebSocket endpoints

      return {
        passed,
        test: 'Edge Function Reachability',
        message: passed
          ? `Edge function is reachable (HTTP ${response.status})`
          : `Edge function returned error: HTTP ${response.status}`,
        details: {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          url: httpUrl
        }
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);

      return {
        passed: false,
        test: 'Edge Function Reachability',
        message: `Cannot reach edge function: ${errorMsg}`,
        details: {
          error: errorMsg,
          name: error instanceof Error ? error.name : 'Unknown',
          possibleCauses: [
            'Network connectivity issue',
            'CORS policy blocking request',
            'Edge function not deployed',
            'Firewall or proxy blocking connection'
          ]
        }
      };
    }
  }

  /**
   * Test 5: Microphone permissions
   */
  private async testMicrophonePermissions(): Promise<DiagnosticResult> {
    logger.info('VOICE_DIAGNOSTICS', 'Test 5: Checking microphone permissions');

    try {
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return {
          passed: false,
          test: 'Microphone Permissions',
          message: 'getUserMedia API not available',
          details: {
            reason: 'Browser does not support mediaDevices API',
            suggestion: 'Update your browser or use a different browser'
          }
        };
      }

      // Try to get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Clean up immediately
      stream.getTracks().forEach(track => track.stop());

      return {
        passed: true,
        test: 'Microphone Permissions',
        message: 'Microphone access granted',
        details: {
          tracks: stream.getTracks().map(t => ({
            kind: t.kind,
            label: t.label,
            enabled: t.enabled
          }))
        }
      };
    } catch (error) {
      const errorName = error instanceof Error ? error.name : 'Unknown';
      const errorMsg = error instanceof Error ? error.message : String(error);

      return {
        passed: false,
        test: 'Microphone Permissions',
        message: `Microphone access denied: ${errorName}`,
        details: {
          error: errorMsg,
          errorName,
          possibleCauses: errorName === 'NotAllowedError'
            ? ['User denied microphone permission', 'Permission prompt dismissed']
            : errorName === 'NotFoundError'
            ? ['No microphone device found']
            : ['Unknown permission error']
        }
      };
    }
  }

  /**
   * Test 6: WebSocket connection
   */
  private async testWebSocketConnection(): Promise<DiagnosticResult> {
    logger.info('VOICE_DIAGNOSTICS', 'Test 6: Testing WebSocket connection');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        passed: false,
        test: 'WebSocket Connection',
        message: 'Cannot test - missing configuration',
        details: { reason: 'Environment variables not set' }
      };
    }

    return new Promise((resolve) => {
      const wsUrl = supabaseUrl
        .replace('https://', 'wss://')
        .replace('/rest/v1', '')
        + `/functions/v1/voice-coach-realtime?model=gpt-4o-realtime-preview-2024-10-01&apikey=${supabaseAnonKey}`;

      logger.info('VOICE_DIAGNOSTICS', 'Creating WebSocket connection', {
        url: wsUrl.replace(supabaseAnonKey, '[REDACTED]')
      });

      const ws = new WebSocket(wsUrl);
      const startTime = Date.now();
      let resolved = false;

      const cleanup = () => {
        if (!resolved) {
          resolved = true;
          ws.close();
        }
      };

      const timeout = setTimeout(() => {
        const duration = Date.now() - startTime;
        cleanup();

        resolve({
          passed: false,
          test: 'WebSocket Connection',
          message: 'WebSocket connection timeout (10s)',
          details: {
            duration,
            finalState: ws.readyState,
            finalStateName: ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][ws.readyState]
          }
        });
      }, 10000);

      ws.onopen = () => {
        const duration = Date.now() - startTime;
        clearTimeout(timeout);
        cleanup();

        resolve({
          passed: true,
          test: 'WebSocket Connection',
          message: `WebSocket connected successfully (${duration}ms)`,
          details: {
            duration,
            state: 'OPEN'
          }
        });
      };

      ws.onerror = (event) => {
        const duration = Date.now() - startTime;
        clearTimeout(timeout);
        cleanup();

        resolve({
          passed: false,
          test: 'WebSocket Connection',
          message: 'WebSocket connection error - likely OPENAI_API_KEY not configured',
          details: {
            duration,
            error: 'WebSocket error event fired',
            state: ws.readyState,
            stateName: ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][ws.readyState],
            possibleCauses: [
              'OPENAI_API_KEY not set in Supabase Edge Function secrets',
              'OpenAI API key is invalid or expired',
              'Network firewall blocking WebSocket connections',
              'Supabase edge function internal error'
            ],
            solution: 'Go to Supabase Dashboard > Edge Functions > Secrets and add OPENAI_API_KEY'
          }
        });
      };

      ws.onclose = (event) => {
        if (!resolved) {
          const duration = Date.now() - startTime;
          clearTimeout(timeout);
          cleanup();

          resolve({
            passed: false,
            test: 'WebSocket Connection',
            message: `WebSocket closed unexpectedly: ${event.reason || 'No reason'}`,
            details: {
              duration,
              code: event.code,
              reason: event.reason,
              wasClean: event.wasClean
            }
          });
        }
      };
    });
  }

  /**
   * Print diagnostic results to console
   */
  printResults(results: DiagnosticResult[]): void {
    console.group('🔬 Voice Connection Diagnostics');

    results.forEach((result, index) => {
      const icon = result.passed ? '✅' : '❌';
      console.group(`${icon} Test ${index + 1}: ${result.test}`);
      console.log('Status:', result.passed ? 'PASSED' : 'FAILED');
      console.log('Message:', result.message);
      if (result.details) {
        console.log('Details:', result.details);
      }
      console.groupEnd();
    });

    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;

    console.log('\n📊 Summary:', `${passedCount}/${totalCount} tests passed`);

    if (passedCount < totalCount) {
      console.log('\n💡 Next Steps:');
      results.filter(r => !r.passed).forEach(result => {
        console.log(`- Fix: ${result.test}`);
        console.log(`  ${result.message}`);
      });
    }

    console.groupEnd();
  }
}

// Export singleton
export const voiceConnectionDiagnostics = new VoiceConnectionDiagnostics();
