"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowRight } from "lucide-react";
import {
  getPositions,
  getCareersCulture,
} from "@/content/careers";

export default function CareersPage() {
  const cultureRef = useGsapReveal({ duration: 0.8, delay: 0.1 });
  const positionsRef = useGsapReveal({
    duration: 0.8,
    delay: 0.2,
    stagger: 0.08,
  });

  const positions = getPositions();
  const culture = getCareersCulture();

  return (
    <div className="w-full bg-[#111318] text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        title="Careers"
        subtitle="Join the team building what is next."
      />

      {/* Culture Section */}
      <section className="border-b border-[#1F2733] py-24 px-6 md:px-12 lg:px-20">
        <div ref={cultureRef} className="max-w-6xl mx-auto">
          <SectionHeading
            label={culture.title}
            title="Our Culture"
            description={culture.description}
          />

          {culture.items && culture.items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {culture.items.map((item, idx) => (
                <div
                  key={idx}
                  data-reveal
                  className="flex items-start gap-4 p-6 border border-[#1F2733] rounded-lg bg-[#1A1D24] hover:border-[#00C4AF]/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00C4AF]/20 border border-[#00C4AF]/40 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-[#00C4AF] rounded-full" />
                  </div>
                  <p className="text-[#8A9BB0] leading-relaxed font-[family-name:var(--font-dm-sans)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Open Positions"
            title="Join our team"
            description="We are actively seeking talented individuals who are passionate about digital transformation and excellence."
          />

          <div
            ref={positionsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {positions.map((position) => (
              <div
                key={position.id}
                data-reveal
                className="group border border-[#1F2733] rounded-lg p-8 hover:border-[#00C4AF]/30 transition-colors bg-[#1A1D24]"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-[#00C4AF] transition-colors font-[family-name:var(--font-sora)]">
                    {position.title}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#00C4AF]/10 text-[#00C4AF] text-xs font-semibold rounded-full uppercase tracking-wide font-[family-name:var(--font-sora)]">
                      {position.department}
                    </span>
                    <span className="px-3 py-1 border border-[#1F2733] text-[#8A9BB0] text-xs font-semibold rounded-full uppercase tracking-wide font-[family-name:var(--font-sora)]">
                      {position.location}
                    </span>
                    <span className="px-3 py-1 border border-[#1F2733] text-[#8A9BB0] text-xs font-semibold rounded-full uppercase tracking-wide font-[family-name:var(--font-sora)]">
                      {position.type}
                    </span>
                  </div>
                </div>

                <p className="text-[#8A9BB0] leading-relaxed mb-6 font-[family-name:var(--font-dm-sans)]">
                  {position.description}
                </p>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#00C4AF] hover:text-white transition-colors font-semibold font-[family-name:var(--font-sora)]"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {positions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8A9BB0] text-lg font-[family-name:var(--font-dm-sans)]">
                No open positions at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#1F2733] py-16 px-6 md:px-12 lg:px-20 bg-[#1A1D24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-[family-name:var(--font-sora)]">
            Do not see your role? We are always looking.
          </h2>
          <p className="text-lg text-[#8A9BB0] mb-8 font-[family-name:var(--font-dm-sans)]">
            If you believe you can contribute to our mission, reach out and tell us why.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold hover:bg-[#00C4AF]/90 transition-colors rounded-lg font-[family-name:var(--font-sora)]"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
