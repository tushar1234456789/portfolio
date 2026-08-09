import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Initializes Lenis smooth scroll and integrates it with GSAP ScrollTrigger.
 * Falls back to native scroll when prefers-reduced-motion is active.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<any>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let raf: number;
    let cleanup: (() => void) | null = null;

    const init = async () => {
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', scrollTriggerModule.ScrollTrigger.update);

      gsapModule.gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsapModule.gsap.ticker.lagSmoothing(0);

      // Handle anchor links
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a');
        if (!target) return;
        
        const href = target.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement, { offset: -80 }); // offset for header
          }
        }
      };
      
      document.addEventListener('click', handleAnchorClick);

      cleanup = () => {
        document.removeEventListener('click', handleAnchorClick);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    init();

    return () => {
      if (cleanup) cleanup();
    };
  }, [prefersReduced]);

  return lenisRef;
}
