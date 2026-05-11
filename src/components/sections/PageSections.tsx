'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import PhotoNeeded from '@/components/ui/PhotoNeeded';
import { getImagePath } from '@/lib/utils';
import type { SiteTheme } from '@/lib/themes';
import { SKIN_COPY } from '@/lib/skin-copy';
import { COMPANY, STATS, PARTNERS, hasValue } from '@/lib/company-config';

const CERT_BADGES = [
  { name: 'HACCP', icon: '/images/certs/haccp.png', desc: '식품안전관리인증', detail: '위해요소 중점관리 기준 적합' },
  { name: 'ASC', icon: '/images/certs/asc.svg', desc: '양식수산물 국제인증', detail: '책임있는 양식 수산물 공급' },
  { name: 'MSC', icon: '/images/certs/msc.png', desc: '지속가능어업 국제인증', detail: '지속가능한 어업 자원 관리' },
  { name: '수산물이력추적', icon: '/images/certs/traceability.png', desc: '원산지 추적관리', detail: '생산부터 유통까지 완벽 추적' },
  { name: '수산물품질인증', icon: '/images/certs/quality.png', desc: '국가품질인증', detail: '대한민국 국가 품질 인증 획득' },
  { name: 'ISO 22000', icon: '/images/certs/iso22000.png', desc: '식품안전경영시스템', detail: '국제 식품안전 경영 시스템' },
];

const PRODUCTS: { name: string; image: string | null; desc: string }[] = [
  { name: '냉동수산가공', image: null, desc: '고등어, 삼치, 갈치 등' },
  { name: '프리미엄 굴비', image: null, desc: '영광 전통 방식 굴비' },
  { name: '밀키트·HMR', image: null, desc: '간편식 OEM 생산' },
  { name: '수산 선물세트', image: null, desc: '명절 프리미엄 세트' },
];

const VALUES = [
  { label: '글로벌 인증', desc: 'HACCP · ASC · MSC 보유' },
  { label: 'One Platform', desc: '수매·가공·보관·유통 일원화' },
  { label: '대형 유통 납품', desc: '검증된 OEM 파트너십' },
  { label: '지속가능 수산', desc: '책임있는 양식 · 어업' },
];

