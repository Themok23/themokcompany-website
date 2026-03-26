"use client";

import { useGsapReveal } from "@/lib/gsapUtils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const ref = useGsapReveal();

  return (
    <div
      ref={ref}
      className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <p
          data-reveal
          className="text-sm text-white/40 uppercase tracking-[0.2em] mb-4"
        >
          {label}
        </p>
      )}
      <h2
        data-reveal
        className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight"
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed"
          style={align === "center" ? { margin: "1.5rem auto 0" } : {}}
        >
          {description}
        </p>
      )}
    </div>
  );
}
