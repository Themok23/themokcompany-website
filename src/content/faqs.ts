import type { FAQ } from "./types";

const faqs: readonly FAQ[] = [
  {
    id: "services-what",
    question: "What services does The Mok Company offer?",
    answer:
      "We offer three integrated service lines: The Mok Management (strategy and consulting), The Mok Innovations (AI and product development), and The Mok Technologies (web, app, and infrastructure). Together these arms deliver comprehensive digital transformation solutions.",
    category: "services",
  },
  {
    id: "services-industry",
    question: "Which industries do you specialize in?",
    answer:
      "We have deep expertise in retail, finance, and automotive sectors, though our methodologies apply across industries. We work with any organization pursuing digital transformation and willing to partner for meaningful impact.",
    category: "industries",
  },
  {
    id: "pricing-model",
    question: "How do you structure pricing?",
    answer:
      "Pricing varies by engagement type and scope. We offer fixed-price projects for defined deliverables, time-and-materials arrangements for exploratory work, and retainer agreements for ongoing advisory. Contact us to discuss what works best for your needs.",
    category: "pricing",
  },
  {
    id: "timeline-typical",
    question: "How long does a typical engagement take?",
    answer:
      "Timeline depends on scope. Strategy engagements range from 2-4 months. Product development typically spans 6-12 months depending on complexity. We establish clear timelines upfront and manage to them rigorously.",
    category: "timeline",
  },
  {
    id: "process-approach",
    question: "What's your engagement process?",
    answer:
      "We begin by understanding your context, business objectives, and success criteria. From there, we design integrated solutions across strategy, product, and technology. We execute with rigor, transfer knowledge to your team, and measure outcomes against agreed KPIs.",
    category: "process",
  },
  {
    id: "tech-stack",
    question: "What technologies do you work with?",
    answer:
      "We're technology-agnostic and choose tools based on project requirements. Our teams have expertise across modern web frameworks (Next.js, React), cloud platforms (AWS, GCP, Azure), databases, and AI/ML frameworks. We build what makes sense for your use case.",
    category: "technology",
  },
  {
    id: "getting-started",
    question: "How do I get started?",
    answer:
      "Visit our contact page or email hello@themok.company with a brief overview of what you're working on. We'll schedule a discovery call to understand your situation and discuss how MOK can help.",
    category: "getting-started",
  },
  {
    id: "partnership-requirements",
    question: "What do you look for in partnerships?",
    answer:
      "We seek organizations with clear strategic objectives, readiness to invest in transformation, and willingness to collaborate deeply. You don't need to have all the answers, but you should be committed to achieving meaningful impact.",
    category: "partnerships",
  },
] as const;

export function getFAQs(): readonly FAQ[] {
  return faqs;
}

export function getFAQsByCategory(category: string): readonly FAQ[] {
  return faqs.filter((faq) => faq.category === category);
}
