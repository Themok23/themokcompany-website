"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getCaseStudy, getCaseStudies } from "@/content/portfolio";
import { ProjectScreenshots } from "@/components/projectScreenshots";

gsap.registerPlugin(ScrollTrigger);

const caseImages = [
  "collaboration.jpg",
  "meeting.jpg",
  "teamwork.jpg",
  "workspace.jpg",
  "analytics.jpg",
  "consulting.jpg",
  "innovation.jpg",
  "strategy.jpg",
] as const;

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

interface CaseStudyClientProps {
  slug: string;
}

export default function CaseStudyClient({ slug }: CaseStudyClientProps) {
  const study = getCaseStudy(slug);
  const allStudies = getCaseStudies();
  const currentIndex = allStudies.findIndex((s) => s.slug === slug);
  const imageFile =
    caseImages[currentIndex >= 0 ? currentIndex % caseImages.length : 0];

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("challenge");

  useEffect(() => {
    if (!containerRef.current || !study) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Hero reveals — blur-to-focus stagger
      if (heroRef.current) {
        const reveals = heroRef.current.querySelectorAll("[data-hero-reveal]");
        gsap.fromTo(
          reveals,
          { opacity: 0, y: 50, filter: "blur(14px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: prefersReduced ? 0.01 : 1.1,
            stagger: prefersReduced ? 0 : 0.12,
            ease: "power3.out",
            delay: prefersReduced ? 0 : 0.15,
          }
        );
      }

      // Cinematic hero image — clip-path reveal + scale settle
      if (heroImageRef.current) {
        if (!prefersReduced) {
          gsap.fromTo(
            heroImageRef.current,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.5,
              delay: 0.55,
              ease: "power3.inOut",
            }
          );
          const img = heroImageRef.current.querySelector(".hero-cover-img");
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.35 },
              {
                scale: 1,
                duration: 1.8,
                delay: 0.55,
                ease: "power3.out",
              }
            );
            gsap.to(img, {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: heroImageRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8,
              },
            });
          }
        }
      }

      // Section reveals + active-section tracking
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll("[data-section]");
        sections.forEach((section, i) => {
          if (!prefersReduced) {
            gsap.fromTo(
              section,
              { opacity: 0, y: 55 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: i * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          const id = section.getAttribute("data-section-id") || "";
          ScrollTrigger.create({
            trigger: section,
            start: "top 45%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(id);
            },
          });
        });
      }

      // Impact list — blur-to-focus stagger
      if (impactRef.current && !prefersReduced) {
        const items = impactRef.current.querySelectorAll("[data-impact]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: impactRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [study]);

  if (!study) {
    return (
      <div className="w-full text-white min-h-screen flex items-center justify-center relative z-[1]">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4 font-heading">
            Case Study Not Found
          </h1>
          <Link
            href="/our-work"
            className="text-primary hover:text-white transition-colors"
          >
            Back to Our Work
          </Link>
        </div>
      </div>
    );
  }

  const accentColor = CATEGORY_COLORS[study.category] || "#00C4AF";

  const sections = [
    { id: "challenge", label: "Challenge", content: study.challenge },
    { id: "approach", label: "Approach", content: study.approach },
    { id: "execution", label: "Execution", content: study.execution },
  ];

  const impactItems = study.impact
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const prevStudy = currentIndex > 0 ? allStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex >= 0 && currentIndex < allStudies.length - 1
      ? allStudies[currentIndex + 1]
      : null;

  const positionLabel = `${String(currentIndex + 1).padStart(2, "0")} / ${String(
    allStudies.length
  ).padStart(2, "0")}`;

  return (
    <div
      ref={containerRef}
      className="w-full text-white min-h-screen overflow-x-hidden relative z-[1]"
    >
      {/* Editorial hero */}
      <section className="pt-40 pb-10 md:pt-44 md:pb-14 px-6 lg:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <Link
            href="/our-work"
            data-hero-reveal
            className="inline-flex items-center gap-3 text-muted/80 hover:text-primary transition-colors mb-12 font-heading text-[11px] uppercase tracking-[0.24em] group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </Link>

          <div
            data-hero-reveal
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 text-[11px] uppercase tracking-[0.26em] font-heading text-muted/70"
          >
            <span className="font-mono tabular-nums">{positionLabel}</span>
            <span className="w-8 h-[1px] bg-border/50" />
            <span style={{ color: accentColor }}>{study.category}</span>
            {study.featured && (
              <>
                <span className="w-8 h-[1px] bg-border/50" />
                <span>Featured</span>
              </>
            )}
          </div>

          <h1
            data-hero-reveal
            className="fluid-display font-heading font-bold text-white mb-12"
          >
            {study.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 border-t border-border/40 pt-10">
            <div data-hero-reveal className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted/60 font-heading mb-3">
                Client
              </p>
              <p className="text-xl md:text-2xl font-heading font-semibold tracking-tight">
                {study.client}
              </p>
            </div>

            <div data-hero-reveal className="md:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted/60 font-heading mb-3">
                Overview
              </p>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed font-body">
                {study.description}
              </p>
              {study.projectUrl && (
                <a
                  href={study.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-primary text-[#060810] font-semibold rounded-lg hover:bg-primary/90 transition-colors btn-glow font-heading text-sm"
                >
                  Explore Live Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic hero image */}
      <section className="px-6 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div
            ref={heroImageRef}
            className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border/30 clip-reveal"
          >
            <Image
              src={study.image || `/images/${imageFile}`}
              alt={study.title}
              fill
              className="hero-cover-img object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060810]/55 via-transparent to-transparent pointer-events-none" />
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, ${accentColor}90, ${accentColor}20, transparent)`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Sticky rail + editorial sections */}
      <section className="px-6 lg:px-12 pb-28">
        <div
          ref={contentRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 relative"
        >
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-32 space-y-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted/60 font-heading mb-5">
                The Work
              </p>
              {sections.map((s, i) => {
                const isActive = activeSection === s.id;
                return (
                  <div
                    key={s.id}
                    className={`nav-rail-item flex items-center gap-4 ${
                      isActive ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    <span
                      className="nav-rail-line h-[1px]"
                      style={{
                        width: isActive ? "48px" : "20px",
                        backgroundColor: isActive
                          ? "var(--color-primary)"
                          : "rgba(138,155,176,0.5)",
                      }}
                    />
                    <span className="text-sm font-heading font-semibold tracking-tight">
                      <span className="text-muted/50 font-mono text-[11px] tabular-nums mr-2">
                        0{i + 1}
                      </span>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="md:col-span-9 space-y-20 md:space-y-24">
            {sections.map((s, i) => (
              <div key={s.id} data-section data-section-id={s.id}>
                <p
                  className="text-[11px] uppercase tracking-[0.3em] font-heading mb-6"
                  style={{ color: accentColor }}
                >
                  <span className="font-mono tabular-nums mr-3">
                    0{i + 1}
                  </span>
                  — {s.label}
                </p>
                <p className="text-lg md:text-2xl text-white/90 leading-[1.5] font-body max-w-3xl">
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact — editorial list */}
      <section className="px-6 lg:px-12 pb-28 border-t border-border/40 pt-20 md:pt-24">
        <div ref={impactRef} className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.3em] font-heading mb-4"
                style={{ color: accentColor }}
              >
                Impact
              </p>
              <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-[1.02] max-w-3xl">
                Outcomes that moved the business.
              </h2>
            </div>
            <p className="hidden md:block text-sm text-muted/50 max-w-xs font-body">
              Measurable outcomes delivered across operations, experience, and
              economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 border-t border-border/40">
            {impactItems.map((item, i) => (
              <div
                key={`${item}-${i}`}
                data-impact
                className="group flex items-start gap-6 py-7 border-b border-border/30 hover:border-primary/50 transition-colors duration-500"
              >
                <span className="font-mono text-[11px] text-muted/45 tabular-nums pt-2 flex-shrink-0">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <p className="flex-1 text-lg md:text-2xl text-white font-heading font-medium leading-[1.25] tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots gallery — horizontal pinned */}
      {study.screenshots && study.screenshots.length > 0 && (
        <ProjectScreenshots
          screenshots={study.screenshots}
          projectName={study.client}
        />
      )}

      {/* Next project — full-bleed cinematic */}
      {nextStudy && (
        <section className="relative border-t border-border/40">
          <Link
            href={`/our-work/${nextStudy.slug}`}
            className="block group relative overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-3 order-1 md:order-none">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted/55 font-heading mb-3">
                  Next Project
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted/70 font-heading">
                  {nextStudy.client}
                </p>
              </div>
              <div className="md:col-span-8 order-2 md:order-none">
                <h3 className="fluid-next font-heading font-bold text-white group-hover:translate-x-6 transition-transform duration-700 ease-out">
                  {nextStudy.title}
                </h3>
              </div>
              <div className="md:col-span-1 order-3 md:order-none flex md:justify-end">
                <span className="row-arrow inline-flex items-center justify-center w-16 h-16 rounded-full border border-border/60 text-muted/60">
                  <ArrowUpRight className="w-6 h-6" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Prev context link */}
      {prevStudy && (
        <section className="border-t border-border/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7">
            <Link
              href={`/our-work/${prevStudy.slug}`}
              className="inline-flex items-center gap-3 text-muted/70 hover:text-primary transition-colors group text-[11px] uppercase tracking-[0.24em] font-heading"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Previous — {prevStudy.client}
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border py-20 px-6 lg:px-12 bg-surface/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading tracking-tight">
            Ready to transform your business?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-[#060810] font-semibold hover:bg-primary/90 transition-colors rounded-lg btn-glow font-heading"
            >
              Start a Conversation
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <a
              href="/contact?type=call"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border/80 rounded-lg font-semibold hover:bg-surface/40 backdrop-blur-sm transition-colors duration-300 btn-glow-outline font-heading"
            >
              Schedule a Call
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
