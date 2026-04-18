import { getVentures } from "@/content/ventures";
import { locales, isLocale, type Locale } from "@/i18n/config";
import VentureClient from "./ventureClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    for (const v of getVentures(locale)) {
      params.push({ locale, slug: v.slug });
    }
  }
  return params;
}

export default async function VentureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  return <VentureClient slug={slug} />;
}
