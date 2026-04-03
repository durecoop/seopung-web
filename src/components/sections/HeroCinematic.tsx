'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * 4. 시네마틱 분할 — 좌측 거대 텍스트 + 우측 바다 영상
 */
export default function HeroCinematic() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 300); }, []);

  const scrollDown = useCallback(() => {
    document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#020a18]">
      {/* Right side — video */}
      <div className="absolute right-0 top-0 h-full w-full md:w-[55%]">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src="/videos/ocean1.mp4" type="video/mp4" />
        </video>
        {/* Gradient fade to left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020a18] via-[#020a18]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a18]/80 via-transparent to-[#020a18]/40" />
      </div>

      {/* Diagonal divider */}
      <div className="absolute inset-0 hidden md:block">
        <svg className="absolute left-[40%] top-0 h-full w-32" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,0 30,100 0,100" fill="#020a18" opacity="0.6" />
        </svg>
      </div>

      {/* Left content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20">
        <div className={`max-w-2xl transition-all duration-1000 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {/* Year badge */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-ocean-400" />
            <span className="font-montserrat text-base font-bold uppercase tracking-[0.4em] text-ocean-400">
              Est. 1995
            </span>
          </div>

          <h1 className="mb-8 text-5xl font-black leading-[1.0] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            도전이
            <br />
            곧
            <br />
            <span className="bg-gradient-to-r from-ocean-300 to-cyan-300 bg-clip-text text-transparent">
              서풍이다
            </span>
          </h1>

          <p className={`mb-10 max-w-lg text-xl text-white/70 md:text-2xl transition-all duration-1000 delay-300 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            거친 바다 위에서 30년,
            <br />
            134개 품목으로 증명한 대한민국 No.1 수산 OEM
          </p>

          <div className={`flex flex-col gap-4 sm:flex-row transition-all duration-1000 delay-500 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link href="/products" className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-xl font-black text-[#020a18] shadow-2xl transition-all duration-300 hover:scale-105">
              제품 보기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-10 py-5 text-xl font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105">
              문의하기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
          </div>

          {/* Stats row */}
          <div className={`mt-12 flex gap-8 transition-all duration-1000 delay-700 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {[
              { num: '400억+', label: '연 매출' },
              { num: '134+', label: '개발 품목' },
              { num: '6대', label: '국제 인증' },
            ].map((s) => (
              <div key={s.label}>
                <span className="block font-montserrat text-3xl font-black text-ocean-300 md:text-4xl">{s.num}</span>
                <span className="text-sm text-white/50">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={scrollDown} className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white/50 hover:text-white" aria-label="아래로 스크롤">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
    </section>
  );
}
