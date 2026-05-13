'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';

/* ──────────────────────────────────────────────
   Skin-specific copy
   ────────────────────────────────────────────── */
interface VisionCopy {
  heroSub: string;
  prioritiesLabel: string;
  prioritiesHeading: string;
  salesLabel: string;
  salesHeading: string;
  growthLabel: string;
  growthHeading: string;
  visionLabel: string;
  visionHeading: string;
  visionStatement: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
}

const VISION_COPY: Record<number, VisionCopy> = {
  0: {
    heroSub: 'No.1 수산 가공 파트너를 향한 로드맵',
    prioritiesLabel: 'Key Initiatives',
    prioritiesHeading: '5대 중점 추진 과제',
    salesLabel: 'Financial Overview',
    salesHeading: '매출 현황',
    growthLabel: 'Strategic Growth',
    growthHeading: '전략적 성장 동력',
    visionLabel: 'Our Vision',
    visionHeading: '비전 선언',
    visionStatement: '신뢰를 기반으로 함께 성장하며, 안전한 수산물 공급으로 지속가능한 미래를 만들어갑니다.',
    ctaTitle: '서풍과 함께 성장하세요',
    ctaDesc: 'OEM 납품, 신제품 개발, 브랜드 협업 등 다양한 형태의 파트너십을 환영합니다',
    ctaButton: '문의하기',
  },
  1: {
    heroSub: '거침없이 전진하는 수산업의 새 지평',
    prioritiesLabel: 'Battle Plan',
    prioritiesHeading: '5대 돌파 전략',
    salesLabel: 'Power Metrics',
    salesHeading: '전투력 현황',
    growthLabel: 'Charge Forward',
    growthHeading: '공격적 성장 동력',
    visionLabel: 'Our Mission',
    visionHeading: '도전의 선언',
    visionStatement: '남들이 망설일 때 우리는 전진한다. 거침없는 도전으로 수산업의 한계를 돌파하고, 새로운 역사를 써 나갑니다.',
    ctaTitle: '다음 전투에 합류하세요',
    ctaDesc: '새로운 도전이 기다리고 있습니다. 서풍과 함께 출항하세요',
    ctaButton: '출항하기',
  },
  2: {
    heroSub: '데이터가 설계하는 수산 가공의 미래',
    prioritiesLabel: 'Tech Roadmap',
    prioritiesHeading: '5대 기술 혁신 과제',
    salesLabel: 'Analytics',
    salesHeading: '성과 데이터',
    growthLabel: 'Innovation Engine',
    growthHeading: '기술 기반 성장 동력',
    visionLabel: 'Innovation Vision',
    visionHeading: '혁신 선언',
    visionStatement: 'AI, 데이터, 자동화 기술로 수산 가공의 패러다임을 전환합니다. 기술 혁신이 곧 품질이고, 데이터가 곧 신뢰입니다.',
    ctaTitle: '다음 혁신을 함께 설계합시다',
    ctaDesc: 'OEM 납품, R&D 협력, 기술 파트너십. 데이터가 답을 알고 있습니다',
    ctaButton: '프로젝트 시작하기',
  },
  3: {
    heroSub: '바다에서 식탁까지, 서풍이 그리는 꿈의 여정',
    prioritiesLabel: 'The Path Ahead',
    prioritiesHeading: '5가지 약속',
    salesLabel: 'The Journey So Far',
    salesHeading: '걸어온 발자취',
    growthLabel: 'The Next Chapter',
    growthHeading: '다음 장(章)의 이야기',
    visionLabel: 'Our Dream',
    visionHeading: '꿈의 선언',
    visionStatement: '여수의 새벽에서 시작된 이야기는 아직 끝나지 않았습니다. 바다의 가치를 식탁에 전하는 여정, 서풍의 꿈은 계속됩니다.',
    ctaTitle: '이야기를 함께 써 나가세요',
    ctaDesc: '서풍과 함께라면, 당신의 다음 제품은 하나의 작품이 됩니다',
    ctaButton: '이야기 시작하기',
  },
  4: {
    heroSub: '대한민국 No.1 프리미엄 수산 OEM의 비전',
    prioritiesLabel: 'Excellence Plan',
    prioritiesHeading: '5대 최고 전략',
    salesLabel: 'Performance',
    salesHeading: '리더의 성과',
    growthLabel: 'Premium Growth',
    growthHeading: '프리미엄 성장 전략',
    visionLabel: 'Leadership Vision',
    visionHeading: '리더의 선언',
    visionStatement: '1등의 파트너가 1등을 만듭니다. 타협 없는 품질과 프리미엄 경쟁력으로 대한민국 수산 OEM의 최고 자리를 지킵니다.',
    ctaTitle: '최고와 함께하세요',
    ctaDesc: 'OEM 납품, 전략적 파트너십. 서풍이 최적의 해답을 제시합니다',
    ctaButton: '상담 신청',
  },
  5: {
    heroSub: '아무도 가지 않은 길 위의 새로운 이정표',
    prioritiesLabel: 'Pioneer Plan',
    prioritiesHeading: '5대 개척 과제',
    salesLabel: 'Trailblazer Metrics',
    salesHeading: '개척의 기록',
    growthLabel: 'New Frontiers',
    growthHeading: '새로운 길의 성장 동력',
    visionLabel: 'Pioneer Vision',
    visionHeading: '개척의 선언',
    visionStatement: '길이 없으면 만들면 됩니다. 한계를 정하지 않고, 세상에 없던 것을 최초로 만들어가는 것이 서풍의 비전입니다.',
    ctaTitle: '새로운 길을 함께 열어가세요',
    ctaDesc: '서풍과 함께라면 세상에 없던 것을 만들 수 있습니다',
    ctaButton: '개척 시작하기',
  },
  6: {
    heroSub: 'No.1 수산 가공 파트너를 향한 도전',
    prioritiesLabel: 'Key Initiatives',
    prioritiesHeading: '5대 중점 추진 과제',
    salesLabel: 'Financial Overview',
    salesHeading: '매출 현황',
    growthLabel: 'Growth Engine',
    growthHeading: '전략적 성장 동력',
    visionLabel: 'Our Vision',
    visionHeading: '비전 선언',
    visionStatement: '기술 혁신과 글로벌 인증을 기반으로, 대한민국 수산 OEM의 새로운 기준을 세우고 파트너와 함께 성장하겠습니다.',
    ctaTitle: '서풍과 함께 성장하세요',
    ctaDesc: 'OEM 납품, 신제품 개발, 브랜드 협업 — 어떤 도전이든 함께합니다',
    ctaButton: '함께 시작하기',
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const PRIORITIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: '이물 Zero화',
    desc: 'AI 기술 현장 도입으로 원료 기인성 이물 zero 달성',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A18.684 18.684 0 0112 21.75a18.684 18.684 0 01-7.135-1.137c-1.717-.293-2.299-2.379-1.067-3.611L5 15.3" />
      </svg>
    ),
    title: 'R&D 역량 강화',
    desc: '기업부설 연구소 설립, 푸드머스 전용 제품 개발, 연간 20회 제안 추진',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
    title: 'Smart 생산라인',
    desc: '원물~완제품까지 One-Way 자동화 생산라인 구축',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.528.38-2.968 1.05-4.228" />
      </svg>
    ),
    title: '글로벌 식품안전',
    desc: 'FSSC 22000 인증, 글로벌 HACCP 인증 추진',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: 'ESG 경영',
    desc: '풀무원 ESG 경영 방향 반영, 친환경 생산 체계, 제조환경 선제적 대응',
  },
];

