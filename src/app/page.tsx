'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ThemedNavbar from '@/components/ui/ThemedNavbar';
import ThemedFooter from '@/components/ui/ThemedFooter';
import PageSections from '@/components/sections/PageSections';
import { getSkinConfig, setSkinConfig, HERO_SKINS, type HeroSkinId } from '@/lib/skin-store';
import { THEMES } from '@/lib/themes';

const HERO_COMPONENTS: Record<HeroSkinId, ReturnType<typeof dynamic>> = {
  0: dynamic(() => import('@/components/sections/HeroSection'), { ssr: false }),
  1: dynamic(() => import('@/components/sections/HeroCssWave'), { ssr: false }),
  2: dynamic(() => import('@/components/sections/HeroParticleOcean'), { ssr: false }),
  3: dynamic(() => import('@/components/sections/HeroVideo'), { ssr: false }),
  4: dynamic(() => import('@/components/sections/HeroCinematic'), { ssr: false }),
  5: dynamic(() => import('@/components/sections/HeroTextClip'), { ssr: false }),
};

export default function Home() {
  const [skinId, setSkinId] = useState<HeroSkinId>(0);
  const [loaded, setLoaded] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSkinConfig()
      .then((c) => setSkinId(c.heroSkinId))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const handleSelect = async (id: HeroSkinId) => {
    setSkinId(id);
    setSaving(true);
    try {
      await setSkinConfig(id);
    } catch {}
    setSaving(false);
  };

  const theme = THEMES[skinId];
  const HeroComponent = HERO_COMPONENTS[skinId];

  return (
    <main id="main-content" className="font-pretendard">
      <ThemedNavbar theme={theme} />

      {/* Skin Picker - 상단 고정 */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        {/* Toggle button */}
        <button
          onClick={() => setPickerOpen(!pickerOpen)}
          className="absolute top-3 right-3 z-[101] flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-black/80"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
          스킨 {skinId}
          {saving && <span className="animate-spin">&#9696;</span>}
        </button>

        {/* Picker panel */}
        <div className={`absolute top-0 right-0 left-0 transition-all duration-300 ${
          pickerOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 py-4 pt-14">
            <div className="mx-auto max-w-5xl">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">스킨 선택</h3>
                <button onClick={() => setPickerOpen(false)} className="text-white/50 hover:text-white text-lg">&times;</button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {HERO_SKINS.map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => { handleSelect(skin.id); setPickerOpen(false); }}
                    className={`flex-shrink-0 rounded-xl border px-4 py-3 text-left transition-all ${
                      skinId === skin.id
                        ? 'border-ocean-400 bg-ocean-500/20 shadow-lg shadow-ocean-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                    style={{ minWidth: 140 }}
                  >
                    <span className={`block text-xs font-bold ${skinId === skin.id ? 'text-ocean-300' : 'text-white/80'}`}>
                      #{skin.id} {skin.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-white/40 leading-tight">
                      {skin.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {loaded ? <HeroComponent /> : <div className="h-screen bg-[#020a18]" />}
      <PageSections theme={theme} />
      <ThemedFooter theme={theme} />
    </main>
  );
}
