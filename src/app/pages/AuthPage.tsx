import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useUserStore } from '../../system/store/userStore';
import logger from '../../lib/utils/logger';

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session } = useUserStore();

  const mode = searchParams.get('mode') || 'login';

  // Add landing page body class for auth page
  useEffect(() => {
    document.body.classList.add('bg-halo-crucible');
    return () => {
      document.body.classList.remove('bg-halo-crucible');
    };
  }, []);

  useEffect(() => {
    if (session) {
      logger.debug('AUTH_PAGE', 'User already authenticated, redirecting to app');
      navigate('/app', { replace: true });
    }
  }, [session, navigate]);

  const handleSuccess = () => {
    logger.info('AUTH_PAGE', 'Authentication successful, redirecting to app');
    navigate('/app', { replace: true });
  };

  return <AuthForm onSuccess={handleSuccess} />;
}
