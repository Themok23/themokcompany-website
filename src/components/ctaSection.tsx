"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/useLocale";

interface CTASectionProps {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  arrow?: "right" | "up-right";
}

/**
 * Reusable bottom-of-page CTA section.
 * Matches the homepage CTA design: border-top, glass background, centered text.
 */
export function CTASection({
  title,
  description,
  buttonLabel,
  buttonHref,
  arrow = "right",
}: CTASectionProps) {
  const locale = useLocale();
  const defaultLabel = locale === "ar" ? "تواصل معنا" : "Get in Touch";
  const label = buttonLabel ?? defaultLabel;
  const href = buttonHref ?? `/${locale}/contact`;
  // If caller passed an internal non-localized href, prepend locale
  const finalHref = href.startsWith("/") && !href.startsWith(`/${locale}/`) && href !== `/${locale}`
    ? `/${locale}${href}`
    : href;
  return (
    <section className="border-t border-border py-20 px-4 sm:px-6 lg:px-8 bg-surface/40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-6 font-heading">
          {title}
        </h2>
        <p className="text-lg text-muted mb-10 font-body">
          {description}
        </p>
        <Button href={finalHref} arrow={arrow}>
          {label}
        </Button>
      </div>
    </section>
  );
}
