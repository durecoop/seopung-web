/**
 * 파트너 로고 SVG (텍스트형, 공식 로고 사용 동의 전까지 임시).
 * PageSections·about 등 어디서든 동일한 톤으로 표시.
 */
export default function PartnerLogo({ name }: { name: string }) {
  switch (name) {
    case '풀무원':
      return (
        <svg viewBox="0 0 160 40" className="h-9 w-auto">
          <text x="80" y="26" textAnchor="middle" fill="#2E7D32" fontSize="22" fontWeight="800" fontFamily="'Noto Sans KR', sans-serif">풀무원</text>
          <rect x="40" y="32" width="80" height="2" rx="1" fill="#8BC34A" />
        </svg>
      );
    case '푸드머스':
      return (
        <svg viewBox="0 0 160 40" className="h-9 w-auto">
          <circle cx="22" cy="20" r="8" fill="none" stroke="#FF8F00" strokeWidth="2" />
          <circle cx="22" cy="20" r="3" fill="#FF8F00" />
          <text x="90" y="26" textAnchor="middle" fill="#E65100" fontSize="18" fontWeight="700" fontFamily="'Noto Sans KR', sans-serif">푸드머스</text>
        </svg>
      );
    case '쿠팡':
      return (
        <svg viewBox="0 0 160 40" className="h-9 w-auto">
          <text x="80" y="27" textAnchor="middle" fill="#00635A" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">Coupang</text>
        </svg>
      );
    case '두레생협':
      return (
        <svg viewBox="0 0 180 40" className="h-9 w-auto">
          <circle cx="24" cy="20" r="11" fill="none" stroke="#4CAF50" strokeWidth="2" />
          <path d="M18 20c0-3 3-6 6-6s6 3 6 6" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="16" r="2" fill="#4CAF50" />
          <text x="110" y="19" textAnchor="middle" fill="#2E7D32" fontSize="14" fontWeight="800" fontFamily="'Noto Sans KR', sans-serif">두레생협</text>
          <text x="110" y="32" textAnchor="middle" fill="#66BB6A" fontSize="8" fontWeight="600" fontFamily="Arial, sans-serif">DURE COOP</text>
        </svg>
      );
    case '농심엔지니어링':
      return (
        <svg viewBox="0 0 180 40" className="h-9 w-auto">
          <path d="M14 12l6 8-6 8h6l6-8-6-8z" fill="#C8102E" />
          <text x="106" y="26" textAnchor="middle" fill="#C8102E" fontSize="13" fontWeight="800" fontFamily="'Noto Sans KR', sans-serif">농심엔지니어링</text>
        </svg>
      );
    case '홈플러스':
      return (
        <svg viewBox="0 0 160 40" className="h-9 w-auto">
          <circle cx="22" cy="20" r="10" fill="none" stroke="#E31837" strokeWidth="2" />
          <path d="M17 20h10M22 15v10" stroke="#E31837" strokeWidth="2.5" strokeLinecap="round" />
          <text x="95" y="27" textAnchor="middle" fill="#E31837" fontSize="18" fontWeight="800" fontFamily="Arial, sans-serif">homeplus</text>
        </svg>
      );
    case '이마트':
      return (
        <svg viewBox="0 0 160 40" className="h-9 w-auto">
          <text x="80" y="26" textAnchor="middle" fill="#FFB300" fontSize="22" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="1">emart</text>
          <rect x="40" y="32" width="80" height="3" rx="1.5" fill="#FFB300" />
        </svg>
      );
    default:
      return <span className="font-bold text-gray-700">{name}</span>;
  }
}
