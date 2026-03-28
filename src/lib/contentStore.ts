// Client-side content store using localStorage
// Provides get/set/reset operations for all editable content

const STORAGE_PREFIX = "mok-cms-";

export type FieldType = "text" | "textarea" | "array" | "image" | "url" | "select" | "number";

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select type
}

export interface SectionDefinition {
  id: string;
  title: string;
  page: string;
  fields: FieldDefinition[];
  getDefaults: () => Record<string, unknown>;
}

// Helpers
function getStorageKey(page: string, sectionId: string): string {
  return `${STORAGE_PREFIX}${page}--${sectionId}`;
}

export function getContentOverride<T extends Record<string, unknown>>(
  page: string,
  sectionId: string,
  defaults: T
): T {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(getStorageKey(page, sectionId));
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<T>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

export function setContentOverride(
  page: string,
  sectionId: string,
  data: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(page, sectionId), JSON.stringify(data));
    // Track modification date
    const existing = getContentMeta(page, sectionId);
    setContentMeta(page, sectionId, {
      createdAt: existing.createdAt || new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to save content override:", err);
  }
}

export function resetContentOverride(page: string, sectionId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getStorageKey(page, sectionId));
  localStorage.removeItem(getMetaKey(page, sectionId));
}

export function resetAllOverrides(): void {
  if (typeof window === "undefined") return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
}

export function hasOverride(page: string, sectionId: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(getStorageKey(page, sectionId)) !== null;
}

// Image handling: convert file to base64 data URL
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


// Date tracking for modified timestamps
const META_PREFIX = "mok-cms-meta-";

function getMetaKey(page: string, sectionId: string): string {
  return `${META_PREFIX}${page}--${sectionId}`;
}

export interface ContentMeta {
  modifiedAt?: string;
  createdAt?: string;
}

export function getContentMeta(page: string, sectionId: string): ContentMeta {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(getMetaKey(page, sectionId));
    if (!raw) return {};
    return JSON.parse(raw) as ContentMeta;
  } catch {
    return {};
  }
}

function setContentMeta(page: string, sectionId: string, meta: ContentMeta): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getMetaKey(page, sectionId), JSON.stringify(meta));
  } catch {
    // ignore
  }
}

// Section definitions for every page
// These define what fields are editable for each section

export function getHomeSectionDefs(): SectionDefinition[] {
  return [
    {
      id: "hero",
      title: "Hero",
      page: "home",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ],
      getDefaults: () => {
        const { getHomeHero } = require("@/content/home");
        const d = getHomeHero();
        return { title: d.title, subtitle: d.subtitle };
      },
    },
    {
      id: "who-we-are",
      title: "Who We Are",
      page: "home",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "items", label: "Bullet Points", type: "array" },
      ],
      getDefaults: () => {
        const { getHomeWhoWeAre } = require("@/content/home");
        const d = getHomeWhoWeAre();
        return { title: d.title, description: d.description, items: d.items || [] };
      },
    },
    {
      id: "three-arms",
      title: "Three Arms",
      page: "home",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "items", label: "Arms List", type: "array" },
      ],
      getDefaults: () => {
        const { getHomeArms } = require("@/content/home");
        const d = getHomeArms();
        return { title: d.title, description: d.description, items: d.items || [] };
      },
    },
    {
      id: "why-mok",
      title: "Why MOK",
      page: "home",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "items", label: "Points", type: "array" },
      ],
      getDefaults: () => {
        const { getHomeWhyMok } = require("@/content/home");
        const d = getHomeWhyMok();
        return { title: d.title, description: d.description, items: d.items || [] };
      },
    },
    {
      id: "who-we-work-with",
      title: "Who We Work With",
      page: "home",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "items", label: "Audience Segments", type: "array" },
      ],
      getDefaults: () => {
        const { getHomeAudience } = require("@/content/home");
        const d = getHomeAudience();
        return { title: d.title, description: d.description, items: d.items || [] };
      },
    },
    {
      id: "cta",
      title: "CTA",
      page: "home",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ],
      getDefaults: () => {
        const { getHomeCTA } = require("@/content/home");
        const d = getHomeCTA();
        return { title: d.title, subtitle: d.subtitle };
      },
    },
  ];
}

export function getAboutSectionDefs(): SectionDefinition[] {
  return [
    {
      id: "hero",
      title: "Hero",
      page: "about",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "textarea" },
      ],
      getDefaults: () => {
        const { getAboutHero } = require("@/content/about");
        const d = getAboutHero();
        return { title: d.title, subtitle: d.subtitle };
      },
    },
    {
      id: "our-story",
      title: "Our Story",
      page: "about",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "items", label: "Milestones", type: "array" },
      ],
      getDefaults: () => {
        const { getOurStory } = require("@/content/about");
        const d = getOurStory();
        return { title: d.title, description: d.description, items: d.items || [] };
      },
    },
  ];
}

export function getServicesSectionDefs(): SectionDefinition[] {
  return [
    {
      id: "management",
      title: "The Mok Management",
      page: "what-we-do",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "services", label: "Services", type: "array" },
      ],
      getDefaults: () => {
        const { getServiceArms } = require("@/content/services");
        const arms = getServiceArms();
        const d = arms.find((a: { slug: string }) => a.slug === "management");
        return d ? { title: d.title, tagline: d.tagline, description: d.description, services: [...d.services] } : {};
      },
    },
    {
      id: "innovations",
      title: "The Mok Innovations",
      page: "what-we-do",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "services", label: "Services", type: "array" },
      ],
      getDefaults: () => {
        const { getServiceArms } = require("@/content/services");
        const arms = getServiceArms();
        const d = arms.find((a: { slug: string }) => a.slug === "innovations");
        return d ? { title: d.title, tagline: d.tagline, description: d.description, services: [...d.services] } : {};
      },
    },
    {
      id: "technologies",
      title: "The Mok Technologies",
      page: "what-we-do",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "services", label: "Services", type: "array" },
      ],
      getDefaults: () => {
        const { getServiceArms } = require("@/content/services");
        const arms = getServiceArms();
        const d = arms.find((a: { slug: string }) => a.slug === "technologies");
        return d ? { title: d.title, tagline: d.tagline, description: d.description, services: [...d.services] } : {};
      },
    },
  ];
}

