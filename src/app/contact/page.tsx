'use client';

import { useState } from 'react';
import Image from 'next/image';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import PhotoNeeded from '@/components/ui/PhotoNeeded';
import { getImagePath } from '@/lib/utils';
import { saveInquiry, generateId, type Inquiry } from '@/lib/admin-store';
import { COMPANY, FISH_SPECIES, AFFILIATES as AFFILIATE_CONFIG, hasValue } from '@/lib/company-config';

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
    heroTitle: '함께 만들어봅시다',
    heroSub: 'OEM 납품 · 신제품 개발 · 파트너십',
    formSectionLabel: 'Get Started',
    formSectionHeading: '문의 및 회사 정보',
    companyInfoLabel: 'Company Information',
    companyInfoHeading: '회사 정보',
    submitBtn: '시작하기',
    promiseHeading: '서풍의 약속',
    promiseDesc1: '문의 접수 24시간 이내 담당자가 직접 회신드립니다',
    promiseDesc2: '귀사의 목표에 맞는 최적의 OEM 솔루션을 설계합니다',
    promiseDesc3: '제품 검토를 위한 샘플을 무상 제공합니다',
  },
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const COMPANY_INFO = [
  { label: '회사명', value: COMPANY.name },
  { label: '대표', value: hasValue(COMPANY.ceoTitle) ? `${COMPANY.ceoTitle} ${COMPANY.ceoName}` : COMPANY.ceoName },
  { label: '주소', value: hasValue(COMPANY.addressDetail) ? `${COMPANY.address} (${COMPANY.addressDetail})` : COMPANY.address },
  ...(hasValue(COMPANY.bizNumber) ? [{ label: '사업자번호', value: COMPANY.bizNumber }] : []),
  ...(hasValue(COMPANY.phone) ? [{ label: '전화', value: COMPANY.phone }] : []),
  ...(hasValue(COMPANY.email) ? [{ label: '이메일', value: COMPANY.email }] : []),
  ...(FISH_SPECIES.length > 0 ? [{ label: '취급어종', value: FISH_SPECIES.join(', ') }] : []),
];

