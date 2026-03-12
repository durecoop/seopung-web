import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '생산공정',
  description: '원료 수매부터 냉동 보관까지 6단계 One-Way 생산 공정. 새벽 위판장에서 당일 원료를 당일 가공합니다.',
  openGraph: {
    title: '생산공정 | 영어조합법인 서풍',
    description: '원료 수매부터 냉동 보관까지 6단계 One-Way 생산라인으로 최고의 신선도를 유지합니다.',
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
