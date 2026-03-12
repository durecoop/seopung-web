import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의',
  description: 'OEM 납품 및 협력 문의. 전라남도 여수시 석교로 121 (화양면). 24시간 이내 회신.',
  openGraph: {
    title: '문의 | 영어조합법인 서풍',
    description: 'OEM 납품, 협력 문의는 서풍에게. 신속한 응답과 맞춤 솔루션을 약속드립니다.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
