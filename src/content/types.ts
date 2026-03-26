// Navigation
export interface NavLink {
  href: string;
  label: string;
}

// Hero sections
export interface HeroContent {
  title: string;
  subtitle: string;
  ctas?: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  }[];
}

// Home page sections
export interface HomeSection {
  id: string;
  title: string;
  description: string;
  items?: string[];
}

// Service arms
export interface ServiceArm {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  services: string[];
}

// About
export interface PhilosophyItem {
  title: string;
  description: string;
}

export interface ApproachStep {
  step: number;
  title: string;
  description: string;
}

// Case studies (Our Work)
export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  category: string;
  title: string;
  description: string;
  challenge: string;
  approach: string;
  execution: string;
  impact: string;
  featured: boolean;
  image?: string;
}

// Client logos (portfolio)
export interface ClientLogo {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  featured: boolean;
}

// Insights
export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "articles" | "research" | "thought-leadership";
  date: string;
  readTime: string;
  featured: boolean;
}

// Ventures / SaaS products
export interface Venture {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "active" | "launched" | "stealth" | "coming-soon";
  type: "saas" | "internal" | "portfolio";
  features?: string[];
  url?: string;
  image?: string;
}

// Career positions
export interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

// Contact form
export interface ServiceOption {
  value: string;
  label: string;
}

// Footer
export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

// FAQ
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Site metadata
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  social: {
    platform: string;
    url: string;
    label: string;
  }[];
}
