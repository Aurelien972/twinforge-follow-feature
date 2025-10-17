import React, { Component, ErrorInfo, ReactNode } from 'react';
import logger from '../../lib/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  pageName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

/**
 * Page-level Error Boundary with auto-recovery
 * Prevents white screen by catching errors and showing fallback UI
 */
export class ErrorBoundaryPage extends Component<Props, State> {
  private errorTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { pageName, onError } = this.props;
    const { errorCount } = this.state;

    // Log error
    logger.error('ErrorBoundary', `Error in ${pageName || 'page'}`, {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorCount: errorCount + 1,
    });

    // Update error count
    this.setState(prevState => ({
      errorCount: prevState.errorCount + 1,
    }));

    // Call custom error handler
    if (onError) {
      onError(error, errorInfo);
    }

    // Auto-recovery after 3 seconds if error count < 3
    if (errorCount < 3) {
      this.errorTimeout = setTimeout(() => {
        logger.info('ErrorBoundary', `Auto-recovering ${pageName || 'page'}`);
        this.setState({
          hasError: false,
          error: null,
        });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorCount: 0,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, errorCount } = this.state;
    const { children, fallback, pageName } = this.props;

    if (hasError) {
      // Custom fallback provided
      if (fallback) {
        return fallback;
      }

      // Too many errors - show reload button
      if (errorCount >= 3) {
        return (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="glass-card max-w-lg w-full p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Une erreur est survenue
                </h2>
                <p className="text-gray-400 text-sm mb-2">
                  {pageName ? `La page "${pageName}" rencontre un problème.` : 'Cette page rencontre un problème.'}
                </p>
                {error && (
                  <p className="text-xs text-gray-500 font-mono mt-2 p-2 bg-black/30 rounded">
                    {error.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={this.handleReload}
                  className="btn-glass w-full py-3 px-6 rounded-xl font-medium"
                >
                  Recharger l'application
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="btn-glass w-full py-3 px-6 rounded-xl font-medium opacity-70"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Show auto-recovery message
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="glass-card max-w-lg w-full p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
                <svg
                  className="w-8 h-8 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Récupération en cours...
              </h2>
              <p className="text-gray-400 text-sm">
                {pageName ? `La page "${pageName}" se recharge automatiquement.` : 'La page se recharge automatiquement.'}
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="btn-glass py-2 px-6 rounded-xl font-medium text-sm"
            >
              Réessayer maintenant
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundaryPage;
