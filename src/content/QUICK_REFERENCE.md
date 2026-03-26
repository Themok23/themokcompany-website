# Content Layer Quick Reference

Copy-paste imports and common patterns for fast development.

## All Available Exports

```ts
// Site Configuration
import {
  getNavLinks,
  getFooterColumns,
  getSiteConfig,
  getSocialLinks,
} from '@/content';

// Home Page
import {
  getHomeHero,
  getHomeWhoWeAre,
  getHomeArms,
  getHomeWhyMok,
  getHomeAudience,
  getHomeCTA,
} from '@/content';

// About Page
import {
  getAboutHero,
  getOurStory,
  getPhilosophy,
  getApproach,
} from '@/content';

// Services
import {
  getServiceArms,
  getServiceArm,
} from '@/content';

// Portfolio
import {
  getCaseStudies,
  getFeaturedCaseStudies,
  getCaseStudy,
  getClientLogos,
  getFeaturedClients,
} from '@/content';

// Insights
import {
  getInsights,
  getInsightsByCategory,
  getFeaturedInsights,
} from '@/content';

// Ventures
import {
  getVentures,
  getSaaSProducts,
  getVenture,
  getInnovationLab,
} from '@/content';

// Careers
import {
  getPositions,
  getCareersCulture,
} from '@/content';

// FAQs
import {
  getFAQs,
  getFAQsByCategory,
} from '@/content';

// Types
import type {
  NavLink,
  HeroContent,
  HomeSection,
  ServiceArm,
  PhilosophyItem,
  ApproachStep,
  CaseStudy,
  ClientLogo,
  InsightArticle,
  Venture,
  Position,
  ServiceOption,
  FooterColumn,
  FAQ,
  SiteConfig,
} from '@/content';
```

## Common Patterns

### Navigation Menu
```tsx
import { getNavLinks } from '@/content';

export function Nav() {
  const links = getNavLinks();
  return (
    <nav>
      {links.map(link => <Link href={link.href}>{link.label}</Link>)}
    </nav>
  );
}
```

### Service Cards
```tsx
import { getServiceArms } from '@/content';

export function Services() {
  const arms = getServiceArms();
  return (
    <div>
      {arms.map(arm => (
        <Card key={arm.id} title={arm.title} subtitle={arm.tagline}>
          <p>{arm.description}</p>
          <ul>
            {arm.services.map(s => <li key={s}>{s}</li>)}
          </ul>
        </Card>
      ))}
    </div>
  );
}
```

### Case Study Grid
```tsx
import { getFeaturedCaseStudies } from '@/content';

export function CaseStudies() {
  const studies = getFeaturedCaseStudies();
  return (
    <grid>
      {studies.map(study => (
        <article key={study.id}>
          <h3>{study.title}</h3>
          <p>{study.client} - {study.category}</p>
          <p>{study.description}</p>
        </article>
      ))}
    </grid>
  );
}
```

### Dynamic Case Study Page
```tsx
import { getCaseStudy } from '@/content';
import type { CaseStudy } from '@/content/types';

export function CaseStudyPage({ slug }: { slug: string }) {
  const study: CaseStudy | undefined = getCaseStudy(slug);
  
  if (!study) return <NotFound />;
  
  return (
    <article>
      <h1>{study.title}</h1>
      <meta>{study.client}</meta>
      <section><h2>Challenge</h2><p>{study.challenge}</p></section>
      <section><h2>Approach</h2><p>{study.approach}</p></section>
      <section><h2>Execution</h2><p>{study.execution}</p></section>
      <section><h2>Impact</h2><p>{study.impact}</p></section>
    </article>
  );
}
```

### Client Logos
```tsx
import { getFeaturedClients } from '@/content';

export function ClientWall() {
  const clients = getFeaturedClients();
  return (
    <div className="logos">
      {clients.map(client => (
        <div key={client.id}>
          <p>{client.name}</p>
          <small>{client.industry}</small>
        </div>
      ))}
    </div>
  );
}
```

### Articles Grid
```tsx
import { getInsightsByCategory } from '@/content';

export function Articles() {
  const articles = getInsightsByCategory('articles');
  return (
    <div>
      {articles.map(article => (
        <card key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <time>{article.date}</time> | <span>{article.readTime}</span>
        </card>
      ))}
    </div>
  );
}
```

