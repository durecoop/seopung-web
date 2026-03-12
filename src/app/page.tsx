'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';

/* ─── Process steps data ─── */
const PROCESS_STEPS = [
  { step: '01', title: '원료 입하', image: '/images/process/01-raw-material.jpg' },
  { step: '02', title: '절단·가공', image: '/images/process/02-cutting-machine.jpg' },
  { step: '03', title: '세척·염장', image: '/images/process/03-washing.jpg' },
  { step: '04', title: '급속 냉동', image: '/images/process/04-tunnel-freezer.jpg' },
  { step: '05', title: '포장', image: '/images/process/05-vacuum-packer.jpg' },
  { step: '06', title: '냉동 보관', image: '/images/process/06-cold-storage.jpg' },
];

/* ─── Certification badges data ─── */
const CERT_BADGES = [
  'HACCP',
  'ASC',
  'MSC',
  '수산물이력추적',
  '수산물품질인증',
  'ISO 22000',
];

/* ═══════════════════════════════════════ */
/*  LANDING PAGE                          */
/* ═══════════════════════════════════════ */
export default function Home() {
  return (
    <main className="bg-navy-950 font-pretendard">
      <Navbar />
      <HeroSection />

      {/* ── 1. Overview Strip ── */}
      <section id="overview" className="relative overflow-hidden border-t border-navy-800 bg-navy-950">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-ocean-500)/6%,_transparent_70%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
          <FadeIn>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-white/80 md:text-xl lg:text-2xl">
              <span className="font-semibold text-white">영어조합법인 서풍</span>은 전라남도 여수에서{' '}
              <span className="text-gold-400">30년 이상의 경력</span>을 바탕으로
              대한민국 수산물의 미래를 만들어가고 있습니다.
            </p>
          </FadeIn>

          <FadeIn className="mt-8">
            <p className="mx-auto max-w-2xl text-center text-base text-white/60 md:text-lg">
              매출 성장을 현장과 품질에 환원하는{' '}
              <span className="text-ocean-300">선순환 재투자 경영</span>
            </p>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="flex justify-center">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/5 px-6 py-3 text-sm font-medium text-gold-400 transition-all duration-300 hover:border-gold-500/60 hover:bg-gold-500/10 hover:shadow-lg hover:shadow-gold-500/5"
              >
                회사소개 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 1.5 수산물 공급 스토리 ── */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Supply Story
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                수산물 공급 <span className="text-gold-400">스토리</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
                새벽 위판장에서 완제품 출하까지, 당일 원료를 당일 가공합니다.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-0">
              {/* Connecting line (desktop) */}
              <div className="absolute left-[16.67%] right-[16.67%] top-[28px] hidden h-px bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-gold-500/60 md:block" />

              {[
                { time: '04:00', image: '/images/hero/dawn-boats.jpg', caption: '새벽 4시, 여수 위판장' },
                { time: '08:00', image: '/images/process/02-cutting-machine.jpg', caption: '당일 입고, 즉시 가공' },
                { time: '12:00', image: '/images/process/06-cold-storage.jpg', caption: '체계적 냉동 관리' },
              ].map((item, i) => (
                <div key={item.time} className="relative flex w-full flex-col items-center md:w-1/3 md:px-4">
                  {/* Time indicator */}
                  <div className="relative z-10 mb-4 flex flex-col items-center">
                    <span className="font-montserrat text-lg font-bold text-gold-400">{item.time}</span>
                    <div className="mt-1 h-3 w-3 rounded-full bg-gold-500 ring-4 ring-navy-950" />
                  </div>

                  {/* Photo */}
                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-navy-700/50">
                    <Image
                      src={getImagePath(item.image)}
                      alt={item.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  </div>

                  {/* Caption */}
                  <p className="mt-3 text-center text-sm font-medium text-white/80">{item.caption}</p>

                  {/* Mobile arrow */}
                  {i < 2 && (
                    <div className="my-2 text-gold-500/60 md:hidden">
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

      {/* ── 2. Process Preview ── */}
      <section className="border-t border-navy-800 bg-navy-900/50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Production Process
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                원료에서 출하까지, <span className="text-gold-400">6단계 공정</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:gap-6">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="group flex-shrink-0 w-44 md:w-52"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-navy-700/50">
                    <Image
                      src={getImagePath(step.image)}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 176px, 208px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3">
                      <span className="font-montserrat text-xs font-bold text-gold-400">
                        STEP {step.step}
                      </span>
                      <p className="text-sm font-medium text-white">{step.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="flex justify-center">
              <Link
                href="/process"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ocean-400 transition-colors hover:text-ocean-300"
              >
                자세히 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. Technology Highlight ── */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-900/60 md:flex">
              {/* Image */}
              <div className="relative aspect-[16/10] md:aspect-auto md:w-1/2">
                <Image
                  src={getImagePath('/images/facility/ai-xray-process.png')}
                  alt="AI X-ray 이물질 검출 시스템"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Investment badge */}
                <div className="absolute left-4 top-4 rounded-full bg-gold-500/90 px-4 py-1.5 text-xs font-bold text-navy-950 shadow-lg backdrop-blur-sm">
                  2026년 약 9억원 설비 투자
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                  Technology
                </span>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  AI가 지키는 <span className="text-gold-400">품질</span>
                </h2>
                <p className="mb-8 leading-relaxed text-white/60">
                  최첨단 AI X-ray 이물질 검출 시스템으로 수산물의 안전성을 보장합니다.
                  기계가 보지 못하는 미세 이물질까지 AI가 감별하여 소비자의 식탁을 지킵니다.
                </p>
                <Link
                  href="/technology"
                  className="group inline-flex w-fit items-center gap-2 rounded-full border border-ocean-500/30 bg-ocean-500/5 px-6 py-3 text-sm font-medium text-ocean-400 transition-all duration-300 hover:border-ocean-500/60 hover:bg-ocean-500/10"
                >
                  기술·설비 더 보기
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 4. Certification Badges ── */}
      <section className="border-t border-navy-800 bg-navy-900/30 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="mb-8 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Certifications
              </span>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {CERT_BADGES.map((cert) => (
                <span
                  key={cert}
                  className="rounded-full border border-navy-600/60 bg-navy-800/40 px-5 py-2.5 font-montserrat text-xs font-semibold tracking-wide text-white/80 transition-all duration-300 hover:border-gold-500/40 hover:text-gold-400 md:text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-8">
            <div className="flex justify-center">
              <Link
                href="/certification"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ocean-400 transition-colors hover:text-ocean-300"
              >
                인증 현황 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 4.5 파트너와 함께 ── */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Partnership
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">파트너와 함께</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
                <span className="text-gold-400">10년간 134품목</span>을 함께 개발한 신뢰의 파트너
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {[
                { number: '10년+', label: '협력기간' },
                { number: '134+', label: '개발품목' },
                { number: '66개', label: '운영중' },
                { number: '400억', label: '매출목표' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-navy-700/50 bg-navy-900/60 px-4 py-8 text-center transition-all duration-500 hover:border-gold-500/30 hover:bg-navy-800/60"
                >
                  <span className="block font-montserrat text-3xl font-bold text-gold-400 md:text-4xl">
                    {stat.number}
                  </span>
                  <span className="mt-2 block text-sm text-white/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 5. Gulbi Teaser ── */}
      <section className="relative overflow-hidden border-t border-navy-800">
        <FadeIn className="relative">
          <div className="relative h-[50vh] min-h-[400px] md:h-[60vh]">
            <Image
              src={getImagePath('/images/gulbi/tying.jpg')}
              alt="영광 굴비 엮기"
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/30" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-6">
                <div className="max-w-lg">
                  <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                    Premium Gulbi
                  </span>
                  <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    영광 굴비,<br />
                    <span className="text-gold-400">장인의 손길</span>
                  </h2>
                  <p className="mb-8 max-w-md text-base text-white/60 md:text-lg">
                    전통 방식 그대로, 한 마리 한 마리 정성을 담아
                    대한민국 최고의 굴비를 만들어갑니다.
                  </p>
                  <Link
                    href="/gulbi"
                    className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-bold text-navy-950 shadow-lg shadow-gold-500/20 transition-all duration-300 hover:bg-gold-400 hover:shadow-gold-500/30"
                  >
                    영광굴비 보기
                    <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── 6. Contact CTA ── */}
      <section className="border-t border-navy-800 bg-navy-950">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <FadeIn>
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                OEM 납품 및 <span className="text-gold-400">협력 문의</span>
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-base text-white/60 md:text-lg">
                대형마트, 외식 프랜차이즈, 밀키트 브랜드 등 다양한 파트너와 함께합니다.
                귀사의 요구에 맞는 최적의 솔루션을 제안드립니다.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-400 px-8 py-4 text-base font-bold text-white shadow-xl shadow-ocean-500/20 transition-all duration-300 hover:shadow-ocean-500/40 hover:brightness-110"
              >
                문의하기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
