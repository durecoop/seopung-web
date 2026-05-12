# 서풍 홈페이지 정제 계획 (Refinement Plan)

> 작성: 2026-05-12
> 4개 에이전트 병렬 검수 결과 통합 + 우선순위화

## 현재 점수

| 측면 | 점수 | 1줄 평 |
|---|---|---|
| 전략·설득력 | **5.5 / 10** | 차별화 신호 0, 자기서사 카피 |
| 디자인·시각 | **5.9 / 10** | 타이포 위계 부재, 컴포넌트 일관성 낮음 |
| 빌드·기술 | **9 / 10** | 22 정적 페이지 클린, 1 lockfile 경고 |
| 사진 자산 | **5 / 10** | 99장(55%) 미사용, food/ 45장 중복 |

## 5가지 핵심 단일 변화 (10/10 가는 길)

1. **히어로 첫 화면**: 자기서사 카피 → "거래처 + 수치 + 인증" 증거 보드
2. **타이포 위계**: h1 lg:7xl 폭주 → lg:5xl, 본문 text-2xl → text-base/lg, 토큰화
3. **컴포넌트 시스템**: `<Card>`, `<SectionHeader>`, `<Btn>` 추출 (인라인 클래스 12곳 제거)
4. **CTA 마찰 제거**: 모든 "문의하기" 옆에 "24h 회신 · 샘플 무상 · NDA" 마이크로카피
5. **사진 정리**: 99장 미사용 삭제 + 검증 안된 PARTNERS placeholder 제거

---

## 우선순위별 실행 항목

### P0 — 즉시 (이번 실행 분, ~30분, 큰 영향)

| ID | 항목 | 파일 | 영향 |
|---|---|---|---|
| P0-1 | `food/` 폴더 45장 삭제 (food-web/와 완전 중복) | public/images/food/ | 용량 -15MB |
| P0-2 | `team/` 미사용 사진 5장 삭제 | public/images/team/ | AI 우려 제거 |
| P0-3 | 본문 폰트 크기 다운: 17px → 16px (PC), 16.5px → 16px (모바일) | globals.css | 위계 회복 |
| P0-4 | Footer 저대비 텍스트 수정: `text-white/40` → `text-white/65` | Footer·ThemedFooter | WCAG AA |
| P0-5 | 인증 섹션 h2 크기 다운: `lg:text-7xl` → `lg:text-5xl` | PageSections | 격조 회복 |
| P0-6 | Hero h1 크기 다운: `lg:text-6xl` → `lg:text-5xl`, max-w-3xl | HeroCorporate | 줄바꿈 정리 |
| P0-7 | 본문 사이즈 다운: `text-xl md:text-2xl` → `text-base md:text-lg` 본문 일괄 | PageSections | 위계 회복 |

### P1 — 단기 (다음 단계, ~1시간)

| ID | 항목 | 파일 |
|---|---|---|
| P1-1 | Hero 슬라이드 카피 강화 — 증거 카드로 (수치·인증·거래처) | HeroCorporate |
| P1-2 | 카드 radius 통일 `rounded-xl` | 전 컴포넌트 |
| P1-3 | hover 효과 단순화 (scale-110 → scale-[1.02]) | PageSections·about |
| P1-4 | 섹션 패딩 차등화 (인증 py-20, 회사소개 py-28, 배너 py-16) | PageSections |
| P1-5 | CTA 마이크로카피 추가 ("24h · 샘플무상 · NDA") | PageSections·contact |
| P1-6 | 인증서 PDF 다운로드 실제 링크 연결 (PDF 받은 후) | certification |
| P1-7 | PARTNERS 빈배열 fallback 정리 — 익명 카테고리 카드로 | PageSections |
| P1-8 | OEM 약속 3가지를 contact 폼 헤더로 이동 | contact |

### P2 — 중기 (신규 자산 필요, 사용자 확인 권장)

| ID | 항목 | 파일 |
|---|---|---|
| P2-1 | `<Card>`, `<SectionHeader>`, `<Btn>`, `<Heading>` 원자 컴포넌트 추출 | ui/atoms/ (신규) |
| P2-2 | themes.ts에 radius/shadow/sectionY 토큰 추가 | themes.ts |
| P2-3 | 신규 페이지 `/case-studies` (PB 케이스 1~3건) | app/case-studies/ |
| P2-4 | 신규 페이지 `/sample-request` (셀프 샘플 신청 폼) | app/sample-request/ |
| P2-5 | `/specs` 또는 인증 페이지 내 "스펙 다운로드 센터" | certification |
| P2-6 | "왜 서풍? vs 사조/동원/CJ" 비교표 | about 또는 신규 |

### P3 — 장기 (고객사 응답 의존)

| ID | 항목 | 의존성 |
|---|---|---|
| P3-1 | `STATS` 값 채우기 (매출/품목/KPI) | INFO_REQUEST B 섹션 |
| P3-2 | `PARTNERS` 거래처 로고 + 동의 | INFO_REQUEST F 섹션 |
| P3-3 | PhotoNeeded → 실사 사진 교체 | INFO_REQUEST H 섹션 |
| P3-4 | 인증서 PDF 다운로드 활성화 | INFO_REQUEST C 섹션 |

---

## 이번 실행에서 다룰 범위

**Phase A (현재): P0 7개 항목 일괄 처리** → 빌드 검증 → 푸시
**Phase B (사용자 확인 후): P1 8개 항목** → 빌드 → 푸시
**Phase C (선택): P2 신규 페이지·컴포넌트 시스템** — 사용자 결정 필요

P3은 고객 회신 후 자동 반영 (config 파일 수정만으로).

---

## 변경 후 예상 점수

| 측면 | Before | After P0+P1 | After P2 |
|---|---|---|---|
| 전략·설득력 | 5.5 | 7.5 | 9.0 |
| 디자인·시각 | 5.9 | 7.5 | 9.0 |
| 빌드·기술 | 9.0 | 9.0 | 9.0 |
| 사진 자산 | 5.0 | 8.0 | 8.5 |
