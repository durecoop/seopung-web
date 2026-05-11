/**
 * 회사 정보 단일 소스. 고객사 확인 전까지 미확정 값은 null/빈 배열로 둔다.
 * UI는 값이 비어 있으면 해당 항목을 숨기거나 placeholder 처리한다.
 *
 * 확인이 끝난 항목은 여기 값을 채워 넣고, 페이지 코드를 손대지 않는다.
 * 미확정 목록은 docs/INFO_REQUEST.md 참조.
 */

export const COMPANY = {
  /** 정식 법인명 — "영어조합법인" vs "영농조합법인" 통일 필요 */
  name: '영어조합법인 서풍',
  shortName: '서풍',
  /** 대표자 정식 직함 (상무이사 / 대표이사 확인 필요) */
  ceoName: '김태환',
  ceoTitle: null as string | null,
  /** 주소 (도로명) — 우편번호는 확인 후 추가 */
  address: '전라남도 여수시 석교로 121',
  addressDetail: '화양면',
  postalCode: null as string | null,
  /** 사업자등록번호 — 확인 후 채울 것 */
  bizNumber: null as string | null,
  /** 법인등기일 / 설립일 — 확인 후 채울 것 */
  foundedYear: null as string | null,
  /** 대표 전화번호 / FAX — 미확인 */
  phone: null as string | null,
  fax: null as string | null,
  /** 공식 이메일 — 도메인 이메일 권장 (예: info@seopung.co.kr) */
  email: null as string | null,
  /** 일반 소개 카피 (검증 불필요한 일반적 문구) */
  tagline: '바다의 가치를 세상의 식탁으로',
  description: '여수 위판장에서 가공·유통까지 한 흐름으로 운영하는 수산 OEM 전문기업',
} as const;

/**
 * 회사 KPI / 통계. 모든 수치는 고객사 확인 후 입력.
 * UI 코드는 null인 항목을 자동으로 숨긴다.
 */
export const STATS = {
  annualRevenue: null as string | null,           // 예: '400억원'
  annualRevenueTarget: null as string | null,     // 예: '2026 목표 400억원'
  developedItems: null as string | null,          // 예: '134개'
  activeItems: null as string | null,             // 예: '66개'
  annualEquipmentInvest: null as string | null,   // 예: '9억원+'
  fishSpeciesCount: null as string | null,        // 예: '9종'
  certCount: null as string | null,               // 예: '3대'

  // 품질 KPI
  defectRate: null as string | null,              // 예: '0.02%'
  onTimeDeliveryRate: null as string | null,      // 예: '99.7%'
  renewalRate: null as string | null,             // 예: '95%+'
  dailyCapacity: null as string | null,           // 예: '15톤'

  newProductCycleMonths: null as string | null,   // 예: '5개월'
} as const;

/**
 * 취급 어종 — 정확한 리스트는 고객사 확인 후 채울 것.
 * 비어 있으면 페이지에서 해당 섹션은 일반 카피로 대체된다.
 */
export const FISH_SPECIES: string[] = [];

/**
 * 인증 정보. 각 항목의 정확한 발급일·인증번호는 고객사 확인 후 입력.
 * status: 'acquired' | 'preparing'
 */
export interface CertItem {
  name: string;
  shortName: string;
  /** 자유 표기 (예: '2008년 최초 인증', '2026년 추진'). 정확한 발급일은 issuedDate에. */
  yearLabel: string | null;
  issuedDate: string | null;          // 예: '2008-01-15'
  certNumber: string | null;          // 예: 'HACCP-2008-0001'
  description: string;
  status: 'acquired' | 'preparing';
}

export const CERTIFICATIONS: CertItem[] = [
  {
    name: 'HACCP',
    shortName: 'HACCP',
    yearLabel: null,
    issuedDate: null,
    certNumber: null,
    description: '원료 입고부터 완제품 출하까지 모든 공정의 위해요소를 과학적으로 관리하는 국가 식품안전 인증',
    status: 'acquired',
  },
  {
    name: '수산물 이력추적',
    shortName: '이력추적',
    yearLabel: null,
    issuedDate: null,
    certNumber: null,
    description: '원산지부터 가공·유통까지 전 과정을 추적할 수 있는 관리 체계',
    status: 'acquired',
  },
  {
    name: '수산물 품질인증',
    shortName: '품질인증',
    yearLabel: null,
    issuedDate: null,
    certNumber: null,
    description: '국립수산물품질관리원이 엄격한 기준으로 부여하는 국가 품질 인증',
    status: 'preparing',
  },
  {
    name: 'ASC 인증',
    shortName: 'ASC',
    yearLabel: null,
    issuedDate: null,
    certNumber: null,
    description: '환경을 파괴하지 않는 책임있는 양식으로 생산된 수산물임을 보증하는 국제 인증',
    status: 'acquired',
  },
  {
    name: 'MSC 인증',
    shortName: 'MSC',
    yearLabel: null,
    issuedDate: null,
    certNumber: null,
    description: '남획 없이 바다 생태계를 지키며 잡은 자연산 수산물임을 인정하는 국제 인증',
    status: 'acquired',
  },
  {
    name: 'FSSC 22000',
    shortName: 'FSSC',
    yearLabel: null,
    issuedDate: null,
    certNumber: null,
    description: '전 세계 식품 기업이 따르는 글로벌 식품안전 관리 시스템 인증',
    status: 'preparing',
  },
];

/**
 * 연혁. 사실 확인된 항목만 채울 것. 비어 있는 동안에는 페이지에서
 * 일반 카피("30년의 도전") 또는 PhotoNeeded로 대체된다.
 */
export interface HistoryItem {
  year: string;
  text: string;
}

export const HISTORY: HistoryItem[] = [];

/**
 * 관계사 / 그룹사. 각 법인의 사용 동의 및 정확한 정보 확인 필요.
 */
export interface Affiliate {
  name: string;
  role: string;
  description: string;
}

export const AFFILIATES: Affiliate[] = [];

/**
 * 거래처 / 파트너사. 로고 사용 동의를 받은 곳만 표기.
 */
export interface Partner {
  name: string;
  logoPath: string | null;   // public/ 기준 경로. 없으면 PhotoNeeded.
}

export const PARTNERS: Partner[] = [];

/* ─── 헬퍼: 값이 존재하는지 확인 ─── */
export function hasValue<T>(v: T | null | undefined): v is T {
  return v !== null && v !== undefined && v !== '';
}
