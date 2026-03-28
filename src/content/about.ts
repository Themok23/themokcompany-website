import type { HeroContent, HomeSection, PhilosophyItem, ApproachStep } from "./types";

const aboutHero: HeroContent = {
  title: "About The Mok Company",
  subtitle:
    "A multidimensional consultancy integrating management, marketing, innovation, and technology.",
};

const ourStory: HomeSection = {
  id: "our-story",
  title: "Our Story",
  description:
    "The Mok Company began as a technology-driven venture. Today, it is a multidimensional consultancy integrating management, marketing, innovation, and technology. We evolved because businesses don't need fragmented solutions. They need integrated growth engines.",
  items: [
    "Management",
    "Marketing",
    "Innovation",
    "Technology",
  ],
};

const philosophyItems: readonly PhilosophyItem[] = [
  {
    title: "Creativity Must Serve Strategy",
    description:
      "Beautiful ideas that don't move markets are just decoration. Every creative decision we make is anchored in strategic intent and business outcomes.",
  },
  {
    title: "Strategy Must Lead to Execution",
    description:
      "We don't deliver PowerPoints. We deliver results. Every strategy comes with an execution plan, timeline, and accountability built in from day one.",
  },
  {
    title: "Execution Must Drive Measurable Growth",
    description:
      "If it can't be measured, it can't be improved. We track outcomes against KPIs and optimize relentlessly until your growth targets are exceeded.",
  },
] as const;

const approachSteps: readonly ApproachStep[] = [
  {
    step: 1,
    title: "Discover",
    description:
      "Deep analysis. Market intelligence. Brand diagnosis. We invest heavily in understanding your business, competitive position, and strategic intent before making a single recommendation.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "Strategic architecture. Creative frameworks. Innovation models. We design integrated solutions spanning strategy, product, and technology with clarity on direction and expected outcomes.",
  },
  {
    step: 3,
    title: "Deploy",
    description:
      "Operational rollout. Marketing activation. Technology implementation. We execute with rigor, quality standards, and transparent communication. Your team works alongside ours.",
  },
  {
    step: 4,
    title: "Dominate",
    description:
      "Scale, optimize, lead. We measure performance against your KPIs, identify growth opportunities, and continuously improve until you own the category.",
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
