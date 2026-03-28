'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const kIconRef = useRef<HTMLImageElement>(null);
  const fullLogoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstRender = useRef(true);
  const latestChildren = useRef(children);

  // Keep ref in sync with latest children prop
  latestChildren.current = children;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
      return;
    }

    const ctx = gsap.context(() => {}, containerRef);
    const tl = gsap.timeline();
    const navbar = document.querySelector('nav')?.closest('[class*="fixed"]') || document.querySelector('header');

    // Phase 1: Content fades out smoothly, then overlay fades in (transparent bg - starfield visible)
    if (containerRef.current) {
      tl.to(containerRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.inOut' }, 0);
    }

    // Fade out the navbar
    if (navbar) {
      tl.to(navbar, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' }, 0);
    }

    // Overlay fades in (same bg as site - transparent so stars show through)
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.inOut' }, 0.2);
    }

    // Phase 2: K icon rotates in slowly over the starfield
    if (kIconRef.current) {
      tl.fromTo(
        kIconRef.current,
        { scale: 0.3, rotation: -90, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        0.4
      );
    }

    // Glow pulse behind icon
    if (glowRef.current) {
      tl.fromTo(glowRef.current, { scale: 0, opacity: 0 }, { scale: 2, opacity: 0.7, duration: 0.6, ease: 'power2.out' }, 0.5);
      tl.to(glowRef.current, { scale: 3, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0.95);
    }

    // Phase 3: K icon shrinks, full logo crossfades in
    if (kIconRef.current && fullLogoRef.current) {
      tl.to(kIconRef.current, { scale: 0.3, opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 1.15);
      tl.fromTo(
        fullLogoRef.current,
        { opacity: 0, scale: 0.9, filter: 'blur(6px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
        1.2
      );
    }

    // Phase 4: Swap content
    tl.call(() => {
      setDisplayChildren(latestChildren.current);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [], 1.65);

    // Phase 5: Logo fades, overlay fades out, new content reveals
    if (fullLogoRef.current) {
      tl.to(fullLogoRef.current, { opacity: 0, scale: 1.03, duration: 0.3, ease: 'power1.in' }, 1.7);
    }

    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 1.8);
    }

    // New page content fades in
    if (containerRef.current) {
      tl.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.9);
    }

    // Navbar reappears
    if (navbar) {
      tl.to(navbar, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 2.0);
    }

    // Refresh ScrollTrigger after transition so footer + other triggers recalculate
    tl.call(() => {
      ScrollTrigger.refresh();
    }, [], 2.6);

    // Cleanup
    tl.set(kIconRef.current, { clearProps: 'all' });
    tl.set(fullLogoRef.current, { clearProps: 'all' });
    tl.set(glowRef.current, { clearProps: 'all' });

    return () => {
      tl.kill();
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Overlay - transparent bg so starfield shows through, just blocks content */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] pointer-events-none"
        style={{ opacity: 0, background: 'radial-gradient(ellipse at center, rgba(9,11,16,0.92) 0%, rgba(9,11,16,0.97) 100%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Glow pulse */}
          <div ref={glowRef} className="absolute w-32 h-32 rounded-full bg-[#00C4AF]/25 blur-3xl opacity-0" />

          {/* K Icon - rotates in */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={kIconRef}
            src="/mok-brand-icon.png"
            alt=""
            aria-hidden="true"
            width={48}
            height={82}
            className="absolute w-[48px] h-auto opacity-0 will-change-transform drop-shadow-[0_0_20px_rgba(0,196,175,0.6)]"
          />

          {/* Full MOK Logo - fades in after icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={fullLogoRef}
            src="/mok-logo-light.png"
            alt="The Mok Company"
            width={240}
            height={64}
            className="absolute w-[240px] h-auto opacity-0 will-change-transform"
            style={{ willChange: 'transform, opacity, filter' }}
          />
        </div>
      </div>

      <div ref={containerRef} className="will-change-[opacity,transform]">
        {displayChildren}
      </div>
    </>
  );
}
