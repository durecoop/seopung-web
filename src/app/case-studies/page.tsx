'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import PhotoNeeded from '@/components/ui/PhotoNeeded';
import { getImagePath } from '@/lib/utils';

interface CaseStudy {
  client: string;
  category: string;
  challenge: string;
  solution: string;
  result: string[];
  duration: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    client: '대형마트 PB',
    category: '냉동수산 PB 12종',
    challenge:
      '신규 PB 라인업 12종을 6개월 안에 양산까지 완료해야 함. 어종 5종(고등어·삼치·갈치·오징어·아귀)에 대해 각각 사이즈·포장 사양이 달랐고, 매장 진열 기준에 맞는 일관된 패키지 라벨이 요구되었음.',
    solution:
      '여수 위판장 직매입 채널을 활용해 어종별 안정 공급을 확보하고, 시생산 → 패키지 디자인 → 양산을 병렬로 진행. HACCP 라인 1개를 PB 전용으로 재배치하여 다품종 소량 양산에 대응.',
    result: [
      '계약 6개월 만에 12종 양산·전국 매장 입점',
      '재계약 5년 연속, 라인업 18종으로 확장',
      '계약 첫해 매출 목표 110% 달성',
    ],
    duration: '의뢰 ~ 양산: 6개월',
  },
  {
    client: '외식 프랜차이즈',
    category: '식자재 OEM (밀키트형)',
    challenge:
      '전국 매장 300곳에 동일 품질의 해물탕·찜 식자재를 공급해야 했고, 본사 메뉴 변경 주기에 맞춰 신메뉴 SKU 추가가 빈번. 평균 신메뉴 개발 사이클 3개월 이내가 요구됨.',
    solution:
      '본사 메뉴 개발팀과 직접 협업하는 전담 R&D 채널 신설. 시식·피드백·재시생산 사이클을 2주 단위로 운영. 콜드체인 물류 파트너와 연계해 300개 매장 동시 배송 체계 확립.',
    result: [
      '평균 신메뉴 개발 3개월 → 양산',
      '연간 8회 신메뉴 출시',
      '품질 클레임률 0.05% 이하 유지',
    ],
    duration: '신메뉴 사이클: 3개월',
  },
  {
    client: '밀키트 브랜드',
    category: 'HMR 간편식 OEM',
    challenge:
      '온라인 D2C 채널의 빠른 트렌드 변화에 대응할 수 있는 소량 다품종 OEM 파트너가 필요. 최소 발주량(MOQ)이 낮고, 신제품 출시 후 시장 반응에 따라 양산 규모를 유연하게 조정할 수 있어야 했음.',
    solution:
      '소량 시생산 라인을 우선 운영해 MOQ 부담을 낮추고, 시장 반응 1개월 후 양산 단계로 전환하는 2단계 OEM 프로세스 도입. ASC·MSC 인증 원료를 활용해 브랜드 차별화 지원.',
    result: [
      '신제품 출시 후 양산까지 평균 3개월',
      '시장 반응 부진 SKU 손실 최소화',
      '지속가능 인증 제품군으로 브랜드 가치 상승',
    ],
    duration: '신제품 사이클: 3개월',
  },
];

const COPY = {
  heroLabel: 'Case Studies',
  heroTitle: 'OEM 협력 사례',
  heroSub: '대형마트 PB · 외식 프랜차이즈 · 밀키트 브랜드 — 서풍이 함께 만든 결과',
  introBold: '의뢰부터 양산까지',
  introText:
    ', 서풍이 어떻게 일하는지 익명 케이스로 정리했습니다. 모든 사례는 거래처 동의 하에 정보를 익명 처리하였으며, 데이터·결과는 실제 협업 기록 기반입니다.',
  ctaTitle: '귀사의 다음 케이스를 함께 만들어 드립니다',
  ctaDesc: '신제품 OEM · PB 양산 · 식자재 공급 — 어떤 단계든 상담 가능합니다.',
};

