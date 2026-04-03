'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * 5. 대담한 타이포 — 초대형 "서풍" + 배경 바다 영상 + 글로우 효과
 */
export default function HeroTextClip() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 300); }, []);

  const scrollDown = useCallback(() => {
    document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#020a18]">
      {/* Video background — full screen */}
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-40">
        <source src="/videos/ocean2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020a18]/70 via-[#020a18]/40 to-[#020a18]/80" />

      {/* Giant background text — decorative */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          className={`font-black leading-none tracking-tighter transition-all duration-[2000ms] ${
            ready ? 'opacity-[0.06] scale-100' : 'opacity-0 scale-110'
          }`}
          style={{ fontSize: 'min(50vw, 500px)', color: 'white' }}
        >
          서풍
        </span>
      </div>

      {/* Glow behind main text */}
      <div className="absolute left-1/2 top-[38%] h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/20 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Top label */}
        <div className={`mb-6 transition-all duration-1000 ${ready ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-3">
            <div className="h-[2px] w-12 bg-ocean-400" />
            <span className="font-montserrat text-base font-bold uppercase tracking-[0.4em] text-ocean-400">
              Fearless Pioneer
            </span>
            <div className="h-[2px] w-12 bg-ocean-400" />
          </div>
        </div>

        {/* Main title — giant, glowing */}
        <div className={`text-center transition-all duration-1000 delay-200 ${ready ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <h1
            className="text-8xl font-black leading-[0.9] tracking-tight sm:text-9xl md:text-[11rem] lg:text-[14rem]"
            style={{ filter: 'drop-shadow(0 0 80px rgba(92,200,224,0.3))' }}
          >
            <span className="bg-gradient-to-b from-white via-ocean-200 to-ocean-400 bg-clip-text text-transparent">
              서풍
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`mt-6 text-center transition-all duration-1000 delay-400 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            바다를 <span className="text-ocean-300">개척하는 힘</span>
          </p>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60 md:text-xl">
            30년간 멈추지 않은 도전, 6대 국제 인증으로 증명하다
            <br className="hidden md:block" />
            대한민국 No.1 수산 OEM, 영어조합법인 서풍
          </p>
        </div>

        {/* CTA */}
        <div className={`mt-10 flex flex-col items-center gap-4 sm:flex-row transition-all duration-1000 delay-600 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Link href="/products" className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-xl font-black text-[#020a18] shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20">
            제품 보기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
          </Link>
          <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-10 py-5 text-xl font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105">
            문의하기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
          </Link>
        </div>

        <button onClick={scrollDown} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-white" aria-label="아래로 스크롤">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </section>
  );
}
