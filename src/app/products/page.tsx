'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'frozen',
    name: '냉동수산가공',
    desc: '신선한 원료를 당일 가공하여 급속동결. IQF 터널프리저로 품질 유지.',
    items: ['고등어필렛', '삼치필렛', '갈치손질', '오징어손질', '아귀손질'],
    image: '/images/food-web/tica034m19010001.jpg',
  },
  {
    id: 'mealkit',
    name: '밀키트·간편식',
    desc: '대형 유통사 PB 브랜드 OEM 생산. 소비자 트렌드에 맞춘 제품 개발.',
    items: ['수산물밀키트', '간편조리수산물', '양념수산물'],
    image: '/images/food-web/pc0031182640.jpg',
  },
  {
    id: 'gulbi',
    name: '프리미엄 영광굴비',
    desc: '여수 직송 생물 참조기, 전통 아가미 섭간. 장인의 수작업으로 한 마리씩.',
    items: ['참조기굴비세트', '보리굴비', '선물세트'],
    image: '/images/gulbi/gulbi-premium.jpg',
  },
  {
    id: 'sustainable',
    name: 'ASC·MSC 인증 제품',
    desc: '지속가능한 어업 인증 원료만 사용. 글로벌 유통 기준 충족.',
    items: ['ASC 인증 수산물', 'MSC 인증 수산물'],
    image: '/images/food-web/pc0031187499.jpg',
  },
];

import { STATS as GLOBAL_STATS, hasValue as hasStat } from '@/lib/company-config';

const OEM_STATS_RAW: { number: string | null; label: string; desc: string }[] = [
  { number: GLOBAL_STATS.developedItems, label: '품목 개발', desc: '누적 OEM 개발 품목' },
  { number: GLOBAL_STATS.activeItems, label: '운영중', desc: '현재 양산 중인 품목' },
  { number: GLOBAL_STATS.newProductCycleMonths, label: '개발기간', desc: '평균 신제품 개발 기간' },
];
const OEM_STATS = OEM_STATS_RAW.filter((s): s is { number: string; label: string; desc: string } => hasStat(s.number));

/* ──────────────────────────────────────────────
   Skin-specific copy
   ────────────────────────────────────────────── */
