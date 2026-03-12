'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';
import { getImagePath } from '@/lib/utils';

/* ──────────────────────────────────────────────
   Bottom gallery items
   ────────────────────────────────────────────── */
const GALLERY = [
  { src: '/images/team/office-team.jpg', caption: '본사 경영지원팀' },
  { src: '/images/team/auction-team.jpg', caption: '수산시장 매입팀' },
  { src: '/images/team/factory-team-2.jpg', caption: '생산 현장팀' },
] as const;

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function TeamSection() {
  const header = useReveal<HTMLDivElement>();
  const hero = useReveal<HTMLDivElement>();
  const interview = useReveal<HTMLDivElement>();
  const gallery = useReveal<HTMLDivElement>();

  return (
    <section id="team" className="relative bg-navy-900 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Header ── */}
        <div
          ref={header.ref}
          className={`mb-16 text-center transition-all duration-700 ${
            header.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="gold-line mb-4 inline-block text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            서풍을 만드는 사람들
          </h2>
          <p className="mt-6 text-base text-white/60 md:text-lg">
            현장의 열정과 전문성이 만드는 품질
          </p>
        </div>

        {/* ── Featured Team Photo ── */}
        <div
          ref={hero.ref}
          className={`relative mb-16 overflow-hidden rounded-2xl transition-all duration-700 delay-200 ${
            hero.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative aspect-[21/9] w-full md:aspect-[21/8]">
            <Image
              src={getImagePath('/images/team/factory-team.jpg')}
              alt="서풍 공장 팀 단체사진"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
              <p className="mb-2 font-montserrat text-sm font-medium uppercase tracking-widest text-gold-400/80">
                Our Team
              </p>
              <h3 className="text-xl font-bold leading-snug text-white md:text-3xl">
                수산 가공의 전 과정을
                <br />
                책임지는 전문가들
              </h3>
            </div>
          </div>
        </div>

        {/* ── Director Interview ── */}
        <div
          ref={interview.ref}
          className={`mb-16 grid items-center gap-8 md:grid-cols-2 md:gap-12 transition-all duration-700 delay-200 ${
            interview.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Photo */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/5] w-full md:aspect-[3/4]">
              <Image
                src={getImagePath('/images/team/director-interview-1.jpg')}
                alt="김태환 상무 인터뷰"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 640px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>
          </div>

          {/* Quote */}
          <div className="flex flex-col justify-center">
            <svg
              className="mb-4 h-10 w-10 text-gold-500/30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
            </svg>
            <blockquote className="mb-6 text-xl leading-relaxed text-white/80 md:text-2xl lg:text-3xl">
              매출 성장을 현장과 품질에 환원하는
              <br />
              <span className="text-gold-400">선순환 재투자 경영</span>을 실천합니다
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold-500/40" />
              <div>
                <p className="text-base font-semibold text-white">김태환 상무</p>
                <p className="text-sm text-white/60">경영총괄</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Gallery ── */}
        <div
          ref={gallery.ref}
          className={`grid gap-4 sm:grid-cols-3 transition-all duration-700 delay-300 ${
            gallery.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {GALLERY.map((img, i) => (
            <div
              key={img.src}
              className="group relative overflow-hidden rounded-xl"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={getImagePath(img.src)}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-medium text-white/80">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
