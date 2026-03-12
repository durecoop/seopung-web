import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '기술·설비',
  description: 'AI X-ray 이물질 검출, AI 초분광 기술, 스마트 팩토리 설비. 2026년 약 9억원 설비 투자 계획.',
  openGraph: {
    title: '기술·설비 | 영어조합법인 서풍',
    description: 'AI X-ray 검출 시스템과 스마트 팩토리로 품질 혁신을 이끕니다.',
  },
};

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
