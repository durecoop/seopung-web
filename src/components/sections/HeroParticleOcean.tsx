'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

/**
 * 2. 파티클 오션 — 폭풍우 속 빠르게 움직이는 파티클 + 에너지 버스트
 */
export default function HeroParticleOcean() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number; speed: number; trail: { x: number; y: number }[] }[] = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const init = () => {
      resize();
      particles.length = 0;
      const count = Math.floor((w * h) / 2500);
      for (let i = 0; i < count; i++) {
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.3) * speed * 2,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 3 + 0.5,
          o: Math.random() * 0.7 + 0.3,
          speed,
          trail: [],
        });
      }
    };

    let time = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(3, 10, 25, 0.15)';
      ctx.fillRect(0, 0, w, h);
      time += 0.02;

      for (const p of particles) {
        // Store trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        // Wind + turbulence
        p.x += p.vx + Math.sin(time * 2 + p.y * 0.01) * 1.5;
        p.y += p.vy + Math.cos(time * 1.5 + p.x * 0.01) * 0.8;

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 3;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (const t of p.trail) ctx.lineTo(t.x, t.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(92, 200, 224, ${p.o * 0.3})`;
          ctx.lineWidth = p.r * 0.5;
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const pulse = 0.5 + Math.sin(time * 3 + p.x * 0.01) * 0.5;
        ctx.fillStyle = `rgba(92, 200, 224, ${p.o * pulse})`;
        ctx.fill();
      }

      // Energy connections (closer = brighter)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = dx * dx + dy * dy;
          if (d < 8000) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 161, 196, ${0.4 * (1 - d / 8000)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Center energy burst
      const burstR = 100 + Math.sin(time * 1.5) * 50;
      const grd = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, burstR);
      grd.addColorStop(0, `rgba(14, 116, 144, ${0.1 + Math.sin(time) * 0.05})`);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(w / 2 - burstR, h / 2 - burstR, burstR * 2, burstR * 2);

      animId = requestAnimationFrame(draw);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    init();
    draw();
    window.addEventListener('resize', init);
    canvas.addEventListener('mousemove', handleMouse);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const scrollDown = useCallback(() => {
    document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#030a19]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Dramatic glows */}
      <div className="absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-ocean-500/15 blur-[150px] animate-pulse" />
      <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-ocean-400/30 bg-ocean-500/10 px-6 py-2 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-300" />
            </span>
            <span className="font-montserrat text-sm font-bold uppercase tracking-[0.3em] text-ocean-300">
              Disrupt &middot; Innovate &middot; Lead
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-black leading-[1.1] text-white sm:text-5xl md:text-7xl lg:text-8xl">
            모든 연결이
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-ocean-300 to-white bg-clip-text text-transparent">
              혁신이 되는 순간
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl font-medium text-white/75 md:text-2xl">
            기술과 데이터로 수산업의 경계를 허물다
            <br className="hidden md:block" />
            마우스를 움직여보세요 — 파티클이 반응합니다
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/products" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ocean-500 to-cyan-500 px-10 py-5 text-xl font-black text-white shadow-2xl shadow-ocean-500/30 transition-all duration-300 hover:scale-105 hover:shadow-ocean-500/50">
              제품 보기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full border-2 border-ocean-400/50 bg-ocean-500/10 px-10 py-5 text-xl font-bold text-ocean-300 backdrop-blur-sm transition-all duration-300 hover:border-ocean-300 hover:bg-ocean-500/20 hover:scale-105">
              문의하기 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </Link>
          </div>
        </div>
        <button onClick={scrollDown} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-white" aria-label="아래로 스크롤">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </section>
  );
}
