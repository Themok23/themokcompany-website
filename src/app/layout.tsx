import type { Metadata } from "next";
import { Sora, DM_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { defaultLocale, localeDirs, isLocale, type Locale } from "@/i18n/config";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Mok Company | We Build What's Next.",
  description:
    "Strategic consultancy. Marketing innovation. Technology execution. All under one roof.",
  keywords: [
    "management consultancy",
    "brand strategy",
    "technology",
    "digital transformation",
    "AI solutions",
    "innovation",
  ],
  alternates: {
    canonical: "https://themok.company",
    languages: {
      en: "https://themok.company/en",
      ar: "https://themok.company/ar",
    },
  },
  openGraph: {
    title: "The Mok Company | We Build What's Next.",
    description:
      "Strategic consultancy. Marketing innovation. Technology execution. All under one roof.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
  },
};

function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale;
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = localeFromPathname(h.get("x-pathname"));
  const dir = localeDirs[locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sora.variable} ${dmSans.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain-overlay">{children}</body>
    </html>
  );
}
