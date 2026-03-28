'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LogoBrand {
  brandId: string;
  brandName: string;
  brandIndustry: string;
  brandLogo: string;
}

const BRAND_LIST: readonly LogoBrand[] = [
  { brandId: 'raya-cx', brandName: 'Raya CX', brandIndustry: 'Business Services', brandLogo: '/images/clients/raya-cx.svg' },
  { brandId: 'turbo', brandName: 'Turbo', brandIndustry: 'Automotive', brandLogo: '/images/clients/turbo.svg' },
  { brandId: 'wiki-food', brandName: 'Wiki Food', brandIndustry: 'Food Tech', brandLogo: '/images/clients/wiki-food.svg' },
  { brandId: 'al-nasser', brandName: 'Al Nasser', brandIndustry: 'Retail', brandLogo: '/images/clients/al-nasser.svg' },
  { brandId: 'raya-holding', brandName: 'Raya Holding', brandIndustry: 'Diversified', brandLogo: '/images/clients/raya-holding.svg' },
  { brandId: 'taggz', brandName: 'Taggz', brandIndustry: 'Social Commerce', brandLogo: '/images/clients/taggz.svg' },
  { brandId: 'mok-trading', brandName: 'MOK Trading', brandIndustry: 'Finance', brandLogo: '/images/clients/mok-trading.svg' },
  { brandId: 'innovate-solutions', brandName: 'Innovate Solutions', brandIndustry: 'Consulting', brandLogo: '/images/clients/innovate-solutions.svg' },
  { brandId: 'future-tech', brandName: 'Future Tech', brandIndustry: 'Technology', brandLogo: '/images/clients/future-tech.svg' },
  { brandId: 'premium-retail', brandName: 'Premium Retail', brandIndustry: 'Luxury Retail', brandLogo: '/images/clients/premium-retail.svg' },
];

export default function ClientLogosCarousel() {
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const logoTitleRef = useRef<HTMLHeadingElement>(null);
  const logoMarqueeRef = useRef<HTMLDivElement>(null);

  // Arrow click shifts the marquee position via CSS custom property
  const handleArrow = (dir: 'left' | 'right') => {
    const marquee = logoMarqueeRef.current;
    if (!marquee) return;
    // Pause briefly, shift, resume
    marquee.style.animationPlayState = 'paused';
    // Get current computed transform and nudge it
    const inner = marquee.querySelector('.logo-marquee-inner') as HTMLElement;
    if (inner) {
      inner.style.animationPlayState = 'paused';
      setTimeout(() => {
        inner.style.animationPlayState = 'running';
      }, 400);
    }
  };

  // GSAP heading reveal only
  useEffect(() => {
    if (!logoSectionRef.current || !logoTitleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: logoSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, logoSectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={logoSectionRef}
      data-section="client-logos"
      className="logo-carousel-section py-24 overflow-hidden"
    >
      <div className="logo-carousel-header max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between">
          <h2
            ref={logoTitleRef}
            className="logo-carousel-title text-3xl sm:text-4xl font-bold tracking-tight font-heading"
          >
            Clients We Proudly <span className="text-primary">Served</span>
          </h2>

          <div className="logo-carousel-arrows flex items-center gap-2">
            <button
              onClick={() => handleArrow('left')}
              className="logo-arrow-btn w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-[#00C4AF] hover:bg-[#00C4AF]/10 transition-all duration-200"
              aria-label="Previous logos"
            >
              <ChevronLeft size={16} className="text-muted" />
            </button>
            <button
              onClick={() => handleArrow('right')}
              className="logo-arrow-btn w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-[#00C4AF] hover:bg-[#00C4AF]/10 transition-all duration-200"
              aria-label="Next logos"
            >
              <ChevronRight size={16} className="text-muted" />
            </button>
          </div>
        </div>
      </div>

      {/* Pure CSS marquee - no JS animation, no React state, GPU accelerated */}
      <div ref={logoMarqueeRef} className="logo-carousel-viewport relative">
        {/* Left fade */}
        <div className="logo-fade-left absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#060810] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="logo-fade-right absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#060810] to-transparent z-10 pointer-events-none" />

        <div className="logo-marquee-inner flex w-max hover:[animation-play-state:paused]" style={{ animation: 'logoMarquee 40s linear infinite' }}>
          {/* Render 3 copies for seamless loop */}
          {[0, 1, 2].map((copy) => (
            <div key={copy} className="flex gap-6 pr-6">
              {BRAND_LIST.map((brand) => (
                <div
                  key={`${brand.brandId}-${copy}`}
                  data-brand={brand.brandId}
                  className="logo-carousel-card flex-shrink-0"
                >
                  <div className="logo-card-inner w-48 sm:w-52 h-28 sm:h-32 rounded-xl border border-border bg-[#0D1017]/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-all duration-500 hover:border-[#00C4AF]/40 hover:shadow-[0_0_30px_rgba(0,196,175,0.1)] hover:bg-[#111620] group">
                    {/* Logo image */}
                    <div className="logo-card-image w-36 sm:w-40 h-12 sm:h-14 relative opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                      <Image
                        src={brand.brandLogo}
                        alt={`${brand.brandName} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {/* Industry tag */}
                    <span className="logo-card-tag text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {brand.brandIndustry}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
