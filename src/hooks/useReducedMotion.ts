import { useEffect, useRef } from 'react';

/**
 * Detects user's prefers-reduced-motion setting.
 * Returns true if the user prefers reduced motion.
 */
export function useReducedMotion(): boolean {
  const prefersReduced = useRef(false);

  if (typeof window !== 'undefined') {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      prefersReduced.current = e.matches;
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced.current;
}
