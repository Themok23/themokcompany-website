"use client";

import { Button } from "@/components/ui/button";

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
  buttonLabel = "Get in Touch",
  buttonHref = "/contact",
  arrow = "right",
}: CTASectionProps) {
  return (
    <section className="border-t border-border py-20 px-4 sm:px-6 lg:px-8 bg-surface/40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-6 font-heading">
          {title}
        </h2>
        <p className="text-lg text-muted mb-10 font-body">
          {description}
        </p>
        <Button href={buttonHref} arrow={arrow}>
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
