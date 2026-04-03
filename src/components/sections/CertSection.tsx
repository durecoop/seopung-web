'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';

const CERT_BADGES = [
  { name: 'HACCP', icon: '/images/certs/haccp.png', desc: '식품안전관리인증', detail: '위해요소 중점관리 기준 적합' },
  { name: 'ASC', icon: '/images/certs/asc.svg', desc: '양식수산물 국제인증', detail: '책임있는 양식 수산물 공급' },
  { name: 'MSC', icon: '/images/certs/msc.png', desc: '지속가능어업 국제인증', detail: '지속가능한 어업 자원 관리' },
  { name: '수산물이력추적', icon: '/images/certs/traceability.png', desc: '원산지 추적관리', detail: '생산부터 유통까지 완벽 추적' },
  { name: '수산물품질인증', icon: '/images/certs/quality.png', desc: '국가품질인증', detail: '대한민국 국가 품질 인증 획득' },
  { name: 'ISO 22000', icon: '/images/certs/iso22000.png', desc: '식품안전경영시스템', detail: '국제 식품안전 경영 시스템' },
];

export default function CertSection() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-ocean-600 py-24 md:py-32">
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
            {CERT_BADGES.map((cert) => (
              <div key={cert.name} className="group flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-8 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 md:px-8 md:py-10">
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
              인증 현황 자세히 보기 <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
