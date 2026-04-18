"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import TextAnimate from "@/components/textAnimate";
import { CTASection } from "@/components/ctaSection";
import { ArrowRight } from "lucide-react";
import {
  getAboutHero,
  getOurStory,
  getPhilosophy,
  getApproach,
} from "@/content/about";
import { useLocale } from "@/i18n/useLocale";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const storyImageRef = useRef<HTMLDivElement>(null);
  const storyItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const philosophyCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const approachCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const hero = getAboutHero(locale);
  const story = getOurStory(locale);
  const philosophy = getPhilosophy(locale);
  const approach = getApproach(locale);

  useEffect(() => {
    if (!containerRef.current) return;

    const listeners: Array<{ element: HTMLElement; event: string; handler: EventListener }> = [];

    const ctx = gsap.context(() => {
      // ---- STORY ITEMS stagger from left ----
      storyItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, x: -30 },
            {
              opacity: 1, x: 0, duration: 0.6, delay: index * 0.12, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        }
      });

      // ---- STORY IMAGE parallax ----
      if (storyImageRef.current) {
        gsap.fromTo(
          storyImageRef.current,
          { yPercent: 10 },
          {
            yPercent: -10, ease: "none",
            scrollTrigger: { trigger: storyImageRef.current, start: "top bottom", end: "bottom top", scrub: 3 },
          }
        );
      }

      // ---- PHILOSOPHY CARDS scroll reveal + hover ----
      philosophyCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
            }
          );

          // Card hover lift
          const el = card as HTMLElement;
          const mouseenterHandler = () => gsap.to(el, { y: -8, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          const mouseleaveHandler = () => gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          el.addEventListener("mouseenter", mouseenterHandler);
          el.addEventListener("mouseleave", mouseleaveHandler);
          listeners.push({ element: el, event: "mouseenter", handler: mouseenterHandler });
          listeners.push({ element: el, event: "mouseleave", handler: mouseleaveHandler });
        }
      });

      // ---- PARALLAX on philosophy card images ----
      const parallaxImages = containerRef.current?.querySelectorAll(".parallax-image");
      if (parallaxImages) {
        parallaxImages.forEach((el) => {
          gsap.fromTo(el,
            { yPercent: 0 },
            { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 3 } }
          );
        });
      }

      // ---- APPROACH CARDS one at a time ----
      approachCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.92 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            }
          );

          // Hover lift
          const el = card as HTMLElement;
          const mouseenterHandler = () => gsap.to(el, { y: -8, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          const mouseleaveHandler = () => gsap.to(el, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          el.addEventListener("mouseenter", mouseenterHandler);
          el.addEventListener("mouseleave", mouseleaveHandler);
          listeners.push({ element: el, event: "mouseenter", handler: mouseenterHandler });
          listeners.push({ element: el, event: "mouseleave", handler: mouseleaveHandler });
        }
      });

      // ---- APPROACH watermark parallax ----
      const watermarks = containerRef.current?.querySelectorAll(".parallax-watermark");
      if (watermarks) {
        watermarks.forEach((el) => {
          gsap.fromTo(el,
            { y: 20 },
            { y: -15, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 3 } }
          );
        });
      }
    }, containerRef);

    return () => {
      listeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
      ctx.revert();
    };
  }, []);

  const philosophyImages = ["strategy.jpg", "innovation.jpg", "tech.jpg"];

  return (
    <div
      ref={containerRef}
      className="w-full text-white min-h-screen overflow-x-hidden relative z-[1] font-body"
    >
      <PageHero title={hero.title} subtitle={hero.subtitle} />

      {/* Our Story Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="Our Story" title={story.title} animateMode="words" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg text-muted mb-12 max-w-3xl leading-relaxed">
                {story.description}
              </p>

              {story.items && story.items.length > 0 && (
                <div className="space-y-4">
                  {story.items.map((item, idx) => (
                    <li
                      key={idx}
                      ref={(el) => { if (el) storyItemsRef.current[idx] = el; }}
                      className="flex items-start gap-3 text-lg text-white list-none pl-6 border-l-2 border-primary/60"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </div>
              )}
            </div>

            <div
              ref={storyImageRef}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-[#060810]/30 backdrop-blur-sm"
            >
              <Image
                src="/images/office.jpg"
                alt="The Mok Company office"
                width={600}
                height={400}
                className="w-full h-80 lg:h-96 object-cover img-tint hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060810]/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative gradient line */}
      <div className="max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Our Philosophy Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Our Philosophy"
            title="Principles that guide everything we do"
            animateMode="scramble"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { if (el) philosophyCardsRef.current[idx] = el; }}
                className="rounded-xl border-t-2 border-t-primary border border-border/60 bg-surface/60 backdrop-blur-sm overflow-hidden group hover:border-primary/60 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={`/images/${philosophyImages[idx % philosophyImages.length]}`}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover img-tint parallax-image group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </div>

                <div className="p-8 pt-4">
                  <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        {/* Decorative accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="How We Work"
            title="The Mok Approach"
            description="A deliberate process designed to move you from where you are to where you need to be."
            animateMode="gradient"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approach.map((phase, idx) => (
              <div
                key={idx}
                ref={(el) => { if (el) approachCardsRef.current[idx] = el; }}
                className="relative p-8 rounded-xl bg-surface/50 backdrop-blur-sm border border-border/60 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,196,175,0.1)] transition-all duration-300 group"
              >
                {/* Watermark number */}
                <div className="parallax-watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <span className="text-9xl font-bold text-primary font-heading">
                    {String(phase.step).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider font-heading">
                      Step {String(phase.step).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors duration-300">
                    {phase.title}
                  </h4>
                  <p className="text-muted leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to build your growth engine?"
        description="Let us know how MOK can help transform your business."
        buttonLabel="Start a Conversation"
        buttonHref="/contact"
      />
    </div>
  );
}
