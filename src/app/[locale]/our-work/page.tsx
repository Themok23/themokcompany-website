"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/ctaSection";
import {
  getFeaturedCaseStudies,
  getCaseStudies,
  getFeaturedClients,
  getClientLogos,
} from "@/content/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function OurWorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const caseStudyCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const clientCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const caseStudies = getCaseStudies();
  const clients = getClientLogos();

  useEffect(() => {
    if (!containerRef.current) return;

    const listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = [];

    const ctx = gsap.context(() => {
      // Case study cards: scroll reveal + hover lift + parallax images
      caseStudyCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
            }
          );

          // Hover lift
          const el = card as HTMLElement;
          const enter = () => gsap.to(el, { y: -8, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          const leave = () => gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
          listeners.push({ element: el, event: "mouseenter", handler: enter });
          listeners.push({ element: el, event: "mouseleave", handler: leave });
        }
      });

      // Client cards: scroll reveal + hover lift
      clientCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
            }
          );

          // Hover lift
          const el = card as HTMLElement;
          const enter = () => gsap.to(el, { y: -8, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          const leave = () => gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
          listeners.push({ element: el, event: "mouseenter", handler: enter });
          listeners.push({ element: el, event: "mouseleave", handler: leave });
        }
      });

      // Parallax images
      const parallaxImages = containerRef.current?.querySelectorAll(".parallax-image");
      if (parallaxImages) {
        parallaxImages.forEach((el) => {
          gsap.fromTo(el,
            { yPercent: 0 },
            { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 3 } }
          );
        });
      }
    }, containerRef);

    return () => {
      listeners.forEach(({ element, event, handler }) => element.removeEventListener(event, handler));
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full text-white min-h-screen overflow-x-hidden relative z-[1] font-body">
      {/* Page Hero */}
      <PageHero
        title="Our Work"
        subtitle="Strategy in Action."
      />

      {/* Case Studies Section */}
      <section className="section-fade border-b border-border py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Case Studies"
            title="Strategic outcomes that matter"
            description="A sample of how we deliver integrated solutions across enterprise clients."
            animateMode="scramble"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {caseStudies.map((study, idx) => {
              const caseImages = ["collaboration.jpg", "meeting.jpg", "teamwork.jpg", "workspace.jpg", "analytics.jpg", "consulting.jpg"];
              const imageIndex = idx % caseImages.length;

              return (
                <div
                  key={study.id}
                  ref={(el) => { if (el) caseStudyCardsRef.current[idx] = el; }}
                  className="group border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors bg-surface/60 backdrop-blur-sm"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`/images/${caseImages[imageIndex]}`}
                      alt={study.title}
                      fill
                      className="object-cover img-tint parallax-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1D24]" />
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full font-heading">
                          {study.category}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted mb-2 font-body">
                        {study.client}
                      </p>
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors font-heading">
                        {study.title}
                      </h3>
                    </div>

                    <p className="text-muted leading-relaxed mb-6 font-body">
                      {study.description}
                    </p>

                    <div className="pt-6 border-t border-border">
                      <a
                        href={`/our-work/${study.slug}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-semibold font-heading"
                      >
                        View Case Study
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Clients We've Worked With"
            title="Trusted by enterprise leaders"
            description="We partner with organizations pursuing ambitious digital transformation across industries."
            align="center"
            animateMode="wave"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, idx) => {
              const isFeatured = client.featured;
              return (
                <div
                  key={client.id}
                  ref={(el) => { if (el) clientCardsRef.current[idx] = el; }}
                  className={`relative group ${
                    isFeatured
                      ? "lg:col-span-1 md:col-span-1 border-primary/50"
                      : "border-border"
                  } border rounded-lg p-6 hover:border-primary/30 transition-colors flex flex-col items-center justify-center min-h-[200px] bg-surface`}
                >
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors font-heading">
                      {client.name}
                    </h3>
                    <p className="text-xs text-muted uppercase tracking-widest font-semibold font-body">
                      {client.industry}
                    </p>
                  </div>
                  {isFeatured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-primary/20 border border-primary/40 rounded text-primary text-xs font-semibold font-heading">
                      Featured
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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