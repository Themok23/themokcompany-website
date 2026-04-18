"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { getVenture, getVentures } from "@/content/ventures";
import { useLocale } from "@/i18n/useLocale";

const productImages = ["tech.jpg", "innovation.jpg", "analytics.jpg", "strategy.jpg", "workspace.jpg"];

export default function VentureClient({ slug }: { slug: string }) {
  const locale = useLocale();
  const venture = getVenture(locale, slug);
  const allVentures = getVentures(locale);
  const currentIndex = allVentures.findIndex((v) => v.slug === slug);
  const imageFile = productImages[currentIndex >= 0 ? currentIndex % productImages.length : 0];

  const featuresRef = useGsapReveal({ duration: 0.6, delay: 0.1, stagger: 0.05 });

  const ventureHref = `/${locale}/ventures`;
  const backLabel = locale === "ar" ? "العودة إلى المشاريع" : "Back to Ventures";

  if (!venture) {
    return (
      <div className="w-full text-white min-h-screen flex items-center justify-center relative z-[1]">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4 font-heading">
            {locale === "ar" ? "المشروع غير موجود" : "Venture Not Found"}
          </h1>
          <Link href={ventureHref} className="text-primary hover:text-white transition-colors">
            {backLabel}
          </Link>
        </div>
      </div>
    );
  }

  const prevVenture = currentIndex > 0 ? allVentures[currentIndex - 1] : null;
  const nextVenture = currentIndex < allVentures.length - 1 ? allVentures[currentIndex + 1] : null;

  const statusLabels = locale === "ar"
    ? { active: "نشط", launched: "مُطلق", "coming-soon": "قريباً", stealth: "قيد الإعداد" } as const
    : { active: "Active", launched: "Launched", "coming-soon": "Coming Soon", stealth: "Stealth" } as const;
  const statusLabel = statusLabels[venture.status];

  return (
    <div className="w-full text-white min-h-screen overflow-x-hidden relative z-[1]">
      <section className="pt-40 pb-12 md:pt-48 md:pb-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link href={ventureHref} className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
            {backLabel}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#00C4AF]/10 text-primary text-xs font-semibold rounded-full font-heading">
              {statusLabel}
            </span>
            <span className="px-3 py-1 bg-[#1F2733] text-muted text-xs font-semibold rounded-full capitalize font-heading">
              {venture.type}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-4 font-heading">
            {venture.name}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-6 font-heading">
            {venture.tagline}
          </p>
          <p className="text-lg text-muted max-w-3xl leading-relaxed font-body">
            {venture.description}
          </p>
          {venture.url && (
            <a href={venture.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold rounded-lg hover:bg-[#00C4AF]/90 transition-colors btn-glow font-heading">
              {locale === "ar" ? "زيارة المنصة" : "Visit Platform"}
              <ArrowUpRight className="w-5 h-5 rtl:-scale-x-100" />
            </a>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image src={venture.image || `/images/${imageFile}`} alt={venture.name} fill className="object-cover img-tint" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {venture.features && venture.features.length > 0 && (
        <section className="px-6 lg:px-8 pb-24 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm uppercase tracking-widest text-primary mb-8 font-semibold font-heading">
              {locale === "ar" ? "الميزات الرئيسية" : "Key Features"}
            </h2>
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {venture.features.map((feature, idx) => (
                <div key={idx} data-reveal className="flex items-start gap-4 p-5 border border-border rounded-lg bg-surface/40 hover:border-[#00C4AF]/30 transition-colors">
                  <Check className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <p className="text-[#C8D6E5] font-body">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-border py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {prevVenture ? (
            <Link href={`/${locale}/ventures/${prevVenture.slug}`} className="group flex items-center gap-3 text-muted hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#5A6B80] font-heading">{locale === "ar" ? "السابق" : "Previous"}</p>
                <p className="font-medium font-heading">{prevVenture.name}</p>
              </div>
            </Link>
          ) : <div />}
          {nextVenture ? (
            <Link href={`/${locale}/ventures/${nextVenture.slug}`} className="group flex items-center gap-3 text-muted hover:text-white transition-colors text-right">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#5A6B80] font-heading">{locale === "ar" ? "التالي" : "Next"}</p>
                <p className="font-medium font-heading">{nextVenture.name}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:-scale-x-100" />
            </Link>
          ) : <div />}
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8 bg-surface/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-heading">
            {locale === "ar" ? "مهتم بهذا المشروع؟" : "Interested in this venture?"}
          </h2>
          <a href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold hover:bg-[#00C4AF]/90 transition-colors rounded-lg btn-glow font-heading">
            {locale === "ar" ? "تواصل معنا" : "Get in Touch"}
            <ArrowUpRight className="w-5 h-5 rtl:-scale-x-100" />
          </a>
        </div>
      </section>
    </div>
  );
}
