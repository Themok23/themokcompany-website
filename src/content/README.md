# Content Backend Layer

A type-safe, immutable content data layer using the Repository Pattern. Replaces hardcoded content across the website and enables painless migration to headless CMS solutions.

## Quick Start

### Import Content
```ts
import { getHomeHero, getServiceArms, getCaseStudy } from '@/content';

const hero = getHomeHero();
const arms = getServiceArms();
const study = getCaseStudy('turbo');
```

### Use in Components
```tsx
import { getNavLinks } from '@/content';

export function Header() {
  const links = getNavLinks();
  return (
    <nav>
      {links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
    </nav>
  );
}
```

## Files at a Glance

| File | Purpose | Key Exports |
|------|---------|---|
| `types.ts` | Type definitions | All TypeScript interfaces |
| `site.ts` | Global config | `getNavLinks()`, `getFooterColumns()`, `getSiteConfig()` |
| `home.ts` | Home page | `getHomeHero()`, `getHomeArms()`, `getHomeCTA()` |
| `about.ts` | About page | `getAboutHero()`, `getPhilosophy()`, `getApproach()` |
| `services.ts` | Services | `getServiceArms()`, `getServiceArm(slug)` |
| `portfolio.ts` | Case studies | `getCaseStudies()`, `getCaseStudy(slug)`, `getClientLogos()` |
| `insights.ts` | Articles | `getInsights()`, `getInsightsByCategory()` |
| `ventures.ts` | SaaS products | `getVentures()`, `getSaaSProducts()`, `getVenture(slug)` |
| `careers.ts` | Jobs & culture | `getPositions()`, `getCareersCulture()` |
| `faqs.ts` | Questions | `getFAQs()`, `getFAQsByCategory()` |
| `index.ts` | Barrel export | All exports from above |

## Design Principles

### Repository Pattern
- Data separated from business logic
- Consistent getter functions across all domains
- Easy to swap implementations (local → CMS)

### Type Safety
- All content explicitly typed with TypeScript interfaces
- Return types declared on all getters
- Prevents runtime content structure errors

### Immutability
- Data stored with `readonly` arrays
- Getters return shallow copies
- Prevents accidental mutations

### Modular Organization
- One file per content domain
- 60-150 lines per file
- Single responsibility

## Content Inventory

**Pages**: 8 (Home, About, Services, Portfolio, Insights, Ventures, Careers, FAQ)

**Case Studies**: 4 featured
- Raya CX (Brand Transformation)
- Turbo (Digital Platform)
- Wiki Food (Growth Strategy)
- Al Nasser (AI Integration)

**Service Arms**: 3
- The Mok Management (Strategy)
- The Mok Innovations (AI)
- The Mok Technologies (Infrastructure)

**Ventures**: 3 SaaS
- MokBot (AI Assistant)
- MokERP (Enterprise Resource Planning)
- Taggz (Social Commerce)

**Insights**: 6 articles across categories
- Articles, Research, Thought Leadership

**Careers**: 6 open positions
- Senior Full Stack, Product Manager, Design Lead, Consultant, Data Engineer, AI Researcher

**Client Logos**: 8 companies

**FAQs**: 8 questions across categories

**Philosophy Items**: 4 principles

**Approach Steps**: 5 process steps

## Directory Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utilities
└── content/          # <-- YOU ARE HERE
    ├── types.ts      # Type definitions
    ├── site.ts       # Navigation, footer, config
    ├── home.ts       # Home page content
    ├── about.ts      # About page content
    ├── services.ts   # Service offerings
    ├── portfolio.ts  # Case studies
    ├── insights.ts   # Articles
    ├── ventures.ts   # SaaS products
    ├── careers.ts    # Job postings
    ├── faqs.ts       # FAQ content
    ├── index.ts      # Barrel export
    ├── ARCHITECTURE.md   # Design overview
    ├── USAGE_EXAMPLES.md # Component examples
    └── README.md     # This file
```

## Key Features

- **Zero Hardcoded Content** - All text, links, and data in one place
- **Type-Safe** - Catch typos and structure errors at compile time
- **Immutable** - No accidental mutations or side effects
- **Organized** - Logical domain-based file structure
- **Scalable** - Ready for CMS migration
- **Well-Documented** - Clear examples for every use case
- **Maintainable** - 980 lines total, avg 85 lines per file

## Switching to Headless CMS

The architecture enables painless migration:

1. Create adapter directory: `src/content/adapters/sanity/`
2. Implement same getter functions
3. Update imports: `from '@/content'` → `from '@/content/adapters/sanity'`
4. No component code changes needed

## File Size Guidelines

- All files kept under 150 lines for readability
- Typical file: 80-120 lines
- Maximum: 200 lines (portfolio.ts at 148 is closest)

## Naming Conventions

- Getter functions: `get<DomainType>()` or `get<Domain>ByProperty()`
- Files: `camelCase.ts`
- Data arrays: `const <domain>: readonly <Type>[] = [...]`
- Exports: Explicit `export function` declarations

## Type Patterns

### Single Domain
```ts
export function getServiceArms(): readonly ServiceArm[] {
  return serviceArms;
}
```

### Single Item Lookup
```ts
export function getCaseStudy(slug: string): CaseStudy | undefined {
  const study = caseStudies.find(cs => cs.slug === slug);
  return study ? { ...study } : undefined;
}
```

### Filtered Content
```ts
export function getFeaturedClients(): readonly ClientLogo[] {
  return clientLogos.filter(cl => cl.featured);
}
```

### By Category/Property
```ts
export function getInsightsByCategory(
  category: InsightArticle["category"]
): readonly InsightArticle[] {
  return insights.filter(i => i.category === category);
}
```

## Related Documentation

- See `ARCHITECTURE.md` for design details and patterns
- See `USAGE_EXAMPLES.md` for component integration examples
- See `types.ts` for all TypeScript interface definitions

## Questions?

Refer to `USAGE_EXAMPLES.md` for specific component patterns and real-world usage.
