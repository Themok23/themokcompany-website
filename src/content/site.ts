import type { NavLink, FooterColumn, SiteConfig } from "./types";

// Navigation links for header
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/our-work", label: "Our Work" },
  { href: "/insights", label: "Insights" },
  { href: "/ventures", label: "Ventures" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly NavLink[];

// Footer columns
const footerColumns = [
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

// Social media links
const socialLinks = [
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/company/themokcompany",
    label: "Follow us on LinkedIn",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/themokcompany",
    label: "Follow us on Instagram",
  },
  {
    platform: "X",
    url: "https://x.com/themokcompany",
    label: "Follow us on X",
  },
] as const;

// Site configuration
const siteConfig: SiteConfig = {
  name: "The Mok Company",
  tagline: "Management. Innovation. Technology.",
  description:
    "The Mok Company is a 360-degree consultancy combining strategy, product innovation, and technology delivery. We help enterprises transform operations, scale ventures, and drive competitive advantage through integrated consulting and venture building.",
  email: "hello@themok.company",
  location: "Dubai, UAE",
  social: [...socialLinks],
};

// Getter functions
export function getNavLinks(): readonly NavLink[] {
  return navLinks;
}

export function getFooterColumns(): readonly FooterColumn[] {
  return footerColumns;
}

export function getSiteConfig(): SiteConfig {
  return { ...siteConfig };
}

export function getSocialLinks() {
  return socialLinks;
}
