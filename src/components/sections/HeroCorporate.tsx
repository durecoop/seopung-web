'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';

/* ── CJ Seafood 스타일 히어로 ──
   - 풀폭 캐러셀 (3초 자동재생)
   - 중앙 정렬 텍스트 + 깔끔한 오버레이
   - 하단 3개 가치 카드 (위생·품질·유통)
   - 최소한의 장식, 기업 신뢰감 톤
*/

const SLIDES = [
  {
    image: '/images/food-web/td06120004185.jpg',
    tag: 'Certified Seafood OEM',
    title: '대형 유통사 PB가\n선택하는 수산 OEM',
    desc: 'HACCP · ASC · MSC · 이력추적 · 품질인증 — 5대 안전 인증 보유',
  },
  {
    image: '/images/food-web/pc0031187199.jpg',
    tag: 'One Platform',
    title: '여수 위판장 직매입,\n당일 가공·출하',
    desc: '중매인 직접 매입 → 가공 → 보관 → 유통 한 흐름. 중간 유통 마진 없음',
  },
  {
    image: '/images/food-web/tica034m19010001.jpg',
    tag: 'Smart Factory',
    title: 'AI 검수·자동화\n수산 가공의 다음 기준',
    desc: 'AI 엑스레이 · 초분광 선별 · 스캔 자동절단 — 2026년 도입 중',
  },
];

const VALUE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
        <circle cx="24" cy="24" r="22" stroke="#003d6b" strokeWidth="2" fill="#f0f6fc" />
        <path d="M16 24l5 5 11-11" stroke="#003d6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M24 10c-2.5 0-4.8.7-6.8 1.8" stroke="#003d6b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
      </svg>
    ),
    title: '글로벌 인증',
    desc: 'HACCP·ASC·MSC 등 글로벌 스탠다드를 갖춘\n대한민국 최고 수준의 품질 시스템',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
        <circle cx="24" cy="24" r="22" stroke="#003d6b" strokeWidth="2" fill="#f0f6fc" />
        <path d="M16 18h16M16 24h16M16 30h10" stroke="#003d6b" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M34 28l4 4-4 4" stroke="#003d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
      </svg>
    ),
    title: '맞춤 OEM 솔루션',
    desc: '대형마트 PB, 외식 프랜차이즈, 밀키트 브랜드\n귀사의 요구에 맞춘 제품을 설계·생산합니다',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
        <circle cx="24" cy="24" r="22" stroke="#003d6b" strokeWidth="2" fill="#f0f6fc" />
        <path d="M12 30h8l4-12 4 18 4-10h8" stroke="#003d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: '폭넓은 제품 라인업',
    desc: '냉동수산·밀키트·프리미엄 굴비까지\n트렌드를 선도하는 맞춤 OEM 솔루션',
  },
];

const INTERVAL = 3000;

export default function HeroCorporate() {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const scrollDown = useCallback(() => {
    document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const slide = SLIDES[current];

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-white">
      {/* ── 풀폭 캐러셀 ── */}
      <div className="relative h-[65vh] min-h-[480px] md:h-[75vh] lg:h-[80vh]">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={getImagePath(s.image)}
              alt=""
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* 오버레이 — CJ 스타일: 전체 어둡게 + 하단 그라디언트 */}
        <div className="absolute inset-0 z-[11] bg-black/40" />
        <div className="absolute inset-0 z-[11] bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* 텍스트 콘텐츠 — 중앙 정렬 */}
        <div className="relative z-20 flex h-full items-center justify-center">
          <div
            className={`mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${
              ready ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <span className="mb-5 inline-block border-b border-white/40 pb-1 font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-white/80 md:text-sm">
              {slide.tag}
            </span>
            <h1 className="mx-auto mb-5 max-w-3xl whitespace-pre-line text-3xl font-bold leading-[1.25] tracking-tight text-white sm:text-4xl md:text-5xl">
              {slide.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base text-white/90 md:text-lg">
              {slide.desc}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white px-7 py-3 text-base font-bold text-[#003d6b] transition-all hover:bg-gray-100"
              >
                제품소개
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/70 px-7 py-3 text-base font-bold text-white transition-all hover:bg-white/10"
              >
                문의하기
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 슬라이드 인디케이터 + 일시정지 */}
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full border border-white/60 transition-all duration-400 ${
                i === current ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
          <button
            onClick={() => setPaused(!paused)}
            className="ml-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            aria-label={paused ? '재생' : '일시정지'}
          >
            {paused ? (
              <svg className="h-2.5 w-2.5" viewBox="0 0 10 12" fill="currentColor"><polygon points="1,0 10,6 1,12" /></svg>
            ) : (
              <svg className="h-2.5 w-2.5" viewBox="0 0 10 12" fill="currentColor"><rect x="0" y="0" width="3" height="12" /><rect x="7" y="0" width="3" height="12" /></svg>
            )}
          </button>
        </div>

        {/* 스크롤 */}
        <button
          onClick={scrollDown}
          className="absolute bottom-5 right-6 z-30 hidden text-white/40 transition-colors hover:text-white md:block"
          aria-label="아래로 스크롤"
        >
          <svg className="h-7 w-7 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ── 가치 카드 3종 — CJ 스타일 ── */}
      <div className="relative z-30 mx-auto -mt-14 max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-0 shadow-xl md:grid-cols-3">
          {VALUE_CARDS.map((card, i) => (
            <div
              key={card.title}
              className={`flex flex-col items-center px-8 py-8 text-center transition-colors duration-300 hover:bg-[#f8fbff] ${
                i === 0
                  ? 'bg-white md:rounded-l-lg'
                  : i === VALUE_CARDS.length - 1
                  ? 'bg-white md:rounded-r-lg'
                  : 'bg-white md:border-x md:border-gray-100'
              }`}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-[#003d6b]">{card.title}</h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </section>
  );
}
