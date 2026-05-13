'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import { investCrud, type Investment as InvestType } from '@/lib/admin-store';

/* ──────────────────────────────────────────────
   Skin-specific copy (only skin 6 used as default)
   ────────────────────────────────────────────── */
interface TechCopy {
  heroLabel: string;
  heroTitle: string;
  heroSub: string;
  focusLabel: string;
  focusTitle: string;
  focusAccent: string;
  focusDesc: string;
  autoLabel: string;
  autoTitle: string;
  autoAccent: string;
  autoDesc: string;
  roadmapLabel: string;
  roadmapTitle: string;
  roadmapAccent: string;
  investLabel: string;
  investTitle: string;
  qualityLabel: string;
  qualityTitle: string;
  qualityAccent: string;
  qualityClosing: string;
}

const COPY: Record<number, TechCopy> = {
  0: {
    heroLabel: 'Technology & Facility',
    heroTitle: '기술·설비',
    heroSub: 'R&D 역량 강화와 스마트 생산라인으로 글로벌 수준의 품질 체계 구축',
    focusLabel: '5 Key Initiatives',
    focusTitle: '5대 중점',
    focusAccent: '추진 과제',
    focusDesc: 'R&D 역량강화, 스마트 생산라인 구축, AI 기술 도입 등을 통한 글로벌 수준의 품질 및 환경 관리 체계 확립',
    autoLabel: 'Smart Automation',
    autoTitle: '기술 중심의',
    autoAccent: '생산 자동화 로드맵',
    autoDesc: '스마트 팩토리 구현을 위해 단계적으로 자동화 설비를 도입하고 있습니다.',
    roadmapLabel: 'Investment Roadmap',
    roadmapTitle: '연도별 주요',
    roadmapAccent: '투자 내역',
    investLabel: '2026 Investment Plan',
    investTitle: '2026년 투자 계획',
    qualityLabel: 'Quality Infrastructure',
    qualityTitle: '품질 관리',
    qualityAccent: '인프라',
    qualityClosing: '서풍은 방사능 검사, 이물 관리, HACCP 기반 위생 관리를 통해 식품 안전을 최우선으로 합니다.',
  },
  1: {
    heroLabel: 'Arsenal & Firepower',
    heroTitle: '전투 장비, 기술력',
    heroSub: '거친 시장에서 살아남는 무기, 최강의 설비',
    focusLabel: '5 Battle Plans',
    focusTitle: '5대 핵심',
    focusAccent: '전투 전략',
    focusDesc: 'R&D 역량강화, 스마트 생산라인, AI 기술 도입으로 경쟁사를 압도하는 품질 체계 확립',
    autoLabel: 'Battle Strategy',
    autoTitle: '공격적인',
    autoAccent: '자동화 전략',
    autoDesc: '멈추면 뒤처진다. 거침없이 자동화 설비를 투입합니다.',
    roadmapLabel: 'Attack Plan',
    roadmapTitle: '연도별',
    roadmapAccent: '투자 전력',
    investLabel: '2026 Offensive',
    investTitle: '2026년 공격적 투자',
    qualityLabel: 'Defense Line',
    qualityTitle: '품질 방어',
    qualityAccent: '최전선',
    qualityClosing: '방사능 검사, 이물 관리, HACCP — 한 발자국도 뚫리지 않는 서풍의 품질 방어선.',
  },
  2: {
    heroLabel: 'Smart Factory System',
    heroTitle: 'AI 기반 스마트 팩토리',
    heroSub: 'IoT·빅데이터·자동화가 구동하는 지능형 수산 가공',
    focusLabel: '5 Core Modules',
    focusTitle: '5대 핵심',
    focusAccent: '추진 모듈',
    focusDesc: 'R&D, 스마트 생산라인, AI 기술 도입으로 글로벌 수준의 품질·환경 관리 시스템 구축',
    autoLabel: 'Automation Pipeline',
    autoTitle: '단계별',
    autoAccent: '자동화 파이프라인',
    autoDesc: '수작업 → 반자동 → 완전자동화. 데이터가 각 단계의 전환 시점을 결정합니다.',
    roadmapLabel: 'Capex Roadmap',
    roadmapTitle: '연도별 설비',
    roadmapAccent: '투자 타임라인',
    investLabel: '2026 Capex Plan',
    investTitle: '2026 투자 파이프라인',
    qualityLabel: 'QA Infrastructure',
    qualityTitle: '품질 관리',
    qualityAccent: '시스템',
    qualityClosing: '방사능 스펙트로미터, AI 이물 검출, HACCP 모니터링 — 모든 데이터가 실시간으로 대시보드에 집계됩니다.',
  },
  3: {
    heroLabel: 'The Machines Behind the Magic',
    heroTitle: '기술이 빚어낸 맛',
    heroSub: '보이지 않는 곳에서 묵묵히 일하는 장비들의 이야기',
    focusLabel: '5 Chapters',
    focusTitle: '5가지',
    focusAccent: '약속',
    focusDesc: '연구, 자동화, AI, 글로벌 인증, 그리고 환경 — 다섯 가지 길 위에서 서풍은 내일을 준비합니다',
    autoLabel: 'Evolution',
    autoTitle: '손끝에서 기계로,',
    autoAccent: '진화하는 공정',
    autoDesc: '장인의 손끝에서 시작된 기술이 기계의 정밀함과 만나 새로운 장을 열고 있습니다.',
    roadmapLabel: 'The Road Ahead',
    roadmapTitle: '투자의',
    roadmapAccent: '여정',
    investLabel: '2026 Chapter',
    investTitle: '2026년, 새로운 장(章)',
    qualityLabel: 'Watchful Eyes',
    qualityTitle: '식탁을 지키는',
    qualityAccent: '눈(目)',
    qualityClosing: '보이지 않는 곳에서, 보이지 않는 위협을 막아내는 사람들. 서풍의 품질은 그 헌신 위에 서 있습니다.',
  },
  4: {
    heroLabel: 'Premium Technology',
    heroTitle: '업계 최고 설비',
    heroSub: '대한민국 수산 OEM No.1의 기술 경쟁력',
    focusLabel: '5 Pillars',
    focusTitle: '5대 핵심',
    focusAccent: '경쟁력',
    focusDesc: 'R&D, 스마트 생산라인, AI 기술, 글로벌 인증, ESG — 업계 최고 수준의 5대 추진 과제',
    autoLabel: 'Industry Leader',
    autoTitle: '업계를 선도하는',
    autoAccent: '자동화 비전',
    autoDesc: '경쟁사가 따라올 수 없는 설비 투자. 서풍의 자동화는 업계의 기준이 됩니다.',
    roadmapLabel: 'Strategic Investment',
    roadmapTitle: '전략적',
    roadmapAccent: '투자 내역',
    investLabel: '2026 Strategic Plan',
    investTitle: '2026년 전략 투자',
    qualityLabel: 'Gold Standard',
    qualityTitle: '품질 관리의',
    qualityAccent: '골드 스탠다드',
    qualityClosing: '방사능 검사, 이물 관리, HACCP 인증 — 대한민국 최고 수준의 품질 인프라를 갖추고 있습니다.',
  },
  5: {
    heroLabel: 'Pioneering Technology',
    heroTitle: '아무도 가지 않은 기술의 길',
    heroSub: '수산 가공의 새로운 기준을 세우는 개척자',
    focusLabel: '5 Frontiers',
    focusTitle: '5대 개척',
    focusAccent: '과제',
    focusDesc: '연구, 자동화, AI, 글로벌 인증, ESG — 아무도 가지 않은 길 위에 5개의 이정표를 세웁니다',
    autoLabel: 'Trailblazing',
    autoTitle: '새로운 길을 여는',
    autoAccent: '자동화 혁신',
    autoDesc: '관행에 안주하지 않습니다. 매번 새로운 기준을 세우는 것이 서풍의 자동화 철학입니다.',
    roadmapLabel: 'Pioneer\'s Roadmap',
    roadmapTitle: '개척자의',
    roadmapAccent: '투자 로드맵',
    investLabel: '2026 Pioneer Plan',
    investTitle: '2026년, 새로운 도전',
    qualityLabel: 'New Standard',
    qualityTitle: '품질의 새로운',
    qualityAccent: '기준',
    qualityClosing: '남들이 따르는 기준을 만드는 것. 그것이 서풍의 품질 철학입니다.',
  },
  6: {
    heroLabel: 'Technology & Facility',
    heroTitle: '기술·설비',
    heroSub: 'R&D 역량 강화와 스마트 생산라인으로 글로벌 수준의 품질 체계 구축',
    focusLabel: '5 Key Initiatives',
    focusTitle: '5대 중점',
    focusAccent: '추진 과제',
    focusDesc: 'R&D 역량강화, 스마트 생산라인 구축, AI 기술 도입 등을 통한 글로벌 수준의 품질 및 환경 관리 체계 확립',
    autoLabel: 'Smart Automation',
    autoTitle: '진화하는',
    autoAccent: '생산 자동화',
    autoDesc: '수작업에서 스마트 자동화로. 매년 설비 투자를 확대하며 생산 효율을 높여가고 있습니다.',
    roadmapLabel: 'Investment Roadmap',
    roadmapTitle: '연도별 주요',
    roadmapAccent: '투자 내역',
    investLabel: '2026 Investment',
    investTitle: '2026년 투자 계획',
    qualityLabel: 'Quality System',
    qualityTitle: '품질 관리',
    qualityAccent: '인프라',
    qualityClosing: '방사능 검사, AI 이물 검출, HACCP 기반 위생 관리 — 기술로 뒷받침되는 품질 시스템입니다.',
  },
};

