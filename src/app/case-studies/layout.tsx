import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OEM 협력 사례',
  description: '서풍이 함께 만든 PB 제품·외식 프랜차이즈·밀키트 브랜드 협력 사례. 의뢰부터 양산까지 단계별 기록.',
  openGraph: {
    title: 'OEM 협력 사례 | 영어조합법인 서풍',
    description: '서풍이 함께 만든 PB 제품 협력 사례를 단계별로 소개합니다.',
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
