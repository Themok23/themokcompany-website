"use client"

import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/pageHero"
import { SectionHeading } from "@/components/sectionHeading"
import { useGsapReveal } from "@/lib/gsapUtils"

const caseStudies = [
  {
    id: 1,
    category: "Brand Transformation",
    title: "Global Retail Expansion",
    description:
      "Complete brand repositioning and digital transformation for a major retail enterprise across 15 markets.",
    slug: "retail-expansion",
  },
  {
    id: 2,
    category: "Digital Platform",
    title: "Financial Services Platform",
    description:
      "Built a modern fintech platform handling millions in daily transactions with enterprise-grade security.",
    slug: "fintech-platform",
  },
  {
    id: 3,
    category: "Growth Strategy",
    title: "Market Entry Strategy",
    description:
      "Developed go-to-market strategy and implementation roadmap for entry into three new geographic markets.",
    slug: "market-entry",
  },
  {
    id: 4,
    category: "AI Integration",
    title: "Autonomous Operations",
    description:
      "Designed and deployed AI-driven automation system reducing operational costs by 40%.",
    slug: "ai-operations",
  },
]

export default function OurWorkPage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useGsapReveal({ stagger: 0.1 })

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero
        title="Our Work"
        subtitle="Strategy in Action."
      />

      <div className="px-6 py-24 md:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Featured Case Studies"
            description="Transforming businesses through strategy, design, and innovation."
          />

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
          >
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="group p-8 rounded-lg border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
                    {study.category}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold mb-4 group-hover:text-white/90 transition-colors">
                  {study.title}
                </h3>

                <p className="text-white/70 text-base leading-relaxed mb-8">
                  {study.description}
                </p>

                <div className="flex items-center gap-3 text-sm font-medium text-white/80 hover:text-white transition-colors">
                  <span>View Case Study</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="px-6 py-16 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Transform?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how MOK can help drive growth and innovation for your organization.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Start a Project
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  )
}