export function getPortfolioSectionDefs(): SectionDefinition[] {
  const { getCaseStudies } = require("@/content/portfolio");
  const studies = getCaseStudies() as Array<{
    id: string;
    client: string;
    title: string;
    category: string;
    description: string;
    challenge: string;
    approach: string;
    execution: string;
    impact: string;
    image?: string;
    featured: boolean;
  }>;

  return studies.map((cs) => ({
    id: `case-${cs.id}`,
    title: cs.client,
    page: "our-work",
    fields: [
      { key: "client", label: "Client", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "challenge", label: "Challenge", type: "textarea" },
      { key: "approach", label: "Approach", type: "textarea" },
      { key: "execution", label: "Execution", type: "textarea" },
      { key: "impact", label: "Impact", type: "textarea" },
      { key: "image", label: "Image", type: "image" },
      { key: "featured", label: "Featured", type: "select", options: ["true", "false"] },
    ],
    getDefaults: () => ({
      client: cs.client,
      title: cs.title,
      category: cs.category,
      description: cs.description,
      challenge: cs.challenge,
      approach: cs.approach,
      execution: cs.execution,
      impact: cs.impact,
      image: cs.image || "",
      featured: String(cs.featured),
    }),
  }));
}

export function getInsightsSectionDefs(): SectionDefinition[] {
  const { getInsights } = require("@/content/insights");
  const articles = getInsights() as Array<{
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    featured: boolean;
  }>;

  return articles.map((a) => ({
    id: `insight-${a.id}`,
    title: a.title.length > 40 ? a.title.substring(0, 37) + "..." : a.title,
    page: "insights",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "category", label: "Category", type: "select", options: ["articles", "research", "thought-leadership"] },
      { key: "date", label: "Date", type: "text" },
      { key: "readTime", label: "Read Time", type: "text" },
      { key: "featured", label: "Featured", type: "select", options: ["true", "false"] },
    ],
    getDefaults: () => ({
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      date: a.date,
      readTime: a.readTime,
      featured: String(a.featured),
    }),
  }));
}

export function getVenturesSectionDefs(): SectionDefinition[] {
  const { getVentures } = require("@/content/ventures");
  const ventures = getVentures() as Array<{
    id: string;
    name: string;
    tagline: string;
    description: string;
    status: string;
    features?: string[];
    url?: string;
    image?: string;
  }>;

  return ventures.map((v) => ({
    id: `venture-${v.id}`,
    title: v.name,
    page: "ventures",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "status", label: "Status", type: "select", options: ["active", "launched", "stealth", "coming-soon"] },
      { key: "features", label: "Features", type: "array" },
      { key: "url", label: "URL", type: "url" },
      { key: "image", label: "Image", type: "image" },
    ],
    getDefaults: () => ({
      name: v.name,
      tagline: v.tagline,
      description: v.description,
      status: v.status,
      features: v.features ? [...v.features] : [],
      url: v.url || "",
      image: v.image || "",
    }),
  }));
}

export function getContactSectionDefs(): SectionDefinition[] {
  return [
    {
      id: "contact-info",
      title: "Contact Information",
      page: "contact",
      fields: [
        { key: "email", label: "Email", type: "text" },
        { key: "location", label: "Location", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ],
      getDefaults: () => {
        const { getSiteConfig } = require("@/content/site");
        const d = getSiteConfig();
        return { email: d.email, location: d.location, tagline: d.tagline, description: d.description };
      },
    },
  ];
}

export function getCareersSectionDefs(): SectionDefinition[] {
  const { getPositions, getCareersCulture } = require("@/content/careers");
  const positions = getPositions() as Array<{
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
  }>;
  const culture = getCareersCulture();

  const positionDefs: SectionDefinition[] = positions.map((p) => ({
    id: `position-${p.id}`,
    title: p.title,
    page: "careers",
    fields: [
      { key: "title", label: "Job Title", type: "text" },
      { key: "department", label: "Department", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "type", label: "Type", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    getDefaults: () => ({
      title: p.title,
      department: p.department,
      location: p.location,
      type: p.type,
      description: p.description,
    }),
  }));

  return [
    {
      id: "culture",
      title: "Culture & Values",
      page: "careers",
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "items", label: "Values", type: "array" },
      ],
      getDefaults: () => ({
        title: culture.title,
        description: culture.description,
        items: culture.items || [],
      }),
    },
    ...positionDefs,
  ];
}

export function getSectionDefsForPage(page: string): SectionDefinition[] {
  switch (page) {
    case "home":
      return getHomeSectionDefs();
    case "about":
      return getAboutSectionDefs();
    case "what-we-do":
      return getServicesSectionDefs();
    case "our-work":
      return getPortfolioSectionDefs();
    case "insights":
      return getInsightsSectionDefs();
    case "ventures":
      return getVenturesSectionDefs();
    case "contact":
      return getContactSectionDefs();
    case "careers":
      return getCareersSectionDefs();
    default:
      return [];
  }
}
