'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getImagePath } from '@/lib/utils';
import type { SiteTheme } from '@/lib/themes';

const NAV_ITEMS = [
  { label: '품질·인증', href: '/certification' },
  { label: '회사소개', href: '/about' },
  { label: '생산공정', href: '/process' },
  { label: '기술·설비', href: '/technology' },
  { label: 'OEM 제품', href: '/products' },
  { label: '문의', href: '/contact' },
];

export default function ThemedNavbar({ theme }: { theme: SiteTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((window.scrollY / docH) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isOverlay = isHome && !scrolled;
  const bgClass = scrolled ? theme.navBg : 'bg-transparent';
  const textClass = isOverlay ? theme.navHeroText : theme.navText;
  const hamburgerColor = isOverlay && !mobileOpen ? 'bg-white' : 'bg-gray-800';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${bgClass}`}>
        <div className="absolute top-0 left-0 h-[2px]" style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(to right, var(--color-ocean-400), var(--color-ocean-500))',
          transition: 'width 50ms linear',
          opacity: scrollProgress > 0 ? 1 : 0,
        }} />
        <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-500 ${isOverlay ? 'py-5' : 'py-3'}`}>
          <Link href="/" className="flex items-center gap-3">
            <div className={`relative overflow-hidden rounded-full bg-white shadow-lg transition-all duration-500 ${isOverlay ? 'h-16 w-16' : 'h-11 w-11'}`}>
              <Image src={getImagePath('/images/logo.png')} alt="서풍 로고" fill className="scale-[1.75] object-contain" priority />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-bold tracking-wide transition-all duration-500 ${isOverlay ? 'text-xl' : 'text-lg'} ${textClass}`}>서풍</span>
              <span className={`whitespace-nowrap font-medium transition-all duration-500 overflow-hidden ${isOverlay ? 'text-[11px] sm:text-xs max-h-6 opacity-80' : 'text-[11px] sm:text-xs max-h-5 opacity-70'} ${textClass}`}>
                <span className="sm:hidden">수산 가공 OEM</span>
                <span className="hidden sm:inline">No.1 수산 가공 파트너</span>
              </span>
            </div>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`relative px-4 py-2 text-base font-semibold transition-colors ${textClass} ${isOverlay ? 'hover:text-white' : 'hover:text-ocean-500'}`}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://shop.seopung.co.kr" target="_blank" rel="noopener noreferrer"
                className="ml-2 rounded-lg bg-ocean-500 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-ocean-400">
                쇼핑몰
              </a>
            </li>
          </ul>

          {/* 데스크탑용 햄버거 placeholder 공간 확보 */}
          <span className="h-11 w-11 lg:hidden" aria-hidden="true" />
        </nav>
      </header>

      {/* 햄버거 버튼 — header 밖, 최상위 z-index */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`fixed right-5 z-[90] flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden transition-[top] duration-500 ${isOverlay ? 'top-7' : 'top-4'}`}
        aria-label="메뉴"
        aria-expanded={mobileOpen}
      >
        <span className={`h-0.5 w-6 rounded ${hamburgerColor} transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`h-0.5 w-6 rounded ${hamburgerColor} transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
        <span className={`h-0.5 w-6 rounded ${hamburgerColor} transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {/* 모바일 메뉴 — header 밖, 햄버거 바로 아래 z-index */}
      <div
        className={`fixed inset-0 z-[80] overflow-y-auto bg-white/98 backdrop-blur-lg transition-opacity duration-500 lg:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-2 px-6 pb-12 pt-24">
          {NAV_ITEMS.map((item, i) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className="py-3 text-xl font-medium text-gray-800 transition-all duration-500 hover:text-ocean-500"
              style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms', opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)' }}>
              {item.label}
            </Link>
          ))}
          <a
            href="https://shop.seopung.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ocean-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-ocean-500/25 transition-all duration-500 hover:bg-ocean-600"
            style={{
              transitionDelay: mobileOpen ? `${NAV_ITEMS.length * 60}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            🛒 쇼핑몰 바로가기
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
