"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/our-work", label: "Our Work" },
  { href: "/insights", label: "Insights" },
  { href: "/ventures", label: "Ventures" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#111318]/80 backdrop-blur-xl border-b border-[#1F2733]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="text-white font-semibold text-lg tracking-tight cursor-pointer"
            >
              THE MOK COMPANY
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors duration-300 cursor-pointer link-underline ${
                    pathname === link.href
                      ? "text-[#00C4AF]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#111318] bg-[#00C4AF] rounded-full hover:bg-[#00C4AF]/90 transition-all duration-300 cursor-pointer"
              >
                Start a Conversation
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white cursor-pointer p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#111318] transition-all duration-500 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-3xl font-light tracking-wide transition-all duration-500 cursor-pointer ${
                pathname === link.href ? "text-[#00C4AF]" : "text-white/50 hover:text-white"
              }`}
              style={{
                transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 text-base font-medium text-[#111318] bg-[#00C4AF] rounded-full cursor-pointer hover:bg-[#00C4AF]/90"
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 50}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transition: "all 0.5s ease",
            }}
          >
            Start a Conversation
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
