'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';

/* ──────────────────────────────────────────────
   Skin-specific copy (keyed by theme id 0-5)
   ────────────────────────────────────────────── */
interface GulbiCopy {
  heroTitle: string;
  heroSub: string;
  introText: string;
  whyLabel: string;
  whyHeading: string;
  featureCard1Desc: string;
  featureCard2Desc: string;
  featureCard3Desc: string;
  closingQuote: string;
  closingCta: string;
}

const GULBI_COPY: Record<number, GulbiCopy> = {
  // 0: warm trust
  0: {
    heroTitle: '영광 굴비',
    heroSub: '전통의 맛, 장인의 손길',
    introText:
      '영어조합법인 서풍의 영광 굴비는 여수 위판장에서 직접 수매한 생물 참조기를 사용하여 전통 방식으로 제조합니다.',
    whyLabel: 'Why Seopung Gulbi',
    whyHeading: '왜 서풍의 영광 굴비인가',
    featureCard1Desc:
      '새벽 위판장에서 직접 수매한 참조기를 당일 영광으로 운송합니다. 냉동이 아닌 생물 원료만 사용합니다.',
    featureCard2Desc:
      '기계 염장이 아닌 전통 방식 그대로 아가미에 소금을 채워 간을 맞춥니다. 깊은 풍미의 비결입니다.',
    featureCard3Desc:
      '1분에 한 묶음, 숙련된 장인이 한 마리 한 마리 정성껏 엮습니다. 기계로는 대체할 수 없는 정성입니다.',
    closingQuote: '바다의 정성을 식탁까지, 영광 굴비의 진심을 전합니다',
    closingCta: '주문 문의하기',
  },
  // 1: bold fearless
  1: {
    heroTitle: '거친 바다가 만든, 영광 굴비',
    heroSub: '타협 없는 원료, 타협 없는 맛',
    introText:
      '서풍의 영광 굴비는 남해의 거친 바다에서 건져 올린 최상급 참조기로 만듭니다. 냉동이 아닌 생물, 기계가 아닌 수작업 — 강한 원칙이 강한 맛을 만듭니다.',
    whyLabel: 'Proven by the Sea',
    whyHeading: '현장에서 증명된 영광 굴비',
    featureCard1Desc:
      '새벽 4시, 위판장에서 직접 선별한 참조기를 당일 영광으로 직송합니다. 속도가 곧 신선함이다.',
    featureCard2Desc:
      '흉내 낼 수 없는 전통 아가미 섭간. 깊고 강렬한 풍미를 만드는 서풍만의 방식입니다.',
    featureCard3Desc:
      '1분에 한 묶음, 숙련된 장인의 손끝에서 완성됩니다. 기계로 대체할 수 없는 전투력입니다.',
    closingQuote: '가장 거친 바다에서, 가장 강한 굴비가 태어납니다',
    closingCta: '도전에 합류하기',
  },
  // 2: tech innovation
  2: {
    heroTitle: '스마트 공정의 영광 굴비',
    heroSub: '전통과 기술의 정밀한 결합',
    introText:
      '서풍의 영광 굴비는 전통 제조 방식에 AI 품질 검수와 이력추적 시스템을 결합하여, 맛과 안전을 동시에 보장합니다.',
    whyLabel: 'Smart Craft',
    whyHeading: '데이터가 증명하는 영광 굴비의 품질',
    featureCard1Desc:
      '위판장 원료 데이터를 실시간 분석하여 최적의 참조기를 선별, 당일 영광으로 운송합니다.',
    featureCard2Desc:
      '전통 아가미 섭간 방식의 정밀한 염도 관리. 데이터 기반으로 일정한 풍미를 보장합니다.',
    featureCard3Desc:
      '숙련 장인의 수작업과 AI 검수 시스템의 결합. 사람의 감각과 기술의 정밀함이 만나는 지점입니다.',
    closingQuote: '전통의 감각에 기술의 정밀함을 더한, 차세대 영광 굴비',
    closingCta: '솔루션 문의',
  },
  // 3: cinematic emotional
  3: {
    heroTitle: '바다가 키운 명품, 영광 굴비',
    heroSub: '새벽 바다의 이야기를 담다',
    introText:
      '해 뜨기 전 여수 위판장에 울려 퍼지는 경매 소리. 그 속에서 엄선된 참조기 한 마리가 장인의 손을 거쳐 영광 굴비가 되기까지 — 서풍의 이야기입니다.',
    whyLabel: 'A Story of the Sea',
    whyHeading: '한 마리의 굴비에 담긴 서사',
    featureCard1Desc:
      '새벽 어둠 속, 위판장의 함성과 함께 시작되는 하루. 오직 살아있는 참조기만이 서풍의 선택을 받습니다.',
    featureCard2Desc:
      '수백 년 전해져 온 아가미 섭간. 소금 한 줌에 바다의 시간이 녹아듭니다.',
    featureCard3Desc:
      '한 마리 한 마리, 장인의 손끝에서 이야기가 완성됩니다. 기계로는 전할 수 없는 온기입니다.',
    closingQuote: '새벽 바다에서 시작된 이야기가, 당신의 식탁에 닿습니다',
    closingCta: '이야기 함께 만들기',
  },
  // 4: premium confident
  4: {
    heroTitle: '프리미엄 영광 굴비',
    heroSub: '대한민국 최고의 굴비, 서풍',
    introText:
      '서풍의 프리미엄 영광 굴비는 1미 130g 이상 엄선된 참조기, 전통 아가미 섭간, 숙련 장인의 수작업으로 완성됩니다. 대형마트 PB부터 프리미엄 선물세트까지 — 결과로 증명합니다.',
    whyLabel: 'Premium Standard',
    whyHeading: '1등이 선택하는 영광 굴비',
    featureCard1Desc:
      '여수 위판장 직접 수매, 당일 영광 운송. 냉동 원료는 취급하지 않습니다. 타협 없는 원료 기준.',
    featureCard2Desc:
      '전통 아가미 섭간으로 완성되는 깊은 풍미. 대한민국 최고의 굴비에 걸맞은 방식입니다.',
    featureCard3Desc:
      '숙련된 장인의 수작업. 1분에 한 묶음, 정밀하고 흐트러짐 없는 품질을 보장합니다.',
    closingQuote: '최고의 원료, 최고의 장인, 최고의 결과 — 서풍 프리미엄 굴비',
    closingCta: '파트너십 문의',
  },
  // 5: pioneer bold
  5: {
    heroTitle: '경계를 넘는 영광 굴비',
    heroSub: '아무도 가지 않은 길, 서풍이 만든 기준',
    introText:
      '서풍은 영광 굴비의 새로운 기준을 세웠습니다. 여수 직송 생물 참조기와 전통 아가미 섭간, 그리고 장인의 수작업 — 기존의 틀을 깨는 것이 서풍의 방식입니다.',
    whyLabel: 'New Standard',
    whyHeading: '서풍이 세운 영광 굴비의 새로운 기준',
    featureCard1Desc:
      '남들이 냉동 원료를 쓸 때, 서풍은 새벽 위판장에서 생물 참조기를 직접 선별합니다. 최초의 선택이 최고의 결과를 만듭니다.',
    featureCard2Desc:
      '기계 염장의 시대에도 전통 아가미 섭간을 고집합니다. 아무도 가지 않는 길에 답이 있습니다.',
    featureCard3Desc:
      '숙련된 장인이 한 마리 한 마리 엮어내는 정성. 세상에 없던 기준을 만드는 것이 개척자의 일입니다.',
    closingQuote: '기존의 답습이 아닌, 완전히 새로운 영광 굴비를 만들어갑니다',
    closingCta: '새로운 길 열기',
  },
  6: {
    heroTitle: '영광 굴비',
    heroSub: '전통의 깊이에 혁신을 더하다',
    introText:
      '서풍의 영광 굴비는 여수 위판장 직접 수매 생물 참조기를 고집합니다. 전통 아가미 섭간 방식과 장인의 수작업 — 30년간 타협 없이 지켜온 원칙입니다.',
    whyLabel: 'Why Seopung Gulbi',
    whyHeading: '서풍 굴비가 다른 이유',
    featureCard1Desc:
      '새벽 위판장에서 직접 수매한 참조기를 당일 영광으로 운송. 냉동이 아닌 생물 원료만을 고집합니다.',
    featureCard2Desc:
      '기계 염장이 아닌 전통 아가미 섭간. 수백 년 이어온 방식으로 깊고 자연스러운 풍미를 완성합니다.',
    featureCard3Desc:
      '1분에 한 묶음, 숙련된 장인의 수작업. 기계로는 절대 대체할 수 없는 서풍만의 경쟁력입니다.',
    closingQuote: '전통을 지키되, 품질에서는 타협하지 않습니다',
    closingCta: '주문 문의하기',
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const PROCESS_STEPS = [
  {
    step: 1,
    title: '원료 수매',
    desc: '여수 위판장에서 1미 130g 이상의 생물 참조기를 직접 선별 수매',
    image: '/images/gulbi/weighing.jpg',
    extraImages: ['/images/gulbi/weighing-2.jpg'],
  },
  {
    step: 2,
    title: '아가미 섭간',
    desc: '전통 방식 그대로, 아가미에 소금을 채워 간을 맞춥니다',
    image: '/images/gulbi/gill-salting.jpg',
    extraImages: ['/images/gulbi/gill-salting-2.jpg'],
  },
  {
    step: 3,
    title: '세척',
    desc: '깨끗이 헹궈 불순물을 제거합니다',
    image: null,
    extraImages: [],
  },
  {
    step: 4,
    title: '엮기',
    desc: '숙련된 장인이 한 마리 한 마리 정성껏 엮습니다. 1분에 하나 완성되는 장인의 속도',
    image: '/images/gulbi/tying.jpg',
    image2: '/images/gulbi/tying-2.jpg',
    extraImages: ['/images/gulbi/tying-3.jpg', '/images/gulbi/tying-close.jpg'],
  },
  {
    step: 5,
    title: '건조',
    desc: '자연 건조 방식으로 풍미를 극대화합니다',
    image: null,
    extraImages: [],
  },
  {
    step: 6,
    title: '물빠짐 · 포장',
    desc: '헹군 뒤 물빠짐 과정을 거쳐 위생적으로 포장합니다',
    image: '/images/gulbi/drying.jpg',
    extraImages: ['/images/gulbi/drying-rack.jpg', '/images/gulbi/drying-rows.jpg'],
  },
];

const WHY_GULBI = [
  {
    title: '여수 직송 생물 참조기',
    desc: '새벽 위판장에서 직접 수매한 참조기를 당일 영광으로 운송합니다. 냉동이 아닌 생물 원료만 사용합니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.481 1.09-1.102.434-8.674-.655-15.648-15.648-15.648H3.375c-.621 0-1.125.504-1.125 1.125v11.25" />
      </svg>
    ),
  },
  {
    title: '전통 아가미 섭간',
    desc: '기계 염장이 아닌 전통 방식 그대로 아가미에 소금을 채워 간을 맞춥니다. 깊은 풍미의 비결입니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
      </svg>
    ),
  },
  {
    title: '장인의 수작업',
    desc: '1분에 한 묶음, 숙련된 장인이 한 마리 한 마리 정성껏 엮습니다. 기계로는 대체할 수 없는 정성입니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: '1미 130g 이상의 엄선된 참조기만 사용',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: '전통 아가미 섭간 방식',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: '숙련 장인의 수작업 엮기',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: '여수 위판장 직접 수매 → 영광으로 운송',
  },
];

