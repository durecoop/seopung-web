'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';

const HERO_IMAGES = [
  '/images/food-web/td06120004185.jpg',
  '/images/food-web/pc0031187199.jpg',
  '/images/food-web/tica034m19010001.jpg',
  '/images/food-web/td06120004172.jpg',
  '/images/food-web/pc0031187509.jpg',
] as const;

const CROSSFADE_INTERVAL = 5000;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, CROSSFADE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const scrollDown = useCallback(() => {
    const nextSection = document.querySelector('#certifications');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background images with crossfade */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={getImagePath(src)}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay - 금호통상 style */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-ocean-600/70" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <div className="text-center">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-6 py-2 font-montserrat text-sm font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm sm:text-base">
            Since 1995 · 대한민국 수산 OEM
          </span>
          <h1 className="mb-6 text-[2.6rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            바다의 가치를
            <br />
            <span className="text-ocean-300">세상의 식탁으로</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-light leading-relaxed text-white/90 sm:text-xl md:text-2xl lg:text-[1.6rem]">
            <span className="font-semibold text-white">HACCP · ASC · MSC 6대 인증</span> 보유
            <br className="hidden md:block" />
            영어조합법인 서풍이 안전한 바다 먹거리를 약속합니다
          </p>

          {/* 인증 뱃지 바 — 고객 피드백: 인증 강조 */}
          <div className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { k: 'HACCP', s: '식품안전' },
              { k: 'ASC', s: '책임양식' },
              { k: 'MSC', s: '지속가능' },
              { k: '이력추적', s: '원산지' },
              { k: 'ISO 22000', s: '식품안전경영' },
            ].map((b) => (
              <span
                key={b.k}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur-sm sm:text-base"
              >
                <svg className="h-4 w-4 text-ocean-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M12 2.714c2.15 2.038 5.054 3.286 8.25 3.286.057 0 .113 0 .152.002C20.79 7.178 21 8.439 21 9.75c0 5.592-3.824 10.29-9 11.622C6.824 20.04 3 15.342 3 9.75c0-1.311.21-2.572.598-3.749C3.637 6 3.693 6 3.75 6c3.196 0 6.1-1.248 8.25-3.286Z" />
                </svg>
                <span className="font-bold">{b.k}</span>
                <span className="hidden text-white/70 sm:inline">· {b.s}</span>
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-ocean-600 shadow-xl transition-all duration-300 hover:bg-ocean-50 hover:shadow-2xl sm:text-xl"
            >
              제품 보기
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/15 sm:text-xl"
            >
              OEM 문의하기
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Scroll down arrow */}
        <button
          onClick={scrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 transition-colors hover:text-white"
          aria-label="아래로 스크롤"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