/* ─── 5대 중점 추진 과제 (PPT Slide 5) ─── */
const FOCUS_AREAS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.3 24.3 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.75-11.396c.251.023.501.05.75.082M12 21a8.966 8.966 0 0 0 5.982-2.275M12 21a8.966 8.966 0 0 1-5.982-2.275" />
      </svg>
    ),
    title: 'R&D 역량 강화',
    desc: '기업부설 연구소 설립 및 푸드머스 전용 제품 개발 체계 구축',
    detail: '약 10년간 134품목 출시, 現 66개 품목 운영',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
      </svg>
    ),
    title: 'Smart 생산라인 구축',
    desc: '원물~완제품까지 One-Way 자동화 생산라인 구축',
    detail: '급속동결, 자동화 포장, 스캔 자동절단',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: '이물 Zero화',
    desc: 'AI 초분광 등 첨단 기술을 현장에 도입하여 원료 기인성 이물 "Zero" 달성',
    detail: '2026년 AI 초분광 검출기 약 2.5억 투자',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.73-3.555" />
      </svg>
    ),
    title: '글로벌 식품안전 관리',
    desc: 'FSSC 22000 인증 및 글로벌 HACCP 인증 추진',
    detail: '2026년내 FSSC 22000 추진 예정',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 1 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
      </svg>
    ),
    title: 'ESG 경영',
    desc: '풀무원 가치 체계 반영 및 친환경 제조환경 선제적 대응',
    detail: 'ASC·MSC 지속가능 수산물 인증 확대',
  },
];

