"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getNavLinks, getUiStrings } from "@/content/site";
import { LanguageSwitcher } from "./languageSwitcher";

type Props = Readonly<{ locale: Locale }>;

function localizeHref(href: string, locale: Locale): string {
  if (/^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  if (href === "/") return `/${locale}`;
  const [path, hash] = href.split("#");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}${hash ? `#${hash}` : ""}`;
}

export function Navbar({ locale }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const navLinks = getNavLinks(locale);
  const ui = getUiStrings(locale);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollYRef.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Hide navbar on dashboard routes (mounted inside [locale] so this is defensive)
  if (pathname?.startsWith("/dashboard")) return null;

  const homeHref = `/${locale}`;
  const contactHref = `/${locale}/contact`;
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${scrolled ? "bg-[#060810]/80 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href={homeHref} className="cursor-pointer">
              <Image
                src="/mok-logo.png"
                alt="The Mok Company"
                width={160}
                height={45}
                priority
                className="object-contain brightness-0 invert"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const href = localizeHref(link.href, locale);
                return (
                  <Link
                    key={link.href}
                    href={href}
                    className={`text-sm tracking-wide transition-colors duration-300 cursor-pointer link-underline ${
                      isActive(href) ? "text-primary" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-5">
              <LanguageSwitcher currentLocale={locale} />
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#111318] bg-[#00C4AF] rounded-full hover:bg-[#00C4AF]/90 transition-all duration-300 cursor-pointer"
              >
                {ui.ctaStartConversation}
                <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white cursor-pointer p-2"
              aria-label={isOpen ? ui.menuClose : ui.menuOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#060810] transition-all duration-500 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, i) => {
            const href = localizeHref(link.href, locale);
            return (
              <Link
                key={link.href}
                href={href}
                className={`text-3xl font-light tracking-wide transition-all duration-500 cursor-pointer ${
                  isActive(href) ? "text-primary" : "text-white/50 hover:text-white"
                }`}
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={contactHref}
            className="mt-4 inline-flex items-center gap-2 px-8 py-3 text-base font-medium text-[#111318] bg-[#00C4AF] rounded-full cursor-pointer hover:bg-[#00C4AF]/90"
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 50}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transition: "all 0.5s ease",
            }}
          >
            {ui.ctaStartConversation}
            <ArrowUpRight className="w-5 h-5 rtl:-scale-x-100" />
          </Link>
          <div
            className="mt-8"
            style={{
              transitionDelay: isOpen ? `${(navLinks.length + 1) * 50}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transition: "all 0.5s ease",
            }}
          >
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}
