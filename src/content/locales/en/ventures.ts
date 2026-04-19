import type { Venture, HomeSection } from "../../types";

export const saasProducts: readonly Venture[] = [
  {
    id: "mokerp",
    slug: "mokerp",
    name: "MOK ERP",
    tagline: "Operations Built for Scale",
    description:
      "MOK ERP is enterprise operations simplified. Purpose-built for growing companies that outgrew general-purpose platforms. Unified financial management, inventory control, supply chain visibility, and real-time dashboards from a single source of truth. No legacy debt. No implementation chaos. Pure operational efficiency.",
    status: "active",
    type: "saas",
    features: [
      "Integrated financial and accounting operations",
      "Real-time inventory and supply chain tracking",
      "Automated procurement and order management",
      "Multi-entity and multi-currency support",
      "Advanced reporting and business intelligence",
      "API-first architecture for seamless integrations",
      "Role-based access control and audit trails",
      "Cloud-native scalability and redundancy",
    ],
    url: "https://erp.themok.company",
  },
  {
    id: "mokbot",
    slug: "mokbot",
    name: "MokBot",
    tagline: "AI Assistant That Knows Your Business",
    description:
      "MokBot is the AI assistant built for enterprise operations. It understands your business context, your systems, and your workflows. Handle complex queries, automate routine tasks, and extract insights from operations data through natural conversation. AI that amplifies your team's capability without requiring them to learn a new tool.",
    status: "active",
    type: "saas",
    features: [
      "Enterprise-grade natural language understanding",
      "Workflow automation across connected systems",
      "Real-time data access and business intelligence",
      "Secure, authenticated system integration",
      "Custom model training on your data",
      "Audit logging and compliance reporting",
      "Multi-language support and localization",
      "Team collaboration and knowledge management",
    ],
    url: "https://mokbot.ai",
  },
  {
    id: "taggz",
    slug: "taggz",
    name: "Taggz",
    tagline: "Social Commerce That Converts",
    description:
      "Taggz transforms social media from a discovery channel into a revenue channel. Brands enable shoppable content directly from Instagram, TikTok, and other platforms, capturing purchase intent the moment it forms. Real-time analytics show exactly which social creators and content drive revenue. Taggz closes the gap between social engagement and actual sales.",
    status: "active",
    type: "saas",
    features: [
      "Multi-platform social media integration",
      "Shoppable content creation and management",
      "Creator marketplace and influencer management",
      "Real-time sales attribution and analytics",
      "Inventory sync and order fulfillment",
      "Multi-currency and multi-language support",
      "Community engagement and gamification tools",
      "Advanced ROI tracking and performance metrics",
    ],
    url: "https://taggz.com",
  },
  {
    id: "mok-insights",
    slug: "mok-insights",
    name: "MOK Insights",
    tagline: "Enterprise Data That Answers Questions",
    description:
      "MOK Insights connects to your enterprise data, learns your business logic, and becomes a self-service analytics engine for your team. No more waiting for data teams to build dashboards. Ask questions in plain language, get instant answers with proper context and confidence intervals. Turn raw data into business clarity.",
    status: "coming-soon",
    type: "saas",
    features: [
      "Multi-source data integration",
      "Natural language query interface",
      "Automated data quality and lineage tracking",
      "Contextual insights and anomaly detection",
      "Scheduled reporting and alerting",
      "Governance and data access controls",
      "Custom metric definition and tracking",
      "Predictive analytics and forecasting",
    ],
  },
  {
    id: "mok-workflow",
    slug: "mok-workflow",
    name: "MOK Workflow",
    tagline: "Complex Processes. Simplified.",
    description:
      "Enterprise processes are inherently complex. MOK Workflow handles that complexity without requiring custom development. Design, automate, and manage workflows that span multiple systems, teams, and decision points. Visibility, auditability, and control without the engineering overhead.",
    status: "stealth",
    type: "saas",
    features: [
      "Visual workflow designer for non-technical users",
      "Advanced conditional logic and branching",
      "Multi-step approval and routing workflows",
      "Integration with existing enterprise systems",
      "Real-time workflow monitoring and analytics",
      "Audit trails and compliance tracking",
      "Scalable to thousands of concurrent workflows",
      "API access for programmatic control",
    ],
  },
] as const;

export const innovationLab: HomeSection = {
  id: "innovation-lab",
  title: "The MOK Innovation Lab",
  description:
    "This is where we explore the future of enterprise software. We research emerging technologies, incubate experimental products, and push boundaries on what's possible. Every MOK venture started here, validated through real customer use cases, and proven in market before launch.",
  items: [
    "Advanced AI and machine learning for enterprise problems",
    "Emerging technology research and evaluation",
    "Product-market fit validation with real customers",
    "Open-source contributions to the community",
    "Industry partnerships and thought leadership",
    "Venture incubation and scaling playbooks",
  ],
};