const BRANDS = [
  { year: "'12", name: '한번얼린수산물', sales: '누적 45억' },
  { year: "'14", name: '품질인증수산물', sales: '누적 31억' },
  { year: "'17", name: '레몬담은수산물', sales: '누적 238억' },
  { year: "'19", name: '마리네이드수산물', sales: '누적 41억' },
  { year: "'24", name: 'ASC/MSC', sales: '누적 6억' },
];

const VISION_PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: '미래전략',
    desc: '매출-재투자의 선순환을 통한 글로벌 수준의 위생 체계와 자동화 라인 운영',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.417.068a18.684 18.684 0 01-7.487-.092l-.563-.113a18.75 18.75 0 00-6.099-.297L5 20.5" />
      </svg>
    ),
    title: '기술혁신',
    desc: 'AI 기술과 글로벌 인증 기반의 프리미엄 수산물 공급망 완성 및 고객 신뢰 극대화',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: '파트너십 및 동반성장',
    desc: '풀무원 ESG 경영 방향과 일치하는 친환경 생산 체계 구축 및 상생 협력',
  },
];

/* ──────────────────────────────────────────────
   Animated counter hook
   ────────────────────────────────────────────── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); io.disconnect(); } },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { ref, count };
}

/* ──────────────────────────────────────────────
   Page component
   ────────────────────────────────────────────── */
