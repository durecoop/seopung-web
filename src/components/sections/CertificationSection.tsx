'use client';

import { useReveal } from '@/hooks/useReveal';

/* ───────────────────────── data ───────────────────────── */

interface Certification {
  name: string;
  year: string;
  description: string;
  comingSoon?: boolean;
  icon: 'shield' | 'check' | 'globe' | 'fish' | 'star' | 'award';
}

const CERTIFICATIONS: Certification[] = [
  {
    name: 'HACCP',
    year: '2008년 최초 인증',
    description: '전 식품유형',
    icon: 'shield',
  },
  {
    name: 'ASC',
    year: '2024년 인증',
    description: '책임 있는 양식 수산물 인증',
    icon: 'fish',
  },
  {
    name: 'MSC',
    year: '2024년 인증',
    description: '지속가능 어업 인증',
    icon: 'globe',
  },
  {
    name: '수산물 이력추적',
    year: '2013년',
    description: '전품목 확대 적용',
    icon: 'check',
  },
  {
    name: '수산물 품질인증',
    year: '',
    description: '품질 우수 수산물 인증',
    icon: 'star',
  },
  {
    name: 'FSSC 22000',
    year: '2026년 추진 예정',
    description: '글로벌 식품안전 인증',
    comingSoon: true,
    icon: 'award',
  },
];

interface TimelineItem {
  year: string;
  description: string;
}

const TIMELINE: TimelineItem[] = [
  { year: '2008', description: 'HACCP 최초 인증' },
  { year: '2011', description: 'HACCP 기반 품질위생관리 체계 안정화' },
  { year: '2013', description: '수산물 이력추적관리 시스템 도입' },
  { year: '2024', description: 'ASC & MSC 지속가능 수산물 인증' },
  { year: '2026', description: 'FSSC 22000 및 글로벌 HACCP 추진' },
];

/* ───────────────────────── icons ───────────────────────── */

function CertIcon({ type }: { type: Certification['icon'] }) {
  const cls = 'h-8 w-8 text-ocean-300';

  switch (type) {
    case 'shield':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'check':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case 'globe':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M2 12h20M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10c-2.5-3-4-6.5-4-10s1.5-7 4-10z" />
        </svg>
      );
    case 'fish':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c3-2 6-2 9 0-3 2-6 2-9 0zM12 12c-3-2-6-2-9 0 3 2 6 2 9 0zM3 12c1.5-3 4.5-6 9-6s7.5 3 9 6c-1.5 3-4.5 6-9 6s-7.5-3-9-6z" />
          <circle cx="17" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case 'star':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'award':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="9" r="6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l2 2 4-4" />
        </svg>
      );
  }
}

/* ───────────────────────── component ───────────────────────── */

export default function CertificationSection() {
  const section = useReveal<HTMLElement>();
  const cardsReveal = useReveal<HTMLDivElement>();
  const timeline = useReveal<HTMLDivElement>();

  const sectionRef = section.ref;
  const sectionVisible = section.visible;
  const cardsRef = cardsReveal.ref;
  const cardsVisible = cardsReveal.visible;
  const timelineRef = timeline.ref;
  const timelineVisible = timeline.visible;

  return (
    <section
      id="certification"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-900 py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ── Section header ── */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="gold-line mb-4 inline-block text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            품질 인증
          </h2>
          <p className="mt-6 text-base text-white/60 md:text-lg">
            글로벌 수준의 품질·위생 관리 체계
          </p>
        </div>

        {/* ── Certification cards (horizontal scroll) ── */}
        <div
          ref={cardsRef}
          className={`-mx-6 mb-20 transition-all duration-700 delay-200 ease-out ${
            cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ocean-500/30">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={cert.name}
                className="group relative flex min-w-[240px] max-w-[260px] shrink-0 flex-col items-center rounded-2xl border border-white/10 bg-navy-800/50 px-6 py-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-ocean-500/30 hover:shadow-[0_0_30px_-5px_rgba(30,106,161,0.25)]"
                style={{
                  transitionDelay: cardsVisible ? `${i * 100}ms` : '0ms',
                }}
              >
                {/* Coming soon badge */}
                {cert.comingSoon && (
                  <span className="absolute -top-3 right-4 rounded-full bg-gold-500 px-3 py-0.5 font-montserrat text-[10px] font-bold tracking-wider text-navy-950">
                    COMING SOON
                  </span>
                )}

                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-ocean-500/20 bg-ocean-500/10 transition-colors duration-300 group-hover:border-ocean-400/40 group-hover:bg-ocean-500/20">
                  <CertIcon type={cert.icon} />
                </div>

                {/* Name */}
                <h3 className="mb-1 text-lg font-bold text-white">{cert.name}</h3>

                {/* Year */}
                {cert.year && (
                  <span className="mb-2 font-montserrat text-xs font-medium text-ocean-300/80">
                    {cert.year}
                  </span>
                )}

                {/* Description */}
                <p className="text-sm text-white/60">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div
          ref={timelineRef}
          className={`transition-all duration-700 delay-300 ease-out ${
            timelineVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h3 className="mb-10 text-center text-lg font-semibold text-white/80 md:text-xl">
            품질 인증 연혁
          </h3>

          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-ocean-500/40 via-ocean-500/20 to-transparent md:left-1/2 md:-translate-x-px" />

            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative mb-10 flex items-start last:mb-0 ${
                    timelineVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  } transition-all duration-700 ease-out`}
                  style={{ transitionDelay: timelineVisible ? `${400 + i * 150}ms` : '0ms' }}
                >
                  {/* Dot */}
                  <div className="absolute left-6 top-1.5 z-10 -translate-x-1/2 md:left-1/2">
                    <div className="h-3 w-3 rounded-full border-2 border-ocean-400 bg-navy-900" />
                  </div>

                  {/* Content — mobile: always right; desktop: alternating */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft
                        ? 'md:pr-12 md:text-right'
                        : 'md:ml-auto md:pl-12 md:text-left'
                    }`}
                  >
                    <span className="font-montserrat text-xl font-bold text-ocean-300">
                      {item.year}
                    </span>
                    <p className="mt-1 text-sm text-white/60 md:text-base">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