const AFFILIATES = AFFILIATE_CONFIG;

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

    // 이메일 클라이언트로 자동 전송 (제목·내용 prefill)
    const subject = encodeURIComponent('홈페이지 / 쇼핑몰 문의 접수');
    const body = encodeURIComponent(
      `[홈페이지 문의 접수]\n\n` +
      `■ 회사명: ${formData.company}\n` +
      `■ 담당자: ${formData.person}\n` +
      `■ 연락처: ${formData.phone}\n` +
      `■ 이메일: ${formData.email}\n` +
      `■ 접수일시: ${new Date().toLocaleString('ko-KR')}\n\n` +
      `[문의 내용]\n${formData.message}\n\n` +
      `─────────────────────\n` +
      `seopung.co.kr 자동 발송\n`
    );
    window.location.href = `mailto:${COMPANY.inquiryEmail}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setFormData({ company: '', person: '', phone: '', email: '', message: '' });
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/30" />
            <div className="relative z-10 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-300">
                Contact
              </p>
              <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-5xl lg:text-6xl">{copy.heroTitle}</h1>
              <p className="mt-4 text-lg text-white/90 drop-shadow">
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
                  <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                    <span className={`inline-flex items-center gap-2 ${c.text2}`}>
                      <svg className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      24시간 내 담당자 직접 회신
                    </span>
                    <span className={`inline-flex items-center gap-2 ${c.text2}`}>
                      <svg className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      샘플 무상 발송
                    </span>
                    <span className={`inline-flex items-center gap-2 ${c.text2}`}>
                      <svg className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      NDA 즉시 체결 가능
                    </span>
                  </div>
                  <p className={`mt-3 text-xs ${c.textMuted}`}>제출하신 정보는 영업 외 목적으로 사용·외부 공유되지 않습니다.</p>
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
                        문의가 접수되었습니다. 이메일 클라이언트가 열리면 <span className="font-bold">[보내기]</span>를 눌러 발송을 완료해주세요.
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

              {AFFILIATES.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {AFFILIATES.map((affiliate, i) => (
                    <Reveal key={affiliate.name} delay={i * 100}>
                      <div className={`group relative overflow-hidden rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 text-center transition-all duration-500 hover:border-ocean-400/30 ${c.cardHover}`}>
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ocean-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative">
                          <p className="mb-1 font-montserrat text-xs font-medium uppercase tracking-wider text-ocean-500">
                            {affiliate.role}
                          </p>
                          <h3 className={`mb-3 text-lg font-bold ${c.text}`}>{affiliate.name}</h3>
                          <p className={`text-sm ${c.text2}`}>{affiliate.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Reveal key={i} delay={i * 100}>
                      <PhotoNeeded
                        ratio="4/3"
                        tone="light"
                        caption="관계사 정보"
                        hint="법인명·역할 확인 후 등록"
                      />
                    </Reveal>
                  ))}
                </div>
              )}
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
                {/* 카카오맵·네이버 지도 — 한국 지도 정확도 우선 메인 카드 */}
                <div className="mx-auto mb-6 grid max-w-5xl gap-4 md:grid-cols-2">
                  <a
                    href="https://map.kakao.com/link/search/전라남도 여수시 화양면 석교로 121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 rounded-2xl border ${c.cardBorder} ${c.cardBg} p-5 transition-all duration-300 hover:border-yellow-500/40 hover:shadow-lg md:p-6`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-gray-900 shadow-sm md:h-16 md:w-16">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7 md:h-8 md:w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className={`text-base font-bold ${c.text} md:text-lg`}>카카오맵으로 보기</p>
                      <p className={`mt-0.5 text-sm ${c.text2}`}>대중교통·길찾기·로드뷰 가능</p>
                    </div>
                    <svg className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 ${c.text2}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href="https://map.naver.com/p/search/전라남도 여수시 화양면 석교로 121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 rounded-2xl border ${c.cardBorder} ${c.cardBg} p-5 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg md:p-6`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white shadow-sm md:h-16 md:w-16">
                      <span className="font-montserrat text-xl font-extrabold md:text-2xl">N</span>
                    </div>
                    <div className="flex-1">
                      <p className={`text-base font-bold ${c.text} md:text-lg`}>네이버 지도로 보기</p>
                      <p className={`mt-0.5 text-sm ${c.text2}`}>거리뷰·실내지도·맛집 정보</p>
                    </div>
                    <svg className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 ${c.text2}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* 미리보기 지도 — 정확한 주소 검색 기반 */}
                <div className={`mx-auto mb-12 max-w-5xl overflow-hidden rounded-2xl border ${c.cardBorder} shadow-xl shadow-black/15`}>
                  <iframe
                    src="https://www.google.com/maps?q=전라남도+여수시+화양면+석교로+121&t=k&z=17&output=embed"
                    className="w-full"
                    style={{ border: 0, height: '420px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="서풍 위치 - 전라남도 여수시 화양면 석교로 121 (위성지도)"
                  />
                </div>
              </Reveal>

              {/* 인근 지역·랜드마크 */}
              <Reveal delay={250}>
                <div className="mx-auto mb-10 max-w-5xl">
                  <p className="mb-4 text-center font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-ocean-500">
                    Nearby
                  </p>
                  <h3 className={`mb-6 text-center text-xl font-bold ${c.text} md:text-2xl`}>
                    인근 주요 지역
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { name: '여수 위판장', dist: '약 18 km', desc: '원료 매입처' },
                      { name: '여수엑스포역', dist: '약 22 km', desc: 'KTX 정차' },
                      { name: '여수항', dist: '약 25 km', desc: '여객·물류 거점' },
                      { name: '여수공항', dist: '약 12 km', desc: '국내선' },
                    ].map((p) => (
                      <div key={p.name} className={`rounded-xl border ${c.cardBorder} ${c.cardBg} p-4 text-center transition-colors hover:border-ocean-400/40 md:p-5`}>
                        <p className={`text-base font-bold ${c.text}`}>{p.name}</p>
                        <p className="mt-1 font-montserrat text-sm font-bold text-ocean-500">{p.dist}</p>
                        <p className={`mt-1 text-xs ${c.textMuted}`}>{p.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className={`mt-3 text-center text-xs ${c.textMuted}`}>
                    ※ 거리는 도로 기준 직선거리 근사값입니다.
                  </p>
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