/* ──────────────────────────────────────────────
   Page component
   ────────────────────────────────────────────── */
export default function GulbiPage() {
  return (
    <ThemeLayout breadcrumb={[{ label: '영광굴비' }]}>
      {(c) => {
        const copy = GULBI_COPY[c.theme.id] ?? GULBI_COPY[0];
        return (
        <>
          {/* ── Hero ── */}
          <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
            <Image
              src={getImagePath('/images/gulbi/tying.jpg')}
              alt="영광 굴비 엮기"
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${c.overlay}`} />
            <div className="relative z-10 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
                Yeongkwang Gulbi
              </p>
              <h1 className={`text-4xl font-bold ${c.text} md:text-5xl lg:text-6xl`}>{copy.heroTitle}</h1>
              <p className={`mt-4 text-lg ${c.text2}`}>
                {copy.heroSub}
              </p>
            </div>
            <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${c.gradientFade}`} />
          </section>

          {/* ── 1. 소개 ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <Reveal>
                <div className="text-center">
                  <p className="mb-6 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Introduction
                  </p>
                  <div className="relative mx-auto max-w-3xl pl-0">
                    <p className={`text-xl leading-relaxed ${c.text2} md:text-2xl md:leading-relaxed`}>
                      {copy.introText}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 1.5 왜 서풍의 영광 굴비인가 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.whyLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.whyHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-3">
                {WHY_GULBI.map((item, i) => {
                  const cardDescs = [copy.featureCard1Desc, copy.featureCard2Desc, copy.featureCard3Desc];
                  return (
                  <Reveal key={item.title} delay={i * 120}>
                    <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 transition-all duration-500 ${c.cardHover} md:p-10`}>
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ocean-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="mb-6 inline-flex rounded-xl bg-ocean-500/10 p-3 text-ocean-500 transition-colors duration-300 group-hover:bg-ocean-500/20">
                          {item.icon}
                        </div>
                        <h3 className={`mb-4 text-xl font-bold ${c.text}`}>{item.title}</h3>
                        <p className={`leading-relaxed ${c.text2}`}>{cardDescs[i]}</p>
                      </div>
                    </div>
                  </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── 2. 제조 공정 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Manufacturing Process
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>굴비 제조 공정</h2>
                </div>
              </Reveal>

              <div className="space-y-16 md:space-y-24">
                {PROCESS_STEPS.map((step, i) => {
                  const isEven = i % 2 === 0;
                  const hasImage = step.image !== null;

                  return (
                    <Reveal key={step.step} delay={i * 80}>
                      <div className={`grid items-center gap-8 md:gap-12 ${hasImage ? 'lg:grid-cols-2' : ''}`}>
                        {/* Image side */}
                        {hasImage && (
                          <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                              <Image
                                src={getImagePath(step.image!)}
                                alt={step.title}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-40`} />
                            </div>
                            {/* Second image for step 4 */}
                            {'image2' in step && step.image2 && (
                              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl">
                                <Image
                                  src={getImagePath(step.image2)}
                                  alt={`${step.title} 2`}
                                  fill
                                  className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-40`} />
                              </div>
                            )}
                            {step.extraImages && step.extraImages.length > 0 && (
                              <div className="mt-4 grid grid-cols-2 gap-3">
                                {step.extraImages.map((img, idx) => (
                                  <div key={idx} className="group/thumb relative aspect-[4/3] overflow-hidden rounded-xl">
                                    <Image
                                      src={getImagePath(img)}
                                      alt={`${step.title} ${idx + 3}`}
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-30`} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Text side */}
                        <div className={`${!hasImage ? 'mx-auto max-w-2xl text-center' : ''}`}>
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-ocean-500/10">
                              <span className="font-montserrat text-xl font-bold text-ocean-500">
                                {String(step.step).padStart(2, '0')}
                              </span>
                            </div>
                            <div>
                              <p className={`font-montserrat text-xs font-medium uppercase tracking-wider ${c.text2}`}>
                                Step {step.step}
                              </p>
                              <h3 className={`text-2xl font-bold ${c.text} md:text-3xl`}>{step.title}</h3>
                            </div>
                          </div>
                          <p className={`mt-4 text-lg leading-relaxed ${c.text2}`}>{step.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── 3. 특징 ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Features
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>서풍 굴비의 특징</h2>
                </div>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-2">
                {FEATURES.map((f, i) => (
                  <Reveal key={f.text} delay={i * 100}>
                    <div className={`group flex items-start gap-5 rounded-2xl border ${c.cardBorder} ${c.cardBg} p-6 transition-all duration-500 ${c.cardHover} md:p-8`}>
                      <div className="shrink-0 rounded-xl bg-ocean-500/10 p-3 text-ocean-500 transition-colors duration-300 group-hover:bg-ocean-500/20">
                        {f.icon}
                      </div>
                      <p className={`text-lg leading-relaxed ${c.text2}`}>{f.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Closing atmospheric section ── */}
          <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
            <Image
              src={getImagePath('/images/gulbi/drying-rows.jpg')}
              alt="굴비 건조"
              fill
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-90`} />
            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
              <Reveal>
                <svg className="mx-auto mb-8 h-8 w-8 text-ocean-500/40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className={`mb-10 text-2xl font-medium leading-relaxed ${c.text2} md:text-3xl md:leading-relaxed`}>
                  {copy.closingQuote}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-ocean-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-ocean-400 hover:shadow-lg hover:shadow-ocean-500/20"
                >
                  {copy.closingCta} &rarr;
                </Link>
              </Reveal>
            </div>
          </section>
        </>
        );
      }}
    </ThemeLayout>
  );
}
