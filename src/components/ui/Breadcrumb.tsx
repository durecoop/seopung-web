'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PAGE_NAMES: Record<string, string> = {
  about: '회사소개',
  process: '생산공정',
  technology: '기술·설비',
  certification: '품질·인증',
  vision: '비전',
  products: '제품',
  gulbi: '영광굴비',
  resources: '자료실',
  news: '소식',
  contact: '문의',
  admin: '관리자',
};

interface BreadcrumbProps {
  items?: { label: string; href?: string }[];
  isDark?: boolean;
}

export default function Breadcrumb({ isDark = false }: BreadcrumbProps) {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const cleanSegments = segments.filter((s) => s !== 'Seopung');

  if (cleanSegments.length === 0) return null;

  return (
    <nav
      aria-label="브레드크럼"
      className="absolute left-0 right-0 top-16 z-40 mx-auto max-w-7xl px-6 py-3"
    >
      <ol className="flex items-center gap-2 text-xs md:text-sm">
        <li>
          <Link
            href="/"
            className="${isDark ? 'text-white/50 hover:text-white' : 'text-gray-600 hover:text-ocean-500'} transition-colors"
          >
            홈
          </Link>
        </li>
        {cleanSegments.map((segment, i) => {
          const href = '/' + cleanSegments.slice(0, i + 1).join('/');
          const isLast = i === cleanSegments.length - 1;
          const label = PAGE_NAMES[segment] || segment;

          return (
            <li key={href} className="flex items-center gap-2">
              <svg
                className={`h-3 w-3 ${isDark ? 'text-white/30' : 'text-gray-600'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {isLast ? (
                <span className="font-medium text-ocean-500">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="${isDark ? 'text-white/50 hover:text-white' : 'text-gray-600 hover:text-ocean-500'} transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
