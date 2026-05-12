'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';
import { COMPANY, AFFILIATES as AFFILIATE_CONFIG, hasValue } from '@/lib/company-config';

const CERTIFICATIONS = [
  'HACCP',
  'ASC',
  'MSC',
  '수산물이력추적',
  '수산물품질인증',
  'ISO 22000',
];

const QUICK_LINKS = [
  { label: '회사소개', href: '/about' },
  { label: '생산공정', href: '/process' },
  { label: '기술·설비', href: '/technology' },
  { label: '품질·인증', href: '/certification' },
  { label: '제품', href: '/products' },
  { label: '문의', href: '/contact' },
];

const AFFILIATES = AFFILIATE_CONFIG.length > 0
  ? AFFILIATE_CONFIG.map((a) => a.name)
  : [COMPANY.name];

const CROSS_LINKS = [
  { label: '서풍몰 쇼핑하기', href: 'https://shop.seopung.co.kr', icon: '\uD83D\uDED2' },
  { label: '쇼핑몰 관리자', href: 'https://shop.seopung.co.kr/admin', icon: '\u2699' },
  { label: '홈페이지 관리자', href: '/admin', icon: '\uD83D\uDD11', internal: true },
];

export default function Footer() {
  return (
    <footer className="bg-ocean-600 text-white">
      {/* Certification badges row */}
      <div className="border-b border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-montserrat text-[11px] font-semibold tracking-wide text-white/80"
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
              <span className="text-lg font-bold text-white">{COMPANY.shortName}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/75">
              {COMPANY.tagline}.
              <br />
              {COMPANY.description}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-300">
              바로가기
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-white/75 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Affiliates */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-300">
              관계사
            </h4>
            <ul className="space-y-2.5">
              {AFFILIATES.map((name) => (
                <li key={name} className="py-1 text-sm text-white/75">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact + Cross Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-300">
              연락처
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li className="py-1">{COMPANY.address}</li>
              {hasValue(COMPANY.phone) && <li className="py-1">{COMPANY.phone}</li>}
              {hasValue(COMPANY.email) && <li className="py-1">{COMPANY.email}</li>}
            </ul>

            <h4 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-ocean-300">
              바로가기
            </h4>
            <ul className="space-y-2">
              {CROSS_LINKS.map((link) =>
                link.internal ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
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
                      className="inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
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

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-center text-xs text-white/65">
            Copyright &copy; 2026 {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