### Accordion FAQs
```tsx
import { getFAQsByCategory } from '@/content';

export function FAQs() {
  const faqs = getFAQsByCategory('services');
  return (
    <div>
      {faqs.map(faq => (
        <details key={faq.id}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
```

### Footer
```tsx
import { getFooterColumns, getSocialLinks } from '@/content';

export function Footer() {
  const columns = getFooterColumns();
  const social = getSocialLinks();
  
  return (
    <footer>
      {columns.map(col => (
        <div key={col.title}>
          <h4>{col.title}</h4>
          <ul>
            {col.links.map(link => (
              <li key={link.href}>
                <a href={link.href} target={link.external ? '_blank' : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      <div>
        {social.map(s => <a key={s.platform} href={s.url}>{s.platform}</a>)}
      </div>
    </footer>
  );
}
```

### SaaS Product Showcase
```tsx
import { getSaaSProducts } from '@/content';

export function Ventures() {
  const products = getSaaSProducts();
  return (
    <section>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p className="tagline">{product.tagline}</p>
          <p>{product.description}</p>
          
          {product.features && (
            <ul>
              {product.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          )}
          
          {product.url && <a href={product.url}>Visit</a>}
        </div>
      ))}
    </section>
  );
}
```

### Job Listings
```tsx
import { getPositions } from '@/content';

export function Careers() {
  const positions = getPositions();
  return (
    <div>
      {positions.map(pos => (
        <article key={pos.id}>
          <h3>{pos.title}</h3>
          <meta>
            {pos.department} | {pos.location} | {pos.type}
          </meta>
          <p>{pos.description}</p>
        </article>
      ))}
    </div>
  );
}
```

### Type-Safe Content
```tsx
import type { ServiceArm, CaseStudy } from '@/content/types';
import { getServiceArm, getCaseStudy } from '@/content';

// Safe access with proper typing
const service: ServiceArm | undefined = getServiceArm('management');
const study: CaseStudy | undefined = getCaseStudy('turbo');

// Use in components with TypeScript checking
interface CardProps {
  study: CaseStudy;
}

export function StudyCard({ study }: CardProps) {
  return <div>{study.title}</div>;
}
```

## Content Slugs

### Service Arms
- `'management'` - The Mok Management
- `'innovations'` - The Mok Innovations
- `'technologies'` - The Mok Technologies

### Case Studies
- `'raya-cx'` - Raya CX
- `'turbo'` - Turbo
- `'wiki-food'` - Wiki Food
- `'al-nasser'` - Al Nasser

### Ventures
- `'mokbot'` - MokBot
- `'mokerp'` - MokERP
- `'taggz'` - Taggz

### Insight Categories
- `'articles'` - Articles
- `'research'` - Research
- `'thought-leadership'` - Thought Leadership

### FAQ Categories
- `'services'` - About Services
- `'pricing'` - Pricing
- `'process'` - Our Process
- `'timeline'` - Timeline
- `'technology'` - Technology
- `'industries'` - Industries
- `'getting-started'` - Getting Started
- `'partnerships'` - Partnerships

## Filter Examples

```ts
// All featured items
getFeaturedCaseStudies()
getFeaturedClients()
getFeaturedInsights()
getSaaSProducts()

// By property
getServiceArm('management')      // Single service
getCaseStudy('turbo')            // Single case study
getVenture('mokbot')             // Single venture

// By category
getInsightsByCategory('articles')
getFAQsByCategory('pricing')
```

## Tips

1. **Always use getters** - Never import data arrays directly
2. **Check for undefined** - Item lookups return `undefined` if not found
3. **Type your imports** - Use `import type` for TypeScript interfaces
4. **Leverage readonly** - Getters return immutable data
5. **Keep content updated** - All changes in /src/content/
6. **No hardcoding** - Always use getter functions in components
7. **Null checks** - Optional item lookups need `?.` operator

## Migration Example

When switching to Sanity CMS:

```ts
// OLD
import { getServiceArms } from '@/content';

// NEW
import { getServiceArms } from '@/content/adapters/sanity';

// Component code stays the same!
```
