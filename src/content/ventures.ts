import type { Venture, HomeSection } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/ventures";
import * as ar from "./locales/ar/ventures";

const byLocale = { en, ar } as const;

export function getVentures(locale: Locale): readonly Venture[] {
  return byLocale[locale].saasProducts;
}

export function getSaaSProducts(locale: Locale): readonly Venture[] {
  return byLocale[locale].saasProducts.filter((v) => v.type === "saas");
}

export function getVenture(locale: Locale, slug: string): Venture | undefined {
  const venture = byLocale[locale].saasProducts.find((v) => v.slug === slug);
  return venture ? { ...venture } : undefined;
}

export function getInnovationLab(locale: Locale): HomeSection {
  return { ...byLocale[locale].innovationLab };
}
