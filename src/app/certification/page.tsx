'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FadeIn from '@/components/ui/FadeIn';
import { useReveal } from '@/hooks/useReveal';
import { getImagePath } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';

/* ─── SVG Icons for certifications ─── */
function HaccpIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="4" width="40" height="40" rx="8" className="stroke-ocean-400" />
      <path d="M14 24h20M24 14v20" className="stroke-ocean-400" strokeWidth={2} strokeLinecap="round" />
      <circle cx="24" cy="24" r="6" className="stroke-gold-400" />
    </svg>
  );
}

function TraceIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8 12h32v28H8z" className="stroke-ocean-400" rx="2" />
      <path d="M12 20h8M12 26h12M12 32h6" className="stroke-ocean-300" strokeLinecap="round" />
      <path d="M32 18l-4 4 2 2 6-6" className="stroke-gold-400" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="24" cy="20" r="12" className="stroke-ocean-400" />
      <path d="M24 12l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" className="stroke-gold-400" fill="none" />
      <path d="M16 34l-4 10 8-3 8 3-4-10" className="stroke-ocean-300" />
    </svg>
  );
}

function AscIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="24" cy="24" r="18" className="stroke-ocean-400" />
      <path d="M12 28c4-8 8-12 12-12s8 4 12 12" className="stroke-gold-400" strokeWidth={2} strokeLinecap="round" />
      <circle cx="24" cy="20" r="3" className="stroke-ocean-300" />
    </svg>
  );
}

function MscIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8 36c4-4 8-20 16-20s12 16 16 20" className="stroke-ocean-400" strokeWidth={2} strokeLinecap="round" />
      <path d="M24 16V8M20 12l4-4 4 4" className="stroke-gold-400" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 32h20" className="stroke-ocean-300" strokeLinecap="round" />
    </svg>
  );
}

function FsscIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth={1.5}>
      <rect x="6" y="6" width="36" height="36" rx="18" className="stroke-ocean-400" strokeDasharray="4 3" />
      <path d="M18 24l4 4 8-8" className="stroke-gold-400" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Certification data ─── */
const CERTIFICATIONS = [
  {
    icon: <HaccpIcon />,
    name: 'HACCP',
    year: '2008년 최초 인증',
    desc: '식품안전관리인증기준(HACCP) 적용업소 인증. 전 식품유형 인증 완료. 냉동수산식품(어류) 세척공정, 급속감출공정 중요관리.',
    photo: null,
    badge: null,
  },
  {
    icon: <TraceIcon />,
    name: '수산물 이력추적',
    year: '2013년',
    desc: '수산물이력추적관리 등록 제1164호. 참조기, 삼치, 오징어, 갈치, 고등어, 아귀, 방어, 달고기, 붕장어. 현재 전품목 확대 적용.',
    photo: '/images/certification/traceability-cert.jpg',
    badge: null,
  },
  {
    icon: <QualityIcon />,
    name: '수산물 품질인증',
    year: '',
    desc: '국립수산물품질관리원 인증',
    photo: null,
    badge: null,
  },
  {
    icon: <AscIcon />,
    name: 'ASC 인증',
    year: '2024년',
    desc: 'ASC(Aquaculture Stewardship Council) 양식 수산물 지속가능성 인증',
    photo: null,
    badge: null,
  },
  {
    icon: <MscIcon />,
    name: 'MSC 인증',
    year: '2024년',
    desc: 'MSC(Marine Stewardship Council) 자연산 수산물 지속가능 어업 인증',
    photo: null,
    badge: null,
  },
  {
    icon: <FsscIcon />,
    name: 'FSSC 22000',
    year: '2026년 추진 예정',
    desc: '글로벌 식품안전 인증. 글로벌 HACCP과 함께 추진 예정',
    photo: null,
    badge: 'COMING SOON',
  },
];

/* ─── Quality timeline data ─── */
const QUALITY_TIMELINE = [
  { year: '2008', title: 'HACCP 최초 인증', desc: '최초인증 2008.01.15' },
  { year: '2011', title: 'HACCP 기반 품질위생관리 체계 안정화', desc: '' },
  { year: '2013', title: '수산물 이력추적관리 시스템 도입', desc: '' },
  { year: '2024', title: 'ASC & MSC 지속가능 수산물 인증 획득', desc: '' },
  { year: '2026', title: 'FSSC 22000 및 글로벌 HACCP 추진 예정', desc: '', upcoming: true },
];

