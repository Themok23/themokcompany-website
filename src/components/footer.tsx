'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerColumns = [
  {
    title: 'The Mok Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our Philosophy', href: '/about#philosophy' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'What We Do',
    links: [
      { label: 'The Mok Management', href: '/what-we-do#management' },
      { label: 'The Mok Innovations', href: '/what-we-do#innovations' },
      { label: 'The Mok Technologies', href: '/what-we-do#technologies' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { label: 'Articles', href: '/insights?category=articles' },
      { label: 'Research', href: '/insights?category=research' },
      { label: 'Case Studies', href: '/our-work' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/themokcompany', external: true },
      { label: 'Instagram', href: 'https://instagram.com/themokcompany', external: true },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (isDashboard || !footerRef.current) return;

    // Small delay to let new page content settle into the DOM
    // so ScrollTrigger calculates correct positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const ctx = gsap.context(() => {
      // Logo fades in
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // CTA heading reveals with clip
      if (ctaHeadingRef.current) {
        gsap.fromTo(
          ctaHeadingRef.current,
          { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaHeadingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // CTA button pops in
      if (ctaBtnRef.current) {
        gsap.fromTo(
          ctaBtnRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaBtnRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Divider line draws across
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Columns stagger in from left
      columnsRef.current.forEach((col, i) => {
        if (!col) return;
        gsap.fromTo(
          col,
          { opacity: 0, y: 30, x: -15 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: col,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Bottom bar fades in
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: bottomRef.current,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [pathname, isDashboard]);

  if (isDashboard) return null;

  return (
    <footer
      ref={footerRef}
      className="relative z-[1]"
    >
      {/* Semi-transparent backdrop - stars show through with soft blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060810]/50 via-[#0D0F14]/40 to-[#060810]/70 backdrop-blur-[2px]" />
      {/* Teal glow accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C4AF]/40 to-transparent" />
      {/* Subtle teal glow bloom at bottom center - the twist */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#00C4AF]/[0.03] rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8 relative z-[1]">
        {/* Logo */}
        <div ref={logoRef} className="mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mok-logo-light.png"
            alt="The Mok Company"
            width={180}
            height={48}
            className="w-[180px] h-auto"
          />
        </div>

        {/* CTA Section */}
        <div className="mb-20">
          <h2
            ref={ctaHeadingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-3xl leading-tight tracking-tight font-heading"
          >
            Ready to build what&apos;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] to-[#00A8FF]">
              next?
            </span>
          </h2>
          <div ref={ctaBtnRef}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-[#111318] bg-[#00C4AF] rounded-lg hover:bg-[#00C4AF]/90 transition-all duration-300 btn-glow font-heading"
            >
              Start a Conversation
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="h-[1px] bg-gradient-to-r from-[#00C4AF]/30 via-[#1F2733] to-transparent mb-16 origin-left"
        />

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {footerColumns.map((column, colIndex) => (
            <div
              key={column.title}
              ref={(el) => { columnsRef.current[colIndex] = el; }}
            >
              <h3 className="text-sm font-semibold text-primary uppercase tracking-[0.15em] mb-5 font-heading">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={(link as { external?: boolean }).external ? '_blank' : undefined}
                      rel={(link as { external?: boolean }).external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted hover:text-white transition-colors duration-300 link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted/50 font-body">
            &copy; 2026 The Mok Company. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted/50 hover:text-muted transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted/50 hover:text-muted transition-colors duration-300"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
