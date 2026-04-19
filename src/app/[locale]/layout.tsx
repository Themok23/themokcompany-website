import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ClientCanvas } from "@/components/clientCanvas";
import { PageTransition } from "@/components/pageTransition";
import SmoothScroll from "@/components/smoothScroll";
import { locales, isLocale, type Locale } from "@/i18n/config";

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <SmoothScroll>
      <ClientCanvas />
      <Navbar locale={locale} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer locale={locale} />
    </SmoothScroll>
  );
}
