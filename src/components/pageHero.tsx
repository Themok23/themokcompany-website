"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        "[data-hero-line]",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
      tl.fromTo(
        "[data-hero-sub]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      tl.fromTo(
        "[data-hero-line-divider]",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-40 pb-20 md:pt-48 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1]">
          {title.split("\n").map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        {subtitle && (
          <p
            data-hero-sub
            className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </p>
        )}
        <div
          data-hero-line-divider
          className="mt-12 h-px bg-white/10 origin-left"
        />
      </div>
    </section>
  );
}
