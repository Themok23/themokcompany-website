"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useGsapReveal } from "@/lib/gsapUtils";
import { getCaseStudy, getCaseStudies } from "@/content/portfolio";

const caseImages = ["collaboration.jpg", "meeting.jpg", "teamwork.jpg", "workspace.jpg", "analytics.jpg", "consulting.jpg"];

export default function CaseStudyClient({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const allStudies = getCaseStudies();
  const currentIndex = allStudies.findIndex((s) => s.slug === slug);
  const imageFile = caseImages[currentIndex >= 0 ? currentIndex % caseImages.length : 0];

  const contentRef = useGsapReveal({ duration: 0.8, delay: 0.1, stagger: 0.1 });

  if (!study) {
    return (
      <div className="w-full text-white min-h-screen flex items-center justify-center relative z-[1]">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4 font-heading">Case Study Not Found</h1>
          <Link href="/our-work" className="text-primary hover:text-white transition-colors">
            Back to Our Work
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { label: "Challenge", content: study.challenge },
    { label: "Approach", content: study.approach },
    { label: "Execution", content: study.execution },
    { label: "Impact", content: study.impact },
  ];

  const prevStudy = currentIndex > 0 ? allStudies[currentIndex - 1] : null;
  const nextStudy = currentIndex < allStudies.length - 1 ? allStudies[currentIndex + 1] : null;

  return (
    <div className="w-full text-white min-h-screen overflow-x-hidden relative z-[1]">
      <section className="pt-40 pb-12 md:pt-48 md:pb-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Our Work
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#00C4AF]/10 text-primary text-xs font-semibold rounded-full font-heading">
              {study.category}
            </span>
            {study.featured && (
              <span className="px-3 py-1 bg-[#1F2733] text-muted text-xs font-semibold rounded-full font-heading">
                Featured
              </span>
            )}
          </div>
          <p className="text-muted text-sm mb-2 font-body">{study.client}</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6 font-heading">
            {study.title}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed font-body">
            {study.description}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={study.image || `/images/${imageFile}`}
              alt={study.title}
              fill
              className="object-cover img-tint"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-24">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sections.map((s) => (
              <div key={s.label} data-reveal className="border-t border-border pt-8">
                <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold font-heading">
                  {s.label}
                </h2>
                <p className="text-[#C8D6E5] leading-relaxed font-body">
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {prevStudy ? (
            <Link href={`/our-work/${prevStudy.slug}`} className="group flex items-center gap-3 text-muted hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#5A6B80] font-heading">Previous</p>
                <p className="font-medium font-heading">{prevStudy.client}</p>
              </div>
            </Link>
          ) : <div />}
          {nextStudy ? (
            <Link href={`/our-work/${nextStudy.slug}`} className="group flex items-center gap-3 text-muted hover:text-white transition-colors text-right">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#5A6B80] font-heading">Next</p>
                <p className="font-medium font-heading">{nextStudy.client}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </section>

      <section className="border-t border-border py-16 px-6 lg:px-8 bg-surface/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 font-heading">
            Ready to transform your business?
          </h2>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C4AF] text-[#111318] font-semibold hover:bg-[#00C4AF]/90 transition-colors rounded-lg btn-glow font-heading">
            Start a Conversation
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