const COPY: Record<number, {
  heroLabel: string;
  heroTitle: string;
  heroSub: string;
  introLabel: string;
  introText: string;
  introBold: string;
  introAfter: string;
  categoryLabel: string;
  categoryTitle: string;
  oemLabel: string;
  oemTitle: string;
  oemDesc: string;
  ctaLabel: string;
  ctaText: string;
  ctaButton: string;
}> = {
  0: {
    heroLabel: 'Product Lineup',
    heroTitle: '제품 소개',
    heroSub: 'OEM 맞춤 생산 · 글로벌 인증 기반',
    introLabel: 'OEM Capabilities',
    introText: '영어조합법인 서풍은 대형 유통사와 외식 프랜차이즈를 위한 ',
    introBold: 'B2B OEM 수산 가공 전문 기업',
    introAfter: '입니다. 원료 수매부터 완제품 출하까지, 귀사의 브랜드에 맞춘 맞춤 생산을 제공합니다.',
    categoryLabel: 'Categories',
    categoryTitle: '제품 카테고리',
    oemLabel: 'OEM Track Record',
    oemTitle: 'OEM 역량',
    oemDesc: '10년간 쌓아온 OEM 제조 역량으로 귀사의 브랜드 가치를 높여드립니다.',
    ctaLabel: 'Partnership',
    ctaText: '귀사의 브랜드에 맞는 수산 가공 제품,\n서풍이 함께 만들어 드립니다',
    ctaButton: 'OEM 문의하기',
  },
  1: {
    heroLabel: 'Battle-Tested Products',
    heroTitle: '현장에서 증명된 제품',
    heroSub: '거친 시장에서 검증된 제품',
    introLabel: 'Firepower',
    introText: '서풍은 거친 유통 현장에서 검증된 ',
    introBold: 'B2B OEM 수산 가공 전투부대',
    introAfter: '입니다. 원료 수매부터 완제품 출하까지, 시장의 요구에 맞서 결과로 응답합니다.',
    categoryLabel: 'Arsenal',
    categoryTitle: '주력 제품군',
    oemLabel: 'Track Record',
    oemTitle: '실전 OEM 역량',
    oemDesc: '10년간 현장에서 증명한 제조 역량. 숫자가 전력을 말해줍니다.',
    ctaLabel: 'Join the Fight',
    ctaText: '다음 히트 상품,\n서풍이 만들어드립니다',
    ctaButton: '도전에 합류하기',
  },
  2: {
    heroLabel: 'Smart Products',
    heroTitle: '스마트 공정의 결과물',
    heroSub: 'AI 품질 검수 · 실시간 추적 · 데이터 기반 생산',
    introLabel: 'System Output',
    introText: '서풍은 데이터와 기술로 구동되는 ',
    introBold: '스마트 수산 OEM 플랫폼',
    introAfter: '입니다. AI 검수부터 실시간 이력추적까지, 기술이 품질을 보장합니다.',
    categoryLabel: 'Product Database',
    categoryTitle: '제품 카테고리',
    oemLabel: 'Analytics',
    oemTitle: 'OEM 퍼포먼스',
    oemDesc: '데이터로 검증된 OEM 제조 역량 지표입니다.',
    ctaLabel: 'Integration',
    ctaText: '귀사의 공급망에 최적화된 솔루션,\n데이터가 답을 알고 있습니다',
    ctaButton: '솔루션 문의',
  },
  3: {
    heroLabel: 'Crafted with Soul',
    heroTitle: '장인의 손끝에서 탄생한 제품',
    heroSub: '바다의 가치를 식탁으로 전하는 작품',
    introLabel: 'The Craft',
    introText: '서풍은 바다의 이야기를 제품에 담는 ',
    introBold: '수산 장인 집단',
    introAfter: '입니다. 새벽 위판장의 신선함부터 완제품의 정성까지, 하나하나 영혼을 담습니다.',
    categoryLabel: 'Collection',
    categoryTitle: '제품 컬렉션',
    oemLabel: 'The Numbers',
    oemTitle: '작품의 기록',
    oemDesc: '30년간 쌓아온 장인의 기록이 신뢰를 만듭니다.',
    ctaLabel: 'Your Story',
    ctaText: '당신의 브랜드에\n바다의 이야기를 담아드립니다',
    ctaButton: '스토리 함께 만들기',
  },
  4: {
    heroLabel: 'Premium Lineup',
    heroTitle: '프리미엄 제품 라인업',
    heroSub: '대한민국 대표 수산 OEM의 제품군',
    introLabel: 'Market Leader',
    introText: '서풍은 업계 최고의 파트너들이 선택한 ',
    introBold: '프리미엄 수산 OEM 리더',
    introAfter: '입니다. 어떤 요구에도 응답하는 제품력, 결과로 증명합니다.',
    categoryLabel: 'Portfolio',
    categoryTitle: '프리미엄 제품군',
    oemLabel: 'Performance',
    oemTitle: 'OEM 실적',
    oemDesc: '업계 최고 수준의 OEM 제조 역량을 숫자로 확인하세요.',
    ctaLabel: 'Excellence',
    ctaText: '1등의 파트너가 만드는\n1등의 제품',
    ctaButton: '파트너십 문의',
  },
  5: {
    heroLabel: 'Groundbreaking',
    heroTitle: '경계를 허문 제품',
    heroSub: '기존의 틀을 깨는 혁신 제품',
    introLabel: 'New Territory',
    introText: '서풍은 수산 가공의 새로운 카테고리를 창조하는 ',
    introBold: '개척형 OEM 기업',
    introAfter: '입니다. 불가능을 가능으로 바꾸는 제품 철학으로, 세상에 없던 것을 만듭니다.',
    categoryLabel: 'Innovation',
    categoryTitle: '혁신 제품군',
    oemLabel: 'Pioneer Record',
    oemTitle: '개척의 기록',
    oemDesc: '한계를 정하지 않는 OEM 역량. 서풍이 먼저 길을 엽니다.',
    ctaLabel: 'Explore',
    ctaText: '세상에 없던 제품,\n서풍과 함께 만들어냅시다',
    ctaButton: '새로운 길 열기',
  },
  6: {
    heroLabel: 'Product Lineup',
    heroTitle: '제품 소개',
    heroSub: '시장을 선도하는 제품 라인업',
    introLabel: 'OEM Capabilities',
    introText: '영어조합법인 서풍은 대형 유통사와 외식 프랜차이즈를 위한 ',
    introBold: 'B2B OEM 수산 가공 전문기업',
    introAfter: '입니다. 시장 트렌드를 빠르게 반영하여 귀사의 브랜드에 맞는 맞춤 제품을 개발·생산합니다.',
    categoryLabel: 'Categories',
    categoryTitle: '제품 카테고리',
    oemLabel: 'OEM Track Record',
    oemTitle: 'OEM 역량',
    oemDesc: '10년간 쌓아온 OEM 제조 역량과 신제품 개발력으로 귀사의 성장을 함께 설계합니다.',
    ctaLabel: 'Partnership',
    ctaText: '귀사의 다음 히트 상품,\n서풍이 함께 만들어 드립니다',
    ctaButton: 'OEM 문의하기',
  },
};

/* ──────────────────────────────────────────────
   Page component
   ────────────────────────────────────────────── */
