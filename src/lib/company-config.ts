/**
 * 회사 정보 단일 소스. 모든 수치·연도·고유명사는 원본 자료 검증 완료.
 * 검증 출처: docs/SEOPUNG_RESEARCH.md
 *
 * 미확정 항목은 null/빈 배열로 두어 UI에서 자동 숨김 처리.
 * 미확정 목록은 docs/INFO_REQUEST.md 참조.
 */

export const COMPANY = {
  name: '영어조합법인 서풍',
  shortName: '서풍',
  ceoName: '김태환',
  ceoTitle: '상무이사',
  address: '전라남도 여수시 석교로 121',
  addressDetail: '화양면',
  postalCode: null as string | null,
  bizNumber: '417-81-41979',
  foundedYear: null as string | null,
  phone: null as string | null,
  fax: null as string | null,
  email: null as string | null,
  tagline: '지속가능한 바다, 책임 있는 먹거리의 약속',
  description: '여수 위판장 직매입부터 가공·보관·유통까지 한 흐름으로 운영하는 수산 OEM 전문기업',
  vision: 'No.1 수산 가공 파트너',
} as const;

/**
 * 회사 KPI / 통계 — 원본 PPTX(영어조합법인 서풍_2026년 1) 검증 완료.
 */
export const STATS = {
  annualRevenue2024: '376억원',
  annualRevenue2025: '379억원',
  annualRevenueTarget: '400억원',           // 2026 목표
  annualRevenue: '379억원',                  // 2025 실적
  developedItems: '134개',                   // 10년 누적
  activeItems: '66개',                       // 현재 운영
  equipmentInvest2024: '8억원',
  equipmentInvest2025: '7.4억원',
  annualEquipmentInvest: '약 8.9억원',       // 2026 계획
  fishSpeciesCount: null as string | null,   // 어종 수는 확인 필요
  certCount: '5대',                          // HACCP·이력추적·ASC·MSC·품질인증

  // 품질 KPI — 원본 자료에 명확히 명시되지 않음, 고객 확인 필요
  defectRate: null as string | null,
  onTimeDeliveryRate: null as string | null,
  renewalRate: null as string | null,
  dailyCapacity: null as string | null,

  newProductCycleMonths: '5개월',            // 평균 신제품 개발 기간
  rdProposalsPerYear: '20회',                // 연간 신제품 제안
  rdInvestPerProduct: '약 1천만원',          // 제품당 R&D 자체 부담
} as const;

/** 자체 브랜드 라인 (검증된 누적 매출) */
export interface BrandLine {
  name: string;
  yearLaunched: string;
  cumulativeSales: string;
}
export const BRAND_LINES: BrandLine[] = [
  { name: '한번얼린수산물류', yearLaunched: '2012', cumulativeSales: '약 45억' },
  { name: '품질인증수산물류', yearLaunched: '2014', cumulativeSales: '약 31억' },
  { name: '레몬담은수산물류', yearLaunched: '2017', cumulativeSales: '약 238억' },
  { name: '마리네이드수산물류', yearLaunched: '2019', cumulativeSales: '약 41억' },
  { name: 'ASC/MSC수산물류', yearLaunched: '2024', cumulativeSales: '약 6억' },
];

/**
 * 취급 어종 — 원본 자료 + 사진 폴더에서 확인된 어종.
 */
export const FISH_SPECIES: string[] = [
  '삼치',
  '백조기',
  '서대',
  '오징어',
  '참조기',
  '고등어',
  '갈치',
  '대삼치',
  '돔',
];

/**
 * 인증 정보 — 원본 PPTX 슬라이드 2 검증.
 */
export interface CertItem {
  name: string;
  shortName: string;
  yearLabel: string | null;
  issuedDate: string | null;
  certNumber: string | null;
  description: string;
  status: 'acquired' | 'preparing';
}

export const CERTIFICATIONS: CertItem[] = [
  {
    name: 'HACCP',
    shortName: 'HACCP',
    yearLabel: '2011년 안정화',
    issuedDate: null,
    certNumber: null,
    description: '원료 입고부터 완제품 출하까지 모든 공정의 위해요소를 과학적으로 관리하는 국가 식품안전 인증. 전 식품유형 인증 보유.',
    status: 'acquired',
  },
  {
    name: '수산물 이력추적',
    shortName: '이력추적',
    yearLabel: '2013년 도입',
    issuedDate: null,
    certNumber: null,
    description: '원산지부터 가공·유통까지 전 과정을 추적할 수 있는 관리 체계. 현재 전 품목 확대 적용.',
    status: 'acquired',
  },
  {
    name: '수산물 품질인증',
    shortName: '품질인증',
    yearLabel: '2014년',
    issuedDate: null,
    certNumber: null,
    description: '국립수산물품질관리원이 엄격한 기준으로 부여하는 국가 품질 인증. 품질인증수산물류 브랜드 라인 운영.',
    status: 'acquired',
  },
  {
    name: 'ASC 인증',
    shortName: 'ASC',
    yearLabel: '2024년',
    issuedDate: null,
    certNumber: null,
    description: '환경을 파괴하지 않는 책임있는 양식으로 생산된 수산물임을 보증하는 국제 인증. 2024년 인증 확대.',
    status: 'acquired',
  },
  {
    name: 'MSC 인증',
    shortName: 'MSC',
    yearLabel: '2024년',
    issuedDate: null,
    certNumber: null,
    description: '남획 없이 바다 생태계를 지키며 잡은 자연산 수산물임을 인정하는 국제 인증.',
    status: 'acquired',
  },
  {
    name: 'FSSC 22000',
    shortName: 'FSSC',
    yearLabel: '2026년 추진',
    issuedDate: null,
    certNumber: null,
    description: '전 세계 식품 기업이 따르는 글로벌 식품안전 관리 시스템 인증. 글로벌 HACCP과 함께 2026년내 추진 예정.',
    status: 'preparing',
  },
];

