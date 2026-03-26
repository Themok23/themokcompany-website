# Content Layer Index

Complete reference for the MOK website content backend architecture.

## Start Here

1. **New to the content layer?** Read `README.md` (5 min)
2. **Want to use it in components?** Go to `QUICK_REFERENCE.md` (copy-paste ready)
3. **Deep dive into the design?** Read `ARCHITECTURE.md` (15 min)
4. **See real examples?** Check `USAGE_EXAMPLES.md` (10 min)

## File Guide

### Core TypeScript Files

| File | Lines | Purpose |
|------|-------|---------|
| **types.ts** | 146 | TypeScript interfaces for all content types |
| **site.ts** | 98 | Navigation, footer, site config, social links |
| **home.ts** | 95 | Homepage sections and CTAs |
| **about.ts** | 93 | About page, philosophy, approach, story |
| **services.ts** | 61 | Three service arms with details |
| **portfolio.ts** | 148 | Case studies and client logos |
| **insights.ts** | 84 | Articles and thought leadership |
| **ventures.ts** | 89 | SaaS products and innovation lab |
| **careers.ts** | 81 | Job positions and culture |
| **faqs.ts** | 68 | FAQ items organized by category |
| **index.ts** | 17 | Barrel export (re-exports everything) |

**Total**: 980 lines of code

### Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Quick start, feature overview, directory structure |
| **ARCHITECTURE.md** | Design patterns, principles, CMS migration guide |
| **USAGE_EXAMPLES.md** | Real React/TSX component examples |
| **QUICK_REFERENCE.md** | All exports, common patterns, content slugs |
| **INDEX.md** | This file - navigation guide |

## Content Organization

### By Domain

**Site Config** (site.ts)
- Navigation links (7)
- Footer columns (4 with 18 links)
- Social media accounts (3)
- Site metadata

**Pages** (home.ts, about.ts, services.ts, portfolio.ts, insights.ts, ventures.ts, careers.ts, faqs.ts)
- Home: 6 sections + hero + CTA
- About: story + 4 philosophy items + 5 approach steps
- Services: 3 service arms
- Portfolio: 4 case studies + 8 client logos
- Insights: 6 articles
- Ventures: 3 SaaS products + innovation lab
- Careers: 6 positions
- FAQs: 8 questions

### By Type

**Text Content**
- Headings and subtitles
- Descriptions and body text
- Call-to-action labels
- Navigation labels

**Structured Data**
- Navigation links (href + label)
- Case studies (full details)
- Service arms (with feature lists)
- Products (status, features, URLs)
- Positions (department, location, type)
- FAQs (question + answer + category)

**Media References**
- Image paths (optional)
- URLs and links
- Social platform links

## Key Functions by Use Case

### Display Navigation
```ts
import { getNavLinks } from '@/content';
const links = getNavLinks();
```

### Show Homepage
```ts
import { getHomeHero, getHomeArms, getHomeCTA } from '@/content';
const hero = getHomeHero();
const arms = getHomeArms();
const cta = getHomeCTA();
```

### List Services
```ts
import { getServiceArms } from '@/content';
const services = getServiceArms();
```

### Show Case Studies
```ts
import { getFeaturedCaseStudies, getCaseStudy } from '@/content';
const featured = getFeaturedCaseStudies();
const detail = getCaseStudy('turbo');
```

### Display Articles
```ts
import { getInsightsByCategory } from '@/content';
const articles = getInsightsByCategory('articles');
```

### Show Products
```ts
import { getSaaSProducts } from '@/content';
const products = getSaaSProducts();
```

### List Jobs
```ts
import { getPositions } from '@/content';
const jobs = getPositions();
```

### Display FAQs
```ts
import { getFAQsByCategory } from '@/content';
const faqs = getFAQsByCategory('pricing');
```

### Footer Content
```ts
import { getFooterColumns, getSocialLinks } from '@/content';
const columns = getFooterColumns();
const social = getSocialLinks();
```

## Type Definitions

All types defined in **types.ts**:

