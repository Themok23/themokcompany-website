# Content Layer Usage Examples

Quick reference for using the content backend in components.

## Basic Usage

### Get All Content
```ts
import { 
  getNavLinks, 
  getHomeHero, 
  getServiceArms, 
  getClientLogos 
} from '@/content';

// Navigation
const navLinks = getNavLinks();

// Home page hero
const hero = getHomeHero();
console.log(hero.title); // "Digital Transformation for Enterprise"

// All service arms
const arms = getServiceArms();
arms.forEach(arm => console.log(arm.title));
// Output: The Mok Management, The Mok Innovations, The Mok Technologies

// Client logos
const clients = getClientLogos();
```

### Get Single Item
```ts
import { getServiceArm, getCaseStudy } from '@/content';

// Get specific service by slug
const management = getServiceArm('management');
console.log(management?.description);

// Get case study
const turbo = getCaseStudy('turbo');
console.log(turbo?.impact);
```

### Filter Content
```ts
import { 
  getFeaturedCaseStudies, 
  getFeaturedClients,
  getInsightsByCategory 
} from '@/content';

// Featured items only
const featured = getFeaturedCaseStudies();
const featuredClients = getFeaturedClients();

// By category
const articles = getInsightsByCategory('articles');
const research = getInsightsByCategory('research');
```

## In Components

### Navigation Component
```tsx
import { getNavLinks } from '@/content';

export function Header() {
  const navLinks = getNavLinks();
  
  return (
    <nav>
      {navLinks.map(link => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
```

### Hero Section Component
```tsx
import { getHomeHero } from '@/content';

export function HomeHero() {
  const hero = getHomeHero();
  
  return (
    <div>
      <h1>{hero.title}</h1>
      <p>{hero.subtitle}</p>
      {hero.ctas?.map(cta => (
        <Button key={cta.href} href={cta.href} variant={cta.variant}>
          {cta.label}
        </Button>
      ))}
    </div>
  );
}
```

### Service Cards Component
```tsx
import { getServiceArms } from '@/content';

export function ServiceCards() {
  const services = getServiceArms();
  
  return (
    <div className="grid">
      {services.map(service => (
        <Card key={service.id}>
          <h3>{service.title}</h3>
          <p>{service.tagline}</p>
          <ul>
            {service.services.map(svc => (
              <li key={svc}>{svc}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
```

### Case Study Detail
```tsx
import { getCaseStudy } from '@/content';
import type { CaseStudy } from '@/content/types';

export function CaseStudyDetail({ slug }: { slug: string }) {
  const study: CaseStudy | undefined = getCaseStudy(slug);
  
  if (!study) return <NotFound />;
  
  return (
    <article>
      <h1>{study.title}</h1>
      <p className="client">{study.client}</p>
      
      <section>
        <h2>Challenge</h2>
        <p>{study.challenge}</p>
      </section>
      
      <section>
        <h2>Approach</h2>
        <p>{study.approach}</p>
      </section>
      
      <section>
        <h2>Impact</h2>
        <p>{study.impact}</p>
      </section>
    </article>
  );
}
```

### Client Logos Wall
```tsx
import { getFeaturedClients } from '@/content';

export function LogosWall() {
  const clients = getFeaturedClients();
  
  return (
    <div className="logos-grid">
      {clients.map(client => (
        <div key={client.id} className="logo-item">
          <p>{client.name}</p>
          <span className="industry">{client.industry}</span>
        </div>
      ))}
    </div>
  );
}
```

### Footer Component
```tsx
import { getFooterColumns, getSocialLinks } from '@/content';

export function Footer() {
  const columns = getFooterColumns();
  const social = getSocialLinks();
  
  return (
    <footer>
      <div className="footer-columns">
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
      </div>
      
      <div className="social">
        {social.map(link => (
          <a key={link.platform} href={link.url} title={link.label}>
            {link.platform}
          </a>
        ))}
      </div>
    </footer>
  );
}
```

### FAQs Section
```tsx
import { getFAQsByCategory } from '@/content';

export function FAQSection() {
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

### Insights Grid
```tsx
import { getFeaturedInsights } from '@/content';

export function InsightsGrid() {
  const insights = getFeaturedInsights();
  
  return (
    <div className="grid">
      {insights.map(insight => (
        <article key={insight.id} className="insight-card">
          <h3>{insight.title}</h3>
          <p>{insight.excerpt}</p>
          <footer>
            <time>{insight.date}</time>
            <span>{insight.readTime}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}
```

### Ventures Showcase
```tsx
import { getSaaSProducts } from '@/content';

export function VenturesShowcase() {
  const products = getSaaSProducts();
  
  return (
    <section>
      {products.map(product => (
        <div key={product.id} className="venture">
          <h3>{product.name}</h3>
          <p className="tagline">{product.tagline}</p>
          <p>{product.description}</p>
          
          {product.features && (
            <ul>
              {product.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
          
          {product.url && (
            <a href={product.url} className="cta">Visit {product.name}</a>
          )}
        </div>
      ))}
    </section>
  );
}
```

## Type Safety

### Using Types in Components
```tsx
import type { ServiceArm, CaseStudy } from '@/content/types';
import { getServiceArms, getCaseStudy } from '@/content';

// Fully typed
const arms: ServiceArm[] = getServiceArms() as ServiceArm[];

// With optional
const study: CaseStudy | undefined = getCaseStudy('turbo');

// In props
interface ServiceCardProps {
  service: ServiceArm;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return <div>{service.title}</div>;
}
```

## Updates & Maintenance

### Adding New Content
1. Add data to relevant file (e.g., `src/content/home.ts`)
2. Update types in `types.ts` if needed
3. Add getter function
4. Export from `index.ts`
5. Use in components

### Changing Content
1. Update const data in relevant file
2. No component changes needed (same interface)
3. Content reflects everywhere automatically

### Migration to CMS
1. Create `src/content/adapters/cms-name/`
2. Implement same getter functions
3. Update import path in components:
   - From: `import { getX } from '@/content'`
   - To: `import { getX } from '@/content/adapters/sanity'`
4. All component code remains unchanged
