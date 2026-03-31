'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';
import { getImagePath } from '@/lib/utils';

/* ───────────────────────── data ───────────────────────── */

interface FacilityCard {
  title: string;
  image: string;
  description: string;
}

const FACILITY_CARDS: FacilityCard[] = [
  {
    title: '어류 스캔 자동절단기',
    image: '/images/facility/fish-scanner.jpg',
    description: '정밀한 스캔으로 어류를 균일하게 절단',
  },
  {
    title: '방사능 검사 장비',
    image: '/images/facility/radiation-tester.jpg',
    description: 'Gamma Radiation Spectrometer로 안전성 검증',
  },
  {
    title: '터널프리저 (IQF)',
    image: '/images/process/04-tunnel-freezer.jpg',
    description: '-40°C 급속동결로 신선도 극대화',
  },
];

interface InvestmentItem {
  label: string;
  amount: string;
}

const INVESTMENTS: InvestmentItem[] = [
  { label: 'AI 엑스레이', amount: '2억' },
  { label: 'AI 초분광', amount: '2.5억' },
  { label: '전처리 자동화', amount: '3.5억' },
  { label: '오븐 설비', amount: '0.9억' },
];

/* ───────────────────────── component ───────────────────────── */

export default function TechnologySection() {
  const section = useReveal<HTMLElement>();
  const cards = useReveal<HTMLDivElement>();
  const invest = useReveal<HTMLDivElement>();

  const sectionRef = section.ref;
  const sectionVisible = section.visible;
  const cardsRef = cards.ref;
  const cardsVisible = cards.visible;
  const investRef = invest.ref;
  const investVisible = invest.visible;

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-navy-900 py-24 md:py-32"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ── Section header ── */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="gold-line mb-4 inline-block text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            기술 혁신
          </h2>
          <p className="mt-6 text-base text-gray-600 md:text-lg">
            AI 기술이 지키는 품질, 스마트 팩토리
          </p>
        </div>

        {/* ── Featured card: AI X-ray ── */}
        <div
          className={`mb-14 overflow-hidden rounded-2xl border border-white/10 bg-gray-100/50 backdrop-blur-sm transition-all duration-700 delay-200 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="grid gap-0 md:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px]">
              <Image
                src={getImagePath('/images/facility/ai-xray-process.png')}
                alt="AI 엑스레이 검출기"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-800/30 md:block hidden" />
            </div>

            {/* Text side */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-ocean-500/30 bg-ocean-500/10 px-3 py-1 text-xs font-medium text-ocean-300">
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                핵심 기술
              </span>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                AI 엑스레이 검출기
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-700 md:text-base">
                농심엔지니어링과 약 6개월간 협업하여 검증을 완료한 AI 엑스레이는 제품 내부를
                X-ray로 촬영한 뒤 인공지능이 이물, 결함, 충진량 이상 등을 자동으로
                판별합니다. 원료 기인성(뼈 등) 이물 Zero화를 실현합니다.
              </p>
              <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-gold-500/20 bg-ocean-500/10 px-5 py-3">
                <svg className="h-5 w-5 text-ocean-500" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2v16M6 6l4-4 4 4M4 10h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-ocean-500">투자금액</span>
                <span className="font-montserrat text-lg font-bold text-gold-300">약 2억원</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3-column facility grid ── */}
        <div
          ref={cardsRef}
          className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FACILITY_CARDS.map((card, i) => (
            <div
              key={card.title}
              className={`group overflow-hidden rounded-xl border border-white/10 bg-gray-100/40 transition-all duration-700 ease-out hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5 ${
                cardsVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: cardsVisible ? `${i * 150}ms` : '0ms' }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={getImagePath(card.image)}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
              </div>
              <div className="p-5">
                <h4 className="mb-1.5 text-lg font-semibold text-gray-900">{card.title}</h4>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 2026 Investment summary bar ── */}
        <div
          ref={investRef}
          className={`overflow-hidden rounded-2xl border border-gold-500/15 bg-gradient-to-r from-navy-800/60 via-navy-800/40 to-navy-800/60 backdrop-blur-sm transition-all duration-700 ease-out ${
            investVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="px-6 py-6 md:px-10 md:py-8">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <span className="font-montserrat text-sm font-semibold tracking-wider text-ocean-500">
                2026
              </span>
              <span className="text-sm font-medium text-gray-600">투자 계획</span>
            </div>

            {/* Items row */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {INVESTMENTS.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3 md:gap-4">
                  <div className="flex flex-col items-center rounded-lg border border-white/5 bg-gray-50/50 px-4 py-3 md:px-6">
                    <span className="text-xs text-gray-600">{item.label}</span>
                    <span className="font-montserrat text-lg font-bold text-gray-900 md:text-xl">
                      {item.amount}
                    </span>
                  </div>
                  {i < INVESTMENTS.length - 1 && (
                    <span className="font-montserrat text-lg font-light text-gray-600">+</span>
                  )}
                </div>
              ))}

              {/* Equals total */}
              <div className="flex items-center gap-3 md:gap-4">
                <span className="font-montserrat text-lg font-light text-gray-600">=</span>
                <div className="flex flex-col items-center rounded-xl border border-gold-500/20 bg-ocean-500/10 px-5 py-3 md:px-8">
                  <span className="text-xs text-ocean-500/70">총 투자</span>
                  <span className="font-montserrat text-xl font-bold text-gold-300 md:text-2xl">
                    약 9억원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
