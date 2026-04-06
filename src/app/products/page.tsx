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
  fishLabel: string;
  fishTitle: string;
  fishDesc: string;
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
    heroSub: '9개 어종 · 134+ 품목 · OEM 맞춤 생산',
    introLabel: 'OEM Capabilities',
    introText: '영어조합법인 서풍은 대형 유통사와 외식 프랜차이즈를 위한 ',
    introBold: 'B2B OEM 수산 가공 전문 기업',
    introAfter: '입니다. 원료 수매부터 완제품 출하까지, 귀사의 브랜드에 맞춘 맞춤 생산을 제공합니다.',
    categoryLabel: 'Categories',
    categoryTitle: '제품 카테고리',
    fishLabel: 'Fish Species',
    fishTitle: '어종 취급 현황',
    fishDesc: '9개 어종을 전문적으로 가공하며, 각 어종별 최적의 가공 방식을 적용합니다.',
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
    heroSub: '거친 시장에서 살아남은 134+ 품목',
    introLabel: 'Firepower',
    introText: '서풍은 거친 유통 현장에서 검증된 ',
    introBold: 'B2B OEM 수산 가공 전투부대',
    introAfter: '입니다. 원료 수매부터 완제품 출하까지, 시장의 요구에 맞서 결과로 응답합니다.',
    categoryLabel: 'Arsenal',
    categoryTitle: '주력 제품군',
    fishLabel: 'Target Species',
    fishTitle: '주력 어종 라인업',
    fishDesc: '9개 핵심 어종, 각각에 최적화된 가공 전략으로 승부합니다.',
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
    fishLabel: 'Species Matrix',
    fishTitle: '어종 데이터베이스',
    fishDesc: '9개 어종의 최적 가공 파라미터를 데이터로 관리합니다.',
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
    heroSub: '바다의 가치를 식탁으로 전하는 134+ 작품',
    introLabel: 'The Craft',
    introText: '서풍은 바다의 이야기를 제품에 담는 ',
    introBold: '수산 장인 집단',
    introAfter: '입니다. 새벽 위판장의 신선함부터 완제품의 정성까지, 하나하나 영혼을 담습니다.',
    categoryLabel: 'Collection',
    categoryTitle: '제품 컬렉션',
    fishLabel: 'The Cast',
    fishTitle: '바다가 선사한 어종',
    fishDesc: '9가지 바다의 주인공, 각각의 이야기를 최적의 가공으로 완성합니다.',
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
    heroSub: '대한민국 1등 수산 OEM의 134+ 제품군',
    introLabel: 'Market Leader',
    introText: '서풍은 업계 최고의 파트너들이 선택한 ',
    introBold: '프리미엄 수산 OEM 리더',
    introAfter: '입니다. 어떤 요구에도 응답하는 제품력, 결과로 증명합니다.',
    categoryLabel: 'Portfolio',
    categoryTitle: '프리미엄 제품군',
    fishLabel: 'Core Species',
    fishTitle: '핵심 어종 포트폴리오',
    fishDesc: '9개 핵심 어종에 대한 완벽한 가공 체계를 갖추고 있습니다.',
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
    heroSub: '기존의 틀을 깨는 134+ 혁신 제품',
    introLabel: 'New Territory',
    introText: '서풍은 수산 가공의 새로운 카테고리를 창조하는 ',
    introBold: '개척형 OEM 기업',
    introAfter: '입니다. 불가능을 가능으로 바꾸는 제품 철학으로, 세상에 없던 것을 만듭니다.',
    categoryLabel: 'Innovation',
    categoryTitle: '혁신 제품군',
    fishLabel: 'Frontier Species',
    fishTitle: '도전하는 어종 라인업',
    fishDesc: '9개 어종의 한계를 넘어, 새로운 가공 방식을 개척합니다.',
    oemLabel: 'Pioneer Record',
    oemTitle: '개척의 기록',
    oemDesc: '한계를 정하지 않는 OEM 역량. 서풍이 먼저 길을 엽니다.',
    ctaLabel: 'Explore',
    ctaText: '세상에 없던 제품,\n서풍과 함께 만들어냅시다',
    ctaButton: '새로운 길 열기',
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
            <div className={`absolute inset-0 ${c.overlay}`} />
            <div className="relative z-10 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
                {copy.heroLabel}
              </p>
              <h1 className={`text-4xl font-bold ${c.text} md:text-5xl lg:text-6xl`}>
                {copy.heroTitle}
              </h1>
              <p className={`mt-4 text-lg ${c.text2}`}>
                {copy.heroSub}
              </p>
            </div>
            <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${c.gradientFade}`} />
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
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={getImagePath(cat.image)}
                          alt={cat.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade}`} />
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

          {/* ── Fish Species ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <FadeIn>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.fishLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.fishTitle}</h2>
                  <p className={`mx-auto mt-4 max-w-xl text-base ${c.text2}`}>
                    {copy.fishDesc}
                  </p>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
                  {FISH_SPECIES.map((fish, i) => (
                    <FadeIn key={fish.name} delay={i * 60}>
                      <div className={`group flex flex-col items-center gap-3 rounded-2xl border ${c.cardBorder} ${c.cardBg} px-3 py-6 text-center transition-all duration-500 ${c.cardHover}`}>
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
                          <p className={`text-sm font-bold ${c.text}`}>{fish.name}</p>
                          <p className={`mt-0.5 text-[10px] font-medium ${c.text2}`}>{fish.en}</p>
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
            <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade}`} />
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
