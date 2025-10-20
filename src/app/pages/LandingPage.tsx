import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../../hooks';
import SpatialIcon from '../../ui/icons/SpatialIcon';
import { ICONS } from '../../ui/icons/registry';
import GlassCard from '../../ui/cards/GlassCard';
import TwinForgeLogo from '../../ui/components/branding/TwinForgeLogo';
import { useUserStore } from '../../system/store/userStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { click } = useFeedback();
  const { session } = useUserStore();

  // Redirect authenticated users to app
  useEffect(() => {
    if (session) {
      navigate('/app', { replace: true });
    }
  }, [session, navigate]);

  const handleGetStarted = () => {
    click();
    navigate('/auth?mode=signup');
  };

  const handleLogin = () => {
    click();
    navigate('/auth?mode=login');
  };

  const features = [
    {
      icon: ICONS.Activity,
      title: 'Suivi d\'Activité Complet',
      description: 'Synchronisez vos données depuis Google Fit, Apple Health ou Strava. Analysez chaque entraînement avec précision.'
    },
    {
      icon: ICONS.Utensils,
      title: 'Nutrition Intelligente',
      description: 'Scannez vos repas, gérez votre frigo, générez des plans alimentaires personnalisés adaptés à vos objectifs.'
    },
    {
      icon: ICONS.Scan,
      title: 'Body Scan 3D',
      description: 'Visualisez votre évolution corporelle en 3D. Suivez vos mensurations et transformations avec précision.'
    },
    {
      icon: ICONS.Dumbbell,
      title: 'Entraînement Personnalisé',
      description: 'Plans d\'entraînement adaptatifs générés par IA selon votre niveau, équipement et objectifs fitness.'
    },
    {
      icon: ICONS.Clock,
      title: 'Jeûne Intermittent',
      description: 'Gérez vos fenêtres de jeûne, suivez vos phases métaboliques et optimisez vos résultats.'
    },
    {
      icon: ICONS.LineChart,
      title: 'Analyses Avancées',
      description: 'Insights IA sur vos progrès, tendances et recommandations personnalisées pour atteindre vos objectifs.'
    }
  ];

  return (
    <div className="min-h-screen bg-twinforge-visionos">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(24, 227, 255, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(247, 147, 30, 0.06) 0%, transparent 60%),
                linear-gradient(180deg, #0B0E17 0%, #0F1219 50%, #0B0E17 100%)
              `
            }}
          />

          {/* Animated Glows */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(24, 227, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(247, 147, 30, 0.12) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8 flex justify-center"
          >
            <TwinForgeLogo variant="desktop" isHovered={false} />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #18E3FF 50%, #F7931E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Forgez Votre Meilleur Vous
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            Atteignez vos objectifs fitness avec un coach IA personnel qui analyse votre nutrition, vos entraînements et votre évolution corporelle en temps réel.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/60 mb-12 max-w-2xl mx-auto"
          >
            Suivi ultra-complet, analyses avancées et recommandations personnalisées. Prenez soin de vous et adorez chaque étape de votre transformation.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <button
              onClick={handleGetStarted}
              className="group relative px-12 py-5 text-xl font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(247, 147, 30, 0.9), rgba(255, 107, 53, 0.8))',
                boxShadow: `
                  0 12px 40px rgba(247, 147, 30, 0.4),
                  0 0 60px rgba(247, 147, 30, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3)
                `,
                border: '2px solid rgba(247, 147, 30, 0.6)'
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <SpatialIcon Icon={ICONS.Sparkles} size={24} />
                Commencer Gratuitement
                <SpatialIcon Icon={ICONS.ArrowRight} size={24} />
              </span>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent)'
                }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-2 text-white/60 text-sm"
          >
            <SpatialIcon Icon={ICONS.CheckCircle2} size={16} className="text-green-400" />
            <span>Aucune carte bancaire requise</span>
            <span className="mx-2">•</span>
            <SpatialIcon Icon={ICONS.Lock} size={16} className="text-blue-400" />
            <span>Données 100% sécurisées</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Une plateforme complète pour transformer votre corps et votre vie
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard
                  className="p-6 h-full hover:scale-105 transition-transform duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(247, 147, 30, 0.2), rgba(24, 227, 255, 0.2))',
                      border: '1px solid rgba(247, 147, 30, 0.3)'
                    }}
                  >
                    <SpatialIcon Icon={feature.icon} size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard
              className="p-12"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(247, 147, 30, 0.3)',
                boxShadow: '0 12px 48px rgba(247, 147, 30, 0.2)'
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à transformer votre vie ?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Rejoignez TwinForge aujourd'hui et commencez votre voyage vers vos objectifs fitness.
              </p>
              <button
                onClick={handleGetStarted}
                className="px-10 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(247, 147, 30, 0.9), rgba(255, 107, 53, 0.8))',
                  boxShadow: '0 8px 32px rgba(247, 147, 30, 0.4)',
                  border: '2px solid rgba(247, 147, 30, 0.6)'
                }}
              >
                Commencer Maintenant
              </button>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
