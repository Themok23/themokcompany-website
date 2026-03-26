"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowRight } from "lucide-react";
import { getServiceArms } from "@/content/services";

export default function WhatWeDoPage() {
  const serviceRefs = useGsapReveal({ duration: 0.8, delay: 0.1, stagger: 0.2 });
  const services = getServiceArms();

  return (
    <div className="w-full bg-[#111318] text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        title="What We Do"
        subtitle="Three integrated arms. One unified vision."
      />

      {/* Service Arms */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.slug}
          className="border-b border-[#1F2733] py-24 px-6 md:px-12 lg:px-20"
        >
          <div ref={serviceRefs} className="max-w-6xl mx-auto">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
                idx % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Content */}
              <div data-reveal className="flex flex-col justify-start">
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-widest text-[#8A9BB0] font-semibold mb-4 font-[family-name:var(--font-sora)]">
                    {service.title}
                  </h3>
                  <p className="text-[#00C4AF] text-lg font-semibold font-[family-name:var(--font-sora)]">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-lg text-[#8A9BB0] mb-10 leading-relaxed font-[family-name:var(--font-dm-sans)]">
                  {service.description}
                </p>

                <div className="space-y-4">
                  {service.services.map((svc, svcIdx) => (
                    <div key={svcIdx} className="flex items-start gap-3 group">
                      <ArrowRight className="w-5 h-5 mt-1 text-[#00C4AF] group-hover:text-white transition-colors flex-shrink-0" />
                      <span className="text-[#8A9BB0] group-hover:text-white transition-colors font-[family-name:var(--font-dm-sans)]">
                        {svc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual placeholder */}
              <div data-reveal className="hidden lg:flex items-center justify-center">
                <div className="relative w-full aspect-square bg-gradient-to-br from-[#1A1D24] to-[#0D0F14] rounded-xl border border-[#1F2733] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#1F2733] rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="text-[#8A9BB0] text-2xl font-light">
                        {service.title.split(" ").pop()?.charAt(0)}
                      </div>
                    </div>
                    <p className="text-sm text-[#8A9BB0] max-w-xs font-[family-name:var(--font-dm-sans)]">
                      {service.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Integration Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-[#1F2733]">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            label="Why Three Arms"
            title="Integrated from the ground up"
            description="Most consultancies specialize. We integrate. Your strategy informs your innovation. Your innovation drives your technology. Your technology enables your growth. No handoffs. No silos. One unified vision, executed end-to-end."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                label: "Aligned",
                description: "Strategy, innovation, and technology move together",
              },
              {
                label: "Integrated",
                description: "No disconnects between what we design and what we build",
              },
              {
                label: "Accountable",
                description: "We own outcomes across all three dimensions",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 border border-[#1F2733] rounded-lg hover:border-[#00C4AF]/30 transition-colors bg-[#1A1D24]"
              >
                <h4 className="font-semibold mb-2 text-white font-[family-name:var(--font-sora)]">
                  {item.label}
                </h4>
                <p className="text-sm text-[#8A9BB0] font-[family-name:var(--font-dm-sans)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#1A1D24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-[family-name:var(--font-sora)]">
            Ready to build something remarkable?
          </h2>
          <p className="text-lg text-[#8A9BB0] mb-8 font-[family-name:var(--font-dm-sans)]">
            Let us explore what is possible when strategy, innovation, and technology come together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold hover:bg-[#00C4AF]/90 transition-colors rounded-lg font-[family-name:var(--font-sora)]"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
