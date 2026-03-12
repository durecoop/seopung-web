'use client';

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react';

interface CardGlowProps {
  children: ReactNode;
  className?: string;
  /** Glow color — accepts any CSS color value. Defaults to a subtle gold. */
  glowColor?: string;
  /** Glow radius in pixels. Default 200. */
  glowRadius?: number;
}

export default function CardGlow({
  children,
  className = '',
  glowColor = 'rgba(212, 175, 55, 0.10)',
  glowRadius = 200,
}: CardGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGlowStyle({
        background: `radial-gradient(${glowRadius}px circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`,
      });
    },
    [glowColor, glowRadius],
  );

  const handleMouseLeave = useCallback(() => {
    setGlowStyle({});
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          ...glowStyle,
          opacity: glowStyle.background ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}
