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

/* ─── Professional SVG Badge Components ─── */
function HaccpBadge() {
  return (
    <svg viewBox="0 0 80 90" fill="none" className="h-16 w-14">
      {/* Shield shape */}
      <path d="M40 4L8 18v28c0 20 14 32 32 38 18-6 32-18 32-38V18L40 4z" fill="#1e3a5f" stroke="#2563eb" strokeWidth={2} />
      <path d="M40 8L12 20v26c0 18 12 29 28 34 16-5 28-16 28-34V20L40 8z" fill="#0f2847" />
      {/* Inner shield highlight */}
      <path d="M40 14L18 24v20c0 14 10 24 22 28 12-4 22-14 22-28V24L40 14z" fill="none" stroke="#3b82f6" strokeWidth={0.5} opacity={0.5} />
      {/* HACCP text */}
      <text x="40" y="42" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">HACCP</text>
      {/* Checkmark */}
      <path d="M30 52l6 6 14-14" stroke="#60a5fa" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Top star */}
      <path d="M40 11l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="#fbbf24" />
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

function QualityBadge() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
      {/* Outer ring */}
      <circle cx="40" cy="40" r="36" fill="#1a1a3e" stroke="#1e3a5f" strokeWidth={2} />
      <circle cx="40" cy="40" r="32" fill="none" stroke="#c9a84c" strokeWidth={1} strokeDasharray="4 3" />
      {/* Star */}
      <path d="M40 16l5.5 11 12.5 2-9 8.5 2 12.5-11-5.5-11 5.5 2-12.5-9-8.5 12.5-2z" fill="none" stroke="#c9a84c" strokeWidth={1.5} />
      <path d="M40 22l3.5 7 8 1.5-5.8 5.5 1.3 8-7-3.5-7 3.5 1.3-8-5.8-5.5 8-1.5z" fill="#c9a84c" opacity={0.2} />
      {/* Text */}
      <text x="40" y="56" textAnchor="middle" fill="#c9a84c" fontSize="6.5" fontWeight="700" fontFamily="Arial, sans-serif">품질인증</text>
      {/* Crown detail */}
      <path d="M32 14l3 4h10l3-4-2 3h-12z" fill="#c9a84c" opacity={0.6} />
    </svg>
  );
}

function AscBadge() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
      {/* Circular background */}
      <circle cx="40" cy="40" r="36" fill="#0d3b3f" stroke="#0d9488" strokeWidth={2} />
      <circle cx="40" cy="40" r="32" fill="none" stroke="#14b8a6" strokeWidth={0.5} opacity={0.5} />
      {/* Fish shape */}
      <path d="M22 40c6-10 14-14 22-10 4 2 6 6 8 10-2 4-4 8-8 10-8 4-16 0-22-10z" fill="#0d9488" opacity={0.3} stroke="#14b8a6" strokeWidth={1.5} />
      {/* Fish eye */}
      <circle cx="48" cy="38" r="2" fill="#14b8a6" />
      {/* Fish tail */}
      <path d="M18 40l-6-6v12z" fill="#0d9488" opacity={0.5} stroke="#14b8a6" strokeWidth={1} />
      {/* Wave lines */}
      <path d="M20 56c4-2 8 0 12-2s8 0 12-2 8 0 12-2" stroke="#14b8a6" strokeWidth={1} opacity={0.4} strokeLinecap="round" />
      {/* ASC text */}
      <text x="40" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="2">ASC</text>
    </svg>
  );
}

