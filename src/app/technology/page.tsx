'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';

/* ─── Equipment data ─── */
const EQUIPMENT = [
  {
    name: '어류 스캔 자동절단기',
    image: '/images/facility/fish-scanner-2.jpg',
    desc: '정밀한 스캔으로 어류를 규격별로 균일하게 절단',
  },
  {
    name: '터널프리저 (IQF)',
    image: '/images/process/04-tunnel-freezer.jpg',
    desc: '통벨트 & 자동CIP, -40\u00B0C 급속동결',
  },
  {
    name: '로터리 포장기',
    image: '/images/process/05-rotary-packer.jpg',
    desc: '자동 계량 및 포장 시스템 2대 운영',
  },
  {
    name: '열선형 진공포장기',
    image: '/images/process/05-vacuum-packer.jpg',
    desc: '다양한 규격의 진공 밀봉 포장',
  },
  {
    name: '방사능 검사 장비',
    image: '/images/facility/radiation-tester.jpg',
    desc: 'Gamma Radiation Spectrometer로 원료 안전성 상시 검증',
  },
  {
    name: '오징어할복기',
    image: '/images/process/02-cutting-machine.jpg',
    desc: '오징어 전용 자동 할복 가공 장비',
  },
];

/* ─── Timeline data ─── */
const TIMELINE = [
  {
    year: '~2024',
    label: '~2024년',
    items: '터널프리져, 포션커터기, 까스성형기 등',
    amount: '',
  },
  {
    year: '2024',
    label: '2024년',
    items: '멀티박 포장기, 오징어 할복기, 오징어 절단기, 방사선 검사기 등',
    amount: '8억원',
  },
  {
    year: '2025',
    label: '2025년',
    items: '로터리 포장기 2대, 어류 스캔 자동 절단기 등',
    amount: '7.4억원',
  },
  {
    year: '2026',
    label: '2026년',
    items: 'AI 엑스레이(2억), AI 초분광(2.5억), 전처리 자동화(3.5억), 오븐 구이기(0.9억)',
    amount: '약 9억원',
    highlight: true,
  },
  {
    year: '2027',
    label: '2027년',
    items: '연속식 구이기, 신규공장 준공',
    amount: '',
  },
];

/* ─── 2026 investment items ─── */
const INVEST_2026 = [
  { label: 'AI 엑스레이', amount: '2', unit: '억' },
  { label: 'AI 초분광', amount: '2.5', unit: '억' },
  { label: '전처리 자동화', amount: '3.5', unit: '억' },
  { label: '오븐 설비', amount: '0.9', unit: '억' },
];

