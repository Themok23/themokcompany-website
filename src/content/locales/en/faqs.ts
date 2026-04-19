import type { FAQ } from "../../types";

export const faqs: readonly FAQ[] = [
  {
    id: "what-makes-mok-different",
    question: "What makes The Mok Company different from other consulting firms?",
    answer:
      "We don't advise from the sidelines. Our three arms The Mok Management, The Mok Innovations, and The Mok Technologies work together on every engagement. We bring strategy expertise, product thinking, and technical execution capability to the same table. Most consultants hand off execution to others; we own outcomes. We've also built and scaled our own SaaS ventures, so we understand what actually works in practice, not just theory.",
    category: "company",
  },
  {
    id: "why-three-arms",
    question: "Why do you operate as three separate arms?",
    answer:
      "Strategy without execution is theory. Execution without strategy is chaos. Product without technical foundation is vaporware. Technology without business alignment is waste. We organized around these realities. The Mok Management handles strategy and organizational design. The Mok Innovations incubates products and AI solutions. The Mok Technologies builds platforms and infrastructure. They work in parallel, not sequentially, so your transformation moves at the pace of execution, not advisory.",
    category: "company",
  },
  {
    id: "industries-we-serve",
    question: "Which industries do you specialize in?",
    answer:
      "We have deep, proven expertise in retail, finance, and automotive. But our approach works across industries. What matters is your commitment to transformation and willingness to partner for genuine impact. Our largest clients span telecom, healthcare, logistics, and manufacturing. Our methodologies are industry-agnostic; what varies is context and constraints.",
    category: "services",
  },
  {
    id: "when-to-engage",
    question: "When should we engage The Mok Company?",
    answer:
      "Engage when you face strategic challenges that require integrated thinking: launching new digital platforms, transforming operations at scale, building new ventures, or scaling existing products. Early is better than late. A discovery call costs nothing and clarifies whether this is the right fit. We're also honest when you'd be better served elsewhere.",
    category: "services",
  },
  {
    id: "your-ventures",
    question: "Do you benefit from clients adopting your own SaaS products?",
    answer:
      "No. Our ventures MOK ERP, MokBot, Taggz exist as independent businesses. Some clients use them, most don't. We recommend tools and approaches based on what solves your problem best, not what generates revenue for us. Our reputation depends on outcomes, not product adoption. That alignment matters.",
    category: "services",
  },
  {
    id: "pricing-structure",
    question: "How do you price engagements?",
    answer:
      "We use three models: Fixed-price for defined deliverables (strategy, architecture, product launch). Time-and-materials for exploratory work where scope isn't pre-defined. Retainer for ongoing advisory or product leadership. We're transparent about costs upfront and estimate conservatively. Quality work isn't cheap, but it delivers returns that exceed investment.",
    category: "pricing",
  },
  {
    id: "implementation-timeline",
    question: "How long do transformations take?",
    answer:
      "Strategy discovery and architecture: 2-4 months. Product development and launch: 6-12 months depending on complexity. Organizational transformation: 12-24 months. What matters isn't speed; it's sustainable, measurable results. We have clients in all phases, and we manage timelines with discipline. We also flag unrealistic expectations upfront.",
    category: "timeline",
  },
  {
    id: "engagement-process",
    question: "Walk us through how engagement works.",
    answer:
      "Discovery: 2-3 weeks of interviews, analysis, assessment. Architecture: We design solutions across strategy, product, and technology, presenting recommendations and tradeoffs. Execution: Phased implementation with clear milestones, weekly visibility, and course correction as needed. Enablement: We transfer knowledge to your team, build capability, and exit when you can operate independently. Throughout, we measure against agreed KPIs.",
    category: "process",
  },
  {
    id: "team-and-credentials",
    question: "Who leads client engagements?",
    answer:
      "Mohamed Mokhtar, founder, leads strategy engagements. Our team includes architects, engineers with 10+ years experience, product leaders from scaled ventures, and strategy consultants with industry background. We hire for expertise and track record, not credentials. Everyone on your engagement has shipped products or solved comparable problems before.",
    category: "team",
  },
  {
    id: "technology-approach",
    question: "What's your technology philosophy?",
    answer:
      "We're technology-agnostic. We choose tools and approaches based on your requirements, not our preferences. Modern frameworks (Next.js, React, Python, Go), cloud platforms (AWS, GCP, Azure), and open-source stacks we have deep experience with all. We also pragmatically work with legacy systems when modernization isn't the right move. Our job is to architect solutions that solve your problem, not use the trendy tech.",
    category: "technology",
  },
  {
    id: "getting-started",
    question: "How do we get started?",
    answer:
      "Send an email to hello@themok.company with a brief overview: What challenge are you facing? What outcomes matter? A 30-minute discovery call follows. We'll assess fit and next steps. No pressure. If we think you'd be better served elsewhere, we'll say so. The call is free and usually clarifies whether MOK is the right partner.",
    category: "process",
  },
  {
    id: "post-engagement",
    question: "What happens after the engagement ends?",
    answer:
      "We don't hand off and disappear. By engagement's end, your team owns the strategy, the product, the technology. You have internal capability and processes to scale independently. Many clients maintain ongoing advisory relationships. Some use our ventures or technologies. All have access to our team for questions. We build partnerships, not one-off projects.",
    category: "partnership",
  },
] as const;
