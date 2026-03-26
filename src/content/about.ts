import type { HeroContent, HomeSection, PhilosophyItem, ApproachStep } from "./types";

const aboutHero: HeroContent = {
  title: "About The Mok Company",
  subtitle:
    "A decade of digital transformation expertise serving enterprise leaders",
};

const ourStory: HomeSection = {
  id: "our-story",
  title: "Our Story",
  description:
    "Founded a decade ago, The Mok Company emerged from a simple belief: enterprise digital transformation requires equal parts strategy and technical excellence. We've spent ten years proving that thoughtful approach, deep expertise, and genuine partnership produce results that matter.",
  items: [
    "Started with a focus on digital transformation in retail",
    "Expanded into finance and automotive sectors",
    "Built a team of strategists, architects, and engineers",
    "Evolved to offer integrated consulting and technology services",
    "Now partnering with enterprises across multiple industries",
  ],
};

const philosophyItems: readonly PhilosophyItem[] = [
  {
    title: "Strategy First",
    description:
      "Technology serves business objectives, not the reverse. We begin every engagement by understanding your strategic intent.",
  },
  {
    title: "Excellence is Non-Negotiable",
    description:
      "Whether strategy, design, or code, we deliver work that reflects our commitment to quality and attention to detail.",
  },
  {
    title: "Partnership Over Vendor",
    description:
      "We view our engagements as long-term partnerships where your success is our success.",
  },
  {
    title: "Integrated Solutions",
    description:
      "Consulting, product development, and technology work together seamlessly, not in silos.",
  },
] as const;

const approachSteps: readonly ApproachStep[] = [
  {
    step: 1,
    title: "Understand Your Context",
    description:
      "We invest time in understanding your business, market, organization, and strategic priorities.",
  },
  {
    step: 2,
    title: "Define Clear Objectives",
    description:
      "Together we establish measurable outcomes and success criteria for the engagement.",
  },
  {
    step: 3,
    title: "Design Integrated Solutions",
    description:
      "Strategy, product design, and technology converge in a cohesive solution architecture.",
  },
  {
    step: 4,
    title: "Execute with Rigor",
    description:
      "Our team delivers with attention to detail, quality standards, and timeline discipline.",
  },
  {
    step: 5,
    title: "Enable Your Team",
    description:
      "We transfer knowledge, build capabilities, and set you up for long-term success.",
  },
] as const;

export function getAboutHero(): HeroContent {
  return { ...aboutHero };
}

export function getOurStory(): HomeSection {
  return { ...ourStory };
}

export function getPhilosophy(): readonly PhilosophyItem[] {
  return philosophyItems;
}

export function getApproach(): readonly ApproachStep[] {
  return approachSteps;
}
