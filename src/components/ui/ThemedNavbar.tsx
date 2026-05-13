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
  { label: '제품', href: '/products' },
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bgClass}`}>
      <div className="absolute top-0 left-0 h-[2px] z-[60]" style={{
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
          <div className="hidden sm:flex flex-col">
            <span className={`font-bold tracking-wide transition-all duration-500 ${isOverlay ? 'text-xl' : 'text-lg'} ${textClass}`}>서풍</span>
            <span className={`whitespace-nowrap font-medium transition-all duration-500 overflow-hidden ${isOverlay ? 'text-xs max-h-6 opacity-80' : 'text-[0px] max-h-0 opacity-0'} ${textClass}`}>
              No.1 수산 가공 파트너
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

        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden" aria-label="메뉴">
          <span className={`h-0.5 w-6 rounded ${hamburgerColor} transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 rounded ${hamburgerColor} transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 rounded ${hamburgerColor} transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      <div className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex h-full flex-col items-center justify-center gap-2">
          {NAV_ITEMS.map((item, i) => (
            <Link key={item.href} href={item.href} className="py-3 text-xl font-medium text-gray-800 hover:text-ocean-500"
              style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms', opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)' }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
