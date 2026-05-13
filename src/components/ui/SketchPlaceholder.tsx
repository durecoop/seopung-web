'use client';

type SketchKey = 'frozen' | 'mealkit' | 'gulbi' | 'sustainable' | 'fish' | 'factory' | 'team' | 'product' | 'cert';

interface Props {
  sketch: SketchKey;
  caption?: string;
  hint?: string;
  className?: string;
}

/**
 * 연필 스케치 스타일 placeholder.
 * 사진이 들어올 자리에 임시로 분위기를 전달하는 손그림 일러스트.
 */
export default function SketchPlaceholder({ sketch, caption = '사진 필요', hint, className = '' }: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-[#fdfbf5] via-white to-[#f5f7fa] ${className}`}>
      {/* 종이 질감 — 미세한 점들 */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #1f2937 1px, transparent 1px), radial-gradient(circle at 75% 75%, #1f2937 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      {/* 스케치 + 캡션 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-4">
        <Sketch which={sketch} />
        <div className="text-center">
          <span className="inline-block rounded-full bg-gray-900 px-3 py-1 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {caption}
          </span>
          {hint && <p className="mt-2 text-xs text-gray-600 md:text-sm">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── 각 상황별 스케치 SVG (연필 톤) ─── */
function Sketch({ which }: { which: SketchKey }) {
  const stroke = { stroke: '#374151', fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (which) {
    case 'frozen': // 얼음 위 생선
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.6} {...stroke}>
          {/* 얼음 결정 */}
          <path d="M30 88l4 4 4-4M50 92l3 3 3-3M170 88l4 4 4-4M155 94l3 3 3-3M20 92h12M165 95h14" strokeWidth={1.2} opacity="0.6" />
          {/* 생선 본체 */}
          <path d="M55 60c10-18 35-22 60-22s50 6 65 22-15 22-65 22-55-4-60-22z" strokeWidth={1.6} />
          {/* 꼬리 */}
          <path d="M45 60l-15-12-3 8 6 4-6 4 3 8 15-12" strokeWidth={1.6} />
          {/* 비늘 */}
          <path d="M95 50c3 4 3 16 0 20M115 48c3 5 3 19 0 24M135 50c3 4 3 16 0 20" strokeWidth={1} opacity="0.7" />
          {/* 눈 */}
          <circle cx="165" cy="55" r="3" strokeWidth={1.3} />
          <circle cx="165" cy="55" r="1" fill="#374151" />
          {/* 입 */}
          <path d="M180 60c4 0 8 2 10 4" strokeWidth={1.2} />
          {/* 옅은 그림자선 (얼음) */}
          <path d="M40 100h130" strokeWidth={0.8} strokeDasharray="3 4" opacity="0.5" />
        </svg>
      );

    case 'mealkit': // 그릇 + 재료
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.6} {...stroke}>
          {/* 그릇 */}
          <ellipse cx="100" cy="78" rx="60" ry="14" strokeWidth={1.6} />
          <path d="M40 78c0 18 15 30 60 30s60-12 60-30" strokeWidth={1.6} />
          {/* 그릇 안 재료 */}
          <path d="M70 76c5-2 12-4 18-2 6-2 14-1 20 2 6-1 14-2 22 0" strokeWidth={1.2} opacity="0.7" />
          {/* 김 (steam) */}
          <path d="M85 50c-2-5 4-10 0-15M105 45c-3-6 5-10 0-16M125 50c-2-5 4-10 0-15" strokeWidth={1.2} opacity="0.5" strokeDasharray="2 3" />
          {/* 박스 */}
          <rect x="155" y="58" width="35" height="22" strokeWidth={1.2} />
          <path d="M155 65h35M170 58v22" strokeWidth={1} opacity="0.6" />
          {/* 옆 식재료 (레몬) */}
          <circle cx="22" cy="76" r="8" strokeWidth={1.4} />
          <path d="M22 70v12M16 76h12" strokeWidth={1} opacity="0.7" />
        </svg>
      );

    case 'gulbi': // 짚으로 엮인 굴비
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.5} {...stroke}>
          {/* 짚 (수직 줄) */}
          <path d="M100 18v90M97 22l6 2M96 40l8 2M97 58l6 2M96 76l8 2M97 94l6 2" strokeWidth={1.2} />
          {/* 굴비 1 */}
          <path d="M60 30c6-8 25-10 38-8 5 4 5 14-2 18-8 4-32 2-36-10z" />
          <circle cx="92" cy="32" r="1.5" fill="#374151" />
          {/* 굴비 2 */}
          <path d="M62 52c6-8 25-10 38-8 5 4 5 14-2 18-8 4-32 2-36-10z" />
          <circle cx="93" cy="54" r="1.5" fill="#374151" />
          {/* 굴비 3 */}
          <path d="M60 74c6-8 25-10 38-8 5 4 5 14-2 18-8 4-32 2-36-10z" />
          <circle cx="92" cy="76" r="1.5" fill="#374151" />
          {/* 비늘 줄 */}
          <path d="M70 36c3 2 3 4 0 6M70 58c3 2 3 4 0 6M70 80c3 2 3 4 0 6" strokeWidth={1} opacity="0.6" />
        </svg>
      );

    case 'sustainable': // 생선 + 인증 원
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.5} {...stroke}>
          {/* 인증 원 */}
          <circle cx="60" cy="60" r="38" />
          <circle cx="60" cy="60" r="32" strokeDasharray="3 4" opacity="0.5" />
          {/* 체크 */}
          <path d="M46 60l10 10 18-18" strokeWidth={1.8} />
          {/* 생선 (인증된 어종) */}
          <path d="M115 60c8-12 28-15 48-15 10 4 10 26 0 30-20 0-40-3-48-15z" />
          <circle cx="155" cy="58" r="2" fill="#374151" />
          {/* 꼬리 */}
          <path d="M115 60l-10-8-2 5 4 3-4 3 2 5 10-8" />
          {/* 파도 (지속가능 상징) */}
          <path d="M120 95c5-3 10 3 15 0s10 3 15 0s10 3 15 0s10 3 15 0" strokeWidth={1.2} opacity="0.6" />
        </svg>
      );

    case 'fish': // 일반 생선
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.6} {...stroke}>
          <path d="M40 60c12-20 40-25 70-25s55 8 70 25-15 25-70 25-58-5-70-25z" />
          <path d="M30 60l-12-12-2 8 5 4-5 4 2 8 12-12" />
          <circle cx="160" cy="55" r="3" />
          <circle cx="160" cy="55" r="1" fill="#374151" />
          <path d="M85 50c4 5 4 15 0 20M110 48c4 6 4 18 0 24M135 50c4 5 4 15 0 20" strokeWidth={1} opacity="0.6" />
        </svg>
      );

    case 'factory': // 공장 외관
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.5} {...stroke}>
          <path d="M30 95V55l25-15v55M55 95V40l40 15v40M95 95V55l40-15v55M135 95V40l30 15v40M30 95h140" />
          <rect x="40" y="65" width="8" height="12" strokeWidth={1} />
          <rect x="65" y="55" width="8" height="12" strokeWidth={1} />
          <rect x="80" y="70" width="8" height="12" strokeWidth={1} />
          <rect x="105" y="60" width="8" height="12" strokeWidth={1} />
          <rect x="120" y="70" width="8" height="12" strokeWidth={1} />
          <rect x="145" y="55" width="8" height="12" strokeWidth={1} />
          {/* 굴뚝 연기 */}
          <path d="M50 35c-2-4 4-6 0-10" strokeWidth={1} opacity="0.5" strokeDasharray="2 3" />
        </svg>
      );

    case 'team': // 사람들 (단체)
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.5} {...stroke}>
          {/* 사람 5명 (간략화) */}
          {[35, 65, 95, 125, 155].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={45} r="9" />
              <path d={`M${x - 12} 95v-22c0-7 5-12 12-12s12 5 12 12v22`} />
            </g>
          ))}
        </svg>
      );

    case 'product': // 제품 패키지
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.5} {...stroke}>
          <rect x="30" y="35" width="60" height="70" />
          <path d="M30 50h60" strokeWidth={1.2} opacity="0.6" />
          <rect x="40" y="60" width="40" height="6" strokeWidth={1} opacity="0.5" />
          <rect x="40" y="72" width="30" height="3" strokeWidth={1} opacity="0.5" />
          <rect x="40" y="80" width="30" height="3" strokeWidth={1} opacity="0.5" />
          <rect x="110" y="50" width="60" height="55" />
          <path d="M110 65h60" strokeWidth={1.2} opacity="0.6" />
          <rect x="120" y="75" width="40" height="6" strokeWidth={1} opacity="0.5" />
          <rect x="120" y="87" width="25" height="3" strokeWidth={1} opacity="0.5" />
        </svg>
      );

    case 'cert': // 인증 메달
      return (
        <svg viewBox="0 0 200 120" className="h-20 w-auto md:h-24" strokeWidth={1.5} {...stroke}>
          <circle cx="100" cy="55" r="35" />
          <circle cx="100" cy="55" r="28" strokeDasharray="3 4" opacity="0.5" />
          <path d="M88 55l8 8 16-16" strokeWidth={1.8} />
          {/* 메달 리본 */}
          <path d="M75 85l-10 25h20l10-20M125 85l10 25h-20l-10-20" />
        </svg>
      );

    default:
      return null;
  }
}
