import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비전',
  description: '5대 추진 과제와 One Platform 통합 운영. 이물 Zero화, R&D 역량 강화, Smart 생산라인 구축.',
  openGraph: {
    title: '비전 | 영어조합법인 서풍',
    description: 'No.1 수산 가공 파트너를 향한 로드맵. 5대 추진 과제와 글로벌 식품안전 인증 추진.',
  },
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
