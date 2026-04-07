'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import type { SiteTheme } from '@/lib/themes';
import { SKIN_COPY } from '@/lib/skin-copy';

const CERT_BADGES = [
  { name: 'HACCP', icon: '/images/certs/haccp.png', desc: '식품안전관리인증', detail: '위해요소 중점관리 기준 적합' },
  { name: 'ASC', icon: '/images/certs/asc.svg', desc: '양식수산물 국제인증', detail: '책임있는 양식 수산물 공급' },
  { name: 'MSC', icon: '/images/certs/msc.png', desc: '지속가능어업 국제인증', detail: '지속가능한 어업 자원 관리' },
  { name: '수산물이력추적', icon: '/images/certs/traceability.png', desc: '원산지 추적관리', detail: '생산부터 유통까지 완벽 추적' },
  { name: '수산물품질인증', icon: '/images/certs/quality.png', desc: '국가품질인증', detail: '대한민국 국가 품질 인증 획득' },
  { name: 'ISO 22000', icon: '/images/certs/iso22000.png', desc: '식품안전경영시스템', detail: '국제 식품안전 경영 시스템' },
];

const PRODUCTS = [
  { name: '냉동수산가공', image: '/images/food-web/pc0031187411.jpg', desc: '고등어, 삼치, 갈치 등' },
  { name: '프리미엄 굴비', image: '/images/food-web/pc0031187455.jpg', desc: '영광 전통 방식 굴비' },
  { name: '밀키트·HMR', image: '/images/food-web/pc0031187507.jpg', desc: '간편식 OEM 생산' },
  { name: '수산 선물세트', image: '/images/food-web/pc0031187499.jpg', desc: '명절 프리미엄 세트' },
];

interface Props { theme: SiteTheme; }

