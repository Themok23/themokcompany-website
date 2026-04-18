import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

export function getLocale(req: NextRequest): Locale {
  // 1. Cookie takes precedence (user explicit choice)
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  // 2. Accept-Language header
  const headers: Record<string, string> = {};
  const accept = req.headers.get("accept-language");
  if (accept) headers["accept-language"] = accept;

  const languages = new Negotiator({ headers }).languages();
  try {
    return match(languages, locales as readonly string[], defaultLocale) as Locale;
  } catch {
    return defaultLocale;
  }
}
