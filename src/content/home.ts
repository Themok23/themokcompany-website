import type { HeroContent, HomeSection } from "./types";

const homeHero: HeroContent = {
  title: "We Build What's Next.",
  subtitle:
    "Strategic consultancy. Marketing innovation. Technology execution. All under one roof.",
  ctas: [
    { label: "Explore Our Work", href: "/our-work", variant: "primary" },
    { label: "Start a Conversation", href: "/contact", variant: "secondary" },
  ],
};

const whoWeAre: HomeSection = {
  id: "who-we-are",
  title: "Strategy Without Execution Is Just Theory.",
  description:
    "The Mok Company is a 360-degree management, brand, and technology consultancy built for ambitious companies.",
  items: [
    "Strategic clarity",
    "Creative thinking",
    "Marketing innovation",
    "Operational execution",
  ],
};

const homeArms: HomeSection = {
  id: "what-we-do",
  title: "Built for Complexity. Designed for Growth.",
  description: "Three complementary arms delivering end-to-end solutions.",
  items: [
    "The Mok Management - Strategy and consulting",
    "The Mok Innovations - AI and product development",
    "The Mok Technologies - Web, app, and infrastructure",
  ],
};

const whyMok: HomeSection = {
  id: "why-mok",
  title: "Built Different.",
  description:
    "Most consultancies advise. Few execute. Almost none do both exceptionally.",
  items: [
    "Creators at heart.",
    "Operators by discipline.",
    "Partners by commitment.",
  ],
};

const audience: HomeSection = {
  id: "who-we-work-with",
  title: "For the Ambitious.",
  description: "If growth is your agenda, we are your partner.",
  items: [
    "Scaling startups",
    "Established corporates",
    "Investment firms",
    "Multinationals entering transformation",
  ],
};

const homeCTA: HeroContent = {
  title: "Ready to build what's next?",
  subtitle: "Let's start a conversation about your growth.",
  ctas: [
    { label: "Start a Conversation", href: "/contact", variant: "primary" },
  ],
};

export function getHomeHero(): HeroContent {
  return { ...homeHero };
}

export function getHomeWhoWeAre(): HomeSection {
  return { ...whoWeAre };
}

export function getHomeArms(): HomeSection {
  return { ...homeArms };
}

export function getHomeWhyMok(): HomeSection {
  return { ...whyMok };
}

export function getHomeAudience(): HomeSection {
  return { ...audience };
}

export function getHomeCTA(): HeroContent {
  return { ...homeCTA };
}
