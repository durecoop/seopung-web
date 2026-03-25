'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

export default function PageViewTracker() {
  useEffect(() => {
    trackPageView();
  }, []);
  return null;
}