- `NavLink` - Navigation menu items
- `HeroContent` - Hero banners with CTAs
- `HomeSection` - Generic page sections
- `ServiceArm` - Service offerings
- `PhilosophyItem` - Philosophy points
- `ApproachStep` - Process steps
- `CaseStudy` - Portfolio projects
- `ClientLogo` - Client references
- `InsightArticle` - Blog/thought leadership
- `Venture` - Product/SaaS offerings
- `Position` - Job openings
- `FooterColumn` - Footer structure
- `FAQ` - Question/answer pairs
- `SiteConfig` - Site metadata

## Content Slugs & IDs

### Service Arms
- `'management'` - The Mok Management
- `'innovations'` - The Mok Innovations  
- `'technologies'` - The Mok Technologies

### Case Studies
- `'raya-cx'` - Raya CX Brand Transformation
- `'turbo'` - Turbo Digital Platform
- `'wiki-food'` - Wiki Food Growth Strategy
- `'al-nasser'` - Al Nasser AI Integration

### SaaS Products
- `'mokbot'` - MokBot AI Assistant
- `'mokerp'` - MokERP Enterprise Platform
- `'taggz'` - Taggz Social Commerce

### Insight Categories
- `'articles'` - Articles category
- `'research'` - Research category
- `'thought-leadership'` - Thought Leadership category

### FAQ Categories
- `'services'` - Services questions
- `'pricing'` - Pricing questions
- `'process'` - Process questions
- `'timeline'` - Timeline questions
- `'technology'` - Technology questions
- `'industries'` - Industries questions
- `'getting-started'` - Getting Started questions
- `'partnerships'` - Partnerships questions

## Code Patterns

### Always Use Getters
```ts
// Good - Use getters
const links = getNavLinks();

// Bad - Don't import data directly
import { navLinks } from '@/content/site';
```

### Check for Undefined
```ts
// Good - Handle undefined case
const study = getCaseStudy('turbo');
if (study) {
  console.log(study.impact);
}

// Good - Use optional chaining
const details = getCaseStudy('turbo')?.description;
```

### Type Your Imports
```ts
// Good - Use type imports
import type { ServiceArm } from '@/content/types';
import { getServiceArm } from '@/content';

// Less precise - mixing type and value
import { ServiceArm, getServiceArm } from '@/content';
```

### Leverage Immutability
```ts
// Data is readonly - modifications impossible
const items = getClientLogos();
// items[0].featured = false; // ❌ Error: can't assign to readonly

// But filtering works fine
const featured = items.filter(i => i.featured);
```

## Naming Conventions

- **Files**: camelCase.ts (e.g., `home.ts`, `services.ts`)
- **Data arrays**: camelCase (e.g., `navLinks`, `caseStudies`)
- **Functions**: `get<Type>()` or `get<Type>By<Property>()`
- **Variables**: camelCase (e.g., `hero`, `services`)
- **Interfaces**: PascalCase (e.g., `ServiceArm`, `CaseStudy`)

## Common Tasks

### Add New Content
1. Add data to relevant file (e.g., `home.ts`)
2. Export getter function
3. Use `import type` in components

### Update Content
1. Edit data in file
2. No component changes needed
3. Changes reflect everywhere automatically

### Add New Content Type
1. Create interface in `types.ts`
2. Create new file (e.g., `blog.ts`)
3. Add data array with getter
4. Export from `index.ts`
5. Document in this index

### Migrate to CMS
1. Create `adapters/sanity/` directory
2. Implement same getter functions
3. Change imports in components
4. Component code stays identical

## Quality Standards

- Immutable data (readonly)
- Full TypeScript coverage
- All content centralized
- No hardcoded values
- Clear naming
- Consistent patterns
- Well documented
- Production-ready

## Support

For questions about:
- **Getting started**: See `README.md`
- **Integration examples**: See `USAGE_EXAMPLES.md`
- **Copy-paste ready code**: See `QUICK_REFERENCE.md`
- **Design patterns**: See `ARCHITECTURE.md`
- **Type definitions**: See `types.ts`

---

**Last Updated**: March 26, 2026  
**Status**: Production Ready
