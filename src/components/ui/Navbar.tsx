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
  { label: '회사소개', href: '/about' },
  { label: '생산공정', href: '/process' },
  { label: '기술·설비', href: '/technology' },
  { label: '품질·인증', href: '/certification' },
  { label: '비전', href: '/vision' },
  { label: '제품', href: '/products' },
  { label: '자료실', href: '/resources' },
  { label: '소식', href: '/news' },
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
    ? 'bg-navy-900/95 backdrop-blur-md shadow-lg'
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
          background: 'linear-gradient(to right, var(--color-gold-400), var(--color-gold-500))',
          transition: 'width 50ms linear',
          opacity: scrollProgress > 0 ? 1 : 0,
        }}
      />
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-500 ${
        isExpanded ? 'py-5' : 'py-3'
      }`}>
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
            <span className={`font-bold tracking-wide text-white transition-all duration-500 ${
              isExpanded ? 'text-xl' : 'text-lg'
            }`}>
              서풍
            </span>
            <span className={`text-gold-400/80 font-medium transition-all duration-500 overflow-hidden ${
              isExpanded ? 'text-xs max-h-6 opacity-100' : 'text-[0px] max-h-0 opacity-0'
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
                  after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-3/4
                  ${pathname === item.href
                    ? 'text-gold-400 after:w-3/4'
                    : 'text-white/80 hover:text-gold-400'
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="메뉴 열기"
        >
          <span
            className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-white transition-all duration-300 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
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
            'linear-gradient(to right, transparent, var(--color-gold-500), transparent)',
        }}
      />

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
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
              className={`py-3 text-2xl font-medium transition-all duration-300 ${
                pathname === item.href ? 'text-gold-400' : 'text-white/80 hover:text-gold-400'
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
        </div>
      </div>
    </header>
  );
}
