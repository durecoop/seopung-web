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
    <footer className="border-t border-gray-200 bg-gray-50">
      {/* Gold accent divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--color-ocean-500, #3b82f6), transparent)',
        }}
      />

      {/* Certification badges row */}
      <div className="border-b border-gray-200/60 bg-gray-100/30 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-gray-300/40 bg-gray-100/30 px-4 py-1.5 font-montserrat text-[11px] font-semibold tracking-wide text-gray-500"
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
              <span className="text-lg font-bold text-gray-900">서풍</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              지속가능한 바다, 책임 있는 먹거리의 약속
            </p>

            {/* Social links - add real URLs here when available */}
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-500/60">
              바로가기
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-gray-500 transition-colors duration-300 hover:text-ocean-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Affiliates */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-500/60">
              관계사
            </h4>
            <ul className="space-y-2.5">
              {AFFILIATES.map((name) => (
                <li key={name} className="py-1 text-sm text-gray-500">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact + Cross Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-500/60">
              연락처
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li className="py-1">전라남도 여수시 석교로 121</li>
              <li className="py-1">061-686-0508</li>
              <li className="py-1">seopung@naver.com</li>
            </ul>

            <h4 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-ocean-500/60">
              바로가기
            </h4>
            <ul className="space-y-2">
              {CROSS_LINKS.map((link) =>
                link.internal ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-ocean-500"
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
                      className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-ocean-500"
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
            'linear-gradient(to right, transparent, var(--color-ocean-500, #3b82f6)/40, transparent)',
        }}
      />

      {/* Bottom bar */}
      <div className="border-t border-gray-200/60">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-center text-xs text-gray-400">
            Copyright &copy; 2026 영어조합법인 서풍. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
