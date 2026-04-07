import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '기술·설비',
  description: 'AI 초분광 기술, 스캔 자동절단, 스마트 팩토리 설비. 2026년 약 6.9억원 설비 투자 계획.',
  openGraph: {
    title: '기술·설비 | 영어조합법인 서풍',
    description: '최신 설비와 자동화 기술로 스마트 팩토리 품질 혁신을 이끕니다.',
  },
};

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
