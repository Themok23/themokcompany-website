"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowRight } from "lucide-react";
import {
  getAboutHero,
  getOurStory,
  getPhilosophy,
  getApproach,
} from "@/content/about";

export default function AboutPage() {
  const storyRef = useGsapReveal({ duration: 0.8, delay: 0.1 });
  const philosophyRef = useGsapReveal({ duration: 0.8, delay: 0.2, stagger: 0.1 });
  const approachRef = useGsapReveal({ duration: 0.8, delay: 0.3, stagger: 0.12 });

  const hero = getAboutHero();
  const story = getOurStory();
  const philosophy = getPhilosophy();
  const approach = getApproach();

  return (
    <div className="w-full bg-[#111318] text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero title={hero.title} subtitle={hero.subtitle} />

      {/* Our Story Section */}
      <section className="border-b border-[#1F2733] py-24 px-6 md:px-12 lg:px-20">
        <div ref={storyRef} className="max-w-4xl mx-auto">
          <SectionHeading label="Our Story" title={story.title} />

          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white font-[family-name:var(--font-sora)]">
              {story.description}
            </p>
            {story.items && story.items.length > 0 && (
              <div className="pt-8 border-t border-[#1F2733]">
                <ul className="space-y-4">
                  {story.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-lg text-[#8A9BB0] font-[family-name:var(--font-dm-sans)]">
                      <ArrowRight className="w-5 h-5 mt-0.5 text-[#00C4AF] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="border-b border-[#1F2733] py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="Our Philosophy" title="Principles that guide everything we do" />

          <div
            ref={philosophyRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {philosophy.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                className="p-8 border border-[#1F2733] rounded-lg hover:border-[#00C4AF]/30 transition-colors bg-[#1A1D24]"
              >
                <h3 className="text-xl font-semibold mb-4 text-white font-[family-name:var(--font-sora)]">
                  {item.title}
                </h3>
                <p className="text-[#8A9BB0] leading-relaxed font-[family-name:var(--font-dm-sans)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="How We Work"
            title="The Mok Approach"
            description="A deliberate process designed to move you from where you are to where you need to be."
          />

          <div
            ref={approachRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {approach.map((phase, idx) => (
              <div
                key={idx}
                data-reveal
                className="group"
              >
                <div className="mb-6">
                  <div className="text-6xl font-light text-[#1F2733] group-hover:text-[#00C4AF]/20 transition-colors font-[family-name:var(--font-sora)]">
                    {phase.step}
                  </div>
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-white font-[family-name:var(--font-sora)]">
                  {phase.title}
                </h4>
                <p className="text-[#8A9BB0] leading-relaxed font-[family-name:var(--font-dm-sans)]">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#1F2733] py-16 px-6 md:px-12 lg:px-20 bg-[#1A1D24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-[family-name:var(--font-sora)]">
            Ready to build your growth engine?
          </h2>
          <p className="text-lg text-[#8A9BB0] mb-8 font-[family-name:var(--font-dm-sans)]">
            Let us know how MOK can help transform your business.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold hover:bg-[#00C4AF]/90 transition-colors rounded-lg font-[family-name:var(--font-sora)]"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
