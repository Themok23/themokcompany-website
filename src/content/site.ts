import type { NavLink, FooterColumn, SiteConfig } from "./types";

// Navigation links for header
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "What We Do" },
  { href: "/work", label: "Our Work" },
  { href: "/insights", label: "Insights" },
  { href: "/ventures", label: "Ventures" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly NavLink[];

// Footer columns
const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Partnerships", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "The Mok Management", href: "/services/management" },
      { label: "The Mok Innovations", href: "/services/innovations" },
      { label: "The Mok Technologies", href: "/services/technologies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "News", href: "/insights?category=articles" },
      { label: "FAQs", href: "/faq" },
      { label: "Case Studies", href: "/work" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "LinkedIn", href: "https://linkedin.com/company/themokcompany", external: true },
      { label: "Instagram", href: "https://instagram.com/themokcompany", external: true },
      { label: "X", href: "https://x.com/themokcompany", external: true },
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
  tagline: "Digital Transformation for Enterprise",
  description:
    "We deliver executive corporate presentations, company profile design, AI solutions, web and app development, and business consultancy for enterprises.",
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
