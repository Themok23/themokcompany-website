"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/ctaSection";
import {
  getInsights,
  getInsightsByCategory,
} from "@/content/insights";
import { useLocale } from "@/i18n/useLocale";

gsap.registerPlugin(ScrollTrigger);

type InsightCategory = "articles" | "research" | "thought-leadership";

export default function InsightsPage() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const articleCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory | "all">("all");

  const allInsights = getInsights(locale);
  const displayedInsights =
    selectedCategory === "all"
      ? allInsights
      : getInsightsByCategory(locale, selectedCategory as InsightCategory);

  const categories: { id: InsightCategory | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "articles", label: "Articles" },
    { id: "research", label: "Research & Reports" },
    { id: "thought-leadership", label: "Thought Leadership" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = [];

    const ctx = gsap.context(() => {
      // Article cards: scroll reveal + hover lift
      articleCardsRef.current.forEach((card, index) => {
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
  }, [displayedInsights]);

  return (
    <div ref={containerRef} className="w-full text-white min-h-screen overflow-x-hidden relative z-[1] font-body">
      {/* Page Hero */}
      <PageHero
        title="Insights"
        subtitle="Ideas That Shape Industries."
      />

      {/* Insights Section */}
      <section className="section-fade py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <SectionHeading 
              title="Industry perspectives"
              animateMode="gradient"
            />

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all font-heading ${
                    selectedCategory === cat.id
                      ? "bg-primary text-[#111318]"
                      : "border border-border text-muted hover:border-primary/50 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {displayedInsights.map((article, idx) => {
              const articleImages = ["analytics.jpg", "tech.jpg", "innovation.jpg", "strategy.jpg", "meeting.jpg", "collaboration.jpg"];
              const imageIndex = idx % articleImages.length;

              return (
                <div
                  key={article.id}
                  ref={(el) => { if (el) articleCardsRef.current[idx] = el; }}
                  className="group border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors bg-surface flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={`/images/${articleImages[imageIndex]}`}
                      alt={article.title}
                      fill
                      className="object-cover img-tint parallax-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1D24]" />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wide font-heading">
                        {article.category === "articles" && "Article"}
                        {article.category === "research" && "Research"}
                        {article.category === "thought-leadership" && "Thought Leadership"}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors flex-grow font-heading">
                      {article.title}
                    </h3>

                    <p className="text-muted leading-relaxed mb-6 font-body">
                      {article.excerpt}
                    </p>

                    <div className="pt-6 border-t border-border flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-muted font-body">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <a
                        href={`/insights/${article.slug}`}
                        className="text-primary hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {displayedInsights.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted text-lg font-body">
                No insights found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Stay ahead of industry trends"
        description="Subscribe to our insights to get the latest perspectives on digital transformation."
        buttonLabel="Get in Touch"
        buttonHref="/contact"
      />
    </div>
  );
}