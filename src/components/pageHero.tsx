"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextAnimate from "@/components/textAnimate";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, delay: 1.0, ease: "power3.inOut" }
        );
      }

      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: 20,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden"
    >
      {/* Decorative orb */}
      <div
        ref={orbRef}
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-[#00A8FF]/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TextAnimate
          text={title}
          mode="chars"
          tag="h1"
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 font-heading"
          delay={0.2}
          duration={0.8}
          stagger={0.04}
        />

        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed opacity-0"
          >
            {subtitle}
          </p>
        )}

        <div
          ref={lineRef}
          className="mt-12 h-[1px] bg-gradient-to-r from-primary/40 via-border to-transparent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
