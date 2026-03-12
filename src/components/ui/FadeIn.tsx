'use client';

import { useReveal } from '@/hooks/useReveal';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the animation starts (CSS transition-delay) */
  delay?: number;
}

/**
 * Reusable scroll-triggered fade-in wrapper.
 * Replaces all local useFadeIn / FadeIn implementations.
 */
export default function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
