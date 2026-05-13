'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getImagePath } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: '품질·인증', href: '/certification' },
  { label: '회사소개', href: '/about' },
  { label: '생산공정', href: '/process' },
  { label: '기술·설비', href: '/technology' },
  { label: 'OEM 제품', href: '/products' },
  { label: '문의', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isExpanded = isHome && !scrolled;

  const bgClass = !isExpanded
    ? 'bg-white/95 backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bgClass}`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] z-[60]"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(to right, var(--color-ocean-400), var(--color-ocean-500))',
          transition: 'width 50ms linear',
          opacity: scrollProgress > 0 ? 1 : 0,
        }}
      />
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-500 ${
        isExpanded ? 'py-5' : 'py-3'
      }`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-lg focus:bg-ocean-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white">
          본문으로 건너뛰기
        </a>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className={`relative overflow-hidden rounded-full bg-white shadow-lg transition-all duration-500 ${
            isExpanded ? 'h-16 w-16' : 'h-11 w-11'
          }`}>
            <Image
              src={getImagePath('/images/logo.png')}
              alt="서풍 로고"
              fill
              className="scale-[1.75] object-contain"
              priority
            />
          </div>
          <div className={`hidden transition-all duration-500 sm:flex flex-col ${
            isExpanded ? 'gap-0.5' : 'gap-0'
          }`}>
            <span className={`font-bold tracking-wide transition-all duration-500 ${
              isExpanded ? 'text-xl text-white' : 'text-lg text-gray-900'
            }`}>
              서풍
            </span>
            <span className={`font-medium transition-all duration-500 overflow-hidden ${
              isExpanded ? 'text-xs max-h-6 opacity-100 text-white/80' : 'text-[0px] max-h-0 opacity-0 text-ocean-500/80'
            }`}>
              No.1 수산 가공 파트너
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors
                  after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2
                  after:bg-ocean-500 after:transition-all after:duration-300 hover:after:w-3/4
                  ${pathname === item.href
                    ? (isExpanded ? 'text-ocean-300 after:w-3/4 after:bg-ocean-300' : 'text-ocean-500 after:w-3/4')
                    : (isExpanded ? 'text-white/90 hover:text-white after:bg-white' : 'text-gray-800 hover:text-ocean-500')
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://shop.seopung.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-lg bg-ocean-500 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-ocean-400"
            >
              쇼핑몰
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="메뉴 열기"
        >
          <span
            className={`h-0.5 w-6 rounded transition-all duration-300 ${
              isExpanded && !mobileOpen ? 'bg-white' : 'bg-gray-800'
            } ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-6 rounded transition-all duration-300 ${
              isExpanded && !mobileOpen ? 'bg-white' : 'bg-gray-800'
            } ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 rounded transition-all duration-300 ${
              isExpanded && !mobileOpen ? 'bg-white' : 'bg-gray-800'
            } ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Gold accent line */}
      <div
        className={`h-[1px] w-full transition-opacity duration-500 ${
          !isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-ocean-500), transparent)',
        }}
      />

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-xl sm:text-2xl font-medium transition-all duration-300 ${
                pathname === item.href ? 'text-ocean-500' : 'text-gray-800 hover:text-ocean-500'
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://shop.seopung.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-xl bg-ocean-500 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-ocean-400"
            style={{
              transitionDelay: mobileOpen ? `${NAV_ITEMS.length * 60}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            쇼핑몰 바로가기
          </a>
        </div>
      </div>
    </header>
  );
}
