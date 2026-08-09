import { useEffect, useState, useRef } from 'react';

/**
 * Tracks the normalized scroll progress (0 to 1) for a given element.
 * Starts tracking when the element enters the viewport and completes when it leaves.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>, start = 'top bottom', end = 'bottom top') {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ctx: any = null;
    
    const init = async () => {
      if (typeof window === 'undefined' || !ref.current) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: ref.current,
          start,
          end,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        });
      });
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [ref]);

  return progress;
}
