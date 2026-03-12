import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/ui/ScrollToTop";

const BASE_URL = "https://durecoop.github.io/Seopung";

export const metadata: Metadata = {
  title: {
    default: "영어조합법인 서풍 | No.1 수산 가공 파트너",
    template: "%s | 영어조합법인 서풍",
  },
  description:
    "지속가능한 바다, 책임 있는 먹거리의 약속. 기술 혁신과 신뢰를 기반으로 국내 수산업의 미래 가치를 창출합니다.",
  keywords: "서풍, 수산가공, OEM, HACCP, ASC, MSC, 수산물, 여수, 영광굴비, 풀무원, 푸드머스",
  openGraph: {
    title: "영어조합법인 서풍 | No.1 수산 가공 파트너",
    description: "지속가능한 바다, 책임 있는 먹거리의 약속. HACCP·ASC·MSC 인증 보유, AI 스마트 팩토리 운영.",
    url: BASE_URL,
    siteName: "영어조합법인 서풍",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/hero/dawn-unloading.jpg`,
        width: 1600,
        height: 900,
        alt: "영어조합법인 서풍 - 수산 가공 파트너",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "영어조합법인 서풍 | No.1 수산 가공 파트너",
    description: "지속가능한 바다, 책임 있는 먹거리의 약속.",
    images: [`${BASE_URL}/images/hero/dawn-unloading.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
