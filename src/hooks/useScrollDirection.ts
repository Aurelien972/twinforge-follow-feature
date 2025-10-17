/**
 * useScrollDirection Hook
 * Détecte la direction du scroll (up/down) et retourne l'état pour auto-hide
 */

import { useState, useEffect, useRef } from 'react';

export type ScrollDirection = 'up' | 'down' | 'static';

interface UseScrollDirectionOptions {
  threshold?: number; // Pixels avant de changer la direction
  debounce?: number; // Délai en ms pour éviter les changements trop fréquents
}

export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 10, debounce = 0 } = options;

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('static');
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Marquer comme scrolled si on a dépassé le seuil
      setIsScrolled(currentScrollY > threshold);

      // Si on est tout en haut, remettre à static
      if (currentScrollY <= 0) {
        setScrollDirection('static');
        lastScrollY.current = currentScrollY;
        return;
      }

      // Calculer la différence
      const diff = currentScrollY - lastScrollY.current;

      // Ignorer les petits mouvements
      if (Math.abs(diff) < threshold) {
        return;
      }

      // Déterminer la direction
      const newDirection: ScrollDirection = diff > 0 ? 'down' : 'up';

      // Appliquer le debounce si configuré
      if (debounce > 0) {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
          setScrollDirection(newDirection);
          lastScrollY.current = currentScrollY;
        }, debounce);
      } else {
        setScrollDirection(newDirection);
        lastScrollY.current = currentScrollY;
      }
    };

    // Throttle pour performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [threshold, debounce]);

  return {
    scrollDirection,
    isScrolled,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
    isStatic: scrollDirection === 'static',
  };
}
