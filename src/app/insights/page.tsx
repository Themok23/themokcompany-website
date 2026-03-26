"use client";

import { useState, useRef } from "react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { PageHero } from "@/components/pageHero";
import { SectionHeading } from "@/components/sectionHeading";
import { ArrowUpRight } from "lucide-react";
import {
  getInsights,
  getInsightsByCategory,
} from "@/content/insights";

type InsightCategory = "articles" | "research" | "thought-leadership";

export default function InsightsPage() {
  const articlesRef = useGsapReveal({
    duration: 0.8,
    delay: 0.1,
    stagger: 0.08,
  });

  const [selectedCategory, setSelectedCategory] = useState<InsightCategory | "all">("all");

  const allInsights = getInsights();
  const displayedInsights =
    selectedCategory === "all"
      ? allInsights
      : getInsightsByCategory(selectedCategory as InsightCategory);

  const categories: { id: InsightCategory | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "articles", label: "Articles" },
    { id: "research", label: "Research & Reports" },
    { id: "thought-leadership", label: "Thought Leadership" },
  ];

  return (
    <div className="w-full bg-[#090B10] text-white min-h-screen overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        title="Insights"
        subtitle="Ideas that shape industries."
      />

      {/* Insights Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <SectionHeading title="Industry perspectives" />

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all font-[family-name:var(--font-sora)] ${
                    selectedCategory === cat.id
                      ? "bg-[#00C4AF] text-[#111318]"
                      : "border border-[#1F2733] text-[#8A9BB0] hover:border-[#00C4AF]/50 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div
            ref={articlesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {displayedInsights.map((article) => (
              <div
                key={article.id}
                data-reveal
                className="group border border-[#1F2733] rounded-lg p-8 hover:border-[#00C4AF]/30 transition-colors bg-[#1A1D24] flex flex-col"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#00C4AF]/10 text-[#00C4AF] text-xs font-semibold rounded-full uppercase tracking-wide font-[family-name:var(--font-sora)]">
                    {article.category === "articles" && "Article"}
                    {article.category === "research" && "Research"}
                    {article.category === "thought-leadership" && "Thought Leadership"}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-[#00C4AF] transition-colors flex-grow font-[family-name:var(--font-sora)]">
                  {article.title}
                </h3>

                <p className="text-[#8A9BB0] leading-relaxed mb-6 font-[family-name:var(--font-dm-sans)]">
                  {article.excerpt}
                </p>

                <div className="pt-6 border-t border-[#1F2733] flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-[#8A9BB0] font-[family-name:var(--font-dm-sans)]">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <a
                    href={`/insights/${article.slug}`}
                    className="text-[#00C4AF] hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {displayedInsights.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8A9BB0] text-lg font-[family-name:var(--font-dm-sans)]">
                No insights found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#1F2733] py-16 px-6 md:px-12 lg:px-20 bg-[#1A1D24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-[family-name:var(--font-sora)]">
            Stay ahead of industry trends
          </h2>
          <p className="text-lg text-[#8A9BB0] mb-8 font-[family-name:var(--font-dm-sans)]">
            Subscribe to our insights to get the latest perspectives on digital transformation.
          </p>
        </div>
      </section>
    </div>
  );
}
