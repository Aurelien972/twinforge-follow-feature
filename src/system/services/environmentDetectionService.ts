/**
 * Environment Detection Service
 * Détecte l'environnement d'exécution et les capacités disponibles
 */

import logger from '../../lib/utils/logger';

export interface EnvironmentCapabilities {
  canUseWebSocket: boolean;
  canUseVoiceMode: boolean;
  canUseTextMode: boolean;
  isStackBlitz: boolean;
  isWebContainer: boolean;
  isProduction: boolean;
  isDevelopment: boolean;
  environmentName: string;
  limitations: string[];
  recommendations: string[];
}

class EnvironmentDetectionService {
  private capabilities: EnvironmentCapabilities | null = null;

  /**
   * Détecter l'environnement et ses capacités
   */
  detect(): EnvironmentCapabilities {
    if (this.capabilities) {
      return this.capabilities;
    }

    logger.info('ENV_DETECTION', 'Detecting environment capabilities');

    const hostname = window.location.hostname;
    const userAgent = navigator.userAgent;

    // Détection StackBlitz / WebContainer
    const isStackBlitz = hostname.includes('stackblitz') ||
                         hostname.includes('webcontainer') ||
                         hostname.includes('stackblitz.io');

    const isWebContainer = isStackBlitz ||
                           userAgent.includes('webcontainer');

    // Détection environnement
    const isProduction = hostname.includes('vercel.app') ||
                         hostname.includes('netlify.app') ||
                         hostname.includes('railway.app') ||
                         (!hostname.includes('localhost') && !isStackBlitz);

    const isDevelopment = hostname.includes('localhost') ||
                          hostname === '127.0.0.1';

    // Capacités WebSocket
    const canUseWebSocket = !isWebContainer && typeof WebSocket !== 'undefined';

    // Le mode vocal nécessite WebSocket
    const canUseVoiceMode = canUseWebSocket && !isWebContainer;

    // Le mode texte est toujours disponible
    const canUseTextMode = true;

    // Nom de l'environnement
    let environmentName = 'Unknown';
    if (isStackBlitz) {
      environmentName = 'StackBlitz WebContainer';
    } else if (isDevelopment) {
      environmentName = 'Development (localhost)';
    } else if (isProduction) {
      environmentName = 'Production';
    }

    // Limitations
    const limitations: string[] = [];
    if (isWebContainer) {
      limitations.push('Les WebSockets externes ne sont pas supportés dans WebContainer');
      limitations.push('Le mode vocal n\'est pas disponible');
      limitations.push('Seul le mode texte est fonctionnel');
    }

    if (!canUseWebSocket) {
      limitations.push('Les WebSockets ne sont pas disponibles dans ce navigateur');
    }

    // Recommandations
    const recommendations: string[] = [];
    if (isStackBlitz) {
      recommendations.push('Utilisez le mode texte pour tester les fonctionnalités de chat');
      recommendations.push('Déployez en production pour accéder au mode vocal');
      recommendations.push('Le mode texte fonctionne parfaitement dans cet environnement');
    }

    this.capabilities = {
      canUseWebSocket,
      canUseVoiceMode,
      canUseTextMode,
      isStackBlitz,
      isWebContainer,
      isProduction,
      isDevelopment,
      environmentName,
      limitations,
      recommendations
    };

    logger.info('ENV_DETECTION', 'Environment detected', {
      environment: environmentName,
      canUseVoiceMode,
      canUseTextMode,
      limitations: limitations.length,
      recommendations: recommendations.length
    });

    return this.capabilities;
  }

  /**
   * Obtenir les capacités (avec détection si nécessaire)
   */
  getCapabilities(): EnvironmentCapabilities {
    return this.capabilities || this.detect();
  }

  /**
   * Vérifier si le mode vocal est disponible
   */
  isVoiceModeAvailable(): boolean {
    return this.getCapabilities().canUseVoiceMode;
  }

  /**
   * Vérifier si on est dans StackBlitz
   */
  isInStackBlitz(): boolean {
    return this.getCapabilities().isStackBlitz;
  }

  /**
   * Obtenir un message d'erreur approprié pour le mode vocal
   */
  getVoiceModeUnavailableMessage(): string {
    const caps = this.getCapabilities();

    if (caps.isStackBlitz || caps.isWebContainer) {
      return `🚫 Le mode vocal n'est pas disponible dans ${caps.environmentName}.\n\n` +
             `Raison : Les WebSockets externes ne sont pas supportés dans cet environnement.\n\n` +
             `✅ Solutions :\n` +
             `• Utilisez le mode texte (disponible maintenant)\n` +
             `• Déployez l'application en production pour accéder au mode vocal\n\n` +
             `💡 Le mode texte offre les mêmes fonctionnalités de chat intelligent !`;
    }

    if (!caps.canUseWebSocket) {
      return `🚫 Le mode vocal nécessite la prise en charge des WebSockets.\n\n` +
             `Votre navigateur ou configuration réseau ne supporte pas cette fonctionnalité.\n\n` +
             `✅ Solution :\n` +
             `• Utilisez le mode texte (disponible maintenant)`;
    }

    return 'Le mode vocal n\'est pas disponible actuellement. Utilisez le mode texte.';
  }

  /**
   * Logger les informations d'environnement pour le debug
   */
  logEnvironmentInfo(): void {
    const caps = this.getCapabilities();

    console.group('🌍 Environment Information');
    console.log('Environment:', caps.environmentName);
    console.log('Voice Mode Available:', caps.canUseVoiceMode ? '✅' : '❌');
    console.log('Text Mode Available:', caps.canUseTextMode ? '✅' : '❌');
    console.log('WebSocket Support:', caps.canUseWebSocket ? '✅' : '❌');

    if (caps.limitations.length > 0) {
      console.group('⚠️ Limitations:');
      caps.limitations.forEach(limitation => console.log('-', limitation));
      console.groupEnd();
    }

    if (caps.recommendations.length > 0) {
      console.group('💡 Recommendations:');
      caps.recommendations.forEach(rec => console.log('-', rec));
      console.groupEnd();
    }

    console.groupEnd();
  }
}

// Export singleton
export const environmentDetectionService = new EnvironmentDetectionService();
