"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { CTASection } from "@/components/ctaSection";
import { ArrowRight } from "lucide-react";
import {
  getPositions,
  getCareersCulture,
} from "@/content/careers";
import { useLocale } from "@/i18n/useLocale";

gsap.registerPlugin(ScrollTrigger);

export default function CareersPage() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const cultureItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const positionCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const positions = getPositions(locale);
  const culture = getCareersCulture(locale);

  useEffect(() => {
    if (!containerRef.current) return;

    const listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = [];

    const ctx = gsap.context(() => {
      // Culture items: staggered scroll reveal
      cultureItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, y: 30, x: -20 },
            {
              opacity: 1, y: 0, x: 0, duration: 0.6, delay: index * 0.12, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        }
      });

      // Position cards: scroll reveal + hover lift
      positionCardsRef.current.forEach((card, index) => {
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
        title="Careers"
        subtitle="Join the team building what is next."
      />

      {/* Culture Section */}
      <section className="section-fade border-b border-border py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <Image
            src="/images/team.jpg"
            alt="Team culture at MOK"
            fill
            className="object-cover img-tint opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060810] via-transparent to-[#060810]" />
        </div>
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label={culture.title}
            title="Our Culture"
            description={culture.description}
            animateMode="words"
          />

          {culture.items && culture.items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {culture.items.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => { if (el) cultureItemsRef.current[idx] = el; }}
                  className="flex items-start gap-4 p-6 bg-surface/60 backdrop-blur-sm border border-border/60 rounded-xl hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-muted leading-relaxed font-body">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Open Positions"
            title="Join our team"
            description="We are actively seeking talented individuals who are passionate about digital transformation and excellence."
            animateMode="gradient"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {positions.map((position, idx) => (
              <div
                key={position.id}
                ref={(el) => { if (el) positionCardsRef.current[idx] = el; }}
                className="group bg-surface/60 backdrop-blur-sm border border-border/60 rounded-xl p-8 hover:border-primary/30 transition-colors"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-primary transition-colors font-heading">
                    {position.title}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wide font-heading">
                      {position.department}
                    </span>
                    <span className="px-3 py-1 border border-border text-muted text-xs font-semibold rounded-full uppercase tracking-wide font-heading">
                      {position.location}
                    </span>
                    <span className="px-3 py-1 border border-border text-muted text-xs font-semibold rounded-full uppercase tracking-wide font-heading">
                      {position.type}
                    </span>
                  </div>
                </div>

                <p className="text-muted leading-relaxed mb-6 font-body">
                  {position.description}
                </p>

                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-semibold font-heading"
                >
                  {locale === "ar" ? "قدّم الآن" : "Apply Now"}
                  <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
                </a>
              </div>
            ))}
          </div>

          {positions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted text-lg font-body">
                No open positions at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Do not see your role? We are always looking."
        description="If you believe you can contribute to our mission, reach out and tell us why."
        buttonLabel="Get in Touch"
        buttonHref="/contact"
      />
    </div>
  );
}