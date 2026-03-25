'use client';

import { FormEvent } from 'react';
import { useReveal } from '@/hooks/useReveal';

/* ──────────────────────────────────────────────
   Company info data
   ────────────────────────────────────────────── */
const INFO_ITEMS = [
  { label: '회사명', value: '영어조합법인 서풍' },
  { label: '대표', value: '김태환' },
  { label: '주소', value: '전라남도 여수시 석교로 121 (화양면)' },
  { label: '전화', value: '061-686-0508' },
  { label: '사업자번호', value: '417-81-41979' },
] as const;

const FISH_SPECIES = [
  '참조기', '삼치', '오징어', '갈치', '고등어', '아귀', '방어', '달고기', '붕장어',
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function ContactSection() {
  const header = useReveal<HTMLDivElement>();
  const content = useReveal<HTMLDivElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI only — no actual submission
  };

  return (
    <section id="contact" className="relative bg-navy-800 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ── Header ── */}
        <div
          ref={header.ref}
          className={`mb-16 text-center transition-all duration-700 ${
            header.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="gold-line mb-4 inline-block text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            문의하기
          </h2>
          <p className="mt-6 text-base text-white/60 md:text-lg">
            OEM 납품 및 협력 문의
          </p>
        </div>

        {/* ── 2-Column Layout ── */}
        <div
          ref={content.ref}
          className={`grid gap-10 md:grid-cols-2 md:gap-14 transition-all duration-700 delay-200 ${
            content.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* ── Contact Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'company', label: '회사명', type: 'text', placeholder: '귀사명을 입력해 주세요' },
              { name: 'person', label: '담당자', type: 'text', placeholder: '담당자 성함' },
              { name: 'phone', label: '연락처', type: 'tel', placeholder: '010-0000-0000' },
              { name: 'email', label: '이메일', type: 'email', placeholder: 'email@company.com' },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-white/60"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-navy-600/50 bg-navy-700 px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500/30 min-h-[44px]"
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/60">
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="문의 내용을 입력해 주세요"
                className="w-full resize-none rounded-lg border border-navy-600/50 bg-navy-700 px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20 active:scale-[0.98] min-h-[44px]"
            >
              문의 보내기
            </button>
          </form>

          {/* ── Company Info Card ── */}
          <div className="rounded-2xl border border-navy-600/30 bg-navy-900/60 p-8 backdrop-blur-sm md:p-10">
            <h3 className="mb-6 text-lg font-bold text-white md:text-xl">회사 정보</h3>

            <dl className="space-y-4">
              {INFO_ITEMS.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <dt className="w-20 shrink-0 text-sm font-medium text-white/60">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-white/80">{item.value}</dd>
                </div>
              ))}
            </dl>

            {/* Divider */}
            <div className="my-6 h-px bg-navy-700/60" />

            {/* Fish species */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-white/60">취급 어종</h4>
              <div className="flex flex-wrap gap-2">
                {FISH_SPECIES.map((fish) => (
                  <span
                    key={fish}
                    className="rounded-full border border-ocean-500/20 bg-navy-800/60 px-3 py-1 text-xs font-medium text-ocean-300"
                  >
                    {fish}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-navy-700/60" />

            {/* Location hint */}
            <div className="flex items-start gap-3 text-white/60">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="mt-0.5 h-5 w-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <p className="text-xs leading-relaxed">
                전라남도 여수시 석교로 121 (화양면)
                <br />
                여수 수산시장 인근
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
