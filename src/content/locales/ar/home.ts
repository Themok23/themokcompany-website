import type { HeroContent, HomeSection } from "../../types";

export const homeHero: HeroContent = {
  title: "نبني ما هو قادم.",
  subtitle:
    "استشارات استراتيجية. ابتكار تسويقي. تنفيذ تكنولوجي. كل ذلك تحت سقف واحد.",
  ctas: [
    { label: "استكشف أعمالنا", href: "/our-work", variant: "primary" },
    { label: "ابدأ محادثة", href: "/contact", variant: "secondary" },
  ],
};

export const whoWeAre: HomeSection = {
  id: "who-we-are",
  title: "الاستراتيجية بدون تنفيذ مجرد نظرية.",
  description:
    "شركة موك هي استشارية متكاملة في الإدارة والعلامة التجارية والتكنولوجيا، صُممت للشركات الطموحة.",
  items: [
    "وضوح استراتيجي",
    "تفكير إبداعي",
    "ابتكار تسويقي",
    "تنفيذ تشغيلي",
  ],
};

export const homeArms: HomeSection = {
  id: "what-we-do",
  title: "مبنية للتعقيد. مصممة للنمو.",
  description: "ثلاثة أذرع متكاملة تقدم حلولاً من البداية إلى النهاية.",
  items: [
    "موك للإدارة — الاستراتيجية والاستشارات",
    "موك للابتكار — الذكاء الاصطناعي وتطوير المنتجات",
    "موك للتكنولوجيا — الويب والتطبيقات والبنية التحتية",
  ],
};

export const whyMok: HomeSection = {
  id: "why-mok",
  title: "مختلفون في التكوين.",
  description:
    "معظم الاستشاريين ينصحون. قلة ينفّذون. ونادرون من يجمعون بين الاثنين بتميز.",
  items: [
    "مبدعون في جوهرنا.",
    "منفّذون بالانضباط.",
    "شركاء بالالتزام.",
  ],
};

export const audience: HomeSection = {
  id: "who-we-work-with",
  title: "للطموحين.",
  description: "إذا كان النمو هو أجندتك، فنحن شريكك.",
  items: [
    "الشركات الناشئة في مرحلة التوسع",
    "الشركات الكبرى الراسخة",
    "شركات الاستثمار",
    "الشركات متعددة الجنسيات الداخلة في مرحلة التحول",
  ],
};

export const homeCTA: HeroContent = {
  title: "جاهز لبناء ما هو قادم؟",
  subtitle: "لنبدأ محادثة حول نموك.",
  ctas: [{ label: "ابدأ محادثة", href: "/contact", variant: "primary" }],
};
