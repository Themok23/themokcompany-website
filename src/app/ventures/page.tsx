"use client"
import { useRef } from "react"

import { ArrowUpRight, Zap } from "lucide-react"
import { PageHero } from "@/components/pageHero"
import { SectionHeading } from "@/components/sectionHeading"
import { useGsapReveal } from "@/lib/gsapUtils"

const portfolio = [
  {
    id: 1,
    name: "StrategyOS",
    description:
      "AI-powered strategic planning platform helping enterprises navigate complex transformations.",
    status: "Active",
    slug: "strategyos",
  },
  {
    id: 2,
    name: "DataVault",
    description:
      "Enterprise data governance and intelligence platform with advanced privacy controls.",
    status: "Active",
    slug: "datavault",
  },
  {
    id: 3,
    name: "NextGen Consulting",
    description:
      "Digital-first consulting practice serving mid-market enterprises in transformation.",
    status: "Launched",
    slug: "nextgen-consulting",
  },
]

const statusColor = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Stealth: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Launched: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}

export default function VenturesPage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const portfolioRef = useGsapReveal({ stagger: 0.15 })

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero
        title="Ventures"
        subtitle="Building the next generation of companies and products."
      />

      <div className="px-6 py-24 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Portfolio Section */}
          <section className="mb-24">
            <SectionHeading
              title="Portfolio Companies"
              description="Strategic investments and ventures led by MOK's innovation team."
            />

            <div
              ref={portfolioRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              {portfolio.map((venture, index) => (
                <div
                  key={venture.id}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className="group p-8 rounded-lg border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 transition-all duration-500 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{venture.name}</h3>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                    {venture.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full border ${
                        statusColor[venture.status as keyof typeof statusColor]
                      }`}
                    >
                      {venture.status}
                    </span>
                    <ArrowUpRight size={16} className="text-white/60 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Innovation Lab Section */}
          <section className="border-t border-white/5 pt-24">
            <div className="max-w-3xl">
              <div className="flex items-start gap-4 mb-8">
                <Zap className="text-white/80 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="text-3xl font-semibold mb-6">
                    MOK Innovation Lab
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-6">
                    Our internal lab is where we test bold ideas, run rapid prototypes, and validate market opportunities before scaling. We combine strategic thinking with hands-on development to launch products and ventures that address real market gaps.
                  </p>
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    The lab operates on a modular approach: identify opportunity, design solution, run sprint, measure impact, scale or pivot. We're always looking for exceptional talent to join as core contributors or advisors.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-full hover:bg-white/20 hover:border-white/40 transition-all"
                  >
                    Get Involved
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="px-6 py-16 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Have an Idea?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            If you have a venture idea or want to collaborate on innovation, we'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Start a Conversation
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  )
}
