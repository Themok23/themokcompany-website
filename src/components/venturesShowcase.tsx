'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Zap, Bot, ShoppingBag, BarChart3, GitBranch } from 'lucide-react';
import { getVentures } from '@/content/ventures';
import { useLocale } from '@/i18n/useLocale';

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_ICONS: Record<string, typeof Zap> = {
  mokerp: Zap,
  mokbot: Bot,
  taggz: ShoppingBag,
  'mok-insights': BarChart3,
  'mok-workflow': GitBranch,
};

const STATUS_CONFIG_EN: Record<string, { label: string; color: string; pulse: boolean }> = {
  active: { label: 'Live', color: '#00C4AF', pulse: true },
  launched: { label: 'Launched', color: '#00C4AF', pulse: true },
  'coming-soon': { label: 'Coming Soon', color: '#F59E0B', pulse: false },
  stealth: { label: 'In Development', color: '#6B7280', pulse: false },
};

const STATUS_CONFIG_AR: Record<string, { label: string; color: string; pulse: boolean }> = {
  active: { label: 'نشط', color: '#00C4AF', pulse: true },
  launched: { label: 'مُطلق', color: '#00C4AF', pulse: true },
  'coming-soon': { label: 'قريباً', color: '#F59E0B', pulse: false },
  stealth: { label: 'قيد التطوير', color: '#6B7280', pulse: false },
};

