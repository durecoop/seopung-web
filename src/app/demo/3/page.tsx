'use client';
import dynamic from 'next/dynamic';
import DemoNav from '@/components/ui/DemoNav';
import CertSection from '@/components/sections/CertSection';
import FeedbackForm from '@/components/ui/FeedbackForm';
import Link from 'next/link';
const HeroVideo = dynamic(() => import('@/components/sections/HeroVideo'), { ssr: false });

export default function Demo3() {
  return (
    <main className="bg-white font-pretendard">
      <DemoNav darkHero={true} />
      <HeroVideo />
      <CertSection />
      <FeedbackForm demoId={3} demoName="바다 영상" />
      <div className="bg-[#0a1628] py-6 text-center border-t border-white/10">
        <Link href="/demo" className="text-lg font-semibold text-ocean-300 hover:text-white">&larr; 다른 디자인 보기</Link>
      </div>
    </main>
  );
}
