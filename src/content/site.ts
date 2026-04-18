import type { NavLink, FooterColumn, SiteConfig } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/site";
import * as ar from "./locales/ar/site";

const byLocale = { en, ar } as const;

export function getNavLinks(locale: Locale): readonly NavLink[] {
  return byLocale[locale].navLinks;
}

export function getFooterColumns(locale: Locale): readonly FooterColumn[] {
  return byLocale[locale].footerColumns;
}

export function getSiteConfig(locale: Locale): SiteConfig {
  return { ...byLocale[locale].siteConfig };
}

export function getSocialLinks(locale: Locale) {
  return byLocale[locale].socialLinks;
}

export type UiStrings = typeof en.uiStrings;

export function getUiStrings(locale: Locale): UiStrings {
  return byLocale[locale].uiStrings;
}
