'use client';

import Image from 'next/image';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import type { ThemeColors } from '@/hooks/useTheme';

/* ──────────────────────────────────────────────
   Skin-specific copy
   ────────────────────────────────────────────── */
interface ProcessCopy {
  heroLabel: string;
  heroTitle: string;
  heroSub: string;
  sourcingLabel: string;
  sourcingTitle: string;
  sourcingDesc: string;
  sourcingDirectorTitle: string;
  sourcingDirectorDesc: string;
  speciesTitle: string;
  speciesDesc: string;
  stepsLabel: string;
  stepsTitle: string;
  stepsDesc: string;
  closingQuote: string;
  closingCta: string;
}

const COPY: Record<number, ProcessCopy> = {
  // 0: 클린 오션 — 따뜻, 신뢰
  0: {
    heroLabel: 'Production Process',
    heroTitle: '생산 공정',
    heroSub: '원물에서 완제품까지, One-Way 생산라인',
    sourcingLabel: 'Raw Material Sourcing',
    sourcingTitle: '원료 수매',
    sourcingDesc: '새벽 위판장에서 시작되는 신선함. 30년 이상의 경험을 가진 중매인이 최고의 원료만을 선별합니다.',
    sourcingDirectorTitle: '새벽 위판장, 최적의 원료 수매',
    sourcingDirectorDesc: '매일 새벽 여수 수산시장 위판장에서 30년 이상의 경험을 가진 49호 중매인이 직접 원료를 감별하고 수매합니다. 어체의 탄력, 색택, 비늘 상태를 하나하나 확인하여 최상급 원료만을 선별합니다.',
    speciesTitle: '다양한 어종, 전문적인 취급',
    speciesDesc: '참조기, 삼치, 오징어, 갈치, 고등어, 아귀, 방어, 달고기, 붕장어 등 9종 이상의 어종을 전문적으로 취급합니다.',
    stepsLabel: '6-Step Process',
    stepsTitle: '6단계 생산 공정',
    stepsDesc: '원물 입고에서 출하까지, 철저한 위생관리와 최신 설비로 완벽한 품질을 보장합니다.',
    closingQuote: '새벽부터 시작되는 서풍의 하루,\n대한민국 수산물의 미래를 만듭니다',
    closingCta: '기술·설비 보기',
  },
  // 1: 딥 네이비 — 강인함, 도전, 거침없음
  1: {
    heroLabel: 'Battle-Tested Process',
    heroTitle: '현장의 전투, 6단계',
    heroSub: '원물에서 완제품까지, 타협 없는 공정 라인',
    sourcingLabel: 'Frontline Sourcing',
    sourcingTitle: '최전선 원료 수매',
    sourcingDesc: '새벽 4시, 위판장의 전투가 시작된다. 30년 전사(戰士) 중매인이 최고의 원료만 쟁취합니다.',
    sourcingDirectorTitle: '새벽의 전장, 최강의 원료 확보',
    sourcingDirectorDesc: '매일 새벽, 경쟁자보다 먼저 위판장에 도착합니다. 49호 중매인의 30년 실전 경험이 최상급 원료를 가려냅니다. 망설이면 뺏긴다 — 속도와 판단력이 곧 경쟁력입니다.',
    speciesTitle: '거친 바다가 키운 어종',
    speciesDesc: '참조기부터 붕장어까지, 남해의 거친 파도를 이겨낸 9종 이상의 전투형 어종을 취급합니다.',
    stepsLabel: 'Combat Line',
    stepsTitle: '현장에서 증명된 6단계',
    stepsDesc: '입고에서 출하까지, 한 치의 빈틈도 없는 전투적 공정 라인.',
    closingQuote: '남들이 잠든 새벽,\n서풍의 전투는 이미 시작됐다',
    closingCta: '무기를 확인하라',
  },
  // 2: 테크 다크 — 기술, 데이터, 미래지향
  2: {
    heroLabel: 'Smart Production',
    heroTitle: '스마트 6단계 자동화 공정',
    heroSub: '센서-데이터-AI로 연결된 지능형 생산 시스템',
    sourcingLabel: 'Data-Driven Sourcing',
    sourcingTitle: '데이터 기반 원료 수매',
    sourcingDesc: '경매 데이터 분석과 품질 이력 추적 시스템으로 최적의 원료를 확보합니다.',
    sourcingDirectorTitle: '경험 + 데이터, 정밀 수매 시스템',
    sourcingDirectorDesc: '30년 경력 49호 중매인의 현장 경험에 실시간 시세 데이터와 품질 이력 분석을 결합합니다. 감(感)이 아닌 데이터가 수매 의사결정을 뒷받침합니다.',
    speciesTitle: '9+ 어종 자동 분류 시스템',
    speciesDesc: '참조기, 삼치, 오징어 등 9종 이상의 어종을 스캔 기반으로 분류하고 이력을 추적합니다.',
    stepsLabel: 'Automated Pipeline',
    stepsTitle: '스마트 팩토리 6단계 파이프라인',
    stepsDesc: '각 공정 노드에서 실시간 데이터를 수집하여 품질·속도·효율을 동시에 최적화합니다.',
    closingQuote: '데이터가 흐르는 공장,\n기술이 만드는 수산물의 미래',
    closingCta: '기술 스펙 보기',
  },
  // 3: 시네마틱 — 감성적, 서사적
  3: {
    heroLabel: 'The Craft',
    heroTitle: '바다에서 식탁까지의 여정',
    heroSub: '원물 하나하나에 담긴 장인의 정성',
    sourcingLabel: 'Dawn to Table',
    sourcingTitle: '새벽이 시작되는 곳',
    sourcingDesc: '동이 트기 전, 위판장에 울려 퍼지는 경매 소리. 30년 세월이 빚어낸 눈(目)으로 바다의 선물을 고릅니다.',
    sourcingDirectorTitle: '파도 소리와 함께 시작되는 선별',
    sourcingDirectorDesc: '매일 새벽, 여수 위판장에는 49호 중매인의 발자국이 가장 먼저 찍힙니다. 비늘의 윤기, 아가미의 붉은빛 — 30년의 세월이 쌓아올린 감각이 바다의 최고 선물만을 골라냅니다.',
    speciesTitle: '바다가 보내준 아홉 가지 이야기',
    speciesDesc: '참조기, 삼치, 오징어, 갈치... 남해의 거친 물결 속에서 자라난 어종 하나하나에 이야기가 있습니다.',
    stepsLabel: 'Six Chapters',
    stepsTitle: '여섯 장(章)의 공정 이야기',
    stepsDesc: '원물이 식탁에 오르기까지, 서풍의 손길이 닿는 여섯 번의 순간.',
    closingQuote: '새벽의 파도가 시작이었고,\n식탁 위의 미소가 완성이었다',
    closingCta: '다음 이야기 보기',
  },
  // 4: 블루 프리미엄 — 자신감, 확신
  4: {
    heroLabel: 'Premium Process',
    heroTitle: '업계 최고 6단계 공정',
    heroSub: '대한민국 No.1 수산 OEM의 프리미엄 생산라인',
    sourcingLabel: 'Premium Sourcing',
    sourcingTitle: '프리미엄 원료 수매',
    sourcingDesc: '최상급 원료만을 고집합니다. 30년 경력 전문 중매인의 엄격한 기준 — 타협은 없습니다.',
    sourcingDirectorTitle: '1등의 기준으로 선별하다',
    sourcingDirectorDesc: '매일 새벽, 49호 중매인이 위판장 최상급 원료를 독점적으로 확보합니다. 어체의 탄력, 색택, 비늘 — 모든 항목에서 A등급만을 수매합니다. 타협 없는 수매가 프리미엄의 시작입니다.',
    speciesTitle: '9종+ 프리미엄 어종 라인업',
    speciesDesc: '참조기, 삼치, 오징어, 갈치 등 대한민국 대표 어종을 최고 품질로 취급합니다.',
    stepsLabel: 'Excellence Line',
    stepsTitle: '6단계 프리미엄 공정',
    stepsDesc: '모든 단계에서 최고를 추구합니다. 결과가 증명하는 대한민국 1등 공정.',
    closingQuote: '최고의 원료, 최고의 공정 —\n서풍은 결과로 말합니다',
    closingCta: '설비 경쟁력 확인',
  },
  // 5: 글로우 다크 — 개척, 선구자
  5: {
    heroLabel: 'Pioneering Process',
    heroTitle: '새로운 기준, 6단계 공정',
    heroSub: '기존의 틀을 깨는 서풍만의 혁신 생산라인',
    sourcingLabel: 'First Mover Sourcing',
    sourcingTitle: '개척자의 원료 수매',
    sourcingDesc: '남들이 오기 전에 도착하고, 남들이 보지 못하는 가치를 발견합니다. 30년 개척의 눈(目).',
    sourcingDirectorTitle: '아무도 가지 않은 새벽의 길',
    sourcingDirectorDesc: '매일 새벽, 49호 중매인은 누구보다 먼저 위판장에 섭니다. 30년간 수만 번의 경매에서 단련된 안목 — 남들이 지나치는 원석 같은 원료를 발견해냅니다.',
    speciesTitle: '경계를 허문 9종+ 어종',
    speciesDesc: '전통 어종부터 새로운 카테고리까지. 누구도 시도하지 않은 어종 조합으로 시장을 개척합니다.',
    stepsLabel: 'New Standard',
    stepsTitle: '기존의 틀을 깬 6단계',
    stepsDesc: '관행에 안주하지 않습니다. 매 단계에서 새로운 기준을 세우는 개척형 공정.',
    closingQuote: '길이 없다면 만들면 된다 —\n서풍은 언제나 첫 발자국을 찍는다',
    closingCta: '혁신 설비 보기',
  },
  6: {
    heroLabel: 'Production Process',
    heroTitle: '생산 공정',
    heroSub: '원물에서 완제품까지, 기술이 만드는 차이',
    sourcingLabel: 'Raw Material Sourcing',
    sourcingTitle: '원료 수매',
    sourcingDesc: '새벽 위판장에서 시작되는 신선함. 30년 이상의 경험과 데이터가 최고의 원료를 선별합니다.',
    sourcingDirectorTitle: '새벽 4시, 최적의 원료 확보',
    sourcingDirectorDesc: '매일 새벽 여수 수산시장 위판장에서 30년 경력의 49호 중매인이 직접 원료를 감별합니다. 어체의 탄력, 색택, 비늘 상태를 하나하나 확인하여 최상급 원료만을 선별하고 수매합니다.',
    speciesTitle: '9종+ 어종, 전문 가공 체계',
    speciesDesc: '참조기, 삼치, 오징어, 갈치, 고등어, 아귀 등 각 어종에 최적화된 가공 방식을 적용합니다.',
    stepsLabel: '6-Step Process',
    stepsTitle: '6단계 One-Way 생산라인',
    stepsDesc: '원물 입고에서 출하까지, 교차 오염 없는 일방향 공정으로 품질과 속도를 동시에 잡습니다.',
    closingQuote: '새벽부터 시작되는 서풍의 하루,\n수산 가공의 내일을 만들어갑니다',
    closingCta: '기술·설비 보기',
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const FISH_GRID = [
  { src: '/images/auction/mackerel-large.jpg', label: '대삼치' },
  { src: '/images/auction/sea-bream.jpg', label: '참돔' },
  { src: '/images/auction/won-mackerel.jpg', label: '낙찰 대삼치' },
];

interface GalleryImage {
  src: string;
  caption: string;
}

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  images: { src: string; alt: string }[];
  gallery?: GalleryImage[];
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: '원료 입고',
    desc: '당일 위판장에서 수매한 신선 원료를 즉시 공장으로 입고합니다. 참조기, 삼치, 오징어, 갈치, 고등어, 아귀, 방어, 달고기, 붕장어 등 다양한 어종을 취급합니다.',
    images: [
      { src: '/images/process/01-raw-material.jpg', alt: '원료 입고' },
    ],
    gallery: [
      { src: '/images/process/01-weighing.jpg', caption: '원물 1미 1kg 이상 엄격 선별' },
    ],
  },
  {
    number: '02',
    title: '손질·가공',
    desc: '숙련된 기술자의 수작업과 어류 스캔 자동절단기를 병행하여 정밀 가공합니다. 오징어할복기, 비늘벗기는 기계 등 특화 장비를 활용합니다.',
    images: [
      { src: '/images/process/02-cutting-machine.jpg', alt: '자동절단기' },
      { src: '/images/process/02-handwork.jpg', alt: '수작업 가공' },
    ],
    gallery: [
      { src: '/images/process/02-squid-handwork.jpg', caption: '오징어 수작업 손질' },
      { src: '/images/process/02-squid-machine.jpg', caption: '오징어할복기 자동 가공' },
      { src: '/images/process/02-croaker-hand.jpg', caption: '백조기 수작업 비늘 제거' },
      { src: '/images/process/02-flatfish-hand.jpg', caption: '서대 수작업 손질' },
    ],
  },
  {
    number: '03',
    title: '세척·염장',
    desc: '깨끗한 세척과 정확한 소금 간으로 최적의 맛을 만듭니다.',
    images: [
      { src: '/images/process/03-salting.jpg', alt: '염장 작업' },
      { src: '/images/process/03-mackerel-wash.jpg', alt: '고등어 세척' },
    ],
    gallery: [
      { src: '/images/process/03-flatfish-wash.jpg', caption: '서대 세척' },
      { src: '/images/process/03-salting-2.jpg', caption: '소금 간 디테일' },
    ],
  },
  {
    number: '04',
    title: '급속동결',
    desc: '터널프리저(IQF)를 통해 -40°C에서 급속동결하여 세포 파괴 없이 신선도를 완벽하게 유지합니다.',
    images: [
      { src: '/images/process/04-tunnel-freezer.jpg', alt: '터널프리저' },
      { src: '/images/process/04-freezer-belt.jpg', alt: '동결 벨트' },
    ],
    gallery: [
      { src: '/images/process/04-freezer-inside.jpg', caption: '터널프리저 내부' },
      { src: '/images/process/04-freezer-control.jpg', caption: '온도 제어 패널' },
    ],
  },
  {
    number: '05',
    title: '자동포장',
    desc: '로터리 포장기와 열선형 진공포장기로 위생적이고 효율적으로 포장합니다.',
    images: [
      { src: '/images/process/05-rotary-packer.jpg', alt: '로터리 포장기' },
      { src: '/images/process/05-vacuum-packer.jpg', alt: '진공포장기' },
    ],
    gallery: [
      { src: '/images/process/05-rotary-detail.jpg', caption: '로터리 포장기 상세' },
      { src: '/images/process/05-vacuum-detail.jpg', caption: '진공포장 작업' },
      { src: '/images/process/05-vacuum-wide.jpg', caption: '포장 라인 전경' },
    ],
  },
  {
    number: '06',
    title: '냉동보관·출하',
    desc: '체계적인 냉동창고 관리 시스템으로 출하까지 완벽한 콜드체인을 유지합니다.',
    images: [
      { src: '/images/process/06-cold-storage.jpg', alt: '냉동창고' },
    ],
    gallery: [
      { src: '/images/process/06-storage-rack.jpg', caption: '냉동창고 적재' },
      { src: '/images/process/06-storage-boxes.jpg', caption: '체계적 박스 관리' },
    ],
  },
];

