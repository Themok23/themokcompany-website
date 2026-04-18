import type { HeroContent, HomeSection, PhilosophyItem, ApproachStep } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/about";
import * as ar from "./locales/ar/about";

const byLocale = { en, ar } as const;

export function getAboutHero(locale: Locale): HeroContent {
  return { ...byLocale[locale].aboutHero };
}

export function getOurStory(locale: Locale): HomeSection {
  return { ...byLocale[locale].ourStory };
}

export function getPhilosophy(locale: Locale): readonly PhilosophyItem[] {
  return byLocale[locale].philosophyItems;
}

export function getApproach(locale: Locale): readonly ApproachStep[] {
  return byLocale[locale].approachSteps;
}
