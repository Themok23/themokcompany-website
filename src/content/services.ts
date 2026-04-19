import type { ServiceArm } from "./types";
import type { Locale } from "@/i18n/config";
import * as en from "./locales/en/services";
import * as ar from "./locales/ar/services";

const byLocale = { en, ar } as const;

export function getServiceArms(locale: Locale): readonly ServiceArm[] {
  return byLocale[locale].serviceArms;
}

export function getServiceArm(locale: Locale, slug: string): ServiceArm | undefined {
  const arm = byLocale[locale].serviceArms.find((a) => a.slug === slug);
  return arm ? { ...arm } : undefined;
}