/* ─── KPI CountUp component ─── */
function KpiCard({ value, label }: { value: string; label: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const numericMatch = value.match(/^([\d.]+)(.*)$/);
  const targetNum = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;
  const isInteger = numericMatch ? !numericMatch[1].includes('.') : true;
  const hasNumeric = !!numericMatch;
  const [display, setDisplay] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || !hasNumeric || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * targetNum;
      setDisplay(isInteger ? Math.round(current).toString() : current.toFixed(1));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [visible, targetNum, isInteger, hasNumeric]);

  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-navy-700/50 bg-navy-900/60 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30 hover:bg-navy-800/60"
    >
      <span className="block font-montserrat text-3xl font-bold text-gold-400 md:text-4xl">
        {numericMatch ? display + suffix : value}
      </span>
      <span className="mt-3 block text-sm text-white/80">{label}</span>
    </div>
  );
}

export default function CertificationPage() {
  return (
    <main className="bg-navy-950 font-pretendard">
      <Navbar />
      <Breadcrumb />

      {/* ── Page Hero ── */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end">
        <Image
          src={getImagePath('/images/facility/radiation-tester-2.jpg')}
          alt="품질·인증"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
            Quality &amp; Certification
          </span>
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">품질·인증</h1>
          <p className="mt-3 text-lg text-white/60">글로벌 수준의 품질·위생 관리 체계</p>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 1. Certification Cards                */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Certifications
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                인증 <span className="text-gold-400">현황</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <FadeIn key={cert.name}>
                <div className="group relative overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-950/60 p-7 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5 md:p-8">
                  {/* COMING SOON badge */}
                  {cert.badge && (
                    <div className="absolute right-4 top-4 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      {cert.badge}
                    </div>
                  )}

                  <div className="mb-5 flex items-start gap-5">
                    <div className="flex-shrink-0">{cert.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                      {cert.year && (
                        <p className="mt-1 font-montserrat text-sm font-medium text-ocean-400">{cert.year}</p>
                      )}
                    </div>
                  </div>

                  <p className="leading-relaxed text-white/60">{cert.desc}</p>

                  {/* Optional cert photo */}
                  {cert.photo && (
                    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-xl border border-navy-700/30">
                      <Image
                        src={getImagePath(cert.photo)}
                        alt={`${cert.name} 인증서`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 1-B. 인증서 실물 갤러리               */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Certificate Gallery
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                인증서 <span className="text-gold-400">갤러리</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-navy-700/30 bg-white/[0.03] p-4 shadow-lg backdrop-blur-sm">
              <div className="overflow-hidden rounded-xl bg-white/95 p-3">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={getImagePath('/images/certification/traceability-cert.jpg')}
                    alt="수산물이력추적관리 등록증 제1164호"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-sm font-medium text-white/80">
                수산물이력추적관리 등록증 제1164호
              </p>
            </div>
          </FadeIn>

          <FadeIn className="mt-8">
            <p className="text-center text-sm text-white/60">
              ※ HACCP, 수산물품질인증 등 추가 인증서는 사무실에서 확인 가능합니다
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 1-C. 인증서 다운로드                    */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Downloads
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                인증서 <span className="text-gold-400">다운로드</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'HACCP', desc: '식품안전관리인증기준' },
              { name: 'ASC', desc: '양식 수산물 지속가능성 인증' },
              { name: 'MSC', desc: '자연산 수산물 지속가능 어업 인증' },
              { name: '수산물이력추적', desc: '수산물이력추적관리 등록' },
              { name: '수산물품질인증', desc: '국립수산물품질관리원 인증' },
            ].map((cert) => (
              <FadeIn key={cert.name}>
                <div className="group overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-800/60 p-6 transition-all duration-300 hover:border-gold-500/40 hover:shadow-lg hover:shadow-gold-500/5">
                  <div className="mb-4 flex items-start gap-4">
                    {/* Cert icon */}
                    <div className="flex-shrink-0 rounded-xl bg-ocean-500/10 p-3 text-ocean-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                      <p className="mt-1 text-sm text-white/60">{cert.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">PDF</span>
                    <button
                      type="button"
                      onClick={() => alert('준비 중입니다')}
                      className="inline-flex items-center gap-2 rounded-lg border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-sm font-medium text-gold-400 transition-all duration-300 hover:border-gold-500/60 hover:bg-gold-500/10"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      다운로드
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 2. Quality Management System          */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Quality Management
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                품질 관리 <span className="text-gold-400">체계</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Radiation testing */}
            <FadeIn>
              <div className="group overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-900/50 transition-all duration-300 hover:border-ocean-500/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getImagePath('/images/facility/radiation-tester.jpg')}
                    alt="방사능 검사"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">방사능 검사</h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    Gamma Radiation Spectrometer를 활용하여 전 원료의 방사능 오염 여부를 상시 검사합니다.
                    입고 원료 전수 검사를 통해 안전한 원료만 생산 라인에 투입됩니다.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Foreign material management */}
            <FadeIn>
              <div className="group overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-900/50 transition-all duration-300 hover:border-ocean-500/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getImagePath('/images/facility/safety-sign.jpg')}
                    alt="이물 관리"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">이물 관리</h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    생산 현장 전 구역에 이물 주의 관리 체계를 운영합니다.
                    금속검출기, 이물선별 공정 등 다단계 이물 방지 시스템을 갖추고 있습니다.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* AI X-ray link */}
            <FadeIn>
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-900/50 transition-all duration-300 hover:border-gold-500/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getImagePath('/images/facility/ai-xray-process.png')}
                    alt="AI 엑스레이"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-gold-500/90 px-3 py-1 text-[10px] font-bold text-navy-950">
                    2026 도입
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">AI 엑스레이 검출</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-white/60">
                    인공지능 기반 X-ray 이물질 검출 시스템으로 미세 이물까지 자동 감별합니다.
                    2026년 4월 현장 도입 예정입니다.
                  </p>
                  <Link
                    href="/technology"
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-ocean-400 transition-colors hover:text-ocean-300"
                  >
                    기술·설비 페이지에서 자세히 보기
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 2-B. 현장 품질 관리 사진              */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                On-Site Quality Control
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                현장 품질 <span className="text-gold-400">관리</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { image: '/images/facility/radiation-testing.jpg', caption: '방사능 측정 검사 진행' },
              { image: '/images/facility/warehouse-labels.jpg', caption: '원료 식별표시 관리' },
              { image: '/images/facility/warehouse-boxes.jpg', caption: '체계적 원료 보관' },
              { image: '/images/facility/safety-sign.jpg', caption: '이물 주의 안전 관리' },
            ].map((photo) => (
              <FadeIn key={photo.caption}>
                <div className="group overflow-hidden rounded-xl border border-navy-700/40 bg-navy-950/60 transition-all duration-300 hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getImagePath(photo.image)}
                      alt={photo.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-white/60">{photo.caption}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 2-C. Quality KPI Metrics              */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Quality KPI
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                품질 <span className="text-gold-400">지표</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '0.02%', label: '불량률' },
              { value: '99.7%', label: '납기 준수율' },
              { value: '95%+', label: '재계약률' },
              { value: '15톤', label: '일일 처리량' },
            ].map((kpi) => (
              <FadeIn key={kpi.label}>
                <KpiCard value={kpi.value} label={kpi.label} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* 3. Quality History Timeline           */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                Quality History
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                품질 <span className="text-gold-400">연혁</span>
              </h2>
            </div>
          </FadeIn>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-ocean-500/40 via-ocean-500/20 to-transparent md:left-1/2 md:-translate-x-px" />

            <div className="space-y-12">
              {QUALITY_TIMELINE.map((item, i) => (
                <FadeIn key={item.year}>
                  <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-6 top-1 z-10 md:left-1/2 md:-translate-x-1/2">
                      <div
                        className={`h-3 w-3 rounded-full border-2 ${
                          item.upcoming
                            ? 'border-gold-500 bg-gold-500/20 shadow-lg shadow-gold-500/30'
                            : 'border-ocean-400 bg-ocean-400/20'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                      <span
                        className={`font-montserrat text-2xl font-bold ${
                          item.upcoming ? 'text-gold-400' : 'text-ocean-400'
                        }`}
                      >
                        {item.year}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                      {item.desc && <p className="mt-1 text-sm text-white/60">{item.desc}</p>}
                      {item.upcoming && (
                        <span className="mt-2 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ */}
      {/* CTA — 기술·설비 링크                  */}
      {/* ══════════════════════════════════════ */}
      <section className="border-t border-navy-800 bg-navy-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center">
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 rounded-full bg-ocean-400 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-ocean-500/20 transition-all duration-300 hover:bg-ocean-500 hover:shadow-ocean-500/30"
              >
                기술·설비도 확인해보세요
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
