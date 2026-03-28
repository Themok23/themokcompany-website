import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline" | "ghost";
  arrow?: "right" | "up-right" | "none";
  className?: string;
  external?: boolean;
}

/**
 * Consistent CTA button matching the homepage glow buttons.
 * Primary: filled teal with rotating glow border
 * Outline: border with subtle glow on hover
 * Ghost: text link with arrow
 */
export function Button({
  children,
  href,
  variant = "primary",
  arrow = "right",
  className,
  external = false,
}: ButtonProps) {
  const ArrowIcon = arrow === "up-right" ? ArrowUpRight : ArrowRight;

  const classes = cn(
    "inline-flex items-center gap-2 font-semibold transition-colors duration-300 font-heading",
    variant === "primary" &&
      "px-8 py-4 bg-primary text-[#111318] rounded-lg hover:bg-primary/90 btn-glow",
    variant === "outline" &&
      "px-8 py-4 border border-border/80 rounded-lg hover:bg-surface/40 backdrop-blur-sm btn-glow-outline",
    variant === "ghost" &&
      "text-primary hover:text-white",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow !== "none" && <ArrowIcon className="w-5 h-5" />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow !== "none" && <ArrowIcon className="w-5 h-5" />}
    </Link>
  );
}
