'use client';

import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';

interface SpecDoc {
  title: string;
  desc: string;
  format: string;
  pages: string;
  status: 'available' | 'on_request';
}

const SPEC_DOCS: SpecDoc[] = [
  {
    title: '회사 소개서 (브로셔)',
    desc: '회사 연혁, 인증 현황, 주요 라인업, 거래 카테고리 요약',
    format: 'PDF',
    pages: '12p',
    status: 'on_request',
  },
  {
    title: '공장 평면도 (요약본)',
    desc: '여수 본공장 라인 배치, 생산 능력, 동선 구조',
    format: 'PDF',
    pages: '2p',
    status: 'on_request',
  },
  {
    title: '어종별 가공 캐파',
    desc: '취급 어종별 일일·월 생산 능력, 포장 사양',
    format: 'PDF',
    pages: '4p',
    status: 'on_request',
  },
  {
    title: '알러지 정보',
    desc: '제품군별 알러젠 표시·교차오염 관리 기준',
    format: 'PDF',
    pages: '3p',
    status: 'on_request',
  },
  {
    title: '콜드체인 SOP',
    desc: '입고~출하 온도 관리 기준, 운송 파트너 체계',
    format: 'PDF',
    pages: '5p',
    status: 'on_request',
  },
  {
    title: '위생관리 매뉴얼 요약',
    desc: 'HACCP 기반 위생관리 체계, 검사 주기, 클레임 대응',
    format: 'PDF',
    pages: '6p',
    status: 'on_request',
  },
];

export default function SpecsPage() {
  return (
    <ThemeLayout breadcrumb={[{ label: '스펙 다운로드' }]}>
      {(c) => (
        <>
          {/* ── Hero ── */}
          <section className="relative py-20 md:py-24">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
                Specs Library
              </p>
              <h1 className={`text-3xl font-bold tracking-tight ${c.text} md:text-4xl lg:text-5xl`}>
                기술 스펙 다운로드
              </h1>
              <p className={`mt-4 text-base ${c.text2} md:text-lg`}>
                구매팀 RFP·내부 검토용 자료를 한 곳에 모아두었습니다. 모든 자료는 NDA 체결 후 발송됩니다.
              </p>
            </div>
          </section>

          {/* ── Notice ── */}
          <section className="relative py-4">
            <div className="mx-auto max-w-3xl px-6">
              <div className={`flex items-start gap-3 rounded-xl border ${c.cardBorder} ${c.sectionAlt} p-5`}>
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-sm leading-relaxed ${c.text2}`}>
                  본 페이지의 모든 자료는 영업 비밀이 포함되어 직접 다운로드 대신 <span className="font-semibold">담당자 직접 발송</span> 방식으로 제공됩니다.
                  요청하기 버튼을 누르시면 24시간 내 NDA와 자료를 함께 회신드립니다.
                </p>
              </div>
            </div>
          </section>

          {/* ── Spec cards ── */}
          <section className="relative py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-6">
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                {SPEC_DOCS.map((doc, i) => (
                  <Reveal key={doc.title} delay={i * 60}>
                    <div className={`group flex h-full flex-col rounded-xl border ${c.cardBorder} ${c.cardBg} p-6 transition-colors duration-300 hover:border-ocean-400/40 md:p-7`}>
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-ocean-500/10 text-ocean-500">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className={`text-base font-bold ${c.text} md:text-lg`}>{doc.title}</h2>
                          <p className={`mt-0.5 text-xs font-medium ${c.textMuted}`}>
                            {doc.format} · {doc.pages}
                          </p>
                        </div>
                      </div>
                      <p className={`mb-5 flex-1 text-sm leading-relaxed ${c.text2}`}>{doc.desc}</p>
                      <Link
                        href={`/contact?subject=${encodeURIComponent('스펙 요청: ' + doc.title)}`}
                        className={`inline-flex items-center justify-center gap-2 rounded-lg border ${c.cardBorder} px-4 py-2.5 text-sm font-semibold ${c.text} transition-colors hover:border-ocean-400/50 hover:text-ocean-500`}
                      >
                        요청하기
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Bulk CTA ── */}
          <section className="relative py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-6">
              <div className={`rounded-xl border ${c.cardBorder} ${c.cardBg} p-8 text-center md:p-10`}>
                <h2 className={`text-xl font-bold tracking-tight ${c.text} md:text-2xl`}>
                  전체 자료를 한 번에 받고 싶으신가요?
                </h2>
                <p className={`mx-auto mt-3 max-w-xl text-sm ${c.text2} md:text-base`}>
                  RFP·구매팀 회람용으로 전체 스펙 자료(약 32p · ZIP)를 한 번에 발송해 드립니다.
                </p>
                <Link
                  href="/contact?subject=전체%20스펙%20자료%20일괄%20요청"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ocean-500 px-7 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-ocean-400 hover:shadow-lg"
                >
                  전체 자료 요청하기
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className={`mt-4 text-xs ${c.textMuted}`}>24시간 내 회신 · NDA 동봉</p>
              </div>
            </div>
          </section>
        </>
      )}
    </ThemeLayout>
  );
}
