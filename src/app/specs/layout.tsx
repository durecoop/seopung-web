import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스펙 다운로드',
  description: '회사 소개서·공장 평면도·가공 캐파·콜드체인 SOP·위생관리 매뉴얼 — RFP 검토용 자료 모음.',
  openGraph: {
    title: '스펙 다운로드 | 영어조합법인 서풍',
    description: 'RFP·구매팀 검토용 기술 스펙 자료',
  },
};

export default function SpecsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
