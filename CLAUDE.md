# 서풍 기업 홈페이지 (seopung-web)

영어조합법인 서풍의 공식 기업 홈페이지. 수산 OEM/B2B 기업의 기술력, 인증, 제품을 소개하는 정적 웹사이트.

## 기술 스택

- **Framework**: Next.js 16.1.6 (App Router, `output: "export"` 정적 빌드)
- **React**: 19.2.3
- **TypeScript**: 5 (strict mode)
- **Styling**: Tailwind CSS 4 + PostCSS, 커스텀 테마(`globals.css` @theme inline)
- **Animation**: GSAP 3 + Framer Motion (스크롤 애니메이션 위주)
- **Backend**: Firebase Firestore (관리자 데이터 CRUD), Firebase Auth (관리자 로그인)
- **Font**: Pretendard Variable(한글), Montserrat(영문/숫자)
- **배포**: GitHub Pages (`/out` 디렉토리) → `seopung.co.kr`

## 프로젝트 구조

```
src/
├── app/                    # 페이지 (App Router)
│   ├── page.tsx            # 홈
│   ├── about/              # 회사소개
│   ├── process/            # 가공공정
│   ├── technology/         # 설비·기술
│   ├── certification/      # 인증현황
│   ├── products/           # 제품소개
│   ├── gulbi/              # 영광굴비
│   ├── vision/             # 비전·전략
│   ├── contact/            # 문의하기
│   ├── news/               # 뉴스·공지
│   ├── resources/          # 자료실
│   ├── admin/              # 관리자 대시보드
│   ├── layout.tsx          # 루트 레이아웃
│   └── globals.css         # 글로벌 스타일 + 테마 색상
├── components/
│   ├── ui/                 # Navbar, Footer, FadeIn, Breadcrumb, CardGlow, ScrollToTop 등
│   └── sections/           # HeroSection, ProcessSection 등 페이지별 섹션
├── hooks/
│   └── useReveal.ts        # IntersectionObserver 스크롤 애니메이션 훅
└── lib/
    ├── firebase.ts         # Firebase 초기화 (projectId: seopung-website)
    ├── admin-store.ts      # Firestore CRUD 팩토리 + 관리자 인증
    ├── analytics.ts        # 방문자 추적 (analytics_daily 컬렉션)
    ├── seed-data.ts        # 초기 데이터 시딩
    ├── storage.ts          # localStorage 래퍼 (폴백용)
    └── utils.ts            # 유틸리티 함수
```

## 컨벤션

### 파일 네이밍
- 페이지: `app/[route]/page.tsx`
- 컴포넌트: PascalCase (`Navbar.tsx`, `FadeIn.tsx`)
- 라이브러리: camelCase (`admin-store.ts`, `firebase.ts`)

### 스타일링
- Tailwind CSS 유틸리티 클래스 사용 (인라인)
- 커스텀 색상은 `globals.css`의 `@theme inline` 블록에 정의
  - `ocean-*`: 주 브랜드 색상 (파란색 계열)
  - `gold-*`: 보조 색상 (프리미엄/굴비)
  - `navy-*`: 다크 톤 (관리자, 푸터)
  - `warm-*`: 배경 톤
- 폰트: `font-[family-name:var(--font-pretendard)]`, `font-[family-name:var(--font-montserrat)]`

### 컴포넌트 패턴
- 모든 페이지 `'use client'` (정적 빌드이므로 클라이언트 컴포넌트)
- 스크롤 애니메이션: `useReveal` 훅 또는 `<FadeIn>` 래퍼 사용
- Firestore 데이터: `admin-store.ts`의 CRUD 팩토리 사용, 하드코딩 폴백 병행
- 이미지: `public/images/` 하위에 카테고리별 정리, `<Image>` 컴포넌트 사용 (unoptimized)

## Firebase 컬렉션 (Firestore)

