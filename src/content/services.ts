import type { ServiceArm } from "./types";

const serviceArms: readonly ServiceArm[] = [
  {
    id: "management",
    slug: "management",
    title: "The Mok Management",
    tagline: "360 Management & Marketing Consultancy",
    description:
      "We deliver full-spectrum management and marketing consultancy. Strategy that moves markets.",
    services: [
      "Digital Transformation Strategy: End-to-end assessment, roadmapping, and phased implementation plans for enterprise-wide digital initiatives",
      "Business Process Optimization: Redesign core workflows for efficiency, cost reduction, and scalability without disrupting operations",
      "Market Entry Strategy: Go-to-market planning, competitive positioning, and market expansion for new geographies and segments",
      "Organizational Design: Structure, capability mapping, and talent alignment for transformation readiness",
      "Change Management: Leadership alignment, team enablement, and organizational adoption strategies that stick",
      "Executive Advisory: Board-level counsel on technology strategy, competitive threats, and market opportunities",
      "AI Strategy & Governance: Assess AI readiness, identify high-impact applications, establish governance frameworks for responsible AI deployment",
      "Operational Excellence: Design operating models that drive efficiency, quality, and scalability",
    ],
  },
  {
    id: "innovations",
    slug: "innovations",
    title: "The Mok Innovations",
    tagline: "Venture & Innovation Lab",
    description:
      "We create new ventures and innovation systems. Ideas engineered to lead.",
    services: [
      "AI Solution Development: Design, build, and deploy custom AI/ML solutions for enterprise-specific business problems",
      "Product Strategy & Roadmapping: Validate market opportunity, define feature priority, and build products customers pay for",
      "MVP to Market Launch: Rapid prototyping, user validation, go-to-market execution, and Series A readiness",
      "Enterprise AI Integration: Embed AI capabilities into existing platforms and workflows without disrupting operations",
      "Product-Market Fit Assessment: Validate demand, refine positioning, and optimize for sustainable growth",
      "Venture Development: End-to-end support from idea to funded venture, including business model design and investor readiness",
      "Innovation Lab Services: Explore emerging technologies, incubate experimental projects, and maintain competitive advantage",
      "Data Strategy & Monetization: Transform data assets into strategic advantages and revenue opportunities",
    ],
  },
  {
    id: "technologies",
    slug: "technologies",
    title: "The Mok Technologies",
    tagline: "Digital & Systems Execution",
    description:
      "We build the digital backbone. Technology that scales with you.",
    services: [
      "Web Application Development: React, Next.js, and modern frameworks delivering performant, maintainable web platforms at enterprise scale",
      "Mobile Development: Native and cross-platform applications for iOS and Android with offline-first capabilities",
      "Cloud Architecture & Design: AWS, GCP, and Azure strategies optimized for cost, performance, and business continuity",
      "API Development & Integration: RESTful and GraphQL APIs enabling seamless integration across enterprise systems",
      "Infrastructure & DevOps: CI/CD pipelines, container orchestration, monitoring, and incident response for always-on systems",
      "Legacy Modernization: Migrate monoliths to microservices, upgrade outdated tech stacks, and extend system lifespan",
      "Database Architecture: SQL and NoSQL design for consistency, performance, and scalability across high-volume operations",
      "Security & Compliance: Implement industry standards (ISO, SOC 2, HIPAA) and build security-first systems from day one",
    ],
  },
] as const;

export function getServiceArms(): readonly ServiceArm[] {
  return serviceArms;
}

export function getServiceArm(slug: string): ServiceArm | undefined {
  const arm = serviceArms.find((a) => a.slug === slug);
  return arm ? { ...arm } : undefined;
}
