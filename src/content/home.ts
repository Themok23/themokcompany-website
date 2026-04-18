import type { HeroContent, HomeSection } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/home";
import * as ar from "./locales/ar/home";

const byLocale = { en, ar } as const;

export function getHomeHero(locale: Locale): HeroContent {
  return { ...byLocale[locale].homeHero };
}

export function getHomeWhoWeAre(locale: Locale): HomeSection {
  return { ...byLocale[locale].whoWeAre };
}

export function getHomeArms(locale: Locale): HomeSection {
  return { ...byLocale[locale].homeArms };
}

export function getHomeWhyMok(locale: Locale): HomeSection {
  return { ...byLocale[locale].whyMok };
}

export function getHomeAudience(locale: Locale): HomeSection {
  return { ...byLocale[locale].audience };
}

export function getHomeCTA(locale: Locale): HeroContent {
  return { ...byLocale[locale].homeCTA };
}
