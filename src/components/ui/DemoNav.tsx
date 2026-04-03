'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';

interface DemoNavProps {
  /** true = hero is dark (white text), false = light hero */
  darkHero?: boolean;
}

export default function DemoNav({ darkHero = true }: DemoNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isOverlay = darkHero && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}>
        {/* Logo + Brand — 금호통상 스타일 (큼지막) */}
        <Link href="/demo" className="flex items-center gap-4">
          <div className={`relative overflow-hidden rounded-full bg-white shadow-lg transition-all duration-500 ${
            scrolled ? 'h-12 w-12' : 'h-16 w-16 lg:h-20 lg:w-20'
          }`}>
            <Image
              src={getImagePath('/images/logo.png')}
              alt="서풍 로고"
              fill
              className="scale-[1.75] object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-black tracking-wide transition-all duration-500 ${
              scrolled
                ? 'text-2xl text-gray-900'
                : isOverlay
                  ? 'text-3xl text-white lg:text-4xl'
                  : 'text-3xl text-gray-900 lg:text-4xl'
            }`}>
              서풍
            </span>
            <span className={`font-medium transition-all duration-500 ${
              scrolled
                ? 'text-xs text-ocean-500'
                : isOverlay
                  ? 'text-sm text-white/70 lg:text-base'
                  : 'text-sm text-ocean-500 lg:text-base'
            }`}>
              영어조합법인 서풍
            </span>
          </div>
        </Link>

        {/* Right side nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {['회사소개', '생산공정', '품질·인증', '제품', '문의'].map((label) => (
            <span
              key={label}
              className={`text-base font-semibold transition-colors ${
                isOverlay ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-ocean-500'
              }`}
            >
              {label}
            </span>
          ))}
          <span className={`rounded-lg px-5 py-2 text-base font-bold transition-all ${
            isOverlay
              ? 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
              : 'bg-ocean-500 text-white hover:bg-ocean-400'
          }`}>
            쇼핑몰
          </span>
        </div>
      </nav>
    </header>
  );
}
