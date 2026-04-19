import type { CaseStudy, ClientLogo } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/portfolio";
import * as ar from "./locales/ar/portfolio";

const byLocale = { en, ar } as const;

export function getCaseStudies(locale: Locale): readonly CaseStudy[] {
  return byLocale[locale].caseStudies;
}

export function getFeaturedCaseStudies(locale: Locale): readonly CaseStudy[] {
  return byLocale[locale].caseStudies.filter((cs) => cs.featured);
}

export function getCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  const study = byLocale[locale].caseStudies.find((cs) => cs.slug === slug);
  return study ? { ...study } : undefined;
}

export function getClientLogos(locale: Locale): readonly ClientLogo[] {
  return byLocale[locale].clientLogos;
}

export function getFeaturedClients(locale: Locale): readonly ClientLogo[] {
  return byLocale[locale].clientLogos.filter((cl) => cl.featured);
}
