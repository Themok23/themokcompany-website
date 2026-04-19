import type { Position, HomeSection } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/careers";
import * as ar from "./locales/ar/careers";

const byLocale = { en, ar } as const;

export function getPositions(locale: Locale): readonly Position[] {
  return byLocale[locale].positions;
}

export function getCareersCulture(locale: Locale): HomeSection {
  return { ...byLocale[locale].cultureSection };
}
