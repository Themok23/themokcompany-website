"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import TextAnimate from "@/components/textAnimate";
import { CTASection } from "@/components/ctaSection";
import { ArrowRight, Brain, Rocket, Cog } from "lucide-react";
import { getServiceArms } from "@/content/services";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const integrationCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const services = getServiceArms();
  const icons = [Brain, Rocket, Cog];
  const serviceImages = ["strategy.jpg", "innovation.jpg", "tech.jpg"];

  useEffect(() => {
    if (!containerRef.current) return;

    const listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = [];

    const ctx = gsap.context(() => {
      // ---- SERVICE SECTIONS scroll reveal ----
      serviceCardsRef.current.forEach((card) => {
        if (card) {
          // Content side
          const content = card.querySelector(".service-content");
          if (content) {
            gsap.fromTo(content,
              { opacity: 0, x: -40 },
              {
                opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 75%", toggleActions: "play none none none" },
              }
            );
          }

          // Image side - parallax
          const img = card.querySelector(".service-image");
          if (img) {
            gsap.fromTo(img,
              { opacity: 0, scale: 0.9 },
              {
                opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 75%", toggleActions: "play none none none" },
              }
            );
          }

          // Service items stagger
          const items = card.querySelectorAll(".service-item");
          items.forEach((item, i) => {
            gsap.fromTo(item,
              { opacity: 0, x: -20 },
              {
                opacity: 1, x: 0, duration: 0.5, delay: 0.3 + i * 0.08, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 70%", toggleActions: "play none none none" },
              }
            );
          });
        }
      });

      // ---- PARALLAX on service images ----
      const parallaxImages = containerRef.current?.querySelectorAll(".parallax-image");
      if (parallaxImages) {
        parallaxImages.forEach((el) => {
          gsap.fromTo(el,
            { yPercent: 0 },
            { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 3 } }
          );
        });
      }

      // ---- INTEGRATION CARDS ----
      integrationCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.92 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.15, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            }
          );

          const el = card as HTMLElement;
          const mouseenterHandler = () => gsap.to(el, { y: -8, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          const mouseleaveHandler = () => gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          el.addEventListener("mouseenter", mouseenterHandler);
          el.addEventListener("mouseleave", mouseleaveHandler);
          listeners.push({ element: el, event: "mouseenter", handler: mouseenterHandler });
          listeners.push({ element: el, event: "mouseleave", handler: mouseleaveHandler });
        }
      });
    }, containerRef);

    return () => {
      listeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full text-white min-h-screen overflow-x-hidden relative z-[1] font-body"
    >
      <PageHero
        title="What We Do"
        subtitle="Three integrated arms. One unified vision."
      />

      {/* Service Arms */}
      {services.map((service, idx) => {
        const Icon = icons[idx % icons.length];

        return (
          <section
            key={service.id}
            id={service.slug}
            className="relative py-32 px-4 sm:px-6 lg:px-8 border-b border-border/40"
          >
            <div className="max-w-6xl mx-auto">
              <div
                ref={(el) => { if (el) serviceCardsRef.current[idx] = el; }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  idx % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Content */}
                <div className="service-content lg:[direction:ltr]">
                  <div className="mb-8">
                    <Icon size={36} className="text-primary mb-4" />
                    <h3 className="text-xs uppercase tracking-widest text-muted font-semibold mb-2 font-heading">
                      {service.title}
                    </h3>
                    <p className="text-primary text-lg font-semibold font-heading">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-lg text-muted mb-10 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    {service.services.map((svc, svcIdx) => (
                      <div key={svcIdx} className="service-item flex items-start gap-3 group">
                        <ArrowRight className="w-5 h-5 mt-1 text-primary group-hover:text-white transition-colors flex-shrink-0" />
                        <span className="text-muted group-hover:text-white transition-colors">
                          {svc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Image */}
                <div className="service-image lg:[direction:ltr]">
                  <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-[#060810]/30 backdrop-blur-sm">
                    <Image
                      src={`/images/${serviceImages[idx % serviceImages.length]}`}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="w-full h-80 lg:h-96 object-cover img-tint parallax-image hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060810]/60 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Integration Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Why Three Arms"
            title="Integrated from the ground up"
            description="Most consultancies specialize. We integrate. Your strategy informs your innovation. Your innovation drives your technology. Your technology enables your growth."
            align="center"
            animateMode="wave"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {[
              { label: "Aligned", description: "Strategy, innovation, and technology move together" },
              { label: "Integrated", description: "No disconnects between what we design and what we build" },
              { label: "Accountable", description: "We own outcomes across all three dimensions" },
            ].map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { if (el) integrationCardsRef.current[idx] = el; }}
                className="relative p-8 rounded-xl bg-surface/50 backdrop-blur-sm border border-border/60 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,196,175,0.1)] transition-all duration-300 group"
              >
                <div className="parallax-watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <span className="text-8xl font-bold text-primary font-heading">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors duration-300">
                    {item.label}
                  </h4>
                  <p className="text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to build something remarkable?"
        description="Let us explore what is possible when strategy, innovation, and technology come together."
        buttonLabel="Get Started"
        buttonHref="/contact"
      />
    </div>
  );
}
