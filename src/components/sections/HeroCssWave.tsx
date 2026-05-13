'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

type Spray = { width: number; height: number; left: number; bottom: number; duration: number; delay: number };

/**
 * 1. CSS 파도 — 거대한 파도 + 번개 효과 + 강렬한 그라데이션
 */
export default function HeroCssWave() {
  const scrollDown = useCallback(() => {
    document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Spray particles: 마운트 후 클라이언트에서 한 번 생성 (렌더 중 Math.random 금지)
  const [sprayParticles, setSprayParticles] = useState<Spray[]>([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSprayParticles(
      Array.from({ length: 40 }).map(() => ({
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: Math.random() * 100,
        bottom: Math.random() * 40 + 5,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 3,
      })),
    );
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#020a18]">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020a18] via-[#0a2a4a] to-[#0e7490]" />

      {/* Lightning flash effect */}
      <div className="absolute inset-0 animate-flash opacity-0 bg-white/5" />

      {/* Large storm waves */}
      <div className="absolute bottom-0 left-0 w-[300%] h-[55%]">
        <svg viewBox="0 0 2160 500" className="absolute bottom-0 w-full h-full animate-stormWave1" preserveAspectRatio="none">
          <path fill="rgba(14,116,144,0.7)" d="M0,300 C180,200 360,350 540,280 C720,210 900,380 1080,300 C1260,220 1440,370 1620,290 C1800,210 1980,350 2160,280 L2160,500 L0,500Z"/>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-[300%] h-[50%]">
        <svg viewBox="0 0 2160 500" className="absolute bottom-0 w-full h-full animate-stormWave2" preserveAspectRatio="none">
          <path fill="rgba(26,107,138,0.8)" d="M0,320 C200,240 400,400 600,320 C800,240 1000,400 1200,310 C1400,220 1600,380 1800,300 C2000,220 2100,350 2160,310 L2160,500 L0,500Z"/>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-[300%] h-[45%]">
        <svg viewBox="0 0 2160 500" className="absolute bottom-0 w-full h-full animate-stormWave3" preserveAspectRatio="none">
          <path fill="rgba(5,40,70,0.9)" d="M0,350 C150,270 350,420 550,340 C750,260 950,430 1150,350 C1350,270 1550,410 1750,330 C1950,250 2060,400 2160,340 L2160,500 L0,500Z"/>
        </svg>
      </div>
      {/* Foam / spray */}
      <div className="absolute bottom-0 left-0 w-[300%] h-[35%]">
        <svg viewBox="0 0 2160 400" className="absolute bottom-0 w-full h-full animate-stormWave4" preserveAspectRatio="none">
          <path fill="rgba(92,200,224,0.3)" d="M0,320 C100,280 250,350 400,300 C550,250 700,340 850,290 C1000,240 1150,330 1300,280 C1450,230 1600,320 1750,270 C1900,220 2050,310 2160,280 L2160,400 L0,400Z"/>
        </svg>
      </div>

      {/* Spray particles */}
      <div className="pointer-events-none absolute inset-0">
        {sprayParticles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: p.width,
              height: p.height,
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              opacity: 0,
              animation: `sprayUp ${p.duration}s ${p.delay}s ease-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-ocean-400" />
            <span className="font-montserrat text-base font-bold uppercase tracking-[0.4em] text-ocean-300">
              Fearless Challenge
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-ocean-400" />
          </div>
          <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
            거친 파도를
            <br />
            <span className="bg-gradient-to-r from-ocean-300 via-cyan-300 to-white bg-clip-text text-transparent">
              가르며 전진하다
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl font-medium text-white/80 md:text-2xl">
            멈추지 않는 도전정신으로
            <br className="hidden md:block" />
            대한민국 수산업의 미래를 개척합니다
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/products" className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-xl font-black text-[#0a2a4a] shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105 hover:shadow-white/30">
              제품 보기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-10 py-5 text-xl font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-105">
              문의하기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
          </div>
        </div>
        <button onClick={scrollDown} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 hover:text-white" aria-label="아래로 스크롤">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes stormWave1 { 0% { transform: translateX(0); } 100% { transform: translateX(-66.67%); } }
        @keyframes stormWave2 { 0% { transform: translateX(-66.67%); } 100% { transform: translateX(0); } }
        @keyframes stormWave3 { 0% { transform: translateX(-33%); } 100% { transform: translateX(-100%); } }
        @keyframes stormWave4 { 0% { transform: translateX(-50%); } 100% { transform: translateX(-16%); } }
        @keyframes sprayUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-120px) scale(0); opacity: 0; }
        }
        @keyframes flash {
          0%, 94%, 100% { opacity: 0; }
          95% { opacity: 0.15; }
          96% { opacity: 0; }
          97% { opacity: 0.08; }
        }
        .animate-stormWave1 { animation: stormWave1 8s linear infinite; }
        .animate-stormWave2 { animation: stormWave2 6s linear infinite; }
        .animate-stormWave3 { animation: stormWave3 10s linear infinite; }
        .animate-stormWave4 { animation: stormWave4 4s linear infinite; }
        .animate-flash { animation: flash 8s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
