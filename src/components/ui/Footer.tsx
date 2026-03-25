'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';

const AFFILIATES = [
  '영어조합법인 서풍',
  '㈜여수유통',
  '㈜대주냉장',
  '중매인 49호',
];

const CERTIFICATIONS = [
  'HACCP',
  'ASC',
  'MSC',
  '수산물이력추적',
  '수산물품질인증',
];

const QUICK_LINKS = [
  { label: '회사소개', href: '/about' },
  { label: '생산공정', href: '/process' },
  { label: '기술·설비', href: '/technology' },
  { label: '품질·인증', href: '/certification' },
  { label: '제품', href: '/products' },
  { label: '문의', href: '/contact' },
];

const CROSS_LINKS = [
  { label: '서풍몰 쇼핑하기', href: 'https://shop.seopung.co.kr', icon: '🛒' },
  { label: '쇼핑몰 관리자', href: 'https://shop.seopung.co.kr/admin', icon: '⚙' },
  { label: '홈페이지 관리자', href: '/admin', icon: '🔑', internal: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950">
      {/* Gold accent divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-gold-500), transparent)',
        }}
      />

      {/* Certification badges row */}
      <div className="border-b border-navy-800/60 bg-navy-900/30 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-navy-600/40 bg-navy-800/30 px-4 py-1.5 font-montserrat text-[11px] font-semibold tracking-wide text-white/50"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/90">
                <Image
                  src={getImagePath('/images/logo.png')}
                  alt="서풍 로고"
                  fill
                  className="scale-[1.75] object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">서풍</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              지속가능한 바다, 책임 있는 먹거리의 약속
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-700/50 bg-navy-800/40 text-white/40 transition-all duration-300 hover:border-gold-500/40 hover:text-gold-400"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-700/50 bg-navy-800/40 text-white/40 transition-all duration-300 hover:border-gold-500/40 hover:text-gold-400"
                aria-label="블로그"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400/60">
              바로가기
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-white/50 transition-colors duration-300 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Affiliates */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400/60">
              관계사
            </h4>
            <ul className="space-y-2.5">
              {AFFILIATES.map((name) => (
                <li key={name} className="py-1 text-sm text-white/50">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact + Cross Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400/60">
              연락처
            </h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li className="py-1">전라남도 여수시 석교로 121</li>
              <li className="py-1">061-XXX-XXXX</li>
              <li className="py-1">seopung@example.com</li>
            </ul>

            <h4 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400/60">
              바로가기
            </h4>
            <ul className="space-y-2">
              {CROSS_LINKS.map((link) =>
                link.internal ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold-400"
                    >
                      <span className="text-xs">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold-400"
                    >
                      <span className="text-xs">{link.icon}</span>
                      {link.label}
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Gold accent divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-gold-500)/40, transparent)',
        }}
      />

      {/* Bottom bar */}
      <div className="border-t border-navy-800/60">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-center text-xs text-white/40">
            Copyright &copy; 2026 영어조합법인 서풍. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