export default function CaseStudiesPage() {
  return (
    <ThemeLayout breadcrumb={[{ label: 'OEM 협력 사례' }]}>
      {(c) => (
        <>
          {/* ── Hero ── */}
          <section className="relative flex h-[35vh] min-h-[280px] items-center justify-center overflow-hidden md:h-[40vh]">
            <Image
              src={getImagePath('/images/food-web/pc0031187507.jpg')}
              alt="서풍 OEM 협력 사례 — 프리미엄 원물 가공"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
            <div className="relative z-10 text-center px-6">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-300">
                {COPY.heroLabel}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md md:text-4xl lg:text-5xl">
                {COPY.heroTitle}
              </h1>
              <p className="mt-4 text-base text-white/90 drop-shadow md:text-lg">{COPY.heroSub}</p>
            </div>
          </section>

          {/* ── Intro ── */}
          <section className="relative py-20 md:py-24">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <Reveal>
                <p className={`text-base leading-relaxed ${c.text2} md:text-lg`}>
                  <span className={`font-semibold ${c.text}`}>{COPY.introBold}</span>
                  {COPY.introText}
                </p>
              </Reveal>
            </div>
          </section>

          {/* ── Case studies ── */}
          <section className="relative py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-6 space-y-16 md:space-y-20">
              {CASE_STUDIES.map((cs, i) => (
                <Reveal key={cs.client}>
                  <article className={`overflow-hidden rounded-xl border ${c.cardBorder} ${c.cardBg}`}>
                    <div className="grid gap-0 lg:grid-cols-[2fr_3fr]">
                      <div className="relative min-h-[260px] lg:min-h-full">
                        <PhotoNeeded
                          fill
                          tone="light"
                          caption={`${cs.client} 협업 컷`}
                          hint="협업 결과물 또는 라인 사진"
                        />
                      </div>
                      <div className="p-8 md:p-10">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="font-montserrat text-xs font-bold uppercase tracking-wider text-ocean-500">
                            Case {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className={`text-xs ${c.textMuted}`}>{cs.duration}</span>
                        </div>
                        <h2 className={`text-2xl font-bold tracking-tight ${c.text} md:text-3xl`}>{cs.client}</h2>
                        <p className={`mt-1 text-sm font-medium text-ocean-500 md:text-base`}>{cs.category}</p>

                        <div className="mt-6 space-y-5">
                          <div>
                            <p className="mb-1.5 font-montserrat text-xs font-bold uppercase tracking-wider text-ocean-500">
                              Challenge
                            </p>
                            <p className={`text-sm leading-relaxed ${c.text2} md:text-base`}>{cs.challenge}</p>
                          </div>
                          <div>
                            <p className="mb-1.5 font-montserrat text-xs font-bold uppercase tracking-wider text-ocean-500">
                              Solution
                            </p>
                            <p className={`text-sm leading-relaxed ${c.text2} md:text-base`}>{cs.solution}</p>
                          </div>
                          <div>
                            <p className="mb-2 font-montserrat text-xs font-bold uppercase tracking-wider text-ocean-500">
                              Result
                            </p>
                            <ul className={`space-y-1.5 text-sm ${c.text2} md:text-base`}>
                              {cs.result.map((r) => (
                                <li key={r} className="flex items-start gap-2">
                                  <svg className="mt-1 h-4 w-4 flex-shrink-0 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Notice ── */}
          <section className="relative py-12">
            <div className="mx-auto max-w-3xl px-6">
              <div className={`rounded-xl border ${c.cardBorder} ${c.sectionAlt} p-6 text-center`}>
                <p className={`text-sm ${c.textMuted} md:text-base`}>
                  본 사례는 거래처 동의 하에 익명 처리하여 공개합니다. 구체 거래처명·SKU 정보는 NDA 체결 후 별도 자료로 제공해 드립니다.
                </p>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="relative py-20 md:py-28">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <Reveal>
                <h2 className={`text-2xl font-bold tracking-tight ${c.text} md:text-3xl`}>{COPY.ctaTitle}</h2>
                <p className={`mx-auto mt-4 max-w-xl text-base ${c.text2} md:text-lg`}>{COPY.ctaDesc}</p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-ocean-500 px-7 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-ocean-400 hover:shadow-lg">
                    OEM 문의하기
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link href="/sample-request" className={`inline-flex items-center gap-2 rounded-xl border ${c.cardBorder} px-7 py-3.5 text-base font-bold ${c.text} transition-all hover:border-ocean-400/50`}>
                    샘플 요청하기
                  </Link>
                </div>
                <p className={`mt-4 text-xs ${c.textMuted}`}>24시간 내 회신 · 샘플 무상 · NDA 즉시 체결 가능</p>
              </Reveal>
            </div>
          </section>
        </>
      )}
    </ThemeLayout>
  );
}
