'use client';

const LOCATIONS: Record<string, { label: string; path: string; description: string }> = {
  notices: {
    label: '소식 & 공지',
    path: '/news',
    description: '홈페이지 → 소식 & 공지 페이지 상단 "공지사항" 섹션에 표시됩니다.',
  },
  news: {
    label: '소식 & 공지',
    path: '/news',
    description: '홈페이지 → 소식 & 공지 페이지 하단 "뉴스" 섹션에 표시됩니다.',
  },
  certifications: {
    label: '인증/수상',
    path: '/certification',
    description: '홈페이지 → 인증·수상 페이지의 인증 카드 목록에 표시됩니다.',
  },
  equipment: {
    label: '기술·설비',
    path: '/technology',
    description: '홈페이지 → 기술·설비 페이지의 "주요 설비" 섹션에 표시됩니다.',
  },
  investments: {
    label: '기술·설비',
    path: '/technology',
    description: '홈페이지 → 기술·설비 페이지의 "투자 타임라인" 섹션에 표시됩니다.',
  },
  history: {
    label: '회사소개',
    path: '/about',
    description: '홈페이지 → 회사소개 페이지의 "연혁" 타임라인에 표시됩니다.',
  },
  gallery: {
    label: '자료실',
    path: '/resources',
    description: '홈페이지 → 자료실 페이지의 "포토 갤러리" 섹션에 표시됩니다.',
  },
  company: {
    label: '회사소개 / 문의하기',
    path: '/about',
    description: '홈페이지 → 회사소개, 문의하기 등 여러 페이지의 회사 정보란에 표시됩니다.',
  },
};

export default function PageLocation({ tab }: { tab: string }) {
  const loc = LOCATIONS[tab];
  if (!loc) return null;

  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-ocean-500/20 bg-ocean-500/5 px-4 py-3">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0 text-ocean-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
      <div className="flex-1">
        <p className="text-sm text-white/70">{loc.description}</p>
      </div>
      <a
        href={loc.path}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-lg border border-ocean-500/30 px-3 py-1.5 text-xs font-medium text-ocean-400 transition-colors hover:bg-ocean-500/10"
      >
        {loc.label} 페이지 보기
      </a>
    </div>
  );
}
