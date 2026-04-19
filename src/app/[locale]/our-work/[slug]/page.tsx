import { getCaseStudies } from "@/content/portfolio";
import { locales, type Locale } from "@/i18n/config";
import CaseStudyClient from "./caseStudyClient";

export function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    for (const study of getCaseStudies(locale)) {
      params.push({ locale, slug: study.slug });
    }
  }
  return params;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudyClient slug={slug} />;
}
