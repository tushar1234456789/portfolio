import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  /** Normalized X: -1 (left) to 1 (right) */
  x: number;
  /** Normalized Y: -1 (top) to 1 (bottom) */
  y: number;
  /** Raw pixel X */
  clientX: number;
  /** Raw pixel Y */
  clientY: number;
}

/**
 * Tracks mouse position normalized to -1..1 range.
 * Disabled on touch devices to save performance.
 */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, clientX: 0, clientY: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return;

    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPos({ x, y, clientX: e.clientX, clientY: e.clientY });
    };

    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
