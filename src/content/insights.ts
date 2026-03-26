import type { InsightArticle } from "./types";

const insights: readonly InsightArticle[] = [
  {
    id: "ai-transformation",
    slug: "ai-transformation-enterprise",
    title: "AI Transformation in Enterprise: From Concept to Value",
    excerpt:
      "A practical guide to implementing AI solutions in enterprise organizations, covering strategy, technology, and change management.",
    category: "articles",
    date: "2024-12-15",
    readTime: "8 min",
    featured: true,
  },
  {
    id: "digital-readiness",
    slug: "digital-readiness-assessment",
    title: "Assessing Your Organization's Digital Readiness",
    excerpt:
      "Learn how to evaluate your organization's capability for digital transformation and identify key areas for improvement.",
    category: "research",
    date: "2024-12-01",
    readTime: "10 min",
    featured: true,
  },
  {
    id: "retail-future",
    slug: "future-of-retail-technology",
    title: "The Future of Retail: Technology Trends Reshaping the Industry",
    excerpt:
      "Explore emerging technologies and strategies transforming retail operations and customer experiences.",
    category: "thought-leadership",
    date: "2024-11-20",
    readTime: "7 min",
    featured: false,
  },
  {
    id: "cloud-strategy",
    slug: "cloud-migration-strategy",
    title: "Cloud Migration Strategy for Enterprise Systems",
    excerpt:
      "Comprehensive guide to planning and executing cloud migration for complex enterprise environments.",
    category: "articles",
    date: "2024-11-10",
    readTime: "12 min",
    featured: false,
  },
  {
    id: "automation-roi",
    slug: "measuring-automation-roi",
    title: "Measuring ROI from Business Process Automation",
    excerpt:
      "Framework for calculating real-world return on investment from automation initiatives.",
    category: "research",
    date: "2024-10-25",
    readTime: "9 min",
    featured: false,
  },
  {
    id: "product-strategy",
    slug: "product-strategy-framework",
    title: "Building Market-Winning Product Strategy",
    excerpt:
      "Essential frameworks and methodologies for developing products that resonate with enterprise customers.",
    category: "thought-leadership",
    date: "2024-10-15",
    readTime: "11 min",
    featured: false,
  },
] as const;

export function getInsights(): readonly InsightArticle[] {
  return insights;
}

export function getInsightsByCategory(
  category: InsightArticle["category"]
): readonly InsightArticle[] {
  return insights.filter((i) => i.category === category);
}

export function getFeaturedInsights(): readonly InsightArticle[] {
  return insights.filter((i) => i.featured);
}
