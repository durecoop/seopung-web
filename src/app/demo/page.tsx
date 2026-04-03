'use client';

import Link from 'next/link';

const DEMOS = [
  { id: 0, label: '0. 음식사진 (기존)', desc: '클립아트코리아 음식사진 슬라이더 + 다크 오버레이', href: '/demo/0' },
  { id: 1, label: '1. CSS 파도', desc: '폭풍우 파도 4겹 + 번개 + 물보라 파티클', href: '/demo/1' },
  { id: 2, label: '2. 파티클 오션', desc: 'Canvas 입자 네트워크 + 마우스 인터랙션 + 에너지 버스트', href: '/demo/2' },
  { id: 3, label: '3. 바다 영상', desc: '실제 바다 영상 2개 교차 + 스캔라인 에너지 효과', href: '/demo/3' },
  { id: 4, label: '4. 시네마틱 분할', desc: '좌측 거대 타이포 + 우측 바다 영상 + 스탯 카운터', href: '/demo/4' },
  { id: 5, label: '5. 텍스트 클리핑', desc: '"서풍" 글자 안에 바다 영상이 보이는 대담한 디자인', href: '/demo/5' },
];

export default function DemoIndex() {
  return (
    <main className="min-h-screen bg-[#0a1628] px-6 py-20 font-pretendard">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-5xl font-black text-white">히어로 데모</h1>
        <p className="mb-12 text-center text-xl text-ocean-300">각 버전을 클릭하여 풀페이지로 확인하세요</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-ocean-400/50 hover:bg-white/10 hover:scale-[1.02]"
            >
              <span className="mb-2 block font-montserrat text-2xl font-black text-ocean-300">#{d.id}</span>
              <h2 className="mb-2 text-xl font-bold text-white">{d.label}</h2>
              <p className="text-sm text-white/50">{d.desc}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/30">
          각 페이지에 히어로 + 인증 섹션이 포함되어 있습니다
        </p>
      </div>
    </main>
  );
}
