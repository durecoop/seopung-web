'use client';
import dynamic from 'next/dynamic';
import DemoNav from '@/components/ui/DemoNav';
import CertSection from '@/components/sections/CertSection';
import FeedbackForm from '@/components/ui/FeedbackForm';
import Link from 'next/link';
const HeroTextClip = dynamic(() => import('@/components/sections/HeroTextClip'), { ssr: false });

export default function Demo5() {
  return (
    <main className="bg-white font-pretendard">
      <DemoNav darkHero={true} />
      <HeroTextClip />
      <CertSection />
      <FeedbackForm demoId={5} demoName="대담한 타이포" />
      <div className="bg-[#0a1628] py-6 text-center border-t border-white/10">
        <Link href="/demo" className="text-lg font-semibold text-ocean-300 hover:text-white">&larr; 다른 디자인 보기</Link>
      </div>
    </main>
  );
}
