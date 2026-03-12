'use client';

import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';

const NEWS_ITEMS = [
  {
    date: '2026.01',
    category: '설비투자',
    title: 'AI X-ray 이물검출기 도입 완료',
    summary:
      '농심엔지니어링과 협력하여 2억원 규모의 AI 기반 X-ray 이물검출 시스템을 도입했습니다. 이물 검출 정확도 99.9%를 목표로 운영을 시작합니다.',
    image: '/images/facility/fish-scanner.jpg',
  },
  {
    date: '2024.12',
    category: '인증',
    title: 'ASC·MSC 이중 인증 획득',
    summary:
      '지속가능한 양식(ASC)과 지속가능한 어업(MSC) 인증을 동시에 획득하여 글로벌 수준의 지속가능성 기준을 충족했습니다.',
    image: '/images/certification/traceability-cert.jpg',
  },
  {
    date: '2024.06',
    category: '사업확장',
    title: 'ASC·MSC 인증 제품 매출 330% 성장',
    summary:
      '2024년 ASC·MSC 인증 제품 매출이 전년 대비 330% 성장한 12억원을 기록했습니다.',
    image: '/images/products/asc-package.png',
  },
  {
    date: '2024.03',
    category: '기술',
    title: 'AI 초분광 검출기 도입 계획 발표',
    summary:
      '2.5억원 규모의 AI 초분광 검출기를 2026년 내 도입할 계획을 발표했습니다. 기존 X-ray로 검출 불가한 이물까지 탐지합니다.',
    image: '/images/facility/fish-scanner-detail.jpg',
  },
  {
    date: '2023.11',
    category: '수상',
    title: '수산물 품질인증 우수업체 선정',
    summary:
      '국립수산물품질관리원으로부터 수산물 품질인증 우수업체로 선정되었습니다.',
    image: '/images/facility/safety-board.jpg',
  },
];

export default function NewsPage() {
  return (
    <main className="bg-navy-950 font-pretendard">
      <Navbar />
      <Breadcrumb />

      {/* ── Hero ── */}
      <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
        <div className="relative z-10 text-center">
          <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-gold-400">
            News &amp; Notice
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            소식 &amp; 공지
          </h1>
          <p className="mt-4 text-lg text-white/60">
            영어조합법인 서풍의 최신 소식과 공지사항
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950 to-transparent" />
      </section>

      {/* ── News List ── */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            {NEWS_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <article className="group overflow-hidden rounded-2xl border border-navy-700/50 bg-navy-900/60 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30">
                  <div className="grid gap-0 md:grid-cols-[280px_1fr]">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
                      <Image
                        src={getImagePath(item.image)}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-950/20" />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="inline-block rounded-full bg-ocean-500/15 px-3 py-1 text-xs font-semibold text-ocean-400">
                          {item.category}
                        </span>
                        <span className="font-montserrat text-sm text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <h2 className="mb-2 text-xl font-bold text-white">
                        {item.title}
                      </h2>
                      <p className="leading-relaxed text-white/80">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Bottom note */}
          <Reveal delay={600}>
            <p className="mt-16 text-center text-base text-white/50">
              더 많은 소식은 준비 중입니다.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
