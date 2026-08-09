import { useMemo } from 'react';

interface DeviceCapability {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  /** Particle count recommendation based on device tier */
  particleCount: number;
  /** Geometry detail level: 0=low, 1=medium, 2=high */
  geometryDetail: number;
}

/**
 * Detects device tier and recommends 3D complexity levels.
 * Uses viewport width + touch detection as heuristics.
 */
export function useDeviceCapability(): DeviceCapability {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false, isTablet: false, isDesktop: true,
        isTouch: false, prefersReducedMotion: false,
        particleCount: 100, geometryDetail: 2,
      };
    }

    const w = window.innerWidth;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = w < 768;
    const isTablet = w >= 768 && w < 1024;
    const isDesktop = w >= 1024;

    let particleCount = 100;
    let geometryDetail = 2;

    if (prefersReducedMotion) {
      particleCount = 0;
      geometryDetail = 0;
    } else if (isMobile) {
      particleCount = 25;
      geometryDetail = 0;
    } else if (isTablet) {
      particleCount = 50;
      geometryDetail = 1;
    }

    return { isMobile, isTablet, isDesktop, isTouch, prefersReducedMotion, particleCount, geometryDetail };
  }, []);
}
