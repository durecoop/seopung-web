'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import PartnerLogo from '@/components/ui/PartnerLogo';
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
  { name: '냉동수산가공', image: '/images/food-web/pc003673268_l.jpg', desc: '고등어, 삼치, 갈치 등' },
  { name: '프리미엄 굴비', image: '/images/gulbi/gulbi-premium.jpg', desc: '영광 전통 방식 굴비' },
  { name: '밀키트·HMR', image: '/images/food-web/pc0031188071.jpg', desc: '간편식 OEM 생산' },
  { name: '수산 선물세트', image: '/images/food-web/pc0031182640.jpg', desc: '명절 프리미엄 세트' },
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
              <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/15 px-5 py-2 font-montserrat text-base font-semibold uppercase tracking-[0.2em] text-white">
                {copy.certLabel}
              </span>
              <h2 className={`mt-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-md md:text-4xl lg:text-5xl`}>
                {copy.certTitle} <span className="text-gold-300">{copy.certTitleAccent}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                {copy.certDesc}<br className="hidden md:block" />
                <span className="font-semibold text-white">{copy.certDescBold}</span>
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 md:text-base">
                대형 유통사가 요구하는 안전·품질 기준을 선제적으로 충족합니다
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {CERT_BADGES.map((cert) => (
                <div key={cert.name} className="group flex flex-col items-center gap-2 rounded-xl border border-white/25 bg-white/[0.08] px-5 py-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:bg-white/15 md:px-8 md:py-9">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white p-2 shadow-md md:h-24 md:w-24">
                    <Image src={getImagePath(cert.icon)} alt={cert.name} fill className="object-contain p-1" sizes="96px" />
                  </div>
                  <span className="font-montserrat text-xl font-extrabold tracking-wide text-white drop-shadow md:text-2xl">{cert.name}</span>
                  <span className="text-center text-sm font-semibold text-white md:text-base">{cert.desc}</span>
                  <span className="text-center text-xs leading-relaxed text-white/85 md:text-sm">{cert.detail}</span>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-coral-400)_0%,_transparent_50%)] opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-gold-400)_0%,_transparent_40%)] opacity-[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeIn>
              <div>
                <span className="mb-4 inline-block font-montserrat text-base font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.aboutLabel}</span>
                <h2 className={`mb-6 text-3xl font-bold leading-tight tracking-tight ${tp} sm:text-4xl md:text-5xl`}>
                  {copy.aboutTitle1}<br className="hidden sm:block" /> <span className="text-ocean-500">{copy.aboutTitle2}</span>
                </h2>
                <p className={`mb-6 text-base leading-relaxed ${ts} md:text-lg`}>{copy.aboutDesc1}</p>
                <p className={`mb-8 text-base leading-relaxed ${ts} md:text-lg`}>
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
              <h2 className={`text-3xl font-bold tracking-tight ${tp} sm:text-4xl md:text-5xl`}>
                {copy.prodTitle} <span className="text-ocean-500">{copy.prodTitleAccent}</span>
              </h2>
              <p className={`mx-auto mt-5 max-w-xl text-base leading-relaxed ${ts} whitespace-pre-line md:text-lg`}>{copy.prodDesc}</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {PRODUCTS.map((p) => (
                <Link key={p.name} href="/products" className={`group block overflow-hidden rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white'} shadow-sm transition-all duration-300 hover:shadow-xl`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.image ? (
                      <>
                        <Image src={getImagePath(p.image)} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 768px) 50vw, 25vw" />
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


      {/* ── BANNER ── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden md:h-[60vh]">
        <Image src={getImagePath('/images/hero/banner-fish.jpg')} alt="여수 위판장 신선 수산물" fill className="object-cover" sizes="100vw" />
        <div className={`absolute inset-0 bg-gradient-to-r ${t.bannerOverlay}`} />
        <div className="relative flex h-full items-center">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <div className="max-w-xl">
                <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  {copy.bannerTitle1}<br className="hidden md:block" /> <span className="text-ocean-200">{copy.bannerTitle2}</span>
                </h2>
                <p className="mb-8 text-base leading-relaxed text-white/95 md:text-lg whitespace-pre-line">{copy.bannerDesc}</p>
                <Link href="/contact" className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-ocean-600 shadow-md transition-all duration-300 hover:bg-ocean-50 hover:shadow-lg">
                  OEM 문의하기 <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
                <p className="mt-3 text-xs text-white/85 sm:text-sm">24시간 내 회신 · 샘플 무상 발송 · NDA 즉시 체결 가능</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className={`relative overflow-hidden ${t.sectionBg1} py-24 md:py-32`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-ocean-300)_0%,_transparent_45%)] opacity-[0.07]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-ocean-500">{copy.partnerLabel}</span>
              <h2 className={`text-3xl font-bold tracking-tight ${tp} md:text-4xl`}>{copy.partnerTitle} <span className="text-ocean-500">{copy.partnerTitleAccent}</span></h2>
              <p className={`mt-5 text-base ${ts} md:text-lg`}>{copy.partnerDesc}</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {PARTNERS.map((p) => (
                <div key={p.name} className={`flex flex-col items-center justify-between gap-3 rounded-xl border ${cardCls} px-4 py-6 text-center transition-all duration-300 hover:border-ocean-500/30 hover:shadow-md`}>
                  <div className="flex h-12 items-center justify-center">
                    {p.logoPath ? (
                      <Image src={getImagePath(p.logoPath)} alt={p.name} width={140} height={40} className="h-10 w-auto object-contain" />
                    ) : (
                      <PartnerLogo name={p.name} />
                    )}
                  </div>
                  <span className={`text-sm font-bold ${tp} md:text-base`}>{p.name}</span>
                  {p.description && (
                    <span className={`text-xs leading-snug ${tm}`}>{p.description}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
          <p className={`mx-auto mt-8 max-w-2xl text-center text-xs ${tm} md:text-sm`}>
            * 거래처 표기는 협력 관계 안내 목적이며, 로고 사용 권한은 각 회사에 있습니다.
          </p>
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
              <h2 className={`mb-5 text-3xl font-bold leading-tight tracking-tight ${t.ctaText} sm:text-4xl md:text-5xl`}>
                {copy.ctaTitle1}<br className="hidden sm:block" /> <span className="text-ocean-300">{copy.ctaTitle2}</span>
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/95 md:text-lg whitespace-pre-line">{copy.ctaDesc}</p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-ocean-600 shadow-md transition-all duration-300 hover:bg-ocean-50 hover:shadow-lg sm:text-lg">
                  OEM 문의하기
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                {hasValue(COMPANY.phone) && (
                  <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 text-base font-semibold text-white/95 transition-colors hover:text-white sm:text-lg">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {COMPANY.phone}
                  </a>
                )}
              </div>
              <p className="mt-5 text-xs text-white/85 sm:text-sm">24시간 내 회신 · 샘플 무상 발송 · NDA 즉시 체결 가능</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