function MscBadge() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
      {/* Oval/badge shape */}
      <ellipse cx="40" cy="40" rx="36" ry="36" fill="#0c2d5e" stroke="#2563eb" strokeWidth={2} />
      <ellipse cx="40" cy="40" rx="32" ry="32" fill="none" stroke="#60a5fa" strokeWidth={0.5} opacity={0.4} />
      {/* Fish with hook concept */}
      <path d="M24 36c4-6 10-10 16-8 3 1 5 4 6 8-1 4-3 7-6 8-6 2-12-2-16-8z" fill="#1e40af" opacity={0.4} stroke="#60a5fa" strokeWidth={1.5} />
      <circle cx="42" cy="35" r="1.5" fill="#60a5fa" />
      <path d="M20 36l-4-4v8z" fill="#1e40af" opacity={0.5} stroke="#60a5fa" strokeWidth={1} />
      {/* Hook */}
      <path d="M52 20v10c0 4-3 7-6 7" stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" fill="none" />
      <circle cx="52" cy="18" r="2" fill="#fbbf24" />
      {/* Waves */}
      <path d="M18 50c5-2 10 1 15-1s10 1 15-1 10 1 14-1" stroke="#60a5fa" strokeWidth={1} opacity={0.3} strokeLinecap="round" />
      <path d="M20 54c5-2 10 1 15-1s10 1 15-1" stroke="#60a5fa" strokeWidth={0.8} opacity={0.2} strokeLinecap="round" />
      {/* MSC text */}
      <text x="40" y="68" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="2">MSC</text>
    </svg>
  );
}

function FsscBadge() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16">
      {/* Modern hexagonal badge */}
      <path d="M40 4L72 22v36L40 76 8 58V22z" fill="#1a1a3e" stroke="#6366f1" strokeWidth={1.5} />
      <path d="M40 10L66 25v30L40 70 14 55V25z" fill="none" stroke="#818cf8" strokeWidth={0.5} opacity={0.4} />
      {/* Shield/safety icon */}
      <path d="M40 22l-14 6v12c0 8 6 14 14 18 8-4 14-10 14-18V28z" fill="#4f46e5" opacity={0.2} stroke="#818cf8" strokeWidth={1.5} />
      {/* Checkmark inside */}
      <path d="M33 40l5 5 10-10" stroke="#a5b4fc" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Food icon - fork */}
      <path d="M53 26v4M55 26v4M57 26v4M53 30h4v3l-2 5" stroke="#818cf8" strokeWidth={1} strokeLinecap="round" />
      {/* FSSC text */}
      <text x="40" y="66" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.5">FSSC 22000</text>
    </svg>
  );
}

/* ─── Certification data ─── */
type CertStatus = 'acquired' | 'preparing';

interface CertificationItem {
  icon: React.ReactNode;
  name: string;
  year: string;
  desc: string;
  photo: string | null;
  logo: string | null;
  extraLogos?: string[];
  badge: string | null;
  status: CertStatus;
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    icon: <HaccpBadge />,
    name: 'HACCP',
    year: '2008년 최초 인증',
    desc: '식품안전관리인증기준(HACCP) 적용업소 인증. 전 식품유형 인증 완료. 냉동수산식품(어류) 세척공정, 급속감출공정 중요관리.',
    photo: null,
    logo: null,
    badge: null,
    status: 'acquired',
  },
  {
    icon: <TraceIcon />,
    name: '수산물 이력추적',
    year: '2013년',
    desc: '수산물이력추적관리 등록 제1164호. 참조기, 삼치, 오징어, 갈치, 고등어, 아귀, 방어, 달고기, 붕장어. 현재 전품목 확대 적용.',
    photo: '/images/certification/traceability-cert.jpg',
    logo: '/images/certification/logos/traceability-logo.jpg',
    extraLogos: [
      '/images/certification/logos/fishtrace-system-logo.jpg',
      '/images/certification/logos/fishtrace-logo-2017.jpg',
    ],
    badge: null,
    status: 'acquired',
  },
  {
    icon: <QualityBadge />,
    name: '수산물 품질인증',
    year: '',
    desc: '국립수산물품질관리원 인증',
    photo: null,
    logo: null,
    badge: null,
    status: 'preparing',
  },
  {
    icon: <AscBadge />,
    name: 'ASC 인증',
    year: '2024년',
    desc: 'ASC(Aquaculture Stewardship Council) 양식 수산물 지속가능성 인증',
    photo: null,
    logo: null,
    badge: null,
    status: 'acquired',
  },
  {
    icon: <MscBadge />,
    name: 'MSC 인증',
    year: '2024년',
    desc: 'MSC(Marine Stewardship Council) 자연산 수산물 지속가능 어업 인증',
    photo: null,
    logo: null,
    badge: null,
    status: 'acquired',
  },
  {
    icon: <FsscBadge />,
    name: 'FSSC 22000',
    year: '2026년 추진 예정',
    desc: '글로벌 식품안전 인증. 글로벌 HACCP과 함께 추진 예정',
    photo: null,
    logo: null,
    badge: 'COMING SOON',
    status: 'preparing',
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
      className="group rounded-2xl border border-navy-700/50 bg-navy-900/60 p-5 sm:p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30 hover:bg-navy-800/60"
    >
      <span className="block font-montserrat text-2xl font-bold text-gold-400 sm:text-3xl md:text-4xl">
        {numericMatch ? display + suffix : value}
      </span>
      <span className="mt-2 sm:mt-3 block text-xs sm:text-sm text-white/80">{label}</span>
    </div>
  );
}