export default function VisionPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <ThemeLayout breadcrumb={[{ label: '비전' }]}>
      {(c) => {
        const copy = VISION_COPY[c.theme.id] ?? VISION_COPY[0];
        return (
        <>
          {/* ── Hero ── */}
          <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
            <Image
              src={getImagePath('/images/team/factory-group.jpg')}
              alt="서풍 공장 직원 단체사진"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
            <div className="relative z-10 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-300">
                Vision
              </p>
              <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-5xl lg:text-6xl">비전</h1>
              <p className="mt-4 text-lg text-white/90 drop-shadow">
                {copy.heroSub}
              </p>
            </div>
            <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${c.gradientFade}`} />
          </section>

          {/* ── 1. 5대 중점 추진 과제 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.prioritiesLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.prioritiesHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PRIORITIES.map((p, i) => (
                  <Reveal key={p.title} delay={i * 100}>
                    <div
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border ${c.cardBg} p-8 backdrop-blur-sm transition-all duration-500 md:p-10 ${
                        activeCard === i
                          ? `border-gold-500/50 shadow-lg shadow-gold-500/5`
                          : `${c.cardBorder} ${c.cardHover}`
                      } ${i >= 3 ? 'lg:col-span-1' : ''}`}
                      onClick={() => setActiveCard(activeCard === i ? null : i)}
                    >
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ocean-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative">
                        <div className={`mb-6 inline-flex rounded-xl p-3 transition-colors duration-300 ${
                          activeCard === i ? 'bg-ocean-500/15 text-ocean-500' : 'bg-ocean-500/10 text-ocean-400'
                        }`}>
                          {p.icon}
                        </div>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="font-montserrat text-xs font-bold text-ocean-500/60">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className={`text-xl font-bold ${c.text}`}>{p.title}</h3>
                        </div>
                        <p className={`leading-relaxed ${c.text2}`}>{p.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 2. 매출 현황 ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.salesLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.salesHeading}</h2>
                </div>
              </Reveal>

              {/* Total Sales */}
              <Reveal delay={100}>
                <div className={`mb-8 overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 md:p-12`}>
                  <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-ocean-400">총 매출</p>
                  <div className="grid grid-cols-3 gap-4 md:gap-8">
                    {[
                      { year: '2024', value: '376', unit: '억', highlight: false },
                      { year: '2025', value: '379', unit: '억', highlight: false },
                      { year: '2026 목표', value: '400', unit: '억', highlight: true, badge: '+6%' },
                    ].map((item, i) => (
                      <div key={item.year} className="relative text-center">
                        {i > 0 && (
                          <div className={`absolute -left-2 top-1/2 hidden -translate-y-1/2 ${c.textMuted} md:-left-4 md:block`}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        )}
                        <p className={`mb-2 font-montserrat text-xs ${c.text2} sm:text-sm`}>{item.year}</p>
                        <p className={`font-montserrat text-3xl font-bold sm:text-4xl md:text-6xl ${item.highlight ? 'text-ocean-500' : c.text}`}>
                          {item.value}
                          <span className={`ml-0.5 text-sm font-normal ${c.text2} md:ml-1 md:text-lg`}>{item.unit}</span>
                        </p>
                        {item.badge && (
                          <span className="mt-2 inline-block rounded-full bg-ocean-500/15 px-2 py-0.5 font-montserrat text-xs font-bold text-ocean-500 sm:mt-3 sm:px-3 sm:py-1 sm:text-sm">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* ASC/MSC & Investment */}
              <div className="grid gap-8 md:grid-cols-2">
                <Reveal delay={200}>
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 md:p-10`}>
                    <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-ocean-400">ASC / MSC 매출</p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className={`mb-2 font-montserrat text-sm ${c.text2}`}>2025년</p>
                        <p className={`font-montserrat text-3xl font-bold ${c.text}`}>
                          3.6<span className={`ml-1 text-sm font-normal ${c.text2}`}>억</span>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className={`mb-2 font-montserrat text-sm ${c.text2}`}>2026 목표</p>
                        <p className="font-montserrat text-3xl font-bold text-ocean-500">
                          12<span className={`ml-1 text-sm font-normal ${c.text2}`}>억</span>
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-ocean-500/15 px-3 py-1 font-montserrat text-xs font-bold text-ocean-500">
                          +330%
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 md:p-10`}>
                    <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-ocean-400">설비 투자</p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { year: '2024', value: '8억' },
                        { year: '2025', value: '7.4억' },
                        { year: '2026', value: '~9억', highlight: true },
                      ].map((item) => (
                        <div key={item.year} className="text-center">
                          <p className={`mb-2 font-montserrat text-sm ${c.text2}`}>{item.year}</p>
                          <p className={`font-montserrat text-2xl font-bold ${item.highlight ? 'text-ocean-500' : c.text}`}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── 2.5 전략적 성장 동력 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-30" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.growthLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.growthHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-2">
                <Reveal delay={100}>
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} border-l-ocean-500 border-l-4 ${c.cardBg} p-8 backdrop-blur-sm md:p-10`}>
                    <h3 className={`mb-4 text-xl font-bold ${c.text}`}>MG 품목 운영 확산</h3>
                    <ul className={`space-y-3 ${c.text2}`}>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                        <span>푸드머스 전용 MG 품목군 확대 운영</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                        <span>전략적 저단가 품목군 단독 공급 체결로 연중 균일가 공급 안정화</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                        <span>국산/수입산 연단위 물량 계약으로 재고 확보</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} border-l-ocean-500 border-l-4 ${c.cardBg} p-8 backdrop-blur-sm md:p-10`}>
                    <h3 className={`mb-4 text-xl font-bold ${c.text}`}>지속가능 브랜드 확대</h3>
                    <ul className={`space-y-3 ${c.text2}`}>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                        <span>ASC·MSC 인증 어종 확대 (임연수어, 대구 등)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                        <span>특화 마리네이드 기술 적용 품목 확대</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-400" />
                        <span>오븐구이 브랜드 신규 출시 예정</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── 3. 제품 개발 성과 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Product Development
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>제품 개발 성과</h2>
                </div>
              </Reveal>

              {/* Stats */}
              <Reveal delay={100}>
                <div className="mb-16 grid gap-6 md:grid-cols-4">
                  {[
                    { number: '134', label: '10년간 출시 품목', sub: '수산물 제외' },
                    { number: '66', label: '현 운영 품목', sub: '' },
                    { number: '~1천만', label: '제품당 투자액', sub: '원' },
                    { number: '~5개월', label: '신제품 개발 소요', sub: '' },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-2xl border ${c.cardBorder} ${c.cardBg} p-6 text-center`}>
                      <p className="font-montserrat text-3xl font-bold text-ocean-400 md:text-4xl">{stat.number}</p>
                      {stat.sub && <p className={`text-xs ${c.text2}`}>{stat.sub}</p>}
                      <p className={`mt-2 text-sm ${c.text2}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Brand History */}
              <Reveal delay={200}>
                <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 md:p-12`}>
                  <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-ocean-400">브랜드 히스토리</p>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-ocean-500/40 via-gold-500/40 to-ocean-500/40" />
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
                      {BRANDS.map((brand, i) => (
                        <div key={brand.name} className="relative pt-8 text-center">
                          {/* Dot on timeline */}
                          <div className={`absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold-500 ${c.pageBg}`} />
                          <p className="mb-1 font-montserrat text-sm font-bold text-ocean-500">{brand.year}</p>
                          <p className={`mb-1 text-sm font-semibold ${c.text}`}>{brand.name}</p>
                          <p className={`text-xs ${c.text2}`}>{brand.sales}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`mt-8 rounded-xl ${c.sectionAlt} px-6 py-4 text-center`}>
                    <p className={`text-sm ${c.text2}`}>
                      연간 <span className="font-montserrat font-bold text-ocean-500">20</span>회 제안 추진
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 4. Vision Statement ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-navy-800)_0%,_transparent_70%)] opacity-50" />
            <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.visionLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.visionHeading}</h2>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className={`mb-16 rounded-2xl border border-gold-500/20 ${c.cardBg} p-10 text-center md:p-16`}>
                  <div className="relative pl-0">
                    <svg className="mx-auto mb-6 h-8 w-8 text-ocean-500/40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className={`text-xl leading-relaxed ${c.text2} md:text-2xl md:leading-relaxed`}>
                      {copy.visionStatement}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 3 Pillars */}
              <div className="grid gap-8 md:grid-cols-3">
                {VISION_PILLARS.map((p, i) => (
                  <Reveal key={p.title} delay={i * 150 + 200}>
                    <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 transition-all duration-500 ${c.cardHover} md:p-10`}>
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ocean-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="mb-6 inline-flex rounded-xl bg-ocean-500/10 p-3 text-ocean-400">
                          {p.icon}
                        </div>
                        <h3 className={`mb-4 text-xl font-bold ${c.text}`}>{p.title}</h3>
                        <p className={`leading-relaxed ${c.text2}`}>{p.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Closing CTA ── */}
          <section className={`relative py-24 md:py-32 ${c.sectionAlt}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-60" />
            <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
              <Reveal>
                <h2 className={`mb-6 text-3xl font-bold ${c.text} md:text-4xl`}>{copy.ctaTitle}</h2>
                <p className={`mb-10 text-lg leading-relaxed ${c.text2}`}>
                  {copy.ctaDesc}
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-ocean-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-ocean-400 hover:shadow-lg hover:shadow-ocean-500/20"
                  >
                    {copy.ctaButton} &rarr;
                  </Link>
                  <Link
                    href="/process"
                    className="inline-flex items-center gap-2 rounded-xl border border-ocean-500 px-8 py-4 font-semibold text-ocean-400 transition-all duration-300 hover:bg-ocean-500/10"
                  >
                    생산공정 보기 &rarr;
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </>
        );
      }}
    </ThemeLayout>
  );
}