export default function VenturesShowcase() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const STATUS_CONFIG = isAr ? STATUS_CONFIG_AR : STATUS_CONFIG_EN;
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const hoverListeners: Array<{ el: HTMLDivElement; type: string; fn: () => void }> = [];

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      // Staggered card reveals
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            }
          );
        }
      });

      // Interactive hover animations - track listeners for cleanup

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const iconEl = card.querySelector('.venture-icon');
        const glowEl = card.querySelector('.venture-glow');
        const featuresEl = card.querySelector('.venture-features');

        const onEnter = () => {
          gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          if (iconEl) gsap.to(iconEl, { scale: 1.15, rotation: 5, duration: 0.3, ease: 'back.out(1.7)' });
          if (glowEl) gsap.to(glowEl, { opacity: 1, scale: 1.3, duration: 0.4, ease: 'power2.out' });
          if (featuresEl) gsap.to(featuresEl, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        };

        const onLeave = () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          if (iconEl) gsap.to(iconEl, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
          if (glowEl) gsap.to(glowEl, { opacity: 0.5, scale: 1, duration: 0.4, ease: 'power2.out' });
          if (featuresEl) gsap.to(featuresEl, { opacity: 0, y: 8, duration: 0.2, ease: 'power2.in' });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        hoverListeners.push({ el: card, type: 'mouseenter', fn: onEnter });
        hoverListeners.push({ el: card, type: 'mouseleave', fn: onLeave });
      });
    }, sectionRef);

    // Refresh ScrollTrigger positions after component mount
    ScrollTrigger.refresh();

    return () => {
      hoverListeners.forEach(({ el, type, fn }) => el.removeEventListener(type, fn));
      ctx.revert();
    };
  }, []);

  const ventures = getVentures(locale);
  const featured = ventures[0]; // MOK ERP
  const rest = ventures.slice(1);
  const venturesHref = `/${locale}/ventures`;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Full-width dark gradient background - visually distinct */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0D14] to-transparent" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,196,175,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,175,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00C4AF]/20 bg-[#00C4AF]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C4AF] animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em] font-heading">
              {isAr ? 'ابتكارات موك' : 'MOK Innovations'}
            </span>
          </div>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-heading opacity-0">
            {isAr ? (
              <>
                منتجات{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] via-[#00A8FF] to-[#00C4AF]">
                  نبنيها ونُطلقها
                </span>
              </>
            ) : (
              <>
                Products We{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] via-[#00A8FF] to-[#00C4AF]">
                  Build & Ship
                </span>
              </>
            )}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {isAr
              ? 'منتجات SaaS للمؤسسات ولدت من مشاكل حقيقية حللناها لعملائنا. متوفرة الآن كمنصات مستقلة.'
              : 'Enterprise SaaS products born from real problems we solved for our clients. Now available as standalone platforms.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured product - spans 2 columns */}
          <div
            ref={(el) => { if (el) cardsRef.current[0] = el; }}
            className="md:col-span-2 relative rounded-2xl border border-border/60 bg-[#12151C]/80 backdrop-blur-md overflow-hidden group cursor-pointer"
            
            
          >
            {/* Accent gradient top */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00C4AF] via-[#00A8FF] to-[#00C4AF]/20" />

            {/* Background glow */}
            <div className="venture-glow absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#00C4AF]/[0.04] blur-[80px] opacity-50 pointer-events-none" />

            <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row gap-8">
              <div className="flex-1">
                {/* Status badge */}
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = PRODUCT_ICONS[featured.id] || Zap;
                    return (
                      <div className="venture-icon w-12 h-12 rounded-xl bg-[#00C4AF]/10 border border-[#00C4AF]/20 flex items-center justify-center">
                        <Icon size={22} className="text-primary" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors duration-300">
                      {featured.name}
                    </h3>
                    <p className="text-sm text-muted">{featured.tagline}</p>
                  </div>
                  <div className="ms-auto flex items-center gap-2">
                    {(() => {
                      const status = STATUS_CONFIG[featured.status] || STATUS_CONFIG.active;
                      return (
                        <>
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color, boxShadow: status.pulse ? `0 0 8px ${status.color}` : 'none' }} />
                          <span className="text-xs font-medium" style={{ color: status.color }}>{status.label}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <p className="text-muted leading-relaxed mb-6 max-w-xl">
                  {featured.description}
                </p>

                {/* Feature pills - shown on hover */}
                <div className="venture-features opacity-0 translate-y-2 flex flex-wrap gap-2 mb-6">
                  {featured.features?.slice(0, 4).map((f) => (
                    <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-[#00C4AF]/8 border border-[#00C4AF]/15 text-primary/80">
                      {f}
                    </span>
                  ))}
                </div>

                {featured.url && (
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors"
                  >
                    {isAr ? 'زيارة المنصة' : 'Visit Platform'}
                    <ArrowUpRight size={14} className="rtl:-scale-x-100" />
                  </a>
                )}
              </div>

              {/* Terminal-style preview */}
              <div className="hidden sm:block w-64 flex-shrink-0">
                <div className="rounded-lg border border-border/80 bg-[#0D0F14] overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    <span className="ml-2 text-[10px] text-muted/40 font-mono">erp.themok.company</span>
                  </div>
                  <div className="p-3 font-mono text-[10px] leading-relaxed text-muted/60">
                    <p><span className="text-primary">$</span> mok-erp status</p>
                    <p className="text-[#28C840]">All systems operational</p>
                    <p className="mt-1"><span className="text-primary">$</span> uptime</p>
                    <p>99.9% | 365 days</p>
                    <p className="mt-1"><span className="text-primary">$</span> entities</p>
                    <p>Multi-entity active</p>
                    <p className="mt-1 animate-pulse text-primary">_</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the products */}
          {rest.map((venture, index) => {
            const Icon = PRODUCT_ICONS[venture.id] || Zap;
            const status = STATUS_CONFIG[venture.status] || STATUS_CONFIG.active;

            return (
              <div
                key={venture.id}
                ref={(el) => { if (el) cardsRef.current[index + 1] = el; }}
                className="relative rounded-2xl border border-border/60 bg-[#12151C]/80 backdrop-blur-md overflow-hidden group cursor-pointer"
                
                
              >
                {/* Accent line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-[#00C4AF]/60 to-transparent" />

                {/* Background glow */}
                <div className="venture-glow absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-[#00C4AF]/[0.03] blur-[60px] opacity-50 pointer-events-none" />

                <div className="relative p-6">
                  {/* Icon + Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="venture-icon w-11 h-11 rounded-xl bg-[#00C4AF]/10 border border-[#00C4AF]/20 flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color, boxShadow: status.pulse ? `0 0 6px ${status.color}` : 'none' }} />
                      <span className="text-[10px] font-medium" style={{ color: status.color }}>{status.label}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-heading mb-1 group-hover:text-primary transition-colors duration-300">
                    {venture.name}
                  </h3>
                  <p className="text-sm text-muted/70 mb-3">{venture.tagline}</p>

                  <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                    {venture.description}
                  </p>

                  {/* Features on hover */}
                  <div className="venture-features opacity-0 translate-y-2 flex flex-wrap gap-1.5 mb-4">
                    {venture.features?.slice(0, 3).map((f) => (
                      <span key={f} className="text-[10px] px-2 py-1 rounded-full bg-[#00C4AF]/8 border border-[#00C4AF]/15 text-primary/70">
                        {f}
                      </span>
                    ))}
                  </div>

                  {venture.url ? (
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-white transition-colors"
                    >
                      {isAr ? 'زيارة' : 'Visit'}
                      <ArrowUpRight size={12} className="rtl:-scale-x-100" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted/40 font-medium">
                      {isAr
                        ? (venture.status === 'stealth' ? 'في وضع التخفي' : 'يُطلق قريباً')
                        : (venture.status === 'stealth' ? 'In stealth mode' : 'Launching soon')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href={venturesHref}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border/80 rounded-lg font-semibold text-sm hover:bg-surface/40 transition-colors duration-300 btn-glow-outline"
          >
            {isAr ? 'استكشف جميع المشاريع' : 'Explore All Ventures'}
            <ArrowRight size={16} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
