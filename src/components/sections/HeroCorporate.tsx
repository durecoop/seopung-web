'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';

const SLIDES = [
  {
    image: '/images/food-web/td06120004185.jpg',
    subtitle: '최고의 품질과 안전한 제품',
    title: '정직함을 담아\n만듭니다',
    desc: 'HACCP·ASC·MSC 등 6대 국제 인증 보유',
  },
  {
    image: '/images/food-web/pc0031187199.jpg',
    subtitle: 'No.1 수산 OEM 파트너',
    title: '바다에서 식탁까지\n신뢰의 연결',
    desc: '30년 경험, 134+ 품목, 연 매출 400억+',
  },
  {
    image: '/images/food-web/tica034m19010001.jpg',
    subtitle: 'Smart Factory',
    title: 'AI 스마트 팩토리\n미래를 선도합니다',
    desc: 'AI X-ray 검수, 초분광 선별 시스템 도입',
  },
];

const VALUE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: '철저한 위생관리',
    desc: 'HACCP 인증 기반 체계적 위생·품질 시스템',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1h13.36M4.93 19.93l14.14-14.14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: '국제 품질 인증',
    desc: 'ASC·MSC·ISO 22000 등 글로벌 스탠다드',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: '전국 유통 네트워크',
    desc: '대형마트·온라인·외식 채널 전국 공급',
  },
];

const INTERVAL = 5000;

export default function HeroCorporate() {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 200); }, []);

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

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-white">
      {/* ── Main Carousel ── */}
      <div className="relative h-[70vh] min-h-[500px] md:h-[80vh]">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={getImagePath(slide.image)}
              alt=""
              fill
              className={`object-cover transition-transform duration-[8000ms] ease-out ${
                i === current ? 'scale-110' : 'scale-100'
              }`}
              priority={i === 0}
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/80 via-[#003366]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/60 via-transparent to-[#003366]/30" />
          </div>
        ))}

        {/* Slide content */}
        <div className="relative z-20 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <div
              className={`max-w-2xl transition-all duration-1000 ${
                ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <span className="mb-4 inline-block rounded-sm bg-white/20 px-4 py-1.5 text-sm font-semibold tracking-wider text-white backdrop-blur-sm">
                {SLIDES[current].subtitle}
              </span>
              <h1 className="mb-6 whitespace-pre-line text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {SLIDES[current].title}
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                {SLIDES[current].desc}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-sm bg-white px-8 py-4 text-lg font-bold text-[#003366] transition-all hover:bg-[#f0f7ff] hover:shadow-lg"
                >
                  제품 보기
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-sm border-2 border-white/60 px-8 py-4 text-lg font-bold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  문의하기
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators + pause */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
          <button
            onClick={() => setPaused(!paused)}
            className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/30 hover:text-white"
            aria-label={paused ? '재생' : '일시정지'}
          >
            {paused ? (
              <svg className="h-3 w-3" viewBox="0 0 10 12" fill="currentColor"><polygon points="0,0 10,6 0,12" /></svg>
            ) : (
              <svg className="h-3 w-3" viewBox="0 0 10 12" fill="currentColor"><rect x="0" y="0" width="3" height="12" /><rect x="7" y="0" width="3" height="12" /></svg>
            )}
          </button>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollDown}
          className="absolute bottom-6 right-6 z-30 animate-bounce text-white/50 transition-colors hover:text-white"
          aria-label="아래로 스크롤"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ── Value Proposition Cards — CJ Seafood style ── */}
      <div className="relative z-30 mx-auto -mt-16 max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {VALUE_CARDS.map((card) => (
            <div
              key={card.title}
              className="group flex items-start gap-4 rounded-lg border border-gray-100 bg-white px-6 py-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-[#003366]/10 text-[#003366] transition-colors group-hover:bg-[#003366] group-hover:text-white">
                {card.icon}
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* spacer for cards overlap */}
      <div className="h-12" />
    </section>
  );
}