/* ──────────────────────────────────────────────
   Process Step Component
   ────────────────────────────────────────────── */
function ProcessStepSection({ step, index, c }: { step: ProcessStep; index: number; c: ThemeColors }) {
  const isEven = index % 2 === 0;
  const hasTwoImages = step.images.length > 1;

  return (
    <div className="relative py-16 md:py-24">
      {/* Step number watermark */}
      <div className="pointer-events-none absolute left-6 top-8 font-montserrat text-[80px] font-black leading-none text-navy-800/30 sm:text-[100px] md:text-[180px] lg:left-12">
        {step.number}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${!isEven ? 'direction-rtl' : ''}`}>
          {/* Text side */}
          <Reveal delay={100} className={!isEven ? 'lg:order-2' : ''}>
            <div>
              <div className="mb-4 flex items-center gap-4">
                <span className="font-montserrat text-4xl font-black text-ocean-500 md:text-5xl">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
              </div>
              <h3 className={`mb-6 text-2xl font-bold md:text-3xl ${c.text}`}>{step.title}</h3>
              <p className={`max-w-lg text-lg leading-relaxed ${c.text2}`}>{step.desc}</p>
            </div>
          </Reveal>

          {/* Image side */}
          <Reveal delay={300} className={!isEven ? 'lg:order-1' : ''}>
            {hasTwoImages ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {step.images.map((img) => (
                  <div key={img.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={getImagePath(img.src)}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.dark ? 'from-[#0a1628]/30' : 'from-black/15'} via-transparent to-transparent`} />
                    <p className="absolute bottom-3 left-4 text-sm font-medium text-white drop-shadow">{img.alt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={getImagePath(step.images[0].src)}
                  alt={step.images[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}
          </Reveal>
        </div>

        {/* Extra photo gallery */}
        {step.gallery && step.gallery.length > 0 && (
          <Reveal delay={450}>
            <div className={`mt-10 grid gap-3 ${step.gallery.length >= 4 ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : step.gallery.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
              {step.gallery.map((g) => (
                <div
                  key={g.src}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-xl border ${c.cardBorder}`}
                >
                  <Image
                    src={getImagePath(g.src)}
                    alt={g.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.dark ? 'from-[#0a1628]/30' : 'from-black/15'} via-transparent to-transparent`} />
                  <p className="absolute bottom-2 left-3 text-xs text-white drop-shadow">{g.caption}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */
export default function ProcessPage() {
  return (
    <ThemeLayout breadcrumb={[{ label: '생산공정' }]}>
      {(c) => {
        const copy = COPY[c.theme.id] || COPY[0];
        return (
          <>
            {/* ── Hero ── */}
            <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
              <Image
                src={getImagePath('/images/process/04-tunnel-freezer.jpg')}
                alt="터널프리저 급속동결"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
              <div className="relative z-10 text-center">
                <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-300">
                  {copy.heroLabel}
                </p>
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-white drop-shadow-md">{copy.heroTitle}</h1>
                <p className="mt-4 text-lg text-white/90 drop-shadow">
                  {copy.heroSub}
                </p>
              </div>
              <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${c.dark ? 'from-[#0a1628]' : 'from-white'} to-transparent`} />
            </section>

            {/* ── 1. 원료 수매 ── */}
            <section className="relative py-24 md:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section header */}
                <Reveal>
                  <div className="mb-16 text-center">
                    <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                      {copy.sourcingLabel}
                    </p>
                    <h2 className={`text-3xl font-bold md:text-4xl ${c.text}`}>{copy.sourcingTitle}</h2>
                    <p className={`mx-auto mt-4 max-w-2xl ${c.text2}`}>
                      {copy.sourcingDesc}
                    </p>
                  </div>
                </Reveal>

                {/* Director + Text */}
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                  <Reveal>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                      <Image
                        src={getImagePath('/images/auction/director-inspect.jpg')}
                        alt="49호 중매인 원료 검수"
                        fill
                        className="object-cover"
                      />
                      {/* Badge */}
                      <div className={`absolute bottom-6 left-6 rounded-xl px-4 py-2 backdrop-blur-sm ${c.dark ? 'bg-[#0a1628]/80' : 'bg-white/80'}`}>
                        <p className="font-montserrat text-sm font-bold text-ocean-500">No.49</p>
                        <p className={`text-xs ${c.text2}`}>중매인</p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={200}>
                    <div>
                      <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-ocean-500/10 px-5 py-2">
                        <span className="font-montserrat text-sm font-bold text-ocean-400">49호</span>
                        <span className={`text-sm ${c.text2}`}>중매인 30년+ 경력</span>
                      </div>
                      <h3 className={`mb-4 text-2xl font-bold md:text-3xl ${c.text}`}>
                        {copy.sourcingDirectorTitle}
                      </h3>
                      <p className={`mb-6 text-lg leading-relaxed ${c.text2}`}>
                        {copy.sourcingDirectorDesc}
                      </p>
                      <p className={`text-lg leading-relaxed ${c.text2}`}>
                        산지 직매입을 통해 유통 단계를 최소화하고, 수매 즉시 공장으로 이송하여 신선도를 극대화합니다.
                      </p>
                    </div>
                  </Reveal>
                </div>

                {/* Fish grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-3">
                  {FISH_GRID.map((fish, i) => (
                    <Reveal key={fish.label} delay={i * 120}>
                      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src={getImagePath(fish.src)}
                          alt={fish.label}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-5">
                          <p className="text-lg font-bold text-white drop-shadow-md">{fish.label}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* Panorama */}
                <Reveal className="mt-10">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl md:aspect-[21/9]">
                    <Image
                      src={getImagePath('/images/auction/auction-panorama.jpg')}
                      alt="위판장 전경"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <p className="text-sm font-medium text-white drop-shadow">여수 수산시장 위판장 전경</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* ── 취급 어종 ── */}
            <section className={`relative border-t ${c.cardBorder} py-24 md:py-32`}>
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <Reveal>
                  <div className="mb-16 text-center">
                    <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                      Fish Species
                    </p>
                    <h2 className={`text-3xl font-bold md:text-4xl ${c.text}`}>{copy.speciesTitle}</h2>
                    <p className={`mx-auto mt-4 max-w-2xl ${c.text2}`}>
                      {copy.speciesDesc}
                    </p>
                  </div>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    { src: '/images/auction/mackerel.jpg', label: '고등어' },
                    { src: '/images/auction/sea-bream-2.jpg', label: '참돔' },
                    { src: '/images/auction/fish-variety.jpg', label: '다양한 어종' },
                  ].map((fish, i) => (
                    <Reveal key={fish.label} delay={i * 120}>
                      <div className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border ${c.cardBorder}`}>
                        <Image
                          src={getImagePath(fish.src)}
                          alt={fish.label}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-5">
                          <p className="text-lg font-bold text-white drop-shadow-md">{fish.label}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 2. 6단계 공정 ── */}
            <section className="relative">
              {/* Section header */}
              <div className="py-24 md:py-32">
                <Reveal>
                  <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                    <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                      {copy.stepsLabel}
                    </p>
                    <h2 className={`text-3xl font-bold md:text-4xl ${c.text}`}>{copy.stepsTitle}</h2>
                    <p className={`mx-auto mt-4 max-w-2xl ${c.text2}`}>
                      {copy.stepsDesc}
                    </p>

                    {/* Process flow indicator */}
                    <div className="mx-auto mt-12 flex max-w-4xl items-center justify-between">
                      {STEPS.map((step, i) => (
                        <div key={step.number} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 font-montserrat text-sm font-bold text-ocean-500 md:h-12 md:w-12 md:text-base ${c.sectionAlt}`}>
                              {step.number}
                            </div>
                            <p className={`mt-2 hidden text-xs sm:block ${c.text2}`}>{step.title}</p>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className="mx-1 h-px w-4 bg-ocean-500/20 md:mx-2 md:w-8 lg:w-16" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Steps */}
              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  className={i % 2 === 0 ? '' : c.sectionAlt}
                >
                  <ProcessStepSection step={step} index={i} c={c} />
                </div>
              ))}
            </section>

            {/* ── Atmospheric closing ── */}
            <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden md:min-h-[520px]">
              <Image
                src={getImagePath('/images/hero/dawn-workers.jpg')}
                alt="새벽 작업 현장"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
              <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                <Reveal>
                  <blockquote className="text-2xl font-bold leading-snug md:text-3xl lg:text-4xl text-white drop-shadow-md">
                    &ldquo;{copy.closingQuote.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br className="hidden sm:block" />}
                      </span>
                    ))}&rdquo;
                  </blockquote>
                </Reveal>
                <Reveal delay={200}>
                  <a
                    href="/technology"
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-ocean-500 px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-ocean-400"
                  >
                    {copy.closingCta} &rarr;
                  </a>
                </Reveal>
              </div>
            </section>
          </>
        );
      }}
    </ThemeLayout>
  );
}
