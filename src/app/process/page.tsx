'use client';

import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';

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
    desc: '터널프리저(IQF)를 통해 -40\u00B0C에서 급속동결하여 세포 파괴 없이 신선도를 완벽하게 유지합니다.',
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
function ProcessStepSection({ step, index }: { step: ProcessStep; index: number }) {
  const isEven = index % 2 === 0;
  const hasTwoImages = step.images.length > 1;

  return (
    <div className="relative py-16 md:py-24">
      {/* Step number watermark */}
      <div className="pointer-events-none absolute left-6 top-8 font-montserrat text-[120px] font-black leading-none text-navy-800/30 md:text-[180px] lg:left-12">
        {step.number}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${!isEven ? 'direction-rtl' : ''}`}>
          {/* Text side */}
          <Reveal delay={100} className={!isEven ? 'lg:order-2' : ''}>
            <div>
              <div className="mb-4 flex items-center gap-4">
                <span className="font-montserrat text-4xl font-black text-gold-500 md:text-5xl">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
              </div>
              <h3 className="mb-6 text-2xl font-bold text-white md:text-3xl">{step.title}</h3>
              <p className="max-w-lg text-lg leading-relaxed text-white/60">{step.desc}</p>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                    <p className="absolute bottom-3 left-4 text-sm font-medium text-white/80">{img.alt}</p>
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
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
              </div>
            )}
          </Reveal>
        </div>

        {/* Extra photo gallery */}
        {step.gallery && step.gallery.length > 0 && (
          <Reveal delay={450}>
            <div className={`mt-10 grid gap-3 ${step.gallery.length >= 4 ? 'grid-cols-2 md:grid-cols-4' : step.gallery.length === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
              {step.gallery.map((g) => (
                <div
                  key={g.src}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-navy-800"
                >
                  <Image
                    src={getImagePath(g.src)}
                    alt={g.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-xs text-white/60">{g.caption}</p>
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
    <main className="bg-navy-950 font-pretendard">
      <Navbar />
      <Breadcrumb />

      {/* ── Hero ── */}
      <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
        <Image
          src={getImagePath('/images/process/04-tunnel-freezer.jpg')}
          alt="터널프리저 급속동결"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-950/70" />
        <div className="relative z-10 text-center">
          <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-gold-400">
            Production Process
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">생산 공정</h1>
          <p className="mt-4 text-lg text-white/60">
            원물에서 완제품까지, One-Way 생산라인
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* ── 1. 원료 수매 ── */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section header */}
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
                Raw Material Sourcing
              </p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">원료 수매</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                새벽 위판장에서 시작되는 신선함. 30년 이상의 경험을 가진 중매인이 최고의 원료만을 선별합니다.
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
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                {/* Badge */}
                <div className="absolute bottom-6 left-6 rounded-xl bg-navy-950/80 px-4 py-2 backdrop-blur-sm">
                  <p className="font-montserrat text-sm font-bold text-gold-400">No.49</p>
                  <p className="text-xs text-white/60">중매인</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-ocean-500/10 px-5 py-2">
                  <span className="font-montserrat text-sm font-bold text-ocean-400">49호</span>
                  <span className="text-sm text-white/60">중매인 30년+ 경력</span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                  새벽 위판장, 최적의 원료 수매
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-white/60">
                  매일 새벽 여수 수산시장 위판장에서 30년 이상의 경험을 가진 49호 중매인이 직접 원료를 감별하고 수매합니다. 어체의 탄력, 색택, 비늘 상태를 하나하나 확인하여 최상급 원료만을 선별합니다.
                </p>
                <p className="text-lg leading-relaxed text-white/60">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-lg font-bold text-white">{fish.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Panorama */}
          <Reveal className="mt-10">
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
              <Image
                src={getImagePath('/images/auction/auction-panorama.jpg')}
                alt="위판장 전경"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <p className="text-sm font-medium text-white/80">여수 수산시장 위판장 전경</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 취급 어종 ── */}
      <section className="relative border-t border-navy-800/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
                Fish Species
              </p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">다양한 어종, 전문적인 취급</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                참조기, 삼치, 오징어, 갈치, 고등어, 아귀, 방어, 달고기, 붕장어 등 9종 이상의 어종을 전문적으로 취급합니다.
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
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy-800">
                  <Image
                    src={getImagePath(fish.src)}
                    alt={fish.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-lg font-bold text-white">{fish.label}</p>
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
              <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
                6-Step Process
              </p>
              <h2 className="text-3xl font-bold text-white md:text-4xl">6단계 생산 공정</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                원물 입고에서 출하까지, 철저한 위생관리와 최신 설비로 완벽한 품질을 보장합니다.
              </p>

              {/* Process flow indicator */}
              <div className="mx-auto mt-12 flex max-w-4xl items-center justify-between">
                {STEPS.map((step, i) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 bg-navy-900 font-montserrat text-sm font-bold text-gold-400 md:h-12 md:w-12 md:text-base">
                        {step.number}
                      </div>
                      <p className="mt-2 hidden text-xs text-white/60 sm:block">{step.title}</p>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="mx-1 h-px w-4 bg-gold-500/20 md:mx-2 md:w-8 lg:w-16" />
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
            className={i % 2 === 0 ? 'bg-navy-950' : 'bg-navy-900/30'}
          >
            <ProcessStepSection step={step} index={i} />
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
        <div className="absolute inset-0 bg-navy-950/75" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <blockquote className="text-2xl font-bold leading-snug text-white md:text-3xl lg:text-4xl">
              &ldquo;새벽부터 시작되는 서풍의 하루,
              <br className="hidden sm:block" />
              대한민국 수산물의 미래를 만듭니다&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="/technology"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3 font-semibold text-navy-950 transition-colors duration-300 hover:bg-gold-400"
            >
              기술·설비 보기 &rarr;
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
