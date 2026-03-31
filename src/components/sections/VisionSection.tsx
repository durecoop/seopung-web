'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

/* ──────────────────────────────────────────────
   Inline SVG icons (no external deps)
   ────────────────────────────────────────────── */
const icons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v6.5L5 19a1 1 0 001 1h12a1 1 0 001-1l-5-9.5V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16h9" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path strokeLinecap="round" d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2-8 2s-5 2-7 9" />
    </svg>
  ),
};

interface Initiative {
  title: string;
  icon: keyof typeof icons;
  desc: string;
}

const INITIATIVES: Initiative[] = [
  { title: '이물 Zero화', icon: 'shield', desc: 'AI 기술 현장 도입으로 원료 이물 zero 달성' },
  { title: 'R&D 역량 강화', icon: 'flask', desc: '기업부설 연구소 설립, 푸드머스 전용 제품 개발' },
  { title: 'Smart 생산라인', icon: 'cpu', desc: '원물~완제품까지 One-Way 자동화 라인 구축' },
  { title: '글로벌 식품안전', icon: 'globe', desc: 'FSSC 22000 인증, 글로벌 HACCP' },
  { title: 'ESG 경영', icon: 'leaf', desc: '풀무원 가치 체계 반영, 친환경 생산' },
];

interface PlatformStep {
  name: string;
  role: string;
}

const PLATFORM_STEPS: PlatformStep[] = [
  { name: '중매인 49호', role: 'Purchase' },
  { name: '영어조합법인 서풍', role: 'Manufacturing' },
  { name: '㈜대주냉장', role: 'Storage' },
  { name: '㈜여수유통', role: 'Distribution' },
];

/* ──────────────────────────────────────────────
   Pentagon layout helpers (desktop)
   ────────────────────────────────────────────── */
