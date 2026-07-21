'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';
import type { SiteTheme } from '@/lib/themes';
import { COMPANY, AFFILIATES as AFFILIATE_CONFIG, hasValue } from '@/lib/company-config';
import VisitorCounter from '@/components/ui/VisitorCounter';

const CERTS = ['HACCP', 'ASC', 'MSC', '수산물이력제', '수산물품질인증'];
const LINKS = [
  { label: '품질·인증', href: '/certification' }, { label: '회사소개', href: '/about' },
  { label: '생산공정', href: '/process' }, { label: '기술·설비', href: '/technology' },
  { label: 'OEM 제품', href: '/products' }, { label: 'OEM 사례', href: '/case-studies' },
  { label: '샘플 요청', href: '/sample-request' }, { label: '스펙 다운로드', href: '/specs' },
  { label: '문의', href: '/contact' },
];
const AFFILIATES = AFFILIATE_CONFIG.length > 0 ? AFFILIATE_CONFIG.map((a) => a.name) : [COMPANY.name];

const SHOP_URL = 'https://shop.seopung.co.kr';

export default function ThemedFooter({ theme: t }: { theme: SiteTheme }) {
  return (
    <footer className={t.footerBg}>
      <div className="border-b border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {CERTS.map((c) => (
              <span key={c} className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-montserrat text-xs font-semibold tracking-wide text-white/85 sm:text-sm">{c}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 grid-cols-2 md:grid-cols-4 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/90">
                <Image src={getImagePath('/images/logo.png')} alt="서풍 로고" fill className="scale-[1.75] object-contain" />
              </div>
              <span className={`text-lg font-bold ${t.footerText}`}>{COMPANY.shortName}</span>
            </div>
            <p className={`max-w-xs text-sm leading-relaxed ${t.footerMuted}`}>{COMPANY.tagline}. {COMPANY.description}</p>
            {/* 외부 링크 — 쇼핑몰 */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="서풍몰 쇼핑몰"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 transition-all hover:border-white/60 hover:bg-white/20 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                서풍몰 SHOP
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-300">바로가기</h4>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className={`inline-block py-1 text-sm ${t.footerMuted} transition-colors hover:text-white`}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-300">관계사</h4>
            <ul className="space-y-2.5">{AFFILIATES.map((n) => (<li key={n} className={`py-1 text-sm ${t.footerMuted}`}>{n}</li>))}</ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ocean-300">연락처</h4>
            <ul className={`space-y-2.5 text-sm ${t.footerMuted}`}>
              <li className="py-1">{COMPANY.address}</li>
              {hasValue(COMPANY.phone) && <li className="py-1">{COMPANY.phone}</li>}
              <li className="py-1 break-all">{COMPANY.inquiryEmail}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-5 sm:flex-row sm:justify-between">
          <p className={`text-center text-sm ${t.footerMuted}`}>Copyright &copy; 2026 {COMPANY.name}. All rights reserved.</p>
          <VisitorCounter className={`text-xs ${t.footerMuted}`} />
        </div>
      </div>
    </footer>
  );
}
