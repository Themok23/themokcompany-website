import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/i18n/config";
import { getLocale } from "@/i18n/getLocale";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip if path already has a supported locale
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclude API, Next internals, static files, and the dashboard (English-only admin)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|dashboard|.*\\..*).*)"],
};