function pentagonPosition(index: number) {
  // 5 points, starting from top (−90°), clockwise
  const angle = (-90 + index * 72) * (Math.PI / 180);
  const radius = 42; // percentage from center
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return { x, y };
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function VisionSection() {
  const header = useReveal<HTMLDivElement>();
  const pentagon = useReveal<HTMLDivElement>();
  const platform = useReveal<HTMLDivElement>();
  const quote = useReveal<HTMLDivElement>();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-900/60" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ── Header ── */}
        <div
          ref={header.ref}
          className={`mb-16 text-center transition-all duration-700 ${
            header.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="gold-line mb-4 inline-block text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            비전
          </h2>
          <p className="mt-6 text-base text-gray-600 md:text-lg">
            No.1 수산 가공 파트너를 향한 로드맵
          </p>
        </div>

        {/* ── 5대 추진 과제 ── */}
        <div
          ref={pentagon.ref}
          className={`mb-24 transition-all duration-700 delay-200 ${
            pentagon.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h3 className="mb-10 text-center text-xl font-semibold text-ocean-500 md:text-2xl">
            5대 추진 과제
          </h3>

          {/* Desktop pentagon layout */}
          <div className="relative mx-auto hidden aspect-square max-w-2xl md:block">
            {/* Pentagon connecting lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
            >
              {INITIATIVES.map((_, i) => {
                const from = pentagonPosition(i);
                const to = pentagonPosition((i + 1) % 5);
                return (
                  <line
                    key={i}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="rgba(30,106,161,0.3)"
                    strokeWidth="0.3"
                  />
                );
              })}
              {/* Center dot */}
              <circle cx="50" cy="50" r="1.5" fill="rgba(200,164,92,0.4)" />
              {/* Lines from center to each vertex */}
              {INITIATIVES.map((_, i) => {
                const pos = pentagonPosition(i);
                return (
                  <line
                    key={`c-${i}`}
                    x1="50"
                    y1="50"
                    x2={pos.x}
                    y2={pos.y}
                    stroke="rgba(30,106,161,0.15)"
                    strokeWidth="0.2"
                    strokeDasharray="1 0.8"
                  />
                );
              })}
            </svg>

            {/* Initiative nodes */}
            {INITIATIVES.map((item, i) => {
              const pos = pentagonPosition(i);
              const isActive = activeIdx === i;
              return (
                <button
                  key={item.title}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onFocus={() => setActiveIdx(i)}
                  onBlur={() => setActiveIdx(null)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div
                    className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`}
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isActive
                          ? 'border-gold-500 bg-ocean-500/20 text-ocean-500 shadow-lg shadow-gold-500/20'
                          : 'border-ocean-500/30 bg-gray-100/80 text-ocean-400'
                      }`}
                    >
                      {icons[item.icon]}
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold text-gray-900">
                      {item.title}
                    </span>
                    <span
                      className={`max-w-[180px] text-center text-xs leading-relaxed transition-all duration-300 ${
                        isActive ? 'text-gray-700' : 'text-gray-600'
                      }`}
                    >
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile vertical cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {INITIATIVES.map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-gray-300/50 bg-gray-50/60 p-5 backdrop-blur-sm"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-ocean-500/30 bg-gray-100 text-ocean-400">
                  {icons[item.icon]}
                </div>
                <div>
                  <h4 className="mb-1 text-base font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── One Platform Infographic ── */}
        <div
          ref={platform.ref}
          className={`mb-20 transition-all duration-700 delay-300 ${
            platform.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h3 className="mb-10 text-center text-xl font-semibold text-gray-900 md:text-2xl">
            <span className="font-montserrat font-bold text-ocean-400">One Platform</span>{' '}
            통합 운영
          </h3>

          <div className="mx-auto max-w-5xl">
            {/* Desktop horizontal flow */}
            <div className="hidden items-center justify-between md:flex">
              {PLATFORM_STEPS.map((step, i) => (
                <div key={step.name} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-20 w-44 items-center justify-center rounded-xl border px-4 text-center transition-all duration-500 ${
                        i === 1
                          ? 'border-gold-500/60 bg-ocean-500/10 shadow-lg shadow-gold-500/10'
                          : 'border-navy-600/50 bg-gray-100/70'
                      }`}
                      style={{ transitionDelay: `${i * 150}ms` }}
                    >
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            i === 1 ? 'text-ocean-500' : 'text-gray-900'
                          }`}
                        >
                          {step.name}
                        </p>
                        <p className="mt-1 font-montserrat text-xs font-medium tracking-wide text-ocean-400/70">
                          {step.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  {i < PLATFORM_STEPS.length - 1 && (
                    <div className="mx-2 flex items-center text-ocean-500/50">
                      <div className="h-px w-8 bg-gradient-to-r from-ocean-500/40 to-ocean-500/20" />
                      <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current">
                        <path d="M2 1l8 5-8 5V1z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile vertical flow */}
            <div className="flex flex-col items-center gap-2 md:hidden">
              {PLATFORM_STEPS.map((step, i) => (
                <div key={step.name} className="flex flex-col items-center">
                  <div
                    className={`flex w-64 items-center justify-center rounded-xl border px-4 py-4 text-center ${
                      i === 1
                        ? 'border-gold-500/60 bg-ocean-500/10'
                        : 'border-navy-600/50 bg-gray-100/70'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          i === 1 ? 'text-ocean-500' : 'text-gray-900'
                        }`}
                      >
                        {step.name}
                      </p>
                      <p className="mt-1 font-montserrat text-xs font-medium text-ocean-400/70">
                        {step.role}
                      </p>
                    </div>
                  </div>
                  {i < PLATFORM_STEPS.length - 1 && (
                    <div className="flex h-6 items-center text-ocean-500/40">
                      <svg viewBox="0 0 12 12" className="h-3 w-3 rotate-90 fill-current">
                        <path d="M2 1l8 5-8 5V1z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Quote ── */}
        <div
          ref={quote.ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 delay-200 ${
            quote.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative rounded-2xl border border-gray-300/30 bg-gray-50/40 px-8 py-10 backdrop-blur-sm md:px-14 md:py-12">
            <svg
              className="absolute left-6 top-6 h-8 w-8 text-ocean-500/20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
            </svg>
            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              기술 혁신과 신뢰를 기반으로 국내 수산업의 미래 가치를 창출하고,
              <br className="hidden md:block" />
              품질 경쟁력을 바탕으로 지속가능한 성장과 발전을 이루어 나갑니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
