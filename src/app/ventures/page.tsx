"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowUpRight, Check } from "lucide-react";
import {
  getSaaSProducts,
  getInnovationLab,
} from "@/content/ventures";

export default function VenturesPage() {
  const productsRef = useGsapReveal({
    duration: 0.8,
    delay: 0.1,
    stagger: 0.15,
  });

  const products = getSaaSProducts();
  const innovationLab = getInnovationLab();

  return (
    <div className="w-full bg-[#090B10] text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        title="Ventures"
        subtitle="Building the next generation of companies and products."
      />

      {/* SaaS Products Section */}
      <section className="border-b border-[#1F2733] py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Our Products"
            title="Enterprise solutions built for scale"
            description="Premium SaaS platforms designed to solve real business challenges."
          />

          <div
            ref={productsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <div
                key={product.id}
                data-reveal
                className="group relative border border-[#1F2733] rounded-lg p-8 hover:border-[#00C4AF]/50 transition-all bg-gradient-to-br from-[#1A1D24] to-[#0D0F14] hover:shadow-lg hover:shadow-[#00C4AF]/10 overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C4AF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-[#00C4AF] transition-colors font-[family-name:var(--font-sora)]">
                        {product.name}
                      </h3>
                      <p className="text-[#00C4AF] text-sm font-semibold font-[family-name:var(--font-sora)]">
                        {product.tagline}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-[#00C4AF]/10 text-[#00C4AF] text-xs font-semibold rounded-full capitalize font-[family-name:var(--font-sora)]">
                      {product.status === "active" && "Active"}
                      {product.status === "launched" && "Launched"}
                      {product.status === "coming-soon" && "Coming Soon"}
                      {product.status === "stealth" && "Stealth"}
                    </div>
                  </div>

                  <p className="text-[#8A9BB0] leading-relaxed mb-8 font-[family-name:var(--font-dm-sans)]">
                    {product.description}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className="mb-8 space-y-3">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-[#8A9BB0] font-[family-name:var(--font-dm-sans)]"
                        >
                          <Check className="w-4 h-4 mt-0.5 text-[#00C4AF] flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C4AF] text-[#111318] font-semibold rounded-lg hover:bg-[#00C4AF]/90 transition-colors font-[family-name:var(--font-sora)]"
                    >
                      {product.status === "active" || product.status === "launched"
                        ? "Visit Platform"
                        : "Learn More"}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Lab Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label={innovationLab.title}
            title="Where breakthrough ideas live"
            description={innovationLab.description}
            align="center"
          />

          {innovationLab.items && innovationLab.items.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {innovationLab.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 border border-[#1F2733] rounded-lg bg-[#1A1D24]"
                >
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-[#00C4AF]" />
                  </div>
                  <p className="text-[#8A9BB0] font-[family-name:var(--font-dm-sans)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#1F2733] py-16 px-6 md:px-12 lg:px-20 bg-[#1A1D24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-[family-name:var(--font-sora)]">
            Interested in our ventures?
          </h2>
          <p className="text-lg text-[#8A9BB0] mb-8 font-[family-name:var(--font-dm-sans)]">
            Let us know if you would like to explore partnership opportunities or learn more.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold hover:bg-[#00C4AF]/90 transition-colors rounded-lg font-[family-name:var(--font-sora)]"
          >
            Get in Touch
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
