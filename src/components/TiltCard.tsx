import React, { useRef, useCallback } from 'react';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Perspective distance in px */
  perspective?: number;
  /** Glare effect intensity 0-1 */
  glare?: number;
  /** Scale on hover */
  scale?: number;
}

/**
 * 3D tilt card that follows cursor position.
 * Uses CSS transforms for performance (no JS animation loop).
 * Disabled on touch devices.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  glare = 0.15,
  scale = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const { isTouch, prefersReducedMotion } = useDeviceCapability();
  const disabled = isTouch || prefersReducedMotion;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (0.5 - y) * maxTilt * 2;
      const tiltY = (x - 0.5) * maxTilt * 2;

      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glareRef.current) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90;
        const intensity = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2) * glare;
        glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${intensity}) 0%, transparent 60%)`;
        glareRef.current.style.opacity = '1';
      }
    },
    [disabled, maxTilt, perspective, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    if (disabled || !cardRef.current) return;
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, [disabled, perspective]);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        willChange: disabled ? 'auto' : 'transform',
      }}
    >
      {children}
      {!disabled && glare > 0 && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          style={{ opacity: 0, transition: 'opacity 0.3s ease-out' }}
        />
      )}
    </div>
  );
};
