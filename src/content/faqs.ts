import type { FAQ } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/faqs";
import * as ar from "./locales/ar/faqs";

const byLocale = { en, ar } as const;

export function getFAQs(locale: Locale): readonly FAQ[] {
  return byLocale[locale].faqs;
}

export function getFAQsByCategory(locale: Locale, category: string): readonly FAQ[] {
  return byLocale[locale].faqs.filter((faq) => faq.category === category);
}
