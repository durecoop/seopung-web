'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'frozen',
    name: '냉동수산가공',
    desc: '신선한 원료를 당일 가공하여 급속동결. IQF 터널프리저로 품질 유지.',
    items: ['고등어필렛', '삼치필렛', '갈치손질', '오징어손질', '아귀손질'],
    image: '/images/process/04-tunnel-freezer.jpg',
  },
  {
    id: 'mealkit',
    name: '밀키트·간편식',
    desc: '대형 유통사 PB 브랜드 OEM 생산. 소비자 트렌드에 맞춘 제품 개발.',
    items: ['수산물밀키트', '간편조리수산물', '양념수산물'],
    image: '/images/products/mealkit.png',
  },
  {
    id: 'gulbi',
    name: '프리미엄 영광굴비',
    desc: '여수 직송 생물 참조기, 전통 아가미 섭간. 장인의 수작업으로 한 마리씩.',
    items: ['참조기굴비세트', '보리굴비', '선물세트'],
    image: '/images/gulbi/drying-rack.jpg',
  },
  {
    id: 'sustainable',
    name: 'ASC·MSC 인증 제품',
    desc: '지속가능한 어업 인증 원료만 사용. 글로벌 유통 기준 충족.',
    items: ['ASC 인증 수산물', 'MSC 인증 수산물'],
    image: '/images/products/asc-package.png',
  },
];

const FISH_SPECIES = [
  { name: '고등어', en: 'Mackerel' },
  { name: '삼치', en: 'Spanish Mackerel' },
  { name: '갈치', en: 'Hairtail' },
  { name: '오징어', en: 'Squid' },
  { name: '아귀', en: 'Monkfish' },
  { name: '참조기', en: 'Yellow Croaker' },
  { name: '장어', en: 'Eel' },
  { name: '연어', en: 'Salmon' },
  { name: '명태', en: 'Pollock' },
];

const OEM_STATS = [
  { number: '134+', label: '품목 개발', desc: '10년간 누적 개발 품목' },
  { number: '66개', label: '운영중', desc: '현재 양산 중인 품목' },
  { number: '~5개월', label: '개발기간', desc: '평균 신제품 개발 기간' },
];

/* ──────────────────────────────────────────────
   Page component
   ────────────────────────────────────────────── */
export default function ProductsPage() {
  return (
    <main className="bg-white font-pretendard">
      <Navbar />
      <Breadcrumb />

      {/* ── Hero ── */}
      <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
        <Image
          src={getImagePath('/images/process/04-tunnel-freezer.jpg')}
          alt="수산 가공 제품 라인업"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative z-10 text-center">
          <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
            Product Lineup
          </p>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            제품 라인업
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            9개 어종 &middot; 134+ 품목 &middot; OEM 맞춤 생산
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Intro ── */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <p className="mb-6 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                OEM Capabilities
              </p>
              <p className="text-xl leading-relaxed text-gray-700 md:text-2xl md:leading-relaxed">
                영어조합법인 서풍은 대형 유통사와 외식 프랜차이즈를 위한{' '}
                <span className="text-gray-900 font-semibold">B2B OEM 수산 가공 전문 기업</span>입니다.
                원료 수매부터 완제품 출하까지, 귀사의 브랜드에 맞춘 맞춤 생산을 제공합니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Product Categories Grid ── */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 text-center">
              <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                Categories
              </p>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">제품 카테고리</h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 120}>
                <div className="group relative overflow-hidden rounded-2xl border border-gray-300/50 bg-gray-50/60 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30 hover:bg-gray-100/60">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImagePath(cat.image)}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
                      {cat.name}
                    </h3>
                    <p className="mb-5 leading-relaxed text-gray-600">{cat.desc}</p>

                    {/* Item badges */}
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-gray-300/60 bg-gray-100/40 px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-300 group-hover:border-gold-500/30 group-hover:text-ocean-500/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fish Species ── */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 text-center">
              <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                Fish Species
              </p>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">어종 취급 현황</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
                9개 어종을 전문적으로 가공하며, 각 어종별 최적의 가공 방식을 적용합니다.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
              {FISH_SPECIES.map((fish, i) => (
                <FadeIn key={fish.name} delay={i * 60}>
                  <div className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-300/50 bg-gray-50/60 px-3 py-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30 hover:bg-gray-100/60">
                    {/* Fish icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean-500/10 text-ocean-500 transition-colors duration-300 group-hover:bg-ocean-500/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c-4.97 0-9 3.13-9 7s4.03 7 9 7c1.66 0 3.2-.45 4.5-1.22L21 18l-1.22-4.5C20.55 12.2 21 10.66 21 10c0-3.87-4.03-7-9-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{fish.name}</p>
                      <p className="mt-0.5 text-[10px] font-medium text-gray-600">{fish.en}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OEM Capability Stats ── */}
      <section className="relative py-24 md:py-32">
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn>
            <div className="mb-16 text-center">
              <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                OEM Track Record
              </p>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">OEM 역량</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
                10년간 쌓아온 OEM 제조 역량으로 귀사의 브랜드 가치를 높여드립니다.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {OEM_STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 120}>
                <div className="group rounded-2xl border border-gray-300/50 bg-gray-50/60 px-6 py-10 text-center backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30 hover:bg-gray-100/60">
                  <span className="block font-montserrat text-4xl font-bold text-ocean-500 md:text-5xl">
                    {stat.number}
                  </span>
                  <span className="mt-3 block text-lg font-semibold text-gray-900">{stat.label}</span>
                  <span className="mt-2 block text-sm text-gray-600">{stat.desc}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src={getImagePath('/images/process/06-cold-storage.jpg')}
          alt="냉동 보관 시설"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <p className="mb-4 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
              Partnership
            </p>
            <p className="mb-10 text-2xl font-medium leading-relaxed text-gray-700 md:text-3xl md:leading-relaxed">
              귀사의 브랜드에 맞는 수산 가공 제품,
              <br />
              서풍이 함께 만들어 드립니다
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-ocean-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-ocean-400 hover:shadow-lg hover:shadow-ocean-500/20"
            >
              OEM 문의하기 &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
