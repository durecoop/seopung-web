import { writeBatch, doc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import { generateId } from './admin-store';

/* 기존 하드코딩 데이터를 Firestore에 시드 */

const SEED_NEWS = [
  { date: '2026.01', category: '설비투자', title: 'AI X-ray 이물검출기 도입 완료', summary: '농심엔지니어링과 협력하여 2억원 규모의 AI 기반 X-ray 이물검출 시스템을 도입했습니다. 이물 검출 정확도 99.9%를 목표로 운영을 시작합니다.', imageUrl: '/images/facility/fish-scanner.jpg' },
  { date: '2024.12', category: '인증', title: 'ASC·MSC 이중 인증 획득', summary: '지속가능한 양식(ASC)과 지속가능한 어업(MSC) 인증을 동시에 획득하여 글로벌 수준의 지속가능성 기준을 충족했습니다.', imageUrl: '/images/certification/traceability-cert.jpg' },
  { date: '2024.06', category: '사업확장', title: 'ASC·MSC 인증 제품 매출 330% 성장', summary: '2024년 ASC·MSC 인증 제품 매출이 전년 대비 330% 성장한 12억원을 기록했습니다.', imageUrl: '/images/products/asc-package.png' },
  { date: '2024.03', category: '기술', title: 'AI 초분광 검출기 도입 계획 발표', summary: '2.5억원 규모의 AI 초분광 검출기를 2026년 내 도입할 계획을 발표했습니다. 기존 X-ray로 검출 불가한 이물까지 탐지합니다.', imageUrl: '/images/facility/fish-scanner-detail.jpg' },
  { date: '2023.11', category: '수상', title: '수산물 품질인증 우수업체 선정', summary: '국립수산물품질관리원으로부터 수산물 품질인증 우수업체로 선정되었습니다.', imageUrl: '/images/facility/safety-board.jpg' },
];

const SEED_CERTIFICATIONS = [
  { name: 'HACCP', year: '2008년 최초 인증', description: '위해요소중점관리기준. 원료부터 출하까지 전 공정의 위해요소를 사전 관리합니다.', status: '유효' },
  { name: '수산물 이력추적', year: '2013년', description: '원료 입고부터 출하까지 전 과정을 기록·관리하여 문제 발생 시 신속히 원인을 추적합니다.', status: '유효' },
  { name: '수산물 품질인증', year: '', description: '국립수산물품질관리원의 품질인증 제도로, 우수한 수산물에 부여됩니다.', status: '준비중' },
  { name: 'ASC 인증', year: '2024년', description: '책임 있는 양식 수산물 인증. 환경·사회적 책임을 다하는 양식장에서 생산된 수산물입니다.', status: '유효' },
  { name: 'MSC 인증', year: '2024년', description: '지속가능한 어업 인증. 해양 생태계를 보전하면서 어획한 수산물에 부여됩니다.', status: '유효' },
  { name: 'FSSC 22000', year: '2026년 추진 예정', description: 'ISO 22000 기반의 글로벌 식품안전 인증 체계로, 국제적 수준의 식품안전 관리를 증명합니다.', status: '준비중' },
];

const SEED_EQUIPMENT = [
  { name: '어류 스캔 자동절단기', desc: '정밀한 스캔으로 어류를 규격별로 균일하게 절단', imageUrl: '/images/facility/fish-scanner-2.jpg' },
  { name: '터널프리저 (IQF)', desc: '통벨트 & 자동CIP, -40°C 급속동결', imageUrl: '/images/process/04-tunnel-freezer.jpg' },
  { name: '로터리 포장기', desc: '자동 계량 및 포장 시스템 2대 운영', imageUrl: '/images/process/05-rotary-packer.jpg' },
  { name: '열선형 진공포장기', desc: '다양한 규격의 진공 밀봉 포장', imageUrl: '/images/process/05-vacuum-packer.jpg' },
  { name: '방사능 검사 장비', desc: 'Gamma Radiation Spectrometer로 원료 안전성 상시 검증', imageUrl: '/images/facility/radiation-tester.jpg' },
  { name: '오징어할복기', desc: '오징어 전용 자동 할복 가공 장비', imageUrl: '/images/process/02-cutting-machine.jpg' },
];

const SEED_INVESTMENTS = [
  { year: '~2024', label: '~2024년', items: '터널프리져, 포션커터기, 까스성형기 등', amount: '' },
  { year: '2024', label: '2024년', items: '멀티박 포장기, 오징어 할복기, 오징어 절단기, 방사선 검사기 등', amount: '8억원' },
  { year: '2025', label: '2025년', items: '로터리 포장기 2대, 어류 스캔 자동 절단기 등', amount: '7.4억원' },
  { year: '2026', label: '2026년', items: 'AI 엑스레이(2억), AI 초분광(2.5억), 전처리 자동화(3.5억), 오븐 구이기(0.9억)', amount: '약 9억원', highlight: true },
  { year: '2027', label: '2027년', items: '연속식 구이기, 신규공장 준공', amount: '' },
];

const SEED_HISTORY = [
  { year: '2008', text: 'HACCP 최초 인증' },
  { year: '2011', text: 'HACCP 기반 품질위생관리 체계 안정화' },
  { year: '2013', text: '수산물 이력추적관리 시스템 도입' },
  { year: '2017', text: "'레몬담은수산물' 브랜드 출시" },
  { year: '2019', text: "'마리네이드수산물' 브랜드 출시" },
  { year: '2024', text: 'ASC·MSC 지속가능 수산물 인증, 8억원 설비 투자' },
  { year: '2025', text: '7.4억원 설비 투자, 총매출 379억원' },
  { year: '2026', text: 'AI 엑스레이·초분광 도입, FSSC 22000 추진, 목표 매출 400억원' },
];

const SEED_GALLERY = [
  { imageUrl: '/images/process/04-tunnel-freezer.jpg', label: '터널프리저 (IQF)', category: '공장' },
  { imageUrl: '/images/process/05-rotary-packer.jpg', label: '로터리 포장기', category: '공장' },
  { imageUrl: '/images/facility/fish-scanner.jpg', label: '어류 스캔 절단기', category: '공장' },
  { imageUrl: '/images/facility/radiation-tester.jpg', label: '방사능 검사 장비', category: '공장' },
  { imageUrl: '/images/process/06-cold-storage.jpg', label: '냉동창고', category: '공장' },
  { imageUrl: '/images/team/factory-group.jpg', label: '공장 전경', category: '공장' },
  { imageUrl: '/images/hero/dawn-unloading.jpg', label: '새벽 하역', category: '위판장' },
  { imageUrl: '/images/auction/director-inspect.jpg', label: '원료 검수', category: '위판장' },
  { imageUrl: '/images/auction/auction-panorama.jpg', label: '위판장 전경', category: '위판장' },
  { imageUrl: '/images/auction/sea-bream.jpg', label: '참돔', category: '위판장' },
  { imageUrl: '/images/auction/mackerel-large.jpg', label: '대삼치', category: '위판장' },
  { imageUrl: '/images/hero/night-harbor.jpg', label: '여수항 야경', category: '위판장' },
  { imageUrl: '/images/gulbi/gill-salting.jpg', label: '아가미 섭간', category: '굴비' },
  { imageUrl: '/images/gulbi/tying.jpg', label: '굴비 엮기', category: '굴비' },
  { imageUrl: '/images/gulbi/tying-2.jpg', label: '엮기 작업', category: '굴비' },
  { imageUrl: '/images/gulbi/weighing.jpg', label: '무게 선별', category: '굴비' },
  { imageUrl: '/images/gulbi/drying.jpg', label: '건조', category: '굴비' },
  { imageUrl: '/images/products/asc-package.png', label: 'ASC 인증 제품', category: '제품' },
  { imageUrl: '/images/products/mealkit.png', label: '밀키트 제품', category: '제품' },
];

const SEED_COMPANY_INFO = {
  companyName: '영어조합법인 서풍',
  ceo: '상무이사 김태환',
  address: '전라남도 여수시 석교로 121 화양면',
  bizNumber: '417-81-41979',
  phone: '061-686-8088',
};

async function isEmpty(col: string): Promise<boolean> {
  const snap = await getDocs(collection(db, col));
  return snap.empty;
}

export async function seedAllData(): Promise<string[]> {
  const results: string[] = [];

  if (await isEmpty('web_news')) {
    const batch = writeBatch(db);
    SEED_NEWS.forEach((item, i) => {
      batch.set(doc(db, 'web_news', generateId()), { ...item, sortOrder: i });
    });
    await batch.commit();
    results.push(`뉴스 ${SEED_NEWS.length}건 등록`);
  } else {
    results.push('뉴스: 이미 데이터 있음 (스킵)');
  }

  if (await isEmpty('web_certifications')) {
    const batch = writeBatch(db);
    SEED_CERTIFICATIONS.forEach((item, i) => {
      batch.set(doc(db, 'web_certifications', generateId()), { ...item, sortOrder: i });
    });
    await batch.commit();
    results.push(`인증 ${SEED_CERTIFICATIONS.length}건 등록`);
  } else {
    results.push('인증: 이미 데이터 있음 (스킵)');
  }

  if (await isEmpty('web_equipment')) {
    const batch = writeBatch(db);
    SEED_EQUIPMENT.forEach((item, i) => {
      batch.set(doc(db, 'web_equipment', generateId()), { ...item, sortOrder: i });
    });
    await batch.commit();
    results.push(`설비 ${SEED_EQUIPMENT.length}건 등록`);
  } else {
    results.push('설비: 이미 데이터 있음 (스킵)');
  }

  if (await isEmpty('web_investments')) {
    const batch = writeBatch(db);
    SEED_INVESTMENTS.forEach((item, i) => {
      batch.set(doc(db, 'web_investments', generateId()), { ...item, sortOrder: i });
    });
    await batch.commit();
    results.push(`투자 ${SEED_INVESTMENTS.length}건 등록`);
  } else {
    results.push('투자: 이미 데이터 있음 (스킵)');
  }

  if (await isEmpty('web_history')) {
    const batch = writeBatch(db);
    SEED_HISTORY.forEach((item, i) => {
      batch.set(doc(db, 'web_history', generateId()), { ...item, sortOrder: i });
    });
    await batch.commit();
    results.push(`연혁 ${SEED_HISTORY.length}건 등록`);
  } else {
    results.push('연혁: 이미 데이터 있음 (스킵)');
  }

  if (await isEmpty('web_gallery')) {
    const batch = writeBatch(db);
    SEED_GALLERY.forEach((item, i) => {
      batch.set(doc(db, 'web_gallery', generateId()), { ...item, sortOrder: i });
    });
    await batch.commit();
    results.push(`갤러리 ${SEED_GALLERY.length}건 등록`);
  } else {
    results.push('갤러리: 이미 데이터 있음 (스킵)');
  }

  const infoSnap = await getDocs(collection(db, 'web_company_info'));
  if (infoSnap.empty) {
    const { setDoc: sd } = await import('firebase/firestore');
    await sd(doc(db, 'web_company_info', 'main'), SEED_COMPANY_INFO);
    results.push('회사정보 등록');
  } else {
    results.push('회사정보: 이미 데이터 있음 (스킵)');
  }

  return results;
}
