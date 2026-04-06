export interface SiteTheme {
  id: number;
  name: string;
  // Navbar
  navBg: string;           // scrolled navbar bg
  navText: string;         // scrolled text color
  navHeroText: string;     // overlay text color (on hero)
  navAccent: string;       // active/hover color
  // Sections
  certBg: string;          // certification section bg
  certText: string;
  certCardBg: string;
  certCardBorder: string;
  sectionBg1: string;      // alternating section bg
  sectionBg2: string;
  bannerOverlay: string;   // full-width banner overlay
  ctaBg: string;           // CTA section bg
  ctaText: string;
  // Footer
  footerBg: string;
  footerText: string;
  footerMuted: string;
  // General
  accent: string;          // primary accent (buttons etc)
  accentHover: string;
}

export const THEMES: Record<number, SiteTheme> = {
  // 0: 기존 음식사진 — 클린 오션 블루
  0: {
    id: 0, name: '클린 오션',
    navBg: 'bg-white/95 backdrop-blur-md shadow-lg',
    navText: 'text-gray-800', navHeroText: 'text-white/90', navAccent: 'text-ocean-500',
    certBg: 'bg-ocean-600', certText: 'text-white', certCardBg: 'bg-white/10', certCardBorder: 'border-white/15',
    sectionBg1: 'bg-white', sectionBg2: 'bg-gray-50',
    bannerOverlay: 'from-ocean-600/90 via-ocean-600/70 to-ocean-600/40',
    ctaBg: 'bg-ocean-600', ctaText: 'text-white',
    footerBg: 'bg-ocean-600', footerText: 'text-white', footerMuted: 'text-white/60',
    accent: 'bg-ocean-500', accentHover: 'hover:bg-ocean-400',
  },
  // 1: CSS 폭풍 파도 — 딥 네이비
  1: {
    id: 1, name: '딥 네이비',
    navBg: 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg',
    navText: 'text-white/90', navHeroText: 'text-white/90', navAccent: 'text-ocean-300',
    certBg: 'bg-[#0c2040]', certText: 'text-white', certCardBg: 'bg-white/5', certCardBorder: 'border-white/10',
    sectionBg1: 'bg-[#0a1628]', sectionBg2: 'bg-[#0e1d33]',
    bannerOverlay: 'from-[#0a1628]/90 via-[#0a1628]/70 to-ocean-600/60',
    ctaBg: 'bg-[#0c2040]', ctaText: 'text-white',
    footerBg: 'bg-[#060e1a]', footerText: 'text-white', footerMuted: 'text-white/50',
    accent: 'bg-ocean-500', accentHover: 'hover:bg-ocean-400',
  },
  // 2: 파티클 오션 — 테크 다크
  2: {
    id: 2, name: '테크 다크',
    navBg: 'bg-[#030a19]/95 backdrop-blur-md shadow-lg',
    navText: 'text-white/90', navHeroText: 'text-white/90', navAccent: 'text-cyan-400',
    certBg: 'bg-[#071525]', certText: 'text-white', certCardBg: 'bg-cyan-500/5', certCardBorder: 'border-cyan-500/15',
    sectionBg1: 'bg-[#030a19]', sectionBg2: 'bg-[#071525]',
    bannerOverlay: 'from-[#030a19]/90 via-ocean-600/50 to-[#030a19]/70',
    ctaBg: 'bg-gradient-to-br from-[#071525] to-[#0c2d4a]', ctaText: 'text-white',
    footerBg: 'bg-[#020810]', footerText: 'text-white', footerMuted: 'text-white/40',
    accent: 'bg-gradient-to-r from-ocean-500 to-cyan-500', accentHover: 'hover:brightness-110',
  },
  // 3: 바다 영상 — 시네마틱 다크
  3: {
    id: 3, name: '시네마틱',
    navBg: 'bg-[#020810]/95 backdrop-blur-md shadow-lg',
    navText: 'text-white/90', navHeroText: 'text-white/90', navAccent: 'text-ocean-300',
    certBg: 'bg-ocean-600', certText: 'text-white', certCardBg: 'bg-white/10', certCardBorder: 'border-white/15',
    sectionBg1: 'bg-[#0a1628]', sectionBg2: 'bg-[#0e1d33]',
    bannerOverlay: 'from-[#020810]/90 via-[#020810]/60 to-ocean-600/70',
    ctaBg: 'bg-ocean-600', ctaText: 'text-white',
    footerBg: 'bg-[#020810]', footerText: 'text-white', footerMuted: 'text-white/50',
    accent: 'bg-white', accentHover: 'hover:bg-ocean-50',
  },
  // 4: 시네마틱 분할 — 블루 프리미엄
  4: {
    id: 4, name: '블루 프리미엄',
    navBg: 'bg-[#020a18]/95 backdrop-blur-md shadow-lg',
    navText: 'text-white/90', navHeroText: 'text-white/90', navAccent: 'text-ocean-300',
    certBg: 'bg-gradient-to-br from-ocean-600 to-[#0a2a4a]', certText: 'text-white', certCardBg: 'bg-white/8', certCardBorder: 'border-white/12',
    sectionBg1: 'bg-[#020a18]', sectionBg2: 'bg-[#0a1e35]',
    bannerOverlay: 'from-[#020a18]/90 via-ocean-600/60 to-[#020a18]/80',
    ctaBg: 'bg-[#0a2a4a]', ctaText: 'text-white',
    footerBg: 'bg-[#020a18]', footerText: 'text-white', footerMuted: 'text-white/50',
    accent: 'bg-white', accentHover: 'hover:bg-ocean-50',
  },
  // 5: 대담한 타이포 — 글로우 다크
  5: {
    id: 5, name: '글로우 다크',
    navBg: 'bg-[#020a18]/95 backdrop-blur-md shadow-lg',
    navText: 'text-white/90', navHeroText: 'text-white/90', navAccent: 'text-ocean-300',
    certBg: 'bg-ocean-600', certText: 'text-white', certCardBg: 'bg-white/10', certCardBorder: 'border-white/15',
    sectionBg1: 'bg-[#0a1628]', sectionBg2: 'bg-[#081828]',
    bannerOverlay: 'from-[#020a18]/90 via-ocean-600/50 to-[#020a18]/80',
    ctaBg: 'bg-gradient-to-br from-[#0a1628] to-ocean-600', ctaText: 'text-white',
    footerBg: 'bg-[#020a18]', footerText: 'text-white', footerMuted: 'text-white/40',
    accent: 'bg-white', accentHover: 'hover:bg-ocean-50',
  },
};
