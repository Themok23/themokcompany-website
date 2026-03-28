import type { CaseStudy, ClientLogo } from "./types";

const caseStudies: readonly CaseStudy[] = [
  {
    id: "raya-cx",
    slug: "raya-cx",
    client: "Raya CX",
    category: "Transformation",
    title: "Transforming BPO Operations: From Legacy to AI-Driven CX",
    description:
      "Comprehensive digital and operational transformation for a leading business process outsourcing provider handling millions of customer interactions annually.",
    challenge:
      "Fragmented legacy systems, manual workflows, inconsistent service quality across regions, inability to meet SLA targets, and escalating operational costs.",
    approach:
      "Conducted full-scale operational and technology audit, designed unified customer experience architecture, selected and integrated modern contact center platform, established AI-assisted quality monitoring.",
    execution:
      "Phased implementation across three regional centers over six months. Change management and agent training embedded from day one.",
    impact:
      "40% improvement in customer satisfaction scores, 35% reduction in operational costs per interaction, 50% faster average resolution time, 98% SLA achievement.",
    featured: true,
  },
  {
    id: "turbo",
    slug: "turbo",
    client: "Turbo",
    category: "Platform",
    title: "Building an Automotive Marketplace: MVP to 2M Transactions",
    description:
      "Architected and launched a comprehensive digital marketplace transforming automotive commerce from fragmented listings to integrated ecosystem.",
    challenge:
      "Fragmented automotive market lacked transparent pricing, integrated logistics, secure payment mechanisms, and multi-party trust framework.",
    approach:
      "Designed two-sided marketplace architecture, built mobile-first buyer and seller platforms, integrated payments and logistics partnerships, established trust and dispute resolution mechanisms.",
    execution:
      "MVP launch in 12 weeks with core functionality. Scaled platform infrastructure to handle 50K concurrent users. Expanded to three countries within 18 months.",
    impact:
      "2M transactions in year one, 15% market share in launch region, 95% transactional success rate, $50M+ GMV, platform now independent venture.",
    featured: true,
  },
  {
    id: "wiki-food",
    slug: "wiki-food",
    client: "Wiki Food",
    category: "Venture",
    title: "From Idea to Series A: Food-Tech Platform Launch and Scale",
    description:
      "End-to-end support launching a food-tech marketplace from concept validation through Series A funding and market expansion.",
    challenge:
      "Founders had validated market demand but lacked execution roadmap, technical infrastructure, operational processes, and investor-readiness positioning.",
    approach:
      "Developed go-to-market strategy grounded in customer research, built core platform (supply management, fulfillment, customer acquisition), established operational playbooks, prepared investor materials.",
    execution:
      "Product launched 16 weeks after engagement. Scaled team from 3 to 25. Established market presence across initial city. Secured Series A funding at profitable unit economics.",
    impact:
      "Series A funding raised at 3x valuation, reached profitability in month 18, expanded to two additional cities, 5K+ daily active users, healthy unit economics demonstrating market viability.",
    featured: true,
  },
  {
    id: "al-nasser",
    slug: "al-nasser",
    client: "Al Nasser",
    category: "AI",
    title: "Retail Modernization: AI-Driven Operations Across 15 Locations",
    description:
      "Implemented comprehensive AI and automation strategy across multi-location retail operations, optimizing inventory, supply chain, and customer experience.",
    challenge:
      "Manual inventory management across locations, inefficient supply chain visibility, stockouts and overstock conditions, lack of personalization in customer experience.",
    approach:
      "Deployed predictive inventory analytics, automated replenishment across locations, implemented computer vision for shelf monitoring, built customer intelligence platform for personalization.",
    execution:
      "Phased rollout starting with two pilot locations, expanded to 15 locations over eight months. Embedded change management and staff training.",
    impact:
      "30% reduction in stockouts, 25% decrease in excess inventory (direct cost savings), 40% improvement in personalization accuracy, 15% increase in customer basket size, improved inventory turnover ratio.",
    featured: true,
  },
  {
    id: "raya-brand-portal",
    slug: "raya-brand-portal",
    client: "Raya Holding",
    category: "Brand",
    title: "Enterprise Brand Platform: Unified Brand Management Across Portfolio",
    description:
      "Designed and built a centralized brand management platform for a diversified holding company managing multiple brands and subsidiaries.",
    challenge:
      "Fragmented brand governance across 8+ subsidiaries, inconsistent brand application, inefficient approval workflows, lack of unified brand asset management.",
    approach:
      "Designed centralized brand governance model, built digital brand asset library with version control, implemented approval workflow automation, created brand guidelines enforcement system.",
    execution:
      "Platform launched with 3 major brands, integrated workflow and approval system, trained teams across subsidiaries.",
    impact:
      "80% faster brand asset delivery, 100% brand guideline compliance, reduced approval cycle from 5 days to 1 day, unified digital asset library serving 8 subsidiaries.",
    featured: true,
  },
  {
    id: "luxury-retail",
    slug: "luxury-retail-omnichannel",
    client: "Premium Retail Partner",
    category: "Retail",
    title: "Luxury Retail: Omnichannel Platform for Premium Customer Experience",
    description:
      "Built omnichannel experience platform for luxury retail operator integrating online, mobile, and in-store experiences.",
    challenge:
      "Disjointed online and offline experiences, legacy systems preventing unified customer view, inventory visibility across channels was fragmented.",
    approach:
      "Unified customer data platform, rebuilt mobile app with premium UX, integrated inventory systems across all channels, implemented personalization engine.",
    execution:
      "Launched integrated mobile and web experience, connected in-store systems within 12 weeks.",
    impact:
      "25% increase in mobile conversion, 35% improvement in repeat purchase rate, unified customer view enabling personalization, inventory accuracy across channels improved to 99%.",
    featured: false,
  },
  {
    id: "financial-services",
    slug: "fintech-platform",
    client: "Regional Fintech",
    category: "Finance",
    title: "Fintech Platform: Building Trust Through Technology",
    description:
      "Architected and launched a financial services platform emphasizing security, compliance, and user trust.",
    challenge:
      "Building regulated fintech platform with stringent compliance requirements while maintaining user-friendly experience.",
    approach:
      "Designed security-first architecture, implemented comprehensive compliance framework (KYC, AML), built transparent transaction tracking.",
    execution:
      "Launched regulated platform with full compliance certification within 6 months.",
    impact:
      "Zero compliance violations, 50K users within first year, 99.9% platform uptime, 98% customer trust rating in satisfaction surveys.",
    featured: false,
  },
  {
    id: "logistics-transformation",
    slug: "logistics-optimization",
    client: "Regional Logistics Operator",
    category: "Operations",
    title: "Logistics Optimization: Data-Driven Route and Fleet Management",
    description:
      "Implemented comprehensive logistics optimization through data analytics and automation.",
    challenge:
      "Inefficient routing, poor fleet utilization, delayed deliveries, manual dispatch processes, inability to handle peak demand periods.",
    approach:
      "Built route optimization engine using real-time traffic data, implemented fleet tracking and management system, automated dispatch with AI-assisted decision support.",
    execution:
      "System integration and rollout across 500+ vehicle fleet within 4 months.",
    impact:
      "18% reduction in fuel costs, 22% improvement in on-time delivery, 25% increase in deliveries per vehicle, automation of 80% of dispatch decisions.",
    featured: false,
  },
  {
    id: "healthcare-digital",
    slug: "healthcare-platform",
    client: "Healthcare Provider Network",
    category: "Healthcare",
    title: "Healthcare Platform: Patient-Centric Digital Experience",
    description:
      "Designed and built patient engagement and care coordination platform for multi-facility healthcare provider.",
    challenge:
      "Fragmented patient records across facilities, poor patient engagement, limited appointment availability visibility, manual care coordination.",
    approach:
      "Unified patient data platform, built patient engagement app with appointment booking and telemedicine, implemented care coordination workflows.",
    execution:
      "Deployed across 5 facilities serving 200K patients within 8 months.",
    impact:
      "40% increase in patient engagement, 30% reduction in no-show rates, improved care coordination efficiency, 92% patient satisfaction with digital experience.",
    featured: false,
  },
  {
    id: "manufacturing-iot",
    slug: "manufacturing-iot",
    client: "Industrial Manufacturing",
    category: "Manufacturing",
    title: "Manufacturing 4.0: IoT and Predictive Maintenance",
    description:
      "Transformed manufacturing operations through IoT deployment and predictive maintenance powered by machine learning.",
    challenge:
      "Unexpected equipment failures causing production downtime, manual maintenance scheduling, inability to optimize production throughput.",
    approach:
      "Deployed IoT sensors across production lines, built predictive maintenance model, created real-time production monitoring dashboard.",
    execution:
      "IoT rollout across main production facility, trained maintenance team on predictive maintenance approach.",
    impact:
      "35% reduction in unplanned downtime, 40% improvement in equipment maintenance efficiency, 15% increase in production throughput, ROI achieved in 14 months.",
    featured: false,
  },
] as const;

