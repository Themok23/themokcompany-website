import type { InsightArticle } from "../../types";

export const insights: readonly InsightArticle[] = [
  {
    id: "transformations-fail",
    slug: "why-digital-transformations-fail",
    title: "لماذا يفشل 90٪ من مشاريع التحول الرقمي (وكيف تكون ضمن الـ10٪ الناجحة)",
    excerpt:
      "تنهار معظم مشاريع التحول الرقمي ليس بسبب التحديات التقنية، بل بسبب اختلال التوازن بين الاستراتيجية والتنفيذ. قمنا بتحليل أكثر من 50 مشروع تحول مؤسسي، واستخلصنا العوامل الحاسمة التي تفصل الناجحين عن الفاشلين.",
    category: "thought-leadership",
    date: "2024-12-18",
    readTime: "11 دقائق",
    featured: true,
  },
  {
    id: "ai-strategy-wrong",
    slug: "the-ai-strategy-companies-get-wrong",
    title: "استراتيجية الذكاء الاصطناعي التي تخطئ فيها معظم الشركات",
    excerpt:
      "يلاحق قادة المؤسسات ضجيج الذكاء الاصطناعي بينما يغفلون عن الفرصة الحقيقية. يكشف هذا المقال ما يُحدث الفارق فعلاً: البدء بالمشكلات لا بالخوارزميات.",
    category: "thought-leadership",
    date: "2024-12-10",
    readTime: "9 دقائق",
    featured: true,
  },
  {
    id: "consultant-builder",
    slug: "from-consultant-to-builder-philosophy",
    title: "من الاستشاري إلى الصانع: فلسفة MOK",
    excerpt:
      "أهدرت وثائق الاستراتيجية قيمةً محتملة أكثر مما فعلته الأكواد الرديئة على الإطلاق. لماذا تخلّينا عن الاستشارات المجردة وبدأنا في البناء جنبًا إلى جنب مع عملائنا.",
    category: "articles",
    date: "2024-12-05",
    readTime: "10 دقائق",
    featured: true,
  },
  {
    id: "enterprise-ai-implementation",
    slug: "implementing-enterprise-ai-practical-guide",
    title: "تطبيق الذكاء الاصطناعي في المؤسسات: دليل عملي",
    excerpt:
      "تجاوزًا لنماذج إثبات المفهوم والبرامج التجريبية. الدليل الكامل لدمج الذكاء الاصطناعي الذي يُحقق نتائج أعمال قابلة للقياس دون الحاجة لاستبدال الأنظمة القائمة.",
    category: "articles",
    date: "2024-11-28",
    readTime: "13 دقيقة",
    featured: true,
  },
  {
    id: "digital-readiness",
    slug: "digital-readiness-assessment",
    title: "تقييم الجاهزية الرقمية الذي يُحدث الفارق فعلاً",
    excerpt:
      "تجاوز نماذج النضج العامة. بنينا إطارًا يحدد بدقة ما تحتاجه مؤسستك للتحول، وبأي ترتيب.",
    category: "research",
    date: "2024-11-15",
    readTime: "12 دقيقة",
    featured: false,
  },
  {
    id: "retail-transformation",
    slug: "retail-technology-transformation-2025",
    title: "تجارة التجزئة في 2025: التقنية والبيانات ومستقبل التجارة",
    excerpt:
      "لم تعد تجارة التجزئة مجرد نشاط منتجات أو خدمات. إنها نشاط بيانات وتجربة. كيف يستفيد الرواد من هذا التحول، ولماذا سيختفي المتأخرون.",
    category: "thought-leadership",
    date: "2024-11-08",
    readTime: "11 دقيقة",
    featured: false,
  },
  {
    id: "cloud-without-chaos",
    slug: "cloud-migration-without-chaos",
    title: "الانتقال السحابي دون فوضى: معمارية الانتقال التي تنجح",
    excerpt:
      "الفارق بين مشاريع الانتقال السحابي الناجحة والكوارث المكلفة هو انضباط الهندسة المعمارية. إليك الإطار الذي يُوفّر السرعة والاستقرار معًا.",
    category: "articles",
    date: "2024-10-30",
    readTime: "14 دقيقة",
    featured: false,
  },
  {
    id: "product-market-fit",
    slug: "finding-product-market-fit-enterprise",
    title: "تحقيق الملاءمة بين المنتج والسوق في الأسواق المؤسسية",
    excerpt:
      "دورات المبيعات المؤسسية طويلة وسلوك المشترين مختلف. يشرح هذا الدليل كيفية التحقق من طلب السوق وبناء منتجات تشتريها المؤسسات فعلاً.",
    category: "research",
    date: "2024-10-18",
    readTime: "10 دقائق",
    featured: false,
  },
] as const;
