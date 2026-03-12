import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회사소개',
  description: '영어조합법인 서풍 - 30년 이상의 수산 가공 노하우, CEO 인사말, 경영 철학, 회사 연혁을 소개합니다.',
  openGraph: {
    title: '회사소개 | 영어조합법인 서풍',
    description: '30년 이상의 수산 가공 노하우, 선순환 재투자 경영을 실천하는 No.1 수산 가공 파트너.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
