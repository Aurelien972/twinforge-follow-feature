import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import TwinForgeLogo from '../../ui/components/branding/TwinForgeLogo';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';
import { useFeedback } from '../../hooks';

export default function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { click } = useFeedback();

  const handleLogin = () => {
    click();
    navigate('/auth?mode=login');
  };

  const handleSignup = () => {
    click();
    navigate('/auth?mode=signup');
  };

  const handleLogoClick = () => {
    click();
    navigate('/');
  };

  const isAuthPage = location.pathname === '/auth';

  return (
    <header
      className="fixed top-2 left-4 right-4 z-[9999] rounded-2xl overflow-hidden"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: `
          radial-gradient(circle at 30% 20%, rgba(24, 227, 255, 0.08) 0%, transparent 60%),
          rgba(11, 14, 23, 0.85)
        `,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 0 48px rgba(24, 227, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `
      }}
    >
      <div className="w-full h-16 md:h-[72px] flex items-center justify-between px-4 md:px-6">
        {/* Logo - Left */}
        <motion.button
          onClick={handleLogoClick}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none',
            border: 'none',
            padding: 0
          }}
        >
          <TwinForgeLogo variant="desktop" isHovered={false} />
        </motion.button>

        {/* Actions - Right */}
        {!isAuthPage && (
          <div className="flex items-center gap-3">
            {/* Login Button - Desktop */}
            <motion.button
              onClick={handleLogin}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.12)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <SpatialIcon Icon={ICONS.LogIn} size={18} />
              <span>Connexion</span>
            </motion.button>

            {/* Signup Button - Always Visible */}
            <motion.button
              onClick={handleSignup}
              className="flex items-center gap-2 px-6 py-2.5 md:py-3 rounded-full font-bold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(247, 147, 30, 0.9), rgba(255, 107, 53, 0.8))',
                border: '2px solid rgba(247, 147, 30, 0.6)',
                boxShadow: `
                  0 6px 24px rgba(247, 147, 30, 0.35),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3)
                `
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SpatialIcon Icon={ICONS.UserPlus} size={18} />
              <span className="hidden sm:inline">S'inscrire</span>
              <span className="sm:hidden">Essai Gratuit</span>
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
}
