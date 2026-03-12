import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '영광굴비',
  description: '전통 방식 그대로, 장인의 손길로 만드는 프리미엄 영광 굴비. 6단계 정성 공정.',
  openGraph: {
    title: '영광굴비 | 영어조합법인 서풍',
    description: '전통 방식 그대로 한 마리 한 마리 정성을 담아 대한민국 최고의 굴비를 만듭니다.',
  },
};

export default function GulbiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
