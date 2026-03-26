# Content Backend Architecture

## Overview

The content layer is built on the **Repository Pattern**, providing a centralized, type-safe, immutable data layer that decouples content from components. This architecture enables easy migration to headless CMS solutions (Sanity, Strapi, etc.) by swapping repository implementations without touching component code.

## File Structure

```
src/content/
├── types.ts              # TypeScript interfaces for all content domains
├── site.ts               # Site config, navigation, footer, social links
├── home.ts               # Home page content
├── about.ts              # About page content
├── services.ts           # Service arms and offerings
├── portfolio.ts          # Case studies and client logos
├── insights.ts           # Articles and thought leadership
├── ventures.ts           # SaaS products and innovation lab
├── careers.ts            # Job positions and culture
├── faqs.ts               # Frequently asked questions
└── index.ts              # Barrel export
```

## Architecture Principles

### 1. Repository Pattern

Each content domain has its own file with:
- **Data** as immutable const arrays (with `as const`)
- **Typed** interfaces from types.ts
- **Getter functions** that return readonly copies

Example:
```ts
// Data (immutable)
const serviceArms: readonly ServiceArm[] = [...];

// Getter (returns copy, prevents mutations)
export function getServiceArms(): readonly ServiceArm[] {
  return serviceArms;
}

// Single-item lookup
export function getServiceArm(slug: string): ServiceArm | undefined {
  const arm = serviceArms.find((a) => a.slug === slug);
  return arm ? { ...arm } : undefined;
}
```

### 2. Type Safety

All content is explicitly typed:
- Interfaces defined in `types.ts`
- Return types declared on all getter functions
- Discriminated unions for flexible types (e.g., article categories)

### 3. Immutability

Prevents silent bugs from content mutations:
- Data stored as `readonly` arrays with `as const`
- Getters return shallow copies (`{ ...item }`)
- Protects against accidental modifications

### 4. Scalability

Easy to swap implementations:

```ts
// Current: Local TypeScript files
import { getServiceArms } from '@/content/services';

// Future: Swap to Sanity client
import { getServiceArms } from '@/content/adapters/sanity';

// Component code stays identical
```

## Content Domains

### Types (types.ts)
Core interfaces for all content types:
- Navigation and Hero sections
- Pages (Home, About, Services)
- Portfolio (Case studies, Clients)
- Insights and Thought Leadership
- Ventures and SaaS products
- Careers and Culture
- FAQ and Site Config

### Site (site.ts)
Global configuration and navigation:
- **getNavLinks()** - Header navigation
- **getFooterColumns()** - Footer structure
- **getSiteConfig()** - Brand metadata, contact, social
- **getSocialLinks()** - Social media accounts

### Home (home.ts)
Homepage sections:
- **getHomeHero()** - Hero banner with CTA
- **getHomeWhoWeAre()** - Company intro
- **getHomeArms()** - Three service arms summary
- **getHomeWhyMok()** - Value proposition
- **getHomeAudience()** - Target clients
- **getHomeCTA()** - Bottom CTA

### About (about.ts)
About page content:
- **getAboutHero()** - Page hero
- **getOurStory()** - Company history
- **getPhilosophy()** - Philosophy items (4 total)
- **getApproach()** - Process steps (5 total)

### Services (services.ts)
Service offerings:
- **getServiceArms()** - All 3 service arms
- **getServiceArm(slug)** - Single service by slug
  - The Mok Management (Strategy)
  - The Mok Innovations (AI & Products)
  - The Mok Technologies (Web & Infrastructure)

### Portfolio (portfolio.ts)
Case studies and clients:
- **getCaseStudies()** - All 4 featured case studies
  - Raya CX, Turbo, Wiki Food, Al Nasser
- **getFeaturedCaseStudies()** - Featured only
- **getCaseStudy(slug)** - Single case study
- **getClientLogos()** - 8 client logos
- **getFeaturedClients()** - Featured clients only

### Insights (insights.ts)
Articles and thought leadership:
- **getInsights()** - All 6 articles
- **getInsightsByCategory(category)** - Filter by type
- **getFeaturedInsights()** - Featured articles only
- Categories: articles, research, thought-leadership

### Ventures (ventures.ts)
SaaS products and innovation:
- **getVentures()** - All ventures
- **getSaaSProducts()** - SaaS only (MokBot, MokERP, Taggz)
- **getVenture(slug)** - Single venture
- **getInnovationLab()** - Lab description

### Careers (careers.ts)
Job positions and culture:
- **getPositions()** - 6 open positions
- **getCareersCulture()** - Culture statement

### FAQs (faqs.ts)
8 FAQs across categories:
- **getFAQs()** - All questions
- **getFAQsByCategory(category)** - Filter by category
- Categories: services, pricing, process, timeline, technology, industries, getting-started, partnerships

## Usage in Components

### Simple Import
```ts
import { getHomeHero, getServiceArms } from '@/content';

const hero = getHomeHero();
const arms = getServiceArms();
```

### Filtered Content
```ts
import { getFeaturedClients } from '@/content';

const featured = getFeaturedClients(); // Only featured=true
```

### Type Safety
```ts
import type { CaseStudy } from '@/content/types';
import { getCaseStudy } from '@/content';

const study: CaseStudy | undefined = getCaseStudy('turbo');
```

## Migration to Headless CMS

When moving to Sanity or Strapi:

1. Create adapter folder: `src/content/adapters/sanity/`
2. Implement same getter functions
3. Fetch from CMS instead of local data
4. Return same types
5. Update imports in components

Example adapter pattern:
```ts
// src/content/adapters/sanity/services.ts
import { client } from '@/sanity/client';
import type { ServiceArm } from '@/content/types';

export async function getServiceArms(): Promise<ServiceArm[]> {
  return client.fetch(`*[_type == "serviceArm"]`);
}
```

## Key Features

- **980 lines total** - Organized, maintainable
- **Type-safe** - All content explicitly typed
- **Immutable** - No accidental mutations
- **Modular** - Easy to extend and refactor
- **Scalable** - Ready for CMS migration
- **No hardcoded values** - Centralized source of truth
- **Pattern-based** - Consistent getter functions across domains

## Content Inventory

- 3 Service Arms with detailed service listings
- 4 Featured Case Studies with full details
- 8 Client Logos across industries
- 6 Insight Articles across categories
- 3 SaaS Products (MokBot, MokERP, Taggz)
- 6 Open Career Positions
- 8 FAQs organized by topic
- 4 Philosophy Items
- 5 Approach Steps
- Complete Navigation and Footer structure
