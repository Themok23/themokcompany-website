import type { InsightArticle } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/insights";
import * as ar from "./locales/ar/insights";

const byLocale = { en, ar } as const;

export function getInsights(locale: Locale): readonly InsightArticle[] {
  return byLocale[locale].insights;
}

export function getInsightsByCategory(
  locale: Locale,
  category: InsightArticle["category"]
): readonly InsightArticle[] {
  return byLocale[locale].insights.filter((i) => i.category === category);
}

export function getFeaturedInsights(locale: Locale): readonly InsightArticle[] {
  return byLocale[locale].insights.filter((i) => i.featured);
}
