'use client';

import { useState } from 'react';
import Image from 'next/image';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import { saveInquiry, generateId, type Inquiry } from '@/lib/admin-store';

/* ──────────────────────────────────────────────
   Skin-specific copy (keyed by theme id 0-5)
   ────────────────────────────────────────────── */
interface ContactCopy {
  heroTitle: string;
  heroSub: string;
  formSectionLabel: string;
  formSectionHeading: string;
  companyInfoHeading: string;
  companyInfoLabel: string;
  submitBtn: string;
  promiseHeading: string;
  promiseDesc1: string;
  promiseDesc2: string;
  promiseDesc3: string;
}

const CONTACT_COPY: Record<number, ContactCopy> = {
  // 0: warm trust
  0: {
    heroTitle: '문의하기',
    heroSub: 'OEM 납품 및 협력 문의',
    formSectionLabel: 'Get in Touch',
    formSectionHeading: '문의 및 회사 정보',
    companyInfoLabel: 'Company Information',
    companyInfoHeading: '회사 정보',
    submitBtn: '문의하기',
    promiseHeading: '우리의 약속',
    promiseDesc1: '문의 접수 후 24시간 이내 회신',
    promiseDesc2: '귀사의 요구사항에 최적화된 OEM 솔루션 제안',
    promiseDesc3: '제품 검토를 위한 샘플 무상 제공',
  },
  // 1: bold fearless
  1: {
    heroTitle: '함께 도전할 준비가 되셨나요',
    heroSub: '거침없이 시작합시다',
    formSectionLabel: 'Join the Challenge',
    formSectionHeading: '도전의 시작, 여기서부터',
    companyInfoLabel: 'Our Base Camp',
    companyInfoHeading: '서풍 기지',
    submitBtn: '출항하기',
    promiseHeading: '서풍의 전투력',
    promiseDesc1: '문의 접수 즉시, 24시간 내 회신으로 돌파',
    promiseDesc2: '귀사의 목표에 맞춘 공격적 OEM 솔루션',
    promiseDesc3: '결과로 보여드립니다 — 샘플 무상 제공',
  },
  // 2: tech innovation
  2: {
    heroTitle: '최적의 솔루션을 설계합니다',
    heroSub: '데이터 기반 OEM 파트너십',
    formSectionLabel: 'Start a Project',
    formSectionHeading: '프로젝트 문의 & 회사 데이터',
    companyInfoLabel: 'System Info',
    companyInfoHeading: '기업 데이터',
    submitBtn: '프로젝트 시작하기',
    promiseHeading: '시스템 보장',
    promiseDesc1: '문의 접수 후 24시간 이내 자동 회신 시스템',
    promiseDesc2: '데이터 분석 기반 맞춤형 OEM 솔루션 설계',
    promiseDesc3: '스마트 공정으로 제작된 샘플 무상 제공',
  },
  // 3: cinematic emotional
  3: {
    heroTitle: '다음 이야기를 함께 쓰겠습니다',
    heroSub: '당신의 브랜드에 바다의 이야기를 담다',
    formSectionLabel: 'Write Together',
    formSectionHeading: '이야기의 시작',
    companyInfoLabel: 'Our Story',
    companyInfoHeading: '서풍이라는 이름',
    submitBtn: '이야기 시작하기',
    promiseHeading: '서풍의 약속',
    promiseDesc1: '문의를 보내주신 순간부터, 정성스러운 회신을 준비합니다',
    promiseDesc2: '귀사만의 이야기에 맞는 제품을 함께 설계합니다',
    promiseDesc3: '맛으로 전하는 진심 — 샘플을 무상으로 보내드립니다',
  },
  // 4: premium confident
  4: {
    heroTitle: '최고의 파트너를 만나실 시간입니다',
    heroSub: '프리미엄 OEM 상담',
    formSectionLabel: 'Premium Inquiry',
    formSectionHeading: '상담 신청 & 기업 정보',
    companyInfoLabel: 'Corporate Profile',
    companyInfoHeading: '기업 프로필',
    submitBtn: '상담 신청',
    promiseHeading: '서풍의 자신감',
    promiseDesc1: '문의 접수 24시간 이내 전담 매니저 배정',
    promiseDesc2: '업계 최고 수준의 맞춤형 OEM 솔루션',
    promiseDesc3: '프리미엄 샘플 무상 제공 — 결과로 증명합니다',
  },
  // 5: pioneer bold
  5: {
    heroTitle: '새로운 길을 열어봅시다',
    heroSub: '세상에 없던 제품을 함께 만듭니다',
    formSectionLabel: 'Open New Paths',
    formSectionHeading: '개척의 첫걸음',
    companyInfoLabel: 'Pioneer HQ',
    companyInfoHeading: '개척 본부',
    submitBtn: '개척 시작하기',
    promiseHeading: '개척자의 약속',
    promiseDesc1: '24시간 내 회신 — 빠른 시작이 새로운 길을 연다',
    promiseDesc2: '기존에 없던 OEM 솔루션을 함께 설계합니다',
    promiseDesc3: '한 번도 본 적 없는 샘플을 무상으로 보내드립니다',
  },
  6: {
    heroTitle: '문의하기',
    heroSub: 'OEM 납품 및 파트너십 문의',
    formSectionLabel: 'Contact Us',
    formSectionHeading: '문의 및 회사 정보',
    companyInfoLabel: 'Company Information',
    companyInfoHeading: '회사 정보',
    submitBtn: '문의하기',
    promiseHeading: '서풍의 약속',
    promiseDesc1: '문의 접수 후 24시간 이내 담당자가 회신드립니다',
    promiseDesc2: '귀사의 요구사항에 맞는 최적의 OEM 솔루션을 제안합니다',
    promiseDesc3: '제품 검토를 위한 샘플을 무상으로 제공합니다',
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const COMPANY_INFO = [
  { label: '회사명', value: '영어조합법인 서풍' },
  { label: '대표', value: '김태환' },
  { label: '주소', value: '전라남도 여수시 석교로 121 (화양면)' },
  { label: '사업자번호', value: '417-81-41979' },
  { label: '취급어종', value: '참조기, 삼치, 오징어, 갈치, 고등어, 아귀, 방어, 달고기, 붕장어' },
];

const AFFILIATES = [
  {
    name: '영어조합법인 서풍',
    role: 'Manufacturing',
    desc: '수산물 제조 · 가공',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
  },
  {
    name: '㈜여수유통',
    role: 'Distribution',
    desc: '유통 · 물류',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.481 1.09-1.102.434-8.674-.655-15.648-15.648-15.648H3.375c-.621 0-1.125.504-1.125 1.125v11.25" />
      </svg>
    ),
  },
  {
    name: '㈜대주냉장',
    role: 'Storage',
    desc: '냉동 · 보관',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    name: '중매인 49호',
    role: 'Purchase',
    desc: '원료 매입',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────────
   Page component
   ────────────────────────────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    company: '',
    person: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) newErrors.company = '회사명을 입력해 주세요';
    if (!formData.person.trim()) newErrors.person = '담당자명을 입력해 주세요';

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해 주세요';
    } else if (!/^[\d\-+() ]{9,}$/.test(formData.phone.trim())) {
      newErrors.phone = '올바른 연락처 형식을 입력해 주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해 주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = '올바른 이메일 형식을 입력해 주세요';
    }

    if (!formData.message.trim()) newErrors.message = '문의 내용을 입력해 주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const inquiry: Inquiry = {
      id: generateId(),
      company: formData.company.trim(),
      person: formData.person.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      date: new Date().toISOString(),
      read: false,
    };
    saveInquiry(inquiry);
    setSubmitted(true);
    setFormData({ company: '', person: '', phone: '', email: '', message: '' });
    setErrors({});
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <ThemeLayout breadcrumb={[{ label: '문의' }]}>
      {(c) => {
        const copy = CONTACT_COPY[c.theme.id] ?? CONTACT_COPY[0];
        return (
        <>
          {/* ── Hero ── */}
          <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
            <Image
              src={getImagePath('/images/hero/dawn-unloading.jpg')}
              alt="새벽 하역"
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${c.overlay}`} />
            <div className="relative z-10 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
                Contact
              </p>
              <h1 className={`text-4xl font-bold ${c.text} md:text-5xl lg:text-6xl`}>{copy.heroTitle}</h1>
              <p className={`mt-4 text-lg ${c.text2}`}>
                {copy.heroSub}
              </p>
            </div>
            <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${c.gradientFade}`} />
          </section>

          {/* ── OEM Process Flow ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-navy-800)_0%,_transparent_70%)] opacity-30" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    OEM Process
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>OEM 협력 프로세스</h2>
                  <p className={`mt-4 text-base ${c.text2}`}>체계적인 프로세스로 최적의 OEM 솔루션을 제공합니다</p>
                </div>
              </Reveal>

              {/* Desktop horizontal / Mobile vertical */}
              <Reveal delay={100}>
                <div className="relative">
                  {/* Desktop connecting line */}
                  <div className="absolute left-[8.33%] right-[8.33%] top-[28px] hidden h-0.5 bg-navy-700 md:block">
                    <div className="h-full w-full bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-gold-500/60" />
                  </div>
                  {/* Mobile connecting line */}
                  <div className="absolute left-6 sm:left-[28px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500/60 via-gold-400/40 to-gold-500/60 md:hidden" />

                  <div className="grid gap-8 md:grid-cols-6">
                    {[
                      {
                        step: 1,
                        title: '문의 접수',
                        desc: '전화/이메일/홈페이지를 통한 초기 상담',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        ),
                      },
                      {
                        step: 2,
                        title: '요구사항 분석',
                        desc: '제품 스펙, 물량, 납기 등 상세 협의',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                          </svg>
                        ),
                      },
                      {
                        step: 3,
                        title: '샘플 개발',
                        desc: '무상 샘플 제작 및 시식 평가',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A18.684 18.684 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632" />
                          </svg>
                        ),
                      },
                      {
                        step: 4,
                        title: '시생산',
                        desc: '소량 테스트 생산 및 품질 검증',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a1.5 1.5 0 010-2.12l.88-.88a1.5 1.5 0 012.12 0l2.1 2.1 5.1-5.1a1.5 1.5 0 012.12 0l.88.88a1.5 1.5 0 010 2.12l-7.98 7.98a1.5 1.5 0 01-2.12.02z" />
                          </svg>
                        ),
                      },
                      {
                        step: 5,
                        title: '양산 계약',
                        desc: '가격, 물량, 납기 조건 확정',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                          </svg>
                        ),
                      },
                      {
                        step: 6,
                        title: '정기 납품',
                        desc: '안정적 공급 및 품질 관리',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.481 1.09-1.102.434-8.674-.655-15.648-15.648-15.648H3.375c-.621 0-1.125.504-1.125 1.125v11.25" />
                          </svg>
                        ),
                      },
                    ].map((item) => (
                      <div key={item.step} className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
                        {/* Numbered circle */}
                        <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 ${c.pageBg} text-ocean-500 shadow-lg shadow-gold-500/10`}>
                          <span className="font-montserrat text-lg font-bold">{item.step}</span>
                        </div>
                        <div className="pt-1 md:pt-0">
                          <div className="mb-2 flex items-center gap-2 text-ocean-500 md:justify-center">
                            {item.icon}
                            <h3 className={`text-base font-bold ${c.text}`}>{item.title}</h3>
                          </div>
                          <p className={`text-sm leading-relaxed ${c.text2}`}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 1. Contact form + info ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    {copy.formSectionLabel}
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.formSectionHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-12 lg:grid-cols-2">
                {/* Form */}
                <Reveal>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="company" className={`mb-2 block text-sm font-medium ${c.text2} py-1`}>
                          회사명
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="회사명을 입력하세요"
                          className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3.5 outline-none transition-all duration-300 focus:ring-1 focus:ring-ocean-500 ${errors.company ? 'border-red-500/60' : ''}`}
                        />
                        {errors.company && <p className="mt-1.5 text-xs text-red-400">{errors.company}</p>}
                      </div>
                      <div>
                        <label htmlFor="person" className={`mb-2 block text-sm font-medium ${c.text2} py-1`}>
                          담당자명
                        </label>
                        <input
                          type="text"
                          id="person"
                          name="person"
                          value={formData.person}
                          onChange={handleChange}
                          placeholder="담당자명을 입력하세요"
                          className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3.5 outline-none transition-all duration-300 focus:ring-1 focus:ring-ocean-500 ${errors.person ? 'border-red-500/60' : ''}`}
                        />
                        {errors.person && <p className="mt-1.5 text-xs text-red-400">{errors.person}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className={`mb-2 block text-sm font-medium ${c.text2} py-1`}>
                          연락처
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="010-0000-0000"
                          className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3.5 outline-none transition-all duration-300 focus:ring-1 focus:ring-ocean-500 ${errors.phone ? 'border-red-500/60' : ''}`}
                        />
                        {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className={`mb-2 block text-sm font-medium ${c.text2} py-1`}>
                          이메일
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@company.com"
                          className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3.5 outline-none transition-all duration-300 focus:ring-1 focus:ring-ocean-500 ${errors.email ? 'border-red-500/60' : ''}`}
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={`mb-2 block text-sm font-medium ${c.text2} py-1`}>
                        문의 내용
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="문의 내용을 자유롭게 작성해 주세요"
                        className={`w-full resize-none rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3.5 outline-none transition-all duration-300 focus:ring-1 focus:ring-ocean-500 ${errors.message ? 'border-red-500/60' : ''}`}
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                    </div>

                    {submitted && (
                      <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3.5 text-center text-sm font-medium text-green-400">
                        문의가 접수되었습니다. 빠른 시일 내 회신드리겠습니다.
                      </div>
                    )}

                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-xl bg-ocean-500 px-8 py-4 min-h-[44px] font-semibold text-white transition-all duration-300 hover:bg-ocean-400 hover:shadow-lg hover:shadow-ocean-500/20"
                    >
                      <span className="relative z-10">{copy.submitBtn}</span>
                      <div className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-300 group-hover:translate-x-0" />
                    </button>
                  </form>
                </Reveal>

                {/* Company info card */}
                <Reveal delay={200}>
                  <div className={`overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg}`}>
                    <div className={`border-b ${c.cardBorder} ${c.sectionAlt} px-8 py-6`}>
                      <p className="font-montserrat text-sm font-semibold uppercase tracking-wider text-ocean-500">
                        {copy.companyInfoLabel}
                      </p>
                      <h3 className={`mt-2 text-xl font-bold ${c.text}`}>{copy.companyInfoHeading}</h3>
                    </div>
                    <div className={`divide-y divide-navy-700/30`}>
                      {COMPANY_INFO.map((info) => (
                        <div key={info.label} className="flex items-start gap-6 px-8 py-5">
                          <span className="w-20 shrink-0 pt-0.5 text-sm font-semibold text-ocean-500">
                            {info.label}
                          </span>
                          <span className={c.text2}>{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── 2. 관계사 정보 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-navy-800)_0%,_transparent_70%)] opacity-50" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Affiliates
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>관계사 정보</h2>
                </div>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {AFFILIATES.map((affiliate, i) => (
                  <Reveal key={affiliate.name} delay={i * 100}>
                    <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 text-center transition-all duration-500 hover:border-ocean-400/30 ${c.cardHover}`}>
                      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ocean-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="mx-auto mb-6 inline-flex rounded-xl bg-ocean-500/10 p-3 text-ocean-400">
                          {affiliate.icon}
                        </div>
                        <p className="mb-1 font-montserrat text-xs font-medium uppercase tracking-wider text-ocean-500">
                          {affiliate.role}
                        </p>
                        <h3 className={`mb-3 text-lg font-bold ${c.text}`}>{affiliate.name}</h3>
                        <p className={`text-sm ${c.text2}`}>{affiliate.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. 찾아오시는 길 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Location
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>찾아오시는 길</h2>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="mb-8 text-center">
                  <p className={`text-lg ${c.text2}`}>전라남도 여수시 석교로 121 (화양면)</p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className={`mx-auto mb-6 max-w-5xl overflow-hidden rounded-2xl border ${c.cardBorder} shadow-2xl shadow-black/20`}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.5!2d127.662!3d34.7396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356dd2a2a2a2a2a2%3A0x0!2z7KCE652864mE64-EIOyXrOyImOyLnCDshJ3qt5Dsho8gMTIx!5e0!3m2!1sko!2skr!4v1"
                    className="w-full"
                    style={{ border: 0, height: '480px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="서풍 위치 - 전라남도 여수시 석교로 121"
                  />
                </div>
                <div className="mx-auto mb-12 flex max-w-5xl flex-wrap items-center justify-center gap-3">
                  <a href="https://map.kakao.com/link/search/전라남도 여수시 석교로 121" target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border ${c.cardBorder} ${c.cardBg} px-5 py-2.5 text-sm font-medium ${c.text2} transition-all hover:border-gold-500/40 hover:text-ocean-500`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                    카카오맵에서 보기
                  </a>
                  <a href="https://map.naver.com/v5/search/전라남도 여수시 석교로 121" target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border ${c.cardBorder} ${c.cardBg} px-5 py-2.5 text-sm font-medium ${c.text2} transition-all hover:border-gold-500/40 hover:text-ocean-500`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
                    네이버지도에서 보기
                  </a>
                </div>
              </Reveal>

              <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
                <Reveal delay={300}>
                  <div className={`group rounded-2xl border ${c.cardBorder} ${c.cardBg} p-6 transition-all duration-500 hover:border-ocean-400/30 ${c.cardHover}`}>
                    <div className="mb-4 inline-flex rounded-xl bg-ocean-500/10 p-3 text-ocean-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.481 1.09-1.102.434-8.674-.655-15.648-15.648-15.648H3.375c-.621 0-1.125.504-1.125 1.125v11.25" />
                      </svg>
                    </div>
                    <h3 className={`mb-2 text-lg font-bold ${c.text}`}>자가용</h3>
                    <p className={c.text2}>여수시내에서 약 30분</p>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className={`group rounded-2xl border ${c.cardBorder} ${c.cardBg} p-6 transition-all duration-500 hover:border-ocean-400/30 ${c.cardHover}`}>
                    <div className="mb-4 inline-flex rounded-xl bg-ocean-500/10 p-3 text-ocean-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className={`mb-2 text-lg font-bold ${c.text}`}>대중교통</h3>
                    <p className={c.text2}>여수엑스포역에서 버스 이용</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── 4. 우리의 약속 ── */}
          <section className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-navy-800)_0%,_transparent_70%)] opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <Reveal>
                <div className="mb-16 text-center">
                  <p className="mb-3 font-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-ocean-500">
                    Our Promise
                  </p>
                  <h2 className={`text-3xl font-bold ${c.text} md:text-4xl`}>{copy.promiseHeading}</h2>
                </div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: '신속한 응답',
                    desc: copy.promiseDesc1,
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: '맞춤 제안',
                    desc: copy.promiseDesc2,
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: '샘플 제공',
                    desc: copy.promiseDesc3,
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    ),
                  },
                ].map((promise, i) => (
                  <Reveal key={promise.title} delay={i * 120}>
                    <div className={`group rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 transition-all duration-500 ${c.cardHover} md:p-10`}>
                      <div className="mb-6 inline-flex rounded-xl bg-ocean-500/10 p-3 text-ocean-500 transition-colors duration-300 group-hover:bg-ocean-500/20">
                        {promise.icon}
                      </div>
                      <h3 className={`mb-3 text-xl font-bold ${c.text}`}>{promise.title}</h3>
                      <p className={`leading-relaxed ${c.text2}`}>{promise.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
        );
      }}
    </ThemeLayout>
  );
}
