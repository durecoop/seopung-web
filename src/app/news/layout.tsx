import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소식',
  description: '영어조합법인 서풍의 최신 소식과 공지사항입니다.',
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
