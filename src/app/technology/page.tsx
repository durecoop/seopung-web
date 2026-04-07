'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import { equipCrud, investCrud, type Equipment as EquipType, type Investment as InvestType } from '@/lib/admin-store';

/* ──────────────────────────────────────────────
   Skin-specific copy
   ────────────────────────────────────────────── */
interface TechCopy {
  heroLabel: string;
  heroTitle: string;
  heroSub: string;
  xrayLabel: string;
  xrayTitle: string;
  xrayAccent: string;
  xrayDesc: string;
  xrayDiagramTitle: string;
  hyperLabel: string;
  hyperTitle: string;
  hyperAccent: string;
  equipLabel: string;
  equipTitle: string;
  equipAccent: string;
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
  // 0: 클린 오션 — 따뜻, 신뢰
  0: {
    heroLabel: 'Technology & Facility',
    heroTitle: '기술·설비',
    heroSub: 'AI 기술이 지키는 품질, 스마트 팩토리',
    xrayLabel: 'Featured Technology',
    xrayTitle: 'AI 엑스레이',
    xrayAccent: '검출 시스템',
    xrayDesc: '농심엔지니어링과 약 6개월간 협업하여 검증을 완료한 AI 엑스레이는 제품 내부를 X-ray로 촬영한 뒤 인공지능이 이물, 결함, 충진량 이상 등을 자동으로 판별하는 검사 시스템입니다.',
    xrayDiagramTitle: 'AI 엑스레이 구성도',
    hyperLabel: 'Next-Gen Detection',
    hyperTitle: 'AI 초분광 검출기 —',
    hyperAccent: '차세대 품질 혁신',
    equipLabel: 'Equipment',
    equipTitle: '주요 설비',
    equipAccent: '현황',
    autoLabel: 'Automation Vision',
    autoTitle: '기술 중심의',
    autoAccent: '생산 자동화 로드맵',
    autoDesc: '스마트 팩토리 구현을 위해 단계적으로 자동화 설비를 도입하고 있습니다.',
    roadmapLabel: 'Investment Roadmap',
    roadmapTitle: '투자',
    roadmapAccent: '로드맵',
    investLabel: '2026 Investment Plan',
    investTitle: '2026년 투자 계획',
    qualityLabel: 'Quality Infrastructure',
    qualityTitle: '품질 관리',
    qualityAccent: '인프라',
    qualityClosing: '서풍은 방사능 검사, 이물 관리, HACCP 기반 위생 관리를 통해 식품 안전을 최우선으로 합니다.',
  },
  // 1: 딥 네이비 — 강인함, 도전
  1: {
    heroLabel: 'Arsenal & Firepower',
    heroTitle: '전투 장비, 기술력',
    heroSub: '거친 시장에서 살아남는 무기, 최강의 설비',
    xrayLabel: 'Weapon System',
    xrayTitle: 'AI 엑스레이',
    xrayAccent: '철벽 검출 시스템',
    xrayDesc: '6개월간의 실전 검증을 마친 AI 엑스레이 — 이물, 결함, 충진량 이상을 한 치의 오차 없이 잡아냅니다. 약한 제품은 여기서 걸러진다.',
    xrayDiagramTitle: 'AI 엑스레이 전투 배치도',
    hyperLabel: 'Next Weapon',
    hyperTitle: 'AI 초분광 검출기 —',
    hyperAccent: '차세대 무기 도입',
    equipLabel: 'Heavy Equipment',
    equipTitle: '실전 검증된',
    equipAccent: '핵심 장비',
    autoLabel: 'Battle Strategy',
    autoTitle: '공격적인',
    autoAccent: '자동화 전략',
    autoDesc: '멈추면 뒤처진다. 거침없이 자동화 설비를 투입합니다.',
    roadmapLabel: 'Attack Plan',
    roadmapTitle: '공격적 투자',
    roadmapAccent: '로드맵',
    investLabel: '2026 Offensive',
    investTitle: '2026년 공격적 투자',
    qualityLabel: 'Defense Line',
    qualityTitle: '품질 방어',
    qualityAccent: '최전선',
    qualityClosing: '방사능 검사, 이물 관리, HACCP — 한 발자국도 뚫리지 않는 서풍의 품질 방어선.',
  },
  // 2: 테크 다크 — 기술, 데이터
  2: {
    heroLabel: 'Smart Factory System',
    heroTitle: 'AI 기반 스마트 팩토리',
    heroSub: 'AI·IoT·빅데이터가 구동하는 지능형 수산 가공',
    xrayLabel: 'Core AI Module',
    xrayTitle: 'AI X-ray',
    xrayAccent: '자동 검출 엔진',
    xrayDesc: 'CNN 기반 딥러닝 모델이 X-ray 이미지를 분석하여 이물·결함·충진량 이상을 밀리초 단위로 판별합니다. 약 1,000장의 학습 데이터, 99%+ 정확도.',
    xrayDiagramTitle: 'AI X-ray 시스템 아키텍처',
    hyperLabel: 'Spectral AI',
    hyperTitle: 'AI 초분광 모듈 —',
    hyperAccent: '비가시 영역 분석',
    equipLabel: 'Hardware Stack',
    equipTitle: '스마트 설비',
    equipAccent: '스택',
    autoLabel: 'Automation Pipeline',
    autoTitle: '단계별',
    autoAccent: '자동화 파이프라인',
    autoDesc: '수작업 → 반자동 → 완전자동화. 데이터가 각 단계의 전환 시점을 결정합니다.',
    roadmapLabel: 'Capex Roadmap',
    roadmapTitle: '설비 투자',
    roadmapAccent: '타임라인',
    investLabel: '2026 Capex Plan',
    investTitle: '2026 투자 파이프라인',
    qualityLabel: 'QA Infrastructure',
    qualityTitle: '품질 관리',
    qualityAccent: '시스템',
    qualityClosing: '방사능 스펙트로미터, AI 이물 검출, HACCP 모니터링 — 모든 데이터가 실시간으로 대시보드에 집계됩니다.',
  },
  // 3: 시네마틱 — 감성적, 서사적
  3: {
    heroLabel: 'The Machines Behind the Magic',
    heroTitle: '기술이 빚어낸 맛',
    heroSub: '보이지 않는 곳에서 묵묵히 일하는 장비들의 이야기',
    xrayLabel: 'The Guardian',
    xrayTitle: 'AI 엑스레이 —',
    xrayAccent: '보이지 않는 수호자',
    xrayDesc: '제품 속 깊은 곳까지 들여다보는 눈(目). 6개월간의 검증 끝에 탄생한 AI 엑스레이는 사람의 눈으로는 발견할 수 없는 이물까지 찾아냅니다.',
    xrayDiagramTitle: 'AI 엑스레이의 시선',
    hyperLabel: 'Beyond Light',
    hyperTitle: 'AI 초분광 —',
    hyperAccent: '빛 너머의 진실',
    equipLabel: 'Silent Heroes',
    equipTitle: '묵묵히 일하는',
    equipAccent: '설비들',
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
  // 4: 블루 프리미엄 — 자신감, 확신
  4: {
    heroLabel: 'Premium Technology',
    heroTitle: '업계 최고 설비',
    heroSub: '대한민국 수산 OEM No.1의 기술 경쟁력',
    xrayLabel: 'Premium QA',
    xrayTitle: 'AI 엑스레이',
    xrayAccent: '최고급 검출 시스템',
    xrayDesc: '대한민국 수산 업계 최초 AI 엑스레이 도입. 농심엔지니어링과 6개월 검증을 거쳐 완성한, 타의 추종을 불허하는 품질 검사 시스템입니다.',
    xrayDiagramTitle: 'AI 엑스레이 시스템 구성',
    hyperLabel: 'Leading Edge',
    hyperTitle: 'AI 초분광 —',
    hyperAccent: '업계 최초 도입',
    equipLabel: 'Top-Tier Equipment',
    equipTitle: '대한민국 최고',
    equipAccent: '설비 라인업',
    autoLabel: 'Industry Leader',
    autoTitle: '업계를 선도하는',
    autoAccent: '자동화 비전',
    autoDesc: '경쟁사가 따라올 수 없는 설비 투자. 서풍의 자동화는 업계의 기준이 됩니다.',
    roadmapLabel: 'Strategic Investment',
    roadmapTitle: '전략적 투자',
    roadmapAccent: '로드맵',
    investLabel: '2026 Strategic Plan',
    investTitle: '2026년 전략 투자',
    qualityLabel: 'Gold Standard',
    qualityTitle: '품질 관리의',
    qualityAccent: '골드 스탠다드',
    qualityClosing: '방사능 검사, 이물 관리, HACCP 인증 — 대한민국 최고 수준의 품질 인프라를 갖추고 있습니다.',
  },
  // 5: 글로우 다크 — 개척, 선구자
  5: {
    heroLabel: 'Pioneering Technology',
    heroTitle: '아무도 가지 않은 기술의 길',
    heroSub: '수산 가공의 새로운 기준을 세우는 개척자',
    xrayLabel: 'First in Industry',
    xrayTitle: 'AI 엑스레이 —',
    xrayAccent: '업계 최초의 도전',
    xrayDesc: '아무도 시도하지 않았던 수산 가공 AI 검출. 서풍이 처음으로 그 길을 열었습니다. 6개월의 검증, 약 2억원의 투자 — 개척자의 대가는 크지만 보상은 더 큽니다.',
    xrayDiagramTitle: 'AI 엑스레이 — 개척의 청사진',
    hyperLabel: 'Uncharted Territory',
    hyperTitle: 'AI 초분광 —',
    hyperAccent: '미지의 영역으로',
    equipLabel: 'Groundbreaking Gear',
    equipTitle: '한계를 넘는',
    equipAccent: '혁신 설비',
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
    heroSub: 'AI 기술과 자동화로 여는 스마트 팩토리',
    xrayLabel: 'Core Technology',
    xrayTitle: 'AI 엑스레이',
    xrayAccent: '검출 시스템',
    xrayDesc: '농심엔지니어링과 6개월간 협업하여 도입한 AI 엑스레이는 X-ray 촬영 후 인공지능이 이물, 결함, 충진량 이상을 실시간으로 판별합니다. 수산업계 최초 도입.',
    xrayDiagramTitle: 'AI 엑스레이 시스템 구성도',
    hyperLabel: 'Next Innovation',
    hyperTitle: 'AI 초분광 검출기 —',
    hyperAccent: '차세대 품질 혁신',
    equipLabel: 'Equipment',
    equipTitle: '핵심 설비',
    equipAccent: '라인업',
    autoLabel: 'Smart Automation',
    autoTitle: '진화하는',
    autoAccent: '생산 자동화',
    autoDesc: '수작업에서 스마트 자동화로. 매년 설비 투자를 확대하며 생산 효율을 높여가고 있습니다.',
    roadmapLabel: 'Investment Roadmap',
    roadmapTitle: '설비 투자',
    roadmapAccent: '로드맵',
    investLabel: '2026 Investment',
    investTitle: '2026년 투자 계획',
    qualityLabel: 'Quality System',
    qualityTitle: '품질 관리',
    qualityAccent: '인프라',
    qualityClosing: '방사능 검사, AI 이물 검출, HACCP 기반 위생 관리 — 기술로 뒷받침되는 품질 시스템입니다.',
  },
};

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
  const [equipment, setEquipment] = useState(EQUIPMENT);
  const [timeline, setTimeline] = useState(TIMELINE);

