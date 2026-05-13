'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/utils';
import type { SiteTheme } from '@/lib/themes';
import { COMPANY, AFFILIATES as AFFILIATE_CONFIG, hasValue } from '@/lib/company-config';

const CERTS = ['HACCP', 'ASC', 'MSC', '수산물이력추적', '수산물품질인증', 'ISO 22000'];
const LINKS = [
  { label: '품질·인증', href: '/certification' }, { label: '회사소개', href: '/about' },
  { label: '생산공정', href: '/process' }, { label: '기술·설비', href: '/technology' },
  { label: 'OEM 제품', href: '/products' }, { label: 'OEM 사례', href: '/case-studies' },
  { label: '샘플 요청', href: '/sample-request' }, { label: '스펙 다운로드', href: '/specs' },
  { label: '문의', href: '/contact' },
];
const AFFILIATES = AFFILIATE_CONFIG.length > 0 ? AFFILIATE_CONFIG.map((a) => a.name) : [COMPANY.name];

export default function ThemedFooter({ theme: t }: { theme: SiteTheme }) {
  return (
    <footer className={t.footerBg}>
      <div className="border-b border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CERTS.map((c) => (
              <span key={c} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-montserrat text-[11px] font-semibold tracking-wide text-white/80">{c}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/90">
                <Image src={getImagePath('/images/logo.png')} alt="서풍 로고" fill className="scale-[1.75] object-contain" />
              </div>
              <span className={`text-lg font-bold ${t.footerText}`}>{COMPANY.shortName}</span>
            </div>
            <p className={`max-w-xs text-sm leading-relaxed ${t.footerMuted}`}>{COMPANY.tagline}. {COMPANY.description}</p>
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
              {hasValue(COMPANY.email) && <li className="py-1">{COMPANY.email}</li>}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className={`text-center text-xs ${t.footerMuted}`}>Copyright &copy; 2026 {COMPANY.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
