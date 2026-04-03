'use client';
import dynamic from 'next/dynamic';
import DemoNav from '@/components/ui/DemoNav';
import CertSection from '@/components/sections/CertSection';
import FeedbackForm from '@/components/ui/FeedbackForm';
import Link from 'next/link';
const HeroCssWave = dynamic(() => import('@/components/sections/HeroCssWave'), { ssr: false });

export default function Demo1() {
  return (
    <main className="bg-white font-pretendard">
      <DemoNav darkHero={true} />
      <HeroCssWave />
      <CertSection />
      <FeedbackForm demoId={1} demoName="CSS 폭풍 파도" />
      <div className="bg-[#0a1628] py-6 text-center border-t border-white/10">
        <Link href="/demo" className="text-lg font-semibold text-ocean-300 hover:text-white">&larr; 다른 디자인 보기</Link>
      </div>
    </main>
  );
}
