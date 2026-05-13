'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeLayout from '@/components/ui/ThemeLayout';
import Reveal from '@/components/ui/FadeIn';
import { getImagePath } from '@/lib/utils';
import { galleryCrud, type GalleryItem as GalleryType } from '@/lib/admin-store';
import type { ThemeColors } from '@/hooks/useTheme';

/* ── Skin-specific copy ── */
const COPY: Record<number, {
  heroTitle: string;
  heroSubtitle: string;
  certHeading: string;
  certSubtitle: string;
  certNote: string;
  galleryHeading: string;
  brochureHeading: string;
  brochureDesc: string;
  brochureButton: string;
  brochureNotice: string;
}> = {
  0: {
    heroTitle: '자료실',
    heroSubtitle: '인증서, 사진 갤러리 및 회사 자료',
    certHeading: '인증서',
    certSubtitle: '거래처 등록 및 품질 증빙에 필요한 인증서',
    certNote: '※ 원본 인증서가 필요하신 경우 문의 바랍니다',
    galleryHeading: '포토 갤러리',
    brochureHeading: '회사소개서 다운로드',
    brochureDesc: '영어조합법인 서풍의 회사소개서를 PDF로 다운로드하세요',
    brochureButton: 'PDF 다운로드',
    brochureNotice: '※ 준비 중입니다.',
  },
  1: {
    heroTitle: '무기고',
    heroSubtitle: '서풍의 전투 장비와 검증된 무기 목록',
    certHeading: '전투 인증서',
    certSubtitle: '거친 시장에서 승리를 증명하는 인증 무기',
    certNote: '※ 원본 인증서가 필요하면 즉시 요청하세요',
    galleryHeading: '전장 갤러리',
    brochureHeading: '작전 보고서 다운로드',
    brochureDesc: '서풍의 전투력이 담긴 회사소개서를 확인하세요',
    brochureButton: '보고서 다운로드',
    brochureNotice: '※ 준비 중입니다.',
  },
  2: {
    heroTitle: '데이터 허브',
    heroSubtitle: '인증 데이터, 비주얼 아카이브, 기업 문서',
    certHeading: '인증 데이터베이스',
    certSubtitle: '거래처 등록 및 품질 검증을 위한 인증 데이터',
    certNote: '※ 원본 파일이 필요하시면 시스템을 통해 요청해 주세요',
    galleryHeading: '비주얼 아카이브',
    brochureHeading: '기업 프로파일 다운로드',
    brochureDesc: '서풍의 기술력과 데이터를 담은 프로파일을 확인하세요',
    brochureButton: '프로파일 다운로드',
    brochureNotice: '※ 준비 중입니다.',
  },
  3: {
    heroTitle: '아카이브',
    heroSubtitle: '서풍의 여정을 기록한 자료들',
    certHeading: '인증의 기록',
    certSubtitle: '30년의 약속이 담긴 인증서',
    certNote: '※ 원본 인증서가 필요하시면 편하게 문의해 주세요',
    galleryHeading: '포토 스토리',
    brochureHeading: '브랜드 스토리북',
    brochureDesc: '서풍의 이야기가 담긴 회사소개서를 만나보세요',
    brochureButton: '스토리북 다운로드',
    brochureNotice: '※ 준비 중입니다.',
  },
  4: {
    heroTitle: '프리미엄 자료실',
    heroSubtitle: '업계 최고 수준의 인증 자료와 기업 문서',
    certHeading: '프리미엄 인증서',
    certSubtitle: '대한민국 대표 수산 OEM의 검증된 인증 현황',
    certNote: '※ 원본 인증서가 필요하시면 담당자에게 요청해 주세요',
    galleryHeading: '프리미엄 갤러리',
    brochureHeading: '기업소개서 다운로드',
    brochureDesc: '서풍의 리더십과 실적이 담긴 기업소개서',
    brochureButton: '기업소개서 받기',
    brochureNotice: '※ 준비 중입니다.',
  },
  5: {
    heroTitle: '개척자의 기록',
    heroSubtitle: '새로운 길을 연 증거와 기록들',
    certHeading: '개척 인증서',
    certSubtitle: '남들이 따라올 수 없는 기준을 증명하는 인증',
    certNote: '※ 원본 인증서가 필요하시면 언제든 요청해 주세요',
    galleryHeading: '프론티어 갤러리',
    brochureHeading: '개척 보고서 다운로드',
    brochureDesc: '서풍이 열어온 새로운 길이 담긴 회사소개서',
    brochureButton: '보고서 다운로드',
    brochureNotice: '※ 준비 중입니다.',
  },
  6: {
    heroTitle: '자료실',
    heroSubtitle: '인증서 · 갤러리 · 회사 자료',
    certHeading: '인증서',
    certSubtitle: '거래처 등록 및 품질 증빙을 위한 인증 자료',
    certNote: '※ 원본 인증서가 필요하신 경우 문의 바랍니다',
    galleryHeading: '포토 갤러리',
    brochureHeading: '회사소개서 다운로드',
    brochureDesc: '서풍의 기술력과 비전이 담긴 회사소개서를 확인하세요',
    brochureButton: '다운로드',
    brochureNotice: '※ 준비 중입니다.',
  },
};

