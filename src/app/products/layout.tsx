import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제품 라인업',
  description:
    '냉동수산가공, 밀키트·간편식, 프리미엄 굴비, ASC·MSC 인증 제품까지. 9개 어종, 134+ 품목의 OEM 수산 가공 전문.',
  openGraph: {
    title: '제품 라인업 | 영어조합법인 서풍',
    description:
      '대한민국 수산 가공 No.1 파트너, 서풍의 제품 라인업을 소개합니다.',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