export default function TechnologyPage() {
  return (
    <main className="bg-navy-950 font-pretendard">
      <Navbar />
      <Breadcrumb />

      {/* ── Page Hero ── */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end">
        <Image
          src={getImagePath('/images/facility/fish-scanner.jpg')}
          alt="기술·설비"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
            Technology &amp; Facility
          </span>
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">기술·설비</h1>
          <p className="mt-3 text-lg text-white/60">AI 기술이 지키는 품질, 스마트 팩토리</p>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 1. AI X-ray Featured Section          */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Featured Technology
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                AI 엑스레이 <span className="text-gold-400">검출 시스템</span>
              </h2>
            </div>
          </FadeIn>

          {/* Large image + description */}
          <FadeIn>
            <div className="overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-950/60 lg:flex">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:w-3/5">
                <Image
                  src={getImagePath('/images/facility/ai-xray-process.png')}
                  alt="AI X-ray 이물질 검출 프로세스"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {/* Investment badge */}
                <div className="absolute left-4 top-4 rounded-full bg-gold-500/90 px-5 py-2 text-sm font-bold text-navy-950 shadow-lg">
                  투자금액 약 2억원
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 lg:w-2/5 lg:p-12">
                <h3 className="mb-4 text-2xl font-bold text-white">AI 엑스레이 검출기</h3>
                <p className="mb-6 leading-relaxed text-white/60">
                  농심엔지니어링과 약 6개월간 협업하여 검증을 완료한 AI 엑스레이는 제품 내부를 X-ray로 촬영한 뒤
                  인공지능이 이물, 결함, 충진량 이상 등을 자동으로 판별하는 검사 시스템입니다.
                </p>
                <p className="mb-6 leading-relaxed text-white/60">
                  푸드머스 순살 제품군 적용을 위해 도입하였으며, 26년 1월 최종 발주 완료(약 2억원)하여
                  4월 내 현장 도입 예정입니다.
                </p>
                <div className="rounded-xl border border-ocean-500/20 bg-ocean-500/5 p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ocean-400">How It Works</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                    {['이미지 수집(약 1000장)', '이미지 라벨링', 'AI모델 학습', 'AI모델 평가', '학습된 AI모델 적용'].map(
                      (step, i, arr) => (
                        <span key={step} className="flex items-center gap-2">
                          <span className="rounded-md bg-ocean-500/10 px-2.5 py-1 text-ocean-300">{step}</span>
                          {i < arr.length - 1 && (
                            <svg className="h-4 w-4 text-ocean-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Diagram */}
          <FadeIn className="mt-12">
            <div className="overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-900/40 p-6 md:p-10">
              <h3 className="mb-6 text-center text-lg font-semibold text-white/80">AI 엑스레이 구성도</h3>
              <div className="relative mx-auto aspect-[16/9] max-w-4xl">
                <Image
                  src={getImagePath('/images/facility/ai-xray-diagram.png')}
                  alt="AI X-ray 시스템 구성도"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 1-B. AI 초분광 검출기                  */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Next-Gen Detection
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                AI 초분광 검출기 — <span className="text-gold-400">차세대 품질 혁신</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl border border-ocean-500/30 bg-navy-800 p-8 shadow-lg shadow-ocean-500/5 md:p-12">
              {/* Ocean glow effect */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-ocean-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-ocean-400/5 blur-3xl" />

              <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-1">
                  <p className="mb-6 text-lg leading-relaxed text-white/60">
                    기존 X-ray로는 검출이 어려운 이물질까지 초분광 이미징 기술로 판별합니다.
                    2026년 도입 예정으로 약 2.5억원이 투자됩니다.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="rounded-full bg-gold-500/90 px-5 py-2 text-sm font-bold text-navy-950 shadow-lg">
                      투자 예정 2.5억원
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-ocean-500/30 bg-ocean-500/10 px-4 py-2 text-sm font-medium text-ocean-300">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ocean-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ocean-400" />
                      </span>
                      2026년 도입 예정
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 2. Equipment Grid                     */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Equipment
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                주요 설비 <span className="text-gold-400">현황</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT.map((eq, i) => (
              <FadeIn key={eq.name} delay={i * 100}>
                <div className="group overflow-hidden rounded-xl border border-navy-700/40 bg-navy-900/50 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImagePath(eq.image)}
                      alt={eq.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1.5 text-lg font-bold text-white">{eq.name}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{eq.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 2-B. 생산 자동화 비전                  */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Automation Vision
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                기술 중심의 <span className="text-gold-400">생산 자동화 로드맵</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                스마트 팩토리 구현을 위해 단계적으로 자동화 설비를 도입하고 있습니다.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: '수작업 + 기계 병행',
                desc: '숙련 기술자의 수작업과 자동화 장비를 최적으로 조합',
                image: '/images/process/02-handwork.jpg',
              },
              {
                title: '스캔 기반 정밀 가공',
                desc: '어류 스캔 절단기로 균일한 품질 확보',
                image: '/images/facility/fish-scanner-detail.jpg',
              },
              {
                title: 'AI 품질 검사',
                desc: 'AI 엑스레이와 초분광으로 이물 Zero 달성',
                image: '/images/facility/ai-xray-process.png',
              },
            ].map((card, i) => (
              <FadeIn key={card.title}>
                <div className="group overflow-hidden rounded-xl border border-navy-700/40 bg-navy-950/60 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImagePath(card.image)}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ocean-500/20 font-montserrat text-sm font-bold text-ocean-300">
                      {i + 1}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1.5 text-lg font-bold text-white">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{card.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 3. Investment Roadmap Timeline        */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-16 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Investment Roadmap
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                투자 <span className="text-gold-400">로드맵</span>
              </h2>
            </div>
          </FadeIn>

          {/* Horizontal timeline */}
          <FadeIn>
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-navy-700 via-ocean-500/40 to-navy-700 lg:block" />

              <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {TIMELINE.map((t) => (
                  <div key={t.year} className="relative text-center">
                    {/* Dot */}
                    <div
                      className={`relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        t.highlight
                          ? 'border-gold-500 bg-gold-500/10 shadow-lg shadow-gold-500/20'
                          : 'border-navy-600 bg-navy-900'
                      }`}
                    >
                      <span
                        className={`font-montserrat text-xs font-bold ${
                          t.highlight ? 'text-gold-400' : 'text-ocean-400'
                        }`}
                      >
                        {t.year}
                      </span>
                    </div>

                    <h3 className={`mb-2 text-lg font-bold ${t.highlight ? 'text-gold-400' : 'text-white'}`}>
                      {t.label}
                    </h3>
                    <p className="mb-2 text-sm leading-relaxed text-white/60">{t.items}</p>
                    {t.amount && (
                      <span
                        className={`inline-block rounded-full px-3 py-1 font-montserrat text-xs font-bold ${
                          t.highlight
                            ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30'
                            : 'bg-ocean-500/10 text-ocean-300 border border-ocean-500/20'
                        }`}
                      >
                        {t.amount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 4. 2026 Investment Summary Bar        */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="mb-10 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                2026 Investment Plan
              </span>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                2026년 투자 계획
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-br from-navy-900/80 to-navy-950">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {INVEST_2026.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex flex-col items-center justify-center p-6 md:p-8 ${
                      i < INVEST_2026.length - 1 ? 'border-b border-r border-navy-700/40 md:border-b-0' : 'border-r-0'
                    }`}
                  >
                    <p className="mb-1 text-sm font-medium text-white/60">{item.label}</p>
                    <p className="font-montserrat text-3xl font-bold text-white md:text-4xl">
                      {item.amount}
                      <span className="ml-0.5 text-lg text-white/60">{item.unit}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Total bar */}
              <div className="border-t border-gold-500/20 bg-gold-500/5 px-6 py-5 text-center">
                <span className="text-sm text-white/60">총 투자 예정 </span>
                <span className="font-montserrat text-2xl font-bold text-gold-400 md:text-3xl">
                  약 9<span className="ml-0.5 text-lg">억원</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 5. 품질 관리 인프라                    */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Quality Infrastructure
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                품질 관리 <span className="text-gold-400">인프라</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                image: '/images/facility/radiation-lab.jpg',
                caption: '방사능 검사실 — Gamma Radiation Spectrometer 상시 가동',
              },
              {
                image: '/images/facility/safety-board.jpg',
                caption: '이물 관리 게시판 — 현장 안전 관리 강화',
              },
            ].map((photo) => (
              <FadeIn key={photo.caption}>
                <div className="group overflow-hidden rounded-xl border border-navy-700/40 bg-navy-950/60 transition-all duration-300 hover:border-ocean-500/30">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={getImagePath(photo.image)}
                      alt={photo.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-medium leading-relaxed text-white/60">{photo.caption}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10">
            <p className="mx-auto max-w-3xl text-center leading-relaxed text-white/60">
              서풍은 방사능 검사, 이물 관리, HACCP 기반 위생 관리를 통해 식품 안전을 최우선으로 합니다.
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
