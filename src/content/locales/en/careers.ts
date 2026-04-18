import type { Position, HomeSection } from "../../types";

export const positions: readonly Position[] = [
  {
    id: "senior-full-stack",
    title: "Senior Full Stack Engineer",
    department: "The Mok Technologies",
    location: "Dubai",
    type: "Full-time",
    description:
      "Lead end-to-end engineering on enterprise platforms serving thousands of users. You'll own system architecture decisions, establish engineering standards, and mentor engineers on best practices. Strong foundation in modern web frameworks (Next.js, React), cloud platforms (AWS), and database design required. You have shipped production systems, made architectural tradeoffs, and can explain why.",
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "The Mok Innovations",
    location: "Dubai",
    type: "Full-time",
    description:
      "Build practical AI solutions that solve real business problems. Not academic research. You'll design and implement machine learning systems integrated into production applications, evaluate appropriate algorithms for business contexts, and optimize models for both performance and cost. Experience with PyTorch or TensorFlow, production ML pipelines, and working with real enterprise data is essential.",
  },
  {
    id: "strategy-consultant",
    title: "Strategy Consultant",
    department: "The Mok Management",
    location: "Dubai",
    type: "Full-time",
    description:
      "Work directly with enterprise leadership on digital transformation and competitive strategy. You'll diagnose organizational and operational challenges, develop strategic recommendations grounded in data, and guide implementation. Strong analytical skills, executive presence, and ability to communicate complex ideas clearly are critical. Industry experience in retail, finance, or automotive a plus.",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    department: "The Mok Innovations",
    location: "Dubai",
    type: "Full-time",
    description:
      "Own product strategy and delivery for our SaaS ventures. You'll work backwards from customer problems, define product direction, manage feature prioritization, and ship products that gain real customer adoption. Experience building B2B software, understanding enterprise buying cycles, and working with engineering and design teams at high velocity required.",
  },
  {
    id: "design-lead",
    title: "Senior Product Designer",
    department: "The Mok Innovations",
    location: "Dubai",
    type: "Full-time",
    description:
      "Lead product design across our digital products and platforms. You'll establish design vision and standards, conduct user research, design complex enterprise interfaces, and collaborate with product and engineering. Fluency in modern design tools, understanding of design systems, and ability to advocate for users in a product-driven environment required.",
  },
  {
    id: "devops-engineer",
    title: "DevOps & Infrastructure Engineer",
    department: "The Mok Technologies",
    location: "Dubai",
    type: "Full-time",
    description:
      "Design and operate cloud infrastructure supporting our enterprise applications and SaaS products. You'll architect for scalability, reliability, and cost efficiency, implement CI/CD pipelines, manage infrastructure as code, and ensure security and compliance. Strong AWS or GCP experience, container orchestration, and infrastructure automation required.",
  },
] as const;

export const cultureSection: HomeSection = {
  id: "culture",
  title: "What We Value",
  description:
    "We are a 360-degree consultancy that designs and builds technology. Our culture reflects that DNA: strategic thinking meets execution, theory meets practice, and ambition drives results.",
  items: [
    "Excellence over hustle: We value quality, thoughtfulness, and execution discipline over long hours",
    "Continuous learning: Industry changes fast. We invest in skill development, pay for conferences, and encourage exploration",
    "Ownership and impact: You own outcomes, not tasks. Work that matters, visible to leadership and customers",
    "Technical and strategic growth: Whether you code, consult, or design, you develop both depth and breadth",
    "Competitive compensation: Salaries reflect market rates and your contribution. Regular equity discussions",
    "Flexible arrangements: Work from our Dubai office, collaborate remotely, or hybrid. Results matter more than presence",
    "Direct access to leadership: Work with Mohamed and senior leadership on strategy and major decisions",
  ],
};
