'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import { getNotices, newsCrud, type Notice, type NewsItem } from '@/lib/admin-store';

/* ── Skin-specific copy ── */
const COPY: Record<number, {
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  noticeHeading: string;
  newsHeading: string;
  emptyState: string;
  pinnedBadge: string;
  categoryBadge: string;
}> = {
  0: {
    heroLabel: 'News & Notice',
    heroTitle: '소식 & 공지',
    heroSubtitle: '영어조합법인 서풍의 최신 소식과 공지사항',
    noticeHeading: '공지사항',
    newsHeading: '뉴스',
    emptyState: '더 많은 소식은 준비 중입니다.',
    pinnedBadge: '고정',
    categoryBadge: '공지',
  },
  1: {
    heroLabel: 'Battlefield Report',
    heroTitle: '서풍의 전장 소식',
    heroSubtitle: '거친 바다에서 전해오는 승전보',
    noticeHeading: '긴급 전달 사항',
    newsHeading: '전장 뉴스',
    emptyState: '다음 출항 소식을 기다려 주세요.',
    pinnedBadge: '최우선',
    categoryBadge: '속보',
  },
  2: {
    heroLabel: 'Tech News',
    heroTitle: '서풍 테크 뉴스',
    heroSubtitle: '데이터와 기술로 읽는 수산업 최신 동향',
    noticeHeading: '시스템 공지',
    newsHeading: '테크 업데이트',
    emptyState: '새로운 데이터가 수집되면 업데이트됩니다.',
    pinnedBadge: '중요',
    categoryBadge: '공지',
  },
  3: {
    heroLabel: 'Our Stories',
    heroTitle: '서풍의 이야기',
    heroSubtitle: '바다 위에서 피어나는 서풍의 서사',
    noticeHeading: '알림',
    newsHeading: '이야기',
    emptyState: '다음 이야기가 곧 시작됩니다.',
    pinnedBadge: '고정',
    categoryBadge: '공지',
  },
  4: {
    heroLabel: 'Press & Notice',
    heroTitle: '프레스 & 공지',
    heroSubtitle: '업계 선두 서풍의 공식 발표와 최신 뉴스',
    noticeHeading: '공식 공지',
    newsHeading: '프레스 뉴스',
    emptyState: '최신 소식이 곧 업데이트됩니다.',
    pinnedBadge: '필독',
    categoryBadge: '공지',
  },
  5: {
    heroLabel: 'Pioneer Dispatch',
    heroTitle: '개척자의 소식',
    heroSubtitle: '아무도 가지 않은 길에서 보내는 리포트',
    noticeHeading: '개척 공지',
    newsHeading: '프론티어 뉴스',
    emptyState: '다음 개척지에서 소식이 도착할 예정입니다.',
    pinnedBadge: '핵심',
    categoryBadge: '공지',
  },
};

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
    <ThemeLayout breadcrumb={[{ label: '소식' }]}>
      {(c) => {
        const copy = COPY[c.theme.id] || COPY[0];
        return (
          <>
            {/* ── Hero ── */}
            <section className={`relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden ${c.pageBg}`}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
              <div className="relative z-10 text-center">
                <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
                  {copy.heroLabel}
                </p>
                <h1 className={`text-4xl font-bold ${c.text} md:text-5xl lg:text-6xl`}>
                  {copy.heroTitle}
                </h1>
                <p className={`mt-4 text-lg ${c.text2}`}>
                  {copy.heroSubtitle}
                </p>
              </div>
              <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${c.gradientFade}`} />
            </section>

            {/* ── 공지사항 (Firestore) ── */}
            {notices.length > 0 && (
              <section className="relative py-16 md:py-20">
                <div className="mx-auto max-w-5xl px-6 lg:px-8">
                  <Reveal>
                    <h2 className={`mb-8 text-2xl font-bold ${c.text}`}>
                      <span className="mr-2 text-ocean-500">&#9632;</span>{copy.noticeHeading}
                    </h2>
                  </Reveal>
                  <div className="flex flex-col gap-4">
                    {[...pinnedNotices, ...normalNotices].map((notice, i) => (
                      <Reveal key={notice.id} delay={i * 80}>
                        <article className={`rounded-2xl border ${c.cardBorder} ${c.cardBg} p-6 transition-all duration-300 hover:border-gold-500/30`}>
                          <div className="mb-2 flex items-center gap-3">
                            {notice.pinned && (
                              <span className="inline-block rounded-full bg-ocean-500/20 px-2.5 py-0.5 text-xs font-semibold text-ocean-500">
                                {copy.pinnedBadge}
                              </span>
                            )}
                            <span className="inline-block rounded-full bg-ocean-500/15 px-3 py-1 text-xs font-semibold text-ocean-400">
                              {copy.categoryBadge}
                            </span>
                            <span className={`font-montserrat text-sm ${c.text2}`}>
                              {new Date(notice.date).toLocaleDateString('ko-KR')}
                            </span>
                          </div>
                          <h3 className={`mb-2 text-lg font-bold ${c.text}`}>{notice.title}</h3>
                          <p className={`whitespace-pre-line leading-relaxed ${c.text2}`}>{notice.content}</p>
                          {notice.attachments && notice.attachments.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {notice.attachments.map((file, fi) => (
                                <a key={fi} href={file.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 rounded-lg border ${c.cardBorder} bg-gray-100/50 px-3 py-1.5 text-xs text-ocean-400 transition-colors hover:border-ocean-500/50`}>
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
                  <h2 className={`mb-8 text-2xl font-bold ${c.text}`}>
                    <span className="mr-2 text-ocean-400">&#9632;</span>{copy.newsHeading}
                  </h2>
                </Reveal>
                <div className="flex flex-col gap-5 sm:gap-8">
                  {newsItems.map((item, i) => (
                    <Reveal key={item.title} delay={i * 100}>
                      <article className={`group overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} transition-all duration-500 hover:border-gold-500/30`}>
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
                            <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-40 md:bg-gradient-to-r md:opacity-20`} />
                          </div>

                          {/* Content */}
                          <div className="p-5 sm:p-6 md:p-8">
                            <div className="mb-3 flex items-center gap-3">
                              <span className="inline-block rounded-full bg-ocean-500/15 px-3 py-1 text-xs font-semibold text-ocean-400">
                                {item.category}
                              </span>
                              <span className={`font-montserrat text-sm ${c.text2}`}>
                                {item.date}
                              </span>
                            </div>
                            <h2 className={`mb-2 text-xl font-bold ${c.text}`}>
                              {item.title}
                            </h2>
                            <p className={`leading-relaxed ${c.text2}`}>
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
                  <p className={`mt-16 text-center text-base ${c.text2}`}>
                    {copy.emptyState}
                  </p>
                </Reveal>
              </div>
            </section>
          </>
        );
      }}
    </ThemeLayout>
  );
}
