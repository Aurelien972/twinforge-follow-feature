import React, { useEffect, useRef } from 'react';
import { usePerformanceMode } from '../../system/context/PerformanceModeContext';

/**
 * BackgroundManager
 *
 * Gère le fond cosmique avec particules de manière conditionnelle
 * selon le mode performance détecté.
 *
 * MODE QUALITY/BALANCED:
 * - Background animé avec respiration cosmique
 * - Particules ember-rise avec trajectoires complexes
 * - Nébuleuses chaude/froide avec animations
 *
 * MODE HIGH-PERFORMANCE:
 * - Background statique simplifié (1-2 couches)
 * - ZÉRO particules (pas dans le DOM)
 * - ZÉRO animations
 * - Optimisé pour iPhone 10, iPhone 8, Android 5+ ans
 */
export const BackgroundManager: React.FC = () => {
  const { isPerformanceMode, mode } = usePerformanceMode();
  const particlesInitialized = useRef(false);

  useEffect(() => {
    // Appliquer la classe de mode performance sur le body
    const body = document.body;
    const html = document.documentElement;

    if (isPerformanceMode) {
      body.classList.add('performance-mode');
      body.classList.add('mobile-performance-mode');
      body.setAttribute('data-performance-mode', 'true');
      html.classList.add('performance-mode');

      // S'assurer que les classes quality/balanced sont retirées
      body.classList.remove('mode-quality', 'mode-balanced');
    } else {
      body.classList.remove('performance-mode');
      body.classList.remove('mobile-performance-mode');
      body.removeAttribute('data-performance-mode');
      html.classList.remove('performance-mode');

      // Appliquer la classe du mode actuel
      if (mode === 'quality') {
        body.classList.add('mode-quality');
        body.classList.remove('mode-balanced');
      } else if (mode === 'balanced') {
        body.classList.add('mode-balanced');
        body.classList.remove('mode-quality');
      }
    }

    return () => {
      // Cleanup au démontage
      body.classList.remove('performance-mode', 'mobile-performance-mode', 'mode-quality', 'mode-balanced');
      body.removeAttribute('data-performance-mode');
      html.classList.remove('performance-mode');
    };
  }, [isPerformanceMode, mode]);

  useEffect(() => {
    // Initialiser les particules uniquement en mode quality/balanced
    // et uniquement une fois
    if (!isPerformanceMode && !particlesInitialized.current) {
      initializeForgeParticles();
      particlesInitialized.current = true;
    }
  }, [isPerformanceMode]);

  // En mode performance, ne rien render (pas de particules dans le DOM)
  if (isPerformanceMode) {
    return (
      <div
        className="bg-twinforge-visionos performance-mode"
        aria-hidden="true"
      />
    );
  }

  // En mode quality/balanced, render le fond avec particules
  return (
    <>
      <div
        className="bg-twinforge-visionos"
        aria-hidden="true"
      />
      <div
        className="cosmic-forge-particles"
        aria-hidden="true"
        id="cosmic-forge-particles-container"
      >
        {/* Les particules seront ajoutées dynamiquement par JS */}
      </div>
    </>
  );
};

/**
 * Initialise les particules de forge avec positions aléatoires
 * Appelé uniquement en mode quality/balanced
 */
function initializeForgeParticles() {
  const container = document.getElementById('cosmic-forge-particles-container');
  if (!container) return;

  // Déterminer le nombre de particules selon la taille de l'écran
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

  let particleCount = 12; // Desktop par défaut
  let animationSpeed = 22; // Desktop par défaut

  if (isMobile) {
    particleCount = 6;
    animationSpeed = 35;
  } else if (isTablet) {
    particleCount = 8;
    animationSpeed = 28;
  }

  // Créer les particules
  for (let i = 1; i <= particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = `forge-particle forge-particle--${i}`;

    // Position horizontale de base (0-100vw)
    const x0 = Math.random() * 100;

    // Dérives horizontales aléatoires
    const x1 = (Math.random() - 0.5) * 50; // -25px à +25px
    const x2 = (Math.random() - 0.5) * 80; // -40px à +40px
    const x3 = (Math.random() - 0.5) * 100; // -50px à +50px
    const x4 = (Math.random() - 0.5) * 120; // -60px à +60px

    // Taille aléatoire
    const size = isMobile
      ? Math.random() * 1 + 2 // 2-3px sur mobile
      : isTablet
        ? Math.random() * 1 + 2.5 // 2.5-3.5px sur tablette
        : Math.random() * 2 + 2; // 2-4px sur desktop

    // Durée d'animation aléatoire autour de la vitesse de base
    const duration = animationSpeed + (Math.random() - 0.5) * 10;

    // Délai aléatoire pour décaler les animations
    const delay = Math.random() * duration;

    // Appliquer les variables CSS
    particle.style.setProperty('--x0', `${x0}vw`);
    particle.style.setProperty('--x1', `${x1}px`);
    particle.style.setProperty('--x2', `${x2}px`);
    particle.style.setProperty('--x3', `${x3}px`);
    particle.style.setProperty('--x4', `${x4}px`);
    particle.style.setProperty('--size', `${size}px`);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);

    container.appendChild(particle);
  }
}
