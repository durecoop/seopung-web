'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils';
// Note: SourcingSection uses data-reveal/CSS .reveal pattern (not useReveal hook)
// because it needs staggered delays via data-reveal-delay attributes.

interface FishItem {
  image: string;
  label: string;
}

const FISH_ITEMS: FishItem[] = [
  { image: '/images/auction/mackerel-large.jpg', label: '대삼치' },
  { image: '/images/auction/sea-bream.jpg', label: '참돔' },
  { image: '/images/auction/won-mackerel.jpg', label: '낙찰 대삼치' },
];

export default function SourcingSection() {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sourcing"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-24 md:py-32"
    >
      {/* Subtle background gradient accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(30,106,161,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div data-reveal className="reveal mb-16 text-center md:mb-20">
          <h2 className="gold-line mb-4 inline-block font-montserrat text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            원료 수매
          </h2>
          <p className="mt-6 text-lg font-light tracking-wide text-ocean-300 md:text-xl">
            새벽 4시, 서풍의 하루가 시작됩니다
          </p>
        </div>

        {/* Split layout: image + text */}
        <div className="mb-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Director image */}
          <div
            data-reveal
            data-reveal-delay="100"
            className="reveal group relative overflow-hidden rounded-2xl"
          >
            <div className="aspect-[4/3] w-full">
              <Image
                src={getImagePath('/images/auction/director-inspect.jpg')}
                alt="49호 중매인 대표가 새벽 위판장에서 원료를 직접 확인하는 모습"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            </div>
            {/* Caption badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-navy-900/80 px-4 py-2 backdrop-blur-sm">
              <span className="font-montserrat text-sm font-bold text-gold-400">49</span>
              <span className="text-sm text-white/80">호 중매인</span>
            </div>
          </div>

          {/* Right: Text content */}
          <div
            data-reveal
            data-reveal-delay="250"
            className="reveal"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold-500/60 to-transparent" />
            </div>
            <p className="text-lg leading-relaxed text-white/85 md:text-xl md:leading-relaxed">
              <span className="font-semibold text-gold-400">49호 중매인</span>으로서
              30년 이상의 경험을 바탕으로 새벽 위판장에서 직접 원료를 확인하고 수매합니다.
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg md:leading-relaxed">
              참조기, 삼치, 오징어, 갈치, 고등어, 아귀, 방어, 달고기, 붕장어 등
              다양한 어종을 취급합니다.
            </p>
            {/* Decorative stat */}
            <div className="mt-10 flex gap-8">
              <div>
                <span className="font-montserrat text-3xl font-bold text-gold-500">30+</span>
                <p className="mt-1 text-sm text-white/60">년 경력</p>
              </div>
              <div className="h-12 w-px bg-navy-700" />
              <div>
                <span className="font-montserrat text-3xl font-bold text-gold-500">9+</span>
                <p className="mt-1 text-sm text-white/60">주요 어종</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fish type grid */}
        <div className="grid gap-6 sm:grid-cols-3 md:gap-8">
          {FISH_ITEMS.map((item, index) => (
            <div
              key={item.label}
              data-reveal
              data-reveal-delay={String(400 + index * 150)}
              className="reveal group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-[3/2] w-full">
                <Image
                  src={getImagePath(item.image)}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
              </div>
              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                <div className="mt-1 h-0.5 w-8 bg-gold-500 transition-all duration-500 group-hover:w-12" />
              </div>
              {/* Hover border */}
              <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/0 transition-colors duration-500 group-hover:border-gold-500/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
