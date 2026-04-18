"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectScreenshotsProps {
  screenshots: string[];
  projectName: string;
}

function getLabel(path: string): string {
  const filename = path.split("/").pop()?.replace(/\.\w+$/, "") ?? "";
  const parts = filename.split("-");
  const meaningful = parts.slice(Math.max(1, Math.ceil(parts.length / 2)));
  return meaningful.length > 0
    ? meaningful
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : filename;
}

export function ProjectScreenshots({
  screenshots,
  projectName,
}: ProjectScreenshotsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !pinRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        const reveals = headingRef.current.querySelectorAll("[data-reveal]");
        gsap.fromTo(
          reveals,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: prefersReduced ? 0.01 : 0.9,
            stagger: prefersReduced ? 0 : 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // Desktop: horizontal pinned scroll
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const compute = () => {
          const totalWidth = track.scrollWidth;
          const viewport = window.innerWidth;
          return Math.max(0, totalWidth - viewport);
        };

        const distance = compute();
        if (distance <= 0) return;

        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${compute()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Each card subtle scale + fade in based on position
        const cards = track.querySelectorAll("[data-screenshot-card]");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.4, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getTweensOf(track)[0],
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      // Mobile: simple staggered reveal
      mm.add("(max-width: 767px)", () => {
        const cards = trackRef.current?.querySelectorAll(
          "[data-screenshot-card]"
        );
        cards?.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [screenshots]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative pb-28">
      <div
        ref={headingRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 md:mb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p
              data-reveal
              className="text-[11px] uppercase tracking-[0.3em] text-primary/70 font-heading mb-4"
            >
              Production
            </p>
            <h2
              data-reveal
              className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-[1.02]"
            >
              {projectName}{" "}
              <span className="text-muted/50 italic font-light">
                — in action.
              </span>
            </h2>
          </div>
          <p
            data-reveal
            className="hidden md:block text-xs text-muted/50 font-mono uppercase tracking-[0.2em]"
          >
            {String(screenshots.length).padStart(2, "0")} frames
            <span className="mx-2">·</span>
            scroll to explore
          </p>
        </div>

        {/* Progress bar */}
        <div className="hidden md:block mt-10 relative h-[1px] bg-border/40 overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-primary origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Pinned viewport (desktop) / flow (mobile) */}
      <div ref={pinRef} className="relative md:h-screen md:overflow-hidden">
        <div
          ref={trackRef}
          className="h-scroll-track md:h-full md:items-center"
          style={{ willChange: "transform" }}
        >
          {screenshots.map((src, i) => (
            <figure
              key={src}
              data-screenshot-card
              className="h-scroll-card group"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0A0C11] border-b border-border/40">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
                <span className="ml-3 text-[10px] text-muted/40 font-mono truncate">
                  {projectName.toLowerCase().replace(/\s+/g, "")}.app /{" "}
                  {getLabel(src).toLowerCase()}
                </span>
                <span className="ml-auto text-[10px] text-muted/35 font-mono tabular-nums">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(screenshots.length).padStart(2, "0")}
                </span>
              </div>

              <div className="relative flex-1 w-full h-full overflow-hidden bg-[#0D0F14]">
                <Image
                  src={src}
                  alt={`${projectName} — ${getLabel(src)}`}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 700px"
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060810]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none">
                  <span className="text-white font-heading font-semibold text-sm uppercase tracking-[0.18em]">
                    {getLabel(src)}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}

          {/* Closing spacer on desktop for breathing room */}
          <div
            aria-hidden
            className="hidden md:block flex-shrink-0 w-12"
          />
        </div>
      </div>
    </section>
  );
}
