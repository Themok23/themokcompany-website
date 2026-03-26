import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerColumns = [
  {
    title: "The Mok Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Philosophy", href: "/about#philosophy" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "What We Do",
    links: [
      { label: "The Mok Management", href: "/what-we-do#management" },
      { label: "The Mok Innovations", href: "/what-we-do#innovations" },
      { label: "The Mok Technologies", href: "/what-we-do#technologies" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Articles", href: "/insights#articles" },
      { label: "Research", href: "/insights#research" },
      { label: "Case Studies", href: "/our-work" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        {/* CTA Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 max-w-3xl leading-tight">
            Ready to build what&apos;s next?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-medium text-black bg-white rounded-full hover:bg-white/90 transition-all duration-300 cursor-pointer"
          >
            Start a Conversation
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-medium text-white mb-4 tracking-wide">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
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
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; 2026 The Mok Company. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
