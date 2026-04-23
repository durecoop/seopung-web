'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ThemedNavbar from '@/components/ui/ThemedNavbar';
import ThemedFooter from '@/components/ui/ThemedFooter';
import PageSections from '@/components/sections/PageSections';
import { getSkinConfig, type HeroSkinId } from '@/lib/skin-store';
import { THEMES } from '@/lib/themes';

const HERO_COMPONENTS: Record<HeroSkinId, ReturnType<typeof dynamic>> = {
  0: dynamic(() => import('@/components/sections/HeroSection'), { ssr: false }),
  1: dynamic(() => import('@/components/sections/HeroCssWave'), { ssr: false }),
  2: dynamic(() => import('@/components/sections/HeroParticleOcean'), { ssr: false }),
  3: dynamic(() => import('@/components/sections/HeroVideo'), { ssr: false }),
  4: dynamic(() => import('@/components/sections/HeroCinematic'), { ssr: false }),
  5: dynamic(() => import('@/components/sections/HeroTextClip'), { ssr: false }),
  6: dynamic(() => import('@/components/sections/HeroCorporate'), { ssr: false }),
};

const DEFAULT_SKIN: HeroSkinId = 6;

export default function Home() {
  const [skinId, setSkinId] = useState<HeroSkinId>(DEFAULT_SKIN);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSkinConfig()
      .then((c) => setSkinId(c.heroSkinId))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const theme = THEMES[skinId];
  const HeroComponent = HERO_COMPONENTS[skinId];

  return (
    <main id="main-content" className="font-pretendard">
      <ThemedNavbar theme={theme} />
      {loaded ? <HeroComponent /> : <div className="h-screen bg-white" />}
      <PageSections theme={theme} />
      <ThemedFooter theme={theme} />
    </main>
  );
}
