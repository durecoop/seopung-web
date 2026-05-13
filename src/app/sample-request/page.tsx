'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { saveInquiry, generateId, type Inquiry } from '@/lib/admin-store';
import { COMPANY } from '@/lib/company-config';

const CATEGORIES = [
  { key: 'frozen', label: '냉동수산가공', desc: '고등어·삼치·갈치·오징어·아귀 외' },
  { key: 'mealkit', label: '밀키트·HMR', desc: '간편식·반조리 식자재' },
  { key: 'gulbi', label: '영광굴비', desc: '프리미엄 선물세트' },
  { key: 'sustainable', label: 'ASC·MSC 인증', desc: '지속가능 양식·자연산' },
];

export default function SampleRequestPage() {
  const [form, setForm] = useState({
    company: '',
    person: '',
    phone: '',
    email: '',
    categories: [] as string[],
    quantity: '',
    address: '',
    purpose: '',
    nda: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (key: string) => {
    setForm((p) => ({
      ...p,
      categories: p.categories.includes(key) ? p.categories.filter((c) => c !== key) : [...p.categories, key],
    }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.company.trim()) next.company = '회사명을 입력해 주세요';
    if (!form.person.trim()) next.person = '담당자명을 입력해 주세요';
    if (!form.phone.trim() || !/^[\d\-+() ]{9,}$/.test(form.phone.trim())) next.phone = '연락처를 확인해 주세요';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = '이메일을 확인해 주세요';
    if (form.categories.length === 0) next.categories = '카테고리를 1개 이상 선택해 주세요';
    if (!form.address.trim()) next.address = '배송지를 입력해 주세요';
    if (!form.nda) next.nda = 'NDA 안내에 동의해 주세요';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const summary =
      `[샘플 요청]\n` +
      `카테고리: ${form.categories.map((k) => CATEGORIES.find((c) => c.key === k)?.label).join(', ')}\n` +
      `수량/규모: ${form.quantity || '미기재'}\n` +
      `배송지: ${form.address}\n` +
      `검토 목적: ${form.purpose || '미기재'}\n` +
      `NDA 동의: 예`;

    const inquiry: Inquiry = {
      id: generateId(),
      company: form.company.trim(),
      person: form.person.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      message: summary,
      date: new Date().toISOString(),
      read: false,
    };
    saveInquiry(inquiry);

    // 이메일 클라이언트로 자동 전송
    const subject = encodeURIComponent('홈페이지 / 쇼핑몰 문의 접수 — 샘플 요청');
    const body = encodeURIComponent(
      `[샘플 요청 접수]\n\n` +
      `■ 회사명: ${form.company}\n` +
      `■ 담당자: ${form.person}\n` +
      `■ 연락처: ${form.phone}\n` +
      `■ 이메일: ${form.email}\n` +
      `■ 접수일시: ${new Date().toLocaleString('ko-KR')}\n\n` +
      summary + `\n\n` +
      `─────────────────────\n` +
      `seopung.co.kr/sample-request 자동 발송\n`
    );
    window.location.href = `mailto:${COMPANY.inquiryEmail}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setForm({ company: '', person: '', phone: '', email: '', categories: [], quantity: '', address: '', purpose: '', nda: false });
    setErrors({});
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <ThemeLayout breadcrumb={[{ label: '샘플 요청' }]}>
      {(c) => (
        <>
          {/* ── Hero ── */}
          <section className="relative py-20 md:py-24">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <p className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.3em] text-ocean-500">
                Sample Request
              </p>
              <h1 className={`text-3xl font-bold tracking-tight ${c.text} md:text-4xl lg:text-5xl`}>샘플 요청</h1>
              <p className={`mt-4 text-base ${c.text2} md:text-lg`}>
                OEM 검토용 샘플을 무상으로 발송해 드립니다. 영업일 기준 3~5일 이내 발송.
              </p>
              <div className={`mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm ${c.text2}`}>
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  무상 발송
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  영업일 3~5일 발송
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  NDA 즉시 체결
                </span>
              </div>
            </div>
          </section>

          {/* ── Form ── */}
          <section className="relative pb-24">
            <div className="mx-auto max-w-3xl px-6">
              <Reveal>
                <form onSubmit={handleSubmit} className={`space-y-7 rounded-xl border ${c.cardBorder} ${c.cardBg} p-7 md:p-10`}>
                  {/* Categories */}
                  <div>
                    <label className={`mb-3 block text-sm font-semibold ${c.text}`}>
                      샘플 카테고리 <span className="text-ocean-500">*</span>{' '}
                      <span className={`text-xs font-normal ${c.textMuted}`}>(복수 선택 가능)</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {CATEGORIES.map((cat) => {
                        const active = form.categories.includes(cat.key);
                        return (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => toggleCategory(cat.key)}
                            className={`rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                              active
                                ? 'border-ocean-500 bg-ocean-500/10'
                                : `${c.cardBorder} ${c.cardBg} hover:border-ocean-400/40`
                            }`}
                          >
                            <span className={`block text-sm font-semibold ${active ? 'text-ocean-500' : c.text}`}>
                              {cat.label}
                            </span>
                            <span className={`mt-0.5 block text-xs ${c.textMuted}`}>{cat.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.categories && <p className="mt-2 text-xs text-red-400">{errors.categories}</p>}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" className={`mb-2 block text-sm font-semibold ${c.text}`}>
                      예상 수량/규모 <span className={`font-normal ${c.textMuted}`}>(선택)</span>
                    </label>
                    <input
                      id="quantity"
                      type="text"
                      value={form.quantity}
                      onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
                      placeholder="예: 월 1만 팩, 분기 5톤"
                      className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3 outline-none transition-all focus:ring-1 focus:ring-ocean-500`}
                    />
                  </div>

                  {/* Company/Person */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="company" className={`mb-2 block text-sm font-semibold ${c.text}`}>
                        회사명 <span className="text-ocean-500">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                        className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3 outline-none transition-all focus:ring-1 focus:ring-ocean-500 ${errors.company ? 'border-red-500/60' : ''}`}
                      />
                      {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
                    </div>
                    <div>
                      <label htmlFor="person" className={`mb-2 block text-sm font-semibold ${c.text}`}>
                        담당자명 <span className="text-ocean-500">*</span>
                      </label>
                      <input
                        id="person"
                        type="text"
                        value={form.person}
                        onChange={(e) => setForm((p) => ({ ...p, person: e.target.value }))}
                        className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3 outline-none transition-all focus:ring-1 focus:ring-ocean-500 ${errors.person ? 'border-red-500/60' : ''}`}
                      />
                      {errors.person && <p className="mt-1 text-xs text-red-400">{errors.person}</p>}
                    </div>
                  </div>

                  {/* Phone/Email */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className={`mb-2 block text-sm font-semibold ${c.text}`}>
                        연락처 <span className="text-ocean-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="010-0000-0000"
                        className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3 outline-none transition-all focus:ring-1 focus:ring-ocean-500 ${errors.phone ? 'border-red-500/60' : ''}`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className={`mb-2 block text-sm font-semibold ${c.text}`}>
                        이메일 <span className="text-ocean-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3 outline-none transition-all focus:ring-1 focus:ring-ocean-500 ${errors.email ? 'border-red-500/60' : ''}`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className={`mb-2 block text-sm font-semibold ${c.text}`}>
                      샘플 배송지 <span className="text-ocean-500">*</span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                      placeholder="시·도 / 우편번호 / 상세 주소"
                      className={`w-full rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3 outline-none transition-all focus:ring-1 focus:ring-ocean-500 ${errors.address ? 'border-red-500/60' : ''}`}
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
                  </div>

                  {/* Purpose */}
                  <div>
                    <label htmlFor="purpose" className={`mb-2 block text-sm font-semibold ${c.text}`}>
                      검토 목적 <span className={`font-normal ${c.textMuted}`}>(선택)</span>
                    </label>
                    <textarea
                      id="purpose"
                      rows={4}
                      value={form.purpose}
                      onChange={(e) => setForm((p) => ({ ...p, purpose: e.target.value }))}
                      placeholder="예: 신규 PB 라인업 검토, 메뉴 식자재 대체, 신제품 R&D"
                      className={`w-full resize-none rounded-xl border ${c.inputBg} ${c.inputBorder} px-5 py-3 outline-none transition-all focus:ring-1 focus:ring-ocean-500`}
                    />
                  </div>

                  {/* NDA */}
                  <div>
                    <label className={`flex items-start gap-3 text-sm ${c.text2}`}>
                      <input
                        type="checkbox"
                        checked={form.nda}
                        onChange={(e) => setForm((p) => ({ ...p, nda: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-ocean-500 focus:ring-ocean-500"
                      />
                      <span>
                        제출 정보는 영업 외 목적으로 사용·외부 공유되지 않으며, 요청 시 NDA 즉시 체결이 가능합니다.{' '}
                        <span className="text-ocean-500">*</span>
                      </span>
                    </label>
                    {errors.nda && <p className="mt-1 text-xs text-red-400">{errors.nda}</p>}
                  </div>

                  {submitted && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3.5 text-center text-sm font-medium text-green-400">
                      샘플 요청이 접수되었습니다. 이메일 클라이언트가 열리면 <span className="font-bold">[보내기]</span>를 눌러 발송을 완료해주세요.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-ocean-500 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-ocean-400 hover:shadow-lg"
                  >
                    샘플 요청 제출
                  </button>
                </form>
              </Reveal>

              <div className="mt-8 text-center">
                <p className={`text-sm ${c.textMuted}`}>
                  먼저 상담이 필요하시면{' '}
                  <Link href="/contact" className="text-ocean-500 underline-offset-4 hover:underline">
                    문의하기
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </ThemeLayout>
  );
}
