"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, LOCALE_COOKIE, type Locale } from "@/i18n/config";

type Props = Readonly<{
  currentLocale: Locale;
  className?: string;
  variant?: "inline" | "stacked";
}>;

function swapLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${target}`;
  if ((locales as readonly string[]).includes(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({ currentLocale, className = "", variant = "inline" }: Props) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (target: Locale) => {
    if (target === currentLocale) return;
    // Persist preference for middleware
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    const nextPath = swapLocaleInPath(pathname, target);
    startTransition(() => {
      router.push(nextPath);
      router.refresh();
    });
  };

  const baseBtn =
    "text-xs tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer";
  const divider = variant === "stacked" ? "block my-1" : "mx-2 text-white/20";

  return (
    <div
      className={`inline-flex items-center ${className}`}
      aria-label="Language switcher"
      data-pending={isPending || undefined}
    >
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        className={`${baseBtn} ${
          currentLocale === "en" ? "text-primary" : "text-white/60 hover:text-white"
        }`}
        aria-pressed={currentLocale === "en"}
      >
        EN
      </button>
      <span className={divider} aria-hidden="true">
        {variant === "stacked" ? "" : "/"}
      </span>
      <button
        type="button"
        onClick={() => handleSwitch("ar")}
        className={`${baseBtn} ${
          currentLocale === "ar" ? "text-primary" : "text-white/60 hover:text-white"
        }`}
        aria-pressed={currentLocale === "ar"}
      >
        AR
      </button>
    </div>
  );
}
