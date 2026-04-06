'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import { getSkinConfig, type HeroSkinId } from '@/lib/skin-store';

const HERO_COMPONENTS: Record<HeroSkinId, ReturnType<typeof dynamic>> = {
  0: dynamic(() => import('@/components/sections/HeroSection'), { ssr: false }),
  1: dynamic(() => import('@/components/sections/HeroCssWave'), { ssr: false }),
  2: dynamic(() => import('@/components/sections/HeroParticleOcean'), { ssr: false }),
  3: dynamic(() => import('@/components/sections/HeroVideo'), { ssr: false }),
  4: dynamic(() => import('@/components/sections/HeroCinematic'), { ssr: false }),
  5: dynamic(() => import('@/components/sections/HeroTextClip'), { ssr: false }),
};

/* ─── Certification badges data ─── */
const CERT_BADGES = [
  { name: 'HACCP', icon: '/images/certs/haccp.png', desc: '식품안전관리인증', detail: '위해요소 중점관리 기준 적합' },
  { name: 'ASC', icon: '/images/certs/asc.svg', desc: '양식수산물 국제인증', detail: '책임있는 양식 수산물 공급' },
  { name: 'MSC', icon: '/images/certs/msc.png', desc: '지속가능어업 국제인증', detail: '지속가능한 어업 자원 관리' },
  { name: '수산물이력추적', icon: '/images/certs/traceability.png', desc: '원산지 추적관리', detail: '생산부터 유통까지 완벽 추적' },
  { name: '수산물품질인증', icon: '/images/certs/quality.png', desc: '국가품질인증', detail: '대한민국 국가 품질 인증 획득' },
  { name: 'ISO 22000', icon: '/images/certs/iso22000.png', desc: '식품안전경영시스템', detail: '국제 식품안전 경영 시스템' },
];

/* ─── Product categories ─── */
const PRODUCTS = [
  { name: '냉동수산가공', image: '/images/food-web/pc0031187411.jpg', desc: '고등어, 삼치, 갈치 등' },
  { name: '프리미엄 굴비', image: '/images/food-web/pc0031187455.jpg', desc: '영광 전통 방식 굴비' },
  { name: '밀키트·HMR', image: '/images/food-web/pc0031187507.jpg', desc: '간편식 OEM 생산' },
  { name: '수산 선물세트', image: '/images/food-web/pc0031187499.jpg', desc: '명절 프리미엄 세트' },
];

