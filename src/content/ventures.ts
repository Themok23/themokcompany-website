import type { Venture, HomeSection } from "./types";

const saasProducts: readonly Venture[] = [
  {
    id: "mokbot",
    slug: "mokbot",
    name: "MokBot",
    tagline: "AI-Powered Business Assistant",
    description:
      "Intelligent automation platform designed to streamline business operations, enhance productivity, and reduce operational overhead through AI-driven insights and automated workflows.",
    status: "active",
    type: "saas",
    features: [
      "Natural language processing for business queries",
      "Workflow automation across enterprise systems",
      "Real-time analytics and reporting",
      "Team collaboration tools",
      "Integration with existing business platforms",
    ],
    url: "https://mokbot.ai",
  },
  {
    id: "mokerp",
    slug: "mokerp",
    name: "MokERP",
    tagline: "Enterprise Resource Planning",
    description:
      "Streamlined ERP solution built for growing companies seeking integrated operations management, inventory control, financial management, and supply chain visibility.",
    status: "launched",
    type: "saas",
    features: [
      "Integrated financial management",
      "Inventory and supply chain tracking",
      "Real-time operational dashboards",
      "Multi-entity support",
      "Cloud-based scalability",
    ],
    url: "https://mokerp.io",
  },
  {
    id: "taggz",
    slug: "taggz",
    name: "Taggz",
    tagline: "Social Commerce Platform",
    description:
      "Next-generation social shopping experience that bridges social media engagement with frictionless commerce, enabling brands to monetize social content and communities.",
    status: "active",
    type: "saas",
    features: [
      "Social media integration",
      "Shoppable content creation",
      "Community engagement tools",
      "Analytics and insights",
      "Multi-currency support",
    ],
    url: "https://taggz.com",
  },
] as const;

const innovationLab: HomeSection = {
  id: "innovation-lab",
  title: "The Mok Innovation Lab",
  description:
    "Our research and development arm exploring emerging technologies and building next-generation products. We invest in experimental projects that push the boundaries of what's possible.",
  items: [
    "Advanced AI and machine learning research",
    "Emerging technology exploration",
    "Product incubation and validation",
    "Open-source contributions",
    "Industry thought leadership",
  ],
};

export function getVentures(): readonly Venture[] {
  return saasProducts;
}

export function getSaaSProducts(): readonly Venture[] {
  return saasProducts.filter((v) => v.type === "saas");
}

export function getVenture(slug: string): Venture | undefined {
  const venture = saasProducts.find((v) => v.slug === slug);
  return venture ? { ...venture } : undefined;
}

export function getInnovationLab(): HomeSection {
  return { ...innovationLab };
}
