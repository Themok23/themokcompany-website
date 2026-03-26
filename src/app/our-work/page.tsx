"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowUpRight } from "lucide-react";
import {
  getFeaturedCaseStudies,
  getCaseStudies,
  getFeaturedClients,
  getClientLogos,
} from "@/content/portfolio";

export default function OurWorkPage() {
  const caseStudiesRef = useGsapReveal({
    duration: 0.8,
    delay: 0.1,
    stagger: 0.1,
  });
  const clientsRef = useGsapReveal({
    duration: 0.8,
    delay: 0.2,
    stagger: 0.05,
  });

  const caseStudies = getCaseStudies();
  const clients = getClientLogos();

  return (
    <div className="w-full bg-[#111318] text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        title="Our Work"
        subtitle="Transforming ambitious enterprises through strategy, innovation, and technology."
      />

      {/* Case Studies Section */}
      <section className="border-b border-[#1F2733] py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Case Studies"
            title="Strategic outcomes that matter"
            description="A sample of how we deliver integrated solutions across enterprise clients."
          />

          <div
            ref={caseStudiesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {caseStudies.map((study) => (
              <div
                key={study.id}
                data-reveal
                className="group border border-[#1F2733] rounded-lg p-8 hover:border-[#00C4AF]/30 transition-colors bg-[#1A1D24]"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#00C4AF]/10 text-[#00C4AF] text-xs font-semibold rounded-full font-[family-name:var(--font-sora)]">
                      {study.category}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-[#8A9BB0] mb-2 font-[family-name:var(--font-dm-sans)]">
                    {study.client}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-[#00C4AF] transition-colors font-[family-name:var(--font-sora)]">
                    {study.title}
                  </h3>
                </div>

                <p className="text-[#8A9BB0] leading-relaxed mb-6 font-[family-name:var(--font-dm-sans)]">
                  {study.description}
                </p>

                <div className="pt-6 border-t border-[#1F2733]">
                  <a
                    href={`/work/${study.slug}`}
                    className="inline-flex items-center gap-2 text-[#00C4AF] hover:text-white transition-colors font-semibold font-[family-name:var(--font-sora)]"
                  >
                    View Case Study
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Clients We've Worked With"
            title="Trusted by enterprise leaders"
            description="We partner with organizations pursuing ambitious digital transformation across industries."
            align="center"
          />

          <div
            ref={clientsRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {clients.map((client) => {
              const isFeatured = client.featured;
              return (
                <div
                  key={client.id}
                  data-reveal
                  className={`relative group ${
                    isFeatured
                      ? "lg:col-span-1 md:col-span-1 border-[#00C4AF]/50"
                      : "border-[#1F2733]"
                  } border rounded-lg p-6 hover:border-[#00C4AF]/30 transition-colors flex flex-col items-center justify-center min-h-[200px] bg-[#1A1D24]`}
                >
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-[#00C4AF] transition-colors font-[family-name:var(--font-sora)]">
                      {client.name}
                    </h3>
                    <p className="text-xs text-[#8A9BB0] uppercase tracking-widest font-semibold font-[family-name:var(--font-dm-sans)]">
                      {client.industry}
                    </p>
                  </div>
                  {isFeatured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-[#00C4AF]/20 border border-[#00C4AF]/40 rounded text-[#00C4AF] text-xs font-semibold font-[family-name:var(--font-sora)]">
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
      <section className="border-t border-[#1F2733] py-16 px-6 md:px-12 lg:px-20 bg-[#1A1D24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-[family-name:var(--font-sora)]">
            Looking for a partner for your next transformation?
          </h2>
          <p className="text-lg text-[#8A9BB0] mb-8 font-[family-name:var(--font-dm-sans)]">
            Let us explore what MOK can do for your organization.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold hover:bg-[#00C4AF]/90 transition-colors rounded-lg font-[family-name:var(--font-sora)]"
          >
            Start the Conversation
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
