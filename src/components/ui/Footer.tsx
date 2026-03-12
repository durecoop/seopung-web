'use client';

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
              {/* Simple logo mark */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean-500/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-ocean-400"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3C7.5 3 3 7.03 3 12c0 2.1.7 4.2 2 5.5C6.8 19.3 9 21 12 21s5.2-1.7 7-3.5c1.3-1.3 2-3.4 2-5.5 0-4.97-4.5-9-9-9z"
                  />
                  <path
                    strokeLinecap="round"
                    d="M3 12h18M7.5 7c1.5 2 1.5 8 0 10M16.5 7c-1.5 2-1.5 8 0 10"
                  />
                </svg>
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
