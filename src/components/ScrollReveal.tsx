import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * Reusable scroll-triggered entrance animation wrapper.
 * Uses GSAP ScrollTrigger for scroll-linked reveals.
 * Respects prefers-reduced-motion.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  distance = 60,
  duration = 1,
  className = '',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    let gsapModule: typeof import('gsap') | null = null;
    let scrollTriggerModule: any = null;
    let ctx: any = null;

    const init = async () => {
      gsapModule = await import('gsap');
      scrollTriggerModule = await import('gsap/ScrollTrigger');
      gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      if (!ref.current) return;

      const dirMap: Record<string, { x: number; y: number }> = {
        up: { x: 0, y: distance },
        down: { x: 0, y: -distance },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
      };

      const { x, y } = dirMap[direction];

      ctx = gsapModule.gsap.context(() => {
        gsapModule!.gsap.fromTo(
          ref.current,
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 88%',
              end: 'top 20%',
              toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
          }
        );
      });
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [direction, delay, distance, duration, once, prefersReduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={prefersReduced ? {} : { opacity: 0 }}
    >
      {children}
    </div>
  );
};
