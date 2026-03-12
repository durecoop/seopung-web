'use client';

import Image from 'next/image';
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

export default function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Col 1: Brand */}
          <div>
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
          </div>

          {/* Col 2: Affiliates */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              관계사
            </h4>
            <ul className="space-y-2">
              {AFFILIATES.map((name) => (
                <li key={name} className="text-sm text-white/60 transition-colors hover:text-white/60">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Certifications */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              인증
            </h4>
            <ul className="space-y-2">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert} className="text-sm text-white/60">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800/60">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-center text-xs text-white/60">
            Copyright &copy; 2026 영어조합법인 서풍. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
