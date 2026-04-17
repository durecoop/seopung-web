'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { useReveal } from '@/hooks/useReveal';
import { getImagePath } from '@/lib/utils';
import { historyCrud, getCompanyInfo, type HistoryItem as HistType } from '@/lib/admin-store';

/* ──────────────────────────────────────────────
   Skin-specific copy
   ────────────────────────────────────────────── */
interface AboutCopy {
  heroSub: string;
  ceoLabel: string;
  ceoHeading: string;
  ceoQuote: string;
  philosophyKeywords: [string, string, string];
  numbersHeading: string;
  mgmtPhiloLabel: string;
  mgmtPhiloHeading: string;
  partnerHeading: string;
  partnerSub: string;
  teamHeading: string;
  teamDesc: string;
}

const ABOUT_COPY: Record<number, AboutCopy> = {
  0: {
    heroSub: '신뢰와 안전을 함께 만들어가는 수산 파트너',
    ceoLabel: 'CEO MESSAGE',
    ceoHeading: '대표 인사말',
    ceoQuote: '매출 성장을 현장과 품질에 환원하는 선순환 재투자 경영을 실천합니다. 신뢰를 기반으로 함께 성장하며, 안전한 먹거리로 소비자의 식탁을 지킵니다.',
    philosophyKeywords: ['신뢰', '함께', '안전'],
    numbersHeading: '숫자로 보는 서풍',
    mgmtPhiloLabel: 'Management Philosophy',
    mgmtPhiloHeading: '경영 철학',
    partnerHeading: '신뢰의 파트너',
    partnerSub: '10년 이상 함께한 파트너사',
    teamHeading: '서풍을 만드는 사람들',
    teamDesc: '영어조합법인 서풍은 원료 수매부터 생산, 품질관리까지 각 분야의 전문가들이 함께합니다.',
  },
  1: {
    heroSub: '거친 바다를 거침없이 전진하는 수산 기업',
    ceoLabel: 'CAPTAIN\'S LOG',
    ceoHeading: '도전의 선언',
    ceoQuote: '멈추면 뒤처진다. 서풍은 위기를 기회로 바꾸고, 거침없는 도전으로 수산업의 새 역사를 쓰고 있습니다. 전진만이 우리의 방향입니다.',
    philosophyKeywords: ['도전', '전진', '거침없는'],
    numbersHeading: '전투력으로 보는 서풍',
    mgmtPhiloLabel: 'Fighting Spirit',
    mgmtPhiloHeading: '돌파의 경영 철학',
    partnerHeading: '전우와 같은 파트너',
    partnerSub: '험난한 시장을 함께 돌파한 동지들',
    teamHeading: '서풍의 전사들',
    teamDesc: '새벽부터 밤까지, 거친 현장에서 도전을 멈추지 않는 서풍의 전사들입니다.',
  },
  2: {
    heroSub: '데이터와 기술이 이끄는 수산 가공의 미래',
    ceoLabel: 'INNOVATION NOTE',
    ceoHeading: '기술 리더의 메시지',
    ceoQuote: '데이터 기반 의사결정과 AI 품질관리로 수산 가공의 패러다임을 전환합니다. 기술 혁신이 곧 서풍의 경쟁력입니다.',
    philosophyKeywords: ['기술', '혁신', '데이터'],
    numbersHeading: '데이터로 보는 서풍',
    mgmtPhiloLabel: 'Innovation System',
    mgmtPhiloHeading: '기술 중심 경영 철학',
    partnerHeading: '연결된 파트너 네트워크',
    partnerSub: '데이터로 연결된 핵심 유통 파트너',
    teamHeading: '서풍의 이노베이터',
    teamDesc: 'AI, 데이터 분석, 스마트 생산라인을 운영하는 기술 전문가들이 함께합니다.',
  },
  3: {
    heroSub: '바다의 이야기를 담아 식탁까지 전하는 여정',
    ceoLabel: 'THE STORY',
    ceoHeading: '서풍의 이야기',
    ceoQuote: '1995년 여수의 새벽, 한 사람의 꿈에서 시작된 항해. 정직한 바다, 정직한 먹거리라는 단순한 원칙이 30년의 이야기가 되었습니다.',
    philosophyKeywords: ['이야기', '여정', '꿈'],
    numbersHeading: '서풍이 걸어온 길',
    mgmtPhiloLabel: 'Our Philosophy',
    mgmtPhiloHeading: '이야기가 된 철학',
    partnerHeading: '함께 걸어온 길',
    partnerSub: '같은 바다를 바라보며 함께 성장한 파트너들',
    teamHeading: '이야기를 만드는 사람들',
    teamDesc: '매일 새벽, 바다와 마주하며 서풍의 이야기를 써 내려가는 사람들입니다.',
  },
  4: {
    heroSub: '대한민국 No.1 프리미엄 수산 OEM 리더',
    ceoLabel: 'LEADERSHIP',
    ceoHeading: '리더의 확신',
    ceoQuote: '연 매출 400억, 134개 품목. 숫자가 증명합니다. 1등의 파트너가 1등을 만듭니다. 서풍은 최고의 결과로 응답합니다.',
    philosophyKeywords: ['최고', '리더', '프리미엄'],
    numbersHeading: '최고의 성과',
    mgmtPhiloLabel: 'Excellence',
    mgmtPhiloHeading: '프리미엄 경영 철학',
    partnerHeading: '대한민국 TOP 파트너',
    partnerSub: '업계 최고의 기업들이 서풍을 선택합니다',
    teamHeading: '최고를 만드는 팀',
    teamDesc: '각 분야 최고의 전문가들이 프리미엄 품질을 완성합니다.',
  },
  5: {
    heroSub: '아무도 가지 않은 길을 개척하는 수산 선구자',
    ceoLabel: 'PIONEER\'S NOTE',
    ceoHeading: '개척자의 선언',
    ceoQuote: '길이 없으면 만들면 됩니다. 한계를 정하는 것은 시장이 아니라 우리 자신입니다. 서풍은 새로운 길의 첫 번째 발자국입니다.',
    philosophyKeywords: ['개척', '최초', '새로운 길'],
    numbersHeading: '개척의 발자취',
    mgmtPhiloLabel: 'Pioneer Spirit',
    mgmtPhiloHeading: '개척의 경영 철학',
    partnerHeading: '함께 길을 여는 동반자',
    partnerSub: '새로운 시장을 함께 개척해온 선구자들',
    teamHeading: '새로운 길을 여는 사람들',
    teamDesc: '기존의 틀을 깨고, 수산업의 미래를 개척하는 선구자들이 함께합니다.',
  },
  6: {
    heroSub: '30년의 도전과 혁신으로 성장하는 수산 기업',
    ceoLabel: 'CEO MESSAGE',
    ceoHeading: '대표 인사말',
    ceoQuote: '매출 성장을 현장과 기술에 재투자하는 선순환 경영을 실천합니다. 멈추지 않는 도전과 혁신으로, 대한민국 수산 가공의 새로운 기준을 만들어가겠습니다.',
    philosophyKeywords: ['도전', '혁신', '성장'],
    numbersHeading: '숫자로 보는 서풍',
    mgmtPhiloLabel: 'Management Philosophy',
    mgmtPhiloHeading: '경영 철학',
    partnerHeading: '함께 성장하는 파트너',
    partnerSub: '10년 이상 함께 도전해온 신뢰의 파트너사',
    teamHeading: '서풍을 만드는 사람들',
    teamDesc: '원료 수매, 기술 혁신, 품질관리 — 각 분야 전문가들이 하나의 팀으로 도전합니다.',
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const PILLARS = [
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
    title: '신뢰 협력',
    desc: '풀무원 ESG 경영 방향과 일치하는 친환경 생산 체계 구축',
  },
];

const HISTORY = [
  { year: '2008', text: 'HACCP 최초 인증' },
  { year: '2011', text: 'HACCP 기반 품질위생관리 체계 안정화' },
  { year: '2013', text: '수산물 이력추적관리 시스템 도입' },
  { year: '2017', text: "'레몬담은수산물' 브랜드 출시" },
  { year: '2019', text: "'마리네이드수산물' 브랜드 출시" },
  { year: '2024', text: 'ASC·MSC 지속가능 수산물 인증, 8억원 설비 투자' },
  { year: '2025', text: '7.4억원 설비 투자, 총매출 379억원' },
  { year: '2026', text: 'AI 엑스레이·초분광 도입, FSSC 22000 추진, 목표 매출 400억원' },
];

const PLATFORM_STEPS = [
  { entity: '중매인 49호', role: 'Purchase', desc: '원료 매입' },
  { entity: '영어조합법인 서풍', role: 'Manufacturing', desc: '제조·가공' },
  { entity: '㈜대주냉장', role: 'Storage', desc: '냉동 보관' },
  { entity: '㈜여수유통', role: 'Distribution', desc: '유통·물류' },
];

const COMPANY_INFO = [
  { label: '회사명', value: '영어조합법인 서풍' },
  { label: '대표', value: '상무이사 김태환' },
  { label: '주소', value: '전라남도 여수시 석교로 121 화양면' },
  { label: '사업자번호', value: '417-81-41979' },
];

/* ──────────────────────────────────────────────
   CountUp Card – animates numeric portion on scroll
   ────────────────────────────────────────────── */
function CountUpCard({ number, label, sub, cardBg, cardBorder, cardHover, text, text2 }: { number: string; label: string; sub: string; cardBg: string; cardBorder: string; cardHover: string; text: string; text2: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const numericMatch = number.match(/^([\d.]+)(.*)$/);
  const targetNum = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : number;
  const isInteger = numericMatch ? !numericMatch[1].includes('.') : true;
  const hasNumeric = !!numericMatch;
  const [display, setDisplay] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || !hasNumeric || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * targetNum;
      setDisplay(isInteger ? Math.round(current).toString() : current.toFixed(1));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [visible, targetNum, isInteger, hasNumeric]);

  return (
    <div
      ref={ref}
      className={`group rounded-2xl border ${cardBorder} ${cardBg} p-8 text-center transition-all duration-500 ${cardHover}`}
    >
      <span className="block font-montserrat text-4xl font-bold text-ocean-500 md:text-5xl">
        {numericMatch ? display + suffix : number}
      </span>
      <span className={`mt-3 block text-lg font-semibold ${text}`}>{label}</span>
      <span className={`mt-1 block text-sm ${text2}`}>{sub}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Page component
   ────────────────────────────────────────────── */
export default function AboutPage() {
  const [historyData, setHistoryData] = useState(HISTORY);
  const [companyData, setCompanyData] = useState(COMPANY_INFO);

  useEffect(() => {
    historyCrud.getAll('sortOrder', 'asc').then((items: HistType[]) => {
      if (items.length > 0) setHistoryData(items.map(h => ({ year: h.year, text: h.text })));
    }).catch(() => {});
    getCompanyInfo().then(info => {
      if (info) setCompanyData([
        { label: '회사명', value: info.companyName },
        { label: '대표', value: info.ceo },
        { label: '주소', value: info.address },
        { label: '사업자번호', value: info.bizNumber },
      ]);
    }).catch(() => {});
  }, []);

  return (
    <ThemeLayout breadcrumb={[{label:'회사소개'}]}>
      {(c) => {
        const copy = ABOUT_COPY[c.theme.id] ?? ABOUT_COPY[0];
        return (
        <>
          {/* ── Hero ── */}
          <section className="relative flex h-[35vh] min-h-[320px] items-center justify-center overflow-hidden md:h-[40vh]">
            <Image
              src={getImagePath('/images/team/factory-team.jpg')}
              alt="서풍 공장 팀"
              fill
              className="object-cover"
              priority
            />
            <div className="relative z-10 inline-block rounded-2xl bg-white/85 px-8 py-6 text-center shadow-lg backdrop-blur-sm">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
                About Us
              </p>
              <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">회사소개</h1>
              <p className="mt-4 text-lg text-gray-700">
                {copy.heroSub}
              </p>
            </div>
          </section>

          {/* ── 1. 인사말 ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className={`overflow-hidden rounded-3xl border ${c.cardBorder} ${c.cardBg}`}>
                  <div className="grid items-center gap-0 lg:grid-cols-[2fr_3fr]">
                    {/* Photo – left */}
                    <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full">
                      <div className="absolute inset-0 border-b-4 border-gold-500/40 lg:border-b-0 lg:border-r-4">
                        <Image
                          src={getImagePath('/images/team/director-writing.jpg')}
                          alt="상무이사 김태환"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content – right */}
                    <div className="p-8 md:p-12 lg:p-16">
                      <p className="mb-2 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-400">
                        {copy.ceoLabel}
                      </p>
                      <h2 className={`mb-8 text-3xl font-bold ${c.text} md:text-4xl`}>{copy.ceoHeading}</h2>

                      <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:rounded-full before:bg-ocean-500">
                        <p className={`text-lg leading-relaxed ${c.text2} md:text-xl md:leading-relaxed`}>
                          &ldquo;{copy.ceoQuote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-10">
                        <p className={`text-2xl font-bold ${c.text} md:text-3xl`}>상무이사 김태환</p>
                        <div className="mt-4 inline-block">
                          <div className="h-[2px] w-24 rounded-full bg-gradient-to-r from-gold-500 to-gold-500/0" />
                        </div>
                      </div>

                      {/* Philosophy keywords */}
                      <div className={`mt-8 flex items-center gap-4 text-sm font-medium tracking-wide ${c.textMuted}`}>
                        <span>{copy.philosophyKeywords[0]}</span>
                        <span className="text-ocean-500/60">|</span>
                        <span>{copy.philosophyKeywords[1]}</span>
                        <span className="text-ocean-500/60">|</span>
                        <span>{copy.philosophyKeywords[2]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 1.5 숫자로 보는 서풍 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-800)_0%,_transparent_70%)] opacity-30" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    By The Numbers
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.numbersHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { number: '400억원', label: '연매출', sub: '2026 목표' },
                  { number: '134', label: '품목 개발', sub: '10년간' },
                  { number: '66개', label: '품목 운영중', sub: '현재' },
                  { number: '9억원+', label: '연간 설비투자', sub: '2026' },
                  { number: '9종', label: '어종 취급', sub: '다양한 원료' },
                  { number: '3대', label: '인증 보유', sub: 'HACCP·ASC·MSC' },
                ].map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 100}>
                    <CountUpCard number={stat.number} label={stat.label} sub={stat.sub} cardBg={c.cardBg} cardBorder={c.cardBorder} cardHover={c.cardHover} text={c.text} text2={c.text2} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 2. 경영 철학 ── */}
          <section className="relative py-24 md:py-32">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.mgmtPhiloLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.mgmtPhiloHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-3">
                {PILLARS.map((p, i) => (
                  <Reveal key={p.title} delay={i * 150}>
                    <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 transition-all duration-500 ${c.cardHover} md:p-10`}>
                      {/* Hover glow */}
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

          {/* ── 3. 연혁 타임라인 ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    History
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>연혁</h2>
                </div>
              </Reveal>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-gold-500/60 via-ocean-500/40 to-transparent md:left-1/2 md:-translate-x-px" />

                {historyData.map((item, i) => {
                  const isRight = i % 2 === 0;
                  return (
                    <Reveal key={item.year} delay={i * 80}>
                      <div className={`relative mb-12 flex items-start gap-8 pl-12 sm:pl-16 md:pl-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* Content */}
                        <div className={`md:w-1/2 ${isRight ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                          <span className="font-montserrat text-2xl font-bold text-ocean-500 md:text-3xl">{item.year}</span>
                          <p className={`mt-2 ${c.text2}`}>{item.text}</p>
                        </div>

                        {/* Dot */}
                        <div className="absolute left-4 top-1 flex h-5 w-5 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                          <div className="h-3 w-3 rounded-full bg-ocean-500 ring-4 ring-navy-950" />
                        </div>

                        {/* Spacer for desktop */}
                        <div className="hidden md:block md:w-1/2" />
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── 4. One Platform ── */}
          <section className="relative overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-navy-800)_0%,_transparent_70%)] opacity-50" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Integrated System
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>One Platform</h2>
                </div>
              </Reveal>

              {/* Flow diagram */}
              <Reveal delay={150}>
                <div className="relative">
                  <div className="grid gap-6 md:grid-cols-4">
                    {PLATFORM_STEPS.map((step, i) => (
                      <div key={step.entity} className="relative">
                        <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-6 text-center transition-all duration-500 hover:border-ocean-400/30`}>
                          {/* Step number */}
                          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ocean-500/10 font-montserrat text-lg font-bold text-ocean-400">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <p className="mb-1 font-montserrat text-xs font-medium uppercase tracking-wider text-ocean-500">
                            {step.role}
                          </p>
                          <h3 className={`mb-2 text-lg font-bold ${c.text}`}>{step.entity}</h3>
                          <p className={`text-sm ${c.text2}`}>{step.desc}</p>
                        </div>
                        {/* Arrow connector */}
                        {i < PLATFORM_STEPS.length - 1 && (
                          <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-ocean-500/60 md:block">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className={`mt-12 rounded-xl border ${c.cardBorder} ${c.sectionAlt} px-8 py-6 text-center`}>
                    <p className={`text-lg leading-relaxed ${c.text2}`}>
                      원료 매입, 저장, 제조, 유통까지 <span className="font-semibold text-ocean-500">One 플랫폼 운영</span>으로 가격 및 품질 안정화 확보
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 4.3 신뢰의 파트너 (Client Logos) ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-800)_0%,_transparent_70%)] opacity-30" />
            <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-12 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Trusted Partners
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.partnerHeading}</h2>
                  <p className={`mt-4 text-base ${c.text2}`}>{copy.partnerSub}</p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {['풀무원', '푸드머스', '홈플러스', '이마트', '쿠팡'].map((name) => (
                    <div
                      key={name}
                      className={`group flex h-24 w-44 flex-shrink-0 items-center justify-center rounded-2xl border border-gold-500/20 ${c.cardBg} transition-all duration-500 hover:border-gold-500/40 ${c.cardHover} hover:shadow-lg hover:shadow-gold-500/5 hover:-translate-y-0.5`}
                    >
                      <span className={`text-lg font-bold ${c.textMuted} transition-colors duration-500 group-hover:text-ocean-500`}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 4.5 팀 ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Our Team
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.teamHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { image: '/images/team/factory-team-3.jpg', caption: '공장 팀', desc: '위생복 착용, 철저한 위생관리' },
                  { image: '/images/team/auction-team-2.jpg', caption: '위판장 팀', desc: '새벽부터 원료 수매' },
                  { image: '/images/team/office-meeting.jpg', caption: '사무실', desc: '품질관리와 제품개발' },
                ].map((member, i) => (
                  <Reveal key={member.caption} delay={i * 150}>
                    <div className={`group overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} transition-all duration-500 hover:border-ocean-400/30`}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={getImagePath(member.image)}
                          alt={member.caption}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade}`} />
                      </div>
                      <div className="p-6">
                        <h3 className={`text-lg font-bold ${c.text}`}>{member.caption}</h3>
                        <p className={`mt-1 text-sm ${c.text2}`}>{member.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={300}>
                <p className={`mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed ${c.text2}`}>
                  {copy.teamDesc}
                </p>
              </Reveal>
            </div>
          </section>

          {/* ── 5. 회사 정보 ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Company Info
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>회사 정보</h2>
                </div>
              </Reveal>

              <div className="grid gap-12 lg:grid-cols-2">
                {/* Info grid */}
                <Reveal>
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg}`}>
                    {companyData.map((info, i) => (
                      <div
                        key={info.label}
                        className={`flex items-center gap-6 px-8 py-5 ${
                          i < companyData.length - 1 ? `border-b ${c.cardBorder}` : ''
                        }`}
                      >
                        <span className="w-24 shrink-0 text-sm font-semibold text-ocean-500">{info.label}</span>
                        <span className={c.text2}>{info.value}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Team photos */}
                <Reveal delay={200}>
                  <div className="grid gap-4">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                      <Image
                        src={getImagePath('/images/team/office-team.jpg')}
                        alt="사무실 팀"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <span className="absolute bottom-4 left-6 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">경영지원팀</span>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                      <Image
                        src={getImagePath('/images/team/auction-team.jpg')}
                        alt="수매 팀"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <span className="absolute bottom-4 left-6 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">수매팀</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </>
        );
      }}
    </ThemeLayout>
  );
}
