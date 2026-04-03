'use client';

import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * 3. 동영상 배경 — 실제 바다 영상 + 글리치/에너지 효과
 */
export default function HeroVideo() {
  const [loaded, setLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const videos = ['/videos/ocean1.mp4', '/videos/ocean2.mp4'];

  // Force loaded after short delay (fallback if video onLoadedData doesn't fire)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % videos.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [videos.length]);

  const scrollDown = useCallback(() => {
    document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#020810]">
      {/* Video backgrounds with crossfade */}
      {videos.map((src, i) => (
        <video
          key={src}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => i === 0 && setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
            i === activeVideo ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Dramatic dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020810]/60 via-[#020810]/30 to-ocean-600/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020810]/70 via-transparent to-[#020810]/50" />

      {/* Animated horizontal lines (energy) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[15, 35, 55, 75, 85].map((top, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${top}%`,
              background: 'linear-gradient(90deg, transparent, rgba(92,200,224,0.3), transparent)',
              animation: `scanLine ${3 + i}s ${i * 0.5}s linear infinite`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className={`text-center transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Live indicator */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-400" />
            </span>
            <span className="font-montserrat text-sm font-bold uppercase tracking-wider text-white/90">
              Since 1995 &mdash; Never Stop
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-7xl lg:text-8xl">
            파도가 높을수록
            <br />
            <span className="text-ocean-300" style={{ textShadow: '0 0 40px rgba(92,200,224,0.5)' }}>
              더 강해진다
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl font-medium text-white/80 md:text-2xl">
            30년간 거친 바다에서 단련된 도전의 DNA
            <br className="hidden md:block" />
            대한민국 No.1 수산 OEM, 영어조합법인 서풍
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/products" className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-xl font-black text-[#020810] shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/30">
              제품 보기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/5 px-10 py-5 text-xl font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/15 hover:scale-105">
              문의하기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Video indicator dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveVideo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeVideo ? 'w-8 bg-white' : 'w-3 bg-white/30'
              }`}
              aria-label={`영상 ${i + 1}`}
            />
          ))}
        </div>

        <button onClick={scrollDown} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 hover:text-white" aria-label="아래로 스크롤">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
