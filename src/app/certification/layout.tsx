import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '품질·인증',
  description: 'HACCP, ASC, MSC 등 6대 인증 현황. 글로벌 수준의 품질·위생 관리 체계를 운영합니다.',
  openGraph: {
    title: '품질·인증 | 영어조합법인 서풍',
    description: 'HACCP·ASC·MSC 국제 인증 보유, FSSC 22000 추진 예정. 글로벌 식품안전 기준을 충족합니다.',
  },
};

export default function CertificationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
