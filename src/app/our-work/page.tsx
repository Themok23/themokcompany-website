"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/ctaSection";
import { getCaseStudies, getClientLogos } from "@/content/portfolio";
import type { CaseStudy, ClientLogo } from "@/content/types";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_COLORS: Record<string, string> = {
  Transformation: "#00C4AF",
  Platform: "#00A8FF",
  Venture: "#2DD4BF",
  AI: "#00C4AF",
  Brand: "#9B59B6",
  Retail: "#E67E22",
  Finance: "#3498DB",
  Operations: "#1ABC9C",
  Healthcare: "#E74C3C",
  Manufacturing: "#F39C12",
};

const CASE_IMAGES = [
  "collaboration.jpg",
  "meeting.jpg",
  "teamwork.jpg",
  "workspace.jpg",
  "analytics.jpg",
  "consulting.jpg",
  "innovation.jpg",
  "strategy.jpg",
] as const;

function imageForIndex(idx: number): string {
  return CASE_IMAGES[idx % CASE_IMAGES.length];
}

interface ProjectRowProps {
  study: CaseStudy;
  index: number;
  onEnter: (slug: string) => void;
  onLeave: () => void;
}

function ProjectRow({ study, index, onEnter, onLeave }: ProjectRowProps) {
  const accent = CATEGORY_COLORS[study.category] || "#00C4AF";
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <a
      href={`/our-work/${study.slug}`}
      data-project-row
      onMouseEnter={() => onEnter(study.slug)}
      onMouseLeave={onLeave}
      className="project-row relative block group py-9 md:py-12 cursor-pointer"
    >
      <span className="row-line absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-border/60 via-border/20 to-transparent origin-left" />

      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start relative">
        <div data-row-reveal className="col-span-2 md:col-span-1">
          <span className="font-mono text-[11px] md:text-xs text-muted/40 tabular-nums">
            ({indexLabel})
          </span>
        </div>

        <div data-row-reveal className="col-span-10 md:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block w-[6px] h-[6px] rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted/60 font-heading font-semibold">
              {study.client}
            </span>
          </div>
          <h3 className="project-title fluid-title font-heading font-bold text-white">
            {study.title}
          </h3>
          <span
            className="row-underline block mt-5 h-[1px] w-full"
            style={{
              background: `linear-gradient(90deg, ${accent}80, ${accent}20, transparent)`,
            }}
          />
        </div>

        <div
          data-row-reveal
          className="hidden md:flex col-span-3 flex-col gap-2 pt-2"
        >
          <span
            className="text-[10px] uppercase tracking-[0.22em] font-heading font-semibold"
            style={{ color: accent }}
          >
            {study.category}
          </span>
          {study.featured && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted/50 font-heading">
              Featured
            </span>
          )}
          <span className="text-[11px] text-muted/45 font-body leading-relaxed line-clamp-2 mt-1">
            {study.description}
          </span>
        </div>

        <div
          data-row-reveal
          className="col-span-12 md:col-span-1 flex justify-end md:justify-end pt-2"
        >
          <span className="row-arrow inline-flex items-center justify-center w-12 h-12 rounded-full border border-border/60 text-muted/60">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

interface ClientEntryProps {
  client: ClientLogo;
}

function ClientEntry({ client }: ClientEntryProps) {
  return (
    <div className="flex-shrink-0 flex items-baseline gap-5 px-10">
      <span className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white/25 hover:text-white transition-colors duration-500 cursor-default tracking-tight">
        {client.name}
      </span>
      <span className="text-[10px] uppercase tracking-[0.24em] text-muted/35 font-heading">
        {client.industry}
      </span>
      <span className="w-2 h-2 rounded-full bg-muted/20" aria-hidden />
    </div>
  );
}

