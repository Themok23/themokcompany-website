"use client";

import { useParams } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "./config";

/** Read the active locale from the dynamic route segment. */
export function useLocale(): Locale {
  const params = useParams();
  const raw = params?.locale;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}
