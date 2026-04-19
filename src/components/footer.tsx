'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getFooterColumns, getUiStrings, getSiteConfig } from '@/content/site';

gsap.registerPlugin(ScrollTrigger);

type Props = Readonly<{ locale: Locale }>;

function localizeHref(href: string, locale: Locale): string {
  if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }
  const [path, hash] = href.split('#');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized === '/' ? '' : normalized}${hash ? `#${hash}` : ''}`;
}

export function Footer({ locale }: Props) {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isDashboard = pathname?.startsWith('/dashboard');

  const footerColumns = getFooterColumns(locale);
  const ui = getUiStrings(locale);
  const site = getSiteConfig(locale);

  useEffect(() => {
    if (isDashboard || !footerRef.current) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const ctx = gsap.context(() => {
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

      columnsRef.current.forEach((col, i) => {
        if (!col) return;
        gsap.fromTo(
          col,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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

  const contactHref = `/${locale}/contact`;
  const privacyHref = `/${locale}/privacy`;
  const termsHref = `/${locale}/terms`;
  const ctaReady =
    locale === 'ar' ? (
      <>
        جاهز لبناء ما هو{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] to-[#00A8FF]">
          قادم؟
        </span>
      </>
    ) : (
      <>
        Ready to build what&apos;s{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4AF] to-[#00A8FF]">
          next?
        </span>
      </>
    );

  return (
    <footer ref={footerRef} className="relative z-[1]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060810]/50 via-[#0D0F14]/40 to-[#060810]/70 backdrop-blur-[2px]" />
      <div className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-[#00C4AF]/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#00C4AF]/[0.03] rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8 relative z-[1]">
        <div ref={logoRef} className="mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mok-logo-light.png"
            alt={site.name}
            width={180}
            height={48}
            className="w-[180px] h-auto"
          />
        </div>

        <div className="mb-20">
          <h2
            ref={ctaHeadingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-3xl leading-tight tracking-tight font-heading"
          >
            {ctaReady}
          </h2>
          <div ref={ctaBtnRef}>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-[#111318] bg-[#00C4AF] rounded-lg hover:bg-[#00C4AF]/90 transition-all duration-300 btn-glow font-heading"
            >
              {ui.ctaStartConversation}
              <ArrowUpRight className="w-5 h-5 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        <div
          ref={dividerRef}
          className="h-[1px] bg-gradient-to-r from-[#00C4AF]/30 via-[#1F2733] to-transparent mb-16 origin-left rtl:origin-right"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {footerColumns.map((column, colIndex) => (
            <div
              key={column.title}
              ref={(el) => {
                columnsRef.current[colIndex] = el;
              }}
            >
              <h3 className="text-sm font-semibold text-primary uppercase tracking-[0.15em] mb-5 font-heading">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => {
                  const isExternal = (link as { external?: boolean }).external;
                  const href = isExternal ? link.href : localizeHref(link.href, locale);
                  return (
                    <li key={link.label}>
                      <Link
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="text-sm text-muted hover:text-white transition-colors duration-300 link-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          ref={bottomRef}
          className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted/50 font-body">
            &copy; 2026 {site.name}. {ui.footerRights}
          </p>
          <div className="flex gap-6">
            <Link
              href={privacyHref}
              className="text-xs text-muted/50 hover:text-muted transition-colors duration-300"
            >
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link
              href={termsHref}
              className="text-xs text-muted/50 hover:text-muted transition-colors duration-300"
            >
              {locale === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