export default function CertificationPage() {
  const acquiredCount = CERTIFICATIONS.filter((c) => c.status === 'acquired').length;
  const preparingCount = CERTIFICATIONS.filter((c) => c.status === 'preparing').length;

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

              {/* Certificate count summary */}
              <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 rounded-full border border-ocean-500/30 bg-ocean-500/10 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-ocean-400" />
                  <span className="text-sm font-medium text-ocean-400">취득 {acquiredCount}건</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-gold-400" />
                  <span className="text-sm font-medium text-gold-400">준비중 {preparingCount}건</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Acquired certifications */}
          <FadeIn>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-ocean-500/20" />
              <span className="text-xs font-semibold uppercase tracking-widest text-ocean-400">취득 완료</span>
              <div className="h-px flex-1 bg-ocean-500/20" />
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-10">
            {CERTIFICATIONS.filter((c) => c.status === 'acquired').map((cert) => (
              <FadeIn key={cert.name}>
                <div className="group relative overflow-hidden rounded-2xl border border-navy-700/40 bg-navy-950/60 p-5 sm:p-7 transition-all duration-300 hover:border-ocean-500/40 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.12)] md:p-8">
                  {/* Acquired status indicator */}
                  <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-center gap-1.5 rounded-full border border-ocean-500/30 bg-ocean-500/10 px-2.5 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-ocean-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-ocean-400">취득</span>
                  </div>

                  <div className="mb-5 flex items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0">
                      {cert.logo ? (
                        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white p-1.5 shadow-lg shadow-black/20">
                          <Image src={getImagePath(cert.logo)} alt={cert.name} fill className="object-contain" />
                        </div>
                      ) : cert.icon}
                    </div>
                    <div className="min-w-0 flex-1 pr-14 sm:pr-16">
                      <h3 className="text-lg sm:text-xl font-bold text-white truncate">{cert.name}</h3>
                      {cert.year && (
                        <p className="mt-1 font-montserrat text-sm font-medium text-ocean-400">{cert.year}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-white/60">{cert.desc}</p>

                  {/* Extra logos row */}
                  {cert.extraLogos && cert.extraLogos.length > 0 && (
                    <div className="mt-4 flex items-center gap-3">
                      {cert.extraLogos.map((logoPath) => (
                        <div key={logoPath} className="relative h-10 w-20 overflow-hidden rounded-lg bg-white p-1 shadow-md shadow-black/10">
                          <Image src={getImagePath(logoPath)} alt="관련 로고" fill className="object-contain" />
                        </div>
                      ))}
                    </div>
                  )}

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

          {/* Preparing certifications */}
          <FadeIn>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gold-500/20" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">준비중</span>
              <div className="h-px flex-1 bg-gold-500/20" />
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {CERTIFICATIONS.filter((c) => c.status === 'preparing').map((cert) => (
              <FadeIn key={cert.name}>
                <div className="group relative overflow-hidden rounded-2xl border border-navy-700/30 border-dashed bg-navy-950/40 p-5 sm:p-7 transition-all duration-300 hover:border-gold-500/30 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.08)] md:p-8">
                  {/* Badge */}
                  {cert.badge ? (
                    <div className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full border border-gold-500/40 bg-gold-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      {cert.badge}
                    </div>
                  ) : (
                    <div className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-400">준비중</span>
                    </div>
                  )}

                  <div className="mb-5 flex items-start gap-4 sm:gap-5 opacity-80">
                    <div className="flex-shrink-0">
                      {cert.icon}
                    </div>
                    <div className="min-w-0 flex-1 pr-14 sm:pr-16">
                      <h3 className="text-lg sm:text-xl font-bold text-white/80 truncate">{cert.name}</h3>
                      {cert.year && (
                        <p className="mt-1 font-montserrat text-sm font-medium text-gold-400">{cert.year}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-white/40">{cert.desc}</p>
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

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <FadeIn>
              <div className="overflow-hidden rounded-2xl border border-navy-700/30 bg-white/[0.03] p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="overflow-hidden rounded-xl bg-white/95 p-2 sm:p-3">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={getImagePath('/images/certification/traceability-cert.jpg')}
                      alt="수산물이력추적관리 등록증 제1164호"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm font-medium text-white/80">
                  수산물이력추적관리 등록증 제1164호
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="overflow-hidden rounded-2xl border border-navy-700/30 bg-white/[0.03] p-3 sm:p-4 shadow-lg backdrop-blur-sm">
                <div className="overflow-hidden rounded-xl bg-white/95 p-2 sm:p-3">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={getImagePath('/images/certification/traceability-cert-2.jpg')}
                      alt="수산물이력추적관리 인증서"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm font-medium text-white/80">
                  수산물이력추적관리 인증서
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-8">
            <p className="text-center text-xs sm:text-sm text-white/60">
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
              <p className="mt-3 text-sm text-white/50">필요한 인증서를 다운로드하세요</p>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              { name: 'HACCP', desc: '식품안전관리인증기준' },
              { name: 'ASC', desc: '양식 수산물 지속가능성 인증' },
              { name: 'MSC', desc: '자연산 수산물 지속가능 어업 인증' },
              { name: '수산물이력추적', desc: '수산물이력추적관리 등록' },
              { name: '수산물품질인증', desc: '국립수산물품질관리원 인증' },
            ].map((cert) => (
              <FadeIn key={cert.name}>
                <div className="group overflow-hidden rounded-2xl border border-navy-700/40 bg-gradient-to-br from-navy-800/60 to-navy-900/60 p-5 sm:p-6 transition-all duration-300 hover:border-gold-500/40 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.1)]">
                  <div className="mb-4 flex items-start gap-3 sm:gap-4">
                    {/* Cert icon */}
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-ocean-500/15 to-ocean-600/10 p-2.5 sm:p-3 text-ocean-400 ring-1 ring-ocean-500/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 sm:h-7 sm:w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">{cert.name}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-white/60 line-clamp-2">{cert.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-navy-700/30 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-white/40">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-red-400/60">
                        <path d="M4 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1zm2 3v2h4V4H6zm0 3v1h4V7H6z" />
                      </svg>
                      PDF
                    </span>
                    <button
                      type="button"
                      onClick={() => alert('준비 중입니다')}
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-gold-500/30 bg-gold-500/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gold-400 transition-all duration-300 hover:border-gold-500/60 hover:bg-gold-500/10 hover:shadow-lg hover:shadow-gold-500/5"
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

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
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
                <div className="p-4 sm:p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">방사능 검사</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/60">
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
                <div className="p-4 sm:p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">이물 관리</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/60">
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
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">AI 엑스레이 검출</h3>
                  <p className="mb-4 flex-1 text-xs sm:text-sm leading-relaxed text-white/60">
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

          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
            {[
              { image: '/images/facility/raw-material-label.jpg', caption: '원료 식별표시' },
              { image: '/images/facility/raw-material-label-2.jpg', caption: '원료 관리' },
              { image: '/images/facility/cold-storage-boxes.jpg', caption: '냉동 보관' },
              { image: '/images/facility/cold-storage-detail.jpg', caption: '선내급속냉동' },
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
                  <div className="p-2 sm:p-4">
                    <p className="text-xs sm:text-sm font-medium text-white/60 truncate">{photo.caption}</p>
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

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
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