const STAT_ENTRIES: { value: string | null; label: string }[] = [
  { value: STATS.annualRevenue, label: '연 매출' },
  { value: STATS.developedItems, label: '개발 품목' },
  { value: STATS.activeItems, label: '운영 품목' },
  { value: STATS.fishSpeciesCount, label: '취급 어종' },
];
const VISIBLE_STATS = STAT_ENTRIES.filter((s) => hasValue(s.value));

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
              <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 font-montserrat text-base font-semibold uppercase tracking-[0.2em] text-ocean-200">
                {copy.certLabel}
              </span>
              <h2 className={`mt-4 text-5xl font-bold ${t.certText} md:text-6xl lg:text-7xl`}>
                {copy.certTitle} <span className="text-ocean-300">{copy.certTitleAccent}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-ocean-200 md:text-2xl">
                {copy.certDesc}<br className="hidden md:block" />
                <span className="font-semibold text-white">{copy.certDescBold}</span>
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-base text-ocean-200/80 md:text-lg">
                대형 유통사가 요구하는 안전·품질 기준을 선제적으로 충족합니다
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {CERT_BADGES.map((cert) => (
                <div key={cert.name} className={`group flex flex-col items-center gap-3 rounded-2xl border ${t.certCardBorder} ${t.certCardBg} px-5 py-8 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 md:px-8 md:py-10`}>
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-white/95 p-2 shadow-md md:h-28 md:w-28">
                    <Image src={getImagePath(cert.icon)} alt={cert.name} fill className="object-contain p-1" sizes="112px" />
                  </div>
                  <span className="font-montserrat text-2xl font-bold tracking-wide text-white md:text-3xl">{cert.name}</span>
                  <span className="text-base font-medium text-ocean-200 md:text-lg">{cert.desc}</span>
                  <span className="text-sm leading-relaxed text-ocean-300/80 md:text-base">{cert.detail}</span>
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
                <span className="mb-4 inline-block font-montserrat text-base font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.aboutLabel}</span>
                <h2 className={`mb-6 text-4xl font-bold leading-tight ${tp} sm:text-5xl md:text-6xl`}>
                  {copy.aboutTitle1}<br className="hidden sm:block" /> <span className="text-ocean-500">{copy.aboutTitle2}</span>
                </h2>
                <p className={`mb-6 text-xl leading-relaxed ${ts} md:text-2xl`}>{copy.aboutDesc1}</p>
                <p className={`mb-8 text-lg leading-relaxed ${ts} md:text-xl`}>
                  <span className={`font-semibold ${tp}`}>{copy.aboutDesc2Bold}</span>{' '}{copy.aboutDesc2}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {VISIBLE_STATS.length > 0 ? (
                    VISIBLE_STATS.map((s) => (
                      <div key={s.label} className={`rounded-xl border ${cardCls} px-4 py-5 text-center`}>
                        <span className="block font-montserrat text-3xl font-bold text-ocean-500 md:text-4xl">{s.value}</span>
                        <span className={`mt-1 block text-base font-medium ${tm}`}>{s.label}</span>
                      </div>
                    ))
                  ) : (
                    VALUES.map((v) => (
                      <div key={v.label} className={`rounded-xl border ${cardCls} px-4 py-5`}>
                        <span className={`block text-lg font-bold ${tp} md:text-xl`}>{v.label}</span>
                        <span className={`mt-1 block text-sm ${tm}`}>{v.desc}</span>
                      </div>
                    ))
                  )}
                </div>
                <Link href="/about" className="group mt-8 inline-flex items-center gap-2 text-lg font-semibold text-ocean-500 transition-colors hover:text-ocean-400">
                  {copy.aboutCta} <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <PhotoNeeded
                ratio="4/5"
                tone={isDark ? 'dark' : 'light'}
                caption="대표 컷 (공장 외관 또는 가공 라인)"
                hint="고품질 스튜디오 촬영 권장"
                className="shadow-2xl"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className={`${t.sectionBg2} py-24 md:py-32`}>
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-base font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.prodLabel}</span>
              <h2 className={`text-4xl font-bold ${tp} sm:text-5xl md:text-6xl lg:text-7xl`}>
                {copy.prodTitle} <span className="text-ocean-500">{copy.prodTitleAccent}</span>
              </h2>
              <p className={`mx-auto mt-5 max-w-xl text-xl leading-relaxed ${ts} whitespace-pre-line md:text-2xl`}>{copy.prodDesc}</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {PRODUCTS.map((p) => (
                <Link key={p.name} href="/products" className={`group block overflow-hidden rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white'} shadow-sm transition-all duration-300 hover:shadow-xl`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.image ? (
                      <>
                        <Image src={getImagePath(p.image)} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-xl font-bold text-white md:text-2xl">{p.name}</h3>
                          <p className="text-base text-white/85 md:text-lg">{p.desc}</p>
                        </div>
                      </>
                    ) : (
                      <PhotoNeeded
                        fill
                        tone={isDark ? 'dark' : 'light'}
                        caption={p.name}
                        hint={p.desc}
                      />
                    )}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                <h2 className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  {copy.bannerTitle1}<br className="hidden md:block" /> <span className="text-ocean-200">{copy.bannerTitle2}</span>
                </h2>
                <p className="mb-8 text-xl leading-relaxed text-white/95 md:text-2xl whitespace-pre-line">{copy.bannerDesc}</p>
                <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-ocean-600 transition-all duration-300 hover:bg-ocean-50 hover:shadow-xl sm:text-xl">
                  OEM 문의하기 <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
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
            {PARTNERS.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-5">
                {PARTNERS.map((p) => (
                  <div key={p.name} className={`flex h-20 w-40 items-center justify-center overflow-hidden rounded-xl border ${cardCls} px-4 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                    {p.logoPath ? (
                      <Image src={getImagePath(p.logoPath)} alt={p.name} width={160} height={48} className="h-10 w-auto object-contain" />
                    ) : (
                      <span className={`text-sm font-semibold ${tp}`}>{p.name}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PhotoNeeded
                    key={i}
                    ratio="16/9"
                    tone={isDark ? 'dark' : 'light'}
                    caption="파트너사 로고"
                    hint="사용 동의 후 등록"
                  />
                ))}
              </div>
            )}
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
              <h2 className={`mb-5 text-4xl font-bold leading-tight ${t.ctaText} sm:text-5xl md:text-6xl lg:text-7xl`}>
                {copy.ctaTitle1}<br className="hidden sm:block" /> <span className="text-ocean-300">{copy.ctaTitle2}</span>
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-xl leading-relaxed text-ocean-200 md:text-2xl whitespace-pre-line">{copy.ctaDesc}</p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-bold text-ocean-600 shadow-xl transition-all duration-300 hover:bg-ocean-50 hover:shadow-2xl sm:text-2xl">
                  OEM 문의하기
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                {hasValue(COMPANY.phone) && (
                  <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 text-xl font-semibold text-white/95 transition-colors hover:text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {COMPANY.phone}
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