const clientLogos: readonly ClientLogo[] = [
  {
    id: "raya-cx",
    name: "Raya CX",
    industry: "Business Services",
    featured: true,
  },
  {
    id: "turbo",
    name: "Turbo",
    industry: "Automotive",
    featured: true,
  },
  {
    id: "wiki-food",
    name: "Wiki Food",
    industry: "Food Tech",
    featured: true,
  },
  {
    id: "al-nasser",
    name: "Al Nasser",
    industry: "Retail",
    featured: true,
  },
  {
    id: "raya-holding",
    name: "Raya Holding",
    industry: "Diversified",
    featured: true,
  },
  {
    id: "taggz",
    name: "Taggz",
    industry: "Social Commerce",
    featured: true,
  },
  {
    id: "luxury-retail",
    name: "Premium Retail Group",
    industry: "Luxury Retail",
    featured: false,
  },
  {
    id: "fintech-partner",
    name: "Regional Fintech",
    industry: "Finance",
    featured: false,
  },
  {
    id: "logistics",
    name: "Regional Logistics",
    industry: "Logistics",
    featured: false,
  },
  {
    id: "healthcare",
    name: "Healthcare Provider Network",
    industry: "Healthcare",
    featured: false,
  },
] as const;

export function getCaseStudies(): readonly CaseStudy[] {
  return caseStudies;
}

export function getFeaturedCaseStudies(): readonly CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  const study = caseStudies.find((cs) => cs.slug === slug);
  return study ? { ...study } : undefined;
}

export function getClientLogos(): readonly ClientLogo[] {
  return clientLogos;
}

export function getFeaturedClients(): readonly ClientLogo[] {
  return clientLogos.filter((cl) => cl.featured);
}