export default function ProductsPage() {
  return (
    <ThemeLayout breadcrumb={[{ label: '제품' }]}>
      {(c) => {
        const copy = COPY[c.theme.id] ?? COPY[0];
        return (
        <>
          {/* ── Hero ── */}
          <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
            <Image
              src={getImagePath('/images/process/04-tunnel-freezer.jpg')}
              alt="수산 가공 제품 라인업"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
            <div className="relative z-10 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-300">
                {copy.heroLabel}
              </p>
              <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-5xl lg:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-4 text-lg text-white/90 drop-shadow">
                {copy.heroSub}
              </p>
            </div>
            <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${c.gradientFade}`} />
          </section>

          {/* ── B2B/B2C 분리 안내 배너 ── */}
          <section className="relative pt-12">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <FadeIn>
                <div className={`flex flex-col items-start gap-3 rounded-xl border ${c.cardBorder} ${c.sectionAlt} p-5 sm:flex-row sm:items-center sm:justify-between md:p-6`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-gold-500/15 p-2 text-gold-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${c.text} md:text-base`}>본 페이지는 B2B OEM 제품 카탈로그입니다</p>
                      <p className={`mt-0.5 text-xs ${c.text2} md:text-sm`}>
                        개인 소비자 · 소량 구매는 공식 쇼핑몰 <span className="font-semibold text-ocean-500">서풍몰</span>에서 가능합니다
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://shop.seopung.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-ocean-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-ocean-600 hover:shadow-md"
                  >
                    서풍몰 바로가기
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ── Intro ── */}
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <FadeIn>
                <div className="text-center">
                  <p className="mb-6 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.introLabel}
                  </p>
                  <p className={`text-xl leading-relaxed ${c.text2} md:text-2xl md:leading-relaxed`}>
                    {copy.introText}
                    <span className={`${c.text} font-semibold`}>{copy.introBold}</span>{copy.introAfter}
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
                    {copy.categoryLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.categoryTitle}</h2>
                </div>
              </FadeIn>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                {CATEGORIES.map((cat, i) => (
                  <FadeIn key={cat.id} delay={i * 120}>
                    <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} transition-all duration-500 ${c.cardHover}`}>
                      {/* Photo placeholder — 서풍에서 실제 사진 회신 예정 */}
                      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-50 via-white to-gold-50">
                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, rgba(14,116,144,0.06) 1px, transparent 1px), linear-gradient(-45deg, rgba(14,116,144,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        <div className="relative z-10 px-6 text-center">
                          <span className="inline-block rounded-full bg-ocean-500 px-3 py-1 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">서풍 요청</span>
                          <p className="mt-3 text-base font-bold text-gray-800 md:text-lg">{cat.name} 대표 사진</p>
                          <p className="mt-1 text-xs text-gray-500 md:text-sm">실제 제품 사진 회신 후 등록</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8">
                        <h3 className={`mb-3 text-xl font-bold ${c.text} md:text-2xl`}>
                          {cat.name}
                        </h3>
                        <p className={`mb-5 leading-relaxed ${c.text2}`}>{cat.desc}</p>

                        {/* Item badges */}
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((item) => (
                            <span
                              key={item}
                              className={`rounded-full border ${c.cardBorder} ${c.sectionAlt} px-3 py-1 text-xs font-medium ${c.text2} transition-colors duration-300 group-hover:border-gold-500/30 group-hover:text-ocean-500/80`}
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

          {/* ── OEM Capability Stats ── */}
          <section className="relative py-24 md:py-32">
            <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
              <FadeIn>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.oemLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.oemTitle}</h2>
                  <p className={`mx-auto mt-4 max-w-xl text-base ${c.text2}`}>
                    {copy.oemDesc}
                  </p>
                </div>
              </FadeIn>

              <div className="grid gap-6 md:grid-cols-3">
                {OEM_STATS.map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 120}>
                    <div className={`group rounded-2xl border ${c.cardBorder} ${c.cardBg} px-6 py-10 text-center transition-all duration-500 ${c.cardHover}`}>
                      <span className="block font-montserrat text-4xl font-bold text-ocean-500 md:text-5xl">
                        {stat.number}
                      </span>
                      <span className={`mt-3 block text-lg font-semibold ${c.text}`}>{stat.label}</span>
                      <span className={`mt-2 block text-sm ${c.text2}`}>{stat.desc}</span>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
              <FadeIn>
                <p className="mb-4 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                  {copy.ctaLabel}
                </p>
                <p className={`mb-10 text-2xl font-medium leading-relaxed ${c.text2} md:text-3xl md:leading-relaxed`}>
                  {copy.ctaText.split('\n').map((line, i) => (
                    <span key={i}>{i > 0 && <br />}{line}</span>
                  ))}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-ocean-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-ocean-400 hover:shadow-lg hover:shadow-ocean-500/20"
                >
                  {copy.ctaButton} &rarr;
                </Link>
              </FadeIn>
            </div>
          </section>
        </>
        );
      }}
    </ThemeLayout>
  );
}
