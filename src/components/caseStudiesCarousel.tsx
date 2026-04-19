'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCaseStudies } from '@/content/portfolio';
import { useLocale } from '@/i18n/useLocale';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_COLORS: Record<string, string> = {
  Transformation: '#00C4AF',
  Platform: '#00A8FF',
  Venture: '#2DD4BF',
  AI: '#00C4AF',
  Brand: '#9B59B6',
  Retail: '#E67E22',
  Finance: '#3498DB',
  Operations: '#1ABC9C',
  Healthcare: '#E74C3C',
  Manufacturing: '#F39C12',
};

export default function CaseStudiesCarousel() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const csSectionRef = useRef<HTMLDivElement>(null);
  const csHeadingRef = useRef<HTMLDivElement>(null);
  const csTrackRef = useRef<HTMLDivElement>(null);
  const csCardsRef = useRef<(HTMLElement | null)[]>([]);
  const csProgressRef = useRef<HTMLDivElement>(null);
  const [csProgress, setCsProgress] = useState(0);

  const onCsScroll = useCallback(() => {
    const track = csTrackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    setCsProgress(track.scrollLeft / maxScroll);
  }, []);

  const csScrollBy = useCallback((direction: 'left' | 'right') => {
    const track = csTrackRef.current;
    if (!track) return;
    const cardWidth = 396;
    const amount = direction === 'right' ? cardWidth : -cardWidth;
    track.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  const onCsProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const track = csTrackRef.current;
    const bar = csProgressRef.current;
    if (!track || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: ratio * maxScroll, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = csTrackRef.current;
    if (!track) return;
    track.addEventListener('scroll', onCsScroll, { passive: true });
    return () => track.removeEventListener('scroll', onCsScroll);
  }, [onCsScroll]);

  // GSAP scroll-triggered reveals
  useEffect(() => {
    if (!csSectionRef.current) return;

    const ctx = gsap.context(() => {
      if (csHeadingRef.current) {
        gsap.fromTo(csHeadingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: csSectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      csCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: csSectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
          }
        );
      });

      if (csProgressRef.current?.parentElement) {
        gsap.fromTo(csProgressRef.current.parentElement,
          { opacity: 0, y: 10 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            scrollTrigger: { trigger: csSectionRef.current, start: 'top 65%', toggleActions: 'play none none none' },
          }
        );
      }
    }, csSectionRef);

    return () => ctx.revert();
  }, []);

  const studies = getCaseStudies(locale).slice(0, 8);
  const workHref = `/${locale}/our-work`;

  return (
    <section ref={csSectionRef} data-section="case-studies" className="cs-section relative py-32 overflow-hidden">
      {/* Ambient section glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#00C4AF]/20 to-transparent" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#00C4AF]/[0.02] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#00A8FF]/[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Section header */}
      <div ref={csHeadingRef} className="cs-header relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-14">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="cs-eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 mb-3 font-heading">
              {isAr ? 'أعمالنا' : 'Portfolio'}
            </p>
            <h2 className="cs-title text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-heading">
              {isAr ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] to-[#00A8FF]">أعمالنا</span>
                </>
              ) : (
                <>
                  Our{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] to-[#00A8FF]">
                    Work
                  </span>
                </>
              )}
            </h2>
            <p className="cs-subtitle text-lg text-muted max-w-xl leading-relaxed">
              {isAr ? 'نتائج ملموسة لشركات طموحة.' : 'Real results for ambitious companies.'}
            </p>
          </div>

          {/* Desktop nav arrows + View All */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => csScrollBy('left')}
              className="cs-arrow-btn w-11 h-11 rounded-full border border-border/80 flex items-center justify-center hover:border-[#00C4AF]/60 hover:bg-[#00C4AF]/10 transition-all duration-300 backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} className="text-muted" />
            </button>
            <button
              onClick={() => csScrollBy('right')}
              className="cs-arrow-btn w-11 h-11 rounded-full border border-border/80 flex items-center justify-center hover:border-[#00C4AF]/60 hover:bg-[#00C4AF]/10 transition-all duration-300 backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} className="text-muted" />
            </button>
            <Link
              href={workHref}
              className="cs-view-all inline-flex items-center gap-2 px-6 py-3 border border-border/80 rounded-lg font-semibold text-sm hover:bg-surface/40 transition-colors duration-300 whitespace-nowrap btn-glow-outline ms-2"
            >
              {isAr ? 'عرض الكل' : 'View All'}
              <ArrowRight size={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={csTrackRef}
        data-lenis-prevent
        className="cs-track relative z-10 flex gap-5 overflow-x-auto pl-6 sm:pl-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-8 pb-4 scrollbar-hide select-none"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {studies.map((study, index) => {
          const accentColor = CATEGORY_COLORS[study.category] || '#00C4AF';

          return (
            <Link
              key={study.id}
              href={`${workHref}#${study.slug}`}
              ref={(el) => { if (el) csCardsRef.current[index] = el; }}
              className="cs-card group flex-shrink-0 w-[320px] sm:w-[380px] rounded-2xl border border-border/50 bg-gradient-to-b from-[#12151B]/90 to-[#0E1016]/90 backdrop-blur-md hover:border-[#00C4AF]/30 hover:shadow-[0_8px_40px_rgba(0,196,175,0.06)] transition-all duration-500 overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Top accent gradient bar */}
              <div className="cs-card-accent h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${accentColor}80, ${accentColor}20, transparent)` }} />

              <div className="cs-card-body p-7">
                {/* Category + Client row */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="cs-card-category inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border font-heading"
                    style={{ color: accentColor, borderColor: `${accentColor}25`, backgroundColor: `${accentColor}08` }}
                  >
                    {study.category}
                  </span>
                  <span className="cs-card-client text-[11px] text-muted/50 font-medium">{study.client}</span>
                </div>

                {/* Title */}
                <h3 className="cs-card-title text-lg font-bold text-white mb-3 leading-snug font-heading group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {study.title}
                </h3>

                {/* Description */}
                <p className="cs-card-desc text-sm text-muted/80 mb-7 leading-relaxed line-clamp-3">
                  {study.description}
                </p>

                {/* Impact section */}
                <div className="cs-card-impact border-t border-border/40 pt-4">
                  <p className="text-[10px] text-muted/40 uppercase tracking-[0.15em] mb-2 font-heading font-semibold">{isAr ? 'الأثر' : 'Impact'}</p>
                  <p className="text-sm text-white/70 leading-relaxed line-clamp-2">{study.impact}</p>
                </div>

                {/* Arrow */}
                <div className="mt-6 flex justify-end">
                  <div className="cs-card-arrow w-9 h-9 rounded-full border border-border/60 flex items-center justify-center group-hover:border-[#00C4AF]/50 group-hover:bg-[#00C4AF]/10 group-hover:shadow-[0_0_12px_rgba(0,196,175,0.15)] transition-all duration-300">
                    <ArrowUpRight size={14} className="text-muted group-hover:text-primary transition-colors duration-300 rtl:-scale-x-100" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* View More card */}
        <Link
          href={workHref}
          ref={(el) => { if (el) csCardsRef.current[studies.length] = el; }}
          className="cs-card-more group flex-shrink-0 w-[240px] rounded-2xl border border-border/40 bg-gradient-to-b from-[#12151B]/60 to-[#0E1016]/60 backdrop-blur-md hover:border-[#00C4AF]/30 transition-all duration-500 flex flex-col items-center justify-center text-center me-8"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="w-14 h-14 rounded-full border-2 border-[#00C4AF]/20 flex items-center justify-center mb-5 group-hover:border-[#00C4AF]/60 group-hover:bg-[#00C4AF]/10 group-hover:shadow-[0_0_20px_rgba(0,196,175,0.12)] transition-all duration-300">
            <ArrowRight size={22} className="text-primary rtl:-scale-x-100" />
          </div>
          <p className="text-base font-bold text-white mb-1 font-heading">{isAr ? 'عرض الكل' : 'View All'}</p>
          <p className="text-sm text-muted/60">{isAr ? 'الأعمال كاملة' : 'Full portfolio'}</p>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="cs-progress-wrap relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-10">
        <div className="flex items-center gap-4">
          <div
            ref={csProgressRef}
            onClick={onCsProgressClick}
            className="cs-progress-bar flex-1 h-[3px] bg-[#1F2733]/40 rounded-full cursor-pointer relative group"
          >
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00C4AF]/5 -inset-y-2" />
            <div
              className="cs-progress-fill h-full rounded-full bg-gradient-to-r from-[#00C4AF] to-[#00A8FF] transition-[width] duration-100 ease-out relative"
              style={{ width: `${Math.max(csProgress * 100, 2)}%` }}
            >
              <div className="cs-progress-thumb absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00C4AF] border-2 border-[#060810] shadow-[0_0_10px_rgba(0,196,175,0.5)] transition-transform duration-100 hover:scale-150" />
            </div>
          </div>
          <span className="cs-progress-count text-xs text-muted/40 font-mono tabular-nums whitespace-nowrap">
            {Math.round(csProgress * studies.length) + 1} / {studies.length}
          </span>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden px-6 mt-6 relative z-10">
        <Link href={workHref} className="cs-mobile-cta inline-flex items-center gap-2 text-primary font-semibold text-sm">
          {isAr ? 'عرض جميع دراسات الحالة' : 'View All Case Studies'} <ArrowRight size={16} className="rtl:-scale-x-100" />
        </Link>
      </div>

      {/* Bottom section line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#1F2733]/30 to-transparent" />
    </section>
  );
}
