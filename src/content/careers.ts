import type { Position, HomeSection } from "./types";

const positions: readonly Position[] = [
  {
    id: "senior-full-stack",
    title: "Senior Full Stack Engineer",
    department: "Technologies",
    location: "Dubai",
    type: "Full-time",
    description:
      "Lead full-stack development on enterprise products. We seek experienced engineers passionate about scalable systems, clean code, and mentoring junior team members.",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    department: "Innovations",
    location: "Dubai",
    type: "Full-time",
    description:
      "Own product strategy and roadmap for our SaaS portfolio. Join a team focused on building products that solve real enterprise problems.",
  },
  {
    id: "design-lead",
    title: "Design Lead",
    department: "Innovations",
    location: "Dubai",
    type: "Full-time",
    description:
      "Shape user experience across our digital products. Lead design strategy, mentor designers, and collaborate with product and engineering teams.",
  },
  {
    id: "consultant",
    title: "Business Consultant",
    department: "Management",
    location: "Dubai",
    type: "Full-time",
    description:
      "Partner with enterprise clients on transformation initiatives. Develop strategies, lead engagements, and deliver strategic impact.",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    department: "Technologies",
    location: "Dubai",
    type: "Full-time",
    description:
      "Build data infrastructure and pipelines for enterprise solutions. Design scalable systems handling complex data requirements.",
  },
  {
    id: "ai-researcher",
    title: "AI Researcher",
    department: "Innovations",
    location: "Dubai",
    type: "Full-time",
    description:
      "Conduct AI research and develop machine learning solutions. Push boundaries on practical AI applications for enterprise.",
  },
] as const;

const cultureSection: HomeSection = {
  id: "culture",
  title: "Our Culture",
  description:
    "At The Mok Company, we value strategic thinking, technical excellence, and genuine partnership.",
  items: [
    "Collaborative environment with open communication",
    "Continuous learning and professional development",
    "Work on meaningful projects with enterprise impact",
    "Competitive compensation and benefits",
    "Flexible work arrangements",
    "Opportunity to shape company direction",
  ],
};

export function getPositions(): readonly Position[] {
  return positions;
}

export function getCareersCulture(): HomeSection {
  return { ...cultureSection };
}
