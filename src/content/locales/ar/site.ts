import type { NavLink, FooterColumn, SiteConfig } from "../../types";

export const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/what-we-do", label: "ما نقدمه" },
  { href: "/our-work", label: "أعمالنا" },
  { href: "/insights", label: "رؤى" },
  { href: "/ventures", label: "مشاريعنا" },
  { href: "/contact", label: "تواصل معنا" },
] as const satisfies readonly NavLink[];

export const footerColumns = [
  {
    title: "شركة موك",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "فلسفتنا", href: "/about#philosophy" },
      { label: "القيادة", href: "/about#leadership" },
      { label: "الوظائف", href: "/careers" },
    ],
  },
  {
    title: "ما نقدمه",
    links: [
      { label: "موك للإدارة", href: "/what-we-do#management" },
      { label: "موك للابتكار", href: "/what-we-do#innovations" },
      { label: "موك للتكنولوجيا", href: "/what-we-do#technologies" },
    ],
  },
  {
    title: "الرؤى",
    links: [
      { label: "المقالات", href: "/insights?category=articles" },
      { label: "الأبحاث", href: "/insights?category=research" },
      { label: "دراسات الحالة", href: "/our-work" },
    ],
  },
  {
    title: "تواصل",
    links: [
      { label: "اتصل بنا", href: "/contact" },
      { label: "لينكد إن", href: "https://linkedin.com/company/themokcompany", external: true },
      { label: "إنستغرام", href: "https://instagram.com/themokcompany", external: true },
    ],
  },
] as const satisfies readonly FooterColumn[];

export const socialLinks = [
  { platform: "LinkedIn", url: "https://linkedin.com/company/themokcompany", label: "تابعنا على لينكد إن" },
  { platform: "Instagram", url: "https://instagram.com/themokcompany", label: "تابعنا على إنستغرام" },
  { platform: "X", url: "https://x.com/themokcompany", label: "تابعنا على إكس" },
] as const;

export const siteConfig: SiteConfig = {
  name: "شركة موك",
  tagline: "إدارة. ابتكار. تكنولوجيا.",
  description:
    "شركة موك هي استشارية متكاملة تجمع بين الاستراتيجية وابتكار المنتجات وتنفيذ التكنولوجيا. نساعد المؤسسات على تحويل عملياتها، وتوسيع مشاريعها، وتحقيق ميزة تنافسية من خلال الاستشارات المتكاملة وبناء المشاريع.",
  email: "hello@themok.company",
  location: "دبي، الإمارات العربية المتحدة",
  social: [...socialLinks],
};

export const uiStrings = {
  brandInitial: "م",
  brandName: "شركة موك",
  ctaStartConversation: "ابدأ محادثة",
  ctaExploreWork: "استكشف أعمالنا",
  ctaViewAll: "عرض الكل",
  ctaLearnMore: "اعرف المزيد",
  ctaReadMore: "اقرأ المزيد",
  ctaViewCaseStudy: "عرض دراسة الحالة",
  ctaBackToWork: "→ العودة إلى أعمالنا",
  ctaBackToVentures: "→ العودة إلى المشاريع",
  ctaVisitWebsite: "زيارة الموقع",
  ctaApplyNow: "قدّم الآن",
  languageLabel: "اللغة",
  languageEnglish: "English",
  languageArabic: "العربية",
  footerRights: "جميع الحقوق محفوظة.",
  footerTagline: "إدارة. ابتكار. تكنولوجيا.",
  loadingLabel: "جارٍ التحميل…",
  menuOpen: "فتح القائمة",
  menuClose: "إغلاق القائمة",
  readMoreSuffix: "←",
};
