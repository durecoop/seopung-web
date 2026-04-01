'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

const HERO_IMAGES = [
  '/images/stock/hero-seafood.jpg',
  '/images/stock/seafood-platter.jpg',
  '/images/stock/fish-market.jpg',
] as const;

const CROSSFADE_INTERVAL = 5000;

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  unit?: string;
}

const STATS: StatItem[] = [
  { value: 400, suffix: '억원', prefix: '', label: '연매출', unit: '' },
  { value: 134, suffix: '품목', prefix: '', label: '개발', unit: '' },
  { value: 66, suffix: '개', prefix: '', label: '운영품목', unit: '' },
  { value: 3, suffix: '개', prefix: '', label: 'HACCP·ASC·MSC', unit: '' },
];

function useCountUp(target: number, isVisible: boolean, duration = 2000): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, target, duration]);

  return count;
}

function StatCounter({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible);
  const isTextLabel = stat.label === 'HACCP·ASC·MSC';

  return (
    <div className="flex flex-col items-center gap-1">
      {isTextLabel ? (
        <>
          <span className="font-montserrat text-lg font-bold text-gray-900 md:text-2xl lg:text-3xl">
            {isVisible ? stat.label : ''}
          </span>
          <span className="text-xs font-medium text-ocean-500/80 md:text-sm">
            국제 인증 보유
          </span>
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-1">
            <span className="font-montserrat text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {count}
            </span>
            <span className="text-lg font-medium text-ocean-500 md:text-xl">
              {stat.suffix}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600 md:text-base">
            {stat.label}
          </span>
        </>
      )}
    </div>
  );
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Crossfade timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, CROSSFADE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // IntersectionObserver for stat counters
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollDown = useCallback(() => {
    const nextSection = document.querySelector('#overview');
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

      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/70" />

      {/* Floating particle animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { size: 3, left: 10, delay: 0, duration: 14, opacity: 0.15 },
          { size: 5, left: 20, delay: 2, duration: 18, opacity: 0.1 },
          { size: 2, left: 35, delay: 5, duration: 12, opacity: 0.2 },
          { size: 4, left: 45, delay: 1, duration: 16, opacity: 0.12 },
          { size: 6, left: 55, delay: 7, duration: 20, opacity: 0.1 },
          { size: 3, left: 65, delay: 3, duration: 10, opacity: 0.25 },
          { size: 2, left: 75, delay: 6, duration: 15, opacity: 0.18 },
          { size: 5, left: 85, delay: 4, duration: 17, opacity: 0.13 },
          { size: 4, left: 30, delay: 8, duration: 13, opacity: 0.2 },
          { size: 3, left: 90, delay: 9, duration: 11, opacity: 0.15 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-ocean-300"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: '-10px',
              opacity: p.opacity,
              animation: `heroParticleFloat ${p.duration}s ${p.delay}s linear infinite`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes heroParticleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--tw-opacity, 1);
          }
          90% {
            opacity: var(--tw-opacity, 1);
          }
          100% {
            transform: translateY(-100vh) translateX(30px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6">
        {/* Main slogan */}
        <div className="text-center">
          <h1 className="mb-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-7xl">
            지속가능한 바다
            <br />
            <span className="text-ocean-500">책임 있는 먹거리의 약속</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-light tracking-wide text-gray-700 md:text-lg lg:text-xl">
            No.1 수산 가공 파트너, 영어조합법인 서풍
          </p>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="absolute bottom-24 left-0 w-full md:bottom-28"
        >
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative grid grid-cols-2 gap-3 sm:gap-6 rounded-2xl border border-white/40 bg-gradient-to-b from-white/90 to-white/80 px-6 py-6 backdrop-blur-md md:grid-cols-4 md:gap-8 md:px-10 md:py-8">
              {STATS.map((stat) => (
                <StatCounter
                  key={stat.label}
                  stat={stat}
                  isVisible={statsVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <button
          onClick={scrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 transition-colors hover:text-ocean-500"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
