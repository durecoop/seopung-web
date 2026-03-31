'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getNotices, newsCrud, type Notice, type NewsItem } from '@/lib/admin-store';

const FALLBACK_NEWS = [
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
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newsItems, setNewsItems] = useState(FALLBACK_NEWS);

  useEffect(() => {
    getNotices().then(setNotices);
    newsCrud.getAll('sortOrder', 'asc').then((items: NewsItem[]) => {
      if (items.length > 0) setNewsItems(items.map(n => ({ date: n.date, category: n.category, title: n.title, summary: n.summary, image: n.imageUrl })));
    }).catch(() => {});
  }, []);

  // 고정 공지 먼저, 나머지는 날짜순
  const pinnedNotices = notices.filter(n => n.pinned);
  const normalNotices = notices.filter(n => !n.pinned);

  return (
    <main className="bg-white font-pretendard">
      <Navbar />
      <Breadcrumb />

      {/* ── Hero ── */}
      <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
        <div className="relative z-10 text-center">
          <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
            News &amp; Notice
          </p>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            소식 &amp; 공지
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            영어조합법인 서풍의 최신 소식과 공지사항
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── 공지사항 (Firestore) ── */}
      {notices.length > 0 && (
        <section className="relative py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <Reveal>
              <h2 className="mb-8 text-2xl font-bold text-gray-900">
                <span className="mr-2 text-ocean-500">&#9632;</span>공지사항
              </h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {[...pinnedNotices, ...normalNotices].map((notice, i) => (
                <Reveal key={notice.id} delay={i * 80}>
                  <article className="rounded-2xl border border-gray-300/50 bg-gray-50/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/30">
                    <div className="mb-2 flex items-center gap-3">
                      {notice.pinned && (
                        <span className="inline-block rounded-full bg-ocean-500/20 px-2.5 py-0.5 text-xs font-semibold text-ocean-500">
                          고정
                        </span>
                      )}
                      <span className="inline-block rounded-full bg-ocean-500/15 px-3 py-1 text-xs font-semibold text-ocean-400">
                        공지
                      </span>
                      <span className="font-montserrat text-sm text-gray-600">
                        {new Date(notice.date).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{notice.title}</h3>
                    <p className="whitespace-pre-line leading-relaxed text-gray-600">{notice.content}</p>
                    {notice.attachments && notice.attachments.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {notice.attachments.map((file, fi) => (
                          <a key={fi} href={file.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300/50 bg-gray-100/50 px-3 py-1.5 text-xs text-ocean-400 transition-colors hover:border-ocean-500/50">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
                            {file.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── News List ── */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              <span className="mr-2 text-ocean-400">&#9632;</span>뉴스
            </h2>
          </Reveal>
          <div className="flex flex-col gap-5 sm:gap-8">
            {newsItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <article className="group overflow-hidden rounded-2xl border border-gray-300/50 bg-gray-50/60 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30">
                  <div className="grid gap-0 md:grid-cols-[280px_1fr]">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:h-full">
                      <Image
                        src={getImagePath(item.image)}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/20" />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 md:p-8">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="inline-block rounded-full bg-ocean-500/15 px-3 py-1 text-xs font-semibold text-ocean-400">
                          {item.category}
                        </span>
                        <span className="font-montserrat text-sm text-gray-600">
                          {item.date}
                        </span>
                      </div>
                      <h2 className="mb-2 text-xl font-bold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="leading-relaxed text-gray-700">
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
            <p className="mt-16 text-center text-base text-gray-600">
              더 많은 소식은 준비 중입니다.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