/**
 * 연혁 — 원본 PPTX(영어조합법인 서풍_2026년 1) 검증 완료.
 */
export interface HistoryItem {
  year: string;
  text: string;
}

export const HISTORY: HistoryItem[] = [
  { year: '2011', text: 'HACCP 기반 품질위생관리 체계 안정화' },
  { year: '2012', text: "'한번얼린수산물류' 브랜드 출시" },
  { year: '2013', text: '수산물 이력추적관리 시스템 도입 (전 품목 적용)' },
  { year: '2014', text: "'품질인증수산물류' 브랜드 출시" },
  { year: '2017', text: "'레몬담은수산물류' 브랜드 출시 (누적 매출 약 238억)" },
  { year: '2019', text: "'마리네이드수산물류' 브랜드 출시" },
  { year: '2024', text: 'ASC·MSC 지속가능 수산물 인증 획득, 설비 투자 8억원' },
  { year: '2025', text: '설비 투자 7.4억원 (로터리 포장기 2대, 어류 스캔 자동 절단기), 총매출 379억원' },
  { year: '2026', text: 'AI 엑스레이 도입(농심엔지니어링 2억원), AI 초분광 2.5억원, FSSC 22000 추진, 목표 매출 400억원' },
  { year: '2027', text: '신규 공장 준공, 연속식 구이기 도입 예정' },
];

/**
 * 관계사 / 그룹사 — 원본 PPTX "One Platform" 도식 검증.
 */
export interface Affiliate {
  name: string;
  role: string;
  description: string;
}

export const AFFILIATES: Affiliate[] = [
  { name: '영어조합법인 서풍', role: 'Manufacturing', description: '수산물 제조·가공' },
  { name: '㈜여수유통', role: 'Distribution', description: '유통·물류' },
  { name: '㈜대주냉장', role: 'Storage', description: '냉동·보관' },
  { name: '중매인 49호', role: 'Purchase', description: '원료 매입' },
];

/**
 * 거래처 / 파트너사 — 검증된 협업 관계.
 * 로고 사용 동의는 별도 필요 (현재는 텍스트만 표기).
 */
export interface Partner {
  name: string;
  logoPath: string | null;
  description?: string;
}

export const PARTNERS: Partner[] = [
  { name: '푸드머스', logoPath: null, description: '전용 MG 품목 공급 · R&D 협력' },
  { name: '풀무원', logoPath: null, description: 'ESG 경영 방향 정렬' },
  { name: '농심엔지니어링', logoPath: null, description: 'AI 엑스레이 공동 개발 (2026)' },
];

/**
 * 2026 5대 중점 추진 과제 — PPTX 슬라이드 5 검증.
 */
export interface Initiative {
  title: string;
  desc: string;
}
export const KEY_INITIATIVES: Initiative[] = [
  { title: 'R&D 역량 강화', desc: '기업부설 연구소 설립, 푸드머스 전용 제품 개발, 연간 20회 신제품 제안' },
  { title: 'Smart 생산라인 구축', desc: '원물~완제품 One-Way 자동화 생산라인 구축' },
  { title: '글로벌 식품안전 관리', desc: 'FSSC 22000 · 글로벌 HACCP 2026년 추진' },
  { title: '이물 Zero화', desc: 'AI 엑스레이 + AI 초분광 검출기 도입, 원료 기인성 이물 zero 달성' },
  { title: 'ESG 경영', desc: '풀무원 가치 체계 반영, 친환경 생산 체계 구축' },
];

/**
 * 연도별 설비 투자 — PPTX 슬라이드 4 검증.
 */
export interface InvestYear {
  year: string;
  amount: string | null;
  items: string;
}
export const INVESTMENTS: InvestYear[] = [
  { year: '2024년 이전', amount: null, items: '터널프리저, 포션커터기, 까스성형기 등' },
  { year: '2024', amount: '8억원', items: '멀티박 포장기, 오징어 할복기, 오징어 절단기, 방사선 검사기' },
  { year: '2025', amount: '7.4억원', items: '로터리 포장기 2대, 어류 스캔 자동 절단기' },
  { year: '2026', amount: '약 8.9억원', items: 'AI 엑스레이(2억) · AI 초분광(2.5억) · 전처리 자동화(3.5억) · 오븐 구이기(0.9억)' },
  { year: '2027', amount: null, items: '연속식 구이기, 신규 공장 준공' },
];

/* ─── 헬퍼 ─── */
export function hasValue<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined && v !== '';
}