/* ─── Timeline data (PPT Slide 4) ─── */
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
    items: 'AI 초분광, 전처리 자동화, 특수 해동기, 오븐 구이기 등',
    amount: '약 6.9억원',
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
  { label: 'AI 초분광', amount: '2.5', unit: '억' },
  { label: '전처리 자동화', amount: '3.5', unit: '억' },
  { label: '오븐 설비', amount: '0.9', unit: '억' },
];

/* ─── 인증 현황 ─── */
const CERTS = [
  { name: 'HACCP', desc: '전 식품유형 인증', year: '2011~' },
  { name: 'ASC·MSC', desc: '지속가능 수산물 인증', year: '2024~' },
  { name: '수산물 이력제', desc: '전품목 확대 적용', year: '2013~' },
  { name: 'FSSC 22000', desc: '글로벌 식품안전 인증', year: '2026 추진' },
];

export default function TechnologyPage() {
  const [timeline, setTimeline] = useState(TIMELINE);

  useEffect(() => {
    investCrud.getAll('sortOrder', 'asc').then((items: InvestType[]) => {
      if (items.length > 0) setTimeline(items.map(inv => ({ year: inv.year, label: inv.label, items: inv.items, amount: inv.amount, highlight: inv.highlight })));
    }).catch(() => {});
  }, []);

  return (
    <ThemeLayout breadcrumb={[{ label: '기술·설비' }]}>
      {(c) => {
        const copy = COPY[c.theme.id] || COPY[0];
        return (
          <>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
              <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
                <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-300">
                  {copy.heroLabel}
                </span>
                <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-5xl lg:text-6xl">{copy.heroTitle}</h1>
                <p className="mt-3 text-lg text-white/90 drop-shadow">{copy.heroSub}</p>
              </div>
            </section>

            {/* ══════════════════════════════════════ */}
            {/* 1. 5대 중점 추진 과제 (PPT Slide 5)   */}
            {/* ══════════════════════════════════════ */}
            <section className={`border-t border-gray-200 ${c.sectionAlt} py-24 md:py-32`}>
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-16 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.focusLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.focusTitle} <span className="text-ocean-500">{copy.focusAccent}</span>
                    </h2>
                    <p className={`mx-auto mt-4 max-w-3xl text-base ${c.text2}`}>
                      {copy.focusDesc}
                    </p>
                  </div>
                </FadeIn>

                {/* 5 cards in a pentagon-like layout */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {FOCUS_AREAS.map((area, i) => (
                    <FadeIn key={area.title} delay={i * 80}>
                      <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-7 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5 ${
                        i >= 3 ? 'lg:col-span-1' : ''
                      }`}>
                        {/* Accent line */}
                        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-ocean-500/60 to-ocean-400/20" />

                        <div className="mb-4 flex items-center gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ocean-500/10 text-ocean-500">
                            {area.icon}
                          </div>
                          <div>
                            <span className="font-montserrat text-xs font-bold text-ocean-400">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className={`text-lg font-bold ${c.text}`}>{area.title}</h3>
                          </div>
                        </div>
                        <p className={`mb-3 text-sm leading-relaxed ${c.text2}`}>{area.desc}</p>
                        <p className="text-xs font-medium text-ocean-400">{area.detail}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* 재투자 중심 경영 강조 (PPT Slide 2) */}
                <FadeIn className="mt-12">
                  <div className={`rounded-2xl border border-ocean-500/20 ${c.cardBg} p-8 text-center md:p-10`}>
                    <p className={`text-lg font-medium leading-relaxed ${c.text2}`}>
                      매출 성장을 현장과 품질에 환원하는 <span className="font-bold text-ocean-500">선순환 재투자 경영</span>
                    </p>
                    <p className={`mt-2 text-sm ${c.text2}`}>
                      푸드머스 매출액 기준 약 5~6% 수준의 꾸준한 설비 투자를 통해 생산 및 품질 설비를 고도화하고 있습니다.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* ══════════════════════════════════════ */}
            {/* 2. 인증 현황 요약                      */}
            {/* ══════════════════════════════════════ */}
            <section className="border-t border-gray-200 py-20 md:py-24">
              <div className="mx-auto max-w-5xl px-6">
                <FadeIn>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {CERTS.map((cert, i) => (
                      <div
                        key={cert.name}
                        className={`rounded-xl border ${c.cardBorder} ${c.cardBg} px-5 py-6 text-center transition-all duration-300 hover:border-ocean-500/30`}
                      >
                        <p className="font-montserrat text-lg font-bold text-ocean-500">{cert.name}</p>
                        <p className={`mt-1 text-sm font-medium ${c.text}`}>{cert.desc}</p>
                        <p className={`mt-1 text-xs ${c.text2}`}>{cert.year}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* ══════════════════════════════════════ */}
            {/* 3. 생산 자동화 비전                    */}
            {/* ══════════════════════════════════════ */}
            <section className={`border-t border-gray-200 ${c.sectionAlt} py-24 md:py-32`}>
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-14 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.autoLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.autoTitle} <span className="text-ocean-500">{copy.autoAccent}</span>
                    </h2>
                    <p className={`mx-auto mt-4 max-w-2xl ${c.text2}`}>
                      {copy.autoDesc}
                    </p>
                  </div>
                </FadeIn>

                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      title: '수작업 + 기계 병행',
                      desc: '숙련 기술자의 수작업과 자동화 장비를 최적으로 조합',
                      image: null,
                      icon: (
                        <svg viewBox="0 0 64 64" fill="none" className="h-20 w-20 text-ocean-400" strokeWidth={1.5} stroke="currentColor">
                          <path d="M20 32c0-3 1-5 3-7l4-4c1-1 3-1 4 0l3 3c1 1 1 3 0 4l-4 4-4 4M14 38l8 8M22 30l-8 8c-1 1-1 3 0 4l4 4c1 1 3 1 4 0l8-8" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="46" cy="22" r="9" />
                          <path d="M46 17v5l3 3M40 13l-2-2M52 13l2-2M40 31l-2 2M52 31l2 2M37 22h-3M58 22h-3" strokeLinecap="round" />
                          <path d="M30 26l8-4" strokeDasharray="2 2" />
                        </svg>
                      ),
                    },
                    {
                      title: '스캔 기반 정밀 가공',
                      desc: '어류 스캔 절단기로 균일한 품질 확보',
                      image: null,
                      icon: (
                        <svg viewBox="0 0 64 64" fill="none" className="h-20 w-20 text-ocean-400" strokeWidth={1.5} stroke="currentColor">
                          <rect x="8" y="14" width="48" height="36" rx="3" />
                          <path d="M8 32h48" strokeDasharray="2 3" />
                          <path d="M14 22h36M14 26h28M14 42h36M14 38h22" opacity="0.6" />
                          <circle cx="48" cy="22" r="2" fill="currentColor" />
                          <path d="M22 20l8 10-4 8M30 20l-8 10 4 8" opacity="0.5" />
                        </svg>
                      ),
                    },
                    {
                      title: '급속동결 & 자동 포장',
                      desc: '터널프리저 IQF와 로터리 포장기로 생산성 극대화',
                      image: null,
                      icon: (
                        <svg viewBox="0 0 64 64" fill="none" className="h-20 w-20 text-ocean-400" strokeWidth={1.5} stroke="currentColor">
                          <path d="M32 8v48M8 32h48M16 16l32 32M48 16L16 48" strokeLinecap="round" />
                          <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.15" />
                          <path d="M30 6l2 2 2-2M30 58l2-2 2 2M6 30l2 2-2 2M58 30l-2 2 2 2" strokeLinecap="round" />
                        </svg>
                      ),
                    },
                  ].map((card, i) => (
                    <FadeIn key={card.title}>
                      <div className={`group overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg} transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5`}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {card.image ? (
                            <Image
                              src={getImagePath(card.image)}
                              alt={card.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ocean-500/10 via-white to-ocean-500/5 transition-colors duration-300 group-hover:from-ocean-500/15">
                              {card.icon}
                            </div>
                          )}
                          <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ocean-500/90 font-montserrat text-sm font-bold text-white shadow-sm">
                            {i + 1}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className={`mb-1.5 text-lg font-bold ${c.text}`}>{card.title}</h3>
                          <p className={`text-sm leading-relaxed ${c.text2}`}>{card.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════ */}
            {/* 4. Investment Roadmap Timeline        */}
            {/* ══════════════════════════════════════ */}
            <section className="border-t border-gray-200 py-24 md:py-32">
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-16 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.roadmapLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.roadmapTitle} <span className="text-ocean-500">{copy.roadmapAccent}</span>
                    </h2>
                  </div>
                </FadeIn>

                {/* Horizontal timeline */}
                <FadeIn>
                  <div className="relative">
                    {/* Horizontal line */}
                    <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-navy-700 via-ocean-500/40 to-navy-700 lg:block" />

                    <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                      {timeline.map((t) => (
                        <div key={t.year} className="relative text-center">
                          {/* Dot */}
                          <div
                            className={`relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                              t.highlight
                                ? 'border-gold-500 bg-ocean-500/10 shadow-lg shadow-gold-500/20'
                                : `border-gray-300 ${c.sectionAlt}`
                            }`}
                          >
                            <span
                              className={`font-montserrat text-xs font-bold ${
                                t.highlight ? 'text-ocean-500' : 'text-ocean-400'
                              }`}
                            >
                              {t.year}
                            </span>
                          </div>

                          <h3 className={`mb-2 text-lg font-bold ${t.highlight ? 'text-ocean-500' : c.text}`}>
                            {t.label}
                          </h3>
                          <p className={`mb-2 text-sm leading-relaxed ${c.text2}`}>{t.items}</p>
                          {t.amount && (
                            <span
                              className={`inline-block rounded-full px-3 py-1 font-montserrat text-xs font-bold ${
                                t.highlight
                                  ? 'bg-ocean-500/10 text-ocean-500 border border-gold-500/30'
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
            {/* 5. 2026 Investment Summary Bar        */}
            {/* ══════════════════════════════════════ */}
            <section className={`border-t border-gray-200 ${c.sectionAlt} py-24 md:py-32`}>
              <div className="mx-auto max-w-5xl px-6">
                <FadeIn>
                  <div className="mb-10 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-500">
                      {copy.investLabel}
                    </span>
                    <h2 className={`text-2xl font-bold ${c.text} md:text-3xl`}>
                      {copy.investTitle}
                    </h2>
                  </div>
                </FadeIn>

                <FadeIn>
                  <div className={`overflow-hidden rounded-2xl border border-gold-500/20 ${c.cardBg}`}>
                    <div className="grid grid-cols-3">
                      {INVEST_2026.map((item, i) => (
                        <div
                          key={item.label}
                          className={`flex flex-col items-center justify-center p-6 md:p-8 ${
                            i < INVEST_2026.length - 1 ? `border-r ${c.cardBorder}` : ''
                          }`}
                        >
                          <p className={`mb-1 text-sm font-medium ${c.text2}`}>{item.label}</p>
                          <p className={`font-montserrat text-3xl font-bold ${c.text} md:text-4xl`}>
                            {item.amount}
                            <span className={`ml-0.5 text-lg ${c.text2}`}>{item.unit}</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Total bar */}
                    <div className={`border-t border-gold-500/20 bg-ocean-500/5 px-6 py-5 text-center`}>
                      <span className={`text-sm ${c.text2}`}>총 투자 예정 </span>
                      <span className="font-montserrat text-2xl font-bold text-ocean-500 md:text-3xl">
                        약 6.9<span className="ml-0.5 text-lg">억원</span>
                      </span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* ══════════════════════════════════════ */}
            {/* 6. 품질 관리 인프라                    */}
            {/* ══════════════════════════════════════ */}
            <section className="border-t border-gray-200 py-24 md:py-32">
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-14 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.qualityLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.qualityTitle} <span className="text-ocean-500">{copy.qualityAccent}</span>
                    </h2>
                    <p className={`mx-auto mt-4 max-w-2xl text-base ${c.text2} md:text-lg`}>
                      원료 입고부터 완제품 출하까지, 4단계 품질 검증 체계로 안전을 확보합니다
                    </p>
                  </div>
                </FadeIn>

                {/* 4단계 검증 흐름 */}
                <FadeIn>
                  <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        step: '01',
                        title: '입고 검사',
                        desc: '원료 방사능·이물·신선도 전수 검사',
                        icon: (
                          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                            <path d="M16 4l10 6v8c0 6-4 10-10 10S6 24 6 18v-8l10-6z" />
                            <path d="M12 16l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ),
                      },
                      {
                        step: '02',
                        title: '가공 중 검사',
                        desc: 'HACCP 핵심관리점(CCP) 실시간 모니터링',
                        icon: (
                          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                            <circle cx="16" cy="16" r="11" />
                            <path d="M16 8v8l5 3" strokeLinecap="round" />
                          </svg>
                        ),
                      },
                      {
                        step: '03',
                        title: '출하 전 검사',
                        desc: '금속 검출·이물 X-ray·중량 자동 검사',
                        icon: (
                          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                            <rect x="4" y="10" width="24" height="14" rx="2" />
                            <path d="M10 14l4 6 4-4 4 8" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="22" cy="14" r="1.5" fill="currentColor" />
                          </svg>
                        ),
                      },
                      {
                        step: '04',
                        title: '이력 추적',
                        desc: '전 품목 이력 추적관리 (2013년~)',
                        icon: (
                          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                            <rect x="6" y="6" width="20" height="20" rx="2" />
                            <path d="M10 12h12M10 16h12M10 20h8" strokeLinecap="round" />
                            <path d="M22 20l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ),
                      },
                    ].map((s) => (
                      <div key={s.step} className={`relative overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg} p-6 transition-all duration-300 hover:border-ocean-500/40 hover:shadow-md`}>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="font-montserrat text-2xl font-extrabold text-ocean-500/40">{s.step}</span>
                          <div className="rounded-lg bg-ocean-500/10 p-2 text-ocean-500">{s.icon}</div>
                        </div>
                        <h3 className={`mb-2 text-base font-bold ${c.text} md:text-lg`}>{s.title}</h3>
                        <p className={`text-sm leading-relaxed ${c.text2}`}>{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                {/* 사진 2장 + 검사 체크리스트 */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <FadeIn>
                    <div className={`overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg}`}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImagePath('/images/facility/radiation-tester-real.jpg')}
                          alt="방사능 검사실"
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-5">
                        <p className={`text-sm font-bold ${c.text}`}>방사능 검사실</p>
                        <p className={`mt-1 text-xs ${c.text2} md:text-sm`}>
                          Gamma Radiation Spectrometer 상시 가동 — 입고 원료 전수 검사
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn>
                    <div className={`overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg}`}>
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gold-500/10 via-white to-ocean-500/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-4 px-6">
                            {[
                              { label: 'X-ray', color: 'text-ocean-500' },
                              { label: '금속 검출', color: 'text-ocean-500' },
                              { label: '시각 검수', color: 'text-ocean-500' },
                            ].map((step) => (
                              <div key={step.label} className="flex flex-col items-center gap-2">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-ocean-500/15">
                                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} className={`h-7 w-7 ${step.color}`}>
                                    <circle cx="16" cy="16" r="11" />
                                    <path d="M12 16l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                                <span className="text-xs font-semibold text-gray-700">{step.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <span className="absolute right-4 top-4 rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-500">3 layers</span>
                      </div>
                      <div className="p-5">
                        <p className={`text-sm font-bold ${c.text}`}>이물 관리 체계</p>
                        <p className={`mt-1 text-xs ${c.text2} md:text-sm`}>
                          현장 이물 주의 게시 + 다단계 검출 시스템 운영
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* 검사 항목 체크리스트 */}
                <FadeIn className="mt-10">
                  <div className={`rounded-xl border ${c.cardBorder} ${c.cardBg} p-6 md:p-8`}>
                    <h3 className={`mb-5 text-lg font-bold ${c.text} md:text-xl`}>
                      <span className="text-ocean-500">10가지</span> 핵심 검사 항목
                    </h3>
                    <div className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-2">
                      {[
                        '방사능 (Gamma Spectrometer)',
                        '이물 검출 (X-ray, 금속검출기)',
                        '중량·규격 자동 측정',
                        '미생물 검사 (대장균·살모넬라 외)',
                        '히스타민·중금속',
                        '온도 관리 (입고·가공·보관)',
                        '냉동 상태 모니터링',
                        '포장 진공도 검사',
                        '라벨·바코드 검증',
                        '원산지 이력 추적',
                      ].map((item) => (
                        <div key={item} className={`flex items-start gap-2 text-sm ${c.text2}`}>
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn className="mt-10">
                  <p className={`mx-auto max-w-3xl text-center leading-relaxed ${c.text2}`}>
                    {copy.qualityClosing}
                  </p>
                </FadeIn>
              </div>
            </section>
          </>
        );
      }}
    </ThemeLayout>
  );
}
