'use client';

type AspectKey = 'square' | '4/3' | '16/9' | '4/5' | '3/4' | '21/9' | '1/1';

interface BaseProps {
  caption?: string;
  hint?: string;
  className?: string;
  tone?: 'light' | 'dark' | 'gold';
}

interface RatioProps extends BaseProps {
  ratio?: AspectKey;
  fill?: false;
}

interface FillProps extends BaseProps {
  fill: true;
  ratio?: never;
}

type Props = RatioProps | FillProps;

const ASPECT_CLASS: Record<AspectKey, string> = {
  'square': 'aspect-square',
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '4/5': 'aspect-[4/5]',
  '3/4': 'aspect-[3/4]',
  '21/9': 'aspect-[21/9]',
};

const TONE_STYLES = {
  light: {
    bg: 'bg-gradient-to-br from-ocean-50 via-white to-gold-50',
    border: 'border-ocean-500/30',
    iconRing: 'ring-ocean-500/25',
    iconBg: 'bg-white/90',
    iconText: 'text-ocean-500',
    badgeBg: 'bg-ocean-500',
    badgeText: 'text-white',
    captionText: 'text-gray-700',
    hintText: 'text-gray-500',
    glow1: 'rgba(34, 161, 196, 0.18)',
    glow2: 'rgba(232, 163, 23, 0.14)',
  },
  dark: {
    bg: 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900',
    border: 'border-ocean-400/40',
    iconRing: 'ring-ocean-400/30',
    iconBg: 'bg-white/10',
    iconText: 'text-ocean-300',
    badgeBg: 'bg-ocean-400',
    badgeText: 'text-navy-950',
    captionText: 'text-white/85',
    hintText: 'text-white/50',
    glow1: 'rgba(92, 200, 224, 0.22)',
    glow2: 'rgba(245, 204, 102, 0.16)',
  },
  gold: {
    bg: 'bg-gradient-to-br from-gold-50 via-white to-ocean-50',
    border: 'border-gold-500/40',
    iconRing: 'ring-gold-500/30',
    iconBg: 'bg-white/90',
    iconText: 'text-gold-500',
    badgeBg: 'bg-gold-500',
    badgeText: 'text-white',
    captionText: 'text-gray-700',
    hintText: 'text-gray-500',
    glow1: 'rgba(232, 163, 23, 0.20)',
    glow2: 'rgba(34, 161, 196, 0.14)',
  },
} as const;

export default function PhotoNeeded(props: Props) {
  const { caption, hint, className = '', tone = 'light' } = props;
  const sizing = props.fill ? 'absolute inset-0' : ASPECT_CLASS[props.ratio ?? '4/3'] + ' relative';
  const t = TONE_STYLES[tone];

  return (
    <div
      className={`${sizing} overflow-hidden rounded-2xl border-2 border-dashed ${t.border} ${t.bg} ${className}`}
      role="img"
      aria-label={`사진필요 ${caption ?? ''}`.trim()}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 25% 30%, ${t.glow1} 0%, transparent 55%), radial-gradient(ellipse 45% 55% at 78% 75%, ${t.glow2} 0%, transparent 55%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          color: tone === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(14,116,144,0.08)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-4 text-center">
        <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${t.iconBg} shadow-md ring-2 ${t.iconRing} backdrop-blur-sm`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`h-7 w-7 ${t.iconText}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
        </div>

        <span className={`rounded-full px-4 py-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm ${t.badgeBg} ${t.badgeText}`}>
          사진필요
        </span>

        {caption && (
          <span className={`mt-3 max-w-[85%] text-sm font-semibold leading-snug ${t.captionText}`}>
            {caption}
          </span>
        )}
        {hint && (
          <span className={`mt-1.5 max-w-[85%] text-xs leading-snug ${t.hintText}`}>
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}
