import type { NavLink, FooterColumn, SiteConfig } from "../../types";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/our-work", label: "Our Work" },
  { href: "/insights", label: "Insights" },
  { href: "/ventures", label: "Ventures" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly NavLink[];

export const footerColumns = [
  {
    title: "The Mok Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Philosophy", href: "/about#philosophy" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "What We Do",
    links: [
      { label: "The Mok Management", href: "/what-we-do#management" },
      { label: "The Mok Innovations", href: "/what-we-do#innovations" },
      { label: "The Mok Technologies", href: "/what-we-do#technologies" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Articles", href: "/insights?category=articles" },
      { label: "Research", href: "/insights?category=research" },
      { label: "Case Studies", href: "/our-work" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "LinkedIn", href: "https://linkedin.com/company/themokcompany", external: true },
      { label: "Instagram", href: "https://instagram.com/themokcompany", external: true },
    ],
  },
] as const satisfies readonly FooterColumn[];

export const socialLinks = [
  { platform: "LinkedIn", url: "https://linkedin.com/company/themokcompany", label: "Follow us on LinkedIn" },
  { platform: "Instagram", url: "https://instagram.com/themokcompany", label: "Follow us on Instagram" },
  { platform: "X", url: "https://x.com/themokcompany", label: "Follow us on X" },
] as const;

export const siteConfig: SiteConfig = {
  name: "The Mok Company",
  tagline: "Management. Innovation. Technology.",
  description:
    "The Mok Company is a 360-degree consultancy combining strategy, product innovation, and technology delivery. We help enterprises transform operations, scale ventures, and drive competitive advantage through integrated consulting and venture building.",
  email: "hello@themok.company",
  location: "Dubai, UAE",
  social: [...socialLinks],
};

export const uiStrings = {
  brandInitial: "M",
  brandName: "THE MOK COMPANY",
  ctaStartConversation: "Start a Conversation",
  ctaExploreWork: "Explore Our Work",
  ctaViewAll: "View All",
  ctaLearnMore: "Learn More",
  ctaReadMore: "Read More",
  ctaViewCaseStudy: "View Case Study",
  ctaBackToWork: "← Back to Our Work",
  ctaBackToVentures: "← Back to Ventures",
  ctaVisitWebsite: "Visit Website",
  ctaApplyNow: "Apply Now",
  languageLabel: "Language",
  languageEnglish: "English",
  languageArabic: "العربية",
  footerRights: "All rights reserved.",
  footerTagline: "Management. Innovation. Technology.",
  loadingLabel: "Loading…",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  readMoreSuffix: "→",
};
