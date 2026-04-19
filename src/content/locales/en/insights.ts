import type { InsightArticle } from "../../types";

export const insights: readonly InsightArticle[] = [
  {
    id: "transformations-fail",
    slug: "why-digital-transformations-fail",
    title: "Why 90% of Digital Transformations Fail (And How to Be in the 10%)",
    excerpt:
      "Most digital transformations collapse not from technical challenges but from strategy-execution misalignment. We analyzed 50+ enterprise transformations and identified the critical factors that separate winners from failures.",
    category: "thought-leadership",
    date: "2024-12-18",
    readTime: "11 min",
    featured: true,
  },
  {
    id: "ai-strategy-wrong",
    slug: "the-ai-strategy-companies-get-wrong",
    title: "The AI Strategy Most Companies Get Wrong",
    excerpt:
      "Enterprise leaders chase AI hype while missing the real opportunity. This article breaks down what actually moves the needle: starting with problems, not algorithms.",
    category: "thought-leadership",
    date: "2024-12-10",
    readTime: "9 min",
    featured: true,
  },
  {
    id: "consultant-builder",
    slug: "from-consultant-to-builder-philosophy",
    title: "From Consultant to Builder: The MOK Philosophy",
    excerpt:
      "Strategy documents have killed more potential value than bad code ever will. Why we stopped pure consulting and started building alongside our clients.",
    category: "articles",
    date: "2024-12-05",
    readTime: "10 min",
    featured: true,
  },
  {
    id: "enterprise-ai-implementation",
    slug: "implementing-enterprise-ai-practical-guide",
    title: "Enterprise AI Implementation: A Practical Playbook",
    excerpt:
      "Beyond POC models and pilot programs. The complete guide to AI integration that drives measurable business outcomes without ripping and replacing existing systems.",
    category: "articles",
    date: "2024-11-28",
    readTime: "13 min",
    featured: true,
  },
  {
    id: "digital-readiness",
    slug: "digital-readiness-assessment",
    title: "The Digital Readiness Assessment That Actually Matters",
    excerpt:
      "Skip the generic maturity models. We built a framework that identifies exactly what your organization needs to transform, and in what sequence.",
    category: "research",
    date: "2024-11-15",
    readTime: "12 min",
    featured: false,
  },
  {
    id: "retail-transformation",
    slug: "retail-technology-transformation-2025",
    title: "Retail in 2025: Technology, Data, and the Future of Commerce",
    excerpt:
      "Retail is no longer a product business or a service business. It's a data and experience business. How leaders are capturing that shift, and why laggards will disappear.",
    category: "thought-leadership",
    date: "2024-11-08",
    readTime: "11 min",
    featured: false,
  },
  {
    id: "cloud-without-chaos",
    slug: "cloud-migration-without-chaos",
    title: "Cloud Migration Without Chaos: Migration Architecture That Works",
    excerpt:
      "The difference between successful cloud migrations and expensive disasters is architectural rigor. Here's the framework that delivers both speed and stability.",
    category: "articles",
    date: "2024-10-30",
    readTime: "14 min",
    featured: false,
  },
  {
    id: "product-market-fit",
    slug: "finding-product-market-fit-enterprise",
    title: "Finding Product-Market Fit in Enterprise Markets",
    excerpt:
      "Enterprise sales cycles are long and buyer behavior is different. This playbook explains how to validate market demand and build products enterprises actually buy.",
    category: "research",
    date: "2024-10-18",
    readTime: "10 min",
    featured: false,
  },
] as const;
