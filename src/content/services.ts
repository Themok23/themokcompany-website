import type { ServiceArm } from "./types";

const serviceArms: readonly ServiceArm[] = [
  {
    id: "management",
    slug: "management",
    title: "The Mok Management",
    tagline: "Strategy and Executive Consulting",
    description:
      "Transform your organization through strategic guidance and executive consulting. We help enterprise leaders navigate digital transformation, optimize operations, and unlock new growth opportunities.",
    services: [
      "Digital Transformation Strategy",
      "Business Process Optimization",
      "Market Entry and Expansion",
      "Organizational Restructuring",
      "Change Management",
      "Executive Advisory",
    ],
  },
  {
    id: "innovations",
    slug: "innovations",
    title: "The Mok Innovations",
    tagline: "AI and Product Development",
    description:
      "Harness AI and emerging technologies to create innovative products and solutions. From concept to market launch, we build cutting-edge platforms that drive competitive advantage.",
    services: [
      "AI and Machine Learning Solutions",
      "Product Strategy and Design",
      "MVP Development",
      "Market-Ready Product Launch",
      "AI Integration",
      "Innovation Lab Services",
    ],
  },
  {
    id: "technologies",
    slug: "technologies",
    title: "The Mok Technologies",
    tagline: "Web, App, and Infrastructure",
    description:
      "Build reliable, scalable, and modern applications. We deliver web platforms, mobile applications, and cloud infrastructure engineered for enterprise performance.",
    services: [
      "Web Application Development",
      "Mobile App Development",
      "Cloud Architecture",
      "Infrastructure and DevOps",
      "API Development",
      "Legacy System Modernization",
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
