import type { CaseStudy, ClientLogo } from "./types";

const caseStudies: readonly CaseStudy[] = [
  {
    id: "raya-cx",
    slug: "raya-cx",
    client: "Raya CX",
    category: "Brand Transformation",
    title: "Redefining Customer Experience for a Leading BPO Provider",
    description:
      "Comprehensive digital transformation of customer experience operations for a major business process outsourcing firm.",
    challenge:
      "Legacy systems and fragmented processes were limiting service quality and operational efficiency.",
    approach:
      "Conducted full-scale digital audit, redesigned customer journey, and implemented integrated platform.",
    execution:
      "Phased rollout across three regions over six months with minimal service disruption.",
    impact:
      "40% improvement in customer satisfaction, 35% reduction in operational costs, 50% faster issue resolution.",
    featured: true,
  },
  {
    id: "turbo",
    slug: "turbo",
    client: "Turbo",
    category: "Digital Platform",
    title: "Building a Next-Gen Automotive Marketplace from the Ground Up",
    description:
      "Created a comprehensive digital marketplace platform connecting buyers, sellers, and service providers in the automotive industry.",
    challenge:
      "Automotive market lacked integrated digital platform for transparent transactions and services.",
    approach:
      "Designed end-to-end marketplace architecture, built mobile-first platform, integrated payment and logistics.",
    execution:
      "Launched MVP in 12 weeks, scaled to 50,000+ users within six months.",
    impact:
      "Captured 15% market share in launch region, 2M+ transactions in year one, expanded to three countries.",
    featured: true,
  },
  {
    id: "wiki-food",
    slug: "wiki-food",
    client: "Wiki Food",
    category: "Growth Strategy",
    title: "Scaling a Food-Tech Startup from Concept to Market",
    description:
      "Strategic and technical guidance for a food-tech startup pursuing aggressive market expansion.",
    challenge:
      "Founders had market insight but lacked execution roadmap, technology infrastructure, and operational processes.",
    approach:
      "Developed market entry strategy, built core technology platform, established operations framework.",
    execution:
      "Product launch within 16 weeks, scaled team from 3 to 25 people, established market presence.",
    impact:
      "Secured Series A funding, reached profitability in month 18, expanded to two additional cities.",
    featured: true,
  },
  {
    id: "al-nasser",
    slug: "al-nasser",
    client: "Al Nasser",
    category: "AI Integration",
    title: "Modernizing Retail Operations with Intelligent Automation",
    description:
      "Implemented AI-driven automation across retail operations for inventory, supply chain, and customer insights.",
    challenge:
      "Manual processes, inefficient inventory management, and lack of real-time customer insights.",
    approach:
      "Deployed predictive analytics, automated inventory management, implemented customer intelligence platform.",
    execution:
      "Phased implementation across 15 retail locations over eight months.",
    impact:
      "30% reduction in stockouts, 25% decrease in excess inventory, 40% improvement in personalization accuracy.",
    featured: true,
  },
] as const;

const clientLogos: readonly ClientLogo[] = [
  {
    id: "raya-cx",
    name: "Raya CX",
    industry: "Business Services",
    featured: true,
  },
  {
    id: "turbo",
    name: "Turbo",
    industry: "Automotive",
    featured: true,
  },
  {
    id: "wiki-food",
    name: "Wiki Food",
    industry: "Food Tech",
    featured: true,
  },
  {
    id: "al-nasser",
    name: "Al Nasser",
    industry: "Retail",
    featured: true,
  },
  {
    id: "taggz",
    name: "Taggz",
    industry: "Social Commerce",
    featured: false,
  },
  {
    id: "mok-trading",
    name: "MOK Trading",
    industry: "Finance",
    featured: false,
  },
  {
    id: "innovate-solutions",
    name: "Innovate Solutions",
    industry: "Consulting",
    featured: false,
  },
  {
    id: "future-tech",
    name: "Future Tech",
    industry: "Technology",
    featured: false,
  },
] as const;

export function getCaseStudies(): readonly CaseStudy[] {
  return caseStudies;
}

export function getFeaturedCaseStudies(): readonly CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  const study = caseStudies.find((cs) => cs.slug === slug);
  return study ? { ...study } : undefined;
}

export function getClientLogos(): readonly ClientLogo[] {
  return clientLogos;
}

export function getFeaturedClients(): readonly ClientLogo[] {
  return clientLogos.filter((cl) => cl.featured);
}
