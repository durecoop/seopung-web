'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal hook — single source of truth for all
 * IntersectionObserver-based animations across the site.
 *
 * Returns { ref, visible } — attach ref to the element,
 * use visible to toggle animation classes.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
