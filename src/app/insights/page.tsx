"use client"

import { useState } from "react"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/pageHero"
import { SectionHeading } from "@/components/sectionHeading"
import { useGsapReveal } from "@/lib/gsapUtils"

const categories = [
  { id: "all", label: "All Insights" },
  { id: "articles", label: "Articles" },
  { id: "research", label: "Research & Reports" },
  { id: "thought-leadership", label: "Thought Leadership" },
]

const insights = [
  {
    id: 1,
    category: "articles",
    title: "The Future of Digital Transformation in Retail",
    excerpt:
      "Exploring how AI and automation are reshaping customer experiences and operational efficiency in modern retail.",
    date: "March 15, 2026",
    slug: "future-digital-transformation",
  },
  {
    id: 2,
    category: "research",
    title: "2026 Enterprise Technology Report",
    excerpt:
      "Comprehensive analysis of technology adoption trends, investment priorities, and challenges facing enterprises today.",
    date: "March 10, 2026",
    slug: "enterprise-tech-report",
  },
  {
    id: 3,
    category: "thought-leadership",
    title: "Building Resilient Organizations",
    excerpt:
      "How strategic foresight and adaptive planning create organizations that thrive in uncertainty.",
    date: "March 5, 2026",
    slug: "resilient-organizations",
  },
  {
    id: 4,
    category: "articles",
    title: "AI Strategy That Actually Works",
    excerpt:
      "Moving beyond hype: practical frameworks for implementing AI initiatives with measurable business impact.",
    date: "February 28, 2026",
    slug: "ai-strategy-framework",
  },
  {
    id: 5,
    category: "research",
    title: "Global Market Expansion Playbook",
    excerpt:
      "Data-driven strategies for entering new markets, tested across industries and geographies.",
    date: "February 20, 2026",
    slug: "market-expansion-playbook",
  },
  {
    id: 6,
    category: "thought-leadership",
    title: "Leadership in the AI Era",
    excerpt:
      "What effective leadership looks like when machines can process data faster than humans can think.",
    date: "February 12, 2026",
    slug: "leadership-ai-era",
  },
]

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useGsapReveal({ stagger: 0.08 })

  const filteredInsights =
    activeCategory === "all"
      ? insights
      : insights.filter((insight) => insight.category === activeCategory)

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero
        title="Insights"
        subtitle="Ideas That Shape Industries."
      />

      <div className="px-6 py-24 md:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Research & Thought Leadership"
            description="Stay ahead with our latest analysis, research, and strategic perspectives."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mt-12 mb-16 border-b border-white/10 pb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeCategory === cat.id
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/70 hover:border-white/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Insights Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredInsights.map((insight, index) => (
              <div
                key={insight.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="group p-6 rounded-lg border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/10 transition-all duration-500 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
                    {insight.category === "articles"
                      ? "Article"
                      : insight.category === "research"
                        ? "Research"
                        : "Thought Leadership"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3 group-hover:text-white/90 transition-colors line-clamp-2">
                  {insight.title}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed mb-4 flex-grow">
                  {insight.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xs text-white/50">{insight.date}</span>
                  <button className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                    <span>Read</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredInsights.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60">No insights found in this category.</p>
            </div>
          )}
        </div>
      </div>

      <section className="px-6 py-16 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Stay Updated
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive our latest insights, research, and strategic perspectives delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:outline-none transition-colors"
            />
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