| 컬렉션 | 용도 |
|--------|------|
| `web_news` | 뉴스/소식 |
| `web_certifications` | 인증 정보 |
| `web_equipment` | 설비 정보 |
| `web_investments` | 투자 계획 |
| `web_history` | 회사 연혁 |
| `web_gallery` | 갤러리 이미지 |
| `web_notices` | 공지사항 |
| `web_company_info` | 회사 기본정보 |
| `web_inquiries` | 문의 접수 |
| `analytics_daily` | 일별 방문자 (shop과 공유) |

## 빌드 & 배포

```bash
npm run dev      # 개발 서버
npm run build    # 정적 빌드 → /out
npm run lint     # ESLint
```

- `output: "export"` → 정적 HTML 생성, GitHub Pages에 배포
- `images.unoptimized: true` → 정적 빌드에서 이미지 최적화 불가

## 작업 시 주의사항

- 정적 사이트이므로 서버 컴포넌트/API Route 사용 불가
- Firestore 연동은 클라이언트 사이드에서만 동작
- 문의 폼은 Firestore에 저장되지만 이메일 알림은 미구현
- `public/images/` 경로의 이미지가 실제 존재하는지 확인 후 참조
- 관리자(`/admin`)는 Firebase Auth 로그인 필요

## 고객 피드백 (미팅 요약, 2026-04)

> 아래는 고객 미팅에서 나온 요구사항. 작업 시 항상 이 방향성을 반영할 것.

### 디자인 & 가시성
- **글자 크기 키우기** — 가독성 개선 필요 (특히 모바일)
- **깔끔한 이미지 선호** — 현장 사진의 지저분함 지적, 고품질 스튜디오 촬영 이미지로 교체
- **밝고 진취적인 회사 이미지** 추구

### 콘텐츠 방향
- **인증(HACCP, ASC, MSC 등)을 핵심 강점으로 강조** — 가장 눈에 띄게
- **B2B 중심 간결한 정보** — 불필요한 설명 줄이고 핵심만
- **회사 소개·제품 정보 명확성** 높이기
- **"영농조합법인" vs "영어조합법인"** 명칭 통일 필요 (고객 확인 후 반영)

### SEO & 마케팅
- **네이버·구글 검색 최적화** 적극 진행
- **명함 QR 코드** 생성 기능 (홈페이지 URL → QR)

## 완성도 개선 우선순위

### P0 (필수)
- [ ] 연락처 실제 정보로 교체 (전화번호, 이메일)
- [ ] 인증서 PDF 파일 업로드 및 다운로드 연동
- [ ] 문의 폼 → 이메일 알림 연동 (Firebase Cloud Functions 또는 외부 API)
- [ ] 글자 크기·가시성 개선 (본문·제목 폰트 사이즈 상향, 모바일 포함)
- [ ] 인증 섹션 강조 — 홈페이지 상단 배치, 뱃지 크기 확대
- [ ] 현장 사진 → 고품질 스튜디오 이미지로 교체 (공정, 설비, 제품)

### P1 (높음)
- [ ] 네이버 검색 최적화 (네이버 서치어드바이저 등록, 사이트맵 제출)
- [ ] 구글 SEO 강화 (Search Console 등록, 메타데이터 서브페이지별 최적화)
- [ ] SNS 링크 실제 URL 연결 (현재 `#` 플레이스홀더)
- [ ] 제품 이미지 보강 (깔끔한 패키지 사진으로)
- [ ] B2B 정보 간결화 — 회사소개·제품 페이지 텍스트 정리
- [ ] 명함 QR 코드 생성 페이지 또는 다운로드 기능
- [ ] 사이트맵 동적 생성

### P2 (중간)
- [ ] 파트너사 로고 이미지 교체 (현재 텍스트)
- [ ] 카카오/네이버 지도 연동
- [ ] Google Analytics 연동
- [ ] "영농조합법인"/"영어조합법인" 명칭 통일 (고객 확인 후)
- [ ] 밝고 진취적인 톤으로 전체 색상·이미지 톤 조정

### P3 (향후)
- [ ] 다국어 지원 (영문, 일문)
- [ ] 제품 상세 페이지 확장
- [ ] 오프라인 지원 (Service Worker)
- [ ] 이미지 CDN 도입
