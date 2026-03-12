import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자료실',
  description: '인증서 다운로드, 공장·위판장·제품 사진 갤러리, 회사 브로슈어.',
  openGraph: {
    title: '자료실 | 영어조합법인 서풍',
    description: '인증서, 사진 갤러리, 회사 브로슈어 등 주요 자료를 확인하세요.',
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