export default function OurWorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const caseStudies = getCaseStudies();
  const clients = getClientLogos();

  const categories = useMemo<string[]>(() => {
    const uniq = Array.from(new Set(caseStudies.map((s) => s.category)));
    return ["All", ...uniq];
  }, [caseStudies]);

  const filteredStudies = useMemo<readonly CaseStudy[]>(() => {
    if (selectedCategory === "All") return caseStudies;
    return caseStudies.filter((s) => s.category === selectedCategory);
  }, [caseStudies, selectedCategory]);

  const handleEnter = useCallback((slug: string) => {
    setHoveredSlug(slug);
  }, []);
  const handleLeave = useCallback(() => {
    setHoveredSlug(null);
  }, []);

  // Hero reveal + counter
  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const reveals = heroRef.current.querySelectorAll("[data-hero-reveal]");
        gsap.fromTo(
          reveals,
          { opacity: 0, y: 50, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }

      if (countRef.current && !prefersReduced) {
        const target = caseStudies.length;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 2.2,
          ease: "power2.out",
          delay: 0.6,
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(
                Math.floor(counter.value)
              ).padStart(2, "0");
            }
          },
        });
      } else if (countRef.current) {
        countRef.current.textContent = String(caseStudies.length).padStart(
          2,
          "0"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [caseStudies.length]);

  // Row + row-line reveals on scroll — rebinds when filter changes
  useEffect(() => {
    if (!listRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const rows = listRef.current?.querySelectorAll("[data-project-row]");
      rows?.forEach((row) => {
        const reveals = row.querySelectorAll("[data-row-reveal]");
        gsap.fromTo(
          reveals,
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        const line = row.querySelector(".row-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, listRef);

    return () => ctx.revert();
  }, [filteredStudies]);

  // Mouse follower for image peek
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    if (!peekRef.current) return;

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.14;
      curY += (targetY - curY) * 0.14;
      if (peekRef.current) {
        peekRef.current.style.transform = `translate3d(calc(${curX}px - 50%), calc(${curY}px - 50%), 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Fade peek on hover state
  useEffect(() => {
    if (!peekRef.current) return;
    gsap.to(peekRef.current, {
      opacity: hoveredSlug ? 1 : 0,
      scale: hoveredSlug ? 1 : 0.92,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [hoveredSlug]);

  return (
    <div
      ref={containerRef}
      className="w-full text-white min-h-screen overflow-x-hidden relative z-[1] font-body"
    >
      {/* Editorial Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-16 md:pt-48 md:pb-20 px-6 lg:px-12 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-6 md:gap-12 mb-12">
            <div>
              <p
                data-hero-reveal
                className="text-[11px] uppercase tracking-[0.32em] text-primary/70 font-heading mb-6"
              >
                Selected Work — 2020 / 2026
              </p>
              <h1
                data-hero-reveal
                className="fluid-hero font-heading font-bold text-white"
              >
                <span className="block">Strategy,</span>
                <span className="block text-primary">in motion.</span>
              </h1>
            </div>
            <div data-hero-reveal className="hidden md:block text-right">
              <span
                ref={countRef}
                className="block text-6xl lg:text-7xl font-light font-heading text-primary leading-none tabular-nums"
              >
                00
              </span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-muted/60 mt-3 font-heading">
                Case Studies
              </span>
            </div>
          </div>

          <div
            data-hero-reveal
            className="flex flex-wrap items-center gap-2 pt-10 border-t border-border/40"
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted/40 font-heading mr-2">
              Filter —
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`pill-filter ${
                    isActive ? "is-active" : ""
                  } px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-heading font-semibold rounded-full border ${
                    isActive
                      ? "border-primary text-[#060810] bg-primary"
                      : "border-border/50 text-muted/70 hover:border-primary/40 hover:text-primary"
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project list */}
      <section className="relative pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto" ref={listRef}>
          {filteredStudies.length === 0 ? (
            <div className="py-20 text-center border-t border-border/40">
              <p className="text-muted/60 font-body">
                No projects match this category.
              </p>
            </div>
          ) : (
            filteredStudies.map((study, idx) => {
              const originalIdx = caseStudies.findIndex(
                (s) => s.id === study.id
              );
              return (
                <ProjectRow
                  key={study.id}
                  study={study}
                  index={originalIdx >= 0 ? originalIdx : idx}
                  onEnter={handleEnter}
                  onLeave={handleLeave}
                />
              );
            })
          )}
          {/* Closing line */}
          <span className="block h-[1px] bg-gradient-to-r from-border/60 via-border/20 to-transparent origin-left" />
        </div>
      </section>

      {/* Floating cursor image peek */}
      <div ref={peekRef} className="peek-image" aria-hidden>
        {caseStudies.map((s, i) => {
          const img = imageForIndex(i);
          return (
            <div
              key={s.id}
              className="absolute inset-0 transition-opacity duration-500 ease-out"
              style={{ opacity: hoveredSlug === s.slug ? 1 : 0 }}
            >
              <Image
                src={`/images/${img}`}
                alt=""
                fill
                className="object-cover"
                sizes="340px"
                loading={i < 3 ? "eager" : "lazy"}
              />
              <div
                className="absolute bottom-4 left-4 right-4 text-white font-heading font-semibold text-xs uppercase tracking-[0.24em]"
                style={{
                  textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                }}
              >
                {s.client}
              </div>
            </div>
          );
        })}
      </div>

      {/* Clients Marquee */}
      <section className="py-20 md:py-28 border-t border-border/50 overflow-hidden clients-marquee">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-primary/70 font-heading mb-4">
                Clients
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-heading leading-[1.05] tracking-tight">
                Trusted by enterprise leaders.
              </h2>
            </div>
            <p className="text-sm text-muted/50 max-w-xs font-body">
              We partner with organizations pursuing ambitious digital
              transformation across industries.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="clients-marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <ClientEntry key={`${c.id}-${i}`} client={c} />
            ))}
          </div>
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#060810] to-transparent" />
          <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#060810] to-transparent" />
        </div>
      </section>

      <CTASection
        title="Looking for a partner for your next transformation?"
        description="Let us explore what MOK can do for your organization."
        buttonLabel="Start the Conversation"
        buttonHref="/contact"
        arrow="up-right"
      />
    </div>
  );
}
