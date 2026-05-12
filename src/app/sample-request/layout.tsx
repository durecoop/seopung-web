import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '샘플 요청',
  description: '서풍 OEM 샘플을 무상으로 받아보세요. 카테고리 선택부터 배송지 입력까지 한 화면에서.',
  openGraph: {
    title: '샘플 요청 | 영어조합법인 서풍',
    description: 'OEM 검토용 샘플을 무상 발송해 드립니다.',
  },
};

export default function SampleRequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