/* ═══════════════════════════════════════ */
/*  LANDING PAGE — PROTOTYPE v2           */
/* ═══════════════════════════════════════ */
export default function Home() {
  const [skinId, setSkinId] = useState<HeroSkinId>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSkinConfig().then((c) => {
      setSkinId(c.heroSkinId);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const HeroComponent = HERO_COMPONENTS[skinId];

  return (
    <main id="main-content" className="bg-white font-pretendard">
      <Navbar />
      {loaded ? <HeroComponent /> : <div className="h-screen bg-[#020a18]" />}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 1. CERTIFICATIONS — 가장 눈에 띄는 섹션 (인증 강조) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="certifications" className="relative overflow-hidden bg-ocean-600 py-24 md:py-32">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-1.5 font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-200">
                Certifications
              </span>
              <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                국내외 <span className="text-ocean-300">6대 인증</span> 보유
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-xl text-ocean-200 md:text-2xl">
                안전하고 지속가능한 수산물 공급을 위한
                <br className="hidden md:block" />
                <span className="font-semibold text-white">대한민국 최고 수준의 인증 체계</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {CERT_BADGES.map((cert, i) => (
                <div
                  key={cert.name}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-8 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 md:px-8 md:py-10"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white/90 p-2 md:h-24 md:w-24">
                    <Image
                      src={getImagePath(cert.icon)}
                      alt={cert.name}
                      fill
                      className="object-contain p-1"
                      sizes="96px"
                    />
                  </div>
                  <span className="font-montserrat text-xl font-bold tracking-wide text-white md:text-2xl">
                    {cert.name}
                  </span>
                  <span className="text-sm text-ocean-200 md:text-base">{cert.desc}</span>
                  <span className="text-xs text-ocean-300/70 md:text-sm">{cert.detail}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-12">
            <div className="flex justify-center">
              <Link
                href="/certification"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ocean-600"
              >
                인증 현황 자세히 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* ── 2. COMPANY INTRO — 젊고 진취적인 카피 ──       */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeIn>
              <div>
                <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">
                  About Seopung
                </span>
                <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                  30년 경력,
                  <br />
                  <span className="text-ocean-500">끊임없는 혁신</span>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-600 md:text-xl">
                  1995년 전라남도 여수에서 시작한 서풍은
                  대한민국 수산 가공 산업의 새로운 기준을 만들어가고 있습니다.
                </p>
                <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
                  <span className="font-semibold text-gray-900">매출 성장을 현장과 품질에 환원하는 선순환 경영.</span>
                  {' '}단순한 OEM을 넘어 파트너의 성공을 설계합니다.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: '400억+', label: '연 매출' },
                    { num: '134+', label: '개발 품목' },
                    { num: '66개', label: '운영 품목' },
                    { num: '10년+', label: '핵심 파트너' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
                      <span className="block font-montserrat text-2xl font-bold text-ocean-500 md:text-3xl">{s.num}</span>
                      <span className="mt-1 block text-sm text-gray-500">{s.label}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="group mt-8 inline-flex items-center gap-2 text-lg font-semibold text-ocean-500 transition-colors hover:text-ocean-400"
                >
                  회사소개 보기
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={getImagePath('/images/food-web/tica034m19010003.jpg')}
                  alt="서풍 수산가공"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-600/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* ── 3. PRODUCT LINEUP — 제품소개                 ── */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">
                Products
              </span>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
                <span className="text-ocean-500">134+</span> 품목의 제품 라인업
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-xl text-gray-600">
                냉동수산가공부터 프리미엄 굴비, 밀키트까지
                <br />
                맞춤형 OEM 솔루션을 제공합니다
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {PRODUCTS.map((product) => (
                <Link
                  key={product.name}
                  href="/products"
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImagePath(product.image)}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white md:text-xl">{product.name}</h3>
                      <p className="text-sm text-white/80">{product.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="flex justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-ocean-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-ocean-400 hover:shadow-xl"
              >
                전체 제품 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* ── 4. SUPPLY STORY — 공급 스토리                ── */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">
                Supply Chain
              </span>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
                새벽 위판장에서 <span className="text-ocean-500">식탁까지</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-xl text-gray-600">
                당일 원료를 당일 가공하는 신속한 공급 체계
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-0">
              {/* Connecting line (desktop) */}
              <div className="absolute left-[16.67%] right-[16.67%] top-[28px] hidden h-px bg-gradient-to-r from-ocean-500/60 via-ocean-400/40 to-ocean-500/60 md:block" />

              {[
                { time: '04:00', image: '/images/food-web/pc003673268_l.jpg', caption: '새벽 4시, 여수 위판장' },
                { time: '08:00', image: '/images/food-web/pc0031182640.jpg', caption: '당일 입고, 즉시 가공' },
                { time: '12:00', image: '/images/food-web/pc0031188071.jpg', caption: '체계적 품질 관리' },
              ].map((item, i) => (
                <div key={item.time} className="relative flex w-full flex-col items-center md:w-1/3 md:px-4">
                  <div className="relative z-10 mb-4 flex flex-col items-center">
                    <span className="font-montserrat text-xl font-bold text-ocean-500">{item.time}</span>
                    <div className="mt-1 h-3 w-3 rounded-full bg-ocean-500 ring-4 ring-white" />
                  </div>

                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={getImagePath(item.image)}
                      alt={item.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <p className="mt-3 text-center text-lg font-medium text-gray-700">{item.caption}</p>

                  {i < 2 && (
                    <div className="my-2 text-ocean-500/60 md:hidden">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* ── 5. FULL-WIDTH IMAGE BANNER — 임팩트 비주얼   ── */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden md:h-[60vh]">
        <Image
          src={getImagePath('/images/food-web/pc0031187533.jpg')}
          alt="수산물 가공"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-600/90 via-ocean-600/70 to-ocean-600/40" />
        <div className="relative flex h-full items-center">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <div className="max-w-xl">
                <h2 className="mb-5 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  변화를 두려워하지 않는
                  <br />
                  <span className="text-ocean-200">진취적 파트너십</span>
                </h2>
                <p className="mb-8 text-xl text-white/90 md:text-2xl">
                  대형마트, 외식 프랜차이즈, 밀키트 브랜드.
                  <br />
                  귀사의 성공을 함께 설계합니다.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-ocean-600 transition-all duration-300 hover:bg-ocean-50 hover:shadow-xl"
                >
                  OEM 문의하기
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* ── 6. TRUSTED PARTNERS                          ── */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">
                Trusted Partners
              </span>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
                신뢰의 <span className="text-ocean-500">파트너</span>
              </h2>
              <p className="mt-5 text-xl text-gray-600">
                10년 이상 함께한 대한민국 대표 유통 파트너사
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {['풀무원', '푸드머스', '홈플러스', '이마트', '쿠팡'].map((name) => (
                <div
                  key={name}
                  className="flex h-24 w-44 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md"
                >
                  <span className="text-xl font-bold text-gray-400 transition-colors group-hover:text-ocean-500">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* ── 7. CONTACT CTA                               ── */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-ocean-600 py-24 md:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="mb-5 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                함께 만들어갈
                <br />
                <span className="text-ocean-300">다음 제품</span>이 궁금하시다면
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-xl text-ocean-200 md:text-2xl">
                OEM 납품, 신제품 개발, 파트너십에 대해
                <br />
                언제든 편하게 문의해주세요.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-bold text-ocean-600 shadow-xl transition-all duration-300 hover:bg-ocean-50 hover:shadow-2xl"
                >
                  문의하기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="tel:061-686-0508"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-white/90 transition-colors hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  061-686-0508
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
