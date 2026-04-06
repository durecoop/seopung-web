'use client';

import ThemedNavbar from './ThemedNavbar';
import ThemedFooter from './ThemedFooter';
import Breadcrumb from './Breadcrumb';
import { useTheme, type ThemeColors } from '@/hooks/useTheme';

interface Props {
  children: (colors: ThemeColors) => React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

/**
 * 모든 서브페이지에서 사용하는 테마 레이아웃 래퍼.
 * 자동으로 Firebase에서 스킨 설정을 로드하여 네비바/푸터/배경을 적용합니다.
 *
 * Usage:
 * <ThemeLayout breadcrumb={[{label:'회사소개'}]}>
 *   {(c) => <div className={c.text}>content</div>}
 * </ThemeLayout>
 */
export default function ThemeLayout({ children, breadcrumb }: Props) {
  const { loaded, theme, colors } = useTheme();

  if (!loaded) {
    return <div className="min-h-screen bg-[#0a1628]" />;
  }

  return (
    <main className={`min-h-screen font-pretendard ${colors.pageBg}`}>
      <ThemedNavbar theme={theme} />
      {breadcrumb && (
        <div className="pt-24">
          <Breadcrumb items={breadcrumb} isDark={colors.dark} />
        </div>
      )}
      {children(colors)}
      <ThemedFooter theme={theme} />
    </main>
  );
}
