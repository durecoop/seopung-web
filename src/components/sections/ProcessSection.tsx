'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  image: string;
}

const STEPS: ProcessStep[] = [
  {
    number: 1,
    title: '원료 입고',
    description: '당일 수매한 신선 원료를 즉시 공장으로 입고합니다',
    image: '/images/process/01-raw-material.jpg',
  },
  {
    number: 2,
    title: '손질·가공',
    description: '숙련된 기술자의 수작업과 어류 스캔 자동절단기로 정밀 가공합니다',
    image: '/images/process/02-cutting-machine.jpg',
  },
  {
    number: 3,
    title: '세척·염장',
    description: '깨끗한 세척과 정확한 소금 간으로 최적의 맛을 만듭니다',
    image: '/images/process/03-salting.jpg',
  },
  {
    number: 4,
    title: '급속동결',
    description: '터널프리저(IQF)를 통해 -40\u00B0C에서 급속동결하여 신선도를 유지합니다',
    image: '/images/process/04-tunnel-freezer.jpg',
  },
  {
    number: 5,
    title: '자동포장',
    description: '로터리 포장기와 진공포장기로 위생적으로 포장합니다',
    image: '/images/process/05-rotary-packer.jpg',
  },
  {
    number: 6,
    title: '냉동보관',
    description: '체계적인 냉동창고에서 출하까지 완벽하게 관리합니다',
    image: '/images/process/06-cold-storage.jpg',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay ?? '0';
            setTimeout(() => {
              el.classList.add('active');
            }, Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-900 py-24 md:py-32"
    >
      {/* Subtle background accents */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 80% 20%, rgba(200,164,92,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div data-reveal className="reveal mb-16 text-center md:mb-24">
          <h2 className="gold-line mb-4 inline-block font-montserrat text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            생산 공정
          </h2>
          <p className="mt-6 text-lg font-light tracking-wide text-ocean-300 md:text-xl">
            원물에서 완제품까지, One-Way 생산라인
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical connecting line (mobile) */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/60 via-gold-500/30 to-gold-500/10 md:hidden" />

          {/* Desktop grid */}
          <div className="grid gap-16 md:gap-0">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const bgColor = isEven ? 'bg-navy-950' : 'bg-navy-900/80';

              return (
                <div
                  key={step.number}
                  data-reveal
                  data-reveal-delay={String(index * 120)}
                  className="reveal relative"
                >
                  {/* Desktop layout */}
                  <div className="hidden md:block">
                    {/* Horizontal connecting line between steps */}
                    {index < STEPS.length - 1 && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{ top: '100%', width: '1px', height: '48px' }}
                      >
                        <div className="h-full w-full bg-gradient-to-b from-gold-500/50 to-gold-500/20" />
                      </div>
                    )}

                    <div
                      className={`group relative grid grid-cols-2 items-center gap-0 overflow-hidden rounded-2xl ${bgColor}`}
                    >
                      {/* Image side */}
                      <div
                        className={`relative aspect-[16/10] overflow-hidden ${
                          isEven ? 'order-1' : 'order-2'
                        }`}
                      >
                        <Image
                          src={getImagePath(step.image)}
                          alt={step.title}
                          fill
                          sizes="50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 ${
                            isEven
                              ? 'bg-gradient-to-r from-transparent to-navy-950/40'
                              : 'bg-gradient-to-l from-transparent to-navy-900/40'
                          }`}
                        />
                      </div>

                      {/* Content side */}
                      <div
                        className={`flex flex-col justify-center p-10 lg:p-14 ${
                          isEven ? 'order-2' : 'order-1'
                        }`}
                      >
                        {/* Step number */}
                        <div className="mb-6 flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-500/10">
                            <span className="font-montserrat text-lg font-bold text-gold-400">
                              {String(step.number).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
                        </div>

                        <h3 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
                          {step.title}
                        </h3>
                        <p className="text-base leading-relaxed text-white/60 lg:text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden">
                    <div className="ml-14 overflow-hidden rounded-xl">
                      {/* Step number (positioned on the timeline) */}
                      <div className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-950">
                        <span className="font-montserrat text-sm font-bold text-gold-400">
                          {String(step.number).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Card */}
                      <div className={`overflow-hidden rounded-xl ${bgColor}`}>
                        {/* Image */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <Image
                            src={getImagePath(step.image)}
                            alt={step.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                        </div>

                        {/* Text */}
                        <div className="p-5">
                          <h3 className="mb-2 text-lg font-bold text-white">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-white/60">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
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
