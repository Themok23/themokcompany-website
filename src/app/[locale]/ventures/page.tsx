"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CTASection } from "@/components/ctaSection";
import {
  getSaaSProducts,
  getInnovationLab,
} from "@/content/ventures";
import { useLocale } from "@/i18n/useLocale";

gsap.registerPlugin(ScrollTrigger);

export default function VenturesPage() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const productCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innovationItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const products = getSaaSProducts(locale);
  const innovationLab = getInnovationLab(locale);

  useEffect(() => {
    if (!containerRef.current) return;

    const listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = [];

    const ctx = gsap.context(() => {
      // Product cards: scroll reveal + hover lift
      productCardsRef.current.forEach((card, index) => {
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

      // Innovation lab items: scroll reveal
      innovationItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none none" },
            }
          );
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
        title="Ventures"
        subtitle="Building the next generation of companies and products."
      />

      {/* SaaS Products Section */}
      <section className="section-fade border-b border-border py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Our Products"
            title="Enterprise solutions built for scale"
            description="Premium SaaS platforms designed to solve real business challenges."
            animateMode="gradient"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => {
              const productImages = ["tech.jpg", "innovation.jpg", "analytics.jpg", "strategy.jpg", "workspace.jpg"];
              const imageIndex = idx % productImages.length;

              return (
                <div
                  key={product.id}
                  ref={(el) => { if (el) productCardsRef.current[idx] = el; }}
                  className="group relative border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all bg-gradient-to-br from-[#1A1D24] to-[#0D0F14] hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={`/images/${productImages[imageIndex]}`}
                      alt={product.name}
                      fill
                      className="object-cover img-tint parallax-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1D24]" />
                  </div>

                  <div className="p-8">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      <div className="mb-6 flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors font-heading">
                            {product.name}
                          </h3>
                          <p className="text-primary text-sm font-semibold font-heading">
                            {product.tagline}
                          </p>
                        </div>
                        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize font-heading">
                          {product.status === "active" && "Active"}
                          {product.status === "launched" && "Launched"}
                          {product.status === "coming-soon" && "Coming Soon"}
                          {product.status === "stealth" && "Stealth"}
                        </div>
                      </div>

                      <p className="text-muted leading-relaxed mb-8 font-body">
                        {product.description}
                      </p>

                      {product.features && product.features.length > 0 && (
                        <div className="mb-8 space-y-3">
                          {product.features.slice(0, 4).map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 text-muted font-body"
                            >
                              <Check className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        {product.url && (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-[#111318] font-semibold rounded-lg hover:bg-primary/90 transition-colors btn-glow font-heading"
                          >
                            {product.status === "active" || product.status === "launched"
                              ? "Visit Platform"
                              : "Learn More"}
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/ventures/${product.slug}`}
                          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-semibold text-sm font-heading"
                        >
                          Details
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation Lab Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label={innovationLab.title}
            title="Where breakthrough ideas live"
            description={innovationLab.description}
            align="center"
            animateMode="gradient"
          />

          {innovationLab.items && innovationLab.items.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {innovationLab.items.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => { if (el) innovationItemsRef.current[idx] = el; }}
                  className="flex items-start gap-4 p-6 border border-border rounded-lg bg-surface/40 backdrop-blur-sm"
                >
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-muted font-body">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Interested in our ventures?"
        description="Let us know if you would like to explore partnership opportunities or learn more."
        buttonLabel="Get in Touch"
        buttonHref="/contact"
        arrow="up-right"
      />
    </div>
  );
}