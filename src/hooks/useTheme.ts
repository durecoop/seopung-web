'use client';

import { useState, useEffect } from 'react';
import { getSkinConfig, type HeroSkinId } from '@/lib/skin-store';
import { THEMES, type SiteTheme } from '@/lib/themes';

export interface ThemeColors {
  /** Is this a dark theme? */
  dark: boolean;
  /** Page background */
  pageBg: string;
  /** Primary text (headings) */
  text: string;
  /** Secondary text (body) */
  text2: string;
  /** Muted text */
  textMuted: string;
  /** Card background */
  cardBg: string;
  /** Card border */
  cardBorder: string;
  /** Card hover */
  cardHover: string;
  /** Section alternating bg */
  sectionAlt: string;
  /** Hero/page overlay on images */
  overlay: string;
  /** Gradient from bg to transparent */
  gradientFade: string;
  /** Input bg */
  inputBg: string;
  /** Input border */
  inputBorder: string;
  /** Table row stripe */
  tableStripe: string;
  /** The full theme object */
  theme: SiteTheme;
}

export function useTheme() {
  const [skinId, setSkinId] = useState<HeroSkinId>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSkinConfig()
      .then((c) => setSkinId(c.heroSkinId))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const theme = THEMES[skinId];
  const dark = skinId !== 0;

  const colors: ThemeColors = {
    dark,
    theme,
    pageBg: dark ? 'bg-[#0a1628]' : 'bg-white',
    text: dark ? 'text-white' : 'text-gray-900',
    text2: dark ? 'text-white/70' : 'text-gray-600',
    textMuted: dark ? 'text-white/50' : 'text-gray-500',
    cardBg: dark ? 'bg-white/5 backdrop-blur-sm' : 'bg-gray-50/60 backdrop-blur-sm',
    cardBorder: dark ? 'border-white/10' : 'border-gray-300/50',
    cardHover: dark ? 'hover:border-white/20 hover:bg-white/10' : 'hover:border-gold-500/30 hover:bg-gray-100/60',
    sectionAlt: dark ? 'bg-[#0e1d33]' : 'bg-gray-50/40',
    overlay: dark ? 'bg-[#0a1628]/70' : 'bg-white/70',
    gradientFade: dark ? 'from-[#0a1628] via-[#0a1628]/70 to-transparent' : 'from-white via-white/70 to-transparent',
    inputBg: dark ? 'bg-white/5 text-white placeholder-white/30' : 'bg-white text-gray-900 placeholder-gray-400',
    inputBorder: dark ? 'border-white/15 focus:border-ocean-400' : 'border-gray-300 focus:border-ocean-500',
    tableStripe: dark ? 'even:bg-white/5' : 'even:bg-gray-50',
  };

  return { skinId, loaded, theme, colors };
}