  useEffect(() => {
    equipCrud.getAll('sortOrder', 'asc').then((items: EquipType[]) => {
      if (items.length > 0) setEquipment(items.map(e => ({ name: e.name, image: e.imageUrl, desc: e.desc })));
    }).catch(() => {});
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
              <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade}`} />
              <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
                <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                  {copy.heroLabel}
                </span>
                <h1 className={`text-4xl font-bold ${c.text} md:text-5xl lg:text-6xl`}>{copy.heroTitle}</h1>
                <p className={`mt-3 text-lg ${c.text2}`}>{copy.heroSub}</p>
              </div>
            </section>

            {/* ══════════════════════════════════════ */}
            {/* 1. AI X-ray Featured Section          */}
            {/* ══════════════════════════════════════ */}
            <section className={`border-t border-gray-200 ${c.sectionAlt} py-24 md:py-32`}>
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-12 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.xrayLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.xrayTitle} <span className="text-ocean-500">{copy.xrayAccent}</span>
                    </h2>
                  </div>
                </FadeIn>

                {/* Large image + description */}
                <FadeIn>
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} lg:flex`}>
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:w-3/5">
                      <Image
                        src={getImagePath('/images/facility/ai-xray-process.png')}
                        alt="AI X-ray 이물질 검출 프로세스"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      {/* Investment badge */}
                      <div className="absolute left-4 top-4 rounded-full bg-ocean-500/90 px-5 py-2 text-sm font-bold text-white shadow-lg">
                        투자금액 약 2억원
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 lg:w-2/5 lg:p-12">
                      <h3 className={`mb-4 text-2xl font-bold ${c.text}`}>AI 엑스레이 검출기</h3>
                      <p className={`mb-6 leading-relaxed ${c.text2}`}>
                        {copy.xrayDesc}
                      </p>
                      <p className={`mb-6 leading-relaxed ${c.text2}`}>
                        푸드머스 순살 제품군 적용을 위해 도입하였으며, 26년 1월 최종 발주 완료(약 2억원)하여
                        4월 내 현장 도입 예정입니다.
                      </p>
                      <div className="rounded-xl border border-ocean-500/20 bg-ocean-500/5 p-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ocean-400">How It Works</p>
                        <div className={`flex flex-wrap items-center gap-2 text-sm ${c.text2}`}>
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
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} ${c.sectionAlt} p-6 md:p-10`}>
                    <h3 className={`mb-6 text-center text-lg font-semibold ${c.text2}`}>{copy.xrayDiagramTitle}</h3>
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
            <section className="border-t border-gray-200 py-24 md:py-32">
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-12 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.hyperLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.hyperTitle} <span className="text-ocean-500">{copy.hyperAccent}</span>
                    </h2>
                  </div>
                </FadeIn>

                <FadeIn>
                  <div className={`relative overflow-hidden rounded-2xl border border-ocean-500/30 ${c.cardBg} p-8 shadow-lg shadow-ocean-500/5 md:p-12`}>
                    {/* Ocean glow effect */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-ocean-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-ocean-400/5 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
                      <div className="flex-1">
                        <p className={`mb-6 text-lg leading-relaxed ${c.text2}`}>
                          기존 X-ray로는 검출이 어려운 이물질까지 초분광 이미징 기술로 판별합니다.
                          2026년 도입 예정으로 약 2.5억원이 투자됩니다.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="rounded-full bg-ocean-500/90 px-5 py-2 text-sm font-bold text-white shadow-lg">
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
            <section className="border-t border-gray-200 py-24 md:py-32">
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-12 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.equipLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.equipTitle} <span className="text-ocean-500">{copy.equipAccent}</span>
                    </h2>
                  </div>
                </FadeIn>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {equipment.map((eq, i) => (
                    <FadeIn key={eq.name} delay={i * 100}>
                      <div className={`group overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg} transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5`}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={getImagePath(eq.image)}
                            alt={eq.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-70`} />
                        </div>
                        <div className="p-5">
                          <h3 className={`mb-1.5 text-lg font-bold ${c.text}`}>{eq.name}</h3>
                          <p className={`text-sm leading-relaxed ${c.text2}`}>{eq.desc}</p>
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
                      <div className={`group overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg} transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5`}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={getImagePath(card.image)}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-70`} />
                          <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ocean-500/20 font-montserrat text-sm font-bold text-ocean-300">
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
            {/* 3. Investment Roadmap Timeline        */}
            {/* ══════════════════════════════════════ */}
            <section className={`border-t border-gray-200 ${c.sectionAlt} py-24 md:py-32`}>
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
            {/* 4. 2026 Investment Summary Bar        */}
            {/* ══════════════════════════════════════ */}
            <section className="border-t border-gray-200 py-24 md:py-32">
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
                    <div className="grid grid-cols-2 md:grid-cols-4">
                      {INVEST_2026.map((item, i) => (
                        <div
                          key={item.label}
                          className={`flex flex-col items-center justify-center p-6 md:p-8 ${
                            i < INVEST_2026.length - 1 ? `border-b border-r ${c.cardBorder} md:border-b-0` : 'border-r-0'
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
            <section className={`border-t border-gray-200 ${c.sectionAlt} py-24 md:py-32`}>
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="mb-14 text-center">
                    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                      {copy.qualityLabel}
                    </span>
                    <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>
                      {copy.qualityTitle} <span className="text-ocean-500">{copy.qualityAccent}</span>
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
                      <div className={`group overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg} transition-all duration-300 hover:border-ocean-500/30`}>
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={getImagePath(photo.image)}
                            alt={photo.caption}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-60`} />
                        </div>
                        <div className="p-5">
                          <p className={`text-sm font-medium leading-relaxed ${c.text2}`}>{photo.caption}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>

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
