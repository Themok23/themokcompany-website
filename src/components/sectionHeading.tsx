"use client";

import TextAnimate from "@/components/textAnimate";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  animateMode?: "words" | "chars" | "scramble" | "gradient" | "wave";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  animateMode = "words",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <p className="text-sm text-primary/60 uppercase tracking-[0.2em] mb-4 font-heading">
          {label}
        </p>
      )}

      <TextAnimate
        text={title}
        mode={animateMode}
        tag="h2"
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-heading"
        scrollTrigger
        triggerStart="top 75%"
        duration={0.7}
        stagger={0.04}
      />

      {description && (
        <p
          className="mt-6 text-lg text-muted max-w-2xl leading-relaxed font-body"
          style={align === "center" ? { margin: "1.5rem auto 0" } : {}}
        >
          {description}
        </p>
      )}
    </div>
  );
}