export default function PageSections({ theme: t }: Props) {
  const copy = SKIN_COPY[t.id] || SKIN_COPY[0];
  const isDark = t.id !== 0 && t.id !== 6;
  const tp = isDark ? 'text-white' : 'text-gray-900';
  const ts = isDark ? 'text-white/70' : 'text-gray-600';
  const tm = isDark ? 'text-white/50' : 'text-gray-500';
  const cardCls = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200';
  const btnP = isDark ? 'bg-white text-gray-900 hover:bg-white/90' : `${t.accent} text-white ${t.accentHover}`;
  const ringColor = isDark ? 'ring-[#0a1628]' : 'ring-white';

  return (
    <>
      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className={`relative overflow-hidden ${t.certBg} py-24 md:py-32`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-1.5 font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-200">
                {copy.certLabel}
              </span>
              <h2 className={`mt-4 text-4xl font-bold ${t.certText} md:text-5xl lg:text-6xl`}>
                {copy.certTitle} <span className="text-ocean-300">{copy.certTitleAccent}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-xl text-ocean-200 md:text-2xl">
                {copy.certDesc}<br className="hidden md:block" />
                <span className="font-semibold text-white">{copy.certDescBold}</span>
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {CERT_BADGES.map((cert) => (
                <div key={cert.name} className={`group flex flex-col items-center gap-3 rounded-2xl border ${t.certCardBorder} ${t.certCardBg} px-5 py-8 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 md:px-8 md:py-10`}>
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white/90 p-2 md:h-24 md:w-24">
                    <Image src={getImagePath(cert.icon)} alt={cert.name} fill className="object-contain p-1" sizes="96px" />
                  </div>
                  <span className="font-montserrat text-xl font-bold tracking-wide text-white md:text-2xl">{cert.name}</span>
                  <span className="text-sm text-ocean-200 md:text-base">{cert.desc}</span>
                  <span className="text-xs text-ocean-300/70 md:text-sm">{cert.detail}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="mt-12">
            <div className="flex justify-center">
              <Link href="/certification" className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ocean-600">
                {copy.certCta} <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── COMPANY INTRO ── */}
      <section className={`relative overflow-hidden ${t.sectionBg1} py-24 md:py-32`}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeIn>
              <div>
                <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.aboutLabel}</span>
                <h2 className={`mb-6 text-4xl font-bold leading-tight ${tp} md:text-5xl`}>
                  {copy.aboutTitle1}<br /><span className="text-ocean-500">{copy.aboutTitle2}</span>
                </h2>
                <p className={`mb-6 text-lg leading-relaxed ${ts} md:text-xl`}>{copy.aboutDesc1}</p>
                <p className={`mb-8 text-lg leading-relaxed ${ts} md:text-xl`}>
                  <span className={`font-semibold ${tp}`}>{copy.aboutDesc2Bold}</span>{' '}{copy.aboutDesc2}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: '400억+', label: '연 매출' },
                    { num: '134+', label: '개발 품목' },
                    { num: '66개', label: '운영 품목' },
                    { num: '10년+', label: '핵심 파트너' },
                  ].map((s) => (
                    <div key={s.label} className={`rounded-xl border ${cardCls} px-4 py-4 text-center`}>
                      <span className="block font-montserrat text-2xl font-bold text-ocean-500 md:text-3xl">{s.num}</span>
                      <span className={`mt-1 block text-sm ${tm}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/about" className="group mt-8 inline-flex items-center gap-2 text-lg font-semibold text-ocean-500 transition-colors hover:text-ocean-400">
                  {copy.aboutCta} <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <Image src={getImagePath('/images/food-web/tica034m19010003.jpg')} alt="서풍 수산가공" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-600/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className={`${t.sectionBg2} py-24 md:py-32`}>
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.prodLabel}</span>
              <h2 className={`text-4xl font-bold ${tp} md:text-5xl lg:text-6xl`}>
                {copy.prodTitle} <span className="text-ocean-500">{copy.prodTitleAccent}</span>
              </h2>
              <p className={`mx-auto mt-5 max-w-xl text-xl ${ts} whitespace-pre-line`}>{copy.prodDesc}</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {PRODUCTS.map((p) => (
                <Link key={p.name} href="/products" className={`group overflow-hidden rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white'} shadow-sm transition-all duration-300 hover:shadow-xl`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={getImagePath(p.image)} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white md:text-xl">{p.name}</h3>
                      <p className="text-sm text-white/80">{p.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="mt-10">
            <div className="flex justify-center">
              <Link href="/products" className={`group inline-flex items-center gap-2 rounded-full ${btnP} px-8 py-4 text-lg font-bold shadow-lg transition-all duration-300 hover:shadow-xl`}>
                {copy.prodCta} <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SUPPLY STORY ── */}
      <section className={`relative overflow-hidden ${t.sectionBg1} py-24 md:py-32`}>
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.supplyLabel}</span>
              <h2 className={`text-4xl font-bold ${tp} md:text-5xl lg:text-6xl`}>
                {copy.supplyTitle} <span className="text-ocean-500">{copy.supplyTitleAccent}</span>
              </h2>
              <p className={`mx-auto mt-5 max-w-xl text-xl ${ts}`}>{copy.supplyDesc}</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-0">
              <div className="absolute left-[16.67%] right-[16.67%] top-[28px] hidden h-px bg-gradient-to-r from-ocean-500/60 via-ocean-400/40 to-ocean-500/60 md:block" />
              {[
                { time: '04:00', image: '/images/food-web/pc003673268_l.jpg', caption: '새벽 4시, 여수 위판장' },
                { time: '08:00', image: '/images/food-web/pc0031182640.jpg', caption: '당일 입고, 즉시 가공' },
                { time: '12:00', image: '/images/food-web/pc0031188071.jpg', caption: '체계적 품질 관리' },
              ].map((item, i) => (
                <div key={item.time} className="relative flex w-full flex-col items-center md:w-1/3 md:px-4">
                  <div className="relative z-10 mb-4 flex flex-col items-center">
                    <span className="font-montserrat text-xl font-bold text-ocean-500">{item.time}</span>
                    <div className={`mt-1 h-3 w-3 rounded-full bg-ocean-500 ring-4 ${ringColor}`} />
                  </div>
                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
                    <Image src={getImagePath(item.image)} alt={item.caption} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <p className={`mt-3 text-center text-lg font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{item.caption}</p>
                  {i < 2 && <div className="my-2 text-ocean-500/60 md:hidden"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden md:h-[60vh]">
        <Image src={getImagePath('/images/food-web/pc0031187533.jpg')} alt="수산물 가공" fill className="object-cover" sizes="100vw" />
        <div className={`absolute inset-0 bg-gradient-to-r ${t.bannerOverlay}`} />
        <div className="relative flex h-full items-center">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <div className="max-w-xl">
                <h2 className="mb-5 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {copy.bannerTitle1}<br /><span className="text-ocean-200">{copy.bannerTitle2}</span>
                </h2>
                <p className="mb-8 text-xl text-white/90 md:text-2xl whitespace-pre-line">{copy.bannerDesc}</p>
                <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-ocean-600 transition-all duration-300 hover:bg-ocean-50 hover:shadow-xl">
                  {copy.bannerCta} <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className={`${t.sectionBg1} py-24 md:py-32`}>
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.partnerLabel}</span>
              <h2 className={`text-4xl font-bold ${tp} md:text-5xl`}>{copy.partnerTitle} <span className="text-ocean-500">{copy.partnerTitleAccent}</span></h2>
              <p className={`mt-5 text-xl ${ts}`}>{copy.partnerDesc}</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {/* 풀무원 */}
              <div className={`flex h-20 w-40 items-center justify-center rounded-xl border ${cardCls} px-4 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                <svg viewBox="0 0 200 40" className="h-8 w-full">
                  <text x="100" y="28" textAnchor="middle" fill="#2E7D32" fontSize="22" fontWeight="800" fontFamily="'Noto Sans KR', sans-serif">풀무원</text>
                  <rect x="30" y="34" width="140" height="2" rx="1" fill="#8BC34A" />
                </svg>
              </div>
              {/* 푸드머스 */}
              <div className={`flex h-20 w-40 items-center justify-center rounded-xl border ${cardCls} px-4 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                <svg viewBox="0 0 200 40" className="h-8 w-full">
                  <text x="100" y="28" textAnchor="middle" fill="#E65100" fontSize="20" fontWeight="700" fontFamily="'Noto Sans KR', sans-serif">푸드머스</text>
                  <circle cx="22" cy="20" r="8" fill="none" stroke="#FF8F00" strokeWidth="2" />
                  <circle cx="22" cy="20" r="3" fill="#FF8F00" />
                </svg>
              </div>
              {/* 홈플러스 */}
              <div className={`flex h-20 w-40 items-center justify-center rounded-xl border ${cardCls} px-4 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                <svg viewBox="0 0 200 40" className="h-8 w-full">
                  <text x="105" y="28" textAnchor="middle" fill="#E31837" fontSize="20" fontWeight="800" fontFamily="Arial, sans-serif">homeplus</text>
                  <circle cx="22" cy="20" r="10" fill="none" stroke="#E31837" strokeWidth="2" />
                  <path d="M17 20h10M22 15v10" stroke="#E31837" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              {/* 이마트 */}
              <div className={`flex h-20 w-40 items-center justify-center rounded-xl border ${cardCls} px-4 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                <svg viewBox="0 0 200 40" className="h-8 w-full">
                  <text x="100" y="28" textAnchor="middle" fill="#FFB300" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">emart</text>
                  <rect x="60" y="32" width="80" height="3" rx="1.5" fill="#FFB300" />
                </svg>
              </div>
              {/* 쿠팡 */}
              <div className={`flex h-20 w-40 items-center justify-center rounded-xl border ${cardCls} px-4 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                <svg viewBox="0 0 200 40" className="h-8 w-full">
                  <text x="100" y="28" textAnchor="middle" fill="#00635A" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">Coupang</text>
                </svg>
              </div>
              {/* 두레생협 */}
              <div className={`flex h-20 w-40 items-center justify-center rounded-xl border ${cardCls} px-4 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                <svg viewBox="0 0 200 44" className="h-8 w-full">
                  <circle cx="28" cy="22" r="12" fill="none" stroke="#4CAF50" strokeWidth="2" />
                  <path d="M22 22c0-3 3-6 6-6s6 3 6 6" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="28" cy="18" r="2" fill="#4CAF50" />
                  <text x="120" y="20" textAnchor="middle" fill="#2E7D32" fontSize="16" fontWeight="800" fontFamily="'Noto Sans KR', sans-serif">두레생협</text>
                  <text x="120" y="34" textAnchor="middle" fill="#66BB6A" fontSize="9" fontWeight="600" fontFamily="Arial, sans-serif">DURE COOP</text>
                </svg>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className={`relative overflow-hidden ${t.ctaBg} py-24 md:py-32`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className={`mb-5 text-4xl font-bold ${t.ctaText} md:text-5xl lg:text-6xl`}>
                {copy.ctaTitle1}<br /><span className="text-ocean-300">{copy.ctaTitle2}</span>이 궁금하시다면
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-xl text-ocean-200 md:text-2xl whitespace-pre-line">{copy.ctaDesc}</p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-bold text-ocean-600 shadow-xl transition-all duration-300 hover:bg-ocean-50 hover:shadow-2xl">
                  {copy.ctaCta}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:061-686-0508" className="inline-flex items-center gap-2 text-lg font-semibold text-white/90 transition-colors hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  061-686-0508
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