/* ──────────────────────────────────────────────
   Section heading
   ────────────────────────────────────────────── */
function SectionHeading({ title, subtitle, c }: { title: string; subtitle?: string; c: ThemeColors }) {
  return (
    <div className="mb-12 text-center">
      <h2 className={`font-pretendard text-3xl font-bold ${c.text} md:text-4xl`}>
        {title}
      </h2>
      <div className="mx-auto mt-3 h-[2px] w-16 bg-gradient-to-r from-gold-500 to-gold-300" />
      {subtitle && (
        <p className={`mt-4 text-base ${c.text2} md:text-lg`}>{subtitle}</p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Shield icon SVG for certifications
   ────────────────────────────────────────────── */
function ShieldIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Download icon SVG
   ────────────────────────────────────────────── */
function DownloadIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Data: Certifications
   ────────────────────────────────────────────── */
interface Certification {
  name: string;
  description: string;
  detail?: string;
  image?: string;
  status: '유효' | '갱신예정';
}

const CERTIFICATIONS: Certification[] = [
  {
    name: 'HACCP 인증서',
    description: '식품안전관리인증기준 적용업소',
    detail: '인증번호 보유 | 유효기간 2017.05~2020.05 (갱신)',
    status: '유효',
  },
  {
    name: '수산물이력추적관리 등록증',
    description: '제1164호',
    image: 'certification/traceability-cert.jpg',
    status: '유효',
  },
  {
    name: '수산물 품질인증서',
    description: '국립수산물품질관리원',
    status: '유효',
  },
  {
    name: 'ASC 인증',
    description: '양식 수산물 지속가능성 인증, 2024년',
    status: '유효',
  },
  {
    name: 'MSC 인증',
    description: '자연산 수산물 지속가능 어업 인증, 2024년',
    status: '유효',
  },
];

/* ──────────────────────────────────────────────
   Data: Gallery photos
   ────────────────────────────────────────────── */
interface GalleryPhoto {
  src: string;
  label: string;
  category: '공장' | '위판장' | '굴비' | '제품';
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Factory
  { src: 'process/04-tunnel-freezer.jpg', label: '터널프리저 (IQF)', category: '공장' },
  { src: 'process/05-rotary-packer.jpg', label: '로터리 포장기', category: '공장' },
  { src: 'facility/fish-scanner.jpg', label: '어류 스캔 절단기', category: '공장' },
  { src: 'facility/radiation-tester.jpg', label: '방사능 검사 장비', category: '공장' },
  { src: 'process/06-cold-storage.jpg', label: '냉동창고', category: '공장' },
  // Auction
  { src: 'hero/dawn-unloading.jpg', label: '새벽 하역', category: '위판장' },
  { src: 'auction/director-inspect.jpg', label: '원료 검수', category: '위판장' },
  { src: 'auction/auction-panorama.jpg', label: '위판장 전경', category: '위판장' },
  { src: 'auction/sea-bream.jpg', label: '참돔', category: '위판장' },
  { src: 'auction/mackerel-large.jpg', label: '대삼치', category: '위판장' },
  { src: 'hero/night-harbor.jpg', label: '여수항 야경', category: '위판장' },
  // Gulbi
  { src: 'gulbi/gill-salting.jpg', label: '아가미 섭간', category: '굴비' },
  { src: 'gulbi/tying.jpg', label: '굴비 엮기', category: '굴비' },
  { src: 'gulbi/tying-2.jpg', label: '엮기 작업', category: '굴비' },
  { src: 'gulbi/weighing.jpg', label: '무게 선별', category: '굴비' },
  { src: 'gulbi/drying.jpg', label: '건조', category: '굴비' },
  // Products
  { src: 'products/asc-package.png', label: 'ASC 인증 제품', category: '제품' },
  { src: 'products/mealkit.png', label: '밀키트 제품', category: '제품' },
];

const GALLERY_TABS = ['전체', '공장', '위판장', '굴비', '제품'] as const;

/* ──────────────────────────────────────────────
   Lightbox component
   ────────────────────────────────────────────── */
function Lightbox({ photo, onClose }: { photo: GalleryPhoto | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 pb-[env(safe-area-inset-bottom)]"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] max-w-[90vw] md:max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium gap-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          닫기
        </button>
        <Image
          src={getImagePath(`/images/${photo.src}`)}
          alt={photo.label}
          width={1200}
          height={800}
          className="max-h-[80vh] w-auto rounded-lg object-contain"
        />
        <div className="mt-3 text-center">
          <span className="inline-block rounded-full bg-gray-100/80 px-4 py-1.5 text-sm font-medium text-gray-900">
            {photo.label}
          </span>
          <span className="ml-2 inline-block rounded-full bg-ocean-500/30 px-3 py-1 text-xs text-ocean-300">
            {photo.category}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════ */
export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<string>('전체');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState(GALLERY_PHOTOS);

  useEffect(() => {
    galleryCrud.getAll('sortOrder', 'asc').then((items: GalleryType[]) => {
      if (items.length > 0) setGalleryPhotos(items.map(g => ({ src: g.imageUrl.replace('/images/', ''), label: g.label, category: g.category as GalleryPhoto['category'] })));
    }).catch(() => {});
  }, []);

  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);

  const filteredPhotos = activeTab === '전체'
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === activeTab);

  return (
    <ThemeLayout breadcrumb={[{ label: '자료실' }]}>
      {(c) => {
        const copy = COPY[c.theme.id] || COPY[0];
        return (
          <>
            {/* ── Hero ── */}
            <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
              <Image
                src={getImagePath('/images/food-web/pc0031187533.jpg')}
                alt={copy.heroTitle}
                fill
                className="object-cover"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${c.gradientFade}`} />
              <div className="relative z-10 text-center px-6">
                <h1 className={`font-montserrat text-4xl font-bold tracking-tight ${c.text} md:text-5xl lg:text-6xl`}>
                  {copy.heroTitle}
                </h1>
                <p className={`mt-3 text-lg ${c.text2} md:text-xl`}>
                  {copy.heroSubtitle}
                </p>
              </div>
            </section>

            {/* ══════════════════════════════════════
               Section 1: 인증서 다운로드
               ══════════════════════════════════════ */}
            <section className="py-24 md:py-32 px-6">
              <div className="mx-auto max-w-6xl">
                <Reveal>
                  <SectionHeading
                    title={copy.certHeading}
                    subtitle={copy.certSubtitle}
                    c={c}
                  />
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2">
                  {CERTIFICATIONS.map((cert, i) => (
                    <Reveal key={cert.name} delay={i * 100}>
                      <div className={`group relative rounded-2xl border ${c.cardBorder} ${c.cardBg} p-6 transition-all duration-300 hover:border-gold-500/20 hover:shadow-lg hover:shadow-gold-500/5`}>
                        {/* Header row */}
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ocean-500/10 text-ocean-500">
                            <ShieldIcon />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`text-lg font-bold ${c.text}`}>{cert.name}</h3>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  cert.status === '유효'
                                    ? 'bg-emerald-500/15 text-emerald-400'
                                    : 'bg-amber-500/15 text-amber-400'
                                }`}
                              >
                                {cert.status}
                              </span>
                            </div>
                            <p className={`mt-1 text-sm ${c.text2}`}>{cert.description}</p>
                            {cert.detail && (
                              <p className={`mt-1 text-xs ${c.text2}`}>{cert.detail}</p>
                            )}
                          </div>
                        </div>

                        {/* Thumbnail if available */}
                        {cert.image && (
                          <div className="mt-4 overflow-hidden rounded-lg">
                            <Image
                              src={getImagePath(`/images/${cert.image}`)}
                              alt={cert.name}
                              width={600}
                              height={400}
                              className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}

                        {/* Download button */}
                        <button
                          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/40 px-4 py-2.5 min-h-[44px] text-sm font-medium text-ocean-500 transition-all duration-300 hover:bg-ocean-500/10 hover:border-gold-400"
                        >
                          <DownloadIcon className="h-4 w-4" />
                          다운로드
                        </button>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={500}>
                  <p className={`mt-8 text-center text-sm ${c.text2}`}>
                    {copy.certNote}
                  </p>
                </Reveal>
              </div>
            </section>

            {/* ══════════════════════════════════════
               Section 2: 포토 갤러리
               ══════════════════════════════════════ */}
            <section className={`${c.sectionAlt} py-24 md:py-32 px-6`}>
              <div className="mx-auto max-w-6xl">
                <Reveal>
                  <SectionHeading title={copy.galleryHeading} c={c} />
                </Reveal>

                {/* Tab filter */}
                <Reveal delay={100}>
                  <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
                    {GALLERY_TABS.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-5 py-2 min-h-[44px] text-sm font-medium transition-all duration-300 ${
                          activeTab === tab
                            ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/25'
                            : `${c.cardBg} ${c.text2} hover:bg-navy-700`
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </Reveal>

                {/* Photo grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-5">
                  {filteredPhotos.map((photo, i) => (
                    <Reveal key={photo.src} delay={i * 60}>
                      <button
                        onClick={() => setLightboxPhoto(photo)}
                        className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/50"
                      >
                        <Image
                          src={getImagePath(`/images/${photo.src}`)}
                          alt={photo.label}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        {/* Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${c.gradientFade} opacity-0 transition-opacity duration-300 group-hover:opacity-80`} />
                        {/* Category badge */}
                        <span className={`absolute top-1.5 left-1.5 sm:top-2 sm:left-2 rounded-full ${c.overlay} px-2 sm:px-2.5 py-0.5 text-[10px] font-medium ${c.text2} backdrop-blur-sm md:text-xs`}>
                          {photo.category}
                        </span>
                        {/* Label on hover */}
                        <span className={`absolute bottom-0 left-0 right-0 translate-y-full p-3 text-center text-sm font-medium ${c.text} transition-transform duration-300 group-hover:translate-y-0`}>
                          {photo.label}
                        </span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════
               Section 3: 회사소개서
               ══════════════════════════════════════ */}
            <section className="py-24 md:py-32 px-6">
              <div className="mx-auto max-w-2xl">
                <Reveal>
                  <div className={`rounded-2xl border ${c.cardBorder} ${c.cardBg} p-8 text-center md:p-12`}>
                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-500/10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-ocean-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>

                    <h2 className={`font-pretendard text-2xl font-bold ${c.text} md:text-3xl`}>
                      {copy.brochureHeading}
                    </h2>
                    <p className={`mt-3 ${c.text2}`}>
                      {copy.brochureDesc}
                    </p>

                    {/* Large download button */}
                    <button
                      className="mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-ocean-500 to-ocean-400 px-8 py-3.5 min-h-[44px] text-base font-semibold text-white shadow-lg shadow-ocean-500/20 transition-all duration-300 hover:shadow-ocean-500/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <DownloadIcon className="h-5 w-5" />
                      {copy.brochureButton}
                    </button>

                    {/* Notice */}
                    <p className={`mt-6 text-sm ${c.text2}`}>
                      {copy.brochureNotice}{' '}
                      <Link href="/contact" className="text-ocean-400 underline underline-offset-2 hover:text-ocean-300 transition-colors">
                        문의 페이지
                      </Link>
                      를 통해 요청해주세요.
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Lightbox */}
            <Lightbox photo={lightboxPhoto} onClose={closeLightbox} />
          </>
        );
      }}
    </ThemeLayout>
  );
}
