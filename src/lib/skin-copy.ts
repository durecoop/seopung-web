/** 각 스킨별 맞춤 문구 */
export interface SkinCopy {
  // Cert section
  certLabel: string;
  certTitle: string;
  certTitleAccent: string;
  certDesc: string;
  certDescBold: string;
  certCta: string;

  // Company intro
  aboutLabel: string;
  aboutTitle1: string;
  aboutTitle2: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutDesc2Bold: string;
  aboutCta: string;

  // Products
  prodLabel: string;
  prodTitle: string;
  prodTitleAccent: string;
  prodDesc: string;
  prodCta: string;

  // Supply story
  supplyLabel: string;
  supplyTitle: string;
  supplyTitleAccent: string;
  supplyDesc: string;

  // Banner
  bannerTitle1: string;
  bannerTitle2: string;
  bannerDesc: string;
  bannerCta: string;

  // Partners
  partnerLabel: string;
  partnerTitle: string;
  partnerTitleAccent: string;
  partnerDesc: string;

  // CTA
  ctaTitle1: string;
  ctaTitle2: string;
  ctaDesc: string;
  ctaCta: string;
}

export const SKIN_COPY: Record<number, SkinCopy> = {
  // 0: 클린 오션 — 신뢰, 안정, 따뜻한 톤
  0: {
    certLabel: 'Certifications',
    certTitle: '국내외',
    certTitleAccent: '6대 인증 보유',
    certDesc: '안전하고 지속가능한 수산물 공급을 위한',
    certDescBold: '대한민국 최고 수준의 인증 체계',
    certCta: '인증 현황 자세히 보기',

    aboutLabel: 'About Seopung',
    aboutTitle1: '30년 경력,',
    aboutTitle2: '끊임없는 혁신',
    aboutDesc1: '1995년 전라남도 여수에서 시작한 서풍은 대한민국 수산 가공 산업의 새로운 기준을 만들어가고 있습니다.',
    aboutDesc2: '단순한 OEM을 넘어 파트너의 성공을 설계합니다.',
    aboutDesc2Bold: '매출 성장을 현장과 품질에 환원하는 선순환 경영.',
    aboutCta: '회사소개 보기',

    prodLabel: 'Products',
    prodTitle: '제품',
    prodTitleAccent: '라인업',
    prodDesc: '냉동수산가공부터 프리미엄 굴비, 밀키트까지\n맞춤형 OEM 솔루션을 제공합니다',
    prodCta: '전체 제품 보기',

    supplyLabel: 'Supply Chain',
    supplyTitle: '새벽 위판장에서',
    supplyTitleAccent: '식탁까지',
    supplyDesc: '당일 원료를 당일 가공하는 신속한 공급 체계',

    bannerTitle1: '변화를 두려워하지 않는',
    bannerTitle2: '진취적 파트너십',
    bannerDesc: '대형마트, 외식 프랜차이즈, 밀키트 브랜드.\n귀사의 성공을 함께 설계합니다.',
    bannerCta: 'OEM 문의하기',

    partnerLabel: 'Trusted Partners',
    partnerTitle: '신뢰의',
    partnerTitleAccent: '파트너',
    partnerDesc: '10년 이상 함께한 대한민국 대표 유통 파트너사',

    ctaTitle1: '함께 만들어갈',
    ctaTitle2: '다음 제품',
    ctaDesc: 'OEM 납품, 신제품 개발, 파트너십에 대해\n언제든 편하게 문의해주세요.',
    ctaCta: '문의하기',
  },

  // 1: 딥 네이비 — 강인함, 도전, 거침없는 톤
  1: {
    certLabel: 'Proven Standards',
    certTitle: '폭풍 속에서도',
    certTitleAccent: '흔들리지 않는 품질',
    certDesc: '6대 국제 인증으로 검증된',
    certDescBold: '대한민국 최강의 수산 품질 시스템',
    certCta: '인증 현황 확인하기',

    aboutLabel: 'Our Story',
    aboutTitle1: '30년의 거친 바다,',
    aboutTitle2: '단 한 번도 물러서지 않았다',
    aboutDesc1: '1995년, 여수의 작은 어항에서 시작된 도전. 서풍은 대한민국 수산 가공의 역사를 새로 쓰고 있습니다.',
    aboutDesc2: '위기를 기회로, 도전을 성장으로 바꿔온 30년.',
    aboutDesc2Bold: '멈추면 뒤처진다. 서풍은 언제나 전진한다.',
    aboutCta: '서풍의 역사 보기',

    prodLabel: 'Battle-Tested Products',
    prodTitle: '현장에서 증명된',
    prodTitleAccent: '제품',
    prodDesc: '거친 시장의 요구에 맞서\n검증된 제품만을 내놓습니다',
    prodCta: '제품 라인업 보기',

    supplyLabel: 'Speed & Power',
    supplyTitle: '새벽 4시,',
    supplyTitleAccent: '전투가 시작된다',
    supplyDesc: '당일 원료, 당일 가공. 속도가 곧 경쟁력이다',

    bannerTitle1: '남들이 망설일 때',
    bannerTitle2: '우리는 이미 출항했다',
    bannerDesc: '대형마트, 프랜차이즈, 밀키트 브랜드.\n당신의 다음 히트 상품, 서풍이 만듭니다.',
    bannerCta: '도전에 합류하기',

    partnerLabel: 'Allies',
    partnerTitle: '전우와 같은',
    partnerTitleAccent: '파트너',
    partnerDesc: '10년 이상, 험난한 시장을 함께 돌파한 동지들',

    ctaTitle1: '다음 파도를',
    ctaTitle2: '함께 넘을 준비',
    ctaDesc: '새로운 도전이 기다리고 있습니다.\n서풍과 함께 출항하세요.',
    ctaCta: '출항하기',
  },

  // 2: 테크 다크 — 기술, 데이터, 미래지향적 톤
  2: {
    certLabel: 'Verified System',
    certTitle: '데이터로 증명하는',
    certTitleAccent: '6대 품질 인증',
    certDesc: 'AI 검수, 이력추적, 국제 표준 시스템으로',
    certDescBold: '수산업의 디지털 전환을 선도합니다',
    certCta: '인증 시스템 상세보기',

    aboutLabel: 'Innovation Lab',
    aboutTitle1: '기술이 만드는',
    aboutTitle2: '수산업의 미래',
    aboutDesc1: 'AI 초분광 선별, 스캔 자동절단 시스템. 서풍은 기술로 수산 가공의 새 패러다임을 만듭니다.',
    aboutDesc2: '단순 가공을 넘어, 스마트 팩토리로의 전환.',
    aboutDesc2Bold: '데이터 기반 의사결정, 자동화된 품질관리.',
    aboutCta: '기술력 확인하기',

    prodLabel: 'Smart Products',
    prodTitle: '스마트 공정으로 탄생한',
    prodTitleAccent: '정밀 제품',
    prodDesc: 'AI 품질 검수를 거친 정밀한 제품 라인업\n기술이 맛과 안전을 동시에 보장합니다',
    prodCta: '제품 데이터베이스',

    supplyLabel: 'Real-Time Supply',
    supplyTitle: '실시간 추적 가능한',
    supplyTitleAccent: '공급 체인',
    supplyDesc: '위판장에서 출하까지, 모든 과정을 데이터로 관리합니다',

    bannerTitle1: '연결하고, 분석하고',
    bannerTitle2: '최적화하다',
    bannerDesc: '귀사의 요구사항을 데이터로 분석하여\n최적의 OEM 솔루션을 설계합니다.',
    bannerCta: '솔루션 문의',

    partnerLabel: 'Network',
    partnerTitle: '연결된',
    partnerTitleAccent: '파트너 네트워크',
    partnerDesc: '데이터로 연결된 대한민국 핵심 유통망',

    ctaTitle1: '다음 혁신을',
    ctaTitle2: '함께 설계합시다',
    ctaDesc: 'OEM 납품, R&D 협력, 기술 파트너십.\n데이터가 답을 알고 있습니다.',
    ctaCta: '프로젝트 시작하기',
  },

  // 3: 시네마틱 — 감성적, 서사적, 영화 같은 톤
  3: {
    certLabel: 'Trust & Legacy',
    certTitle: '30년이 증명하는',
    certTitleAccent: '6대 인증의 무게',
    certDesc: '바다 위의 약속, 식탁 위의 신뢰',
    certDescBold: '한 치의 타협 없는 품질 철학',
    certCta: '인증 스토리 보기',

    aboutLabel: 'The Journey',
    aboutTitle1: '여수의 새벽에서',
    aboutTitle2: '시작된 항해',
    aboutDesc1: '1995년, 거친 남해의 파도 소리와 함께 서풍의 이야기가 시작되었습니다. 한 사람의 꿈이 대한민국 수산업의 역사가 되기까지.',
    aboutDesc2: '매일 새벽, 바다와 마주하는 사람들의 이야기.',
    aboutDesc2Bold: '우리의 원칙은 단순합니다 — 정직한 바다, 정직한 먹거리.',
    aboutCta: '우리의 이야기',

    prodLabel: 'Crafted with Soul',
    prodTitle: '장인의 손끝에서 탄생한',
    prodTitleAccent: '작품',
    prodDesc: '하나하나 정성을 담아 만든 제품\n바다의 가치를 식탁으로 전합니다',
    prodCta: '제품 갤러리',

    supplyLabel: 'Dawn to Table',
    supplyTitle: '새벽의 시작,',
    supplyTitleAccent: '하루의 완성',
    supplyDesc: '해가 뜨기 전 시작되는 서풍의 하루를 따라가 봅니다',

    bannerTitle1: '당신의 브랜드에',
    bannerTitle2: '바다의 이야기를 담다',
    bannerDesc: '프리미엄 수산 제품으로\n당신만의 브랜드 스토리를 완성하세요.',
    bannerCta: '스토리 함께 만들기',

    partnerLabel: 'Together',
    partnerTitle: '함께 걸어온',
    partnerTitleAccent: '10년의 길',
    partnerDesc: '같은 바다를 바라보며 함께 성장한 파트너들',

    ctaTitle1: '다음 장(章)을',
    ctaTitle2: '함께 쓸 준비가 되셨나요',
    ctaDesc: '서풍과 함께라면, 당신의 다음 제품은\n하나의 작품이 됩니다.',
    ctaCta: '이야기 시작하기',
  },

  // 4: 블루 프리미엄 — 자신감, 확신, 프리미엄
  4: {
    certLabel: 'Excellence',
    certTitle: '타협 없는',
    certTitleAccent: '6대 글로벌 인증',
    certDesc: '세계가 인정한 품질 기준',
    certDescBold: '대한민국을 대표하는 수산 OEM의 자격',
    certCta: '인증 현황 확인',

    aboutLabel: 'Leadership',
    aboutTitle1: '도전이 곧',
    aboutTitle2: '서풍이다',
    aboutDesc1: '30년간 대한민국 수산 가공 산업을 선도해온 서풍. 글로벌 인증과 검증된 OEM 실적으로 응답합니다.',
    aboutDesc2: '파트너의 성공이 곧 우리의 성공입니다.',
    aboutDesc2Bold: '1등만이 살아남는 시장에서, 서풍은 1등의 파트너입니다.',
    aboutCta: '리더십 확인하기',

    prodLabel: 'Premium Lineup',
    prodTitle: '프리미엄',
    prodTitleAccent: '제품군',
    prodDesc: '대형마트 PB부터 프리미엄 선물세트까지\n어떤 요구에도 응답하는 제품력',
    prodCta: '제품군 보기',

    supplyLabel: 'Precision Supply',
    supplyTitle: '정확하고 빠른',
    supplyTitleAccent: '공급 시스템',
    supplyDesc: '위판장에서 출하까지, 흐트러짐 없는 체계',

    bannerTitle1: '1등의 파트너가',
    bannerTitle2: '1등을 만든다',
    bannerDesc: '대한민국 대표 유통사가 선택한 이유.\n서풍은 결과로 증명합니다.',
    bannerCta: '파트너십 문의',

    partnerLabel: 'Elite Partners',
    partnerTitle: '대한민국',
    partnerTitleAccent: 'TOP 파트너',
    partnerDesc: '업계 최고의 기업들이 서풍을 선택합니다',

    ctaTitle1: '다음 성공을',
    ctaTitle2: '함께 설계합시다',
    ctaDesc: 'OEM 납품, 신제품 개발, 전략적 파트너십.\n서풍이 최적의 해답을 제시합니다.',
    ctaCta: '상담 신청',
  },

  // 5: 글로우 다크 — 개척, 선구자, 대담
  5: {
    certLabel: 'Pioneer Standard',
    certTitle: '개척자만이 가진',
    certTitleAccent: '6대 인증의 힘',
    certDesc: '남들이 따라올 수 없는 기준',
    certDescBold: '서풍이 세운 품질의 새로운 정의',
    certCta: '기준을 확인하다',

    aboutLabel: 'The Pioneer',
    aboutTitle1: '길이 없으면',
    aboutTitle2: '만들면 된다',
    aboutDesc1: '아무도 가지 않은 길을 30년간 걸어왔습니다. 서풍은 수산 가공 산업의 첫 번째 발자국입니다.',
    aboutDesc2: '불가능을 가능으로 바꿔온 개척의 역사.',
    aboutDesc2Bold: '한계를 정하는 것은 시장이 아니라 우리 자신이다.',
    aboutCta: '개척의 역사',

    prodLabel: 'Groundbreaking',
    prodTitle: '경계를 허문',
    prodTitleAccent: '혁신 제품',
    prodDesc: '기존의 틀을 깨고 새로운 카테고리를 창조하는\n서풍만의 제품 철학',
    prodCta: '혁신 제품 보기',

    supplyLabel: 'First Mover',
    supplyTitle: '가장 먼저,',
    supplyTitleAccent: '가장 빠르게',
    supplyDesc: '새벽 4시, 누구보다 먼저 바다에 나서는 개척자들',

    bannerTitle1: '세상에 없던 제품을',
    bannerTitle2: '함께 만들어냅시다',
    bannerDesc: '기존의 답습이 아닌, 완전히 새로운 제품.\n서풍과 함께라면 가능합니다.',
    bannerCta: '새로운 길 열기',

    partnerLabel: 'Trailblazers',
    partnerTitle: '함께 길을 여는',
    partnerTitleAccent: '동반자',
    partnerDesc: '새로운 시장을 함께 개척해온 선구자들',

    ctaTitle1: '아직 아무도 만들지 않은',
    ctaTitle2: '그 제품',
    ctaDesc: '서풍과 함께라면\n세상에 없던 것을 만들 수 있습니다.',
    ctaCta: '개척 시작하기',
  },

  // 6: CJ 기업형 — 진취적, 도전적, 젊은 기업 톤 (CJ씨푸드 레이아웃 참고)
  6: {
    certLabel: 'Global Standards',
    certTitle: '신뢰로 완성한',
    certTitleAccent: '5대 품질 인증',
    certDesc: 'HACCP·ASC·MSC 인증과 수산물 이력제 기반의',
    certDescBold: '글로벌 기준을 넘어, 새로운 기준을 만듭니다',
    certCta: '인증 현황 확인하기',

    aboutLabel: 'ABOUT SEOPOONG',
    aboutTitle1: '30년의 노하우,',
    aboutTitle2: '멈추지 않는 진화',
    aboutDesc1: '1995년 여수에서 시작한 서풍은 끊임없는 도전과 혁신으로 성장해왔습니다. AI 스마트 팩토리 구축, 글로벌 품질 인증, 신제품 개발까지 — 변화보다 한발 앞선 혁신이 서풍의 경쟁력입니다.',
    aboutDesc2: '파트너의 성공을 함께 만들어가는 것이 서풍이 추구하는 가치입니다.',
    aboutDesc2Bold: 'HACCP·ASC·MSC 인증 기반의 체계적인 품질 시스템과 안정적인 수산 및 수산가공 OEM 파트너십.',
    aboutCta: '서풍 스토리 보기',

    prodLabel: 'Product Lineup',
    prodTitle: '트렌드를 선도하는',
    prodTitleAccent: '제품',
    prodDesc: '냉동수산가공, 프리미엄 굴비, 밀키트, HMR까지\n시장이 원하는 제품을 가장 먼저 만듭니다',
    prodCta: '제품 더 보기',

    supplyLabel: 'Supply Chain',
    supplyTitle: '새벽 4시,',
    supplyTitleAccent: '서풍의 하루가 시작됩니다',
    supplyDesc: '위판장 직접 수매부터 당일 가공·출하까지, 속도가 곧 신선함입니다',

    bannerTitle1: '귀사의 다음 히트 상품,',
    bannerTitle2: '서풍이 함께 만듭니다',
    bannerDesc: '대형마트 PB, 외식 프랜차이즈, 밀키트 브랜드.\n어떤 도전이든 함께 설계합니다.',
    bannerCta: 'OEM 파트너십 문의',

    partnerLabel: 'Trusted Partners',
    partnerTitle: '함께 성장하는',
    partnerTitleAccent: '파트너',
    partnerDesc: '10년 이상 함께해온 대한민국 대표 유통 파트너사',

    ctaTitle1: '다음 도전을',
    ctaTitle2: '함께 시작합시다',
    ctaDesc: 'OEM 납품, 신제품 개발, 전략적 파트너십.\n서풍과 함께라면 가능합니다.',
    ctaCta: '시작하기',
  },
};
